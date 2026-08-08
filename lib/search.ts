import { components } from "./registry";

export interface SearchEntry {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  keywords: string[];
}

export const staticPages: SearchEntry[] = [
  {
    id: "home",
    title: "Home",
    description:
      "Craft Premium React Interfaces with Absolute Speed. Beautiful, accessible, and high-performance React components built with Tailwind CSS.",
    url: "/",
    category: "General Pages",
    keywords: [
      "home",
      "landing",
      "great ui",
      "react",
      "tailwind",
      "design system",
      "index",
    ],
  },
  {
    id: "components",
    title: "All Components",
    description:
      "Explore our collection of production-grade React & Tailwind CSS components.",
    url: "/components",
    category: "General Pages",
    keywords: [
      "components",
      "ui",
      "library",
      "react",
      "tailwind",
      "inputs",
      "buttons",
      "navigation",
      "illustrations",
      "utilities",
      "all",
    ],
  },
  {
    id: "logo",
    title: "Logo Assets",
    description:
      "Official Great UI logo assets, typography, and SVG/PNG branding assets.",
    url: "/logo",
    category: "General Pages",
    keywords: [
      "logo",
      "assets",
      "brand",
      "branding",
      "typography",
      "svg",
      "png",
      "download",
      "images",
    ],
  },
];

export const getSearchIndex = (): SearchEntry[] => {
  const componentEntries: SearchEntry[] = components.map((c) => ({
    id: `component-${c.slug}`,
    title: c.name,
    description: c.description,
    url: `/components/${c.slug}`,
    category: "Components",
    keywords: [
      c.name.toLowerCase(),
      "components",
      c.interactionType.toLowerCase(),
      ...(c.dependencies || []),
      ...(c.props?.map((p) => p.name.toLowerCase()) || []),
      "component",
      "preview",
      "code",
      "react",
      "tailwind",
    ],
  }));

  return [...staticPages, ...componentEntries];
};
