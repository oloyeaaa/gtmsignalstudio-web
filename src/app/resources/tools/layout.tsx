import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Built Tools — GTM Signal Studio",
  description:
    "Custom-built agents, Python tools, Chrome extensions, and workflows for AI visibility audits, content pipelines, and GTM research. Open source on GitHub.",
  keywords: ["AI visibility tools", "Claude Code skills", "GTM automation", "AI agents", "marketing automation tools", "open source GTM"],
};

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
