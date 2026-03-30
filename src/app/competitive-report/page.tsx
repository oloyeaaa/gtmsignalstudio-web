import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Competitive AI Visibility Report — GTM Signal Studio",
  description:
    "See where your company ranks against 10 direct competitors on AI visibility. Scored across 4 dimensions with competitive positioning map and priority fixes. Delivered in 7 days.",
  keywords: [
    "AI visibility competitive report",
    "AI visibility benchmark",
    "competitive AI citation analysis",
    "AI visibility score comparison",
    "B2B AI discovery audit",
  ],
  openGraph: {
    title: "Competitive AI Visibility Report — GTM Signal Studio",
    description:
      "Your company vs 10 competitors, scored across 4 AI visibility dimensions. See who AI recommends and why.",
    url: "https://gtmsignalstudio.com/competitive-report",
    type: "website",
    images: [
      {
        url: "https://gtmsignalstudio.com/og-default.png",
        width: 1200,
        height: 630,
        alt: "Competitive AI Visibility Report — GTM Signal Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Competitive AI Visibility Report — GTM Signal Studio",
    description:
      "Your company vs 10 competitors, scored across 4 AI visibility dimensions.",
    images: ["https://gtmsignalstudio.com/og-default.png"],
  },
};

const deliverables = [
  "Your company scored across 4 AI visibility dimensions (0–100)",
  "10 direct competitors scanned with the same methodology",
  "Competitive positioning map — where you rank in your market",
  "Dimension-level comparison: where you lead and where you trail",
  "3 priority fixes ranked by competitive impact",
  "Branded PDF report you can share with your leadership team",
  "30-minute video walkthrough of the findings",
];

const steps = [
  {
    number: "01",
    title: "Tell us your competitive set",
    description:
      "Email your company name, website, 2–3 core keywords, and up to 10 competitors. If you don't have a list, we'll identify them for you.",
  },
  {
    number: "02",
    title: "We scan all 11 companies",
    description:
      "Using the same methodology behind our published research, we score your company and every competitor across 4 AI visibility dimensions.",
  },
  {
    number: "03",
    title: "You get the competitive picture",
    description:
      "A branded PDF with full competitive rankings, a 30-minute video walkthrough, and 3 priority actions to close the gap.",
  },
];

export default function CompetitiveReportPage() {
  return (
    <>
      <PageHeader
        tagline="COMPETITIVE AI VISIBILITY REPORT"
        title="Where does AI rank you against your competitors?"
        subtitle="We scan your company and 10 direct competitors across 4 AI visibility dimensions. You see exactly who AI recommends, who it ignores, and what separates them."
        breadcrumb={{ label: "AI Visibility", href: "/ai-visibility" }}
        stats={[
          { stat: "52%", label: "of UK law firms are invisible to AI recommendations" },
          { stat: "21pt", label: "average gap between cited and uncited companies" },
          { stat: "11", label: "companies scanned — you plus 10 competitors" },
          { stat: "7 days", label: "from brief to branded report and walkthrough" },
        ]}
      />

      {/* Why competitive context matters */}
      <section className="section-light py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">
            THE PROBLEM WITH AUDITING IN ISOLATION
          </p>
          <h2 className="font-heading text-2xl font-bold text-text-dark mb-6">
            Your score means nothing without context
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: "A score of 75 could be leading or trailing",
                body: "If your competitors average 90, you have a problem. If they average 60, you have an advantage. The number only matters relative to your market.",
              },
              {
                title: "AI recommends by comparison",
                body: "When a buyer asks AI for recommendations, it compares options. Your visibility isn't measured in absolute terms — it's measured against the alternatives AI has seen.",
              },
              {
                title: "The fix list changes with context",
                body: "If every competitor is weak on citation, that's your opportunity. If they're all strong, you need a different approach. Strategy depends on the competitive landscape.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-cream border border-light-border rounded-xl p-6"
              >
                <h3 className="font-heading font-bold text-text-dark mb-2">
                  {card.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research credentials */}
      <section className="section-dark py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">
            BUILT ON PUBLISHED RESEARCH
          </p>
          <h2 className="font-heading text-2xl font-bold text-white mb-6">
            The same methodology behind our benchmark studies
          </h2>
          <p className="text-muted text-lg leading-relaxed mb-8 max-w-3xl">
            We&apos;ve scanned 100+ companies across enterprise SaaS, consulting,
            financial services, professional services, and law firms. The patterns
            are consistent — and the competitive report applies them to your
            specific market.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-navy-light border border-navy-border rounded-xl p-6">
              <p className="font-mono text-orange text-xs mb-3 tracking-wider">
                ENTERPRISE BENCHMARK 2026
              </p>
              <p className="text-white font-heading font-bold mb-2">
                50 enterprise B2B companies, 5 sectors
              </p>
              <p className="text-muted text-sm leading-relaxed mb-3">
                44% scored 2/25 on AI Citation Presence. Strong websites,
                strong brands — but AI doesn&apos;t recommend them.
              </p>
              <Link
                href="/research/ai-visibility-benchmark-2026"
                className="text-orange text-sm hover:underline"
              >
                Read the research &rarr;
              </Link>
            </div>
            <div className="bg-navy-light border border-navy-border rounded-xl p-6">
              <p className="font-mono text-orange text-xs mb-3 tracking-wider">
                UK LAW FIRMS 2026
              </p>
              <p className="text-white font-heading font-bold mb-2">
                50 UK law firms scanned
              </p>
              <p className="text-muted text-sm leading-relaxed mb-3">
                52% are invisible to AI recommendations. Mid-market specialists
                outperform global firms. The split is binary.
              </p>
              <Link
                href="/research"
                className="text-orange text-sm hover:underline"
              >
                View all research &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Dimensions */}
      <section className="section-light py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">
            WHAT WE SCORE
          </p>
          <h2 className="font-heading text-2xl font-bold text-text-dark mb-8">
            Four dimensions. Every company. Same methodology.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                icon: "◎",
                score: "0–25",
                name: "AI Citation Presence",
                description:
                  "When a buyer asks AI who provides your service, does your company appear by name? Tested across multiple AI platforms for each keyword.",
              },
              {
                icon: "◈",
                score: "0–25",
                name: "Entity Recognition",
                description:
                  "Does AI have a structured understanding of your company? Wikipedia, Companies House, Crunchbase, and consistent web presence.",
              },
              {
                icon: "◧",
                score: "0–25",
                name: "Content Structure",
                description:
                  "Can AI extract answers from your website? Indexed pages, content library depth, proprietary frameworks, FAQ content.",
              },
              {
                icon: "◉",
                score: "0–25",
                name: "Citation Breadth",
                description:
                  "Are you mentioned across independent credible sources? Press, directories, awards, and external backlinks.",
              },
            ].map((d) => (
              <div
                key={d.name}
                className="bg-navy-light border border-navy-border rounded-xl p-6"
              >
                <div className="flex items-start gap-4">
                  <span className="text-orange text-2xl font-mono flex-shrink-0">
                    {d.icon}
                  </span>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-heading font-bold text-white text-base">
                        {d.name}
                      </h3>
                      <span className="font-mono text-orange text-xs bg-orange/10 px-2 py-0.5 rounded">
                        {d.score}
                      </span>
                    </div>
                    <p className="text-muted text-sm leading-relaxed">
                      {d.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="section-white py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">
            THE DELIVERABLE
          </p>
          <h2 className="font-heading text-2xl font-bold text-text-dark mb-6">
            What you receive
          </h2>
          <div className="bg-navy-light border border-navy-border rounded-xl p-6">
            <ul className="space-y-3">
              {deliverables.map((item) => (
                <li
                  key={item}
                  className="text-white/90 flex items-start gap-3"
                >
                  <span className="text-orange mt-0.5 flex-shrink-0">→</span>
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-light py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">
            HOW IT WORKS
          </p>
          <h2 className="font-heading text-2xl font-bold text-text-dark mb-8">
            Three steps. 7 days.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step) => (
              <div key={step.number} className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange flex items-center justify-center">
                  <span className="font-mono font-bold text-white text-sm">
                    {step.number}
                  </span>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-text-dark mb-1">
                    {step.title}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who this is for */}
      <section className="section-white py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-cream border border-light-border rounded-xl p-6">
              <p className="font-mono text-orange text-xs mb-3 tracking-wider">
                THIS IS FOR YOU IF
              </p>
              <ul className="space-y-2">
                {[
                  "You lead marketing at a B2B company and need to understand where you stand relative to competitors",
                  "You've read our benchmark research and want to see your own firm's position",
                  "Your leadership team is asking about AI visibility and you need data to inform the strategy",
                  "You want a report you can present to the board — not just a dashboard",
                  "You need to prioritise fixes based on competitive gaps, not generic advice",
                ].map((item) => (
                  <li
                    key={item}
                    className="text-text-body flex items-start gap-3 text-sm"
                  >
                    <span className="text-orange mt-0.5 flex-shrink-0">→</span>
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
                  "You need implementation — this is a diagnostic, not a done-for-you service",
                  "You're a B2C brand (our methodology is designed for B2B services)",
                  "You want automated monitoring (this is a point-in-time competitive snapshot)",
                  "You're looking for SEO rank tracking (AI citation and search rankings are different systems)",
                ].map((item) => (
                  <li
                    key={item}
                    className="text-text-muted flex items-start gap-3 text-sm"
                  >
                    <span className="text-text-muted/40 mt-0.5 flex-shrink-0">
                      ×
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section-light py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">
            PRICING
          </p>
          <h2 className="font-heading text-2xl font-bold text-text-dark mb-4">
            One report. One price. No retainer.
          </h2>
          <div className="bg-navy-light border border-orange rounded-xl p-8 mb-6">
            <p className="font-heading text-4xl font-bold text-orange mb-2">
              £997
            </p>
            <p className="text-muted text-sm mb-4">
              Your company + 10 competitors. Branded PDF. Video walkthrough. Delivered in 7 days.
            </p>
            <ul className="text-muted text-sm space-y-1 mb-6">
              <li>No subscription. No retainer. No hidden costs.</li>
              <li>Payment upfront. Report delivered within 7 days.</li>
            </ul>
            <a
              href="mailto:oloye@gtmsignalstudio.com?subject=Competitive%20AI%20Visibility%20Report&body=Hi%20Oloye%2C%0A%0AI'd%20like%20to%20commission%20a%20Competitive%20AI%20Visibility%20Report.%0A%0ACompany%3A%20%0AWebsite%3A%20%0AKeywords%3A%20%0ACompetitors%3A%20%0A"
              className="inline-block bg-orange hover:bg-orange-hover text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Commission Your Report
            </a>
          </div>
          <p className="text-text-muted text-sm">
            Need the single-company audit instead?{" "}
            <Link href="/ai-visibility-audit" className="text-orange hover:underline">
              AI Visibility Audit — £297
            </Link>
          </p>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section-dark py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">
            BASED ON REAL DATA
          </p>
          <h2 className="font-heading text-2xl font-bold text-white mb-4">
            We&apos;ve scanned 100+ companies. Now see where yours ranks.
          </h2>
          <p className="text-muted mb-8 max-w-xl mx-auto">
            Email your company name, website, core keywords, and up to 10
            competitors. We&apos;ll send your competitive report within 7 days.
          </p>
          <a
            href="mailto:oloye@gtmsignalstudio.com?subject=Competitive%20AI%20Visibility%20Report&body=Hi%20Oloye%2C%0A%0AI'd%20like%20to%20commission%20a%20Competitive%20AI%20Visibility%20Report.%0A%0ACompany%3A%20%0AWebsite%3A%20%0AKeywords%3A%20%0ACompetitors%3A%20%0A"
            className="inline-block bg-orange hover:bg-orange-hover text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
          >
            Commission Your Report — £997
          </a>
          <p className="text-muted text-sm mt-3">
            No call required. Payment upfront. Delivered in 7 days.
          </p>
        </div>
      </section>

      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Competitive AI Visibility Report",
            provider: {
              "@type": "Organization",
              name: "GTM Signal Studio",
              url: "https://gtmsignalstudio.com",
            },
            description:
              "Competitive AI visibility analysis: your company plus 10 competitors scored across 4 dimensions — Citation Presence, Entity Recognition, Content Structure, Citation Breadth. Includes competitive positioning map, priority fixes, and video walkthrough.",
            offers: {
              "@type": "Offer",
              price: "997",
              priceCurrency: "GBP",
            },
          }),
        }}
      />
    </>
  );
}
