"use client";

import { useState } from "react";
import Link from "next/link";
import posthog from "posthog-js";
import Container from "./Container";
import ThemeToggle from "./ThemeToggle";
import { HugeiconsIcon } from "@hugeicons/react";
import { GithubIcon, StarIcon } from "@hugeicons/core-free-icons";

export function Navbar() {
  const [isHovered, setIsHovered] = useState(false);

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
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="group relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-950 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white"
              style={{ perspective: "1000px" }}
            >
              <div
                className="relative h-4 w-4 transition-transform duration-500"
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
                  <HugeiconsIcon icon={GithubIcon} className="h-4 w-4" />
                </div>
                <div
                  className="absolute inset-0 flex items-center justify-center text-amber-500"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <HugeiconsIcon icon={StarIcon} className="h-4 w-4" />
                </div>
              </div>
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
