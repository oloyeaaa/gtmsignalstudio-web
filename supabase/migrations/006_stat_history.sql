-- Migration 006: Stat History
-- Tracks how stats change over time for trend analysis
-- Each time a stat is updated via auto-ingestion, the previous value is snapshotted here

CREATE TABLE IF NOT EXISTS stat_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stat_slug TEXT NOT NULL REFERENCES stats(slug),
  stat_value TEXT NOT NULL,
  label TEXT NOT NULL,
  edition TEXT,
  sample TEXT,
  recorded_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_stat_history_slug ON stat_history(stat_slug);
CREATE INDEX idx_stat_history_recorded ON stat_history(recorded_at DESC);

-- RLS
ALTER TABLE stat_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read stat history"
  ON stat_history FOR SELECT
  USING (true);

CREATE POLICY "Service role manages stat history"
  ON stat_history FOR ALL
  USING (auth.role() = 'service_role');
