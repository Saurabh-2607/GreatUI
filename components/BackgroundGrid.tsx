"use client";

import React from "react";

export function BackgroundGrid() {
  return (
    <div className="pointer-events-none absolute inset-y-0 left-1/2 z-0 w-[1480px] -translate-x-1/2">
      <svg
        className="pointer-events-none absolute top-0 left-0 z-0 h-full w-full"
        data-testid="rf__background"
        aria-hidden="true"
        style={{ strokeDasharray: "none", strokeDashoffset: 0 }}
      >
        <pattern
          id="pattern-hxlvne"
          x="0"
          y="0"
          width="12"
          height="12"
          patternUnits="userSpaceOnUse"
        >
          <circle
            cx="6"
            cy="6"
            r="0.75"
            fill="var(--color-decor-dots-100)"
            style={{ strokeDasharray: "none", strokeDashoffset: 0 }}
          />
        </pattern>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="url(#pattern-hxlvne)"
          style={{ strokeDasharray: "none", strokeDashoffset: 0 }}
        />
      </svg>
      <div
        className="absolute top-0 left-0 h-full w-px"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, var(--color-border-100) 50%, transparent 50%)",
          backgroundSize: "1px 32px",
          backgroundRepeat: "repeat-y",
        }}
      />
      <div
        className="absolute top-0 right-0 h-full w-px"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, var(--color-border-100) 50%, transparent 50%)",
          backgroundSize: "1px 32px",
          backgroundRepeat: "repeat-y",
        }}
      />
    </div>
  );
}

export default BackgroundGrid;
