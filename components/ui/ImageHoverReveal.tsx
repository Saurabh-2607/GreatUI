"use client";
import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useAnimation,
  useSpring,
  useMotionTemplate,
} from "motion/react";
import { cn } from "@/lib/utils";

export interface ImageHoverRevealProps {
  className?: string;
  src?: string;
  overlaySrc?: string;
  alt?: string;
  variant?: "directional" | "slice";
}

const DEFAULT_IMAGE =
  "https://ik.imagekit.io/ybq4azred/temp_avatar_new_1784920336469.png";

export default function ImageHoverReveal({
  className = "",
  src = DEFAULT_IMAGE,
  overlaySrc,
  alt = "Avatar Hover",
  variant = "directional",
}: ImageHoverRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Directional Reveal (for variant = "directional")
  const controls = useAnimation();

  // Mouse Slice Tracking (for variant = "slice")
  const [isHovered, setIsHovered] = useState(false);
  const axisRef = useRef<"x" | "y">("x");

  const springConfig = { stiffness: 400, damping: 30 };
  const insetTop = useSpring(112, springConfig);
  const insetRight = useSpring(112, springConfig);
  const insetBottom = useSpring(112, springConfig);
  const insetLeft = useSpring(112, springConfig);

  const clipPath = useMotionTemplate`inset(${insetTop}px ${insetRight}px ${insetBottom}px ${insetLeft}px)`;
  const thickness = 120;

  useEffect(() => {
    if (variant === "slice" && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      insetTop.jump(rect.height / 2);
      insetBottom.jump(rect.height / 2);
      insetLeft.jump(rect.width / 2);
      insetRight.jump(rect.width / 2);
    }
  }, [variant, insetTop, insetBottom, insetLeft, insetRight]);

  const getDirection = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return "top";
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = e.clientX - left - width / 2;
    const y = e.clientY - top - height / 2;

    const angle = Math.atan2(y, x) * (180 / Math.PI);

    if (angle > -45 && angle <= 45) return "right";
    if (angle > 45 && angle <= 135) return "bottom";
    if (angle > -135 && angle <= -45) return "top";
    return "left";
  };

  const getHiddenClipPath = (dir: string) => {
    switch (dir) {
      case "top":
        return "inset(0% 0% 100% 0%)";
      case "bottom":
        return "inset(100% 0% 0% 0%)";
      case "left":
        return "inset(0% 100% 0% 0%)";
      case "right":
        return "inset(0% 0% 0% 100%)";
      default:
        return "inset(0% 0% 100% 0%)";
    }
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    if (variant === "directional") {
      const dir = getDirection(e);
      controls.set({ clipPath: getHiddenClipPath(dir) });
      controls.start({
        clipPath: "inset(0% 0% 0% 0%)",
        transition: { duration: 0.4, ease: "easeInOut" },
      });
    } else {
      setIsHovered(true);
      const rect = ref.current.getBoundingClientRect();
      const dir = getDirection(e);
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (dir === "left" || dir === "right") {
        axisRef.current = "x";
        insetTop.jump(0);
        insetBottom.jump(0);
        if (dir === "left") {
          insetLeft.jump(0);
          insetRight.jump(rect.width);
        } else {
          insetLeft.jump(rect.width);
          insetRight.jump(0);
        }
      } else {
        axisRef.current = "y";
        insetLeft.jump(0);
        insetRight.jump(0);
        if (dir === "top") {
          insetTop.jump(0);
          insetBottom.jump(rect.height);
        } else {
          insetTop.jump(rect.height);
          insetBottom.jump(0);
        }
      }

      if (axisRef.current === "x") {
        insetLeft.set(x - thickness / 2);
        insetRight.set(rect.width - (x + thickness / 2));
      } else {
        insetTop.set(y - thickness / 2);
        insetBottom.set(rect.height - (y + thickness / 2));
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (variant !== "slice" || !ref.current || !isHovered) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (axisRef.current === "x") {
      insetLeft.set(x - thickness / 2);
      insetRight.set(rect.width - (x + thickness / 2));
    } else {
      insetTop.set(y - thickness / 2);
      insetBottom.set(rect.height - (y + thickness / 2));
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    if (variant === "directional") {
      const dir = getDirection(e);
      controls.start({
        clipPath: getHiddenClipPath(dir),
        transition: { duration: 0.4, ease: "easeInOut" },
      });
    } else {
      setIsHovered(false);
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (axisRef.current === "x") {
        if (x < rect.width / 2) {
          insetLeft.set(0);
          insetRight.set(rect.width);
        } else {
          insetLeft.set(rect.width);
          insetRight.set(0);
        }
      } else {
        if (y < rect.height / 2) {
          insetTop.set(0);
          insetBottom.set(rect.height);
        } else {
          insetTop.set(rect.height);
          insetBottom.set(0);
        }
      }
    }
  };

  return (
    <div
      ref={ref}
      className={cn(
        "relative overflow-hidden select-none",
        variant === "slice" ? "cursor-crosshair" : "",
        className,
      )}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={src}
        alt={`${alt} (grayscale)`}
        className="h-full w-full object-cover grayscale"
      />
      <motion.div
        className="pointer-events-none absolute top-0 left-0 h-full w-full"
        style={
          variant === "slice"
            ? { clipPath }
            : { clipPath: "inset(0% 0% 100% 0%)" }
        }
        animate={variant === "directional" ? controls : undefined}
        initial={
          variant === "directional"
            ? { clipPath: "inset(0% 0% 100% 0%)" }
            : undefined
        }
      >
        <img
          src={overlaySrc || src}
          alt={`${alt} (color)`}
          className="h-full w-full object-cover"
        />
      </motion.div>
    </div>
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
 * X: https://x.com/srbh_s
 */
