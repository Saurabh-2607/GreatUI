"use client";

import React, { useState, useEffect, createContext, useContext } from "react";
import { flushSync } from "react-dom";

interface DocumentWithViewTransition {
  startViewTransition?: (callback: () => void) => {
    ready: Promise<void>;
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
    return () => clearTimeout(timer);
  }, []);

  const triggerTransition = (
    selectedDir?: SplitDirection,
    customMode?: SplitMode,
  ) => {
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

    // Inject temporary styles to force correct layering if in out-to-in mode
    let styleEl: HTMLStyleElement | null = null;
    if (activeMode === "out-to-in") {
      styleEl = document.createElement("style");
      styleEl.innerHTML = `
        ::view-transition-old(root) {
          z-index: 2147483647 !important;
          animation: none !important;
        }
        ::view-transition-new(root) {
          z-index: 1 !important;
          animation: none !important;
        }
      `;
      document.head.appendChild(styleEl);
    }

    const transition = doc.startViewTransition(() => {
      flushSync(() => {
        applyThemeChange();
        if (onTransition) onTransition();
      });
    });

    const cleanupStyles = () => {
      if (styleEl) {
        styleEl.remove();
      }
      setIsAnimating(false);
    };

    transition.ready.then(() => {
      if (activeMode === "in-to-out") {
        // Keep old view static and fully opaque underneath
        document.documentElement.animate(
          [
            { opacity: 1, clipPath: "inset(0 0 0 0)" },
            { opacity: 1, clipPath: "inset(0 0 0 0)" },
          ],
          {
            duration,
            pseudoElement: "::view-transition-old(root)",
            fill: "both",
          },
        );

        const keyframes =
          activeDir === "horizontal"
            ? [
                { clipPath: "inset(0 50% 0 50%)", opacity: 1 },
                { clipPath: "inset(0 0 0 0)", opacity: 1 },
              ]
            : [
                { clipPath: "inset(50% 0 50% 0)", opacity: 1 },
                { clipPath: "inset(0 0 0 0)", opacity: 1 },
              ];

        document.documentElement.animate(keyframes, {
          duration,
          easing,
          pseudoElement: "::view-transition-new(root)",
          fill: "both",
        }).onfinish = cleanupStyles;
      } else {
        // out-to-in: Keep new view static and fully opaque
        document.documentElement.animate(
          [
            { opacity: 1, clipPath: "inset(0 0 0 0)" },
            { opacity: 1, clipPath: "inset(0 0 0 0)" },
          ],
          {
            duration,
            pseudoElement: "::view-transition-new(root)",
            fill: "both",
          },
        );

        const keyframes =
          activeDir === "horizontal"
            ? [
                { clipPath: "inset(0 0 0 0)", opacity: 1 },
                { clipPath: "inset(0 50% 0 50%)", opacity: 1 },
              ]
            : [
                { clipPath: "inset(0 0 0 0)", opacity: 1 },
                { clipPath: "inset(50% 0 50% 0)", opacity: 1 },
              ];

        document.documentElement.animate(keyframes, {
          duration,
          easing,
          pseudoElement: "::view-transition-old(root)",
          fill: "both",
        }).onfinish = cleanupStyles;
      }
    });
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
