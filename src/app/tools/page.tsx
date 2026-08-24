import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ToolsGrid from "@/components/tools/ToolsGrid";
import AffiliateDisclaimer from "@/components/tools/AffiliateDisclaimer";
import { getPublishedTools, getPublishedToolCount, type Tool } from "@/lib/queries";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Tools Directory",
  description:
    "Curated directory of tools that improve your AI visibility. Tested and rated by GTM Signal Studio across all four dimensions: entity recognition, content structure, citation presence, and technical SEO.",
  keywords: [
    "AI visibility tools",
    "AI SEO tools",
    "AI citation tools",
    "entity recognition tools",
    "content optimisation tools",
  ],
  openGraph: {
    title: "AI Tools Directory | GTM Signal Studio",
    description:
      "Curated tools that improve your AI visibility. Tested and rated across all four dimensions.",
    url: "https://gtmsignalstudio.com/tools",
  },
  alternates: {
    canonical: "/tools",
  },
};

export const revalidate = 3600;

export default async function ToolsPage() {
  let tools: Tool[] = [];
  let toolCount = 0;

  try {
    [tools, toolCount] = await Promise.all([
      getPublishedTools(),
      getPublishedToolCount(),
    ]);
  } catch {
    // Supabase not connected
  }

  // Extract unique categories and dimensions for filters
  const categories = [...new Set(tools.map((t) => t.category))].sort();
  const dimensions = [...new Set(tools.flatMap((t) => t.dimensions))].sort();
  const featuredCount = tools.filter((t) => t.is_featured).length;
  const withDiscounts = tools.filter((t) => t.discount_code).length;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "AI Tools Directory",
            description:
              "Curated directory of AI visibility tools, tested and rated by GTM Signal Studio.",
            url: "https://gtmsignalstudio.com/tools",
            publisher: {
              "@type": "Organization",
              name: "GTM Signal Studio",
              url: "https://gtmsignalstudio.com",
            },
          }),
        }}
      />

      <PageHeader
        tagline="AI TOOLS"
        title="Tools that improve your AI visibility."
        subtitle="Every tool here has been tested against real AI platforms. Filtered by the four dimensions of AI visibility so you can find exactly what you need."
        stats={[
          { stat: String(toolCount), label: "Tools Reviewed" },
          { stat: String(featuredCount), label: "Editor's Picks" },
          { stat: String(categories.length), label: "Categories" },
          { stat: String(withDiscounts), label: "With Discounts" },
        ]}
      />

      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AffiliateDisclaimer className="mb-8" />

          {tools.length > 0 ? (
            <ToolsGrid
              tools={tools}
              categories={categories}
              dimensions={dimensions}
            />
          ) : (
            <div className="text-center py-20">
              <p className="font-mono text-orange text-sm mb-4">COMING SOON</p>
              <h2 className="font-heading text-2xl font-bold text-text-dark mb-4">
                We&apos;re testing and rating tools now.
              </h2>
              <p className="text-text-muted max-w-md mx-auto mb-8">
                Our first batch of AI visibility tools is being reviewed. Subscribe
                to get notified when the directory launches.
              </p>
              <Link
                href="/newsletter"
                className="bg-orange hover:bg-orange-hover text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Get Notified
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-dark py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-mono text-orange text-sm mb-4 tracking-wider">
            NOT SURE WHERE TO START?
          </p>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4">
            Find out which dimensions need work first.
          </h2>
          <p className="text-muted mb-8 max-w-xl mx-auto">
            Run a free Citation Scope scan to see where you stand across all four
            AI visibility dimensions. Then come back here to find the right tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="https://score.gtmsignalstudio.com"
              className="bg-orange hover:bg-orange-hover text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Run Free Scan
            </Link>
            <Link
              href="/research/stats"
              className="border border-white/20 text-white hover:bg-white/5 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Browse the data
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
