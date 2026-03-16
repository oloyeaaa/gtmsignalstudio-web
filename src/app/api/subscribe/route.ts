import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { email, magnet } = await request.json();

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  const apiKey = process.env.BEEHIIV_API_KEY;
  const pubId = process.env.BEEHIIV_PUBLICATION_ID;

  if (!apiKey || !pubId) {
    return NextResponse.json(
      { error: "Newsletter service not configured" },
      { status: 500 }
    );
  }

  const res = await fetch(
    `https://api.beehiiv.com/v2/publications/${pubId}/subscriptions`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        reactivate_existing: true,
        send_welcome_email: true,
        utm_source: "website",
        utm_medium: magnet ? "lead-magnet" : "organic",
        utm_campaign: magnet || undefined,
        referring_site: "https://gtmsignalstudio.com",
      }),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    console.error("Beehiiv error:", res.status, text);
    return NextResponse.json(
      { error: "Subscription failed. Please try again." },
      { status: 500 }
    );
  }

  const data = await res.json();
  return NextResponse.json({
    success: true,
    status: data.data?.status || "active",
  });
}
