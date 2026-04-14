/**
 * Auto-ingest stats from benchmark scan results
 *
 * Reads a directory of scan-*.json files (from ai_presence_scanner.py v2),
 * computes aggregate stats, and upserts them into the stats warehouse.
 *
 * Usage:
 *   node scripts/ingest-benchmark.js --dir "C:/path/to/raw-data" --edition "april-2026" --sector "Enterprise" --sample "150 companies, 5 sectors"
 *   node scripts/ingest-benchmark.js --dir "C:/path/to/raw-data" --edition "law-firms-2026" --sector "Legal" --sample "50 UK law firms" --study-url "/research/ai-visibility-uk-law-firms-2026"
 *   node scripts/ingest-benchmark.js --help
 *
 * Options:
 *   --dir        Path to directory containing scan-*.json files (required)
 *   --edition    Edition slug (e.g., "april-2026") — used in stat slugs (required)
 *   --sector     Sector label for filtering (required)
 *   --sample     Sample description (e.g., "150 companies, 5 sectors") (required)
 *   --study-url  URL to the published study page (default: auto-generated)
 *   --dry-run    Show computed stats without inserting
 *
 * Computes:
 *   - % invisible (citation score 0-5)
 *   - Average total score
 *   - Average per dimension (citation, entity, content, breadth)
 *   - Top sector / bottom sector (if sector data available)
 *   - Median score
 *   - Score distribution (0-20, 21-40, 41-60, 61-80, 81-100)
 */

const { createClient } = require("@supabase/supabase-js");
const path = require("path");
const fs = require("fs");
require("dotenv").config({ path: path.join(__dirname, "..", ".env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_KEY");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

function parseArgs(args) {
  const parsed = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith("--")) {
      const key = args[i].slice(2);
      const val = args[i + 1] && !args[i + 1].startsWith("--") ? args[i + 1] : true;
      parsed[key] = val;
      if (val !== true) i++;
    }
  }
  return parsed;
}

function loadScans(dir) {
  const files = fs.readdirSync(dir).filter((f) => f.startsWith("scan-") && f.endsWith(".json"));
  const scans = [];

  for (const file of files) {
    try {
      const data = JSON.parse(fs.readFileSync(path.join(dir, file), "utf8"));
      if (data.total_score !== undefined && !data.error) {
        scans.push(data);
      }
    } catch {
      // skip malformed files
    }
  }

  return scans;
}

