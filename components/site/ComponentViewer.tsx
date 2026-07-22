"use client";

import { useState } from "react";
import posthog from "posthog-js";
import Sidebar from "@/components/site/Sidebar";
import SidebarToggle from "@/components/site/SidebarToggle";
import DocsPanel from "@/components/site/DocsPanel";
import CodePanel from "@/components/site/CodePanel";
import ThemeToggle from "@/components/site/ThemeToggle";
import ComponentPreviewRenderer from "@/components/site/ComponentPreviewRenderer";
import { type Component } from "@/lib/registry";
import { HugeiconsIcon } from "@hugeicons/react";
import { BookOpen01Icon, CodeIcon } from "@hugeicons/core-free-icons";

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

      <div className="absolute top-9 right-9 z-40 flex h-10 items-center gap-1.5 rounded-xl border border-neutral-800/60 bg-neutral-950 p-1.5 text-white shadow-xs backdrop-blur-xl transition-all dark:bg-neutral-950 dark:text-white">
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
          className={`inline-flex h-7 cursor-pointer items-center gap-1.5 rounded-lg px-3 text-xs font-semibold transition-all ${
            isPanelOpen && !isCodeOpen
              ? "bg-[#f6821f] text-white"
              : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
          }`}
        >
          <HugeiconsIcon icon={BookOpen01Icon} className="h-3.5 w-3.5" />
          <span>Docs</span>
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
          className={`inline-flex h-7 cursor-pointer items-center gap-1.5 rounded-lg px-3 text-xs font-semibold transition-all ${
            isPanelOpen && isCodeOpen
              ? "bg-[#f6821f] text-white"
              : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
          }`}
        >
          <HugeiconsIcon icon={CodeIcon} className="h-3.5 w-3.5" />
          <span>Code</span>
        </button>

        <div className="h-4 w-px bg-neutral-800 dark:bg-white/10" />

        <ThemeToggle className="!h-7 !w-7 !rounded-lg !border-0 !bg-transparent hover:!bg-neutral-800 dark:!border-0 dark:!bg-transparent dark:hover:!bg-neutral-800" />
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
