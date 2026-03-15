/**
 * Migrate all WordPress posts to Supabase
 *
 * Usage: node scripts/migrate-wordpress.js
 *
 * Requires: WP_URL, WP_USERNAME, WP_APP_PASSWORD in GSS config/.env
 *           SUPABASE_URL, SUPABASE_SERVICE_KEY in .env.local or environment
 */

const { createClient } = require("@supabase/supabase-js");
const https = require("https");
const fs = require("fs");
const path = require("path");

// Load GSS env for WordPress credentials
function loadGSSEnv() {
  const envPath = path.join(__dirname, "..", "..", "GSS", "config", ".env");
  const env = {};
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, "utf-8").split("\n");
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
        const [key, ...rest] = trimmed.split("=");
        env[key.trim()] = rest.join("=").trim();
      }
    }
  }
  return env;
}

// Load local env
function loadLocalEnv() {
  const envPath = path.join(__dirname, "..", ".env.local");
  const env = {};
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, "utf-8").split("\n");
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
        const [key, ...rest] = trimmed.split("=");
        env[key.trim()] = rest.join("=").trim();
      }
    }
  }
  return env;
}

// Fetch JSON from URL
function fetchJSON(url, headers = {}) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const options = {
      hostname: parsedUrl.hostname,
      path: parsedUrl.pathname + parsedUrl.search,
      method: "GET",
      headers: { ...headers, "User-Agent": "GSS-Migration/1.0" },
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          resolve({ data: JSON.parse(data), headers: res.headers });
        } catch (e) {
          reject(new Error(`Failed to parse JSON from ${url}: ${e.message}`));
        }
      });
    });

    req.on("error", reject);
    req.end();
  });
}

// Strip HTML tags and decode entities
function stripHtml(html) {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&#8216;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .trim();
}

// Convert HTML content to markdown (basic)
function htmlToMarkdown(html) {
  let md = html;

  // Remove scripts
  md = md.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "");

  // Headings
  md = md.replace(/<h1[^>]*>(.*?)<\/h1>/gi, "# $1\n\n");
  md = md.replace(/<h2[^>]*>(.*?)<\/h2>/gi, "## $1\n\n");
  md = md.replace(/<h3[^>]*>(.*?)<\/h3>/gi, "### $1\n\n");
  md = md.replace(/<h4[^>]*>(.*?)<\/h4>/gi, "#### $1\n\n");

  // Bold, italic
  md = md.replace(/<strong>(.*?)<\/strong>/gi, "**$1**");
  md = md.replace(/<b>(.*?)<\/b>/gi, "**$1**");
  md = md.replace(/<em>(.*?)<\/em>/gi, "*$1*");
  md = md.replace(/<i>(.*?)<\/i>/gi, "*$1*");

  // Links
  md = md.replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, "[$2]($1)");

  // Images
  md = md.replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*\/?>/gi, "![$2]($1)");
  md = md.replace(/<img[^>]*src="([^"]*)"[^>]*\/?>/gi, "![]($1)");

  // Lists
  md = md.replace(/<li[^>]*>(.*?)<\/li>/gi, "- $1\n");
  md = md.replace(/<\/?[ou]l[^>]*>/gi, "\n");

  // Code
  md = md.replace(/<code>(.*?)<\/code>/gi, "`$1`");
  md = md.replace(/<pre[^>]*>(.*?)<\/pre>/gis, "```\n$1\n```\n\n");

  // Paragraphs
  md = md.replace(/<p[^>]*>(.*?)<\/p>/gis, "$1\n\n");

  // Line breaks
  md = md.replace(/<br\s*\/?>/gi, "\n");

  // Horizontal rules
  md = md.replace(/<hr\s*\/?>/gi, "\n---\n\n");

  // Blockquotes
  md = md.replace(/<blockquote[^>]*>(.*?)<\/blockquote>/gis, "> $1\n\n");

  // Figure/figcaption
  md = md.replace(/<figure[^>]*>(.*?)<\/figure>/gis, "$1\n\n");
  md = md.replace(/<figcaption[^>]*>(.*?)<\/figcaption>/gi, "*$1*\n\n");

  // Remove remaining HTML tags
  md = md.replace(/<[^>]*>/g, "");

  // Decode entities
  md = stripHtml(md);

  // Clean up whitespace
  md = md.replace(/\n{3,}/g, "\n\n");
  md = md.trim();

  return md;
}

