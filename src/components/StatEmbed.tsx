import Link from "next/link";
import { supabase } from "@/lib/supabase";

/**
 * StatEmbed — Server component that renders a single stat inline.
 *
 * Usage in any page/blog:
 *   <StatEmbed slug="gss-invisible-81pct" />
 *   <StatEmbed slug="ext-forrester-94pct-ai" variant="compact" />
 *   <StatEmbed slugs={["gss-invisible-81pct", "gss-avg-score-28-7", "gss-law-52pct-invisible"]} />
 */

type StatEmbedProps = {
  slug?: string;
  slugs?: string[];
  variant?: "card" | "compact" | "inline";
};

async function fetchStats(slugList: string[]) {
  const { data } = await supabase
    .from("stats")
    .select("slug, stat_value, label, source, source_url, source_type, year, sample")
    .eq("status", "published")
    .in("slug", slugList);

  return data ?? [];
}

export default async function StatEmbed({
  slug,
  slugs,
  variant = "card",
}: StatEmbedProps) {
  const slugList = slugs ?? (slug ? [slug] : []);
  if (slugList.length === 0) return null;

  const stats = await fetchStats(slugList);
  if (stats.length === 0) return null;

  // Preserve requested order
  const ordered = slugList
    .map((s) => stats.find((st) => st.slug === s))
    .filter(Boolean) as typeof stats;

  if (variant === "inline") {
    return (
      <>
        {ordered.map((s) => (
          <span key={s.slug} className="font-bold text-orange">
            {s.stat_value}
          </span>
        ))}
      </>
    );
  }

  if (variant === "compact") {
    return (
      <div className="flex flex-wrap gap-4 my-4">
        {ordered.map((s) => (
          <div
            key={s.slug}
            className="bg-navy/5 border border-orange/20 rounded-lg px-4 py-3 text-center"
          >
            <p className="font-heading text-xl font-bold text-orange">
              {s.stat_value}
            </p>
            <p className="text-text-muted text-xs mt-1 max-w-[200px]">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    );
  }

  // Default: card variant
  return (
    <div
      className={`grid gap-4 my-6 ${
        ordered.length === 1
          ? ""
          : ordered.length === 2
            ? "md:grid-cols-2"
            : "md:grid-cols-3"
      }`}
    >
      {ordered.map((s) => {
        const isGss = s.source_type === "gss-original";
        const inner = (
          <>
            <p
              className={`font-heading text-2xl font-bold mb-1 ${
                isGss ? "text-orange" : "text-navy"
              }`}
            >
              {s.stat_value}
            </p>
            <p className="text-text-dark text-sm font-semibold mb-2 leading-snug">
              {s.label}
            </p>
            <p className="text-text-muted text-xs mt-auto">
              {s.source} ({s.year})
              {s.sample && (
                <span className="block font-mono text-[10px] mt-1 text-text-muted/70">
                  Sample: {s.sample}
                </span>
              )}
            </p>
          </>
        );

        const baseClasses = `flex flex-col rounded-xl p-5 h-full ${
          isGss
            ? "bg-navy/5 border-2 border-orange/20"
            : "bg-cream border border-light-border"
        }`;

        if (s.source_url) {
          const isExternal =
            s.source_url.startsWith("http") &&
            !s.source_url.includes("gtmsignalstudio.com");
          return (
            <Link
              key={s.slug}
              href={s.source_url}
              className={`${baseClasses} hover:border-orange transition-all`}
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
          <div key={s.slug} className={baseClasses}>
            {inner}
          </div>
        );
      })}
    </div>
  );
}
