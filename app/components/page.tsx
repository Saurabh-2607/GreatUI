import Link from "next/link";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import BackgroundGrid from "@/components/site/BackgroundGrid";
import Container from "@/components/site/Container";
import ComponentCard from "@/components/site/ComponentCard";
import { components } from "@/lib/registry";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Components",
  description:
    "Explore our collection of production-grade React & Tailwind CSS components. Copy, paste, and build interfaces instantly.",
  openGraph: {
    title: "Components - Great UI",
    description:
      "Explore our collection of production-grade React & Tailwind CSS components. Copy, paste, and build interfaces instantly.",
    url: "https://great-ui.com/components",
    type: "website",
    images: [
      "/api/og?title=Components&description=Explore%20our%20collection%20of%20production-grade%20React%20%26%20Tailwind%20CSS%20components.",
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Components - Great UI",
    description:
      "Explore our collection of production-grade React & Tailwind CSS components. Copy, paste, and build interfaces instantly.",
    images: [
      "/api/og?title=Components&description=Explore%20our%20collection%20of%20production-grade%20React%20%26%20Tailwind%20CSS%20components.",
    ],
  },
  alternates: {
    canonical: "/components",
  },
};

const CATEGORY_ORDER = [
  "Shaders",
  "Page Transitions",
  "Theme Transitions",
  "Typography",
  "Buttons",
  "Layout & Cards",
  "Social Cards",
  "Visuals",
];

export default function ComponentsPage() {
  const componentsByCategory = components.reduce(
    (acc, c) => {
      if (!acc[c.category]) acc[c.category] = [];
      acc[c.category].push(c);
      return acc;
    },
    {} as Record<string, typeof components>,
  );

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-white text-neutral-900 transition-colors dark:bg-[#0a0a0a] dark:text-white">
      <BackgroundGrid />
      <Navbar />

      <main className="relative z-10">
        <Container className="bg-white px-4 py-10 sm:px-6 md:py-16 dark:bg-neutral-950">
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl font-semibold tracking-tight text-neutral-950 sm:text-5xl md:text-6xl dark:text-white">
              {components.length} Great Components
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-neutral-600 sm:text-xl md:text-2xl dark:text-neutral-400">
              Explore our collection of production-grade React &amp; Tailwind
              CSS components.{" "}
              <span className="font-medium text-[#f6821f]/80">
                [Hover to Preview]
              </span>
            </p>
          </div>

          <div className="mt-16 flex flex-col gap-20">
            {CATEGORY_ORDER.map((catName) => {
              const catComponents = componentsByCategory[catName] || [];
              if (catComponents.length === 0) return null;

              const sortedComponents = [...catComponents].reverse();

              return (
                <section key={catName} className="flex flex-col">
                  <div className="mb-6 flex items-baseline justify-between border-b border-neutral-100 pb-4 dark:border-neutral-900">
                    <h2 className="text-2xl font-bold tracking-tight text-neutral-700 sm:text-3xl dark:text-neutral-300">
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
                        className="group relative block cursor-pointer overflow-hidden rounded-t-3xl rounded-b-2xl bg-neutral-100/70 no-underline dark:bg-neutral-900"
                      >
                        <ComponentCard component={c} />
                      </Link>
                    ))}
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
