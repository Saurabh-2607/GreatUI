"use client";

import React, { useState, useEffect, createContext, useContext } from "react";
import { flushSync } from "react-dom";

interface DocumentWithViewTransition {
  startViewTransition?: (callback: () => void) => {
    ready: Promise<void>;
    finished?: Promise<void>;
  };
}

export type TransitionOrigin =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "center"
  | { x: number; y: number }
  | React.MouseEvent
  | HTMLElement
  | EventTarget;

interface CircularThemeContextType {
  theme: "light" | "dark";
  triggerTransition: (origin?: TransitionOrigin) => void;
  isAnimating: boolean;
}

interface CustomWindow extends Window {
  __viewTransitionStyleCount?: number;
}

const CircularThemeContext = createContext<
  CircularThemeContextType | undefined
>(undefined);

export function useCircularTheme() {
  const context = useContext(CircularThemeContext);
  if (!context) {
    throw new Error(
      "useCircularTheme must be used within a CircularThemeProvider",
    );
  }
  return context;
}

export interface CircularThemeProviderProps {
  children?: React.ReactNode;
  duration?: number;
  easing?: string;
  onTransition?: () => void;
  theme?: "light" | "dark";
  onThemeChange?: (theme: "light" | "dark") => void;
  defaultCenter?: TransitionOrigin;
}

