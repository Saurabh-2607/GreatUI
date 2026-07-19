"use client";

import React from "react";
import DitherGradient, { type DitherGradientProps } from "./DitherGradient";

export type DitherContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode;
  className?: string;
  gradientProps?: DitherGradientProps;
  /** Controls dither gradient opacity. Default is 0.5 */
  opacity?: number;
  /** Controls dither bloom preset. Default is 'low' */
  bloom?: DitherGradientProps["bloom"];
  /** Controls gradient direction. Default is 'up' */
  direction?: DitherGradientProps["direction"];
};

export function DitherContainer({
  children,
  className = "",
  gradientProps,
  opacity = 0.3,
  bloom = "low",
  direction = "up",
  ...props
}: DitherContainerProps) {
  const containerClasses =
    `relative w-full max-w-[1360px] border-x border-neutral-800 overflow-hidden m-auto p-6 ${className}`.trim();

  return (
    <div className={containerClasses} {...props}>
      <DitherGradient
        opacity={opacity}
        bloom={bloom}
        direction={direction}
        {...gradientProps}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default DitherContainer;


