import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title:
    "AI Visibility & B2B Buyer Behaviour Stats | GTM Signal Studio",
  description:
    "50+ citable stats on how AI is changing B2B buyer behaviour and vendor discovery. Original research from GTM Signal Studio plus verified external data. Updated regularly.",
  keywords: [
    "AI visibility statistics",
    "B2B buyer behaviour AI",
    "AI search statistics 2026",
    "B2B buying journey AI",
    "AI vendor discovery stats",
    "enterprise marketing AI data",
    "AI visibility benchmark data",
  ],
  openGraph: {
    title: "AI Visibility & B2B Buyer Behaviour Stats",
    description:
      "50+ citable stats on AI visibility and B2B buyer behaviour. Original research + verified external data. Updated regularly.",
    type: "website",
    url: "https://gtmsignalstudio.com/research/stats",
  },
  alternates: {
    canonical: "https://gtmsignalstudio.com/research/stats",
  },
};

type StatItem = {
  stat: string;
  label: string;
  source: string;
  sourceUrl?: string;
  year: string;
  sample?: string;
};

type StatCategory = {
  id: string;
  title: string;
  description: string;
  stats: StatItem[];
};

const gssOriginalStats: StatCategory = {
  id: "gss-original",
  title: "GTM Signal Studio Original Research",
  description:
    "Original data from GSS benchmark studies. 150+ companies scanned across multiple sectors using the AI Visibility Framework (4 dimensions, scored 0-100). Updated monthly.",
  stats: [
    {
      stat: "81%",
      label:
        "of 150 B2B companies score 0-5 on AI citation presence — invisible to AI recommendations",
      source: "AI Visibility Benchmark April 2026 — GTM Signal Studio",
      sourceUrl: "/research/ai-visibility-benchmark-april-2026",
      year: "2026",
      sample: "150 companies, 5 sectors",
    },
    {
      stat: "28.7",
      label:
        "average AI visibility score across 150 companies (out of 100) — down from 82.2 at N=50",
      source: "AI Visibility Benchmark April 2026 — GTM Signal Studio",
      sourceUrl: "/research/ai-visibility-benchmark-april-2026",
      year: "2026",
      sample: "150 companies, 5 sectors",
    },
    {
      stat: "10/10",
      label:
        "bottom 10 companies in the 150-company benchmark are all IT Services firms scoring 2/100",
      source: "AI Visibility Benchmark April 2026 — GTM Signal Studio",
      sourceUrl: "/research/ai-visibility-benchmark-april-2026",
      year: "2026",
      sample: "150 companies, 5 sectors",
    },
    {
      stat: "44%",
      label:
        "of enterprise B2B companies score 2/25 on AI citation presence",
      source: "AI Visibility Benchmark March 2026 — GTM Signal Studio",
      sourceUrl: "/research/ai-visibility-benchmark-2026",
      year: "2026",
      sample: "50 companies, 5 sectors",
    },
    {
      stat: "52%",
      label:
        "of UK law firms score 2/25 on AI citation presence — invisible to AI recommendations",
      source: "AI Visibility: UK Law Firms 2026 — GTM Signal Studio",
      sourceUrl: "/research/ai-visibility-uk-law-firms-2026",
      year: "2026",
      sample: "50 UK law firms",
    },
    {
      stat: "3x",
      label:
        "citation gap between SaaS (24.4/25) and IT Services (8.0/25) on AI citation presence",
      source: "AI Visibility Benchmark 2026 — GTM Signal Studio",
      sourceUrl: "/research/ai-visibility-benchmark-2026",
      year: "2026",
      sample: "50 companies, 5 sectors",
    },
    {
      stat: "23.4/25",
      label:
        "average Entity Recognition — AI knows who companies are but does not recommend them",
      source: "AI Visibility Benchmark 2026 — GTM Signal Studio",
      sourceUrl: "/research/ai-visibility-benchmark-2026",
      year: "2026",
      sample: "50 companies",
    },
    {
      stat: "0",
      label:
        "law firms scored in the 6-20 range on citation — the split is binary: cited or invisible",
      source: "AI Visibility: UK Law Firms 2026 — GTM Signal Studio",
      sourceUrl: "/research/ai-visibility-uk-law-firms-2026",
      year: "2026",
      sample: "50 UK law firms",
    },
    {
      stat: "21 pts",
      label:
        "gap between cited (92.1) and uncited (70.7) law firms — driven entirely by citation presence",
      source: "AI Visibility: UK Law Firms 2026 — GTM Signal Studio",
      sourceUrl: "/research/ai-visibility-uk-law-firms-2026",
      year: "2026",
      sample: "50 UK law firms",
    },
    {
      stat: "93.5 vs 72.3",
      label:
        "specialist law firms outperform generalists on AI visibility — clear positioning wins",
      source: "AI Visibility: UK Law Firms 2026 — GTM Signal Studio",
      sourceUrl: "/research/ai-visibility-uk-law-firms-2026",
      year: "2026",
      sample: "50 UK law firms",
    },
    {
      stat: "22.9 vs 21.6",
      label:
        "uncited firms score HIGHER on content structure — proving site quality alone does not drive AI citation",
      source: "AI Visibility: UK Law Firms 2026 — GTM Signal Studio",
      sourceUrl: "/research/ai-visibility-uk-law-firms-2026",
      year: "2026",
      sample: "50 UK law firms",
    },
  ],
};