export default function CircularThemeProvider({
  children,
  duration = 500,
  easing = "ease-in-out",
  onTransition,
  theme: themeProp,
  onThemeChange,
  defaultCenter,
}: CircularThemeProviderProps) {
  const [localTheme, setLocalTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark")
        ? "dark"
        : "light";
    }
    return "light";
  });
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const isControlled = themeProp !== undefined;
  const activeTheme = isControlled ? themeProp : localTheme;

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);

    const styleId = "great-ui-view-transition-styles";
    let styleEl = document.getElementById(styleId) as HTMLStyleElement;
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = styleId;
      styleEl.innerHTML = `
        ::view-transition-old(root),
        ::view-transition-new(root) {
          animation: none !important;
          mix-blend-mode: normal !important;
          display: block !important;
          height: 100% !important;
          width: 100% !important;
          object-fit: cover !important;
        }
        ::view-transition-image-pair(root) {
          isolation: auto !important;
        }
        ::view-transition-old(root) {
          z-index: 1 !important;
        }
        ::view-transition-new(root) {
          z-index: 9999 !important;
        }
      `;
      document.head.appendChild(styleEl);
    }

    if (typeof window !== "undefined") {
      (window as unknown as CustomWindow).__viewTransitionStyleCount =
        ((window as unknown as CustomWindow).__viewTransitionStyleCount || 0) +
        1;
    }

    return () => {
      clearTimeout(timer);
      if (typeof window !== "undefined") {
        (window as unknown as CustomWindow).__viewTransitionStyleCount =
          Math.max(
            0,
            ((window as unknown as CustomWindow).__viewTransitionStyleCount ||
              0) - 1,
          );
        if (
          (window as unknown as CustomWindow).__viewTransitionStyleCount === 0
        ) {
          const el = document.getElementById(styleId);
          if (el) el.remove();
        }
      }
    };
  }, []);

  const triggerTransition = (origin?: TransitionOrigin) => {
    if (isAnimating) return;

    let x = typeof window !== "undefined" ? window.innerWidth / 2 : 0;
    let y = typeof window !== "undefined" ? window.innerHeight / 2 : 0;

    const activeOrigin = origin || defaultCenter;

    if (activeOrigin) {
      if (typeof activeOrigin === "string") {
        if (typeof window !== "undefined") {
          switch (activeOrigin) {
            case "top-left":
              x = 0;
              y = 0;
              break;
            case "top-right":
              x = window.innerWidth;
              y = 0;
              break;
            case "bottom-left":
              x = 0;
              y = window.innerHeight;
              break;
            case "bottom-right":
              x = window.innerWidth;
              y = window.innerHeight;
              break;
            case "center":
              x = window.innerWidth / 2;
              y = window.innerHeight / 2;
              break;
          }
        }
      } else if (
        typeof activeOrigin === "object" &&
        activeOrigin !== null &&
        "getBoundingClientRect" in activeOrigin
      ) {
        const rect = (activeOrigin as HTMLElement).getBoundingClientRect();
        x = rect.left + rect.width / 2;
        y = rect.top + rect.height / 2;
      } else if (
        typeof activeOrigin === "object" &&
        activeOrigin !== null &&
        ("touches" in activeOrigin || "changedTouches" in activeOrigin)
      ) {
        const touchEvent = activeOrigin as unknown as {
          touches?: { clientX: number; clientY: number }[];
          changedTouches?: { clientX: number; clientY: number }[];
        };
        const touch = touchEvent.touches?.[0] || touchEvent.changedTouches?.[0];
        if (touch) {
          x = touch.clientX;
          y = touch.clientY;
        }
      } else if (
        typeof activeOrigin === "object" &&
        activeOrigin !== null &&
        "clientX" in activeOrigin
      ) {
        x = (activeOrigin as unknown as { clientX: number; clientY: number })
          .clientX;
        y = (activeOrigin as unknown as { clientX: number; clientY: number })
          .clientY;
      } else if (
        typeof activeOrigin === "object" &&
        activeOrigin !== null &&
        "x" in activeOrigin &&
        "y" in activeOrigin
      ) {
        x = (activeOrigin as { x: number; y: number }).x;
        y = (activeOrigin as { x: number; y: number }).y;
      }
    }

    const targetTheme = activeTheme === "light" ? "dark" : "light";

    const applyThemeChange = () => {
      if (!isControlled) {
        setLocalTheme(targetTheme);
      }

      const root = document.documentElement;
      root.setAttribute("data-theme", targetTheme);
      if (targetTheme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }

      if (onThemeChange) {
        onThemeChange(targetTheme);
      }
    };

    const doc = document as unknown as DocumentWithViewTransition;

    if (
      typeof window === "undefined" ||
      !doc.startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      applyThemeChange();
      if (onTransition) onTransition();
      return;
    }

    setIsAnimating(true);

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const animStyleId = "great-ui-circular-anim-style";
    let styleEl = document.getElementById(
      animStyleId,
    ) as HTMLStyleElement | null;
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = animStyleId;
      document.head.appendChild(styleEl);
    }
    styleEl.textContent = `
      @keyframes great-ui-circular-wipe {
        from {
          clip-path: circle(0px at ${x}px ${y}px);
          -webkit-clip-path: circle(0px at ${x}px ${y}px);
        }
        to {
          clip-path: circle(${endRadius}px at ${x}px ${y}px);
          -webkit-clip-path: circle(${endRadius}px at ${x}px ${y}px);
        }
      }
      ::view-transition-new(root) {
        animation: great-ui-circular-wipe ${duration}ms ${easing} both !important;
      }
    `;

    const cleanup = () => {
      const el = document.getElementById(animStyleId);
      if (el) el.remove();
      setIsAnimating(false);
    };

    try {
      const transition = doc.startViewTransition(() => {
        flushSync(() => {
          applyThemeChange();
          if (onTransition) onTransition();
        });
      });

      if (transition && transition.finished) {
        transition.finished.then(cleanup).catch(cleanup);
      } else {
        setTimeout(cleanup, duration);
      }
    } catch {
      cleanup();
      applyThemeChange();
      if (onTransition) onTransition();
    }
  };

  if (!mounted) {
    return null;
  }

  const contextValue: CircularThemeContextType = {
    theme: activeTheme,
    triggerTransition,
    isAnimating,
  };

  return (
    <CircularThemeContext.Provider value={contextValue}>
      {children}
    </CircularThemeContext.Provider>
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
