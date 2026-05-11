import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import BenchmarkCharts from "@/components/BenchmarkCharts";
import type { FirmData } from "@/components/BenchmarkCharts";

export const metadata: Metadata = {
  title: "AI Visibility Benchmark April 2026 | 150 Companies Scored",
  description:
    "We tripled the sample to 150 B2B companies across 5 sectors. 81% score 0-5 on citation. The pattern from 50 companies holds at scale — and gets worse.",
  keywords: [
    "AI visibility benchmark 2026",
    "AI visibility research",
    "B2B AI search data",
    "AI citation presence",
    "enterprise AI visibility",
    "AI visibility benchmark april 2026",
  ],
  openGraph: {
    title: "AI Visibility Benchmark April 2026 | GTM Signal Studio",
    description:
      "150 companies. 5 sectors. 81% invisible to AI recommendations. We tripled the sample. The pattern got worse.",
    type: "article",
    url: "https://gtmsignalstudio.com/research/ai-visibility-benchmark-april-2026",
  },
  alternates: {
    canonical: "https://gtmsignalstudio.com/research/ai-visibility-benchmark-april-2026",
  },
};

const firms: FirmData[] = [
  {name:"ActiveCampaign",citation:25,entity:25,content:21,breadth:25,total:96},
  {name:"Adyen",citation:25,entity:25,content:21,breadth:25,total:96},
  {name:"Gong",citation:25,entity:25,content:18,breadth:25,total:93},
  {name:"HubSpot",citation:25,entity:25,content:16,breadth:25,total:91},
  {name:"ZoomInfo",citation:25,entity:22,content:19,breadth:25,total:91},
  {name:"Outreach",citation:25,entity:22,content:18,breadth:25,total:90},
  {name:"6sense",citation:25,entity:22,content:17,breadth:25,total:89},
  {name:"Salesforce",citation:25,entity:22,content:17,breadth:25,total:89},
  {name:"Drift",citation:22,entity:22,content:18,breadth:25,total:87},
  {name:"Elixirr",citation:22,entity:25,content:25,breadth:25,total:97},
  {name:"Argon & Co",citation:22,entity:25,content:25,breadth:25,total:97},
  {name:"Wise Business",citation:22,entity:25,content:25,breadth:25,total:97},
  {name:"iwoca",citation:22,entity:25,content:25,breadth:25,total:97},
  {name:"Forsters",citation:22,entity:25,content:25,breadth:25,total:97},
  {name:"Saffery Champness",citation:22,entity:25,content:25,breadth:25,total:97},
  {name:"Avanade",citation:22,entity:25,content:25,breadth:25,total:97},
  {name:"Stripe",citation:22,entity:25,content:22,breadth:25,total:94},
  {name:"Marketo",citation:2,entity:22,content:18,breadth:25,total:67},
  {name:"Pardot",citation:2,entity:22,content:17,breadth:25,total:66},
  {name:"Revolut Business",citation:2,entity:25,content:22,breadth:25,total:74},
  {name:"Tide",citation:2,entity:25,content:21,breadth:25,total:73},
  {name:"Starling Bank Business",citation:2,entity:25,content:21,breadth:25,total:73},
  {name:"GoCardless",citation:2,entity:25,content:21,breadth:25,total:73},
  {name:"Checkout.com",citation:2,entity:25,content:22,breadth:25,total:74},
  {name:"Modulr",citation:2,entity:22,content:21,breadth:25,total:70},
  {name:"Funding Circle",citation:2,entity:25,content:21,breadth:25,total:73},
  {name:"Mishcon de Reya",citation:2,entity:22,content:21,breadth:25,total:70},
  {name:"Shoosmiths",citation:2,entity:22,content:21,breadth:25,total:70},
  {name:"Softcat",citation:2,entity:25,content:21,breadth:25,total:73},
  {name:"Computacenter",citation:2,entity:25,content:21,breadth:25,total:73},
  {name:"Kainos",citation:2,entity:22,content:18,breadth:25,total:67},
  {name:"Klaviyo",citation:2,entity:2,content:2,breadth:2,total:8},
  {name:"Monday.com",citation:2,entity:2,content:2,breadth:2,total:8},
  {name:"Braze",citation:2,entity:2,content:2,breadth:2,total:8},
  {name:"Amplitude",citation:2,entity:2,content:2,breadth:2,total:8},
  {name:"FTI Consulting",citation:2,entity:2,content:2,breadth:2,total:8},
  {name:"Wipro",citation:2,entity:2,content:2,breadth:2,total:8},
  {name:"Infosys",citation:2,entity:2,content:2,breadth:2,total:8},
  {name:"TCS",citation:2,entity:2,content:2,breadth:2,total:8},
  {name:"Capgemini",citation:2,entity:2,content:2,breadth:2,total:8},
  {name:"Grant Thornton UK",citation:2,entity:2,content:2,breadth:2,total:8},
  {name:"BDO UK",citation:2,entity:2,content:2,breadth:2,total:8},
  {name:"CDW",citation:2,entity:2,content:2,breadth:2,total:8},
  {name:"SHI International",citation:2,entity:2,content:2,breadth:2,total:8},
  {name:"Bytes Technology",citation:2,entity:2,content:2,breadth:2,total:8},
  {name:"Crayon",citation:2,entity:2,content:2,breadth:2,total:8},
];

