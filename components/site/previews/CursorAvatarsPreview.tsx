"use client";

import React from "react";
import CursorAvatars from "@/components/ui/CursorAvatars";

export default function CursorAvatarsPreview() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-12 p-8 select-none">
      <div className="flex flex-col items-center gap-3">
        <span className="text-neutral-450 font-mono text-xs tracking-wider uppercase dark:text-neutral-500">
          Spring Tilt (Moves with Cursor)
        </span>
        <CursorAvatars variant="spring-tilt" size="md" />
      </div>

      <div className="flex flex-col items-center gap-3">
        <span className="text-neutral-450 font-mono text-xs tracking-wider uppercase dark:text-neutral-500">
          Spring Box (Inner Tilting Box)
        </span>
        <CursorAvatars variant="spring-box" size="md" />
      </div>

      <div className="flex flex-col items-center gap-3">
        <span className="text-neutral-450 font-mono text-xs tracking-wider uppercase dark:text-neutral-500">
          Slide Blur (Directional Reveal)
        </span>
        <CursorAvatars variant="slide-blur" size="md" />
      </div>

      <div className="flex w-full flex-col items-center gap-6 border-t border-neutral-200 pt-8 dark:border-neutral-800">
        <span className="text-neutral-450 font-mono text-xs tracking-wider uppercase dark:text-neutral-500">
          Size Comparison (Spring Tilt)
        </span>
        <div className="flex flex-wrap items-center justify-center gap-12">
          <div className="flex flex-col items-center gap-2">
            <span className="font-mono text-[10px] text-neutral-400">
              Small (SM)
            </span>
            <CursorAvatars variant="spring-tilt" size="sm" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="font-mono text-[10px] text-neutral-400">
              Medium (MD)
            </span>
            <CursorAvatars variant="spring-tilt" size="md" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="font-mono text-[10px] text-neutral-400">
              Large (LG)
            </span>
            <CursorAvatars variant="spring-tilt" size="lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
