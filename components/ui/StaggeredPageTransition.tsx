"use client";

import { useEffect, useState } from "react";
import { motion, Transition } from "motion/react";
import React from "react";
import { cn } from "@/lib/utils";

export interface StaggeredPageTransitionProps {
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

export default function StaggeredPageTransition({
  trigger,
  onViewSwap,
  className,
  panelClassName,
  columns = 5,
  duration = 0.75,
  staggerDelay = 0.075,
  ease = [0.85, 0, 0.15, 1],
  direction = "top",
  exitOpposite = true,
}: StaggeredPageTransitionProps) {
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
        return { y: isEnterBottom ? "100dvh" : "-100dvh", x: "0dvw" };
      } else {
        return exitOpposite
          ? { y: isEnterBottom ? "-100dvh" : "100dvh", x: "0dvw" }
          : { y: isEnterBottom ? "100dvh" : "-100dvh", x: "0dvw" };
      }
    } else {
      const isEnterRight = direction === "right";
      if (state === "enter") {
        return { x: isEnterRight ? "100dvw" : "-100dvw", y: "0dvh" };
      } else {
        return exitOpposite
          ? { x: isEnterRight ? "-100dvw" : "100dvw", y: "0dvh" }
          : { x: isEnterRight ? "100dvw" : "-100dvw", y: "0dvh" };
      }
    }
  };

  return (
    <div
      key={trigger}
      className={cn(
        "pointer-events-none fixed inset-0 z-[100] flex h-[100dvh] w-[100dvw]",
        isVertical ? "flex-row" : "flex-col",
        className,
      )}
    >
      {panels.map((i) => {
        return (
          <motion.div
            key={i}
            initial={getTransform("enter")}
            animate={
              transitionState === "entering"
                ? { x: "0dvw", y: "0dvh" }
                : transitionState === "exiting"
                  ? getTransform("exit")
                  : { x: "0dvw", y: "0dvh" }
            }
            transition={{
              duration: duration,
              ease: ease,
              delay: i * staggerDelay,
            }}
            className={cn(
              "pointer-events-auto h-full flex-1 bg-[#f5f5f5] dark:bg-[#171717]",
              isVertical
                ? "border-r border-black/[0.03] dark:border-white/[0.03]"
                : "border-b border-black/[0.03] dark:border-white/[0.03]",
              panelClassName,
            )}
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
}: Omit<StaggeredPageTransitionProps, "trigger" | "onViewSwap"> & {
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

      // Verify it's a valid local route change
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
        <StaggeredPageTransition
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
