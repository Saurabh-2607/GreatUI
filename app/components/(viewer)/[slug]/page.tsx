import { notFound } from "next/navigation";
import { components } from "@/lib/registry";
import { getRegistryComponent } from "@/lib/registry-server";
import ComponentPreviewRenderer from "@/components/site/ComponentPreviewRenderer";
import ComponentRegistrar from "@/components/site/ComponentRegistrar";
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

  const ogImages = component.previewImage
    ? [
        {
          url: component.previewImage.startsWith("http")
            ? component.previewImage
            : `https://great-ui.com${component.previewImage}`,
          width: 1200,
          height: 630,
          alt: `${component.name} Preview`,
        },
      ]
    : [
        {
          url: "https://great-ui.com/Great-UI.png",
          width: 1200,
          height: 630,
          alt: "Great UI Logo",
        },
      ];

  return {
    title,
    description,
    openGraph: {
      title: `${title} | Great UI`,
      description,
      url: `https://great-ui.com/components/${slug}`,
      type: "article",
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Great UI`,
      description,
      images: ogImages.map((img) => img.url),
    },
    alternates: {
      canonical: `/components/${slug}`,
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
      <ComponentRegistrar component={component} />
      <ComponentPreviewRenderer slug={slug} />
    </>
  );
}
