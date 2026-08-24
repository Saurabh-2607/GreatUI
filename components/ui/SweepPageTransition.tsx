"use client";

import { useEffect, useState, useRef } from "react";
import { motion, Transition } from "motion/react";
import React from "react";
import { cn } from "@/lib/utils";

export interface SweepPageTransitionProps {
  trigger: number;
  onViewSwap?: () => void;
  className?: string;
  colors?: string[];
  duration?: number;
  staggerDelay?: number;
  ease?: Transition["ease"];
  direction?: "top" | "bottom" | "left" | "right";
  exitOpposite?: boolean;
}

export default function SweepPageTransition({
  trigger,
  onViewSwap,
  className,
  colors = ["#e2e8f0", "#cbd5e1", "#94a3b8"],
  duration = 0.7,
  staggerDelay = 0.1,
  ease = [0.76, 0, 0.24, 1],
  direction = "left",
  exitOpposite = true,
}: SweepPageTransitionProps) {
  const [transitionState, setTransitionState] = useState("idle");
  const onViewSwapRef = useRef(onViewSwap);

  useEffect(() => {
    onViewSwapRef.current = onViewSwap;
  }, [onViewSwap]);

  useEffect(() => {
    if (trigger > 0) {
      setTimeout(() => setTransitionState("entering"), 0);

      const numLayers = colors.length;
      const maxStagger = (numLayers - 1) * staggerDelay;
      const totalAnimationTime = (duration + maxStagger) * 1000;

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
  }, [trigger, colors.length, duration, staggerDelay]);

  if (transitionState === "idle") return null;

  const getTransform = (state: "enter" | "exit") => {
    const isVertical = direction === "top" || direction === "bottom";
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
        "pointer-events-none fixed inset-0 z-[100] h-full w-full overflow-hidden",
        className,
      )}
    >
      {colors.map((color, i) => {
        const isCoveredOrEntering =
          transitionState === "entering" || transitionState === "covered";
        const delay =
          transitionState === "entering"
            ? i * staggerDelay
            : (colors.length - 1 - i) * staggerDelay;

        const targetPos = isCoveredOrEntering
          ? { x: "0%", y: "0%" }
          : getTransform("exit");
        const initialPos = getTransform("enter");

        return (
          <motion.div
            key={i}
            initial={initialPos}
            animate={targetPos}
            transition={{ duration, ease, delay }}
            className="pointer-events-auto absolute inset-0 h-full w-full"
            style={{
              backgroundColor: color,
              zIndex: 10 + i,
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
  colors,
  duration,
  staggerDelay,
  ease,
  direction,
  exitOpposite,
}: Omit<SweepPageTransitionProps, "trigger" | "onViewSwap"> & {
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
        <SweepPageTransition
          trigger={trigger}
          onViewSwap={handleViewSwap}
          className={className}
          colors={colors}
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
