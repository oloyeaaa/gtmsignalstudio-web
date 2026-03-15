-- GTM Signal Studio: Initial Database Schema
-- Run this in Supabase SQL Editor

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================
-- POSTS TABLE
-- ============================================
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL DEFAULT '',
  excerpt TEXT DEFAULT '',
  meta_description TEXT DEFAULT '',
  short_answer TEXT DEFAULT '',
  category TEXT DEFAULT 'GTM Strategy',
  tags TEXT[] DEFAULT '{}',
  schema_markup JSONB DEFAULT '{}',
  faq JSONB DEFAULT '[]',
  featured_image TEXT DEFAULT '',
  infographic_image TEXT DEFAULT '',
  og_image TEXT DEFAULT '',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  author TEXT NOT NULL DEFAULT 'Oloye Adeosun',
  published_at TIMESTAMPTZ,
  reading_time INT DEFAULT 0,
  related_posts UUID[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- PAGES TABLE
-- ============================================
CREATE TABLE pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL DEFAULT '',
  meta_description TEXT DEFAULT '',
  template TEXT DEFAULT 'default' CHECK (template IN ('home', 'about', 'services', 'audit', 'resources', 'contact', 'default')),
  schema_markup JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- REDIRECTS TABLE
-- ============================================
CREATE TABLE redirects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_host TEXT NOT NULL DEFAULT '',
  from_path TEXT NOT NULL,
  to_path TEXT NOT NULL,
  status_code INT NOT NULL DEFAULT 301 CHECK (status_code IN (301, 302)),
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- ANALYTICS EVENTS TABLE
-- ============================================
CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL CHECK (event_type IN ('page_view', 'cta_click', 'audit_request', 'newsletter_signup', 'scroll_depth')),
  page_path TEXT NOT NULL DEFAULT '',
  metadata JSONB DEFAULT '{}',
  session_id TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- TOPIC CLUSTERS TABLE
-- ============================================
CREATE TABLE topic_clusters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  pillar_post_id UUID REFERENCES posts(id) ON DELETE SET NULL,
  description TEXT DEFAULT ''
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_posts_status ON posts(status);
CREATE INDEX idx_posts_category ON posts(category);
CREATE INDEX idx_posts_published_at ON posts(published_at DESC);
CREATE INDEX idx_redirects_from ON redirects(from_host, from_path);
CREATE INDEX idx_analytics_event_type ON analytics_events(event_type);
CREATE INDEX idx_analytics_created ON analytics_events(created_at DESC);
CREATE INDEX idx_pages_slug ON pages(slug);

-- ============================================
-- FULL TEXT SEARCH INDEX (for blog search)
-- ============================================
ALTER TABLE posts ADD COLUMN fts tsvector
  GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(excerpt, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(content, '')), 'C')
  ) STORED;

CREATE INDEX idx_posts_fts ON posts USING GIN(fts);

-- ============================================
-- AUTO-UPDATE updated_at TRIGGER
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER pages_updated_at
  BEFORE UPDATE ON pages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- AUTO-CALCULATE reading_time TRIGGER
-- ============================================
CREATE OR REPLACE FUNCTION calculate_reading_time()
RETURNS TRIGGER AS $$
BEGIN
  NEW.reading_time = GREATEST(1, array_length(regexp_split_to_array(NEW.content, '\s+'), 1) / 200);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER posts_reading_time
  BEFORE INSERT OR UPDATE OF content ON posts
  FOR EACH ROW EXECUTE FUNCTION calculate_reading_time();

-- ============================================
-- ROW LEVEL SECURITY (future-proof for admin panel)
-- ============================================
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE redirects ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- Public read access for published posts and pages
CREATE POLICY "Public can read published posts"
  ON posts FOR SELECT
  USING (status = 'published');

CREATE POLICY "Public can read pages"
  ON pages FOR SELECT
  USING (TRUE);

CREATE POLICY "Public can read active redirects"
  ON redirects FOR SELECT
  USING (active = TRUE);

-- Public can insert analytics events
CREATE POLICY "Public can insert analytics"
  ON analytics_events FOR INSERT
  WITH CHECK (TRUE);

-- Service role has full access (used by supabase-publish tool)
-- This is handled automatically by Supabase service_role key

-- ============================================
-- SEED: REDIRECTS
-- ============================================
INSERT INTO redirects (from_host, from_path, to_path, status_code) VALUES
  -- Domain redirects
  ('oloye.co.uk', '/', '/', 301),
  ('www.oloye.co.uk', '/', '/', 301),
  ('oloyeaa.com', '/', '/newsletter', 301),
  ('www.oloyeaa.com', '/', '/newsletter', 301),
  -- Subdomain redirects
  ('partner.gtmsignalstudio.com', '/', '/audit', 301),
  ('resources.gtmsignalstudio.com', '/', '/resources', 301),
  ('resources.gtmsignalstudio.com', '/tools', '/resources/tools', 301),
  -- Slug cleanup
  ('', '/3335-2', '/blog/spf-dkim-dmarc-cold-email-2026', 301);
