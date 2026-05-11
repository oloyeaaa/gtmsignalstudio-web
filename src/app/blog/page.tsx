import Link from "next/link";
import Image from "next/image";
import { getPublishedPosts, getPublishedPostCount } from "@/lib/queries";
import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Blog | Enterprise Marketing, AI Visibility, Signal-Led GTM",
  description:
    "Enterprise marketing insights from real campaigns. AI visibility, MarTech, automation, and signal-led GTM. Research-backed. No fluff.",
  keywords: [
    "enterprise marketing blog",
    "AI visibility",
    "signal-led GTM",
    "B2B marketing insights",
    "MarTech",
  ],
  alternates: { canonical: "/blog" },
};

export const revalidate = 3600;

const POSTS_PER_PAGE = 6;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Math.max(1, parseInt(params.page || "1", 10));
  const offset = (currentPage - 1) * POSTS_PER_PAGE;

  let posts: Awaited<ReturnType<typeof getPublishedPosts>> = [];
  let totalPosts = 0;

  try {
    [posts, totalPosts] = await Promise.all([
      getPublishedPosts(POSTS_PER_PAGE, offset),
      getPublishedPostCount(),
    ]);
  } catch {
    // Supabase not connected or no posts yet
  }

  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  return (
    <>
      <PageHeader tagline="BLOG" title="From the Studio" subtitle="Enterprise marketing insights from real campaigns. Research-backed. No fluff." />

    <div className="bg-cream min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Post grid */}
        {posts.length === 0 ? (
          <div className="bg-white border border-light-border rounded-xl p-12 text-center">
            <p className="text-text-muted text-lg mb-2">No posts yet.</p>
            <p className="text-text-muted text-sm">
              Posts will appear here once published.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group bg-white border border-light-border rounded-xl overflow-hidden hover:shadow-lg hover:border-orange/30 transition-all"
                >
                  {post.featured_image && (
                    <div className="aspect-video bg-cream overflow-hidden">
                      <Image
                        src={post.featured_image}
                        alt={post.title}
                        width={600}
                        height={338}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-mono text-orange text-xs">
                        {post.category}
                      </span>
                      {post.reading_time > 0 && (
                        <>
                          <span className="text-light-border">&middot;</span>
                          <span className="text-text-muted text-xs">
                            {post.reading_time} min read
                          </span>
                        </>
                      )}
                    </div>

                    <h2 className="font-heading font-bold text-text-dark text-lg mb-2 group-hover:text-orange transition-colors leading-tight">
                      {post.title}
                    </h2>

                    {post.excerpt && (
                      <p className="text-text-muted text-sm leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}

                    {post.published_at && (
                      <p className="text-text-muted/50 text-xs mt-4 font-mono">
                        {new Date(post.published_at).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <nav className="mt-12 flex items-center justify-center gap-2">
                {currentPage > 1 && (
                  <Link
                    href={
                      currentPage === 2
                        ? "/blog"
                        : `/blog?page=${currentPage - 1}`
                    }
                    className="px-4 py-2 rounded-lg border border-light-border text-text-dark hover:border-orange transition-colors text-sm font-semibold"
                  >
                    &larr; Previous
                  </Link>
                )}

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <Link
                      key={page}
                      href={page === 1 ? "/blog" : `/blog?page=${page}`}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-semibold transition-colors ${
                        page === currentPage
                          ? "bg-orange text-white"
                          : "border border-light-border text-text-dark hover:border-orange"
                      }`}
                    >
                      {page}
                    </Link>
                  )
                )}

                {currentPage < totalPages && (
                  <Link
                    href={`/blog?page=${currentPage + 1}`}
                    className="px-4 py-2 rounded-lg border border-light-border text-text-dark hover:border-orange transition-colors text-sm font-semibold"
                  >
                    Next &rarr;
                  </Link>
                )}
              </nav>
            )}

            {/* Page indicator */}
            {totalPages > 1 && (
              <p className="text-center text-text-muted text-xs mt-4 font-mono">
                Page {currentPage} of {totalPages} &middot; {totalPosts} posts
              </p>
            )}
          </>
        )}
      </div>
    </div>
    </>
  );
}
