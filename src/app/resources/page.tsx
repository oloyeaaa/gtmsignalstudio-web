import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Free tools, frameworks, and guides for B2B service companies running their own go-to-market. Built from live campaigns. No email gate.",
};

const resources = [
  {
    title: "The GTM Playbook",
    badge: "GitHub Repo",
    badgeClass: "bg-orange/10 text-orange",
    description:
      "18 Claude Code skills, 7 proven outreach patterns, and the full campaign framework. ICP research to pipeline forecast. Built from 900+ emails and 6 live audit deliveries.",
    stats: [
      { value: "18", label: "skills" },
      { value: "7", label: "patterns" },
      { value: "4", label: "frameworks" },
      { value: "2", label: "playbooks" },
    ],
    tags: ["Claude Code", "Cold Outreach", "GTM Audit", "Pipeline"],
    link: "https://github.com/oloyeaaa/gtm-playbook",
    cta: "View on GitHub",
    primary: true,
  },
  {
    title: "Claude Code Second Brain",
    badge: "Free Guide",
    badgeClass: "bg-sky-400/10 text-sky-400",
    description:
      "How to build persistent memory, learnings, and pattern recognition into your AI workflow. 4-layer memory system that makes Claude get smarter every session.",
    stats: [
      { value: "4", label: "memory layers" },
      { value: "1", label: "skill file" },
      { value: "15min", label: "setup" },
    ],
    tags: ["Claude Code", "AI Workflow", "Memory System", "Productivity"],
    link: "/blog/claude-code-memory-system",
    cta: "Read the Guide",
    primary: false,
  },
];

const highlights = [
  { number: "900+", label: "Cold emails sent across 3 segments" },
  { number: "85%", label: "Audit acceptance rate from replies" },
  { number: "10min", label: "Request to branded PDF in inbox" },
  { number: "41/100", label: "Average GTM score across audits" },
];

const patterns = [
  { id: "P001", name: "Trust Bridge", description: "The free audit converts at 85% once someone replies. Audit first, sell second. Always." },
  { id: "P002", name: "Hidden Differentiator", description: "Every company had at least one strong proof point buried where buyers never see it." },
  { id: "P003", name: "Score Hook", description: "\"Scored [Company] out of 100\" in the subject line. 6.7% reply rate." },
  { id: "P004", name: "2-Hour Window", description: "6 of 9 converting replies came within 2 hours. Speed beats perfection." },
  { id: "P005", name: "JS Rendering Gap", description: "3 of 5 Wix sites scored zero on technical SEO. Google cannot read them." },
  { id: "P006", name: "Service Menu Overload", description: "Every company listed too many services. Fix: 3 pillars, 3 pages, 3 entry points." },
  { id: "P007", name: "Signal Over Volume", description: "300 signal-qualified leads outperformed 900 cold ones. Timing beats volume." },
];

