import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "7 Signals That Make AI Cite Your Company — GTM Signal Studio",
  description:
    "The structural changes that move your company from invisible to recommended by AI. Answer buyer questions, name your methodology, publish original data, and more.",
  keywords: ["AI citation signals", "how to get cited by AI", "AI visibility signals", "AI content structure", "AI recommendation factors"],
};

const signals = [
  {
    number: "01",
    title: "Answer the Question Directly",
    description:
      "AI pulls from content that answers specific questions. Not content that talks about your company. Content that answers what buyers are asking.",
    fix: "Rewrite your top 3 service pages to lead with the buyer\u2019s question, not your solution. Start with \u201CWhen should a company consider [your service]?\u201D not \u201CWe offer world-class [service].\u201D",
    why: "AI prioritises content that matches the structure of a query. Question-answer format maps directly to how buyers prompt AI tools.",
  },
  {
    number: "02",
    title: "Name Your Methodology",
    description:
      'AI cannot cite "our unique approach." It can cite "The Signal Stack Framework" or "The 4-Dimension AI Visibility Model."',
    fix: "Give your core process a name. Define it in one sentence. Use it consistently across your site, case studies, and LinkedIn content.",
    why: "Named entities are how AI builds its knowledge. An unnamed process is invisible. A named one becomes a referenceable concept.",
  },
  {
    number: "03",
    title: "Publish Original Data",
    description:
      "AI favours sources that contain data it cannot find elsewhere. Your original research, benchmarks, and case study metrics are uniquely valuable.",
    fix: "Publish at least one piece of content per quarter that contains data only you have. Audit results, survey findings, client outcome metrics, industry benchmarks.",
    why: "AI seeks authoritative sources. Original data signals authority in a way that opinion content cannot.",
  },
  {
    number: "04",
    title: "Get Mentioned by Name on Other Sites",
    description:
      "AI cross-references sources. If your company is mentioned by name on industry sites, partner pages, directories, or press coverage, AI treats you as a validated entity.",
    fix: "Audit where your company name appears online outside your own domain. Guest posts, partner pages, award listings, directory profiles \u2014 each one is a citation signal.",
    why: "Third-party mentions act as confirmation. AI treats them the same way academics treat citations \u2014 more references from different sources means higher credibility.",
  },
  {
    number: "05",
    title: "Keep Content on Your Domain",
    description:
      "If your best content lives on Medium, Substack, or LinkedIn \u2014 AI may cite the platform, not you. The signal goes to someone else.",
    fix: "Publish all long-form content on your own domain first. Repurpose to other platforms with a link back. Your domain is your entity anchor.",
    why: "AI associates content with the domain it finds it on. If your thought leadership lives on medium.com, AI credits Medium.",
  },
  {
    number: "06",
    title: "Structure Content for Extraction",
    description:
      "AI extracts information in blocks. Headers, bullet points, tables, and bold definitions are easier for AI to parse than long paragraphs.",
    fix: "Restructure your top 5 pages with clear H2/H3 headers, bulleted lists for key points, and bold definitions for important terms. Think \u201CAI-readable\u201D not just \u201Chuman-readable.\u201D",
    why: "Structured content gets cited more because AI can extract a clean, attributable statement from it. Walls of text get skipped.",
  },
  {
    number: "07",
    title: "Publish Consistently",
    description:
      "AI weights recent content higher than old content. A company that published last week signals active expertise. A company whose last post was 8 months ago signals dormancy.",
    fix: "Publish at least once per week \u2014 a blog post, a case study update, a data point. Consistency matters more than volume.",
    why: "Recency is a trust signal. AI assumes that companies publishing regularly are more likely to represent current expertise than those with stale content.",
  },
];

