"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import Container from "./Container";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { components } from "@/lib/registry";
import FloatingMenuPreview from "@/components/site/previews/FloatingMenuPreview";
import MultilingualQuotePreview from "@/components/site/previews/MultilingualQuotePreview";
import AccordionPreview from "@/components/site/previews/AccordionPreview";
import RevisionTimelinePreview from "@/components/site/previews/RevisionTimelinePreview";
import TeamSectionPreview from "@/components/site/previews/TeamSectionPreview";
import InstagramCardPreview from "@/components/site/previews/InstagramCardPreview";
import PixelToAsciiImagePreview from "@/components/site/previews/PixelToAsciiImagePreview";
import FluidAppDockPreview from "@/components/site/previews/FluidAppDockPreview";

interface ShowcaseItem {
  id: string;
  title: string;
  icon: React.ReactNode;
}

interface SimulationStep {
  selector?: string;
  index?: number;
  offsetX?: number;
  offsetY?: number;
  relX?: number;
  relY?: number;
  x?: number;
  y?: number;
  action?: "click" | "hover" | "unhover" | "move";
  duration?: number;
  wait?: number;
}

interface ComponentPropsCarrier {
  onMouseMove?: (e: {
    clientX: number;
    clientY: number;
    currentTarget?: EventTarget | null;
    target?: EventTarget | null;
  }) => void;
  onMouseLeave?: (e?: {
    currentTarget?: EventTarget | null;
    target?: EventTarget | null;
  }) => void;
  onMouseEnter?: (e?: unknown) => void;
  [key: string]: unknown;
}

const COMPONENT_SCRIPTS: Record<string, SimulationStep[]> = {
  "pixel-to-ascii": [
    {
      selector: "canvas",
      relX: 0.5,
      relY: 0.5,
      action: "hover",
      duration: 600,
      wait: 2000,
    },
    { relX: 0.88, relY: 0.85, action: "unhover", duration: 600, wait: 1400 },
  ],
  "floating-menu": [
    {
      selector: "[class*='h-14'] [class*='space-x-2.5'] > div",
      action: "click",
      duration: 650,
      wait: 850,
    },
    {
      selector: "[class*='h-14'] [class*='space-x-2.5'] > div",
      action: "click",
      duration: 600,
      wait: 1200,
    },
    { relX: 0.85, relY: 0.85, action: "unhover", duration: 500, wait: 800 },
  ],
  "multilingual-quote": [
    {
      selector: "button:nth-of-type(2)",
      action: "click",
      duration: 600,
      wait: 1100,
    },
    {
      selector: "button:nth-of-type(3)",
      action: "click",
      duration: 550,
      wait: 1100,
    },
    {
      selector: "button:nth-of-type(4)",
      action: "click",
      duration: 550,
      wait: 1100,
    },
    {
      selector: "button:nth-of-type(1)",
      action: "click",
      duration: 550,
      wait: 1200,
    },
    { relX: 0.85, relY: 0.85, action: "unhover", duration: 500, wait: 600 },
  ],
  accordion: [
    {
      selector: "div > div:nth-child(2) button",
      action: "click",
      duration: 600,
      wait: 1100,
    },
    {
      selector: "div > div:nth-child(3) button",
      action: "click",
      duration: 550,
      wait: 1100,
    },
    {
      selector: "div > div:nth-child(1) button",
      action: "click",
      duration: 550,
      wait: 1100,
    },
    { relX: 0.85, relY: 0.85, action: "unhover", duration: 500, wait: 600 },
  ],
  "revision-timeline": [
    {
      selector: "button[title='Previous Day']",
      action: "click",
      duration: 600,
      wait: 1100,
    },
    {
      selector: "button[title='Previous Day']",
      action: "click",
      duration: 500,
      wait: 1100,
    },
    {
      selector: "button[title='Next Day']",
      action: "click",
      duration: 500,
      wait: 1100,
    },
    { relX: 0.85, relY: 0.85, action: "unhover", duration: 500, wait: 600 },
  ],
  "team-section": [
    { relX: 0.35, relY: 0.5, action: "hover", duration: 600, wait: 700 },
    { relX: 0.65, relY: 0.5, action: "hover", duration: 600, wait: 800 },
    { relX: 0.85, relY: 0.85, action: "unhover", duration: 500, wait: 600 },
  ],
  "instagram-card": [
    {
      selector: "a[href*='instagram']",
      action: "hover",
      duration: 600,
      wait: 800,
    },
    { relX: 0.5, relY: 0.32, action: "hover", duration: 500, wait: 1200 },
    { relX: 0.85, relY: 0.85, action: "unhover", duration: 600, wait: 800 },
  ],
};

