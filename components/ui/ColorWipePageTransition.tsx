"use client";

import { useEffect, useState } from "react";
import { motion, Transition } from "motion/react";
import React from "react";
import { cn } from "@/lib/utils";

export interface ColorWipePageTransitionProps {
  trigger: number;
  onViewSwap?: () => void;
  panelColor?: string;
  columns?: number;
  duration?: number;
  staggerDelay?: number;
  ease?: Transition["ease"];
  direction?: "top" | "bottom" | "left" | "right";
  exitOpposite?: boolean;
  showLeadingStroke?: boolean;
  showTrailingStroke?: boolean;
  strokeWidth?: number;
  leadingStrokeColors?: string[];
  trailingStrokeColors?: string[];
}

export function ColorWipePageTransition({
  trigger,
  onViewSwap,
  panelColor,
  columns = 10,
  duration = 0.45,
  staggerDelay = 0.03,
  ease = [0.85, 0, 0.15, 1],
  direction = "left",
  exitOpposite = false,
  showLeadingStroke = true,
  showTrailingStroke = true,
  strokeWidth = 10,
  leadingStrokeColors = [
    "#facc15",
    "#ec4899",
    "#38bdf8",
    "#4ade80",
    "#a855f7",
    "#fb923c",
    "#ef4444",
    "#06b6d4",
    "#f43f5e",
    "#10b981",
  ],
  trailingStrokeColors = [
    "#facc15",
    "#ec4899",
    "#38bdf8",
    "#4ade80",
    "#a855f7",
    "#fb923c",
    "#ef4444",
    "#06b6d4",
    "#f43f5e",
    "#10b981",
  ],
}: ColorWipePageTransitionProps) {
  const [transitionState, setTransitionState] = useState("idle");
  const onViewSwapRef = React.useRef(onViewSwap);

  useEffect(() => {
    onViewSwapRef.current = onViewSwap;
  }, [onViewSwap]);

  useEffect(() => {
    if (trigger > 0) {
      setTimeout(() => setTransitionState("entering"), 0);

      const totalAnimationTime =
        (duration + (columns - 1) * staggerDelay) * 1000;

      const coverTimeout = setTimeout(() => {
        if (onViewSwapRef.current) onViewSwapRef.current();
        setTransitionState("covered");
      }, totalAnimationTime);

      const exitTimeout = setTimeout(() => {
        setTransitionState("exiting");
      }, totalAnimationTime + 50);

      const idleTimeout = setTimeout(
        () => {
          setTransitionState("idle");
        },
        totalAnimationTime * 2 + 50,
      );

      return () => {
        clearTimeout(coverTimeout);
        clearTimeout(exitTimeout);
        clearTimeout(idleTimeout);
      };
    }
  }, [trigger, columns, duration, staggerDelay]);

  if (transitionState === "idle") return null;

  const panels = Array.from({ length: columns }, (_, i) => i);
  const isVertical = direction === "top" || direction === "bottom";

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

  return (
    <div
      key={trigger}
      className={cn(
        "pointer-events-none fixed inset-0 z-[100] flex h-full w-full",
        isVertical ? "flex-row" : "flex-col",
      )}
    >
      {panels.map((i) => {
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

        return (
          <motion.div
            key={i}
            initial={getTransform("enter")}
            animate={
              transitionState === "entering" || transitionState === "covered"
                ? { x: "0%", y: "0%" }
                : transitionState === "exiting"
                  ? getTransform("exit")
                  : { x: "0%", y: "0%" }
            }
            transition={{
              duration: duration,
              ease: ease,
              delay: i * staggerDelay,
            }}
            className={cn(
              "pointer-events-auto relative flex flex-1 items-center",
              isVertical ? "-ml-[0.2vw]" : "-mt-[0.2dvh]",
              !panelColor && "bg-[#f5f5f5] dark:bg-[#171717]",
            )}
            style={{
              width: isVertical ? `calc(${100 / columns}% + 0.4%)` : "100%",
              height: !isVertical ? `calc(${100 / columns}% + 0.4%)` : "100%",
              backgroundColor: panelColor,
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
  panelColor,
  columns,
  duration,
  staggerDelay,
  ease,
  direction,
  exitOpposite,
  showLeadingStroke,
  showTrailingStroke,
  strokeWidth,
  leadingStrokeColors,
  trailingStrokeColors,
}: Omit<ColorWipePageTransitionProps, "trigger" | "onViewSwap"> & {
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
        <ColorWipePageTransition
          trigger={trigger}
          onViewSwap={handleViewSwap}
          panelColor={panelColor}
          columns={columns}
          duration={duration}
          staggerDelay={staggerDelay}
          ease={ease}
          direction={direction}
          exitOpposite={exitOpposite}
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
