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
  const { count, error } = await supabase
    .from("posts")
    .select("*", { count: "exact", head: true })
    .eq("status", "published");

  if (error) throw error;
  return count ?? 0;
}

export async function getPublishedPosts(limit = 50, offset = 0) {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw error;
  return data as Post[];
}

export async function getPostBySlug(slug: string) {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error) return null;
  return data as Post;
}

export async function getPostsByCategory(category: string, limit = 20) {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("status", "published")
    .eq("category", category)
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data as Post[];
}

export async function getRelatedPosts(postId: string, category: string, limit = 3) {
  const { data, error } = await supabase
    .from("posts")
    .select("id, title, slug, excerpt, category, published_at, reading_time, featured_image")
    .eq("status", "published")
    .eq("category", category)
    .neq("id", postId)
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data as Partial<Post>[];
}

export async function searchPosts(query: string, limit = 20) {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("status", "published")
    .textSearch("fts", query, { type: "websearch" })
    .limit(limit);

  if (error) throw error;
  return data as Post[];
}

export async function getAllPostSlugs() {
  const { data, error } = await supabase
    .from("posts")
    .select("slug, updated_at")
    .eq("status", "published");

  if (error) throw error;
  return data as { slug: string; updated_at: string }[];
}

export async function getRecentPosts(limit = 3) {
  const { data, error } = await supabase
    .from("posts")
    .select("id, title, slug, excerpt, category, published_at, reading_time, featured_image")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data as Partial<Post>[];
}

// ---- TOPIC CLUSTERS ----

export type TopicCluster = {
  id: string;
  name: string;
  slug: string;
  description: string;
  hero_image: string;
  cta_text: string;
  cta_url: string;
  pillar_post_id: string;
};

export type ClusterPost = {
  cluster_id: string;
  post_id: string;
  sort_order: number;
  is_pillar: boolean;
};

export async function getAllTopicClusters() {
  const { data, error } = await supabase
    .from("topic_clusters")
    .select("*")
    .order("name");

  if (error) throw error;
  return data as TopicCluster[];
}

export async function getTopicClusterBySlug(slug: string) {
  const { data, error } = await supabase
    .from("topic_clusters")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) return null;
  return data as TopicCluster;
}

export async function getAllClusterSlugs() {
  const { data, error } = await supabase
    .from("topic_clusters")
    .select("slug");

  if (error) throw error;
  return data as { slug: string }[];
}

export async function getClusterPosts(clusterId: string) {
  const { data, error } = await supabase
    .from("cluster_posts")
    .select("post_id, sort_order, is_pillar")
    .eq("cluster_id", clusterId)
    .order("sort_order");

  if (error) throw error;

  // Fetch full post data for each
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
}

export async function getClusterPostCount(clusterId: string) {
  const { data, error } = await supabase
    .from("cluster_posts")
    .select("post_id")
    .eq("cluster_id", clusterId);

  if (error) return 0;
  return data.length;
}

export async function getPostCluster(postId: string) {
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
}

export async function getClusterSiblings(postId: string, clusterId: string) {
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
    const { data: post } = await supabase
      .from("posts")
      .select("id, title, slug")
      .eq("id", id)
      .single();
    return post as { id: string; title: string; slug: string } | null;
  };

  return {
    prev: await fetchPost(prevId),
    next: await fetchPost(nextId),
  };
}

// ---- PAGES ----

export async function getPageBySlug(slug: string) {
  const { data, error } = await supabase
    .from("pages")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) return null;
  return data as Page;
}

// ---- REDIRECTS ----

export async function getRedirects() {
  const { data, error } = await supabase
    .from("redirects")
    .select("*")
    .eq("active", true);

  if (error) throw error;
  return data;
}

// ---- ANALYTICS ----

export async function trackEvent(
  eventType: string,
  pagePath: string,
  metadata: Record<string, unknown> = {},
  sessionId = ""
) {
  const { error } = await supabase.from("analytics_events").insert({
    event_type: eventType,
    page_path: pagePath,
    metadata,
    session_id: sessionId,
  });

  if (error) console.error("Analytics error:", error);
}
