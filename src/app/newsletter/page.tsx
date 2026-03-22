import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newsletter — The GTM Signal",
  description:
    "Weekly signal-led GTM insights from real campaigns. Frameworks, data, and patterns — delivered every Tuesday.",
  keywords: ["GTM Signal newsletter", "B2B marketing newsletter", "signal-led GTM insights", "weekly GTM newsletter", "go-to-market email"],
};

export default function NewsletterPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <p className="font-mono text-orange text-sm mb-2 tracking-wider">THE GTM SIGNAL</p>
      <h1 className="font-heading text-4xl font-bold text-text-dark mb-4">
        Weekly frameworks. Real data. No fluff.
      </h1>
      <p className="text-muted text-lg leading-relaxed mb-4 max-w-xl mx-auto">
        Every Tuesday — signal-led GTM insights extracted from real campaigns,
        not recycled marketing theory. Frameworks you can deploy this week.
      </p>
      <p className="text-muted text-sm mb-8 max-w-md mx-auto">
        Join 1,200+ B2B founders and GTM operators.
      </p>

      <a
        href="https://newsletter.gtmsignalstudio.com"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-orange hover:bg-orange-hover text-white px-8 py-3 rounded-lg font-semibold transition-colors"
      >
        Subscribe on Beehiiv →
      </a>

      {/* What to expect */}
      <div className="mt-16 text-left">
        <h2 className="font-heading text-xl font-bold text-text-dark mb-6 text-center">
          What to expect
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: "Real campaign data", description: "Reply rates, conversion numbers, and A/B test results from live outreach." },
            { title: "Named frameworks", description: "Proof Migration Framework, Signal Stack, Gift-First Email — tools you can use immediately." },
            { title: "Audit findings", description: "Anonymised patterns from real GTM audits. What works, what is broken, and why." },
            { title: "Build-in-public updates", description: "What I am building, what failed, and what surprised me this week." },
          ].map((item) => (
            <div key={item.title} className="bg-navy-light border border-navy-border rounded-lg p-4">
              <h3 className="font-heading font-bold text-white text-sm mb-1">{item.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
