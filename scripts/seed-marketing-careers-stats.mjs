/**
 * Seed the UK marketing careers stats into Supabase.
 *
 * Reads src/data/uk-marketing-careers-stats.json and writes:
 *   1. one row into `stat_categories`  (marketing-careers)
 *   2. ~28 rows into `stats`
 *
 * SAFE BY DEFAULT. It runs as a dry run and writes nothing unless you pass --commit.
 * New stats are inserted as `draft` unless you also pass --publish, so nothing appears on
 * the live site until it has been looked at.
 *
 *   node scripts/seed-marketing-careers-stats.mjs                  # dry run, shows the plan
 *   node scripts/seed-marketing-careers-stats.mjs --commit         # write, as drafts
 *   node scripts/seed-marketing-careers-stats.mjs --commit --publish
 *
 * Re-running is safe: rows are matched on (category, label) and updated rather than
 * duplicated.
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { config } from "dotenv";

const here = dirname(fileURLToPath(import.meta.url));
config({ path: join(here, "..", ".env.local") });

const COMMIT = process.argv.includes("--commit");
const PUBLISH = process.argv.includes("--publish");
const STATUS = PUBLISH ? "published" : "draft";

const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_KEY;
if (!url || !key) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_KEY in .env.local");
  process.exit(1);
}

const data = JSON.parse(
  readFileSync(join(here, "..", "src", "data", "uk-marketing-careers-stats.json"), "utf8")
);
const { category, stats } = data;

console.log("");
console.log("  UK marketing careers -> GSS stats database");
console.log("  " + "-".repeat(58));
console.log("  category :", category.id, "|", category.title);
console.log("  stats    :", stats.length, "rows");
console.log("  featured :", stats.filter((s) => s.is_featured).length);
console.log("  status   :", STATUS);
console.log("  mode     :", COMMIT ? "COMMIT (writing)" : "DRY RUN (writing nothing)");
console.log("");

const bySource = stats.reduce((a, s) => ((a[s.source_type] = (a[s.source_type] || 0) + 1), a), {});
console.log("  by source type:", bySource);
console.log("");
stats.forEach((s, i) => {
  console.log(
    `  ${String(i + 1).padStart(2)}. ${String(s.stat_value).padEnd(22)} ${s.label.slice(0, 74)}${s.label.length > 74 ? "…" : ""}`
  );
});
console.log("");

if (!COMMIT) {
  console.log("  Dry run. Nothing written. Re-run with --commit to write as drafts.");
  process.exit(0);
}

const db = createClient(url, key, { auth: { persistSession: false } });

// Read one existing row so we only write columns the table actually has, and so a missing
// NOT NULL column shows up here rather than halfway through a write.
const { data: probe, error: probeErr } = await db.from("stats").select("*").limit(1);
if (probeErr) {
  console.error("  could not read the stats table:", probeErr.message);
  process.exit(1);
}
const COLUMNS = probe && probe[0] ? Object.keys(probe[0]) : null;
if (COLUMNS) console.log("  table columns:", COLUMNS.join(", "), "\n");

/**
 * Source URLs, matched on a substring of the source string. A stat without a link is a stat
 * nobody can check, and this site's whole promise is "cite the source, not the summary".
 */
const SOURCE_URLS = [
  ["IT Jobs Watch", "https://www.itjobswatch.co.uk/"],
  ["Ashdown", "https://www.ashdowngroup.com/salary-guide/marketing"],
  ["Robert Half", "https://www.roberthalf.com/gb/en/insights/salary-guide/marketing-and-creative"],
  ["Marketing Week Career & Salary Survey", "https://www.marketingweek.com/average-marketing-salaries-down-2026/"],
  ["Marketing Week, 23 January 2026", "https://www.marketingweek.com/job-market-mid-level-marketers-2026/"],
  ["via Marketing Week", "https://www.marketingweek.com/job-market-mid-level-marketers-2026/"],
  ["IPA 2025 Agency Census", "https://www.research-live.com/article/news/uk-advertising-industry-headcount-declines-finds-ipa-census/id/5146843"],
  ["Michael Page", "https://www.michaelpage.co.uk/recruitment-expertise/management-advice/uk-marketing-salary-and-hiring-trends"],
  ["Product Marketing Alliance", "https://www.productmarketingalliance.com/"],
  ["Campaign Live", "https://www.campaignlive.co.uk/article/job-description-campaign-manager/1381285"],
  ["Indeed UK", "https://uk.indeed.com/career-advice/finding-a-job/what-campaign-manager-do"],
];
function sourceUrl(source) {
  const hit = SOURCE_URLS.find(([k]) => source.includes(k));
  return hit ? hit[1] : null;
}

/** How the figure was arrived at, so a reader can judge it rather than just trust it. */
const METHOD = {
  "gss-original": "GTM Signal Studio analysis. Derived by checking the named sources directly rather than repeating a summary of them.",
  "gss-aggregate": "Combined by GTM Signal Studio from the named sources. The underlying figures are theirs; the comparison is ours.",
  external: "Reported by the named source. Read at source and not taken from a search summary or secondary write-up.",
};

/** URL-safe slug, unique per row, so the table's NOT NULL slug is satisfied. */
function slugify(value, label, i) {
  const base = `${value} ${label}`
    .toLowerCase()
    .replace(/£/g, "gbp-")
    .replace(/%/g, "-pct")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 70)
    .replace(/-+$/g, "");
  return `mc-${String(i + 1).padStart(2, "0")}-${base}`;
}

// 1. the category
{
  const { error } = await db
    .from("stat_categories")
    .upsert({ ...category }, { onConflict: "id" });
  if (error) {
    console.error("  category failed:", error.message);
    process.exit(1);
  }
  console.log("  category upserted:", category.id);
}

// 2. the stats, matched on (category, label) so a re-run updates rather than duplicates
let inserted = 0;
let updated = 0;
for (const [i, s] of stats.entries()) {
  const row = {
    slug: slugify(s.stat_value, s.label, i),
    stat_value: s.stat_value,
    label: s.label,
    source: s.source,
    source_url: sourceUrl(s.source),
    methodology_note: METHOD[s.source_type] || null,
    metric_type: s.metric_type || null,
    source_type: s.source_type,
    category: category.id,
    year: s.year,
    tags: s.tags,
    is_featured: !!s.is_featured,
    status: STATUS,
    sort_order: (i + 1) * 10,
  };

  // Drop anything this table does not have, so the script survives schema differences.
  if (COLUMNS) for (const k of Object.keys(row)) if (!COLUMNS.includes(k)) delete row[k];

  const { data: existing, error: findErr } = await db
    .from("stats")
    .select("id")
    .eq("slug", row.slug)
    .maybeSingle();
  if (findErr) {
    console.error(`  lookup failed on row ${i + 1}:`, findErr.message);
    process.exit(1);
  }

  if (existing) {
    const { error } = await db.from("stats").update(row).eq("id", existing.id);
    if (error) {
      console.error(`  update failed on row ${i + 1}:`, error.message);
      process.exit(1);
    }
    updated++;
  } else {
    const { error } = await db.from("stats").insert(row);
    if (error) {
      console.error(`  insert failed on row ${i + 1}:`, error.message);
      process.exit(1);
    }
    inserted++;
  }
}

console.log("");
console.log(`  done. ${inserted} inserted, ${updated} updated, all as ${STATUS}.`);
console.log("  check them at /research/stats and via /api/stats?category=marketing-careers");
console.log("");
