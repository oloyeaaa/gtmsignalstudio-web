import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Research | AI Visibility & Enterprise Marketing Data",
  description:
    "Original research on AI visibility, enterprise marketing, and B2B go-to-market. Real data from real audits. Cite the source, not the summary.",
  keywords: [
    "AI visibility research",
    "enterprise marketing data",
    "B2B marketing research",
    "AI visibility benchmark",
    "AI search statistics",
  ],
  openGraph: {
    title: "Research | GTM Signal Studio",
    description:
      "Original research on AI visibility and enterprise marketing. Real data. Citable stats.",
    type: "website",
    url: "https://gtmsignalstudio.com/research",
  },
  alternates: {
    canonical: "https://gtmsignalstudio.com/research",
  },
};

const studies = [
  {
    title: "AI Visibility Benchmark 2026: Enterprise Edition",
    slug: "ai-visibility-benchmark-2026",
    status: "Published",
    description:
      "50 enterprise B2B companies scored across 4 dimensions of AI visibility. 44% scored 2/25 on citation presence. AI knows who they are but does not recommend them.",
    stats: "50 companies, 5 sectors, 3 AI platforms",
    date: "March 2026",
  },
];

const pipeline = [
  {
    title: "Enterprise MarTech Stack Bloat Study",
    description:
      "How many tools do enterprise marketing teams actually use vs pay for? Audit of 20 enterprise stacks.",
  },
  {
    title: "B2B Buyer AI Usage Study",
    description:
      "How B2B buyers use AI platforms during vendor research. Which platforms, at which stage, and what they trust.",
  },
  {
    title: "Enterprise Attribution Gap Study",
    description:
      "How much enterprise pipeline is invisible to current attribution models? The zero-click discovery problem.",
  },
  {
    title: "AI-Generated Content Detection Study",
    description:
      "Can enterprise buyers tell when content is AI-generated? Trust, engagement, and brand impact data.",
  },
];

export default function ResearchPage() {
  return (
    <>
      <PageHeader
        tagline="RESEARCH"
        title="Original data. Citable stats. No recycled reports."
        subtitle="We run original research on AI visibility and enterprise marketing so you can cite the source, not the summary. Every stat links to its methodology."
      />

      {/* Active Studies - Light */}
      <section className="section-light py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">
            ACTIVE RESEARCH
          </p>
          <h2 className="font-heading text-3xl font-bold text-text-dark mb-8">
            Current studies
          </h2>

          <div className="space-y-4">
            {studies.map((study) => (
              <Link
                key={study.slug}
                href={`/research/${study.slug}`}
                className="block bg-white border border-light-border rounded-xl p-6 hover:border-orange transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-orange/10 text-orange font-mono text-xs px-2 py-1 rounded">
                    {study.status}
                  </span>
                  <span className="text-text-muted text-xs font-mono">
                    Target: {study.date}
                  </span>
                </div>
                <h3 className="font-heading text-xl font-bold text-text-dark mb-2">
                  {study.title}
                </h3>
                <p className="text-text-body text-sm leading-relaxed mb-3">
                  {study.description}
                </p>
                <p className="text-text-muted text-xs font-mono">
                  {study.stats}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Published Stats - White */}
      <section className="section-white py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">
            KEY FINDINGS
          </p>
          <h2 className="font-heading text-3xl font-bold text-text-dark mb-4">
            Stats you can cite
          </h2>
          <p className="text-text-body mb-8">
            Each stat links to its source. Use these in your own content,
            presentations, and reports.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                stat: "7 / 10",
                label: "enterprise companies are invisible to AI search",
                source: "GTM Signal Studio audit of 10 UK consulting firms, March 2026",
                href: "/blog/the-ai-visibility-gap-enterprise-marketing",
              },
              {
                stat: "15-25",
                label: "average AI visibility score for enterprise companies (out of 100)",
                source: "GTM Signal Studio AI Visibility framework",
                href: "/ai-visibility",
              },
              {
                stat: "48%",
                label: "of B2B searches trigger AI-generated answers",
                source: "Genesys Growth, AI Overviews for Marketing Leaders, 2026",
                href: "/blog/the-ai-visibility-gap-enterprise-marketing",
              },
              {
                stat: "94%",
                label: "of B2B buyers use generative AI during research",
                source: "Sopro, AI in Sales and Marketing Statistics, 2026",
                href: "/blog/the-ai-visibility-gap-enterprise-marketing",
              },
              {
                stat: "75%",
                label: "of enterprise organisations have adopted AI in marketing",
                source: "AllAboutAI / Loopex Digital, AI Marketing Statistics, 2026",
                href: "/blog/the-ai-visibility-gap-enterprise-marketing",
              },
              {
                stat: "86%",
                label: "of enterprise teams are increasing AI budgets this year",
                source: "Kong Inc. / Gartner, Enterprise AI Spending, 2025-2026",
                href: "/blog/the-ai-visibility-gap-enterprise-marketing",
              },
            ].map((item) => (
              <Link
                key={item.stat}
                href={item.href}
                className="block bg-cream border border-light-border rounded-xl p-5 hover:border-orange transition-colors"
              >
                <p className="text-orange font-heading text-3xl font-bold mb-1">
                  {item.stat}
                </p>
                <p className="text-text-dark text-sm font-semibold mb-2">
                  {item.label}
                </p>
                <p className="text-text-muted text-xs">{item.source}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Research Pipeline - Dark */}
      <section className="section-dark py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">
            COMING NEXT
          </p>
          <h2 className="font-heading text-3xl font-bold text-white mb-8">
            Research pipeline
          </h2>

          <div className="space-y-4">
            {pipeline.map((item) => (
              <div
                key={item.title}
                className="bg-navy-light border border-navy-border rounded-xl p-5"
              >
                <h3 className="font-heading font-bold text-white mb-1">
                  {item.title}
                </h3>
                <p className="text-muted text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Light */}
      <section className="section-light py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl font-bold text-text-dark mb-4">
            Want to be included in the next study?
          </h2>
          <p className="text-text-body text-lg mb-8 max-w-xl mx-auto">
            If you want your company included in the AI Visibility Benchmark
            (anonymised), or have a research question you want us to
            investigate, get in touch.
          </p>
          <Link
            href="/ai-visibility-audit"
            className="inline-block bg-orange hover:bg-orange-hover text-white font-semibold px-8 py-4 rounded-lg transition-colors text-lg"
          >
            Get Your AI Visibility Score
          </Link>
        </div>
      </section>
    </>
  );
}
