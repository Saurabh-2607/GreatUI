"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { cn } from "@/lib/utils";

export interface TextRevealProps {
  paragraphs: string[];
  className?: string;
  paragraphClassName?: string;
  containerRef?: React.RefObject<HTMLElement | null>;
  highlightColor?: string;
  lightWatermarkColor?: string;
  darkWatermarkColor?: string;
  lightTextColor?: string;
  darkTextColor?: string;
}

export const TextReveal = ({
  paragraphs = [],
  className = "",
  paragraphClassName = "",
  containerRef,
  highlightColor = "rgb(255, 0, 255)",
  lightWatermarkColor = "rgb(200, 200, 200)",
  darkWatermarkColor = "rgb(64, 64, 64)",
  lightTextColor = "rgb(0, 0, 0)",
  darkTextColor = "rgb(255, 255, 255)",
}: TextRevealProps) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkDark();

    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    container: containerRef,
    offset: ["start 0.6", "end 0.6"],
  });

  return (
    <div ref={targetRef} className={cn("py-32", className)}>
      <div className="mx-auto max-w-5xl space-y-20 px-8">
        {paragraphs.map((paragraph, index) => (
          <Paragraph
            key={index}
            paragraph={paragraph}
            progress={scrollYProgress}
            index={index}
            total={paragraphs.length}
            isDark={isDark}
            paragraphClassName={paragraphClassName}
            highlightColor={highlightColor}
            lightWatermarkColor={lightWatermarkColor}
            darkWatermarkColor={darkWatermarkColor}
            lightTextColor={lightTextColor}
            darkTextColor={darkTextColor}
          />
        ))}
      </div>
    </div>
  );
};

interface ParagraphProps {
  paragraph: string;
  progress: MotionValue<number>;
  index: number;
  total: number;
  isDark: boolean;
  paragraphClassName?: string;
  highlightColor: string;
  lightWatermarkColor: string;
  darkWatermarkColor: string;
  lightTextColor: string;
  darkTextColor: string;
}

const Paragraph = ({
  paragraph,
  progress,
  index,
  total,
  isDark,
  paragraphClassName,
  highlightColor,
  lightWatermarkColor,
  darkWatermarkColor,
  lightTextColor,
  darkTextColor,
}: ParagraphProps) => {
  const words = paragraph.split(" ");
  const paragraphStart = index / total;
  const paragraphEnd = (index + 1) / total;

  return (
    <p
      className={cn(
        "text-center text-3xl leading-relaxed font-bold text-neutral-900 md:text-4xl dark:text-white",
        paragraphClassName,
      )}
    >
      {words.map((word, wIndex) => {
        const wordStartFraction = wIndex / words.length;
        const wordEndFraction = (wIndex + 1) / words.length;
        const wordGlobalStart =
          paragraphStart + wordStartFraction * (paragraphEnd - paragraphStart);
        const wordGlobalEnd =
          paragraphStart + wordEndFraction * (paragraphEnd - paragraphStart);

        return (
          <Word
            key={wIndex}
            progress={progress}
            range={[wordGlobalStart, wordGlobalEnd]}
            isDark={isDark}
            highlightColor={highlightColor}
            lightWatermarkColor={lightWatermarkColor}
            darkWatermarkColor={darkWatermarkColor}
            lightTextColor={lightTextColor}
            darkTextColor={darkTextColor}
          >
            {word}
          </Word>
        );
      })}
    </p>
  );
};

interface WordProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  isDark: boolean;
  highlightColor: string;
  lightWatermarkColor: string;
  darkWatermarkColor: string;
  lightTextColor: string;
  darkTextColor: string;
}

const Word = ({
  children,
  progress,
  range,
  isDark,
  highlightColor,
  lightWatermarkColor,
  darkWatermarkColor,
  lightTextColor,
  darkTextColor,
}: WordProps) => {
  const characters = children.split("");

  return (
    <span className="relative mr-2 inline-block md:mr-3">
      {characters.map((char, i) => {
        const charStart =
          range[0] + (i / characters.length) * (range[1] - range[0]);
        const charEnd =
          range[0] + ((i + 1) / characters.length) * (range[1] - range[0]);

        return (
          <Character
            key={i}
            progress={progress}
            range={[charStart, charEnd]}
            isDark={isDark}
            highlightColor={highlightColor}
            lightWatermarkColor={lightWatermarkColor}
            darkWatermarkColor={darkWatermarkColor}
            lightTextColor={lightTextColor}
            darkTextColor={darkTextColor}
          >
            {char}
          </Character>
        );
      })}
    </span>
  );
};

interface CharacterProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  isDark: boolean;
  highlightColor: string;
  lightWatermarkColor: string;
  darkWatermarkColor: string;
  lightTextColor: string;
  darkTextColor: string;
}

const Character = ({
  children,
  progress,
  range,
  isDark,
  highlightColor,
  lightWatermarkColor,
  darkWatermarkColor,
  lightTextColor,
  darkTextColor,
}: CharacterProps) => {
  const rangeStart = range[0];
  const rangeEnd = range[1];
  const rangeMid = (rangeStart + rangeEnd) / 2;

  const startColor = isDark ? darkWatermarkColor : lightWatermarkColor;
  const midColor = highlightColor;
  const endColor = isDark ? darkTextColor : lightTextColor;

  const color = useTransform(
    progress,
    [
      rangeStart,
      rangeStart + 0.05 * (rangeEnd - rangeStart),
      rangeStart + 0.75 * (rangeEnd - rangeStart),
      rangeEnd,
    ],
    [startColor, startColor, midColor, endColor],
  );

  const blur = useTransform(
    progress,
    [rangeStart, rangeMid, rangeEnd],
    ["blur(2px)", "blur(1px)", "blur(0px)"],
  );

  const opacity = useTransform(
    progress,
    [0, rangeStart, rangeEnd],
    [0.3, 0.3, 1],
  );

  return (
    <motion.span
      style={{
        color,
        opacity,
        filter: blur,
      }}
      className="inline-block"
    >
      {children}
    </motion.span>
  );
};

export default TextReveal;

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
 * X: https://x.com/srbh_s
 */
