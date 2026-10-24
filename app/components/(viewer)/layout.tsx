"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import posthog from "posthog-js";
import Sidebar from "@/components/site/Sidebar";
import SidebarToggle from "@/components/site/SidebarToggle";
import DocsPanel from "@/components/site/DocsPanel";
import CodePanel from "@/components/site/CodePanel";
import MarkdownPanel from "@/components/site/MarkdownPanel";
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
import { getComponentPropsSchema } from "@/lib/propsRegistry";
import { ViewerProvider, useViewer } from "@/lib/viewer-context";
import { PropsProvider, useProps } from "@/lib/PropsContext";
import PropsCustomizationPanel from "@/components/site/PropsCustomizationPanel";
import { ProgressiveBlur } from "@/components/site/ProgressiveBlur";
import { motion, AnimatePresence } from "motion/react";
import { generateComponentLdJsonGraph } from "@/lib/i18n-seo";

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
    isMarkdownOpen,
    setIsMarkdownOpen,
    activeComponent,
    setPreviewContainer,
  } = useViewer();
  const { resetProps } = useProps();

  const isMounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
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
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsSidebarOpen]);

  const params = useParams();
  const slug = params.slug as string;
  const clientComponent = components.find((c) => c.slug === slug);

  const component =
    activeComponent?.slug === slug ? activeComponent : clientComponent;

  const propsSchema = component
    ? getComponentPropsSchema(component.slug)
    : null;
  const hasCustomizableProps = propsSchema
    ? propsSchema.schemas.length > 0
    : false;

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
      <div className="flex h-[100dvh] w-full items-center justify-center bg-white dark:bg-neutral-950">
        <div className="text-sm text-neutral-400">Loading layout...</div>
      </div>
    );
  }

  if (!component) {
    return (
      <div className="flex h-[100dvh] w-full items-center justify-center bg-white dark:bg-neutral-950">
        <div className="text-sm text-neutral-400">Loading component...</div>
      </div>
    );
  }

  return (
    <div className="relative flex h-[100dvh] w-full overflow-hidden bg-white text-neutral-900 transition-colors dark:bg-[#0a0a0a] dark:text-white">
      <div
        className={`fixed inset-0 z-50 flex p-4 transition-all duration-300 lg:hidden ${
          isSidebarOpen
            ? "pointer-events-auto visible"
            : "pointer-events-none invisible"
        }`}
      >
        <div
          role="presentation"
          aria-hidden="true"
          className={`fixed inset-0 bg-black/20 backdrop-blur-xs transition-opacity duration-300 dark:bg-black/50 ${
            isSidebarOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsSidebarOpen(false)}
        />
        <div
          className={`pointer-events-auto relative z-10 h-full w-72 overflow-hidden rounded-2xl bg-neutral-100 p-4 transition-all duration-300 ease-in-out sm:w-80 dark:bg-[#141414] ${
            isSidebarOpen
              ? "translate-x-0 opacity-100"
              : "-translate-x-[calc(100%+1.5rem)] opacity-0"
          }`}
        >
          <Sidebar activeSlug={component.slug} />
        </div>
      </div>

      <aside
        aria-label="Navigation sidebar"
        className={`relative hidden h-full shrink-0 overflow-hidden transition-[width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] lg:block ${
          isSidebarOpen ? "w-64 xl:w-72" : "w-0"
        }`}
      >
        <div
          inert={!isSidebarOpen}
          className="absolute inset-y-0 right-0 flex w-64 flex-col overflow-hidden border-r border-neutral-200/70 bg-white xl:w-72 dark:border-neutral-800/70 dark:bg-[#0a0a0a]"
        >
          <div className="flex shrink-0 items-center justify-between px-4 pt-4 pb-2">
            <Link
              href="/"
              className="flex items-center gap-2 transition-opacity hover:opacity-85"
            >
              <img
                src="/Great-UI.png"
                alt="Great UI"
                className="h-6 w-auto object-contain"
              />
              <span className="font-tt text-base font-bold tracking-tight text-neutral-900 uppercase dark:text-white">
                Great <span className="text-[#f6821f]">UI</span>
              </span>
            </Link>
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
              className="!h-8 !w-8 !rounded-lg border border-neutral-200/70 !bg-transparent shadow-none hover:!bg-neutral-100 dark:border-neutral-800/70 dark:hover:!bg-neutral-900"
            />
          </div>

          <div className="relative min-h-0 flex-1 overflow-hidden px-2">
            <Sidebar activeSlug={component.slug} />
          </div>
        </div>
      </aside>

      <div
        className={`relative flex h-full shrink-0 flex-col transition-all duration-300 ${
          isPanelOpen
            ? "w-full border-r border-neutral-200/70 lg:w-[380px] xl:w-[440px] dark:border-neutral-800/70"
            : "pointer-events-none w-0 overflow-hidden opacity-0"
        }`}
      >
        <div className="relative h-full w-full overflow-hidden backdrop-blur-md">
          <ProgressiveBlur
            position="top"
            height="140px"
            className="pointer-events-none z-20 bg-gradient-to-b from-white via-white/90 to-transparent dark:from-[#0a0a0a] dark:via-[#0a0a0a]/90 dark:to-transparent"
          />
          <div className="relative z-10 h-full w-full scrollbar-none overflow-y-auto px-6 pt-[25dvh] pb-[10dvh]">
            <DocsPanel component={component} />
          </div>

          <div
            className={`absolute inset-0 z-[99999] flex flex-col justify-end transition-transform duration-500 ease-in-out ${
              isCodeOpen ? "translate-y-0" : "translate-y-full"
            }`}
          >
            <div className="relative h-full w-full overflow-hidden shadow-xl">
              <CodePanel
                component={component}
                onClose={() => setIsCodeOpen(false)}
              />
            </div>
          </div>

          <div
            className={`absolute inset-0 z-[99999] flex flex-col justify-end transition-transform duration-500 ease-in-out ${
              isMarkdownOpen ? "translate-y-0" : "translate-y-full"
            }`}
          >
            <div className="relative h-full w-full overflow-hidden shadow-xl">
              <MarkdownPanel
                component={component}
                onClose={() => setIsMarkdownOpen(false)}
              />
            </div>
          </div>
        </div>
      </div>

      <section className="relative flex h-full min-w-0 flex-1 flex-col p-2 md:p-3">
        <div className="relative flex h-full w-full flex-1 items-center justify-center overflow-hidden rounded-[1.25rem] bg-neutral-100 backdrop-blur-md dark:bg-[#141414]">
          <AnimatePresence>
            {!isSidebarOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.18, delay: 0.15 }}
                className="absolute top-4 left-4 z-40"
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
                  className="shadow-sm backdrop-blur-md"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div
            className={`absolute top-4 right-4 z-40 flex items-center gap-1.5 rounded-2xl border border-neutral-200 bg-white/80 p-1.5 shadow-xs backdrop-blur-xl transition-all sm:top-5 sm:right-5 dark:border-neutral-800/60 dark:bg-neutral-950/80 ${
              isCodeOpen || isMarkdownOpen
                ? "pointer-events-none opacity-0 sm:pointer-events-auto sm:opacity-100"
                : "opacity-100"
            }`}
          >
            <Link
              href="/"
              title="Back to Home"
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl bg-neutral-100 text-neutral-700 shadow-xs transition-all hover:bg-neutral-200 hover:text-neutral-950 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white"
              aria-label="Navigate to Home"
            >
              <HomeIcon className="h-4.5 w-4.5" />
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
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl bg-neutral-100 text-neutral-700 shadow-xs transition-all hover:bg-neutral-200 hover:text-neutral-950 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white"
              aria-label="Search pages or components"
            >
              <svg
                className="h-4.5 w-4.5"
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
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl bg-neutral-100 text-neutral-700 shadow-xs transition-all hover:bg-neutral-200 hover:text-neutral-950 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white"
              aria-label="Toggle docs panel"
            >
              {isPanelOpen ? (
                <MaximizeIcon className="h-4.5 w-4.5" />
              ) : (
                <MinimizeIcon className="h-4.5 w-4.5" />
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
                    posthog.capture("code_panel_toggled", {
                      state: "open",
                      component_slug: component.slug,
                    });
                  }
                } else {
                  setIsPanelOpen(true);
                  setIsCodeOpen(true);
                  posthog.capture("code_panel_toggled", {
                    state: "open",
                    component_slug: component.slug,
                  });
                }
              }}
              title={isPanelOpen && isCodeOpen ? "Hide code" : "Show code"}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl bg-neutral-100 text-neutral-700 shadow-xs transition-all hover:bg-neutral-200 hover:text-neutral-950 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white"
              aria-label="Toggle code panel"
            >
              <CodeIcon className="h-4.5 w-4.5" />
            </button>

            <ThemeToggle className="dark:!hover:text-white !h-9 !w-9 !rounded-xl !border-0 !bg-neutral-100 !text-neutral-700 shadow-xs hover:!bg-neutral-200 hover:!text-neutral-950 dark:!border-0 dark:!bg-neutral-900 dark:!text-neutral-300 dark:hover:!bg-neutral-800 [&>svg]:h-4.5 [&>svg]:w-4.5 [&>svg]:text-neutral-700 dark:[&>svg]:text-neutral-300" />
          </div>

          <div className="relative flex h-full w-full flex-1 items-center justify-center overflow-hidden px-4">
            <div
              ref={setPreviewContainer}
              className="pointer-events-auto relative z-10 h-full w-full scrollbar-none overflow-y-auto"
            >
              {children}
            </div>
          </div>

          <AnimatePresence>
            {!isPanelOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="absolute bottom-6 left-1/2 z-40 hidden -translate-x-1/2 items-center gap-3 rounded-xl border border-neutral-200 bg-white/80 p-1.5 shadow-md backdrop-blur-xl transition-all sm:flex dark:border-neutral-800/60 dark:bg-neutral-950/80"
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

                <div className="text-neutral-850 pr-1 font-mono text-[13px] leading-6 select-all dark:text-neutral-200">
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
      </section>

      {hasCustomizableProps && (
        <aside
          aria-label="Props customizer"
          className="relative hidden h-full w-64 shrink-0 flex-col overflow-hidden border-l border-neutral-200/70 bg-white lg:flex xl:w-72 dark:border-neutral-800/70 dark:bg-[#0a0a0a]"
        >
          <div className="relative flex h-full w-full flex-col overflow-hidden">
            <div className="flex shrink-0 items-center justify-between px-4 pt-4 pb-2">
              <span className="font-tt text-base font-bold tracking-tight text-neutral-900 uppercase dark:text-white">
                Props <span className="text-[#f6821f]">Customizer</span>
              </span>
              <button
                type="button"
                onClick={resetProps}
                className="flex h-8 cursor-pointer items-center rounded-lg border border-neutral-200/70 bg-transparent px-2 font-mono text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:border-neutral-800/70 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-white"
                title="Reset props to default"
              >
                Reset
              </button>
            </div>

            <div className="relative min-h-0 flex-1 scrollbar-none overflow-y-auto px-4 py-2">
              <PropsCustomizationPanel component={component} />
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}

export default function ViewerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const slug = (params?.slug as string) || "";
  const component = components.find((c) => c.slug === slug);

  return (
    <ViewerProvider>
      <PropsProvider slug={slug}>
        {component && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(
                generateComponentLdJsonGraph(
                  component.slug,
                  component.name,
                  component.description,
                  component.category,
                ),
              ),
            }}
          />
        )}
        <ViewerLayoutContent>{children}</ViewerLayoutContent>
      </PropsProvider>
    </ViewerProvider>
  );
}
