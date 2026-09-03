"use client";

import React from "react";
import Link from "next/link";
import posthog from "posthog-js";
import { components } from "@/lib/registry";
import { animate } from "motion/react";

interface SidebarProps {
  activeSlug: string;
}

const TickRow = () => (
  <div className="flex h-2.5 items-center">
    <span className="block h-[2px] w-8 shrink-0 bg-neutral-300 dark:bg-neutral-700" />
  </div>
);

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

const componentsByCategory = components.reduce(
  (acc, c) => {
    if (!acc[c.category]) acc[c.category] = [];
    acc[c.category].push(c);
    return acc;
  },
  {} as Record<string, typeof components>,
);

const orderedComponents: typeof components = [];
const categoryHeaders: { index: number; name: string }[] = [];

CATEGORY_ORDER.forEach((catName) => {
  const catComponents = componentsByCategory[catName] || [];
  if (catComponents.length > 0) {
    categoryHeaders.push({ index: orderedComponents.length, name: catName });
    orderedComponents.push(...[...catComponents].reverse());
  }
});

export default function Sidebar({ activeSlug }: SidebarProps) {
  const activeRef = React.useRef<HTMLAnchorElement>(null);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [paddings, setPaddings] = React.useState({ top: 200, bottom: 200 });

  React.useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const containerHeight = container.clientHeight;
      setPaddings({
        top: Math.max(0, containerHeight * 0.35 - 20),
        bottom: Math.max(0, containerHeight * 0.35 - 20),
      });
    }
  }, []);

  React.useEffect(() => {
    let animationControls: { stop: () => void } | null = null;
    const timer = setTimeout(() => {
      const container = scrollContainerRef.current;
      const element = activeRef.current;
      if (container && element) {
        const containerHeight = container.clientHeight;
        const elementTop = element.offsetTop;
        const elementHeight = element.clientHeight;

        const activeIndex = orderedComponents.findIndex(
          (c) => c.slug === activeSlug,
        );
        const N = orderedComponents.length;
        const ratio = N > 1 ? 0.35 + 0.3 * (activeIndex / (N - 1)) : 0.35;

        const targetScrollTop =
          elementTop + elementHeight / 2 - containerHeight * ratio;

        animationControls = animate(container.scrollTop, targetScrollTop, {
          type: "spring",
          stiffness: 80,
          damping: 18,
          onUpdate: (latest) => {
            container.scrollTop = latest;
          },
        });
      }
    }, 100);
    return () => {
      clearTimeout(timer);
      if (animationControls) {
        animationControls.stop();
      }
    };
  }, [activeSlug]);

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

      <div
        ref={scrollContainerRef}
        className="relative flex-1 scrollbar-none overflow-x-clip overflow-y-auto pr-2 pl-1 tracking-tight"
      >
        <div
          style={{
            paddingTop: `${paddings.top}px`,
            paddingBottom: `${paddings.bottom}px`,
          }}
          className="relative flex h-fit flex-col"
        >
          {orderedComponents.length === 0 ? (
            <div className="flex items-center justify-center p-4 text-center">
              <span className="text-xs text-neutral-400">No components</span>
            </div>
          ) : (
            orderedComponents.map((c, index) => {
              const active = c.slug === activeSlug;
              const itemNumber = (index + 1).toString().padStart(2, "0");

              const headerInfo = categoryHeaders.find((h) => h.index === index);
              const isFirstInCategory = !!headerInfo;

              return (
                <React.Fragment key={c.slug}>
                  {isFirstInCategory && (
                    <div className="mt-6 mb-2 first:mt-0">
                      <span className="text-xl font-bold text-neutral-400/80 dark:text-neutral-500/80">
                        {headerInfo.name}
                      </span>
                    </div>
                  )}
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
                    className="group relative flex cursor-pointer flex-col transition-colors"
                  >
                    {!isFirstInCategory && <TickRow />}
                    <div className="flex h-4 items-center gap-2">
                      <span
                        className={`block shrink-0 transition-all ${
                          active
                            ? "h-[3px] w-14 bg-[#f6821f]"
                            : "h-[2px] w-8 bg-neutral-300 group-hover:w-11 group-hover:bg-[#f6821f] dark:bg-neutral-700"
                        }`}
                      />
                      <span
                        className={`text-[19px] leading-none whitespace-nowrap transition-all ease-out ${
                          active
                            ? "font-semibold text-[#f6821f] opacity-100 dark:text-[#ff9d42]"
                            : "font-medium text-neutral-700 opacity-50 group-hover:text-[#f6821f] group-hover:opacity-100 dark:text-neutral-300 dark:group-hover:text-[#f6821f]"
                        }`}
                      >
                        {itemNumber} {c.name}
                      </span>
                    </div>
                  </Link>
                </React.Fragment>
              );
            })
          )}
        </div>
      </div>
    </aside>
  );
}
