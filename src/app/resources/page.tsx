import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import EmailGate from "@/components/EmailGate";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Free tools, templates, and guides for B2B founders building GTM systems with AI. Skill file templates, outreach frameworks, and audit tools.",
};

const resources = [
  {
    title: "AI Visibility Signal Scorecard",
    badge: "Free Tool",
    badgeClass: "bg-green-400/10 text-green-400",
    description:
      "Can AI find your business? Self-assess across 4 dimensions — AI Citation, Entity Recognition, Content Structure, Citation Breadth. Takes 5 minutes. Real-time scoring.",
    stats: [
      { value: "4", label: "dimensions" },
      { value: "5min", label: "to complete" },
      { value: "60", label: "max score" },
    ],
    tags: ["AI Visibility", "Signal Detection", "Self-Assessment", "B2B"],
    link: "/resources/ai-visibility-scorecard",
    cta: "Take the Scorecard",
    primary: true,
  },
  {
    title: "7 Signals That Make AI Cite Your Company",
    badge: "Free Guide",
    badgeClass: "bg-orange/10 text-orange",
    description:
      "The structural changes that move your company from invisible to recommended by AI. Each signal includes the fix and why it works. Implementation guide for the scorecard.",
    stats: [
      { value: "7", label: "signals" },
      { value: "3", label: "priority fixes" },
      { value: "30 days", label: "to see shift" },
    ],
    tags: ["AI Visibility", "Content Strategy", "SEO to AI", "B2B"],
    link: "/resources/ai-citation-signals",
    cta: "Read the Guide",
    primary: false,
  },
  {
    title: "The GTM Playbook",
    badge: "GitHub Repo",
    badgeClass: "bg-sky-400/10 text-sky-400",
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
    primary: false,
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
          Builder Resources
        </p>
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-text-dark mb-6 max-w-[720px] mx-auto leading-tight tracking-tight">
          The tools I built because I couldn&apos;t afford to hire.
        </h1>
        <p className="text-muted text-lg max-w-[600px] mx-auto leading-relaxed">
          Templates, frameworks, and guides for B2B founders building GTM systems with AI.
          Built from live campaigns. Grab what you need.
        </p>
      </div>

      {/* Featured: Skill File Templates (gated) */}
      <section className="mb-12">
        <div className="bg-navy-light border-2 border-orange/40 rounded-xl p-10 md:grid md:grid-cols-[1fr_1fr] gap-10 items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider px-3 py-1 rounded w-fit mb-5 bg-orange/10 text-orange">
              Free Download
            </span>
            <h2 className="font-heading text-2xl font-bold text-white mb-4 tracking-tight">
              AI Skill File Templates
            </h2>
            <p className="text-muted text-sm leading-relaxed mb-4">
              3 ready-to-use templates that give your AI persistent expertise. Stop re-prompting
              every session. One skill file replaces 45 minutes of context-setting.
            </p>
            <div className="flex flex-wrap gap-5 mb-5">
              <div className="flex items-center gap-1.5 font-mono text-xs text-muted">
                <strong className="text-white font-semibold">3</strong> templates
              </div>
              <div className="flex items-center gap-1.5 font-mono text-xs text-muted">
                <strong className="text-white font-semibold">10min</strong> setup
              </div>
              <div className="flex items-center gap-1.5 font-mono text-xs text-muted">
                <strong className="text-white font-semibold">.md</strong> format
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-7">
              {["Claude Code", "Cursor", "AI Workflow", "Productivity"].map((t) => (
                <span key={t} className="font-mono text-xs text-muted/70 bg-white/[0.04] border border-navy-border px-2.5 py-1 rounded">
                  {t}
                </span>
              ))}
            </div>

            <p className="text-muted text-xs mb-4">Includes:</p>
            <ul className="text-muted text-sm space-y-1.5 mb-7">
              <li className="flex items-start gap-2">
                <span className="text-orange mt-0.5">→</span>
                Content creator template (LinkedIn, blog, newsletter)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange mt-0.5">→</span>
                Research agent template (audits, competitor analysis)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange mt-0.5">→</span>
                Blank template with 3 worked examples
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange mt-0.5">→</span>
                Quick-start guide with before/after comparison
              </li>
            </ul>

            <EmailGate
              magnet="skill-file-templates"
              downloadUrl="https://github.com/oloyeaaa/gtm-playbook/tree/main/skill-file-templates"
              buttonLabel="Get the Templates"
            />
          </div>

          <div className="hidden md:block">
            <Image
              src="/skill-templates-preview.png"
              alt="AI Skill File Template — content creator template shown in code editor"
              width={1200}
              height={630}
              className="rounded-lg border border-navy-border"
            />
          </div>
        </div>
      </section>

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
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-dark mb-4 tracking-tight">
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
      <section className="border-t border-light-border pt-16 mb-20">
        <p className="font-mono text-orange text-xs uppercase tracking-widest mb-3">
          Proven Patterns
        </p>
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-dark mb-4 tracking-tight">
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
            <p className="font-mono text-orange text-xs uppercase tracking-widest mb-3">Who Built This</p>
            <h3 className="font-heading text-xl font-bold text-white mb-4">
              I build AI-powered GTM infrastructure. And I teach other founders how to do the same.
            </h3>
            <p className="text-muted text-sm leading-relaxed mb-3">
              I run GTM Signal Studio. 5 departments, 33 AI skills, full pipeline.
              One person. No team. No agency.
            </p>
            <p className="text-muted text-sm leading-relaxed mb-3">
              I built this system on the side of a full-time job. No funding.
              Every skill, every framework, every pattern came from real campaigns — not a course I bought.
            </p>
            <p className="text-muted text-sm leading-relaxed mb-5">
              I&apos;m giving the tools away because the best way to earn trust is to prove you can build.
              If you want to build your own system, grab the templates. If you want me to build it for you,
              that conversation starts with the free audit.
            </p>
            <p className="font-mono text-white text-sm font-medium">
              — Oloye Adeosun, GTM Signal Studio
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-light-border pt-16 text-center">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-dark mb-4 tracking-tight">
          Built in public. Shared with builders.
        </h2>
        <p className="text-muted text-base max-w-[480px] mx-auto leading-relaxed mb-8">
          Grab the tools and build your own GTM system. Or get a free audit and let me build it for you.
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
            className="border border-light-border hover:border-orange text-text-dark hover:text-orange font-semibold px-8 py-3.5 rounded-lg transition-colors"
          >
            Get a Free GTM Audit
          </Link>
        </div>
      </section>
    </div>
  );
}
