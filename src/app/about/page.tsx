import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "About GTM Signal Studio | Independent Research Studio for AI Visibility",
  description:
    "GTM Signal Studio is an independent research studio producing original data on AI visibility and enterprise marketing. Open-source tools, published research, enterprise insights.",
  keywords: [
    "GTM Signal Studio",
    "AI visibility research",
    "enterprise marketing research",
    "marketing research studio",
    "AI visibility benchmark",
  ],
  openGraph: {
    title: "About GTM Signal Studio",
    description:
      "Independent research studio producing original data on AI visibility and enterprise marketing.",
    type: "website",
    url: "https://gtmsignalstudio.com/about",
  },
  alternates: {
    canonical: "https://gtmsignalstudio.com/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        tagline="ABOUT THE STUDIO"
        title="An independent research studio."
        subtitle="We produce original data on AI visibility and enterprise marketing. We build the tools. We publish the findings. We share everything."
      />

      {/* What We Are - Light */}
      <section className="section-light py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4 text-text-body text-lg leading-relaxed">
            <p>
              GTM Signal Studio is an independent research studio focused on one
              question: does AI recommend your company when buyers search for what
              you sell?
            </p>
            <p>
              Most companies cannot answer that question. Nobody in the organisation
              owns it. The gap between AI-visible and AI-invisible companies has
              nothing to do with budget or team size. It comes down to whether
              someone is paying attention.
            </p>
            <p>
              We exist to measure that gap, publish the data, and build the tools
              that close it.
            </p>
          </div>
        </div>
      </section>

      {/* Three Pillars - White */}
      <section className="section-white py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">
            WHAT WE DO
          </p>
          <h2 className="font-heading text-3xl font-bold text-text-dark mb-8">
            Research. Tools. Content.
          </h2>

          <div className="space-y-6">
            {[
              {
                title: "Original Research",
                text: "We run studies on how companies appear in AI-driven search. Our AI Visibility Benchmark scored 50 companies across 5 sectors. We publish the methodology, the data, and the frameworks so others can apply them.",
                link: "/research",
                linkText: "View our research",
              },
              {
                title: "Open-Source Tools",
                text: "We build the instruments we use for research and publish them for free. AI visibility scanners, MarTech stack auditors, content pipelines, Chrome extensions. All on GitHub.",
                link: "/resources/tools",
                linkText: "See our tools",
              },
              {
                title: "Enterprise Marketing Content",
                text: "Three posts a week on LinkedIn. A blog when there is something worth saying. A newsletter when there is something worth sharing. Everything grounded in our own data.",
                link: "/blog",
                linkText: "Read the blog",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-cream border border-light-border rounded-xl p-6"
              >
                <h3 className="font-heading text-lg font-bold text-text-dark mb-2">
                  {item.title}
                </h3>
                <p className="text-text-body text-sm leading-relaxed mb-3">
                  {item.text}
                </p>
                <Link
                  href={item.link}
                  className="text-orange text-sm font-semibold hover:underline"
                >
                  {item.linkText} &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats - Dark */}
      <section className="section-dark py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">
            BY THE NUMBERS
          </p>
          <h2 className="font-heading text-3xl font-bold text-white mb-8">
            What we have built so far
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { stat: "50", label: "Companies benchmarked" },
              { stat: "40+", label: "AI skills built" },
              { stat: "7", label: "Open-source Python tools" },
              { stat: "3", label: "Chrome extensions" },
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
        </div>
      </section>

      {/* Frameworks - Light */}
      <section className="section-light py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">
            OUR FRAMEWORKS
          </p>
          <h2 className="font-heading text-3xl font-bold text-text-dark mb-8">
            Named, structured, published
          </h2>

          <div className="space-y-3">
            {[
              {
                title: "AI Visibility Framework",
                desc: "4-dimension scoring model (Citation Presence, Entity Recognition, Content Structure, Citation Breadth). Measures whether AI platforms recommend your company.",
                href: "/ai-visibility",
              },
              {
                title: "The Signal Source Method",
                desc: "6-step research framework: Signal, Scope, Scan, Score, Source, Seed. Produces original data that AI platforms treat as a primary source.",
                href: "/research",
              },
              {
                title: "AI Visibility Playbook",
                desc: "The full guide for enterprise marketers: how to measure your AI visibility score and fix the gaps.",
                href: "/resources/ai-visibility-playbook",
              },
              {
                title: "AI Visibility Scorecard",
                desc: "Interactive self-assessment. Score your company across 4 dimensions in under 5 minutes.",
                href: "/resources/ai-visibility-scorecard",
              },
            ].map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="block bg-white border border-light-border rounded-xl p-5 hover:border-orange transition-colors"
              >
                <h3 className="font-heading font-bold text-text-dark mb-1">
                  {item.title}
                </h3>
                <p className="text-text-body text-sm">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Teaser - White */}
      <section className="section-white py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">
            THE FOUNDER
          </p>
          <h2 className="font-heading text-3xl font-bold text-text-dark mb-4">
            Built by a practitioner, not a consultant
          </h2>
          <p className="text-text-body mb-8 max-w-xl mx-auto">
            GTM Signal Studio was founded by Oloye Adeosun, a Marketing Manager
            for Enterprise &amp; Automation who builds what he writes about.
          </p>
          <Link
            href="/about/founder"
            className="bg-orange hover:bg-orange-hover text-white px-8 py-4 rounded-lg font-semibold text-center transition-colors inline-block"
          >
            Meet the Founder
          </Link>
        </div>
      </section>

      {/* Schema - Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ResearchOrganization",
            name: "GTM Signal Studio",
            url: "https://gtmsignalstudio.com",
            description:
              "Independent research studio producing original data on AI visibility and enterprise marketing.",
            founder: {
              "@type": "Person",
              name: "Oloye Adeosun",
              url: "https://gtmsignalstudio.com/about/founder",
            },
            foundingDate: "2026",
            areaServed: "United Kingdom",
            knowsAbout: [
              "AI Visibility",
              "Enterprise Marketing",
              "Marketing Technology",
              "B2B Go-To-Market",
              "Marketing Automation",
            ],
          }),
        }}
      />
    </>
  );
}
