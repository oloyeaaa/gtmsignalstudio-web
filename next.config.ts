import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow images from Supabase storage and WordPress (during migration)
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "qgcbzstbwfpxkruanrgt.supabase.co",
      },
      {
        protocol: "https",
        hostname: "gtmsignalstudio.com",
      },
      {
        protocol: "https",
        hostname: "www.google.com",
        pathname: "/s2/favicons/**",
      },
      {
        protocol: "https",
        hostname: "t2.gstatic.com",
      },
    ],
  },

  // Security and performance headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Security
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://www.clarity.ms; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://qgcbzstbwfpxkruanrgt.supabase.co https://www.google.com https://t2.gstatic.com https://www.google-analytics.com https://www.clarity.ms; font-src 'self'; connect-src 'self' https://qgcbzstbwfpxkruanrgt.supabase.co https://www.google-analytics.com https://analytics.google.com https://www.clarity.ms https://*.clarity.ms; frame-ancestors 'none'; base-uri 'self'; form-action 'self';",
          },
        ],
      },
      {
        // Cache static assets aggressively
        source: "/fonts/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/gss-logo.png",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // Domain redirects (old domains → gtmsignalstudio.com)
  async redirects() {
    return [
      // Old WordPress paths that changed
      {
        source: "/acquisition",
        destination: "/#services",
        permanent: true,
      },
      {
        source: "/retention",
        destination: "/#services",
        permanent: true,
      },
      {
        source: "/3335-2",
        destination: "/blog/spf-dkim-dmarc-cold-email-2026",
        permanent: true,
      },
      {
        source: "/ai-presence-audit",
        destination: "/ai-visibility-audit",
        permanent: true,
      },
      {
        source: "/gtm-signals-guide",
        destination: "/resources/ai-visibility-playbook",
        permanent: true,
      },
      {
        source: "/audit",
        destination: "/ai-visibility-audit",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
