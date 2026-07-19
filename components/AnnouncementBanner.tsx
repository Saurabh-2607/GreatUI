"use client";

import React from "react";
import Container from "./Container";

export function AnnouncementBanner() {
  return (
    <div className="relative w-full bg-gradient-to-r from-white via-neutral-50 to-white dark:from-[#0a0a0a] dark:via-neutral-900/30 dark:to-[#0a0a0a] transition-colors">
      <Container className="py-4">
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 text-center w-full text-xs sm:text-sm md:text-base font-semibold text-neutral-800 dark:text-neutral-200">
          <span>
            Launching <span className="font-extrabold text-neutral-950 dark:text-white">v1</span> on{" "}
            <span className="text-[#f6821f] font-bold">July 26</span>. Get ready for production-grade React components.
          </span>
        </div>
      </Container>
      {/* Horizontal Dashed Bottom Border */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none select-none z-20"
        style={{
          backgroundImage: "linear-gradient(to right, var(--color-border-100) 50%, transparent 50%)",
          backgroundSize: "32px 1px",
          backgroundRepeat: "repeat-x",
        }}
      />
    </div>
  );
}

export default AnnouncementBanner;
