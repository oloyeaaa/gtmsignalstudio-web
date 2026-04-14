/**
 * Stats Data Warehouse — Admin CLI
 *
 * Usage:
 *   node scripts/manage-stats.js add --slug "ext-new-stat" --value "75%" --label "description" --category "ai-adoption" --source "Source Name" --year "2026"
 *   node scripts/manage-stats.js update --slug "ext-new-stat" --value "78%" --label "updated description"
 *   node scripts/manage-stats.js archive --slug "ext-new-stat"
 *   node scripts/manage-stats.js restore --slug "ext-new-stat"
 *   node scripts/manage-stats.js list [--category gss-original] [--status published]
 *   node scripts/manage-stats.js categories
 *   node scripts/manage-stats.js add-category --id "new-cat" --title "New Category" --description "Description" --sort-order 7
 *   node scripts/manage-stats.js count
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_KEY in .env.local
 */

const { createClient } = require("@supabase/supabase-js");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_KEY in .env.local");
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

async function addStat(opts) {
  const required = ["slug", "value", "label", "category", "source", "year"];
  const missing = required.filter((k) => !opts[k]);
  if (missing.length) {
    console.error(`Missing required fields: ${missing.join(", ")}`);
    console.error("Usage: add --slug X --value X --label X --category X --source X --year X [--source-url X] [--source-type X] [--sample X] [--sector X] [--tags a,b,c] [--featured] [--sort-order N]");
    process.exit(1);
  }

  const record = {
    slug: opts.slug,
    stat_value: opts.value,
    label: opts.label,
    category: opts.category,
    source: opts.source,
    year: opts.year,
    source_url: opts["source-url"] || null,
    source_type: opts["source-type"] || "external",
    sample: opts.sample || null,
    sector: opts.sector || null,
    metric_type: opts["metric-type"] || null,
    tags: opts.tags ? opts.tags.split(",") : [],
    is_featured: opts.featured === true || opts.featured === "true",
    sort_order: parseInt(opts["sort-order"]) || 0,
    methodology_note: opts["methodology-note"] || null,
  };

  const { data, error } = await supabase
    .from("stats")
    .upsert(record, { onConflict: "slug" })
    .select("slug, stat_value, label, category");

  if (error) {
    console.error("Error adding stat:", error.message);
    process.exit(1);
  }

  console.log(`Added/updated: ${data[0].slug} → "${data[0].stat_value}" (${data[0].category})`);
}

async function updateStat(opts) {
  if (!opts.slug) {
    console.error("Usage: update --slug X [--value X] [--label X] [--source X] [--year X] [--source-url X] [--tags X] [--featured] [--sort-order N]");
    process.exit(1);
  }

  const updates = {};
  if (opts.value) updates.stat_value = opts.value;
  if (opts.label) updates.label = opts.label;
  if (opts.source) updates.source = opts.source;
  if (opts.year) updates.year = opts.year;
  if (opts["source-url"]) updates.source_url = opts["source-url"];
  if (opts["source-type"]) updates.source_type = opts["source-type"];
  if (opts.sample) updates.sample = opts.sample;
  if (opts.sector) updates.sector = opts.sector;
  if (opts.tags) updates.tags = opts.tags.split(",");
  if (opts.featured !== undefined) updates.is_featured = opts.featured === true || opts.featured === "true";
  if (opts["sort-order"]) updates.sort_order = parseInt(opts["sort-order"]);

  if (Object.keys(updates).length === 0) {
    console.error("No fields to update. Provide at least one --field value.");
    process.exit(1);
  }

  const { data, error } = await supabase
    .from("stats")
    .update(updates)
    .eq("slug", opts.slug)
    .select("slug, stat_value, label");

  if (error) {
    console.error("Error updating stat:", error.message);
    process.exit(1);
  }

  if (!data.length) {
    console.error(`No stat found with slug "${opts.slug}"`);
    process.exit(1);
  }

  console.log(`Updated: ${data[0].slug} → "${data[0].stat_value}"`);
}

async function archiveStat(opts) {
  if (!opts.slug) {
    console.error("Usage: archive --slug X");
    process.exit(1);
  }

  const { data, error } = await supabase
    .from("stats")
    .update({ status: "archived" })
    .eq("slug", opts.slug)
    .select("slug, stat_value");

  if (error) {
    console.error("Error archiving stat:", error.message);
    process.exit(1);
  }

  if (!data.length) {
    console.error(`No stat found with slug "${opts.slug}"`);
    process.exit(1);
  }

  console.log(`Archived: ${data[0].slug} ("${data[0].stat_value}")`);
}

async function restoreStat(opts) {
  if (!opts.slug) {
    console.error("Usage: restore --slug X");
    process.exit(1);
  }

  const { data, error } = await supabase
    .from("stats")
    .update({ status: "published" })
    .eq("slug", opts.slug)
    .select("slug, stat_value");

  if (error) {
    console.error("Error restoring stat:", error.message);
    process.exit(1);
  }

  if (!data.length) {
    console.error(`No stat found with slug "${opts.slug}"`);
    process.exit(1);
  }

  console.log(`Restored: ${data[0].slug} ("${data[0].stat_value}")`);
}

