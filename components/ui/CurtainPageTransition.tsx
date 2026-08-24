"use client";

import { useEffect, useState, useRef } from "react";
import { motion, Transition } from "motion/react";
import React from "react";
import { cn } from "@/lib/utils";

export interface CurtainPageTransitionProps {
  trigger: number;
  onViewSwap?: () => void;
  className?: string;
  panelClassName?: string;
  duration?: number;
  ease?: Transition["ease"];
  direction?: "vertical" | "horizontal";
}

export default function CurtainPageTransition({
  trigger,
  onViewSwap,
  className,
  panelClassName,
  duration = 0.8,
  ease = [0.76, 0, 0.24, 1],
  direction = "horizontal",
}: CurtainPageTransitionProps) {
  const [transitionState, setTransitionState] = useState("idle");
  const onViewSwapRef = useRef(onViewSwap);

  useEffect(() => {
    onViewSwapRef.current = onViewSwap;
  }, [onViewSwap]);

  useEffect(() => {
    if (trigger > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTransitionState("entering");

      const totalAnimationTime = duration * 1000;

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
  }, [trigger, duration]);

  if (transitionState === "idle") return null;

  const isHorizontal = direction === "horizontal";

  const getTransform = (side: "first" | "second", state: "enter" | "exit") => {
    if (state === "enter") {
      if (isHorizontal) {
        return { x: side === "first" ? "-100%" : "100%", y: "0%" };
      } else {
        return { y: side === "first" ? "-100%" : "100%", x: "0%" };
      }
    } else {
      if (isHorizontal) {
        return { x: side === "first" ? "-100%" : "100%", y: "0%" };
      } else {
        return { y: side === "first" ? "-100%" : "100%", x: "0%" };
      }
    }
  };

  const isCoveredOrEntering =
    transitionState === "entering" || transitionState === "covered";

  return (
    <div
      key={trigger}
      className={cn(
        "pointer-events-none fixed inset-0 z-[100] h-full w-full overflow-hidden",
        className,
      )}
    >
      <motion.div
        initial={getTransform("first", "enter")}
        animate={
          isCoveredOrEntering
            ? { x: "0%", y: "0%" }
            : getTransform("first", "exit")
        }
        transition={{ duration, ease }}
        className={cn(
          "pointer-events-auto absolute bg-[#f5f5f5] dark:bg-[#171717]",
          isHorizontal
            ? "top-0 left-0 h-full w-[50.5%]"
            : "top-0 left-0 h-[50.5%] w-full",
          panelClassName,
        )}
      />
      <motion.div
        initial={getTransform("second", "enter")}
        animate={
          isCoveredOrEntering
            ? { x: "0%", y: "0%" }
            : getTransform("second", "exit")
        }
        transition={{ duration, ease }}
        className={cn(
          "pointer-events-auto absolute bg-[#f5f5f5] dark:bg-[#171717]",
          isHorizontal
            ? "top-0 right-0 h-full w-[50.5%]"
            : "bottom-0 left-0 h-[50.5%] w-full",
          panelClassName,
        )}
      />
    </div>
  );
}

export function RouteTransitionProvider({
  children,
  navigate,
  className,
  panelClassName,
  duration,
  ease,
  direction,
}: Omit<CurtainPageTransitionProps, "trigger" | "onViewSwap"> & {
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
        <CurtainPageTransition
          trigger={trigger}
          onViewSwap={handleViewSwap}
          className={className}
          panelClassName={panelClassName}
          duration={duration}
          ease={ease}
          direction={direction}
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
