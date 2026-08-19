"use client";

import React, { useState, useEffect } from "react";
import SwipeThemeProvider, {
  useSwipeTheme,
} from "@/components/ui/SwipeThemeProvider";
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

const ArrowUpIcon = ({ className }: { className?: string }) => (
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
    <path d="m5 12 7-7 7 7" />
    <path d="M12 19V5" />
  </svg>
);

const ArrowDownIcon = ({ className }: { className?: string }) => (
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
    <path d="M12 5v14" />
    <path d="m19 12-7 7-7-7" />
  </svg>
);

const ArrowLeftIcon = ({ className }: { className?: string }) => (
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
    <path d="m12 19-7-7 7-7" />
    <path d="M19 12H5" />
  </svg>
);

const ArrowRightIcon = ({ className }: { className?: string }) => (
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
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

interface DPadProps {
  angle: number;
  setAngle: (angle: number) => void;
}

function PreviewInner({ angle, setAngle }: DPadProps) {
  const { triggerSwipe, isAnimating, theme } = useSwipeTheme();

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
            Swipe & Corner Transitions
          </span>
          <h1 className="max-w-lg px-2 text-3xl leading-tight font-medium tracking-tight text-neutral-900 sm:text-4xl md:text-5xl dark:text-white">
            Swipe transition the theme.
          </h1>
          <p className="mt-2 text-sm text-neutral-400 dark:text-neutral-500">
            Currently in{" "}
            <span className="font-bold text-rose-500 capitalize">{theme}</span>{" "}
            mode.
          </p>
        </div>

        {/* 3x3 D-Pad Controller */}
        <div className="mt-8 flex flex-col items-center gap-2">
          {/* Row 1 */}
          <div className="flex gap-2">
            <button
              disabled={isAnimating}
              onClick={() => triggerSwipe("top-left")}
              className="group flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-neutral-200 bg-white shadow-sm transition-all hover:bg-neutral-50 disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800"
              title="Top Left Wipe"
            >
              <ArrowUpLeftIcon className="h-5 w-5 text-neutral-600 transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 dark:text-neutral-400" />
            </button>
            <button
              disabled={isAnimating}
              onClick={() => triggerSwipe("top")}
              className="group flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-neutral-200 bg-white shadow-sm transition-all hover:bg-neutral-50 disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800"
              title="Top Swipe"
            >
              <ArrowUpIcon className="h-5 w-5 text-neutral-600 transition-transform group-hover:-translate-y-0.5 dark:text-neutral-400" />
            </button>
            <button
              disabled={isAnimating}
              onClick={() => triggerSwipe("top-right")}
              className="group flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-neutral-200 bg-white shadow-sm transition-all hover:bg-neutral-50 disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800"
              title="Top Right Wipe"
            >
              <ArrowUpRightIcon className="h-5 w-5 text-neutral-600 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 dark:text-neutral-400" />
            </button>
          </div>

          {/* Row 2 */}
          <div className="flex items-center gap-2">
            <button
              disabled={isAnimating}
              onClick={() => triggerSwipe("left")}
              className="group flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-neutral-200 bg-white shadow-sm transition-all hover:bg-neutral-50 disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800"
              title="Left Swipe"
            >
              <ArrowLeftIcon className="h-5 w-5 text-neutral-600 transition-transform group-hover:-translate-x-0.5 dark:text-neutral-400" />
            </button>
            {/* Center transparent spacer */}
            <div className="h-11 w-11" />

            <button
              disabled={isAnimating}
              onClick={() => triggerSwipe("right")}
              className="group flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-neutral-200 bg-white shadow-sm transition-all hover:bg-neutral-50 disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800"
              title="Right Swipe"
            >
              <ArrowRightIcon className="h-5 w-5 text-neutral-600 transition-transform group-hover:translate-x-0.5 dark:text-neutral-400" />
            </button>
          </div>

          {/* Row 3 */}
          <div className="flex gap-2">
            <button
              disabled={isAnimating}
              onClick={() => triggerSwipe("bottom-left")}
              className="group flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-neutral-200 bg-white shadow-sm transition-all hover:bg-neutral-50 disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800"
              title="Bottom Left Wipe"
            >
              <ArrowDownLeftIcon className="h-5 w-5 text-neutral-600 transition-transform group-hover:-translate-x-0.5 group-hover:translate-y-0.5 dark:text-neutral-400" />
            </button>
            <button
              disabled={isAnimating}
              onClick={() => triggerSwipe("bottom")}
              className="group flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-neutral-200 bg-white shadow-sm transition-all hover:bg-neutral-50 disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800"
              title="Bottom Swipe"
            >
              <ArrowDownIcon className="h-5 w-5 text-neutral-600 transition-transform group-hover:translate-y-0.5 dark:text-neutral-400" />
            </button>
            <button
              disabled={isAnimating}
              onClick={() => triggerSwipe("bottom-right")}
              className="group flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-neutral-200 bg-white shadow-sm transition-all hover:bg-neutral-50 disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800"
              title="Bottom Right Wipe"
            >
              <ArrowDownRightIcon className="h-5 w-5 text-neutral-600 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5 dark:text-neutral-400" />
            </button>
          </div>
        </div>

        {/* Slant Angle Presets */}
        <div className="mt-8 flex items-center justify-center gap-2">
          <span className="text-xs font-semibold text-neutral-400 dark:text-neutral-500">
            Slant Angle:
          </span>
          <div className="flex rounded-lg bg-neutral-100 p-0.5 dark:bg-neutral-900">
            <button
              onClick={() => setAngle(0)}
              className={`cursor-pointer rounded-md px-2.5 py-1 text-xs font-semibold transition-all ${
                angle === 0
                  ? "bg-white text-neutral-900 shadow-sm dark:bg-neutral-800 dark:text-white"
                  : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
              }`}
            >
              0° (Straight)
            </button>
            <button
              onClick={() => setAngle(15)}
              className={`cursor-pointer rounded-md px-2.5 py-1 text-xs font-semibold transition-all ${
                angle === 15
                  ? "bg-white text-neutral-900 shadow-sm dark:bg-neutral-800 dark:text-white"
                  : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
              }`}
            >
              15° Slant
            </button>
            <button
              onClick={() => setAngle(-15)}
              className={`cursor-pointer rounded-md px-2.5 py-1 text-xs font-semibold transition-all ${
                angle === -15
                  ? "bg-white text-neutral-900 shadow-sm dark:bg-neutral-800 dark:text-white"
                  : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
              }`}
            >
              -15° Slant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SwipeThemeChangePreview() {
  const [mounted, setMounted] = useState(false);
  const [angle, setAngle] = useState(0);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    setTimeout(() => setMounted(true), 0);
  }, []);

  if (!mounted) return null;

  return (
    <SwipeThemeProvider angle={angle} theme={theme} onThemeChange={toggleTheme}>
      <div className="relative mx-5 flex h-[500px] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white dark:bg-neutral-950">
        <PreviewInner angle={angle} setAngle={setAngle} />
      </div>
    </SwipeThemeProvider>
  );
}
