"use client";

import React from "react";
import Container from "./Container";

export function AnnouncementBanner() {
  return (
    <div className="relative w-full bg-gradient-to-r from-white via-neutral-50 to-white transition-colors dark:from-[#0a0a0a] dark:via-neutral-900/30 dark:to-[#0a0a0a]">
      <Container className="py-4">
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
      </Container>
      {/* Horizontal Dashed Bottom Border */}
      <div
        className="pointer-events-none absolute right-0 bottom-0 left-0 z-20 h-px select-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-border-100) 50%, transparent 50%)",
          backgroundSize: "32px 1px",
          backgroundRepeat: "repeat-x",
        }}
      />
    </div>
  );
}

export default AnnouncementBanner;
