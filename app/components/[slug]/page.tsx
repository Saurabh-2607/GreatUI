import { notFound } from "next/navigation";
import { components } from "@/lib/registry";
import ComponentViewer from "@/components/ComponentViewer";
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
      title: "Component Not Found - Great UI",
    };
  }

  return {
    title: `${component.name} - Great UI`,
    description: component.description,
  };
}

export function generateStaticParams() {
  return components.map((c) => ({ slug: c.slug }));
}

export default async function ComponentPage({ params }: ComponentPageProps) {
  const { slug } = await params;
  const component = components.find((c) => c.slug === slug);

  if (!component) notFound();

  return <ComponentViewer component={component} />;
}
