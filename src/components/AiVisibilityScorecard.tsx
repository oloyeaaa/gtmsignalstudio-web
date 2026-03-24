"use client";

import { useState } from "react";

interface DimensionState {
  score: number;
  answered: boolean;
}

const dimensions = [
  {
    id: "citation",
    icon: "◎",
    name: "AI Citation Presence",
    question: "Does AI mention your company by name?",
    instruction:
      "Open Google AI Mode → type your category keyword → read the AI-generated answer.",
    options: [
      { value: 0, label: "Not mentioned anywhere in the AI answer" },
      { value: 5, label: "Appears in a linked source but not named in the text" },
      { value: 10, label: "Named in the answer alongside competitors" },
      { value: 15, label: "Named AND described with specific detail" },
    ],
  },
  {
    id: "entity",
    icon: "◈",
    name: "Entity Recognition",
    question: "Does AI know what your company is?",
    instruction:
      'Ask Google AI Mode or Perplexity: "What does [Your Company] do?" → read the response.',
    options: [
      { value: 0, label: "No information or confuses you with another entity" },
      { value: 5, label: "Basic information but gets your services wrong" },
      { value: 10, label: "Correctly describes your core service and industry" },
      { value: 15, label: "Describes service, names clients or outcomes, positions you in category" },
    ],
  },
  {
    id: "structure",
    icon: "◧",
    name: "Content Structure",
    question: "Is your content built for AI to read?",
    instruction:
      "Check your website\u2019s blog, case studies, and service pages. Tick all that apply.",
    checklist: [
      { value: 3, label: "Published content in the last 90 days" },
      { value: 3, label: "Content answers specific questions (not just \u201Cabout us\u201D pages)" },
      { value: 3, label: "Named frameworks, methodologies, or proprietary terms" },
      { value: 3, label: "Data, statistics, or original research" },
      { value: 3, label: "Content on your main domain (not Medium, Substack, or a separate platform)" },
    ],
  },
  {
    id: "breadth",
    icon: "◉",
    name: "Citation Breadth",
    question: "How many AI platforms can find you?",
    instruction:
      "Run your category keyword through each platform and check if your company is mentioned.",
    platforms: [
      { name: "Google AI Mode", value: 5 },
      { name: "Perplexity", value: 5 },
      { name: "ChatGPT", value: 5 },
    ],
  },
];

const bands = [
  { min: 0, max: 15, label: "Invisible", color: "text-red-400", description: "AI does not know you exist. Buyers using AI research will never find you. Your competitors who score higher are capturing the leads you never see." },
  { min: 16, max: 30, label: "Weak Signal", color: "text-orange", description: "AI has fragments of information about you, but it is not recommending you. You are losing deals to companies with stronger AI visibility \u2014 and you may not even know it." },
  { min: 31, max: 45, label: "Emerging", color: "text-yellow-400", description: "AI recognises you but does not consistently cite you. You are in the game but not winning it. Targeted fixes to content structure and citation breadth will move you fast." },
  { min: 46, max: 60, label: "Strong Signal", color: "text-green-400", description: "AI actively cites you in your category. You are being recommended while your competitors are being ignored. Maintain this with regular, AI-structured content." },
];

