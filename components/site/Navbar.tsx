"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import posthog from "posthog-js";
import Container from "./Container";
import ThemeToggle from "./ThemeToggle";
import { GithubIcon, StarIcon } from "./Icons";

export function Navbar() {
  const [isHovered, setIsHovered] = useState(false);
  const [starCount, setStarCount] = useState<number | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchStarCount = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/repos/Saurabh-2607/GreatUI",
          { cache: "no-store" },
        );
        const data = await response.json();

        if (!mounted) return;
        if (data && typeof data.stargazers_count === "number") {
          setStarCount(data.stargazers_count);
        }
      } catch {
        if (mounted) {
          setStarCount(null);
        }
      }
    };

    fetchStarCount();
    const intervalId = window.setInterval(fetchStarCount, 60_000);

    return () => {
      mounted = false;
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-transparent transition-colors">
      <Container className="py-3">
        <div className="flex w-full items-center justify-between">
          <Link
            href="/"
            className="flex h-10 items-center gap-2.5 transition-opacity hover:opacity-90"
          >
            <img
              src="/Great-UI.png"
              alt="Great UI Logo"
              className="h-8 w-auto object-contain"
            />
            <span className="text-3xl font-bold tracking-tight text-neutral-900 uppercase sm:block dark:text-white">
              Great <span className="text-[#f6821f]">UI</span>
            </span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger Button */}
            <button
              onClick={() => {
                window.dispatchEvent(new CustomEvent("open-search-menu"));
                posthog.capture("search_trigger_clicked", {
                  location: "navbar",
                });
              }}
              className="group hover:text-neutral-955 relative flex h-10 w-10 cursor-pointer items-center justify-center gap-3 rounded-xl bg-neutral-100 px-0 text-neutral-700 shadow-xs transition-all hover:bg-neutral-200 sm:w-44 sm:justify-between sm:px-3 md:w-56 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white"
              aria-label="Open search dialog"
            >
              <div className="flex items-center gap-2">
                <svg
                  className="group-hover:text-neutral-955 h-4 w-4 text-neutral-500 dark:text-neutral-400 dark:group-hover:text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <span className="hidden text-sm font-medium sm:inline">
                  Search...
                </span>
              </div>
              <kbd className="group-hover:bg-neutral-350/60 hidden rounded-md bg-neutral-200/50 px-1.5 py-0.5 text-[10px] font-bold text-neutral-500 sm:block dark:bg-neutral-950/50 dark:text-neutral-400 dark:group-hover:bg-neutral-950/80">
                ⌘K
              </kbd>
            </button>

            <a
              href="https://github.com/Saurabh-2607/GreatUI"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub repository"
              onClick={() =>
                posthog.capture("github_link_clicked", { location: "navbar" })
              }
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="group relative inline-flex h-10 cursor-pointer items-center justify-center rounded-xl bg-neutral-100 text-neutral-700 shadow-xs transition-all hover:bg-neutral-200 hover:text-neutral-950 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white"
              style={{ perspective: "1000px" }}
            >
              <div className="flex items-center gap-2 px-3 py-2">
                <div
                  className="relative h-5 w-5 transition-transform duration-500"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: isHovered ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                >
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                  >
                    <GithubIcon className="h-5 w-5" />
                  </div>
                  <div
                    className="absolute inset-0 flex items-center justify-center text-amber-500"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <StarIcon className="h-5 w-5" />
                  </div>
                </div>
                {starCount !== null ? (
                  <span className="hidden text-xl font-medium text-neutral-800 sm:inline dark:text-neutral-200">
                    {starCount.toLocaleString()}
                  </span>
                ) : (
                  <span className="hidden text-sm font-medium text-neutral-800 sm:inline dark:text-neutral-200">
                    Star
                  </span>
                )}
              </div>
            </a>

            <ThemeToggle className="dark:!hover:text-white !h-10 !w-10 !rounded-xl !border-0 !bg-neutral-100 !text-neutral-700 shadow-xs hover:!bg-neutral-200 hover:!text-neutral-950 dark:!border-0 dark:!bg-neutral-900 dark:!text-neutral-300 dark:hover:!bg-neutral-800 [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-neutral-700 dark:[&>svg]:text-neutral-300" />
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
