"use client";

import React from "react";
import Link from "next/link";
import Container from "./Container";
import Button from "./Button";

export function Footer() {
  return (
    <footer className="relative w-full bg-transparent transition-colors z-10">
      <Container className="py-8">
        {/* Large Watermark Text */}
        <div className="select-none text-center">
          <div className="text-6xl font-black tracking-tighter text-neutral-200 dark:text-neutral-800/60 sm:text-8xl md:text-[140px] leading-none uppercase">
            GREAT <span className="text-[#f6821f]">UI</span>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-neutral-500 dark:text-neutral-400">
            <span>© {new Date().getFullYear()} Great <span className="text-[#f6821f]">UI</span>. Built for developers with taste.</span>
            <span className="text-neutral-300 dark:text-neutral-700/80">·</span>
            <Link href="/sitemap.xml" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
              Sitemap
            </Link>
            <span className="text-neutral-300 dark:text-neutral-700/80">·</span>
            <Link href="/robots.txt" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
              Robots.txt
            </Link>
          </div>
        </div>
      </Container>
      {/* Horizontal Dashed Top Border */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none select-none z-20"
        style={{
          backgroundImage: "linear-gradient(to right, var(--color-border-100) 50%, transparent 50%)",
          backgroundSize: "32px 1px",
          backgroundRepeat: "repeat-x",
        }}
      />
      {/* Horizontal Dashed Bottom Border */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none select-none z-20"
        style={{
          backgroundImage: "linear-gradient(to right, var(--color-border-100) 50%, transparent 50%)",
          backgroundSize: "32px 1px",
          backgroundRepeat: "repeat-x",
        }}
      />
    </footer>
  );
}

export default Footer;
