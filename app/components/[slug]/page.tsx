import { notFound } from "next/navigation";
import { components } from "@/lib/registry";
import ComponentViewer from "@/components/ComponentViewer";

export function generateStaticParams() {
  return components.map((c) => ({ slug: c.slug }));
}

export default async function ComponentPage(
  props: PageProps<"/components/[slug]">,
) {
  const { slug } = await props.params;
  const component = components.find((c) => c.slug === slug);

  if (!component) notFound();

  return <ComponentViewer component={component} components={components} />;
}
