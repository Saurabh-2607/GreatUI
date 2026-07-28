"use client";

import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useSpring,
  useMotionValue,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/utils";

export interface User {
  name: string;
  img: string;
}

export interface AvatarStackProps {
  users?: User[];
  variant?: "spring-tilt" | "spring-box" | "slide-blur";
  size?: "sm" | "md" | "lg";
  className?: string;
  avatarClassName?: string;
  tooltipClassName?: string;
}

const DEFAULT_USERS: User[] = [
  {
    name: "Jessica",
    img: "https://randomuser.me/api/portraits/women/50.jpg",
  },
  {
    name: "Matty",
    img: "https://randomuser.me/api/portraits/men/50.jpg",
  },
  {
    name: "Sarah",
    img: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "John",
    img: "https://randomuser.me/api/portraits/men/65.jpg",
  },
];

const AvatarItem = ({
  user,
  idx,
  variant,
  size,
  avatarClassName,
  tooltipClassName,
}: {
  user: User;
  idx: number;
  variant: "spring-tilt" | "spring-box" | "slide-blur";
  size: "sm" | "md" | "lg";
  avatarClassName?: string;
  tooltipClassName?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState(0);

  const x = useMotionValue(0);
  const stiffness = 100;
  const damping = variant === "spring-tilt" ? 15 : 20;
  const springX = useSpring(x, { stiffness, damping });
  const rotate = useTransform(springX, [-50, 50], [-5, 5]);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (variant === "slide-blur") {
      const bounds = e.currentTarget.getBoundingClientRect();
      const halfWidth = bounds.width / 2;
      const entryX = e.clientX - bounds.left;
      setDirection(entryX < halfWidth ? -20 : 20);
    }
    setIsHovered(true);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(false);
    if (variant === "slide-blur") {
      const bounds = e.currentTarget.getBoundingClientRect();
      const halfWidth = bounds.width / 2;
      const exitX = e.clientX - bounds.left;
      setDirection(exitX < halfWidth ? -20 : 20);
    } else {
      x.set(0);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (variant !== "slide-blur") {
      const bounds = e.currentTarget.getBoundingClientRect();
      const xVal = e.clientX - bounds.left - bounds.width / 2;
      x.set(xVal);
    }
  };

  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-14 h-14",
    lg: "w-18 h-18",
  };

  const imageStyles = cn(
    "grayscale-50 transition-all duration-300 transform group-hover:-translate-y-2 rounded-full object-cover ring-1 ring-neutral-200 dark:ring-neutral-700 ring-offset-2 ring-offset-white dark:ring-offset-neutral-950 relative",
    sizeClasses[size],
    avatarClassName,
  );

  const overlapClasses = {
    sm: "-ml-3",
    md: "-ml-4",
    lg: "-ml-5",
  };

  return (
    <div
      className={cn(
        "group relative cursor-pointer",
        idx !== 0 ? overlapClasses[size] : "",
      )}
      style={{ zIndex: isHovered ? 50 : idx + 1 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <img src={user.img} alt={user.name} className={imageStyles} />

      <AnimatePresence>
        {isHovered && (
          <>
            {variant === "spring-tilt" && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: -8, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.8 }}
                style={{ x: springX, rotate }}
                className={cn(
                  "pointer-events-none absolute -top-12 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center",
                  tooltipClassName,
                )}
              >
                <div className="rounded-md bg-black px-3 py-1.5 text-xs whitespace-nowrap text-white dark:bg-neutral-800">
                  {user.name}
                </div>
                <div className="relative -top-[1px] h-0 w-0 border-t-[6px] border-r-[6px] border-l-[6px] border-t-black border-r-transparent border-l-transparent dark:border-t-neutral-800"></div>
              </motion.div>
            )}

            {variant === "spring-box" && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: -8, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.8 }}
                className={cn(
                  "pointer-events-none absolute -top-12 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center",
                  tooltipClassName,
                )}
              >
                <motion.div
                  style={{ x: springX, rotate }}
                  className="origin-bottom rounded-md bg-black px-3 py-1.5 text-xs whitespace-nowrap text-white dark:bg-neutral-800"
                >
                  {user.name}
                </motion.div>
                <div className="relative -top-[1px] h-0 w-0 border-t-[6px] border-r-[6px] border-l-[6px] border-t-black border-r-transparent border-l-transparent dark:border-t-neutral-800"></div>
              </motion.div>
            )}

            {variant === "slide-blur" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className={cn(
                  "pointer-events-none absolute -top-12 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center",
                  tooltipClassName,
                )}
              >
                <div className="overflow-hidden rounded-md bg-black px-3 py-1.5 text-xs whitespace-nowrap text-white dark:bg-neutral-800">
                  <motion.div
                    initial={{ x: direction, filter: "blur(4px)" }}
                    animate={{ x: 0, filter: "blur(0px)" }}
                    exit={{ x: direction, filter: "blur(4px)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {user.name}
                  </motion.div>
                </div>
                <div className="relative -top-[1px] h-0 w-0 border-t-[6px] border-r-[6px] border-l-[6px] border-t-black border-r-transparent border-l-transparent dark:border-t-neutral-800"></div>
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function AvatarStack({
  users = DEFAULT_USERS,
  variant = "spring-tilt",
  size = "md",
  className = "",
  avatarClassName = "",
  tooltipClassName = "",
}: AvatarStackProps) {
  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      {users.map((user, idx) => (
        <AvatarItem
          key={`${user.name}-${idx}`}
          user={user}
          idx={idx}
          variant={variant}
          size={size}
          avatarClassName={avatarClassName}
          tooltipClassName={tooltipClassName}
        />
      ))}
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
