"use client";

import Link from "next/link";
import posthog from "posthog-js";
import Container from "./Container";
import ThemeToggle from "./ThemeToggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-transparent transition-colors">
      <Container className="py-3">
        <div className="flex w-full items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2.5 transition-opacity hover:opacity-90"
          >
            <img
              src="/Great-UI.png"
              alt="Great UI Logo"
              className="h-6 w-auto object-contain"
            />
            <span className="text-xl font-bold tracking-tight text-neutral-900 uppercase sm:block dark:text-white">
              Great <span className="text-[#f6821f]">UI</span>
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="https://github.com/Saurabh-2607/GreatUI"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub repository"
              onClick={() =>
                posthog.capture("github_link_clicked", { location: "navbar" })
              }
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-950 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white"
            >
              <svg
                className="h-4 w-4 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
            </a>

            <ThemeToggle />
          </div>
        </div>
      </Container>
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
