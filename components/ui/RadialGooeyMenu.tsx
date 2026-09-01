"use client";

import React, { useState, useId, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

export interface RadialGooeyMenuItem {
  id?: string;
  name: string;
  icon: React.ReactNode;
  onClick?: () => void;
  href?: string;
}

export interface RadialGooeyFilterProps {
  filterId: string;
  blur?: number;
}

export function RadialGooeyFilter({
  filterId,
  blur = 10,
}: RadialGooeyFilterProps) {
  return (
    <svg className="absolute hidden h-0 w-0" aria-hidden="true">
      <defs>
        <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation={blur}
            result="blur"
          />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
  );
}

export interface RadialGooeyMenuProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onToggle"
> {
  items?: RadialGooeyMenuItem[];
  radius?: number;
  blur?: number;
  springStiffness?: number;
  springDamping?: number;
  defaultOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
  onItemSelect?: (item: RadialGooeyMenuItem, index: number) => void;
  className?: string;
  buttonClassName?: string;
  itemClassName?: string;
}

export function RadialGooeyMenu({
  items = [],
  radius = 80,
  blur = 10,
  springStiffness = 150,
  springDamping = 15,
  defaultOpen = false,
  onToggle,
  onItemSelect,
  className,
  buttonClassName,
  itemClassName,
  ...props
}: RadialGooeyMenuProps) {
  const reactId = useId();
  const safeId = reactId.replace(/:/g, "");
  const filterId = `radial-gooey-filter-${safeId}`;

  const [isOpen, setIsOpen] = useState(defaultOpen);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, {
    stiffness: springStiffness,
    damping: springDamping,
  });
  const springY = useSpring(mouseY, {
    stiffness: springStiffness,
    damping: springDamping,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) * 0.3);
    mouseY.set((e.clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const toggleMenu = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (onToggle) onToggle(nextState);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative flex items-center justify-center p-12",
        className,
      )}
      {...props}
    >
      <RadialGooeyFilter filterId={filterId} blur={blur} />

      <div
        className="relative flex items-center justify-center"
        style={{ filter: `url(#${filterId})` }}
      >
        {/* Child Items */}
        {items.map((item, index) => {
          const angle = -90 + (360 / items.length) * index;
          const rad = (angle * Math.PI) / 180;
          const targetX = Math.cos(rad) * radius;
          const targetY = Math.sin(rad) * radius;

          return (
            <motion.button
              key={item.id || item.name || index}
              initial={false}
              animate={{
                x: isOpen ? targetX : 0,
                y: isOpen ? targetY : 0,
                scale: isOpen ? 1 : 0.5,
                opacity: isOpen ? 1 : 0,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
              onClick={() => {
                if (item.onClick) item.onClick();
                if (onItemSelect) onItemSelect(item, index);
              }}
              aria-label={item.name}
              className={cn(
                "absolute flex size-14 cursor-pointer items-center justify-center rounded-full bg-white text-neutral-600 shadow-md transition-colors hover:text-neutral-950 focus:outline-none dark:bg-neutral-800 dark:text-neutral-400 dark:hover:text-white",
                itemClassName,
              )}
            >
              {item.icon}
            </motion.button>
          );
        })}

        {/* Center Button */}
        <motion.button
          onClick={toggleMenu}
          style={{ x: springX, y: springY }}
          aria-label="Toggle menu"
          className={cn(
            "relative z-10 flex size-16 cursor-pointer items-center justify-center rounded-full bg-white text-neutral-600 shadow-md transition-colors hover:text-neutral-950 focus:outline-none dark:bg-neutral-800 dark:text-neutral-400 dark:hover:text-white",
            buttonClassName,
          )}
        >
          <motion.div
            initial={false}
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex flex-col items-center justify-center gap-1.5"
          >
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            )}
          </motion.div>
        </motion.button>
      </div>
    </div>
  );
}

export default RadialGooeyMenu;

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
