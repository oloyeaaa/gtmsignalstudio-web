"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { trackCTAClick, trackNewsletterClick } from "@/components/Analytics";

export default function BlogCTA() {
  const pathname = usePathname();

  return (
    <div className="bg-navy py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="font-heading text-xl font-bold text-white mb-3">
          Is AI recommending your company?
        </h3>
        <p className="text-white/60 mb-6">
          Scored across 4 dimensions. Prioritised fix list. 48-hour delivery.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/ai-visibility-audit"
            className="bg-orange hover:bg-orange-hover text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            onClick={() => trackCTAClick("ai_visibility_audit_cta", pathname)}
          >
            Get Your AI Visibility Audit
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
