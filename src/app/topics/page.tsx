import Link from "next/link";
import { getAllTopicClusters, getClusterPostCount } from "@/lib/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Topics",
  description:
    "Explore signal-led GTM topics: ICP definition, buying signals, cold email infrastructure, outreach tactics, and build-in-public stories.",
};

export const revalidate = 3600;

export default async function TopicsPage() {
  let clusters: Awaited<ReturnType<typeof getAllTopicClusters>> = [];
  const counts: Record<string, number> = {};

  try {
    clusters = await getAllTopicClusters();
    for (const c of clusters) {
      counts[c.id] = await getClusterPostCount(c.id);
    }
  } catch {
    // Supabase not connected
  }

  return (
    <div className="bg-cream min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">TOPICS</p>
          <h1 className="font-heading text-4xl font-bold text-text-dark mb-4">
            Learn signal-led GTM by topic.
          </h1>
          <p className="text-text-muted text-lg max-w-2xl">
            Each topic is a structured guide — start with the pillar article, then work through
            the supporting posts in order. Built from real campaigns, not theory.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {clusters.map((cluster) => (
            <Link
              key={cluster.id}
              href={`/topics/${cluster.slug}`}
              className="group bg-white border border-light-border rounded-xl p-8 hover:shadow-lg hover:border-orange/30 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-orange text-xs tracking-wider">
                  {(counts[cluster.id] || 0)} ARTICLES
                </span>
                <span className="text-text-muted group-hover:text-orange transition-colors">→</span>
              </div>
              <h2 className="font-heading text-xl font-bold text-text-dark mb-3 group-hover:text-orange transition-colors">
                {cluster.name}
              </h2>
              <p className="text-text-muted text-sm leading-relaxed">
                {cluster.description}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "GTM Signal Studio Topics",
            description: "Structured guides on signal-led go-to-market topics.",
            url: "https://gtmsignalstudio.com/topics",
            publisher: { "@id": "https://gtmsignalstudio.com/#organization" },
          }),
        }}
      />
    </div>
  );
}
