"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { Stat, StatCategory } from "@/lib/queries";

type StatsFilterProps = {
  categories: StatCategory[];
  allStats: Stat[];
  totalCount: number;
};

function StatCard({ item, isGss }: { item: Stat; isGss: boolean }) {
  const inner = (
    <>
      <p
        className={`font-heading text-2xl md:text-3xl font-bold mb-1 ${
          isGss ? "text-orange" : "text-navy"
        }`}
      >
        {item.stat_value}
      </p>
      <p className="text-text-dark text-sm font-semibold mb-3 leading-snug">
        {item.label}
      </p>
      <div className="mt-auto">
        <p className="text-text-muted text-xs leading-relaxed">
          {item.source} ({item.year})
          {item.sample && (
            <span className="block font-mono text-[10px] mt-1 text-text-muted/70">
              Sample: {item.sample}
            </span>
          )}
        </p>
      </div>
    </>
  );

  const baseClasses =
    "flex flex-col rounded-xl p-5 transition-all duration-200 h-full";

  if (item.source_url) {
    const isExternal =
      item.source_url.startsWith("http") &&
      !item.source_url.includes("gtmsignalstudio.com");
    return (
      <Link
        href={item.source_url}
        className={`${baseClasses} ${
          isGss
            ? "bg-navy/5 border-2 border-orange/20 hover:border-orange"
            : "bg-cream border border-light-border hover:border-orange"
        }`}
        {...(isExternal
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {inner}
        <p className="text-[10px] font-mono text-orange mt-2">
          {isExternal ? "View source ↗" : "View research →"}
        </p>
      </Link>
    );
  }

  return (
    <div
      className={`${baseClasses} ${
        isGss
          ? "bg-navy/5 border-2 border-orange/20"
          : "bg-cream border border-light-border"
      }`}
    >
      {inner}
    </div>
  );
}

export default function StatsFilter({
  categories,
  allStats,
  totalCount,
}: StatsFilterProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSourceType, setActiveSourceType] = useState<string | null>(null);
  const [activeYear, setActiveYear] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Derive available years from data
  const years = useMemo(() => {
    const set = new Set(allStats.map((s) => s.year));
    return Array.from(set).sort().reverse();
  }, [allStats]);

  // Filter stats
  const filteredStats = useMemo(() => {
    return allStats.filter((stat) => {
      if (activeCategory && stat.category !== activeCategory) return false;
      if (activeSourceType && stat.source_type !== activeSourceType) return false;
      if (activeYear && stat.year !== activeYear) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          stat.label.toLowerCase().includes(q) ||
          stat.stat_value.toLowerCase().includes(q) ||
          stat.source.toLowerCase().includes(q) ||
          (stat.tags && stat.tags.some((t) => t.toLowerCase().includes(q)))
        );
      }
      return true;
    });
  }, [allStats, activeCategory, activeSourceType, activeYear, searchQuery]);

  const isFiltering =
    activeCategory || activeSourceType || activeYear || searchQuery;

  // Group filtered stats by category (preserving category order)
  const groupedStats = useMemo(() => {
    const map = new Map<string, Stat[]>();
    for (const stat of filteredStats) {
      const existing = map.get(stat.category) ?? [];
      existing.push(stat);
      map.set(stat.category, existing);
    }
    return categories
      .filter((c) => map.has(c.id))
      .map((c) => ({ category: c, stats: map.get(c.id)! }));
  }, [filteredStats, categories]);

  function clearFilters() {
    setActiveCategory(null);
    setActiveSourceType(null);
    setActiveYear(null);
    setSearchQuery("");
  }

  return (
    <>
      {/* Filter Bar */}
      <section className="section-light py-6 border-b border-light-border sticky top-0 z-30 bg-cream/95 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search */}
          <div className="mb-3">
            <input
              type="text"
              placeholder="Search stats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-light-border bg-white text-sm text-text-dark placeholder:text-text-muted/50 focus:outline-none focus:border-orange transition-colors"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {/* Category pills */}
            <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() =>
                    setActiveCategory(activeCategory === c.id ? null : c.id)
                  }
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap border transition-colors ${
                    activeCategory === c.id
                      ? "bg-orange text-white border-orange"
                      : "bg-white border-light-border text-text-body hover:border-orange hover:text-orange"
                  }`}
                >
                  {c.title.replace("GTM Signal Studio ", "")}
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-6 bg-light-border self-center" />

            {/* Source type pills */}
            <div className="flex gap-1.5">
              {[
                { id: "gss-original", label: "GSS Original" },
                { id: "external", label: "External" },
              ].map((st) => (
                <button
                  key={st.id}
                  onClick={() =>
                    setActiveSourceType(
                      activeSourceType === st.id ? null : st.id
                    )
                  }
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap border transition-colors ${
                    activeSourceType === st.id
                      ? "bg-navy text-white border-navy"
                      : "bg-white border-light-border text-text-body hover:border-navy hover:text-navy"
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>

            {/* Year pills */}
            <div className="hidden sm:block w-px h-6 bg-light-border self-center" />
            <div className="flex gap-1.5">
              {years.map((y) => (
                <button
                  key={y}
                  onClick={() =>
                    setActiveYear(activeYear === y ? null : y)
                  }
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap border transition-colors ${
                    activeYear === y
                      ? "bg-navy text-white border-navy"
                      : "bg-white border-light-border text-text-body hover:border-navy hover:text-navy"
                  }`}
                >
                  {y}
                </button>
              ))}
            </div>

            {/* Clear button */}
            {isFiltering && (
              <button
                onClick={clearFilters}
                className="px-3 py-1.5 rounded-md text-xs font-semibold text-orange hover:text-orange-hover transition-colors"
              >
                Clear all ✕
              </button>
            )}
          </div>

          {/* Result count */}
          {isFiltering && (
            <p className="mt-2 text-xs text-text-muted">
              Showing {filteredStats.length} of {totalCount} stats
            </p>
          )}
        </div>
      </section>

      {/* Stat Sections */}
      {groupedStats.map(({ category, stats }, i) => {
        const isGss = category.is_gss;
        const bgIndex = isGss ? -1 : i - 1;
        const bgClass = isGss
          ? "section-white"
          : bgIndex % 2 === 0
            ? "section-light"
            : "section-white";

        return (
          <section
            key={category.id}
            className={`${bgClass} py-16 md:py-20`}
          >
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div id={category.id} className="scroll-mt-24">
                <p className="font-mono text-orange text-sm mb-2 tracking-wider">
                  {isGss ? "ORIGINAL RESEARCH" : "EXTERNAL DATA"}
                </p>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-dark mb-2">
                  {category.title}
                </h2>
                <p className="text-text-body text-sm mb-8 max-w-2xl">
                  {category.description}
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  {stats.map((item) => (
                    <StatCard key={item.slug} item={item} isGss={isGss} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Empty state */}
      {filteredStats.length === 0 && (
        <section className="section-white py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-text-muted text-lg">
              No stats match your filters.
            </p>
            <button
              onClick={clearFilters}
              className="mt-4 text-orange hover:text-orange-hover font-semibold text-sm"
            >
              Clear all filters
            </button>
          </div>
        </section>
      )}
    </>
  );
}
