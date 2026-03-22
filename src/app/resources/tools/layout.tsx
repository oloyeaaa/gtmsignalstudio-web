import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tools — GTM Signal Studio",
  description:
    "Free browser-based GTM tools. Score your go-to-market, check AI visibility, and diagnose pipeline gaps. No signup required.",
  keywords: ["free GTM tools", "AI visibility checker", "GTM scoring tool", "B2B marketing tools", "go-to-market calculator"],
};

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
