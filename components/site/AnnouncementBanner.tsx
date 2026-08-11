"use client";

import React from "react";
import Container from "./Container";

export function AnnouncementBanner() {
  return (
    <div className="relative w-full bg-gradient-to-r from-white via-neutral-50 to-white transition-colors dark:from-[#0a0a0a] dark:via-neutral-900/30 dark:to-[#0a0a0a]">
      <Container className="bg-white px-4 py-4 sm:px-6 dark:bg-neutral-950">
        <div className="flex w-full flex-wrap items-center justify-center gap-2.5 text-center text-xs font-semibold text-neutral-800 sm:gap-3.5 sm:text-sm md:text-base dark:text-neutral-200">
          <span>
            Launching{" "}
            <span className="font-extrabold text-neutral-950 dark:text-white">
              v1
            </span>{" "}
            on <span className="font-bold text-[#f6821f]">July 26</span>. Get
            ready for production-grade React components.
          </span>
        </div>
        <div
          className="pointer-events-none absolute -right-4 -bottom-4 -left-4 z-20 h-px select-none sm:-right-6 sm:-left-6"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--color-border-100) 50%, transparent 50%)",
            backgroundSize: "32px 1px",
            backgroundRepeat: "repeat-x",
          }}
        />
      </Container>
    </div>
  );
}

export default AnnouncementBanner;
