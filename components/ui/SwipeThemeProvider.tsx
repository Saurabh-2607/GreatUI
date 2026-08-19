"use client";

import React, { useState, useEffect, createContext, useContext } from "react";
import { flushSync } from "react-dom";

interface DocumentWithViewTransition {
  startViewTransition?: (callback: () => void) => {
    ready: Promise<void>;
  };
}

export type SwipeDirection =
  | "left"
  | "right"
  | "top"
  | "bottom"
  | "left-to-right"
  | "right-to-left"
  | "top-to-bottom"
  | "bottom-to-top"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

interface ThemeContextType {
  theme: "light" | "dark";
  direction: SwipeDirection;
  triggerSwipe: (dir?: SwipeDirection) => void;
  isAnimating: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useSwipeTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useSwipeTheme must be used within a SwipeThemeProvider");
  }
  return context;
}

const normalizeDirection = (dir: SwipeDirection): SwipeDirection => {
  switch (dir) {
    case "left":
      return "left-to-right";
    case "right":
      return "right-to-left";
    case "top":
      return "top-to-bottom";
    case "bottom":
      return "bottom-to-top";
    default:
      return dir;
  }
};

const getClipPathKeyframes = (dir: SwipeDirection, angle: number) => {
  const rad = ((angle - 90) * Math.PI) / 180;
  const skew = Math.tan(rad) * 100;
  const pad = Math.abs(skew);

  switch (dir) {
    case "left-to-right":
      return [
        {
          clipPath: `polygon(${-10 - pad}% 0, ${-10 - pad}% 0, ${
            -10 - pad - skew
          }% 100%, ${-10 - pad - skew}% 100%)`,
        },
        {
          clipPath: `polygon(${-10 - pad}% 0, ${110 + pad}% 0, ${
            110 + pad - skew
          }% 100%, ${-10 - pad - skew}% 100%)`,
        },
      ];
    case "right-to-left":
      return [
        {
          clipPath: `polygon(${110 + pad}% 0, ${110 + pad}% 0, ${
            110 + pad - skew
          }% 100%, ${110 + pad - skew}% 100%)`,
        },
        {
          clipPath: `polygon(${-10 - pad}% 0, ${110 + pad}% 0, ${
            110 + pad - skew
          }% 100%, ${-10 - pad - skew}% 100%)`,
        },
      ];
    case "top-to-bottom": {
      const radV = (angle * Math.PI) / 180;
      const skewV = Math.tan(radV) * 100;
      const padV = Math.abs(skewV);
      return [
        {
          clipPath: `polygon(0 ${-10 - padV}%, 100% ${-10 - padV - skewV}%, 100% ${
            -10 - padV - skewV
          }%, 0 ${-10 - padV}%)`,
        },
        {
          clipPath: `polygon(0 ${-10 - padV}%, 100% ${-10 - padV - skewV}%, 100% ${
            110 + padV - skewV
          }%, 0 ${110 + padV}%)`,
        },
      ];
    }
    case "bottom-to-top": {
      const radV2 = (angle * Math.PI) / 180;
      const skewV2 = Math.tan(radV2) * 100;
      const padV2 = Math.abs(skewV2);
      return [
        {
          clipPath: `polygon(0 ${110 + padV2}%, 100% ${110 + padV2 - skewV2}%, 100% ${
            110 + padV2 - skewV2
          }%, 0 ${110 + padV2}%)`,
        },
        {
          clipPath: `polygon(0 ${-10 - padV2}%, 100% ${-10 - padV2 - skewV2}%, 100% ${
            110 + padV2 - skewV2
          }%, 0 ${110 + padV2}%)`,
        },
      ];
    }
    case "top-left":
      return [
        { clipPath: "polygon(0 0, 0 0, 0 0)" },
        { clipPath: "polygon(0 0, 200% 0, 0 200%)" },
      ];
    case "top-right":
      return [
        { clipPath: "polygon(100% 0, 100% 0, 100% 0)" },
        { clipPath: "polygon(100% 0, -100% 0, 100% 200%)" },
      ];
    case "bottom-left":
      return [
        { clipPath: "polygon(0 100%, 0 100%, 0 100%)" },
        { clipPath: "polygon(0 100%, 200% 100%, 0 -100%)" },
      ];
    case "bottom-right":
      return [
        { clipPath: "polygon(100% 100%, 100% 100%, 100% 100%)" },
        { clipPath: "polygon(100% 100%, -100% 100%, 100% -100%)" },
      ];
    default:
      return [];
  }
};

export interface SwipeThemeProviderProps {
  children?: React.ReactNode;
  duration?: number;
  easing?: string;
  onSwipe?: () => void;
  theme?: "light" | "dark";
  onThemeChange?: (theme: "light" | "dark") => void;
  getKeyframes?: (dir: SwipeDirection) => Keyframe[] | PropertyIndexedKeyframes;
  direction?: SwipeDirection;
  angle?: number;
}

export default function SwipeThemeProvider({
  children,
  duration = 650,
  easing = "ease-in-out",
  onSwipe,
  theme: themeProp,
  onThemeChange,
  getKeyframes,
  direction: defaultDirection = "left",
  angle = 0,
}: SwipeThemeProviderProps) {
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

  const triggerSwipe = (selectedDir?: SwipeDirection) => {
    if (isAnimating) return;

    const activeDir = normalizeDirection(selectedDir || defaultDirection);
    const defaultAngleForDir =
      activeDir === "top-to-bottom" || activeDir === "bottom-to-top" ? 0 : 90;
    const activeAngle = defaultAngleForDir + angle;
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
      if (onSwipe) onSwipe();
      return;
    }

    setIsAnimating(true);

    const transition = doc.startViewTransition(() => {
      flushSync(() => {
        applyThemeChange();
        if (onSwipe) onSwipe();
      });
    });

    const keyframes = getKeyframes
      ? getKeyframes(activeDir)
      : getClipPathKeyframes(activeDir, activeAngle);

    transition.ready.then(() => {
      document.documentElement.animate(keyframes, {
        duration,
        easing,
        pseudoElement: "::view-transition-new(root)",
      }).onfinish = () => {
        setIsAnimating(false);
      };
    });
  };

  if (!mounted) {
    return null;
  }

  const contextValue: ThemeContextType = {
    theme: activeTheme,
    direction: defaultDirection,
    triggerSwipe,
    isAnimating,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
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
