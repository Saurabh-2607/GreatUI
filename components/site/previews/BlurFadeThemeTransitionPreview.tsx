"use client";

import React, { useState, useEffect } from "react";
import BlurFadeThemeTransition, {
  useBlurFadeThemeTransition,
} from "@/components/ui/BlurFadeThemeTransition";

const SunIcon = ({ className }: { className?: string }) => (
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
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
);

const MoonIcon = ({ className }: { className?: string }) => (
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
  const { triggerTransition, isAnimating, theme } =
    useBlurFadeThemeTransition();

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

      {/* Main content */}
      <div className="relative flex flex-1 flex-col items-center justify-center p-4 sm:p-8">
        <div className="flex flex-col items-center justify-center text-center">
          <span className="mb-4 rounded-full bg-rose-100 px-3 py-1 text-xs font-medium text-rose-600 dark:bg-rose-900/30 dark:text-rose-400">
            Blur Transition
          </span>
          <h1 className="max-w-xl px-2 text-3xl leading-tight font-medium tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
            Cross-fade and blur transition the theme smoothly.
          </h1>
          <p className="mt-4 text-sm text-neutral-400 dark:text-neutral-500">
            Currently in{" "}
            <span className="font-bold text-rose-500 capitalize">{theme}</span>{" "}
            mode.
          </p>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="mt-8 flex items-center justify-center pb-8">
        <button
          onClick={() => triggerTransition()}
          disabled={isAnimating}
          className="group flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-neutral-200 bg-white shadow-sm transition-all hover:scale-105 hover:bg-neutral-50 active:scale-95 disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800"
          aria-label="Switch Theme"
        >
          {isAnimating ? (
            <span className="text-xs font-bold text-neutral-600 dark:text-neutral-400">
              ...
            </span>
          ) : theme === "light" ? (
            <MoonIcon className="h-5 w-5 text-neutral-600 transition-transform group-hover:scale-110 dark:text-neutral-400" />
          ) : (
            <SunIcon className="h-5 w-5 text-neutral-600 transition-transform group-hover:scale-110 dark:text-neutral-400" />
          )}
        </button>
      </div>
    </div>
  );
}

import { useTheme } from "@/components/site/ThemeProvider";

export default function BlurFadeThemeTransitionPreview() {
  const [mounted, setMounted] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    setTimeout(() => setMounted(true), 0);
  }, []);

  if (!mounted) return null;

  return (
    <BlurFadeThemeTransition theme={theme} onThemeChange={toggleTheme}>
      <div className="relative mx-5 flex h-[500px] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-neutral-100 bg-white dark:border-neutral-900 dark:bg-neutral-950">
        <PreviewInner />
      </div>
    </BlurFadeThemeTransition>
  );
}
