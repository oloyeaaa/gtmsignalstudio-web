import Link from "next/link";
import type { Tool } from "@/lib/queries";
import { getToolLogoUrl, formatPricingModel } from "@/lib/utils";
import AffiliateDisclaimer from "./AffiliateDisclaimer";
import ToolLogo from "./ToolLogo";

export default function RelatedToolsSidebar({ tools }: { tools: Tool[] }) {
  if (tools.length === 0) return null;

  return (
    <div className="bg-white border border-light-border rounded-xl p-5">
      <p className="font-mono text-orange text-xs mb-4 tracking-wider">RELATED TOOLS</p>
      <div className="space-y-3">
        {tools.map((tool) => {
          const logo = getToolLogoUrl(tool);
          return (
            <Link
              key={tool.id}
              href={`/tools/${tool.slug}`}
              className="group flex items-center gap-3 p-2 rounded-lg hover:bg-cream transition-colors"
            >
              <div className="w-8 h-8 rounded-md bg-cream border border-light-border flex items-center justify-center overflow-hidden flex-shrink-0">
                <ToolLogo
                  src={logo.src}
                  name={tool.name}
                  size={32}
                  className="w-full h-full object-contain p-0.5"
                  fallbackClassName="text-orange font-heading font-bold text-sm"
                />
              </div>
              <div className="min-w-0">
                <p className="font-heading font-bold text-text-dark text-sm group-hover:text-orange transition-colors truncate">
                  {tool.name}
                </p>
                <p className="text-text-muted text-xs">
                  {formatPricingModel(tool.pricing_model)}
                  {tool.price_from && ` · ${tool.price_from}`}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-light-border">
        <Link
          href="/tools"
          className="text-orange hover:underline text-sm font-mono"
        >
          Browse all tools →
        </Link>
      </div>

      <AffiliateDisclaimer className="mt-4" />
    </div>
  );
}