const externalStats: StatCategory[] = [
  {
    id: "ai-adoption",
    title: "AI Adoption in B2B Buying",
    description:
      "How many B2B buyers are using AI during their purchasing process.",
    stats: [
      {
        stat: "94%",
        label: "of B2B buyers use AI in their buying process",
        source: "Forrester Buyers' Journey Survey",
        sourceUrl: "https://www.forrester.com",
        year: "2025",
        sample: "17,500 global buyers",
      },
      {
        stat: "47%",
        label:
          "of enterprise buyers now start vendor research with AI tools — ahead of Google (43%)",
        source: "Treble / Censuswide",
        sourceUrl:
          "https://finance.yahoo.com/news/treble-report",
        year: "2025",
        sample: "300 CIOs, CISOs, CTOs, VPs",
      },
      {
        stat: "67%",
        label:
          "of B2B buyers use AI search tools during purchase research — up from 24% in early 2024",
        source: "KnewSearch",
        sourceUrl:
          "https://knewsearch.com/blog/ai-search-buyer-behavior-research-2026",
        year: "2026",
      },
      {
        stat: "93%",
        label:
          "of enterprise buyers use AI to summarise or compare vendors during evaluation",
        source: "Treble / Censuswide",
        sourceUrl:
          "https://finance.yahoo.com/news/treble-report",
        year: "2025",
        sample: "300 enterprise tech buyers",
      },
      {
        stat: "66%",
        label:
          "of UK senior decision-makers use AI tools for supplier research",
        source: "Magenta Associates",
        year: "2025",
        sample: "300 UK senior professionals",
      },
    ],
  },
  {
    id: "buying-journey",
    title: "How AI Changes the Buying Journey",
    description:
      "Shortlists form faster, decisions happen earlier, and AI shapes who buyers consider.",
    stats: [
      {
        stat: "95%",
        label:
          "of winning vendors were already on the buyer's Day 1 shortlist",
        source: "6sense Buyer Experience Report",
        sourceUrl:
          "https://6sense.com/science-of-b2b/buyer-experience-report-2025/",
        year: "2025",
        sample: "4,000 B2B buyers",
      },
      {
        stat: "77-80%",
        label:
          "win rate for the top-ranked vendor on the initial shortlist",
        source: "6sense / Corporate Visions",
        sourceUrl:
          "https://corporatevisions.com/blog/b2b-buying-behavior-statistics-trends/",
        year: "2025",
        sample: "4,000 B2B buyers",
      },
      {
        stat: "4 of 5",
        label:
          "shortlist spots are filled on Day 1 — before any vendor contact",
        source: "6sense Buyer Experience Report",
        sourceUrl:
          "https://6sense.com/science-of-b2b/buyer-experience-report-2025/",
        year: "2025",
        sample: "4,000 B2B buyers",
      },
      {
        stat: "57%",
        label:
          "of B2B buyers consider more or different vendors because of AI",
        source: "Forrester Buyers' Journey Survey",
        sourceUrl: "https://www.forrester.com",
        year: "2025",
        sample: "17,500 global buyers",
      },
      {
        stat: "10.1 mo",
        label:
          "average B2B buying cycle — down from 11.3 months year-over-year",
        source: "6sense Buyer Experience Report",
        sourceUrl:
          "https://6sense.com/science-of-b2b/buyer-experience-report-2025/",
        year: "2025",
        sample: "4,000 B2B buyers",
      },
      {
        stat: "67%",
        label: "of B2B buyers prefer a rep-free buying experience",
        source: "Gartner B2B Buyer Survey",
        sourceUrl: "https://www.gartner.com",
        year: "2025",
        sample: "646 buyers",
      },
    ],
  },
  {
    id: "ai-vs-google",
    title: "AI vs Google: The Divergence",
    description:
      "AI platforms recommend different companies than Google. The overlap is smaller than most teams assume.",
    stats: [
      {
        stat: "14%",
        label:
          "URL overlap between AI Mode and Google's top 10 organic results",
        source: "SE Ranking",
        sourceUrl: "https://seranking.com/blog/ai-statistics/",
        year: "2025",
      },
      {
        stat: "40%",
        label:
          "of AI Overview citations come from pages ranking OUTSIDE Google's top 10",
        source: "Exposure Ninja",
        sourceUrl:
          "https://exposureninja.com/blog/ai-search-statistics/",
        year: "2025",
      },
      {
        stat: "3.2x",
        label:
          "more likely to be shortlisted if mentioned across all major AI platforms",
        source: "KnewSearch",
        sourceUrl:
          "https://knewsearch.com/blog/ai-search-buyer-behavior-research-2026",
        year: "2026",
      },
      {
        stat: "37%",
        label:
          "of consumers now start searches with AI instead of Google",
        source: "Search Engine Land / Yext",
        sourceUrl: "https://searchengineland.com",
        year: "2026",
      },
      {
        stat: "6.5x",
        label:
          "more likely to be cited through third-party sources than your own domain",
        source: "Position Digital",
        sourceUrl:
          "https://position.digital/blog/ai-seo-statistics/",
        year: "2026",
      },
    ],
  },
  {
    id: "trust",
    title: "Trust in AI Recommendations",
    description:
      "Buyers trust AI but still verify. AI is a filter, not a closer.",
    stats: [
      {
        stat: "90%",
        label:
          "of B2B buyers who use AI trust the recommendations it provides",
        source: "Magenta Associates",
        year: "2025",
        sample: "300 UK decision-makers",
      },
      {
        stat: "85%",
        label:
          "of buyers still double-check AI answers elsewhere — Google (68%) is the primary validation channel",
        source: "Yext / Search Engine Land",
        sourceUrl: "https://searchengineland.com",
        year: "2026",
      },
      {
        stat: "2x",
        label:
          "as many buyers named GenAI as a more meaningful source than ANY other source type",
        source: "Forrester Buyers' Journey Survey",
        sourceUrl: "https://www.forrester.com",
        year: "2025",
        sample: "17,500 global buyers",
      },
      {
        stat: "60%",
        label:
          "say AI delivers better, clearer answers than traditional search",
        source: "Search Engine Land / Yext",
        sourceUrl: "https://searchengineland.com",
        year: "2026",
      },
    ],
  },
  {
    id: "ai-traffic",
    title: "AI Search Traffic & Conversion",
    description:
      "AI traffic is small but growing fast — and converts at 5x the rate of Google organic.",
    stats: [
      {
        stat: "527%",
        label: "year-over-year growth in AI search traffic",
        source: "Previsible AI Traffic Report",
        sourceUrl: "https://semrush.com",
        year: "2025",
        sample: "19 GA4 properties",
      },
      {
        stat: "14.2% vs 2.8%",
        label:
          "AI search traffic converts at 5x the rate of Google organic",
        source: "Warmly / Yotpo",
        sourceUrl:
          "https://warmly.ai/p/blog/b2b-buyers-chatgpt-geo-guide",
        year: "2026",
      },
      {
        stat: "68%",
        label:
          "more time spent on websites by AI-referred visitors vs traditional organic",
        source: "SE Ranking / PassionFruit",
        sourceUrl: "https://seranking.com/blog/ai-statistics/",
        year: "2025",
      },
      {
        stat: "5% → 30%",
        label:
          "AI went from 5% to 30% of inbound demo requests in 2 months at one B2B company",
        source: "Warmly (first-party data)",
        sourceUrl:
          "https://warmly.ai/p/blog/b2b-buyers-chatgpt-geo-guide",
        year: "2026",
      },
      {
        stat: "85%",
        label:
          "of 25-34 year olds use AI for supplier research vs 23% of 55-64 year olds",
        source: "Magenta Associates",
        year: "2025",
        sample: "300 UK decision-makers",
      },
    ],
  },
];

