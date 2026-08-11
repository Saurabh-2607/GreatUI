"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import posthog from "posthog-js";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "./ThemeProvider";
import { getSearchIndex, type SearchEntry } from "@/lib/search";

export function SearchCommand() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const { toggleTheme } = useTheme();
  const [copied, setCopied] = useState(false);

  const systemActions = useMemo(
    () => [
      {
        id: "action-theme",
        title: "Toggle Theme",
        description: "Switch between light and dark mode",
        category: "System Actions",
        keywords: ["toggle", "theme", "dark", "light", "mode", "color"],
        icon: (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="size-4 -rotate-45"
          >
            <path
              d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M5 20L19 5"
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth="2"
            />
            <path
              d="M16 9L22 13.8528M12.4128 12.4059L19.3601 18.3634M8 15.6672L15 21.5"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        ),
        onAction: () => {
          toggleTheme();
        },
      },
      {
        id: "action-copy-url",
        title: "Copy Share Link",
        description: copied
          ? "Link copied to clipboard!"
          : "Copy Great UI website link to clipboard",
        category: "System Actions",
        keywords: ["copy", "url", "share", "link", "clipboard"],
        icon: (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        ),
        onAction: () => {
          navigator.clipboard.writeText(window.location.origin);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        },
      },
      {
        id: "action-github",
        title: "Open GitHub Repository",
        description: "Star the project or report bugs on GitHub",
        category: "System Actions",
        keywords: ["github", "repo", "source", "code", "bugs", "issues"],
        icon: (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-4"
          >
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.48C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"
              clipRule="evenodd"
            />
          </svg>
        ),
        onAction: () => {
          window.open("https://github.com/Saurabh-2607/GreatUI", "_blank");
        },
      },
    ],
    [toggleTheme, copied],
  );

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const searchItems = useMemo(() => getSearchIndex(), []);

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

  const combinedSearchItems = useMemo(() => {
    const actionEntries: SearchEntry[] = systemActions.map((action) => ({
      id: action.id,
      title: action.title,
      description: action.description,
      url: "",
      category: action.category,
      keywords: action.keywords,
    }));
    return [...searchItems, ...actionEntries];
  }, [searchItems, systemActions]);

  const groupedItems = useMemo(() => {
    const groups: Record<string, SearchEntry[]> = {};
    combinedSearchItems.forEach((item) => {
      const cat = item.category || "Other";
      if (!groups[cat]) {
        groups[cat] = [];
      }
      groups[cat].push(item);
    });
    return groups;
  }, [combinedSearchItems]);

  const handleSelect = (url: string, title: string, id: string) => {
    const action = systemActions.find((a) => a.id === id);
    if (action) {
      action.onAction();
      if (id !== "action-copy-url") {
        setOpen(false);
        setSearch("");
      }
      posthog.capture("search_action_selected", {
        action_title: title,
        action_id: id,
      });
      return;
    }

    router.push(url);
    setOpen(false);
    setSearch("");
    posthog.capture("search_item_selected", {
      item_title: title,
      item_url: url,
    });
  };

  const customFilter = (value: string, search: string) => {
    const searchNormalized = search.toLowerCase().trim();
    if (!searchNormalized) return 1;

    const valueNormalized = value.toLowerCase();

    if (valueNormalized.startsWith(searchNormalized)) {
      return 2;
    }

    if (valueNormalized.includes(searchNormalized)) {
      return 1;
    }

    const searchWords = searchNormalized.split(/\s+/);
    const matchesAll = searchWords.every((word) =>
      valueNormalized.includes(word),
    );
    if (matchesAll) {
      return 1;
    }

    return 0;
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-neutral-950/40 backdrop-blur-md dark:bg-black/60"
            onClick={() => setOpen(false)}
          />

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
            <div className="relative overflow-hidden rounded-t-3xl rounded-b-none bg-neutral-100/70 p-3 shadow-2xl sm:rounded-3xl sm:p-3.5 dark:bg-neutral-900">
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.12] dark:opacity-[0.08]"
                style={{
                  backgroundImage: `
                    repeating-linear-gradient(
                      -45deg,
                      #f6821f 0,
                      #f6821f 1px,
                      transparent 1px,
                      transparent 10px
                    )
                  `,
                }}
              />

              <Command
                className="relative z-10 flex h-full w-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-colors dark:bg-neutral-950"
                label="Global Search"
                filter={customFilter}
              >
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex w-full cursor-pointer justify-center pt-3.5 pb-2 focus:outline-hidden sm:hidden"
                  aria-label="Close drawer"
                >
                  <div className="hover:bg-neutral-350 h-1 w-10 rounded-full bg-neutral-200 transition-colors dark:bg-neutral-800 dark:hover:bg-neutral-700" />
                </button>

                <div className="relative flex items-center border-b border-[var(--color-border-100)] px-4 py-3.5">
                  <svg
                    className="mr-3 h-5 w-5 shrink-0 text-neutral-400 dark:text-neutral-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <Command.Input
                    autoFocus
                    value={search}
                    onValueChange={setSearch}
                    placeholder="Search components or pages..."
                    className="h-10 w-full border-none bg-transparent text-lg font-medium text-neutral-900 placeholder-neutral-400 outline-hidden dark:text-neutral-100 dark:placeholder-neutral-500"
                  />
                  <button
                    onClick={() => setOpen(false)}
                    className="ml-2 hidden rounded-md border border-[var(--color-border-100)] bg-neutral-50 px-1.5 py-0.5 text-[10px] font-semibold text-neutral-400 shadow-xs sm:block dark:bg-neutral-900 dark:text-neutral-500"
                  >
                    ESC
                  </button>
                </div>

                <Command.List className="h-[360px] scrollbar-none overflow-y-auto p-2">
                  <Command.Empty className="flex h-full items-center justify-center text-sm font-medium text-neutral-500 dark:text-neutral-400">
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
                          onSelect={() =>
                            handleSelect(item.url, item.title, item.id)
                          }
                          className="group flex cursor-default items-center gap-3.5 rounded-xl px-3 py-2.5 text-sm font-medium text-neutral-700 outline-hidden transition-all duration-155 select-none data-[selected=true]:bg-[#f6821f]/8 data-[selected=true]:text-neutral-900 dark:text-neutral-300 dark:data-[selected=true]:bg-[#f6821f]/10 dark:data-[selected=true]:text-neutral-100"
                        >
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[var(--color-border-100)] bg-neutral-50 text-neutral-500 transition-colors group-data-[selected=true]:border-neutral-300 group-data-[selected=true]:bg-white dark:bg-neutral-900/60 dark:group-data-[selected=true]:border-neutral-700 dark:group-data-[selected=true]:bg-neutral-950">
                            {item.category === "General Pages" ? (
                              item.id === "home" ? (
                                <svg
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="size-4"
                                >
                                  <path d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                </svg>
                              ) : item.id === "logo" ? (
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="size-4 text-[#f6821f]"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="size-4"
                                >
                                  <path d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                                </svg>
                              )
                            ) : item.category === "System Actions" ? (
                              systemActions.find((a) => a.id === item.id)?.icon
                            ) : (
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="size-4"
                              >
                                <path d="M12.378 1.602a.75.75 0 0 0-.756 0L3 6.632l9 5.25 9-5.25-8.622-5.03ZM21.75 7.93l-9 5.25v9l8.628-5.032a.75.75 0 0 0 .372-.65V7.93ZM11.25 22.18v-9l-9-5.25v8.138a.75.75 0 0 0 .372.65l8.628 5.032Z" />
                              </svg>
                            )}
                          </div>

                          <div className="flex flex-1 flex-col">
                            <span className="text-[17.5px] font-semibold text-neutral-900 transition-colors group-data-[selected=true]:text-[#f6821f] dark:text-neutral-100 dark:group-data-[selected=true]:text-[#f6821f]">
                              {item.title}
                            </span>
                            <span className="mt-0.5 line-clamp-1 text-[14.5px] font-normal text-neutral-500 dark:text-neutral-400">
                              {item.description}
                            </span>
                          </div>

                          <svg
                            className="h-4 w-4 shrink-0 text-neutral-400 opacity-0 transition-opacity group-data-[selected=true]:opacity-100 dark:text-neutral-500"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </Command.Item>
                      ))}
                    </Command.Group>
                  ))}
                </Command.List>

                <div className="hidden items-center gap-4 border-t border-[var(--color-border-100)] px-4 py-3.5 text-[13px] text-neutral-500 sm:flex dark:text-neutral-500">
                  <span className="flex items-center gap-1">
                    <kbd className="rounded-md border border-[var(--color-border-100)] bg-neutral-50 px-1 py-0.5 font-sans font-bold shadow-xs dark:bg-neutral-900">
                      ↑↓
                    </kbd>{" "}
                    to navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="rounded-md border border-[var(--color-border-100)] bg-neutral-50 px-1 py-0.5 font-sans font-bold shadow-xs dark:bg-neutral-900">
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
