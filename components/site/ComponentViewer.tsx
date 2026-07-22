"use client";

import { useState } from "react";
import posthog from "posthog-js";
import Sidebar from "@/components/site/Sidebar";
import SidebarToggle from "@/components/site/SidebarToggle";
import DocsPanel from "@/components/site/DocsPanel";
import CodePanel from "@/components/site/CodePanel";
import ThemeToggle from "@/components/site/ThemeToggle";
import ComponentPreviewRenderer from "@/components/site/ComponentPreviewRenderer";
import Link from "next/link";
import { type Component } from "@/lib/registry";
import {
  CodeIcon,
  HomeIcon,
  MaximizeIcon,
  MinimizeIcon,
} from "@/components/site/Icons";

interface ComponentViewerProps {
  component: Component;
}

export default function ComponentViewer({ component }: ComponentViewerProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [isCodeOpen, setIsCodeOpen] = useState(false);

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-neutral-50 p-4 text-neutral-900 transition-colors dark:bg-[#0a0a0a] dark:text-white">
      <div
        className={`absolute top-9 left-9 z-[60] transition-opacity duration-300 ${isCodeOpen ? "pointer-events-none opacity-0" : "opacity-100"}`}
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
      </div>

      <div className="absolute top-9 right-9 z-40 flex items-center gap-1.5 rounded-2xl border border-neutral-200 bg-white/80 p-1.5 shadow-xs backdrop-blur-xl transition-all dark:border-neutral-800/60 dark:bg-neutral-950/80">
        <Link
          href="/"
          title="Back to Home"
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-neutral-950 text-white shadow-xs transition-all hover:bg-neutral-900 dark:bg-neutral-950 dark:text-white dark:hover:bg-neutral-900"
          aria-label="Navigate to Home"
        >
          <HomeIcon className="h-5 w-5" />
        </Link>

        <button
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
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-neutral-950 text-white shadow-xs transition-all hover:bg-neutral-900 dark:bg-neutral-950 dark:text-white dark:hover:bg-neutral-900"
          aria-label="Toggle docs panel"
        >
          {isPanelOpen ? (
            <MaximizeIcon className="h-5 w-5" />
          ) : (
            <MinimizeIcon className="h-5 w-5" />
          )}
        </button>

        <button
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
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-neutral-950 text-white shadow-xs transition-all hover:bg-neutral-900 dark:bg-neutral-950 dark:text-white dark:hover:bg-neutral-900"
          aria-label="Toggle code panel"
        >
          <CodeIcon className="h-5 w-5" />
        </button>

        <ThemeToggle className="!h-10 !w-10 !rounded-xl !border-0 !bg-neutral-950 !text-white shadow-xs hover:!bg-neutral-900 dark:!border-0 dark:!bg-neutral-950 dark:!text-white dark:hover:!bg-neutral-900" />
      </div>

      {isSidebarOpen && (
        <div className="pointer-events-none absolute inset-0 z-50 flex p-4">
          <div className="pointer-events-auto relative z-10 h-full w-64 overflow-hidden rounded-2xl bg-white/95 p-4 backdrop-blur-xl transition-all sm:w-72 dark:bg-[#141414]/95">
            <Sidebar
              activeSlug={component.slug}
              onClose={() => setIsSidebarOpen(false)}
            />
          </div>
        </div>
      )}

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

        <section className="relative flex h-full flex-1 flex-col items-center justify-center overflow-hidden rounded-2xl bg-white p-5 backdrop-blur-md dark:bg-[#141414]">
          <div className="relative flex h-full w-full flex-1 items-center justify-center overflow-hidden">
            <div className="pointer-events-auto relative z-10 flex h-full w-full items-center justify-center">
              <ComponentPreviewRenderer slug={component.slug} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
