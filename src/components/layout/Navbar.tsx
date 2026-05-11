"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const navLinks = [
  { href: "/research", label: "Research" },
  { href: "/tools", label: "AI Tools" },
  { href: "/toolkit", label: "Toolkit" },
  { href: "/resources", label: "Resources" },
  { href: "/blog", label: "Blog" },
  { href: "/work-with-me", label: "Work With Me" },
];

const aboutLinks = [
  { href: "/about", label: "The Studio" },
  { href: "/about/founder", label: "The Founder" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy border-b border-navy-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/gss-logo.png" alt="GSS" width={36} height={36} />
            <span className="font-heading font-bold text-lg text-white hidden sm:block">
              GTM Signal Studio
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/60 hover:text-white transition-colors font-body text-sm"
              >
                {link.label}
              </Link>
            ))}

            {/* About dropdown */}
            <div className="relative group">
              <Link
                href="/about"
                className="text-white/60 hover:text-white transition-colors font-body text-sm flex items-center gap-1"
              >
                About
                <svg className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              <div className="absolute top-full right-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150">
                <div className="bg-navy-light border border-navy-border rounded-lg shadow-lg py-1 min-w-[160px]">
                  {aboutLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-2.5 text-white/60 hover:text-white hover:bg-white/5 text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href="/ai-visibility-audit"
              className="bg-orange hover:bg-orange-hover text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors"
            >
              AI Visibility Audit
            </Link>
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-navy-border mt-2 pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 text-white/60 hover:text-white transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {/* About links - flat on mobile */}
            <div className="border-t border-navy-border mt-2 pt-2">
              <p className="text-white/30 text-xs font-mono uppercase tracking-wider py-1">About</p>
              {aboutLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block py-2 pl-3 text-white/60 hover:text-white transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <Link
              href="/ai-visibility-audit"
              className="block mt-3 bg-orange hover:bg-orange-hover text-white px-4 py-2 rounded-lg font-semibold text-sm text-center transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              AI Visibility Audit
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
