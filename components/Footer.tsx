"use client";

import React from "react";
import Link from "next/link";
import Container from "./Container";

export function Footer() {
  return (
    <footer className="relative z-10 w-full bg-transparent transition-colors">
      <Container className="py-8">
        <div className="text-center select-none">
          <div className="text-6xl leading-none font-black tracking-tighter text-neutral-300 uppercase sm:text-8xl md:text-[140px] dark:text-neutral-800">
            GREAT <span className="text-[#f6821f]">UI</span>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-neutral-500 dark:text-neutral-400">
            <span>
              © {new Date().getFullYear()} Great{" "}
              <span className="text-[#f6821f]">UI</span>. Built for developers
              with taste.
            </span>
            <span className="text-neutral-300 dark:text-neutral-700/80">·</span>
            <Link
              href="/logo"
              className="transition-colors hover:text-neutral-900 dark:hover:text-white"
            >
              Logo
            </Link>
            <span className="text-neutral-300 dark:text-neutral-700/80">·</span>
            <Link
              href="/sitemap.xml"
              className="transition-colors hover:text-neutral-900 dark:hover:text-white"
            >
              Sitemap
            </Link>
            <span className="text-neutral-300 dark:text-neutral-700/80">·</span>
            <Link
              href="/robots.txt"
              className="transition-colors hover:text-neutral-900 dark:hover:text-white"
            >
              Robots.txt
            </Link>
          </div>
        </div>
      </Container>
      <div
        className="pointer-events-none absolute top-0 right-0 left-0 z-20 h-px select-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-border-100) 50%, transparent 50%)",
          backgroundSize: "32px 1px",
          backgroundRepeat: "repeat-x",
        }}
      />
      <div
        className="pointer-events-none absolute right-0 bottom-0 left-0 z-20 h-px select-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-border-100) 50%, transparent 50%)",
          backgroundSize: "32px 1px",
          backgroundRepeat: "repeat-x",
        }}
      />
    </footer>
  );
}

export default Footer;
