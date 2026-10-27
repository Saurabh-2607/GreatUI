"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import posthog from "posthog-js";
import { motion, AnimatePresence } from "motion/react";
import { TextMorph } from "torph/react";
import Container from "./Container";
import ThemeToggle from "./ThemeToggle";
import { GithubIcon, StarIcon } from "./Icons";

export function Navbar({ starCount = null }: { starCount?: number | null }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-transparent transition-colors">
      <Container className="py-3">
        <div className="relative flex w-full items-center justify-between">
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex h-10 items-center gap-2.5 transition-opacity hover:opacity-90"
          >
            <img
              src="/Great-UI.png"
              alt="Great UI Logo"
              className="h-8 w-auto object-contain"
            />
            <span className="font-tt text-3xl font-bold tracking-tight text-neutral-900 uppercase sm:block dark:text-white">
              Great <span className="text-[#f6821f]">UI</span>
            </span>
          </Link>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 text-lg font-medium md:flex">
            <Link
              href="/components"
              onClick={() =>
                posthog.capture("nav_components_clicked", {
                  location: "navbar",
                })
              }
              className="text-neutral-600 transition-colors hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white"
            >
              Components
            </Link>
            <Link
              href="/sponsors"
              onClick={() =>
                posthog.capture("nav_sponsors_clicked", { location: "navbar" })
              }
              className="text-neutral-600 transition-colors hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white"
            >
              Sponsors
            </Link>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => {
                window.dispatchEvent(new CustomEvent("open-search-menu"));
                posthog.capture("search_trigger_clicked", {
                  location: "navbar",
                });
              }}
              className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-neutral-100 text-neutral-700 shadow-xs transition-all hover:bg-neutral-200 hover:text-neutral-950 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white"
              aria-label="Open search dialog"
            >
              <svg
                className="h-4 w-4 text-neutral-600 dark:text-neutral-300"
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
                <TextMorph
                  as="span"
                  className="hidden text-sm font-medium text-neutral-800 sm:inline dark:text-neutral-200"
                >
                  {starCount !== null
                    ? starCount >= 1000000
                      ? (starCount / 1000000).toFixed(1) + "M"
                      : starCount >= 1000
                        ? (starCount / 1000).toFixed(1) + "K"
                        : String(starCount)
                    : "Star"}
                </TextMorph>
              </div>
            </a>

            <ThemeToggle className="dark:!hover:text-white !h-10 !w-10 !rounded-xl !border-0 !bg-neutral-100 !text-neutral-700 shadow-xs hover:!bg-neutral-200 hover:!text-neutral-950 dark:!border-0 dark:!bg-neutral-900 dark:!text-neutral-300 dark:hover:!bg-neutral-800 [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-neutral-700 dark:[&>svg]:text-neutral-300" />

            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-neutral-100 text-neutral-700 shadow-xs transition-all hover:bg-neutral-200 hover:text-neutral-950 md:hidden dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute top-full right-4 left-4 z-50 mt-1 rounded-3xl bg-neutral-100/95 p-3 shadow-2xl backdrop-blur-xl md:hidden dark:bg-neutral-900/95 dark:shadow-black/60"
            >
              <nav className="flex flex-col gap-1">
                <Link
                  href="/components"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    posthog.capture("nav_components_clicked", {
                      location: "mobile_navbar",
                    });
                  }}
                  className="flex items-center justify-between rounded-2xl px-4 py-2.5 text-lg font-medium text-neutral-800 transition-colors hover:bg-neutral-200/70 dark:text-neutral-200 dark:hover:bg-neutral-800/70"
                >
                  <span>Components</span>
                  <svg
                    className="h-4 w-4 text-neutral-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
                <Link
                  href="/sponsors"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    posthog.capture("nav_sponsors_clicked", {
                      location: "mobile_navbar",
                    });
                  }}
                  className="flex items-center justify-between rounded-2xl px-4 py-2.5 text-lg font-medium text-neutral-800 transition-colors hover:bg-neutral-200/70 dark:text-neutral-200 dark:hover:bg-neutral-800/70"
                >
                  <span>Sponsors</span>
                  <svg
                    className="h-4 w-4 text-neutral-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
                <Link
                  href="/changelog"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between rounded-2xl px-4 py-2.5 text-lg font-medium text-neutral-800 transition-colors hover:bg-neutral-200/70 dark:text-neutral-200 dark:hover:bg-neutral-800/70"
                >
                  <span>Changelog</span>
                  <svg
                    className="h-4 w-4 text-neutral-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </header>
  );
}

export default Navbar;
