"use client";

import React from "react";

export type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode;
  className?: string;
};

export function Container({
  children,
  className = "",
  ...props
}: ContainerProps) {
  const containerClasses =
    `relative w-full max-w-[1360px] border-x border-neutral-800 overflow-hidden m-auto p-6 ${className}`.trim();

  return (
    <div className={containerClasses} {...props}>
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default Container;
