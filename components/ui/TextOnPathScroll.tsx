"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type SpringOptions,
} from "motion/react";
import { cn } from "@/lib/utils";

interface TextOnPathScrollProps {
  /**
   * The text to display on the path.
   * Recommend appending special characters like • or · between repetitions.
   */
  text?: string;
  /**
   * Additional CSS classes to apply to the container.
   */
  className?: string;
  /**
   * Optional ref for a custom scroll container (e.g. for preview panels).
   */
  scrollContainerRef?: React.RefObject<HTMLElement | null>;
  /**
   * The SVG element containing the path. Must include a <path id="scroll-path" />.
   */
  path?: React.ReactNode;
  /**
   * Additional props to pass to the `<text>` SVG element. Useful for changing fontSize.
   */
  textProps?: React.SVGProps<SVGTextElement>;
  /**
   * The start and end scroll offsets for the text along the path.
   */
  scrollOffsets?: [number | string, number | string];
  /**
   * Options for the spring animation that smooths the scroll progress.
   */
  springOptions?: SpringOptions;
}

export default function TextOnPathScroll({
  text = "CRAFTING BEAUTIFUL DIGITAL EXPERIENCES • PUSHING THE BOUNDARIES OF WEB DESIGN • WRITING CLEAN CODE • BUILDING EXCEPTIONAL INTERFACES • ",
  className,
  scrollContainerRef,
  path = (
    <svg viewBox="0 0 2207 208" className="w-full overflow-visible">
      <path
        id="scroll-path"
        d="M0.257812 54.1707C0.257812 54.1707 332.27 258.365 829.258 194.671C1022.55 169.899 1292.6 78.4697 1536.76 21.6707C1804.19 -40.5439 2206.76 54.1714 2206.76 54.1714"
        fill="none"
      />
    </svg>
  ),
  textProps,
  scrollOffsets = [2500, -8000],
  springOptions = { stiffness: 50, damping: 20, restDelta: 0.001 },
}: TextOnPathScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    container: scrollContainerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, springOptions);

  const startOffset = useTransform(smoothProgress, [0, 1], scrollOffsets);

  const svgElement = path as React.ReactElement<React.SVGProps<SVGSVGElement>>;

  return (
    <div
      ref={containerRef}
      className={cn("relative h-[800vh] w-full", className)}
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        {React.cloneElement(svgElement, {
          className: cn(svgElement.props.className, "w-full overflow-visible"),
          children: (
            <>
              {svgElement.props.children}
              <text
                fill="currentColor"
                fontWeight="900"
                className="tracking-tighter text-neutral-900 uppercase dark:text-white"
                fontSize="96"
                {...textProps}
              >
                <motion.textPath href="#scroll-path" startOffset={startOffset}>
                  {text}
                </motion.textPath>
              </text>
            </>
          ),
        })}
      </div>
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
 * X: https://x.com/srbh_here
 */
