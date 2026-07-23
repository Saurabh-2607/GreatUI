"use client";

import React from "react";
import Link from "next/link";
import posthog from "posthog-js";
import { components } from "@/lib/registry";

interface SidebarProps {
  activeSlug: string;
}

const TickRow = () => (
  <div className="flex h-2.5 items-center">
    <span className="block h-[2px] w-8 shrink-0 bg-neutral-300 dark:bg-neutral-700" />
  </div>
);

export default function Sidebar({ activeSlug }: SidebarProps) {
  return (
    <aside className="relative flex h-full w-full flex-col overflow-hidden bg-transparent text-neutral-900 select-none dark:text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 left-0 z-20 h-24 bg-gradient-to-b from-neutral-100 via-neutral-100/80 to-transparent dark:from-[#141414] dark:via-[#141414]/80 dark:to-transparent"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-0 left-0 z-20 h-28 bg-gradient-to-t from-neutral-100 via-neutral-100/80 to-transparent dark:from-[#141414] dark:via-[#141414]/80 dark:to-transparent"
      />

      <div className="relative flex-1 scrollbar-none overflow-x-clip overflow-y-auto pr-2 pl-1 tracking-tight">
        <div className="relative flex h-fit flex-col pt-[28vh] pb-[10vh]">
          {components.length === 0 ? (
            <div className="flex items-center justify-center p-4 text-center">
              <span className="text-xs text-neutral-400">No components</span>
            </div>
          ) : (
            components.map((c, index) => {
              const active = c.slug === activeSlug;
              const itemNumber = (index + 1).toString().padStart(2, "0");
              const isFirst = index === 0;
              const isLast = index === components.length - 1;

              return (
                <Link
                  key={c.slug}
                  href={`/components/${c.slug}`}
                  onClick={() => {
                    posthog.capture("sidebar_component_navigated", {
                      component_slug: c.slug,
                      component_name: c.name,
                      from_slug: activeSlug,
                    });
                  }}
                  className="group relative flex cursor-pointer flex-col transition-colors"
                >
                  {!isFirst && <TickRow />}
                  <div className="flex h-2.5 items-center gap-2">
                    <span
                      className={`block shrink-0 transition-all ${
                        active
                          ? "h-[3px] w-14 bg-[#f6821f]"
                          : "h-[2px] w-8 bg-neutral-300 group-hover:w-14 group-hover:bg-[#f6821f] dark:bg-neutral-700"
                      }`}
                    />
                    <span
                      className={`text-xl leading-none whitespace-nowrap transition-all ease-out ${
                        active
                          ? "font-semibold text-[#f6821f] opacity-100 dark:text-[#ff9d42]"
                          : "font-medium text-neutral-700 opacity-50 group-hover:text-[#f6821f] group-hover:opacity-100 dark:text-neutral-300 dark:group-hover:text-[#f6821f]"
                      }`}
                    >
                      {itemNumber} {c.name}
                    </span>
                  </div>
                  {!isLast && <TickRow />}
                </Link>
              );
            })
          )}
        </div>
      </div>
    </aside>
  );
}
