import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "The HTML Myth in AI Visibility | 492 Enterprise Sites Tested",
  description:
    "I tested whether clean semantic HTML predicts AI citation across 492 enterprise sites. The correlation was -0.007. Top-quartile and bottom-quartile sites scored 77.3 and 77.1 on accessibility — a 0.1-point gap. The markup is not the moat.",
  keywords: [
    "AI visibility HTML",
    "semantic HTML AI search",
    "AI citation accessibility",
    "AI visibility research 2026",
    "structured data AI",
    "enterprise AI visibility",
  ],
  openGraph: {
    title: "The HTML Myth in AI Visibility | GTM Signal Studio",
    description:
      "492 enterprise sites tested. The correlation between AI citation and clean HTML accessibility was -0.007. The lazy AI-SEO advice does not survive the data.",
    type: "article",
    url: "https://gtmsignalstudio.com/research/ai-visibility-html-myth-2026",
  },
  alternates: {
    canonical:
      "https://gtmsignalstudio.com/research/ai-visibility-html-myth-2026",
  },
};

export default function HtmlMythResearchPage() {
  const quartileBars = [
    {
      label: "Top quartile by AI score (n=123)",
      ai: 48.1,
      a11y: 77.3,
      tone: "top" as const,
    },
    {
      label: "Bottom quartile by AI score (n=123)",
      ai: 2.0,
      a11y: 77.1,
      tone: "bottom" as const,
    },
  ];

  const visibleHighA11y = [
    { name: "Zapier", a11y: 100, ai: "high" },
    { name: "ZoomInfo", a11y: 99, ai: "high" },
    { name: "Forsters", a11y: 96, ai: "high" },
    { name: "Adyen", a11y: 95, ai: "high" },
    { name: "Avanade", a11y: 95, ai: "high" },
  ];

  const invisibleHighA11y = [
    { name: "Klaviyo", a11y: 78, ai: "2/100" },
    { name: "Monday.com", a11y: 73, ai: "2/100" },
    { name: "Braze", a11y: 78, ai: "2/100" },
    { name: "Segment", a11y: 87, ai: "2/100" },
    { name: "Zendesk", a11y: 91, ai: "2/100" },
  ];

  const axisAverages = [
    { axis: "Lang attribute", score: 4.3, max: 5, pct: 86 },
    { axis: "Document title", score: 4.6, max: 5, pct: 92 },
    { axis: "Heading hierarchy", score: 13.4, max: 20, pct: 67 },
    { axis: "Alt text coverage", score: 12.6, max: 20, pct: 63 },
    { axis: "ARIA landmarks", score: 10.7, max: 15, pct: 71 },
    { axis: "Link text quality", score: 13.4, max: 15, pct: 89 },
    { axis: "Form labels", score: 7.5, max: 10, pct: 75 },
    { axis: "Skip-to-content link", score: 1.6, max: 5, pct: 32, weak: true },
    { axis: "Button accessible name", score: 4.2, max: 5, pct: 84 },
  ];

  return (
    <>
      <PageHeader
        tagline="ORIGINAL RESEARCH"
        title="The HTML Myth in AI Visibility"
        subtitle="I had a clean theory: enterprise sites that score well on AI visibility must have cleaner HTML than the ones that don't. So I built a scanner and ran it across 492 enterprise sites I'd already benchmarked. The correlation was -0.007."
        breadcrumb={{ label: "Research", href: "/research" }}
        stats={[
          { stat: "492", label: "enterprise sites tested" },
          { stat: "-0.007", label: "correlation (Pearson r)" },
          { stat: "0.1pt", label: "top vs bottom A11y delta" },
          { stat: "77.0", label: "average A11y floor" },
        ]}
      />

      {/* Headline Finding */}
      <section className="section-light py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">
            THE HEADLINE
          </p>
          <h2 className="font-heading text-3xl font-bold text-text-dark mb-6">
            Clean HTML does not predict AI citation.
          </h2>
          <div className="space-y-4 text-text-body leading-relaxed">
            <p>
              Top quartile by AI visibility score (n=123): accessibility
              score <strong>77.3</strong>.
            </p>
            <p>
              Bottom quartile by AI visibility score (n=123): accessibility
              score <strong>77.1</strong>.
            </p>
            <p>
              A 0.1-point gap. Out of 100. Across 246 sites. The Pearson
              correlation across the full 492-site sample was{" "}
              <strong>−0.007</strong> — statistician for &ldquo;you imagined
              it.&rdquo;
            </p>
            <p>
              Klaviyo, Monday, Braze, Zendesk, Yotpo all sit at 78-91 on
              accessibility. Some are heavily AI-cited. Some are completely
              invisible. The HTML doesn&apos;t predict it either way.
            </p>
            <p className="font-semibold text-text-dark">
              The lazy AI-SEO advice currently doing the rounds — &ldquo;fix
              your semantic HTML and the LLMs will find you&rdquo; — does not
              survive contact with 492 enterprise sites.
            </p>
          </div>
        </div>
      </section>

      {/* Quartile comparison */}
      <section className="section-white py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">
            THE DATA
          </p>
          <h2 className="font-heading text-3xl font-bold text-text-dark mb-8">
            Top quartile vs bottom quartile
          </h2>

          <div className="space-y-8 mb-10">
            {quartileBars.map((row) => (
              <div key={row.label}>
                <p className="text-text-dark font-semibold mb-3">{row.label}</p>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="text-sm text-text-muted">
                        AI Visibility (out of 100)
                      </span>
                      <span className="font-mono text-sm text-text-dark">
                        {row.ai.toFixed(1)}
                      </span>
                    </div>
                    <div className="w-full bg-cream rounded-full h-3">
                      <div
                        className={`h-3 rounded-full ${
                          row.tone === "top" ? "bg-navy" : "bg-orange"
                        }`}
                        style={{ width: `${row.ai}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="text-sm text-text-muted">
                        Accessibility (out of 100)
                      </span>
                      <span className="font-mono text-sm text-text-dark">
                        {row.a11y.toFixed(1)}
                      </span>
                    </div>
                    <div className="w-full bg-cream rounded-full h-3">
                      <div
                        className="h-3 rounded-full bg-navy"
                        style={{ width: `${row.a11y}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-cream border border-light-border rounded-xl p-6">
            <p className="text-text-dark font-semibold mb-2">What this means:</p>
            <p className="text-text-body text-sm leading-relaxed">
              AI visibility varies wildly across enterprise sites — from 2 to
              97 out of 100. Accessibility does not. It clusters tightly around
              77/100. Almost every modern enterprise site already has competent
              semantic HTML. The variance in AI citation is being driven by
              something the front-end markup cannot see.
            </p>
          </div>
        </div>
      </section>

      {/* Both ends of the AI spectrum at high A11y */}
      <section className="section-dark py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">
            BOTH SIDES OF THE LINE
          </p>
          <h2 className="font-heading text-3xl font-bold text-white mb-4">
            Sites with great accessibility live on both sides of the AI line
          </h2>
          <p className="text-muted leading-relaxed mb-8">
            If clean HTML predicted AI citation, the high-accessibility names
            would cluster on one side. They don&apos;t. Pick any 5 from the
            top end of the A11y scale and you find some heavily cited and
            others completely invisible.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-navy-light border border-navy-border rounded-xl p-6">
              <p className="font-mono text-xs text-[#44aa66] mb-3">
                AI-CITED · HIGH A11Y
              </p>
              <ul className="space-y-2">
                {visibleHighA11y.map((c) => (
                  <li
                    key={c.name}
                    className="flex justify-between text-sm text-white"
                  >
                    <span>{c.name}</span>
                    <span className="font-mono text-muted">
                      A11y {c.a11y}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-navy-light border border-navy-border rounded-xl p-6">
              <p className="font-mono text-xs text-[#cc4444] mb-3">
                AI-INVISIBLE · HIGH A11Y
              </p>
              <ul className="space-y-2">
                {invisibleHighA11y.map((c) => (
                  <li
                    key={c.name}
                    className="flex justify-between text-sm text-white"
                  >
                    <span>{c.name}</span>
                    <span className="font-mono text-muted">
                      A11y {c.a11y} · AI {c.ai}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Per-axis averages */}
      <section className="section-white py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">
            PER-AXIS AVERAGES
          </p>
          <h2 className="font-heading text-3xl font-bold text-text-dark mb-4">
            Where enterprise sites still fall short
          </h2>
          <p className="text-text-body mb-8">
            These are real accessibility findings — even though none of them
            predict AI citation, several still represent failures of basic
            inclusive design across hundreds of enterprise sites.
          </p>

          <div className="space-y-4">
            {axisAverages.map((d) => (
              <div key={d.axis}>
                <div className="flex justify-between items-baseline mb-1">
                  <span
                    className={`text-sm font-semibold ${
                      d.weak ? "text-orange" : "text-text-dark"
                    }`}
                  >
                    {d.axis} {d.weak && "(weakest)"}
                  </span>
                  <span className="font-mono text-sm text-text-muted">
                    {d.score}/{d.max}
                  </span>
                </div>
                <div className="w-full bg-cream rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${
                      d.weak ? "bg-orange" : "bg-navy"
                    }`}
                    style={{ width: `${d.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-cream border border-light-border rounded-xl p-6">
            <p className="text-text-dark font-semibold mb-2">
              Skip-to-content links: 1.6/5
            </p>
            <p className="text-text-body text-sm leading-relaxed">
              Most enterprise sites are missing them entirely. This is the
              clearest accessibility failure across the dataset — and the one
              with the lowest fix cost. Worth noting: it still does not change
              your AI visibility.
            </p>
          </div>
        </div>
      </section>

      {/* Key Insights */}
      <section className="section-light py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">
            KEY INSIGHTS
          </p>
          <h2 className="font-heading text-3xl font-bold text-text-dark mb-8">
            What the data tells us
          </h2>

          <div className="space-y-6">
            {[
              {
                insight: "The accessibility floor is high — and uniform",
                detail:
                  "Across 492 enterprise sites the standard deviation on accessibility was just 13.2 points (mean 77.0). Almost every modern enterprise site has competent markup. Most of the differentiation people obsess over does not exist at the homepage HTML level.",
              },
              {
                insight: "AI visibility variance is enormous — and unrelated",
                detail:
                  "AI visibility ranged from 2 to 97 out of 100 (sd 28.4). The two metrics move independently. Whatever drives citation is not visible in the front-end source code.",
              },
              {
                insight: "Named cases on both sides break the narrative",
                detail:
                  "Klaviyo, Monday, Braze, Segment and Zendesk all sit between 73 and 91 on accessibility while scoring 2/100 on AI visibility. Forsters and Adyen sit at 95-96 on accessibility AND score 96-97 on AI. Same markup quality, opposite citation outcomes.",
              },
              {
                insight: "Per-axis weaknesses are real but unrelated to AI",
                detail:
                  "Skip-to-content links (1.6/5), alt text (12.6/20), and landmark structure (10.7/15) are genuinely weak across the enterprise sample. Worth fixing for human users. Not worth doing in the name of AI visibility.",
              },
              {
                insight: "If it isn't the HTML, what is it?",
                detail:
                  "The next study tests four candidate predictors that operate outside the markup: Wikipedia presence, third-party press mentions, schema.org coverage, and domain age. Working hypothesis: external citation graph and entity authority dominate. Findings to follow after the May benchmark.",
              },
            ].map((item) => (
              <div
                key={item.insight}
                className="bg-white border border-light-border rounded-xl p-6"
              >
                <h3 className="font-heading font-bold text-text-dark mb-2">
                  {item.insight}
                </h3>
                <p className="text-text-body text-sm leading-relaxed">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Citable Stats */}
      <section className="section-white py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">
            CITE THIS RESEARCH
          </p>
          <h2 className="font-heading text-3xl font-bold text-text-dark mb-4">
            Stats you can use
          </h2>
          <p className="text-text-body mb-8">
            All stats from this study. Link to this page as your source.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                stat: "−0.007",
                label:
                  "Pearson correlation between AI visibility and accessibility across 492 enterprise sites",
              },
              {
                stat: "0.1pt",
                label:
                  "accessibility gap between top-quartile and bottom-quartile AI-cited sites (n=246)",
              },
              {
                stat: "77.3",
                label: "top-quartile AI sites' accessibility score (out of 100)",
              },
              {
                stat: "77.1",
                label:
                  "bottom-quartile AI sites' accessibility score (out of 100)",
              },
              {
                stat: "77.0",
                label:
                  "average accessibility score across all 492 enterprise sites — the floor",
              },
              {
                stat: "1.6/5",
                label:
                  "average skip-to-content link score — the weakest accessibility axis",
              },
              {
                stat: "12.6/20",
                label:
                  "average alt-text coverage — consistent gap across all sectors",
              },
              {
                stat: "492 / 524",
                label: "valid scans from 524 unique domains in the registry",
              },
            ].map((item) => (
              <div
                key={item.stat + item.label}
                className="bg-cream border border-light-border rounded-xl p-5"
              >
                <p className="text-orange font-heading text-2xl font-bold mb-1">
                  {item.stat}
                </p>
                <p className="text-text-dark text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="section-dark py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">
            METHODOLOGY
          </p>
          <h2 className="font-heading text-3xl font-bold text-white mb-8">
            How we ran this study
          </h2>

          <div className="space-y-6 text-muted leading-relaxed">
            <div>
              <h3 className="text-white font-semibold mb-2">Sample</h3>
              <p>
                524 unique enterprise domains drawn from the GTM Signal Studio
                AI Visibility Registry — a unified canonical list pulled from
                three editions of the Enterprise Benchmark (March, April, May
                2026) plus the UK Law Firms 2026 spinoff. 492 returned valid
                HTML and were included in the correlation. 32 returned errors
                or empty bodies (typically heavy SPAs).
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">Accessibility scan</h3>
              <p>
                Custom Python scanner running BeautifulSoup over the homepage
                HTML. Scored 9 axes for a total of 100: lang attribute (5),
                document title (5), heading hierarchy (20), alt text coverage
                (20), ARIA landmarks (15), link text quality (15), form labels
                (10), skip-to-content link (5), and button accessible name (5).
                Scoring is consistent with how axe and Lighthouse evaluate
                these signals.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">AI visibility score</h3>
              <p>
                Pulled from the existing benchmark dataset. Each site was
                already scored 0-100 across Citation Presence, Entity
                Recognition, Content Structure, and Citation Breadth using
                Scanner v2.0 (multi-API: OpenAI, Gemini, Brave, Tavily). Most
                recent scan per domain was used.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">Correlation</h3>
              <p>
                Pearson r between AI total score and accessibility total score
                across 492 paired observations. Computed in pure Python — no
                statistical package, no preprocessing, no outlier removal.
                Quartile means computed by sorting on AI score and taking the
                top and bottom 25%.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">Limitations</h3>
              <p>
                Homepage HTML only — JS-rendered SPAs may underscore on
                accessibility for the wrong reason. The scanner does not run
                Playwright. We are measuring static markup quality, not the
                full rendered DOM. The correlation conclusion is robust to
                this caveat because the effect we&apos;re testing is so close
                to zero (−0.007) that any plausible JS-rendering correction
                cannot move it into significance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-light py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl font-bold text-text-dark mb-4">
            If it isn&apos;t the HTML, what is it?
          </h2>
          <p className="text-text-body text-lg mb-8 max-w-xl mx-auto">
            The AI Visibility Audit tests the things that actually move the
            needle — citation presence, entity recognition, third-party
            authority — not a markup checklist anyone could run themselves.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/ai-visibility-audit"
              className="inline-block bg-orange hover:bg-orange-hover text-white font-semibold px-8 py-4 rounded-lg transition-colors text-lg"
            >
              Get an AI Visibility Audit — £297
            </Link>
            <Link
              href="/research/ai-visibility-benchmark-april-2026"
              className="inline-block border border-light-border hover:border-orange text-text-dark font-semibold px-8 py-4 rounded-lg transition-colors text-lg"
            >
              See the April benchmark
            </Link>
          </div>
        </div>
      </section>

      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ScholarlyArticle",
            headline: "The HTML Myth in AI Visibility",
            description:
              "Original research: 492 enterprise sites tested for correlation between accessibility score and AI citation. r=-0.007.",
            author: {
              "@type": "Person",
              name: "Oloye Adeosun",
              url: "https://gtmsignalstudio.com/about",
            },
            publisher: {
              "@type": "Organization",
              name: "GTM Signal Studio",
              url: "https://gtmsignalstudio.com",
            },
            datePublished: "2026-05-01",
            url: "https://gtmsignalstudio.com/research/ai-visibility-html-myth-2026",
          }),
        }}
      />

      {/* Dataset Schema — citable underlying data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Dataset",
            "@id": "https://gtmsignalstudio.com/research/ai-visibility-html-myth-2026#dataset",
            name: "The HTML Myth in AI Visibility — Accessibility vs Citation Correlation",
            description:
              "492 enterprise sites tested for correlation between WCAG accessibility score and AI citation presence. Pearson r=-0.007, delta 0.1 points. Refutes the claim that clean HTML drives AI citation.",
            url: "https://gtmsignalstudio.com/research/ai-visibility-html-myth-2026",
            creator: { "@id": "https://gtmsignalstudio.com/#founder" },
            publisher: { "@id": "https://gtmsignalstudio.com/#organization" },
            datePublished: "2026-05-01",
            dateModified: "2026-05-01",
            inLanguage: "en-GB",
            license: "https://creativecommons.org/licenses/by/4.0/",
            isAccessibleForFree: true,
            keywords: ["AI visibility", "AEO", "accessibility", "WCAG", "correlation study"],
            spatialCoverage: { "@type": "Place", name: "United Kingdom" },
            variableMeasured: [
              "WCAG accessibility score (0–100)",
              "AI citation presence (0–25)",
              "Pearson correlation coefficient",
            ],
            measurementTechnique:
              "Paired-sample correlation analysis: each site scored on accessibility and AI citation presence; Pearson's r computed across N=492.",
            numberOfItems: 492,
            distribution: {
              "@type": "DataDownload",
              encodingFormat: "text/html",
              contentUrl: "https://gtmsignalstudio.com/research/ai-visibility-html-myth-2026",
            },
          }),
        }}
      />
    </>
  );
}
