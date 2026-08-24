"use client";

import { useState, useEffect, useCallback } from "react";
import CurtainPageTransition from "../../ui/CurtainPageTransition";

const ArrowUpDownIcon = ({ className }: { className?: string }) => (
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
    <path d="m7 15 5 5 5-5" />
    <path d="m7 9 5-5 5 5" />
    <path d="M12 4v16" />
  </svg>
);

const ArrowLeftRightIcon = ({ className }: { className?: string }) => (
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
    <path d="m15 7 5 5-5 5" />
    <path d="m9 7-5 5 5 5" />
    <path d="M4 12h16" />
  </svg>
);

export default function CurtainPageTransitionPreview() {
  const [trigger, setTrigger] = useState(0);
  const [activePage, setActivePage] = useState<"home" | "about">("home");
  const [mounted, setMounted] = useState(false);
  const [direction, setDirection] = useState<"vertical" | "horizontal">(
    "horizontal",
  );

  useEffect(() => {
    setTimeout(() => setMounted(true), 0);
  }, []);

  const handleTransition = (dir: "vertical" | "horizontal") => {
    setDirection(dir);
    setTrigger((prev) => prev + 1);
  };

  const swapView = useCallback(() => {
    setActivePage((prev) => (prev === "home" ? "about" : "home"));
  }, []);

  return (
    <div className="relative mx-5 flex h-[500px] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white dark:bg-neutral-950">
      <header className="flex w-full items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-rose-500" />
          <span className="font-medium tracking-tight text-neutral-900 dark:text-white">
            Studio
          </span>
        </div>
        <nav className="hidden gap-6 text-sm font-medium text-neutral-500 sm:flex">
          <button
            type="button"
            className="cursor-pointer hover:text-neutral-900 dark:hover:text-white"
          >
            Home
          </button>
          <button
            type="button"
            className="cursor-pointer hover:text-neutral-900 dark:hover:text-white"
          >
            Work
          </button>
          <button
            type="button"
            className="cursor-pointer hover:text-neutral-900 dark:hover:text-white"
          >
            About
          </button>
        </nav>
      </header>

      <div className="relative flex flex-1 flex-col items-center justify-center p-4 sm:p-8">
        <div className="grid w-full place-items-center">
          <div
            className={`col-start-1 row-start-1 flex flex-col items-center justify-center text-center transition-opacity duration-300 ${
              activePage === "home"
                ? "z-10 opacity-100"
                : "pointer-events-none opacity-0"
            }`}
          >
            <span className="mb-4 rounded-full bg-rose-100 px-3 py-1 text-xs font-medium text-rose-600 dark:bg-rose-900/30 dark:text-rose-400">
              New Feature
            </span>
            <h1 className="max-w-lg px-2 text-3xl leading-tight font-medium tracking-tight text-neutral-900 sm:text-4xl md:text-5xl dark:text-white">
              Click a direction below to trigger the transition.
            </h1>
          </div>

          <div
            className={`col-start-1 row-start-1 flex flex-col items-center justify-center text-center transition-opacity duration-300 ${
              activePage === "about"
                ? "z-10 opacity-100"
                : "pointer-events-none opacity-0"
            }`}
          >
            <div className="mb-6 grid grid-cols-2 gap-4">
              <div className="h-16 w-16 rounded-2xl bg-neutral-100 dark:bg-neutral-800" />
              <div className="h-16 w-16 rounded-2xl bg-neutral-100 dark:bg-neutral-800" />
            </div>
            <h1 className="max-w-lg px-2 text-2xl leading-tight font-medium tracking-tight text-neutral-900 sm:text-3xl md:text-4xl dark:text-white">
              Content swapped seamlessly mid-transition.
            </h1>
          </div>
        </div>

        <div className="mt-12 flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleTransition("vertical")}
            className="group flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-neutral-200 bg-white shadow-sm transition-all hover:scale-105 hover:bg-neutral-50 active:scale-95 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800"
            title="Vertical curtain transition (Splits horizontally, slides up and down)"
          >
            <ArrowUpDownIcon className="h-5 w-5 text-neutral-600 transition-transform group-hover:scale-110 dark:text-neutral-400" />
          </button>
          <button
            type="button"
            onClick={() => handleTransition("horizontal")}
            className="group flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-neutral-200 bg-white shadow-sm transition-all hover:scale-105 hover:bg-neutral-50 active:scale-95 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800"
            title="Horizontal curtain transition (Splits vertically, slides left and right)"
          >
            <ArrowLeftRightIcon className="h-5 w-5 text-neutral-600 transition-transform group-hover:scale-110 dark:text-neutral-400" />
          </button>
        </div>
      </div>

      {mounted && (
        <CurtainPageTransition
          trigger={trigger}
          onViewSwap={swapView}
          panelClassName="bg-rose-500 dark:bg-rose-600"
          direction={direction}
        />
      )}
    </div>
  );
}
