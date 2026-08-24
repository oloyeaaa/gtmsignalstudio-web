import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "AI Visibility Benchmark 2026 | 50 Enterprise Companies Scored",
  description:
    "We scored 50 enterprise B2B companies across 4 dimensions of AI visibility. 44% scored 2/25 on citation presence. AI knows who they are but does not recommend them.",
  keywords: [
    "AI visibility benchmark",
    "enterprise AI visibility data",
    "AI visibility research 2026",
    "B2B AI search statistics",
    "AI citation presence",
  ],
  openGraph: {
    title: "AI Visibility Benchmark 2026 | GTM Signal Studio",
    description:
      "50 enterprise companies. 5 sectors. 4 dimensions. 44% scored 2/25 on the dimension that drives buyer recommendations.",
    type: "article",
    url: "https://gtmsignalstudio.com/research/ai-visibility-benchmark-2026",
  },
  alternates: {
    canonical: "https://gtmsignalstudio.com/research/ai-visibility-benchmark-2026",
  },
};

export default function BenchmarkPage() {
  return (
    <>
      <PageHeader
        tagline="ORIGINAL RESEARCH"
        title="AI Visibility Benchmark 2026: Enterprise Edition"
        subtitle="We scored 50 enterprise B2B companies across 4 dimensions of AI visibility. The finding: AI knows who most companies are. It just does not recommend them."
        breadcrumb={{ label: "Research", href: "/research" }}
        stats={[
          { stat: "50", label: "enterprise companies scored" },
          { stat: "5", label: "sectors analysed" },
          { stat: "44%", label: "scored 2/25 on citation" },
          { stat: "82.2", label: "average score out of 100" },
        ]}
      />

      {/* The Headline Finding */}
      <section className="section-light py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">
            THE HEADLINE
          </p>
          <h2 className="font-heading text-3xl font-bold text-text-dark mb-6">
            The gap is citation, not recognition.
          </h2>
          <div className="space-y-4 text-text-body leading-relaxed">
            <p>
              22 out of 50 enterprise companies (44%) scored just 2 out of 25 on
              Citation Presence. This is the dimension that measures whether AI
              mentions your company by name when buyers search for your service.
            </p>
            <p>
              But here is what makes this finding significant: those same
              companies scored well on everything else. Entity Recognition
              averaged 23.4/25. Citation Breadth averaged 25/25. AI knows who
              these companies are. It knows what they do. It can find them
              mentioned across multiple independent sources.
            </p>
            <p>
              It just does not recommend them.
            </p>
            <p>
              When a buyer asks Google AI Mode or ChatGPT &quot;who are the best
              enterprise [service] companies,&quot; these companies are not in the
              answer. Their competitors are.
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
            Overall dimension averages (50 companies)
          </h2>

          <div className="space-y-4 mb-10">
            {[
              { dim: "Citation Presence", score: 13.7, max: 25, pct: 55, weak: true },
              { dim: "Entity Recognition", score: 23.4, max: 25, pct: 94, weak: false },
              { dim: "Content Structure", score: 20.1, max: 25, pct: 80, weak: false },
              { dim: "Citation Breadth", score: 25.0, max: 25, pct: 100, weak: false },
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

          <div className="bg-cream border border-light-border rounded-xl p-6">
            <p className="text-text-dark font-semibold mb-2">What this means:</p>
            <p className="text-text-body text-sm leading-relaxed">
              Companies are not invisible because AI does not know them. They are
              invisible because AI does not cite them. The problem is not
              information. It is recommendation. Citation Presence is the only
              dimension where companies consistently underperform, and it is the
              dimension that translates directly to whether buyers find you.
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
            Sector comparison
          </h2>

          <div className="bg-navy-light border border-navy-border rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-navy-border">
                  <th className="text-left p-4 text-muted text-xs font-mono">Sector</th>
                  <th className="text-right p-4 text-muted text-xs font-mono">Total</th>
                  <th className="text-right p-4 text-orange text-xs font-mono">Citation</th>
                  <th className="text-right p-4 text-muted text-xs font-mono">Entity</th>
                  <th className="text-right p-4 text-muted text-xs font-mono">Content</th>
                  <th className="text-right p-4 text-muted text-xs font-mono">Breadth</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { sector: "Enterprise SaaS", total: "89.8", citation: "24.4", entity: "22.2", content: "18.2", breadth: "25.0" },
                  { sector: "Financial Services", total: "85.3", citation: "14.3", entity: "23.8", content: "22.2", breadth: "25.0" },
                  { sector: "Professional Services", total: "80.8", citation: "12.0", entity: "23.4", content: "20.4", breadth: "25.0" },
                  { sector: "Management Consulting", total: "77.9", citation: "10.0", entity: "23.0", content: "19.9", breadth: "25.0" },
                  { sector: "Technology / IT Services", total: "77.3", citation: "8.0", entity: "24.6", content: "19.7", breadth: "25.0" },
                ].map((row) => (
                  <tr key={row.sector} className="border-b border-navy-border last:border-0">
                    <td className="p-4 text-white text-sm font-semibold">{row.sector}</td>
                    <td className="p-4 text-white text-sm text-right font-mono">{row.total}</td>
                    <td className="p-4 text-orange text-sm text-right font-mono font-bold">{row.citation}</td>
                    <td className="p-4 text-muted text-sm text-right font-mono">{row.entity}</td>
                    <td className="p-4 text-muted text-sm text-right font-mono">{row.content}</td>
                    <td className="p-4 text-muted text-sm text-right font-mono">{row.breadth}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 space-y-4 text-muted leading-relaxed">
            <p>
              Enterprise SaaS companies score 24.4/25 on Citation Presence. Technology
              and IT Services companies score 8.0/25. That is a 3x gap on the single
              dimension that determines whether AI recommends you to buyers.
            </p>
            <p>
              Every other dimension is comparable across sectors. Entity Recognition,
              Content Structure, and Citation Breadth are all within a few points of
              each other. The divergence is entirely in citation.
            </p>
          </div>
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
                insight: "Citation Presence is the only dimension that separates visible from invisible",
                detail: "Entity, Content, and Breadth scores are consistently high across all sectors. The companies scoring 90+ all have Citation Presence of 22 or higher. The companies scoring 65-70 all have Citation Presence of 2. One dimension explains almost all the variance.",
              },
              {
                insight: "Being known is not the same as being recommended",
                detail: "AI platforms have enough information to recommend most of these companies. They choose not to. Entity Recognition averaging 23.4/25 means AI understands what companies do. Citation Breadth at 25/25 means companies are mentioned across independent sources. But citation and recommendation are different signals.",
              },
              {
                insight: "SaaS companies benefit from a structural advantage",
                detail: "Enterprise SaaS companies are frequently compared in buyer guides, review platforms, and competitive analyses. This creates a citation pattern that AI platforms replicate. Professional services and IT companies are rarely compared this way, creating a citation gap that has nothing to do with the quality of their work.",
              },
              {
                insight: "The citation gap is fixable but not with traditional SEO",
                detail: "SEO optimises for ranking algorithms. Citation Presence requires a different approach: structured entity data, consistent positioning across platforms, content that directly answers category-level queries, and presence in the comparison and recommendation content that AI platforms draw from.",
              },
              {
                insight: "Every company scoring 90+ shares one trait",
                detail: "They appear by name when AI answers category-level questions like \"best [service] for [market].\" This is the single strongest predictor of overall AI visibility. If AI names you in category queries, every other dimension tends to follow.",
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
              { stat: "44%", label: "of enterprise B2B companies score 2/25 on AI citation presence" },
              { stat: "82.2", label: "average enterprise AI visibility score out of 100" },
              { stat: "13.7/25", label: "average Citation Presence score (weakest dimension)" },
              { stat: "23.4/25", label: "average Entity Recognition score (AI knows who you are)" },
              { stat: "3x", label: "citation gap between SaaS (24.4) and IT Services (8.0)" },
              { stat: "0%", label: "of companies scored below 60 overall, but 44% have a critical citation gap" },
              { stat: "89.8", label: "average AI visibility score for Enterprise SaaS" },
              { stat: "77.3", label: "average AI visibility score for Technology / IT Services" },
              { stat: "25/25", label: "average Citation Breadth: companies are mentioned but not recommended" },
              { stat: "22+", label: "Citation Presence score shared by every company scoring 90+ overall" },
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
                50 enterprise B2B companies across 5 sectors: Enterprise SaaS (10),
                Management Consulting (10), Financial Services (10), Professional
                Services (10), Technology / IT Services (10). Companies selected
                to represent a mix of established enterprises and high-growth firms
                within each sector.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">Scoring</h3>
              <p>
                Each company scored across 4 dimensions, each worth 0-25 points
                for a total of 0-100. Citation Presence: does AI name the company
                in category queries? Entity Recognition: does AI correctly describe
                the company? Content Structure: can AI extract answers from the
                website? Citation Breadth: is the company mentioned across
                independent sources?
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">Platforms tested</h3>
              <p>
                Google AI Mode, ChatGPT, and Perplexity. Each company tested with
                2 category-level keywords (e.g. &quot;enterprise marketing platform&quot;,
                &quot;management consulting UK&quot;).
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">Data collection</h3>
              <p>
                Automated scanning via Perplexity Sonar API with structured scoring
                prompts. All raw data preserved with timestamps. Scans conducted
                25 March 2026.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">Limitations</h3>
              <p>
                AI platform responses can vary by session, location, and time.
                Scores represent a point-in-time snapshot. The Perplexity API was
                used for automated scoring; manual verification on Google AI Mode
                and ChatGPT was conducted for a subset of companies. Sample size
                of 10 per sector limits sector-level conclusions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-light py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl font-bold text-text-dark mb-4">
            Where does your company rank against competitors?
          </h2>
          <p className="text-text-body text-lg mb-8 max-w-xl mx-auto">
            This benchmark shows where 50 enterprise companies stand. The
            Competitive Report shows where <em>you</em> stand — your company
            plus 10 direct competitors, scored with the same methodology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/research"
              className="inline-block bg-orange hover:bg-orange-hover text-white font-semibold px-8 py-4 rounded-lg transition-colors text-lg"
            >
              Read the studies
            </Link>
            <Link
              href="/research/stats"
              className="inline-block border border-light-border hover:border-orange text-text-dark font-semibold px-8 py-4 rounded-lg transition-colors text-lg"
            >
              Read the studies
            </Link>
          </div>
          <p className="text-text-muted text-sm mt-4">
            Or check yourself first:{" "}
            <Link href="/resources/ai-visibility-scorecard" className="text-orange hover:underline">
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
                name: "What is the average AI visibility score for enterprise companies?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Based on the AI Visibility Benchmark 2026 study of 50 enterprise B2B companies, the average AI visibility score is 82.2 out of 100. However, 44% of companies scored just 2/25 on Citation Presence, the dimension that determines whether AI recommends them to buyers.",
                },
              },
              {
                "@type": "Question",
                name: "Which sectors have the highest AI visibility?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Enterprise SaaS companies have the highest average AI visibility score at 89.8/100, followed by Financial Services (85.3), Professional Services (80.8), Management Consulting (77.9), and Technology/IT Services (77.3). The gap is primarily driven by Citation Presence, where SaaS averages 24.4/25 compared to IT Services at 8.0/25.",
                },
              },
              {
                "@type": "Question",
                name: "Why are enterprise companies invisible to AI despite strong content?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The benchmark found that Entity Recognition (23.4/25) and Citation Breadth (25/25) are consistently high across all sectors. AI knows who these companies are and can find them mentioned across independent sources. The gap is Citation Presence: AI does not recommend them by name in category queries. Being known is not the same as being recommended.",
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
            headline: "AI Visibility Benchmark 2026: Enterprise Edition",
            description: "Original research: 50 enterprise B2B companies scored across 4 dimensions of AI visibility. 44% scored 2/25 on citation presence.",
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
            datePublished: "2026-03-25",
            url: "https://gtmsignalstudio.com/research/ai-visibility-benchmark-2026",
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
            "@id": "https://gtmsignalstudio.com/research/ai-visibility-benchmark-2026#dataset",
            name: "AI Visibility Benchmark 2026 — Enterprise Edition",
            description:
              "Original dataset: 50 enterprise B2B companies scored across 4 AI visibility dimensions (Citation Presence, Entity Recognition, Content Structure, Citation Breadth). Published by GTM Signal Studio.",
            url: "https://gtmsignalstudio.com/research/ai-visibility-benchmark-2026",
            sameAs: "https://gtmsignalstudio.com/research/ai-visibility-benchmark-2026",
            creator: { "@id": "https://gtmsignalstudio.com/#founder" },
            publisher: { "@id": "https://gtmsignalstudio.com/#organization" },
            datePublished: "2026-03-25",
            dateModified: "2026-03-25",
            inLanguage: "en-GB",
            license: "https://creativecommons.org/licenses/by/4.0/",
            isAccessibleForFree: true,
            keywords: ["AI visibility", "AEO", "enterprise marketing", "benchmark", "B2B"],
            spatialCoverage: { "@type": "Place", name: "United Kingdom" },
            variableMeasured: [
              "AI Citation Presence (0–25)",
              "Entity Recognition (0–25)",
              "Content Structure for AI (0–25)",
              "Citation Breadth (0–25)",
            ],
            measurementTechnique:
              "Multi-platform AI query scanning (Google AI Mode, Perplexity, ChatGPT) with structured scoring against four dimensions. See methodology for full protocol.",
            numberOfItems: 50,
            distribution: {
              "@type": "DataDownload",
              encodingFormat: "text/html",
              contentUrl: "https://gtmsignalstudio.com/research/ai-visibility-benchmark-2026",
            },
          }),
        }}
      />
    </>
  );
}
