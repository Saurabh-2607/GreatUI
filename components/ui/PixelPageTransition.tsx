"use client";

import { useEffect, useState, useRef } from "react";
import { motion, Transition } from "motion/react";
import React from "react";
import { cn } from "@/lib/utils";

// Helper function to generate a shuffled array of indices
const getShuffledIndices = (count: number) => {
  const arr = Array.from({ length: count }, (_, i) => i);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export interface PixelPageTransitionProps {
  trigger: number;
  onViewSwap?: () => void;
  className?: string;
  panelClassName?: string;
  pixelSize?: number;
  duration?: number;
  staggerDuration?: number;
  ease?: Transition["ease"];
}

export default function PixelPageTransition({
  trigger,
  onViewSwap,
  className,
  panelClassName,
  pixelSize = 40,
  duration = 0.2,
  staggerDuration = 0.4,
  ease = "easeInOut",
}: PixelPageTransitionProps) {
  const [transitionState, setTransitionState] = useState("idle");
  const [grid, setGrid] = useState({ cols: 0, rows: 0, size: 0, total: 0 });
  const [shuffleOrder, setShuffleOrder] = useState<number[]>([]);
  const onViewSwapRef = useRef(onViewSwap);

  useEffect(() => {
    onViewSwapRef.current = onViewSwap;
  }, [onViewSwap]);

  useEffect(() => {
    const updateGrid = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const cols = Math.ceil(w / pixelSize);
      const size = w / cols;
      const rows = Math.ceil(h / size);
      const total = cols * rows;
      setGrid({ cols, rows, size, total });
      setShuffleOrder(getShuffledIndices(total));
    };

    updateGrid();
    window.addEventListener("resize", updateGrid);
    return () => window.removeEventListener("resize", updateGrid);
  }, [pixelSize]);

  useEffect(() => {
    if (trigger > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTransitionState("entering");

      const coverTime = (duration + staggerDuration) * 1000;

      const coverTimeout = setTimeout(() => {
        setTransitionState("covered");
        if (onViewSwapRef.current) onViewSwapRef.current();
        setTransitionState("exiting");
      }, coverTime);

      const endTimeout = setTimeout(() => {
        setTransitionState("idle");
      }, coverTime * 2);

      return () => {
        clearTimeout(coverTimeout);
        clearTimeout(endTimeout);
      };
    }
  }, [trigger, duration, staggerDuration]);

  if (
    transitionState === "idle" ||
    grid.total === 0 ||
    shuffleOrder.length === 0
  ) {
    return null;
  }

  return (
    <div
      key={trigger}
      className={cn(
        "pointer-events-none fixed inset-0 z-[100] grid h-screen w-screen overflow-hidden",
        className,
      )}
      style={{
        gridTemplateColumns: `repeat(${grid.cols}, ${grid.size}px)`,
        gridTemplateRows: `repeat(${grid.rows}, ${grid.size}px)`,
      }}
    >
      {Array.from({ length: grid.total }).map((_, index) => {
        const order = shuffleOrder[index];
        const delay = (order / grid.total) * staggerDuration;

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={
              transitionState === "entering" || transitionState === "covered"
                ? { opacity: 1 }
                : { opacity: 0 }
            }
            transition={{
              duration: duration,
              ease: ease,
              delay: delay,
            }}
            className={cn(
              "pointer-events-auto h-full w-full border border-black/[0.015] bg-[#f5f5f5] dark:border-white/[0.015] dark:bg-[#171717]",
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
  pixelSize,
  duration,
  staggerDuration,
  ease,
}: Omit<PixelPageTransitionProps, "trigger" | "onViewSwap"> & {
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
        <PixelPageTransition
          trigger={trigger}
          onViewSwap={handleViewSwap}
          className={className}
          panelClassName={panelClassName}
          pixelSize={pixelSize}
          duration={duration}
          staggerDuration={staggerDuration}
          ease={ease}
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
