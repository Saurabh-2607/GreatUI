"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import posthog from "posthog-js";
import Sidebar from "@/components/site/Sidebar";
import SidebarToggle from "@/components/site/SidebarToggle";
import DocsPanel from "@/components/site/DocsPanel";
import CodePanel from "@/components/site/CodePanel";
import ThemeToggle from "@/components/site/ThemeToggle";
import {
  CodeIcon,
  HomeIcon,
  MaximizeIcon,
  MinimizeIcon,
  CopyIcon,
  CheckIcon,
} from "@/components/site/Icons";
import { components } from "@/lib/registry";
import { ViewerProvider, useViewer } from "@/lib/viewer-context";
import { motion, AnimatePresence } from "motion/react";

type PkgManager = "npm" | "pnpm" | "yarn" | "bun";

function getInstallCommand(pm: PkgManager, url: string): string {
  switch (pm) {
    case "pnpm":
      return `pnpm dlx shadcn@latest add ${url}`;
    case "yarn":
      return `yarn dlx shadcn@latest add ${url}`;
    case "bun":
      return `bunx shadcn@latest add ${url}`;
    case "npm":
    default:
      return `npx shadcn@latest add ${url}`;
  }
}

function ViewerLayoutContent({ children }: { children: React.ReactNode }) {
  const {
    isSidebarOpen,
    setIsSidebarOpen,
    isPanelOpen,
    setIsPanelOpen,
    isCodeOpen,
    setIsCodeOpen,
    activeComponent,
  } = useViewer();

  const [isMounted, setIsMounted] = React.useState(false);
  const [pkgManager, setPkgManager] = React.useState<PkgManager>("pnpm");
  const [copiedInstall, setCopiedInstall] = React.useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  const params = useParams();
  const slug = params.slug as string;
  const clientComponent = components.find((c) => c.slug === slug);

  const component =
    activeComponent?.slug === slug ? activeComponent : clientComponent;

  const origin = isMounted ? window.location.origin : "https://great-ui.com";
  const registryUrl = component ? `${origin}/r/${component.slug}.json` : "";
  const installCommand = component
    ? getInstallCommand(pkgManager, registryUrl)
    : "";

  const handleCopyInstall = () => {
    if (!installCommand) return;
    navigator.clipboard.writeText(installCommand);
    setCopiedInstall(true);
    posthog.capture("component_install_command_copied", {
      component_slug: component?.slug,
      package_manager: pkgManager,
    });
    setTimeout(() => setCopiedInstall(false), 2000);
  };

  if (!isMounted) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-white dark:bg-[#0a0a0a]">
        <div className="text-sm text-neutral-400">Loading layout...</div>
      </div>
    );
  }

  if (!component) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-white dark:bg-[#0a0a0a]">
        <div className="text-sm text-neutral-400">Loading component...</div>
      </div>
    );
  }

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-white p-4 text-neutral-900 transition-colors dark:bg-[#0a0a0a] dark:text-white">
      <div
        className={`absolute top-9 left-9 z-[60] flex items-center gap-3.5 transition-opacity duration-300 ${isCodeOpen ? "pointer-events-none opacity-0" : "opacity-100"}`}
      >
        <SidebarToggle
          isOpen={isSidebarOpen}
          onToggle={() => {
            const next = !isSidebarOpen;
            setIsSidebarOpen(next);
            posthog.capture("sidebar_toggled", {
              state: next ? "open" : "closed",
              component_slug: component.slug,
            });
          }}
        />

        <div className="flex items-center gap-2.5 text-xl font-normal tracking-tight text-neutral-500 select-none dark:text-neutral-400">
          <Link
            href="/components"
            className="cursor-pointer transition-colors hover:text-neutral-900 dark:hover:text-white"
          >
            Components
          </Link>
          <svg
            className="h-4.5 w-4.5 text-neutral-400 dark:text-neutral-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
          <span className="text-neutral-955 font-semibold dark:text-white">
            {component.name}
          </span>
        </div>
      </div>
      <div className="absolute top-9 right-9 z-40 flex items-center gap-1.5 rounded-2xl border border-neutral-200 bg-white/80 p-1.5 shadow-xs backdrop-blur-xl transition-all dark:border-neutral-800/60 dark:bg-neutral-950/80">
        <Link
          href="/"
          title="Back to Home"
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-neutral-100 text-neutral-700 shadow-xs transition-all hover:bg-neutral-200 hover:text-neutral-950 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white"
          aria-label="Navigate to Home"
        >
          <HomeIcon className="h-5 w-5" />
        </Link>

        <button
          type="button"
          onClick={() => {
            window.dispatchEvent(new CustomEvent("open-search-menu"));
            posthog.capture("search_trigger_clicked", {
              location: "viewer-toolbar",
              component_slug: component.slug,
            });
          }}
          title="Search pages or components (⌘K)"
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-neutral-100 text-neutral-700 shadow-xs transition-all hover:bg-neutral-200 hover:text-neutral-950 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white"
          aria-label="Search pages or components"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>

        <button
          type="button"
          onClick={() => {
            if (isPanelOpen) {
              if (isCodeOpen) {
                setIsCodeOpen(false);
                posthog.capture("docs_panel_toggled", {
                  state: "open",
                  component_slug: component.slug,
                });
              } else {
                setIsPanelOpen(false);
                posthog.capture("docs_panel_toggled", {
                  state: "closed",
                  component_slug: component.slug,
                });
              }
            } else {
              setIsPanelOpen(true);
              setIsCodeOpen(false);
              posthog.capture("docs_panel_toggled", {
                state: "open",
                component_slug: component.slug,
              });
            }
          }}
          title={isPanelOpen ? "Hide docs" : "Show docs"}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-neutral-100 text-neutral-700 shadow-xs transition-all hover:bg-neutral-200 hover:text-neutral-950 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white"
          aria-label="Toggle docs panel"
        >
          {isPanelOpen ? (
            <MaximizeIcon className="h-5 w-5" />
          ) : (
            <MinimizeIcon className="h-5 w-5" />
          )}
        </button>

        <button
          type="button"
          onClick={() => {
            if (isPanelOpen) {
              if (isCodeOpen) {
                setIsCodeOpen(false);
                posthog.capture("code_panel_toggled", {
                  state: "closed",
                  component_slug: component.slug,
                });
              } else {
                setIsCodeOpen(true);
                setIsSidebarOpen(false);
                posthog.capture("code_panel_toggled", {
                  state: "open",
                  component_slug: component.slug,
                });
              }
            } else {
              setIsPanelOpen(true);
              setIsCodeOpen(true);
              setIsSidebarOpen(false);
              posthog.capture("code_panel_toggled", {
                state: "open",
                component_slug: component.slug,
              });
            }
          }}
          title={isPanelOpen && isCodeOpen ? "Hide code" : "Show code"}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-neutral-100 text-neutral-700 shadow-xs transition-all hover:bg-neutral-200 hover:text-neutral-950 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white"
          aria-label="Toggle code panel"
        >
          <CodeIcon className="h-5 w-5" />
        </button>

        <ThemeToggle className="dark:!hover:text-white !h-10 !w-10 !rounded-xl !border-0 !bg-neutral-100 !text-neutral-700 shadow-xs hover:!bg-neutral-200 hover:!text-neutral-950 dark:!border-0 dark:!bg-neutral-900 dark:!text-neutral-300 dark:hover:!bg-neutral-800 [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-neutral-700 dark:[&>svg]:text-neutral-300" />
      </div>
      <div
        className={`absolute inset-0 z-50 flex p-4 transition-all duration-300 ${
          isSidebarOpen
            ? "pointer-events-auto visible"
            : "pointer-events-none invisible"
        }`}
      >
        <div
          aria-hidden="true"
          className={`fixed inset-0 bg-black/5 transition-opacity duration-300 dark:bg-black/20 ${
            isSidebarOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsSidebarOpen(false)}
        />
        <div
          className={`pointer-events-auto relative z-10 h-full w-64 overflow-hidden rounded-2xl bg-neutral-100 p-4 transition-all duration-300 ease-in-out sm:w-72 dark:bg-[#141414] ${
            isSidebarOpen
              ? "translate-x-0 opacity-100"
              : "-translate-x-[calc(100%+1.5rem)] opacity-0"
          }`}
        >
          <Sidebar activeSlug={component.slug} />
        </div>
      </div>
      <div
        className={`relative z-10 flex flex-1 overflow-hidden transition-all duration-300 ${
          isPanelOpen ? "gap-4" : "gap-0"
        }`}
      >
        <div
          className={`relative flex h-full shrink-0 flex-col transition-all duration-300 ${
            isPanelOpen
              ? "w-full lg:w-[40%]"
              : "pointer-events-none w-0 overflow-hidden opacity-0"
          }`}
        >
          <div className="relative h-full w-full overflow-hidden rounded-2xl backdrop-blur-md">
            <div className="h-full w-full scrollbar-none overflow-y-auto px-6 pt-[25vh] pb-[10vh]">
              <DocsPanel component={component} />
            </div>

            <div
              className={`absolute inset-0 z-30 flex flex-col justify-end transition-transform duration-500 ease-in-out ${
                isCodeOpen ? "translate-y-0" : "translate-y-full"
              }`}
            >
              <div className="h-full w-full overflow-hidden rounded-2xl shadow-xl">
                <CodePanel
                  component={component}
                  onClose={() => setIsCodeOpen(false)}
                />
              </div>
            </div>
          </div>
        </div>

        <section className="relative flex h-full flex-1 flex-col items-center justify-center overflow-hidden rounded-2xl bg-neutral-100 backdrop-blur-md dark:bg-[#141414]">
          <div className="relative flex h-full w-full flex-1 items-center justify-center overflow-hidden">
            <div className="pointer-events-auto relative z-10 flex h-full w-full items-center justify-center">
              {children}
            </div>
          </div>
        </section>
      </div>{" "}
      <AnimatePresence>
        {!isPanelOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-3 rounded-xl border border-neutral-200 bg-white/80 p-1.5 shadow-md backdrop-blur-xl transition-all dark:border-neutral-800/60 dark:bg-neutral-950/80"
          >
            <div
              ref={dropdownRef}
              className="relative border-r border-neutral-200/60 pr-2.5 dark:border-neutral-800/60"
            >
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="hover:text-neutral-955 flex h-7.5 cursor-pointer items-center justify-center gap-1 rounded-lg bg-neutral-100 px-2 font-mono text-xs font-semibold text-neutral-500 shadow-xs transition-all hover:bg-neutral-200 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
              >
                <span>{pkgManager}</span>
                <svg
                  className={`h-3 w-3 text-neutral-400 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute bottom-full left-0 z-50 mb-1.5 flex w-20 flex-col rounded-lg border border-neutral-200 bg-white/95 p-0.5 shadow-md backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/95"
                  >
                    {(["pnpm", "npm", "yarn", "bun"] as PkgManager[]).map(
                      (pm) => (
                        <button
                          key={pm}
                          type="button"
                          onClick={() => {
                            setPkgManager(pm);
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full cursor-pointer rounded-md px-1.5 py-1 text-left font-mono text-xs font-medium transition-colors ${
                            pkgManager === pm
                              ? "text-neutral-955 bg-neutral-100 dark:bg-neutral-900 dark:text-white"
                              : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-900/50 dark:hover:text-white"
                          }`}
                        >
                          {pm}
                        </button>
                      ),
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="text-neutral-850 pr-1 font-mono text-xs select-all dark:text-neutral-200">
              <code>{installCommand}</code>
            </div>

            <button
              type="button"
              onClick={handleCopyInstall}
              className="hover:text-neutral-955 flex h-7.5 w-7.5 cursor-pointer items-center justify-center rounded-lg bg-neutral-100 text-neutral-500 shadow-xs transition-all hover:bg-neutral-200 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
              title="Copy installation command"
            >
              {copiedInstall ? (
                <CheckIcon className="h-3.5 w-3.5 text-green-500" />
              ) : (
                <CopyIcon className="h-3.5 w-3.5" />
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ViewerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ViewerProvider>
      <ViewerLayoutContent>{children}</ViewerLayoutContent>
    </ViewerProvider>
  );
}
