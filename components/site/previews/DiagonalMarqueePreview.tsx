"use client";

import React from "react";
import DiagonalMarquee from "@/components/ui/DiagonalMarquee";

export default function DiagonalMarqueePreview() {
  return (
    <DiagonalMarquee className="absolute -inset-5 h-[calc(100%+2.5rem)] max-h-none w-[calc(100%+2.5rem)] max-w-none" />
  );
}
