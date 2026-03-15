import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-navy border-t border-navy-border mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image src="/gss-logo.png" alt="GSS" width={32} height={32} />
              <span className="font-heading font-bold text-white">GTM Signal Studio</span>
            </Link>
            <p className="text-muted text-sm leading-relaxed">
              Signal-led go-to-market for B2B founders. Volume is noise. Precision is signal.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-heading font-bold text-white text-sm mb-4">Navigation</h4>
            <ul className="space-y-2">
              {[
                { href: "/blog", label: "Blog" },
                { href: "/about", label: "About" },
                { href: "/work-with-me", label: "Work With Me" },
                { href: "/newsletter", label: "Newsletter" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-heading font-bold text-white text-sm mb-4">Resources</h4>
            <ul className="space-y-2">
              {[
                { href: "/audit", label: "Free GTM Audit" },
                { href: "/resources", label: "GTM Playbook" },
                { href: "/resources/tools", label: "Tools" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-heading font-bold text-white text-sm mb-4">Connect</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.linkedin.com/in/oloyeadeosun/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-white text-sm transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://newsletter.gtmsignalstudio.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-white text-sm transition-colors"
                >
                  Newsletter
                </a>
              </li>
              <li>
                <a
                  href="https://calendly.com/oloye-getclarioiq/audit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-white text-sm transition-colors"
                >
                  Book a Call
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-navy-border mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-muted text-xs">
            &copy; {new Date().getFullYear()} GTM Signal Studio. All rights reserved.
          </p>
          <p className="text-muted text-xs font-mono">
            Volume is noise. Precision is signal.
          </p>
        </div>
      </div>
    </footer>
  );
}
