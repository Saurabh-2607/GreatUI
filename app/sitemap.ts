import { MetadataRoute } from "next";
import { components } from "@/lib/registry";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://great-ui.com";

  const componentUrls = components.map((c) => ({
    url: `${baseUrl}/components/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    ...componentUrls,
  ];
}
