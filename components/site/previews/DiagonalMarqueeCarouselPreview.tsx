"use client";

import React from "react";
import DiagonalMarqueeCarousel from "../../ui/DiagonalMarqueeCarousel";

export default function DiagonalMarqueeCarouselPreview() {
  return (
    <DiagonalMarqueeCarousel className="absolute -inset-5 h-[calc(100%+2.5rem)] max-h-none w-[calc(100%+2.5rem)] max-w-none" />
  );
}
