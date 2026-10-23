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
import { PropsProvider } from "@/lib/PropsContext";
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
    isCustomizerOpen,
    setIsCustomizerOpen,
    activeComponent,
    setPreviewContainer,
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
    <div className="relative flex h-[100dvh] w-full flex-col overflow-hidden bg-white p-4 text-neutral-900 transition-colors dark:bg-neutral-950 dark:text-white">
      <div
        className={`absolute top-4 left-4 z-[60] flex items-center gap-3.5 transition-opacity duration-300 sm:top-9 sm:left-9 ${isCodeOpen || isMarkdownOpen ? "pointer-events-none opacity-0" : "opacity-100"}`}
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

        <div
          className={`hidden items-center gap-2.5 text-xl font-normal tracking-tight text-neutral-500 transition-all duration-300 select-none sm:flex dark:text-neutral-400 ${isSidebarOpen ? "pointer-events-none invisible opacity-0" : "visible opacity-100"}`}
        >
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
      <div
        className={`absolute top-4 right-4 z-40 flex items-center gap-1.5 rounded-2xl border border-neutral-200 bg-white/80 p-1.5 shadow-xs backdrop-blur-xl transition-all sm:top-9 sm:right-9 dark:border-neutral-800/60 dark:bg-neutral-950/80 ${
          isCodeOpen || isMarkdownOpen
            ? "pointer-events-none opacity-0 sm:pointer-events-auto sm:opacity-100"
            : "opacity-100"
        }`}
      >
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
              setIsCustomizerOpen(false);
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
                setIsCustomizerOpen(false);
                setIsSidebarOpen(false);
                posthog.capture("code_panel_toggled", {
                  state: "open",
                  component_slug: component.slug,
                });
              }
            } else {
              setIsPanelOpen(true);
              setIsCodeOpen(true);
              setIsCustomizerOpen(false);
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

        {hasCustomizableProps && (
          <button
            type="button"
            onClick={() => {
              const nextState = !isCustomizerOpen;
              setIsCustomizerOpen(nextState);
              if (nextState) {
                setIsPanelOpen(false);
                setIsCodeOpen(false);
              }
              posthog.capture("customizer_panel_toggled", {
                state: nextState ? "open" : "closed",
                component_slug: component?.slug,
              });
            }}
            title={isCustomizerOpen ? "Hide props panel" : "Show props panel"}
            className={`relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl transition-all ${
              isCustomizerOpen
                ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-950"
                : "bg-neutral-100 text-neutral-700 shadow-xs hover:bg-neutral-200 hover:text-neutral-950 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white"
            }`}
            aria-label="Toggle prop customizer panel"
          >
            <AnimatePresence>
              {!isCustomizerOpen &&
                !isPanelOpen &&
                !isCodeOpen &&
                process.env.NODE_ENV !== "development" && (
                  <motion.div
                    initial={{ opacity: 0, filter: "blur(4px)", y: -6 }}
                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                    exit={{ opacity: 0, filter: "blur(4px)", y: -6 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="pointer-events-none absolute top-full right-0 mt-2 hidden w-max items-center justify-end gap-1.5 md:flex"
                  >
                    <style>
                      {`
                    @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600&display=swap');
                    @keyframes text-shimmer {
                      0% { -webkit-mask-position: 200% center; mask-position: 200% center; }
                      100% { -webkit-mask-position: -200% center; mask-position: -200% center; }
                    }
                    .animate-text-shimmer {
                      -webkit-mask-image: linear-gradient(-75deg, rgba(0,0,0,0.5) 30%, #000 50%, rgba(0,0,0,0.5) 70%);
                      -webkit-mask-size: 200%;
                      mask-image: linear-gradient(-75deg, rgba(0,0,0,0.5) 30%, #000 50%, rgba(0,0,0,0.5) 70%);
                      mask-size: 200%;
                      animation: text-shimmer 2.5s linear infinite;
                    }
                  `}
                    </style>
                    <div
                      style={{ fontFamily: "Caveat, cursive" }}
                      className="animate-text-shimmer mt-2 -rotate-2 pr-2 text-right text-2xl leading-[0.85] font-medium whitespace-nowrap text-neutral-500 select-none dark:text-neutral-400"
                    >
                      Click here to customize the preview <br /> or view all the
                      variants!
                    </div>
                    <svg
                      className="h-16 w-16 shrink-0 text-neutral-400 dark:text-neutral-500"
                      viewBox="0 0 100 100"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Clean sweeping curved shaft */}
                      <path
                        d="M 12 72 C 32 72, 54 54, 68 18"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {/* Balanced hand-drawn arrowhead */}
                      <path
                        d="M 50 28 Q 60 21 68 18 Q 74 27 78 36"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.div>
                )}
            </AnimatePresence>

            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              />
            </svg>
          </button>
        )}

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
          role="presentation"
          aria-hidden="true"
          className={`fixed inset-0 bg-black/5 transition-opacity duration-300 dark:bg-black/20 ${
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
      <div
        className={`relative flex flex-1 gap-0 overflow-hidden transition-all duration-300`}
      >
        <div
          className={`relative flex h-full shrink-0 flex-col transition-all duration-300 ${
            isPanelOpen
              ? "mr-4 w-full lg:w-[40%]"
              : "pointer-events-none w-0 overflow-hidden opacity-0"
          }`}
        >
          <div className="relative h-full w-[calc(100vw-32px)] overflow-hidden rounded-2xl backdrop-blur-md lg:w-[calc((100vw-32px)*0.4)]">
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
              <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-xl">
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
              <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-xl">
                <MarkdownPanel
                  component={component}
                  onClose={() => setIsMarkdownOpen(false)}
                />
              </div>
            </div>
          </div>
        </div>

        <section className="relative z-10 flex h-full flex-1 flex-col items-center justify-center overflow-hidden rounded-2xl bg-neutral-100 backdrop-blur-md dark:bg-[#141414]">
          <div className="relative flex h-full w-full flex-1 items-center justify-center overflow-hidden px-4">
            <div
              ref={setPreviewContainer}
              className="pointer-events-auto relative z-10 h-full w-full scrollbar-none overflow-y-auto"
            >
              {children}
            </div>
          </div>
        </section>

        <div
          className={`relative flex h-full shrink-0 flex-col transition-all duration-300 ${
            isCustomizerOpen && hasCustomizableProps
              ? "ml-4 w-full lg:w-[340px] xl:w-[380px]"
              : "pointer-events-none w-0 overflow-hidden opacity-0"
          }`}
        >
          <div className="relative h-full w-[calc(100vw-32px)] overflow-hidden rounded-2xl bg-white backdrop-blur-md lg:w-[340px] xl:w-[380px] dark:bg-[#0a0a0a]">
            <ProgressiveBlur
              position="top"
              height="140px"
              className="pointer-events-none z-20 bg-gradient-to-b from-white via-white/90 to-transparent dark:from-[#0a0a0a] dark:via-[#0a0a0a]/90 dark:to-transparent"
            />
            <div className="relative z-10 h-full w-full scrollbar-none overflow-y-auto px-6 pt-[25dvh] pb-[10dvh]">
              <PropsCustomizationPanel component={component} />
            </div>
          </div>
        </div>
      </div>{" "}
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
