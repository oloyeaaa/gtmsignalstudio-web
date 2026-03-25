import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Oloye Adeosun | Enterprise Marketing, AI Visibility, Signal-Led GTM",
  description:
    "Oloye Adeosun is a Marketing Manager for Enterprise & Automation who writes about what actually works in B2B GTM, MarTech, and AI visibility.",
  keywords: [
    "Oloye Adeosun",
    "enterprise marketing",
    "AI visibility",
    "signal-led marketing",
    "B2B marketing",
    "MarTech",
    "GTM Signal Studio",
  ],
  openGraph: {
    title: "About Oloye Adeosun | GTM Signal Studio",
    description:
      "Enterprise marketing practitioner. Writes about what actually works in B2B GTM, MarTech, and AI visibility.",
    type: "profile",
    url: "https://gtmsignalstudio.com/about",
  },
  alternates: {
    canonical: "https://gtmsignalstudio.com/about",
  },
};

export default function AboutPage() {
  return (
    <>
      {/* Hero - Dark */}
      <section className="section-dark py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start gap-8">
            <Image
              src="/oloye-profile.png"
              alt="Oloye Adeosun"
              width={160}
              height={160}
              className="rounded-2xl flex-shrink-0 object-cover"
            />
            <div>
              <p className="font-mono text-orange text-sm mb-3 tracking-wider">
                ABOUT
              </p>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-3">
                Oloye Adeosun
              </h1>
              <p className="text-muted text-lg">
                Marketing Manager, Enterprise &amp; Automation
              </p>
              <p className="text-muted text-lg">
                Founder, GTM Signal Studio
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Short Version - Light */}
      <section className="section-light py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4 text-text-body text-lg leading-relaxed">
            <p>
              I work in enterprise marketing. Campaigns, MarTech, automation,
              tracking, web performance. I see what works, what breaks, and what
              most companies get wrong.
            </p>
            <p>
              I write about it here because most marketing advice comes from
              people who advise on campaigns, not people who run them. What I
              share is research-backed, data-driven, and grounded in what I
              actually see working at the enterprise level.
            </p>
            <p>
              I also run GTM Signal Studio, where I help businesses understand
              whether AI platforms recommend them to buyers, and fix the gaps
              when they do not.
            </p>
          </div>
        </div>
      </section>

      {/* What I Write About - White */}
      <section className="section-white py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">
            WHAT I WRITE ABOUT
          </p>
          <h2 className="font-heading text-3xl font-bold text-text-dark mb-8">
            Enterprise marketing through the lens of AI and signals
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                title: "Enterprise Campaign Strategy",
                text: "How enterprise marketing teams plan, execute, and measure campaigns. Attribution models, channel mix, and what the data actually says.",
              },
              {
                title: "AI Visibility",
                text: "Whether AI platforms recommend your company to buyers. The 4 dimensions, how to measure your score, and how to fix the gaps.",
              },
              {
                title: "MarTech and Automation",
                text: "What to build, what to cut, and what to stop paying for. Stack audits, workflow design, and the automation decisions that actually move pipeline.",
              },
              {
                title: "Signal-Led Marketing",
                text: "Using real buying signals instead of static lists. How to detect when a company needs what you sell, and reach them at the right moment.",
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

      {/* Background - Dark */}
      <section className="section-dark py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">
            BACKGROUND
          </p>
          <h2 className="font-heading text-3xl font-bold text-white mb-8">
            The path here was not a straight line
          </h2>

          <div className="space-y-6 text-muted leading-relaxed">
            <p>
              Born in Nigeria. Based in Kent, UK. BSc Business Administration.
              MSc International Business and Enterprise.
            </p>
            <p>
              I spent 4+ years teaching myself web development, copywriting,
              email marketing, AI, and automation. Not because I planned to. Because
              the problems I wanted to solve kept requiring skills I did not have
              yet.
            </p>
            <p>
              That self-taught mindset shaped how I approach enterprise marketing
              today. I do not accept that a tool or process is the right one just
              because it is the one everyone uses. I test it. I measure it. If
              something better exists, I build it.
            </p>
            <p>
              That is how I ended up building AI-powered marketing workflows,
              custom audit tools, and a content engine that runs on Claude Code.
              Not because it was trendy. Because it solved real problems faster
              than the existing tools could.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { stat: "MSc", label: "International Business & Enterprise" },
              { stat: "4+", label: "years self-taught in marketing & dev" },
              { stat: "35+", label: "AI skills and workflows built" },
              { stat: "Kent, UK", label: "based" },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-navy-light border border-navy-border rounded-xl p-4 text-center"
              >
                <p className="text-orange font-heading text-xl font-bold">
                  {s.stat}
                </p>
                <p className="text-muted text-xs mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What I Have Built - Light */}
      <section className="section-light py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">
            WHAT I HAVE BUILT
          </p>
          <h2 className="font-heading text-3xl font-bold text-text-dark mb-8">
            GTM Signal Studio
          </h2>

          <div className="space-y-4 text-text-body leading-relaxed">
            <p>
              GTM Signal Studio is where I publish frameworks, tools, and
              research on enterprise marketing and AI visibility. Everything here
              comes from real work, not theory.
            </p>
          </div>

          <div className="mt-8 space-y-3">
            {[
              {
                title: "AI Visibility Framework",
                desc: "A 4-dimension scoring model for measuring whether AI platforms recommend your company to buyers.",
                href: "/ai-visibility",
              },
              {
                title: "AI Visibility Playbook",
                desc: "The full guide for enterprise marketers: dimensions, scoring, and prioritised fix list.",
                href: "/resources/ai-visibility-playbook",
              },
              {
                title: "AI Visibility Scorecard",
                desc: "Interactive self-assessment tool. Score your company in under 5 minutes.",
                href: "/resources/ai-visibility-scorecard",
              },
              {
                title: "AI Visibility Audit",
                desc: "Professional audit across 4 dimensions. Scored 0-100 with prioritised fix plan. 48-hour delivery.",
                href: "/ai-visibility-audit",
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

      {/* CTA - White */}
      <section className="section-white py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl font-bold text-text-dark mb-4">
            Connect
          </h2>
          <p className="text-text-body mb-8 max-w-xl mx-auto">
            I write about enterprise marketing, AI visibility, and signal-led
            GTM on LinkedIn. If any of that is relevant to your work, let us
            connect.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.linkedin.com/in/oloyeadeosun/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-orange hover:bg-orange-hover text-white px-8 py-4 rounded-lg font-semibold text-center transition-colors"
            >
              Connect on LinkedIn
            </a>
            <Link
              href="/newsletter"
              className="border border-light-border hover:border-orange text-text-dark px-8 py-4 rounded-lg font-semibold text-center transition-colors"
            >
              Subscribe to the Newsletter
            </Link>
          </div>
        </div>
      </section>

      {/* Person schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Oloye Adeosun",
            url: "https://gtmsignalstudio.com/about",
            jobTitle: "Marketing Manager, Enterprise & Automation",
            description:
              "Enterprise marketing practitioner who writes about what actually works in B2B GTM, MarTech, and AI visibility.",
            sameAs: ["https://www.linkedin.com/in/oloyeadeosun/"],
            worksFor: {
              "@type": "Organization",
              name: "GTM Signal Studio",
              url: "https://gtmsignalstudio.com",
            },
            alumniOf: [
              {
                "@type": "EducationalOrganization",
                name: "University (MSc International Business & Enterprise)",
              },
            ],
            knowsAbout: [
              "Enterprise Marketing",
              "Marketing Automation",
              "AI Visibility",
              "MarTech",
              "Signal-Led Marketing",
              "B2B Go-To-Market",
            ],
          }),
        }}
      />
    </>
  );
}