const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: "fluid-app-dock",
    title: "Fluid App Dock",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4"
      >
        <rect width="20" height="12" x="2" y="6" rx="3" />
        <circle cx="6.5" cy="12" r="1.5" />
        <circle cx="12" cy="12" r="1.5" />
        <circle cx="17.5" cy="12" r="1.5" />
      </svg>
    ),
  },
  {
    id: "pixel-to-ascii",
    title: "Pixel to ASCII",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-4"
      >
        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
      </svg>
    ),
  },
  {
    id: "floating-menu",
    title: "Floating Menu",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4"
      >
        <path d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    ),
  },
  {
    id: "multilingual-quote",
    title: "Multilingual Quote",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-4"
      >
        <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.956.76-3.022.66-1.065 1.515-1.867 2.558-2.403L9.373 5c-.8.396-1.56.898-2.26 1.505-.71.607-1.34 1.305-1.9 2.094s-.98 1.68-1.25 2.69-.346 2.04-.217 3.1c.168 1.4.62 2.52 1.356 3.35.735.84 1.652 1.26 2.748 1.26.965 0 1.766-.29 2.4-.878.628-.576.94-1.39.94-2.44zM22.758 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.956.76-3.022.66-1.065 1.515-1.867 2.558-2.403L20.939 5c-.8.396-1.56.898-2.26 1.505-.71.607-1.34 1.305-1.9 2.094s-.98 1.68-1.25 2.69-.346 2.04-.217 3.1c.168 1.4.62 2.52 1.356 3.35.735.84 1.652 1.26 2.748 1.26.965 0 1.766-.29 2.4-.878.628-.576.94-1.39.94-2.44z" />
      </svg>
    ),
  },
  {
    id: "accordion",
    title: "Accordion",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-4"
      >
        <path d="M19 8H5c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2zm0 6H5v-4h14v4zM5 2h14c1.1 0 2 .9 2 2v2H3V4c0-1.1.9-2 2-2zm14 18H5c-1.1 0-2-.9-2-2v-2h18v2c0 1.1-.9 2-2 2z" />
      </svg>
    ),
  },
  {
    id: "revision-timeline",
    title: "Revision Timeline",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    id: "team-section",
    title: "Team Section",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    id: "instagram-card",
    title: "Instagram Card",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4"
      >
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
];

const getSingleCycleDuration = (steps: SimulationStep[]) => {
  const stepsTime = steps.reduce((sum, step) => {
    const move = step.duration ?? 500;
    const actionExtra = step.action === "click" ? 180 : 0;
    const wait =
      step.wait ??
      (step.action === "hover" || step.action === "unhover" ? 600 : 400);
    return sum + move + actionExtra + wait;
  }, 0);
  return stepsTime + 200;
};

const getSlideDuration = (slideId: string) => {
  const steps = COMPONENT_SCRIPTS[slideId] || [];
  if (steps.length === 0) return 8000;
  return getSingleCycleDuration(steps) * 2;
};

