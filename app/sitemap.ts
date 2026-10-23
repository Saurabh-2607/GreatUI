import { MetadataRoute } from "next";
import { components } from "@/lib/registry";
import { getAllCategorySlugs } from "@/lib/categories";
import { getLanguageAlternates } from "@/lib/i18n-seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.great-ui.com";

  const categoryUrls = getAllCategorySlugs().map((slug) => {
    const path = `/components/category/${slug}`;
    return {
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.85,
      alternates: {
        languages: getLanguageAlternates(path),
      },
    };
  });

  const componentUrls = components.map((c) => {
    const path = `/components/${c.slug}`;
    return {
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
      alternates: {
        languages: getLanguageAlternates(path),
      },
    };
  });

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
      alternates: {
        languages: getLanguageAlternates("/"),
      },
    },
    {
      url: `${baseUrl}/components`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
      alternates: {
        languages: getLanguageAlternates("/components"),
      },
    },
    ...categoryUrls,
    {
      url: `${baseUrl}/logo`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
      alternates: {
        languages: getLanguageAlternates("/logo"),
      },
    },
    {
      url: `${baseUrl}/changelog`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
      alternates: {
        languages: getLanguageAlternates("/changelog"),
      },
    },
    {
      url: `${baseUrl}/sponsors`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
      alternates: {
        languages: getLanguageAlternates("/sponsors"),
      },
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
      alternates: {
        languages: getLanguageAlternates("/terms"),
      },
    },
    ...componentUrls,
  ];
}
