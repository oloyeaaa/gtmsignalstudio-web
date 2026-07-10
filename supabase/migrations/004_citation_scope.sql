-- Citation Scope: AI Visibility SaaS tables
-- Used by score.gtmsignalstudio.com

create table scans (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  company_name text not null,
  domain text not null,
  status text not null default 'pending',
  overall_score integer,
  grade text,
  platform_scores jsonb,
  topic_scores jsonb,
  share_of_voice jsonb,
  competitor_count integer,
  gap_count integer,
  top_gap_title text,
  top_gap_severity text,
  full_results jsonb,
  cost_usd numeric(6,4),
  created_at timestamptz default now(),
  completed_at timestamptz,
  email_sent boolean default false,
  paid boolean default false
);

create index idx_scans_email on scans(email);
create index idx_scans_domain on scans(domain);
create index idx_scans_status on scans(status);
create index idx_scans_created on scans(created_at desc);

create table scan_events (
  id uuid primary key default gen_random_uuid(),
  scan_id uuid references scans(id) on delete cascade,
  event text not null,
  metadata jsonb,
  created_at timestamptz default now()
);

create index idx_scan_events_scan on scan_events(scan_id);

-- Row-level security
alter table scans enable row level security;
alter table scan_events enable row level security;

-- Allow anonymous inserts (for the scan form)
create policy "Allow anonymous scan inserts"
  on scans for insert
  to anon
  with check (true);

-- Allow reads by scan ID (results page)
create policy "Allow scan reads by id"
  on scans for select
  to anon
  using (true);

-- Allow service role full access (for webhook updates)
create policy "Service role full access scans"
  on scans for all
  to service_role
  using (true)
  with check (true);

create policy "Service role full access events"
  on scan_events for all
  to service_role
  using (true)
  with check (true);