// Extract categories from WP response
async function fetchCategories(wpUrl, authHeader) {
  try {
    const { data } = await fetchJSON(
      `${wpUrl}/wp-json/wp/v2/categories?per_page=100`,
      authHeader
    );
    const map = {};
    for (const cat of data) {
      map[cat.id] = cat.name;
    }
    return map;
  } catch {
    return {};
  }
}

async function main() {
  const gssEnv = loadGSSEnv();
  const localEnv = loadLocalEnv();

  const wpUrl = gssEnv.WP_URL?.replace(/\/$/, "");
  const wpUser = gssEnv.WP_USERNAME;
  const wpPass = gssEnv.WP_APP_PASSWORD;

  if (!wpUrl || !wpUser || !wpPass) {
    console.error("Missing WordPress credentials in GSS config/.env");
    process.exit(1);
  }

  const supabaseUrl = localEnv.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    localEnv.SUPABASE_SERVICE_KEY || localEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase credentials in .env.local");
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const authHeader = {
    Authorization:
      "Basic " + Buffer.from(`${wpUser}:${wpPass}`).toString("base64"),
  };

  console.log(`Fetching categories from ${wpUrl}...`);
  const categoryMap = await fetchCategories(wpUrl, authHeader);

  console.log(`Fetching posts from ${wpUrl}...`);

  let allPosts = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const { data, headers } = await fetchJSON(
      `${wpUrl}/wp-json/wp/v2/posts?per_page=100&page=${page}&status=publish`,
      authHeader
    );

    allPosts = allPosts.concat(data);
    const totalPages = parseInt(headers["x-wp-totalpages"] || "1", 10);
    hasMore = page < totalPages;
    page++;
  }

  console.log(`Found ${allPosts.length} published posts\n`);

  let migrated = 0;
  let skipped = 0;

  for (const wp of allPosts) {
    const title = stripHtml(wp.title.rendered);
    const slug = wp.slug;
    const content = htmlToMarkdown(wp.content.rendered);
    const excerpt = stripHtml(wp.excerpt.rendered).substring(0, 160);
    const publishedAt = wp.date_gmt ? new Date(wp.date_gmt + "Z").toISOString() : null;

    // Map category IDs to names
    const catIds = wp.categories || [];
    const category = catIds.length > 0 && categoryMap[catIds[0]]
      ? categoryMap[catIds[0]]
      : "GTM Strategy";

    // Check for featured image
    let featuredImage = "";
    if (wp.featured_media && wp.featured_media > 0) {
      try {
        const { data: media } = await fetchJSON(
          `${wpUrl}/wp-json/wp/v2/media/${wp.featured_media}`,
          authHeader
        );
        featuredImage = media.source_url || "";
      } catch {
        // No featured image
      }
    }

    // Check if already exists
    const { data: existing } = await supabase
      .from("posts")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();

    if (existing) {
      console.log(`  SKIP: "${title}" (slug exists)`);
      skipped++;
      continue;
    }

    // Insert
    const { error } = await supabase.from("posts").insert({
      title,
      slug,
      content,
      excerpt,
      meta_description: excerpt,
      category,
      featured_image: featuredImage,
      status: "published",
      published_at: publishedAt,
      author: "Oloye Adeosun",
    });

    if (error) {
      console.log(`  ERROR: "${title}" — ${error.message}`);
    } else {
      console.log(`  OK: "${title}"`);
      migrated++;
    }
  }

  console.log(`\nDone. Migrated: ${migrated}, Skipped: ${skipped}, Total: ${allPosts.length}`);
}

main().catch(console.error);
