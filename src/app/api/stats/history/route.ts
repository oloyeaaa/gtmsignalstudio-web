import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

/**
 * GET /api/stats/history — Stat trend data
 *
 * Query params:
 *   slug   — stat slug to get history for (required)
 *   limit  — max results (default 20)
 *
 * Response: { history: StatHistoryEntry[] }
 */
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const slug = params.get("slug");

  if (!slug) {
    return NextResponse.json(
      { error: "slug parameter is required" },
      { status: 400 }
    );
  }

  const limit = Math.min(Number(params.get("limit")) || 20, 100);

  const { data, error } = await supabase
    .from("stat_history")
    .select("*")
    .eq("stat_slug", slug)
    .order("recorded_at", { ascending: true })
    .limit(limit);

  if (error) {
    return NextResponse.json(
      { error: "Failed to fetch stat history" },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { history: data },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    }
  );
}
