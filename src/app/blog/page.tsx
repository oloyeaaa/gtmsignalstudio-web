import Link from "next/link";
import { getPublishedPosts } from "@/lib/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Signal-led GTM strategies, cold outreach infrastructure, and B2B pipeline insights from real campaigns — not recycled theory.",
  keywords: ["B2B GTM blog", "signal-led outreach", "go-to-market strategy", "cold email infrastructure", "B2B pipeline insights"],
};

export const revalidate = 3600;

export default async function BlogPage() {
  let posts: Awaited<ReturnType<typeof getPublishedPosts>> = [];

  try {
    posts = await getPublishedPosts(50);
  } catch {
    // Supabase not connected or no posts yet
  }

  const categories = ["All", ...new Set(posts.map((p) => p.category).filter(Boolean))];

  return (
    <div className="bg-cream min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="mb-12">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">BLOG</p>
          <h1 className="font-heading text-4xl font-bold text-text-dark mb-4">
            From the Studio
          </h1>
          <p className="text-text-muted text-lg max-w-2xl">
            Real data from real campaigns. Frameworks you can deploy this week.
            No fluff, no theory, no recycled LinkedIn posts.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <span
              key={cat}
              className={`px-3 py-1 rounded-full text-sm font-mono cursor-pointer transition-colors ${
                cat === "All"
                  ? "bg-orange text-white"
                  : "bg-white border border-light-border text-text-muted hover:text-orange hover:border-orange"
              }`}
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Post grid */}
        {posts.length === 0 ? (
          <div className="bg-white border border-light-border rounded-xl p-12 text-center">
            <p className="text-text-muted text-lg mb-2">No posts yet.</p>
            <p className="text-text-muted text-sm">
              Posts will appear here once migrated to Supabase.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group bg-white border border-light-border rounded-xl overflow-hidden hover:shadow-lg hover:border-orange/30 transition-all"
              >
                {post.featured_image && (
                  <div className="aspect-video bg-cream overflow-hidden">
                    <img
                      src={post.featured_image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono text-orange text-xs">{post.category}</span>
                    {post.reading_time > 0 && (
                      <>
                        <span className="text-light-border">·</span>
                        <span className="text-text-muted text-xs">{post.reading_time} min read</span>
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
                      {new Date(post.published_at).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
