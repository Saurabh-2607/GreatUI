"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import posthog from "posthog-js";
import { motion, AnimatePresence } from "motion/react";
import { getSearchIndex, type SearchEntry } from "@/lib/search";

export function SearchCommand() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Load search index
  const searchItems = useMemo(() => getSearchIndex(), []);

  // Set up keyboard shortcuts and event listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };

    const handleOpenEvent = () => {
      setOpen(true);
    };

    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-search-menu", handleOpenEvent);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-search-menu", handleOpenEvent);
    };
  }, []);

  // Group search items by category
  const groupedItems = useMemo(() => {
    const groups: Record<string, SearchEntry[]> = {};
    searchItems.forEach((item) => {
      const cat = item.category || "Other";
      if (!groups[cat]) {
        groups[cat] = [];
      }
      groups[cat].push(item);
    });
    return groups;
  }, [searchItems]);

  const handleSelect = (url: string, title: string) => {
    router.push(url);
    setOpen(false);
    setSearch("");
    posthog.capture("search_item_selected", {
      item_title: title,
      item_url: url,
    });
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-neutral-950/40 backdrop-blur-md dark:bg-black/60"
            onClick={() => setOpen(false)}
          />

          {/* Main command palette dialog */}
          <motion.div
            initial={
              isMobile
                ? { y: "100%", opacity: 0 }
                : { y: -20, opacity: 0, scale: 0.95 }
            }
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={
              isMobile
                ? { y: "100%", opacity: 0 }
                : { y: -20, opacity: 0, scale: 0.95 }
            }
            transition={
              isMobile
                ? { type: "spring", damping: 25, stiffness: 220 }
                : { duration: 0.15, ease: "easeOut" }
            }
            className="relative z-10 w-full px-0 sm:max-w-2xl sm:px-4"
          >
            <div className="relative">
              {/* Corner Anchors Overlay */}
              <div
                className="pointer-events-none absolute inset-0 z-20 hidden select-none sm:block"
                aria-hidden="true"
              >
                <div className="absolute -top-[7px] -left-[7px] h-3.5 w-3.5 rounded-[3px] border border-neutral-200 bg-white dark:border-neutral-800/80 dark:bg-[#0a0a0a]" />
                <div className="absolute -top-[7px] -right-[7px] h-3.5 w-3.5 rounded-[3px] border border-neutral-200 bg-white dark:border-neutral-800/80 dark:bg-[#0a0a0a]" />
                <div className="absolute -bottom-[7px] -left-[7px] h-3.5 w-3.5 rounded-[3px] border border-neutral-200 bg-white dark:border-neutral-800/80 dark:bg-[#0a0a0a]" />
                <div className="absolute -right-[7px] -bottom-[7px] h-3.5 w-3.5 rounded-[3px] border border-neutral-200 bg-white dark:border-neutral-800/80 dark:bg-[#0a0a0a]" />
              </div>

              <Command
                className="flex h-full w-full flex-col overflow-hidden rounded-t-2xl rounded-b-none border-x border-t border-neutral-200 bg-white shadow-2xl transition-colors sm:rounded-xl sm:border dark:border-neutral-800/80 dark:bg-[#0a0a0a]"
                label="Global Search"
              >
                {/* Mobile Drawer Handle / Close Trigger */}
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex w-full cursor-pointer justify-center pt-3.5 pb-2 focus:outline-hidden sm:hidden"
                  aria-label="Close drawer"
                >
                  <div className="hover:bg-neutral-350 h-1 w-10 rounded-full bg-neutral-200 transition-colors dark:bg-neutral-800 dark:hover:bg-neutral-700" />
                </button>

                {/* Header Input area */}
                <div className="relative flex items-center border-b border-neutral-200 px-4 py-3.5 dark:border-neutral-800/80">
                  <svg
                    className="mr-3 h-5 w-5 shrink-0 text-neutral-400 dark:text-neutral-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <Command.Input
                    autoFocus
                    value={search}
                    onValueChange={setSearch}
                    placeholder="Search components or pages..."
                    className="h-10 w-full border-none bg-transparent text-lg font-medium text-neutral-900 placeholder-neutral-400 outline-hidden dark:text-neutral-100 dark:placeholder-neutral-500"
                  />
                  {/* ESC Badge */}
                  <button
                    onClick={() => setOpen(false)}
                    className="ml-2 hidden rounded-md border border-neutral-200 bg-neutral-50 px-1.5 py-0.5 text-[10px] font-semibold text-neutral-400 shadow-xs sm:block dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-500"
                  >
                    ESC
                  </button>
                </div>

                {/* List items */}
                <Command.List className="max-h-[360px] scrollbar-none overflow-y-auto p-2">
                  <Command.Empty className="py-12 text-center text-sm font-medium text-neutral-500 dark:text-neutral-400">
                    No results found for &ldquo;{search}&rdquo;.
                  </Command.Empty>

                  {Object.entries(groupedItems).map(([category, items]) => (
                    <Command.Group
                      key={category}
                      heading={category}
                      className="[&_[cmdk-group-heading]]:text-neutral-450 overflow-hidden text-neutral-500 dark:text-neutral-400 [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-[13px] [&_[cmdk-group-heading]]:font-bold [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:uppercase dark:[&_[cmdk-group-heading]]:text-neutral-500"
                    >
                      {items.map((item) => (
                        <Command.Item
                          key={item.id}
                          value={`${item.title} ${item.description} ${item.keywords.join(" ")}`.toLowerCase()}
                          onSelect={() => handleSelect(item.url, item.title)}
                          className="group flex cursor-default items-center gap-3.5 rounded-xl px-3 py-2.5 text-sm font-medium text-neutral-700 outline-hidden transition-all duration-150 select-none data-[selected=true]:bg-neutral-100 data-[selected=true]:text-neutral-900 dark:text-neutral-300 dark:data-[selected=true]:bg-neutral-900 dark:data-[selected=true]:text-neutral-100"
                        >
                          {/* Item Icon */}
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-neutral-200/60 bg-neutral-50 text-neutral-500 transition-colors group-data-[selected=true]:border-neutral-300 group-data-[selected=true]:bg-white dark:border-neutral-800/60 dark:bg-neutral-900/60 dark:group-data-[selected=true]:border-neutral-700 dark:group-data-[selected=true]:bg-neutral-950">
                            {item.category === "General Pages" ? (
                              item.id === "home" ? (
                                <svg
                                  className="h-4 w-4"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                  />
                                </svg>
                              ) : item.id === "logo" ? (
                                <svg
                                  className="h-4 w-4 text-[#f6821f]"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  className="h-4 w-4"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                  />
                                </svg>
                              )
                            ) : (
                              <svg
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                />
                              </svg>
                            )}
                          </div>

                          {/* Title and Description */}
                          <div className="flex flex-1 flex-col">
                            <span className="text-[17.5px] font-semibold text-neutral-900 transition-colors group-data-[selected=true]:text-[#f6821f] dark:text-neutral-100 dark:group-data-[selected=true]:text-[#f6821f]">
                              {item.title}
                            </span>
                            <span className="mt-0.5 line-clamp-1 text-[14.5px] font-normal text-neutral-500 dark:text-neutral-400">
                              {item.description}
                            </span>
                          </div>

                          {/* Arrow indicator */}
                          <svg
                            className="h-4 w-4 shrink-0 text-neutral-400 opacity-0 transition-opacity group-data-[selected=true]:opacity-100 dark:text-neutral-500"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </Command.Item>
                      ))}
                    </Command.Group>
                  ))}
                </Command.List>

                {/* Footer Navigation Hints */}
                <div className="hidden items-center gap-4 border-t border-neutral-200/80 px-4 py-3.5 text-[13px] text-neutral-500 sm:flex dark:border-neutral-800/80 dark:text-neutral-500">
                  <span className="flex items-center gap-1">
                    <kbd className="rounded-md border border-neutral-200 bg-neutral-50 px-1 py-0.5 font-sans font-bold shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
                      ↑↓
                    </kbd>{" "}
                    to navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="rounded-md border border-neutral-200 bg-neutral-50 px-1 py-0.5 font-sans font-bold shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
                      ↵
                    </kbd>{" "}
                    to select
                  </span>
                </div>
              </Command>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default SearchCommand;
