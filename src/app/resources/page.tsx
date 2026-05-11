import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Resources | AI Visibility Frameworks, Tools & Research",
  description:
    "Free enterprise marketing frameworks, tools, and research on AI visibility. Scorecard, playbook, citation signals, and the AI Visibility Benchmark.",
  keywords: [
    "AI visibility tools",
    "enterprise marketing resources",
    "AI visibility scorecard",
    "AI visibility playbook",
    "marketing frameworks",
  ],
  alternates: { canonical: "/resources" },
};

const resources = [
  {
    title: "AI Visibility Scorecard",
    badge: "Free Tool",
    badgeClass: "bg-green-400/10 text-green-400",
    description:
      "Interactive self-assessment. Score your company across 4 dimensions of AI visibility in under 5 minutes. Instant results.",
    stats: [
      { value: "4", label: "dimensions" },
      { value: "5min", label: "to complete" },
      { value: "100", label: "max score" },
    ],
    tags: ["AI Visibility", "Self-Assessment", "Interactive"],
    link: "/resources/ai-visibility-scorecard",
    cta: "Take the Scorecard",
    primary: true,
  },
  {
    title: "AI Visibility Playbook for Enterprise Marketers",
    badge: "Free Guide",
    badgeClass: "bg-orange/10 text-orange",
    description:
      "The full framework: 4 dimensions, scoring method, prioritised fix list. Everything enterprise marketing teams need to understand and improve their AI visibility.",
    stats: [
      { value: "4", label: "dimensions" },
      { value: "3", label: "priority tiers" },
      { value: "7", label: "sections" },
    ],
    tags: ["AI Visibility", "Framework", "Enterprise"],
    link: "/resources/ai-visibility-playbook",
    cta: "Read the Playbook",
    primary: false,
  },
  {
    title: "7 Signals That Make AI Cite Your Company",
    badge: "Free Guide",
    badgeClass: "bg-orange/10 text-orange",
    description:
      "The specific signals AI platforms use to decide who to recommend. Each signal includes the fix and why it works. Prioritised by impact.",
    stats: [
      { value: "7", label: "signals" },
      { value: "3", label: "priority fixes" },
    ],
    tags: ["AI Visibility", "Citation Signals", "Implementation"],
    link: "/resources/ai-citation-signals",
    cta: "See the Signals",
    primary: false,
  },
  {
    title: "AI Visibility Benchmark 2026",
    badge: "Original Research",
    badgeClass: "bg-sky-400/10 text-sky-400",
    description:
      "50 enterprise companies scored across 5 sectors. 44% scored 2/25 on citation presence. Full methodology, sector breakdown, and citable stats.",
    stats: [
      { value: "50", label: "companies" },
      { value: "5", label: "sectors" },
      { value: "10", label: "citable stats" },
    ],
    tags: ["Research", "Data", "Enterprise", "AI Visibility"],
    link: "/research/ai-visibility-benchmark-2026",
    cta: "Read the Research",
    primary: false,
  },
];

const researchStats = [
  { number: "44%", label: "of enterprise companies scored 2/25 on AI citation" },
  { number: "82.2", label: "average AI visibility score out of 100" },
  { number: "3x", label: "citation gap between SaaS and IT Services" },
  { number: "50", label: "enterprise companies scored in the benchmark" },
];

