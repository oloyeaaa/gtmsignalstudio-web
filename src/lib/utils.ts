/**
 * Get the logo URL for a tool.
 * Priority: manual override (Supabase Storage) → Google favicon → letter fallback.
 * Clearbit Logo API was shut down Dec 2025.
 */
export function getToolLogoUrl(tool: { logo_url: string | null; domain: string; name: string }): {
  src: string;
  isFallback: boolean;
} {
  if (tool.logo_url) {
    return { src: tool.logo_url, isFallback: false };
  }

  return {
    src: `https://www.google.com/s2/favicons?domain=${tool.domain}&sz=128`,
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
