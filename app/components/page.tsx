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
  },
  alternates: {
    canonical: "/components",
  },
};

export default function ComponentsPage() {
  const sortedComponents = [...components].reverse();

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

          <div className="mt-12">
            {components.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                  No components in the registry yet.
                </p>
              </div>
            ) : (
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
            )}
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
