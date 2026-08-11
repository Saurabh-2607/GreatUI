"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Container from "./Container";
import { cn } from "@/lib/utils";
import { ViewerProvider } from "@/lib/viewer-context";

interface ShowcaseItem {
  id: string;
  title: string;
  videoLink: string;
  icon: React.ReactNode;
}

const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: "macbook",
    title: "Macbook Mockup",
    videoLink: "https://ik.imagekit.io/greatui/macbookMockup.mp4",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-4"
      >
        <path
          fillRule="evenodd"
          d="M2.25 5.25a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3V15a3 3 0 0 1-3 3h-3v.257c0 .597.237 1.17.659 1.591l.621.622a.75.75 0 0 1-.53 1.28h-9a.75.75 0 0 1-.53-1.28l.622-.622a2.25 2.25 0 0 0 .659-1.59V18h-3a3 3 0 0 1-3-3V5.25zm1.5 0v9.75a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V5.25a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    id: "mobile",
    title: "Mobile Mockup",
    videoLink: "https://ik.imagekit.io/greatui/mobileMockup.mp4",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-4"
      >
        <path
          fillRule="evenodd"
          d="M17 2H7a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3zM12 20a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5zM6 16V5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    id: "bento",
    title: "Deployment Checklist",
    videoLink: "https://ik.imagekit.io/greatui/deploymentchecklist.mp4",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-4"
      >
        <path
          fillRule="evenodd"
          d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z"
        />
        <path
          fillRule="evenodd"
          d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875H4.875A1.875 1.875 0 0 1 3 20.625V9.375Zm9.97 4.72a.75.75 0 0 0-1.06-1.06L9 15.94l-1.66-1.66a.75.75 0 0 0-1.06 1.06l2.19 2.19a.75.75 0 0 0 1.06 0l3.44-3.44Z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    id: "timeline",
    title: "Revision Timeline",
    videoLink: "https://ik.imagekit.io/greatui/timeline.mp4",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-4"
      >
        <path
          fillRule="evenodd"
          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    id: "team",
    title: "Team Section",
    videoLink: "https://ik.imagekit.io/greatui/teamSection.mp4",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-4"
      >
        <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-13.524 0 .75.75 0 0 1-.362-.63v-.003ZM16.5 19.125a7.103 7.103 0 0 0-1.89-4.821 8.625 8.625 0 0 1 7.89 4.821v.003l-.001.119a.75.75 0 0 1-.363.63 13.065 13.065 0 0 1-5.273.743.75.75 0 0 1-.363-.63v-.003Z" />
      </svg>
    ),
  },
  {
    id: "vortex",
    title: "Vortex Spiral Shader",
    videoLink: "https://ik.imagekit.io/greatui/swirl.mp4",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-4"
      >
        <path
          fillRule="evenodd"
          d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258.903a2.25 2.25 0 0 0 1.546 1.546l.903.258a.75.75 0 0 1 0 1.452l-.903.258a2.25 2.25 0 0 0-1.546 1.546l-.258.903a.75.75 0 0 1-1.456 0l-.258-.903a2.25 2.25 0 0 0-1.546-1.546l-.903-.258a.75.75 0 0 1 0-1.452l.903-.258a2.25 2.25 0 0 0 1.546-1.546l.258-.903A.75.75 0 0 1 18 1.5ZM19.75 18.625a.75.75 0 0 0-1.5 0v1.125H17.125a.75.75 0 0 0 0 1.5h1.125v1.125a.75.75 0 0 0 1.5 0v-1.125h1.125a.75.75 0 0 0 0-1.5h-1.125v-1.125Z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    id: "vinyl",
    title: "Vinyl Card",
    videoLink: "https://ik.imagekit.io/greatui/vinyl.mp4",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-4"
      >
        <path
          fillRule="evenodd"
          d="M19.952 1.651a.75.75 0 0 1 .298.599V16.303a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.403-4.909l2.311-.66a1.5 1.5 0 0 0 1.088-1.442V6.998l-12 2.727v9.578a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.402-4.909l2.31-.66a1.5 1.5 0 0 0 1.088-1.442V5.25a.75.75 0 0 1 .586-.73l15-3.41a.75.75 0 0 1 .837.541Z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    id: "text-reveal",
    title: "Text Reveal",
    videoLink: "https://ik.imagekit.io/greatui/textscroll.mp4",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-4"
      >
        <path
          fillRule="evenodd"
          d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625ZM7.5 15a.75.75 0 0 1 .75-.75h8.25a.75.75 0 0 1 0 1.5H8.25a.75.75 0 0 1-.75-.75Zm.75-2.25a.75.75 0 0 0 0 1.5h8.25a.75.75 0 0 0 0-1.5H8.25ZM6.75 9a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5A.75.75 0 0 1 6.75 9Z"
          clipRule="evenodd"
        />
        <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
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
            <div className="relative flex h-[480px] items-center justify-center py-10 md:h-[680px] md:py-16">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="pointer-events-auto flex h-full w-full items-center justify-center"
                >
                  <div className="w-full overflow-hidden rounded-2xl border border-neutral-200/30 bg-neutral-50 shadow-2xl dark:border-neutral-800/50 dark:bg-neutral-950/80">
                    <video
                      src={activeTab.videoLink}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="h-auto w-full"
                    />
                  </div>
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
