"use client";

import { usePathname } from "next/navigation";
import { trackCTAClick } from "@/components/Analytics";

interface Props {
  label?: string;
  className?: string;
}

export default function AiPresenceCTAButton({ label = "Get Your AI Visibility Audit", className }: Props) {
  const pathname = usePathname();

  return (
    <a
      href="https://calendly.com/thegtmsignalstudio/30min"
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackCTAClick("ai_visibility_audit", pathname)}
      className={
        className ??
        "inline-block bg-orange hover:bg-orange-hover text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
      }
    >
      {label}
    </a>
  );
}
