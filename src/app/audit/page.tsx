import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Free GTM Audit",
  description:
    "Get your go-to-market scored out of 100. We audit ICP clarity, messaging, channel mix, content fit, and signal detection. Free. No strings.",
  keywords: ["free GTM audit", "go-to-market audit", "B2B website audit", "GTM score", "marketing audit tool"],
};

const dimensions = [
  {
    name: "ICP Clarity",
    description: "How well-defined is your ideal customer? Can your team describe them in one sentence?",
    icon: "🎯",
  },
  {
    name: "Messaging",
    description: "Does your value proposition land in 5 seconds? Is it specific enough to repel wrong buyers?",
    icon: "💬",
  },
  {
    name: "Channel Mix",
    description: "Are you present where your buyers research? Is your effort distributed or scattered?",
    icon: "📡",
  },
  {
    name: "Content Fit",
    description: "Does your content map to buyer pain points and funnel stages? Or is it random acts of content?",
    icon: "📝",
  },
  {
    name: "Signal Detection",
    description: "Are you tracking buying signals? Do you know when a prospect needs you right now?",
    icon: "⚡",
  },
];

const steps = [
  {
    number: "01",
    title: "You reply or book a call",
    description: "Tell us your company name and website. That is all we need to start.",
  },
  {
    number: "02",
    title: "We run the audit",
    description: "We analyse your website, content, messaging, and GTM infrastructure across 5 dimensions.",
  },
  {
    number: "03",
    title: "You get the report",
    description: "A branded PDF with your score out of 100, key findings, and three things to fix this week.",
  },
];

export default function AuditPage() {
  return (
    <>
      <PageHeader tagline="FREE GTM AUDIT" title="Your GTM. Scored. Your gaps. Fixed." subtitle="We score your go-to-market out of 100 across 5 dimensions. You get a branded PDF with your score, your hidden differentiators, and three things to fix this week." />

    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

      {/* 5 Dimensions */}
      <section className="mb-20">
        <h2 className="font-heading text-2xl font-bold text-text-dark mb-8">
          What we score
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {dimensions.map((d) => (
            <div
              key={d.name}
              className="bg-navy-light border border-navy-border rounded-xl p-5 text-center"
            >
              <div className="text-3xl mb-3">{d.icon}</div>
              <h3 className="font-heading font-bold text-white text-sm mb-2">{d.name}</h3>
              <p className="text-muted text-xs leading-relaxed">{d.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 bg-navy-light border border-orange rounded-xl p-5 text-center">
          <p className="font-heading font-bold text-orange text-lg">Overall Score /100</p>
          <p className="text-muted text-sm mt-1">
            Weighted average across all 5 dimensions with prioritised action plan.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="mb-20">
        <h2 className="font-heading text-2xl font-bold text-text-dark mb-8">
          How it works
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

      {/* What you get */}
      <section className="mb-20">
        <h2 className="font-heading text-2xl font-bold text-text-dark mb-6">
          What you get
        </h2>
        <div className="bg-navy-light border border-navy-border rounded-xl p-6">
          <ul className="space-y-3">
            {[
              "Branded PDF report with your score out of 100",
              "Category-level breakdown across all 5 dimensions",
              "Your hidden differentiator — the proof point you are not showing",
              "Top 3 critical findings with severity ratings",
              "3 quick wins you can fix this week",
              "Comparison against industry benchmarks",
            ].map((item) => (
              <li key={item} className="text-white/90 flex items-start gap-3">
                <span className="text-orange mt-0.5">→</span>
                <span className="text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="text-center">
        <h2 className="font-heading text-2xl font-bold text-text-dark mb-4">
          Ready to see your score?
        </h2>
        <p className="text-muted mb-8">
          Takes 15 minutes on our end. Delivered same-day. No follow-up spam.
        </p>
        <a
          href="https://calendly.com/thegtmsignalstudio/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-orange hover:bg-orange-hover text-white px-8 py-3 rounded-lg font-semibold transition-colors"
        >
          Book Your Free Audit
        </a>
      </section>

      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Free GTM Audit",
            provider: { "@type": "Organization", name: "GTM Signal Studio" },
            description: "Go-to-market audit scored out of 100 across 5 dimensions.",
            offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
          }),
        }}
      />
    </div>
    </>
  );
}
