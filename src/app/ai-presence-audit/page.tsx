import type { Metadata } from "next";
import AiPresenceCTAButton from "@/components/AiPresenceCTAButton";

export const metadata: Metadata = {
  title: "AI Presence Audit — GTM Signal Studio",
  description:
    "Find out if AI platforms recommend your business for your category keyword. Scored report across 4 dimensions, prioritised fix plan. Delivered in 48 hours. £297.",
  keywords: ["AI presence audit", "AI visibility score", "AI citation check", "AI Mode visibility", "B2B AI discovery"],
};

const dimensions = [
  {
    score: "0–25",
    name: "AI Citation Presence",
    description:
      "Does your company appear by name when someone asks Google AI Mode, Perplexity, or ChatGPT who provides your service? This is a direct citation signal — not a proxy.",
    icon: "◎",
  },
  {
    score: "0–25",
    name: "Entity Recognition",
    description:
      "Does a structured, machine-readable identity exist for your company? Google Knowledge Panel, Wikidata entry, consistent name and description data across the web.",
    icon: "◈",
  },
  {
    score: "0–25",
    name: "Content Structure for AI",
    description:
      "Is your website's content structured for AI extraction? Direct answers, FAQ schema, clear heading hierarchy, server-side rendering so AI crawlers can actually read you.",
    icon: "◧",
  },
  {
    score: "0–25",
    name: "Citation Breadth",
    description:
      "Are you mentioned across multiple independent credible sources — directories, press, review platforms, Reddit? AI platforms look for cross-platform consensus before recommending.",
    icon: "◉",
  },
];

const deliverables = [
  "AI Presence Score out of 100 — across all four dimensions",
  "Per-dimension breakdown with exact scoring rationale",
  "Priority fix plan — ordered by impact, not effort",
  "Which AI platforms cite you (and for which keywords)",
  "What your top competitors score (where detectable)",
  "The specific gaps blocking you from AI recommendations",
];

const steps = [
  {
    number: "01",
    title: "Reply to start",
    description:
      "Email oloye@gtmsignalstudio.com with your company name, website, and 2–3 core keywords your buyers would search. No call required.",
  },
  {
    number: "02",
    title: "We audit in 48 hours",
    description:
      "We check your AI citation presence across Google AI Mode, Perplexity, and ChatGPT. We score all four dimensions and build your fix plan.",
  },
  {
    number: "03",
    title: "You get the report",
    description:
      "A branded PDF with your score out of 100, dimension-level findings, and a prioritised list of fixes — ordered by what will move your score fastest.",
  },
];

