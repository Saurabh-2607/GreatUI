"use client";

import React from "react";
import ImageHoverReveal from "@/components/ui/ImageHoverReveal";

export default function ImageHoverRevealPreview() {
  const sharedSrc =
    "https://ik.imagekit.io/ybq4azred/temp_person_color_1784920435220.png";
  const ghibliOverlay =
    "https://ik.imagekit.io/ybq4azred/temp_ghibli_perfect_1784920632003.png";

  return (
    <div className="flex flex-col items-center justify-center gap-12 p-8 select-none md:flex-row">
      <div className="flex flex-col items-center gap-3">
        <span className="font-mono text-[10px] tracking-widest text-neutral-400 uppercase dark:text-neutral-500">
          Directional Hover
        </span>
        <ImageHoverReveal
          variant="directional"
          src={sharedSrc}
          overlaySrc={ghibliOverlay}
          alt="Ghibli Directional Hover"
          className="h-56 w-56 rounded-3xl border border-neutral-200 bg-neutral-950 shadow-lg dark:border-neutral-800/80"
        />
      </div>

      <div className="flex flex-col items-center gap-3">
        <span className="font-mono text-[10px] tracking-widest text-neutral-400 uppercase dark:text-neutral-500">
          Mouse Track Slot
        </span>
        <ImageHoverReveal
          variant="slice"
          src={sharedSrc}
          overlaySrc={ghibliOverlay}
          alt="Ghibli Mouse Track Slot"
          className="h-56 w-56 rounded-3xl border border-neutral-200 bg-neutral-950 shadow-lg dark:border-neutral-800/80"
        />
      </div>
    </div>
  );
}
