import { getPublishedPosts } from "@/lib/queries";

export async function GET() {
  const baseUrl = "https://gtmsignalstudio.com";
  let posts: Awaited<ReturnType<typeof getPublishedPosts>> = [];

  try {
    posts = await getPublishedPosts(50);
  } catch {
    // fallback to empty
  }

  const items = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <description><![CDATA[${post.meta_description || post.excerpt || ""}]]></description>
      <pubDate>${new Date(post.published_at).toUTCString()}</pubDate>
      <author>oloye@gtmsignalstudio.com (Oloye Adeosun)</author>
      <category>${post.category}</category>
    </item>`
    )
    .join("\n");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>GTM Signal Studio</title>
    <link>${baseUrl}</link>
    <description>Enterprise marketing insights on AI visibility, MarTech, and signal-led GTM. Research-backed frameworks, data, and patterns.</description>
    <language>en-gb</language>
    <managingEditor>oloye@gtmsignalstudio.com (Oloye Adeosun)</managingEditor>
    <webMaster>oloye@gtmsignalstudio.com (Oloye Adeosun)</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${baseUrl}/gss-logo.png</url>
      <title>GTM Signal Studio</title>
      <link>${baseUrl}</link>
    </image>
    ${items}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
