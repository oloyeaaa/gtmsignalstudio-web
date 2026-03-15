import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Oloye Adeosun — building signal-led GTM infrastructure for B2B founders. Marketing Automation Specialist by day, GTM Signal Studio by night.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex flex-col sm:flex-row items-start gap-6 mb-10">
        <Image
          src="/oloye-profile.png"
          alt="Oloye Adeosun"
          width={140}
          height={140}
          className="rounded-2xl flex-shrink-0 object-cover"
        />
        <div>
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">ABOUT</p>
          <h1 className="font-heading text-4xl font-bold text-text-dark mb-2">
            Oloye Adeosun
          </h1>
          <p className="text-text-muted">Marketing Automation Specialist. Building GTM Signal Studio.</p>
        </div>
      </div>

      <div className="prose max-w-none">
        <p>
          I am a Marketing Automation Specialist building GTM Signal Studio on the side.
        </p>
        <p>
          By day, I work in enterprise marketing — automation, systems design, and campaign
          infrastructure. By night, I build signal-led go-to-market tools and frameworks
          for B2B founders who are tired of spray-and-pray outreach.
        </p>

        <h2>The Problem I Solve</h2>
        <p>
          Most B2B outreach fails before the email is written. Not because the copy is bad.
          Because there was no reason to send it.
        </p>
        <p>
          The default approach — build a list, write a sequence, blast it to everyone — produces
          1-3% reply rates and burns your domain reputation. I spent 4 years learning marketing,
          copywriting, and automation. The one thing nobody taught me: <strong>when</strong> to
          reach out to someone.
        </p>
        <p>
          So I built a system that answers that question first.
        </p>

        <h2>What Signal-Led Means</h2>
        <p>
          A signal is not a job title or a company size. Those are characteristics — they are
          static. A signal is something that just changed: a new VP of Sales appointment, a
          funding round, a hiring spree for SDRs.
        </p>
        <p>
          When you email someone based on a signal, they think "how did they know?" instead of
          "not another cold email." That is the difference between a pipeline and a prayer.
        </p>

        <h2>What I Have Built</h2>
        <p>
          GTM Signal Studio is not a theory. Everything here comes from real campaigns:
        </p>
        <ul>
          <li>900+ cold emails sent across multiple segments — with published reply rates</li>
          <li>6 GTM audits delivered to real B2B companies — with anonymised findings</li>
          <li>18 Claude Code skills that automate research, content, and outreach</li>
          <li>7 proven outreach patterns extracted from live data</li>
          <li>A weekly newsletter with frameworks from actual experiments</li>
        </ul>
        <p>
          I share the data publicly — what works, what fails, and why. No manufactured case
          studies. No inflated numbers. Just the real thing.
        </p>

        <h2>Background</h2>
        <ul>
          <li>BSc Business Administration</li>
          <li>MSc International Business &amp; Enterprise</li>
          <li>4+ years self-taught: web development, copywriting, email marketing, AI, automation</li>
          <li>Marketing Automation Specialist (enterprise, full-time)</li>
          <li>Based in Kent, UK</li>
        </ul>
      </div>

      {/* CTA */}
      <div className="mt-12 flex flex-col sm:flex-row gap-4">
        <a
          href="https://www.linkedin.com/in/oloyeadeosun/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-orange hover:bg-orange-hover text-white px-6 py-3 rounded-lg font-semibold text-center transition-colors"
        >
          Connect on LinkedIn
        </a>
        <Link
          href="/work-with-me"
          className="border border-navy-border hover:border-muted text-white px-6 py-3 rounded-lg font-semibold text-center transition-colors"
        >
          Work With Me
        </Link>
      </div>

      {/* Person schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Oloye Adeosun",
            url: "https://gtmsignalstudio.com/about",
            jobTitle: "Marketing Automation Specialist",
            description: "Building signal-led GTM infrastructure for B2B founders.",
            sameAs: ["https://www.linkedin.com/in/oloyeadeosun/"],
            worksFor: {
              "@type": "Organization",
              name: "GTM Signal Studio",
              url: "https://gtmsignalstudio.com",
            },
          }),
        }}
      />
    </div>
  );
}
