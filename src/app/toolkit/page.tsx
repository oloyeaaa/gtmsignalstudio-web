import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ToolkitCatalog from "@/components/ToolkitCatalog";
import catalog from "@/data/toolkit-catalog.json";

export const metadata: Metadata = {
  title: "Toolkit | GSS Skills, CLIs & Workflows for Claude Code",
  description:
    "Open-source Claude Code skills, Python CLIs, and Chrome extensions used to run GTM Signal Studio. Content, research, sales, and founder ops automations.",
  keywords: [
    "Claude Code skills",
    "Claude Code agents",
    "AI marketing tools",
    "GTM automation",
    "open source",
  ],
  alternates: { canonical: "https://gtmsignalstudio.com/toolkit" },
  openGraph: {
    title: "The GSS Toolkit — Skills, CLIs & Workflows",
    description:
      "Every Claude Code skill, Python CLI, and Chrome extension behind GTM Signal Studio. Open source.",
    url: "https://gtmsignalstudio.com/toolkit",
    type: "website",
  },
};

type CatalogItem = {
  id: string;
  kind: "skill" | "cli" | "extension";
  name: string;
  slug: string;
  category: string;
  category_key: string;
  description: string;
  triggers: string[];
  github_url: string;
};

type Catalog = {
  generated_at: string;
  repo_url: string;
  counts: { skills: number; clis: number; extensions: number; total: number };
  items: CatalogItem[];
};

export default function ToolkitPage() {
  const data = catalog as Catalog;

  return (
    <>
      <PageHeader
        tagline="TOOLKIT"
        title="The skills, CLIs, and workflows behind GSS."
        subtitle="Every Claude Code skill, Python CLI, and Chrome extension we use to run GTM Signal Studio. Open source. All built with Claude Code."
        stats={[
          { stat: String(data.counts.skills), label: "Claude Code skills" },
          { stat: String(data.counts.clis), label: "Python CLIs" },
          { stat: String(data.counts.extensions), label: "Chrome extensions" },
        ]}
      />

      <div className="max-w-[1080px] mx-auto px-6 py-16">
        {/* Install block */}
        <section className="bg-navy-light border border-navy-border rounded-xl p-8 md:p-10 mb-16">
          <p className="font-mono text-orange text-xs uppercase tracking-widest mb-3">
            INSTALL
          </p>
          <h2 className="font-heading text-2xl font-bold text-white mb-3 tracking-tight">
            Drop any skill into your Claude Code project.
          </h2>
          <p className="text-muted text-sm leading-relaxed mb-6 max-w-[640px]">
            Skills live in <code className="font-mono text-orange/90 bg-white/5 px-1.5 py-0.5 rounded">.claude/skills/</code> and Claude Code auto-loads them. Clone the toolkit, copy what you need, and start triggering.
          </p>
          <pre className="bg-navy border border-navy-border rounded-lg p-4 font-mono text-xs text-white/90 overflow-x-auto">
{`git clone https://github.com/oloyeaaa/gss-toolkit
cp -r gss-toolkit/skills/cm-blog-writer ./.claude/skills/
# Inside Claude Code: "write a blog post about [topic]"`}
          </pre>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={data.repo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-orange hover:bg-orange-hover text-white font-semibold text-sm px-6 py-2.5 rounded-lg transition-colors"
            >
              View on GitHub &rarr;
            </a>
            <a
              href="https://claude.com/claude-code"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-navy border border-navy-border text-white hover:border-orange font-semibold text-sm px-6 py-2.5 rounded-lg transition-colors"
            >
              About Claude Code
            </a>
          </div>
        </section>

        {/* Catalog (client component) */}
        <ToolkitCatalog items={data.items} />

        {/* Bottom CTA */}
        <section className="border-t border-light-border pt-16 mt-20 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-dark mb-4 tracking-tight">
            Get the playbooks behind these tools.
          </h2>
          <p className="text-muted text-base max-w-[480px] mx-auto leading-relaxed mb-8">
            The toolkit ships the code. The newsletter ships the thinking — research, frameworks, and what we learn building in public.
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
              name: "The GSS Toolkit",
              description:
                "Claude Code skills, Python CLIs, and Chrome extensions used to run GTM Signal Studio.",
              url: "https://gtmsignalstudio.com/toolkit",
              publisher: {
                "@type": "Organization",
                name: "GTM Signal Studio",
                url: "https://gtmsignalstudio.com",
              },
              mainEntity: {
                "@type": "ItemList",
                numberOfItems: data.counts.total,
                itemListElement: data.items.slice(0, 25).map((it, i) => ({
                  "@type": "ListItem",
                  position: i + 1,
                  name: it.name,
                  url: it.github_url,
                  description: it.description,
                })),
              },
            }),
          }}
        />
      </div>
    </>
  );
}
