"use client";

import { useState } from "react";
import Link from "next/link";

const categories = ["All", "Outreach", "Content", "CRM", "Intelligence", "Infrastructure", "AI"];

const categoryColors: Record<string, string> = {
  Outreach: "bg-orange/10 text-orange",
  Content: "bg-sky-400/10 text-sky-400",
  CRM: "bg-purple-400/10 text-purple-400",
  Intelligence: "bg-green-400/10 text-green-400",
  Infrastructure: "bg-yellow-400/10 text-yellow-400",
  AI: "bg-pink-400/10 text-pink-400",
};

const tools = [
  {
    name: "SmartLead",
    category: "Outreach",
    pricing: "From $39/mo",
    description: "Cold email infrastructure. Multi-mailbox rotation, warmup, sequence builder, and reply tracking. Runs all my outbound campaigns across 9 mailboxes and 3 domains.",
    tags: ["Cold Email", "Sequences", "Warmup", "Multi-Mailbox"],
    note: "I run 9 mailboxes across 3 domains. Open tracking OFF — reply rate is the only metric.",
  },
  {
    name: "Sales Navigator",
    category: "Intelligence",
    pricing: "~$99/mo",
    description: "Signal detection and prospecting. Boolean search by hiring signals, funding events, and leadership changes. The source for signal-qualified lead lists.",
    tags: ["Prospecting", "Buying Signals", "Lead Lists"],
    note: "Keep only while actively prospecting. 300 signal-qualified leads beat 900 cold ones (P007).",
  },
  {
    name: "Taplio",
    category: "Content",
    pricing: "From $49/mo",
    description: "LinkedIn scheduling and analytics. Posts scheduled at 5:15am for best engagement. Carousel builder, post analytics, and content queue for Mon/Wed/Fri cadence.",
    tags: ["LinkedIn", "Scheduling", "Analytics", "Carousels"],
    note: "Lane 1 (Authority). Schedule posts, never sell in the post. Newsletter link goes in comments only.",
  },
  {
    name: "Beehiiv",
    category: "Content",
    pricing: "Free tier",
    description: "Newsletter platform. Clean editor, subscriber analytics, and referral system. Hosts \"The GTM Signal\" — the Lane 3 nurture channel that parks warm leads until ready.",
    tags: ["Newsletter", "Nurture", "Email", "Subscribers"],
    note: "Lane 3 (Nurture). Fed only by LinkedIn organic. 3+ opens/clicks = buying signal.",
  },
  {
    name: "Airtable",
    category: "CRM",
    pricing: "Free tier",
    description: "Lightweight CRM and operations hub. Campaign tracker, content engine, audit data, and ICP research topics — all in one base with 5 linked tables.",
    tags: ["Pipeline", "Content Calendar", "Audit Data", "API"],
    note: "5 tables: Campaign-Tracker, Content-Engine, Audit-Data, ICP-Research-Topics, Alluvium.",
  },
  {
    name: "Claude Code",
    category: "AI",
    pricing: "From $20/mo",
    description: "AI coding agent that runs the entire skill system. 37 custom skills across research, outreach, content, intelligence, and operations. The engine underneath everything.",
    tags: ["Skills", "Automation", "Writing", "Research"],
    note: "37 skills. ICP research to pipeline forecast. The GTM Playbook is the open-source version.",
  },
  {
    name: "Vercel",
    category: "Infrastructure",
    pricing: "Free tier",
    description: "Hosting for the main website and web tools. Instant deploys from GitHub. Runs gtmsignalstudio.com and all campaign-specific landing pages.",
    tags: ["Hosting", "Deploy", "Landing Pages", "CDN"],
    note: "CLI deploy in 6 seconds. No build step needed for static HTML.",
  },
  {
    name: "Google Workspace",
    category: "Infrastructure",
    pricing: "From $6/mo",
    description: "Gmail, Drive, and Docs. Professional email for outreach domains, document storage for audit reports, and shared folders for client deliverables.",
    tags: ["Email", "Drive", "Docs", "Calendar"],
    note: "Professional domain email is non-negotiable for deliverability.",
  },
  {
    name: "Focusee",
    category: "Content",
    pricing: "Lifetime deal",
    description: "Screen recording for walkthroughs and demos. Record audit walkthrough videos, loom-style explainers, and client onboarding guides. Lifetime deal — no recurring cost.",
    tags: ["Screen Recording", "Demos", "Walkthroughs"],
    note: "Audit walkthrough videos build more trust than PDF alone. Record once, send to many.",
  },
  {
    name: "Supabase",
    category: "Infrastructure",
    pricing: "Free tier",
    description: "Postgres database and storage for the website CMS. Blog posts, pages, redirects, and custom analytics events. Replaced WordPress as the content backend.",
    tags: ["Database", "CMS", "Storage", "Auth"],
    note: "Full-text search, auto-calculated reading times, row-level security. Free tier handles everything.",
  },
  {
    name: "Calendly",
    category: "CRM",
    pricing: "Free tier",
    description: "Booking link for audit walkthroughs and discovery calls. One link, no back-and-forth. Used in Lane 2 (outreach) and Lane 3 (newsletter) CTAs only.",
    tags: ["Booking", "Calls", "Scheduling"],
    note: "Never in LinkedIn posts (Lane 1). Only after trust is built — audit delivery or newsletter CTA.",
  },
  {
    name: "Exa",
    category: "Intelligence",
    pricing: "Pay-per-use",
    description: "Neural search API for lead classification and enrichment. Used to classify 942 C004 leads into segments (recruitment, agencies, IT services) programmatically.",
    tags: ["Search API", "Classification", "Enrichment"],
    note: "Free tier sufficient for early-stage. Upgrade only when pipeline justifies the cost.",
  },
];

