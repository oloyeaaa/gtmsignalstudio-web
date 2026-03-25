import Link from "next/link";

type Stat = {
  stat: string;
  label: string;
};

type PageHeaderProps = {
  tagline: string;
  title: string;
  subtitle?: string;
  stats?: Stat[];
  centered?: boolean;
  breadcrumb?: { label: string; href: string };
};

export default function PageHeader({
  tagline,
  title,
  subtitle,
  stats,
  centered = false,
  breadcrumb,
}: PageHeaderProps) {
  return (
    <section className="section-dark py-20 md:py-28">
      <div
        className={`max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 ${
          centered ? "text-center" : ""
        }`}
      >
        {breadcrumb && (
          <Link
            href={breadcrumb.href}
            className="text-orange font-mono text-sm hover:underline mb-4 inline-block"
          >
            &larr; {breadcrumb.label}
          </Link>
        )}
        <p className="font-mono text-orange text-sm mb-4 tracking-wider">
          {tagline}
        </p>
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p
            className={`text-muted text-lg md:text-xl leading-relaxed ${
              centered ? "max-w-2xl mx-auto" : ""
            }`}
          >
            {subtitle}
          </p>
        )}
        {stats && stats.length > 0 && (
          <div
            className={`grid grid-cols-2 md:grid-cols-${stats.length} gap-4 mt-8`}
          >
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-navy-light border border-navy-border rounded-xl p-4 text-center"
              >
                <p className="text-orange font-heading text-2xl font-bold">
                  {s.stat}
                </p>
                <p className="text-muted text-xs mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
