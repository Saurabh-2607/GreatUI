"use client";

import React from "react";

export function BackgroundGrid() {
  return (
    <div className="pointer-events-none absolute inset-y-0 right-0 left-0 z-0 mx-auto w-[1360px]">
      <svg
        className="pointer-events-none absolute top-0 left-0 z-0 h-full w-full"
        data-testid="rf__background"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="pattern-hxlvne"
            x="0"
            y="0"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <line
              x1="0"
              y1="24"
              x2="24"
              y2="0"
              stroke="#F6821F"
              strokeWidth="1"
              opacity="0.2"
              style={{ strokeDasharray: "none", strokeDashoffset: 0 }}
            />
          </pattern>
        </defs>

        <rect
          x="0"
          y="0"
          width="40"
          height="100%"
          fill="url(#pattern-hxlvne)"
          style={{ strokeDasharray: "none", strokeDashoffset: 0 }}
        />

        <rect
          x="1320"
          y="0"
          width="40"
          height="100%"
          fill="url(#pattern-hxlvne)"
          style={{ strokeDasharray: "none", strokeDashoffset: 0 }}
        />

        <line
          x1="0.5"
          y1="0"
          x2="0.5"
          y2="100%"
          stroke="var(--color-border-100)"
          strokeWidth="1"
          strokeDasharray="16 16"
        />

        <line
          x1="1359.5"
          y1="0"
          x2="1359.5"
          y2="100%"
          stroke="var(--color-border-100)"
          strokeWidth="1"
          strokeDasharray="16 16"
        />
      </svg>
    </div>
  );
}

export default BackgroundGrid;
