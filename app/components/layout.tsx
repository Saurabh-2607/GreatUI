import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Components",
  description:
    "Explore our collection of production-grade React & Tailwind CSS components. Copy, paste, and build premium interfaces instantly.",
  openGraph: {
    title: "React & Tailwind CSS Components - Great UI",
    description:
      "Explore our collection of production-grade React & Tailwind CSS components. Copy, paste, and build premium interfaces instantly.",
    url: "https://great-ui.com/components",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "React & Tailwind CSS Components - Great UI",
    description:
      "Explore our collection of production-grade React & Tailwind CSS components.",
  },
  alternates: {
    canonical: "/components",
  },
};

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
