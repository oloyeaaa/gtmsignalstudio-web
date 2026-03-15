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
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://gtmsignalstudio.com",
    siteName: "GTM Signal Studio",
    title: "GTM Signal Studio | Signal-Led Go-To-Market for B2B",
    description:
      "Signal-led go-to-market strategies for B2B founders. Stop spray-and-pray. Start signal-led.",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "GTM Signal Studio",
              url: "https://gtmsignalstudio.com",
              logo: "https://gtmsignalstudio.com/gss-logo.png",
              founder: {
                "@type": "Person",
                name: "Oloye Adeosun",
                url: "https://gtmsignalstudio.com/about",
                sameAs: [
                  "https://www.linkedin.com/in/oloyeadeosun/",
                ],
              },
              description:
                "Signal-led go-to-market strategies for B2B founders.",
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
