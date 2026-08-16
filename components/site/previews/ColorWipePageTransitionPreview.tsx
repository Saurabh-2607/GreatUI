"use client";

import { useState, useEffect, useCallback } from "react";
import { ColorWipePageTransition } from "@/components/ui/ColorWipePageTransition";

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

export default function ColorWipePageTransitionPreview() {
  const [trigger, setTrigger] = useState(0);
  const [direction, setDirection] = useState<
    "top" | "bottom" | "left" | "right"
  >("left");
  const [activePage, setActivePage] = useState<"home" | "work">("home");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 0);
  }, []);

  const handleTransition = (dir: "top" | "bottom" | "left" | "right") => {
    setDirection(dir);
    setTrigger((prev) => prev + 1);
  };

  const swapView = useCallback(() => {
    setActivePage((prev) => (prev === "home" ? "work" : "home"));
  }, []);

  return (
    <div className="relative mx-5 flex h-[500px] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white dark:bg-neutral-950">
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
        <div className="grid w-full place-items-center">
          {/* Home State */}
          <div
            className={`col-start-1 row-start-1 flex flex-col items-center justify-center text-center transition-opacity duration-300 ${
              activePage === "home"
                ? "z-10 opacity-100"
                : "pointer-events-none opacity-0"
            }`}
          >
            <span className="mb-4 rounded-full bg-pink-100 px-3 py-1 text-xs font-medium text-pink-600 dark:bg-pink-900/30 dark:text-pink-400">
              New Transition
            </span>
            <h1 className="max-w-lg px-2 text-3xl leading-tight font-medium tracking-tight text-neutral-900 sm:text-4xl md:text-5xl dark:text-white">
              Click a direction below to trigger the page transition.
            </h1>
          </div>

          {/* Work State */}
          <div
            className={`col-start-1 row-start-1 flex flex-col items-center justify-center text-center transition-opacity duration-300 ${
              activePage === "work"
                ? "z-10 opacity-100"
                : "pointer-events-none opacity-0"
            }`}
          >
            <div className="mb-6 grid grid-cols-2 gap-4">
              <div className="h-16 w-16 rounded-2xl bg-neutral-100 dark:bg-neutral-800" />
              <div className="h-16 w-16 rounded-2xl bg-neutral-100 dark:bg-neutral-800" />
            </div>
            <h1 className="max-w-lg px-2 text-2xl leading-tight font-medium tracking-tight text-neutral-900 sm:text-3xl md:text-4xl dark:text-white">
              Content swapped seamlessly mid-transition. Try another!
            </h1>
          </div>
        </div>

        {/* Directional Toggle Buttons */}
        <div className="mt-12 flex items-center gap-3">
          <button
            onClick={() => handleTransition("top")}
            className="group flex h-12 w-12 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-sm transition-all hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800"
            title="Top Curtain"
          >
            <ArrowDownIcon className="h-5 w-5 text-neutral-600 transition-transform group-hover:translate-y-0.5 dark:text-neutral-400" />
          </button>
          <button
            onClick={() => handleTransition("bottom")}
            className="group flex h-12 w-12 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-sm transition-all hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800"
            title="Bottom Curtain"
          >
            <ArrowUpIcon className="h-5 w-5 text-neutral-600 transition-transform group-hover:-translate-y-0.5 dark:text-neutral-400" />
          </button>
          <button
            onClick={() => handleTransition("left")}
            className="group flex h-12 w-12 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-sm transition-all hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800"
            title="Left Wipe"
          >
            <ArrowRightIcon className="h-5 w-5 text-neutral-600 transition-transform group-hover:translate-x-0.5 dark:text-neutral-400" />
          </button>
          <button
            onClick={() => handleTransition("right")}
            className="group flex h-12 w-12 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-sm transition-all hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800"
            title="Right Wipe"
          >
            <ArrowLeftIcon className="h-5 w-5 text-neutral-600 transition-transform group-hover:-translate-x-0.5 dark:text-neutral-400" />
          </button>
        </div>
      </div>

      {mounted && (
        <ColorWipePageTransition
          trigger={trigger}
          direction={direction}
          exitOpposite={true}
          onViewSwap={swapView}
          showTrailingStroke={false}
          columns={8}
        />
      )}
    </div>
  );
}
