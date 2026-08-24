"use client";

import { useEffect, useState, useRef } from "react";
import { motion, Transition } from "motion/react";
import React from "react";
import { cn } from "@/lib/utils";

export interface CascadePageTransitionProps {
  trigger: number;
  onViewSwap?: () => void;
  className?: string;
  panelClassName?: string;
  columns?: number;
  colors?: string[];
  duration?: number;
  staggerDelay?: number;
  ease?: Transition["ease"];
  direction?: "top" | "bottom" | "left" | "right";
  exitOpposite?: boolean;
  mode?: "in-to-out" | "out-to-in";
  showLeadingStroke?: boolean;
  showTrailingStroke?: boolean;
  strokeWidth?: number;
  leadingStrokeColors?: string[];
  trailingStrokeColors?: string[];
}

const defaultPalette = [
  "#f43f5e", // Rose
  "#84cc16", // Lime Green
  "#ef4444", // Bright Red
  "#f97316", // Orange
  "#a855f7", // Purple
  "#3b82f6", // Electric Blue
  "#e0e7ff", // Soft Lavender
  "#facc15", // Yellow
  "#14b8a6", // Teal
  "#ec4899", // Vibrant Pink
];

export default function CascadePageTransition({
  trigger,
  onViewSwap,
  className,
  panelClassName,
  columns = 14,
  colors = defaultPalette,
  duration = 0.55,
  staggerDelay = 0.035,
  ease = [0.76, 0, 0.24, 1],
  direction = "top",
  exitOpposite = true,
  mode = "in-to-out",
  showLeadingStroke = false,
  showTrailingStroke = false,
  strokeWidth = 10,
  leadingStrokeColors = defaultPalette,
  trailingStrokeColors = defaultPalette,
}: CascadePageTransitionProps) {
  const [transitionState, setTransitionState] = useState("idle");
  const onViewSwapRef = useRef(onViewSwap);

  useEffect(() => {
    onViewSwapRef.current = onViewSwap;
  }, [onViewSwap]);

  useEffect(() => {
    if (trigger > 0) {
      setTimeout(() => setTransitionState("entering"), 0);

      const maxMultiplier = Math.floor((columns - 1) / 2);
      const maxStagger = maxMultiplier * staggerDelay;
      const totalAnimationTime = (duration + maxStagger) * 1000;

      const coverTimeout = setTimeout(() => {
        if (onViewSwapRef.current) onViewSwapRef.current();
        setTransitionState("covered");
      }, totalAnimationTime);

      const exitTimeout = setTimeout(() => {
        setTransitionState("exiting");
      }, totalAnimationTime + 200);

      const idleTimeout = setTimeout(
        () => {
          setTransitionState("idle");
        },
        totalAnimationTime * 2 + 200,
      );

      return () => {
        clearTimeout(coverTimeout);
        clearTimeout(exitTimeout);
        clearTimeout(idleTimeout);
      };
    }
  }, [trigger, columns, duration, staggerDelay]);

  if (transitionState === "idle") return null;

  const isVertical = direction === "top" || direction === "bottom";
  const isOutToIn = mode === "out-to-in";

  const getTransform = (state: "enter" | "exit") => {
    if (isVertical) {
      const isEnterBottom = direction === "bottom";
      if (state === "enter") {
        return { y: isEnterBottom ? "100%" : "-100%", x: "0%" };
      } else {
        return exitOpposite
          ? { y: isEnterBottom ? "-100%" : "100%", x: "0%" }
          : { y: isEnterBottom ? "100%" : "-100%", x: "0%" };
      }
    } else {
      const isEnterRight = direction === "right";
      if (state === "enter") {
        return { x: isEnterRight ? "100%" : "-100%", y: "0%" };
      } else {
        return exitOpposite
          ? { x: isEnterRight ? "-100%" : "100%", y: "0%" }
          : { x: isEnterRight ? "100%" : "-100%", y: "0%" };
      }
    }
  };

  const panels = Array.from({ length: columns }, (_, i) => i);

  return (
    <div
      key={trigger}
      className={cn(
        "pointer-events-none fixed inset-0 z-[100] flex h-full w-full overflow-hidden",
        isVertical ? "flex-row" : "flex-col",
        className,
      )}
    >
      {panels.map((i) => {
        const centerIndex = (columns - 1) / 2;
        const distanceFromCenter = Math.abs(i - centerIndex);
        const minDistance = columns % 2 === 0 ? 0.5 : 0;
        const delayMultiplier = distanceFromCenter - minDistance;
        const maxMultiplier = Math.floor((columns - 1) / 2);
        const finalDelayMultiplier = isOutToIn
          ? maxMultiplier - delayMultiplier
          : delayMultiplier;

        const delay = Math.max(0, finalDelayMultiplier * staggerDelay);
        const color = colors[i % colors.length];

        const leadingColor =
          leadingStrokeColors && leadingStrokeColors.length > 0
            ? leadingStrokeColors[i % leadingStrokeColors.length]
            : null;

        const trailingColor =
          trailingStrokeColors && trailingStrokeColors.length > 0
            ? trailingStrokeColors[i % trailingStrokeColors.length]
            : null;

        let leadingClasses = "absolute shadow-md";
        let trailingClasses = "absolute shadow-md";

        if (direction === "left") {
          leadingClasses += " right-0 top-0 bottom-0";
          trailingClasses += " left-0 top-0 bottom-0";
        } else if (direction === "right") {
          leadingClasses += " left-0 top-0 bottom-0";
          trailingClasses += " right-0 top-0 bottom-0";
        } else if (direction === "top") {
          leadingClasses += " bottom-0 left-0 right-0";
          trailingClasses += " top-0 left-0 right-0";
        } else if (direction === "bottom") {
          leadingClasses += " top-0 left-0 right-0";
          trailingClasses += " bottom-0 left-0 right-0";
        }

        const isCoveredOrEntering =
          transitionState === "entering" || transitionState === "covered";

        const initialPos = getTransform("enter");
        const targetPos = isCoveredOrEntering
          ? { x: "0%", y: "0%" }
          : getTransform("exit");

        return (
          <motion.div
            key={i}
            initial={initialPos}
            animate={targetPos}
            transition={{
              duration: duration,
              ease: ease,
              delay: delay,
            }}
            className={cn(
              "pointer-events-auto relative flex flex-1 items-center justify-center overflow-hidden",
              panelClassName,
            )}
            style={{
              backgroundColor: color,
              width: isVertical ? `calc(${100 / columns}% + 0.5px)` : "100%",
              height: isVertical ? "100%" : `calc(${100 / columns}% + 0.5px)`,
              marginLeft: isVertical && i > 0 ? "-0.2px" : "0px",
              marginTop: !isVertical && i > 0 ? "-0.2px" : "0px",
            }}
          >
            {showLeadingStroke && leadingColor && (
              <div
                className={leadingClasses}
                style={{
                  backgroundColor: leadingColor,
                  ...(isVertical
                    ? { height: strokeWidth }
                    : { width: strokeWidth }),
                }}
              />
            )}

            {showTrailingStroke && trailingColor && (
              <div
                className={trailingClasses}
                style={{
                  backgroundColor: trailingColor,
                  ...(isVertical
                    ? { height: strokeWidth }
                    : { width: strokeWidth }),
                }}
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

export function RouteTransitionProvider({
  children,
  navigate,
  className,
  panelClassName,
  columns,
  colors,
  duration,
  staggerDelay,
  ease,
  direction,
  exitOpposite,
  mode,
  showLeadingStroke,
  showTrailingStroke,
  strokeWidth,
  leadingStrokeColors,
  trailingStrokeColors,
}: Omit<CascadePageTransitionProps, "trigger" | "onViewSwap"> & {
  children: React.ReactNode;
  navigate: (url: string) => void;
}) {
  const [trigger, setTrigger] = useState(0);
  const [pendingUrl, setPendingUrl] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 0);
  }, []);

  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      const targetAttr = target.getAttribute("target");

      if (target.href === window.location.href) {
        return;
      }

      if (
        href &&
        !href.startsWith("http") &&
        !href.startsWith("//") &&
        !href.startsWith("#") &&
        !href.startsWith("mailto:") &&
        !href.startsWith("tel:") &&
        !href.startsWith("javascript:") &&
        targetAttr !== "_blank" &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.shiftKey &&
        !e.altKey
      ) {
        e.preventDefault();
        e.stopPropagation();

        setPendingUrl(href);
        setTrigger((prev) => prev + 1);
      }
    };

    document.addEventListener("click", handleLinkClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleLinkClick, { capture: true });
    };
  }, []);

  const handleViewSwap = () => {
    if (pendingUrl) {
      navigate(pendingUrl);
    }
  };

  return (
    <>
      {mounted && (
        <CascadePageTransition
          trigger={trigger}
          onViewSwap={handleViewSwap}
          className={className}
          panelClassName={panelClassName}
          columns={columns}
          colors={colors}
          duration={duration}
          staggerDelay={staggerDelay}
          ease={ease}
          direction={direction}
          exitOpposite={exitOpposite}
          mode={mode}
          showLeadingStroke={showLeadingStroke}
          showTrailingStroke={showTrailingStroke}
          strokeWidth={strokeWidth}
          leadingStrokeColors={leadingStrokeColors}
          trailingStrokeColors={trailingStrokeColors}
        />
      )}
      {children}
    </>
  );
}

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
