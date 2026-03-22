"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image src="/gss-logo.png" alt="GSS" width={32} height={32} />
              <span className="font-heading font-bold text-white">GTM Signal Studio</span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed">
              Signal-led go-to-market for B2B founders. Volume is noise. Precision is signal.
            </p>
          </div>

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
                  <Link href={link.href} className="text-white/50 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-white text-sm mb-4">Resources</h4>
            <ul className="space-y-2">
              {[
                { href: "/audit", label: "Free GTM Audit" },
                { href: "/resources", label: "GTM Playbook" },
                { href: "/resources/tools", label: "Tools" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/50 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-white text-sm mb-4">Connect</h4>
            <ul className="space-y-2">
              <li>
                <a href="https://www.linkedin.com/in/oloyeadeosun/" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white text-sm transition-colors">LinkedIn</a>
              </li>
              <li>
                <a href="https://newsletter.gtmsignalstudio.com" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white text-sm transition-colors">Newsletter</a>
              </li>
              <li>
                <a href="https://calendly.com/oloye-getclarioiq/audit" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white text-sm transition-colors">Book a Call</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-xs">
            &copy; {new Date().getFullYear()} GTM Signal Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-white/40 hover:text-white/70 text-xs transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-white/40 hover:text-white/70 text-xs transition-colors">
              Terms
            </Link>
            <button
              onClick={() => {
                if (typeof window !== "undefined") {
                  localStorage.removeItem("cookie_consent");
                  window.location.reload();
                }
              }}
              className="text-white/40 hover:text-white/70 text-xs transition-colors"
            >
              Cookie Settings
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
