-- Two Pillar Topics: Enterprise Marketing + AI Visibility
-- Replaces the 5 old topic clusters with 2 SEO pillar pages.
-- Every blog post must belong to one of these two categories.

-- ============================================
-- ADD authority_links COLUMN
-- ============================================
ALTER TABLE topic_clusters ADD COLUMN IF NOT EXISTS authority_links JSONB DEFAULT '[]';

-- ============================================
-- CLEAR OLD CLUSTER MAPPINGS + CLUSTERS
-- ============================================
DELETE FROM cluster_posts;
DELETE FROM topic_clusters;

-- ============================================
-- INSERT 2 PILLAR TOPIC CLUSTERS
-- ============================================
INSERT INTO topic_clusters (name, slug, description, cta_text, cta_url, authority_links) VALUES
  (
    'Enterprise Marketing',
    'enterprise-marketing',
    'Frameworks, systems, and strategies from the enterprise marketing frontline. How B2B marketing leaders build pipeline, align with sales, and prove ROI at scale.',
    'Get Your AI Visibility Audit',
    '/ai-visibility-audit',
    '[
      {"title": "Gartner: Magic Quadrant for B2B Marketing Automation", "url": "https://www.gartner.com/reviews/market/b2b-marketing-automation-platforms", "source": "Gartner"},
      {"title": "Forrester: B2B Marketing & Sales Research", "url": "https://www.forrester.com/research/b2b-marketing/", "source": "Forrester"},
      {"title": "HBR: Marketing Strategy", "url": "https://hbr.org/topic/subject/marketing-strategy", "source": "Harvard Business Review"},
      {"title": "McKinsey: B2B Marketing Insights", "url": "https://www.mckinsey.com/capabilities/growth-marketing-and-sales/our-insights", "source": "McKinsey"}
    ]'::jsonb
  ),
  (
    'AI Visibility',
    'ai-visibility',
    'How AI platforms see your brand. Research, benchmarks, and strategies for getting cited by ChatGPT, Gemini, Perplexity, and AI-powered search.',
    'Get Your AI Visibility Audit',
    '/ai-visibility-audit',
    '[
      {"title": "Google: How AI Overviews Work", "url": "https://blog.google/products/search/generative-ai-google-search-may-2024/", "source": "Google"},
      {"title": "Rand Fishkin: Zero-Click Search Study", "url": "https://sparktoro.com/blog/in-2024-we-tested-4-5m-google-search-results-heres-what-we-found/", "source": "SparkToro"},
      {"title": "Perplexity: How Citations Work", "url": "https://blog.perplexity.ai/", "source": "Perplexity"},
      {"title": "Gartner: Predicts Search Engine Volume Drop 25% by 2026", "url": "https://www.gartner.com/en/newsroom/press-releases/2024-02-19-gartner-predicts-search-engine-volume-will-drop-25-percent-by-2026", "source": "Gartner"}
    ]'::jsonb
  );

-- ============================================
-- REMAP EXISTING POSTS TO NEW CLUSTERS
-- ============================================
-- All old posts (ICP, Signal-Led GTM, Cold Email, Build in Public) → Enterprise Marketing
-- AI Visibility posts will be mapped as they're published

-- Re-insert from known post IDs (21 posts from migration 002 seed).
-- All existing posts → Enterprise Marketing. AI Visibility posts mapped as published.

