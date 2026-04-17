import Link from "next/link";
import Image from "next/image";
import type { Tool } from "@/lib/queries";
import { getToolLogoUrl, getToolInitial, formatPricingModel, formatDimension } from "@/lib/utils";

export default function ToolQuickInfoCard({ tool }: { tool: Tool }) {
  const logo = getToolLogoUrl(tool);
  const outboundUrl = tool.affiliate_url || tool.website_url;

  return (
    <div className="bg-white border border-light-border rounded-xl p-5">
      <p className="font-mono text-orange text-xs mb-4 tracking-wider">TOOL REVIEWED</p>

      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-cream border border-light-border flex items-center justify-center overflow-hidden flex-shrink-0">
          <Image
            src={logo.src}
            alt={`${tool.name} logo`}
            width={40}
            height={40}
            className="w-full h-full object-contain p-1"
            onError={(e) => {
              const target = e.currentTarget;
              target.style.display = "none";
              const parent = target.parentElement;
              if (parent) {
                const fallback = document.createElement("span");
                fallback.className = "text-orange font-heading font-bold text-lg";
                fallback.textContent = getToolInitial(tool.name);
                parent.appendChild(fallback);
              }
            }}
          />
        </div>
        <div>
          <p className="font-heading font-bold text-text-dark text-sm">{tool.name}</p>
          <p className="text-text-muted text-xs">{tool.tagline}</p>
        </div>
      </div>

      {/* Rating */}
      {tool.gss_rating && (
        <div className="mb-3">
          <span className="text-orange text-sm">
            {"★".repeat(tool.gss_rating)}
            <span className="text-light-border">{"★".repeat(5 - tool.gss_rating)}</span>
          </span>
          <span className="text-text-muted text-xs ml-2">GSS Rating</span>
        </div>
      )}

      {/* Quick facts */}
      <div className="space-y-2 mb-4 text-sm">
        <div className="flex justify-between">
          <span className="text-text-muted">Pricing</span>
          <span className="text-text-dark font-medium">
            {formatPricingModel(tool.pricing_model)}
            {tool.price_from && ` · ${tool.price_from}`}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-muted">Category</span>
          <span className="text-text-dark font-medium capitalize">{tool.category}</span>
        </div>
      </div>

      {/* Dimensions */}
      <div className="flex flex-wrap gap-1 mb-4">
        {tool.dimensions.map((d) => (
          <span
            key={d}
            className="text-xs font-mono bg-navy/5 text-navy px-2 py-0.5 rounded"
          >
            {formatDimension(d)}
          </span>
        ))}
      </div>

      {/* Discount */}
      {tool.discount_code && (
        <div className="bg-orange/5 border border-orange/20 rounded-lg px-3 py-2 mb-4 text-xs">
          <p className="text-orange font-mono">
            {tool.discount_description || `Code: ${tool.discount_code}`}
          </p>
        </div>
      )}

      {/* CTAs */}
      <div className="space-y-2">
        <a
          href={outboundUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-orange hover:bg-orange-hover text-white px-4 py-2 rounded-lg font-semibold text-sm text-center transition-colors"
        >
          Try {tool.name} →
        </a>
        <Link
          href={`/tools/${tool.slug}`}
          className="block border border-light-border text-text-body hover:border-orange/30 px-4 py-2 rounded-lg text-sm text-center transition-colors"
        >
          Full Review
        </Link>
      </div>
    </div>
  );
}
