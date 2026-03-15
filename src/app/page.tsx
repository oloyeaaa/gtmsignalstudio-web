import Link from "next/link";

const pillars = [
  {
    title: "Positioning Sprint",
    price: "£497",
    description:
      "Clarify your ICP, sharpen your messaging, and rebuild your homepage around what actually converts.",
    features: ["ICP definition", "Messaging framework", "Homepage wireframe", "Competitive positioning"],
  },
  {
    title: "GTM Fix Sprint",
    price: "£997",
    description:
      "Full GTM audit + implementation. Fix the infrastructure gaps that are costing you pipeline.",
    features: ["Full GTM audit (scored /100)", "Website restructure plan", "Content-market fit analysis", "3-month action plan"],
    featured: true,
  },
  {
    title: "Outreach Setup",
    price: "£997",
    description:
      "Signal-led outreach system built and launched. Domain setup, sequences, and buying signal detection.",
    features: ["Domain + mailbox setup", "3 signal-triggered sequences", "SmartLead configuration", "14-day launch support"],
  },
];

export default function Home() {
  return (
    <>
      {/* Hero — dark */}
      <section className="bg-navy relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <p className="font-mono text-orange text-sm mb-4 tracking-wider">
              SIGNAL-LED GTM FOR B2B FOUNDERS
            </p>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
              Stop Spray-and-Pray.{" "}
              <span className="text-orange">Start Signal-Led.</span>
            </h1>
            <p className="text-white/60 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl">
              Most B2B outreach fails before the email is written. Not because
              the copy is bad — because there was no reason to send it. We fix
              the infrastructure that makes pipeline predictable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/audit"
                className="bg-orange hover:bg-orange-hover text-white px-6 py-3 rounded-lg font-semibold text-center transition-colors"
              >
                Get Your Free GTM Audit
              </Link>
              <Link
                href="/blog"
                className="border border-white/20 hover:border-white/40 text-white px-6 py-3 rounded-lg font-semibold text-center transition-colors"
              >
                Read the Blog
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do — white */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">WHAT WE DO</p>
          <h2 className="font-heading text-3xl font-bold text-text-dark mb-4">
            Go-to-market infrastructure that works.
          </h2>
          <p className="text-text-muted text-lg mb-12 max-w-2xl">
            Three sprints. Each one fixes a specific layer of your GTM. Start with the one that matches your biggest gap.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className={`rounded-xl p-6 border transition-shadow hover:shadow-lg ${
                  pillar.featured
                    ? "border-orange bg-navy text-white"
                    : "border-light-border bg-cream"
                }`}
              >
                {pillar.featured && (
                  <span className="inline-block bg-orange text-white text-xs font-mono px-2 py-1 rounded mb-4">
                    MOST POPULAR
                  </span>
                )}
                <h3 className={`font-heading text-xl font-bold mb-1 ${pillar.featured ? "text-white" : "text-text-dark"}`}>
                  {pillar.title}
                </h3>
                <p className="text-orange text-2xl font-bold mb-4">{pillar.price}</p>
                <p className={`text-sm mb-6 leading-relaxed ${pillar.featured ? "text-white/70" : "text-text-muted"}`}>
                  {pillar.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {pillar.features.map((f) => (
                    <li key={f} className={`text-sm flex items-start gap-2 ${pillar.featured ? "text-white/80" : "text-text-body"}`}>
                      <span className="text-orange mt-0.5">→</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/work-with-me"
                  className={`block text-center py-2 rounded-lg font-semibold text-sm transition-colors ${
                    pillar.featured
                      ? "bg-orange hover:bg-orange-hover text-white"
                      : "border border-light-border hover:border-orange text-text-dark hover:text-orange"
                  }`}
                >
                  Learn More
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Audit CTA — dark */}
      <section className="bg-navy">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <p className="font-mono text-orange text-sm mb-2 tracking-wider">THE TRUST BRIDGE</p>
            <h2 className="font-heading text-3xl font-bold text-white mb-4">
              Your GTM. Scored out of 100.
            </h2>
            <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">
              We audit your ICP clarity, messaging, channel mix, content fit, and signal detection.
              You get a branded PDF report with a score and three things to fix this week. Free. No strings.
            </p>
            <Link
              href="/audit"
              className="inline-block bg-orange hover:bg-orange-hover text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Get Your Free GTM Audit
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter — cream */}
      <section className="bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">THE GTM SIGNAL</p>
          <h2 className="font-heading text-2xl font-bold text-text-dark mb-4">
            Weekly frameworks. Real data. No fluff.
          </h2>
          <p className="text-text-muted mb-6 max-w-lg mx-auto">
            Every Tuesday — signal-led GTM insights from real campaigns, not recycled marketing theory.
          </p>
          <a
            href="https://newsletter.gtmsignalstudio.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-orange hover:bg-orange-hover text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Subscribe to The GTM Signal
          </a>
        </div>
      </section>
    </>
  );
}
