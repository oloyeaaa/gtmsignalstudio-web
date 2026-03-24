import type { Metadata } from "next";
import EmailGate from "@/components/EmailGate";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The AI Visibility Playbook for Enterprise Marketers — GTM Signal Studio",
  description:
    "Your buyers ask AI before they Google you. Learn how to check, score, and fix your AI visibility across Google AI Mode, ChatGPT, and Perplexity. Free playbook.",
  keywords: [
    "AI visibility playbook",
    "enterprise AI visibility",
    "AI visibility audit",
    "B2B AI search",
    "AI visibility for enterprise",
    "Google AI Mode visibility",
  ],
  openGraph: {
    title: "The AI Visibility Playbook for Enterprise Marketers",
    description:
      "Your buyers ask AI before they Google you. Learn how to check, score, and fix your AI visibility. Free playbook.",
    url: "https://gtmsignalstudio.com/resources/ai-visibility-playbook",
    type: "website",
    images: [
      {
        url: "https://gtmsignalstudio.com/og-default.png",
        width: 1200,
        height: 630,
        alt: "The AI Visibility Playbook for Enterprise Marketers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The AI Visibility Playbook for Enterprise Marketers",
    description:
      "Your buyers ask AI before they Google you. Learn how to check, score, and fix your AI visibility. Free playbook.",
    images: ["https://gtmsignalstudio.com/og-default.png"],
  },
};

function StatCard({ stat, label }: { stat: string; label: string }) {
  return (
    <div className="bg-navy-light border border-navy-border rounded-xl p-5 text-center">
      <p className="font-heading text-3xl font-bold text-orange mb-1">{stat}</p>
      <p className="text-muted text-xs">{label}</p>
    </div>
  );
}

function DimensionCard({
  number,
  title,
  question,
  howToCheck,
  scores,
  insight,
}: {
  number: number;
  title: string;
  question: string;
  howToCheck: string;
  scores: { range: string; meaning: string }[];
  insight?: string;
}) {
  return (
    <div className="bg-white border border-light-border rounded-xl p-8 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-orange flex items-center justify-center">
          <span className="font-mono text-white text-sm font-bold">{number}</span>
        </div>
        <h3 className="font-heading text-xl font-bold text-text-dark">
          {title} <span className="text-muted font-normal text-sm">(0-25)</span>
        </h3>
      </div>
      <p className="text-text-body mb-4">
        <span className="font-semibold">What it measures:</span> {question}
      </p>
      <p className="text-text-body mb-4">
        <span className="font-semibold">How to check:</span> {howToCheck}
      </p>
      <div className="bg-cream rounded-lg p-4 mb-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-text-muted">
              <th className="pb-2 font-medium">Score</th>
              <th className="pb-2 font-medium">Meaning</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((s) => (
              <tr key={s.range} className="border-t border-light-border">
                <td className="py-2 font-mono text-orange font-bold">{s.range}</td>
                <td className="py-2 text-text-body">{s.meaning}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {insight && (
        <p className="text-text-muted text-sm italic">{insight}</p>
      )}
    </div>
  );
}

export default function AiVisibilityPlaybookPage() {
  return (
    <>
      {/* Hero - Dark */}
      <section className="section-dark py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="font-mono text-orange text-sm mb-4 tracking-wider">
              FREE PLAYBOOK
            </p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              The AI Visibility Playbook{" "}
              <span className="text-orange">for Enterprise Marketers</span>
            </h1>
            <p className="text-muted text-lg leading-relaxed mb-4">
              Your buyers ask AI before they Google you. 48% of B2B searches now
              trigger AI-generated answers. If your company does not appear in
              those answers, you are not on the shortlist.
            </p>
            <p className="text-muted text-lg leading-relaxed">
              This playbook shows you how to check your AI visibility in 60
              seconds, score yourself across 4 dimensions, and fix the gaps that
              keep you invisible.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            <StatCard stat="48%" label="of B2B searches trigger AI answers" />
            <StatCard stat="94%" label="of B2B buyers use AI in research" />
            <StatCard stat="15-25" label="average B2B company AI visibility score" />
            <StatCard stat="60s" label="to check if AI recommends you" />
          </div>
        </div>
      </section>

      {/* The Shift - Cream */}
      <section className="section-light py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">THE SHIFT</p>
          <h2 className="font-heading text-3xl font-bold text-text-dark mb-6">
            This is not an SEO problem
          </h2>
          <p className="text-text-body text-lg leading-relaxed mb-4">
            The way B2B buyers find companies has changed. Not gradually.
            Structurally. Google AI Mode, ChatGPT, and Perplexity are building
            shortlists before buyers visit your website.
          </p>
          <p className="text-text-body text-lg leading-relaxed mb-4">
            SEO optimises for search engine ranking algorithms. AI visibility
            requires a different set of signals: entity data, structured content,
            and cross-platform citations that AI models use to make
            recommendations.
          </p>
          <p className="text-text-body text-lg leading-relaxed font-semibold">
            You can rank #1 on Google and still not appear in any AI-generated
            answer.
          </p>
        </div>
      </section>

      {/* 4 Dimensions - White */}
      <section className="section-white py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">THE FRAMEWORK</p>
          <h2 className="font-heading text-3xl font-bold text-text-dark mb-10">
            The 4 dimensions of AI visibility
          </h2>

          <DimensionCard
            number={1}
            title="Citation Presence"
            question="Does AI mention your company by name when someone searches for your service?"
            howToCheck='Search "best [your service] in [your market]" on Google AI Mode, ChatGPT, and Perplexity. Count how many times your company appears.'
            scores={[
              { range: "0-5", meaning: "Invisible. AI does not know you exist." },
              { range: "6-15", meaning: "Mentioned on 1 platform, absent from others." },
              { range: "16-25", meaning: "Consistently cited across multiple AI platforms." },
            ]}
          />

          <DimensionCard
            number={2}
            title="Entity Recognition"
            question="Does AI correctly identify what your company does, who you serve, and what makes you different?"
            howToCheck='Ask ChatGPT or Perplexity: "What does [your company] do?" Compare the answer to your actual positioning.'
            scores={[
              { range: "0-5", meaning: "AI has no information or gives wrong information." },
              { range: "6-15", meaning: "Partially correct. Knows the company but not the positioning." },
              { range: "16-25", meaning: "Accurate description of services, market, and differentiators." },
            ]}
            insight="Inconsistent descriptions across LinkedIn, your website, and directories confuse AI models. They default to the most common description, which may be outdated."
          />

          <DimensionCard
            number={3}
            title="Content Structure"
            question="Can AI extract clear answers from your website content?"
            howToCheck='View your key service pages. Does the first paragraph directly answer "what do you do and who is it for?" Is there FAQ schema?'
            scores={[
              { range: "0-5", meaning: "Website built for visual appeal, not information extraction. JS-rendered." },
              { range: "6-15", meaning: "Some structured content but inconsistent. Missing schema markup." },
              { range: "16-25", meaning: "Direct answers, FAQ schema, clear heading hierarchy, server-side rendered." },
            ]}
            insight="JavaScript-rendered websites load content client-side. AI crawlers cannot execute JavaScript. Your site looks great to humans but is invisible to machines."
          />

          <DimensionCard
            number={4}
            title="Citation Breadth"
            question="Are you mentioned across multiple independent sources?"
            howToCheck="Search your company name on Google. Count how many independent sites mention you (not your own website or social profiles)."
            scores={[
              { range: "0-5", meaning: "Mentioned only on your own website. No independent citations." },
              { range: "6-15", meaning: "Listed in a few directories. Minimal third-party mentions." },
              { range: "16-25", meaning: "Cited across 8+ independent sources including press and publications." },
            ]}
            insight="AI platforms look for cross-platform consensus before recommending. One source is not enough. Multiple independent mentions signal credibility."
          />
        </div>
      </section>

      {/* 60-Second Check - Dark */}
      <section className="section-dark py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">THE 60-SECOND CHECK</p>
          <h2 className="font-heading text-3xl font-bold text-white mb-8">
            Do this right now
          </h2>

          <div className="space-y-6">
            {[
              {
                step: "1",
                text: 'Open Google AI Mode (google.com, click "AI Mode" at the top)',
              },
              {
                step: "2",
                text: 'Search: "best [your service] in [your market]"',
              },
              {
                step: "3",
                text: "Read the AI answer. Is your company named? Are your competitors?",
              },
              {
                step: "4",
                text: "Repeat on Perplexity (perplexity.ai) with the same query.",
              },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-orange flex-shrink-0 flex items-center justify-center">
                  <span className="font-mono text-white text-sm font-bold">
                    {item.step}
                  </span>
                </div>
                <p className="text-white text-lg leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-navy-light border border-navy-border rounded-xl p-6">
            <p className="text-muted text-lg">
              <span className="text-orange font-semibold">What you will likely find:</span>{" "}
              Your competitors appear. You do not. The AI is building a shortlist
              for your buyers, and you are not on it.
            </p>
          </div>
        </div>
      </section>

      {/* Score Yourself - Cream */}
      <section className="section-light py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">SCORE YOURSELF</p>
          <h2 className="font-heading text-3xl font-bold text-text-dark mb-6">
            Rate your company (0-100)
          </h2>
          <p className="text-text-body mb-8">
            Score each dimension honestly. Add them up for your total AI
            Visibility Signal score.
          </p>

          <div className="bg-white border border-light-border rounded-xl overflow-hidden mb-8">
            <table className="w-full">
              <thead className="bg-cream">
                <tr>
                  <th className="text-left p-4 text-text-dark font-semibold">Score Range</th>
                  <th className="text-left p-4 text-text-dark font-semibold">Rating</th>
                  <th className="text-left p-4 text-text-dark font-semibold">What It Means</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { range: "0-20", rating: "Invisible", meaning: "AI does not recommend you. Buyers using AI will not find you." },
                  { range: "21-40", rating: "Weak", meaning: "Partial visibility. Inconsistent presence. Competitors are ahead." },
                  { range: "41-60", rating: "Developing", meaning: "Some foundations in place. Specific gaps to fix." },
                  { range: "61-80", rating: "Strong", meaning: "Appearing in most AI answers. Focus on maintaining and expanding." },
                  { range: "81-100", rating: "Dominant", meaning: "Consistently cited. AI treats you as a category authority." },
                ].map((row) => (
                  <tr key={row.range} className="border-t border-light-border">
                    <td className="p-4 font-mono text-orange font-bold">{row.range}</td>
                    <td className="p-4 font-semibold text-text-dark">{row.rating}</td>
                    <td className="p-4 text-text-body">{row.meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-text-muted text-sm">
            <span className="font-semibold">Benchmark:</span> The average B2B
            company scores 15-25 out of 100. Most enterprise companies score under 40.
          </p>

          <div className="mt-6">
            <Link
              href="/resources/ai-visibility-scorecard"
              className="text-orange font-semibold hover:underline"
            >
              Take the interactive scorecard to get your exact score &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Fix List - White (Gated) */}
      <section className="section-white py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">THE FIX LIST</p>
          <h2 className="font-heading text-3xl font-bold text-text-dark mb-6">
            Prioritised fixes by impact
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="font-heading text-lg font-bold text-text-dark mb-3">
                <span className="text-orange">Quick Wins</span> (this week)
              </h3>
              <ul className="space-y-2 text-text-body">
                <li><span className="text-orange mr-2">&rarr;</span>Align your entity data across LinkedIn, website, Google Business Profile, and all directories</li>
                <li><span className="text-orange mr-2">&rarr;</span>Add FAQ schema to your top 3 service pages</li>
                <li><span className="text-orange mr-2">&rarr;</span>Check if your site is JavaScript-rendered (View Source - if content is not in the HTML, AI cannot see it)</li>
              </ul>
            </div>

            <div>
              <h3 className="font-heading text-lg font-bold text-text-dark mb-3">
                <span className="text-orange">Medium Effort</span> (this month)
              </h3>
              <ul className="space-y-2 text-text-body">
                <li><span className="text-orange mr-2">&rarr;</span>Restructure service page content - first paragraph answers &quot;what do you do and who is it for?&quot;</li>
                <li><span className="text-orange mr-2">&rarr;</span>Get listed in 5+ relevant directories (Clutch, G2, Google Business Profile, industry associations)</li>
                <li><span className="text-orange mr-2">&rarr;</span>Publish 2-3 pieces on independent platforms (guest posts, industry publications)</li>
              </ul>
            </div>

            <div>
              <h3 className="font-heading text-lg font-bold text-text-dark mb-3">
                <span className="text-orange">Long-Term Investment</span> (this quarter)
              </h3>
              <ul className="space-y-2 text-text-body">
                <li><span className="text-orange mr-2">&rarr;</span>Build a content engine that generates independent citations (original research, data reports)</li>
                <li><span className="text-orange mr-2">&rarr;</span>Earn press mentions in industry publications</li>
                <li><span className="text-orange mr-2">&rarr;</span>Monitor quarterly - AI visibility is not static</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Angle - Dark */}
      <section className="section-dark py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">THE ENTERPRISE ANGLE</p>
          <h2 className="font-heading text-3xl font-bold text-white mb-8">
            What enterprise companies get wrong
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Multi-product visibility",
                text: "AI may cite your company for one product line but be completely unaware of others. Check each product independently.",
              },
              {
                title: "Brand vs product name",
                text: "If your product has a different name from your company, AI may know one but not the other. Your content must explicitly connect them.",
              },
              {
                title: "Competitor monitoring",
                text: "Run the same AI searches for your top 3 competitors. If they appear and you do not, that is your board-level problem statement.",
              },
              {
                title: "Internal ownership",
                text: "AI visibility sits at the intersection of brand, SEO, content, and product marketing. Most enterprise companies have no single owner. Assign one.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-navy-light border border-navy-border rounded-xl p-6"
              >
                <h3 className="font-heading text-lg font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-muted leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Cream */}
      <section className="section-light py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">GET YOUR SCORE</p>
          <h2 className="font-heading text-3xl font-bold text-text-dark mb-4">
            Want the exact number?
          </h2>
          <p className="text-text-body text-lg mb-4 max-w-xl mx-auto">
            GTM Signal Studio runs AI Visibility Audits for companies that want
            precision, not guesswork. 4 dimensions, scored 0-100, prioritised fix
            plan, PDF delivered within 48 hours.
          </p>
          <p className="text-text-dark text-2xl font-bold mb-8">&pound;297</p>
          <Link
            href="/ai-visibility-audit"
            className="inline-block bg-orange hover:bg-orange-hover text-white font-semibold px-8 py-4 rounded-lg transition-colors text-lg"
          >
            Check your AI Visibility
          </Link>

          <div className="mt-12 pt-8 border-t border-light-border">
            <p className="text-text-muted text-sm mb-4">
              Get weekly enterprise marketing insights. Research-backed. No fluff.
            </p>
            <div className="flex justify-center">
              <EmailGate
                magnet="ai-visibility-playbook"
                source="ai-visibility-playbook"
                downloadUrl="https://newsletter.gtmsignalstudio.com/"
                buttonLabel="Subscribe to The GTM Signal"
                successLabel="View Newsletter Archive"
                buttonClass="bg-navy hover:bg-navy-light text-white border border-navy-border"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
