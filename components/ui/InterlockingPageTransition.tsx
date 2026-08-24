"use client";

import { useEffect, useState, useRef } from "react";
import { motion, Transition } from "motion/react";
import React from "react";
import { cn } from "@/lib/utils";

export interface InterlockingPageTransitionProps {
  trigger: number;
  onViewSwap?: () => void;
  className?: string;
  panelClassName?: string;
  columns?: number;
  duration?: number;
  staggerDelay?: number;
  ease?: Transition["ease"];
  direction?: "top" | "bottom" | "left" | "right";
  exitOpposite?: boolean;
}

export default function InterlockingPageTransition({
  trigger,
  onViewSwap,
  className,
  panelClassName,
  columns,
  duration = 0.75,
  staggerDelay = 0.075,
  ease = [0.85, 0, 0.15, 1],
  direction = "top",
  exitOpposite = true,
}: InterlockingPageTransitionProps) {
  const [transitionState, setTransitionState] = useState("idle");
  const [computedColumns, setComputedColumns] = useState(columns || 8);
  const onViewSwapRef = useRef(onViewSwap);

  const isVertical = direction === "top" || direction === "bottom";

  useEffect(() => {
    onViewSwapRef.current = onViewSwap;
  }, [onViewSwap]);

  useEffect(() => {
    if (columns !== undefined) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setComputedColumns(columns);
      return;
    }

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const targetSize = isVertical ? w : h;
      // Target slat size of 120px, minimum of 3 columns
      const count = Math.max(3, Math.ceil(targetSize / 120));
      setComputedColumns(count);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [columns, isVertical]);

  useEffect(() => {
    if (trigger > 0) {
      setTimeout(() => setTransitionState("entering"), 0);

      const totalAnimationTime =
        (duration + (computedColumns - 1) * staggerDelay) * 1000;

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
  }, [trigger, computedColumns, duration, staggerDelay]);

  if (transitionState === "idle") return null;

  const getTransform = (index: number, state: "enter" | "exit") => {
    const isEven = index % 2 === 0;
    if (isVertical) {
      const hiddenOffset = isEven ? "-100dvh" : "100dvh";
      if (state === "enter") {
        return { y: hiddenOffset, x: "0dvw" };
      } else {
        return exitOpposite
          ? { y: isEven ? "100dvh" : "-100dvh", x: "0dvw" }
          : { y: hiddenOffset, x: "0dvw" };
      }
    } else {
      const hiddenOffset = isEven ? "-100dvw" : "100dvw";
      if (state === "enter") {
        return { x: hiddenOffset, y: "0dvh" };
      } else {
        return exitOpposite
          ? { x: isEven ? "100dvw" : "-100dvw", y: "0dvh" }
          : { x: hiddenOffset, y: "0dvh" };
      }
    }
  };

  const panels = Array.from({ length: computedColumns }, (_, i) => i);

  return (
    <div
      key={trigger}
      className={cn(
        "pointer-events-none fixed inset-0 z-[100] flex h-[100dvh] w-[100dvw] overflow-hidden",
        isVertical ? "flex-row" : "flex-col",
        className,
      )}
    >
      {panels.map((i) => {
        return (
          <motion.div
            key={i}
            initial={getTransform(i, "enter")}
            animate={
              transitionState === "entering"
                ? { x: "0dvw", y: "0dvh" }
                : transitionState === "exiting"
                  ? getTransform(i, "exit")
                  : { x: "0dvw", y: "0dvh" }
            }
            transition={{
              duration: duration,
              ease: ease,
              delay: i * staggerDelay,
            }}
            className={cn(
              "pointer-events-auto bg-[#f5f5f5] dark:bg-[#171717]",
              isVertical
                ? "h-full border-r border-black/[0.03] dark:border-white/[0.03]"
                : "w-full border-b border-black/[0.03] dark:border-white/[0.03]",
              panelClassName,
            )}
            style={{
              width: isVertical
                ? `calc(${100 / computedColumns}% + 0.5px)`
                : "100%",
              height: isVertical
                ? "100%"
                : `calc(${100 / computedColumns}% + 0.5px)`,
              marginLeft: isVertical && i > 0 ? "-0.2px" : "0px",
              marginTop: !isVertical && i > 0 ? "-0.2px" : "0px",
            }}
          />
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
  duration,
  staggerDelay,
  ease,
  direction,
  exitOpposite,
}: Omit<InterlockingPageTransitionProps, "trigger" | "onViewSwap"> & {
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
        <InterlockingPageTransition
          trigger={trigger}
          onViewSwap={handleViewSwap}
          className={className}
          panelClassName={panelClassName}
          columns={columns}
          duration={duration}
          staggerDelay={staggerDelay}
          ease={ease}
          direction={direction}
          exitOpposite={exitOpposite}
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
