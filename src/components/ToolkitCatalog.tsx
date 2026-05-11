"use client";

import { useMemo, useState } from "react";

type Item = {
  id: string;
  kind: "skill" | "cli" | "extension";
  name: string;
  slug: string;
  category: string;
  category_key: string;
  description: string;
  triggers: string[];
  github_url: string;
};

const CATEGORY_ORDER = [
  "Content",
  "Research",
  "Sales & Outreach",
  "Founder Ops",
  "Business Intelligence",
  "Platform Engineering",
  "Python CLI",
  "Chrome Extension",
];

const KIND_BADGE: Record<Item["kind"], { label: string; cls: string }> = {
  skill: { label: "Skill", cls: "bg-orange/10 text-orange" },
  cli: { label: "CLI", cls: "bg-sky-400/10 text-sky-400" },
  extension: { label: "Extension", cls: "bg-green-400/10 text-green-400" },
};

export default function ToolkitCatalog({ items }: { items: Item[] }) {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<string>("All");

  const categories = useMemo(() => {
    const set = new Set(items.map((i) => i.category));
    return ["All", ...CATEGORY_ORDER.filter((c) => set.has(c))];
  }, [items]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: items.length };
    for (const it of items) c[it.category] = (c[it.category] || 0) + 1;
    return c;
  }, [items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((it) => {
      if (activeCat !== "All" && it.category !== activeCat) return false;
      if (!q) return true;
      return (
        it.name.toLowerCase().includes(q) ||
        it.description.toLowerCase().includes(q) ||
        it.triggers.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [items, query, activeCat]);

  const grouped = useMemo(() => {
    const map = new Map<string, Item[]>();
    for (const it of filtered) {
      if (!map.has(it.category)) map.set(it.category, []);
      map.get(it.category)!.push(it);
    }
    return CATEGORY_ORDER.filter((c) => map.has(c)).map((c) => ({
      cat: c,
      items: map.get(c)!.sort((a, b) => a.name.localeCompare(b.name)),
    }));
  }, [filtered]);

  return (
    <section>
      {/* Search + category filter */}
      <div className="mb-10">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, description, or trigger…"
          className="w-full bg-navy-light border border-navy-border rounded-lg px-4 py-3 text-white placeholder:text-muted/60 focus:outline-none focus:border-orange transition-colors"
        />
        <div className="flex flex-wrap gap-2 mt-4">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setActiveCat(c)}
              className={`font-mono text-xs uppercase tracking-wider px-3 py-1.5 rounded border transition-colors ${
                activeCat === c
                  ? "bg-orange border-orange text-white"
                  : "bg-navy-light border-navy-border text-muted hover:border-orange hover:text-white"
              }`}
            >
              {c}
              <span className="ml-2 opacity-70">{counts[c] || 0}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Catalogue */}
      {grouped.length === 0 ? (
        <p className="text-muted text-center py-12">No tools match that search.</p>
      ) : (
        grouped.map(({ cat, items }) => (
          <div key={cat} className="mb-12">
            <h2 className="font-heading text-xl font-bold text-text-dark mb-5 tracking-tight">
              {cat}
              <span className="font-mono text-sm font-normal text-muted ml-3">
                {items.length}
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map((it) => (
                <a
                  key={it.id}
                  href={it.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-navy-light border border-navy-border rounded-lg p-6 flex flex-col hover:border-orange transition-colors group"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className={`font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded ${KIND_BADGE[it.kind].cls}`}
                    >
                      {KIND_BADGE[it.kind].label}
                    </span>
                    <code className="font-mono text-xs text-muted truncate">
                      {it.name}
                    </code>
                  </div>
                  <p className="text-white/90 text-sm leading-relaxed mb-4 flex-1">
                    {it.description}
                  </p>
                  {it.triggers.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {it.triggers.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[11px] text-muted/80 bg-white/[0.04] border border-navy-border px-2 py-0.5 rounded"
                        >
                          &quot;{t}&quot;
                        </span>
                      ))}
                    </div>
                  )}
                  <span className="font-mono text-xs text-orange group-hover:underline mt-auto">
                    View on GitHub &rarr;
                  </span>
                </a>
              ))}
            </div>
          </div>
        ))
      )}
    </section>
  );
}
