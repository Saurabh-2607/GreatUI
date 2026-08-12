"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Container from "./Container";

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    const watermark = watermarkRef.current;
    if (!footer || !watermark) return;

    let frameId: number;
    let latestX = -999;
    let latestY = -999;

    const updateStyle = () => {
      watermark.style.setProperty("--mouse-x", `${latestX}px`);
      watermark.style.setProperty("--mouse-y", `${latestY}px`);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = watermark.getBoundingClientRect();
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

    footer.addEventListener("mousemove", handleMouseMove, { passive: true });
    footer.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    return () => {
      footer.removeEventListener("mousemove", handleMouseMove);
      footer.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className="group relative z-10 mx-auto w-full max-w-[1360px] overflow-hidden bg-transparent transition-colors"
    >
      <div
        className="pointer-events-none absolute top-0 right-0 left-0 z-20 h-px select-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-border-100) 50%, transparent 50%)",
          backgroundSize: "32px 1px",
          backgroundRepeat: "repeat-x",
        }}
      />
      <div className="absolute inset-y-0 left-1/2 z-0 w-[calc(100%-2rem)] max-w-[1280px] -translate-x-1/2 overflow-hidden bg-white sm:w-[calc(100%-3rem)] md:w-[calc(100%-4rem)] lg:w-[calc(100%-6rem)] xl:w-full dark:bg-neutral-950">
        <div className="pointer-events-none absolute right-0 bottom-0 left-0 z-0 translate-y-[35%] select-none">
          <div className="text-center text-[18vw] leading-none font-black tracking-tighter text-neutral-100 uppercase sm:text-[20vw] md:text-[22vw] lg:text-[300px] dark:text-neutral-900/30">
            GREAT <span className="text-[#f6821f]/85">UI</span>
          </div>
        </div>

        <div
          ref={watermarkRef}
          className="pointer-events-none absolute right-0 bottom-0 left-0 z-0 translate-y-[35%] opacity-0 transition-opacity duration-300 select-none group-hover:opacity-20"
          style={{
            maskImage: `radial-gradient(circle 160px at var(--mouse-x, -999px) var(--mouse-y, -999px), black 0%, black 30%, transparent 100%)`,
            WebkitMaskImage: `radial-gradient(circle 160px at var(--mouse-x, -999px) var(--mouse-y, -999px), black 0%, black 30%, transparent 100%)`,
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
          }}
        >
          <div className="w-full text-center text-[18vw] leading-none font-black tracking-tighter text-neutral-900 uppercase sm:text-[20vw] md:text-[22vw] lg:text-[300px] dark:text-white">
            <span
              className="text-transparent"
              style={{
                backgroundImage: `repeating-linear-gradient(-45deg, #f6821f 0, #f6821f 1.5px, transparent 1.5px, transparent 10px)`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              GREAT{" "}
            </span>
            <span
              className="text-transparent"
              style={{
                backgroundImage: `repeating-linear-gradient(-45deg, #fff 0, #fff 1.5px, transparent 1.5px, transparent 10px)`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              UI
            </span>
          </div>
        </div>
      </div>

      <Container className="relative px-4 pt-16 pb-24 sm:px-6 sm:pb-32 md:pb-40 lg:pb-56">
        <div className="relative z-10 text-center select-none">
          <div className="flex flex-col items-center justify-center gap-y-3 md:gap-y-4">
            <div className="flex items-center gap-x-6 text-lg font-medium text-neutral-900 sm:text-xl dark:text-white">
              <Link
                href="/components"
                className="transition-colors hover:text-[#f6821f] dark:hover:text-[#f6821f]"
              >
                Components
              </Link>
              <Link
                href="/changelog"
                className="transition-colors hover:text-[#f6821f] dark:hover:text-[#f6821f]"
              >
                Changelog
              </Link>
            </div>

            <div className="flex flex-col items-center gap-y-2 md:flex-row md:gap-x-6">
              <div className="text-base text-neutral-500 dark:text-neutral-400">
                © {new Date().getFullYear()} Great{" "}
                <span className="text-[#f6821f]">UI</span>. Built for developers
                with taste.
              </div>

              <div className="flex items-center gap-x-4 text-sm text-neutral-400 sm:text-base dark:text-neutral-500">
                <Link
                  href="/logo"
                  className="transition-colors hover:text-neutral-900 dark:hover:text-white"
                >
                  Logo
                </Link>
                <span className="text-neutral-300 dark:text-neutral-700/80">
                  ·
                </span>
                <Link
                  href="/sitemap.xml"
                  className="transition-colors hover:text-neutral-900 dark:hover:text-white"
                >
                  Sitemap
                </Link>
                <span className="text-neutral-300 dark:text-neutral-700/80">
                  ·
                </span>
                <Link
                  href="/robots.txt"
                  className="transition-colors hover:text-neutral-900 dark:hover:text-white"
                >
                  Robots.txt
                </Link>
              </div>
            </div>

            <div className="text-sm text-neutral-500 dark:text-neutral-400">
              Made by{" "}
              <a
                href="https://srh.site"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium transition-colors hover:text-neutral-900 dark:hover:text-white"
              >
                Saurabh Sharma
              </a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