-- Enterprise Marketing cluster — all existing posts
INSERT INTO cluster_posts (cluster_id, post_id, sort_order, is_pillar) VALUES
  -- Former ICP & Buyer Understanding
  ((SELECT id FROM topic_clusters WHERE slug = 'enterprise-marketing'), 'b282f62f-69f2-49bd-b4fe-e199bbaded14', 1, FALSE),
  ((SELECT id FROM topic_clusters WHERE slug = 'enterprise-marketing'), 'd549b94c-c53c-4a37-b994-7d9697eba2e9', 2, FALSE),
  ((SELECT id FROM topic_clusters WHERE slug = 'enterprise-marketing'), 'a4ba151f-ebf9-4507-abd2-2e9246b23789', 3, FALSE),
  ((SELECT id FROM topic_clusters WHERE slug = 'enterprise-marketing'), 'd88a2b44-dc04-40e7-838f-b7ec09fe910c', 4, FALSE),
  ((SELECT id FROM topic_clusters WHERE slug = 'enterprise-marketing'), 'f9def855-2b8e-450c-bbcf-fdd12dee21f7', 5, FALSE),
  ((SELECT id FROM topic_clusters WHERE slug = 'enterprise-marketing'), 'c304552f-31fe-4523-a794-04c6abbcf588', 6, FALSE),
  -- Former Signal-Led GTM Strategy
  ((SELECT id FROM topic_clusters WHERE slug = 'enterprise-marketing'), 'b39ffc6b-90a2-4e47-b3af-80c3df44cb35', 7, FALSE),
  ((SELECT id FROM topic_clusters WHERE slug = 'enterprise-marketing'), '7557a46c-58c5-498f-96b8-d8715cd9e8d0', 8, FALSE),
  ((SELECT id FROM topic_clusters WHERE slug = 'enterprise-marketing'), '7ab3bba7-6adb-48bc-aca5-ae7568d37abd', 9, FALSE),
  ((SELECT id FROM topic_clusters WHERE slug = 'enterprise-marketing'), '80c3ff6e-51b0-4215-9059-1398ddc26350', 10, FALSE),
  ((SELECT id FROM topic_clusters WHERE slug = 'enterprise-marketing'), '016f9eb8-b5c9-4d4f-9141-4be48461606f', 11, FALSE),
  -- Former Cold Email Infrastructure
  ((SELECT id FROM topic_clusters WHERE slug = 'enterprise-marketing'), 'e7778163-07a1-481c-b797-1d5c58708634', 12, FALSE),
  ((SELECT id FROM topic_clusters WHERE slug = 'enterprise-marketing'), '8dd75fc7-2f7a-4f86-91d5-cc573beb7f6a', 13, FALSE),
  ((SELECT id FROM topic_clusters WHERE slug = 'enterprise-marketing'), '006ab987-c8de-47a6-9dd4-661ac292f32a', 14, FALSE),
  ((SELECT id FROM topic_clusters WHERE slug = 'enterprise-marketing'), 'd41bb690-2583-4bf5-85f5-dcd3dc6c0506', 15, FALSE),
  ((SELECT id FROM topic_clusters WHERE slug = 'enterprise-marketing'), '74ee65ac-7044-4ddc-85ea-556aa91ace24', 16, FALSE),
  ((SELECT id FROM topic_clusters WHERE slug = 'enterprise-marketing'), '060e2b8f-85ca-4de2-b99f-eec9a08ec31a', 17, FALSE),
  ((SELECT id FROM topic_clusters WHERE slug = 'enterprise-marketing'), '25ddd2d4-2e96-434d-8031-6dd12dad532f', 18, FALSE),
  -- Former Cold Email Tactics
  ((SELECT id FROM topic_clusters WHERE slug = 'enterprise-marketing'), '26007a1b-143a-4c9f-b310-f5bf413b3790', 19, FALSE),
  -- Former Build in Public
  ((SELECT id FROM topic_clusters WHERE slug = 'enterprise-marketing'), '04c22207-8cf2-472a-b155-c8a976ac6057', 20, FALSE),
  ((SELECT id FROM topic_clusters WHERE slug = 'enterprise-marketing'), '353818a1-51a0-4ffa-9689-8649962a831f', 21, FALSE);

-- ============================================
-- UPDATE posts.category TO MATCH NEW PILLARS
-- ============================================
-- Set all existing posts to 'Enterprise Marketing'
UPDATE posts SET category = 'Enterprise Marketing';

-- Any posts with 'ai-visibility' or 'ai visibility' in title/tags → AI Visibility
UPDATE posts SET category = 'AI Visibility'
WHERE LOWER(title) LIKE '%ai visibility%'
   OR LOWER(title) LIKE '%ai citation%'
   OR LOWER(title) LIKE '%ai presence%'
   OR 'ai-visibility' = ANY(tags)
   OR 'ai visibility' = ANY(tags);

-- ============================================
-- UPDATE DEFAULT CATEGORY
-- ============================================
ALTER TABLE posts ALTER COLUMN category SET DEFAULT 'Enterprise Marketing';
