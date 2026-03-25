import Link from "next/link";
import Image from "next/image";
import { getPublishedPosts } from "@/lib/queries";
import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "GTM Signal Studio | AI Visibility & Enterprise Marketing Insights",
  description:
    "Enterprise marketing insights on AI visibility, MarTech, and signal-led GTM. Original research, frameworks, and tools. Built by a practitioner, not a consultant.",
  keywords: [
    "AI visibility",
    "enterprise marketing",
    "signal-led GTM",
    "B2B marketing insights",
    "MarTech",
    "GTM Signal Studio",
  ],
};

export default async function Home() {
  const posts = await getPublishedPosts(3, 0);

  return (
    <>
      <PageHeader
        tagline="GTM SIGNAL STUDIO"
        title="Is AI recommending your company to buyers?"
        subtitle="48% of B2B searches now trigger AI-generated answers. Google AI Mode, ChatGPT, and Perplexity are building shortlists before buyers visit your website. Most enterprise companies are not on them."
        stats={[
          { stat: "48%", label: "of B2B searches trigger AI answers" },
          { stat: "94%", label: "of buyers use AI during research" },
          { stat: "75%", label: "of enterprise teams have adopted AI" },
          { stat: "7/10", label: "enterprise companies invisible to AI" },
        ]}
      />

      {/* The Shift */}
      <section className="section-light py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">
            THE SHIFT
          </p>
          <h2 className="font-heading text-3xl font-bold text-text-dark mb-6">
            The way buyers find companies has changed.
          </h2>
          <div className="space-y-4 text-text-body leading-relaxed">
            <p>
              Enterprise marketing teams are investing more in AI than ever
              before. 86% are increasing budgets this year. Marketing departments
              saw the biggest spend jump at 64%, ahead of every other department.
            </p>
            <p>
              But there is a side of this shift that most teams have not examined
              yet. While AI is being adopted internally to make teams faster, it
              is also changing how buyers find companies externally. AI platforms
              do not return ten blue links. They return answers. Recommendations.
              Shortlists.
            </p>
            <p>
              If your company is not in those answers, your competitors are
              getting the recommendation instead.
            </p>
          </div>
        </div>
      </section>

      {/* The Framework */}
      <section className="section-white py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">
            THE FRAMEWORK
          </p>
          <h2 className="font-heading text-3xl font-bold text-text-dark mb-4">
            AI visibility is measurable. And fixable.
          </h2>
          <p className="text-text-body mb-8">
            AI platforms decide who to recommend based on four signal categories.
            Each one is scored 0-25 for a total of 0-100.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                num: "01",
                title: "Citation Presence",
                desc: "Does AI mention your company by name when buyers search your category?",
              },
              {
                num: "02",
                title: "Entity Recognition",
                desc: "Does AI correctly understand what you do and who you serve?",
              },
              {
                num: "03",
                title: "Content Structure",
                desc: "Can AI extract clear answers from your website content?",
              },
              {
                num: "04",
                title: "Citation Breadth",
                desc: "Are you mentioned across multiple independent sources?",
              },
            ].map((d) => (
              <div
                key={d.num}
                className="flex gap-4 p-5 bg-cream border border-light-border rounded-xl"
              >
                <span className="font-mono text-orange text-xl font-bold flex-shrink-0">
                  {d.num}
                </span>
                <div>
                  <h3 className="font-heading font-bold text-text-dark mb-1">
                    {d.title}
                  </h3>
                  <p className="text-text-body text-sm">{d.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Link
              href="/ai-visibility"
              className="text-orange font-semibold hover:underline"
            >
              Explore the full AI visibility framework &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Research */}
      <section className="section-dark py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">
            THE DATA
          </p>
          <h2 className="font-heading text-3xl font-bold text-white mb-6">
            Original research. Citable stats.
          </h2>
          <p className="text-muted leading-relaxed mb-8">
            We run original research on AI visibility and enterprise marketing so
            you can cite the source, not the summary. Every stat links to its
            methodology.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {[
              { stat: "7/10", label: "enterprise companies invisible to AI search" },
              { stat: "15-25", label: "average enterprise AI visibility score" },
              { stat: "86%", label: "of teams increasing AI budgets" },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-navy-light border border-navy-border rounded-xl p-4 text-center"
              >
                <p className="text-orange font-heading text-2xl font-bold">
                  {s.stat}
                </p>
                <p className="text-muted text-xs mt-1">{s.label}</p>
              </div>
            ))}
          </div>
          <Link
            href="/research"
            className="text-orange font-semibold hover:underline"
          >
            View all research &rarr;
          </Link>
        </div>
      </section>

      {/* Resources */}
      <section className="section-light py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">
            FREE RESOURCES
          </p>
          <h2 className="font-heading text-3xl font-bold text-text-dark mb-8">
            Check your AI visibility. No cost. No email.
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                title: "AI Visibility Scorecard",
                desc: "Interactive self-assessment. Score your company across 4 dimensions in under 5 minutes.",
                href: "/resources/ai-visibility-scorecard",
                label: "Take the scorecard",
              },
              {
                title: "AI Visibility Playbook",
                desc: "The full framework: dimensions, scoring, and prioritised fix list for enterprise teams.",
                href: "/resources/ai-visibility-playbook",
                label: "Read the playbook",
              },
              {
                title: "7 AI Citation Signals",
                desc: "The specific signals AI platforms use to decide who to recommend. Prioritised by impact.",
                href: "/resources/ai-citation-signals",
                label: "See the signals",
              },
              {
                title: "AI Visibility Audit",
                desc: "Professional audit. 4 dimensions, scored 0-100, prioritised fix plan. PDF in 48 hours. \u00a3297.",
                href: "/ai-visibility-audit",
                label: "Get audited",
              },
            ].map((r) => (
              <Link
                key={r.title}
                href={r.href}
                className="block bg-white border border-light-border rounded-xl p-6 hover:border-orange transition-colors"
              >
                <h3 className="font-heading font-bold text-text-dark mb-2">
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

      {/* Latest from the Blog */}
      {posts.length > 0 && (
        <section className="section-white py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="font-mono text-orange text-sm mb-2 tracking-wider">
              FROM THE BLOG
            </p>
            <h2 className="font-heading text-3xl font-bold text-text-dark mb-10">
              Enterprise marketing insights from real campaigns.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-cream border border-light-border rounded-xl p-6 hover:border-orange/30 hover:shadow-lg transition-all"
                >
                  {post.featured_image && (
                    <div className="aspect-video bg-light-grey rounded-lg overflow-hidden mb-4">
                      <Image
                        src={post.featured_image}
                        alt={post.title}
                        width={600}
                        height={338}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <p className="font-mono text-orange text-xs mb-2">
                    {post.category || "Enterprise Marketing"}
                  </p>
                  <h3 className="font-heading font-bold text-text-dark mb-2 group-hover:text-orange transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed line-clamp-3">
                    {post.excerpt || post.meta_description}
                  </p>
                  {post.reading_time > 0 && (
                    <p className="font-mono text-xs text-muted mt-3">
                      {post.reading_time} min read
                    </p>
                  )}
                </Link>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link
                href="/blog"
                className="text-orange hover:text-orange-hover font-semibold text-sm transition-colors"
              >
                View all posts &rarr;
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="section-dark py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">
            THE GTM SIGNAL
          </p>
          <h2 className="font-heading text-2xl font-bold text-white mb-4">
            Enterprise marketing insights. Weekly.
          </h2>
          <p className="text-muted mb-6 max-w-lg mx-auto">
            Research-backed frameworks on AI visibility, MarTech, and enterprise
            GTM. No fluff. No recycled theory.
          </p>
          <a
            href="https://newsletter.gtmsignalstudio.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-orange hover:bg-orange-hover text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Subscribe to The GTM Signal
          </a>
        </div>
      </section>
    </>
  );
}
