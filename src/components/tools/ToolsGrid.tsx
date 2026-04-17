"use client";

import { useState } from "react";
import type { Tool } from "@/lib/queries";
import ToolCard from "./ToolCard";
import { formatDimension } from "@/lib/utils";

type ToolsGridProps = {
  tools: Tool[];
  categories: string[];
  dimensions: string[];
};

export default function ToolsGrid({ tools, categories, dimensions }: ToolsGridProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeDimension, setActiveDimension] = useState("all");

  const filtered = tools.filter((t) => {
    if (activeCategory !== "all" && t.category !== activeCategory) return false;
    if (activeDimension !== "all" && !t.dimensions.includes(activeDimension)) return false;
    return true;
  });

  return (
    <div>
      {/* Filters */}
      <div className="mb-8 space-y-4">
        {/* Category filter */}
        <div>
          <p className="font-mono text-xs text-text-muted mb-2 tracking-wider">CATEGORY</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-3 py-1.5 rounded-lg text-sm font-body transition-colors ${
                activeCategory === "all"
                  ? "bg-navy text-white"
                  : "bg-cream text-text-body hover:bg-light-grey"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-sm font-body transition-colors capitalize ${
                  activeCategory === cat
                    ? "bg-navy text-white"
                    : "bg-cream text-text-body hover:bg-light-grey"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dimension filter */}
        <div>
          <p className="font-mono text-xs text-text-muted mb-2 tracking-wider">AI VISIBILITY DIMENSION</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveDimension("all")}
              className={`px-3 py-1.5 rounded-lg text-sm font-body transition-colors ${
                activeDimension === "all"
                  ? "bg-orange text-white"
                  : "bg-cream text-text-body hover:bg-light-grey"
              }`}
            >
              All Dimensions
            </button>
            {dimensions.map((dim) => (
              <button
                key={dim}
                onClick={() => setActiveDimension(dim)}
                className={`px-3 py-1.5 rounded-lg text-sm font-body transition-colors ${
                  activeDimension === dim
                    ? "bg-orange text-white"
                    : "bg-cream text-text-body hover:bg-light-grey"
                }`}
              >
                {formatDimension(dim)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results count */}
      <p className="text-text-muted text-sm mb-6">
        {filtered.length} tool{filtered.length !== 1 ? "s" : ""}
        {activeCategory !== "all" || activeDimension !== "all" ? " matching filters" : ""}
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-cream rounded-xl">
          <p className="text-text-muted">No tools match your filters.</p>
          <button
            onClick={() => {
              setActiveCategory("all");
              setActiveDimension("all");
            }}
            className="text-orange hover:underline text-sm mt-2"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
