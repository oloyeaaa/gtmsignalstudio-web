import { supabase } from "./supabase";

export type Post = {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  meta_description: string;
  short_answer: string;
  category: string;
  tags: string[];
  schema_markup: Record<string, unknown>;
  faq: { question: string; answer: string }[];
  featured_image: string;
  infographic_image: string;
  og_image: string;
  status: string;
  author: string;
  published_at: string;
  reading_time: number;
  related_posts: string[];
  created_at: string;
  updated_at: string;
};

export type Page = {
  id: string;
  title: string;
  slug: string;
  content: string;
  meta_description: string;
  template: string;
  schema_markup: Record<string, unknown>;
};

// ---- POSTS ----

export async function getPublishedPostCount() {
  try {
    const { count, error } = await supabase
      .from("posts")
      .select("*", { count: "exact", head: true })
      .eq("status", "published");

    if (error) return 0;
    return count ?? 0;
  } catch {
    return 0;
  }
}

export async function getPublishedPosts(limit = 50, offset = 0) {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error || !data) return [];
    return data as Post[];
  } catch {
    return [];
  }
}

export async function getPostBySlug(slug: string) {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .single();

    if (error) return null;
    return data as Post;
  } catch {
    return null;
  }
}

export async function getPostsByCategory(category: string, limit = 20) {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("status", "published")
      .eq("category", category)
      .order("published_at", { ascending: false })
      .limit(limit);

    if (error || !data) return [];
    return data as Post[];
  } catch {
    return [];
  }
}

export async function getRelatedPosts(postId: string, category: string, limit = 3) {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("id, title, slug, excerpt, category, published_at, reading_time, featured_image")
      .eq("status", "published")
      .eq("category", category)
      .neq("id", postId)
      .order("published_at", { ascending: false })
      .limit(limit);

    if (error || !data) return [];
    return data as Partial<Post>[];
  } catch {
    return [];
  }
}

export async function searchPosts(query: string, limit = 20) {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("status", "published")
      .textSearch("fts", query, { type: "websearch" })
      .limit(limit);

    if (error || !data) return [];
    return data as Post[];
  } catch {
    return [];
  }
}

export async function getAllPostSlugs() {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("slug, updated_at")
      .eq("status", "published");

    if (error || !data) return [];
    return data as { slug: string; updated_at: string }[];
  } catch {
    return [];
  }
}

export async function getRecentPosts(limit = 3) {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("id, title, slug, excerpt, category, published_at, reading_time, featured_image")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(limit);

    if (error || !data) return [];
    return data as Partial<Post>[];
  } catch {
    return [];
  }
}

// ---- TOPIC CLUSTERS ----

export type AuthorityLink = {
  title: string;
  url: string;
  source: string;
};

export type TopicCluster = {
  id: string;
  name: string;
  slug: string;
  description: string;
  hero_image: string;
  cta_text: string;
  cta_url: string;
  pillar_post_id: string;
  authority_links: AuthorityLink[];
};

export type ClusterPost = {
  cluster_id: string;
  post_id: string;
  sort_order: number;
  is_pillar: boolean;
};

export async function getAllTopicClusters() {
  try {
    const { data, error } = await supabase
      .from("topic_clusters")
      .select("*")
      .order("name");

    if (error || !data) return [];
    return data as TopicCluster[];
  } catch {
    return [];
  }
}

export async function getTopicClusterBySlug(slug: string) {
  try {
    const { data, error } = await supabase
      .from("topic_clusters")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) return null;
    return data as TopicCluster;
  } catch {
    return null;
  }
}

export async function getAllClusterSlugs() {
  try {
    const { data, error } = await supabase
      .from("topic_clusters")
      .select("slug");

    if (error || !data) return [];
    return data as { slug: string }[];
  } catch {
    return [];
  }
}

export async function getClusterPosts(clusterId: string) {
  try {
    const { data, error } = await supabase
      .from("cluster_posts")
      .select("post_id, sort_order, is_pillar")
      .eq("cluster_id", clusterId)
      .order("sort_order");

    if (error || !data) return [];

    const posts: (Partial<Post> & { sort_order: number; is_pillar: boolean })[] = [];
    for (const cp of data) {
      const { data: post } = await supabase
        .from("posts")
        .select("id, title, slug, excerpt, category, published_at, reading_time, featured_image")
        .eq("id", cp.post_id)
        .single();

      if (post) {
        posts.push({ ...post, sort_order: cp.sort_order, is_pillar: cp.is_pillar });
      }
    }

    return posts;
  } catch {
    return [];
  }
}

export async function getClusterPostCount(clusterId: string) {
  try {
    const { data, error } = await supabase
      .from("cluster_posts")
      .select("post_id")
      .eq("cluster_id", clusterId);

    if (error || !data) return 0;
    return data.length;
  } catch {
    return 0;
  }
}

