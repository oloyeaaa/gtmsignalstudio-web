import Image from "next/image";
import Link from "next/link";

export default function AuthorCard() {
  return (
    <div className="mt-12 flex items-start gap-4 bg-cream border border-light-border rounded-xl p-6">
      <Image
        src="/oloye-profile.png"
        alt="Oloye Adeosun"
        width={56}
        height={56}
        className="rounded-full flex-shrink-0 object-cover"
      />
      <div>
        <Link href="/about" className="font-heading font-bold text-text-dark hover:text-orange transition-colors">
          Oloye Adeosun
        </Link>
        <p className="text-text-muted text-sm mt-1 leading-relaxed">
          Marketing Manager, Enterprise &amp; Automation. Publishes original
          research on AI visibility and enterprise marketing at GTM Signal
          Studio. Author of the{" "}
          <Link href="/research/ai-visibility-benchmark-2026" className="text-orange hover:underline">
            AI Visibility Benchmark 2026
          </Link>{" "}
          (50 enterprise companies scored) and the{" "}
          <Link href="/ai-visibility" className="text-orange hover:underline">
            AI Visibility Framework
          </Link>.
        </p>
        <div className="flex gap-4 mt-2">
          <a
            href="https://www.linkedin.com/in/oloyeadeosun/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange text-sm hover:text-orange-hover transition-colors"
          >
            LinkedIn &rarr;
          </a>
          <Link
            href="/research"
            className="text-orange text-sm hover:text-orange-hover transition-colors"
          >
            Research &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