export default function BenchmarkAprilPage() {
  return (
    <>
      <PageHeader
        tagline="ORIGINAL RESEARCH"
        title="AI Visibility Benchmark: April 2026"
        subtitle="We tripled the sample to 150 B2B companies across 5 sectors. The pattern from 50 companies held at scale — and the invisible majority is even larger than we expected."
        breadcrumb={{ label: "Research", href: "/research" }}
        stats={[
          { stat: "150", label: "companies scored" },
          { stat: "5", label: "sectors analysed" },
          { stat: "81%", label: "score 0-5 on citation" },
          { stat: "28.7", label: "average score out of 100" },
        ]}
      />

      {/* The Headline Finding */}
      <section className="section-light py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">
            THE HEADLINE
          </p>
          <h2 className="font-heading text-3xl font-bold text-text-dark mb-6">
            We tripled the sample. The gap got worse.
          </h2>
          <div className="space-y-4 text-text-body leading-relaxed">
            <p>
              In March, we scored 50 enterprise companies and found 44% scored 2/25 on
              Citation Presence. That felt high. We assumed it might be a sample artefact —
              50 companies, heavily weighted toward enterprise heavyweights.
            </p>
            <p>
              So we added 100 more companies. Same 5 sectors. Same methodology. Broader
              revenue range. Mid-market alongside enterprise.
            </p>
            <p>
              The result: <strong>81% of 150 companies score 0-5 on Citation Presence.</strong> Not
              44%. Eighty-one percent.
            </p>
            <p>
              The average total score dropped from 82.2 to 28.7 out of 100. The original
              50 were the top of the market. Adding 100 mid-market companies revealed the
              real baseline — and it is far lower than anyone expected.
            </p>
            <p>
              Only 19% of companies across 5 sectors are recommended by AI when a buyer
              searches their category.
            </p>
          </div>
        </div>
      </section>

      {/* March vs April Comparison */}
      <section className="section-white py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">
            EDITION COMPARISON
          </p>
          <h2 className="font-heading text-3xl font-bold text-text-dark mb-8">
            March (N=50) vs April (N=150)
          </h2>

          <div className="bg-cream border border-light-border rounded-xl overflow-hidden mb-8">
            <table className="w-full">
              <thead>
                <tr className="border-b border-light-border">
                  <th className="text-left p-4 text-text-muted text-xs font-mono">Metric</th>
                  <th className="text-right p-4 text-text-muted text-xs font-mono">March (50)</th>
                  <th className="text-right p-4 text-orange text-xs font-mono">April (150)</th>
                  <th className="text-right p-4 text-text-muted text-xs font-mono">Delta</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { metric: "Average Total Score", march: "82.2", april: "28.7", delta: "-53.5" },
                  { metric: "Citation Presence (avg)", march: "13.7", april: "5.9", delta: "-7.8" },
                  { metric: "Entity Recognition (avg)", march: "23.4", april: "7.8", delta: "-15.6" },
                  { metric: "Content Structure (avg)", march: "20.1", april: "6.7", delta: "-13.4" },
                  { metric: "Citation Breadth (avg)", march: "25.0", april: "8.3", delta: "-16.7" },
                  { metric: "Low citation (0-5/25)", march: "44%", april: "81%", delta: "+37pp" },
                ].map((row) => (
                  <tr key={row.metric} className="border-b border-light-border last:border-0">
                    <td className="p-4 text-text-dark text-sm font-semibold">{row.metric}</td>
                    <td className="p-4 text-text-body text-sm text-right font-mono">{row.march}</td>
                    <td className="p-4 text-orange text-sm text-right font-mono font-bold">{row.april}</td>
                    <td className="p-4 text-text-muted text-sm text-right font-mono">{row.delta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-cream border border-light-border rounded-xl p-6">
            <p className="text-text-dark font-semibold mb-2">Why the drop?</p>
            <p className="text-text-body text-sm leading-relaxed">
              The March study sampled established enterprise companies — large teams,
              strong SEO, years of content. They represent the top of the market. Adding 100
              mid-market companies reveals that outside the enterprise elite, most B2B
              companies have minimal AI visibility infrastructure. The original 50 are the
              exception, not the baseline.
            </p>
          </div>
        </div>
      </section>

      {/* Dimension Averages */}
      <section className="section-light py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">
            THE DATA
          </p>
          <h2 className="font-heading text-3xl font-bold text-text-dark mb-8">
            Dimension averages (150 companies)
          </h2>

          <div className="space-y-4 mb-10">
            {[
              { dim: "Citation Presence", score: 5.9, max: 25, pct: 24, weak: true },
              { dim: "Entity Recognition", score: 7.8, max: 25, pct: 31, weak: false },
              { dim: "Content Structure", score: 6.7, max: 25, pct: 27, weak: false },
              { dim: "Citation Breadth", score: 8.3, max: 25, pct: 33, weak: false },
            ].map((d) => (
              <div key={d.dim}>
                <div className="flex justify-between items-baseline mb-1">
                  <span className={`text-sm font-semibold ${d.weak ? "text-orange" : "text-text-dark"}`}>
                    {d.dim} {d.weak && "(weakest)"}
                  </span>
                  <span className="font-mono text-sm text-text-muted">
                    {d.score}/{d.max}
                  </span>
                </div>
                <div className="w-full bg-cream rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${d.weak ? "bg-orange" : "bg-navy"}`}
                    style={{ width: `${d.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white border border-light-border rounded-xl p-6">
            <p className="text-text-dark font-semibold mb-2">What this means:</p>
            <p className="text-text-body text-sm leading-relaxed">
              At the enterprise level (March study), the gap was citation-specific — companies
              scored well on everything else. At the broader market level, the gap is
              across all dimensions. Most mid-market B2B companies have weak AI visibility
              infrastructure across the board. Citation remains the weakest, but the entire
              foundation is missing.
            </p>
          </div>
        </div>
      </section>

      {/* Sector Breakdown */}
      <section className="section-dark py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">
            BY SECTOR
          </p>
          <h2 className="font-heading text-3xl font-bold text-white mb-8">
            Sector comparison (150 companies)
          </h2>

          <div className="bg-navy-light border border-navy-border rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-navy-border">
                  <th className="text-left p-4 text-muted text-xs font-mono">Sector</th>
                  <th className="text-right p-4 text-muted text-xs font-mono">N</th>
                  <th className="text-right p-4 text-muted text-xs font-mono">Total</th>
                  <th className="text-right p-4 text-orange text-xs font-mono">Citation</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { sector: "Enterprise SaaS", n: "30", total: "31.3", citation: "9.5" },
                  { sector: "Financial Services", n: "30", total: "29.8", citation: "6.1" },
                  { sector: "Professional Services", n: "30", total: "28.3", citation: "5.3" },
                  { sector: "Management Consulting", n: "30", total: "27.3", citation: "4.7" },
                  { sector: "Technology / IT Services", n: "30", total: "27.1", citation: "4.0" },
                ].map((row) => (
                  <tr key={row.sector} className="border-b border-navy-border last:border-0">
                    <td className="p-4 text-white text-sm font-semibold">{row.sector}</td>
                    <td className="p-4 text-muted text-sm text-right font-mono">{row.n}</td>
                    <td className="p-4 text-white text-sm text-right font-mono">{row.total}</td>
                    <td className="p-4 text-orange text-sm text-right font-mono font-bold">{row.citation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 space-y-4 text-muted leading-relaxed">
            <p>
              Enterprise SaaS still leads but the gap narrowed. In the March study (10
              per sector), SaaS averaged 89.8 with citation at 24.4. At 30 companies per
              sector, the average drops to 31.3 with citation at 9.5. The original 10 SaaS
              companies were outliers — well-established platforms on every review site.
            </p>
            <p>
              Technology / IT Services remains the weakest at 4.0 citation. The bottom 10
              companies in the entire study are all IT Services firms, every one scoring
              2/100.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Charts */}
      <section className="section-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">
            EXPLORE THE DATA
          </p>
          <h2 className="font-heading text-3xl font-bold text-text-dark mb-8">
            Interactive benchmark explorer
          </h2>
          <BenchmarkCharts firms={firms} studyLabel="April 2026 (Sample)" />
          <p className="text-text-muted text-xs mt-4 text-center">
            Showing a representative sample. Full dataset available in the research CSV.
          </p>
        </div>
      </section>

      {/* Key Insights */}
      <section className="section-light py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">
            KEY INSIGHTS
          </p>
          <h2 className="font-heading text-3xl font-bold text-text-dark mb-8">
            What the data tells us at scale
          </h2>

          <div className="space-y-6">
            {[
              {
                insight: "The March study sampled the elite. The April study sampled the market.",
                detail: "The original 50 companies were established enterprise players with years of content, SEO investment, and brand recognition. They scored 82.2/100 on average. Adding 100 mid-market companies dropped the average to 28.7. The gap between the top and the rest is far wider than any single-sample study suggested.",
              },
              {
                insight: "81% invisible is the real baseline for B2B",
                detail: "At 50 companies (enterprise-heavy), 44% were invisible. At 150 companies (market-representative), 81% are invisible. The real question is not whether your company is visible to AI. It is whether you are in the 19% that is. For most B2B companies, the honest answer is no.",
              },
              {
                insight: "The bottom 10 are all from one sector",
                detail: "Every company in the bottom 10 is a Technology / IT Services firm scoring 2/100. Not low. The minimum. IT Services has no review platform ecosystem (no G2 equivalent), no buyer guide culture, and no comparison infrastructure. AI has nothing to draw from when deciding to recommend.",
              },
              {
                insight: "Enterprise SaaS advantage narrows at scale",
                detail: "The original 10 SaaS companies scored 89.8 with 24.4 citation. At 30 companies, that drops to 31.3 with 9.5 citation. The well-known platforms (HubSpot, Salesforce, 6sense) still dominate, but the next tier of SaaS companies are just as invisible as consulting firms. The structural advantage only applies to category leaders.",
              },
              {
                insight: "The binary pattern holds at 3x the sample",
                detail: "81% score 0-5 on citation. 19% score 20-25. Almost nothing in between. This is the same all-or-nothing pattern from both the enterprise study and the UK law firms study. AI either recommends you or it does not. There is no 'partially visible.'",
              },
            ].map((item) => (
              <div
                key={item.insight}
                className="bg-white border border-light-border rounded-xl p-6"
              >
                <h3 className="font-heading font-bold text-text-dark mb-2">
                  {item.insight}
                </h3>
                <p className="text-text-body text-sm leading-relaxed">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Citable Stats */}
      <section className="section-white py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">
            CITE THIS RESEARCH
          </p>
          <h2 className="font-heading text-3xl font-bold text-text-dark mb-4">
            Stats you can use
          </h2>
          <p className="text-text-body mb-8">
            All stats from the April 2026 edition. Link to this page as your source.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              { stat: "81%", label: "of 150 B2B companies score 0-5 on AI citation presence" },
              { stat: "28.7", label: "average AI visibility score across 150 companies (out of 100)" },
              { stat: "150", label: "companies scored across 5 sectors in the April 2026 edition" },
              { stat: "19%", label: "of companies are recommended by AI when buyers search their category" },
              { stat: "82.2 → 28.7", label: "average score drop when sample expanded from 50 to 150" },
              { stat: "4.0/25", label: "average citation score for Technology / IT Services (lowest sector)" },
              { stat: "9.5/25", label: "average citation for Enterprise SaaS (highest sector, down from 24.4)" },
              { stat: "10/10", label: "bottom 10 companies are all IT Services firms scoring 2/100" },
              { stat: "0%", label: "of companies score in the 6-19 range on citation — binary split confirmed" },
              { stat: "3x", label: "sample increase confirms the same all-or-nothing citation pattern" },
            ].map((item) => (
              <div
                key={item.stat + item.label}
                className="bg-cream border border-light-border rounded-xl p-5"
              >
                <p className="text-orange font-heading text-2xl font-bold mb-1">
                  {item.stat}
                </p>
                <p className="text-text-dark text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="section-dark py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">
            METHODOLOGY
          </p>
          <h2 className="font-heading text-3xl font-bold text-white mb-8">
            How we conducted this study
          </h2>

          <div className="space-y-6 text-muted leading-relaxed">
            <div>
              <h3 className="text-white font-semibold mb-2">Sample</h3>
              <p>
                150 enterprise and mid-market B2B companies across 5 sectors: Enterprise
                SaaS (30), Management Consulting (30), Financial Services (30), Professional
                Services (30), Technology / IT Services (30). The original 50 from the March
                2026 edition are included alongside 100 new companies added for April. New
                companies selected to broaden revenue tier representation within each sector.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">Scoring</h3>
              <p>
                Each company scored across 4 dimensions, each worth 0-25 points for a total
                of 0-100. Citation Presence: does AI name the company in category queries?
                Entity Recognition: does AI correctly describe the company? Content Structure:
                can AI extract answers from the website? Citation Breadth: is the company
                mentioned across independent sources?
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">Scanner</h3>
              <p>
                v2.0 multi-API scanner using OpenAI (gpt-4o-mini), Google Gemini 2.0 Flash,
                Brave Search, and Tavily. Each company tested with 2 category-level keywords.
                The 100 new companies were scanned with v2. The original 50 companies carry
                their March v1 scores (Perplexity-only) for continuity. A cohort rescan with
                v2 is planned for the May edition.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">Monthly expansion</h3>
              <p>
                The benchmark expands by approximately 100 companies each month. New
                companies are sector-balanced, deduplicated against the master registry,
                and selected to represent a mix of revenue tiers. Each edition includes all
                companies from previous editions plus the new additions. This creates a
                growing dataset for trend analysis.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">Limitations</h3>
              <p>
                AI platform responses vary by session, location, and time. Scores represent
                a point-in-time snapshot. The original 50 companies were scanned with v1
                (Perplexity API only); direct score comparison with v2-scanned companies
                should note this methodology difference. Company names are published in the
                research but anonymised in all derivative content (blog, LinkedIn, newsletter).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-light py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl font-bold text-text-dark mb-4">
            Where does your company rank against 150 competitors?
          </h2>
          <p className="text-text-body text-lg mb-8 max-w-xl mx-auto">
            This benchmark shows the market landscape. The Competitive Report shows
            where <em>you</em> stand — your company plus 10 direct competitors,
            scored with the same methodology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/competitive-report"
              className="inline-block bg-orange hover:bg-orange-hover text-white font-semibold px-8 py-4 rounded-lg transition-colors text-lg"
            >
              Get Your Competitive Report
            </Link>
            <Link
              href="/ai-visibility-audit"
              className="inline-block border border-light-border hover:border-orange text-text-dark font-semibold px-8 py-4 rounded-lg transition-colors text-lg"
            >
              Single Audit
            </Link>
          </div>
          <p className="text-text-muted text-sm mt-4">
            Compare with previous edition:{" "}
            <Link href="/research/ai-visibility-benchmark-2026" className="text-orange hover:underline">
              March 2026 (N=50)
            </Link>
          </p>
        </div>
      </section>

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What percentage of B2B companies are invisible to AI recommendations?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Based on the AI Visibility Benchmark April 2026 study of 150 B2B companies across 5 sectors, 81% score 0-5 out of 25 on Citation Presence. Only 19% are recommended by AI when a buyer searches their category. This expanded from 44% invisible in the March study (N=50) to 81% at the broader market level (N=150).",
                },
              },
              {
                "@type": "Question",
                name: "Which B2B sector has the lowest AI visibility?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Technology and IT Services companies have the lowest AI visibility, averaging 27.1/100 overall and 4.0/25 on Citation Presence. The bottom 10 companies in the 150-company benchmark are all IT Services firms, each scoring 2/100. IT Services lacks the review platform ecosystem (G2, Capterra) that gives SaaS companies a structural citation advantage.",
                },
              },
              {
                "@type": "Question",
                name: "How many companies were included in the AI Visibility Benchmark April 2026?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The April 2026 edition includes 150 B2B companies across 5 sectors (30 per sector): Enterprise SaaS, Management Consulting, Financial Services, Professional Services, and Technology/IT Services. This is a 3x increase from the March 2026 edition which scored 50 companies. The benchmark expands by approximately 100 companies each month.",
                },
              },
            ],
          }),
        }}
      />

      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ScholarlyArticle",
            headline: "AI Visibility Benchmark: April 2026 — 150 Companies Scored",
            description: "Original research: 150 B2B companies scored across 4 dimensions of AI visibility. 81% score 0-5 on citation presence. The invisible majority is larger than expected.",
            author: {
              "@type": "Person",
              name: "Oloye Adeosun",
              url: "https://gtmsignalstudio.com/about",
            },
            publisher: {
              "@type": "Organization",
              name: "GTM Signal Studio",
              url: "https://gtmsignalstudio.com",
            },
            datePublished: "2026-04-03",
            url: "https://gtmsignalstudio.com/research/ai-visibility-benchmark-april-2026",
          }),
        }}
      />

      {/* Dataset Schema — citable underlying data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Dataset",
            "@id": "https://gtmsignalstudio.com/research/ai-visibility-benchmark-april-2026#dataset",
            name: "AI Visibility Benchmark — April 2026",
            description:
              "Expanded dataset: 150 B2B companies across 5 sectors scored across 4 AI visibility dimensions. 81% scored 0–5 on Citation Presence. Average score 28.7/100.",
            url: "https://gtmsignalstudio.com/research/ai-visibility-benchmark-april-2026",
            creator: { "@id": "https://gtmsignalstudio.com/#founder" },
            publisher: { "@id": "https://gtmsignalstudio.com/#organization" },
            datePublished: "2026-04-03",
            dateModified: "2026-04-03",
            inLanguage: "en-GB",
            license: "https://creativecommons.org/licenses/by/4.0/",
            isAccessibleForFree: true,
            keywords: ["AI visibility", "AEO", "B2B", "benchmark", "April 2026"],
            spatialCoverage: { "@type": "Place", name: "United Kingdom" },
            variableMeasured: [
              "AI Citation Presence (0–25)",
              "Entity Recognition (0–25)",
              "Content Structure for AI (0–25)",
              "Citation Breadth (0–25)",
            ],
            numberOfItems: 150,
            distribution: {
              "@type": "DataDownload",
              encodingFormat: "text/html",
              contentUrl: "https://gtmsignalstudio.com/research/ai-visibility-benchmark-april-2026",
            },
          }),
        }}
      />
    </>
  );
}
