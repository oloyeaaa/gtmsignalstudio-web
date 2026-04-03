import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "LinkedIn Comment Assist — Chrome Extension",
  description:
    "AI-powered Chrome extension that generates on-brand LinkedIn comments. Reads posts, articles, and newsletters. 5 comment styles. Claude or OpenAI. Free and open source.",
  keywords: [
    "LinkedIn comment extension",
    "LinkedIn chrome extension",
    "AI LinkedIn comments",
    "LinkedIn engagement tool",
    "LinkedIn comment generator",
  ],
};

const features = [
  {
    title: "Reads everything",
    description:
      "Feed posts, articles, and newsletters. The extension extracts author, title, and body content from any LinkedIn content type.",
  },
  {
    title: "5 comment styles",
    description:
      "Agree, Add Value, Question, Challenge, or Witty. Each generates 3 options. Pick the one that fits, edit if needed, insert directly.",
  },
  {
    title: "Your voice, not AI voice",
    description:
      "The system prompt encodes your tone, banned words, preferred vocabulary, and identity context. Comments sound like you, not a chatbot.",
  },
  {
    title: "Reply to comments too",
    description:
      "Works on individual comments under posts. Reads both the original post and the comment for full context before generating a reply.",
  },
  {
    title: "Claude or OpenAI",
    description:
      "Uses Claude Haiku or GPT-4o-mini. You choose. Bring your own API key. Estimated cost: less than $1/month at 20 comments per day.",
  },
  {
    title: "Open source",
    description:
      "Full source code on GitHub. Fork it, change the voice prompts, make it yours. No tracking, no accounts, no data collection.",
  },
];

const howItWorks = [
  {
    step: "1",
    title: "Install the extension",
    description:
      "Download the source from GitHub, load it as an unpacked Chrome extension, and add your API key in the settings popup.",
  },
  {
    step: "2",
    title: "Browse LinkedIn normally",
    description:
      "GSS buttons appear on every post, article, newsletter, and comment. The extension detects content automatically as you scroll.",
  },
  {
    step: "3",
    title: "Click GSS, pick a style",
    description:
      "Choose Agree, Add Value, Question, Challenge, or Witty. The extension reads the content, sends it to the AI, and returns 3 comment options.",
  },
  {
    step: "4",
    title: "Edit and insert",
    description:
      "Select an option, edit it in the textarea if needed, then click Insert. The comment is placed directly into LinkedIn's comment box.",
  },
];

