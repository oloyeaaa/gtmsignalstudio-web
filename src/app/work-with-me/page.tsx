import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  // Noindexed 2026-08-24. Nothing on this site is for sale any more, so this page is
  // kept only so its live URL does not 404 for anyone holding a link. It is unlinked
  // from the site and must not be indexed or followed.
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  title: "Work With Me | AI Visibility Services — GTM Signal Studio",
  description:
    "Two ways to understand your AI visibility: the £297 single-company audit or the £997 competitive report with 10 competitors benchmarked.",
  keywords: [
    "AI visibility audit",
    "AI visibility competitive report",
    "enterprise marketing audit",
    "AI search visibility",
    "B2B AI visibility",
    "GTM Signal Studio",
  ],
  openGraph: {
    title: "Work With Me | GTM Signal Studio",
    description:
      "Two AI visibility services: single audit (£297) or competitive report with 10 competitors (£997).",
    type: "website",
    url: "https://gtmsignalstudio.com/work-with-me",
  },
  alternates: {
    canonical: "https://gtmsignalstudio.com/work-with-me",
  },
};

export default function WorkWithMePage() {
  return (
    <>
      {/* Hero - Dark */}
      <section className="section-dark py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-mono text-orange text-sm mb-4 tracking-wider">
            WORK WITH ME
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Find out if AI recommends your company to buyers.
          </h1>
          <p className="text-muted text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Most B2B companies are invisible to AI search. I publish the research
            that proves it — and offer two services to show you exactly where you
            stand.
          </p>
        </div>
      </section>

      {/* Two Offers - Light */}
      <section className="section-light py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Offer 1: AI Visibility Audit */}
            <div className="bg-white border border-light-border rounded-xl overflow-hidden flex flex-col">
              <div className="bg-navy-light px-6 py-3">
                <p className="text-white font-mono text-sm tracking-wider text-center">
                  AI VISIBILITY AUDIT
                </p>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <p className="font-heading text-3xl font-bold text-orange mb-1">
                  £297
                </p>
                <p className="text-text-muted text-sm mb-6">
                  Single company. 48-hour delivery.
                </p>

                <p className="font-semibold text-text-dark mb-3 text-sm">
                  What you get:
                </p>
                <ul className="space-y-2 mb-8 flex-1">
                  {[
                    "Your company scored across 4 AI visibility dimensions (0–100)",
                    "Tested across Google AI Mode, ChatGPT, and Perplexity",
                    "Prioritised fix plan specific to your gaps",
                    "Branded PDF report delivered within 48 hours",
                    "No call required — email to start",
                  ].map((item) => (
                    <li
                      key={item}
                      className="text-text-body text-sm flex items-start gap-2"
                    >
                      <span className="text-orange mt-0.5 flex-shrink-0">
                        &rarr;
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/ai-visibility-audit"
                  className="block text-center bg-orange hover:bg-orange-hover text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                >
                  Get Your Audit
                </Link>
              </div>
            </div>

            {/* Offer 2: Competitive Report */}
            <div className="bg-white border-2 border-orange rounded-xl overflow-hidden flex flex-col">
              <div className="bg-orange px-6 py-3">
                <p className="text-white font-mono text-sm tracking-wider text-center">
                  COMPETITIVE AI VISIBILITY REPORT
                </p>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <p className="font-heading text-3xl font-bold text-orange mb-1">
                  £997
                </p>
                <p className="text-text-muted text-sm mb-6">
                  You + 10 competitors. 7-day delivery.
                </p>

                <p className="font-semibold text-text-dark mb-3 text-sm">
                  Everything in the audit, plus:
                </p>
                <ul className="space-y-2 mb-8 flex-1">
                  {[
                    "10 direct competitors scanned with the same methodology",
                    "Competitive positioning map — where you rank in your market",
                    "Dimension-level comparison across all 11 companies",
                    "3 priority fixes ranked by competitive impact",
                    "30-minute video walkthrough of the findings",
                    "Branded PDF you can share with your leadership team",
                  ].map((item) => (
                    <li
                      key={item}
                      className="text-text-body text-sm flex items-start gap-2"
                    >
                      <span className="text-orange mt-0.5 flex-shrink-0">
                        &rarr;
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/competitive-report"
                  className="block text-center bg-orange hover:bg-orange-hover text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                >
                  Get Your Competitive Report
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - White */}
      <section className="section-white py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">
            HOW IT WORKS
          </p>
          <h2 className="font-heading text-3xl font-bold text-text-dark mb-8">
            Three steps. No call required.
          </h2>

          <div className="space-y-6">
            {[
              {
                step: "1",
                title: "You send your details",
                text: "Company name, website, and the keywords your buyers would search. For the competitive report, include up to 10 competitors — or I'll identify them for you.",
              },
              {
                step: "2",
                title: "I run the analysis",
                text: "Using the same methodology behind our published research, I score every company across 4 AI visibility dimensions: Citation Presence, Entity Recognition, Content Structure, and Citation Breadth.",
              },
              {
                step: "3",
                title: "You get the report",
                text: "A branded PDF with scores, findings, and a prioritised fix plan. The competitive report includes a 30-minute video walkthrough.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-orange text-white rounded-full flex items-center justify-center font-bold text-lg">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-heading font-bold text-text-dark mb-1">
                    {item.title}
                  </h3>
                  <p className="text-text-body text-sm leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Proof - Dark */}
      <section className="section-dark py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">
            BASED ON PUBLISHED RESEARCH
          </p>
          <h2 className="font-heading text-2xl font-bold text-white mb-6">
            These services use the same methodology behind our benchmark studies.
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { stat: "100+", label: "companies scanned" },
              { stat: "52%", label: "of law firms invisible to AI" },
              { stat: "44%", label: "of enterprise companies score 2/25 on citation" },
              { stat: "21pt", label: "gap between cited and uncited firms" },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-navy-light border border-navy-border rounded-xl p-4 text-center"
              >
                <p className="font-heading text-2xl font-bold text-orange mb-1">
                  {item.stat}
                </p>
                <p className="text-muted text-xs leading-relaxed">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/research/ai-visibility-benchmark-2026"
              className="text-orange text-sm hover:underline"
            >
              Enterprise Benchmark 2026 &rarr;
            </Link>
            <Link
              href="/research"
              className="text-orange text-sm hover:underline"
            >
              All research &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* This Is For You - Light */}
      <section className="section-light py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-cream border border-light-border rounded-xl p-6">
              <p className="font-mono text-orange text-xs mb-3 tracking-wider">
                THIS IS FOR YOU IF
              </p>
              <ul className="space-y-2">
                {[
                  "You lead marketing and need to understand your AI visibility position",
                  "You suspect competitors appear in AI answers but you do not",
                  "Your leadership team is asking about AI search and you need data",
                  "You want a clear, scored diagnostic — not a vague strategy deck",
                  "You need a report you can present to the board",
                ].map((item) => (
                  <li
                    key={item}
                    className="text-text-body text-sm flex items-start gap-2"
                  >
                    <span className="text-orange mt-0.5 flex-shrink-0">
                      &rarr;
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-cream border border-light-border rounded-xl p-6">
              <p className="font-mono text-text-muted text-xs mb-3 tracking-wider">
                THIS IS NOT FOR YOU IF
              </p>
              <ul className="space-y-2">
                {[
                  "You are looking for traditional SEO services",
                  "You want someone to manage your marketing ongoing",
                  "You need a full website rebuild (this is a diagnostic, not implementation)",
                  "You are a B2C brand (our methodology is designed for B2B services)",
                ].map((item) => (
                  <li
                    key={item}
                    className="text-text-muted text-sm flex items-start gap-2"
                  >
                    <span className="text-text-muted/40 mt-0.5 flex-shrink-0">
                      &times;
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Free Check - White */}
      <section className="section-white py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">
            NOT READY TO BUY?
          </p>
          <h2 className="font-heading text-3xl font-bold text-text-dark mb-4">
            Check your AI visibility for free.
          </h2>
          <p className="text-text-body text-lg mb-8 max-w-xl mx-auto">
            The AI Visibility Scorecard scores your company across all 4
            dimensions in under 5 minutes. No cost. No email required to start.
          </p>
          <Link
            href="/resources/ai-visibility-scorecard"
            className="inline-block border border-light-border hover:border-orange text-text-dark font-semibold px-8 py-4 rounded-lg transition-colors text-lg"
          >
            Take the Free Scorecard
          </Link>
        </div>
      </section>

      {/* Service schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: [
              {
                "@type": "Service",
                position: 1,
                name: "AI Visibility Audit",
                provider: {
                  "@type": "Organization",
                  name: "GTM Signal Studio",
                  url: "https://gtmsignalstudio.com",
                },
                description:
                  "Single-company AI visibility audit scored across 4 dimensions (0-100). Prioritised fix plan. PDF report delivered within 48 hours.",
                offers: {
                  "@type": "Offer",
                  price: "297",
                  priceCurrency: "GBP",
                },
                url: "https://gtmsignalstudio.com/ai-visibility-audit",
              },
              {
                "@type": "Service",
                position: 2,
                name: "Competitive AI Visibility Report",
                provider: {
                  "@type": "Organization",
                  name: "GTM Signal Studio",
                  url: "https://gtmsignalstudio.com",
                },
                description:
                  "Competitive AI visibility analysis: your company plus 10 competitors scored across 4 dimensions with competitive positioning map, priority fixes, and video walkthrough.",
                offers: {
                  "@type": "Offer",
                  price: "997",
                  priceCurrency: "GBP",
                },
                url: "https://gtmsignalstudio.com/competitive-report",
              },
            ],
          }),
        }}
      />
    </>
  );
}
