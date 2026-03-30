"use client";

import { useState, useRef, useEffect } from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type FirmData = {
  name: string;
  citation: number;
  entity: number;
  content: number;
  breadth: number;
  total: number;
};

type Filter = "all" | "cited" | "uncited";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function avg(arr: number[]): number {
  return arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;
}

function citationGroup(c: number): "perfect" | "cited" | "uncited" {
  if (c >= 25) return "perfect";
  if (c >= 22) return "cited";
  return "uncited";
}

function groupColor(g: "perfect" | "cited" | "uncited"): string {
  if (g === "perfect") return "#f17021";
  if (g === "cited") return "#44aa66";
  return "#cc4444";
}

function dimColor(dim: string): string {
  switch (dim) {
    case "citation": return "#f17021";
    case "entity": return "#44aa66";
    case "content": return "#5599cc";
    case "breadth": return "#9966cc";
    default: return "#7a9aaa";
  }
}

// ---------------------------------------------------------------------------
// Tooltip
// ---------------------------------------------------------------------------

function Tooltip({
  firm,
  x,
  y,
}: {
  firm: FirmData | null;
  x: number;
  y: number;
}) {
  if (!firm) return null;
  const g = citationGroup(firm.citation);
  return (
    <div
      className="fixed z-50 pointer-events-none"
      style={{ left: Math.min(x + 14, typeof window !== "undefined" ? window.innerWidth - 280 : x + 14), top: y - 8 }}
    >
      <div className="bg-[#07202b] border border-[#f17021] rounded-lg p-3 shadow-2xl min-w-[220px]">
        <p className="font-bold text-white text-sm mb-2">{firm.name}</p>
        <div className="flex justify-between text-xs mb-1">
          <span className="text-[#7a9aaa]">Total</span>
          <span className="text-white font-mono font-bold">{firm.total}/100</span>
        </div>
        <div className="flex justify-between text-xs mb-1">
          <span className="text-[#7a9aaa]">Citation</span>
          <span className="font-mono font-bold" style={{ color: groupColor(g) }}>
            {firm.citation}/25
          </span>
        </div>
        <div className="flex justify-between text-xs mb-1">
          <span className="text-[#7a9aaa]">Entity</span>
          <span className="text-white font-mono">{firm.entity}/25</span>
        </div>
        <div className="flex justify-between text-xs mb-1">
          <span className="text-[#7a9aaa]">Content</span>
          <span className="text-white font-mono">{firm.content}/25</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-[#7a9aaa]">Breadth</span>
          <span className="text-white font-mono">{firm.breadth}/25</span>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Radial Gauge
// ---------------------------------------------------------------------------

function RadialGauge({
  value,
  max,
  label,
  color,
  size = 120,
}: {
  value: number;
  max: number;
  label: string;
  color: string;
  size?: number;
}) {
  const r = (size - 16) / 2;
  const circumference = 2 * Math.PI * r;
  const pct = value / max;
  const offset = circumference * (1 - pct);

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#1a4050"
          strokeWidth="8"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <div
        className="absolute flex flex-col items-center justify-center"
        style={{ width: size, height: size }}
      >
        <span className="font-bold text-xl text-white font-mono">
          {value.toFixed(1)}
        </span>
        <span className="text-[10px] text-[#7a9aaa]">/{max}</span>
      </div>
      <p className="text-xs text-[#7a9aaa] mt-2 text-center">{label}</p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Donut Split Chart
// ---------------------------------------------------------------------------

function DonutSplit({
  cited,
  uncited,
  perfect,
  total,
}: {
  cited: number;
  uncited: number;
  perfect: number;
  total: number;
}) {
  const size = 180;
  const r = 70;
  const circumference = 2 * Math.PI * r;

  const segments = [
    { count: uncited, color: "#cc4444", label: "Uncited" },
    { count: cited, color: "#44aa66", label: "Cited (22)" },
    { count: perfect, color: "#f17021", label: "Perfect (25)" },
  ];

  let currentOffset = 0;
  const arcs = segments.map((seg) => {
    const pct = seg.count / total;
    const dash = circumference * pct;
    const offset = currentOffset;
    currentOffset += dash;
    return { ...seg, dash, offset, pct };
  });

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#1a4050"
          strokeWidth="20"
        />
        {arcs.map((arc) => (
          <circle
            key={arc.label}
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={arc.color}
            strokeWidth="20"
            strokeDasharray={`${arc.dash} ${circumference - arc.dash}`}
            strokeDashoffset={-arc.offset}
            className="transition-all duration-700 ease-out"
          />
        ))}
      </svg>
      <div
        className="absolute flex flex-col items-center justify-center"
        style={{ width: size, height: size }}
      >
        <span className="font-bold text-3xl text-white font-mono">
          {Math.round((uncited / total) * 100)}%
        </span>
        <span className="text-[10px] text-[#cc4444]">invisible</span>
      </div>
      <div className="flex gap-4 mt-4">
        {arcs.map((arc) => (
          <div key={arc.label} className="flex items-center gap-1.5">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: arc.color }}
            />
            <span className="text-[10px] text-[#7a9aaa]">
              {arc.label} ({arc.count})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Lollipop Chart
// ---------------------------------------------------------------------------

function LollipopChart({
  data,
  onHover,
  onLeave,
}: {
  data: FirmData[];
  onHover: (firm: FirmData, e: React.MouseEvent) => void;
  onLeave: () => void;
}) {
  const sorted = [...data].sort((a, b) => b.total - a.total);

  return (
    <div className="space-y-[3px] max-h-[500px] overflow-y-auto pr-2 custom-scroll">
      {sorted.map((f) => {
        const g = citationGroup(f.citation);
        const color = groupColor(g);
        return (
          <div
            key={f.name}
            className="flex items-center gap-2 group cursor-pointer"
            onMouseEnter={(e) => onHover(f, e)}
            onMouseMove={(e) => onHover(f, e)}
            onMouseLeave={onLeave}
          >
            <span className="text-[10px] text-[#7a9aaa] w-[160px] text-right truncate flex-shrink-0 group-hover:text-white transition-colors">
              {f.name}
            </span>
            <div className="flex-1 h-[3px] bg-[#1a4050] rounded relative">
              <div
                className="h-full rounded transition-all duration-500 ease-out"
                style={{ width: `${f.total}%`, background: color }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border-2 border-[#0d2f3d] transition-all duration-500 ease-out"
                style={{
                  left: `${f.total}%`,
                  background: color,
                  transform: "translate(-50%, -50%)",
                }}
              />
            </div>
            <span className="text-[10px] font-mono text-[#7a9aaa] w-[28px] text-right flex-shrink-0 group-hover:text-white transition-colors">
              {f.total}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Bubble Scatter
// ---------------------------------------------------------------------------

function BubbleScatter({
  data,
  onHover,
  onLeave,
}: {
  data: FirmData[];
  onHover: (firm: FirmData, e: React.MouseEvent) => void;
  onLeave: () => void;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [dims, setDims] = useState({ w: 600, h: 350 });

  useEffect(() => {
    const el = svgRef.current?.parentElement;
    if (el) {
      const observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          setDims({ w: entry.contentRect.width, h: 350 });
        }
      });
      observer.observe(el);
      setDims({ w: el.clientWidth, h: 350 });
      return () => observer.disconnect();
    }
  }, []);

  const pad = { top: 20, right: 20, bottom: 36, left: 44 };
  const pw = dims.w - pad.left - pad.right;
  const ph = dims.h - pad.top - pad.bottom;

  return (
    <div className="w-full">
      <svg ref={svgRef} width={dims.w} height={dims.h} className="overflow-visible">
        {/* Grid */}
        {[0, 20, 40, 60, 80, 100].map((v) => (
          <g key={`gy-${v}`}>
            <line
              x1={pad.left}
              x2={dims.w - pad.right}
              y1={pad.top + ph - (v / 100) * ph}
              y2={pad.top + ph - (v / 100) * ph}
              stroke="#1a4050"
              strokeWidth="1"
            />
            <text
              x={pad.left - 6}
              y={pad.top + ph - (v / 100) * ph + 3}
              fill="#7a9aaa"
              fontSize="9"
              textAnchor="end"
              fontFamily="monospace"
            >
              {v}
            </text>
          </g>
        ))}
        {[0, 5, 10, 15, 20, 25].map((v) => (
          <g key={`gx-${v}`}>
            <line
              x1={pad.left + (v / 25) * pw}
              x2={pad.left + (v / 25) * pw}
              y1={pad.top}
              y2={pad.top + ph}
              stroke="#1a4050"
              strokeWidth="1"
            />
            <text
              x={pad.left + (v / 25) * pw}
              y={dims.h - 8}
              fill="#7a9aaa"
              fontSize="9"
              textAnchor="middle"
              fontFamily="monospace"
            >
              {v}
            </text>
          </g>
        ))}

        {/* Axis labels */}
        <text
          x={dims.w / 2}
          y={dims.h}
          fill="#7a9aaa"
          fontSize="10"
          textAnchor="middle"
        >
          Citation Presence
        </text>
        <text
          x={10}
          y={pad.top - 6}
          fill="#7a9aaa"
          fontSize="10"
          textAnchor="start"
        >
          Total
        </text>

        {/* Dots */}
        {data.map((f, i) => {
          const g = citationGroup(f.citation);
          const color = groupColor(g);
          // Deterministic jitter
          const jx = ((i * 7) % 13) - 6;
          const jy = ((i * 11) % 9) - 4;
          const cx = pad.left + (f.citation / 25) * pw + jx;
          const cy = pad.top + ph - (f.total / 100) * ph + jy;
          return (
            <circle
              key={f.name}
              cx={cx}
              cy={cy}
              r={6}
              fill={color}
              fillOpacity={0.85}
              stroke={color}
              strokeWidth="1.5"
              strokeOpacity={0.3}
              className="cursor-pointer transition-all duration-200 hover:r-[9px]"
              onMouseEnter={(e) => onHover(f, e)}
              onMouseMove={(e) => onHover(f, e)}
              onMouseLeave={onLeave}
            />
          );
        })}
      </svg>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export default function BenchmarkCharts({
  firms,
  studyLabel,
}: {
  firms: FirmData[];
  studyLabel: string;
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const [hoveredFirm, setHoveredFirm] = useState<FirmData | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const filtered =
    filter === "cited"
      ? firms.filter((f) => f.citation >= 22)
      : filter === "uncited"
        ? firms.filter((f) => f.citation < 22)
        : firms;

  const cited = filtered.filter((f) => f.citation >= 22 && f.citation < 25);
  const perfect = filtered.filter((f) => f.citation >= 25);
  const uncited = filtered.filter((f) => f.citation < 22);

  const citedAll = firms.filter((f) => f.citation >= 22);
  const uncitedAll = firms.filter((f) => f.citation < 22);

  const handleHover = (firm: FirmData, e: React.MouseEvent) => {
    setHoveredFirm(firm);
    setTooltipPos({ x: e.clientX, y: e.clientY });
  };
  const handleLeave = () => setHoveredFirm(null);

  const filterLabel =
    filter === "cited"
      ? `Cited (${citedAll.length})`
      : filter === "uncited"
        ? `Uncited (${uncitedAll.length})`
        : `All ${firms.length}`;

  return (
    <div>
      <style>{`
        .custom-scroll::-webkit-scrollbar { width: 4px; }
        .custom-scroll::-webkit-scrollbar-track { background: #0d2f3d; border-radius: 2px; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #1a4050; border-radius: 2px; }
        .custom-scroll::-webkit-scrollbar-thumb:hover { background: #f17021; }
      `}</style>

      {/* Tooltip */}
      <Tooltip firm={hoveredFirm} x={tooltipPos.x} y={tooltipPos.y} />

      {/* Filter pills */}
      <div className="flex items-center gap-2 mb-8">
        <span className="text-[#7a9aaa] text-xs uppercase tracking-wider mr-2">
          Filter:
        </span>
        {(["all", "cited", "uncited"] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded-full text-xs transition-all ${
              filter === f
                ? "bg-[#f17021] text-white"
                : "bg-[#0d2f3d] text-[#7a9aaa] border border-[#1a4050] hover:border-[#f17021] hover:text-white"
            }`}
          >
            {f === "all"
              ? `All (${firms.length})`
              : f === "cited"
                ? `Cited (${citedAll.length})`
                : `Uncited (${uncitedAll.length})`}
          </button>
        ))}
      </div>

      {/* Top row: Donut + Radial gauges */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-10">
        <div className="md:col-span-2 bg-[#0d2f3d] border border-[#1a4050] rounded-xl p-6 flex flex-col items-center justify-center relative">
          <p className="font-mono text-[#f17021] text-xs tracking-wider mb-4">
            CITATION SPLIT
          </p>
          <DonutSplit
            cited={cited.length}
            uncited={uncited.length}
            perfect={perfect.length}
            total={filtered.length}
          />
        </div>
        <div className="md:col-span-3 bg-[#0d2f3d] border border-[#1a4050] rounded-xl p-6">
          <p className="font-mono text-[#f17021] text-xs tracking-wider mb-4">
            DIMENSION AVERAGES — {filterLabel}
          </p>
          <div className="grid grid-cols-4 gap-4">
            {[
              { key: "citation" as const, label: "Citation" },
              { key: "entity" as const, label: "Entity" },
              { key: "content" as const, label: "Content" },
              { key: "breadth" as const, label: "Breadth" },
            ].map((d) => (
              <div key={d.key} className="relative flex flex-col items-center">
                <RadialGauge
                  value={avg(filtered.map((f) => f[d.key]))}
                  max={25}
                  label={d.label}
                  color={dimColor(d.key)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lollipop chart */}
      <div className="bg-[#0d2f3d] border border-[#1a4050] rounded-xl p-6 mb-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-mono text-[#f17021] text-xs tracking-wider">
              ALL FIRMS RANKED
            </p>
            <p className="text-[#7a9aaa] text-xs mt-1">
              Total AI Visibility Score — hover for detail
            </p>
          </div>
          <div className="flex gap-3">
            {[
              { color: "#44aa66", label: "Cited" },
              { color: "#f17021", label: "Perfect" },
              { color: "#cc4444", label: "Uncited" },
            ].map((l) => (
              <div key={l.label} className="flex items-center gap-1.5">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: l.color }}
                />
                <span className="text-[10px] text-[#7a9aaa]">{l.label}</span>
              </div>
            ))}
          </div>
        </div>
        <LollipopChart
          data={filtered}
          onHover={handleHover}
          onLeave={handleLeave}
        />
      </div>

      {/* Bottom row: Scatter + Histogram */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#0d2f3d] border border-[#1a4050] rounded-xl p-6">
          <p className="font-mono text-[#f17021] text-xs tracking-wider mb-1">
            CITATION VS TOTAL SCORE
          </p>
          <p className="text-[#7a9aaa] text-xs mb-4">
            The two clusters show the binary split
          </p>
          <BubbleScatter
            data={filtered}
            onHover={handleHover}
            onLeave={handleLeave}
          />
        </div>
        <div className="bg-[#0d2f3d] border border-[#1a4050] rounded-xl p-6">
          <p className="font-mono text-[#f17021] text-xs tracking-wider mb-1">
            CITATION SCORE DISTRIBUTION
          </p>
          <p className="text-[#7a9aaa] text-xs mb-4">
            No middle ground — firms score 2 or 22+
          </p>
          <div className="flex items-end gap-2 h-[300px] px-4 pt-8">
            {[
              { label: "0–5", min: 0, max: 5 },
              { label: "6–10", min: 6, max: 10 },
              { label: "11–15", min: 11, max: 15 },
              { label: "16–20", min: 16, max: 20 },
              { label: "21–22", min: 21, max: 22 },
              { label: "23–25", min: 23, max: 25 },
            ].map((b) => {
              const count = filtered.filter(
                (f) => f.citation >= b.min && f.citation <= b.max
              ).length;
              const maxCount = Math.max(
                ...([0, 5, 6, 10, 11, 15, 16, 20, 21, 22, 23, 25].reduce(
                  (acc: number[], _, i, arr) => {
                    if (i % 2 === 0 && i + 1 < arr.length)
                      acc.push(
                        filtered.filter(
                          (f) => f.citation >= arr[i] && f.citation <= arr[i + 1]
                        ).length
                      );
                    return acc;
                  },
                  []
                )),
                1
              );
              const heightPct = (count / maxCount) * 100;
              let color = "#1a4050";
              if (b.min <= 5) color = "#cc4444";
              else if (b.min >= 23) color = "#f17021";
              else if (b.min >= 21) color = "#44aa66";

              return (
                <div
                  key={b.label}
                  className="flex-1 flex flex-col items-center justify-end h-full"
                >
                  <div className="relative w-full flex justify-center">
                    {count > 0 && (
                      <span className="text-white font-bold text-sm mb-1">
                        {count}
                      </span>
                    )}
                  </div>
                  <div
                    className="w-full rounded-t-md transition-all duration-700 ease-out"
                    style={{
                      height: `${heightPct}%`,
                      background: color,
                      minHeight: count > 0 ? 4 : 0,
                    }}
                  />
                  <span className="text-[10px] text-[#7a9aaa] mt-2">
                    {b.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
