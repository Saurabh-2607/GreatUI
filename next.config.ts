import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/array/:path*",
        destination: "https://us-assets.i.posthog.com/array/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/category/:slug",
        destination: "/components/category/:slug",
        permanent: true,
      },
      {
        source: "/categories/:slug",
        destination: "/components/category/:slug",
        permanent: true,
      },
      {
        source: "/components/category/layout-cards",
        destination: "/components/category/layout-and-cards",
        permanent: true,
      },
    ];
  },
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