export default function LinkedInCommentAssistPage() {
  return (
    <>
      <PageHeader
        tagline="CHROME EXTENSION"
        title="LinkedIn Comment Assist"
        subtitle="AI-powered comment generator that reads posts, articles, and newsletters. Generates on-brand replies in your voice. 5 styles. 3 options per generation. Free and open source."
        breadcrumb={{ label: "Tools", href: "/resources/tools" }}
        stats={[
          { stat: "5", label: "Comment styles" },
          { stat: "3", label: "Options per gen" },
          { stat: "<$1", label: "Per month" },
          { stat: "OSS", label: "Open source" },
        ]}
      />

      {/* Features */}
      <section className="max-w-[1080px] mx-auto px-6 py-16">
        <p className="font-mono text-orange text-xs uppercase tracking-widest mb-3">
          WHAT IT DOES
        </p>
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-dark mb-10 tracking-tight">
          LinkedIn engagement without the AI voice.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-navy-light border border-navy-border rounded-xl p-7 flex flex-col"
            >
              <h3 className="font-heading font-semibold text-white text-base mb-3">
                {f.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>

        {/* How it works */}
        <p className="font-mono text-orange text-xs uppercase tracking-widest mb-3">
          HOW IT WORKS
        </p>
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-dark mb-10 tracking-tight">
          Four steps. No account needed.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {howItWorks.map((s) => (
            <div
              key={s.step}
              className="bg-navy-light border border-navy-border rounded-xl p-7"
            >
              <div className="font-mono text-2xl font-bold text-orange mb-3">
                {s.step}
              </div>
              <h3 className="font-heading font-semibold text-white text-sm mb-2">
                {s.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>

        {/* Comment Styles */}
        <section className="border-t border-light-border pt-16 mb-16">
          <p className="font-mono text-orange text-xs uppercase tracking-widest mb-3">
            COMMENT STYLES
          </p>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-dark mb-10 tracking-tight">
            Five modes. Each generates three options.
          </h2>

          <div className="space-y-4">
            {[
              {
                name: "Agree",
                description:
                  "Grounds agreement in something concrete. A pattern, a data point, a parallel observation. Never generic praise.",
              },
              {
                name: "Add Value",
                description:
                  "Introduces a new dimension the author did not cover. A contrarian nuance, a practical implication, a related insight.",
              },
              {
                name: "Question",
                description:
                  "Asks a genuine, specific follow-up question that shows you read the post carefully. One question only.",
              },
              {
                name: "Challenge",
                description:
                  "Respectfully challenges one specific point. States a counter-position with reasoning. Calm, clinical, peer-to-peer.",
              },
              {
                name: "Witty",
                description:
                  "Dry, deadpan British humour. Funny because it is true. The kind of line you would say with a straight face at a dinner party.",
              },
            ].map((style) => (
              <div
                key={style.name}
                className="bg-navy-light border border-navy-border rounded-lg px-7 py-5 flex flex-col sm:flex-row sm:items-start gap-4"
              >
                <span className="font-mono text-xs uppercase tracking-wider text-orange bg-orange/10 px-3 py-1 rounded w-fit flex-shrink-0">
                  {style.name}
                </span>
                <p className="text-muted text-sm leading-relaxed">{style.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Voice encoding */}
        <section className="border-t border-light-border pt-16 mb-16">
          <p className="font-mono text-orange text-xs uppercase tracking-widest mb-3">
            VOICE ENCODING
          </p>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-dark mb-4 tracking-tight">
            Not a generic AI. Your voice.
          </h2>
          <p className="text-muted text-base max-w-[640px] leading-relaxed mb-8">
            The extension ships with a system prompt that encodes identity, tone,
            banned words, preferred vocabulary, and strategic context. Every
            comment is generated through this lens. Fork the repo and replace the
            prompts with your own voice.
          </p>

          <div className="bg-navy-light border border-navy-border rounded-xl p-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-heading font-semibold text-white text-sm mb-3">
                  Banned words (33)
                </h4>
                <p className="text-muted text-xs leading-relaxed font-mono">
                  Delve, Tapestry, Unlock, Unleash, Elevate, Game-changer,
                  Revolutionize, Foster, Synergy, Holistic, Seamless, Robust,
                  Dynamic, Exciting, Amazing, Incredible, Journey, Authentic,
                  Passionate, Driven, Excited, Thrilled, Grateful...
                </p>
              </div>
              <div>
                <h4 className="font-heading font-semibold text-white text-sm mb-3">
                  Preferred vocabulary
                </h4>
                <p className="text-muted text-xs leading-relaxed font-mono">
                  Signal, noise, variance, infrastructure, architecture,
                  diagnostic, clinical, pipeline, threshold, baseline, delta,
                  structural shift, redesign, deploy, precise, engineered.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Privacy note */}
        <section className="border-t border-light-border pt-16 mb-16">
          <p className="font-mono text-orange text-xs uppercase tracking-widest mb-3">
            PRIVACY
          </p>
          <h2 className="font-heading text-xl font-bold text-text-dark mb-4">
            No tracking. No accounts. No data collection.
          </h2>
          <div className="text-muted text-sm leading-relaxed space-y-3 max-w-[640px]">
            <p>
              The extension runs entirely in your browser. Post content is sent
              directly from your browser to the AI provider (Anthropic or OpenAI)
              using your own API key. No data passes through GTM Signal Studio
              servers.
            </p>
            <p>
              We do not collect, store, or transmit any LinkedIn data, post content,
              or personal information. Your API key is stored locally in Chrome&apos;s
              sync storage and never leaves your browser except to authenticate
              with your chosen AI provider.
            </p>
            <p>
              For full details, see our{" "}
              <Link href="/privacy" className="text-orange hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-navy-light border border-navy-border rounded-xl p-10 text-center">
          <h3 className="font-heading text-xl font-bold text-white mb-3">
            Download from GitHub
          </h3>
          <p className="text-muted text-sm mb-6 max-w-lg mx-auto">
            Clone the repo, load as an unpacked extension in Chrome, add your API
            key. Full setup instructions in the README.
          </p>
          <a
            href="https://github.com/oloyeaaa/gss-open-tools/tree/master/chrome-extensions/linkedin-comment-extension"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-orange hover:bg-orange-hover text-white font-heading font-semibold text-sm px-6 py-3 rounded-md transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            View on GitHub
          </a>
        </div>
      </section>

      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "GSS LinkedIn Comment Assist",
            applicationCategory: "BrowserApplication",
            operatingSystem: "Chrome",
            description:
              "AI-powered Chrome extension that generates on-brand LinkedIn comments. Reads posts, articles, and newsletters. 5 comment styles. Free and open source.",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "GBP",
            },
            author: {
              "@type": "Organization",
              name: "GTM Signal Studio",
              url: "https://gtmsignalstudio.com",
            },
            downloadUrl:
              "https://github.com/oloyeaaa/gss-open-tools/tree/master/chrome-extensions/linkedin-comment-extension",
          }),
        }}
      />
    </>
  );
}
