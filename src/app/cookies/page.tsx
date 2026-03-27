import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Cookie Policy — GTM Signal Studio",
  description:
    "Full cookie policy for GTM Signal Studio. What cookies we use, why, and how to control them.",
  keywords: ["cookie policy", "cookies", "GDPR", "consent", "analytics cookies"],
};

export default function CookiePolicyPage() {
  return (
    <>
      <PageHeader
        tagline="LEGAL"
        title="Cookie Policy"
        subtitle="Last updated: 27 March 2026"
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-sm max-w-none text-text-body space-y-8">

          <section>
            <h2 className="font-heading text-xl font-bold text-text-dark mb-3">
              What are cookies?
            </h2>
            <p className="leading-relaxed">
              Cookies are small text files stored on your device when you visit a website.
              They help the site remember your preferences and understand how you use it.
              Some cookies are essential for the site to work. Others help us improve your
              experience or understand traffic patterns.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-text-dark mb-3">
              How we use cookies
            </h2>
            <p className="leading-relaxed">
              We use cookies in three categories. Analytics and functional cookies are only
              set after you give explicit consent via our cookie banner. You can change your
              preferences at any time using the &quot;Cookie Settings&quot; link in our footer.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-text-dark mb-3">
              Essential cookies
            </h2>
            <p className="leading-relaxed mb-4">
              These cookies are necessary for the website to function. They cannot be
              disabled. They do not store any personally identifiable information.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-light-border rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-navy text-white text-left">
                    <th className="px-4 py-3 font-semibold">Cookie</th>
                    <th className="px-4 py-3 font-semibold">Purpose</th>
                    <th className="px-4 py-3 font-semibold">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-light-border">
                  <tr>
                    <td className="px-4 py-3 font-mono text-xs">cookie_consent</td>
                    <td className="px-4 py-3">Stores your cookie consent preferences (which categories you accepted or declined).</td>
                    <td className="px-4 py-3">Persistent</td>
                  </tr>
                  <tr className="bg-cream/30">
                    <td className="px-4 py-3 font-mono text-xs">cookie_consent_date</td>
                    <td className="px-4 py-3">Records when you last set your cookie preferences (for audit and compliance).</td>
                    <td className="px-4 py-3">Persistent</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-xs">__vercel_*</td>
                    <td className="px-4 py-3">Set by Vercel (our hosting provider) for load balancing and security.</td>
                    <td className="px-4 py-3">Session</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-text-dark mb-3">
              Analytics cookies
            </h2>
            <p className="leading-relaxed mb-4">
              These cookies help us understand how visitors use the site. All data is
              anonymised (IP anonymisation enabled). These cookies are only set after
              you consent. If you decline, no analytics data is collected.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-light-border rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-navy text-white text-left">
                    <th className="px-4 py-3 font-semibold">Cookie</th>
                    <th className="px-4 py-3 font-semibold">Purpose</th>
                    <th className="px-4 py-3 font-semibold">Duration</th>
                    <th className="px-4 py-3 font-semibold">Provider</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-light-border">
                  <tr>
                    <td className="px-4 py-3 font-mono text-xs">_ga</td>
                    <td className="px-4 py-3">Distinguishes unique users. Generates a random ID to calculate visitor, session, and campaign data.</td>
                    <td className="px-4 py-3">2 years</td>
                    <td className="px-4 py-3">Google</td>
                  </tr>
                  <tr className="bg-cream/30">
                    <td className="px-4 py-3 font-mono text-xs">_ga_*</td>
                    <td className="px-4 py-3">Used by GA4 to persist session state across page views.</td>
                    <td className="px-4 py-3">2 years</td>
                    <td className="px-4 py-3">Google</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="leading-relaxed mt-3 text-sm text-text-body/70">
              Google Analytics data retention is set to 14 months. We do not enable
              advertising features, remarketing, or demographic reporting.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-text-dark mb-3">
              Functional cookies
            </h2>
            <p className="leading-relaxed mb-4">
              These cookies remember your preferences to provide a better experience.
              Only set after consent.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-light-border rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-navy text-white text-left">
                    <th className="px-4 py-3 font-semibold">Cookie</th>
                    <th className="px-4 py-3 font-semibold">Purpose</th>
                    <th className="px-4 py-3 font-semibold">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-light-border">
                  <tr>
                    <td className="px-4 py-3 font-mono text-xs">email_gate_*</td>
                    <td className="px-4 py-3">Remembers that you already submitted your email for a gated resource, so you are not asked again.</td>
                    <td className="px-4 py-3">Persistent</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-text-dark mb-3">
              Third-party cookies
            </h2>
            <p className="leading-relaxed">
              We do not use any advertising cookies, remarketing pixels, or social
              media tracking cookies. The only third-party cookies are from Google
              Analytics (listed above), and they are only set with your consent.
              Beehiiv (our newsletter provider) may set cookies when you visit
              the newsletter subscription page, subject to their own cookie policy.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-text-dark mb-3">
              How to manage cookies
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>On this site:</strong> Click &quot;Cookie Settings&quot; in the
                footer to change your preferences at any time. Your choice is stored
                locally on your device.
              </li>
              <li>
                <strong>In your browser:</strong> Most browsers allow you to block or
                delete cookies in their settings. Note that blocking essential cookies
                may affect site functionality.
              </li>
              <li>
                <strong>Google Analytics opt-out:</strong> Install the{" "}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange hover:underline"
                >
                  Google Analytics Opt-out Browser Add-on
                </a>{" "}
                to prevent Google Analytics from collecting your data on any website.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-text-dark mb-3">
              Contact
            </h2>
            <p className="leading-relaxed">
              If you have questions about our use of cookies, contact us at{" "}
              <a
                href="mailto:thegtmsignalstudio@gmail.com"
                className="text-orange hover:underline"
              >
                thegtmsignalstudio@gmail.com
              </a>
              . See also our{" "}
              <Link href="/privacy" className="text-orange hover:underline">
                Privacy Policy
              </Link>.
            </p>
          </section>

        </div>
      </div>
    </>
  );
}
