"use client";

import { useEffect, useState, useRef } from "react";
import { motion, Transition } from "motion/react";
import React from "react";
import { cn } from "@/lib/utils";

export interface VenetianBlindsPageTransitionProps {
  trigger: number;
  onViewSwap?: () => void;
  className?: string;
  panelClassName?: string;
  columns?: number;
  duration?: number;
  staggerDelay?: number;
  staggerType?: "linear" | "center-out" | "edge-in";
  ease?: Transition["ease"];
  direction?: "horizontal" | "vertical";
  origin?: "center" | "top" | "bottom" | "left" | "right";
}

export default function VenetianBlindsPageTransition({
  trigger,
  onViewSwap,
  className,
  panelClassName,
  columns = 20,
  duration = 0.5,
  staggerDelay = 0.02,
  staggerType = "linear",
  ease = [0.76, 0, 0.24, 1],
  direction = "horizontal",
  origin = "center",
}: VenetianBlindsPageTransitionProps) {
  const [transitionState, setTransitionState] = useState("idle");
  const onViewSwapRef = useRef(onViewSwap);

  useEffect(() => {
    onViewSwapRef.current = onViewSwap;
  }, [onViewSwap]);

  useEffect(() => {
    if (trigger > 0) {
      setTimeout(() => setTransitionState("entering"), 0);

      const maxDistance = columns / 2;
      const maxDelayFactor =
        staggerType === "linear" ? columns - 1 : maxDistance;
      const totalAnimationTime =
        (duration + maxDelayFactor * staggerDelay) * 1000;

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
  }, [trigger, columns, duration, staggerDelay, staggerType]);

  if (transitionState === "idle") return null;

  const isHorizontal = direction === "horizontal";
  const panels = Array.from({ length: columns }, (_, i) => i);

  return (
    <div
      key={trigger}
      className={cn(
        "pointer-events-none fixed inset-0 z-[100] flex h-full w-full overflow-hidden",
        isHorizontal ? "flex-col" : "flex-row",
        className,
      )}
    >
      {panels.map((i) => {
        const centerIndex = (columns - 1) / 2;
        const distanceFromCenter = Math.abs(i - centerIndex);
        const maxDistance = columns / 2;

        let delay = i * staggerDelay;
        if (staggerType === "center-out") {
          const minDistance = columns % 2 === 0 ? 0.5 : 0;
          delay = (distanceFromCenter - minDistance) * staggerDelay;
        } else if (staggerType === "edge-in") {
          const minDistance = columns % 2 === 0 ? 0.5 : 0;
          delay =
            (maxDistance - (distanceFromCenter - minDistance)) * staggerDelay;
        }

        const isCoveredOrEntering =
          transitionState === "entering" || transitionState === "covered";

        return (
          <motion.div
            key={i}
            initial={isHorizontal ? { scaleY: 0 } : { scaleX: 0 }}
            animate={
              isCoveredOrEntering
                ? isHorizontal
                  ? { scaleY: 1 }
                  : { scaleX: 1 }
                : isHorizontal
                  ? { scaleY: 0 }
                  : { scaleX: 0 }
            }
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
              width: isHorizontal ? "100%" : `calc(${100 / columns}% + 0.5px)`,
              height: isHorizontal ? `calc(${100 / columns}% + 0.5px)` : "100%",
              transformOrigin: origin,
              marginTop: isHorizontal && i > 0 ? "-0.2px" : "0px",
              marginLeft: !isHorizontal && i > 0 ? "-0.2px" : "0px",
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
  staggerType,
  ease,
  direction,
  origin,
}: Omit<VenetianBlindsPageTransitionProps, "trigger" | "onViewSwap"> & {
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
        <VenetianBlindsPageTransition
          trigger={trigger}
          onViewSwap={handleViewSwap}
          className={className}
          panelClassName={panelClassName}
          columns={columns}
          duration={duration}
          staggerDelay={staggerDelay}
          staggerType={staggerType}
          ease={ease}
          direction={direction}
          origin={origin}
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