export function ComponentShowcase() {
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const [cursor, setCursor] = useState({
    x: 100,
    y: 100,
    isDown: false,
    visible: false,
    durationMs: 450,
  });

  useEffect(() => {
    if (activeTabRef.current && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const activeTab = activeTabRef.current;
      const scrollLeft =
        activeTab.offsetLeft -
        container.offsetWidth / 2 +
        activeTab.offsetWidth / 2;

      container.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });
    }
  }, [activeTabIdx]);

  const activeTab = SHOWCASE_ITEMS[activeTabIdx] || SHOWCASE_ITEMS[0];
  const activeSlideDuration = getSlideDuration(activeTab.id);
  const activeComponentPreviewVideo = components.find(
    (c) => c.slug === activeTab.id,
  )?.preview;

  const handleTabClick = (idx: number) => {
    setActiveTabIdx(idx);
  };

  const getDockProps = useCallback(
    (container: HTMLElement | null): ComponentPropsCarrier | null => {
      if (!container) return null;
      const dock = container.querySelector("svg.pointer-events-none")
        ?.parentElement as (HTMLElement & Record<string, unknown>) | null;
      if (!dock) return null;
      const propKey = Object.keys(dock).find((k) =>
        k.startsWith("__reactProps"),
      );
      return propKey ? (dock[propKey] as ComponentPropsCarrier) : null;
    },
    [],
  );

  const resetFluidDock = useCallback(
    (container: HTMLElement | null) => {
      if (!container) return;
      const dockProps = getDockProps(container);
      dockProps?.onMouseLeave?.({
        currentTarget: container,
        target: container,
      });
      const buttons = container.querySelectorAll("button[aria-label]");
      buttons.forEach((btn) => {
        const w = (btn.closest(".relative.flex.shrink-0") ||
          btn.parentElement) as (HTMLElement & Record<string, unknown>) | null;
        if (w) {
          const k = Object.keys(w).find((x) => x.startsWith("__reactProps"));
          if (k) {
            const carrier = w[k] as ComponentPropsCarrier | undefined;
            carrier?.onMouseLeave?.();
          }
        }
      });
    },
    [getDockProps],
  );

  const handlePointerEnter = () => {
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    }
    setIsHovered(true);
    setCursor((c) => ({ ...c, visible: false }));
    resetFluidDock(stageRef.current);
  };

  const handlePointerLeave = () => {
    resetFluidDock(stageRef.current);
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }
    idleTimerRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 2500);
  };

  const resolveTargetPosition = useCallback(
    (container: HTMLElement, step: SimulationStep) => {
      const containerRect = container.getBoundingClientRect();
      if (step.selector) {
        const elements = container.querySelectorAll(step.selector);
        const el = (
          step.index !== undefined ? elements[step.index] : elements[0]
        ) as HTMLElement | undefined;
        if (el) {
          const elRect = el.getBoundingClientRect();
          const targetX =
            step.offsetX !== undefined
              ? elRect.left + step.offsetX - containerRect.left
              : elRect.left + elRect.width / 2 - containerRect.left;
          const targetY =
            step.offsetY !== undefined
              ? elRect.top + step.offsetY - containerRect.top
              : elRect.top + elRect.height / 2 - containerRect.top;
          return {
            x: targetX,
            y: targetY,
            element: el,
          };
        }
      }
      if (step.relX !== undefined && step.relY !== undefined) {
        return {
          x: containerRect.width * step.relX,
          y: containerRect.height * step.relY,
          element: null,
        };
      }
      return {
        x: step.x ?? containerRect.width / 2,
        y: step.y ?? containerRect.height / 2,
        element: null,
      };
    },
    [],
  );

  useEffect(() => {
    if (isHovered) return;

    let isCancelled = false;
    let rafId: number | null = null;
    let activeHoveredWrapper: HTMLElement | null = null;
    const currentStageAtMount = stageRef.current;

    if (activeTab.id === "fluid-app-dock") {
      async function runFluidSweep() {
        await new Promise((r) => setTimeout(r, 60));
        if (isCancelled) return;

        const stage = stageRef.current;
        if (!stage) return;

        const getBounds = () => {
          const currentStage = stageRef.current;
          if (!currentStage) return null;
          const sRect = currentStage.getBoundingClientRect();
          const btns = currentStage.querySelectorAll("button[aria-label]");
          if (!btns.length) return null;
          const fRect = btns[0].getBoundingClientRect();
          const lRect = btns[btns.length - 1].getBoundingClientRect();
          return {
            startX: fRect.left + fRect.width / 2 - sRect.left,
            endX: lRect.left + lRect.width / 2 - sRect.left,
            targetY: fRect.top + fRect.height / 2 - sRect.top,
          };
        };

        const initial = getBounds();
        if (!initial) return;

        setCursor({
          x: initial.startX,
          y: initial.targetY,
          isDown: false,
          visible: true,
          durationMs: 300,
        });

        await new Promise((r) => setTimeout(r, 320));
        if (isCancelled) return;

        let fromX = initial.startX;
        let toX = initial.endX;
        let currentY = initial.targetY;
        const sweepDuration = 2600;
        let startTime = performance.now();

        const animate = (now: number) => {
          if (isCancelled) return;

          const elapsed = now - startTime;
          const progress = Math.min(elapsed / sweepDuration, 1);
          const ease = 0.5 - 0.5 * Math.cos(progress * Math.PI);
          const currentX = fromX + (toX - fromX) * ease;

          setCursor({
            x: currentX,
            y: currentY,
            isDown: false,
            visible: true,
            durationMs: 0,
          });

          const currentStage = stageRef.current;
          if (currentStage) {
            const currentStageRect = currentStage.getBoundingClientRect();
            const clientX = currentStageRect.left + currentX;
            const clientY = currentStageRect.top + currentY;

            const btns = currentStage.querySelectorAll("button[aria-label]");
            const dockProps = getDockProps(currentStage);
            dockProps?.onMouseMove?.({
              clientX,
              clientY,
              currentTarget: currentStage,
              target: currentStage,
            });

            let closestWrapper: HTMLElement | null = null;
            let minDistance = Infinity;

            for (let i = 0; i < btns.length; i++) {
              const bRect = btns[i].getBoundingClientRect();
              const cX = bRect.left + bRect.width / 2;
              const dist = Math.abs(clientX - cX);
              if (dist < minDistance && dist < bRect.width / 2 + 8) {
                minDistance = dist;
                closestWrapper = (btns[i].closest(".relative.flex.shrink-0") ||
                  btns[i].parentElement) as HTMLElement;
              }
            }

            if (closestWrapper !== activeHoveredWrapper) {
              if (activeHoveredWrapper) {
                const carrierEl = activeHoveredWrapper as HTMLElement &
                  Record<string, unknown>;
                const k = Object.keys(carrierEl).find((x) =>
                  x.startsWith("__reactProps"),
                );
                if (k) {
                  const carrier = carrierEl[k] as
                    ComponentPropsCarrier | undefined;
                  carrier?.onMouseLeave?.();
                }
              }
              if (closestWrapper) {
                const carrierEl = closestWrapper as HTMLElement &
                  Record<string, unknown>;
                const k = Object.keys(carrierEl).find((x) =>
                  x.startsWith("__reactProps"),
                );
                if (k) {
                  const carrier = carrierEl[k] as
                    ComponentPropsCarrier | undefined;
                  carrier?.onMouseEnter?.();
                }
              }
              activeHoveredWrapper = closestWrapper;
            }
          }

          if (progress >= 1) {
            const updated = getBounds();
            if (updated) {
              currentY = updated.targetY;
              if (fromX < toX) {
                fromX = updated.endX;
                toX = updated.startX;
              } else {
                fromX = updated.startX;
                toX = updated.endX;
              }
            } else {
              const temp = fromX;
              fromX = toX;
              toX = temp;
            }
            startTime = performance.now();
          }

          rafId = requestAnimationFrame(animate);
        };

        rafId = requestAnimationFrame(animate);
      }

      runFluidSweep();

      return () => {
        isCancelled = true;
        if (rafId !== null) {
          cancelAnimationFrame(rafId);
        }
        activeHoveredWrapper = null;
        resetFluidDock(currentStageAtMount);
      };
    }

    let activeHoveredEl: HTMLElement | null = null;
    const steps = COMPONENT_SCRIPTS[activeTab.id] || [];
    if (steps.length === 0) return;

    const dispatchHover = (el: HTMLElement | null) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const clientX = rect.left + rect.width / 2;
      const clientY = rect.top + rect.height / 2;
      const eventInit = {
        bubbles: true,
        cancelable: true,
        clientX,
        clientY,
      };
      el.dispatchEvent(new MouseEvent("mousemove", eventInit));
      el.dispatchEvent(new MouseEvent("mouseover", eventInit));
      el.dispatchEvent(new MouseEvent("mouseenter", eventInit));
      el.dispatchEvent(new PointerEvent("pointerenter", eventInit));
      const dockContainer = el.closest(".select-none") || el.parentElement;
      if (dockContainer) {
        dockContainer.dispatchEvent(new MouseEvent("mousemove", eventInit));
      }
    };

    const dispatchUnhover = (el: HTMLElement | null) => {
      if (!el) return;
      el.dispatchEvent(
        new MouseEvent("mouseout", { bubbles: true, cancelable: true }),
      );
      el.dispatchEvent(
        new MouseEvent("mouseleave", { bubbles: true, cancelable: true }),
      );
      el.dispatchEvent(
        new PointerEvent("pointerleave", { bubbles: true, cancelable: true }),
      );
      const dockContainer = el.closest(".select-none") || el.parentElement;
      if (dockContainer) {
        dockContainer.dispatchEvent(
          new MouseEvent("mouseleave", { bubbles: true, cancelable: true }),
        );
      }
    };

    async function runAutoplay() {
      await new Promise((r) => setTimeout(r, 50));
      if (isCancelled) return;

      const stage = stageRef.current;
      if (!stage) return;

      const firstPos = resolveTargetPosition(stage, steps[0]);
      setCursor({
        x: firstPos.x,
        y: 24,
        isDown: false,
        visible: true,
        durationMs: 400,
      });

      let cycles = 0;

      while (!isCancelled && cycles < 2) {
        for (const step of steps) {
          if (isCancelled) break;
          const currentStage = stageRef.current;
          if (!currentStage) break;

          const target = resolveTargetPosition(currentStage, step);
          const moveDuration = step.duration ?? 500;

          setCursor({
            x: target.x,
            y: target.y,
            isDown: false,
            visible: true,
            durationMs: moveDuration,
          });

          await new Promise((r) => setTimeout(r, moveDuration));
          if (isCancelled) break;

          if (step.action === "click") {
            setCursor((prev) => ({ ...prev, isDown: true }));
            if (target.element) {
              target.element.dispatchEvent(
                new MouseEvent("pointerdown", {
                  bubbles: true,
                  cancelable: true,
                }),
              );
              target.element.dispatchEvent(
                new MouseEvent("mousedown", {
                  bubbles: true,
                  cancelable: true,
                }),
              );
              target.element.click();
              target.element.dispatchEvent(
                new MouseEvent("mouseup", { bubbles: true, cancelable: true }),
              );
              target.element.dispatchEvent(
                new MouseEvent("pointerup", {
                  bubbles: true,
                  cancelable: true,
                }),
              );
            }
            await new Promise((r) => setTimeout(r, 180));
            if (isCancelled) break;
            setCursor((prev) => ({ ...prev, isDown: false }));
            await new Promise((r) => setTimeout(r, step.wait ?? 600));
          } else if (step.action === "hover") {
            if (activeHoveredEl && activeHoveredEl !== target.element) {
              dispatchUnhover(activeHoveredEl);
            }
            dispatchHover(target.element);
            activeHoveredEl = target.element;
            await new Promise((r) => setTimeout(r, step.wait ?? 600));
          } else if (step.action === "unhover") {
            dispatchUnhover(activeHoveredEl);
            activeHoveredEl = null;
            await new Promise((r) => setTimeout(r, step.wait ?? 600));
          } else {
            await new Promise((r) => setTimeout(r, step.wait ?? 400));
          }
        }

        cycles++;
        if (cycles < 2 && !isCancelled) {
          await new Promise((r) => setTimeout(r, 400));
        }
      }

      if (!isCancelled && cycles >= 2) {
        setActiveTabIdx((prev) => (prev + 1) % SHOWCASE_ITEMS.length);
      }
    }

    runAutoplay();

    return () => {
      isCancelled = true;
      dispatchUnhover(activeHoveredEl);
    };
  }, [activeTab.id, isHovered, resolveTargetPosition, resetFluidDock]);

  const renderActiveComponent = () => {
    switch (activeTab.id) {
      case "fluid-app-dock":
        return <FluidAppDockPreview />;
      case "floating-menu":
        return <FloatingMenuPreview />;
      case "multilingual-quote":
        return <MultilingualQuotePreview />;
      case "pixel-to-ascii":
        return <PixelToAsciiImagePreview />;
      case "accordion":
        return <AccordionPreview />;
      case "revision-timeline":
        return <RevisionTimelinePreview />;
      case "team-section":
        return <TeamSectionPreview />;
      case "instagram-card":
        return <InstagramCardPreview />;
      default:
        return null;
    }
  };

  return (
    <div className="relative mx-auto max-w-[1400px] pt-4">
      <style>{`
        @keyframes showcase-progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
      <Container>
        <div className="flex w-full items-center justify-center pt-6">
          <div className="relative w-full max-w-full">
            <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-8 bg-gradient-to-r from-white to-transparent md:hidden dark:from-neutral-950" />
            <div className="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-8 bg-gradient-to-l from-white to-transparent md:hidden dark:from-neutral-950" />

            <div
              ref={scrollContainerRef}
              className="flex w-full [scrollbar-width:none] items-stretch justify-start gap-1 overflow-x-auto px-4 [-ms-overflow-style:none] sm:px-12 md:justify-center md:px-0 [&::-webkit-scrollbar]:hidden"
            >
              {SHOWCASE_ITEMS.map((tab, idx) => {
                const isActive = idx === activeTabIdx;
                return (
                  <button
                    key={tab.id}
                    ref={isActive ? activeTabRef : null}
                    onClick={() => handleTabClick(idx)}
                    className={cn(
                      "relative z-10 flex shrink-0 cursor-pointer items-center justify-center gap-1.5 px-3.5 py-2 text-sm font-medium transition-colors select-none sm:text-base",
                      isActive
                        ? "text-neutral-900 dark:text-white"
                        : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white",
                    )}
                  >
                    <span
                      className={cn(
                        "transition-colors",
                        isActive
                          ? "text-neutral-900 dark:text-white"
                          : "text-neutral-500 dark:text-neutral-400",
                      )}
                    >
                      {tab.icon}
                    </span>
                    <span>{tab.title}</span>

                    {isActive && (
                      <>
                        <div className="absolute right-0 bottom-0 left-0 h-[2px] bg-neutral-100 dark:bg-neutral-900" />
                        <div
                          key={activeTabIdx}
                          className="absolute bottom-0 left-0 z-20 h-[2px] bg-[#f6821f]"
                          style={{
                            animation: `showcase-progress ${activeSlideDuration}ms linear forwards`,
                            animationPlayState: isHovered
                              ? "paused"
                              : "running",
                          }}
                        />
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </Container>

      <div className="relative mx-auto mt-4 max-w-[1400px] pb-16">
        <Container>
          <div className="w-full overflow-hidden">
            <div
              ref={stageRef}
              onPointerEnter={handlePointerEnter}
              onPointerLeave={handlePointerLeave}
              className="relative flex aspect-video min-h-[350px] w-full overflow-hidden rounded-3xl bg-neutral-100/60 dark:bg-neutral-900/60"
            >
              <Link
                href={`/components/${activeTab.id}`}
                className="absolute inset-0 z-20 md:hidden"
                aria-label={`View ${activeTab.title} component`}
              />

              <div className="absolute right-6 bottom-6 z-30 hidden md:flex">
                <Link
                  href={`/components/${activeTab.id}`}
                  className="group flex items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-neutral-900 shadow-sm ring-1 ring-neutral-200/50 transition-all hover:scale-105 hover:shadow-md dark:bg-neutral-900 dark:text-white dark:ring-neutral-800"
                >
                  View Component
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="absolute inset-0 flex h-full w-full items-center justify-center"
                >
                  <div className="hidden h-full w-full items-center justify-center p-8 md:flex">
                    {renderActiveComponent()}
                  </div>
                  <div className="flex h-full w-full items-center justify-center md:hidden">
                    {activeComponentPreviewVideo ? (
                      <video
                        src={activeComponentPreviewVideo}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center p-8">
                        {renderActiveComponent()}
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>

              <div
                className="pointer-events-none absolute top-0 left-0 z-[100] select-none"
                style={{
                  transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0)`,
                  opacity: cursor.visible && !isHovered ? 1 : 0,
                  transition:
                    cursor.durationMs > 0
                      ? `transform ${cursor.durationMs}ms cubic-bezier(0.22, 1, 0.36, 1), opacity 250ms ease`
                      : "opacity 250ms ease",
                }}
              >
                <div
                  className="relative transition-transform duration-150 ease-out"
                  style={{
                    transform: cursor.isDown
                      ? "scale(0.82) rotate(-6deg)"
                      : "scale(1) rotate(0deg)",
                    transformOrigin: "top left",
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]"
                  >
                    <path
                      d="M5.5 3.2L18.8 12.1L12.4 13.5L15.9 20.3L13.2 21.7L9.7 15L5.5 19V3.2Z"
                      fill="black"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {cursor.isDown && (
                    <span className="absolute -top-1 -left-1 h-6 w-6 animate-ping rounded-full bg-orange-500/50" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default ComponentShowcase;
