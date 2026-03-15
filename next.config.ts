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
    ];
  },
};

export default nextConfig;
