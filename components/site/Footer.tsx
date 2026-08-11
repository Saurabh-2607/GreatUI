"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Container from "./Container";

export function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let frameId: number;
    let latestX = -999;
    let latestY = -999;

    const updateStyle = () => {
      container.style.setProperty("--mouse-x", `${latestX}px`);
      container.style.setProperty("--mouse-y", `${latestY}px`);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      latestX = e.clientX - rect.left;
      latestY = e.clientY - rect.top;
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(updateStyle);
    };

    const handleMouseLeave = () => {
      latestX = -999;
      latestY = -999;
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(updateStyle);
    };

    container.addEventListener("mousemove", handleMouseMove, { passive: true });
    container.addEventListener("mouseleave", handleMouseLeave, {
      passive: true,
    });

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <footer className="relative z-10 mx-auto w-full max-w-[1360px] overflow-hidden bg-transparent transition-colors">
      <Container className="relative bg-white px-4 pt-16 pb-56 sm:px-6 dark:bg-neutral-950">
        <div className="relative z-10 text-center select-none">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-neutral-500 sm:gap-x-6 sm:gap-y-3 sm:text-base dark:text-neutral-400">
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
              href="/changelog"
              className="transition-colors hover:text-neutral-900 dark:hover:text-white"
            >
              Changelog
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
        ref={containerRef}
        className="group absolute right-0 bottom-0 left-0 z-0 translate-y-[35%] cursor-default select-none"
      >
        <div className="text-center text-[18vw] leading-none font-black tracking-tighter text-neutral-100 uppercase sm:text-[20vw] md:text-[22vw] lg:text-[300px] dark:text-neutral-900/30">
          GREAT <span className="text-[#f6821f]/85">UI</span>
        </div>

        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-50"
          style={{
            maskImage: `radial-gradient(circle 200px at var(--mouse-x, -999px) var(--mouse-y, -999px), black 0%, black 30%, transparent 100%)`,
            WebkitMaskImage: `radial-gradient(circle 200px at var(--mouse-x, -999px) var(--mouse-y, -999px), black 0%, black 30%, transparent 100%)`,
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            willChange: "transform",
            transform: "translateZ(0)",
            backfaceVisibility: "hidden",
          }}
        >
          <div
            className="text-center text-[18vw] leading-none font-black tracking-tighter text-transparent uppercase select-none sm:text-[20vw] md:text-[22vw] lg:text-[300px]"
            style={{
              backgroundImage: `repeating-linear-gradient(-45deg, #f6821f 0, #f6821f 1.5px, transparent 1.5px, transparent 10px)`,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
          >
            GREAT <span style={{ visibility: "hidden" }}>UI</span>
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-50"
          style={{
            maskImage: `radial-gradient(circle 200px at var(--mouse-x, -999px) var(--mouse-y, -999px), black 0%, black 30%, transparent 100%)`,
            WebkitMaskImage: `radial-gradient(circle 200px at var(--mouse-x, -999px) var(--mouse-y, -999px), black 0%, black 30%, transparent 100%)`,
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            willChange: "transform",
            transform: "translateZ(0)",
            backfaceVisibility: "hidden",
          }}
        >
          <div
            className="text-center text-[18vw] leading-none font-black tracking-tighter text-transparent uppercase select-none sm:text-[20vw] md:text-[22vw] lg:text-[300px]"
            style={{
              backgroundImage: `repeating-linear-gradient(-45deg, var(--foreground) 0, var(--foreground) 1.5px, transparent 1.5px, transparent 10px)`,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
          >
            <span style={{ visibility: "hidden" }}>GREAT </span>UI
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
