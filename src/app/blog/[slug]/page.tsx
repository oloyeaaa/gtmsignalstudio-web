import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getPostBySlug, getRelatedPosts, getAllPostSlugs, getPostCluster, getClusterSiblings } from "@/lib/queries";
import type { Metadata } from "next";
import FaqAccordion from "@/components/blog/FaqAccordion";
import AuthorCard from "@/components/blog/AuthorCard";
import BlogContent from "@/components/blog/BlogContent";
import BlogCTA from "@/components/blog/BlogCTA";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  try {
    const slugs = await getAllPostSlugs();
    return slugs.map((s) => ({ slug: s.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  const titleWords = post.title
    .split(/\s+/)
    .filter((w: string) => w.length > 3)
    .slice(0, 3);
  const keywords = ["B2B GTM", "signal-led outreach", "go-to-market strategy", ...titleWords];

  return {
    title: post.title,
    description: post.meta_description || post.excerpt,
    keywords,
    openGraph: {
      title: post.title,
      description: post.meta_description || post.excerpt,
      type: "article",
      publishedTime: post.published_at,
      modifiedTime: post.updated_at,
      authors: [post.author],
      images: post.featured_image ? [post.featured_image] : [],
    },
    alternates: {
      canonical: `/blog/${slug}`,
    },
  };
}

export const revalidate = 3600;

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const relatedPosts = await getRelatedPosts(post.id, post.category, 3);
  const faq = (post.faq || []) as { question: string; answer: string }[];
  const clusterInfo = await getPostCluster(post.id);
  const siblings = clusterInfo
    ? await getClusterSiblings(post.id, clusterInfo.cluster.id)
    : { prev: null, next: null };

  return (
    <>
      {/* Schema markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.meta_description || post.excerpt,
            author: {
              "@type": "Person",
              name: post.author,
              url: "https://gtmsignalstudio.com/about",
            },
            publisher: {
              "@type": "Organization",
              name: "GTM Signal Studio",
              url: "https://gtmsignalstudio.com",
            },
            datePublished: post.published_at,
            dateModified: post.updated_at,
            mainEntityOfPage: `https://gtmsignalstudio.com/blog/${slug}`,
            image: post.featured_image || undefined,
          }),
        }}
      />

      {/* FAQ Schema */}
      {faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faq.map((f) => ({
                "@type": "Question",
                name: f.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: f.answer,
                },
              })),
            }),
          }}
        />
      )}

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://gtmsignalstudio.com" },
              { "@type": "ListItem", position: 2, name: "Blog", item: "https://gtmsignalstudio.com/blog" },
              ...(clusterInfo
                ? [{ "@type": "ListItem", position: 3, name: clusterInfo.cluster.name, item: `https://gtmsignalstudio.com/topics/${clusterInfo.cluster.slug}` }]
                : []),
              { "@type": "ListItem", position: clusterInfo ? 4 : 3, name: post.title },
            ],
          }),
        }}
      />

      <article className="bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Breadcrumb — cluster-aware */}
          <nav className="flex items-center gap-2 text-sm text-text-muted mb-8 flex-wrap">
            <Link href="/" className="hover:text-orange transition-colors">Home</Link>
            <span>→</span>
            <Link href="/blog" className="hover:text-orange transition-colors">Blog</Link>
            {clusterInfo && (
              <>
                <span>→</span>
                <Link href={`/topics/${clusterInfo.cluster.slug}`} className="hover:text-orange transition-colors">
                  {clusterInfo.cluster.name}
                </Link>
              </>
            )}
            <span>→</span>
            <span className="text-text-dark truncate max-w-xs">{post.title}</span>
          </nav>

          {/* Topic banner */}
          {clusterInfo && (
            <Link
              href={`/topics/${clusterInfo.cluster.slug}`}
              className="flex items-center gap-2 bg-cream border border-light-border rounded-lg px-4 py-2.5 mb-8 text-sm hover:border-orange/30 transition-colors group"
            >
              <span className="text-orange font-mono text-xs">TOPIC</span>
              <span className="text-text-body group-hover:text-orange transition-colors">
                Part of the <strong className="text-text-dark">{clusterInfo.cluster.name}</strong> guide
              </span>
              <span className="text-text-muted group-hover:text-orange ml-auto">→</span>
            </Link>
          )}

          {/* Header */}
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-orange text-xs">{post.category}</span>
              {post.reading_time > 0 && (
                <>
                  <span className="text-light-border">·</span>
                  <span className="text-text-muted text-xs">{post.reading_time} min read</span>
                </>
              )}
            </div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-text-dark leading-tight mb-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-text-muted">
              <span>{post.author}</span>
              {post.published_at && (
                <>
                  <span>·</span>
                  <time dateTime={post.published_at}>
                    {new Date(post.published_at).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </time>
                </>
              )}
              {post.updated_at && post.updated_at !== post.published_at && (
                <>
                  <span>·</span>
                  <span className="text-text-muted/60">
                    Updated{" "}
                    {new Date(post.updated_at).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </>
              )}
            </div>
          </header>

          {/* Featured image */}
          {post.featured_image && (
            <div className="rounded-xl overflow-hidden mb-10">
              <Image
                src={post.featured_image}
                alt={post.title}
                width={1200}
                height={630}
                className="w-full"
                priority
              />
            </div>
          )}

          {/* Short Answer (AEO block) */}
          {post.short_answer && (
            <div className="bg-cream border border-light-border rounded-xl p-6 mb-10">
              <p className="font-mono text-orange text-xs mb-2 tracking-wider">SHORT ANSWER</p>
              <p className="text-text-body leading-relaxed">{post.short_answer}</p>
            </div>
          )}

          {/* Article body */}
          <BlogContent content={post.content} />

          {/* Infographic (mid-post image) */}
          {post.infographic_image && (
            <div className="rounded-xl overflow-hidden my-10">
              <Image
                src={post.infographic_image}
                alt={`${post.title} infographic`}
                width={1200}
                height={630}
                className="w-full"
              />
            </div>
          )}

          {/* FAQ */}
          {faq.length > 0 && (
            <section className="mt-16 border-t border-light-border pt-10">
              <h2 className="font-heading text-2xl font-bold text-text-dark mb-6">
                Frequently Asked Questions
              </h2>
              <FaqAccordion items={faq} />
            </section>
          )}

          {/* Author card */}
          <AuthorCard />
        </div>

        {/* Cluster sibling navigation */}
        {clusterInfo && (siblings.prev || siblings.next) && (
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-light-border">
            <p className="font-mono text-orange text-xs mb-4 tracking-wider">
              CONTINUE IN {clusterInfo.cluster.name.toUpperCase()}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {siblings.prev && (
                <Link
                  href={`/blog/${siblings.prev.slug}`}
                  className="group bg-cream border border-light-border rounded-lg p-4 hover:border-orange/30 transition-all"
                >
                  <span className="text-text-muted text-xs">← Previous</span>
                  <p className="font-heading font-bold text-text-dark text-sm mt-1 group-hover:text-orange transition-colors leading-tight">
                    {siblings.prev.title}
                  </p>
                </Link>
              )}
              {siblings.next && (
                <Link
                  href={`/blog/${siblings.next.slug}`}
                  className="group bg-cream border border-light-border rounded-lg p-4 hover:border-orange/30 transition-all sm:text-right"
                >
                  <span className="text-text-muted text-xs">Next →</span>
                  <p className="font-heading font-bold text-text-dark text-sm mt-1 group-hover:text-orange transition-colors leading-tight">
                    {siblings.next.title}
                  </p>
                </Link>
              )}
            </div>
          </div>
        )}

        {/* CTA — dark section */}
        <BlogCTA />

        {/* Related posts — cream */}
        {relatedPosts.length > 0 && (
          <div className="bg-cream py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <h3 className="font-heading text-xl font-bold text-text-dark mb-6">
                Related Articles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {relatedPosts.map((rp) => (
                  <Link
                    key={rp.id}
                    href={`/blog/${rp.slug}`}
                    className="group bg-white border border-light-border rounded-lg p-4 hover:border-orange/30 hover:shadow transition-all"
                  >
                    <span className="font-mono text-orange text-xs">{rp.category}</span>
                    <h4 className="font-heading font-bold text-text-dark text-sm mt-2 group-hover:text-orange transition-colors leading-tight">
                      {rp.title}
                    </h4>
                    {rp.reading_time && rp.reading_time > 0 && (
                      <p className="text-text-muted text-xs mt-2">{rp.reading_time} min read</p>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </article>
    </>
  );
}
