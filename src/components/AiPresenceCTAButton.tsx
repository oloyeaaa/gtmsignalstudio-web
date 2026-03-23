"use client";

import { usePathname } from "next/navigation";
import { trackCTAClick } from "@/components/Analytics";

interface Props {
  label?: string;
  className?: string;
}

export default function AiPresenceCTAButton({ label = "Get Your AI Visibility Audit — £297", className }: Props) {
  const pathname = usePathname();

  return (
    <a
      href="mailto:oloye@gtmsignalstudio.com?subject=AI%20Visibility%20Audit&body=Hi%20Oloye%2C%0A%0AI%27d%20like%20to%20book%20an%20AI%20Visibility%20Audit%20for%20%5Bcompany%20name%5D.%0A%0AMy%20website%3A%20%5Byour%20website%5D%0A%0ACore%20keywords%3A%20%5Bwhat%20do%20clients%20search%20to%20find%20you%5D"
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
