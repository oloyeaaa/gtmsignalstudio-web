"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

/**
 * Track a custom GA4 event.
 * Only fires if analytics consent has been granted.
 */
export function trackEvent(eventName: string, params: Record<string, string | number> = {}) {
  if (typeof window !== "undefined" && window.gtag && GA_ID) {
    window.gtag("event", eventName, params);
  }
}

// GSS Funnel Events
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

/**
 * Update consent state in gtag when user accepts/declines cookies.
 * Called from CookieBanner component.
 */
export function updateGtagConsent(analyticsGranted: boolean) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("consent", "update", {
      analytics_storage: analyticsGranted ? "granted" : "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
  }
}

/**
 * Read initial consent from localStorage (client-side only).
 * Returns "denied" if no consent stored or if analytics not granted.
 */
function getInitialAnalyticsConsent(): "granted" | "denied" {
  if (typeof window === "undefined") return "denied";
  try {
    const raw = localStorage.getItem("cookie_consent");
    if (!raw) return "denied";
    const parsed = JSON.parse(raw);
    // Support legacy string format
    if (typeof parsed === "string") return parsed === "granted" ? "granted" : "denied";
    return parsed.analytics ? "granted" : "denied";
  } catch {
    return "denied";
  }
}

export default function Analytics() {
  const pathname = usePathname();
  const [consentState, setConsentState] = useState<"granted" | "denied">("denied");
  const [mounted, setMounted] = useState(false);

  // Read consent from localStorage after mount (avoids hydration mismatch)
  useEffect(() => {
    setConsentState(getInitialAnalyticsConsent());
    setMounted(true);
  }, []);

  // Track page views on route change
  useEffect(() => {
    if (GA_ID && typeof window !== "undefined" && window.gtag) {
      window.gtag("config", GA_ID, {
        page_path: pathname,
      });
    }
  }, [pathname]);

  if (!GA_ID || !mounted) return null;

  return (
    <>
      {/* Set default consent BEFORE gtag loads — always denied until user opts in */}
      <Script id="gtag-consent-default" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            'analytics_storage': 'denied',
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'wait_for_update': 500
          });
        `}
      </Script>
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
            send_page_view: true,
            anonymize_ip: true
          });
        `}
      </Script>
      {/* Apply stored consent after gtag is initialised */}
      {consentState === "granted" && (
        <Script id="gtag-consent-restore" strategy="afterInteractive">
          {`
            if (typeof gtag === 'function') {
              gtag('consent', 'update', {
                'analytics_storage': 'granted'
              });
            }
          `}
        </Script>
      )}
      {/* Microsoft Clarity — loads unconditionally */}
      <Script id="clarity-init" strategy="afterInteractive">
        {`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "w5wwbsx2ln");
        `}
      </Script>
    </>
  );
}
