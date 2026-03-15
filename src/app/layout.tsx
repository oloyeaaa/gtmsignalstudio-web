import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "GTM Signal Studio | Signal-Led Go-To-Market for B2B",
    template: "%s | GTM Signal Studio",
  },
  description:
    "Signal-led go-to-market strategies for B2B founders. Stop spray-and-pray. Start signal-led. Free GTM audits, frameworks, and tools.",
  metadataBase: new URL("https://gtmsignalstudio.com"),
  applicationName: "GTM Signal Studio",
  authors: [{ name: "Oloye Adeosun", url: "https://gtmsignalstudio.com/about" }],
  creator: "Oloye Adeosun",
  publisher: "GTM Signal Studio",
  generator: "Next.js",
  keywords: [
    "signal-led outreach",
    "B2B go-to-market",
    "GTM strategy",
    "buying signals",
    "cold email infrastructure",
    "ICP definition",
    "outbound sales",
    "GTM audit",
    "B2B pipeline",
    "signal-based selling",
  ],
  category: "Business",
  classification: "B2B Marketing & Sales",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://gtmsignalstudio.com",
    siteName: "GTM Signal Studio",
    title: "GTM Signal Studio | Signal-Led Go-To-Market for B2B",
    description:
      "Signal-led go-to-market strategies for B2B founders. Stop spray-and-pray. Start signal-led.",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "GTM Signal Studio — Signal-Led Go-To-Market for B2B",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GTM Signal Studio | Signal-Led Go-To-Market for B2B",
    description:
      "Signal-led go-to-market strategies for B2B founders. Stop spray-and-pray. Start signal-led.",
    images: ["/og-default.png"],
    creator: "@oloyeadeosun",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://gtmsignalstudio.com",
    types: {
      "application/rss+xml": "https://gtmsignalstudio.com/feed.xml",
    },
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  other: {
    "theme-color": "#07202b",
    "color-scheme": "light dark",
    "msapplication-TileColor": "#07202b",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to Supabase for faster queries */}
        <link rel="preconnect" href="https://qgcbzstbwfpxkruanrgt.supabase.co" />
        <link rel="dns-prefetch" href="https://qgcbzstbwfpxkruanrgt.supabase.co" />

        {/* Organization Schema — every page */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://gtmsignalstudio.com/#organization",
              name: "GTM Signal Studio",
              url: "https://gtmsignalstudio.com",
              logo: {
                "@type": "ImageObject",
                url: "https://gtmsignalstudio.com/gss-logo.png",
                width: 512,
                height: 512,
              },
              founder: {
                "@type": "Person",
                "@id": "https://gtmsignalstudio.com/#founder",
                name: "Oloye Adeosun",
                url: "https://gtmsignalstudio.com/about",
                jobTitle: "GTM Strategist & Marketing Automation Specialist",
                sameAs: [
                  "https://www.linkedin.com/in/oloyeadeosun/",
                ],
                knowsAbout: [
                  "Signal-Led Outreach",
                  "B2B Go-To-Market Strategy",
                  "Cold Email Infrastructure",
                  "Buying Signals",
                  "Marketing Automation",
                  "ICP Definition",
                ],
              },
              description:
                "Signal-led go-to-market strategies and infrastructure for B2B service companies. GTM audits, outreach systems, and positioning sprints.",
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "sales",
                url: "https://calendly.com/oloye-getclarioiq/audit",
              },
              sameAs: [
                "https://www.linkedin.com/in/oloyeadeosun/",
                "https://newsletter.gtmsignalstudio.com",
              ],
            }),
          }}
        />

        {/* WebSite Schema — enables sitelinks search box in Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://gtmsignalstudio.com/#website",
              name: "GTM Signal Studio",
              url: "https://gtmsignalstudio.com",
              publisher: {
                "@id": "https://gtmsignalstudio.com/#organization",
              },
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "https://gtmsignalstudio.com/blog?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
              inLanguage: "en-GB",
            }),
          }}
        />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
