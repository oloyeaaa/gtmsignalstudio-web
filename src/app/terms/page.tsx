import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "Terms and conditions for using GTM Signal Studio services, website, and resources.",
  keywords: [
    "terms and conditions",
    "GTM Signal Studio terms",
    "service agreement",
    "terms of use",
  ],
};

export default function TermsPage() {
  return (
    <>
      <PageHeader tagline="LEGAL" title="Terms and Conditions" subtitle="Last updated: 22 March 2026" />

    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="prose prose-sm max-w-none text-text-body space-y-8">
        <section>
          <h2 className="font-heading text-xl font-bold text-text-dark mb-3">
            1. About these terms
          </h2>
          <p className="leading-relaxed">
            These terms govern your use of the GTM Signal Studio website (
            <Link href="/" className="text-orange hover:underline">
              gtmsignalstudio.com
            </Link>
            ) and any services provided by GTM Signal Studio, operated by Oloye
            Adeosun, a sole trader based in Kent, United Kingdom.
          </p>
          <p className="leading-relaxed mt-2">
            By using this website or engaging our services, you agree to these
            terms. If you do not agree, please do not use the website.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-text-dark mb-3">
            2. Services
          </h2>
          <p className="leading-relaxed mb-3">
            GTM Signal Studio provides go-to-market consulting, audits, and
            digital strategy services for B2B companies. Our services include:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Free GTM audits (delivered as PDF reports).</li>
            <li>AI Visibility audits (paid, delivered within 48 hours).</li>
            <li>
              Positioning Sprints, GTM Fix Sprints, and Outreach Setup packages.
            </li>
            <li>
              Free resources including tools, templates, and newsletter content.
            </li>
          </ul>
          <p className="leading-relaxed mt-3">
            Service scope, deliverables, and timelines are agreed in writing
            before work begins. We reserve the right to decline any engagement.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-text-dark mb-3">
            3. Payments
          </h2>
          <p className="leading-relaxed">
            Paid services are invoiced at the agreed rate. Payment is due within
            14 days of invoice unless otherwise agreed. All prices are in GBP
            and exclusive of VAT (we are below the VAT threshold). We accept
            bank transfer and Stripe payments.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-text-dark mb-3">
            4. Intellectual property
          </h2>
          <p className="leading-relaxed mb-3">
            All content on this website, including text, frameworks, tools,
            images, and code, is the intellectual property of GTM Signal Studio
            unless otherwise stated.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Free resources</strong> may be used for your own business
              purposes. You may not resell, redistribute, or claim them as your
              own.
            </li>
            <li>
              <strong>Audit reports</strong> are delivered for your internal use
              only. You may share findings within your organisation but may not
              publish or distribute the report publicly.
            </li>
            <li>
              <strong>Consulting deliverables</strong> become your property upon
              full payment.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-text-dark mb-3">
            5. Website use
          </h2>
          <p className="leading-relaxed mb-3">When using this website, you agree not to:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Scrape, crawl, or harvest content in bulk without permission
              (search engine and AI crawlers are permitted as specified in our
              robots.txt).
            </li>
            <li>
              Submit false information through forms or email gates.
            </li>
            <li>
              Attempt to access restricted areas or exploit security
              vulnerabilities.
            </li>
            <li>
              Use the website for any unlawful purpose.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-text-dark mb-3">
            6. Newsletter
          </h2>
          <p className="leading-relaxed">
            By subscribing to The GTM Signal newsletter, you consent to
            receiving weekly emails. You can unsubscribe at any time via the link
            in any email. Your email is processed by Beehiiv and subject to
            their terms of service. We do not share subscriber data with third
            parties.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-text-dark mb-3">
            7. Limitation of liability
          </h2>
          <p className="leading-relaxed mb-3">
            GTM Signal Studio provides information and consulting services in
            good faith. However:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              We do not guarantee specific business outcomes (revenue, leads, or
              rankings) from our services or content.
            </li>
            <li>
              Free audit scores and recommendations are our professional opinion
              based on publicly available information. They are not guarantees.
            </li>
            <li>
              Our total liability for any claim arising from our services is
              limited to the amount you paid for that specific service.
            </li>
            <li>
              We are not liable for indirect, consequential, or incidental
              damages.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-text-dark mb-3">
            8. Refunds
          </h2>
          <p className="leading-relaxed">
            If you are not satisfied with a paid service, contact us within 7
            days of delivery. We will work to resolve the issue. If we cannot
            reach a resolution, we will offer a partial or full refund at our
            discretion. Free services (audits, resources, newsletter) are not
            eligible for refund.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-text-dark mb-3">
            9. Governing law
          </h2>
          <p className="leading-relaxed">
            These terms are governed by the laws of England and Wales. Any
            disputes will be subject to the exclusive jurisdiction of the courts
            of England and Wales.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-text-dark mb-3">
            10. Changes to these terms
          </h2>
          <p className="leading-relaxed">
            We may update these terms from time to time. Changes will be posted
            on this page with an updated date. Continued use of the website
            after changes are posted constitutes acceptance of the updated terms.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-text-dark mb-3">
            11. Contact
          </h2>
          <p className="leading-relaxed">
            For questions about these terms, email{" "}
            <a
              href="mailto:thegtmsignalstudio@gmail.com"
              className="text-orange hover:underline"
            >
              thegtmsignalstudio@gmail.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
    </>
  );
}