export async function getPostCluster(postId: string) {
  try {
    const { data, error } = await supabase
      .from("cluster_posts")
      .select("cluster_id, sort_order, is_pillar")
      .eq("post_id", postId)
      .limit(1)
      .maybeSingle();

    if (error || !data) return null;

    const { data: cluster } = await supabase
      .from("topic_clusters")
      .select("*")
      .eq("id", data.cluster_id)
      .single();

    if (!cluster) return null;

    return {
      cluster: cluster as TopicCluster,
      sort_order: data.sort_order,
      is_pillar: data.is_pillar,
    };
  } catch {
    return null;
  }
}

export async function getClusterSiblings(postId: string, clusterId: string) {
  try {
    const { data, error } = await supabase
      .from("cluster_posts")
      .select("post_id, sort_order")
      .eq("cluster_id", clusterId)
      .order("sort_order");

    if (error || !data) return { prev: null, next: null };

    const currentIdx = data.findIndex((d) => d.post_id === postId);
    if (currentIdx === -1) return { prev: null, next: null };

    const prevId = currentIdx > 0 ? data[currentIdx - 1].post_id : null;
    const nextId = currentIdx < data.length - 1 ? data[currentIdx + 1].post_id : null;

    const fetchPost = async (id: string | null) => {
      if (!id) return null;
      try {
        const { data: post } = await supabase
          .from("posts")
          .select("id, title, slug")
          .eq("id", id)
          .single();
        return post as { id: string; title: string; slug: string } | null;
      } catch {
        return null;
      }
    };

    return {
      prev: await fetchPost(prevId),
      next: await fetchPost(nextId),
    };
  } catch {
    return { prev: null, next: null };
  }
}

// ---- STATS ----

export type StatCategory = {
  id: string;
  title: string;
  description: string;
  sort_order: number;
  is_gss: boolean;
  status: string;
};

export type Stat = {
  id: string;
  slug: string;
  stat_value: string;
  label: string;
  category: string;
  source: string;
  source_url: string | null;
  source_type: "gss-original" | "gss-aggregate" | "external";
  year: string;
  sample: string | null;
  sector: string | null;
  metric_type: string | null;
  tags: string[];
  methodology_note: string | null;
  is_featured: boolean;
  sort_order: number;
  auto_generated: boolean;
  status: string;
  computed_at: string | null;
  published_at: string;
  created_at: string;
  updated_at: string;
};

export async function getStatCategories() {
  try {
    const { data, error } = await supabase
      .from("stat_categories")
      .select("*")
      .eq("status", "published")
      .order("sort_order");

    if (error || !data) return [];
    return data as StatCategory[];
  } catch {
    return [];
  }
}

export async function getPublishedStats() {
  try {
    const { data, error } = await supabase
      .from("stats")
      .select("*")
      .eq("status", "published")
      .order("sort_order");

    if (error || !data) return [];
    return data as Stat[];
  } catch {
    return [];
  }
}

export async function getStatsByCategory(categoryId: string) {
  try {
    const { data, error } = await supabase
      .from("stats")
      .select("*")
      .eq("status", "published")
      .eq("category", categoryId)
      .order("sort_order");

    if (error || !data) return [];
    return data as Stat[];
  } catch {
    return [];
  }
}

export async function getFeaturedStats(limit = 6) {
  try {
    const { data, error } = await supabase
      .from("stats")
      .select("*")
      .eq("status", "published")
      .eq("is_featured", true)
      .order("sort_order")
      .limit(limit);

    if (error || !data) return [];
    return data as Stat[];
  } catch {
    return [];
  }
}

export async function getStatsBySector(sector: string) {
  try {
    const { data, error } = await supabase
      .from("stats")
      .select("*")
      .eq("status", "published")
      .eq("sector", sector)
      .order("sort_order");

    if (error || !data) return [];
    return data as Stat[];
  } catch {
    return [];
  }
}

export async function getStatsByTags(tags: string[]) {
  try {
    const { data, error } = await supabase
      .from("stats")
      .select("*")
      .eq("status", "published")
      .overlaps("tags", tags)
      .order("sort_order");

    if (error || !data) return [];
    return data as Stat[];
  } catch {
    return [];
  }
}

export async function getPublishedStatCount() {
  try {
    const { count, error } = await supabase
      .from("stats")
      .select("*", { count: "exact", head: true })
      .eq("status", "published");

    if (error) return 0;
    return count ?? 0;
  } catch {
    return 0;
  }
}

// ---- STAT HISTORY ----

export type StatHistoryEntry = {
  id: string;
  stat_slug: string;
  stat_value: string;
  label: string;
  edition: string | null;
  sample: string | null;
  recorded_at: string;
};

export async function getStatHistory(slug: string, limit = 20) {
  try {
    const { data, error } = await supabase
      .from("stat_history")
      .select("*")
      .eq("stat_slug", slug)
      .order("recorded_at", { ascending: true })
      .limit(limit);

    if (error || !data) return [];
    return data as StatHistoryEntry[];
  } catch {
    return [];
  }
}

