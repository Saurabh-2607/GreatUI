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
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="size-4"
      >
        <path
          opacity="0.28"
          d="M21 9.21634V7C21 5.34315 19.6569 4 18 4H6C4.34315 4 3 5.34315 3 7V17C3 18.6569 4.34315 20 6 20H8.22023"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18.6 13C19.4401 13 19.8601 13 20.181 13.1635C20.4632 13.3073 20.6927 13.5368 20.8365 13.819C21 14.1399 21 14.5599 21 15.4V17.6C21 18.4401 21 18.8601 20.8365 19.181C20.6927 19.4632 20.4632 19.6927 20.181 19.8365C19.8601 20 19.4401 20 18.6 20H14.4C13.5599 20 13.1399 20 12.819 19.8365C12.5368 19.6927 12.3073 19.4632 12.1635 19.181C12 18.8601 12 18.4401 12 17.6L12 15.4C12 14.5599 12 14.1399 12.1635 13.819C12.3073 13.5368 12.5368 13.3073 12.819 13.1635C13.1399 13 13.5599 13 14.4 13L18.6 13Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
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
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="size-4"
      >
        <path
          opacity="0.28"
          d="M2 9.4C2 7.15979 2 6.03968 2.43597 5.18404C2.81947 4.43139 3.43139 3.81947 4.18404 3.43597C5.03968 3 6.15979 3 8.4 3H15.6C17.8402 3 18.9603 3 19.816 3.43597C20.5686 3.81947 21.1805 4.43139 21.564 5.18404C22 6.03968 22 7.15979 22 9.4V14.6C22 16.8402 22 17.9603 21.564 18.816C21.1805 19.5686 20.5686 20.1805 19.816 20.564C18.9603 21 17.8402 21 15.6 21H8.4C6.15979 21 5.03968 21 4.18404 20.564C3.43139 20.1805 2.81947 19.5686 2.43597 18.816C2 17.9603 2 16.8402 2 14.6V9.4Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4 13H12M20 13H12M12 13V19"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="square"
          strokeLinejoin="round"
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
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="size-4"
      >
        <g opacity="0.28">
          <path
            d="M3 6.2C3 5.07989 3 4.51984 3.21799 4.09202C3.40973 3.71569 3.71569 3.40973 4.09202 3.21799C4.51984 3 5.0799 3 6.2 3H6.8C7.9201 3 8.48016 3 8.90798 3.21799C9.28431 3.40973 9.59027 3.71569 9.78201 4.09202C10 4.51984 10 5.0799 10 6.2V8.8C10 9.92011 10 10.4802 9.78201 10.908C9.59027 11.2843 9.28431 11.5903 8.90798 11.782C8.48016 12 7.9201 12 6.8 12H6.2C5.0799 12 4.51984 12 4.09202 11.782C3.71569 11.5903 3.40973 11.2843 3.21799 10.908C3 10.4802 3 9.9201 3 8.8V6.2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 15.2C14 14.0799 14 13.5198 14.218 13.092C14.4097 12.7157 14.7157 12.4097 15.092 12.218C15.5198 12 16.0799 12 17.2 12H17.8C18.9201 12 19.4802 12 19.908 12.218C20.2843 12.4097 20.5903 12.7157 20.782 13.092C21 13.5198 21 14.0799 21 15.2V17.8C21 18.9201 21 19.4802 20.782 19.908C20.5903 20.2843 20.2843 20.5903 19.908 20.782C19.4802 21 18.9201 21 17.8 21H17.2C16.0799 21 15.5198 21 15.092 20.782C14.7157 20.5903 14.4097 20.2843 14.218 19.908C14 19.4802 14 18.9201 14 17.8V15.2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <path
          d="M3 18.5C3 18.0353 3 17.803 3.03843 17.6098C3.19624 16.8164 3.81644 16.1962 4.60982 16.0384C4.80302 16 5.03534 16 5.5 16H7.5C7.96466 16 8.19698 16 8.39018 16.0384C9.18356 16.1962 9.80376 16.8164 9.96157 17.6098C10 17.803 10 18.0353 10 18.5C10 18.9647 10 19.197 9.96157 19.3902C9.80376 20.1836 9.18356 20.8038 8.39018 20.9616C8.19698 21 7.96466 21 7.5 21H5.5C5.03534 21 4.80302 21 4.60982 20.9616C3.81644 20.8038 3.19624 20.1836 3.03843 19.3902C3 19.197 3 18.9647 3 18.5Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 5.5C14 5.03534 14 4.80302 14.0384 4.60982C14.1962 3.81644 14.8164 3.19624 15.6098 3.03843C15.803 3 16.0353 3 16.5 3H18.5C18.9647 3 19.197 3 19.3902 3.03843C20.1836 3.19624 20.8038 3.81644 20.9616 4.60982C21 4.80302 21 5.03534 21 5.5C21 5.96466 21 6.19698 20.9616 6.39018C20.8038 7.18356 20.1836 7.80376 19.3902 7.96157C19.197 8 18.9647 8 18.5 8H16.5C16.0353 8 15.803 8 15.6098 7.96157C14.8164 7.80376 14.1962 7.18356 14.0384 6.39018C14 6.19698 14 5.96466 14 5.5Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
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
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="size-4"
      >
        <path
          opacity="0.28"
          d="M12 8V12L15 15"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
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
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="size-4"
      >
        <path
          opacity="0.28"
          d="M2.84961 12.0001C2.84961 17.0535 6.9462 21.1501 11.9996 21.1501C16.9741 21.1501 21.1496 16.9756 21.1496 12.0001C21.1496 6.94669 17.053 2.8501 11.9996 2.8501C6.9462 2.8501 2.84961 6.94669 2.84961 12.0001Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.3463 3.96789C16.3463 6.43274 14.5546 8.54333 12.0137 9.41719C12.2338 9.84436 12.358 10.329 12.358 10.8426C12.358 11.7405 11.9782 12.5498 11.3706 13.1186C11.7547 13.4382 11.9992 13.9198 11.9992 14.4586C11.9992 14.4586 11.9992 14.4586 11.9992 14.4586C11.9992 15.4209 11.2191 16.201 10.2568 16.201C9.29446 16.201 8.51435 15.4209 8.51435 14.4586C8.51435 14.2613 8.5441 14.0716 8.60758 13.8948C7.19014 13.602 6.1246 12.3467 6.1246 10.8426C6.1246 10.2894 6.26873 9.76985 6.52147 9.31948C5.51708 8.93146 4.64099 8.34675 3.96191 7.62351C5.51383 4.77952 8.53125 2.8501 11.9993 2.8501C13.5726 2.8501 15.0532 3.24718 16.3462 3.94659L16.3463 3.96789Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17.4849 14.2334C16.5226 14.2334 15.7425 15.0135 15.7425 15.9759C15.7425 16.3806 15.8805 16.7531 16.112 17.0489C15.7665 17.5508 15.5643 18.1589 15.5643 18.8142C15.5643 19.3394 15.6941 19.8342 15.9235 20.2683C17.77 19.3903 19.2758 17.9121 20.1887 16.0858C19.8897 15.9203 19.5607 15.8024 19.2119 15.7426C19.0979 14.8906 18.3681 14.2334 17.4849 14.2334Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
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
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="size-4"
      >
        <path
          opacity="0.28"
          d="M9.48438 11C10.1624 9.24803 11.4511 7.79138 13.1227 6.90642L20.3927 3.05761C20.8069 2.83833 21.2552 3.28669 21.036 3.70089L17.1872 10.9709C16.2865 12.6721 14.7937 13.9768 13.0002 14.6447"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.8504 15.1651C7.63373 13.9483 5.80114 14.0267 4.77551 15.2719C4.12443 16.0625 4.36328 16.9397 3.99241 17.7945C3.65709 18.5673 2.84409 19.0652 2 19.0088C3.42052 21.4765 7.01349 21.6791 8.72141 19.4547C9.65433 18.2397 10.1231 16.4377 8.8504 15.1651Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
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
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="size-4"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="2"
          opacity="0.28"
        />
        <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
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
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="size-4"
      >
        <path
          opacity="0.28"
          d="M10.9984 4.87876V2.3042M15.8855 6.14698L17.4029 4.7401M4.87486 11.0023H2.30029M6.66833 6.6723L4.50335 4.50732M4.73619 17.4068L6.14307 15.8894"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.93499 14.1396C9.47314 12.2922 9.24222 11.3685 9.49432 10.7247C9.71436 10.1628 10.1589 9.71827 10.7208 9.49823C11.3646 9.24612 12.2883 9.47705 14.1357 9.93889L17.6719 10.8229C19.2478 11.2169 20.0358 11.4139 20.3555 11.632C21.5591 12.4531 21.6243 14.2049 20.485 15.1132C20.1825 15.3544 19.4113 15.6095 17.869 16.1195C17.592 16.2111 17.4536 16.2569 17.3285 16.3169C16.8843 16.53 16.5261 16.8882 16.313 17.3324C16.253 17.4575 16.2072 17.5959 16.1156 17.8729C15.6056 19.4152 15.3505 20.1864 15.1093 20.4889C14.201 21.6282 12.4492 21.563 11.6281 20.3594C11.41 20.0397 11.213 19.2518 10.819 17.6758L9.93499 14.1396Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
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
                    {idx > 0 && (
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
