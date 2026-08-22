"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export interface Speaker {
  name: string;
  position: string;
  company: string;
  image: string;
  social?: string;
}

export interface TeamSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  speakers?: Speaker[];
  grayscale?: boolean;
  align?: "center" | "baseline" | "end";
  slideDistance?: number;
  activeImageClassName?: string;
  rowClassName?: string;
}

const imageVariants = {
  enter: (direction: number) => ({
    y: direction > 0 ? "100%" : "-100%",
    scale: 1,
    opacity: 1,
    zIndex: 20,
  }),
  center: {
    y: "0%",
    scale: 1,
    opacity: 1,
    zIndex: 20,
  },
  exit: {
    y: "0%",
    scale: 0.92,
    opacity: 0,
    zIndex: 10,
  },
};

export const TeamSection = React.forwardRef<HTMLDivElement, TeamSectionProps>(
  (
    {
      speakers = [],
      grayscale = true,
      align = "baseline",
      slideDistance = 20,
      activeImageClassName,
      rowClassName,
      className,
      ...props
    },
    ref,
  ) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [prevIndex, setPrevIndex] = useState<number | null>(null);

    if (!speakers || speakers.length === 0) return null;

    const activeSpeaker = activeIndex !== null ? speakers[activeIndex] : null;

    const direction =
      prevIndex === null || activeIndex === null || activeIndex > prevIndex
        ? 1
        : -1;

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex min-h-[80dvh] w-full flex-col justify-center",
          className,
        )}
        {...props}
      >
        {/* List Section */}
        <div
          className="flex w-full flex-col justify-center gap-0 py-0 lg:gap-0 lg:py-8"
          onMouseLeave={() => {
            setPrevIndex(activeIndex);
            setActiveIndex(null);
          }}
        >
          {speakers.map((speaker, idx) => (
            <React.Fragment key={idx}>
              {/* Mobile/Tablet View - Custom "Big" Layout */}
              <div className="relative flex w-full flex-col px-0 py-3 lg:hidden">
                {speaker.social && (
                  <a
                    href={speaker.social}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-1 right-0 p-2 text-neutral-400 transition-colors hover:text-neutral-900 dark:text-neutral-500 dark:hover:text-white"
                  >
                    <svg
                      className="h-5 w-5 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 256 256"
                    >
                      <path d="M218.123 218.127h-37.931v-59.403c0-14.165-.253-32.4-19.728-32.4-19.756 0-22.779 15.434-22.779 31.369v60.43h-37.93V95.967h36.413v16.694h.51a39.907 39.907 0 0 1 35.928-19.733c38.445 0 45.533 25.288 45.533 58.186l-.016 67.013ZM56.955 79.27c-12.157.002-22.014-9.852-22.016-22.009-.002-12.157 9.851-22.014 22.008-22.016 12.157-.003 22.014 9.851 22.016 22.008A22.013 22.013 0 0 1 56.955 79.27m18.966 138.858H37.95V95.967h37.97v122.16ZM237.033.018H18.89C8.58-.098.125 8.161-.001 18.471v219.053c.122 10.315 8.576 18.582 18.89 18.474h218.144c10.336.128 18.823-8.139 18.966-18.474V18.454c-.147-10.33-8.635-18.588-18.966-18.453" />
                    </svg>
                  </a>
                )}

                <div className="flex gap-3">
                  <div className="aspect-[3/4] w-24 shrink-0 overflow-hidden bg-neutral-100 md:w-32 dark:bg-neutral-800">
                    <img
                      src={speaker.image}
                      alt={speaker.name}
                      className={cn(
                        "h-full w-full object-cover",
                        grayscale && "grayscale",
                      )}
                    />
                  </div>
                  <div className="flex flex-col justify-end pr-8 pb-1">
                    <span className="mb-1 text-xs font-bold tracking-wide text-neutral-500 capitalize md:text-sm dark:text-neutral-400">
                      {speaker.position} @ {speaker.company}
                    </span>
                    <h3 className="text-3xl leading-none font-light tracking-tighter text-neutral-900 md:text-4xl dark:text-white">
                      {speaker.name}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Desktop View */}
              <motion.div
                layoutId={`speaker-row-${speaker.name}`}
                className={cn(
                  "group hidden cursor-pointer grid-cols-1 gap-2 py-1 lg:grid lg:pr-[280px] xl:grid-cols-12",
                  align === "center" && "items-center",
                  align === "baseline" && "items-baseline",
                  align === "end" && "items-end",
                  rowClassName,
                )}
                onMouseEnter={() => {
                  setPrevIndex(activeIndex);
                  setActiveIndex(idx);
                }}
              >
                {/* Left: Designation */}
                <div
                  className="order-2 flex translate-x-[var(--slide-offset)] transform flex-col items-start text-left opacity-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:opacity-100 xl:order-1 xl:col-span-5"
                  style={
                    {
                      "--slide-offset": `-${slideDistance}px`,
                    } as React.CSSProperties
                  }
                >
                  <span className="text-sm font-semibold tracking-wide text-neutral-500 capitalize md:text-base dark:text-neutral-400">
                    {speaker.position} @ {speaker.company}
                  </span>
                </div>

                {/* Middle: Name */}
                <div className="order-1 flex justify-start xl:order-2 xl:col-span-7">
                  <h2 className="text-left text-4xl font-semibold tracking-tighter text-neutral-900 capitalize opacity-60 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:pl-8 group-hover:opacity-100 md:text-6xl dark:text-white">
                    {speaker.name}
                  </h2>
                </div>
              </motion.div>
            </React.Fragment>
          ))}
        </div>

        {/* Right: Absolute Image Section */}
        <div className="pointer-events-none absolute inset-0 z-10 hidden items-center justify-end lg:flex">
          <AnimatePresence>
            {activeSpeaker && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "relative aspect-[4/5] w-full max-w-64 overflow-hidden bg-neutral-100 dark:bg-neutral-900",
                  activeImageClassName,
                )}
              >
                <AnimatePresence
                  mode="popLayout"
                  custom={direction}
                  initial={false}
                >
                  <motion.img
                    key={activeSpeaker.name}
                    src={activeSpeaker.image}
                    alt={activeSpeaker.name}
                    custom={direction}
                    variants={imageVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className={cn(
                      "absolute inset-0 h-full w-full object-cover",
                      grayscale && "grayscale",
                    )}
                  />
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  },
);

TeamSection.displayName = "TeamSection";

export default TeamSection;

/**
 * Great UI Component
 *
 * Built with React, TypeScript, Tailwind CSS, and Framer Motion.
 * Designed to be accessible, customizable, and production-ready.
 *
 * Website: https://great-ui.com
 * GitHub: https://github.com/Saurabh-2607/GreatUI
 * X (Great UI): https://x.com/GreatUIHQ
 *
 * Released under the MIT License.
 * Contributions, issues, and feature requests are always welcome.
 *
 * Author: Saurabh Sharma
 * X: https://x.com/srbh_here
 */
