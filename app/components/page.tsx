import Link from "next/link";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import BackgroundGrid from "@/components/site/BackgroundGrid";
import Container from "@/components/site/Container";
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

const FEATURED_SLUGS = [
  "pixel-swipe-page-transition",
  "pixel-swipe-text",
  "scroll-flying-cards",
];

export default function ComponentsPage() {
  const featuredComponents = FEATURED_SLUGS.map((slug) =>
    components.find((c) => c.slug === slug),
  ).filter((c): c is Component => c !== undefined);

  const activeCategories = CATEGORY_ORDER.filter(
    (catName) => (componentsByCategory[catName] || []).length > 0,
  );
  const lastCategoryName = activeCategories[activeCategories.length - 1];

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-white text-neutral-900 transition-colors dark:bg-neutral-950 dark:text-white">
      <BackgroundGrid />
      <Navbar />

      <main className="relative z-10">
        <Container className="py-10 md:py-16">
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl leading-[1.1] font-semibold tracking-tight text-balance text-neutral-900 sm:text-5xl md:text-6xl dark:text-neutral-300">
              {components.length} Great Components
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-balance text-neutral-600 sm:text-xl md:text-2xl dark:text-neutral-400">
              Explore our collection of production-grade React &amp; Tailwind
              CSS components.{" "}
              <span className="font-medium text-[#f6821f]/80">
                [Hover to Preview]
              </span>
            </p>
          </div>

          <div className="mt-16 flex flex-col gap-20">
            {featuredComponents.length > 0 && (
              <section className="flex flex-col">
                <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {featuredComponents.map((c) => (
                    <Link
                      href={`/components/${c.slug}`}
                      key={c.slug}
                      aria-label={`View ${c.name} component`}
                      className="group relative block cursor-pointer overflow-hidden rounded-3xl bg-neutral-100 no-underline dark:bg-neutral-900"
                    >
                      <ComponentCard component={c} isFeatured={true} />
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {CATEGORY_ORDER.map((catName) => {
              const catComponents = componentsByCategory[catName] || [];
              if (catComponents.length === 0) return null;

              const sortedComponents = [...catComponents].reverse();

              return (
                <section key={catName} className="flex flex-col">
                  <div className="mb-6 flex items-baseline justify-between border-b border-neutral-100 pb-4 dark:border-neutral-900">
                    <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl dark:text-neutral-300">
                      {catName}
                    </h2>
                    <span className="text-sm font-semibold tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
                      {sortedComponents.length}{" "}
                      {sortedComponents.length === 1
                        ? "Component"
                        : "Components"}
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
        </Container>
      </main>

      <Footer />
    </div>
  );
}
