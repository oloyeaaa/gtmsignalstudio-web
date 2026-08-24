"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { trackCTAClick, trackNewsletterClick } from "@/components/Analytics";

/**
 * The end-of-post block.
 *
 * Changed 2026-08-24: this used to sell the AI Visibility Audit. Nothing on this site is for
 * sale any more. GTM Signal Studio is a research brand, so the ask is to use the research
 * rather than to buy anything. The newsletter stays, because it is free.
 */
export default function BlogCTA() {
  const pathname = usePathname();

  return (
    <div className="bg-navy py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="font-heading text-xl font-bold text-white mb-3">
          Cite the source, not the summary
        </h3>
        <p className="text-white/60 mb-6">
          Every figure on this site is published with the source it came from, free to use.
          Original research on AI visibility, and on what the market really pays for marketing
          skills.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/research/stats"
            className="bg-orange hover:bg-orange-hover text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            onClick={() => trackCTAClick("research_stats_cta", pathname)}
          >
            Browse the data
          </Link>
          <a
            href="https://newsletter.gtmsignalstudio.com"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/20 hover:border-white/40 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            onClick={() => trackNewsletterClick(pathname)}
          >
            Subscribe to Newsletter
          </a>
        </div>
      </div>
    </div>
  );
}
