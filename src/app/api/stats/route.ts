import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

/**
 * GET /api/stats — Public stats API
 *
 * Query params:
 *   category   — filter by category id (e.g., "gss-original", "ai-adoption")
 *   source_type — filter by source type ("gss-original", "gss-aggregate", "external")
 *   sector     — filter by sector
 *   year       — filter by year
 *   tag        — filter by tag (can repeat: ?tag=benchmark&tag=law-firms)
 *   featured   — if "true", only return featured stats
 *   limit      — max results (default 100, max 500)
 *   offset     — pagination offset (default 0)
 *   include    — "categories" to include category metadata in response
 *
 * Response: { stats: Stat[], total: number, categories?: StatCategory[] }
 */
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  const category = params.get("category");
  const sourceType = params.get("source_type");
  const sector = params.get("sector");
  const year = params.get("year");
  const tags = params.getAll("tag");
  const featured = params.get("featured");
  const includeCategories = params.get("include") === "categories";
  const limit = Math.min(Number(params.get("limit")) || 100, 500);
  const offset = Number(params.get("offset")) || 0;

  // Build stats query
  let query = supabase
    .from("stats")
    .select("*", { count: "exact" })
    .eq("status", "published")
    .order("sort_order");

  if (category) query = query.eq("category", category);
  if (sourceType) query = query.eq("source_type", sourceType);
  if (sector) query = query.eq("sector", sector);
  if (year) query = query.eq("year", year);
  if (tags.length > 0) query = query.overlaps("tags", tags);
  if (featured === "true") query = query.eq("is_featured", true);

  query = query.range(offset, offset + limit - 1);

  const { data: stats, count, error } = await query;

  if (error) {
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }

  const response: Record<string, unknown> = {
    stats,
    total: count ?? 0,
  };

  // Optionally include categories
  if (includeCategories) {
    const { data: categories } = await supabase
      .from("stat_categories")
      .select("*")
      .eq("status", "published")
      .order("sort_order");

    response.categories = categories;
  }

  return NextResponse.json(response, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
