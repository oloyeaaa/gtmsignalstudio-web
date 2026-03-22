import type { Metadata } from "next";
import AiVisibilityScorecard from "@/components/AiVisibilityScorecard";

export const metadata: Metadata = {
  title: "AI Visibility Signal Scorecard — GTM Signal Studio",
  description:
    "Check if AI platforms recommend your business. Free self-assessment across 4 dimensions — AI Citation, Entity Recognition, Content Structure, Citation Breadth. Takes 5 minutes.",
};

export default function AiVisibilityScorecardPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero */}
      <div className="max-w-3xl mb-12">
        <p className="font-mono text-orange text-sm mb-2 tracking-wider">
          FREE TOOL
        </p>
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-text-dark mb-6 leading-tight">
          Can AI find{" "}
          <span className="text-orange">your business?</span>
        </h1>
        <p className="text-muted text-lg leading-relaxed mb-4">
          94% of B2B buyers now use AI in their research. Google AI Mode,
          Perplexity, ChatGPT — they are not searching for you. They are asking
          about your category. If AI does not mention your company in the answer,
          the buyer never reaches your website.
        </p>
        <p className="text-muted text-lg leading-relaxed">
          This scorecard checks your AI Visibility Signal in 5 minutes. Four
          dimensions. Self-assessment. No tools required.
        </p>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {[
          { stat: "94%", label: "of B2B buyers use AI in their research" },
          { stat: "48%", label: "of Google searches now show an AI answer" },
          { stat: "82%", label: "of B2B tech queries trigger AI Mode" },
          { stat: "5 min", label: "to check your signal" },
        ].map((item) => (
          <div
            key={item.stat}
            className="bg-navy-light border border-navy-border rounded-xl p-5 text-center"
          >
            <p className="font-heading text-3xl font-bold text-orange mb-1">
              {item.stat}
            </p>
            <p className="text-muted text-xs leading-relaxed">{item.label}</p>
          </div>
        ))}
      </div>

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
  );
}