export default function ToolsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = activeFilter === "All"
    ? tools
    : tools.filter((t) => t.category === activeFilter);

  return (
    <div className="max-w-[1080px] mx-auto px-6 py-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted mb-8">
        <Link href="/resources" className="hover:text-white transition-colors">Resources</Link>
        <span>→</span>
        <span className="text-white">GTM Tools</span>
      </nav>

      {/* Hero */}
      <div className="text-center mb-12 pt-4">
        <p className="font-mono text-orange text-xs uppercase tracking-widest mb-5">
          Curated Stack
        </p>
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-5 max-w-[660px] mx-auto leading-tight tracking-tight">
          The GTM tools I actually use.
        </h1>
        <p className="text-muted text-base max-w-[560px] mx-auto leading-relaxed">
          No affiliate links. No sponsorships. These are the tools that run my outreach, content,
          pipeline, and intelligence. Curated from experience.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 justify-center mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`font-mono text-xs uppercase tracking-wider px-4 py-2 rounded-md border transition-colors ${
              activeFilter === cat
                ? "bg-orange/10 border-orange text-orange"
                : "border-navy-border text-muted hover:border-orange hover:text-orange"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tool Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
        {filtered.map((tool) => (
          <div
            key={tool.name}
            className="bg-navy-light border border-navy-border rounded-xl p-7 flex flex-col hover:border-orange transition-colors"
          >
            <h3 className="font-heading font-semibold text-white text-base mb-3">{tool.name}</h3>
            <p className="text-muted text-sm leading-relaxed mb-5 flex-1">{tool.description}</p>

            {/* Meta */}
            <div className="flex items-center justify-between mb-4">
              <span className={`font-mono text-xs uppercase tracking-wider px-2.5 py-1 rounded ${categoryColors[tool.category] || "text-muted"}`}>
                {tool.category}
              </span>
              <span className="font-mono text-xs text-muted/70">{tool.pricing}</span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {tool.tags.map((t) => (
                <span key={t} className="font-mono text-[10px] text-muted/60 bg-white/[0.04] border border-navy-border px-2 py-0.5 rounded">
                  {t}
                </span>
              ))}
            </div>

            {/* Note */}
            <p className="text-muted/60 text-xs italic pt-3 border-t border-navy-border mt-auto leading-relaxed">
              {tool.note}
            </p>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <p className="text-center text-muted/60 text-sm mb-16">
        No affiliate links on this page. I pay for these tools myself.
        Listed because they work, not because I get paid to say so.
      </p>
    </div>
  );
}
