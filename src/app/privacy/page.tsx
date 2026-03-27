import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for GTM Signal Studio. How we collect, use, and protect your data. GDPR compliant.",
  keywords: [
    "privacy policy",
    "GTM Signal Studio privacy",
    "data protection",
    "GDPR",
  ],
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader tagline="LEGAL" title="Privacy Policy" subtitle="Last updated: 27 March 2026" />

    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="prose prose-sm max-w-none text-text-body space-y-8">
        <section>
          <h2 className="font-heading text-xl font-bold text-text-dark mb-3">
            Who we are
          </h2>
          <p className="leading-relaxed">
            GTM Signal Studio is operated by Oloye Adeosun, a sole trader based
            in Kent, United Kingdom. Our website is{" "}
            <Link href="/" className="text-orange hover:underline">
              gtmsignalstudio.com
            </Link>
            .
          </p>
          <p className="leading-relaxed mt-2">
            For data protection enquiries, contact us at{" "}
            <a
              href="mailto:thegtmsignalstudio@gmail.com"
              className="text-orange hover:underline"
            >
              thegtmsignalstudio@gmail.com
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-text-dark mb-3">
            What data we collect
          </h2>
          <p className="leading-relaxed mb-3">
            We collect the minimum data necessary to provide our services:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Email address</strong> when you subscribe to our
              newsletter or download a resource (processed by Beehiiv).
            </li>
            <li>
              <strong>Website analytics</strong> via Google Analytics 4 (GA4).
              This includes pages visited, time on site, referral source, and
              device type. GA4 uses first-party cookies and does not collect
              personally identifiable information by default.
            </li>
            <li>
              <strong>Name, email, and company details</strong> when you request
              a GTM audit or AI Visibility audit.
            </li>
            <li>
              <strong>Correspondence</strong> when you email or message us
              directly.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-text-dark mb-3">
            How we use your data
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>To deliver the newsletter you subscribed to.</li>
            <li>To deliver audit reports you requested.</li>
            <li>To analyse website usage and improve our content.</li>
            <li>To respond to your enquiries.</li>
          </ul>
          <p className="leading-relaxed mt-3">
            We do not sell, rent, or share your personal data with third parties
            for marketing purposes.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-text-dark mb-3">
            Legal basis for processing (GDPR)
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Consent</strong> when you subscribe to our newsletter,
              submit your email for a resource, or accept analytics cookies
              via our cookie banner.
            </li>
            <li>
              <strong>Legitimate interest</strong> for contacting businesses
              about our services (outreach to corporate subscribers only,
              supported by a documented Legitimate Interest Assessment).
            </li>
            <li>
              <strong>Contract</strong> when you engage us for audit or
              consulting services.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-text-dark mb-3">
            Third-party services
          </h2>
          <p className="leading-relaxed mb-3">
            We use the following third-party services that may process your data:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Beehiiv</strong> for newsletter delivery and email
              subscription management. Stores your email address and engagement
              data (opens, clicks). Data processed in the US.
            </li>
            <li>
              <strong>Google Analytics 4</strong> for website analytics. Collects
              anonymised usage data (pages visited, time on site, device type,
              referral source). IP addresses are anonymised. Only active if you
              consent via our cookie banner.
            </li>
            <li>
              <strong>Vercel</strong> for website hosting. May process access logs
              including IP addresses for security purposes.
            </li>
            <li>
              <strong>Supabase</strong> for database and content storage. Stores
              blog content and resource metadata. Does not store personal data
              beyond what you submit.
            </li>
            <li>
              <strong>Google Workspace</strong> for email communication. Processes
              correspondence when you email us directly.
            </li>
            <li>
              <strong>Calendly</strong> for appointment scheduling. When you book
              a call, Calendly processes your name, email, and selected time slot.
            </li>
          </ul>
          <p className="leading-relaxed mt-3">
            Each service has its own privacy policy. We encourage you to review
            them. We do not use any cold email platforms or share subscriber
            data with outbound tools.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-text-dark mb-3">
            Cookies
          </h2>
          <p className="leading-relaxed mb-3">
            We use three categories of cookies. Analytics and functional cookies
            are only set after you provide explicit consent via our cookie banner.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Essential cookies</strong> — Required for the website to
              function. Cannot be disabled. Includes security tokens and session
              management.
            </li>
            <li>
              <strong>Analytics cookies</strong> — Google Analytics 4 cookies
              that help us understand how visitors use the site. Anonymised IP.
              Only active after consent.
            </li>
            <li>
              <strong>Functional cookies</strong> — Remember your preferences
              (cookie consent choice, display settings). Improve your experience
              on return visits.
            </li>
          </ul>
          <p className="leading-relaxed mt-3">
            You can manage your cookie preferences at any time by clicking
            &quot;Cookie Settings&quot; in our footer. For a detailed list of
            every cookie we use, see our{" "}
            <Link href="/cookies" className="text-orange hover:underline">
              Cookie Policy
            </Link>.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-text-dark mb-3">
            Your rights
          </h2>
          <p className="leading-relaxed mb-3">
            Under GDPR, you have the right to:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Access the personal data we hold about you.</li>
            <li>Request correction of inaccurate data.</li>
            <li>Request deletion of your data.</li>
            <li>Withdraw consent at any time.</li>
            <li>Object to processing based on legitimate interest.</li>
            <li>
              Lodge a complaint with the ICO (Information Commissioner&apos;s
              Office) if you believe your rights have been infringed.
            </li>
          </ul>
          <p className="leading-relaxed mt-3">
            To exercise any of these rights, email{" "}
            <a
              href="mailto:thegtmsignalstudio@gmail.com"
              className="text-orange hover:underline"
            >
              thegtmsignalstudio@gmail.com
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-text-dark mb-3">
            International data transfers
          </h2>
          <p className="leading-relaxed">
            Some of our third-party services (Beehiiv, Google Analytics, Vercel,
            Supabase, Calendly) process data in the United States. These
            transfers are protected by the EU-US Data Privacy Framework and/or
            Standard Contractual Clauses (SCCs) as required under UK GDPR. We
            only use services that provide adequate data protection safeguards.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-text-dark mb-3">
            Data security
          </h2>
          <p className="leading-relaxed">
            We implement appropriate technical and organisational measures to
            protect your personal data, including: HTTPS encryption on all pages,
            Content Security Policy (CSP) headers, secure HTTP headers
            (HSTS, X-Frame-Options, X-Content-Type-Options), rate limiting on
            API endpoints, and restricted access to databases and storage. No
            method of transmission over the internet is 100% secure, but we take
            reasonable steps to protect your data.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-text-dark mb-3">
            Data retention
          </h2>
          <p className="leading-relaxed">
            Newsletter subscriber data is retained for as long as you remain
            subscribed. You can unsubscribe at any time via the link in any
            email. Audit and consulting data is retained for 12 months after
            project completion, then deleted. Analytics data is retained
            according to Google Analytics default settings (14 months).
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-text-dark mb-3">
            Changes to this policy
          </h2>
          <p className="leading-relaxed">
            We may update this policy from time to time. Changes will be posted
            on this page with an updated date. We will not reduce your rights
            under this policy without your explicit consent.
          </p>
        </section>
      </div>
    </div>
    </>
  );
}
