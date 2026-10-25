"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import posthog from "posthog-js";
import Sidebar from "@/components/site/Sidebar";
import SidebarToggle from "@/components/site/SidebarToggle";
import DocsPanel from "@/components/site/DocsPanel";
import { DocsToc } from "@/components/site/DocsToc";
import CodePanel from "@/components/site/CodePanel";
import MarkdownPanel from "@/components/site/MarkdownPanel";
import ThemeToggle from "@/components/site/ThemeToggle";
import {
  CodeIcon,
  BookOpenIcon,
  CopyIcon,
  CheckIcon,
} from "@/components/site/Icons";
import { components } from "@/lib/registry";
import { getComponentPropsSchema } from "@/lib/propsRegistry";
import { ViewerProvider, useViewer } from "@/lib/viewer-context";
import { PropsProvider, useProps } from "@/lib/PropsContext";
import PropsCustomizationPanel from "@/components/site/PropsCustomizationPanel";
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

  React.useEffect(() => {
    if (!isPanelOpen && !isCodeOpen && !isMarkdownOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (isCodeOpen) {
          setIsCodeOpen(false);
        } else if (isMarkdownOpen) {
          setIsMarkdownOpen(false);
        } else {
          setIsPanelOpen(false);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    isPanelOpen,
    isCodeOpen,
    isMarkdownOpen,
    setIsPanelOpen,
    setIsCodeOpen,
    setIsMarkdownOpen,
  ]);

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
      <motion.div
        animate={{
          scale: isPanelOpen ? 0.955 : 1,
          y: isPanelOpen ? 8 : 0,
          borderRadius: isPanelOpen ? 24 : 0,
        }}
        transition={{
          duration: 0.24,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{ transformOrigin: "center top", willChange: "transform" }}
        className={`relative flex h-full w-full overflow-hidden bg-white dark:bg-[#0a0a0a] ${
          isPanelOpen ? "shadow-2xl ring-1 ring-black/5 dark:ring-white/10" : ""
        }`}
      >
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
            className="absolute inset-y-0 right-0 flex w-64 flex-col overflow-hidden bg-white xl:w-72 dark:bg-[#0a0a0a]"
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
                <span className="font-tt text-2xl leading-none font-bold tracking-tight text-neutral-900 uppercase dark:text-white">
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

        <section className="relative flex h-full min-w-0 flex-1 flex-col px-2 pb-2 md:px-3 md:pb-3">
          <div className="flex shrink-0 items-center justify-between px-1 pt-4 pb-2">
            <div className="flex items-center">
              <AnimatePresence initial={false}>
                {!isSidebarOpen && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 42, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="shrink-0 overflow-hidden"
                  >
                    <div className="w-8">
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
                  </motion.div>
                )}
              </AnimatePresence>

              <nav
                aria-label="Breadcrumb"
                className="flex items-center gap-1.5 text-[13px] font-medium select-none"
              >
                <Link
                  href="/components"
                  className="text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                >
                  Components
                </Link>
                <span className="text-neutral-400 select-none dark:text-neutral-600">
                  /
                </span>
                <span className="text-neutral-900 dark:text-neutral-100">
                  {component.name}
                </span>
              </nav>
            </div>

            <div
              className={`flex items-center gap-1.5 transition-all ${
                isCodeOpen || isMarkdownOpen
                  ? "pointer-events-none opacity-0 sm:pointer-events-auto sm:opacity-100"
                  : "opacity-100"
              }`}
            >
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
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
                aria-label="Toggle docs panel"
                className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg transition-colors outline-none focus:outline-none ${
                  isPanelOpen && !isCodeOpen
                    ? "bg-neutral-100 text-neutral-950 dark:bg-neutral-800 dark:text-white"
                    : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-950 dark:text-neutral-400 dark:hover:bg-neutral-800/80 dark:hover:text-white"
                }`}
              >
                <BookOpenIcon className="h-4.5 w-4.5" />
              </button>

              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
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
                aria-label="Toggle code panel"
                className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg transition-colors outline-none focus:outline-none ${
                  isPanelOpen && isCodeOpen
                    ? "bg-neutral-100 text-neutral-950 dark:bg-neutral-800 dark:text-white"
                    : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-950 dark:text-neutral-400 dark:hover:bg-neutral-800/80 dark:hover:text-white"
                }`}
              >
                <CodeIcon className="h-4.5 w-4.5" />
              </button>

              <ThemeToggle className="!h-8 !w-8 !rounded-lg !border-0 !bg-transparent shadow-none transition-colors hover:!bg-neutral-100 dark:!border-0 dark:!bg-transparent dark:hover:!bg-neutral-800/80 [&>svg]:h-4.5 [&>svg]:w-4.5 [&>svg]:text-neutral-500 hover:[&>svg]:text-neutral-950 dark:[&>svg]:text-neutral-400 dark:hover:[&>svg]:text-white" />
            </div>
          </div>

          <div className="relative flex h-full w-full flex-1 items-center justify-center overflow-hidden rounded-[1.25rem] bg-neutral-100 backdrop-blur-md dark:bg-[#141414]">
            <div className="relative flex h-full w-full flex-1 items-center justify-center overflow-hidden">
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
                  className="absolute bottom-3.5 left-1/2 z-40 hidden max-w-[calc(100%-2rem)] -translate-x-1/2 items-center gap-2 rounded-xl bg-white/80 p-1.5 shadow-md backdrop-blur-xl transition-all sm:flex dark:bg-neutral-950/80"
                >
                  <div ref={dropdownRef} className="relative shrink-0">
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex h-7.5 cursor-pointer items-center justify-center gap-1 rounded-lg bg-neutral-100 px-2 font-mono text-xs font-semibold text-neutral-500 shadow-xs transition-all hover:bg-neutral-200 hover:text-neutral-950 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
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
                                    ? "bg-neutral-100 text-neutral-950 dark:bg-neutral-900 dark:text-white"
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

                  <div className="min-w-0 scrollbar-none overflow-x-auto pr-1 font-mono text-[13px] leading-6 whitespace-nowrap text-neutral-800 select-all dark:text-neutral-200">
                    <code className="whitespace-nowrap">{installCommand}</code>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyInstall}
                    className="flex h-7.5 w-7.5 shrink-0 cursor-pointer items-center justify-center rounded-lg bg-neutral-100 text-neutral-500 shadow-xs transition-all hover:bg-neutral-200 hover:text-neutral-950 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
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

        <aside
          aria-label="Props customizer"
          className={`relative hidden h-full shrink-0 overflow-hidden transition-[width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] lg:block ${
            hasCustomizableProps ? "w-72 xl:w-80" : "w-0"
          }`}
        >
          <div
            inert={!hasCustomizableProps}
            className="absolute inset-y-0 left-0 flex w-72 flex-col overflow-hidden bg-white xl:w-80 dark:bg-[#0a0a0a]"
          >
            <div className="relative flex h-full w-full flex-col overflow-hidden">
              <div className="flex shrink-0 items-center justify-between px-4 pt-4 pb-2">
                <span className="text-[13px] font-medium text-neutral-900 dark:text-white">
                  Props
                </span>
                <button
                  type="button"
                  onClick={resetProps}
                  className="cursor-pointer text-[12px] font-medium text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                  title="Reset props to default"
                >
                  Reset
                </button>
              </div>

              <div className="relative min-h-0 flex-1 overflow-hidden px-2">
                <PropsCustomizationPanel component={component} />
              </div>
            </div>
          </div>
        </aside>
      </motion.div>

      <AnimatePresence>
        {isPanelOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs"
              onClick={() => {
                setIsPanelOpen(false);
                setIsCodeOpen(false);
                setIsMarkdownOpen(false);
              }}
            />

            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{
                duration: 0.24,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ willChange: "transform" }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.6 }}
              onDragEnd={(_, info) => {
                if (info.offset.y > 100 || info.velocity.y > 350) {
                  setIsPanelOpen(false);
                  setIsCodeOpen(false);
                  setIsMarkdownOpen(false);
                }
              }}
              className="fixed inset-x-0 bottom-0 z-50 mx-auto flex h-[calc(100dvh-2rem)] w-[86vw] max-w-[1480px] flex-col overflow-hidden rounded-t-[1.75rem] border-x border-t border-neutral-200/80 bg-white shadow-2xl md:h-[calc(100dvh-2.25rem)] 2xl:max-w-[1540px] dark:border-neutral-800/80 dark:bg-[#111111]"
            >
              <div className="relative flex shrink-0 cursor-grab items-center justify-center pt-2.5 pb-1 active:cursor-grabbing">
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    setIsPanelOpen(false);
                    setIsCodeOpen(false);
                    setIsMarkdownOpen(false);
                  }}
                  className="group flex cursor-pointer items-center justify-center rounded-full px-4 py-1.5 transition-opacity outline-none hover:opacity-80 focus:outline-none active:scale-95"
                  aria-label="Close docs drawer"
                >
                  <span className="h-1.25 w-10 rounded-full bg-neutral-300 transition-colors group-hover:bg-neutral-400 dark:bg-neutral-700 dark:group-hover:bg-neutral-500" />
                </button>
              </div>

              <div
                id="docs-drawer-scroll"
                className="relative min-h-0 flex-1 scrollbar-none overflow-y-auto px-6 pt-2 pb-8 md:px-8"
              >
                <div className="flex w-full items-start justify-between gap-6 md:gap-8">
                  <div className="min-w-0 flex-1">
                    <DocsPanel component={component} />
                  </div>
                  <div className="sticky top-2 hidden w-60 shrink-0 xl:block">
                    <DocsToc component={component} />
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {isCodeOpen && (
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{
                      duration: 0.28,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="absolute inset-0 z-30 flex flex-col justify-end"
                  >
                    <div className="relative h-full w-full overflow-hidden shadow-xl">
                      <CodePanel
                        component={component}
                        onClose={() => setIsCodeOpen(false)}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {isMarkdownOpen && (
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{
                      duration: 0.28,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="absolute inset-0 z-30 flex flex-col justify-end"
                  >
                    <div className="relative h-full w-full overflow-hidden shadow-xl">
                      <MarkdownPanel
                        component={component}
                        onClose={() => setIsMarkdownOpen(false)}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </>
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
