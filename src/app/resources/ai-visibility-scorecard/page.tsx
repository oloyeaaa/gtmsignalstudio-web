import type { Metadata } from "next";
import Link from "next/link";
import AiVisibilityScorecard from "@/components/AiVisibilityScorecard";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "AI Visibility Signal Scorecard — GTM Signal Studio",
  description:
    "Check if AI platforms recommend your business. Free self-assessment across 4 dimensions — AI Citation, Entity Recognition, Content Structure, Citation Breadth. Takes 5 minutes.",
  keywords: ["AI visibility scorecard", "AI presence self-assessment", "AI citation check", "AI visibility signal score", "free AI audit tool"],
  openGraph: {
    title: "AI Visibility Signal Scorecard — GTM Signal Studio",
    description:
      "Check if AI platforms recommend your business. Free self-assessment across 4 dimensions. Takes 5 minutes.",
    url: "https://gtmsignalstudio.com/resources/ai-visibility-scorecard",
    type: "website",
    images: [{ url: "https://gtmsignalstudio.com/og-default.png", width: 1200, height: 630, alt: "AI Visibility Signal Scorecard" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Visibility Signal Scorecard — GTM Signal Studio",
    description:
      "Check if AI platforms recommend your business. Free self-assessment across 4 dimensions. Takes 5 minutes.",
    images: ["https://gtmsignalstudio.com/og-default.png"],
  },
};

export default function AiVisibilityScorecardPage() {
  return (
    <>
      <PageHeader tagline="FREE TOOL" title="Can AI find your business?" subtitle="This scorecard checks your AI Visibility Signal in 5 minutes. Four dimensions. Self-assessment. No tools required." breadcrumb={{ label: "AI Visibility", href: "/ai-visibility" }} stats={[{ stat: "94%", label: "of B2B buyers use AI in research" }, { stat: "48%", label: "of searches show an AI answer" }, { stat: "82%", label: "of B2B tech queries trigger AI Mode" }, { stat: "5 min", label: "to check your signal" }]} />

    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

      {/* Interactive scorecard */}
      <section className="mb-20">
        <p className="font-mono text-orange text-sm mb-2 tracking-wider">
          SCORE YOURSELF
        </p>
        <h2 className="font-heading text-2xl font-bold text-text-dark mb-8">
          Four dimensions. One signal.
        </h2>
        <AiVisibilityScorecard />
      </section>

      {/* How AI decides */}
      <section className="mb-20">
        <p className="font-mono text-orange text-sm mb-2 tracking-wider">
          WHY THIS MATTERS
        </p>
        <h2 className="font-heading text-2xl font-bold text-text-dark mb-6">
          AI does not rank pages. AI recommends companies.
        </h2>
        <div className="bg-cream border border-light-border rounded-xl p-8 space-y-4">
          <p className="text-text-body text-sm leading-relaxed">
            The signals AI uses to decide who to recommend are structurally
            different from the signals Google uses to rank websites. You can have
            perfect SEO and still be invisible to AI.
          </p>
          <p className="text-text-body text-sm leading-relaxed">
            A boutique consultancy with fewer than 20 people was cited by Google
            AI Mode alongside four of the largest firms in their industry. Their
            website scored low on a traditional GTM audit. But AI did not care
            about that — it cared about whether the company was a referenceable,
            citable entity in its category.
          </p>
          <p className="text-text-body text-sm leading-relaxed">
            The question is not &ldquo;How do we rank higher?&rdquo; It
            is &ldquo;Does AI know we exist?&rdquo;
          </p>
          <p className="text-text-body text-sm leading-relaxed mt-4">
            <Link href="/ai-visibility" className="text-orange hover:underline">Learn more about AI visibility and the 4 dimensions</Link> that determine whether AI platforms recommend your business.
          </p>
        </div>
      </section>

      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "AI Visibility Signal Scorecard",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "GBP",
            },
            provider: {
              "@type": "Organization",
              name: "GTM Signal Studio",
              url: "https://gtmsignalstudio.com",
            },
            description:
              "Free self-assessment tool that checks if AI platforms recommend your business across 4 dimensions: AI Citation Presence, Entity Recognition, Content Structure, and Citation Breadth.",
          }),
        }}
      />
    </div>
    </>
  );
}
