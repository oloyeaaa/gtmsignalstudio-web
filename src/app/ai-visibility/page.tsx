import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Visibility for Enterprise | What It Is, Why It Matters, How to Fix It",
  description:
    "AI visibility is whether AI platforms recommend your company to buyers. Learn the 4 dimensions, check your score, and fix the gaps. Built for enterprise marketing teams.",
  keywords: [
    "AI visibility",
    "what is AI visibility",
    "AI visibility for enterprise",
    "AI search visibility",
    "Google AI Mode",
    "AI recommendations B2B",
    "enterprise AI visibility",
  ],
  openGraph: {
    title: "AI Visibility for Enterprise | GTM Signal Studio",
    description:
      "AI visibility is whether AI platforms recommend your company to buyers. Learn the 4 dimensions, check your score, and fix the gaps.",
    type: "website",
    url: "https://gtmsignalstudio.com/ai-visibility",
  },
  alternates: {
    canonical: "https://gtmsignalstudio.com/ai-visibility",
  },
};

export default function AiVisibilityPillar() {
  return (
    <>
      {/* Hero - Dark */}
      <section className="section-dark py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-sm mb-4 tracking-wider">
            AI VISIBILITY
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Is AI recommending your company to buyers?
          </h1>
          <p className="text-muted text-lg md:text-xl leading-relaxed mb-8">
            AI visibility is whether platforms like Google AI Mode, ChatGPT, and
            Perplexity mention your company when buyers search for what you sell.
            Most enterprise companies are invisible. Here is everything you need
            to understand, measure, and fix it.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { stat: "48%", label: "of B2B searches trigger AI answers" },
              { stat: "94%", label: "of buyers use AI during research" },
              { stat: "75%", label: "of enterprise teams have adopted AI" },
              { stat: "15-25", label: "average enterprise AI visibility score" },
            ].map((s) => (
              <div
                key={s.stat}
                className="bg-navy-light border border-navy-border rounded-xl p-4 text-center"
              >
                <p className="text-orange font-heading text-2xl font-bold">
                  {s.stat}
                </p>
                <p className="text-muted text-xs mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What is AI Visibility - Light */}
      <section className="section-light py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">
            THE DEFINITION
          </p>
          <h2 className="font-heading text-3xl font-bold text-text-dark mb-6">
            What is AI visibility?
          </h2>
          <div className="space-y-4 text-text-body leading-relaxed">
            <p>
              AI visibility is whether AI-powered platforms mention, recommend,
              or cite your company when someone searches for your category,
              service, or expertise.
            </p>
            <p>
              When a buyer searches &quot;best enterprise marketing platforms in
              the UK&quot; on Google AI Mode, the AI does not return ten blue
              links. It returns an answer. A curated shortlist of companies it
              considers relevant. If your company is on that list, you have AI
              visibility. If it is not, your competitors are getting the
              recommendation instead.
            </p>
            <p>
              This is different from SEO. Search engine optimisation focuses on
              ranking algorithms, backlinks, and keyword density. AI visibility
              depends on a different set of signals: how well AI understands your
              company (entity recognition), whether independent sources mention
              you (citation breadth), and whether your content is structured in a
              way AI can extract answers from (content structure).
            </p>
            <p>
              AI visibility is not a future trend. 48% of B2B searches already
              trigger AI-generated answers. 94% of B2B buyers use generative AI
              during their research process. The shift is happening now, and most
              enterprise companies have not adapted to it yet.
            </p>
          </div>
        </div>
      </section>

      {/* Why It Matters - Dark */}
      <section className="section-dark py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">
            WHY IT MATTERS
          </p>
          <h2 className="font-heading text-3xl font-bold text-white mb-8">
            The AI visibility gap
          </h2>
          <div className="space-y-4 text-muted leading-relaxed mb-8">
            <p>
              Enterprise marketing teams are investing heavily in AI internally.
              86% are increasing AI budgets this year. Marketing departments saw
              the biggest spend jump at 64%, ahead of every other department.
            </p>
            <p>
              But almost none of that investment is going into ensuring the
              company appears when AI is asked about its category. The result is
              a gap: companies are using AI to work faster while remaining
              invisible to the AI platforms that are shaping buyer decisions.
            </p>
          </div>
          <div className="bg-navy-light border border-navy-border rounded-xl p-6">
            <p className="text-white font-semibold mb-3">A quick test:</p>
            <p className="text-muted mb-4">
              Search for 10 companies in your industry on Google AI Mode using
              category keywords. Count how many appear in the AI-generated
              answer.
            </p>
            <p className="text-orange font-semibold">
              In our testing, 7 out of 10 did not appear. Their competitors did.
            </p>
          </div>
          <div className="mt-8">
            <Link
              href="/blog/the-ai-visibility-gap-enterprise-marketing"
              className="text-orange font-semibold hover:underline"
            >
              Read the full research: The AI Visibility Gap &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* The 4 Dimensions - White */}
      <section className="section-white py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">
            THE FRAMEWORK
          </p>
          <h2 className="font-heading text-3xl font-bold text-text-dark mb-4">
            The 4 dimensions of AI visibility
          </h2>
          <p className="text-text-body mb-8">
            AI platforms decide who to recommend based on four signal categories.
            Each one is measurable. Each one is fixable. Together they form a
            score from 0 to 100.
          </p>

          <div className="space-y-4">
            {[
              {
                num: "01",
                title: "Citation Presence",
                desc: "Does AI mention your company by name when someone searches for your service? This is the most visible dimension. Either you appear or you do not.",
                score: "0-25",
              },
              {
                num: "02",
                title: "Entity Recognition",
                desc: "Does AI correctly identify what your company does, who you serve, and what makes you different? Inconsistent descriptions across platforms confuse AI models.",
                score: "0-25",
              },
              {
                num: "03",
                title: "Content Structure",
                desc: "Can AI extract clear answers from your website content? JavaScript-rendered sites, vague hero sections, and missing schema markup make your content invisible to AI crawlers.",
                score: "0-25",
              },
              {
                num: "04",
                title: "Citation Breadth",
                desc: "Are you mentioned across multiple independent sources? AI platforms look for cross-platform consensus before recommending a company. One source is not enough.",
                score: "0-25",
              },
            ].map((d) => (
              <div
                key={d.num}
                className="flex gap-4 p-6 bg-cream border border-light-border rounded-xl"
              >
                <div className="flex-shrink-0">
                  <span className="font-mono text-orange text-2xl font-bold">
                    {d.num}
                  </span>
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-text-dark mb-1">
                    {d.title}{" "}
                    <span className="text-text-muted font-normal text-sm">
                      ({d.score})
                    </span>
                  </h3>
                  <p className="text-text-body text-sm leading-relaxed">
                    {d.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              href="/resources/ai-visibility-playbook"
              className="text-orange font-semibold hover:underline"
            >
              Full framework breakdown &rarr;
            </Link>
            <Link
              href="/resources/ai-citation-signals"
              className="text-orange font-semibold hover:underline"
            >
              The 7 citation signals AI looks for &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Check Your Score - Light */}
      <section className="section-light py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">
            CHECK YOUR SCORE
          </p>
          <h2 className="font-heading text-3xl font-bold text-text-dark mb-6">
            How to measure your AI visibility
          </h2>

          <div className="space-y-6 mb-8">
            <div>
              <h3 className="font-heading text-lg font-bold text-text-dark mb-3">
                The 60-second check
              </h3>
              <div className="space-y-3 text-text-body">
                {[
                  "Open Google AI Mode (google.com, click AI Mode at the top)",
                  'Search "best [your service] in [your market]"',
                  "Read the AI-generated answer. Are you named? Are your competitors?",
                  "Repeat on Perplexity with the same query",
                ].map((step, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="flex-shrink-0 w-7 h-7 bg-orange text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {i + 1}
                    </span>
                    <p>{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-light-border rounded-xl p-6">
              <h3 className="font-heading text-lg font-bold text-text-dark mb-2">
                Want a structured score?
              </h3>
              <p className="text-text-body mb-4">
                The AI Visibility Scorecard rates your company across all 4
                dimensions and gives you a score from 0 to 100 with a
                personalised breakdown.
              </p>
              <Link
                href="/resources/ai-visibility-scorecard"
                className="inline-block bg-orange hover:bg-orange-hover text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Take the free scorecard
              </Link>
            </div>
          </div>

          <div className="bg-white border border-light-border rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-cream">
                <tr>
                  <th className="text-left p-4 text-text-dark font-semibold">
                    Score
                  </th>
                  <th className="text-left p-4 text-text-dark font-semibold">
                    Rating
                  </th>
                  <th className="text-left p-4 text-text-dark font-semibold">
                    What it means
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    range: "0-20",
                    rating: "Invisible",
                    meaning: "AI does not recommend you. Buyers using AI will not find you.",
                  },
                  {
                    range: "21-40",
                    rating: "Weak",
                    meaning: "Partial visibility. Inconsistent presence across platforms.",
                  },
                  {
                    range: "41-60",
                    rating: "Developing",
                    meaning: "Some foundations in place. Specific gaps to fix.",
                  },
                  {
                    range: "61-80",
                    rating: "Strong",
                    meaning: "Appearing in most AI answers. Focus on maintaining.",
                  },
                  {
                    range: "81-100",
                    rating: "Dominant",
                    meaning: "Consistently cited. AI treats you as a category authority.",
                  },
                ].map((row) => (
                  <tr key={row.range} className="border-t border-light-border">
                    <td className="p-4 font-mono text-orange font-bold">
                      {row.range}
                    </td>
                    <td className="p-4 font-semibold text-text-dark">
                      {row.rating}
                    </td>
                    <td className="p-4 text-text-body">{row.meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* How to Fix It - Dark */}
      <section className="section-dark py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">
            HOW TO FIX IT
          </p>
          <h2 className="font-heading text-3xl font-bold text-white mb-8">
            Improving your AI visibility
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="font-heading text-lg font-bold text-white mb-3">
                <span className="text-orange">Quick wins</span> (this week)
              </h3>
              <ul className="space-y-2 text-muted">
                <li>
                  <span className="text-orange mr-2">&rarr;</span>Align your
                  company description across LinkedIn, website, Google Business
                  Profile, and directories
                </li>
                <li>
                  <span className="text-orange mr-2">&rarr;</span>Add FAQ schema
                  to your top 3 service pages
                </li>
                <li>
                  <span className="text-orange mr-2">&rarr;</span>Check if your
                  site is JavaScript-rendered (View Source; if content is missing
                  from the HTML, AI cannot see it)
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-heading text-lg font-bold text-white mb-3">
                <span className="text-orange">Medium effort</span> (this month)
              </h3>
              <ul className="space-y-2 text-muted">
                <li>
                  <span className="text-orange mr-2">&rarr;</span>Restructure
                  service page content so the first paragraph directly answers
                  what you do and who it is for
                </li>
                <li>
                  <span className="text-orange mr-2">&rarr;</span>Get listed in
                  5+ relevant directories (Clutch, G2, Google Business Profile,
                  industry associations)
                </li>
                <li>
                  <span className="text-orange mr-2">&rarr;</span>Publish 2-3
                  pieces on independent platforms (guest posts, industry
                  publications)
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-heading text-lg font-bold text-white mb-3">
                <span className="text-orange">Long-term</span> (this quarter)
              </h3>
              <ul className="space-y-2 text-muted">
                <li>
                  <span className="text-orange mr-2">&rarr;</span>Build a
                  content engine that generates independent citations through
                  original research and data
                </li>
                <li>
                  <span className="text-orange mr-2">&rarr;</span>Earn press
                  mentions in industry publications
                </li>
                <li>
                  <span className="text-orange mr-2">&rarr;</span>Monitor
                  quarterly because AI visibility changes over time
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8">
            <Link
              href="/resources/ai-visibility-playbook"
              className="text-orange font-semibold hover:underline"
            >
              Get the full prioritised fix list &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Enterprise Section - White */}
      <section className="section-white py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">
            ENTERPRISE
          </p>
          <h2 className="font-heading text-3xl font-bold text-text-dark mb-8">
            Why enterprise companies face unique challenges
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                title: "Multi-product visibility",
                text: "AI may cite your company for one product line but be completely unaware of others. Each product needs to be checked independently.",
              },
              {
                title: "Brand vs product name",
                text: "If your product has a different name from your company, AI may know one but not the other. Content must explicitly connect them.",
              },
              {
                title: "Decentralised ownership",
                text: "AI visibility sits at the intersection of brand, SEO, content, and product marketing. Most enterprise teams have no single owner.",
              },
              {
                title: "JavaScript rendering",
                text: "Enterprise websites often use frameworks that render content client-side. AI crawlers cannot execute JavaScript. The site appears empty.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-cream border border-light-border rounded-xl p-6"
              >
                <h3 className="font-heading text-lg font-bold text-text-dark mb-2">
                  {item.title}
                </h3>
                <p className="text-text-body text-sm leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Content - Light */}
      <section className="section-light py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">
            GO DEEPER
          </p>
          <h2 className="font-heading text-3xl font-bold text-text-dark mb-8">
            AI visibility resources
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                title: "AI Visibility Playbook",
                desc: "The full framework: 4 dimensions, scoring method, and prioritised fix list for enterprise teams.",
                href: "/resources/ai-visibility-playbook",
                label: "Read the playbook",
              },
              {
                title: "AI Visibility Scorecard",
                desc: "Interactive self-assessment. Score your company across all 4 dimensions in under 5 minutes.",
                href: "/resources/ai-visibility-scorecard",
                label: "Take the scorecard",
              },
              {
                title: "7 AI Citation Signals",
                desc: "The specific signals AI platforms use to decide who to recommend. Prioritised by impact.",
                href: "/resources/ai-citation-signals",
                label: "See the signals",
              },
              {
                title: "The AI Visibility Gap",
                desc: "Research: why enterprise teams investing in AI internally are invisible to AI externally.",
                href: "/blog/the-ai-visibility-gap-enterprise-marketing",
                label: "Read the research",
              },
            ].map((r) => (
              <Link
                key={r.title}
                href={r.href}
                className="block bg-white border border-light-border rounded-xl p-6 hover:border-orange transition-colors"
              >
                <h3 className="font-heading text-lg font-bold text-text-dark mb-2">
                  {r.title}
                </h3>
                <p className="text-text-body text-sm mb-3">{r.desc}</p>
                <span className="text-orange font-semibold text-sm">
                  {r.label} &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Dark */}
      <section className="section-dark py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">
            GET YOUR SCORE
          </p>
          <h2 className="font-heading text-3xl font-bold text-white mb-4">
            Want the exact number?
          </h2>
          <p className="text-muted text-lg mb-4 max-w-xl mx-auto">
            GTM Signal Studio runs AI Visibility Audits for companies that want
            precision, not guesswork. 4 dimensions, scored 0-100, prioritised
            fix plan, PDF delivered within 48 hours.
          </p>
          <p className="text-white text-2xl font-bold mb-8">&pound;297</p>
          <Link
            href="/ai-visibility-audit"
            className="inline-block bg-orange hover:bg-orange-hover text-white font-semibold px-8 py-4 rounded-lg transition-colors text-lg"
          >
            Get your AI Visibility Audit
          </Link>
        </div>
      </section>

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is AI visibility?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "AI visibility is whether AI-powered platforms like Google AI Mode, ChatGPT, and Perplexity mention, recommend, or cite your company when someone searches for your category, service, or expertise. It depends on entity recognition, citation presence, content structure, and citation breadth.",
                },
              },
              {
                "@type": "Question",
                name: "How do I check my company's AI visibility?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Open Google AI Mode and search 'best [your service] in [your market]'. Read the AI-generated answer. If your company is named, you have AI visibility for that query. Repeat on Perplexity. For a structured score, use the AI Visibility Scorecard at gtmsignalstudio.com/resources/ai-visibility-scorecard.",
                },
              },
              {
                "@type": "Question",
                name: "Is AI visibility the same as SEO?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No. SEO optimises for search engine ranking algorithms using backlinks, keyword density, and page authority. AI visibility depends on entity data, citation breadth across independent sources, structured content that AI can extract answers from, and cross-platform consensus. Different inputs, different playbook.",
                },
              },
              {
                "@type": "Question",
                name: "What is a good AI visibility score?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "AI visibility is scored from 0 to 100 across 4 dimensions (citation presence, entity recognition, content structure, citation breadth). The average enterprise company scores 15-25. A score above 60 is strong. Above 80 is dominant, meaning AI consistently treats you as a category authority.",
                },
              },
              {
                "@type": "Question",
                name: "How do I improve my AI visibility?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Start by aligning your company description across LinkedIn, your website, Google Business Profile, and directories. Add FAQ schema to key service pages. Get listed in 5+ relevant directories. Publish content on independent platforms. Ensure your website is server-side rendered so AI crawlers can read it.",
                },
              },
            ],
          }),
        }}
      />
    </>
  );
}
