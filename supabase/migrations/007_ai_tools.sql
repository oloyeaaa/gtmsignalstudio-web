-- Migration 007: AI Tools Directory + Tool Reviews Blog Category
-- Adds tools table for curated AI visibility tools directory
-- Adds tool_slug column to posts for linking blog reviews to tools

-- ============================================================
-- TOOLS TABLE
-- ============================================================

CREATE TABLE IF NOT EXISTS tools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  tagline TEXT NOT NULL,                          -- One-line description (shown on card)
  description TEXT NOT NULL,                      -- Full description (shown on detail page)
  website_url TEXT NOT NULL,
  affiliate_url TEXT,                             -- Affiliate/referral link (nullable)
  discount_code TEXT,                             -- Discount code if available
  discount_description TEXT,                      -- e.g. "20% off annual plans"
  logo_url TEXT,                                  -- Manual override (Supabase Storage)
  domain TEXT NOT NULL,                           -- e.g. "surfer.ai" — used for Clearbit fallback

  -- Categorisation
  category TEXT NOT NULL DEFAULT 'other',         -- primary category
  dimensions TEXT[] NOT NULL DEFAULT '{}',        -- AI visibility dimensions: entity, content, citation, technical
  use_cases TEXT[] NOT NULL DEFAULT '{}',         -- e.g. "content optimisation", "schema markup"

  -- Pricing
  pricing_model TEXT NOT NULL DEFAULT 'freemium', -- free, freemium, paid, enterprise
  price_from TEXT,                                -- e.g. "£29/mo", "Free"

  -- Ratings & metadata
  gss_rating SMALLINT CHECK (gss_rating >= 1 AND gss_rating <= 5),  -- GSS editorial rating 1-5
  pros TEXT[] NOT NULL DEFAULT '{}',
  cons TEXT[] NOT NULL DEFAULT '{}',
  best_for TEXT,                                  -- One-line "Best for..." summary

  -- SEO
  meta_title TEXT,
  meta_description TEXT,

  -- Status & ordering
  is_featured BOOLEAN NOT NULL DEFAULT false,
  sort_order INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),

  -- Timestamps
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Auto-update updated_at
CREATE TRIGGER tools_updated_at
  BEFORE UPDATE ON tools
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Indexes
CREATE INDEX idx_tools_status ON tools(status);
CREATE INDEX idx_tools_category ON tools(category);
CREATE INDEX idx_tools_featured ON tools(is_featured) WHERE is_featured = true;
CREATE INDEX idx_tools_dimensions ON tools USING GIN(dimensions);

-- RLS
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published tools"
  ON tools FOR SELECT
  USING (status = 'published');

-- ============================================================
-- ADD tool_slug TO POSTS (links blog reviews to tools)
-- ============================================================

ALTER TABLE posts
  ADD COLUMN IF NOT EXISTS tool_slug TEXT REFERENCES tools(slug);

CREATE INDEX idx_posts_tool_slug ON posts(tool_slug) WHERE tool_slug IS NOT NULL;

-- ============================================================
-- SEED: Tool categories reference (not a table, just documentation)
-- Categories: content, technical, research, monitoring, schema, other
-- Dimensions: entity, content, citation, technical
-- ============================================================
