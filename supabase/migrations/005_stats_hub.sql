-- Migration 005: Stats Hub
-- Dynamic stats database for the /research/stats page
-- Replaces hardcoded stats with Supabase-backed data

-- Stat categories (controls display sections)
CREATE TABLE IF NOT EXISTS stat_categories (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  is_gss BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'published'
);

-- Core stats table
CREATE TABLE IF NOT EXISTS stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  stat_value TEXT NOT NULL,
  label TEXT NOT NULL,
  category TEXT NOT NULL REFERENCES stat_categories(id),
  source TEXT NOT NULL,
  source_url TEXT,
  source_type TEXT NOT NULL DEFAULT 'external'
    CHECK (source_type IN ('gss-original', 'gss-aggregate', 'external')),
  year TEXT NOT NULL,
  sample TEXT,
  sector TEXT,
  metric_type TEXT,
  tags TEXT[] DEFAULT '{}',
  methodology_note TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  auto_generated BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'published'
    CHECK (status IN ('published', 'draft', 'archived')),
  computed_at TIMESTAMPTZ,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_stats_category ON stats(category);
CREATE INDEX idx_stats_status ON stats(status);
CREATE INDEX idx_stats_source_type ON stats(source_type);
CREATE INDEX idx_stats_sector ON stats(sector);
CREATE INDEX idx_stats_metric_type ON stats(metric_type);
CREATE INDEX idx_stats_slug ON stats(slug);
CREATE INDEX idx_stats_tags ON stats USING GIN(tags);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_stats_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER stats_updated_at
  BEFORE UPDATE ON stats
  FOR EACH ROW
  EXECUTE FUNCTION update_stats_updated_at();

-- RLS policies
ALTER TABLE stat_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE stats ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Anyone can read published categories"
  ON stat_categories FOR SELECT
  USING (status = 'published');

CREATE POLICY "Anyone can read published stats"
  ON stats FOR SELECT
  USING (status = 'published');

-- Service role has full access
CREATE POLICY "Service role manages categories"
  ON stat_categories FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role manages stats"
  ON stats FOR ALL
  USING (auth.role() = 'service_role');

-- Seed categories from current stats page
INSERT INTO stat_categories (id, title, description, sort_order, is_gss) VALUES
  ('gss-original', 'GTM Signal Studio Original Research',
   'Original data from GSS benchmark studies. 150+ companies scanned across multiple sectors using the AI Visibility Framework (4 dimensions, scored 0-100). Updated monthly.',
   1, TRUE),
  ('ai-adoption', 'AI Adoption in B2B Buying',
   'How quickly B2B buyers are adopting AI tools for vendor research and purchasing decisions.',
   2, FALSE),
  ('buying-journey', 'How AI Changes the Buying Journey',
   'Data on how AI is reshaping the B2B buying process from discovery to decision.',
   3, FALSE),
  ('ai-vs-google', 'AI vs Google: Search Divergence',
   'Evidence that AI recommendations differ significantly from traditional search results.',
   4, FALSE),
  ('trust', 'Trust in AI Recommendations',
   'How much B2B buyers trust AI-generated recommendations compared to other sources.',
   5, FALSE),
  ('ai-traffic', 'AI Search Traffic & Conversion',
   'Data on traffic and conversion rates from AI-driven search compared to traditional search.',
   6, FALSE)
ON CONFLICT (id) DO NOTHING;
