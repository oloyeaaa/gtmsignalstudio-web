import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description:
    "The page you are looking for does not exist. Explore GTM Signal Studio for signal-led go-to-market strategies, free audits, and B2B frameworks.",
  keywords: [
    "404",
    "page not found",
    "GTM Signal Studio",
  ],
};

export default function NotFound() {
  return (
    <section className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="font-mono text-orange text-sm tracking-wider mb-4">
          404
        </p>
        <h1 className="text-4xl font-bold text-navy mb-4">
          Page not found
        </h1>
        <p className="text-text-body mb-8">
          The page you are looking for does not exist or has been moved. Here are
          some places to start instead.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="bg-orange text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange/90 transition-colors"
          >
            Go home
          </Link>
          <Link
            href="/blog"
            className="border border-navy text-navy px-6 py-3 rounded-lg font-semibold hover:bg-navy hover:text-white transition-colors"
          >
            Read the blog
          </Link>
          <Link
            href="/audit"
            className="border border-orange text-orange px-6 py-3 rounded-lg font-semibold hover:bg-orange hover:text-white transition-colors"
          >
            Free GTM audit
          </Link>
        </div>
      </div>
    </section>
  );
}
