import Link from "next/link";
import Image from "next/image";
import type { Tool } from "@/lib/queries";
import { getToolLogoUrl, getToolInitial, formatPricingModel, formatDimension } from "@/lib/utils";

export default function ToolCard({ tool }: { tool: Tool }) {
  const logo = getToolLogoUrl(tool);

  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group bg-white border border-light-border rounded-xl p-5 hover:border-orange/30 hover:shadow-md transition-all flex flex-col"
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-lg bg-cream border border-light-border flex items-center justify-center overflow-hidden flex-shrink-0">
          <Image
            src={logo.src}
            alt={`${tool.name} logo`}
            width={48}
            height={48}
            className="w-full h-full object-contain p-1"
            onError={(e) => {
              const target = e.currentTarget;
              target.style.display = "none";
              const parent = target.parentElement;
              if (parent) {
                const fallback = document.createElement("span");
                fallback.className = "text-orange font-heading font-bold text-xl";
                fallback.textContent = getToolInitial(tool.name);
                parent.appendChild(fallback);
              }
            }}
          />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-heading font-bold text-text-dark group-hover:text-orange transition-colors text-lg leading-tight">
            {tool.name}
          </h3>
          <p className="text-text-muted text-sm mt-0.5">{tool.tagline}</p>
        </div>
      </div>

      {/* Dimensions */}
      {tool.dimensions.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {tool.dimensions.map((d) => (
            <span
              key={d}
              className="text-xs font-mono bg-navy/5 text-navy px-2 py-0.5 rounded"
            >
              {formatDimension(d)}
            </span>
          ))}
        </div>
      )}

      {/* Bottom row */}
      <div className="mt-auto pt-3 border-t border-light-border flex items-center justify-between">
        <span className="text-xs font-mono text-orange">
          {formatPricingModel(tool.pricing_model)}
          {tool.price_from && ` · ${tool.price_from}`}
        </span>
        {tool.gss_rating && (
          <span className="text-orange text-sm" title={`GSS Rating: ${tool.gss_rating}/5`}>
            {"★".repeat(tool.gss_rating)}
            <span className="text-light-border">{"★".repeat(5 - tool.gss_rating)}</span>
          </span>
        )}
      </div>

      {/* Discount badge */}
      {tool.discount_code && (
        <div className="mt-3 bg-orange/5 border border-orange/20 rounded-lg px-3 py-2 text-xs text-orange font-mono">
          {tool.discount_description || `Code: ${tool.discount_code}`}
        </div>
      )}
    </Link>
  );
}
