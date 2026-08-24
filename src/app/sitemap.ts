import { MetadataRoute } from "next";
import { getAllPostSlugs, getAllClusterSlugs, getAllToolSlugs } from "@/lib/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://gtmsignalstudio.com";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/topics`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/ai-visibility`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/research`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/research/ai-visibility-benchmark-2026`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    // The second signal: what the market pays for marketing skills. Priority 1.0 because
    // this is the page built to rank and to be cited.
    { url: `${baseUrl}/research/uk-marketing-careers-2026`, lastModified: new Date(), changeFrequency: "monthly", priority: 1.0 },
    { url: `${baseUrl}/research/stats`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/resources`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/resources/ai-visibility-scorecard`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/resources/ai-citation-signals`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/resources/ai-visibility-playbook`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/tools`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/toolkit`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/resources/tools`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/newsletter`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  // Dynamic blog posts
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const slugs = await getAllPostSlugs();
    blogPages = slugs.map((s) => ({
      url: `${baseUrl}/blog/${s.slug}`,
      lastModified: new Date(s.updated_at),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch {
    // Supabase not connected
  }

  // Dynamic topic cluster pages
  let topicPages: MetadataRoute.Sitemap = [];
  try {
    const clusters = await getAllClusterSlugs();
    topicPages = clusters.map((c) => ({
      url: `${baseUrl}/topics/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    }));
  } catch {
    // Supabase not connected
  }

  // Dynamic tool pages
  let toolPages: MetadataRoute.Sitemap = [];
  try {
    const toolSlugs = await getAllToolSlugs();
    toolPages = toolSlugs.map((t) => ({
      url: `${baseUrl}/tools/${t.slug}`,
      lastModified: new Date(t.updated_at),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch {
    // Supabase not connected
  }

  return [...staticPages, ...topicPages, ...blogPages, ...toolPages];
}
