import Link from "next/link";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import BackgroundGrid from "@/components/site/BackgroundGrid";
// import AnnouncementBanner from "@/components/site/AnnouncementBanner";
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
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-white pb-16 text-neutral-900 transition-colors dark:bg-[#0a0a0a] dark:text-white">
      <BackgroundGrid />
      <Navbar />
      {/* <AnnouncementBanner /> */}

      <main className="relative z-10">
        <Container className="py-10 md:py-16">
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl font-semibold tracking-tight text-neutral-950 sm:text-5xl md:text-6xl dark:text-white">
              {components.length} Great Components
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-neutral-600 sm:text-xl md:text-2xl dark:text-neutral-400">
              Explore our collection of production-grade React &amp; Tailwind
              CSS components.
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
                {components.map((c) => (
                  <Link
                    href={`/components/${c.slug}`}
                    key={c.slug}
                    className="group relative block cursor-pointer border border-neutral-200 bg-neutral-50/10 no-underline transition-colors duration-300 hover:bg-neutral-100/50 dark:border-neutral-800 dark:bg-neutral-900/5 dark:hover:bg-[#141414]/60"
                  >
                    {/* Individual Card Corner Anchors */}
                    <div
                      className="pointer-events-none absolute inset-0 z-20 select-none"
                      aria-hidden="true"
                    >
                      <div className="absolute -top-[7px] -left-[7px] h-3.5 w-3.5 rounded-[3px] border border-neutral-200/60 bg-white dark:border-neutral-800 dark:bg-[#0a0a0a]" />
                      <div className="absolute -top-[7px] -right-[7px] h-3.5 w-3.5 rounded-[3px] border border-neutral-200/60 bg-white dark:border-neutral-800 dark:bg-[#0a0a0a]" />
                      <div className="absolute -bottom-[7px] -left-[7px] h-3.5 w-3.5 rounded-[3px] border border-neutral-200/60 bg-white dark:border-neutral-800 dark:bg-[#0a0a0a]" />
                      <div className="absolute -right-[7px] -bottom-[7px] h-3.5 w-3.5 rounded-[3px] border border-neutral-200/60 bg-white dark:border-neutral-800 dark:bg-[#0a0a0a]" />
                    </div>

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