function StatCard({ item, isGss }: { item: StatItem; isGss: boolean }) {
  const inner = (
    <>
      <p
        className={`font-heading text-2xl md:text-3xl font-bold mb-1 ${
          isGss ? "text-orange" : "text-navy"
        }`}
      >
        {item.stat}
      </p>
      <p className="text-text-dark text-sm font-semibold mb-3 leading-snug">
        {item.label}
      </p>
      <div className="mt-auto">
        <p className="text-text-muted text-xs leading-relaxed">
          {item.source} ({item.year})
          {item.sample && (
            <span className="block font-mono text-[10px] mt-1 text-text-muted/70">
              Sample: {item.sample}
            </span>
          )}
        </p>
      </div>
    </>
  );

  const baseClasses =
    "flex flex-col rounded-xl p-5 transition-all duration-200 h-full";

  if (item.sourceUrl) {
    const isExternal =
      item.sourceUrl.startsWith("http") &&
      !item.sourceUrl.includes("gtmsignalstudio.com");
    return (
      <Link
        href={item.sourceUrl}
        className={`${baseClasses} ${
          isGss
            ? "bg-navy/5 border-2 border-orange/20 hover:border-orange"
            : "bg-cream border border-light-border hover:border-orange"
        }`}
        {...(isExternal
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {inner}
        <p className="text-[10px] font-mono text-orange mt-2">
          {isExternal ? "View source ↗" : "View research →"}
        </p>
      </Link>
    );
  }

  return (
    <div
      className={`${baseClasses} ${
        isGss
          ? "bg-navy/5 border-2 border-orange/20"
          : "bg-cream border border-light-border"
      }`}
    >
      {inner}
    </div>
  );
}

function StatSection({
  category,
  isGss,
}: {
  category: StatCategory;
  isGss: boolean;
}) {
  return (
    <div id={category.id} className="scroll-mt-24">
      <p className="font-mono text-orange text-sm mb-2 tracking-wider">
        {isGss ? "ORIGINAL RESEARCH" : "EXTERNAL DATA"}
      </p>
      <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-dark mb-2">
        {category.title}
      </h2>
      <p className="text-text-body text-sm mb-8 max-w-2xl">
        {category.description}
      </p>
      <div className="grid md:grid-cols-2 gap-4">
        {category.stats.map((item, i) => (
          <StatCard key={i} item={item} isGss={isGss} />
        ))}
      </div>
    </div>
  );
}

export default function StatsPage() {
  const categories = [gssOriginalStats, ...externalStats];
  const totalStats =
    gssOriginalStats.stats.length +
    externalStats.reduce((sum, c) => sum + c.stats.length, 0);

  return (
    <>
      <PageHeader
        tagline="RESEARCH DATA"
        title="AI Visibility & B2B Buyer Behaviour Stats"
        subtitle="Citable stats on how AI is changing B2B vendor discovery. Original research from GTM Signal Studio plus verified external data. Each stat links to its source. Updated regularly."
        stats={[
          { stat: String(totalStats) + "+", label: "Citable Stats" },
          { stat: "100+", label: "Companies Scanned" },
          { stat: "20+", label: "Sources" },
        ]}
        breadcrumb={{ label: "Research", href: "/research" }}
      />

      {/* Jump Nav */}
      <section className="section-light py-6 border-b border-light-border sticky top-0 z-30 bg-cream/95 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {categories.map((c) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                className="px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap bg-white border border-light-border text-text-body hover:border-orange hover:text-orange transition-colors"
              >
                {c.title.replace("GTM Signal Studio ", "")}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* GSS Original Research */}
      <section className="section-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <StatSection category={gssOriginalStats} isGss={true} />
        </div>
      </section>

      {/* External Stats — alternating sections */}
      {externalStats.map((category, i) => (
        <section
          key={category.id}
          className={`${
            i % 2 === 0 ? "section-light" : "section-white"
          } py-16 md:py-20`}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <StatSection category={category} isGss={false} />
          </div>
        </section>
      ))}

      {/* Methodology Note */}
      <section className="section-dark py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">
            METHODOLOGY
          </p>
          <h2 className="font-heading text-2xl font-bold text-white mb-6">
            How we collect and verify this data
          </h2>
          <div className="space-y-4 text-muted text-sm leading-relaxed">
            <p>
              <strong className="text-white">Original research:</strong>{" "}
              GSS stats come from our AI Visibility Framework — a
              4-dimension scoring system (Citation Presence, Entity
              Recognition, Content Structure, Citation Breadth) applied
              using our multi-API scanner across Google AI Mode, ChatGPT,
              Perplexity, and other AI platforms. Full methodology is
              published with every study.
            </p>
            <p>
              <strong className="text-white">External data:</strong> Every
              external stat includes its source, year, and sample size
              where available. We link directly to the original source. We
              do not include stats from secondary compilations unless we
              can verify the original study.
            </p>
            <p>
              <strong className="text-white">Updates:</strong> This page
              is updated as we publish new benchmark studies and as
              significant new external research becomes available. Last
              updated March 2026.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-light py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl font-bold text-text-dark mb-4">
            Want to know where your company stands?
          </h2>
          <p className="text-text-body text-lg mb-8 max-w-xl mx-auto">
            Our AI Visibility Audit scores your company across all 4
            dimensions and shows exactly where you rank against your
            competitors.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/ai-visibility-audit"
              className="inline-block bg-orange hover:bg-orange-hover text-white font-semibold px-8 py-4 rounded-lg transition-colors"
            >
              AI Visibility Audit — £297
            </Link>
            <Link
              href="/competitive-report"
              className="inline-block bg-navy hover:bg-navy-light text-white font-semibold px-8 py-4 rounded-lg transition-colors"
            >
              Competitive Report — £997
            </Link>
          </div>
        </div>
      </section>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Dataset",
            name: "AI Visibility & B2B Buyer Behaviour Statistics",
            description:
              "Curated collection of statistics on AI visibility and B2B buyer behaviour change. Includes original research from GTM Signal Studio benchmark studies and verified external data from 20+ sources.",
            creator: {
              "@type": "Organization",
              name: "GTM Signal Studio",
              url: "https://gtmsignalstudio.com",
            },
            dateModified: "2026-03-31",
            url: "https://gtmsignalstudio.com/research/stats",
            keywords: [
              "AI visibility",
              "B2B buyer behaviour",
              "AI search statistics",
              "enterprise marketing data",
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What percentage of B2B buyers use AI during their buying process?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "94% of B2B buyers use AI in their buying process according to Forrester's 2025 Buyers' Journey Survey of 17,500 global buyers. 47% of enterprise buyers now start vendor research with AI tools ahead of Google (Treble/Censuswide, 300 CxOs).",
                },
              },
              {
                "@type": "Question",
                name: "How different are AI search results from Google for B2B buying queries?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Only 14% of URLs cited by Google AI Mode rank in Google's traditional top 10 organic results (SE Ranking, 2025). 40% of AI Overview citations come from pages ranking outside Google's top 10. GTM Signal Studio's research found that 44% of enterprise companies and 52% of UK law firms are invisible to AI recommendations despite having strong web presence.",
                },
              },
              {
                "@type": "Question",
                name: "Does AI visibility actually affect B2B sales?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. 95% of winning vendors were on the buyer's Day 1 shortlist (6sense, 4,000 buyers), and the top-ranked vendor wins 77-80% of the time. AI search traffic converts at 14.2% compared to 2.8% for Google organic — 5x higher (Warmly/Yotpo, 2026). If AI platforms form the initial shortlist and you're not on it, you rarely win the deal.",
                },
              },
              {
                "@type": "Question",
                name: "What is the AI Visibility Framework?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The AI Visibility Framework is a 4-dimension scoring system developed by GTM Signal Studio that measures how visible a company is to AI search platforms. The four dimensions are: Citation Presence (does AI recommend you by name?), Entity Recognition (does AI know what you do?), Content Structure (can AI extract answers from your site?), and Citation Breadth (how many independent sources mention you?). Each is scored 0-25 for a total of 0-100.",
                },
              },
              {
                "@type": "Question",
                name: "Which age group uses AI most for B2B purchasing?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "85% of 25-34 year olds use AI for supplier research compared to just 23% of 55-64 year olds (Magenta Associates, 300 UK decision-makers, 2025). This generational gap means AI-driven buying behaviour will only accelerate as younger professionals move into senior buying roles.",
                },
              },
            ],
          }),
        }}
      />
    </>
  );
}
