import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import BackgroundGrid from "@/components/site/BackgroundGrid";
import Container from "@/components/site/Container";
import ComponentCard from "@/components/site/ComponentCard";
import { CarbonCardAd } from "@/components/site/CarbonAds";
import { getPreviewPoster } from "@/lib/registry";
import {
  componentsByCategory,
  getCategoryInfo,
  getAllCategorySlugs,
  slugToCategory,
} from "@/lib/categories";
import {
  getLanguageAlternates,
  ALTERNATE_OG_LOCALES,
  CATEGORY_I18N,
} from "@/lib/i18n-seo";
import type { Metadata } from "next";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return getAllCategorySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const categoryInfo = getCategoryInfo(slug);

  if (!categoryInfo) {
    return {
      title: "Category Not Found",
    };
  }

  const title = `${categoryInfo.seoTitle} | Great UI`;
  const description = categoryInfo.seoDescription;
  const canonicalUrl = `/components/category/${categoryInfo.slug}`;
  const ogImageUrl = `/api/og?title=${encodeURIComponent(categoryInfo.name + " Components")}&breadcrumbs=Components`;

  const i18nInfo = CATEGORY_I18N[categoryInfo.slug];
  const translatedKeywords = i18nInfo
    ? Object.values(i18nInfo).flatMap((c) => c.keywords)
    : [];

  return {
    title,
    description,
    keywords: [
      ...categoryInfo.keywords,
      ...translatedKeywords,
      "react components",
      "tailwind css",
      "motion",
      "nextjs ui components",
      "accessible ui",
      "copy paste components",
      "ui library",
      "great ui",
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: getLanguageAlternates(canonicalUrl),
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "website",
      siteName: "Great UI",
      locale: "en_US",
      alternateLocale: ALTERNATE_OG_LOCALES,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${categoryInfo.name} Components - Great UI`,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: "@GreatUIHQ",
      creator: "@GreatUIHQ",
      images: [ogImageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const categoryName = slugToCategory(slug);

  if (!categoryName) {
    notFound();
  }

  const categoryInfo = getCategoryInfo(categoryName);
  if (!categoryInfo) {
    notFound();
  }

  const categoryComponents = componentsByCategory[categoryName] || [];
  const sortedComponents = [...categoryComponents].reverse();

  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.great-ui.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Components",
        item: "https://www.great-ui.com/components",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: categoryInfo.name,
        item: `https://www.great-ui.com/components/category/${categoryInfo.slug}`,
      },
    ],
  };

  const i18nCategory = CATEGORY_I18N[categoryInfo.slug];
  const alternateCategoryNames = i18nCategory
    ? Object.values(i18nCategory).map((c) => c.name)
    : [];

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${categoryInfo.name} Components`,
    alternateName: [categoryInfo.name, ...alternateCategoryNames],
    headline: `${categoryInfo.name} Components for React & Tailwind CSS`,
    description: categoryInfo.seoDescription,
    url: `https://www.great-ui.com/components/category/${categoryInfo.slug}`,
    inLanguage: ["en-US", "zh-CN", "es-ES", "fr-FR", "ar-SA", "ja-JP"],
    isPartOf: {
      "@type": "WebSite",
      name: "Great UI",
      url: "https://www.great-ui.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Great UI",
      url: "https://www.great-ui.com",
      logo: "https://www.great-ui.com/logo/logo-dark.png",
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: sortedComponents.length,
      itemListElement: sortedComponents.map((c, index) => {
        const poster = getPreviewPoster(c);
        const imageUrl = poster
          ? poster.startsWith("http")
            ? poster
            : `https://www.great-ui.com${poster}`
          : "https://www.great-ui.com/opengraph-image.png";

        return {
          "@type": "ListItem",
          position: index + 1,
          name: c.name,
          description: c.description,
          url: `https://www.great-ui.com/components/${c.slug}`,
          image: imageUrl,
        };
      }),
    },
  };

  const allCategoryFaqs = [
    ...categoryInfo.faqs.map((faq) => ({
      "@type": "Question" as const,
      name: faq.question,
      inLanguage: "en-US",
      acceptedAnswer: {
        "@type": "Answer" as const,
        text: faq.answer,
        inLanguage: "en-US",
      },
    })),
    ...(i18nCategory
      ? Object.entries(i18nCategory).flatMap(([lang, data]) =>
          data.faqs.map((faq) => ({
            "@type": "Question" as const,
            name: faq.question,
            inLanguage: lang,
            acceptedAnswer: {
              "@type": "Answer" as const,
              text: faq.answer,
              inLanguage: lang,
            },
          })),
        )
      : []),
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allCategoryFaqs,
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-white text-neutral-900 transition-colors dark:bg-neutral-950 dark:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <BackgroundGrid />
      <Navbar />

      <main className="relative z-10">
        <Container className="py-10 md:py-16">
          <header className="flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl leading-[1.1] font-semibold tracking-tight text-balance text-neutral-900 sm:text-5xl md:text-6xl dark:text-neutral-300">
              {sortedComponents.length} Great {categoryInfo.name} Components
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-balance text-neutral-600 sm:text-xl md:text-2xl dark:text-neutral-400">
              Explore our collection of production-grade React &amp; Tailwind
              CSS {categoryInfo.name.toLowerCase()} components.{" "}
              <span className="font-medium text-[#f6821f]/80">
                [Hover to Preview]
              </span>
            </p>
          </header>

          <div className="mt-16 flex flex-col gap-20">
            <section
              aria-label={`${categoryInfo.name} components grid`}
              className="flex flex-col"
            >
              <div className="mb-6 flex items-baseline justify-between border-b border-neutral-100 pb-4 dark:border-neutral-900">
                <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl dark:text-neutral-300">
                  {categoryInfo.name}
                </h2>
                <span className="text-sm font-semibold tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
                  {sortedComponents.length}{" "}
                  {sortedComponents.length === 1 ? "Component" : "Components"}
                </span>
              </div>

              <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {sortedComponents.map((c) => (
                  <article key={c.slug} className="flex flex-col">
                    <Link
                      href={`/components/${c.slug}`}
                      aria-label={`View ${c.name} component`}
                      className="group relative block cursor-pointer overflow-hidden rounded-3xl bg-neutral-100 no-underline dark:bg-neutral-900"
                    >
                      <ComponentCard component={c} />
                    </Link>
                  </article>
                ))}
                <CarbonCardAd />
              </div>
            </section>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
