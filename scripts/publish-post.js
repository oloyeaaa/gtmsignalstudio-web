/**
 * Publish a new blog post to Supabase + upload featured image to Storage
 * + push record to Airtable Content-Engine
 *
 * Usage:
 *   node scripts/publish-post.js \
 *     --markdown "C:/path/to/post.md" \
 *     --image "C:/path/to/image.png" \
 *     --slug "url-slug-here"
 *
 * The script:
 *   1. Uploads the featured image to Supabase Storage (blog-images bucket)
 *   2. Parses the markdown file to extract: title, content, meta description,
 *      short answer, FAQ items, schema markup
 *   3. Inserts a new row into the `posts` table (status: published)
 *   4. Pushes content metadata to Airtable Content-Engine (status: published)
 *   5. Logs the ISR revalidation endpoint for triggering page rebuild
 */

const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

// ── Load .env.local ──────────────────────────────────────────────────────────

function loadEnv(envPath) {
  const env = {};
  if (!fs.existsSync(envPath)) return env;
  const lines = fs.readFileSync(envPath, "utf-8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
      const [key, ...rest] = trimmed.split("=");
      env[key.trim()] = rest.join("=").trim();
    }
  }
  return env;
}

const localEnv = loadEnv(path.join(__dirname, "..", ".env.local"));
const gssEnv   = loadEnv(path.join(__dirname, "..", "..", "GSS", "config", ".env"));

