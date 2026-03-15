import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Work With Me",
  description:
    "Signal-led GTM sprints for B2B founders. Positioning Sprint (£497), GTM Fix Sprint (£997), Outreach Setup (£997). Start with a free audit.",
};

const offers = [
  {
    name: "Positioning Sprint",
    price: "£497",
    duration: "1 week",
    description: "Clarify who you serve, why they buy, and what to say. Rebuild your positioning from the ground up.",
    includes: [
      "ICP definition workshop (async)",
      "Messaging framework document",
      "Homepage wireframe with conversion logic",
      "Competitive positioning map",
      "3 pillar service structure",
    ],
    ideal: "You have clients but struggle to articulate why they chose you over competitors.",
  },
  {
    name: "GTM Fix Sprint",
    price: "£997",
    duration: "2 weeks",
    featured: true,
    description: "Full GTM audit + implementation plan. We find the infrastructure gaps and fix the ones costing you pipeline.",
    includes: [
      "Full GTM audit scored out of 100",
      "5-category diagnostic (ICP, Messaging, Channels, Content, Signals)",
      "Website restructure plan",
      "Content-market fit analysis",
      "Signal detection setup",
      "3-month action plan with priorities",
    ],
    ideal: "You are doing outreach but reply rates are below 3% and you do not know what is broken.",
  },
  {
    name: "Outreach Setup",
    price: "£997",
    duration: "2 weeks",
    description: "Signal-led outreach system built and launched. Domains, sequences, and buying signal detection — all configured.",
    includes: [
      "Domain + subdomain setup for cold outreach",
      "Mailbox configuration + warmup",
      "3 signal-triggered email sequences",
      "SmartLead or Instantly configuration",
      "Buying signal detection routine",
      "14-day launch support",
    ],
    ideal: "You know your ICP but have no outbound infrastructure. Your team is sending from Gmail.",
  },
];

export default function WorkWithMePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-2xl mb-16">
        <p className="font-mono text-orange text-sm mb-2 tracking-wider">WORK WITH ME</p>
        <h1 className="font-heading text-4xl font-bold text-white mb-4">
          GTM infrastructure sprints.
        </h1>
        <p className="text-muted text-lg leading-relaxed">
          Three focused sprints. Each one fixes a specific layer of your go-to-market.
          Start with a free audit to find your biggest gap, then pick the sprint that matches.
        </p>
      </div>

      {/* Offer cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
        {offers.map((offer) => (
          <div
            key={offer.name}
            className={`rounded-xl p-6 border flex flex-col ${
              offer.featured
                ? "border-orange bg-navy-light"
                : "border-navy-border bg-navy-light/50"
            }`}
          >
            {offer.featured && (
              <span className="inline-block bg-orange text-white text-xs font-mono px-2 py-1 rounded mb-4 self-start">
                MOST POPULAR
              </span>
            )}
            <h2 className="font-heading text-xl font-bold text-white mb-1">
              {offer.name}
            </h2>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-orange text-3xl font-bold">{offer.price}</span>
              <span className="text-muted text-sm">/ {offer.duration}</span>
            </div>
            <p className="text-muted text-sm leading-relaxed mb-6">
              {offer.description}
            </p>

            <div className="mb-6 flex-1">
              <p className="text-white text-sm font-semibold mb-3">Includes:</p>
              <ul className="space-y-2">
                {offer.includes.map((item) => (
                  <li key={item} className="text-sm text-white/80 flex items-start gap-2">
                    <span className="text-orange mt-0.5">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-navy/50 rounded-lg p-3 mb-6">
              <p className="text-xs text-muted">
                <span className="text-orange font-semibold">Ideal if:</span> {offer.ideal}
              </p>
            </div>

            <a
              href="https://calendly.com/oloye-getclarioiq/audit"
              target="_blank"
              rel="noopener noreferrer"
              className={`block text-center py-3 rounded-lg font-semibold text-sm transition-colors ${
                offer.featured
                  ? "bg-orange hover:bg-orange-hover text-white"
                  : "border border-navy-border hover:border-muted text-white"
              }`}
            >
              Book a Call
            </a>
          </div>
        ))}
      </div>

      {/* Free audit bridge */}
      <div className="bg-navy-light border border-navy-border rounded-xl p-8 md:p-12 text-center">
        <p className="font-mono text-orange text-sm mb-2 tracking-wider">NOT SURE WHERE TO START?</p>
        <h2 className="font-heading text-2xl font-bold text-white mb-4">
          Start with a free GTM audit.
        </h2>
        <p className="text-muted text-lg mb-8 max-w-xl mx-auto">
          We score your go-to-market out of 100 across 5 dimensions. You get a branded PDF
          with your score and three things to fix this week. No pitch. No strings.
        </p>
        <Link
          href="/audit"
          className="inline-block bg-orange hover:bg-orange-hover text-white px-8 py-3 rounded-lg font-semibold transition-colors"
        >
          Get Your Free GTM Audit
        </Link>
      </div>

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
            name: "Signal-Led GTM Sprints",
            description: "Go-to-market infrastructure sprints for B2B founders.",
            offers: offers.map((o) => ({
              "@type": "Offer",
              name: o.name,
              price: o.price.replace("£", ""),
              priceCurrency: "GBP",
              description: o.description,
            })),
          }),
        }}
      />
    </div>
  );
}
