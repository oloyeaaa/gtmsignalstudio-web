import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  getToolBySlug,
  getAllToolSlugs,
  getToolReviewPosts,
  getRelatedTools,
} from "@/lib/queries";
import { getToolLogoUrl, getToolInitial, formatPricingModel, formatDimension } from "@/lib/utils";
import AffiliateDisclaimer from "@/components/tools/AffiliateDisclaimer";
import ToolCard from "@/components/tools/ToolCard";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  try {
    const slugs = await getAllToolSlugs();
    return slugs.map((s) => ({ slug: s.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = await getToolBySlug(slug);
  if (!tool) return { title: "Tool Not Found" };

  return {
    title: tool.meta_title || `${tool.name} Review`,
    description: tool.meta_description || tool.tagline,
    keywords: [
      tool.name,
      "AI visibility tool",
      ...tool.dimensions.map((d) => `${formatDimension(d)} tool`),
    ],
    openGraph: {
      title: `${tool.name} Review | GTM Signal Studio`,
      description: tool.meta_description || tool.tagline,
      url: `https://gtmsignalstudio.com/tools/${slug}`,
    },
    alternates: {
      canonical: `/tools/${slug}`,
    },
  };
}

export const revalidate = 3600;

export default async function ToolDetailPage({ params }: Props) {
  const { slug } = await params;
  const tool = await getToolBySlug(slug);
  if (!tool) notFound();

  const [reviewPosts, relatedTools] = await Promise.all([
    getToolReviewPosts(tool.slug),
    getRelatedTools(tool.slug, tool.dimensions),
  ]);

  const logo = getToolLogoUrl(tool);
  const outboundUrl = tool.affiliate_url || tool.website_url;

  return (
    <>
      {/* Schema markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: tool.name,
            description: tool.description,
            url: tool.website_url,
            applicationCategory: "BusinessApplication",
            ...(tool.gss_rating && {
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: tool.gss_rating,
                bestRating: 5,
                ratingCount: 1,
              },
            }),
            offers: {
              "@type": "Offer",
              price: tool.price_from || "0",
              priceCurrency: "GBP",
            },
          }),
        }}
      />

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://gtmsignalstudio.com" },
              { "@type": "ListItem", position: 2, name: "AI Tools", item: "https://gtmsignalstudio.com/tools" },
              { "@type": "ListItem", position: 3, name: tool.name },
            ],
          }),
        }}
      />

      {/* Hero */}
      <section className="section-dark py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/tools"
            className="text-orange font-mono text-sm hover:underline mb-6 inline-block"
          >
            &larr; All Tools
          </Link>

          <div className="flex items-start gap-5 mb-6">
            <div className="w-16 h-16 rounded-xl bg-white/10 border border-navy-border flex items-center justify-center overflow-hidden flex-shrink-0">
              <Image
                src={logo.src}
                alt={`${tool.name} logo`}
                width={64}
                height={64}
                className="w-full h-full object-contain p-2"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = "none";
                  const parent = target.parentElement;
                  if (parent) {
                    const fallback = document.createElement("span");
                    fallback.className = "text-orange font-heading font-bold text-2xl";
                    fallback.textContent = getToolInitial(tool.name);
                    parent.appendChild(fallback);
                  }
                }}
              />
            </div>
            <div>
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-white leading-tight">
                {tool.name}
              </h1>
              <p className="text-muted text-lg mt-1">{tool.tagline}</p>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
            {tool.gss_rating && (
              <div className="bg-navy-light border border-navy-border rounded-xl p-4 text-center">
                <p className="text-orange font-heading text-xl font-bold">
                  {"★".repeat(tool.gss_rating)}
                </p>
                <p className="text-muted text-xs mt-1">GSS Rating</p>
              </div>
            )}
            <div className="bg-navy-light border border-navy-border rounded-xl p-4 text-center">
              <p className="text-orange font-heading text-xl font-bold">
                {formatPricingModel(tool.pricing_model)}
              </p>
              <p className="text-muted text-xs mt-1">
                {tool.price_from || "Pricing"}
              </p>
            </div>
            <div className="bg-navy-light border border-navy-border rounded-xl p-4 text-center">
              <p className="text-orange font-heading text-xl font-bold capitalize">
                {tool.category}
              </p>
              <p className="text-muted text-xs mt-1">Category</p>
            </div>
            <div className="bg-navy-light border border-navy-border rounded-xl p-4 text-center">
              <p className="text-orange font-heading text-xl font-bold">
                {tool.dimensions.length}
              </p>
              <p className="text-muted text-xs mt-1">Dimensions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="bg-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Dimensions */}
          <div className="flex flex-wrap gap-2 mb-8">
            {tool.dimensions.map((d) => (
              <span
                key={d}
                className="text-sm font-mono bg-navy/5 text-navy px-3 py-1 rounded-lg"
              >
                {formatDimension(d)}
              </span>
            ))}
          </div>

          {/* Description */}
          <div className="prose max-w-none mb-10">
            <p className="text-text-body text-lg leading-relaxed whitespace-pre-line">
              {tool.description}
            </p>
          </div>

          {/* Best for */}
          {tool.best_for && (
            <div className="bg-cream border border-light-border rounded-xl p-6 mb-8">
              <p className="font-mono text-orange text-xs mb-2 tracking-wider">BEST FOR</p>
              <p className="text-text-body">{tool.best_for}</p>
            </div>
          )}

          {/* Pros & Cons */}
          {(tool.pros.length > 0 || tool.cons.length > 0) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              {tool.pros.length > 0 && (
                <div className="bg-white border border-light-border rounded-xl p-6">
                  <p className="font-mono text-xs text-success mb-3 tracking-wider">PROS</p>
                  <ul className="space-y-2">
                    {tool.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-2 text-text-body text-sm">
                        <span className="text-success mt-0.5">+</span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {tool.cons.length > 0 && (
                <div className="bg-white border border-light-border rounded-xl p-6">
                  <p className="font-mono text-xs text-danger mb-3 tracking-wider">CONS</p>
                  <ul className="space-y-2">
                    {tool.cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-2 text-text-body text-sm">
                        <span className="text-danger mt-0.5">-</span>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Use cases */}
          {tool.use_cases.length > 0 && (
            <div className="mb-10">
              <h2 className="font-heading text-xl font-bold text-text-dark mb-4">Use Cases</h2>
              <div className="flex flex-wrap gap-2">
                {tool.use_cases.map((uc) => (
                  <span
                    key={uc}
                    className="bg-cream text-text-body text-sm px-3 py-1.5 rounded-lg border border-light-border"
                  >
                    {uc}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Discount */}
          {tool.discount_code && (
            <div className="bg-orange/5 border border-orange/20 rounded-xl p-6 mb-10">
              <p className="font-mono text-orange text-xs mb-2 tracking-wider">EXCLUSIVE DISCOUNT</p>
              <p className="text-text-dark font-bold text-lg mb-1">
                {tool.discount_description || "Special offer available"}
              </p>
              <p className="text-text-muted text-sm mb-3">
                Use code <code className="bg-white px-2 py-0.5 rounded text-orange font-mono border border-light-border">{tool.discount_code}</code> at checkout.
              </p>
              <a
                href={outboundUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-orange hover:bg-orange-hover text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors"
              >
                Claim Discount →
              </a>
            </div>
          )}

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <a
              href={outboundUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-orange hover:bg-orange-hover text-white px-6 py-3 rounded-lg font-semibold text-center transition-colors"
            >
              Visit {tool.name} →
            </a>
            <a
              href={tool.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-light-border text-text-body hover:border-orange/30 px-6 py-3 rounded-lg font-semibold text-center transition-colors"
            >
              Official Website
            </a>
          </div>

          <AffiliateDisclaimer />

          {/* Review posts */}
          {reviewPosts.length > 0 && (
            <section className="mt-16 border-t border-light-border pt-10">
              <h2 className="font-heading text-xl font-bold text-text-dark mb-6">
                Our Reviews & Guides
              </h2>
              <div className="space-y-4">
                {reviewPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group flex items-start gap-4 p-4 bg-cream rounded-lg border border-light-border hover:border-orange/30 transition-all"
                  >
                    <div className="min-w-0">
                      <p className="font-mono text-orange text-xs">{post.category}</p>
                      <h3 className="font-heading font-bold text-text-dark group-hover:text-orange transition-colors text-sm mt-1 leading-tight">
                        {post.title}
                      </h3>
                      {post.reading_time && post.reading_time > 0 && (
                        <p className="text-text-muted text-xs mt-1">{post.reading_time} min read</p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </section>

      {/* Related tools */}
      {relatedTools.length > 0 && (
        <section className="bg-cream py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-xl font-bold text-text-dark mb-6">
              Similar Tools
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedTools.map((t) => (
                <ToolCard key={t.id} tool={t} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
