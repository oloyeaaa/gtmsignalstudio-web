/**
 * Get the logo URL for a tool.
 * Priority: manual override (Supabase Storage) → Clearbit → fallback.
 */
export function getToolLogoUrl(tool: { logo_url: string | null; domain: string; name: string }): {
  src: string;
  isFallback: boolean;
} {
  if (tool.logo_url) {
    return { src: tool.logo_url, isFallback: false };
  }

  return {
    src: `https://logo.clearbit.com/${tool.domain}`,
    isFallback: false,
  };
}

/**
 * Get the first letter of a tool name for fallback avatar.
 */
export function getToolInitial(name: string): string {
  return name.charAt(0).toUpperCase();
}

/**
 * Format a GSS rating (1-5) as stars.
 */
export function formatRating(rating: number): string {
  return "★".repeat(rating) + "☆".repeat(5 - rating);
}

/**
 * Human-readable pricing model label.
 */
export function formatPricingModel(model: string): string {
  const labels: Record<string, string> = {
    free: "Free",
    freemium: "Freemium",
    paid: "Paid",
    enterprise: "Enterprise",
  };
  return labels[model] || model;
}

/**
 * Human-readable dimension labels.
 */
export function formatDimension(dimension: string): string {
  const labels: Record<string, string> = {
    entity: "Entity Recognition",
    content: "Content Structure",
    citation: "Citation Presence",
    technical: "Technical SEO",
  };
  return labels[dimension] || dimension;
}
