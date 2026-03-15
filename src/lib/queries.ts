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
