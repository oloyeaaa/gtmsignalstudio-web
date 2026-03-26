import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Work With Me | AI Visibility Audit for Enterprise",
  description:
    "Get your AI Visibility Audit. 4 dimensions, scored 0-100, prioritised fix plan, PDF delivered within 48 hours.",
  keywords: [
    "AI visibility audit",
    "enterprise marketing audit",
    "AI search visibility",
    "B2B AI visibility",
    "GTM Signal Studio",
  ],
  openGraph: {
    title: "Work With Me | GTM Signal Studio",
    description:
      "AI Visibility Audit: 4 dimensions, scored 0-100, prioritised fix plan.",
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
            Most enterprise companies are invisible to AI search. The AI
            Visibility Audit tells you exactly where you stand and what to fix.
          </p>
        </div>
      </section>

      {/* The Offer - Light */}
      <section className="section-light py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-light-border rounded-xl overflow-hidden">
            <div className="bg-orange px-6 py-3">
              <p className="text-white font-mono text-sm tracking-wider text-center">
                AI VISIBILITY AUDIT
              </p>
            </div>
            <div className="p-8 md:p-10 text-center">
              <p className="text-text-muted mb-8">
                One-off. No subscription. No ongoing commitment.
              </p>

              <div className="text-left max-w-md mx-auto mb-8">
                <p className="font-semibold text-text-dark mb-4">
                  What you get:
                </p>
                <ul className="space-y-3">
                  {[
                    "4-dimension audit: Citation Presence, Entity Recognition, Content Structure, Citation Breadth",
                    "Scored 0-100 with per-dimension breakdown",
                    "Tested across Google AI Mode, ChatGPT, and Perplexity",
                    "Prioritised fix plan specific to your company",
                    "Branded PDF report delivered within 48 hours",
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

              <Link
                href="/ai-visibility-audit"
                className="inline-block bg-orange hover:bg-orange-hover text-white font-semibold px-8 py-4 rounded-lg transition-colors text-lg"
              >
                Get Your AI Visibility Audit
              </Link>
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
            Three steps. 48 hours.
          </h2>

          <div className="space-y-6">
            {[
              {
                step: "1",
                title: "You send your details",
                text: "Company name, website, and the keywords your buyers would search. That is all I need.",
              },
              {
                step: "2",
                title: "I run the audit",
                text: "I check your company across Google AI Mode, ChatGPT, and Perplexity. I score each of the 4 dimensions and identify exactly where the gaps are.",
              },
              {
                step: "3",
                title: "You get the report",
                text: "A branded PDF with your score, per-dimension breakdown, and a prioritised list of fixes ranked by impact. Delivered within 48 hours.",
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

      {/* This Is For You - Dark */}
      <section className="section-dark py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="font-mono text-orange text-sm mb-2 tracking-wider">
                THIS IS FOR YOU IF
              </p>
              <ul className="space-y-3 mt-4">
                {[
                  "You suspect your competitors appear in AI answers but you do not",
                  "You have strong content and brand but AI platforms ignore you",
                  "You want a clear, scored baseline before investing in fixes",
                  "Your team needs a prioritised action plan, not a generic checklist",
                ].map((item) => (
                  <li
                    key={item}
                    className="text-muted text-sm flex items-start gap-2"
                  >
                    <span className="text-orange mt-0.5">&rarr;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono text-text-muted text-sm mb-2 tracking-wider">
                THIS IS NOT FOR YOU IF
              </p>
              <ul className="space-y-3 mt-4">
                {[
                  "You are looking for traditional SEO services",
                  "You want someone to manage your marketing ongoing",
                  "You need a full website rebuild (this is a diagnostic, not implementation)",
                ].map((item) => (
                  <li
                    key={item}
                    className="text-muted text-sm flex items-start gap-2"
                  >
                    <span className="text-muted mt-0.5">&times;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Free Check - Light */}
      <section className="section-light py-16 md:py-20">
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
            "@type": "Service",
            provider: {
              "@type": "Organization",
              name: "GTM Signal Studio",
              url: "https://gtmsignalstudio.com",
            },
            name: "AI Visibility Audit",
            description:
              "Professional AI visibility audit scored across 4 dimensions (0-100). Prioritised fix plan. PDF report delivered within 48 hours.",
            offers: {
              "@type": "Offer",
              price: "297",
              priceCurrency: "GBP",
              description:
                "4-dimension AI Visibility Audit with branded PDF report and prioritised fix plan.",
            },
          }),
        }}
      />
    </>
  );
}