export default function ResourcesPage() {
  return (
    <div className="max-w-[1080px] mx-auto px-6 py-16">
      {/* Hero */}
      <div className="text-center mb-16 pt-8">
        <p className="font-mono text-orange text-xs uppercase tracking-widest mb-5">
          Open Source Resources
        </p>
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6 max-w-[720px] mx-auto leading-tight tracking-tight">
          The tools I built because I couldn&apos;t afford to hire.
        </h1>
        <p className="text-muted text-lg max-w-[600px] mx-auto leading-relaxed">
          Skills, frameworks, and guides for B2B founders running their own go-to-market.
          Built from live campaigns. No email gate. No sign-up. Just the system.
        </p>
      </div>

      {/* Resource Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
        {resources.map((r) => (
          <div
            key={r.title}
            className="bg-navy-light border border-navy-border rounded-xl p-10 flex flex-col hover:border-orange transition-colors"
          >
            <span className={`inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider px-3 py-1 rounded w-fit mb-5 ${r.badgeClass}`}>
              {r.badge}
            </span>
            <h3 className="font-heading text-xl font-bold text-white mb-3 tracking-tight">
              {r.title}
            </h3>
            <p className="text-muted text-sm leading-relaxed mb-6">{r.description}</p>

            {/* Stats */}
            <div className="flex flex-wrap gap-5 mb-6">
              {r.stats.map((s) => (
                <div key={s.label} className="flex items-center gap-1.5 font-mono text-xs text-muted">
                  <strong className="text-white font-semibold">{s.value}</strong> {s.label}
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-7">
              {r.tags.map((t) => (
                <span key={t} className="font-mono text-xs text-muted/70 bg-white/[0.04] border border-navy-border px-2.5 py-1 rounded">
                  {t}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-auto">
              <a
                href={r.link}
                target={r.link.startsWith("http") ? "_blank" : undefined}
                rel={r.link.startsWith("http") ? "noopener noreferrer" : undefined}
                className={`inline-block font-semibold text-sm px-7 py-3 rounded-lg transition-colors ${
                  r.primary
                    ? "bg-orange hover:bg-orange-hover text-white"
                    : "bg-sky-400/10 text-sky-400 border border-sky-400/25 hover:bg-sky-400/20"
                }`}
              >
                {r.cta}
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Campaign Highlights */}
      <section className="mb-20">
        <p className="font-mono text-orange text-xs uppercase tracking-widest mb-3">
          From the Playbook
        </p>
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">
          Numbers from live campaigns. Not theory.
        </h2>
        <p className="text-muted text-base max-w-[560px] leading-relaxed mb-10">
          Every skill, pattern, and framework was extracted from real outreach to B2B service companies.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {highlights.map((h) => (
            <div key={h.label} className="bg-navy-light border border-navy-border rounded-lg p-6">
              <div className="font-mono text-2xl font-bold text-white mb-1">{h.number}</div>
              <div className="text-muted text-sm leading-snug">{h.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Proven Patterns */}
      <section className="border-t border-navy-border pt-16 mb-20">
        <p className="font-mono text-orange text-xs uppercase tracking-widest mb-3">
          Proven Patterns
        </p>
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">
          7 patterns. Each confirmed 3+ times.
        </h2>
        <p className="text-muted text-base max-w-[560px] leading-relaxed mb-10">
          Extracted from live data. Not blog posts.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {patterns.map((p) => (
            <div key={p.id} className="bg-navy-light border border-navy-border rounded-lg p-6">
              <p className="font-mono text-xs text-muted/70 mb-2">{p.id}</p>
              <h3 className="font-heading font-semibold text-white text-sm mb-1">{p.name}</h3>
              <p className="text-muted text-sm leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Founder */}
      <section className="border-t border-navy-border pt-16 mb-20">
        <div className="bg-navy-light border border-navy-border rounded-xl p-10 md:p-12 md:grid md:grid-cols-[1fr_2fr] gap-12 items-center">
          <div className="bg-navy rounded-xl aspect-square flex items-center justify-center mb-6 md:mb-0">
            <span className="font-mono text-sm text-muted">[Photo]</span>
          </div>
          <div>
            <p className="font-mono text-orange text-xs uppercase tracking-widest mb-3">Who Built This</p>
            <h3 className="font-heading text-xl font-bold text-white mb-4">
              I&apos;m Oloye. I built this because I couldn&apos;t afford the agency.
            </h3>
            <p className="text-muted text-sm leading-relaxed mb-3">
              I run GTM Signal Studio — go-to-market diagnostics for B2B service companies.
              I&apos;ve audited consulting firms, agencies, and recruitment companies.
              The average score is 41 out of 100.
            </p>
            <p className="text-muted text-sm leading-relaxed mb-3">
              I built this system on the side of a full-time job. No funding. No team.
              Every skill, every framework, every pattern came from real campaigns — not a course or a playbook I bought.
            </p>
            <p className="text-muted text-sm leading-relaxed mb-5">
              I&apos;m giving it away because the free audit is how I earn trust. If the system helps
              you fix your GTM on your own, that&apos;s a win. If you want me to do it for you,
              that conversation starts with the audit.
            </p>
            <p className="font-mono text-white text-sm font-medium">
              — Oloye Adeosun, GTM Signal Studio
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-navy-border pt-16 text-center">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">
          Built in public. Given away for free.
        </h2>
        <p className="text-muted text-base max-w-[480px] mx-auto leading-relaxed mb-8">
          No email gate. No sign-up. Grab the tools and build your own GTM system.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="https://github.com/oloyeaaa/gtm-playbook"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-orange hover:bg-orange-hover text-white font-semibold px-8 py-3.5 rounded-lg transition-colors"
          >
            Get the Playbook
          </a>
          <Link
            href="/audit"
            className="border border-navy-border hover:border-orange text-white hover:text-orange font-semibold px-8 py-3.5 rounded-lg transition-colors"
          >
            Get a Free GTM Audit
          </Link>
        </div>
      </section>
    </div>
  );
}
