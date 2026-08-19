"use client";

import React, { useState, useEffect } from "react";
import CircularThemeProvider, {
  useCircularTheme,
} from "@/components/ui/CircularThemeProvider";
import { useTheme } from "@/components/site/ThemeProvider";

const ArrowUpLeftIcon = ({ className }: { className?: string }) => (
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
    <path d="M17 17L7 7" />
    <path d="M7 17V7h10" />
  </svg>
);

const ArrowUpRightIcon = ({ className }: { className?: string }) => (
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
    <path d="M7 17L17 7" />
    <path d="M7 7h10v10" />
  </svg>
);

const ArrowDownLeftIcon = ({ className }: { className?: string }) => (
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
    <path d="M17 7L7 17" />
    <path d="M17 17H7V7" />
  </svg>
);

const ArrowDownRightIcon = ({ className }: { className?: string }) => (
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
    <path d="M7 7l10 10" />
    <path d="M7 17h10V7" />
  </svg>
);

const SunMoonIcon = ({ className }: { className?: string }) => (
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
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
);

function PreviewInner() {
  const { triggerTransition, isAnimating, theme } = useCircularTheme();

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
            Circular Transition
          </span>
          <h1 className="max-w-lg px-2 text-3xl leading-tight font-medium tracking-tight text-neutral-900 sm:text-4xl md:text-5xl dark:text-white">
            Wipe transition the theme from any corner or the button center.
          </h1>
          <p className="mt-4 text-sm text-neutral-400 dark:text-neutral-500">
            Currently in{" "}
            <span className="font-bold text-rose-500 capitalize">{theme}</span>{" "}
            mode.
          </p>
        </div>

        {/* Dynamic Wipe Origin Triggers */}
        <div className="mt-12 flex items-center justify-center gap-3">
          <button
            disabled={isAnimating}
            onClick={() => triggerTransition("top-left")}
            className="group flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-neutral-200 bg-white shadow-sm transition-all hover:bg-neutral-50 disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800"
            title="Top Left Corner Wipe"
          >
            <ArrowUpLeftIcon className="h-5 w-5 text-neutral-600 transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 dark:text-neutral-400" />
          </button>
          <button
            disabled={isAnimating}
            onClick={() => triggerTransition("top-right")}
            className="group flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-neutral-200 bg-white shadow-sm transition-all hover:bg-neutral-50 disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800"
            title="Top Right Corner Wipe"
          >
            <ArrowUpRightIcon className="h-5 w-5 text-neutral-600 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 dark:text-neutral-400" />
          </button>

          <button
            disabled={isAnimating}
            onClick={(e) => triggerTransition(e.currentTarget)}
            className="group flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-neutral-200 bg-white shadow-sm transition-all hover:scale-105 hover:bg-neutral-50 active:scale-95 disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800"
            title="Wipe from Button Center"
          >
            <SunMoonIcon className="h-5 w-5 text-neutral-600 transition-transform group-hover:rotate-12 dark:text-neutral-400" />
          </button>

          <button
            disabled={isAnimating}
            onClick={() => triggerTransition("bottom-left")}
            className="group flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-neutral-200 bg-white shadow-sm transition-all hover:bg-neutral-50 disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800"
            title="Bottom Left Corner Wipe"
          >
            <ArrowDownLeftIcon className="h-5 w-5 text-neutral-600 transition-transform group-hover:-translate-x-0.5 group-hover:translate-y-0.5 dark:text-neutral-400" />
          </button>
          <button
            disabled={isAnimating}
            onClick={() => triggerTransition("bottom-right")}
            className="group flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-neutral-200 bg-white shadow-sm transition-all hover:bg-neutral-50 disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800"
            title="Bottom Right Corner Wipe"
          >
            <ArrowDownRightIcon className="h-5 w-5 text-neutral-600 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5 dark:text-neutral-400" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CircularThemeProviderPreview() {
  const [mounted, setMounted] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    setTimeout(() => setMounted(true), 0);
  }, []);

  if (!mounted) return null;

  return (
    <CircularThemeProvider theme={theme} onThemeChange={toggleTheme}>
      <div className="relative mx-5 flex h-[500px] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white dark:bg-neutral-950">
        <PreviewInner />
      </div>
    </CircularThemeProvider>
  );
}
