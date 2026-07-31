"use client";

import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

export interface FrostedGlassRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl?: string;
  revealShape?: "circle" | "square" | "rounded";
  glassStrength?: number;
}

export const FrostedGlassReveal = forwardRef<
  HTMLDivElement,
  FrostedGlassRevealProps
>(
  (
    {
      imageUrl = "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1600&auto=format&fit=crop",
      revealShape = "circle",
      glassStrength = 22,
      className,
      ...props
    },
    ref,
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 600, mass: 0.15 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    const lensWidth = 200;
    const lensHeight = 200;

    const innerX = useTransform(cursorX, (val) => -(val - lensWidth / 2));
    const innerY = useTransform(cursorY, (val) => -(val - lensHeight / 2));

    const lensX = useTransform(cursorX, (val) => val - lensWidth / 2);
    const lensY = useTransform(cursorY, (val) => val - lensHeight / 2);

    useEffect(() => {
      const handleResize = () => {
        if (containerRef.current) {
          setDimensions({
            width: containerRef.current.offsetWidth,
            height: containerRef.current.offsetHeight,
          });
        }
      };

      handleResize();
      window.addEventListener("resize", handleResize);

      if (containerRef.current) {
        const initialX = containerRef.current.offsetWidth / 2;
        const initialY = containerRef.current.offsetHeight / 2;
        mouseX.set(initialX);
        mouseY.set(initialY);
        cursorX.set(initialX);
        cursorY.set(initialY);
      }

      return () => window.removeEventListener("resize", handleResize);
    }, [mouseX, mouseY, cursorX, cursorY]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const entryX = e.clientX - rect.left;
      const entryY = e.clientY - rect.top;

      cursorX.set(entryX);
      cursorY.set(entryY);
      mouseX.set(entryX);
      mouseY.set(entryY);

      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    return (
      <>
        <svg className="absolute hidden h-0 w-0" aria-hidden="true">
          <defs>
            <filter
              id="frostedGlassFilter"
              x="-10%"
              y="-10%"
              width="120%"
              height="120%"
            >
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.08"
                numOctaves="4"
                result="noise"
              />
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation={glassStrength}
                result="blurred"
              />
              <feDisplacementMap
                in="blurred"
                in2="noise"
                scale="32"
                xChannelSelector="R"
                yChannelSelector="G"
                result="displaced"
              />
              <feBlend mode="overlay" in="noise" in2="displaced" />
            </filter>
          </defs>
        </svg>

        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={cn(
            "relative h-full w-full overflow-hidden bg-neutral-950",
            className,
          )}
          {...props}
        >
          <img
            src={imageUrl}
            alt="Frosted Glass Portrait"
            className="pointer-events-none absolute inset-0 h-full w-full scale-[1.08] object-cover"
            style={{ filter: "url(#frostedGlassFilter)" }}
          />

          <div className="pointer-events-none absolute inset-0 z-10 h-full w-full bg-neutral-950/15" />

          {dimensions.width > 0 && (
            <motion.div
              className={cn(
                "pointer-events-none absolute z-20 overflow-hidden bg-neutral-950",
                revealShape === "circle" && "rounded-full",
                revealShape === "square" && "rounded-none",
                revealShape === "rounded" && "rounded-3xl",
              )}
              initial={{ opacity: 0 }}
              animate={{
                opacity: isHovered ? 1 : 0,
              }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 22,
              }}
              style={{
                width: lensWidth,
                height: lensHeight,
                x: lensX,
                y: lensY,
              }}
            >
              <motion.img
                src={imageUrl}
                alt="Sharp Viewport Portrait"
                className="pointer-events-none absolute max-w-none object-cover"
                style={{
                  width: dimensions.width,
                  height: dimensions.height,
                  x: innerX,
                  y: innerY,
                }}
              />
            </motion.div>
          )}
        </div>
      </>
    );
  },
);

FrostedGlassReveal.displayName = "FrostedGlassReveal";
export default FrostedGlassReveal;

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
