"use client";

import { motion, useAnimation, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

export interface CardProps extends Omit<HTMLMotionProps<"div">, "title"> {
  title: string;
  src: string;
  date?: string;
  imgClassName?: string;
  titleClassName?: string;
  dateClassName?: string;
  dividerClassName?: string;
}

export const Card = ({
  title,
  src,
  date,
  className,
  imgClassName,
  titleClassName,
  dateClassName,
  dividerClassName,
  ...props
}: CardProps) => {
  const lineControls = useAnimation();

  const handleMouseEnter = async () => {
    lineControls.set({ scaleX: 0 });
    await lineControls.start({ scaleX: 1 });
  };

  const handleMouseLeave = () => {
    lineControls.start({ scaleX: 0 });
  };

  return (
    <motion.div
      className={cn(
        "group mx-auto mb-3 block max-w-xl overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-100 transition-colors select-none dark:border-neutral-800 dark:bg-neutral-900/50",
        className,
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <div>
        <img
          src={src}
          alt={title}
          className={cn(
            "aspect-video w-full rounded-3xl object-cover",
            imgClassName,
          )}
        />
      </div>
      <div className="flex w-full items-center gap-2 px-3 py-2">
        <p
          className={cn(
            "font-mono text-sm font-semibold whitespace-nowrap text-neutral-900 dark:text-white",
            titleClassName,
          )}
        >
          {title}
        </p>
        <div className="relative flex-1 overflow-hidden">
          <div
            className={cn(
              "border-t border-neutral-200 dark:border-white/10",
              dividerClassName,
            )}
          />
          <motion.div
            className={cn(
              "absolute inset-0 border-t border-neutral-400 dark:border-white/40",
              dividerClassName,
            )}
            initial={{ scaleX: 0 }}
            animate={lineControls}
            exit={{ scaleX: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{ originX: 0 }}
          />
        </div>
        <p
          className={cn(
            "font-mono text-xs whitespace-nowrap text-neutral-500 dark:text-neutral-400",
            dateClassName,
          )}
        >
          {date}
        </p>
      </div>
    </motion.div>
  );
};

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