const SUPABASE_URL        = localEnv.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = localEnv.SUPABASE_SERVICE_KEY;
const REVALIDATION_SECRET  = localEnv.REVALIDATION_SECRET || "gss-revalidate-2026";
const AIRTABLE_TOKEN       = gssEnv.AIRTABLE_TOKEN;
const AIRTABLE_BASE_ID     = gssEnv.AIRTABLE_BASE_ID;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error("❌  Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// ── CLI args ─────────────────────────────────────────────────────────────────

function getArg(flag) {
  const idx = process.argv.indexOf(flag);
  return idx !== -1 ? process.argv[idx + 1] : null;
}

const markdownPath = getArg("--markdown");
const imagePath    = getArg("--image");
const slugArg      = getArg("--slug");
const dateArg      = getArg("--date"); // Optional: schedule for a future date (YYYY-MM-DD)
const dryRun       = process.argv.includes("--dry-run");

if (!markdownPath || !slugArg) {
  console.error("Usage: node scripts/publish-post.js --markdown <path> --slug <slug> [--image <path>] [--date YYYY-MM-DD] [--dry-run]");
  process.exit(1);
}

// ── Markdown parser ───────────────────────────────────────────────────────────

function extractSection(md, heading) {
  const pattern = new RegExp(`##\\s+${heading}\\s*\\n([\\s\\S]*?)(?=\\n##\\s|$)`, "i");
  const match = md.match(pattern);
  return match ? match[1].trim() : null;
}

function extractShortAnswer(md) {
  const match = md.match(/\*\*The short answer:\*\*\s+([^\n]+(?:\n(?!\n)[^\n]+)*)/);
  if (match) return match[1].replace(/\*\*/g, "").trim();
  const match2 = md.match(/\*\*The short answer:\*\*([^*]+)/);
  return match2 ? match2[1].trim() : null;
}

function extractMetaDescription(md) {
  // Looks for the recommended option under ## Meta Description
  const match = md.match(/\*\*Option A[^:]*:\*\*\s*\n([^\n]+)/);
  if (match) return match[1].trim().replace(/\s*\(\d+ chars?\)$/, "").trim();
  const match2 = md.match(/\*\*Option B[^:]*:\*\*\s*\n([^\n]+)/);
  return match2 ? match2[1].trim().replace(/\s*\(\d+ chars?\)$/, "").trim() : null;
}

function extractTitle(md) {
  // First try: look for # H1 heading (not ## H2)
  const h1Match = md.match(/^# (.+)/m);
  if (h1Match && !h1Match[1].includes("Meta Description")) {
    return h1Match[1].trim();
  }

  // Second try: Blog Post section
  const blogSection = extractSection(md, "Blog Post");
  if (blogSection) {
    const match = blogSection.match(/^##?\s+(.+)/m);
    if (match) return match[1].trim();
  }

  // Fallback: first heading that is not Meta Description or FAQ
  const lines = md.split("\n");
  for (const line of lines) {
    const match = line.match(/^##?\s+(.+)/);
    if (match && !match[1].includes("Meta Description") && !match[1].includes("FAQ")) {
      return match[1].trim();
    }
  }
  return "Untitled";
}

function extractFAQ(md) {
  // Try both section heading formats: "## FAQ" and "## Frequently Asked Questions"
  let faqSection = extractSection(md, "Frequently Asked Questions");
  if (!faqSection) faqSection = extractSection(md, "FAQ");
  if (!faqSection) return [];

  const faqs = [];
  const blocks = faqSection.split(/\n\n+/);
  let current = null;

  for (const block of blocks) {
    // Format 1: **Question here** (bold)
    const boldMatch = block.match(/^\*\*(.+?)\*\*/);
    // Format 2: ### Question here (h3 heading)
    const h3Match = block.match(/^###\s+(.+)/);

    const questionMatch = boldMatch || h3Match;
    if (questionMatch) {
      if (current) faqs.push(current);
      // Strip the question marker from the block to get the answer
      let rest;
      if (boldMatch) {
        rest = block.replace(/^\*\*(.+?)\*\*\s*\n?/, "").trim();
      } else {
        rest = block.replace(/^###\s+.+\n?/, "").trim();
      }
      current = { question: questionMatch[1].trim(), answer: rest };
    } else if (current && block.trim()) {
      current.answer += " " + block.trim();
    }
  }
  if (current) faqs.push(current);
  return faqs;
}

function extractSchemaMarkup(md) {
  const schemas = [];
  const scriptPattern = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
  let match;
  while ((match = scriptPattern.exec(md)) !== null) {
    try {
      schemas.push(JSON.parse(match[1].trim()));
    } catch (e) {
      // skip malformed
    }
  }
  return schemas.length > 0 ? schemas : null;
}

function extractBlogContent(md) {
  let content = md;

  // Strip YAML frontmatter (--- ... ---)
  content = content.replace(/^---[\s\S]*?---\s*\n/, "");

  // Strip ## Meta Description section
  content = content.replace(/## Meta Description[\s\S]*?(?=# [A-Z])/, "");

  // Strip H1 title (template renders title from title field)
  content = content.replace(/^# .+\n\n/, "");

  // Strip ## FAQ section (template renders from faq field via FaqAccordion)
  content = content.replace(/\n## FAQ[\s\S]*$/, "");

  // Strip ## Frequently Asked Questions section
  content = content.replace(/\n## Frequently Asked Questions[\s\S]*$/, "");

  // Strip author bio at end (template renders AuthorCard component)
  content = content.replace(/\n---\n\n\*Oloye Adeosun is[\s\S]*$/, "");

  // Strip ## Sources section (kept in markdown file for reference, not rendered)
  content = content.replace(/\n## Sources[\s\S]*$/, "");

  // Strip **Meta:** section (internal metadata, not for publishing)
  content = content.replace(/\n\*\*Meta:\*\*[\s\S]*$/, "");

  // Strip **Companion LinkedIn Post:** section
  content = content.replace(/\n\*\*Companion LinkedIn Post:\*\*[\s\S]*$/, "");

  // Legacy: Find ## Blog Post section if it exists
  const start = content.indexOf("## Blog Post");
  if (start !== -1) {
    const afterStart = content.indexOf("\n", start) + 1;
    const end = content.indexOf("\n## Schema Markup", afterStart);
    content = end !== -1 ? content.slice(afterStart, end) : content.slice(afterStart);
  }

  return content.trim();
}

function wordCount(text) {
  return text.split(/\s+/).filter(Boolean).length;
}

function readingTime(text) {
  return Math.ceil(wordCount(text) / 200);
}

// ── Image upload ──────────────────────────────────────────────────────────────

async function uploadImage(localPath, slug) {
  if (!localPath || !fs.existsSync(localPath)) {
    console.log("⚠️  No image path provided or file not found — skipping image upload");
    return null;
  }

  const fileName = `${slug}.png`;
  const fileBuffer = fs.readFileSync(localPath);

  console.log(`📤 Uploading image: ${fileName}`);

  const { error } = await supabase.storage
    .from("blog-images")
    .upload(fileName, fileBuffer, {
      contentType: "image/png",
      upsert: true,
    });

  if (error) {
    console.error("❌  Image upload failed:", error.message);
    return null;
  }

  const { data: urlData } = supabase.storage
    .from("blog-images")
    .getPublicUrl(fileName);

  console.log(`✅ Image uploaded: ${urlData.publicUrl}`);
  return urlData.publicUrl;
}

// ── Airtable Content-Engine push ──────────────────────────────────────────────

async function pushToAirtable(record) {
  if (!AIRTABLE_TOKEN || !AIRTABLE_BASE_ID) {
    console.log("⚠️  Airtable credentials not found in GSS config/.env — skipping");
    return null;
  }

  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Content-Engine`;
  const body = JSON.stringify({ records: [{ fields: record }], typecast: true });

  return new Promise((resolve) => {
    const req = require("https").request(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AIRTABLE_TOKEN}`,
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(body),
      },
    }, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        if (res.statusCode === 200 || res.statusCode === 201) {
          const result = JSON.parse(data);
          const id = result.records?.[0]?.id;
          console.log(`✅ Airtable Content-Engine updated → ${id}`);
          resolve(id);
        } else {
          console.error(`❌  Airtable push failed: ${res.statusCode} ${data.slice(0, 200)}`);
          resolve(null);
        }
      });
    });
    req.on("error", (e) => {
      console.error("❌  Airtable push error:", e.message);
      resolve(null);
    });
    req.write(body);
    req.end();
  });
}

// ── Revalidate ISR ────────────────────────────────────────────────────────────

async function revalidate(slug) {
  console.log(`ℹ️  Revalidate webhook: /api/revalidate?slug=${slug}&secret=${REVALIDATION_SECRET}`);
  console.log("   Call this endpoint after deploying to trigger ISR.");
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log("\n🚀 GSS Blog Publisher\n");

  if (!fs.existsSync(markdownPath)) {
    console.error(`❌  Markdown file not found: ${markdownPath}`);
    process.exit(1);
  }

  const md = fs.readFileSync(markdownPath, "utf-8");
  const slug = slugArg;

  // Parse all fields
  const title           = extractTitle(md);
  const content         = extractBlogContent(md);
  const metaDescription = extractMetaDescription(md);
  const shortAnswer     = extractShortAnswer(md);
  const faq             = extractFAQ(md);
  const schemaMarkup    = extractSchemaMarkup(md);
  const rt              = readingTime(content);

  console.log(`📝 Title:       ${title}`);
  console.log(`🔗 Slug:        ${slug}`);
  console.log(`📊 Word count:  ${wordCount(content)}`);
  console.log(`⏱️  Read time:   ${rt} min`);
  console.log(`📋 FAQ items:   ${faq.length}`);
  console.log(`🔷 Schema:      ${schemaMarkup ? schemaMarkup.length + " blocks" : "none"}`);
  console.log(`📄 Meta desc:   ${metaDescription ? metaDescription.substring(0, 80) + "..." : "none"}`);

  if (dryRun) {
    console.log("\n⚡ DRY RUN — no data written. Remove --dry-run to publish.");
    return;
  }

  // Upload image
  const featuredImageUrl = await uploadImage(imagePath, slug);

  // Build the post record
  const record = {
    title,
    slug,
    content,
    excerpt: metaDescription || content.substring(0, 200),
    meta_description: metaDescription,
    short_answer: shortAnswer,
    category: "AI Visibility",
    tags: ["AI Visibility", "Enterprise Marketing", "B2B Marketing", "AI Search"],
    schema_markup: schemaMarkup || {},
    faq: faq,
    featured_image: featuredImageUrl,
    og_image: featuredImageUrl,
    status: "published",
    author: "Oloye Adeosun",
    published_at: dateArg ? new Date(`${dateArg}T09:00:00.000Z`).toISOString() : new Date().toISOString(),
    reading_time: rt,
  };

  console.log("\n📤 Inserting post into Supabase...");

  const { data, error } = await supabase
    .from("posts")
    .insert([record])
    .select("id, slug, title, status, published_at")
    .single();

  if (error) {
    console.error("❌  Supabase insert failed:", error.message);
    console.error("    Details:", error.details || "none");
    process.exit(1);
  }

  console.log("\n✅ Post published successfully!");
  console.log(`   ID:           ${data.id}`);
  console.log(`   URL:          https://gtmsignalstudio.com/blog/${data.slug}`);
  console.log(`   Status:       ${data.status}`);
  console.log(`   Published at: ${data.published_at}`);

  // Push to Airtable Content-Engine
  console.log("\n📤 Updating Airtable Content-Engine...");
  await pushToAirtable({
    "Title": title,
    "Content Type": "blog",
    "Topic": metaDescription || title,
    "Date Created": new Date().toISOString().split("T")[0],
    "Word Count": wordCount(content),
    "Status": "published",
    "Meta Description": metaDescription,
  });

  await revalidate(slug);

  console.log("\n📋 Next steps:");
  console.log("   1. Push the git repo to trigger Vercel redeploy (or use Vercel dashboard)");
  console.log("   2. Verify the post at: https://gtmsignalstudio.com/blog/" + slug);
  console.log("   3. Schedule the companion LinkedIn post");
  console.log("   4. Update content-topics.md topic status to `used`\n");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
