"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { trackNewsletterClick } from "@/components/Analytics";

export default function InlineSubscribe() {
  const pathname = usePathname();
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [firstName, setFirstName] = useState("");
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
        body: JSON.stringify({
          email,
          first_name: firstName,
          magnet: "inline-blog-subscribe",
          source: pathname,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Something went wrong. Try again.");
        setState("idle");
        return;
      }

      trackNewsletterClick(pathname);
      setState("done");
    } catch {
      setError("Network error. Please try again.");
      setState("idle");
    }
  }

  if (state === "done") {
    return (
      <div className="my-12 bg-white border border-light-border rounded-xl shadow-sm p-8 text-center">
        <p className="text-text-body text-sm leading-relaxed">
          You are in. Check your inbox for a welcome email from The GTM Signal.
        </p>
      </div>
    );
  }

  return (
    <div className="my-12 bg-white border border-light-border rounded-xl shadow-sm p-8 max-w-md mx-auto">
      <p className="text-text-dark text-base font-heading font-bold mb-1">
        Enjoying this?
      </p>
      <p className="text-text-muted text-sm mb-5">
        One email per week. Research, frameworks, and data on AI visibility and enterprise marketing.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First name"
          required
          className="w-full bg-cream border border-light-border rounded-lg px-4 py-3 text-sm text-text-dark placeholder:text-text-muted/50 focus:outline-none focus:border-orange transition-colors"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          required
          className="w-full bg-cream border border-light-border rounded-lg px-4 py-3 text-sm text-text-dark placeholder:text-text-muted/50 focus:outline-none focus:border-orange transition-colors"
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="w-full bg-orange hover:bg-orange-hover text-white font-semibold text-sm px-6 py-3 rounded-lg transition-colors disabled:opacity-50"
        >
          {state === "loading" ? "Joining..." : "Join the Studio"}
        </button>
      </form>
      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
      <p className="text-text-muted/60 text-xs mt-3 text-center">No spam. Unsubscribe anytime.</p>
    </div>
  );
}
