# Blog pipeline: Airtable draft -> Supabase `posts` -> /blog

How a GSS blog post goes from idea to a Draft row visible in Supabase, and what's
still manual to get it live on gtmsignalstudio.com.

## End to end

1. **Draft via Kwame / the Blog Loop** (`/blog-draft --client gss`, once the GSS
   tenant is synced — see TODOs below). Same machinery the oloye.co.uk tenant
   uses: resolves keyword -> SERP research -> duplicate check -> lessons ->
   Kwame writes the post -> cover image generated. Reference:
   `C:\Users\Oloye\.claude\commands\blog-draft.md`.
2. **Delivery step differs from oloye.co.uk.** For oloye.co.uk, delivery means
   "create a Draft record in Airtable's Blog table" (that repo's own
   Airtable-native review flow). For GSS, Airtable's Blog table is instead the
   *source*, and the delivery target is this repo's Supabase `posts` table —
   so a post exists as a real Draft row the /blog code can already query, no
   separate Airtable review UI needed.
3. **This adapter** — `scripts/publish-from-airtable.js` — reads Draft rows out
   of the GSS Airtable Blog table (config-driven, see `scripts/gss-tenant.config.json`)
   and upserts them into Supabase `posts` with `status: "draft"`.
4. **Publish to the live site** stays a separate, explicit step (same
   discipline as the oloye.co.uk `/post` command): flip the Supabase row's
   `status` from `draft` to `published` and set `published_at`. This adapter
   never does that automatically — no script here promotes a draft to
   published.
5. **`/blog` renders it.** `src/app/blog/page.tsx` and
   `src/app/blog/[slug]/page.tsx` only ever read rows where
   `status = 'published'` (enforced both in the query and by RLS), at
   `/blog/[slug]`.

```
Kwame (blog-draft)  --draft-->  Airtable Blog table
                                        |
                          scripts/publish-from-airtable.js
                                        |
                                        v
                      Supabase `posts` (status: draft)
                                        |
                         (manual) flip status -> published
                                        |
                                        v
                                gtmsignalstudio.com/blog/<slug>
```

## The `posts` table (what this adapter maps into)

From `supabase/migrations/001_initial_schema.sql` (+ later migrations 003, 007):

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | PK, generated |
| `title` | text | required |
| `slug` | text | unique, URL = `/blog/<slug>` |
| `content` | text | markdown body |
| `excerpt` | text | list-card summary |
| `meta_description` | text | falls back to `excerpt` if empty |
| `short_answer` | text | AEO answer box |
| `category` | text | must be one of `Enterprise Marketing`, `AI Visibility`, `Tool Reviews` (app convention, not a DB constraint) |
| `tags` | text[] | |
| `schema_markup` | jsonb | not currently rendered by the page (page builds its own JSON-LD) |
| `faq` | jsonb | array of `{ question, answer }` |
| `featured_image` | text | plain URL (Supabase Storage `blog-images` bucket, or any URL) |
| `infographic_image` | text | mid-post image |
| `og_image` | text | usually same as `featured_image` |
| `status` | text | `draft` \| `published` \| `archived` (DB CHECK constraint) — only `published` rows are publicly readable |
| `author` | text | defaults to `Oloye Adeosun` in the base schema; this adapter sets it from tenant config |
| `published_at` | timestamptz | set when a row is published |
| `reading_time` | int | auto-computed by a Postgres trigger on insert/update of `content` — don't worry about getting this exact |
| `tool_slug` | text | optional FK to `tools.slug`, only for `Tool Reviews` category |

Writes require the Supabase **service role** key — RLS only allows public reads
of `published` rows.

## Env vars (names only — this adapter reads them, never hardcode values)

- `NEXT_PUBLIC_SUPABASE_URL` — from `.env.local`
- `SUPABASE_SERVICE_KEY` — from `.env.local` (write access, bypasses RLS)
- `AIRTABLE_TOKEN` — from `../GSS/config/.env` (same convention as `scripts/publish-post.js`)

## The adapter

`scripts/publish-from-airtable.js`:

```
node scripts/publish-from-airtable.js --dry-run
node scripts/publish-from-airtable.js --dry-run --status Draft
node scripts/publish-from-airtable.js                          # real upsert
node scripts/publish-from-airtable.js --config scripts/gss-tenant.config.json
```

- `--dry-run` prints titles/slugs/category/status only — no Supabase writes, no
  Airtable calls if the tenant config still has unresolved `TODO_*` placeholders
  (it shows a sample row shape instead).
- Refuses to run a real (non-dry-run) upsert while the config has any `TODO_*`
  placeholder — you'll get a clear error telling you to resolve the config first.
- Upserts on `slug` (`onConflict: "slug"`), so re-running is safe / idempotent.
- Always writes Supabase `status: "draft"` (from `scripts/gss-tenant.config.json`
  -> `supabase.deliveryStatus`) — it never publishes.

## What's still manual

- **Publishing**: no `/post`-equivalent exists yet for GSS in this repo. Until
  one is built, flip `status` to `published` (and set `published_at`) directly
  in Supabase, or extend `scripts/publish-post.js`'s pattern into a small
  `scripts/publish-gss-draft.js` promote-step later.
- **Featured images**: the adapter maps whatever URL/attachment is in the
  Airtable "Cover Image" field as-is. If the workflow instead generates an
  image locally (like `blog-draft` does for oloye.co.uk via `render-room`),
  that image still needs uploading to the Supabase `blog-images` storage
  bucket (see `uploadImage()` in `scripts/publish-post.js`) before this
  adapter runs, or the adapter needs extending to do that upload itself.
- **ISR revalidation**: after a row flips to `published`, hit
  `/api/revalidate?slug=<slug>&secret=<REVALIDATION_SECRET>` (same as
  `publish-post.js` does) so the live page updates without waiting for the
  hourly ISR window.

## Open TODOs

1. **Create or point at the real GSS Airtable Blog table.** Nothing was
   created in Airtable as part of this task — `scripts/gss-tenant.config.json`
   only has placeholder IDs. Decide: a new table in an existing GSS base, or
   a new base entirely.
2. **Resolve the real IDs into `scripts/gss-tenant.config.json`**, replacing
   every `TODO_*` value: `airtable.baseId`, `airtable.blog.tableId`,
   `airtable.blog.fields.*` (field IDs — kept for parity with the
   `sync-client-schema` config shape; the adapter itself calls Airtable by
   field **name**, so field names must match exactly), and
   `airtable.blog.statusChoices.*`. The `sync-client-schema` command
   (`C:\Users\Oloye\.claude\commands\sync-client-schema.md`) already knows how
   to resolve a base's tables/fields via the Airtable MCP — either adapt it
   for a `gss` tenant or resolve manually and hand-edit the JSON.
3. **First dry-run once the table exists**:
   `node scripts/publish-from-airtable.js --dry-run --status Draft`
4. **First real run** (after confirming the dry-run output looks right):
   `node scripts/publish-from-airtable.js --status Draft`
5. **Decide the publish step** — either do it manually in Supabase for now, or
   build a small promote script later.