export default function AiPresenceAuditPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero */}
      <div className="max-w-3xl mb-16">
        <p className="font-mono text-orange text-sm mb-2 tracking-wider">AI PRESENCE AUDIT — £297</p>
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-text-dark mb-6 leading-tight">
          Does AI recommend{" "}
          <span className="text-orange">your business?</span>
        </h1>
        <p className="text-muted text-lg leading-relaxed mb-4">
          73% of B2B buyers now use ChatGPT or Perplexity to build their vendor shortlist — before
          they ever visit Google. If AI platforms don&apos;t recommend you for your category keyword,
          you&apos;re being excluded before the race begins.
        </p>
        <p className="text-muted text-lg leading-relaxed mb-8">
          The AI Presence Audit tells you exactly where you stand — scored across four dimensions —
          and what to fix first.
        </p>
        <AiPresenceCTAButton />
        <p className="text-muted text-sm mt-3">
          £297. No call required. Delivered within 48 hours.
        </p>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
        {[
          { stat: "48%", label: "of Google searches now show an AI answer" },
          { stat: "61%", label: "drop in organic CTR when AI answers appear" },
          { stat: "73%", label: "of B2B buyers use AI to build their shortlist" },
          { stat: "11%", label: "of domains appear in both ChatGPT and Perplexity" },
        ].map((item) => (
          <div key={item.stat} className="bg-navy-light border border-navy-border rounded-xl p-5 text-center">
            <p className="font-heading text-3xl font-bold text-orange mb-1">{item.stat}</p>
            <p className="text-muted text-xs leading-relaxed">{item.label}</p>
          </div>
        ))}
      </div>

      {/* 4 Dimensions */}
      <section className="mb-20">
        <p className="font-mono text-orange text-sm mb-2 tracking-wider">WHAT WE SCORE</p>
        <h2 className="font-heading text-2xl font-bold text-text-dark mb-8">
          Four dimensions. One score.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dimensions.map((d) => (
            <div
              key={d.name}
              className="bg-navy-light border border-navy-border rounded-xl p-6"
            >
              <div className="flex items-start gap-4">
                <span className="text-orange text-2xl font-mono flex-shrink-0">{d.icon}</span>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-heading font-bold text-white text-base">{d.name}</h3>
                    <span className="font-mono text-orange text-xs bg-orange/10 px-2 py-0.5 rounded">
                      {d.score}
                    </span>
                  </div>
                  <p className="text-muted text-sm leading-relaxed">{d.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 bg-navy-light border border-orange rounded-xl p-5 text-center">
          <p className="font-heading font-bold text-orange text-xl">Total Score — 0 to 100</p>
          <p className="text-muted text-sm mt-1">
            Each dimension is scored independently. A company can rank well on Google and score 0 on AI Citation.
          </p>
        </div>
      </section>

      {/* What you get */}
      <section className="mb-20">
        <p className="font-mono text-orange text-sm mb-2 tracking-wider">THE DELIVERABLE</p>
        <h2 className="font-heading text-2xl font-bold text-text-dark mb-6">
          What you receive
        </h2>
        <div className="bg-navy-light border border-navy-border rounded-xl p-6">
          <ul className="space-y-3">
            {deliverables.map((item) => (
              <li key={item} className="text-white/90 flex items-start gap-3">
                <span className="text-orange mt-0.5 flex-shrink-0">→</span>
                <span className="text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How it works */}
      <section className="mb-20">
        <p className="font-mono text-orange text-sm mb-2 tracking-wider">HOW IT WORKS</p>
        <h2 className="font-heading text-2xl font-bold text-text-dark mb-8">
          Three steps. 48 hours.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div key={step.number} className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange flex items-center justify-center">
                <span className="font-mono font-bold text-white text-sm">{step.number}</span>
              </div>
              <div>
                <h3 className="font-heading font-bold text-text-dark mb-1">{step.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Who this is for */}
      <section className="mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-cream border border-light-border rounded-xl p-6">
            <p className="font-mono text-orange text-xs mb-3 tracking-wider">THIS IS FOR YOU IF</p>
            <ul className="space-y-2">
              {[
                "You sell B2B services and buyers research you online",
                "Your organic traffic dropped in the past 12 months",
                "You've invested in SEO but pipeline hasn't improved",
                "You want to know if AI platforms recommend your company",
                "You need to know where to focus before hiring or spending",
              ].map((item) => (
                <li key={item} className="text-text-body flex items-start gap-3 text-sm">
                  <span className="text-orange mt-0.5 flex-shrink-0">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-cream border border-light-border rounded-xl p-6">
            <p className="font-mono text-text-muted text-xs mb-3 tracking-wider">THIS IS NOT FOR YOU IF</p>
            <ul className="space-y-2">
              {[
                "You're a B2C brand (we focus on B2B services)",
                "You want a full website rebuild or content creation",
                "You need paid ads or social media management",
                "You're looking for SEO rank tracking (this is AI citation, not rankings)",
              ].map((item) => (
                <li key={item} className="text-text-muted flex items-start gap-3 text-sm">
                  <span className="text-text-muted/40 mt-0.5 flex-shrink-0">×</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="text-center bg-navy-light border border-navy-border rounded-xl p-12">
        <p className="font-mono text-orange text-sm mb-2 tracking-wider">READY TO FIND OUT?</p>
        <h2 className="font-heading text-2xl font-bold text-white mb-4">
          Where does AI rank your business?
        </h2>
        <p className="text-muted mb-8 max-w-xl mx-auto">
          Email your company name, website, and 2–3 core category keywords. We&apos;ll send your
          scored report within 48 hours.
        </p>
        <AiPresenceCTAButton />
        <p className="text-muted text-sm mt-3">
          £297 flat. No retainer. No call required. Delivered in 48 hours.
        </p>
      </section>

      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "AI Presence Audit",
            provider: {
              "@type": "Organization",
              name: "GTM Signal Studio",
              url: "https://gtmsignalstudio.com",
            },
            description:
              "Scored report across four AI presence dimensions — AI Citation, Entity Recognition, Content Structure, Citation Breadth — with a prioritised fix plan. Delivered in 48 hours.",
            offers: {
              "@type": "Offer",
              price: "297",
              priceCurrency: "GBP",
            },
          }),
        }}
      />
    </div>
  );
}
