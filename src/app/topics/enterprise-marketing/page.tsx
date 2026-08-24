import Link from "next/link";
import type { Metadata } from "next";
import { getPostsByCategory } from "@/lib/queries";
import type { Post } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Enterprise Marketing — Frameworks, Systems, and Strategy | GTM Signal Studio",
  description:
    "Enterprise marketing strategy from a practitioner. Frameworks for pipeline, automation, MarTech, GTM alignment, and proving ROI at scale. Every article maps to this pillar.",
  keywords: [
    "enterprise marketing",
    "enterprise marketing strategy",
    "B2B marketing frameworks",
    "marketing automation",
    "GTM strategy",
    "enterprise pipeline",
    "marketing ROI",
    "MarTech stack",
  ],
  openGraph: {
    title: "Enterprise Marketing — GTM Signal Studio",
    description:
      "Frameworks, systems, and strategies from the enterprise marketing frontline.",
    type: "website",
    url: "https://gtmsignalstudio.com/topics/enterprise-marketing",
  },
  alternates: {
    canonical: "https://gtmsignalstudio.com/topics/enterprise-marketing",
  },
};

export const revalidate = 3600;

export default async function EnterpriseMarketingPillar() {
  let posts: Partial<Post>[] = [];
  try {
    posts = await getPostsByCategory("Enterprise Marketing", 50);
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
            name: "Enterprise Marketing",
            description:
              "Frameworks, systems, and strategies from the enterprise marketing frontline.",
            url: "https://gtmsignalstudio.com/topics/enterprise-marketing",
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
                name: "What is enterprise marketing?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Enterprise marketing is the practice of marketing products or services to large organisations with complex buying committees, long sales cycles, and multi-stakeholder decision processes. It requires different frameworks, tools, and measurement than SMB or mid-market marketing.",
                },
              },
              {
                "@type": "Question",
                name: "How does enterprise marketing differ from SMB marketing?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Enterprise marketing deals with 6-12 month sales cycles, buying committees of 6-10 people, and average deal sizes above £50K. SMB marketing focuses on individual decision-makers, shorter cycles, and volume-based pipeline. Enterprise requires account-based approaches, multi-touch attribution, and alignment with sales teams.",
                },
              },
              {
                "@type": "Question",
                name: "What frameworks do enterprise marketers use?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Common enterprise marketing frameworks include Account-Based Marketing (ABM), BANT and MEDDIC for lead qualification, the Demand Waterfall for pipeline stages, and jobs-to-be-done for messaging. The most effective teams build proprietary frameworks around their specific ICP and buying signals.",
                },
              },
              {
                "@type": "Question",
                name: "How do enterprise marketers prove ROI?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Enterprise marketing ROI is measured through pipeline contribution (marketing-sourced and marketing-influenced revenue), cost per qualified opportunity, deal velocity impact, and multi-touch attribution. The shift is from vanity metrics like MQLs to revenue metrics like pipeline generated and closed-won influenced.",
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
            <span className="text-white">Enterprise Marketing</span>
          </nav>

          <p className="font-mono text-orange text-sm mb-4 tracking-wider">
            PILLAR TOPIC
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Enterprise Marketing
          </h1>
          <p className="text-white/60 text-lg md:text-xl leading-relaxed">
            Frameworks, systems, and strategies from the enterprise marketing
            frontline. How B2B marketing leaders build pipeline, align with sales,
            and prove ROI at scale. Every article on this page comes from practitioner
            experience, not theory.
          </p>
        </div>
      </section>

      {/* What is Enterprise Marketing */}
      <section className="bg-white py-16 md:py-20 border-b border-light-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">THE DEFINITION</p>
          <h2 className="font-heading text-3xl font-bold text-text-dark mb-6">
            What is enterprise marketing?
          </h2>
          <div className="space-y-4 text-text-body leading-relaxed">
            <p>
              Enterprise marketing is the practice of marketing products or services
              to large organisations with complex buying structures. The buyers are
              committees, not individuals. The sales cycles are months, not days. And
              the strategies that work for small businesses will actively harm you at
              enterprise scale.
            </p>
            <p>
              Where SMB marketing optimises for volume and speed, enterprise marketing
              optimises for precision and depth. One well-researched account can be
              worth more than a thousand cold leads. The infrastructure behind enterprise
              marketing reflects this: account-based strategies, multi-touch attribution,
              sales alignment, and content that speaks to multiple stakeholders with
              different priorities.
            </p>
            <p>
              This is the discipline we write about. Not from a consulting lens, but
              from inside the machine. Building the campaigns, debugging the MarTech,
              proving the pipeline numbers that boards care about.
            </p>
          </div>
        </div>
      </section>

      {/* How does it differ */}
      <section className="bg-cream py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">THE DISTINCTION</p>
          <h2 className="font-heading text-3xl font-bold text-text-dark mb-8">
            How does enterprise marketing differ from SMB marketing?
          </h2>
          <div className="space-y-4 text-text-body leading-relaxed mb-8">
            <p>
              The differences are structural, not cosmetic. Enterprise marketing and
              SMB marketing look similar from the outside — both use email, content,
              events, and paid media. But the operating model underneath is fundamentally
              different.
            </p>
          </div>
          <div className="bg-white border border-light-border rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-navy text-white">
                <tr>
                  <th className="text-left p-4 font-semibold">Dimension</th>
                  <th className="text-left p-4 font-semibold">SMB Marketing</th>
                  <th className="text-left p-4 font-semibold">Enterprise Marketing</th>
                </tr>
              </thead>
              <tbody className="text-text-body">
                {[
                  { dim: "Sales cycle", smb: "1-30 days", ent: "6-12 months" },
                  { dim: "Decision makers", smb: "1-2 people", ent: "6-10 person committee" },
                  { dim: "Deal size", smb: "Under £5K", ent: "£50K-£500K+" },
                  { dim: "Lead strategy", smb: "Volume-based", ent: "Account-based" },
                  { dim: "Content role", smb: "Generate leads", ent: "Enable buying committee" },
                  { dim: "Attribution", smb: "Last-click", ent: "Multi-touch, influenced" },
                  { dim: "Sales alignment", smb: "Handoff", ent: "Continuous partnership" },
                ].map((row) => (
                  <tr key={row.dim} className="border-t border-light-border">
                    <td className="p-4 font-semibold text-text-dark">{row.dim}</td>
                    <td className="p-4">{row.smb}</td>
                    <td className="p-4 text-orange font-medium">{row.ent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* What frameworks */}
      <section className="bg-white py-16 md:py-20 border-b border-light-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">THE FRAMEWORKS</p>
          <h2 className="font-heading text-3xl font-bold text-text-dark mb-6">
            What frameworks do enterprise marketing leaders use?
          </h2>
          <div className="space-y-4 text-text-body leading-relaxed mb-8">
            <p>
              Enterprise marketing runs on frameworks because the complexity demands
              them. When you are coordinating across sales, product, customer success,
              and leadership, you need shared language and shared measurement.
            </p>
          </div>
          <div className="space-y-4">
            {[
              {
                name: "Account-Based Marketing (ABM)",
                desc: "Treat accounts as markets. Identify target companies, map the buying committee, create personalised campaigns per account tier. Works when deal sizes justify the investment.",
              },
              {
                name: "The Signal Stack",
                desc: "GTM Signal Studio's framework for identifying and acting on buying signals. Maps the signals that indicate an account is in-market, scores them by strength, and routes them to the right channel.",
              },
              {
                name: "Demand Waterfall",
                desc: "Pipeline stage model from SiriusDecisions. Tracks how inquiries become MQLs, SALs, SQLs, and opportunities. Useful for diagnosing where pipeline leaks occur.",
              },
              {
                name: "Jobs-to-Be-Done (JTBD)",
                desc: "Messaging framework. Instead of leading with features, lead with the job the buyer is trying to complete. Forces marketing to speak the buyer's language, not the product team's.",
              },
              {
                name: "MEDDIC / BANT Qualification",
                desc: "Lead qualification frameworks. MEDDIC (Metrics, Economic Buyer, Decision Criteria, Decision Process, Identify Pain, Champion) is enterprise-grade. BANT (Budget, Authority, Need, Timeline) is simpler but still useful.",
              },
            ].map((f) => (
              <div key={f.name} className="bg-cream border border-light-border rounded-xl p-6">
                <h3 className="font-heading text-lg font-bold text-text-dark mb-2">{f.name}</h3>
                <p className="text-text-body text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How do you build a marketing engine */}
      <section className="bg-navy py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">THE SYSTEM</p>
          <h2 className="font-heading text-3xl font-bold text-white mb-8">
            How do you build a marketing engine that scales?
          </h2>
          <div className="space-y-4 text-white/60 leading-relaxed mb-8">
            <p>
              Scaling enterprise marketing is not about doing more. It is about building
              infrastructure that compounds. The teams that scale are the ones that
              invest in systems before they invest in headcount.
            </p>
          </div>
          <div className="space-y-6">
            {[
              {
                num: "01",
                title: "Get the data architecture right first",
                text: "CRM hygiene, attribution tracking, event taxonomy. Every decision downstream depends on clean data upstream. Most enterprise marketing teams skip this and spend months debugging reports later.",
              },
              {
                num: "02",
                title: "Build repeatable campaign infrastructure",
                text: "Templates, workflows, and automation that let a team of 3 execute like a team of 10. Email nurture sequences, landing page frameworks, reporting dashboards — built once, deployed many times.",
              },
              {
                num: "03",
                title: "Align with sales on shared definitions",
                text: "What is an MQL? When does marketing hand off to sales? What counts as marketing-influenced? These definitions must be agreed, documented, and reviewed quarterly. Misalignment here causes more damage than any campaign mistake.",
              },
              {
                num: "04",
                title: "Instrument everything",
                text: "UTM conventions, conversion tracking, pipeline stage timestamps. If you cannot measure the full journey from first touch to closed-won, you are guessing. Enterprise leadership does not fund guesses.",
              },
              {
                num: "05",
                title: "Create content for the buying committee",
                text: "Different stakeholders need different content. The CFO needs ROI projections. The technical lead needs architecture details. The end user needs workflow examples. One piece of content cannot serve all three.",
              },
            ].map((step) => (
              <div key={step.num} className="flex gap-4">
                <span className="font-mono text-orange text-2xl font-bold flex-shrink-0">{step.num}</span>
                <div>
                  <h3 className="font-heading text-lg font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern MarTech stack */}
      <section className="bg-white py-16 md:py-20 border-b border-light-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">THE STACK</p>
          <h2 className="font-heading text-3xl font-bold text-text-dark mb-6">
            What does a modern enterprise marketing tech stack look like?
          </h2>
          <div className="space-y-4 text-text-body leading-relaxed mb-8">
            <p>
              The average enterprise marketing team uses 91 tools. Most of them create
              more complexity than value. The stack that works is the one where every
              tool earns its place through measurable pipeline contribution.
            </p>
            <p>
              The core layers: CRM (Salesforce, HubSpot Enterprise), marketing automation
              (Marketo, Pardot, HubSpot), analytics (GA4, Mixpanel, BI layer), content
              management (CMS with API access), and ABM tooling (6sense, Demandbase, or
              signal-based alternatives).
            </p>
            <p>
              The emerging layer: AI. Specifically, AI for content intelligence,
              predictive lead scoring, and — increasingly — ensuring your company is
              visible when AI platforms recommend solutions in your category. This is
              where <Link href="/topics/ai-visibility" className="text-orange hover:underline">AI visibility</Link> intersects
              with enterprise marketing infrastructure.
            </p>
          </div>
        </div>
      </section>

      {/* How to prove ROI */}
      <section className="bg-cream py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">THE METRICS</p>
          <h2 className="font-heading text-3xl font-bold text-text-dark mb-6">
            How do enterprise marketers prove ROI?
          </h2>
          <div className="space-y-4 text-text-body leading-relaxed mb-8">
            <p>
              The MQL is not dead, but it is no longer sufficient. Enterprise marketing
              teams that win budget prove pipeline contribution: marketing-sourced
              revenue (leads that originated from marketing), marketing-influenced revenue
              (deals where marketing touched the account), and deal velocity impact
              (whether marketing engagement accelerated time-to-close).
            </p>
            <p>
              Multi-touch attribution is the standard, but it is imperfect. The best
              teams combine attribution data with qualitative feedback from sales (where
              did the buyer first hear about us?) and direct buyer surveys at close.
            </p>
            <p>
              The shift is from activity metrics to outcome metrics. Not "we sent 10,000
              emails" but "marketing-sourced pipeline generated £2.1M this quarter,
              representing 38% of total pipeline." That is the language that boards
              understand.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { metric: "Pipeline Sourced", desc: "Revenue from marketing-originated leads" },
              { metric: "Pipeline Influenced", desc: "Deals where marketing touched the account" },
              { metric: "CAC Payback", desc: "Months to recover customer acquisition cost" },
              { metric: "Deal Velocity", desc: "Time from first touch to closed-won" },
            ].map((m) => (
              <div key={m.metric} className="bg-white border border-light-border rounded-xl p-4 text-center">
                <p className="text-orange font-heading font-bold text-sm mb-1">{m.metric}</p>
                <p className="text-text-muted text-xs">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Articles */}
      {posts.length > 0 && (
        <section className="bg-white py-16 md:py-20 border-b border-light-border">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="font-mono text-orange text-sm mb-2 tracking-wider">
              {posts.length} ARTICLES
            </p>
            <h2 className="font-heading text-3xl font-bold text-text-dark mb-8">
              Enterprise marketing articles
            </h2>
            <div className="space-y-4">
              {posts.map((post, idx) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group flex items-start gap-5 bg-cream border border-light-border rounded-xl p-6 hover:shadow hover:border-orange/30 transition-all"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white border border-light-border flex items-center justify-center">
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
      <section className="bg-cream py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-xs mb-6 tracking-wider">FURTHER READING</p>
          <h2 className="font-heading text-xl font-bold text-text-dark mb-6">
            Authority sources we reference
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: "Gartner: Magic Quadrant for B2B Marketing Automation", url: "https://www.gartner.com/reviews/market/b2b-marketing-automation-platforms", source: "Gartner" },
              { title: "Forrester: B2B Marketing & Sales Research", url: "https://www.forrester.com/research/b2b-marketing/", source: "Forrester" },
              { title: "HBR: Marketing Strategy", url: "https://hbr.org/topic/subject/marketing-strategy", source: "Harvard Business Review" },
              { title: "McKinsey: B2B Marketing Insights", url: "https://www.mckinsey.com/capabilities/growth-marketing-and-sales/our-insights", source: "McKinsey" },
            ].map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 bg-white border border-light-border rounded-xl p-5 hover:shadow hover:border-orange/30 transition-all"
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
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">GET STARTED</p>
          <h2 className="font-heading text-3xl font-bold text-white mb-4">
            How visible is your marketing to AI?
          </h2>
          <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">
            Enterprise marketing teams invest in pipeline, automation, and content.
            But is any of it visible to the AI platforms that buyers use? Find out
            with an AI Visibility Audit.
          </p>
          <Link
            href="/research/stats"
            className="inline-block bg-orange hover:bg-orange-hover text-white font-semibold px-8 py-4 rounded-lg transition-colors text-lg"
          >
            Browse the data
          </Link>
        </div>
      </section>
    </>
  );
}
