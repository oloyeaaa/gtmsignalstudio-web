import type { Metadata } from "next";
import Link from "next/link";

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
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <p className="font-mono text-orange text-xs uppercase tracking-widest mb-4">
        Legal
      </p>
      <h1 className="font-heading text-3xl font-bold text-text-dark mb-2">
        Privacy Policy
      </h1>
      <p className="text-muted text-sm mb-10">
        Last updated: 22 March 2026
      </p>

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
              <strong>Consent</strong> when you subscribe to our newsletter or
              submit your email for a resource.
            </li>
            <li>
              <strong>Legitimate interest</strong> for website analytics and
              improving our services.
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
              subscription management.
            </li>
            <li>
              <strong>Google Analytics 4</strong> for website analytics.
            </li>
            <li>
              <strong>Vercel</strong> for website hosting.
            </li>
            <li>
              <strong>Supabase</strong> for database and content storage.
            </li>
            <li>
              <strong>SmartLead</strong> for email campaign delivery (outbound
              only, not subscriber data).
            </li>
          </ul>
          <p className="leading-relaxed mt-3">
            Each service has its own privacy policy. We encourage you to review
            them.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-text-dark mb-3">
            Cookies
          </h2>
          <p className="leading-relaxed mb-3">We use the following cookies:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Essential cookies</strong> required for the website to
              function (session management, security).
            </li>
            <li>
              <strong>Analytics cookies</strong> (Google Analytics 4) to
              understand how visitors use our site. These are only set after you
              consent via our cookie banner.
            </li>
          </ul>
          <p className="leading-relaxed mt-3">
            You can manage your cookie preferences at any time by clicking the
            cookie settings link in our footer.
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
  );
}
