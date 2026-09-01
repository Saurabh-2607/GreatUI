"use client";

import React, { useState, useEffect, createContext, useContext } from "react";
import { flushSync } from "react-dom";

interface DocumentWithViewTransition {
  startViewTransition?: (callback: () => void) => {
    ready: Promise<void>;
    finished?: Promise<void>;
  };
}

export type SplitDirection = "horizontal" | "vertical";
export type SplitMode = "in-to-out" | "out-to-in";

interface SplitThemeContextType {
  theme: "light" | "dark";
  direction: SplitDirection;
  mode: SplitMode;
  triggerTransition: (dir?: SplitDirection, customMode?: SplitMode) => void;
  isAnimating: boolean;
}

interface CustomWindow extends Window {
  __viewTransitionStyleCount?: number;
}

const SplitThemeContext = createContext<SplitThemeContextType | undefined>(
  undefined,
);

export function useSplitTheme() {
  const context = useContext(SplitThemeContext);
  if (!context) {
    throw new Error("useSplitTheme must be used within a SplitThemeProvider");
  }
  return context;
}

export interface SplitThemeProviderProps {
  children?: React.ReactNode;
  duration?: number;
  easing?: string;
  onTransition?: () => void;
  theme?: "light" | "dark";
  onThemeChange?: (theme: "light" | "dark") => void;
  direction?: SplitDirection;
  mode?: SplitMode;
}

export default function SplitThemeProvider({
  children,
  duration = 600,
  easing = "ease-in-out",
  onTransition,
  theme: themeProp,
  onThemeChange,
  direction: defaultDirection = "horizontal",
  mode: defaultMode = "in-to-out",
}: SplitThemeProviderProps) {
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

  const triggerTransition = (
    selectedDir?: SplitDirection,
    customMode?: SplitMode,
  ) => {
    if (typeof window !== "undefined") {
      window.getSelection()?.removeAllRanges();
    }

    if (isAnimating) return;

    const activeDir = selectedDir || defaultDirection;
    const activeMode = customMode || defaultMode;
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

    const animStyleId = "great-ui-split-anim-style";
    let styleEl = document.getElementById(
      animStyleId,
    ) as HTMLStyleElement | null;
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = animStyleId;
      document.head.appendChild(styleEl);
    }

    if (activeMode === "in-to-out") {
      const fromInset =
        activeDir === "horizontal"
          ? "inset(0 50% 0 50%)"
          : "inset(50% 0 50% 0)";
      styleEl.textContent = `
        @keyframes great-ui-split-in-to-out {
          from {
            clip-path: ${fromInset};
            -webkit-clip-path: ${fromInset};
            opacity: 1;
          }
          to {
            clip-path: inset(0 0 0 0);
            -webkit-clip-path: inset(0 0 0 0);
            opacity: 1;
          }
        }
        ::view-transition-old(root) {
          animation: none !important;
          opacity: 1 !important;
          z-index: 1 !important;
        }
        ::view-transition-new(root) {
          animation: great-ui-split-in-to-out ${duration}ms ${easing} both !important;
          z-index: 9999 !important;
        }
      `;
    } else {
      const toInset =
        activeDir === "horizontal"
          ? "inset(0 50% 0 50%)"
          : "inset(50% 0 50% 0)";
      styleEl.textContent = `
        @keyframes great-ui-split-out-to-in {
          from {
            clip-path: inset(0 0 0 0);
            -webkit-clip-path: inset(0 0 0 0);
            opacity: 1;
          }
          to {
            clip-path: ${toInset};
            -webkit-clip-path: ${toInset};
            opacity: 1;
          }
        }
        ::view-transition-old(root) {
          animation: great-ui-split-out-to-in ${duration}ms ${easing} both !important;
          z-index: 9999 !important;
        }
        ::view-transition-new(root) {
          animation: none !important;
          opacity: 1 !important;
          z-index: 1 !important;
        }
      `;
    }

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

  const contextValue: SplitThemeContextType = {
    theme: activeTheme,
    direction: defaultDirection,
    mode: defaultMode,
    triggerTransition,
    isAnimating,
  };

  return (
    <SplitThemeContext.Provider value={contextValue}>
      {children}
    </SplitThemeContext.Provider>
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
