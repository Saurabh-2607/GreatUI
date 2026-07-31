"use client";

import { FrostedGlassReveal } from "@/components/ui/FrostedGlassReveal";

export default function FrostedGlassRevealPreview() {
  return (
    <div className="flex h-full min-h-[600px] w-full items-center justify-center overflow-hidden bg-neutral-900 select-none">
      <FrostedGlassReveal
        revealShape="square"
        glassStrength={20}
        imageUrl="https://ik.imagekit.io/ybq4azred/kazakhstan_landscape_1785531224453.png"
        className="h-full w-full"
      />
    </div>
  );
}
