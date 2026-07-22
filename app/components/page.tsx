"use client";

import { useMemo } from "react";
import Link from "next/link";
import posthog from "posthog-js";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import BackgroundGrid from "@/components/site/BackgroundGrid";
import AnnouncementBanner from "@/components/site/AnnouncementBanner";
import Container from "@/components/site/Container";
import ComponentPreviewRenderer from "@/components/site/ComponentPreviewRenderer";
import { components } from "@/lib/registry";

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
            <h1 className="text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl md:text-5xl dark:text-white">
              Components
            </h1>
            <p className="mt-2 max-w-xl text-xs text-neutral-500 sm:text-sm dark:text-neutral-400">
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
                  <section key={categoryName} className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <h2 className="text-sm font-bold tracking-tight text-neutral-900 dark:text-white">
                        {categoryName}
                      </h2>
                      <span className="rounded-full bg-neutral-100 px-2 py-0.5 font-mono text-[10px] text-neutral-500 dark:bg-neutral-800/80 dark:text-neutral-400">
                        {itemGroup.length}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {itemGroup.map((c) => (
                        <Link
                          key={c.slug}
                          href={`/components/${c.slug}`}
                          className="group flex cursor-pointer flex-col gap-2 select-none"
                          onClick={() =>
                            posthog.capture("component_card_clicked", {
                              component_slug: c.slug,
                              component_name: c.name,
                              component_category: c.category,
                            })
                          }
                        >
                          <div className="relative flex h-44 w-full items-center justify-center overflow-hidden rounded-2xl border border-neutral-200 bg-[#0d0d0d] p-4 transition-all duration-200 group-hover:border-[#f6821f]/60 dark:border-neutral-800">
                            <div className="pointer-events-none relative z-10 flex w-full items-center justify-center">
                              <ComponentPreviewRenderer slug={c.slug} />
                            </div>
                          </div>

                          <div className="flex flex-col px-0.5">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-xs font-bold text-neutral-900 transition-colors group-hover:text-[#f6821f] dark:text-white">
                                {c.name}
                              </span>
                              <span className="font-mono text-[10px] text-neutral-400 dark:text-neutral-500">
                                /{c.slug}
                              </span>
                            </div>
                            <p className="mt-0.5 line-clamp-1 text-[11px] leading-snug text-neutral-500 dark:text-neutral-400">
                              {c.description}
                            </p>
                          </div>
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
