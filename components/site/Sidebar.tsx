"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import posthog from "posthog-js";
import { motion } from "motion/react";
import { CATEGORY_ORDER, componentsByCategory } from "@/lib/categories";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeSlug: string;
}

function GridIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="7" height="7" x="3" y="3" rx="1.5" />
      <rect width="7" height="7" x="14" y="3" rx="1.5" />
      <rect width="7" height="7" x="14" y="14" rx="1.5" />
      <rect width="7" height="7" x="3" y="14" rx="1.5" />
    </svg>
  );
}

function HeartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function ChangelogIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function NewBadge() {
  return (
    <div className="flex shrink-0 items-center gap-0.5 text-[#f6821f]">
      <span className="text-[12px] font-semibold tracking-tight">New</span>
      <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5">
        <motion.path
          d="M5.2168 11.2812L8.3418 8.15625L11.4668 11.2812"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{
            repeat: Infinity,
            duration: 1.2,
            ease: "easeInOut",
            times: [0, 0.5, 1],
          }}
        />
        <motion.path
          d="M5.2168 6.90625L8.3418 3.78125L11.4668 6.90625"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{
            repeat: Infinity,
            duration: 1.2,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            delay: 0.25,
          }}
        />
      </svg>
    </div>
  );
}

export default function Sidebar({ activeSlug }: SidebarProps) {
  const pathname = usePathname();
  const isAllComponentsActive = pathname === "/components";
  const isSponsorsActive = pathname === "/sponsors";
  const isChangelogActive = pathname === "/changelog";

  const activeRef = React.useRef<HTMLAnchorElement>(null);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const hasScrolledOnLoadRef = React.useRef(false);

  React.useEffect(() => {
    if (hasScrolledOnLoadRef.current) return;

    const centerActiveItem = () => {
      const container = scrollContainerRef.current;
      const activeEl = activeRef.current;
      if (!container || !activeEl) return false;

      const containerRect = container.getBoundingClientRect();
      const linkRect = activeEl.getBoundingClientRect();
      if (containerRect.height === 0 || linkRect.height === 0) return false;

      const offset = linkRect.top - containerRect.top + container.scrollTop;
      const targetScrollTop =
        offset - container.clientHeight / 2 + linkRect.height / 2;
      container.scrollTop = Math.max(0, targetScrollTop);
      return true;
    };

    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      if (centerActiveItem() || attempts > 12) {
        clearInterval(interval);
        hasScrolledOnLoadRef.current = true;
      }
    }, 40);

    return () => clearInterval(interval);
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
          ref={scrollContainerRef}
          className="relative flex-1 scrollbar-none overflow-x-clip overflow-y-auto px-2 py-2"
        >
          <div className="relative flex h-fit flex-col pb-2">
            <div className="mb-2 flex flex-col gap-1 border-b border-neutral-200/60 pb-3 dark:border-neutral-800/60">
              <ul className="flex flex-col gap-0.5">
                <li className="relative">
                  {isAllComponentsActive ? (
                    <span className="pointer-events-none absolute inset-y-0 left-2 z-10 flex items-center">
                      <span className="h-3.5 w-1 rounded-full bg-[#f6821f]" />
                    </span>
                  ) : null}
                  <Link
                    ref={isAllComponentsActive ? activeRef : undefined}
                    href="/components"
                    onClick={() => {
                      posthog.capture("sidebar_all_components_navigated");
                    }}
                    className={cn(
                      "group flex h-8 items-center rounded-lg px-2 text-sm transition-colors",
                      isAllComponentsActive
                        ? "bg-neutral-100 font-medium text-neutral-950 dark:bg-neutral-900/90 dark:text-white"
                        : "text-neutral-600 hover:bg-neutral-100/70 hover:text-neutral-950 dark:text-neutral-400 dark:hover:bg-neutral-900/60 dark:hover:text-white",
                    )}
                  >
                    <span
                      className={cn(
                        "flex min-w-0 items-center gap-2 truncate transition-transform duration-200",
                        isAllComponentsActive && "translate-x-3.5",
                      )}
                    >
                      <GridIcon
                        className={cn(
                          "h-3.5 w-3.5 shrink-0 transition-colors",
                          isAllComponentsActive
                            ? "text-[#f6821f]"
                            : "text-neutral-400 group-hover:text-neutral-900 dark:text-neutral-500 dark:group-hover:text-white",
                        )}
                      />
                      <span>All Components</span>
                    </span>
                  </Link>
                </li>
                <li className="relative">
                  {isChangelogActive ? (
                    <span className="pointer-events-none absolute inset-y-0 left-2 z-10 flex items-center">
                      <span className="h-3.5 w-1 rounded-full bg-[#f6821f]" />
                    </span>
                  ) : null}
                  <Link
                    ref={isChangelogActive ? activeRef : undefined}
                    href="/changelog"
                    onClick={() => {
                      posthog.capture("sidebar_changelog_navigated");
                    }}
                    className={cn(
                      "group flex h-8 items-center rounded-lg px-2 text-sm transition-colors",
                      isChangelogActive
                        ? "bg-neutral-100 font-medium text-neutral-950 dark:bg-neutral-900/90 dark:text-white"
                        : "text-neutral-600 hover:bg-neutral-100/70 hover:text-neutral-950 dark:text-neutral-400 dark:hover:bg-neutral-900/60 dark:hover:text-white",
                    )}
                  >
                    <span
                      className={cn(
                        "flex min-w-0 items-center gap-2 truncate transition-transform duration-200",
                        isChangelogActive && "translate-x-3.5",
                      )}
                    >
                      <ChangelogIcon
                        className={cn(
                          "h-3.5 w-3.5 shrink-0 transition-colors",
                          isChangelogActive
                            ? "text-[#f6821f]"
                            : "text-neutral-400 group-hover:text-neutral-900 dark:text-neutral-500 dark:group-hover:text-white",
                        )}
                      />
                      <span>Changelog</span>
                    </span>
                  </Link>
                </li>
                <li className="relative">
                  {isSponsorsActive ? (
                    <span className="pointer-events-none absolute inset-y-0 left-2 z-10 flex items-center">
                      <span className="h-3.5 w-1 rounded-full bg-[#f6821f]" />
                    </span>
                  ) : null}
                  <Link
                    ref={isSponsorsActive ? activeRef : undefined}
                    href="/sponsors"
                    onClick={() => {
                      posthog.capture("sidebar_sponsors_navigated");
                    }}
                    className={cn(
                      "group flex h-8 items-center rounded-lg px-2 text-sm transition-colors",
                      isSponsorsActive
                        ? "bg-neutral-100 font-medium text-neutral-950 dark:bg-neutral-900/90 dark:text-white"
                        : "text-neutral-600 hover:bg-neutral-100/70 hover:text-neutral-950 dark:text-neutral-400 dark:hover:bg-neutral-900/60 dark:hover:text-white",
                    )}
                  >
                    <span
                      className={cn(
                        "flex min-w-0 items-center gap-2 truncate transition-transform duration-200",
                        isSponsorsActive && "translate-x-3.5",
                      )}
                    >
                      <HeartIcon
                        className={cn(
                          "h-3.5 w-3.5 shrink-0 transition-colors",
                          isSponsorsActive
                            ? "fill-pink-500 text-pink-500"
                            : "text-neutral-400 group-hover:text-pink-500 dark:text-neutral-500 dark:group-hover:text-pink-400",
                        )}
                      />
                      <span>Sponsors</span>
                    </span>
                  </Link>
                </li>
              </ul>
            </div>

            {groupedCategories.length === 0 ? (
              <div className="flex items-center justify-center p-4 text-center">
                <span className="text-xs text-neutral-400">No components</span>
              </div>
            ) : (
              groupedCategories.map((group) => (
                <div
                  key={group.name}
                  className="mt-5 flex flex-col gap-1 first:mt-1"
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
                              "flex h-8 items-center justify-between gap-2 rounded-lg px-2 text-sm transition-colors",
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
                            {c.isNew ? <NewBadge /> : null}
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
