"use client";

import React from "react";
import { useProps } from "@/lib/PropsContext";
import FluidDockCarousel from "@/components/ui/FluidDockCarousel";

export default function FluidDockCarouselPreview() {
  const { props } = useProps();

  return (
    <div className="absolute inset-0 h-full w-full overflow-hidden rounded-2xl">
      <FluidDockCarousel {...props} className="h-full w-full" />
    </div>
  );
}
