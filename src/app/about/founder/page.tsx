import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Oloye Adeosun | Founder, GTM Signal Studio",
  description:
    "Oloye Adeosun is a Marketing Manager for Enterprise & Automation and founder of GTM Signal Studio. Enterprise marketing practitioner writing about AI visibility, MarTech, and signal-led GTM.",
  keywords: [
    "Oloye Adeosun",
    "enterprise marketing",
    "AI visibility",
    "GTM Signal Studio founder",
    "MarTech",
    "marketing automation",
  ],
  openGraph: {
    title: "Oloye Adeosun | Founder, GTM Signal Studio",
    description:
      "Enterprise marketing practitioner and founder of GTM Signal Studio.",
    type: "profile",
    url: "https://gtmsignalstudio.com/about/founder",
  },
  alternates: {
    canonical: "https://gtmsignalstudio.com/about/founder",
  },
};

export default function FounderPage() {
  return (
    <>
      {/* Hero - Dark */}
      <section className="section-dark py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start gap-8">
            <Image
              src="/oloye-profile.png"
              alt="Oloye Adeosun — Founder, GTM Signal Studio"
              width={160}
              height={160}
              className="rounded-2xl flex-shrink-0 object-cover"
            />
            <div>
              <p className="font-mono text-orange text-sm mb-3 tracking-wider">
                THE FOUNDER
              </p>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-3">
                Oloye Adeosun
              </h1>
              <p className="text-muted text-lg">
                Marketing Manager, Enterprise &amp; Automation
              </p>
              <p className="text-muted text-lg">
                Founder,{" "}
                <Link href="/about" className="text-orange hover:underline">
                  GTM Signal Studio
                </Link>
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
              I write about it because most marketing advice comes from people who
              advise on campaigns, not people who run them. What I share is
              research-backed, data-driven, and grounded in what I actually see
              working at the enterprise level.
            </p>
            <p>
              I started GTM Signal Studio because I wanted to understand whether AI
              was changing how buyers find companies. I built a tool to measure it.
              The data was worth publishing. So I published it.
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
              That is how GTM Signal Studio started. Not as a business plan. As a
              byproduct of wanting to understand whether AI was changing how buyers
              find companies, building a tool to measure it, and realising the data
              was worth publishing.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { stat: "MSc", label: "International Business & Enterprise" },
              { stat: "4+", label: "Years self-taught in marketing & dev" },
              { stat: "40+", label: "AI skills and workflows built" },
              { stat: "Kent, UK", label: "Based" },
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

      {/* CTA - Light */}
      <section className="section-light py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl font-bold text-text-dark mb-4">
            Connect
          </h2>
          <p className="text-text-body mb-8 max-w-xl mx-auto">
            I write about enterprise marketing, AI visibility, and signal-led GTM
            on LinkedIn. If any of that is relevant to your work, connect.
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
              href="https://newsletter.gtmsignalstudio.com/"
              className="border border-light-border hover:border-orange text-text-dark px-8 py-4 rounded-lg font-semibold text-center transition-colors"
            >
              Subscribe to the Newsletter
            </Link>
          </div>

          <div className="mt-6">
            <Link
              href="/about"
              className="text-orange text-sm font-semibold hover:underline"
            >
              &larr; About GTM Signal Studio
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
            url: "https://gtmsignalstudio.com/about/founder",
            jobTitle: "Marketing Manager, Enterprise & Automation",
            description:
              "Enterprise marketing practitioner and founder of GTM Signal Studio. Produces original research on AI visibility and enterprise marketing.",
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
