"use client";

import Link from "next/link";
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
            <span className="text-3xl font-bold tracking-tight text-neutral-900 uppercase dark:text-white">
              Great <span className="text-[#f6821f]">UI</span>
            </span>
          </Link>

          {/* Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Pill */}
            {/* <button
              aria-label="Search documentation"
              className="inline-flex h-9 items-center gap-2 rounded-full border border-neutral-300 dark:border-neutral-800 bg-neutral-100/80 dark:bg-neutral-900 px-3 text-xs font-medium text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              <IconSearch className="h-4 w-4" />
              <span className="hidden sm:inline">Search...</span>
              <kbd className="hidden sm:inline-block rounded bg-neutral-200 dark:bg-neutral-800 px-1.5 py-0.5 text-[10px] font-mono text-neutral-500 dark:text-neutral-400">
                ⌘K
              </kbd>
            </button> */}

            {/* GitHub Icon Link */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub repository"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-950 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white"
            >
              Github
            </a>

            {/* Theme Toggle Button */}
            <ThemeToggle />
          </div>
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
    </header>
  );
}

export default Navbar;
