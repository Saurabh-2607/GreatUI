"use client";

import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const path1Variants = {
  closed: { d: "M 2 5 L 16 5" },
  open: { d: "M 4 4 L 14 14" },
};
const path2Variants = {
  closed: { d: "M 2 13 L 16 13" },
  open: { d: "M 4 14 L 14 4" },
};

interface MenuIconProps {
  isOpen: boolean;
}

function MenuIcon({ isOpen }: MenuIconProps) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      className="text-neutral-900 dark:text-white"
    >
      <motion.path
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        variants={path1Variants}
        animate={isOpen ? "open" : "closed"}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
      <motion.path
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        variants={path2Variants}
        animate={isOpen ? "open" : "closed"}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
    </svg>
  );
}

export interface MenuLink {
  label: string;
  href: string;
}

export interface FloatingMenuProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "title"
> {
  title?: React.ReactNode;
  primaryLinks?: MenuLink[];
  secondaryLinks?: MenuLink[];
  socialLinks?: MenuLink[];
}

export const FloatingMenu = forwardRef<HTMLDivElement, FloatingMenuProps>(
  (
    {
      title = (
        <span className="text-base font-bold tracking-wider text-white select-none">
          MENU
        </span>
      ),
      primaryLinks = [],
      secondaryLinks = [],
      socialLinks = [],
      className,
      ...props
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const innerRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => innerRef.current as HTMLDivElement);

    useEffect(() => {
      if (!isOpen) return;
      const handleClickOutside = (e: MouseEvent) => {
        if (innerRef.current && !innerRef.current.contains(e.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    const contentVariants = {
      closed: {
        opacity: 0,
        transition: {
          staggerChildren: 0.01,
          staggerDirection: -1,
          when: "afterChildren",
        },
      },
      open: {
        opacity: 1,
        transition: {
          staggerChildren: 0.02,
          delayChildren: 0.05,
        },
      },
    };

    const itemVariants = {
      closed: {
        opacity: 0,
        y: 12,
        transition: { duration: 0.15 },
      },
      open: {
        opacity: 1,
        y: 0,
        transition: { type: "spring" as const, stiffness: 300, damping: 24 },
      },
    };

    return (
      <div
        className={cn(
          "pointer-events-none fixed top-6 left-1/2 z-50 flex -translate-x-1/2 items-start justify-center",
          className,
        )}
        {...props}
      >
        <motion.div
          ref={innerRef}
          animate={{
            width: isOpen ? 380 : 320,
            height: isOpen ? 700 : 56,
            padding: isOpen ? 16 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: isOpen ? 280 : 300,
            damping: isOpen ? 26 : 35,
          }}
          className={cn(
            "pointer-events-auto relative flex flex-col overflow-hidden rounded-3xl border border-transparent bg-transparent transition-colors duration-300 ease-out select-none",
            isOpen &&
              "border-black/5 bg-neutral-200 dark:border-white/10 dark:bg-neutral-800",
          )}
        >
          <motion.div
            whileTap={{ scale: isOpen ? 1 : 0.98 }}
            onClick={() => {
              if (!isOpen) setIsOpen(true);
            }}
            className={cn(
              "flex h-14 w-full cursor-pointer items-center justify-between rounded-3xl border border-neutral-200 bg-white px-4 text-neutral-900 dark:border-neutral-800 dark:bg-neutral-900 dark:text-white",
              isOpen && "pointer-events-auto",
            )}
          >
            <div className="flex items-center space-x-2">{title}</div>

            <div className="flex items-center space-x-2.5">
              <div
                onClick={(e) => {
                  if (isOpen) {
                    e.stopPropagation();
                    setIsOpen(false);
                  }
                }}
                className="flex cursor-pointer items-center space-x-2 rounded-3xl border border-neutral-200 bg-neutral-100 px-3 py-1.5 text-xs font-semibold text-neutral-900 transition-all hover:bg-neutral-200 active:scale-95 dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
              >
                <MenuIcon isOpen={isOpen} />
                <span className="text-xs font-medium tracking-wide select-none">
                  {isOpen ? "Close" : "Menu"}
                </span>
              </div>
            </div>
          </motion.div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial="closed"
                animate="open"
                exit="closed"
                variants={contentVariants}
                className="absolute top-[88px] right-4 bottom-4 left-4 flex [scrollbar-width:none] flex-col justify-between overflow-y-auto px-1 pb-1 text-left [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              >
                {primaryLinks.length > 0 && (
                  <div className="flex flex-col space-y-1.5">
                    <motion.span
                      variants={itemVariants}
                      className="mb-1 block text-xs font-bold tracking-widest text-neutral-500 uppercase dark:text-neutral-400"
                    >
                      Menu
                    </motion.span>
                    {primaryLinks.map((link) => (
                      <motion.div
                        key={link.label}
                        variants={itemVariants}
                        whileHover={{ x: 6 }}
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 18,
                        }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className="block text-[32px] leading-snug font-bold text-neutral-900 transition-colors hover:text-neutral-600 dark:text-white dark:hover:text-neutral-300"
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                )}

                {primaryLinks.length > 0 &&
                  (secondaryLinks.length > 0 || socialLinks.length > 0) && (
                    <motion.div
                      variants={itemVariants}
                      className="my-5 border-t border-neutral-300 dark:border-white/10"
                    />
                  )}

                {secondaryLinks.length > 0 && (
                  <div className="flex flex-col space-y-2.5">
                    <motion.span
                      variants={itemVariants}
                      className="mb-1 block text-xs font-bold tracking-widest text-neutral-500 uppercase dark:text-neutral-400"
                    >
                      Other
                    </motion.span>
                    {secondaryLinks.map((link) => (
                      <motion.div
                        key={link.label}
                        variants={itemVariants}
                        whileHover={{ x: 4 }}
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 18,
                        }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className="block text-lg font-medium text-neutral-800 transition-colors hover:text-neutral-500 dark:text-neutral-200 dark:hover:text-neutral-400"
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                )}

                {socialLinks.length > 0 && (
                  <div className="mt-5 flex flex-col space-y-2">
                    <motion.span
                      variants={itemVariants}
                      className="mb-1 block text-xs font-bold tracking-widest text-neutral-500 uppercase dark:text-neutral-400"
                    >
                      Social media
                    </motion.span>
                    {socialLinks.map((link) => (
                      <motion.div
                        key={link.label}
                        variants={itemVariants}
                        whileHover={{ x: 4 }}
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 18,
                        }}
                      >
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-lg font-medium text-neutral-800 transition-colors hover:text-neutral-500 dark:text-neutral-200 dark:hover:text-neutral-400"
                        >
                          {link.label}
                        </a>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    );
  },
);

FloatingMenu.displayName = "FloatingMenu";

export default FloatingMenu;

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
