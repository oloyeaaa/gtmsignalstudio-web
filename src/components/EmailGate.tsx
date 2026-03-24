"use client";

import { useState } from "react";

interface EmailGateProps {
  magnet: string;
  source?: string;
  downloadUrl: string;
  buttonLabel?: string;
  successLabel?: string;
  buttonClass?: string;
}

export default function EmailGate({
  magnet,
  source,
  downloadUrl,
  buttonLabel = "Get Free Download",
  successLabel = "Download Now",
  buttonClass = "bg-orange hover:bg-orange-hover text-white",
}: EmailGateProps) {
  const [state, setState] = useState<"idle" | "form" | "loading" | "done">(
    "idle"
  );
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setState("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, magnet, source }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Something went wrong. Try again.");
        setState("form");
        return;
      }

      setState("done");
    } catch {
      setError("Network error. Please try again.");
      setState("form");
    }
  }

  if (state === "idle") {
    return (
      <button
        onClick={() => setState("form")}
        className={`inline-block font-semibold text-sm px-7 py-3 rounded-lg transition-colors ${buttonClass}`}
      >
        {buttonLabel}
      </button>
    );
  }

  if (state === "done") {
    return (
      <div className="space-y-3">
        <p className="text-sm text-green-400 font-medium">
          Check your inbox for a welcome email.
        </p>
        <a
          href={downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-block font-semibold text-sm px-7 py-3 rounded-lg transition-colors ${buttonClass}`}
        >
          {successLabel}
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 max-w-sm">
      <p className="text-muted text-xs">
        Enter your email to get the download link. You&apos;ll also get The GTM
        Signal — weekly builder tools.
      </p>
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          required
          className="flex-1 bg-white/[0.06] border border-navy-border rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-muted/50 focus:outline-none focus:border-orange transition-colors"
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="bg-orange hover:bg-orange-hover text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors disabled:opacity-50"
        >
          {state === "loading" ? "..." : "Get it"}
        </button>
      </div>
      {error && <p className="text-red-400 text-xs">{error}</p>}
    </form>
  );
}