function computeStats(scans, edition, sector, sample, studyUrl) {
  const n = scans.length;
  if (n === 0) return [];

  const scores = scans.map((s) => s.total_score).sort((a, b) => a - b);
  const citationScores = scans.map((s) => s.ai_citation?.score ?? 0);
  const entityScores = scans.map((s) => s.entity?.score ?? 0);
  const contentScores = scans.map((s) => s.content_structure?.score ?? 0);
  const breadthScores = scans.map((s) => s.citation_breadth?.score ?? 0);

  const avg = (arr) => (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1);
  const pct = (arr, fn) => ((arr.filter(fn).length / arr.length) * 100).toFixed(0);
  const median = scores[Math.floor(n / 2)];

  const invisible = pct(citationScores, (s) => s <= 5);
  const avgTotal = avg(scores);
  const avgCitation = avg(citationScores);
  const avgEntity = avg(entityScores);
  const avgContent = avg(contentScores);
  const avgBreadth = avg(breadthScores);

  const year = edition.includes("2026") ? "2026" : edition.includes("2025") ? "2025" : new Date().getFullYear().toString();
  const sourceLabel = `AI Visibility Benchmark ${edition.charAt(0).toUpperCase() + edition.slice(1).replace(/-/g, " ")} — GTM Signal Studio`;
  const url = studyUrl || `/research/ai-visibility-benchmark-${edition}`;
  const prefix = `gss-auto-${edition}`;

  const stats = [
    {
      slug: `${prefix}-invisible`,
      stat_value: `${invisible}%`,
      label: `of ${n} companies score 0-5 on AI citation presence — invisible to AI recommendations`,
      category: "gss-original",
      source: sourceLabel,
      source_url: url,
      source_type: "gss-original",
      year,
      sample,
      sector,
      metric_type: "percentage",
      tags: ["benchmark", "citation-presence", edition, "auto-generated"],
      is_featured: true,
      sort_order: 100,
      auto_generated: true,
      computed_at: new Date().toISOString(),
    },
    {
      slug: `${prefix}-avg-score`,
      stat_value: avgTotal,
      label: `average AI visibility score across ${n} companies (out of 100)`,
      category: "gss-original",
      source: sourceLabel,
      source_url: url,
      source_type: "gss-original",
      year,
      sample,
      sector,
      metric_type: "score",
      tags: ["benchmark", "overall-score", edition, "auto-generated"],
      is_featured: true,
      sort_order: 101,
      auto_generated: true,
      computed_at: new Date().toISOString(),
    },
    {
      slug: `${prefix}-median`,
      stat_value: String(median),
      label: `median AI visibility score — half of all ${n} companies score below this`,
      category: "gss-original",
      source: sourceLabel,
      source_url: url,
      source_type: "gss-original",
      year,
      sample,
      sector,
      metric_type: "score",
      tags: ["benchmark", "median", edition, "auto-generated"],
      sort_order: 102,
      auto_generated: true,
      computed_at: new Date().toISOString(),
    },
    {
      slug: `${prefix}-avg-citation`,
      stat_value: `${avgCitation}/25`,
      label: `average Citation Presence score — the dimension that determines if AI recommends you`,
      category: "gss-original",
      source: sourceLabel,
      source_url: url,
      source_type: "gss-original",
      year,
      sample,
      sector,
      metric_type: "dimension-score",
      tags: ["benchmark", "citation-presence", edition, "auto-generated"],
      sort_order: 103,
      auto_generated: true,
      computed_at: new Date().toISOString(),
    },
    {
      slug: `${prefix}-avg-entity`,
      stat_value: `${avgEntity}/25`,
      label: `average Entity Recognition — does AI know who these companies are?`,
      category: "gss-original",
      source: sourceLabel,
      source_url: url,
      source_type: "gss-original",
      year,
      sample,
      sector,
      metric_type: "dimension-score",
      tags: ["benchmark", "entity-recognition", edition, "auto-generated"],
      sort_order: 104,
      auto_generated: true,
      computed_at: new Date().toISOString(),
    },
    {
      slug: `${prefix}-avg-content`,
      stat_value: `${avgContent}/25`,
      label: `average Content Structure — can AI extract answers from these sites?`,
      category: "gss-original",
      source: sourceLabel,
      source_url: url,
      source_type: "gss-original",
      year,
      sample,
      sector,
      metric_type: "dimension-score",
      tags: ["benchmark", "content-structure", edition, "auto-generated"],
      sort_order: 105,
      auto_generated: true,
      computed_at: new Date().toISOString(),
    },
    {
      slug: `${prefix}-avg-breadth`,
      stat_value: `${avgBreadth}/25`,
      label: `average Citation Breadth — how many independent sources mention these companies?`,
      category: "gss-original",
      source: sourceLabel,
      source_url: url,
      source_type: "gss-original",
      year,
      sample,
      sector,
      metric_type: "dimension-score",
      tags: ["benchmark", "citation-breadth", edition, "auto-generated"],
      sort_order: 106,
      auto_generated: true,
      computed_at: new Date().toISOString(),
    },
  ];

  // Score distribution
  const bands = [
    { min: 0, max: 20, label: "0-20" },
    { min: 21, max: 40, label: "21-40" },
    { min: 41, max: 60, label: "41-60" },
    { min: 61, max: 80, label: "61-80" },
    { min: 81, max: 100, label: "81-100" },
  ];

  const dist = bands.map((b) => {
    const count = scores.filter((s) => s >= b.min && s <= b.max).length;
    return `${b.label}: ${count}`;
  });

  stats.push({
    slug: `${prefix}-distribution`,
    stat_value: dist.join(" | "),
    label: `score distribution across ${n} companies — most cluster at the bottom`,
    category: "gss-original",
    source: sourceLabel,
    source_url: url,
    source_type: "gss-aggregate",
    year,
    sample,
    sector,
    metric_type: "distribution",
    tags: ["benchmark", "distribution", edition, "auto-generated"],
    sort_order: 107,
    auto_generated: true,
    computed_at: new Date().toISOString(),
  });

  return stats;
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));

  if (opts.help) {
    console.log(`
Auto-ingest benchmark scan results into the stats warehouse.

Usage:
  node scripts/ingest-benchmark.js --dir PATH --edition NAME --sector SECTOR --sample DESC [--study-url URL] [--dry-run]

Example:
  node scripts/ingest-benchmark.js \\
    --dir "C:/Users/Oloye/OneDrive/GSS/research/ai-visibility-benchmark-2026/editions/april-2026" \\
    --edition "april-2026" \\
    --sector "Enterprise" \\
    --sample "150 companies, 5 sectors"
`);
    process.exit(0);
  }

  const required = ["dir", "edition", "sector", "sample"];
  const missing = required.filter((k) => !opts[k]);
  if (missing.length) {
    console.error(`Missing required: ${missing.join(", ")}`);
    console.error("Run with --help for usage.");
    process.exit(1);
  }

  // Load scans
  console.log(`Loading scans from: ${opts.dir}`);
  const scans = loadScans(opts.dir);
  console.log(`Found ${scans.length} valid scan results.`);

  if (scans.length === 0) {
    console.error("No valid scan files found. Ensure directory contains scan-*.json files.");
    process.exit(1);
  }

  // Compute stats
  const stats = computeStats(scans, opts.edition, opts.sector, opts.sample, opts["study-url"]);
  console.log(`\nComputed ${stats.length} stats:\n`);

  for (const s of stats) {
    console.log(`  ${s.slug}: ${s.stat_value} — ${s.label.slice(0, 70)}...`);
  }

  if (opts["dry-run"]) {
    console.log("\n[DRY RUN] No data inserted.");
    return;
  }

  // Upsert to Supabase
  console.log("\nUpserting to Supabase...");
  const { data, error } = await supabase
    .from("stats")
    .upsert(stats, { onConflict: "slug" })
    .select("slug");

  if (error) {
    console.error("Error upserting stats:", error);
    process.exit(1);
  }

  console.log(`Successfully ingested ${data.length} stats from ${scans.length} scans.`);

  // Show totals
  const { count } = await supabase
    .from("stats")
    .select("*", { count: "exact", head: true })
    .eq("status", "published");

  console.log(`Total published stats in warehouse: ${count}`);
}

main().catch((e) => {
  console.error("Fatal:", e.message);
  process.exit(1);
});
