"use client";

import { useState } from "react";
import { getToolInitial } from "@/lib/utils";

type ToolLogoProps = {
  src: string;
  name: string;
  size: number;
  className?: string;
  fallbackClassName?: string;
};

export default function ToolLogo({ src, name, size, className = "", fallbackClassName = "" }: ToolLogoProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className={fallbackClassName || "text-orange font-heading font-bold text-xl"}>
        {getToolInitial(name)}
      </span>
    );
  }

  /* eslint-disable @next/next/no-img-element */
  return (
    <img
      src={src}
      alt={`${name} logo`}
      width={size}
      height={size}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
