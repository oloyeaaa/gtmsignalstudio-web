import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Research | AI Visibility & Enterprise Marketing Data",
  description:
    "Original research on AI visibility, UK marketing careers and B2B go-to-market. Real data, every figure with its source. Cite the source, not the summary.",
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
    title: "UK Marketing Careers 2026",
    slug: "uk-marketing-careers-2026",
    status: "Published",
    description:
      "Twelve UK marketing roles ranked on median salary, hiring demand, how hard each is to enter, and what AI is doing to it. Product marketing and campaign management sit £20,000 apart on almost identical job-ad volume, which makes the gap a labour-pool problem rather than a market one.",
    stats: "12 roles, 28 sourced figures, IT Jobs Watch + Ashdown + Robert Half",
    date: "August 2026",
  },
  {
    title: "The HTML Myth in AI Visibility",
    slug: "ai-visibility-html-myth-2026",
    status: "Published",
    description:
      "I tested whether clean semantic HTML predicts AI citation across 492 enterprise sites. The correlation was −0.007. Top-quartile and bottom-quartile sites scored within 0.1 points on accessibility. The markup is not the moat.",
    stats: "492 sites, 9-axis accessibility scan, Pearson r=−0.007",
    date: "May 2026",
  },
  {
    title: "AI Visibility Benchmark: April 2026",
    slug: "ai-visibility-benchmark-april-2026",
    status: "Published",
    description:
      "We tripled the sample to 150 B2B companies across 5 sectors. 81% score 0-5 on citation. The pattern from 50 companies held at scale — and the invisible majority is even larger than expected.",
    stats: "150 companies, 5 sectors, multi-API scanner v2.0",
    date: "April 2026",
  },
  {
    title: "AI Visibility: UK Law Firms 2026",
    slug: "ai-visibility-uk-law-firms-2026",
    status: "Published",
    description:
      "50 UK law firms scanned across 4 AI visibility dimensions. 52% are invisible to AI recommendations. Mid-market specialists outperform global firms. The split is binary.",
    stats: "50 law firms, 4 dimensions, multi-API scanner v2.0",
    date: "March 2026",
  },
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

      {/* Stats Page Link */}
      <section className="section-light py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/research/stats"
            className="block bg-navy text-white rounded-xl p-6 hover:bg-navy-light transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-mono text-orange text-xs mb-1 tracking-wider">
                  LIVING DATA
                </p>
                <h3 className="font-heading text-xl font-bold mb-1">
                  AI Visibility &amp; B2B Buyer Behaviour Stats
                </h3>
                <p className="text-muted text-sm">
                  50+ citable stats from our research and 20+ external sources. Updated regularly.
                </p>
              </div>
              <span className="text-orange text-2xl ml-4">→</span>
            </div>
          </Link>
        </div>
      </section>

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
                stat: "81%",
                label: "of 150 B2B companies are invisible to AI recommendations",
                source: "GTM Signal Studio AI Visibility Benchmark, April 2026 (N=150)",
                href: "/research/ai-visibility-benchmark-april-2026",
              },
              {
                stat: "28.7",
                label: "average AI visibility score across 150 companies (out of 100)",
                source: "GTM Signal Studio AI Visibility Benchmark, April 2026",
                href: "/research/ai-visibility-benchmark-april-2026",
              },
              {
                stat: "48%",
                label: "of B2B searches trigger AI-generated answers",
                source: "Genesys Growth, AI Overviews for Marketing Leaders, 2026",
                href: "/research/stats",
              },
              {
                stat: "52%",
                label: "of UK law firms are invisible to AI recommendations",
                source: "GTM Signal Studio, UK Law Firms AI Visibility Study, March 2026",
                href: "/research/ai-visibility-uk-law-firms-2026",
              },
              {
                stat: "3x",
                label: "citation gap between Enterprise SaaS and IT Services",
                source: "GTM Signal Studio AI Visibility Benchmark, March 2026 (N=50)",
                href: "/research/ai-visibility-benchmark-2026",
              },
              {
                stat: "10/10",
                label: "bottom 10 companies are all IT Services firms scoring 2/100",
                source: "GTM Signal Studio AI Visibility Benchmark, April 2026",
                href: "/research/ai-visibility-benchmark-april-2026",
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
            href="/research/stats"
            className="inline-block bg-orange hover:bg-orange-hover text-white font-semibold px-8 py-4 rounded-lg transition-colors text-lg"
          >
            Browse the data
          </Link>
        </div>
      </section>
    </>
  );
}
