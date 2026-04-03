"use client";

import { useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";

const categories = ["All", "Agents", "Chrome Extensions", "Python Tools", "Workflows"];

const categoryColors: Record<string, string> = {
  Agents: "bg-orange/10 text-orange",
  "Chrome Extensions": "bg-sky-400/10 text-sky-400",
  "Python Tools": "bg-green-400/10 text-green-400",
  Workflows: "bg-purple-400/10 text-purple-400",
};

const techColors: Record<string, string> = {
  Python: "bg-green-400/10 text-green-400 border-green-400/20",
  JavaScript: "bg-yellow-400/10 text-yellow-400 border-yellow-400/20",
  "Claude Code": "bg-pink-400/10 text-pink-400 border-pink-400/20",
  Playwright: "bg-sky-400/10 text-sky-400 border-sky-400/20",
  "Next.js": "bg-white/10 text-white border-white/20",
  "Perplexity API": "bg-purple-400/10 text-purple-400 border-purple-400/20",
  "fal.ai": "bg-orange/10 text-orange border-orange/20",
  "Supabase": "bg-emerald-400/10 text-emerald-400 border-emerald-400/20",
  "Airtable API": "bg-blue-400/10 text-blue-400 border-blue-400/20",
};

const tools = [
  // Agents
  {
    name: "AI Visibility Audit",
    category: "Agents",
    description: "4-dimension AI visibility scanner. Checks Google AI Mode, Perplexity, and ChatGPT citation presence. Scores 0-100 with a prioritised fix list and branded PDF report.",
    tech: ["Python", "Perplexity API", "Claude Code"],
    github: "https://github.com/oloyeaaa/gss-open-tools/tree/master/agents/ri-ai-presence-audit",
    note: "Powers the £297 AI Visibility Audit service. 150+ companies benchmarked across 3 published studies.",
  },
  {
    name: "Blog Agent",
    category: "Agents",
    description: "Full blog post pipeline. Researches the topic, writes a draft, generates a header image, formats for publishing, and pushes to Supabase + Airtable in one run.",
    tech: ["Claude Code", "fal.ai", "Supabase"],
    github: "https://github.com/oloyeaaa/gss-open-tools/tree/master/agents/cm-blog-agent",
    note: "Orchestrates blog-writer, infographic-builder, and copywriter skills.",
  },
  {
    name: "LinkedIn Agent",
    category: "Agents",
    description: "End-to-end LinkedIn content pipeline. Researches if needed, writes the post, generates a companion image, and saves outputs locally. Handles both standard posts and multi-slide carousels.",
    tech: ["Claude Code", "fal.ai"],
    github: "https://github.com/oloyeaaa/gss-open-tools/tree/master/agents/cm-linkedin-agent",
    note: "Orchestrates linkedin-creator, infographic-builder, and copywriter skills.",
  },
  {
    name: "Newsletter Agent",
    category: "Agents",
    description: "Full newsletter pipeline. Researches the topic, writes the issue, generates a header image, formats for Beehiiv HTML, and saves outputs locally.",
    tech: ["Claude Code", "fal.ai"],
    github: "https://github.com/oloyeaaa/gss-open-tools/tree/master/agents/cm-newsletter-agent",
    note: "Orchestrates newsletter-creator and infographic-builder skills.",
  },
  {
    name: "YouTube Agent",
    category: "Agents",
    description: "Video production pipeline. Researches the topic, writes a talk-track script with timestamps, generates an Excalidraw diagram, creates a thumbnail, and writes metadata.",
    tech: ["Claude Code", "fal.ai"],
    github: "https://github.com/oloyeaaa/gss-open-tools/tree/master/agents/cm-youtube-agent",
    note: "Orchestrates youtube-scriptwriter, excalidraw-builder, and infographic-builder.",
  },
  {
    name: "GTM Audit",
    category: "Agents",
    description: "6-dimension Go-To-Market audit for any B2B website. Scores ICP clarity, messaging, content, channels, signals, and AI visibility. Single-pass analysis with branded PDF output.",
    tech: ["Claude Code", "Python"],
    github: "https://github.com/oloyeaaa/gss-open-tools/tree/master/agents/so-gtm-audit",
    note: "6 sub-skills: gtm-icp, gtm-messaging, gtm-content, gtm-channels, gtm-signals, gtm-report-pdf.",
  },
  {
    name: "Signal Source Method",
    category: "Agents",
    description: "6-step research framework for producing original data that AI platforms cite. Signal, Scope, Scan, Score, Source, Seed. Built to replace reliance on third-party research.",
    tech: ["Claude Code", "Python"],
    github: "https://github.com/oloyeaaa/gss-open-tools/tree/master/frameworks",
    note: "Powers the monthly AI Visibility Benchmark. April 2026: 150 companies, 5 sectors.",
  },

  // Chrome Extensions
  {
    name: "Google Maps Lead Scraper",
    category: "Chrome Extensions",
    description: "Scrapes business data from Google Maps search results. Exports name, address, phone, website, and rating to CSV for the daily outreach workflow.",
    tech: ["JavaScript"],
    github: "https://github.com/oloyeaaa/gss-open-tools/tree/master/chrome-extensions/gmaps-lead-scraper",
    note: "Feeds the 5-emails-per-day manual outreach process.",
  },
  {
    name: "LinkedIn Comment Assist",
    category: "Chrome Extensions",
    description: "AI-powered LinkedIn comment generator. Reads posts, articles, and newsletters. 5 comment styles, 3 options per generation. Voice-encoded prompts with banned words and preferred vocabulary.",
    tech: ["JavaScript", "Claude Code"],
    github: "https://github.com/oloyeaaa/gss-open-tools/tree/master/chrome-extensions/linkedin-comment-extension",
    note: "Saves 15-20 minutes per day on LinkedIn engagement. Full details at /resources/tools/linkedin-comment-assist",
    link: "/resources/tools/linkedin-comment-assist",
  },
  {
    name: "Reddit Comment Assist",
    category: "Chrome Extensions",
    description: "AI-powered Reddit comment generator. Same concept as the LinkedIn extension but tuned for Reddit's tone and community norms. Uses Claude API for generation.",
    tech: ["JavaScript", "Claude Code"],
    github: "https://github.com/oloyeaaa/gss-open-tools/tree/master/chrome-extensions/reddit-comment-extension",
    note: "Ensures comments add value, not spam. Matches subreddit tone.",
  },

  // Python Tools
  {
    name: "AI Presence Scanner",
    category: "Python Tools",
    description: "Automated AI visibility detection via the Perplexity API. Input a company, domain, and keywords. Returns JSON with 4 dimension scores and raw API responses.",
    tech: ["Python", "Perplexity API"],
    github: "https://github.com/oloyeaaa/gss-open-tools/blob/master/python-tools/ai_presence_scanner.py",
    note: "Core engine behind the AI Visibility Audit and the benchmark research.",
  },
  {
    name: "Batch AI Scanner",
    category: "Python Tools",
    description: "Batch version of the AI presence scanner. Processes a list of companies in sequence, rate-limits API calls, and exports results to JSON and CSV.",
    tech: ["Python", "Perplexity API"],
    github: "https://github.com/oloyeaaa/gss-open-tools/blob/master/python-tools/batch_ai_scan.py",
    note: "Multi-API scanner (OpenAI, Gemini, Brave, Tavily). Scans 150+ companies monthly.",
  },
  {
    name: "LinkedIn Post Image Generator",
    category: "Python Tools",
    description: "Generates stat-based LinkedIn images (1200x628) from data. Takes a headline stat, subtitle, and branding and renders a shareable image using Playwright.",
    tech: ["Python", "Playwright"],
    github: "https://github.com/oloyeaaa/gss-open-tools/blob/master/python-tools/linkedin_post_image.py",
    note: "Companion images for data-driven LinkedIn posts.",
  },
  {
    name: "GTM Audit PDF Generator",
    category: "Python Tools",
    description: "Converts GTM audit markdown reports into branded, client-ready PDFs with scoring visuals, findings tables, and prioritised action plans. Replaced Gamma.",
    tech: ["Python"],
    github: "https://github.com/oloyeaaa/gss-open-tools/blob/master/python-tools/gtm_audit_pdf.py",
    note: "Custom-built to replace the Gamma subscription. Full brand control.",
  },
  {
    name: "AI Presence Report PDF",
    category: "Python Tools",
    description: "Branded PDF generator for AI Visibility audit reports. Takes the markdown audit output and renders a professional document with scores, findings, and recommendations.",
    tech: ["Python"],
    github: "https://github.com/oloyeaaa/gss-open-tools/blob/master/python-tools/ai_presence_report_pdf.py",
    note: "Deliverable for the £297 AI Visibility Audit.",
  },
  {
    name: "Infographic Builder",
    category: "Python Tools",
    description: "AI image generation using fal.ai (Nano Banana model) with programmatic GSS logo overlay. Creates branded header images for blog posts, newsletters, and social.",
    tech: ["Python", "fal.ai"],
    github: "https://github.com/oloyeaaa/gss-open-tools/blob/master/python-tools/branded_infographic.py",
    note: "Every content agent calls this for image generation.",
  },

  {
    name: "MarTech Stack Auditor",
    category: "Python Tools",
    description: "Scans any website to detect installed marketing tools from HTML, JS, headers, and DNS. Identifies 50+ tools across 10 categories, scores the stack on 4 dimensions, flags redundancies, and generates a branded PDF report.",
    tech: ["Python", "Playwright"],
    github: "https://github.com/oloyeaaa/gss-open-tools/blob/master/python-tools/martech_scanner.py",
    note: "No API keys needed. Detects analytics, automation, chat, ads, CMS, CDN, A/B testing, and privacy tools.",
  },

  // Workflows
  {
    name: "Blog Publishing Pipeline",
    category: "Workflows",
    description: "Markdown to live blog post. Takes a markdown file and header image, publishes to Supabase, uploads the image to storage, and pushes metadata to the Airtable Content-Engine.",
    tech: ["Next.js", "Supabase", "Airtable API"],
    github: "https://github.com/oloyeaaa/gss-open-tools/blob/master/workflows/publish-post.js",
    note: "One command: node scripts/publish-post.js --markdown FILE --image IMG --slug SLUG",
  },
  {
    name: "Research Pipeline",
    category: "Workflows",
    description: "The Signal Source Method in practice. Scan companies for AI visibility gaps, score across 4 dimensions, analyse patterns, publish findings with methodology, and seed into content.",
    tech: ["Python", "Claude Code", "Perplexity API"],
    github: "https://github.com/oloyeaaa/gss-open-tools/tree/master/frameworks",
    note: "Generates branded research reports from benchmark data. Used across all published studies.",
  },
  {
    name: "Daily Outreach Workflow",
    category: "Workflows",
    description: "Manual prospecting system. Google Maps search, AI Mode visibility check, personalised Gmail email. 5 emails per day to local Kent businesses before noon.",
    tech: ["JavaScript", "Claude Code"],
    github: "https://github.com/oloyeaaa/gss-open-tools/tree/master/agents/so-daily-outreach",
    note: "Lean revenue track. Google Maps + AI Mode + Gmail. No paid tools needed.",
  },
  {
    name: "Content Orchestration",
    category: "Workflows",
    description: "37 Claude Code skills across 5 departments. Research, write, design, publish, and analyse — all coordinated through agent pipelines that call sub-skills automatically.",
    tech: ["Claude Code"],
    github: "https://github.com/oloyeaaa/gss-open-tools/tree/master/agents",
    note: "12 content, 7 research, 9 sales, 3 engineering, 5 ops, 4 intelligence skills.",
  },
];

export default function ToolsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = activeFilter === "All"
    ? tools
    : tools.filter((t) => t.category === activeFilter);

  return (
    <>
      <PageHeader
        tagline="BUILT TOOLS"
        title="What we built. Not what we bought."
        subtitle="Custom agents, Python tools, Chrome extensions, and workflows — all built in-house. Open source where possible."
        breadcrumb={{ label: "Resources", href: "/resources" }}
      />

      <div className="max-w-[1080px] mx-auto px-6 py-16">

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {[
            { value: "37", label: "Claude Code Skills" },
            { value: "7", label: "Agent Pipelines" },
            { value: "3", label: "Chrome Extensions" },
            { value: "7", label: "Python Tools" },
          ].map((stat) => (
            <div key={stat.label} className="bg-navy-light border border-navy-border rounded-lg p-5 text-center">
              <p className="font-heading text-2xl font-bold text-orange mb-1">{stat.value}</p>
              <p className="font-mono text-xs text-muted uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
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
                  : "border-light-border text-muted hover:border-orange hover:text-orange"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tool Grid */}
        <h2 className="font-heading text-xl font-bold text-text-dark mb-6">
          {activeFilter === "All" ? `All tools (${filtered.length})` : `${activeFilter} (${filtered.length})`}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {filtered.map((tool) => (
            <div
              key={tool.name}
              className="bg-navy-light border border-navy-border rounded-xl p-7 flex flex-col hover:border-orange transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-heading font-semibold text-white text-base">{tool.name}</h3>
                <a
                  href={tool.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted/60 hover:text-orange transition-colors ml-2 flex-shrink-0"
                  aria-label={`View ${tool.name} on GitHub`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </a>
              </div>
              <p className="text-muted text-sm leading-relaxed mb-5 flex-1">{tool.description}</p>

              {/* Category + Tech */}
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <span className={`font-mono text-xs uppercase tracking-wider px-2.5 py-1 rounded ${categoryColors[tool.category] || "text-muted"}`}>
                  {tool.category}
                </span>
              </div>

              {/* Tech Stack Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {tool.tech.map((t) => (
                  <span key={t} className={`font-mono text-[10px] px-2 py-0.5 rounded border ${techColors[t] || "text-muted/60 bg-white/[0.04] border-navy-border"}`}>
                    {t}
                  </span>
                ))}
              </div>

              {/* Note */}
              <p className="text-muted/60 text-xs italic pt-3 border-t border-navy-border mt-auto leading-relaxed">
                {tool.note}
              </p>

              {/* Detail page link */}
              {"link" in tool && tool.link && (
                <Link
                  href={tool.link as string}
                  className="text-orange font-semibold text-xs mt-3 hover:underline"
                >
                  Learn more &rarr;
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="bg-navy-light border border-navy-border rounded-xl p-10 text-center">
          <h3 className="font-heading text-xl font-bold text-white mb-3">Everything is built in public</h3>
          <p className="text-muted text-sm mb-6 max-w-lg mx-auto">
            The full skill system, research tools, and agent pipelines are open source. Star the repo or fork it for your own GTM stack.
          </p>
          <a
            href="https://github.com/oloyeaaa/gss-open-tools"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-orange hover:bg-orange-hover text-white font-heading font-semibold text-sm px-6 py-3 rounded-md transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            View on GitHub
          </a>
        </div>

      </div>
    </>
  );
}
