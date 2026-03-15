"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

// Declare gtag on window
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

/**
 * Track a custom GA4 event
 * Usage: trackEvent("cta_click", { cta_name: "free_audit", page: "/blog/..." })
 */
export function trackEvent(eventName: string, params: Record<string, string | number> = {}) {
  if (typeof window !== "undefined" && window.gtag && GA_ID) {
    window.gtag("event", eventName, params);
  }
}

/**
 * GSS Funnel Events — mapped to GA4 for funnel visualization
 *
 * FUNNEL STAGES (in GA4 → Explore → Funnel):
 * 1. page_view (any page)           — Visitor
 * 2. blog_read (blog post)          — Reader
 * 3. topic_explore (topics page)    — Engaged
 * 4. audit_page_view (/audit)       — Interested
 * 5. cta_click (any CTA button)     — Intent
 * 6. calendly_click (book a call)   — Conversion
 * 7. newsletter_click (subscribe)   — Nurture
 */

export function trackCTAClick(ctaName: string, page: string) {
  trackEvent("cta_click", { cta_name: ctaName, page_path: page });
}

export function trackCalendlyClick(page: string) {
  trackEvent("calendly_click", { page_path: page });
}

export function trackNewsletterClick(page: string) {
  trackEvent("newsletter_click", { page_path: page });
}

export function trackAuditPageView() {
  trackEvent("audit_page_view", {});
}

export function trackTopicExplore(topicSlug: string) {
  trackEvent("topic_explore", { topic: topicSlug });
}

export function trackBlogRead(postSlug: string, category: string, readingTime: number) {
  trackEvent("blog_read", {
    post_slug: postSlug,
    category: category,
    reading_time: readingTime,
  });
}

export default function Analytics() {
  const pathname = usePathname();

  // Track page views on route change
  useEffect(() => {
    if (GA_ID && typeof window !== "undefined" && window.gtag) {
      window.gtag("config", GA_ID, {
        page_path: pathname,
      });
    }
  }, [pathname]);

  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            page_path: window.location.pathname,
            send_page_view: true
          });
        `}
      </Script>
    </>
  );
}
