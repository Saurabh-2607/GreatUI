"use client";

import { useEffect, useState, useRef } from "react";
import { motion, Transition } from "motion/react";
import React from "react";
import { cn } from "@/lib/utils";

export interface SineWavePageTransitionProps {
  trigger: number;
  onViewSwap?: () => void;
  className?: string;
  panelClassName?: string;
  columns?: number;
  duration?: number;
  maxDelay?: number;
  ease?: Transition["ease"];
  direction?: "top" | "bottom" | "left" | "right";
  exitOpposite?: boolean;
}

export default function SineWavePageTransition({
  trigger,
  onViewSwap,
  className,
  panelClassName,
  columns = 20,
  duration = 0.5,
  maxDelay = 0.4,
  ease = [0.76, 0, 0.24, 1],
  direction = "top",
  exitOpposite = true,
}: SineWavePageTransitionProps) {
  const [transitionState, setTransitionState] = useState("idle");
  const onViewSwapRef = useRef(onViewSwap);

  useEffect(() => {
    onViewSwapRef.current = onViewSwap;
  }, [onViewSwap]);

  useEffect(() => {
    if (trigger > 0) {
      setTimeout(() => setTransitionState("entering"), 0);

      const totalAnimationTime = (duration + maxDelay) * 1000;

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
  }, [trigger, duration, maxDelay]);

  if (transitionState === "idle") return null;

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
        const waveProgress = i / (columns - 1);
        const sineValue = (Math.sin(waveProgress * Math.PI * 2) + 1) / 2;
        const delay = sineValue * maxDelay;

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
              "pointer-events-auto bg-[#f5f5f5] dark:bg-[#171717]",
              panelClassName,
            )}
            style={{
              width: isVertical ? `${100 / columns}%` : "100%",
              height: isVertical ? "100%" : `${100 / columns}%`,
              transform: isVertical ? "scaleX(1.05)" : "scaleY(1.05)",
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
  maxDelay,
  ease,
  direction,
  exitOpposite,
}: Omit<SineWavePageTransitionProps, "trigger" | "onViewSwap"> & {
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
        <SineWavePageTransition
          trigger={trigger}
          onViewSwap={handleViewSwap}
          className={className}
          panelClassName={panelClassName}
          columns={columns}
          duration={duration}
          maxDelay={maxDelay}
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
