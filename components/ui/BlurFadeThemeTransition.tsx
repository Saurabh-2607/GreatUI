"use client";

import React, { useState, useEffect, createContext, useContext } from "react";
import { flushSync } from "react-dom";

interface DocumentWithViewTransition {
  startViewTransition?: (callback: () => void) => {
    ready: Promise<void>;
    finished?: Promise<void>;
  };
}

interface BlurFadeThemeTransitionContextType {
  theme: "light" | "dark";
  triggerTransition: (customDuration?: number, customBlur?: number) => void;
  isAnimating: boolean;
}

interface CustomWindow extends Window {
  __viewTransitionStyleCount?: number;
}

const BlurFadeThemeTransitionContext = createContext<
  BlurFadeThemeTransitionContextType | undefined
>(undefined);

export function useBlurFadeThemeTransition() {
  const context = useContext(BlurFadeThemeTransitionContext);
  if (!context) {
    throw new Error(
      "useBlurFadeThemeTransition must be used within a BlurFadeThemeTransition",
    );
  }
  return context;
}

export interface BlurFadeThemeTransitionProps {
  children?: React.ReactNode;
  duration?: number;
  maxBlur?: number;
  easing?: string;
  onTransition?: () => void;
  theme?: "light" | "dark";
  onThemeChange?: (theme: "light" | "dark") => void;
}

export default function BlurFadeThemeTransition({
  children,
  duration = 500,
  maxBlur = 16,
  easing = "ease-in-out",
  onTransition,
  theme: themeProp,
  onThemeChange,
}: BlurFadeThemeTransitionProps) {
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

  const triggerTransition = (customDuration?: number, customBlur?: number) => {
    if (typeof window !== "undefined") {
      window.getSelection()?.removeAllRanges();
    }

    if (isAnimating) return;

    const activeDuration =
      customDuration !== undefined ? customDuration : duration;
    const activeBlur = customBlur !== undefined ? customBlur : maxBlur;
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

    const animStyleId = "great-ui-blur-anim-style";
    let styleEl = document.getElementById(
      animStyleId,
    ) as HTMLStyleElement | null;
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = animStyleId;
      document.head.appendChild(styleEl);
    }
    styleEl.textContent = `
      @keyframes great-ui-blur-old {
        from { filter: blur(0px); opacity: 1; }
        to { filter: blur(${activeBlur}px); opacity: 0; }
      }
      @keyframes great-ui-blur-new {
        from { filter: blur(${activeBlur}px); opacity: 0; }
        to { filter: blur(0px); opacity: 1; }
      }
      ::view-transition-old(root) {
        animation: great-ui-blur-old ${activeDuration}ms ${easing} both !important;
      }
      ::view-transition-new(root) {
        animation: great-ui-blur-new ${activeDuration}ms ${easing} both !important;
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
        setTimeout(cleanup, activeDuration);
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

  const contextValue: BlurFadeThemeTransitionContextType = {
    theme: activeTheme,
    triggerTransition,
    isAnimating,
  };

  return (
    <BlurFadeThemeTransitionContext.Provider value={contextValue}>
      {children}
    </BlurFadeThemeTransitionContext.Provider>
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
