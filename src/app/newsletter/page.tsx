import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Newsletter — The GTM Signal",
  description:
    "Weekly signal-led GTM insights from real campaigns. Frameworks, data, and patterns — delivered every Tuesday.",
  keywords: ["GTM Signal newsletter", "B2B marketing newsletter", "signal-led GTM insights", "weekly GTM newsletter", "go-to-market email"],
  alternates: { canonical: "/newsletter" },
};

export default function NewsletterPage() {
  return (
    <>
      <PageHeader tagline="THE GTM SIGNAL" title="Weekly frameworks. Real data. No fluff." subtitle="Every Tuesday — signal-led GTM insights from real enterprise campaigns. Frameworks you can deploy this week. Join enterprise marketing leaders and GTM practitioners." centered />

    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <a
        href="https://newsletter.gtmsignalstudio.com"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-orange hover:bg-orange-hover text-white px-8 py-3 rounded-lg font-semibold transition-colors"
      >
        Subscribe on Beehiiv →
      </a>

      {/* What to expect */}
      <div className="mt-16 text-left">
        <h2 className="font-heading text-xl font-bold text-text-dark mb-6 text-center">
          What to expect
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: "Real campaign data", description: "Reply rates, conversion numbers, and A/B test results from live outreach." },
            { title: "Named frameworks", description: "Proof Migration Framework, Signal Stack, Gift-First Email — tools you can use immediately." },
            { title: "Audit findings", description: "Anonymised patterns from real GTM audits. What works, what is broken, and why." },
            { title: "Build-in-public updates", description: "What I am building, what failed, and what surprised me this week." },
          ].map((item) => (
            <div key={item.title} className="bg-navy-light border border-navy-border rounded-lg p-4">
              <h3 className="font-heading font-bold text-white text-sm mb-1">{item.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Periodical",
            name: "The GTM Signal",
            description:
              "Weekly signal-led GTM insights from real campaigns. Frameworks, data, and patterns delivered every Tuesday.",
            url: "https://newsletter.gtmsignalstudio.com",
            publisher: {
              "@type": "Organization",
              name: "GTM Signal Studio",
              url: "https://gtmsignalstudio.com",
            },
            author: {
              "@type": "Person",
              name: "Oloye Adeosun",
              url: "https://gtmsignalstudio.com/about",
            },
            isAccessibleForFree: true,
            periodicity: "weekly",
          }),
        }}
      />
    </div>
    </>
  );
}
