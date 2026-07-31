"use client";

import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export interface AccordionItem {
  title: string;
  description: string;
}

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  items: AccordionItem[];
}

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  ({ items, className, ...props }, ref) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(1);
    const innerRef = useRef<HTMLDivElement>(null);

    // Merge forwarded ref and inner ref
    useImperativeHandle(ref, () => innerRef.current as HTMLDivElement);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          innerRef.current &&
          !innerRef.current.contains(event.target as Node)
        ) {
          setActiveIndex(null);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleAccordion = (index: number) => {
      setActiveIndex(activeIndex === index ? null : index);
    };

    return (
      <div ref={innerRef} className={cn("w-full", className)} {...props}>
        <div className="mx-auto w-full max-w-lg rounded-2xl bg-gradient-to-b from-[#fdf7f9] to-[#fcebf2] p-1.5 dark:from-neutral-900 dark:to-neutral-900/50">
          <div className="space-y-1.5">
            {items.map((item, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-xl border border-transparent bg-white shadow-sm dark:border-neutral-700/50 dark:bg-neutral-800 dark:shadow-none"
              >
                <button
                  className="flex w-full cursor-pointer items-center justify-between px-5 py-4 text-left text-base font-medium text-gray-800 transition-colors dark:text-gray-200"
                  onClick={() => toggleAccordion(index)}
                >
                  <span>{item.title}</span>
                  <motion.span
                    animate={{ rotate: activeIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-lg font-light text-gray-400 dark:text-gray-500"
                  >
                    {activeIndex === index ? "−" : "+"}
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div
                        className="cursor-pointer px-5 pb-4 text-sm leading-relaxed text-gray-500 dark:text-gray-400"
                        onClick={() => toggleAccordion(index)}
                      >
                        {item.description}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
);

Accordion.displayName = "Accordion";

export default Accordion;

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
