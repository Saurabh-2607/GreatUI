import { notFound } from "next/navigation";
import { components } from "@/lib/registry";
import Sidebar from "@/components/Sidebar";
import PropsPanel from "@/components/PropsPanel";
import TopBar from "@/components/TopBar";

export function generateStaticParams() {
  return components.map((c) => ({ slug: c.slug }));
}

export default async function ComponentPage(props: PageProps<"/components/[slug]">) {
  const { slug } = await props.params;
  const component = components.find((c) => c.slug === slug);

  if (!component) notFound();

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#111111] text-white">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeSlug={slug} />

        <section className="flex flex-1 items-center justify-center bg-[#111111]">
          {/* Component preview goes here */}
          <div className="flex h-48 w-48 items-center justify-center rounded-2xl border border-white/6 bg-[#1a1a1a] text-zinc-700">
            <span className="text-xs">{component.name}</span>
          </div>
        </section>

        <PropsPanel component={component} />
      </div>
    </div>
  );
}
