import Link from "next/link";
import ComponentCard from "@/components/site/ComponentCard";
import { components, type Component } from "@/lib/registry";
import { CATEGORY_ORDER, componentsByCategory } from "@/lib/categories";
import { CarbonCardAd } from "@/components/site/CarbonAds";
import type { Metadata } from "next";
import {
  getLanguageAlternates,
  getAllSeoKeywords,
  ALTERNATE_OG_LOCALES,
} from "@/lib/i18n-seo";

export const metadata: Metadata = {
  title: "Components",
  description:
    "Explore our collection of production-grade React & Tailwind CSS components. Copy, paste, and build interfaces instantly.",
  keywords: getAllSeoKeywords(),
  openGraph: {
    title: "Components - Great UI",
    description:
      "Explore our collection of production-grade React & Tailwind CSS components. Copy, paste, and build interfaces instantly.",
    url: "/components",
    type: "website",
    locale: "en_US",
    alternateLocale: ALTERNATE_OG_LOCALES,
    images: [
      {
        url: "/api/og?title=Components&breadcrumbs=Great%20UI",
        width: 1200,
        height: 630,
        alt: "Great UI Components",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Components - Great UI",
    description:
      "Explore our collection of production-grade React & Tailwind CSS components. Copy, paste, and build interfaces instantly.",
    site: "@GreatUIHQ",
    creator: "@GreatUIHQ",
    images: ["/api/og?title=Components&breadcrumbs=Great%20UI"],
  },
  alternates: {
    canonical: "/components",
    languages: getLanguageAlternates("/components"),
  },
};

export default function ComponentsCatalogPage() {
  const activeCategories = CATEGORY_ORDER.filter(
    (catName) => (componentsByCategory[catName] || []).length > 0,
  );
  const lastCategoryName = activeCategories[activeCategories.length - 1];

  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 py-8 sm:px-6 md:px-8 md:py-12">
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl leading-[1.1] font-semibold tracking-tight text-balance text-neutral-900 sm:text-4xl md:text-5xl dark:text-neutral-200">
          <span className="text-[#f6821f]">{components.length}</span> Great
          Components
        </h1>
        <p className="mt-3 max-w-2xl text-base text-balance text-neutral-600 sm:text-lg md:text-xl dark:text-neutral-400">
          Explore our collection of production-grade React &amp; Tailwind CSS
          components.{" "}
          <span className="font-medium text-[#f6821f]/80">
            [Hover to Preview]
          </span>
        </p>
      </div>

      <div className="mt-12 flex flex-col gap-16">
        {CATEGORY_ORDER.map((catName) => {
          const catComponents = componentsByCategory[catName] || [];
          if (catComponents.length === 0) return null;

          const sortedComponents = [...catComponents].reverse();

          return (
            <section key={catName} className="flex flex-col">
              <div className="mb-6 flex items-baseline justify-between border-b border-neutral-200/60 pb-3 dark:border-neutral-800">
                <h2 className="text-xl font-semibold tracking-tight text-neutral-900 sm:text-2xl dark:text-neutral-200">
                  {catName}
                </h2>
                <span className="text-xs font-semibold tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
                  {sortedComponents.length}{" "}
                  {sortedComponents.length === 1 ? "Component" : "Components"}
                </span>
              </div>

              <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {sortedComponents.map((c) => (
                  <Link
                    href={`/components/${c.slug}`}
                    key={c.slug}
                    aria-label={`View ${c.name} component`}
                    className="group relative block cursor-pointer overflow-hidden rounded-3xl bg-neutral-100 no-underline dark:bg-neutral-900"
                  >
                    <ComponentCard component={c} />
                  </Link>
                ))}
                {catName === lastCategoryName && <CarbonCardAd />}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
