/**
 * GSS Blog Loop delivery adapter — Airtable "Blog" table -> Supabase `posts` table.
 *
 * Clones the shape of the oloye.co.uk Blog Loop (see .claude/commands/blog-draft.md,
 * sync-client-schema.md, post.md, kill-draft.md), but swaps the DELIVERY step:
 * instead of writing a Draft record into an Airtable Blog table for a human/agent
 * to review inside Airtable, this script reads Draft rows FROM the tenant's
 * Airtable Blog table and upserts them into this repo's Supabase `posts` table
 * (as Supabase status "draft", never "published" — publishing to the live site
 * stays a separate, explicit step, same as /post does for the Airtable-native flow).
 *
 * Tenant config: scripts/gss-tenant.config.json (same base/table/field-ID shape as
 * C:/Users/Oloye/.claude/clients/oloye.json — see docs/blog-pipeline.md).
 *
 * Usage:
 *   node scripts/publish-from-airtable.js --dry-run
 *   node scripts/publish-from-airtable.js --dry-run --status Draft
 *   node scripts/publish-from-airtable.js                # real upsert (requires real config IDs)
 *   node scripts/publish-from-airtable.js --config scripts/gss-tenant.config.json
 *
 * Env vars (names only, read from .env.local / GSS config/.env — never hardcode values):
 *   NEXT_PUBLIC_SUPABASE_URL   - Supabase project URL
 *   SUPABASE_SERVICE_KEY       - Supabase service-role key (write access, bypasses RLS)
 *   AIRTABLE_TOKEN             - Airtable personal access token (read access to the Blog table)
 */

const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

// ── Load env (same hand-rolled loader convention as scripts/publish-post.js) ──

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
const gssEnv = loadEnv(path.join(__dirname, "..", "..", "GSS", "config", ".env"));

const SUPABASE_URL = localEnv.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = localEnv.SUPABASE_SERVICE_KEY;
const AIRTABLE_TOKEN = gssEnv.AIRTABLE_TOKEN;

// ── CLI args ────────────────────────────────────────────────────────────────

function getArg(flag, fallback = null) {
  const idx = process.argv.indexOf(flag);
  return idx !== -1 ? process.argv[idx + 1] : fallback;
}

const configPath = path.resolve(
  getArg("--config", path.join(__dirname, "gss-tenant.config.json"))
);
const statusFilter = getArg("--status", "Draft");
const limitArg = getArg("--limit");
const dryRun = process.argv.includes("--dry-run");

// ── Load tenant config ─────────────────────────────────────────────────────

function loadConfig(configFile) {
  if (!fs.existsSync(configFile)) {
    console.error(`Tenant config not found: ${configFile}`);
    process.exit(1);
  }
  const config = JSON.parse(fs.readFileSync(configFile, "utf-8"));
  const placeholders = [];
  const walk = (obj, trail) => {
    for (const [key, value] of Object.entries(obj)) {
      const nextTrail = `${trail}.${key}`;
      if (typeof value === "string" && value.startsWith("TODO")) {
        placeholders.push(nextTrail);
      } else if (value && typeof value === "object" && !Array.isArray(value)) {
        walk(value, nextTrail);
      }
    }
  };
  walk(config, config.slug || "config");
  return { config, placeholders };
}

// ── Airtable read (REST API, no SDK — matches publish-post.js's raw-https style) ──

async function fetchAirtableDraftRows(config, status, limit) {
  const { baseId, blog } = config.airtable;
  const tableId = blog.tableId;
  const url = new URL(`https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableId)}`);
  url.searchParams.set("filterByFormula", `{Status} = "${status}"`);
  if (limit) url.searchParams.set("maxRecords", String(limit));

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}` },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Airtable fetch failed: ${res.status} ${body.slice(0, 300)}`);
  }

  const data = await res.json();
  return data.records || [];
}

// ── Mapping: Airtable Blog row -> Supabase posts row ───────────────────────

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function wordCount(text) {
  return (text || "").split(/\s+/).filter(Boolean).length;
}

function readingTime(text) {
  return Math.max(1, Math.ceil(wordCount(text) / 200));
}

