import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getRelatedPosts, getAllPostSlugs } from "@/lib/queries";
import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import FaqAccordion from "@/components/blog/FaqAccordion";
import AuthorCard from "@/components/blog/AuthorCard";

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

  return {
    title: post.title,
    description: post.meta_description || post.excerpt,
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
              { "@type": "ListItem", position: 3, name: post.title },
            ],
          }),
        }}
      />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted mb-8">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>→</span>
          <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
          <span>→</span>
          <span className="text-white truncate max-w-xs">{post.title}</span>
        </nav>

        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-orange text-xs">{post.category}</span>
            {post.reading_time > 0 && (
              <>
                <span className="text-navy-border">·</span>
                <span className="text-muted text-xs">{post.reading_time} min read</span>
              </>
            )}
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-muted">
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
                <span className="text-muted/60">
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
            <img
              src={post.featured_image}
              alt={post.title}
              className="w-full"
            />
          </div>
        )}

        {/* Short Answer (AEO block) */}
        {post.short_answer && (
          <div className="bg-navy-light border border-navy-border rounded-xl p-6 mb-10">
            <p className="font-mono text-orange text-xs mb-2 tracking-wider">SHORT ANSWER</p>
            <p className="text-white leading-relaxed">{post.short_answer}</p>
          </div>
        )}

        {/* Article body */}
        <div className="prose max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeSlug]}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Infographic (mid-post image) */}
        {post.infographic_image && (
          <div className="rounded-xl overflow-hidden my-10">
            <img
              src={post.infographic_image}
              alt={`${post.title} infographic`}
              className="w-full"
            />
          </div>
        )}

        {/* FAQ */}
        {faq.length > 0 && (
          <section className="mt-16 border-t border-navy-border pt-10">
            <h2 className="font-heading text-2xl font-bold text-white mb-6">
              Frequently Asked Questions
            </h2>
            <FaqAccordion items={faq} />
          </section>
        )}

        {/* Author card */}
        <AuthorCard />

        {/* CTA */}
        <section className="mt-12 bg-navy-light border border-navy-border rounded-xl p-8 text-center">
          <h3 className="font-heading text-xl font-bold text-white mb-3">
            Want to know your GTM score?
          </h3>
          <p className="text-muted mb-6">
            Free audit. Scored out of 100. Three things to fix this week.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/audit"
              className="bg-orange hover:bg-orange-hover text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Get Your Free GTM Audit
            </Link>
            <a
              href="https://newsletter.gtmsignalstudio.com"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-navy-border hover:border-muted text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Subscribe to Newsletter
            </a>
          </div>
        </section>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-16">
            <h3 className="font-heading text-xl font-bold text-white mb-6">
              Related Articles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedPosts.map((rp) => (
                <Link
                  key={rp.id}
                  href={`/blog/${rp.slug}`}
                  className="group bg-navy-light border border-navy-border rounded-lg p-4 hover:border-muted transition-colors"
                >
                  <span className="font-mono text-orange text-xs">{rp.category}</span>
                  <h4 className="font-heading font-bold text-white text-sm mt-2 group-hover:text-orange transition-colors leading-tight">
                    {rp.title}
                  </h4>
                  {rp.reading_time && rp.reading_time > 0 && (
                    <p className="text-muted text-xs mt-2">{rp.reading_time} min read</p>
                  )}
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
