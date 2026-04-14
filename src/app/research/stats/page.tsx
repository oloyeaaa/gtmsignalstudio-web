import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import StatsFilter from "@/components/StatsFilter";
import {
  getStatCategories,
  getPublishedStats,
  getPublishedStatCount,
} from "@/lib/queries";

export const dynamic = "force-dynamic"; // Fetch fresh from Supabase on every request

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

export default async function StatsPage() {
  const [categories, allStats, totalStats] = await Promise.all([
    getStatCategories(),
    getPublishedStats(),
    getPublishedStatCount(),
  ]);

  // Count unique sources
  const uniqueSources = new Set(allStats.map((s) => s.source)).size;

  return (
    <>
      <PageHeader
        tagline="RESEARCH DATA"
        title="AI Visibility & B2B Buyer Behaviour Stats"
        subtitle="Citable stats on how AI is changing B2B vendor discovery. Original research from GTM Signal Studio plus verified external data. Each stat links to its source. Updated regularly."
        stats={[
          { stat: String(totalStats) + "+", label: "Citable Stats" },
          { stat: "100+", label: "Companies Scanned" },
          { stat: String(uniqueSources) + "+", label: "Sources" },
        ]}
        breadcrumb={{ label: "Research", href: "/research" }}
      />

      {/* Interactive filter + stats grid (client component) */}
      <StatsFilter
        categories={categories}
        allStats={allStats}
        totalCount={totalStats}
      />

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
              significant new external research becomes available.
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
            dateModified: new Date().toISOString().split("T")[0],
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
