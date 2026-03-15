/**
 * Audit all published posts for SEO gaps
 * Usage: node scripts/audit-posts.js
 */
const { createClient } = require("@supabase/supabase-js");

const sb = createClient(
  "https://qgcbzstbwfpxkruanrgt.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFnY2J6c3Rid2ZweGtydWFucmd0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzU3NTY4NSwiZXhwIjoyMDg5MTUxNjg1fQ.ZWfOuASAF3hFpGQaFKl8FR2ctV2KtZI3wD9zJBmUdkY"
);

async function audit() {
  const { data: posts } = await sb
    .from("posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: true });

  let totalIssues = 0;
  const summary = {
    no_featured: 0,
    no_infographic: 0,
    no_faq: 0,
    no_short_answer: 0,
    no_tags: 0,
    no_meta: 0,
    heading_issues: 0,
    naked_links: 0,
  };

  for (const p of posts) {
    const issues = [];

    if (!p.featured_image) { issues.push("NO featured_image"); summary.no_featured++; }
    if (!p.infographic_image) { issues.push("NO infographic_image"); summary.no_infographic++; }
    if (!p.faq || p.faq.length === 0) { issues.push("NO faq"); summary.no_faq++; }
    if (!p.short_answer) { issues.push("NO short_answer"); summary.no_short_answer++; }
    if (!p.tags || p.tags.length === 0) { issues.push("NO tags"); summary.no_tags++; }
    if (!p.meta_description) { issues.push("NO meta_description"); summary.no_meta++; }

    // Check heading hierarchy
    const h1s = (p.content.match(/^# [^#]/gm) || []).length;
    const h2s = (p.content.match(/^## [^#]/gm) || []).length;
    const h3s = (p.content.match(/^### [^#]/gm) || []).length;
    if (h1s > 0) { issues.push("H1 in content (" + h1s + ")"); summary.heading_issues++; }
    if (h2s === 0) { issues.push("NO H2 headings"); summary.heading_issues++; }

    // Check for naked links
    const urlRegex = /https?:\/\/[^\s)"\]>]+/g;
    const allUrls = p.content.match(urlRegex) || [];
    let nakedCount = 0;
    const nakedExamples = [];
    for (const url of allUrls) {
      // Check if URL is inside a markdown link: [text](url)
      const escapedUrl = url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const mdLink = new RegExp("\\]\\(" + escapedUrl);
      const imgLink = new RegExp("!\\[.*?\\]\\(" + escapedUrl);
      if (!mdLink.test(p.content) && !imgLink.test(p.content)) {
        nakedCount++;
        if (nakedExamples.length < 2) nakedExamples.push(url.substring(0, 60));
      }
    }
    if (nakedCount > 0) {
      issues.push("NAKED links (" + nakedCount + "): " + nakedExamples.join(", "));
      summary.naked_links++;
    }

    totalIssues += issues.length;

    if (issues.length > 0) {
      console.log("\n" + p.title + " (/" + p.slug + ")");
      console.log("  H2s: " + h2s + ", H3s: " + h3s + ", Words: " + p.content.split(/\s+/).length);
      issues.forEach((i) => console.log("  ! " + i));
    }
  }

  console.log("\n========= SUMMARY =========");
  console.log("Posts audited: " + posts.length);
  console.log("Total issues: " + totalIssues);
  console.log("Missing featured_image: " + summary.no_featured + "/21");
  console.log("Missing infographic_image: " + summary.no_infographic + "/21");
  console.log("Missing FAQ: " + summary.no_faq + "/21");
  console.log("Missing short_answer: " + summary.no_short_answer + "/21");
  console.log("Missing tags: " + summary.no_tags + "/21");
  console.log("Missing meta_description: " + summary.no_meta + "/21");
  console.log("Heading issues: " + summary.heading_issues + " posts");
  console.log("Naked links: " + summary.naked_links + " posts");
}

audit().catch(console.error);
