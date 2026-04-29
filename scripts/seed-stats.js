/**
 * Seed the stats data warehouse with existing hardcoded stats
 *
 * Usage:
 *   node scripts/seed-stats.js
 *
 * Requires SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY env vars
 * (reads from .env.local in project root)
 *
 * Idempotent — uses upsert on slug, safe to re-run.
 */

const { createClient } = require("@supabase/supabase-js");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_KEY");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// ---------- STAT DATA ----------
// Migrated from src/app/research/stats/page.tsx

const stats = [
  // ---- GSS Original Research ----
  {
    slug: "gss-invisible-81pct",
    stat_value: "81%",
    label: "of 150 B2B companies score 0-5 on AI citation presence — invisible to AI recommendations",
    category: "gss-original",
    source: "AI Visibility Benchmark April 2026 — GTM Signal Studio",
    source_url: "/research/ai-visibility-benchmark-april-2026",
    source_type: "gss-original",
    year: "2026",
    sample: "150 companies, 5 sectors",
    is_featured: true,
    sort_order: 1,
    tags: ["benchmark", "citation-presence", "april-2026"],
  },
  {
    slug: "gss-avg-score-28-7",
    stat_value: "28.7",
    label: "average AI visibility score across 150 companies (out of 100) — down from 82.2 at N=50",
    category: "gss-original",
    source: "AI Visibility Benchmark April 2026 — GTM Signal Studio",
    source_url: "/research/ai-visibility-benchmark-april-2026",
    source_type: "gss-original",
    year: "2026",
    sample: "150 companies, 5 sectors",
    is_featured: true,
    sort_order: 2,
    tags: ["benchmark", "overall-score", "april-2026"],
  },
  {
    slug: "gss-bottom10-it-services",
    stat_value: "10/10",
    label: "bottom 10 companies in the 150-company benchmark are all IT Services firms scoring 2/100",
    category: "gss-original",
    source: "AI Visibility Benchmark April 2026 — GTM Signal Studio",
    source_url: "/research/ai-visibility-benchmark-april-2026",
    source_type: "gss-original",
    year: "2026",
    sample: "150 companies, 5 sectors",
    sort_order: 3,
    tags: ["benchmark", "it-services", "april-2026"],
  },
  {
    slug: "gss-44pct-score-2-of-25",
    stat_value: "44%",
    label: "of enterprise B2B companies score 2/25 on AI citation presence",
    category: "gss-original",
    source: "AI Visibility Benchmark March 2026 — GTM Signal Studio",
    source_url: "/research/ai-visibility-benchmark-2026",
    source_type: "gss-original",
    year: "2026",
    sample: "50 companies, 5 sectors",
    sort_order: 4,
    tags: ["benchmark", "citation-presence", "march-2026"],
  },
  {
    slug: "gss-law-52pct-invisible",
    stat_value: "52%",
    label: "of UK law firms score 2/25 on AI citation presence — invisible to AI recommendations",
    category: "gss-original",
    source: "AI Visibility: UK Law Firms 2026 — GTM Signal Studio",
    source_url: "/research/ai-visibility-uk-law-firms-2026",
    source_type: "gss-original",
    year: "2026",
    sample: "50 UK law firms",
    is_featured: true,
    sort_order: 5,
    tags: ["benchmark", "law-firms", "citation-presence"],
  },
  {
    slug: "gss-3x-citation-gap",
    stat_value: "3x",
    label: "citation gap between SaaS (24.4/25) and IT Services (8.0/25) on AI citation presence",
    category: "gss-original",
    source: "AI Visibility Benchmark 2026 — GTM Signal Studio",
    source_url: "/research/ai-visibility-benchmark-2026",
    source_type: "gss-original",
    year: "2026",
    sample: "50 companies, 5 sectors",
    sort_order: 6,
    tags: ["benchmark", "sector-comparison", "march-2026"],
  },
  {
    slug: "gss-entity-23-4",
    stat_value: "23.4/25",
    label: "average Entity Recognition — AI knows who companies are but does not recommend them",
    category: "gss-original",
    source: "AI Visibility Benchmark 2026 — GTM Signal Studio",
    source_url: "/research/ai-visibility-benchmark-2026",
    source_type: "gss-original",
    year: "2026",
    sample: "50 companies",
    sort_order: 7,
    tags: ["benchmark", "entity-recognition", "march-2026"],
  },
  {
    slug: "gss-law-binary-split",
    stat_value: "0",
    label: "law firms scored in the 6-20 range on citation — the split is binary: cited or invisible",
    category: "gss-original",
    source: "AI Visibility: UK Law Firms 2026 — GTM Signal Studio",
    source_url: "/research/ai-visibility-uk-law-firms-2026",
    source_type: "gss-original",
    year: "2026",
    sample: "50 UK law firms",
    sort_order: 8,
    tags: ["benchmark", "law-firms", "citation-presence"],
  },
  {
    slug: "gss-law-21pt-gap",
    stat_value: "21 pts",
    label: "gap between cited (92.1) and uncited (70.7) law firms — driven entirely by citation presence",
    category: "gss-original",
    source: "AI Visibility: UK Law Firms 2026 — GTM Signal Studio",
    source_url: "/research/ai-visibility-uk-law-firms-2026",
    source_type: "gss-original",
    year: "2026",
    sample: "50 UK law firms",
    sort_order: 9,
    tags: ["benchmark", "law-firms", "score-gap"],
  },
  {
    slug: "gss-law-specialist-vs-generalist",
    stat_value: "93.5 vs 72.3",
    label: "specialist law firms outperform generalists on AI visibility — clear positioning wins",
    category: "gss-original",
    source: "AI Visibility: UK Law Firms 2026 — GTM Signal Studio",
    source_url: "/research/ai-visibility-uk-law-firms-2026",
    source_type: "gss-original",
    year: "2026",
    sample: "50 UK law firms",
    sort_order: 10,
    tags: ["benchmark", "law-firms", "positioning"],
  },
  {
    slug: "gss-law-content-paradox",
    stat_value: "22.9 vs 21.6",
    label: "uncited firms score HIGHER on content structure — proving site quality alone does not drive AI citation",
    category: "gss-original",
    source: "AI Visibility: UK Law Firms 2026 — GTM Signal Studio",
    source_url: "/research/ai-visibility-uk-law-firms-2026",
    source_type: "gss-original",
    year: "2026",
    sample: "50 UK law firms",
    sort_order: 11,
    tags: ["benchmark", "law-firms", "content-structure"],
  },

  // ---- AI Adoption in B2B Buying ----
  {
    slug: "ext-forrester-94pct-ai",
    stat_value: "94%",
    label: "of B2B buyers use AI in their buying process",
    category: "ai-adoption",
    source: "Forrester Buyers' Journey Survey",
    source_url: "https://www.forrester.com",
    source_type: "external",
    year: "2025",
    sample: "17,500 global buyers",
    is_featured: true,
    sort_order: 1,
    tags: ["ai-adoption", "forrester"],
  },
  {
    slug: "ext-treble-47pct-ai-first",
    stat_value: "47%",
    label: "of enterprise buyers now start vendor research with AI tools — ahead of Google (43%)",
    category: "ai-adoption",
    source: "Treble / Censuswide",
    source_url: "https://finance.yahoo.com/news/treble-report",
    source_type: "external",
    year: "2025",
    sample: "300 CIOs, CISOs, CTOs, VPs",
    is_featured: true,
    sort_order: 2,
    tags: ["ai-adoption", "search-shift"],
  },
  {
    slug: "ext-knewsearch-67pct-ai",
    stat_value: "67%",
    label: "of B2B buyers use AI search tools during purchase research — up from 24% in early 2024",
    category: "ai-adoption",
    source: "KnewSearch",
    source_url: "https://knewsearch.com/blog/ai-search-buyer-behavior-research-2026",
    source_type: "external",
    year: "2026",
    sort_order: 3,
    tags: ["ai-adoption", "growth"],
  },
  {
    slug: "ext-treble-93pct-compare",
    stat_value: "93%",
    label: "of enterprise buyers use AI to summarise or compare vendors during evaluation",
    category: "ai-adoption",
    source: "Treble / Censuswide",
    source_url: "https://finance.yahoo.com/news/treble-report",
    source_type: "external",
    year: "2025",
    sample: "300 enterprise tech buyers",
    sort_order: 4,
    tags: ["ai-adoption", "vendor-evaluation"],
  },
  {
    slug: "ext-magenta-66pct-uk",
    stat_value: "66%",
    label: "of UK senior decision-makers use AI tools for supplier research",
    category: "ai-adoption",
    source: "Magenta Associates",
    source_type: "external",
    year: "2025",
    sample: "300 UK senior professionals",
    sort_order: 5,
    tags: ["ai-adoption", "uk"],
  },

  // ---- Buying Journey ----
  {
    slug: "ext-6sense-95pct-day1",
    stat_value: "95%",
    label: "of winning vendors were already on the buyer's Day 1 shortlist",
    category: "buying-journey",
    source: "6sense Buyer Experience Report",
    source_url: "https://6sense.com/science-of-b2b/buyer-experience-report-2025/",
    source_type: "external",
    year: "2025",
    sample: "4,000 B2B buyers",
    is_featured: true,
    sort_order: 1,
    tags: ["shortlist", "day-1"],
  },
  {
    slug: "ext-6sense-77-80pct-win",
    stat_value: "77-80%",
    label: "win rate for the top-ranked vendor on the initial shortlist",
    category: "buying-journey",
    source: "6sense / Corporate Visions",
    source_url: "https://corporatevisions.com/blog/b2b-buying-behavior-statistics-trends/",
    source_type: "external",
    year: "2025",
    sample: "4,000 B2B buyers",
    sort_order: 2,
    tags: ["shortlist", "win-rate"],
  },
  {
    slug: "ext-6sense-4of5-day1",
    stat_value: "4 of 5",
    label: "shortlist spots are filled on Day 1 — before any vendor contact",
    category: "buying-journey",
    source: "6sense Buyer Experience Report",
    source_url: "https://6sense.com/science-of-b2b/buyer-experience-report-2025/",
    source_type: "external",
    year: "2025",
    sample: "4,000 B2B buyers",
    sort_order: 3,
    tags: ["shortlist", "day-1"],
  },
  {
    slug: "ext-forrester-57pct-more-vendors",
    stat_value: "57%",
    label: "of B2B buyers consider more or different vendors because of AI",
    category: "buying-journey",
    source: "Forrester Buyers' Journey Survey",
    source_url: "https://www.forrester.com",
    source_type: "external",
    year: "2025",
    sample: "17,500 global buyers",
    sort_order: 4,
    tags: ["ai-impact", "vendor-consideration"],
  },
  {
    slug: "ext-6sense-10-1mo-cycle",
    stat_value: "10.1 mo",
    label: "average B2B buying cycle — down from 11.3 months year-over-year",
    category: "buying-journey",
    source: "6sense Buyer Experience Report",
    source_url: "https://6sense.com/science-of-b2b/buyer-experience-report-2025/",
    source_type: "external",
    year: "2025",
    sample: "4,000 B2B buyers",
    sort_order: 5,
    tags: ["buying-cycle", "speed"],
  },
  {
    slug: "ext-gartner-67pct-rep-free",
    stat_value: "67%",
    label: "of B2B buyers prefer a rep-free buying experience",
    category: "buying-journey",
    source: "Gartner B2B Buyer Survey",
    source_url: "https://www.gartner.com",
    source_type: "external",
    year: "2025",
    sample: "646 buyers",
    sort_order: 6,
    tags: ["self-serve", "rep-free"],
  },

  // ---- AI vs Google ----
  {
    slug: "ext-seranking-14pct-overlap",
    stat_value: "14%",
    label: "URL overlap between AI Mode and Google's top 10 organic results",
    category: "ai-vs-google",
    source: "SE Ranking",
    source_url: "https://seranking.com/blog/ai-statistics/",
    source_type: "external",
    year: "2025",
    sort_order: 1,
    tags: ["search-divergence", "ai-mode"],
  },
  {
    slug: "ext-exposure-40pct-outside-top10",
    stat_value: "40%",
    label: "of AI Overview citations come from pages ranking OUTSIDE Google's top 10",
    category: "ai-vs-google",
    source: "Exposure Ninja",
    source_url: "https://exposureninja.com/blog/ai-search-statistics/",
    source_type: "external",
    year: "2025",
    sort_order: 2,
    tags: ["search-divergence", "ai-overview"],
  },
  {
    slug: "ext-knewsearch-3-2x-shortlist",
    stat_value: "3.2x",
    label: "more likely to be shortlisted if mentioned across all major AI platforms",
    category: "ai-vs-google",
    source: "KnewSearch",
    source_url: "https://knewsearch.com/blog/ai-search-buyer-behavior-research-2026",
    source_type: "external",
    year: "2026",
    sort_order: 3,
    tags: ["multi-platform", "shortlist"],
  },
  {
    slug: "ext-yext-37pct-start-ai",
    stat_value: "37%",
    label: "of consumers now start searches with AI instead of Google",
    category: "ai-vs-google",
    source: "Search Engine Land / Yext",
    source_url: "https://searchengineland.com",
    source_type: "external",
    year: "2026",
    sort_order: 4,
    tags: ["search-shift", "consumer"],
  },
  {
    slug: "ext-position-6-5x-third-party",
    stat_value: "6.5x",
    label: "more likely to be cited through third-party sources than your own domain",
    category: "ai-vs-google",
    source: "Position Digital",
    source_url: "https://position.digital/blog/ai-seo-statistics/",
    source_type: "external",
    year: "2026",
    sort_order: 5,
    tags: ["third-party", "citation-breadth"],
  },

  // ---- Trust ----
  {
    slug: "ext-magenta-90pct-trust",
    stat_value: "90%",
    label: "of B2B buyers who use AI trust the recommendations it provides",
    category: "trust",
    source: "Magenta Associates",
    source_type: "external",
    year: "2025",
    sample: "300 UK decision-makers",
    sort_order: 1,
    tags: ["trust", "ai-recommendations"],
  },
  {
    slug: "ext-yext-85pct-verify",
    stat_value: "85%",
    label: "of buyers still double-check AI answers elsewhere — Google (68%) is the primary validation channel",
    category: "trust",
    source: "Yext / Search Engine Land",
    source_url: "https://searchengineland.com",
    source_type: "external",
    year: "2026",
    sort_order: 2,
    tags: ["trust", "verification"],
  },
  {
    slug: "ext-forrester-2x-genai-meaningful",
    stat_value: "2x",
    label: "as many buyers named GenAI as a more meaningful source than ANY other source type",
    category: "trust",
    source: "Forrester Buyers' Journey Survey",
    source_url: "https://www.forrester.com",
    source_type: "external",
    year: "2025",
    sample: "17,500 global buyers",
    sort_order: 3,
    tags: ["trust", "meaningful-source"],
  },
  {
    slug: "ext-yext-60pct-better-answers",
    stat_value: "60%",
    label: "say AI delivers better, clearer answers than traditional search",
    category: "trust",
    source: "Search Engine Land / Yext",
    source_url: "https://searchengineland.com",
    source_type: "external",
    year: "2026",
    sort_order: 4,
    tags: ["trust", "answer-quality"],
  },

  // ---- AI Traffic & Conversion ----
  {
    slug: "ext-previsible-527pct-growth",
    stat_value: "527%",
    label: "year-over-year growth in AI search traffic",
    category: "ai-traffic",
    source: "Previsible AI Traffic Report",
    source_url: "https://semrush.com",
    source_type: "external",
    year: "2025",
    sample: "19 GA4 properties",
    sort_order: 1,
    tags: ["traffic", "growth"],
  },
  {
    slug: "ext-warmly-14-2pct-conversion",
    stat_value: "14.2% vs 2.8%",
    label: "AI search traffic converts at 5x the rate of Google organic",
    category: "ai-traffic",
    source: "Warmly / Yotpo",
    source_url: "https://warmly.ai/p/blog/b2b-buyers-chatgpt-geo-guide",
    source_type: "external",
    year: "2026",
    sort_order: 2,
    tags: ["conversion", "traffic"],
  },
  {
    slug: "ext-seranking-68pct-more-time",
    stat_value: "68%",
    label: "more time spent on websites by AI-referred visitors vs traditional organic",
    category: "ai-traffic",
    source: "SE Ranking / PassionFruit",
    source_url: "https://seranking.com/blog/ai-statistics/",
    source_type: "external",
    year: "2025",
    sort_order: 3,
    tags: ["engagement", "time-on-site"],
  },
  {
    slug: "ext-warmly-5-to-30pct-demos",
    stat_value: "5% → 30%",
    label: "AI went from 5% to 30% of inbound demo requests in 2 months at one B2B company",
    category: "ai-traffic",
    source: "Warmly (first-party data)",
    source_url: "https://warmly.ai/p/blog/b2b-buyers-chatgpt-geo-guide",
    source_type: "external",
    year: "2026",
    sort_order: 4,
    tags: ["demos", "growth", "case-study"],
  },
  {
    slug: "ext-magenta-85pct-age-gap",
    stat_value: "85%",
    label: "of 25-34 year olds use AI for supplier research vs 23% of 55-64 year olds",
    category: "ai-traffic",
    source: "Magenta Associates",
    source_type: "external",
    year: "2025",
    sample: "300 UK decision-makers",
    sort_order: 5,
    tags: ["demographics", "age-gap"],
  },

  // ---- HTML Myth Study (April 2026) ----
  {
    slug: "gss-html-myth-correlation",
    stat_value: "−0.007",
    label:
      "Pearson correlation between AI citation and HTML accessibility across 492 enterprise sites — effectively zero",
    category: "gss-original",
    source: "The HTML Myth in AI Visibility — GTM Signal Studio",
    source_url: "/research/ai-visibility-html-myth-2026",
    source_type: "gss-original",
    year: "2026",
    sample: "492 valid scans / 524 unique domains",
    is_featured: true,
    sort_order: 6,
    tags: ["html-myth", "accessibility", "ai-visibility-correlation"],
  },
  {
    slug: "gss-html-myth-quartile-delta",
    stat_value: "0.1pt",
    label:
      "accessibility gap between top-quartile and bottom-quartile AI-cited enterprise sites (n=246)",
    category: "gss-original",
    source: "The HTML Myth in AI Visibility — GTM Signal Studio",
    source_url: "/research/ai-visibility-html-myth-2026",
    source_type: "gss-original",
    year: "2026",
    sample: "246 sites in quartile comparison",
    sort_order: 7,
    tags: ["html-myth", "quartile-analysis"],
  },
  {
    slug: "gss-html-myth-a11y-floor",
    stat_value: "77.0",
    label:
      "average accessibility score across 492 enterprise sites — the floor whether AI cites them or not (out of 100)",
    category: "gss-original",
    source: "The HTML Myth in AI Visibility — GTM Signal Studio",
    source_url: "/research/ai-visibility-html-myth-2026",
    source_type: "gss-original",
    year: "2026",
    sample: "492 valid scans / 524 unique domains",
    sort_order: 8,
    tags: ["html-myth", "accessibility-floor"],
  },
  {
    slug: "gss-html-myth-skip-link",
    stat_value: "1.6/5",
    label:
      "average score for skip-to-content links across 492 enterprise sites — most are missing entirely",
    category: "gss-original",
    source: "The HTML Myth in AI Visibility — GTM Signal Studio",
    source_url: "/research/ai-visibility-html-myth-2026",
    source_type: "gss-original",
    year: "2026",
    sample: "492 valid scans / 524 unique domains",
    sort_order: 9,
    tags: ["html-myth", "accessibility-axis", "skip-link"],
  },
];

async function seed() {
  console.log(`Seeding ${stats.length} stats...`);

  // Upsert stats (idempotent on slug)
  const { data, error } = await supabase
    .from("stats")
    .upsert(stats, { onConflict: "slug" })
    .select("slug");

  if (error) {
    console.error("Error seeding stats:", error);
    process.exit(1);
  }

  console.log(`Successfully seeded ${data.length} stats.`);

  // Verify counts
  const { count } = await supabase
    .from("stats")
    .select("*", { count: "exact", head: true })
    .eq("status", "published");

  const { count: catCount } = await supabase
    .from("stat_categories")
    .select("*", { count: "exact", head: true })
    .eq("status", "published");

  console.log(`Total published: ${count} stats across ${catCount} categories.`);
}

seed().catch(console.error);
