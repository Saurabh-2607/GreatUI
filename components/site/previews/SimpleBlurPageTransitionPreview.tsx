"use client";

import React, { useState, useEffect, useCallback } from "react";
import SimpleBlurPageTransition from "../../ui/SimpleBlurPageTransition";

export default function SimpleBlurPageTransitionPreview() {
  const [trigger, setTrigger] = useState(0);
  const [activePage, setActivePage] = useState<"home" | "about">("home");
  const [mounted, setMounted] = useState(false);
  const [duration, setDuration] = useState(0.6);
  const [maxBlur, setMaxBlur] = useState(20);

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
      <header className="flex w-full items-center justify-between px-6 py-4 border-b border-neutral-100 dark:border-neutral-900">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-[#f6821f]" />
          <span className="font-medium tracking-tight text-neutral-900 dark:text-white">
            BlurStudio
          </span>
        </div>
        <div className="flex gap-4 text-xs font-semibold text-neutral-500">
          <button
            type="button"
            onClick={() => handleTransition()}
            className="cursor-pointer rounded-lg bg-neutral-100 px-3 py-1.5 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-300"
          >
            Switch View
          </button>
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
            <span className="text-xs font-bold uppercase tracking-widest text-[#f6821f] dark:text-[#ff9d42]">
              Home Page
            </span>
            <h3 className="mt-2 text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
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
            <span className="text-xs font-bold uppercase tracking-widest text-[#f6821f] dark:text-[#ff9d42]">
              About Page
            </span>
            <h3 className="mt-2 text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
              Creative Studio
            </h3>
            <p className="mt-4 max-w-md text-sm text-neutral-500 dark:text-neutral-400">
              Ideal for portfolios, photography showcases, or minimal interfaces
              where sharp cuts feel too aggressive.
            </p>
          </div>
        </div>

        {/* Configuration Overlay Panel */}
        <div className="absolute bottom-6 flex flex-wrap gap-4 rounded-xl bg-neutral-100/80 p-3 backdrop-blur-md dark:bg-neutral-900/80">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-neutral-500 uppercase">
              Duration:
            </span>
            <select
              value={duration}
              onChange={(e) => setDuration(parseFloat(e.target.value))}
              className="rounded bg-white px-2 py-0.5 text-xs text-neutral-950 dark:bg-neutral-850 dark:text-white border-none"
            >
              <option value="0.3">0.3s (Fast)</option>
              <option value="0.6">0.6s (Normal)</option>
              <option value="1.2">1.2s (Slow)</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-neutral-500 uppercase">
              Max Blur:
            </span>
            <select
              value={maxBlur}
              onChange={(e) => setMaxBlur(parseInt(e.target.value))}
              className="rounded bg-white px-2 py-0.5 text-xs text-neutral-950 dark:bg-neutral-850 dark:text-white border-none"
            >
              <option value="8">8px</option>
              <option value="20">20px</option>
              <option value="40">40px</option>
            </select>
          </div>
        </div>
      </div>

      {mounted && (
        <SimpleBlurPageTransition
          trigger={trigger}
          onViewSwap={swapView}
          duration={duration}
          maxBlur={maxBlur}
        />
      )}
    </div>
  );
}
