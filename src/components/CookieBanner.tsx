"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Consent = "granted" | "denied" | null;

function getStoredConsent(): Consent {
  if (typeof window === "undefined") return null;
  const value = localStorage.getItem("cookie_consent");
  if (value === "granted" || value === "denied") return value;
  return null;
}

export function hasAnalyticsConsent(): boolean {
  return getStoredConsent() === "granted";
}

export default function CookieBanner() {
  const [consent, setConsent] = useState<Consent>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = getStoredConsent();
    setConsent(stored);
    setLoaded(true);
  }, []);

  function handleAccept() {
    localStorage.setItem("cookie_consent", "granted");
    setConsent("granted");
    // Reload to activate analytics
    window.location.reload();
  }

  function handleDecline() {
    localStorage.setItem("cookie_consent", "denied");
    setConsent("denied");
  }

  // Don't render until client-side check is done
  if (!loaded) return null;

  // Don't show if user already made a choice
  if (consent !== null) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-navy border-t border-white/10 px-4 py-4 sm:px-6">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-4">
        <p className="text-white/70 text-sm leading-relaxed flex-1">
          We use cookies to understand how you use our site (Google Analytics).
          No personal data is sold or shared.{" "}
          <Link
            href="/privacy"
            className="text-orange hover:underline"
          >
            Privacy Policy
          </Link>
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={handleDecline}
            className="text-white/50 hover:text-white text-sm px-4 py-2 border border-white/20 rounded-lg transition-colors"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="bg-orange hover:bg-orange/90 text-white text-sm font-semibold px-6 py-2 rounded-lg transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
