import Link from "next/link";
import Image from "next/image";
import { getPublishedPosts } from "@/lib/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GTM Signal Studio | Enterprise Marketing Insights & Signal-Led GTM",
  description:
    "Enterprise marketing insights on AI visibility, MarTech, and signal-led GTM. Research-backed strategies for B2B companies.",
  keywords: ["GTM Signal Studio", "signal-led go-to-market", "B2B GTM strategy", "buying signals", "go-to-market audit", "B2B pipeline", "cold email infrastructure"],
};

export default async function Home() {
  const posts = await getPublishedPosts(3, 0);

  return (
    <>
      {/* 1. Header */}
      <section className="bg-navy relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <p className="font-mono text-orange text-sm mb-4 tracking-wider">
              GTM SIGNAL STUDIO
            </p>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
              We help B2B companies get{" "}
              <span className="text-orange">found by AI.</span>
            </h1>
            <p className="text-white/60 text-lg md:text-xl leading-relaxed mb-4 max-w-2xl">
              94% of B2B buyers now use AI to research vendors. Google AI Mode,
              Perplexity, ChatGPT. If AI does not recommend your company, buyers
              never reach your website.
            </p>
            <p className="text-white/60 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl">
              We detect the signal, diagnose the gap, and build the fix.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/audit"
                className="bg-orange hover:bg-orange-hover text-white px-6 py-3 rounded-lg font-semibold text-center transition-colors"
              >
                Get Your Free GTM Audit
              </Link>
              <Link
                href="/resources/ai-visibility-scorecard"
                className="border border-white/20 hover:border-white/40 text-white px-6 py-3 rounded-lg font-semibold text-center transition-colors"
              >
                Check Your AI Visibility
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Negative Stakes */}
      <section className="bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">
            THE PROBLEM
          </p>
          <h2 className="font-heading text-3xl font-bold text-text-dark mb-10">
            What happens when AI cannot find you.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                pain: "Your pipeline dries up and you don't know why",
                detail:
                  "Organic traffic drops. Referrals slow down. You blame the algorithm, but the real cause is that buyers are asking AI for recommendations and your company is not in the answer.",
              },
              {
                pain: "Your competitors get recommended instead of you",
                detail:
                  "A smaller firm with a weaker website can appear in AI results alongside the Big Four. Meanwhile, your better service, stronger team, and deeper expertise stay invisible.",
              },
              {
                pain: "Every marketing investment underperforms",
                detail:
                  "You spend on SEO, content, and outreach. But if AI does not recognise your company as a citable entity in your category, none of it compounds. You are building on sand.",
              },
            ].map((item) => (
              <div
                key={item.pain}
                className="bg-white border border-light-border rounded-xl p-6"
              >
                <h3 className="font-heading font-bold text-text-dark mb-3">
                  {item.pain}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Value Proposition */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">
            WHAT WE DO
          </p>
          <h2 className="font-heading text-3xl font-bold text-text-dark mb-10">
            Three things that change your visibility.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "◎",
                title: "Detect the Signal",
                description:
                  "We scan whether AI platforms cite your company when buyers search your category. Four dimensions scored. You see exactly where you stand.",
              },
              {
                icon: "◈",
                title: "Diagnose the Gap",
                description:
                  "We audit your GTM infrastructure across 6 dimensions. Messaging, positioning, content, channels, signals, and AI presence. Scored out of 100.",
              },
              {
                icon: "◧",
                title: "Build the Fix",
                description:
                  "We implement the changes that make AI recommend you. Named frameworks, structured content, entity recognition, citation breadth. Not theory. Infrastructure.",
              },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <span className="text-orange text-4xl font-mono block mb-4">
                  {item.icon}
                </span>
                <h3 className="font-heading text-lg font-bold text-text-dark mb-2">
                  {item.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Guide (Authority + Empathy) */}
      <section className="bg-navy">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-mono text-orange text-sm mb-2 tracking-wider">
              WHY US
            </p>
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              We know what it is like to be the only person in a company
              responsible for bringing in new business. To watch pipeline
              depend on referrals and hope. To invest in tools that promise
              growth and deliver dashboards.
            </p>
            <p className="text-white/70 text-lg leading-relaxed mb-10">
              GTM Signal Studio was built from that experience. Not from a
              textbook. From 900+ real outreach emails, 8 live audits, and
              the systems we built to make it all work.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { stat: "8", label: "GTM audits delivered" },
                { stat: "900+", label: "Outreach emails sent" },
                { stat: "39/100", label: "Average audit score" },
                { stat: "3/10", label: "Firms cited by AI" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-navy-light border border-navy-border rounded-xl p-4"
                >
                  <p className="font-heading text-2xl font-bold text-orange mb-1">
                    {item.stat}
                  </p>
                  <p className="text-muted text-xs leading-relaxed">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Plan (3 steps) */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">
            HOW IT WORKS
          </p>
          <h2 className="font-heading text-3xl font-bold text-text-dark mb-10">
            Three steps. No commitment required.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                number: "01",
                title: "Get your free audit",
                description:
                  "Send us your website. We score your go-to-market across 6 dimensions and deliver a branded PDF report within 48 hours. Free. No call needed.",
              },
              {
                number: "02",
                title: "See your signal",
                description:
                  "We check whether AI platforms recommend your company for your category keyword. You get a clear picture of where you are visible and where you are not.",
              },
              {
                number: "03",
                title: "Fix the gaps",
                description:
                  "Work with us to implement the changes. Positioning, content structure, entity recognition. Or take the report and fix it yourself. Either way, you know exactly what to do.",
              },
            ].map((step) => (
              <div key={step.number} className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange flex items-center justify-center">
                  <span className="font-mono font-bold text-white text-sm">
                    {step.number}
                  </span>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-text-dark mb-1">
                    {step.title}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Explanatory Paragraph (BrandScript) */}
      <section className="bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl mx-auto">
            <p className="font-mono text-orange text-sm mb-2 tracking-wider">
              THE SHIFT
            </p>
            <h2 className="font-heading text-3xl font-bold text-text-dark mb-6">
              The game changed. Most companies haven&apos;t noticed.
            </h2>
            <div className="space-y-4 text-text-body text-base leading-relaxed">
              <p>
                You built a great business. You know your clients. You deliver
                real results. But when a buyer asks AI &ldquo;who are the best
                firms for what you do,&rdquo; your name does not appear.
              </p>
              <p>
                Instead, AI recommends a competitor. Maybe a smaller firm. Maybe
                one with a weaker team. But they have something you do not: AI
                can find them, understand them, and cite them by name.
              </p>
              <p>
                This is not about SEO. Google rankings and AI recommendations
                run on completely different signals. You can rank on page one
                and still be invisible to AI. We have seen it in every audit
                we have delivered.
              </p>
              <p>
                The companies winning right now are not the biggest or the best
                funded. They are the ones that AI treats as a citable,
                referenceable entity in their category. That is a structural
                advantage, and it compounds every month.
              </p>
              <p className="font-semibold text-text-dark">
                We help you build that advantage. Starting with a free audit
                that shows you exactly where you stand.
              </p>
            </div>
            <div className="mt-8">
              <Link
                href="/audit"
                className="inline-block bg-orange hover:bg-orange-hover text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Get Your Free GTM Audit
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Lead Generator (Scorecard) */}
      <section className="bg-navy">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <p className="font-mono text-orange text-sm mb-2 tracking-wider">
              FREE TOOL
            </p>
            <h2 className="font-heading text-3xl font-bold text-white mb-4">
              Can AI find your business?
            </h2>
            <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">
              Check your AI Visibility Signal in 5 minutes. Four dimensions.
              Self-assessment. Instant score. No email required to start.
            </p>
            <Link
              href="/resources/ai-visibility-scorecard"
              className="inline-block bg-orange hover:bg-orange-hover text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Take the Scorecard
            </Link>
          </div>
        </div>
      </section>

      {/* Latest from the Blog */}
      {posts.length > 0 && (
        <section className="bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <p className="font-mono text-orange text-sm mb-2 tracking-wider">
              FROM THE BLOG
            </p>
            <h2 className="font-heading text-3xl font-bold text-text-dark mb-10">
              Frameworks built from real campaigns.
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
                    {post.category || "Signal-Led GTM"}
                  </p>
                  <h3 className="font-heading font-bold text-text-dark mb-2 group-hover:text-orange transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed line-clamp-3">
                    {post.excerpt || post.meta_description}
                  </p>
                  {post.reading_time && (
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
                View all posts →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">
            THE GTM SIGNAL
          </p>
          <h2 className="font-heading text-2xl font-bold text-text-dark mb-4">
            Weekly signal detection. Real data. No fluff.
          </h2>
          <p className="text-text-muted mb-6 max-w-lg mx-auto">
            Every Tuesday. One signal that separates companies getting found
            from companies getting forgotten.
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
