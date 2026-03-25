import Image from "next/image";

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
        <p className="font-heading font-bold text-text-dark">Oloye Adeosun</p>
        <p className="text-text-muted text-sm mt-1 leading-relaxed">
          Enterprise marketing practitioner. Writes about what actually works in B2B GTM, MarTech, and AI visibility.
        </p>
        <a
          href="https://www.linkedin.com/in/oloyeadeosun/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-orange text-sm hover:text-orange-hover mt-2 inline-block transition-colors"
        >
          Connect on LinkedIn →
        </a>
      </div>
    </div>
  );
}
