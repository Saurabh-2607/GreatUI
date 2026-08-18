"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import { cn } from "@/lib/utils";

export interface FlyInLineProps {
  words: string[];
  lineIndex: number;
  totalLines: number;
  scrollYProgress: MotionValue<number>;
  direction?: "left" | "right" | "alternate";
  itemClassName?: string;
  flyInDistance?: string;
  blurStart?: string;
  wordSpacingStart?: string;
  wordSpacingEnd?: string;
  staggerFactor?: number;
  animationDuration?: number;
}

function FlyInLine({
  words,
  lineIndex,
  totalLines,
  scrollYProgress,
  direction = "alternate",
  itemClassName,
  flyInDistance = "70vw",
  blurStart = "12px",
  wordSpacingStart = "2.5em",
  wordSpacingEnd = "0.25em",
  staggerFactor = 0.6,
  animationDuration = 0.4,
}: FlyInLineProps) {
  const isLeft =
    direction === "left" || (direction === "alternate" && lineIndex % 2 === 0);

  const safeTotal = Math.max(1, totalLines);
  const start = (lineIndex / safeTotal) * staggerFactor;
  const end = Math.min(1, start + animationDuration);

  const x = useTransform(
    scrollYProgress,
    [start, end],
    [isLeft ? `-${flyInDistance}` : flyInDistance, "0vw"],
  );

  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);

  const filter = useTransform(
    scrollYProgress,
    [start, end],
    [`blur(${blurStart})`, "blur(0px)"],
  );

  const wordSpacing = useTransform(
    scrollYProgress,
    [start, end],
    [wordSpacingStart, wordSpacingEnd],
  );

  return (
    <motion.div
      style={{ x, opacity, filter, wordSpacing }}
      className="w-full overflow-visible text-center whitespace-nowrap"
    >
      <span
        className={cn(
          "inline-block text-4xl font-medium tracking-tight text-neutral-900 md:text-5xl lg:text-6xl dark:text-white",
          itemClassName,
        )}
      >
        {words.join(" ")}
      </span>
    </motion.div>
  );
}

export interface SplitLineFlyInProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string;
  lines?: string[];
  direction?: "left" | "right" | "alternate";
  itemClassName?: string;
  scrollContainerRef?: React.RefObject<HTMLElement | null>;
  offset?: NonNullable<Parameters<typeof useScroll>[0]>["offset"];
  flyInDistance?: string;
  blurStart?: string;
  wordSpacingStart?: string;
  wordSpacingEnd?: string;
  staggerFactor?: number;
  animationDuration?: number;
}

export function SplitLineFlyIn({
  text,
  lines,
  direction = "alternate",
  itemClassName,
  scrollContainerRef,
  offset = ["start end", "end 60%"],
  className,
  flyInDistance,
  blurStart,
  wordSpacingStart,
  wordSpacingEnd,
  staggerFactor,
  animationDuration,
  ...props
}: SplitLineFlyInProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const [lineIndices, setLineIndices] = useState<number[]>([]);
  const [numLines, setNumLines] = useState<number>(0);
  const [isMounted, setIsMounted] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    container: scrollContainerRef,
    offset: offset,
  });

  const content = text || "";
  const words = content.split(" ").filter((w) => w.trim().length > 0);

  const hasExplicitLines = Array.isArray(lines) && lines.length > 0;

  useEffect(() => {
    wordsRef.current = [];
  }, [content]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hasExplicitLines && words.length > 0) {
      const calculateLines = () => {
        if (!wordsRef.current || wordsRef.current.length === 0) return;

        let currentOffset = -1;
        let currentLine = -1;
        const newIndices: number[] = [];

        wordsRef.current.forEach((el, i) => {
          if (!el) {
            newIndices[i] = 0;
            return;
          }
          const offset = el.offsetTop;
          if (Math.abs(offset - currentOffset) > 5) {
            currentLine++;
            currentOffset = offset;
          }
          newIndices[i] = currentLine;
        });

        setLineIndices(newIndices);
        setNumLines(currentLine + 1);
      };

      calculateLines();
      const timeoutId = setTimeout(calculateLines, 100);
      window.addEventListener("resize", calculateLines);

      return () => {
        window.removeEventListener("resize", calculateLines);
        clearTimeout(timeoutId);
      };
    }
  }, [hasExplicitLines, words.length]);

  let lineWordsArray: string[][] = [];

  if (hasExplicitLines) {
    lineWordsArray = lines!.map((line) =>
      line.split(" ").filter((w) => w.trim().length > 0),
    );
  } else {
    const linesMap: { [key: number]: string[] } = {};
    words.forEach((word, idx) => {
      const lineIdx = lineIndices[idx] ?? 0;
      if (!linesMap[lineIdx]) {
        linesMap[lineIdx] = [];
      }
      linesMap[lineIdx].push(word);
    });
    lineWordsArray = Object.keys(linesMap)
      .map(Number)
      .sort((a, b) => a - b)
      .map((key) => linesMap[key]);
  }

  const showStatic = !hasExplicitLines && (!isMounted || numLines === 0);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex min-h-[50vh] w-full flex-col items-center justify-center overflow-x-hidden",
        className,
      )}
      {...props}
    >
      {!hasExplicitLines && words.length > 0 && (
        <div
          className={cn(
            "flex w-full max-w-5xl flex-wrap justify-center gap-x-[0.3em] gap-y-2 text-center md:gap-y-4",
            showStatic
              ? "opacity-100"
              : "pointer-events-none invisible absolute inset-0 opacity-0",
          )}
          aria-hidden="true"
        >
          {words.map((item, i) => (
            <span
              key={i}
              ref={(el) => {
                wordsRef.current[i] = el;
              }}
              className={cn(
                "inline-block text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl lg:text-6xl dark:text-white",
                itemClassName,
              )}
            >
              {item}
            </span>
          ))}
        </div>
      )}

      {!showStatic && (
        <div className="flex w-full max-w-5xl flex-col items-center gap-2 overflow-visible md:gap-4">
          {lineWordsArray.map((lineWords, i) => (
            <FlyInLine
              key={i}
              words={lineWords}
              lineIndex={i}
              totalLines={lineWordsArray.length}
              scrollYProgress={scrollYProgress}
              direction={direction}
              itemClassName={itemClassName}
              flyInDistance={flyInDistance}
              blurStart={blurStart}
              wordSpacingStart={wordSpacingStart}
              wordSpacingEnd={wordSpacingEnd}
              staggerFactor={staggerFactor}
              animationDuration={animationDuration}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default SplitLineFlyIn;

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
