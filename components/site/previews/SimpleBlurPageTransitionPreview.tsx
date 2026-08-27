"use client";

import React, { useState, useEffect, useCallback } from "react";
import SimpleBlurPageTransition from "../../ui/SimpleBlurPageTransition";

const RefreshCwIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
    <path d="M16 3h5v5" />
    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
    <path d="M8 21H3v-5" />
  </svg>
);

export default function SimpleBlurPageTransitionPreview() {
  const [trigger, setTrigger] = useState(0);
  const [activePage, setActivePage] = useState<"home" | "about">("home");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 0);
  }, []);

  const handleTransition = () => {
    setTrigger((prev) => prev + 1);
  };

  const swapView = useCallback(() => {
    setActivePage((prev) => (prev === "home" ? "about" : "home"));
  }, []);

  return (
    <div className="relative mx-5 flex h-[500px] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white dark:bg-neutral-950">
      <header className="flex w-full items-center justify-between border-b border-neutral-100 px-6 py-4 dark:border-neutral-900">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-[#f6821f]" />
          <span className="font-medium tracking-tight text-neutral-900 dark:text-white">
            BlurStudio
          </span>
        </div>
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
            <span className="text-xs font-bold tracking-widest text-[#f6821f] uppercase dark:text-[#ff9d42]">
              Home Page
            </span>
            <h3 className="mt-2 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
              Clean &amp; Minimal
            </h3>
            <p className="mt-4 max-w-md text-sm text-neutral-500 dark:text-neutral-400">
              A layout utilizing soft filters and cross-fading blurs to create a
              gentle transition between pages.
            </p>
          </div>

          <div
            className={`col-start-1 row-start-1 flex flex-col items-center justify-center text-center transition-opacity duration-300 ${
              activePage === "about"
                ? "z-10 opacity-100"
                : "pointer-events-none opacity-0"
            }`}
          >
            <span className="text-xs font-bold tracking-widest text-[#f6821f] uppercase dark:text-[#ff9d42]">
              About Page
            </span>
            <h3 className="mt-2 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
              Creative Studio
            </h3>
            <p className="mt-4 max-w-md text-sm text-neutral-500 dark:text-neutral-400">
              Ideal for portfolios, photography showcases, or minimal interfaces
              where sharp cuts feel too aggressive.
            </p>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-center">
          <button
            type="button"
            onClick={handleTransition}
            className="group flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-neutral-200 bg-white shadow-sm transition-all hover:scale-105 hover:bg-neutral-50 active:scale-95 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800"
            title="Trigger transition"
          >
            <RefreshCwIcon className="h-5 w-5 text-neutral-600 transition-transform group-hover:scale-110 dark:text-neutral-400" />
          </button>
        </div>
      </div>

      {mounted && (
        <SimpleBlurPageTransition trigger={trigger} onViewSwap={swapView} />
      )}
    </div>
  );
}
