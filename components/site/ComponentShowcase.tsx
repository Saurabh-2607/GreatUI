"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Container from "./Container";
import { cn } from "@/lib/utils";
import { ViewerProvider } from "@/lib/viewer-context";
import Link from "next/link";

interface ShowcaseItem {
  id: string;
  title: string;
  videoLink: string;
  icon: React.ReactNode;
}

const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: "staggered-page-transition",
    title: "Staggered Page Transition",
    videoLink:
      "https://ik.imagekit.io/zoffdbb7mk/staggering-page-transition.mp4",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4"
      >
        <line x1="4" y1="12" x2="20" y2="12" />
        <line x1="4" y1="6" x2="16" y2="6" />
        <line x1="4" y1="18" x2="24" y2="18" />
      </svg>
    ),
  },
  {
    id: "multilingual-quote",
    title: "Multilingual Quote",
    videoLink: "https://ik.imagekit.io/zoffdbb7mk/quote-multilingual.mp4",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-4"
      >
        <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.956.76-3.022.66-1.065 1.515-1.867 2.558-2.403L9.373 5c-.8.396-1.56.898-2.26 1.505-.71.607-1.34 1.305-1.9 2.094s-.98 1.68-1.25 2.69-.346 2.04-.217 3.1c.168 1.4.62 2.52 1.356 3.35.735.84 1.652 1.26 2.748 1.26.965 0 1.766-.29 2.4-.878.628-.576.94-1.39.94-2.44zM22.758 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.956.76-3.022.66-1.065 1.515-1.867 2.558-2.403L20.939 5c-.8.396-1.56.898-2.26 1.505-.71.607-1.34 1.305-1.9 2.094s-.98 1.68-1.25 2.69-.346 2.04-.217 3.1c.168 1.4.62 2.52 1.356 3.35.735.84 1.652 1.26 2.748 1.26.965 0 1.766-.29 2.4-.878.628-.576.94-1.39.94-2.44z" />
      </svg>
    ),
  },
  {
    id: "text-on-path-scroll",
    title: "Text on Path Scroll",
    videoLink: "https://ik.imagekit.io/zoffdbb7mk/textscroll.mp4",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-4"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 7h2v6h-2zm0 8h2v2h-2z" />
      </svg>
    ),
  },
  {
    id: "pixel-to-ascii-image",
    title: "Pixel to ASCII",
    videoLink: "https://ik.imagekit.io/zoffdbb7mk/pixel-to-ascii.mp4",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-4"
      >
        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
      </svg>
    ),
  },
  {
    id: "scrambled-install-command",
    title: "Scrambled Install Command",
    videoLink:
      "https://ik.imagekit.io/zoffdbb7mk/command-copy-scramble-text.mp4",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4"
      >
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" y1="19" x2="20" y2="19" />
      </svg>
    ),
  },
  {
    id: "accordion",
    title: "Accordion",
    videoLink: "https://ik.imagekit.io/greatui/accordian.mp4",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-4"
      >
        <path d="M19 8H5c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2zm0 6H5v-4h14v4zM5 2h14c1.1 0 2 .9 2 2v2H3V4c0-1.1.9-2 2-2zm14 18H5c-1.1 0-2-.9-2-2v-2h18v2c0 1.1-.9 2-2 2z" />
      </svg>
    ),
  },
  {
    id: "floating-menu",
    title: "Floating Menu",
    videoLink: "https://ik.imagekit.io/greatui/floatingmenu.mp4",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="16" />
        <line x1="8" y1="12" x2="16" y2="12" />
      </svg>
    ),
  },
];