function mapRecordToPost(record, config) {
  const f = record.fields || {};
  const title = f.Title || "Untitled";
  const slug = f.Slug ? slugify(f.Slug) : slugify(title);
  const content = f.Body || "";
  const category = config.supabase.validCategories.includes(f.Category)
    ? f.Category
    : config.supabase.defaultCategory;

  return {
    title,
    slug,
    content,
    excerpt: f.Excerpt || "",
    meta_description: f["Meta Description"] || f.Excerpt || "",
    category,
    tags: Array.isArray(f.Tags) ? f.Tags : f.Tags ? [f.Tags] : [],
    featured_image: f["Cover Image"]?.[0]?.url || f["Cover Image"] || "",
    og_image: f["Cover Image"]?.[0]?.url || f["Cover Image"] || "",
    status: config.supabase.deliveryStatus || "draft",
    author: config.supabase.defaultAuthor,
    reading_time: readingTime(content),
    _airtableRecordId: record.id,
  };
}

// ── Main ─────────────────────────────────────────────────────────────────

async function main() {
  console.log("\nGSS Blog Loop adapter — Airtable Blog -> Supabase posts\n");

  const { config, placeholders } = loadConfig(configPath);
  console.log(`Tenant config: ${configPath}`);

  if (placeholders.length) {
    console.log(
      `Config has ${placeholders.length} unresolved TODO placeholder(s): ${placeholders.join(", ")}`
    );
    if (!dryRun) {
      console.error(
        "\nRefusing to run a real upsert against a config with TODO placeholders. " +
          "Resolve the Airtable base/table IDs first (see docs/blog-pipeline.md), or pass --dry-run."
      );
      process.exit(1);
    }
    console.log("(Continuing in --dry-run mode with placeholder config — no network calls will be made.)\n");
  }

  let rows = [];

  if (placeholders.length && dryRun) {
    // No real Airtable table to hit yet — show the shape dry-run would produce
    // against sample placeholder data instead of calling out to Airtable.
    rows = [
      {
        id: "recEXAMPLE00000001",
        fields: {
          Title: "Example GSS Draft Post",
          Slug: "example-gss-draft-post",
          Status: statusFilter,
          Excerpt: "Placeholder excerpt — real Airtable table not yet configured.",
          Body: "Placeholder body content.",
          Category: config.supabase.defaultCategory,
        },
      },
    ];
    console.log("Using a sample placeholder row (real Airtable base/table not configured yet).\n");
  } else {
    if (!AIRTABLE_TOKEN) {
      console.error("Missing AIRTABLE_TOKEN (expected in ../GSS/config/.env)");
      process.exit(1);
    }
    console.log(`Fetching Airtable rows with Status = "${statusFilter}"...`);
    rows = await fetchAirtableDraftRows(config, statusFilter, limitArg);
    console.log(`Found ${rows.length} row(s).\n`);
  }

  if (!rows.length) {
    console.log("Nothing to publish. Exiting.");
    return;
  }

  const posts = rows.map((r) => mapRecordToPost(r, config));

  if (dryRun) {
    console.log("DRY RUN — no Supabase writes will be made. Would upsert:\n");
    for (const p of posts) {
      console.log(`  - "${p.title}"  ->  /blog/${p.slug}  (category: ${p.category}, status: ${p.status})`);
    }
    console.log(`\n${posts.length} post(s) would be upserted into Supabase \`posts\` (onConflict: slug).`);
    console.log("Remove --dry-run to write for real (requires a resolved, non-placeholder config).");
    return;
  }

  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_KEY in .env.local");
    process.exit(1);
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

  console.log(`Upserting ${posts.length} post(s) into Supabase \`posts\`...\n`);

  for (const post of posts) {
    const { _airtableRecordId, ...record } = post;
    const { data, error } = await supabase
      .from("posts")
      .upsert([record], { onConflict: "slug" })
      .select("id, slug, title, status")
      .single();

    if (error) {
      console.error(`  FAILED "${post.title}" (${_airtableRecordId}): ${error.message}`);
      continue;
    }
    console.log(`  OK  "${data.title}" -> /blog/${data.slug} (status: ${data.status})`);
  }

  console.log("\nDone. These are Supabase status \"draft\" — publishing to the live site is a separate, explicit step.");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
