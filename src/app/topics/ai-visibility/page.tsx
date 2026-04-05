import Link from "next/link";
import type { Metadata } from "next";
import { getPostsByCategory } from "@/lib/queries";
import type { Post } from "@/lib/queries";

export const metadata: Metadata = {
  title: "AI Visibility — Research, Benchmarks, and Strategy | GTM Signal Studio",
  description:
    "How AI platforms see your brand. Research benchmarks, scoring methodology, and strategies for getting cited by ChatGPT, Google AI Mode, and Perplexity. Every article maps to this pillar.",
  keywords: [
    "AI visibility",
    "AI visibility benchmark",
    "AI citations B2B",
    "Google AI Mode visibility",
    "ChatGPT citations",
    "Perplexity citations",
    "AI search optimisation",
    "AI visibility score",
    "AEO",
  ],
  openGraph: {
    title: "AI Visibility — GTM Signal Studio",
    description:
      "Research, benchmarks, and strategies for getting cited by AI platforms.",
    type: "website",
    url: "https://gtmsignalstudio.com/topics/ai-visibility",
  },
  alternates: {
    canonical: "https://gtmsignalstudio.com/topics/ai-visibility",
  },
};

export const revalidate = 3600;

export default async function AiVisibilityPillar() {
  let posts: Partial<Post>[] = [];
  try {
    posts = await getPostsByCategory("AI Visibility", 50);
  } catch {
    // Supabase not connected
  }

  return (
    <>
      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "AI Visibility",
            description:
              "Research, benchmarks, and strategies for getting cited by AI platforms.",
            url: "https://gtmsignalstudio.com/topics/ai-visibility",
            publisher: { "@id": "https://gtmsignalstudio.com/#organization" },
            hasPart: posts.map((p) => ({
              "@type": "Article",
              headline: p.title,
              url: `https://gtmsignalstudio.com/blog/${p.slug}`,
            })),
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
                name: "What is AI visibility?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "AI visibility is whether AI-powered platforms like Google AI Mode, ChatGPT, and Perplexity mention, recommend, or cite your company when someone searches for your category, service, or expertise. It is measured across 4 dimensions: citation presence, entity recognition, content structure, and citation breadth.",
                },
              },
              {
                "@type": "Question",
                name: "How do you measure AI visibility?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "AI visibility is scored from 0 to 100 across 4 dimensions. GTM Signal Studio's scanner queries multiple AI platforms (Google AI Mode, ChatGPT, Perplexity, Gemini) with category-relevant keywords and measures whether a company is cited, how accurately it is described, whether content is extractable, and how many independent sources reference it.",
                },
              },
              {
                "@type": "Question",
                name: "What is the average AI visibility score?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Based on GTM Signal Studio's benchmark of 150 enterprise companies in April 2026, the average AI visibility score is 28.7 out of 100. 81% of companies scored below 40, meaning they are effectively invisible to AI platforms. The bottom 10 performers were all in IT Services.",
                },
              },
              {
                "@type": "Question",
                name: "How does AI visibility differ from SEO?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "SEO optimises for ranking algorithms using backlinks, keywords, and page authority. AI visibility depends on entity recognition, citation breadth across independent sources, structured content that AI can extract answers from, and cross-platform consensus. A company can rank first on Google and still be invisible to AI platforms.",
                },
              },
              {
                "@type": "Question",
                name: "How do AI platforms decide what to cite?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "AI platforms look for 7 citation signals: consistent entity description across sources, structured content with clear answers, independent third-party mentions, recent and regularly updated content, domain authority in the specific category, schema markup that defines the organisation, and content that directly answers the query being asked.",
                },
              },
            ],
          }),
        }}
      />

      {/* Hero */}
      <section className="bg-navy">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <nav className="flex items-center gap-2 text-sm text-white/40 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>→</span>
            <Link href="/topics" className="hover:text-white transition-colors">Topics</Link>
            <span>→</span>
            <span className="text-white">AI Visibility</span>
          </nav>

          <p className="font-mono text-orange text-sm mb-4 tracking-wider">
            PILLAR TOPIC
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            AI Visibility
          </h1>
          <p className="text-white/60 text-lg md:text-xl leading-relaxed mb-8">
            How AI platforms see your brand. Research, benchmarks, and strategies
            for getting cited by ChatGPT, Google AI Mode, and Perplexity. Every
            article on this page is backed by original data from our scanner and
            benchmark studies.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { stat: "81%", label: "of companies are invisible to AI" },
              { stat: "28.7", label: "average AI visibility score (0-100)" },
              { stat: "150+", label: "companies benchmarked" },
              { stat: "4", label: "dimensions measured" },
            ].map((s) => (
              <div
                key={s.stat}
                className="bg-white/5 border border-white/10 rounded-xl p-4 text-center"
              >
                <p className="text-orange font-heading text-2xl font-bold">{s.stat}</p>
                <p className="text-white/40 text-xs mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What is AI visibility */}
      <section className="bg-white py-16 md:py-20 border-b border-light-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">THE DEFINITION</p>
          <h2 className="font-heading text-3xl font-bold text-text-dark mb-6">
            What is AI visibility?
          </h2>
          <div className="space-y-4 text-text-body leading-relaxed">
            <p>
              AI visibility is whether AI-powered platforms mention, recommend, or
              cite your company when someone searches for your category, service,
              or expertise. When a buyer asks Google AI Mode &quot;best marketing
              automation platforms for enterprise&quot;, the AI returns an answer.
              Not ten blue links. An answer. If your company is in that answer,
              you have AI visibility. If not, your competitors are getting the
              recommendation.
            </p>
            <p>
              This is not SEO. Search engine optimisation focuses on ranking
              algorithms, backlinks, and keyword density. AI visibility depends on
              a different set of signals: how well AI understands your company
              (entity recognition), whether independent sources mention you (citation
              breadth), whether your content is structured in a way AI can extract
              answers from (content structure), and whether AI actually names you
              when asked (citation presence).
            </p>
            <p>
              We measure it. We publish the benchmarks. And we write about what
              works and what does not, based on the data — not opinion.
            </p>
          </div>
          <div className="mt-6">
            <Link href="/ai-visibility" className="text-orange font-semibold hover:underline">
              Full AI visibility explainer &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Why does it matter */}
      <section className="bg-cream py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">THE SHIFT</p>
          <h2 className="font-heading text-3xl font-bold text-text-dark mb-6">
            Why does AI visibility matter for B2B companies?
          </h2>
          <div className="space-y-4 text-text-body leading-relaxed">
            <p>
              48% of B2B searches now trigger AI-generated answers. 94% of B2B
              buyers use generative AI during their research process. Gartner
              predicts search engine volume will drop 25% by 2026 as AI takes
              over the research phase.
            </p>
            <p>
              The buyer journey is changing. Before, buyers searched Google, clicked
              through to websites, and compared options. Now, buyers ask AI for a
              recommendation and get an answer in seconds. If your company is not
              in that answer, you are not in the consideration set. You are not
              losing a ranking position — you are not in the room.
            </p>
            <p>
              This creates a compounding disadvantage. The companies that AI
              recommends get more traffic, more mentions, more citations — which
              makes AI recommend them more. The companies that are invisible stay
              invisible. First-mover advantage in AI visibility is real.
            </p>
          </div>
        </div>
      </section>

      {/* How do AI platforms decide */}
      <section className="bg-white py-16 md:py-20 border-b border-light-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">THE MECHANICS</p>
          <h2 className="font-heading text-3xl font-bold text-text-dark mb-6">
            How do AI platforms decide what to cite?
          </h2>
          <div className="space-y-4 text-text-body leading-relaxed mb-8">
            <p>
              AI platforms are not search engines. They do not rank pages by
              backlink count. They synthesise information from multiple sources
              and generate a response. The companies they cite are the ones that
              pass a set of implicit trust signals.
            </p>
          </div>
          <div className="space-y-4">
            {[
              {
                signal: "Entity consistency",
                desc: "Your company description is consistent across LinkedIn, website, directories, and third-party mentions. AI cross-references these. Inconsistency creates uncertainty.",
              },
              {
                signal: "Content extractability",
                desc: "Your content directly answers the question being asked, in plain text that AI can parse. JavaScript-rendered content, PDFs, and gated content are invisible to most AI crawlers.",
              },
              {
                signal: "Independent validation",
                desc: "Third-party sources (directories, review sites, press, industry publications) mention your company independently. AI looks for consensus before recommending.",
              },
              {
                signal: "Structured data",
                desc: "Schema markup (Organisation, FAQ, Article) gives AI explicit signals about what your company does, who works there, and what expertise you claim.",
              },
              {
                signal: "Recency and authority",
                desc: "Recently published, regularly updated content from an entity with demonstrated expertise in the category. Stale content signals abandonment.",
              },
            ].map((s) => (
              <div key={s.signal} className="bg-cream border border-light-border rounded-xl p-6">
                <h3 className="font-heading text-lg font-bold text-text-dark mb-2">{s.signal}</h3>
                <p className="text-text-body text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Link href="/resources/ai-citation-signals" className="text-orange font-semibold hover:underline">
              The 7 AI citation signals in detail &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* How do you measure it */}
      <section className="bg-navy py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">THE MEASUREMENT</p>
          <h2 className="font-heading text-3xl font-bold text-white mb-8">
            How do you measure AI visibility?
          </h2>
          <div className="space-y-4 text-white/60 leading-relaxed mb-8">
            <p>
              AI visibility is scored from 0 to 100 across four dimensions, each
              worth 25 points. We built a scanner that queries multiple AI platforms
              with category-relevant keywords and measures the response.
            </p>
          </div>
          <div className="space-y-4">
            {[
              { num: "01", title: "Citation Presence (0-25)", desc: "Does AI mention your company by name when someone searches for your service? Either you appear or you do not." },
              { num: "02", title: "Entity Recognition (0-25)", desc: "Does AI correctly identify what your company does, who you serve, and what makes you different? Inconsistent descriptions confuse AI models." },
              { num: "03", title: "Content Structure (0-25)", desc: "Can AI extract clear answers from your website content? JavaScript-rendered sites, vague hero sections, and missing schema markup make content invisible." },
              { num: "04", title: "Citation Breadth (0-25)", desc: "Are you mentioned across multiple independent sources? AI platforms look for cross-platform consensus before recommending a company." },
            ].map((d) => (
              <div key={d.num} className="flex gap-4">
                <span className="font-mono text-orange text-2xl font-bold flex-shrink-0">{d.num}</span>
                <div>
                  <h3 className="font-heading text-lg font-bold text-white mb-1">{d.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{d.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link href="/resources/ai-visibility-scorecard" className="text-orange font-semibold hover:underline">
              Take the free scorecard &rarr;
            </Link>
            <Link href="/resources/ai-visibility-playbook" className="text-orange font-semibold hover:underline">
              Full framework breakdown &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* What does the research show */}
      <section className="bg-white py-16 md:py-20 border-b border-light-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">THE DATA</p>
          <h2 className="font-heading text-3xl font-bold text-text-dark mb-6">
            What does the benchmark research show?
          </h2>
          <div className="space-y-4 text-text-body leading-relaxed mb-8">
            <p>
              We publish sector-specific AI visibility benchmarks using The Signal
              Source Method — a 6-step research framework for producing original
              data that AI platforms cite. Each study scans 50-150 companies across
              multiple AI platforms and scores them on all 4 dimensions.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {[
              {
                title: "Enterprise Benchmark — April 2026 (N=150)",
                findings: "81% of companies scored below 40. Average score: 28.7/100. Bottom 10 performers were all IT Services companies. The gap between top and bottom performers was 78 points.",
                href: "/research/ai-visibility-benchmark-april-2026",
              },
              {
                title: "Enterprise Benchmark — March 2026 (N=50)",
                findings: "44% of companies scored 2/25 on citation presence. The first study that established the baseline for enterprise AI visibility.",
                href: "/research/ai-visibility-benchmark-2026",
              },
              {
                title: "UK Law Firms (N=50)",
                findings: "52% of law firms were invisible to AI. Specialist firms consistently outperformed top-100 revenue firms. Size did not correlate with AI visibility.",
                href: "/research/ai-visibility-uk-law-firms-2026",
              },
            ].map((study) => (
              <Link
                key={study.title}
                href={study.href}
                className="group block bg-cream border border-light-border rounded-xl p-6 hover:shadow hover:border-orange/30 transition-all"
              >
                <h3 className="font-heading text-lg font-bold text-text-dark group-hover:text-orange transition-colors mb-2">
                  {study.title}
                </h3>
                <p className="text-text-body text-sm leading-relaxed">{study.findings}</p>
                <span className="text-orange text-sm font-semibold mt-2 inline-block">Read the full study &rarr;</span>
              </Link>
            ))}
          </div>

          <div className="bg-navy rounded-xl p-6 text-center">
            <p className="text-white font-semibold mb-2">50+ citable statistics from our research</p>
            <p className="text-white/60 text-sm mb-4">Original data from GTM Signal Studio benchmark studies plus curated external sources.</p>
            <Link href="/research/stats" className="text-orange font-semibold hover:underline">
              Browse all stats &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* How do you improve it */}
      <section className="bg-cream py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">THE PLAYBOOK</p>
          <h2 className="font-heading text-3xl font-bold text-text-dark mb-6">
            How do you improve AI visibility?
          </h2>
          <div className="space-y-4 text-text-body leading-relaxed mb-8">
            <p>
              AI visibility improvement follows a clear priority order. Start with
              the foundations (entity consistency, structured data), then build
              content infrastructure, then earn independent citations. Most companies
              try to skip to step 3 — it does not work without the first two.
            </p>
          </div>
          <div className="space-y-6">
            {[
              {
                phase: "Week 1-2: Foundations",
                items: [
                  "Align company description across LinkedIn, website, Google Business Profile, and all directories",
                  "Add Organisation, FAQ, and Article schema markup to key pages",
                  "Ensure website is server-side rendered (check View Source — if content is missing, AI cannot see it)",
                ],
              },
              {
                phase: "Week 3-4: Content structure",
                items: [
                  "Restructure service pages so the first paragraph directly answers what you do and who you serve",
                  "Create FAQ sections on top pages with questions buyers actually ask AI",
                  "Publish content that directly answers category queries (not thought leadership — direct answers)",
                ],
              },
              {
                phase: "Month 2-3: Citation building",
                items: [
                  "Get listed in 5+ relevant directories (Clutch, G2, industry associations)",
                  "Publish on independent platforms (guest posts, industry publications, research)",
                  "Earn press mentions through original data and research (this is where benchmarks compound)",
                ],
              },
              {
                phase: "Ongoing: Monitor and iterate",
                items: [
                  "Re-scan quarterly — AI visibility changes as models update and competitors adapt",
                  "Track which queries cite you and which do not — fill the gaps",
                  "Publish original research regularly — AI platforms prefer citing data sources",
                ],
              },
            ].map((phase) => (
              <div key={phase.phase}>
                <h3 className="font-heading text-lg font-bold text-text-dark mb-3">
                  <span className="text-orange">{phase.phase}</span>
                </h3>
                <ul className="space-y-2 text-text-body text-sm">
                  {phase.items.map((item, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-orange flex-shrink-0">&rarr;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/resources/ai-visibility-playbook" className="text-orange font-semibold hover:underline">
              Get the full prioritised fix list &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* What is the connection to enterprise marketing */}
      <section className="bg-white py-16 md:py-20 border-b border-light-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">THE CONNECTION</p>
          <h2 className="font-heading text-3xl font-bold text-text-dark mb-6">
            How does AI visibility connect to enterprise marketing?
          </h2>
          <div className="space-y-4 text-text-body leading-relaxed">
            <p>
              AI visibility is not a separate discipline from marketing. It is the
              next evolution of how{" "}
              <Link href="/topics/enterprise-marketing" className="text-orange hover:underline">enterprise marketing</Link>{" "}
              teams ensure their company is discoverable. The same teams that built
              SEO programmes, demand gen engines, and brand awareness campaigns now
              need to add AI visibility to the stack.
            </p>
            <p>
              The difference is that AI visibility is not about ranking — it is about
              being recommended. It rewards clarity, consistency, and independent
              validation over link building and keyword density. The enterprise
              marketing teams that understand this shift first will have a compounding
              advantage.
            </p>
          </div>
        </div>
      </section>

      {/* Articles */}
      {posts.length > 0 && (
        <section className="bg-cream py-16 md:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="font-mono text-orange text-sm mb-2 tracking-wider">
              {posts.length} ARTICLES
            </p>
            <h2 className="font-heading text-3xl font-bold text-text-dark mb-8">
              AI visibility articles
            </h2>
            <div className="space-y-4">
              {posts.map((post, idx) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group flex items-start gap-5 bg-white border border-light-border rounded-xl p-6 hover:shadow hover:border-orange/30 transition-all"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-cream border border-light-border flex items-center justify-center">
                    <span className="font-mono text-sm text-text-muted font-bold">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading font-bold text-text-dark group-hover:text-orange transition-colors leading-tight mb-1">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-text-muted text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>
                    )}
                    {post.reading_time && post.reading_time > 0 && (
                      <span className="text-text-muted/60 text-xs mt-2 inline-block">{post.reading_time} min read</span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Authority Links */}
      <section className="bg-white py-16 md:py-20 border-b border-light-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-xs mb-6 tracking-wider">FURTHER READING</p>
          <h2 className="font-heading text-xl font-bold text-text-dark mb-6">
            Authority sources we reference
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: "Google: How AI Overviews Work", url: "https://blog.google/products/search/generative-ai-google-search-may-2024/", source: "Google" },
              { title: "Rand Fishkin: Zero-Click Search Study", url: "https://sparktoro.com/blog/in-2024-we-tested-4-5m-google-search-results-heres-what-we-found/", source: "SparkToro" },
              { title: "Perplexity: How Citations Work", url: "https://blog.perplexity.ai/", source: "Perplexity" },
              { title: "Gartner: Search Volume Drop 25% by 2026", url: "https://www.gartner.com/en/newsroom/press-releases/2024-02-19-gartner-predicts-search-engine-volume-will-drop-25-percent-by-2026", source: "Gartner" },
            ].map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 bg-cream border border-light-border rounded-xl p-5 hover:shadow hover:border-orange/30 transition-all"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading font-bold text-sm text-text-dark group-hover:text-orange transition-colors leading-tight mb-1">
                    {link.title}
                  </h3>
                  <span className="text-text-muted text-xs font-mono">{link.source}</span>
                </div>
                <span className="text-text-muted group-hover:text-orange transition-colors flex-shrink-0">↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">GET YOUR SCORE</p>
          <h2 className="font-heading text-3xl font-bold text-white mb-4">
            Want the exact number?
          </h2>
          <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">
            The AI Visibility Audit scores your company across all 4 dimensions,
            checks 3 AI platforms, and delivers a prioritised fix plan within 48
            hours.
          </p>
          <Link
            href="/ai-visibility-audit"
            className="inline-block bg-orange hover:bg-orange-hover text-white font-semibold px-8 py-4 rounded-lg transition-colors text-lg"
          >
            Get Your AI Visibility Audit
          </Link>
        </div>
      </section>
    </>
  );
}