async function listStats(opts) {
  let query = supabase
    .from("stats")
    .select("slug, stat_value, label, category, source_type, year, status, is_featured, sort_order")
    .order("category")
    .order("sort_order");

  if (opts.category) query = query.eq("category", opts.category);
  if (opts.status) query = query.eq("status", opts.status);
  else query = query.eq("status", "published");

  const { data, error } = await query;

  if (error) {
    console.error("Error listing stats:", error.message);
    process.exit(1);
  }

  console.log(`\n${data.length} stats found:\n`);
  let currentCategory = "";
  for (const s of data) {
    if (s.category !== currentCategory) {
      currentCategory = s.category;
      console.log(`\n  [${currentCategory}]`);
    }
    const feat = s.is_featured ? " ★" : "";
    console.log(`    ${s.slug} → ${s.stat_value} | ${s.label.slice(0, 60)}...${feat}`);
  }
  console.log();
}

async function listCategories() {
  const { data, error } = await supabase
    .from("stat_categories")
    .select("*")
    .order("sort_order");

  if (error) {
    console.error("Error listing categories:", error.message);
    process.exit(1);
  }

  console.log(`\n${data.length} categories:\n`);
  for (const c of data) {
    const gss = c.is_gss ? " [GSS]" : "";
    console.log(`  ${c.sort_order}. ${c.id} — "${c.title}"${gss} (${c.status})`);
  }
  console.log();
}

async function addCategory(opts) {
  const required = ["id", "title", "description"];
  const missing = required.filter((k) => !opts[k]);
  if (missing.length) {
    console.error(`Missing: ${missing.join(", ")}`);
    console.error("Usage: add-category --id X --title X --description X [--sort-order N] [--is-gss]");
    process.exit(1);
  }

  const record = {
    id: opts.id,
    title: opts.title,
    description: opts.description,
    sort_order: parseInt(opts["sort-order"]) || 0,
    is_gss: opts["is-gss"] === true || opts["is-gss"] === "true",
  };

  const { data, error } = await supabase
    .from("stat_categories")
    .upsert(record, { onConflict: "id" })
    .select("id, title");

  if (error) {
    console.error("Error adding category:", error.message);
    process.exit(1);
  }

  console.log(`Added/updated category: ${data[0].id} — "${data[0].title}"`);
}

async function showCount() {
  const { count: total } = await supabase
    .from("stats")
    .select("*", { count: "exact", head: true });

  const { count: published } = await supabase
    .from("stats")
    .select("*", { count: "exact", head: true })
    .eq("status", "published");

  const { count: featured } = await supabase
    .from("stats")
    .select("*", { count: "exact", head: true })
    .eq("is_featured", true)
    .eq("status", "published");

  const { count: gss } = await supabase
    .from("stats")
    .select("*", { count: "exact", head: true })
    .eq("source_type", "gss-original")
    .eq("status", "published");

  const { count: catCount } = await supabase
    .from("stat_categories")
    .select("*", { count: "exact", head: true })
    .eq("status", "published");

  console.log(`\nStats Warehouse Summary:`);
  console.log(`  Total:      ${total}`);
  console.log(`  Published:  ${published}`);
  console.log(`  Featured:   ${featured}`);
  console.log(`  GSS Original: ${gss}`);
  console.log(`  Categories: ${catCount}\n`);
}

// --- Main ---

const [, , command, ...rest] = process.argv;
const opts = parseArgs(rest);

const commands = {
  add: () => addStat(opts),
  update: () => updateStat(opts),
  archive: () => archiveStat(opts),
  restore: () => restoreStat(opts),
  list: () => listStats(opts),
  categories: () => listCategories(),
  "add-category": () => addCategory(opts),
  count: () => showCount(),
};

if (!command || !commands[command]) {
  console.log(`
Stats Data Warehouse CLI

Commands:
  add             Add a new stat (upsert on slug)
  update          Update fields on an existing stat
  archive         Archive a stat (hide from public)
  restore         Restore an archived stat
  list            List stats [--category X] [--status X]
  categories      List all categories
  add-category    Add a new category
  count           Show warehouse summary

Examples:
  node scripts/manage-stats.js add --slug "ext-new-stat" --value "75%" --label "of buyers do X" --category "ai-adoption" --source "Source" --year "2026"
  node scripts/manage-stats.js update --slug "ext-new-stat" --value "78%"
  node scripts/manage-stats.js archive --slug "ext-new-stat"
  node scripts/manage-stats.js list --category gss-original
  node scripts/manage-stats.js count
`);
  process.exit(0);
}

commands[command]().catch((e) => {
  console.error("Error:", e.message);
  process.exit(1);
});
