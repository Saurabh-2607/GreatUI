"use client";

import { useMemo } from "react";
import Link from "next/link";
import posthog from "posthog-js";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import BackgroundGrid from "@/components/site/BackgroundGrid";
import AnnouncementBanner from "@/components/site/AnnouncementBanner";
import Container from "@/components/site/Container";
import ComponentCard from "@/components/site/ComponentCard";
import { components } from "@/lib/registry";

const getBorderClasses = (index: number) => {
  const topBorder = [
    index > 0 ? "border-t" : "",
    index < 2 ? "sm:border-t-0" : "sm:border-t",
    index < 3 ? "lg:border-t-0" : "lg:border-t",
  ].join(" ");

  const leftBorder = [
    index % 2 !== 0 ? "sm:border-l" : "sm:border-l-0",
    index % 3 !== 0 ? "lg:border-l" : "lg:border-l-0",
  ].join(" ");

  return `${topBorder} ${leftBorder} border-neutral-200 dark:border-neutral-800`;
};

export default function ComponentsPage() {
  const groupedComponents = useMemo(() => {
    const map: Record<string, typeof components> = {};
    components.forEach((c) => {
      if (!map[c.category]) map[c.category] = [];
      map[c.category].push(c);
    });
    return map;
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-white pb-16 text-neutral-900 transition-colors dark:bg-[#0a0a0a] dark:text-white">
      <BackgroundGrid />
      <Navbar />
      <AnnouncementBanner />

      <main className="relative z-10">
        <Container className="py-10 md:py-16">
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl font-semibold tracking-tight text-neutral-950 sm:text-5xl md:text-6xl dark:text-white">
              Components
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-neutral-600 sm:text-xl md:text-2xl dark:text-neutral-400">
              Explore our collection of production-grade React &amp; Tailwind
              CSS components.
            </p>
          </div>

          <div className="mt-12 flex flex-col gap-12">
            {Object.keys(groupedComponents).length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                  No components in the registry yet.
                </p>
              </div>
            ) : (
              Object.entries(groupedComponents).map(
                ([categoryName, itemGroup]) => (
                  <section key={categoryName} className="flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                      <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
                        {categoryName}
                      </h2>
                      <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 font-mono text-xs font-semibold text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400">
                        {itemGroup.length}
                      </span>
                    </div>

                    <div className="relative z-10 -mx-4 grid grid-cols-1 border border-neutral-200 bg-neutral-50/10 sm:-mx-6 sm:grid-cols-2 lg:grid-cols-3 dark:border-neutral-800 dark:bg-neutral-900/5">
                      {/* Corner & Divider Anchors Overlay */}
                      <div
                        className="pointer-events-none absolute inset-0 z-20 select-none"
                        aria-hidden="true"
                      >
                        {/* Corners */}
                        <div className="absolute -top-[7px] -left-[7px] h-3.5 w-3.5 rounded-[3px] border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-[#0a0a0a]" />
                        <div className="absolute -top-[7px] -right-[7px] h-3.5 w-3.5 rounded-[3px] border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-[#0a0a0a]" />
                        <div className="absolute -bottom-[7px] -left-[7px] h-3.5 w-3.5 rounded-[3px] border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-[#0a0a0a]" />
                        <div className="absolute -right-[7px] -bottom-[7px] h-3.5 w-3.5 rounded-[3px] border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-[#0a0a0a]" />

                        {/* sm Breakpoint: 2 columns divider (at 1/2 width) */}
                        <div className="absolute -top-[7px] left-1/2 hidden h-3.5 w-3.5 -translate-x-1/2 rounded-[3px] border border-neutral-200 bg-white sm:block lg:hidden dark:border-neutral-800 dark:bg-[#0a0a0a]" />
                        <div className="absolute -bottom-[7px] left-1/2 hidden h-3.5 w-3.5 -translate-x-1/2 rounded-[3px] border border-neutral-200 bg-white sm:block lg:hidden dark:border-neutral-800 dark:bg-[#0a0a0a]" />

                        {/* lg Breakpoint: 3 columns dividers (at 1/3 and 2/3 width) */}
                        <div className="absolute -top-[7px] left-1/3 hidden h-3.5 w-3.5 -translate-x-1/2 rounded-[3px] border border-neutral-200 bg-white lg:block dark:border-neutral-800 dark:bg-[#0a0a0a]" />
                        <div className="absolute -top-[7px] left-2/3 hidden h-3.5 w-3.5 -translate-x-1/2 rounded-[3px] border border-neutral-200 bg-white lg:block dark:border-neutral-800 dark:bg-[#0a0a0a]" />
                        <div className="absolute -bottom-[7px] left-1/3 hidden h-3.5 w-3.5 -translate-x-1/2 rounded-[3px] border border-neutral-200 bg-white lg:block dark:border-neutral-800 dark:bg-[#0a0a0a]" />
                        <div className="absolute -bottom-[7px] left-2/3 hidden h-3.5 w-3.5 -translate-x-1/2 rounded-[3px] border border-neutral-200 bg-white lg:block dark:border-neutral-800 dark:bg-[#0a0a0a]" />
                      </div>

                      {itemGroup.map((c, index) => (
                        <Link
                          href={`/components/${c.slug}`}
                          key={c.slug}
                          className={`group block cursor-pointer overflow-hidden no-underline transition-colors duration-400 ease-out hover:bg-neutral-100/50 dark:hover:bg-[#141414]/60 ${getBorderClasses(index)}`}
                          onClick={() =>
                            posthog.capture("component_card_clicked", {
                              component_slug: c.slug,
                              component_name: c.name,
                              component_category: c.category,
                            })
                          }
                        >
                          <ComponentCard component={c} />
                        </Link>
                      ))}
                    </div>
                  </section>
                ),
              )
            )}
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