export default function AiVisibilityScorecard() {
  const [keyword, setKeyword] = useState("");
  const [started, setStarted] = useState(false);
  const [scores, setScores] = useState<Record<string, DimensionState>>({
    citation: { score: 0, answered: false },
    entity: { score: 0, answered: false },
    structure: { score: 0, answered: false },
    breadth: { score: 0, answered: false },
  });
  const [structureChecks, setStructureChecks] = useState<Record<number, boolean>>({});
  const [breadthChecks, setBreadthChecks] = useState<Record<number, boolean>>({});
  const [showResults, setShowResults] = useState(false);
  const [gateEmail, setGateEmail] = useState("");
  const [gateState, setGateState] = useState<"idle" | "loading" | "done">("idle");
  const [gateError, setGateError] = useState("");

  const totalScore = Object.values(scores).reduce((sum, d) => sum + d.score, 0);
  const allAnswered = Object.values(scores).every((d) => d.answered);
  const band = bands.find((b) => totalScore >= b.min && totalScore <= b.max) || bands[0];

  function handleRadio(dimensionId: string, value: number) {
    setScores((prev) => ({
      ...prev,
      [dimensionId]: { score: value, answered: true },
    }));
  }

  function handleStructureCheck(index: number, checked: boolean) {
    const newChecks = { ...structureChecks, [index]: checked };
    setStructureChecks(newChecks);
    const dim = dimensions.find((d) => d.id === "structure")!;
    const total = dim.checklist!.reduce(
      (sum, item, i) => sum + (newChecks[i] ? item.value : 0),
      0
    );
    setScores((prev) => ({
      ...prev,
      structure: { score: total, answered: Object.keys(newChecks).length > 0 },
    }));
  }

  function handleBreadthCheck(index: number, checked: boolean) {
    const newChecks = { ...breadthChecks, [index]: checked };
    setBreadthChecks(newChecks);
    const dim = dimensions.find((d) => d.id === "breadth")!;
    const total = dim.platforms!.reduce(
      (sum, item, i) => sum + (newChecks[i] ? item.value : 0),
      0
    );
    setScores((prev) => ({
      ...prev,
      breadth: { score: total, answered: Object.keys(newChecks).length > 0 },
    }));
  }

  async function handleGateSubmit(e: React.FormEvent) {
    e.preventDefault();
    setGateError("");
    setGateState("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: gateEmail, magnet: "ai-visibility-scorecard", source: "ai-visibility-scorecard" }),
      });
      if (!res.ok) {
        const data = await res.json();
        setGateError(data.error || "Something went wrong.");
        setGateState("idle");
        return;
      }
      setGateState("done");
      setShowResults(true);
    } catch {
      setGateError("Network error. Please try again.");
      setGateState("idle");
    }
  }

  // Track with GA4
  function trackEvent(action: string, label?: string) {
    if (typeof window !== "undefined" && "gtag" in window) {
      const w = window as unknown as { gtag: (...args: unknown[]) => void };
      w.gtag("event", action, {
        event_category: "scorecard",
        event_label: label,
        value: totalScore,
      });
    }
  }

  if (!started) {
    return (
      <div className="space-y-6">
        <div className="bg-navy-light border border-navy-border rounded-xl p-8">
          <p className="font-mono text-orange text-sm mb-3 tracking-wider">BEFORE YOU START</p>
          <h3 className="font-heading text-xl font-bold text-white mb-3">
            Enter your core category keyword
          </h3>
          <p className="text-muted text-sm leading-relaxed mb-4">
            This is the phrase a buyer would type into an AI tool to find a company like yours.
            Examples: &quot;B2B marketing agency London&quot;, &quot;Salesforce consulting partner UK&quot;, &quot;fractional CFO for startups&quot;.
          </p>
          <div className="flex gap-3 max-w-lg">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="e.g. management consulting UK"
              className="flex-1 bg-white/[0.06] border border-navy-border rounded-lg px-4 py-3 text-sm text-white placeholder:text-muted/50 focus:outline-none focus:border-orange transition-colors"
            />
            <button
              onClick={() => {
                if (keyword.trim()) {
                  setStarted(true);
                  trackEvent("scorecard_started", keyword);
                }
              }}
              disabled={!keyword.trim()}
              className="bg-orange hover:bg-orange-hover text-white font-semibold text-sm px-6 py-3 rounded-lg transition-colors disabled:opacity-40"
            >
              Start
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Keyword display */}
      <div className="flex items-center gap-3 bg-navy-light border border-navy-border rounded-lg px-4 py-2.5">
        <span className="text-muted text-xs">Keyword:</span>
        <span className="font-mono text-orange text-sm">{keyword}</span>
        <button
          onClick={() => { setStarted(false); setKeyword(""); }}
          className="text-muted/50 hover:text-white text-xs ml-auto transition-colors"
        >
          Change
        </button>
      </div>

      {/* Dimension 1: Citation Presence */}
      <DimensionCard
        dim={dimensions[0]}
        selectedValue={scores.citation.answered ? scores.citation.score : null}
        onSelect={(v) => handleRadio("citation", v)}
      />

      {/* Dimension 2: Entity Recognition */}
      <DimensionCard
        dim={dimensions[1]}
        selectedValue={scores.entity.answered ? scores.entity.score : null}
        onSelect={(v) => handleRadio("entity", v)}
      />

      {/* Dimension 3: Content Structure (checklist) */}
      <div className="bg-navy-light border border-navy-border rounded-xl p-6">
        <div className="flex items-start gap-4 mb-4">
          <span className="text-orange text-2xl font-mono flex-shrink-0">◧</span>
          <div>
            <h3 className="font-heading font-bold text-white text-lg mb-1">
              Content Structure
            </h3>
            <p className="text-muted text-sm">{dimensions[2].question}</p>
          </div>
          <span className="font-mono text-orange text-sm bg-orange/10 px-2 py-0.5 rounded ml-auto flex-shrink-0">
            {scores.structure.score}/15
          </span>
        </div>
        <p className="text-muted/70 text-xs mb-4 ml-10">{dimensions[2].instruction}</p>
        <div className="space-y-2 ml-10">
          {dimensions[2].checklist!.map((item, i) => (
            <label key={i} className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={!!structureChecks[i]}
                onChange={(e) => handleStructureCheck(i, e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-navy-border bg-white/[0.06] accent-orange"
              />
              <span className="text-white/80 text-sm group-hover:text-white transition-colors">
                {item.label}
                <span className="text-muted/50 text-xs ml-2">(+{item.value})</span>
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Dimension 4: Citation Breadth (platform checks) */}
      <div className="bg-navy-light border border-navy-border rounded-xl p-6">
        <div className="flex items-start gap-4 mb-4">
          <span className="text-orange text-2xl font-mono flex-shrink-0">◉</span>
          <div>
            <h3 className="font-heading font-bold text-white text-lg mb-1">
              Citation Breadth
            </h3>
            <p className="text-muted text-sm">{dimensions[3].question}</p>
          </div>
          <span className="font-mono text-orange text-sm bg-orange/10 px-2 py-0.5 rounded ml-auto flex-shrink-0">
            {scores.breadth.score}/15
          </span>
        </div>
        <p className="text-muted/70 text-xs mb-4 ml-10">{dimensions[3].instruction}</p>
        <div className="space-y-2 ml-10">
          {dimensions[3].platforms!.map((platform, i) => (
            <label key={i} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={!!breadthChecks[i]}
                onChange={(e) => handleBreadthCheck(i, e.target.checked)}
                className="w-4 h-4 rounded border-navy-border bg-white/[0.06] accent-orange"
              />
              <span className="text-white/80 text-sm group-hover:text-white transition-colors">
                {platform.name}
                <span className="text-muted/50 text-xs ml-2">(+{platform.value})</span>
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Running total */}
      <div className="bg-navy-light border border-orange/30 rounded-xl p-6 text-center">
        <p className="text-muted text-xs mb-2">YOUR SIGNAL SCORE</p>
        <p className="font-heading text-5xl font-bold text-orange mb-1">{totalScore}</p>
        <p className="text-muted text-sm">out of 60</p>
      </div>

      {/* Gate or Results */}
      {allAnswered && !showResults && (
        <div className="bg-navy-light border border-orange rounded-xl p-8 text-center">
          <p className="font-mono text-orange text-sm mb-2 tracking-wider">YOUR RESULTS</p>
          <h3 className="font-heading text-xl font-bold text-white mb-3">
            See what your score means — and what to fix first
          </h3>
          <p className="text-muted text-sm mb-6 max-w-md mx-auto">
            Enter your email to unlock your personalised result breakdown, priority fixes, and the AI Citation Cheat Sheet (7 signals that make AI cite your company).
          </p>
          {gateState === "done" ? null : (
            <form onSubmit={handleGateSubmit} className="max-w-sm mx-auto space-y-3">
              <div className="flex gap-2">
                <input
                  type="email"
                  value={gateEmail}
                  onChange={(e) => setGateEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  className="flex-1 bg-white/[0.06] border border-navy-border rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-muted/50 focus:outline-none focus:border-orange transition-colors"
                />
                <button
                  type="submit"
                  disabled={gateState === "loading"}
                  className="bg-orange hover:bg-orange-hover text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors disabled:opacity-50"
                >
                  {gateState === "loading" ? "..." : "Unlock"}
                </button>
              </div>
              <p className="text-muted/60 text-xs">
                You&apos;ll also get The GTM Signal — weekly signal detection for B2B founders.
              </p>
              {gateError && <p className="text-red-400 text-xs">{gateError}</p>}
            </form>
          )}
        </div>
      )}

      {/* Results (ungated after email) */}
      {showResults && (
        <div className="space-y-6">
          {/* Band result */}
          <div className="bg-navy-light border border-orange rounded-xl p-8 text-center">
            <p className="font-mono text-orange text-sm mb-2 tracking-wider">YOUR SIGNAL</p>
            <p className={`font-heading text-3xl font-bold mb-3 ${band.color}`}>
              {band.label}
            </p>
            <p className="text-muted text-sm max-w-lg mx-auto leading-relaxed">
              {band.description}
            </p>
          </div>

          {/* Per-dimension breakdown */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {dimensions.map((d) => (
              <div key={d.id} className="bg-navy-light border border-navy-border rounded-xl p-4 text-center">
                <span className="text-orange text-lg font-mono">{d.icon}</span>
                <p className="font-heading text-2xl font-bold text-orange mt-1">
                  {scores[d.id].score}
                </p>
                <p className="text-muted text-xs mt-1">{d.name}</p>
              </div>
            ))}
          </div>

          {/* Next step CTA */}
          <div className="bg-navy-light border border-navy-border rounded-xl p-8 text-center">
            <h3 className="font-heading text-xl font-bold text-white mb-3">
              Want the full analysis?
            </h3>
            <p className="text-muted text-sm mb-6 max-w-lg mx-auto">
              This scorecard detects the signal. The AI Visibility Audit gives you the fix.
              We run your company through our scanner, score all 4 dimensions with real data,
              and deliver a branded report with a prioritised action plan. 48 hours. £297.
            </p>
            <a
              href="mailto:oloye@gtmsignalstudio.com?subject=AI%20Visibility%20Audit&body=Company%3A%20%0AWebsite%3A%20%0AKeywords%3A%20"
              onClick={() => trackEvent("scorecard_audit_cta", keyword)}
              className="inline-block bg-orange hover:bg-orange-hover text-white font-semibold text-sm px-8 py-3 rounded-lg transition-colors"
            >
              Get the Full Audit — £297
            </a>
            <p className="text-muted text-xs mt-3">No call required. Reply with your URL.</p>
          </div>

          {/* Cheat sheet link */}
          <div className="text-center">
            <p className="text-muted text-sm mb-2">
              While you wait — read the implementation guide:
            </p>
            <a
              href="/resources/ai-citation-signals"
              className="text-orange hover:text-orange-hover font-semibold text-sm transition-colors"
            >
              7 Signals That Make AI Cite Your Company →
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

/* Reusable radio dimension card */
function DimensionCard({
  dim,
  selectedValue,
  onSelect,
}: {
  dim: (typeof dimensions)[0];
  selectedValue: number | null;
  onSelect: (v: number) => void;
}) {
  return (
    <div className="bg-navy-light border border-navy-border rounded-xl p-6">
      <div className="flex items-start gap-4 mb-4">
        <span className="text-orange text-2xl font-mono flex-shrink-0">{dim.icon}</span>
        <div>
          <h3 className="font-heading font-bold text-white text-lg mb-1">{dim.name}</h3>
          <p className="text-muted text-sm">{dim.question}</p>
        </div>
        <span className="font-mono text-orange text-sm bg-orange/10 px-2 py-0.5 rounded ml-auto flex-shrink-0">
          {selectedValue !== null ? selectedValue : "—"}/15
        </span>
      </div>
      <p className="text-muted/70 text-xs mb-4 ml-10">{dim.instruction}</p>
      <div className="space-y-2 ml-10">
        {dim.options!.map((opt) => (
          <label
            key={opt.value}
            className={`flex items-start gap-3 cursor-pointer group rounded-lg px-3 py-2 transition-colors ${
              selectedValue === opt.value
                ? "bg-orange/10 border border-orange/30"
                : "hover:bg-white/[0.03] border border-transparent"
            }`}
          >
            <input
              type="radio"
              name={dim.id}
              checked={selectedValue === opt.value}
              onChange={() => onSelect(opt.value)}
              className="mt-1 w-4 h-4 accent-orange"
            />
            <span className="text-white/80 text-sm">
              {opt.label}
              <span className="text-muted/50 text-xs ml-2">({opt.value} pts)</span>
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
