import { notFound } from "next/navigation";
import { components } from "@/lib/registry";
import { getRegistryComponent } from "@/lib/registry-server";
import ComponentPreviewRenderer from "@/components/site/ComponentPreviewRenderer";
import ComponentRegistrar from "@/components/site/ComponentRegistrar";
import {
  getLanguageAlternates,
  ALTERNATE_OG_LOCALES,
  generateComponentLdJsonGraph,
} from "@/lib/i18n-seo";
import type { Metadata } from "next";

interface ComponentPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: ComponentPageProps): Promise<Metadata> {
  const { slug } = await params;
  const component = components.find((c) => c.slug === slug);

  if (!component) {
    return {
      title: "Component Not Found",
    };
  }

  const title = `${component.name} Component`;
  const description = `${component.description} Copy and paste this accessible React component built with Tailwind CSS into your project.`;
  const ogImageUrl = `/api/og?title=${encodeURIComponent(component.name)}&breadcrumbs=Components,${encodeURIComponent(component.category)}`;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | Great UI`,
      description,
      url: `/components/${slug}`,
      type: "article",
      locale: "en_US",
      alternateLocale: ALTERNATE_OG_LOCALES,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${component.name} - Great UI`,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Great UI`,
      description,
      site: "@GreatUIHQ",
      creator: "@GreatUIHQ",
      images: [ogImageUrl],
    },
    alternates: {
      canonical: `/components/${slug}`,
      languages: getLanguageAlternates(`/components/${slug}`),
    },
  };
}

export function generateStaticParams() {
  return components.map((c) => ({ slug: c.slug }));
}

export default async function ComponentPage({ params }: ComponentPageProps) {
  const { slug } = await params;
  const component = getRegistryComponent(slug);

  if (!component) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateComponentLdJsonGraph(
              component.slug,
              component.name,
              component.description,
              component.category,
            ),
          ),
        }}
      />
      <ComponentRegistrar component={component} />
      <ComponentPreviewRenderer slug={slug} />
    </>
  );
}
