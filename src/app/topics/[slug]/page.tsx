import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getTopicClusterBySlug,
  getClusterPosts,
  getAllClusterSlugs,
} from "@/lib/queries";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  try {
    const slugs = await getAllClusterSlugs();
    return slugs.map((s) => ({ slug: s.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cluster = await getTopicClusterBySlug(slug);
  if (!cluster) return { title: "Topic Not Found" };

  return {
    title: cluster.name,
    description: cluster.description,
    openGraph: {
      title: `${cluster.name} — GTM Signal Studio`,
      description: cluster.description,
      type: "website",
    },
    alternates: {
      canonical: `/topics/${slug}`,
    },
  };
}

export const revalidate = 3600;

export default async function TopicPage({ params }: Props) {
  const { slug } = await params;
  const cluster = await getTopicClusterBySlug(slug);
  if (!cluster) notFound();

  const posts = await getClusterPosts(cluster.id);
  const pillarPost = posts.find((p) => p.is_pillar);
  const otherPosts = posts.filter((p) => !p.is_pillar);

  return (
    <>
      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: cluster.name,
            description: cluster.description,
            url: `https://gtmsignalstudio.com/topics/${slug}`,
            publisher: { "@id": "https://gtmsignalstudio.com/#organization" },
            hasPart: posts.map((p) => ({
              "@type": "Article",
              headline: p.title,
              url: `https://gtmsignalstudio.com/blog/${p.slug}`,
            })),
          }),
        }}
      />

      {/* Hero — dark */}
      <section className="bg-navy">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <nav className="flex items-center gap-2 text-sm text-white/40 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>→</span>
            <Link href="/topics" className="hover:text-white transition-colors">Topics</Link>
            <span>→</span>
            <span className="text-white">{cluster.name}</span>
          </nav>

          <p className="font-mono text-orange text-sm mb-4 tracking-wider">
            {posts.length} ARTICLES IN THIS TOPIC
          </p>
          <h1 className="font-heading text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {cluster.name}
          </h1>
          <p className="text-white/60 text-lg max-w-2xl leading-relaxed">
            {cluster.description}
          </p>
        </div>
      </section>

      {/* Pillar post highlight — white */}
      {pillarPost && (
        <section className="bg-white border-b border-light-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <p className="font-mono text-orange text-xs mb-4 tracking-wider">START HERE</p>
            <Link
              href={`/blog/${pillarPost.slug}`}
              className="group block bg-cream border border-light-border rounded-xl p-8 hover:shadow-lg hover:border-orange/30 transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-orange text-white text-xs font-mono px-2 py-1 rounded">
                  PILLAR ARTICLE
                </span>
                {pillarPost.reading_time && pillarPost.reading_time > 0 && (
                  <span className="text-text-muted text-xs">{pillarPost.reading_time} min read</span>
                )}
              </div>
              <h2 className="font-heading text-2xl font-bold text-text-dark group-hover:text-orange transition-colors mb-3">
                {pillarPost.title}
              </h2>
              {pillarPost.excerpt && (
                <p className="text-text-muted leading-relaxed">{pillarPost.excerpt}</p>
              )}
            </Link>
          </div>
        </section>
      )}

      {/* Other posts in reading order — cream */}
      <section className="bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="font-heading text-xl font-bold text-text-dark mb-6">
            Continue reading
          </h2>
          <div className="space-y-4">
            {otherPosts.map((post, idx) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group flex items-start gap-5 bg-white border border-light-border rounded-xl p-6 hover:shadow hover:border-orange/30 transition-all"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-cream border border-light-border flex items-center justify-center">
                  <span className="font-mono text-sm text-text-muted font-bold">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading font-bold text-text-dark group-hover:text-orange transition-colors leading-tight mb-1">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="text-text-muted text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>
                  )}
                  <div className="flex items-center gap-3 mt-2">
                    {post.reading_time && post.reading_time > 0 && (
                      <span className="text-text-muted/60 text-xs">{post.reading_time} min read</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — dark */}
      <section className="bg-navy">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="font-heading text-2xl font-bold text-white mb-4">
            Want to see how your GTM stacks up?
          </h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto">
            Free audit. Scored out of 100. Three things to fix this week.
          </p>
          <Link
            href={cluster.cta_url || "/audit"}
            className="inline-block bg-orange hover:bg-orange-hover text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            {cluster.cta_text || "Get Your Free GTM Audit"}
          </Link>
        </div>
      </section>
    </>
  );
}
