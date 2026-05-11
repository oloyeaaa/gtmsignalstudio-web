import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import BenchmarkCharts from "@/components/BenchmarkCharts";
import type { FirmData } from "@/components/BenchmarkCharts";

export const metadata: Metadata = {
  title: "AI Visibility: UK Law Firms 2026 | 50 Firms Scored",
  description:
    "We scanned 50 UK law firms for AI visibility. 52% scored 2/25 on citation presence. AI knows they exist but does not recommend them. The split is binary.",
  keywords: [
    "AI visibility UK law firms",
    "law firm AI visibility benchmark",
    "AI visibility research 2026",
    "UK law firms AI search",
    "AI citation UK solicitors",
  ],
  openGraph: {
    title: "AI Visibility: UK Law Firms 2026 | GTM Signal Studio",
    description:
      "50 UK law firms. 4 dimensions. 52% invisible to AI recommendations. Mid-market specialists outperform global firms.",
    type: "article",
    url: "https://gtmsignalstudio.com/research/ai-visibility-uk-law-firms-2026",
  },
  alternates: {
    canonical:
      "https://gtmsignalstudio.com/research/ai-visibility-uk-law-firms-2026",
  },
};

const firms: FirmData[] = [
  {name:"Addleshaw Goddard",citation:2,entity:25,content:25,breadth:25,total:77},
  {name:"Anthony Collins",citation:2,entity:25,content:25,breadth:25,total:77},
  {name:"BDB Pitmans",citation:2,entity:23,content:25,breadth:25,total:75},
  {name:"Bevan Brittan",citation:25,entity:25,content:25,breadth:25,total:100},
  {name:"Birketts",citation:22,entity:15,content:25,breadth:21,total:83},
  {name:"Brabners",citation:22,entity:23,content:21,breadth:25,total:91},
  {name:"Browne Jacobson",citation:25,entity:25,content:25,breadth:25,total:100},
  {name:"Burges Salmon",citation:2,entity:25,content:25,breadth:25,total:77},
  {name:"Capsticks",citation:25,entity:25,content:21,breadth:23,total:94},
  {name:"Charles Russell Speechlys",citation:22,entity:25,content:21,breadth:25,total:93},
  {name:"Clyde & Co",citation:22,entity:25,content:21,breadth:25,total:93},
  {name:"DAC Beachcroft",citation:2,entity:23,content:21,breadth:21,total:67},
  {name:"DWF",citation:2,entity:25,content:21,breadth:23,total:71},
  {name:"Eversheds Sutherland",citation:2,entity:17,content:25,breadth:23,total:67},
  {name:"Farrer & Co",citation:25,entity:25,content:14,breadth:25,total:89},
  {name:"Fieldfisher",citation:22,entity:23,content:25,breadth:25,total:95},
  {name:"Foot Anstey",citation:22,entity:23,content:25,breadth:25,total:95},
  {name:"Forsters",citation:2,entity:23,content:14,breadth:25,total:64},
  {name:"Freeths",citation:2,entity:23,content:25,breadth:25,total:75},
  {name:"Gateley",citation:2,entity:15,content:25,breadth:21,total:63},
  {name:"Harbottle & Lewis",citation:25,entity:23,content:14,breadth:25,total:87},
  {name:"Hempsons",citation:22,entity:22,content:25,breadth:25,total:94},
  {name:"Irwin Mitchell",citation:22,entity:25,content:21,breadth:25,total:93},
  {name:"Kennedys",citation:22,entity:25,content:21,breadth:25,total:93},
  {name:"Macfarlanes",citation:22,entity:23,content:14,breadth:23,total:82},
  {name:"Michelmores",citation:2,entity:25,content:21,breadth:21,total:69},
  {name:"Mills & Reeve",citation:2,entity:23,content:25,breadth:19,total:69},
  {name:"Mishcon de Reya",citation:2,entity:23,content:25,breadth:25,total:75},
  {name:"Osborne Clarke",citation:2,entity:23,content:21,breadth:21,total:67},
  {name:"Pannone Corporate",citation:2,entity:23,content:21,breadth:21,total:67},
  {name:"Penningtons Manches Cooper",citation:22,entity:15,content:25,breadth:25,total:87},
  {name:"Pinsent Masons",citation:22,entity:23,content:25,breadth:25,total:95},
  {name:"Royds Withy King",citation:2,entity:25,content:25,breadth:25,total:77},
  {name:"RPC",citation:22,entity:25,content:21,breadth:23,total:91},
  {name:"Stephenson Harwood",citation:2,entity:25,content:21,breadth:19,total:67},
  {name:"Shakespeare Martineau",citation:2,entity:25,content:25,breadth:21,total:73},
  {name:"Shoosmiths",citation:2,entity:23,content:25,breadth:25,total:75},
  {name:"Steeles Law",citation:2,entity:25,content:17,breadth:25,total:69},
  {name:"Stone King",citation:22,entity:23,content:25,breadth:25,total:95},
  {name:"Taylor Wessing",citation:22,entity:25,content:25,breadth:21,total:93},
  {name:"Thrings",citation:2,entity:15,content:25,breadth:23,total:65},
  {name:"TLT",citation:2,entity:25,content:25,breadth:25,total:77},
  {name:"Travers Smith",citation:2,entity:25,content:25,breadth:21,total:73},
  {name:"Trowers & Hamlins",citation:2,entity:25,content:21,breadth:19,total:67},
  {name:"Veale Wasbrough Vizards",citation:25,entity:25,content:21,breadth:25,total:96},
  {name:"Walker Morris",citation:22,entity:23,content:21,breadth:25,total:91},
  {name:"Ward Hadaway",citation:2,entity:23,content:21,breadth:21,total:67},
  {name:"Weightmans",citation:22,entity:23,content:17,breadth:25,total:87},
  {name:"Withers",citation:22,entity:25,content:21,breadth:25,total:93},
  {name:"Womble Bond Dickinson",citation:2,entity:23,content:21,breadth:23,total:69},
];

