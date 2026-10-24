"use client";

import React from "react";
import Link from "next/link";
import posthog from "posthog-js";
import { CATEGORY_ORDER, componentsByCategory } from "@/lib/categories";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeSlug: string;
}

export default function Sidebar({ activeSlug }: SidebarProps) {
  const activeRef = React.useRef<HTMLAnchorElement>(null);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (activeRef.current && scrollContainerRef.current) {
      activeRef.current.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [activeSlug]);

  const groupedCategories = React.useMemo(() => {
    return CATEGORY_ORDER.map((catName) => {
      const catComponents = componentsByCategory[catName] || [];
      return {
        name: catName,
        items: [...catComponents].reverse(),
      };
    }).filter((group) => group.items.length > 0);
  }, []);

  return (
    <aside className="relative flex h-full w-full flex-col overflow-hidden bg-transparent text-neutral-900 select-none dark:text-white">
      <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 bottom-0 left-0 z-20 h-16 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-[#0a0a0a] dark:via-[#0a0a0a]/80 dark:to-transparent"
        />

        <div
          ref={scrollContainerRef}
          className="relative flex-1 scrollbar-none overflow-x-clip overflow-y-auto px-2 py-2"
        >
          <div className="relative flex h-fit flex-col pb-10">
            {groupedCategories.length === 0 ? (
              <div className="flex items-center justify-center p-4 text-center">
                <span className="text-xs text-neutral-400">No components</span>
              </div>
            ) : (
              groupedCategories.map((group) => (
                <div
                  key={group.name}
                  className="mt-6 flex flex-col gap-1 first:mt-1"
                >
                  <span className="px-2 py-1 text-[11px] font-semibold tracking-wider text-neutral-400 uppercase select-none dark:text-neutral-500">
                    {group.name}
                  </span>
                  <ul className="flex flex-col gap-0.5">
                    {group.items.map((c) => {
                      const active = c.slug === activeSlug;

                      return (
                        <li key={c.slug} className="relative">
                          {active ? (
                            <span className="pointer-events-none absolute inset-y-0 left-2 z-10 flex items-center">
                              <span className="h-3.5 w-1 rounded-full bg-[#f6821f]" />
                            </span>
                          ) : null}
                          <Link
                            ref={active ? activeRef : undefined}
                            href={`/components/${c.slug}`}
                            onClick={() => {
                              posthog.capture("sidebar_component_navigated", {
                                component_slug: c.slug,
                                component_name: c.name,
                                from_slug: activeSlug,
                              });
                            }}
                            className={cn(
                              "flex h-8 items-center rounded-lg px-2 text-sm transition-colors",
                              active
                                ? "bg-neutral-100 font-medium text-neutral-950 dark:bg-neutral-900/90 dark:text-white"
                                : "text-neutral-600 hover:bg-neutral-100/70 hover:text-neutral-950 dark:text-neutral-400 dark:hover:bg-neutral-900/60 dark:hover:text-white",
                            )}
                          >
                            <span
                              className={cn(
                                "min-w-0 truncate transition-transform duration-200",
                                active && "translate-x-3.5",
                              )}
                            >
                              {c.name}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
