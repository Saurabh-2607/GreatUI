import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/r/", "/api/", "/ingest/"],
    },
    sitemap: "https://great-ui.com/sitemap.xml",
  };
}
