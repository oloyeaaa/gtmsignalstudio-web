"use client";

import { useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";

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
    <>
      <PageHeader tagline="TOOLS" title="The tools behind the studio." subtitle="Every tool we use to research, write, build, and ship. No affiliates. Just what works." breadcrumb={{ label: "Resources", href: "/resources" }} />

    <div className="max-w-[1080px] mx-auto px-6 py-16">

      {/* Filters */}
      <div className="flex flex-wrap gap-2 justify-center mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`font-mono text-xs uppercase tracking-wider px-4 py-2 rounded-md border transition-colors ${
              activeFilter === cat
                ? "bg-orange/10 border-orange text-orange"
                : "border-light-border text-muted hover:border-orange hover:text-orange"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tool Grid */}
      <h2 className="font-heading text-xl font-bold text-text-dark mb-6">
        {activeFilter === "All" ? "All tools" : activeFilter}
      </h2>
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
    </>
  );
}
