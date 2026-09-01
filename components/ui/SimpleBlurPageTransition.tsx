"use client";

import { useEffect, useState, useRef } from "react";
import { motion, Transition } from "motion/react";
import React from "react";
import { cn } from "@/lib/utils";

export interface SimpleBlurPageTransitionProps {
  trigger: number;
  onViewSwap?: () => void;
  className?: string;
  duration?: number;
  maxBlur?: number;
  ease?: Transition["ease"];
}

export default function SimpleBlurPageTransition({
  trigger,
  onViewSwap,
  className,
  duration = 0.6,
  maxBlur = 20,
  ease = "easeInOut",
}: SimpleBlurPageTransitionProps) {
  const [transitionState, setTransitionState] = useState("idle");
  const onViewSwapRef = useRef(onViewSwap);

  useEffect(() => {
    onViewSwapRef.current = onViewSwap;
  }, [onViewSwap]);

  useEffect(() => {
    if (trigger > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTransitionState("entering");

      const halfTime = (duration / 2) * 1000;

      const swapTimeout = setTimeout(() => {
        if (onViewSwapRef.current) onViewSwapRef.current();
        setTransitionState("exiting");
      }, halfTime);

      const doneTimeout = setTimeout(() => {
        setTransitionState("idle");
      }, duration * 1000);

      return () => {
        clearTimeout(swapTimeout);
        clearTimeout(doneTimeout);
      };
    }
  }, [trigger, duration]);

  if (transitionState === "idle") return null;

  return (
    <motion.div
      initial={{
        opacity: 0,
        backdropFilter: "blur(0px)",
      }}
      animate={
        transitionState === "entering"
          ? {
              opacity: 1,
              backdropFilter: `blur(${maxBlur}px)`,
            }
          : {
              opacity: 0,
              backdropFilter: "blur(0px)",
            }
      }
      transition={{
        duration: duration / 2,
        ease,
      }}
      style={{
        WebkitBackdropFilter:
          transitionState === "entering" ? `blur(${maxBlur}px)` : "blur(0px)",
      }}
      className={cn(
        "fixed inset-0 z-[9999] bg-white/10 dark:bg-black/10",
        className,
      )}
    />
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
