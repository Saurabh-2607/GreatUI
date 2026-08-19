"use client";

import React, { useState, useEffect } from "react";
import SplitThemeProvider, {
  useSplitTheme,
  SplitMode,
} from "@/components/ui/SplitThemeProvider";

const HorizontalSplitIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m9 17-5-5 5-5M15 7l5 5-5 5" />
    <path d="M4 12h16" />
  </svg>
);

const VerticalSplitIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m17 9-5-5-5 5M7 15l5 5 5-5" />
    <path d="M12 4v16" />
  </svg>
);

function PreviewInner() {
  const { triggerTransition, isAnimating, theme } = useSplitTheme();
  const [activeMode, setActiveMode] = useState<SplitMode>("in-to-out");

  return (
    <div className="flex h-full w-full flex-col justify-between">
      {/* Mock Header */}
      <header className="flex w-full items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-rose-500" />
          <span className="font-medium tracking-tight text-neutral-900 dark:text-white">
            Studio
          </span>
        </div>

        <nav className="hidden gap-6 text-sm font-medium text-neutral-500 sm:flex">
          <button className="hover:text-neutral-900 dark:hover:text-white">
            Home
          </button>
          <button className="hover:text-neutral-900 dark:hover:text-white">
            Work
          </button>
          <button className="hover:text-neutral-900 dark:hover:text-white">
            About
          </button>
        </nav>
      </header>

      {/* Page Content */}
      <div className="relative flex flex-1 flex-col items-center justify-center p-4 sm:p-8">
        <div className="flex flex-col items-center justify-center text-center">
          <span className="mb-4 rounded-full bg-rose-100 px-3 py-1 text-xs font-medium text-rose-600 dark:bg-rose-900/30 dark:text-rose-400">
            Split Transition
          </span>
          <h1 className="max-w-xl px-2 text-3xl leading-tight font-medium tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
            Wipe transition the theme split horizontally or vertically.
          </h1>
          <p className="mt-4 text-sm text-neutral-400 dark:text-neutral-500">
            Currently in{" "}
            <span className="font-bold text-rose-500 capitalize">{theme}</span>{" "}
            mode.
          </p>
        </div>

        {/* Mode Selector Toggle */}
        <div className="mt-8 flex items-center rounded-lg bg-neutral-100 p-1 dark:bg-neutral-900">
          <button
            onClick={() => setActiveMode("in-to-out")}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
              activeMode === "in-to-out"
                ? "bg-white text-neutral-950 shadow-sm dark:bg-neutral-800 dark:text-white"
                : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
            }`}
          >
            In to Out
          </button>
          <button
            onClick={() => setActiveMode("out-to-in")}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
              activeMode === "out-to-in"
                ? "bg-white text-neutral-950 shadow-sm dark:bg-neutral-800 dark:text-white"
                : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
            }`}
          >
            Out to In
          </button>
        </div>

        {/* Directional Trigger Buttons */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            disabled={isAnimating}
            onClick={() => triggerTransition("horizontal", activeMode)}
            className="group flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border border-neutral-200 bg-white shadow-sm transition-all hover:scale-105 hover:bg-neutral-50 active:scale-95 disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800"
            title="Horizontal Split Wipe"
          >
            <HorizontalSplitIcon className="h-6 w-6 text-neutral-600 transition-transform group-hover:scale-110 dark:text-neutral-400" />
          </button>

          <button
            disabled={isAnimating}
            onClick={() => triggerTransition("vertical", activeMode)}
            className="group flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border border-neutral-200 bg-white shadow-sm transition-all hover:scale-105 hover:bg-neutral-50 active:scale-95 disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800"
            title="Vertical Split Wipe"
          >
            <VerticalSplitIcon className="h-6 w-6 text-neutral-600 transition-transform group-hover:scale-110 dark:text-neutral-400" />
          </button>
        </div>
      </div>
    </div>
  );
}

import { useTheme } from "@/components/site/ThemeProvider";

export default function SplitThemeProviderPreview() {
  const [mounted, setMounted] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    setTimeout(() => setMounted(true), 0);
  }, []);

  if (!mounted) return null;

  return (
    <SplitThemeProvider theme={theme} onThemeChange={toggleTheme}>
      <div className="relative mx-5 flex h-[500px] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-neutral-100 bg-white dark:border-neutral-900 dark:bg-neutral-950">
        <PreviewInner />
      </div>
    </SplitThemeProvider>
  );
}