export async function getStatTrend(metricType: string, limit = 10) {
  try {
    const { data, error } = await supabase
      .from("stat_history")
      .select("stat_slug, stat_value, edition, recorded_at")
      .like("stat_slug", `%-${metricType}`)
      .order("recorded_at", { ascending: true })
      .limit(limit);

    if (error || !data) return [];
    return data as Partial<StatHistoryEntry>[];
  } catch {
    return [];
  }
}

// ---- TOOLS ----

export type Tool = {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  website_url: string;
  affiliate_url: string | null;
  discount_code: string | null;
  discount_description: string | null;
  logo_url: string | null;
  domain: string;
  category: string;
  dimensions: string[];
  use_cases: string[];
  pricing_model: string;
  price_from: string | null;
  gss_rating: number | null;
  pros: string[];
  cons: string[];
  best_for: string | null;
  meta_title: string | null;
  meta_description: string | null;
  is_featured: boolean;
  sort_order: number;
  status: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export async function getPublishedTools() {
  try {
    const { data, error } = await supabase
      .from("tools")
      .select("*")
      .eq("status", "published")
      .order("sort_order");

    if (error || !data) return [];
    return data as Tool[];
  } catch {
    return [];
  }
}

export async function getToolBySlug(slug: string) {
  try {
    const { data, error } = await supabase
      .from("tools")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .single();

    if (error) return null;
    return data as Tool;
  } catch {
    return null;
  }
}

export async function getFeaturedTools(limit = 6) {
  try {
    const { data, error } = await supabase
      .from("tools")
      .select("*")
      .eq("status", "published")
      .eq("is_featured", true)
      .order("sort_order")
      .limit(limit);

    if (error || !data) return [];
    return data as Tool[];
  } catch {
    return [];
  }
}

export async function getToolsByCategory(category: string) {
  try {
    const { data, error } = await supabase
      .from("tools")
      .select("*")
      .eq("status", "published")
      .eq("category", category)
      .order("sort_order");

    if (error || !data) return [];
    return data as Tool[];
  } catch {
    return [];
  }
}

export async function getToolsByDimension(dimension: string) {
  try {
    const { data, error } = await supabase
      .from("tools")
      .select("*")
      .eq("status", "published")
      .contains("dimensions", [dimension])
      .order("sort_order");

    if (error || !data) return [];
    return data as Tool[];
  } catch {
    return [];
  }
}

export async function getAllToolSlugs() {
  try {
    const { data, error } = await supabase
      .from("tools")
      .select("slug, updated_at")
      .eq("status", "published");

    if (error || !data) return [];
    return data as { slug: string; updated_at: string }[];
  } catch {
    return [];
  }
}

export async function getToolReviewPosts(toolSlug: string, limit = 5) {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("id, title, slug, excerpt, category, published_at, reading_time, featured_image")
      .eq("status", "published")
      .eq("tool_slug", toolSlug)
      .order("published_at", { ascending: false })
      .limit(limit);

    if (error || !data) return [];
    return data as Partial<Post>[];
  } catch {
    return [];
  }
}

export async function getRelatedTools(toolSlug: string, dimensions: string[], limit = 3) {
  try {
    const { data, error } = await supabase
      .from("tools")
      .select("*")
      .eq("status", "published")
      .neq("slug", toolSlug)
      .overlaps("dimensions", dimensions)
      .order("sort_order")
      .limit(limit);

    if (error || !data) return [];
    return data as Tool[];
  } catch {
    return [];
  }
}

export async function getPublishedToolCount() {
  try {
    const { count, error } = await supabase
      .from("tools")
      .select("*", { count: "exact", head: true })
      .eq("status", "published");

    if (error) return 0;
    return count ?? 0;
  } catch {
    return 0;
  }
}

// ---- PAGES ----

export async function getPageBySlug(slug: string) {
  try {
    const { data, error } = await supabase
      .from("pages")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) return null;
    return data as Page;
  } catch {
    return null;
  }
}

// ---- REDIRECTS ----

export async function getRedirects() {
  try {
    const { data, error } = await supabase
      .from("redirects")
      .select("*")
      .eq("active", true);

    if (error || !data) return [];
    return data;
  } catch {
    return [];
  }
}

// ---- ANALYTICS ----

export async function trackEvent(
  eventType: string,
  pagePath: string,
  metadata: Record<string, unknown> = {},
  sessionId = ""
) {
  try {
    const { error } = await supabase.from("analytics_events").insert({
      event_type: eventType,
      page_path: pagePath,
      metadata,
      session_id: sessionId,
    });

    if (error) console.error("Analytics error:", error);
  } catch (err) {
    console.error("Analytics exception:", err);
  }
}
