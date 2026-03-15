-- SEO Improvements: Topic Clusters + Pillar Page System
-- Run this in Supabase SQL Editor after 001_initial_schema.sql

-- ============================================
-- EXTEND topic_clusters TABLE
-- ============================================
ALTER TABLE topic_clusters ADD COLUMN slug TEXT NOT NULL DEFAULT '' UNIQUE;
ALTER TABLE topic_clusters ADD COLUMN hero_image TEXT DEFAULT '';
ALTER TABLE topic_clusters ADD COLUMN cta_text TEXT DEFAULT 'Get Your Free GTM Audit';
ALTER TABLE topic_clusters ADD COLUMN cta_url TEXT DEFAULT '/audit';

-- ============================================
-- CREATE cluster_posts JUNCTION TABLE
-- ============================================
CREATE TABLE cluster_posts (
  cluster_id UUID NOT NULL REFERENCES topic_clusters(id) ON DELETE CASCADE,
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  sort_order INT NOT NULL DEFAULT 0,
  is_pillar BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (cluster_id, post_id)
);

CREATE INDEX idx_cluster_posts_cluster ON cluster_posts(cluster_id);
CREATE INDEX idx_cluster_posts_post ON cluster_posts(post_id);

-- ============================================
-- RLS POLICIES
-- ============================================
ALTER TABLE cluster_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read cluster posts"
  ON cluster_posts FOR SELECT
  USING (TRUE);

-- Update topic_clusters to allow public read (may already exist from 001)
-- Safe to run: CREATE POLICY IF NOT EXISTS is not supported, so use DO block
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'topic_clusters' AND policyname = 'Public can read topic clusters'
  ) THEN
    CREATE POLICY "Public can read topic clusters"
      ON topic_clusters FOR SELECT
      USING (TRUE);
  END IF;
END $$;

ALTER TABLE topic_clusters ENABLE ROW LEVEL SECURITY;

-- ============================================
-- SEED: 5 TOPIC CLUSTERS
-- ============================================
INSERT INTO topic_clusters (name, slug, description) VALUES
  (
    'ICP & Buyer Understanding',
    'icp-buyer-understanding',
    'How to define, validate, and score your ideal customer profile using real buying signals — not job titles and company size.'
  ),
  (
    'Signal-Led GTM Strategy',
    'signal-led-gtm',
    'Why signals matter, how they improve outbound timing, and the philosophy behind signal-driven go-to-market.'
  ),
  (
    'Cold Email Infrastructure',
    'cold-email-infrastructure',
    'Technical setup for cold outreach that actually reaches the inbox. Domains, warmup, deliverability, SPF/DKIM/DMARC, and tooling.'
  ),
  (
    'Cold Email Tactics',
    'cold-email-tactics',
    'Messaging strategy, subject lines, sequencing, and the psychology of why certain emails get replies.'
  ),
  (
    'Build in Public',
    'build-in-public',
    'Real data from real campaigns. What we built, what worked, what failed, and what we learned.'
  );

-- ============================================
-- SEED: MAP POSTS TO CLUSTERS
-- ============================================

-- ICP & Buyer Understanding (6 posts)
-- Pillar: signal-driven-icp-framework (most comprehensive)
INSERT INTO cluster_posts (cluster_id, post_id, sort_order, is_pillar) VALUES
  ((SELECT id FROM topic_clusters WHERE slug = 'icp-buyer-understanding'), 'b282f62f-69f2-49bd-b4fe-e199bbaded14', 1, FALSE),  -- Beginner's Guide to ICP
  ((SELECT id FROM topic_clusters WHERE slug = 'icp-buyer-understanding'), 'd549b94c-c53c-4a37-b994-7d9697eba2e9', 2, FALSE),  -- Build and Validate ICP Card
  ((SELECT id FROM topic_clusters WHERE slug = 'icp-buyer-understanding'), 'a4ba151f-ebf9-4507-abd2-2e9246b23789', 3, FALSE),  -- Why Job Titles Aren't Enough
  ((SELECT id FROM topic_clusters WHERE slug = 'icp-buyer-understanding'), 'd88a2b44-dc04-40e7-838f-b7ec09fe910c', 4, FALSE),  -- ICP Scoring: Pain, Money, Fit
  ((SELECT id FROM topic_clusters WHERE slug = 'icp-buyer-understanding'), 'f9def855-2b8e-450c-bbcf-fdd12dee21f7', 5, FALSE),  -- Buyer Signals to Narrow ICP
  ((SELECT id FROM topic_clusters WHERE slug = 'icp-buyer-understanding'), 'c304552f-31fe-4523-a794-04c6abbcf588', 6, TRUE);   -- ICP That Maps to Real-World Signals (PILLAR)

