"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { updateGtagConsent } from "./Analytics";

type ConsentState = {
  essential: true; // Always on
  analytics: boolean;
  functional: boolean;
};

const DEFAULT_CONSENT: ConsentState = {
  essential: true,
  analytics: false,
  functional: false,
};

function getStoredConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("cookie_consent");
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    // Support legacy format ("granted"/"denied" string)
    if (typeof parsed === "string") {
      return {
        essential: true,
        analytics: parsed === "granted",
        functional: parsed === "granted",
      };
    }
    return { essential: true, analytics: !!parsed.analytics, functional: !!parsed.functional };
  } catch {
    return null;
  }
}

function saveConsent(consent: ConsentState) {
  localStorage.setItem("cookie_consent", JSON.stringify(consent));
  localStorage.setItem("cookie_consent_date", new Date().toISOString());
}

export function getConsent(): ConsentState {
  return getStoredConsent() || DEFAULT_CONSENT;
}

export default function CookieBanner() {
  const [consent, setConsent] = useState<ConsentState | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [draft, setDraft] = useState<ConsentState>(DEFAULT_CONSENT);

  useEffect(() => {
    const stored = getStoredConsent();
    setConsent(stored);
    if (stored) setDraft(stored);
    setLoaded(true);
  }, []);

  const applyConsent = useCallback((c: ConsentState) => {
    saveConsent(c);
    setConsent(c);
    updateGtagConsent(c.analytics);
  }, []);

  function handleAcceptAll() {
    applyConsent({ essential: true, analytics: true, functional: true });
  }

  function handleDeclineAll() {
    applyConsent({ essential: true, analytics: false, functional: false });
  }

  function handleSavePreferences() {
    applyConsent(draft);
  }

  if (!loaded || consent !== null) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-navy border-t border-white/10">
      <div className="max-w-4xl mx-auto px-4 py-5 sm:px-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="text-white/70 text-sm leading-relaxed flex-1">
              We use cookies to understand how you use our site and improve your experience.
              You can choose which cookies to allow.{" "}
              <Link href="/privacy" className="text-orange hover:underline">Privacy Policy</Link>
              {" "}/{" "}
              <Link href="/cookies" className="text-orange hover:underline">Cookie Policy</Link>
            </p>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="text-white/50 hover:text-white text-sm px-3 py-2 border border-white/20 rounded-lg transition-colors"
              >
                {showDetails ? "Hide" : "Manage"}
              </button>
              <button
                onClick={handleDeclineAll}
                className="text-white/50 hover:text-white text-sm px-4 py-2 border border-white/20 rounded-lg transition-colors"
              >
                Decline All
              </button>
              <button
                onClick={handleAcceptAll}
                className="bg-orange hover:bg-orange/90 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors"
              >
                Accept All
              </button>
            </div>
          </div>

          {showDetails && (
            <div className="border-t border-white/10 pt-4 space-y-3">
              {/* Essential */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white text-sm font-semibold">Essential</p>
                  <p className="text-white/50 text-xs">Required for the site to function. Cannot be disabled.</p>
                </div>
                <span className="text-xs text-white/40 font-mono">Always on</span>
              </div>

              {/* Analytics */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white text-sm font-semibold">Analytics</p>
                  <p className="text-white/50 text-xs">Google Analytics 4. Pages visited, time on site, referral source. No personal data.</p>
                </div>
                <button
                  onClick={() => setDraft(d => ({ ...d, analytics: !d.analytics }))}
                  className={`relative w-10 h-5 rounded-full transition-colors ${draft.analytics ? "bg-orange" : "bg-white/20"}`}
                  aria-label="Toggle analytics cookies"
                >
                  <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${draft.analytics ? "translate-x-5" : ""}`} />
                </button>
              </div>

              {/* Functional */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white text-sm font-semibold">Functional</p>
                  <p className="text-white/50 text-xs">Remembers your preferences (theme, cookie choice). Improves experience.</p>
                </div>
                <button
                  onClick={() => setDraft(d => ({ ...d, functional: !d.functional }))}
                  className={`relative w-10 h-5 rounded-full transition-colors ${draft.functional ? "bg-orange" : "bg-white/20"}`}
                  aria-label="Toggle functional cookies"
                >
                  <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${draft.functional ? "translate-x-5" : ""}`} />
                </button>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleSavePreferences}
                  className="bg-orange hover:bg-orange/90 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
