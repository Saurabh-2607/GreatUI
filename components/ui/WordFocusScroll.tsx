"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import { cn } from "@/lib/utils";

interface FocusWordProps {
  word: string;
  wordIndex: number;
  totalWords: number;
  scrollYProgress: MotionValue<number>;
  minScale: number;
  maxBlur: number;
  minOpacity: number;
  staggerFactor: number;
  wordDuration: number;
  itemClassName?: string;
}

function FocusWord({
  word,
  wordIndex,
  totalWords,
  scrollYProgress,
  minScale,
  maxBlur,
  minOpacity,
  staggerFactor,
  wordDuration,
  itemClassName,
}: FocusWordProps) {
  const safeTotal = Math.max(1, totalWords);
  const start = (wordIndex / safeTotal) * staggerFactor;
  const end = Math.min(1, start + wordDuration);

  const opacity = useTransform(scrollYProgress, [start, end], [minOpacity, 1]);
  const scale = useTransform(scrollYProgress, [start, end], [minScale, 1]);
  const blurVal = useTransform(scrollYProgress, [start, end], [maxBlur, 0]);
  const filter = useTransform(blurVal, (v) =>
    v === 0 ? "none" : `blur(${v}px)`,
  );

  return (
    <motion.span
      style={{ opacity, scale, filter }}
      className={cn(
        "mr-[0.35em] inline-block text-3xl font-medium tracking-tight text-neutral-900 select-none md:text-4xl lg:text-5xl dark:text-white",
        itemClassName,
      )}
    >
      {word}
    </motion.span>
  );
}

export interface WordFocusScrollProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string;
  minScale?: number;
  maxBlur?: number;
  minOpacity?: number;
  staggerFactor?: number;
  wordDuration?: number;
  itemClassName?: string;
  scrollContainerRef?: React.RefObject<HTMLElement | null>;
  offset?: NonNullable<Parameters<typeof useScroll>[0]>["offset"];
}

export function WordFocusScroll({
  text = "",
  minScale = 0.85,
  maxBlur = 6,
  minOpacity = 0,
  staggerFactor = 0.8,
  wordDuration = 0.1,
  itemClassName,
  scrollContainerRef,
  offset = ["start 90%", "end 60%"],
  className,
  ...props
}: WordFocusScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    container: scrollContainerRef,
    offset: offset,
  });

  const content = text || "";
  const words = content.split(" ").filter((w) => w.length > 0);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex min-h-[50vh] w-full flex-col items-center justify-center overflow-hidden px-6 py-12 select-none",
        className,
      )}
      {...props}
    >
      <div className="flex max-w-5xl flex-wrap justify-center overflow-visible text-center">
        {words.map((word, i) => (
          <FocusWord
            key={i}
            word={word}
            wordIndex={i}
            totalWords={words.length}
            scrollYProgress={scrollYProgress}
            minScale={minScale}
            maxBlur={maxBlur}
            minOpacity={minOpacity}
            staggerFactor={staggerFactor}
            wordDuration={wordDuration}
            itemClassName={itemClassName}
          />
        ))}
      </div>
    </div>
  );
}

export default WordFocusScroll;

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