export function ComponentShowcase() {
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const duration = 6000;
  const startTimeRef = useRef<number>(0);
  const elapsedTimeRef = useRef<number>(0);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isHovered) {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = null;
      }
      elapsedTimeRef.current += Date.now() - startTimeRef.current;
    } else {
      const remaining = Math.max(0, duration - elapsedTimeRef.current);
      startTimeRef.current = Date.now();

      timeoutIdRef.current = setTimeout(() => {
        elapsedTimeRef.current = 0;
        setActiveTabIdx((prev) => (prev + 1) % SHOWCASE_ITEMS.length);
      }, remaining);
    }

    return () => {
      if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
    };
  }, [isHovered, activeTabIdx]);

  const handleTabClick = (idx: number) => {
    elapsedTimeRef.current = 0;
    setActiveTabIdx(idx);
  };

  const activeTab = SHOWCASE_ITEMS[activeTabIdx] || SHOWCASE_ITEMS[0];

  return (
    <ViewerProvider>
      <div className="relative mx-auto max-w-[1360px]">
        <style>{`
          @keyframes showcase-progress {
            from { width: 0%; }
            to { width: 100%; }
          }
        `}</style>
        <Container className="bg-white dark:bg-neutral-950">
          <div className="flex items-center justify-center">
            <div className="flex [scrollbar-width:none] items-stretch gap-0 overflow-x-auto [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {SHOWCASE_ITEMS.map((tab, idx) => {
                const isActive = idx === activeTabIdx;
                return (
                  <React.Fragment key={tab.id}>
                    <div
                      className="w-px shrink-0 self-stretch select-none"
                      style={{
                        backgroundImage:
                          "linear-gradient(to bottom, var(--color-border-100) 50%, transparent 50%)",
                        backgroundSize: "1px 16px",
                        backgroundRepeat: "repeat-y",
                      }}
                    />
                    <button
                      onClick={() => handleTabClick(idx)}
                      className={cn(
                        "relative z-10 flex shrink-0 items-center justify-center gap-1.5 px-3.5 py-2 text-sm font-medium transition-colors select-none sm:text-base",
                        isActive
                          ? "text-neutral-900 dark:text-white"
                          : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white",
                      )}
                    >
                      <span
                        className={cn(
                          "transition-colors",
                          isActive
                            ? "text-neutral-900 dark:text-white"
                            : "text-neutral-500 dark:text-neutral-400",
                        )}
                      >
                        {tab.icon}
                      </span>
                      <span>{tab.title}</span>

                      {isActive && (
                        <>
                          <div className="absolute right-0 bottom-0 left-0 h-[2px] bg-neutral-100 dark:bg-neutral-900" />
                          <div
                            key={activeTabIdx}
                            className="absolute bottom-0 left-0 z-20 h-[2px] bg-[#f6821f]"
                            style={{
                              animation: "showcase-progress 6s linear forwards",
                              animationPlayState: isHovered
                                ? "paused"
                                : "running",
                            }}
                          />
                        </>
                      )}
                    </button>
                    {idx === SHOWCASE_ITEMS.length - 1 && (
                      <div
                        className="w-px shrink-0 self-stretch select-none"
                        style={{
                          backgroundImage:
                            "linear-gradient(to bottom, var(--color-border-100) 50%, transparent 50%)",
                          backgroundSize: "1px 16px",
                          backgroundRepeat: "repeat-y",
                        }}
                      />
                    )}
                  </React.Fragment>
                );
              })}
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
      </div>

      <div className="relative mx-auto max-w-[1360px]">
        <Container className="bg-white dark:bg-neutral-950">
          <div
            className="w-full overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative flex w-full items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="pointer-events-auto flex h-full w-full items-center justify-center"
                >
                  <Link
                    href={`/components/${activeTab.id}`}
                    className="block aspect-video w-full cursor-alias overflow-hidden border border-neutral-200/30 bg-neutral-50 dark:border-neutral-800/50 dark:bg-neutral-950/80"
                  >
                    <video
                      src={activeTab.videoLink}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="block h-full w-full object-cover"
                    />
                  </Link>
                </motion.div>
              </AnimatePresence>
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
      </div>
    </ViewerProvider>
  );
}

export default ComponentShowcase;
