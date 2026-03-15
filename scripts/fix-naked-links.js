/**
 * Fix naked links in blog posts — replace with keyword-anchored text
 * Usage: node scripts/fix-naked-links.js
 */
const { createClient } = require("@supabase/supabase-js");

const sb = createClient(
  "https://qgcbzstbwfpxkruanrgt.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFnY2J6c3Rid2ZweGtydWFucmd0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzU3NTY4NSwiZXhwIjoyMDg5MTUxNjg1fQ.ZWfOuASAF3hFpGQaFKl8FR2ctV2KtZI3wD9zJBmUdkY"
);

// Map of naked URLs to their keyword-anchored replacements
const linkFixes = {
  "beginner-guide-icp-cold-email-2026": [
    {
      find: "https://gtmsignalstudio.com/6d41d087-14da-4099-89ee-2b1a2c01",
      replace: "[how to build an ICP that maps to real-world signals](/blog/signal-driven-icp-framework)",
    },
    {
      find: "https://gtmsignalstudio.com/9be15b69-fc66-4e29-87c0-045c0fc9",
      replace: "[ICP scoring framework for B2B](/blog/icp-scoring-pain-money-fit-2026)",
    },
  ],
  "cold-email-deliverability-framework": [
    {
      find: "https://gtmsignalstudio.com/a51b2365-7832-4a23-b509-a6e4287c",
      replace: "[cold email deliverability guide](/blog/cold-email-deliverability-2026-infrastructure)",
    },
  ],
  "cold-email-deliverability-2026-infrastructure": [
    {
      find: "https://the-gtm-signals-studio.beehiiv.com",
      replace: "[The GTM Signal newsletter](https://newsletter.gtmsignalstudio.com)",
    },
    {
      find: "https://gtmsignalstudio.com/work-with-me",
      replace: "[work with us](/work-with-me)",
    },
  ],
  "claude-code-memory-system": [
    {
      find: "https://newsletter.gtmsignalstudio.com/",
      replace: "[subscribe to The GTM Signal](https://newsletter.gtmsignalstudio.com)",
    },
  ],
};

async function fix() {
  let fixed = 0;

  for (const [slug, fixes] of Object.entries(linkFixes)) {
    const { data: post } = await sb
      .from("posts")
      .select("content")
      .eq("slug", slug)
      .single();

    if (!post) {
      console.log("NOT FOUND: " + slug);
      continue;
    }

    let content = post.content;
    let changeCount = 0;

    for (const fix of fixes) {
      if (content.includes(fix.find)) {
        content = content.replace(fix.find, fix.replace);
        changeCount++;
      }
    }

    if (changeCount > 0) {
      const { error } = await sb
        .from("posts")
        .update({ content })
        .eq("slug", slug);

      if (error) {
        console.log("ERROR: " + slug + " — " + error.message);
      } else {
        console.log("FIXED: " + slug + " (" + changeCount + " links)");
        fixed++;
      }
    } else {
      console.log("NO CHANGES: " + slug);
    }
  }

  console.log("\nDone. Fixed: " + fixed + " posts");
}

fix().catch(console.error);