export default function AiCitationSignalsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero */}
      <div className="max-w-3xl mb-12">
        <Link href="/ai-visibility" className="text-orange font-mono text-sm hover:underline mb-4 inline-block">&larr; AI Visibility</Link>
        <p className="font-mono text-orange text-sm mb-2 tracking-wider">
          FREE RESOURCE
        </p>
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-text-dark mb-6 leading-tight">
          7 signals that make AI{" "}
          <span className="text-orange">cite your company</span>
        </h1>
        <p className="text-muted text-lg leading-relaxed mb-4">
          AI does not rank pages. It recommends companies. The signals AI uses to
          decide who to recommend are not the same signals Google uses to rank
          websites. You can have perfect SEO and still be invisible to AI.
        </p>
        <p className="text-muted text-lg leading-relaxed">
          These 7 structural changes fix that.
        </p>
      </div>

      {/* Signal cards */}
      <section className="mb-20 space-y-6">
        {signals.map((signal) => (
          <div
            key={signal.number}
            className="bg-cream border border-light-border rounded-xl p-6 md:p-8"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange flex items-center justify-center">
                <span className="font-mono font-bold text-white text-sm">
                  {signal.number}
                </span>
              </div>
              <div>
                <h2 className="font-heading text-xl font-bold text-text-dark">
                  {signal.title}
                </h2>
                <p className="text-text-body text-sm leading-relaxed mt-2">
                  {signal.description}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-14">
              <div className="bg-white border border-light-border rounded-lg p-4">
                <p className="font-mono text-orange text-xs mb-2 tracking-wider">
                  THE FIX
                </p>
                <p className="text-text-body text-sm leading-relaxed">
                  {signal.fix}
                </p>
              </div>
              <div className="bg-white border border-light-border rounded-lg p-4">
                <p className="font-mono text-muted text-xs mb-2 tracking-wider">
                  WHY IT WORKS
                </p>
                <p className="text-text-muted text-sm leading-relaxed">
                  {signal.why}
                </p>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Priority order */}
      <section className="mb-20">
        <p className="font-mono text-orange text-sm mb-2 tracking-wider">
          START HERE
        </p>
        <h2 className="font-heading text-2xl font-bold text-text-dark mb-6">
          If you can only do three, do these first
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              number: "1st",
              title: "Name your methodology",
              signal: "Signal 02",
              reason: "Fastest to implement, highest structural impact.",
            },
            {
              number: "2nd",
              title: "Answer buyer questions directly",
              signal: "Signal 01",
              reason:
                "Rewrites your existing pages for AI readability.",
            },
            {
              number: "3rd",
              title: "Publish original data",
              signal: "Signal 03",
              reason:
                "Gives AI something it cannot find anywhere else.",
            },
          ].map((item) => (
            <div
              key={item.number}
              className="bg-navy-light border border-navy-border rounded-xl p-6"
            >
              <p className="font-mono text-orange text-2xl font-bold mb-2">
                {item.number}
              </p>
              <h3 className="font-heading font-bold text-white mb-1">
                {item.title}
              </h3>
              <p className="font-mono text-orange/60 text-xs mb-2">
                {item.signal}
              </p>
              <p className="text-muted text-sm leading-relaxed">
                {item.reason}
              </p>
            </div>
          ))}
        </div>
        <p className="text-muted text-sm mt-4">
          The rest compound over time. Start with these three and you will see a
          shift within 30–60 days.
        </p>
        <p className="text-muted text-sm mt-4">
          These signals map directly to the <Link href="/ai-visibility" className="text-orange hover:underline">4 dimensions of AI visibility</Link> that determine whether AI platforms recommend your company.
        </p>
      </section>

      {/* CTA section */}
      <section className="mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Scorecard CTA */}
          <div className="bg-cream border border-light-border rounded-xl p-8">
            <p className="font-mono text-orange text-xs mb-3 tracking-wider">
              CHECK YOUR SIGNAL
            </p>
            <h3 className="font-heading text-xl font-bold text-text-dark mb-3">
              AI Visibility Signal Scorecard
            </h3>
            <p className="text-text-body text-sm leading-relaxed mb-4">
              Free self-assessment. 4 dimensions. 5 minutes. Find out if AI can
              find your business.
            </p>
            <Link
              href="/resources/ai-visibility-scorecard"
              className="inline-block bg-orange hover:bg-orange-hover text-white font-semibold text-sm px-6 py-3 rounded-lg transition-colors"
            >
              Take the Scorecard
            </Link>
          </div>

          {/* Audit CTA */}
          <div className="bg-navy-light border border-navy-border rounded-xl p-8">
            <p className="font-mono text-orange text-xs mb-3 tracking-wider">
              GET THE FULL ANALYSIS
            </p>
            <h3 className="font-heading text-xl font-bold text-white mb-3">
              AI Visibility Audit — £297
            </h3>
            <p className="text-muted text-sm leading-relaxed mb-4">
              We run your company through our scanner, score all 4 dimensions
              with real data, and deliver a branded report with a prioritised
              action plan. 48 hours.
            </p>
            <a
              href="mailto:oloye@gtmsignalstudio.com?subject=AI%20Visibility%20Audit&body=Company%3A%20%0AWebsite%3A%20%0AKeywords%3A%20"
              className="inline-block bg-orange hover:bg-orange-hover text-white font-semibold text-sm px-6 py-3 rounded-lg transition-colors"
            >
              Get the Full Audit
            </a>
            <p className="text-muted text-xs mt-2">
              No call required. Email your URL.
            </p>
          </div>
        </div>
      </section>

      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "7 Signals That Make AI Cite Your Company",
            author: {
              "@type": "Person",
              name: "Oloye Adeosun",
            },
            publisher: {
              "@type": "Organization",
              name: "GTM Signal Studio",
              url: "https://gtmsignalstudio.com",
            },
            description:
              "The structural changes that move your company from invisible to recommended by AI platforms including Google AI Mode, Perplexity, and ChatGPT.",
          }),
        }}
      />
    </div>
  );
}