export default function LawFirmsBenchmarkPage() {
  return (
    <>
      <PageHeader
        tagline="ORIGINAL RESEARCH"
        title="AI Visibility: UK Law Firms 2026"
        subtitle="We scanned 50 UK law firms across 4 dimensions of AI visibility. 52% are invisible to AI recommendations. The split is binary — firms are either cited or completely ignored."
        breadcrumb={{ label: "Research", href: "/research" }}
        stats={[
          { stat: "50", label: "UK law firms scanned" },
          { stat: "52%", label: "invisible to AI" },
          { stat: "21pt", label: "gap: cited vs uncited" },
          { stat: "81.0", label: "average score /100" },
        ]}
      />

      {/* Headline Finding */}
      <section className="section-light py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">
            THE HEADLINE
          </p>
          <h2 className="font-heading text-3xl font-bold text-text-dark mb-6">
            52% of UK law firms are invisible to AI.
          </h2>
          <div className="space-y-4 text-text-body leading-relaxed">
            <p>
              26 of 50 UK law firms scored just 2 out of 25 on Citation
              Presence. When a buyer asks ChatGPT or Google AI Mode
              &quot;who are the best law firms for {"{"}category{"}"}?&quot;
              — these firms are not named.
            </p>
            <p>
              But here is what makes the finding significant: those same firms
              score well on everything else. Entity Recognition averages
              23.2/25. Citation Breadth averages 23.6/25. AI knows who they
              are. It knows what they do. It can find them mentioned across
              independent sources.
            </p>
            <p>It just does not recommend them.</p>
            <p>
              And the split is binary. Zero firms scored in the 6-20 range on
              Citation Presence. There is no &quot;partially visible.&quot; AI
              either recommends a firm or it ignores it completely.
            </p>
          </div>
        </div>
      </section>

      {/* Dimension Averages */}
      <section className="section-white py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">
            THE DATA
          </p>
          <h2 className="font-heading text-3xl font-bold text-text-dark mb-8">
            Dimension averages (50 law firms)
          </h2>

          <div className="space-y-4 mb-10">
            {[
              { dim: "Citation Presence", score: 12.0, max: 25, pct: 48, weak: true },
              { dim: "Entity Recognition", score: 23.2, max: 25, pct: 93, weak: false },
              { dim: "Content Structure", score: 22.3, max: 25, pct: 89, weak: false },
              { dim: "Citation Breadth", score: 23.6, max: 25, pct: 94, weak: false },
            ].map((d) => (
              <div key={d.dim}>
                <div className="flex justify-between items-baseline mb-1">
                  <span
                    className={`text-sm font-semibold ${d.weak ? "text-orange" : "text-text-dark"}`}
                  >
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

          <div className="bg-cream border border-light-border rounded-xl p-6">
            <p className="text-text-dark font-semibold mb-2">What this means:</p>
            <p className="text-text-body text-sm leading-relaxed">
              The gap is entirely in citation. Entity, Content, and Breadth all
              average 22+/25. Uncited firms actually score <em>higher</em> on
              Content Structure (22.9 vs 21.6) than cited firms. Having a great
              website is necessary but not sufficient. The fix is external —
              appearing in comparison content and recommendation contexts that AI
              platforms draw from.
            </p>
          </div>
        </div>
      </section>

      {/* Cited vs Uncited Comparison */}
      <section className="section-dark py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">
            CITED VS UNCITED
          </p>
          <h2 className="font-heading text-3xl font-bold text-white mb-8">
            The 21-point gap
          </h2>

          <div className="bg-navy-light border border-navy-border rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-navy-border">
                  <th className="text-left p-4 text-muted text-xs font-mono">
                    Metric
                  </th>
                  <th className="text-right p-4 text-xs font-mono text-[#44aa66]">
                    Cited (24)
                  </th>
                  <th className="text-right p-4 text-xs font-mono text-[#cc4444]">
                    Uncited (26)
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { metric: "Average Total", cited: "92.1", uncited: "70.7" },
                  { metric: "Citation Presence", cited: "22.7", uncited: "2.0" },
                  { metric: "Entity Recognition", cited: "23.3", uncited: "23.1" },
                  { metric: "Content Structure", cited: "21.6", uncited: "22.9" },
                  { metric: "Citation Breadth", cited: "24.4", uncited: "22.8" },
                ].map((row) => (
                  <tr
                    key={row.metric}
                    className="border-b border-navy-border last:border-0"
                  >
                    <td className="p-4 text-white text-sm font-semibold">
                      {row.metric}
                    </td>
                    <td className="p-4 text-sm text-right font-mono text-[#44aa66]">
                      {row.cited}
                    </td>
                    <td className="p-4 text-sm text-right font-mono text-[#cc4444]">
                      {row.uncited}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 space-y-4 text-muted leading-relaxed">
            <p>
              Entity and Content scores are nearly identical between groups. The
              entire 21-point gap comes from Citation Presence. Uncited firms
              actually score higher on Content Structure — proving that site
              quality alone doesn&apos;t drive AI citation.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Charts */}
      <section className="section-dark py-16 md:py-20 border-t border-navy-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">
            EXPLORE THE DATA
          </p>
          <h2 className="font-heading text-3xl font-bold text-white mb-8">
            50 firms. 4 dimensions. Every score.
          </h2>
          <BenchmarkCharts firms={firms} studyLabel="UK Law Firms 2026" />
        </div>
      </section>

      {/* Key Insights */}
      <section className="section-light py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">
            KEY INSIGHTS
          </p>
          <h2 className="font-heading text-3xl font-bold text-text-dark mb-8">
            What the data tells us
          </h2>

          <div className="space-y-6">
            {[
              {
                insight:
                  "The citation split is binary — there is no middle ground",
                detail:
                  "26 firms scored 2/25. 18 scored 22/25. 6 scored 25/25. Zero firms scored between 6 and 20. AI either recommends a firm or it does not. There is no 'partially visible.'",
              },
              {
                insight: "Specialist firms outperform generalists",
                detail:
                  "Healthcare and public sector specialists (Bevan Brittan, Browne Jacobson, Capsticks, Hempsons) dominate the top 10. Full-service generalists (Eversheds Sutherland, Addleshaw Goddard) score lower on citation despite greater scale. Clear sector positioning drives AI citation.",
              },
              {
                insight: "Revenue does not predict AI visibility",
                detail:
                  "6 of the 10 lowest-scoring firms are top-100 by revenue. Gateley (63) and DWF (71) are listed law firms. Bevan Brittan (100) and Browne Jacobson (100) are mid-market. Scale helps Entity Recognition but not Citation Presence.",
              },
              {
                insight: "Website quality is not the fix",
                detail:
                  "Uncited firms score 22.9/25 on Content Structure — higher than cited firms at 21.6. Having a great website is necessary but not sufficient. The fix is appearing in comparison content, directories, and recommendation contexts that AI replicates.",
              },
              {
                insight:
                  "The pattern is consistent across sectors",
                detail:
                  "The Enterprise Benchmark (50 companies, 5 sectors) found 44% at 2/25 citation. Law firms show 52% at 2/25. The citation bottleneck is structural, not sector-specific. It affects professional services, technology, consulting, and financial services alike.",
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
            All stats from this study. Link to this page as your source.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              { stat: "52%", label: "of UK law firms score 2/25 on AI citation presence" },
              { stat: "81.0", label: "average AI visibility score for UK law firms" },
              { stat: "12.0/25", label: "average Citation Presence — the weakest dimension" },
              { stat: "0", label: "firms scored between 6 and 20 on citation — the split is binary" },
              { stat: "21pt", label: "gap between cited (92.1) and uncited (70.7) firms" },
              { stat: "22.9", label: "Content Structure for uncited firms — higher than cited (21.6)" },
              { stat: "100/100", label: "scored by Bevan Brittan and Browne Jacobson — both mid-market specialists" },
              { stat: "6 of 10", label: "lowest-scoring firms are top-100 UK firms by revenue" },
              { stat: "48%", label: "of firms are cited by AI — just under half" },
              { stat: "25/25", label: "citation scored by all top 6 — every one is a sector specialist" },
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
                50 UK law firms across commercial, insurance, property, corporate,
                regional, and niche specialisms. Companies selected to represent
                a mix of national, regional, and specialist firms.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">Scanner v2.0 (multi-API)</h3>
              <p>
                This study uses Scanner v2.0, which tests AI platforms directly
                rather than asking one AI about another. Citation Presence is
                tested by querying OpenAI and Google Gemini with category
                questions and checking if the firm appears in the response.
                Entity Recognition uses Brave Search for Wikipedia, Crunchbase,
                and Companies House verification. Content Structure combines
                Brave Search (indexed page count), Tavily (content type
                detection), and OpenAI (proprietary framework check). Citation
                Breadth uses Brave Search for press mentions, directory listings,
                and external backlinks.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">Scoring</h3>
              <p>
                Each company scored across 4 dimensions, each worth 0-25 points
                for a total of 0-100. The scoring framework is identical to the
                Enterprise Benchmark 2026. The underlying measurements differ
                (v2 uses direct platform testing; v1 used Perplexity Sonar).
                Sector-level patterns are consistent across both versions.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">Limitations</h3>
              <p>
                AI platform responses vary by session, location, and time. Scores
                represent a point-in-time snapshot (30 March 2026). Gemini was
                rate-limited during scanning; most citation checks rely on OpenAI
                alone. Brave Search returns a maximum of 20 results per query —
                indexed page estimates are lower bounds. Sample covers mid-market
                to large UK firms. Sole practitioners and Magic Circle firms are
                underrepresented.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-light py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl font-bold text-text-dark mb-4">
            Where does your firm rank against competitors?
          </h2>
          <p className="text-text-body text-lg mb-8 max-w-xl mx-auto">
            This benchmark shows where 50 law firms stand. The Competitive
            Report shows where <em>your</em> firm stands — scored against 10
            direct competitors with the same methodology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/competitive-report"
              className="inline-block bg-orange hover:bg-orange-hover text-white font-semibold px-8 py-4 rounded-lg transition-colors text-lg"
            >
              Get Your Competitive Report — £997
            </Link>
            <Link
              href="/ai-visibility-audit"
              className="inline-block border border-light-border hover:border-orange text-text-dark font-semibold px-8 py-4 rounded-lg transition-colors text-lg"
            >
              Single Audit — £297
            </Link>
          </div>
          <p className="text-text-muted text-sm mt-4">
            Or check yourself first:{" "}
            <Link
              href="/resources/ai-visibility-scorecard"
              className="text-orange hover:underline"
            >
              Free AI Visibility Scorecard
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
                name: "How visible are UK law firms to AI search platforms?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Based on our study of 50 UK law firms, the average AI visibility score is 81.0 out of 100. However, 52% of firms scored just 2/25 on Citation Presence — meaning AI knows they exist but does not recommend them when buyers search for legal services.",
                },
              },
              {
                "@type": "Question",
                name: "Which UK law firms have the highest AI visibility?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Bevan Brittan and Browne Jacobson both scored 100/100. Other top performers include Veale Wasbrough Vizards (96), Fieldfisher (95), Foot Anstey (95), Pinsent Masons (95), and Stone King (95). The top scorers are predominantly sector specialists rather than the largest firms by revenue.",
                },
              },
              {
                "@type": "Question",
                name: "Why are some major UK law firms invisible to AI?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Major firms like Eversheds Sutherland (67), DWF (71), and Addleshaw Goddard (77) score poorly on Citation Presence despite strong entity recognition and web presence. The issue is not that AI doesn't know them — it's that AI doesn't recommend them in category-level queries. Specialist firms with clear positioning outperform generalist firms on citation.",
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
            headline: "AI Visibility: UK Law Firms 2026",
            description:
              "Original research: 50 UK law firms scored across 4 dimensions of AI visibility. 52% scored 2/25 on citation presence.",
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
            datePublished: "2026-03-30",
            url: "https://gtmsignalstudio.com/research/ai-visibility-uk-law-firms-2026",
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
            "@id": "https://gtmsignalstudio.com/research/ai-visibility-uk-law-firms-2026#dataset",
            name: "AI Visibility: UK Law Firms 2026",
            description:
              "Original dataset: 50 UK law firms scored across 4 AI visibility dimensions. 52% scored 2/25 on Citation Presence. Specialists outperformed top-100 revenue firms.",
            url: "https://gtmsignalstudio.com/research/ai-visibility-uk-law-firms-2026",
            creator: { "@id": "https://gtmsignalstudio.com/#founder" },
            publisher: { "@id": "https://gtmsignalstudio.com/#organization" },
            datePublished: "2026-03-30",
            dateModified: "2026-03-30",
            inLanguage: "en-GB",
            license: "https://creativecommons.org/licenses/by/4.0/",
            isAccessibleForFree: true,
            keywords: ["AI visibility", "AEO", "UK law firms", "legal sector", "benchmark"],
            spatialCoverage: { "@type": "Place", name: "United Kingdom" },
            variableMeasured: [
              "AI Citation Presence (0–25)",
              "Entity Recognition (0–25)",
              "Content Structure for AI (0–25)",
              "Citation Breadth (0–25)",
            ],
            numberOfItems: 50,
            distribution: {
              "@type": "DataDownload",
              encodingFormat: "text/html",
              contentUrl: "https://gtmsignalstudio.com/research/ai-visibility-uk-law-firms-2026",
            },
          }),
        }}
      />
    </>
  );
}