-- Signal-Led GTM Strategy (5 posts)
-- Pillar: signal-based-gtm (broadest overview)
INSERT INTO cluster_posts (cluster_id, post_id, sort_order, is_pillar) VALUES
  ((SELECT id FROM topic_clusters WHERE slug = 'signal-led-gtm'), 'b39ffc6b-90a2-4e47-b3af-80c3df44cb35', 1, FALSE),  -- Why GTM Strategies Fail
  ((SELECT id FROM topic_clusters WHERE slug = 'signal-led-gtm'), '7557a46c-58c5-498f-96b8-d8715cd9e8d0', 2, FALSE),  -- 5 Types of GTM Signals
  ((SELECT id FROM topic_clusters WHERE slug = 'signal-led-gtm'), '7ab3bba7-6adb-48bc-aca5-ae7568d37abd', 3, FALSE),  -- Why Sales Emails Get Ignored
  ((SELECT id FROM topic_clusters WHERE slug = 'signal-led-gtm'), '80c3ff6e-51b0-4215-9059-1398ddc26350', 4, FALSE),  -- Signal Logic: Raw Data to Pipeline
  ((SELECT id FROM topic_clusters WHERE slug = 'signal-led-gtm'), '016f9eb8-b5c9-4d4f-9141-4be48461606f', 5, TRUE);   -- Signal-Based GTM (PILLAR)

-- Cold Email Infrastructure (7 posts)
-- Pillar: cold-email-deliverability-framework (most comprehensive how-to)
INSERT INTO cluster_posts (cluster_id, post_id, sort_order, is_pillar) VALUES
  ((SELECT id FROM topic_clusters WHERE slug = 'cold-email-infrastructure'), 'e7778163-07a1-481c-b797-1d5c58708634', 1, FALSE),  -- Warm Up Email Domains
  ((SELECT id FROM topic_clusters WHERE slug = 'cold-email-infrastructure'), '8dd75fc7-2f7a-4f86-91d5-cc573beb7f6a', 2, FALSE),  -- SPF DKIM DMARC
  ((SELECT id FROM topic_clusters WHERE slug = 'cold-email-infrastructure'), '006ab987-c8de-47a6-9dd4-661ac292f32a', 3, FALSE),  -- Avoid Spam Filters
  ((SELECT id FROM topic_clusters WHERE slug = 'cold-email-infrastructure'), 'd41bb690-2583-4bf5-85f5-dcd3dc6c0506', 4, FALSE),  -- Cold Email Metrics
  ((SELECT id FROM topic_clusters WHERE slug = 'cold-email-infrastructure'), '74ee65ac-7044-4ddc-85ea-556aa91ace24', 5, FALSE),  -- Tools Compared
  ((SELECT id FROM topic_clusters WHERE slug = 'cold-email-infrastructure'), '060e2b8f-85ca-4de2-b99f-eec9a08ec31a', 6, FALSE),  -- Deliverability 2026
  ((SELECT id FROM topic_clusters WHERE slug = 'cold-email-infrastructure'), '25ddd2d4-2e96-434d-8031-6dd12dad532f', 7, TRUE);   -- Build Cold Email Infrastructure (PILLAR)

-- Cold Email Tactics (1 post — will grow)
-- Pillar: subject line formulas (only post, so it's the pillar by default)
INSERT INTO cluster_posts (cluster_id, post_id, sort_order, is_pillar) VALUES
  ((SELECT id FROM topic_clusters WHERE slug = 'cold-email-tactics'), '26007a1b-143a-4c9f-b310-f5bf413b3790', 1, TRUE);  -- 7 Subject Line Formulas (PILLAR)

-- Build in Public (2 posts)
-- Pillar: claude-code-memory-system (more technical depth)
INSERT INTO cluster_posts (cluster_id, post_id, sort_order, is_pillar) VALUES
  ((SELECT id FROM topic_clusters WHERE slug = 'build-in-public'), '04c22207-8cf2-472a-b155-c8a976ac6057', 1, FALSE),  -- Business Functions Need Automation
  ((SELECT id FROM topic_clusters WHERE slug = 'build-in-public'), '353818a1-51a0-4ffa-9689-8649962a831f', 2, TRUE);   -- Claude Code Memory System (PILLAR)