export default function ResourcesPage() {
  return (
    <>
      <PageHeader
        tagline="RESOURCES"
        title="Enterprise marketing frameworks and tools."
        subtitle="Free frameworks, tools, and original research on AI visibility. Built for enterprise marketing teams. Grounded in real data."
      />

      <div className="max-w-[1080px] mx-auto px-6 py-16">
        {/* Resource Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {resources.map((r) => (
            <Link
              key={r.title}
              href={r.link}
              className="bg-navy-light border border-navy-border rounded-xl p-10 flex flex-col hover:border-orange transition-colors"
            >
              <span
                className={`inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider px-3 py-1 rounded w-fit mb-5 ${r.badgeClass}`}
              >
                {r.badge}
              </span>
              <h3 className="font-heading text-xl font-bold text-white mb-3 tracking-tight">
                {r.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed mb-6">
                {r.description}
              </p>

              <div className="flex flex-wrap gap-5 mb-6">
                {r.stats.map((s) => (
                  <div
                    key={s.label}
                    className="flex items-center gap-1.5 font-mono text-xs text-muted"
                  >
                    <strong className="text-white font-semibold">
                      {s.value}
                    </strong>{" "}
                    {s.label}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mb-7">
                {r.tags.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-xs text-muted/70 bg-white/[0.04] border border-navy-border px-2.5 py-1 rounded"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-auto">
                <span
                  className={`inline-block font-semibold text-sm px-7 py-3 rounded-lg transition-colors ${
                    r.primary
                      ? "bg-orange hover:bg-orange-hover text-white"
                      : "bg-navy border border-navy-border text-white hover:border-orange"
                  }`}
                >
                  {r.cta}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Research Data */}
        <section className="mb-20">
          <p className="font-mono text-orange text-xs uppercase tracking-widest mb-3">
            FROM THE RESEARCH
          </p>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-dark mb-4 tracking-tight">
            Numbers from original research. Not recycled reports.
          </h2>
          <p className="text-muted text-base max-w-[560px] leading-relaxed mb-10">
            Every stat comes from our own studies. The AI Visibility Benchmark
            2026 scored 50 enterprise companies across 5 sectors.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {researchStats.map((h) => (
              <div
                key={h.label}
                className="bg-navy-light border border-navy-border rounded-lg p-6"
              >
                <div className="font-mono text-2xl font-bold text-orange mb-1">
                  {h.number}
                </div>
                <div className="text-muted text-sm leading-snug">
                  {h.label}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Link
              href="/research"
              className="text-orange font-semibold text-sm hover:underline"
            >
              View all research &rarr;
            </Link>
          </div>
        </section>

        {/* About */}
        <section className="border-t border-light-border pt-16 mb-20">
          <div className="bg-navy-light border border-navy-border rounded-xl p-10 md:p-12 md:grid md:grid-cols-[1fr_2fr] gap-12 items-center">
            <div className="flex items-center justify-center mb-6 md:mb-0">
              <Image
                src="/oloye-profile.png"
                alt="Oloye Adeosun"
                width={200}
                height={200}
                className="rounded-2xl object-cover"
              />
            </div>
            <div>
              <p className="font-mono text-orange text-xs uppercase tracking-widest mb-3">
                ABOUT
              </p>
              <h3 className="font-heading text-xl font-bold text-white mb-4">
                Enterprise marketing practitioner. Publishing what works.
              </h3>
              <p className="text-muted text-sm leading-relaxed mb-3">
                I work in enterprise marketing every day. Campaigns, MarTech,
                automation, tracking, web performance. I see what works, what
                breaks, and what most teams have not looked at yet.
              </p>
              <p className="text-muted text-sm leading-relaxed mb-3">
                I publish original research and frameworks here because most
                marketing advice comes from people who advise on campaigns, not
                people who run them. Everything on this site is grounded in real
                data and enterprise experience.
              </p>
              <p className="text-muted text-sm leading-relaxed mb-5">
                The AI Visibility Benchmark 2026 was the first study. More are
                coming.
              </p>
              <Link
                href="/about"
                className="text-orange font-semibold text-sm hover:underline"
              >
                Read more &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="border-t border-light-border pt-16 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-dark mb-4 tracking-tight">
            Get enterprise marketing insights. Weekly.
          </h2>
          <p className="text-muted text-base max-w-[480px] mx-auto leading-relaxed mb-8">
            Research-backed frameworks on AI visibility, MarTech, and enterprise
            GTM. No fluff. No recycled theory.
          </p>
          <a
            href="https://newsletter.gtmsignalstudio.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-orange hover:bg-orange-hover text-white font-semibold px-8 py-3.5 rounded-lg transition-colors"
          >
            Subscribe to The GTM Signal
          </a>
        </section>

        {/* Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              name: "GTM Signal Studio Resources",
              description:
                "Free enterprise marketing frameworks, tools, and research on AI visibility.",
              url: "https://gtmsignalstudio.com/resources",
              publisher: {
                "@type": "Organization",
                name: "GTM Signal Studio",
                url: "https://gtmsignalstudio.com",
              },
              mainEntity: {
                "@type": "ItemList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "AI Visibility Scorecard",
                    url: "https://gtmsignalstudio.com/resources/ai-visibility-scorecard",
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "AI Visibility Playbook",
                    url: "https://gtmsignalstudio.com/resources/ai-visibility-playbook",
                  },
                  {
                    "@type": "ListItem",
                    position: 3,
                    name: "7 AI Citation Signals",
                    url: "https://gtmsignalstudio.com/resources/ai-citation-signals",
                  },
                  {
                    "@type": "ListItem",
                    position: 4,
                    name: "AI Visibility Benchmark 2026",
                    url: "https://gtmsignalstudio.com/research/ai-visibility-benchmark-2026",
                  },
                ],
              },
            }),
          }}
        />
      </div>
    </>
  );
}
