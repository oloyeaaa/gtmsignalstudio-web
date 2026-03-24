import { NextRequest, NextResponse } from "next/server";

// In-memory rate limiter (resets on deploy, sufficient for Vercel serverless)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5; // max requests
const RATE_WINDOW = 60 * 1000; // per 60 seconds

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT;
}

// RFC 5322 simplified email validation
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return emailRegex.test(email) && email.length <= 254;
}

export async function POST(request: NextRequest) {
  // Rate limiting
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  // Validate origin (CSRF protection)
  const origin = request.headers.get("origin");
  const allowedOrigins = [
    "https://gtmsignalstudio.com",
    "https://www.gtmsignalstudio.com",
  ];

  if (
    process.env.NODE_ENV === "production" &&
    origin &&
    !allowedOrigins.includes(origin)
  ) {
    return NextResponse.json(
      { error: "Forbidden" },
      { status: 403 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  const { email, magnet, source } = body;

  if (!email || !isValidEmail(email)) {
    return NextResponse.json(
      { error: "Valid email required" },
      { status: 400 }
    );
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
        utm_source: source || "website",
        utm_medium: magnet ? "lead-magnet" : "organic",
        utm_campaign: magnet || undefined,
        referring_site: `https://gtmsignalstudio.com${source ? `/resources/${source}` : ""}`,
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
