"use client";

import React from "react";
import Link from "next/link";
import { IconSearch, IconBrandGithub } from "@tabler/icons-react";
import Container from "./Container";
import ThemeToggle from "./ThemeToggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-transparent transition-colors">
      <Container className="py-3">
        <div className="flex w-full items-center justify-between">
          {/* Logo Text & Image */}
          <Link
            href="/"
            className="flex items-center gap-2.5 transition-opacity hover:opacity-90"
          >
            <span className="text-3xl uppercase font-bold tracking-tight text-neutral-900 dark:text-white">
              Great <span className="text-[#f6821f]">UI</span>
            </span>
          </Link>

          {/* Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Pill */}
            <button
              aria-label="Search documentation"
              className="inline-flex h-9 items-center gap-2 rounded-full border border-neutral-300 dark:border-neutral-800 bg-neutral-100/80 dark:bg-neutral-900 px-3 text-xs font-medium text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              <IconSearch className="h-4 w-4" />
              <span className="hidden sm:inline">Search...</span>
              <kbd className="hidden sm:inline-block rounded bg-neutral-200 dark:bg-neutral-800 px-1.5 py-0.5 text-[10px] font-mono text-neutral-500 dark:text-neutral-400">
                ⌘K
              </kbd>
            </button>

            {/* GitHub Icon Link */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub repository"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-950 dark:hover:text-white"
            >
              <IconBrandGithub className="h-4 w-4" />
            </a>

            {/* Theme Toggle Button */}
            <ThemeToggle />
          </div>
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
    </header>
  );
}

export default Navbar;
