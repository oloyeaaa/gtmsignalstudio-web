import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Static redirect map (loaded at build time, not from Supabase — faster)
const REDIRECTS: Record<string, { to: string; status: number }> = {
  // Domain redirects are handled at DNS/Vercel level
  // Path redirects
  "/3335-2": { to: "/blog/spf-dkim-dmarc-cold-email-2026", status: 301 },
  // Legacy paths
  "/acquisition": { to: "/#services", status: 301 },
  "/retention": { to: "/#services", status: 301 },
};

// Subdomain redirect map
const SUBDOMAIN_REDIRECTS: Record<string, string> = {
  "partner.gtmsignalstudio.com": "/audit",
  "resources.gtmsignalstudio.com": "/resources",
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hostname = request.headers.get("host") || "";

  // Handle subdomain redirects
  for (const [subdomain, target] of Object.entries(SUBDOMAIN_REDIRECTS)) {
    if (hostname === subdomain || hostname === `www.${subdomain}`) {
      const targetPath = pathname === "/" ? target : `${target}${pathname}`;
      return NextResponse.redirect(
        new URL(targetPath, `https://gtmsignalstudio.com`),
        301
      );
    }
  }

  // Handle old domain redirects
  if (hostname.includes("oloye.co.uk")) {
    return NextResponse.redirect(new URL("/", "https://gtmsignalstudio.com"), 301);
  }
  if (hostname.includes("oloyeaa.com")) {
    return NextResponse.redirect(new URL("/newsletter", "https://gtmsignalstudio.com"), 301);
  }

  // Handle path redirects
  const redirect = REDIRECTS[pathname];
  if (redirect) {
    return NextResponse.redirect(
      new URL(redirect.to, request.url),
      redirect.status as 301 | 302
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except static files and API routes
    "/((?!_next/static|_next/image|favicon.ico|fonts|gss-logo.png|robots.txt).*)",
  ],
};
