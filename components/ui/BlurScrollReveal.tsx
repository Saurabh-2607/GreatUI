"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import { cn } from "@/lib/utils";

export interface BlurItemProps {
  text: string;
  itemIndex: number;
  totalItems: number;
  scrollYProgress: MotionValue<number>;
  itemClassName?: string;
  staggerFactor?: number;
  animationDuration?: number;
  opacityRange: [number, number];
  blurRange: [string, string];
  yRange: [string | number, string | number];
  scaleRange: [number, number];
}

function BlurItem({
  text,
  itemIndex,
  totalItems,
  scrollYProgress,
  itemClassName,
  staggerFactor = 0.85,
  animationDuration = 0.12,
  opacityRange,
  blurRange,
  yRange,
  scaleRange,
}: BlurItemProps) {
  const safeTotal = Math.max(1, totalItems);
  const start = (itemIndex / safeTotal) * staggerFactor;
  const end = Math.min(1, start + animationDuration);

  const opacityVal = useTransform(scrollYProgress, [start, end], opacityRange);

  const blurVal = useTransform(
    scrollYProgress,
    [start, end],
    [`blur(${blurRange[0]})`, `blur(${blurRange[1]})`],
  );

  const yVal = useTransform(
    scrollYProgress,
    [start, end],
    [
      typeof yRange[0] === "number" ? `${yRange[0]}px` : yRange[0],
      typeof yRange[1] === "number" ? `${yRange[1]}px` : yRange[1],
    ],
  );

  const scaleVal = useTransform(scrollYProgress, [start, end], scaleRange);

  return (
    <motion.span
      style={{ opacity: opacityVal, filter: blurVal, y: yVal, scale: scaleVal }}
      className={cn(
        "inline-block text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl lg:text-6xl dark:text-white",
        itemClassName,
      )}
    >
      {text}
    </motion.span>
  );
}

export interface BlurScrollRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string;
  variant?: "word" | "line";
  itemClassName?: string;
  containerClassName?: string;
  scrollContainerRef?: React.RefObject<HTMLElement | null>;
  offset?: NonNullable<Parameters<typeof useScroll>[0]>["offset"];
  staggerFactor?: number;
  animationDuration?: number;
  opacity?: [number, number];
  blur?: [string, string];
  y?: [string | number, string | number];
  scale?: [number, number];
}

export function BlurScrollReveal({
  text = "Grinding Hard",
  variant = "word",
  itemClassName,
  containerClassName,
  scrollContainerRef,
  offset = ["start end", "end 60%"],
  className,
  staggerFactor = 0.85,
  animationDuration = 0.12,
  opacity = [0, 1],
  blur = ["12px", "0px"],
  y = ["10px", "0px"],
  scale = [1, 1],
  ...props
}: BlurScrollRevealProps) {
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

  const isLineVariant = variant === "line";

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
    if (isLineVariant && words.length > 0) {
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
  }, [isLineVariant, words.length]);

  let itemsArray: string[] = [];
  if (isLineVariant) {
    const linesMap: { [key: number]: string[] } = {};
    words.forEach((word, idx) => {
      const lineIdx = lineIndices[idx] ?? 0;
      if (!linesMap[lineIdx]) {
        linesMap[lineIdx] = [];
      }
      linesMap[lineIdx].push(word);
    });
    itemsArray = Object.keys(linesMap)
      .map(Number)
      .sort((a, b) => a - b)
      .map((key) => linesMap[key].join(" "));
  } else {
    itemsArray = words;
  }

  const showStatic = isLineVariant && (!isMounted || numLines === 0);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex min-h-[50vh] w-full flex-col items-center justify-center overflow-hidden select-none",
        className,
      )}
      {...props}
    >
      {isLineVariant && words.length > 0 && (
        <div
          className={cn(
            "flex w-full max-w-5xl flex-wrap justify-center gap-x-[0.3em] gap-y-2 text-center md:gap-y-4",
            showStatic
              ? "opacity-100"
              : "pointer-events-none invisible absolute inset-0 opacity-0",
            containerClassName,
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

      {(!isLineVariant || !showStatic) && (
        <div
          className={cn(
            "max-w-5xl overflow-visible text-center",
            isLineVariant
              ? "flex w-full flex-col items-center gap-2 md:gap-4"
              : "flex flex-wrap justify-center gap-x-[0.3em] gap-y-2 md:gap-y-4",
            containerClassName,
          )}
        >
          {itemsArray.map((item, i) => (
            <BlurItem
              key={i}
              text={item}
              itemIndex={i}
              totalItems={itemsArray.length}
              scrollYProgress={scrollYProgress}
              itemClassName={itemClassName}
              staggerFactor={staggerFactor}
              animationDuration={animationDuration}
              opacityRange={opacity}
              blurRange={blur}
              yRange={y}
              scaleRange={scale}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default BlurScrollReveal;

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
