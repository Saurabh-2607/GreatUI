"use client";

import React from "react";
import AnimatedLink, {
  AnimatedLinkVariant,
} from "@/components/ui/AnimatedLink";

const previewVariants: {
  label: string;
  variant: AnimatedLinkVariant;
  showArrow?: boolean;
}[] = [
  { label: "Classic Underline", variant: "underline" },
  { label: "Center Underline", variant: "centerUnderline" },
  { label: "Top Overline", variant: "overline" },
  { label: "Vertical Borders", variant: "verticalLines" },
  { label: "Slide Reveal Line", variant: "revealLine" },
  { label: "Fade Up Line", variant: "fadeUpLine" },
  { label: "Dash Arrow Hover", variant: "dashHover" },
  { label: "Clip Fill Y", variant: "clipFillY" },
  { label: "Clip Fill X", variant: "clipFillX" },
  { label: "Clip Center", variant: "clipCenter" },
  { label: "Doodle Underline", variant: "clipDoodle" },
  { label: "Loop Wave", variant: "wavy" },
  { label: "Text Rise Marquee", variant: "textRise" },
];

export default function AnimatedLinkPreview() {
  return (
    <div className="w-full max-w-4xl px-8 py-12 select-none">
      <div className="grid grid-cols-2 gap-x-12 gap-y-12 sm:grid-cols-3 md:grid-cols-4">
        {previewVariants.map((item) => (
          <div key={item.label} className="flex h-8 items-center">
            <AnimatedLink
              href="#"
              variant={item.variant}
              showArrow={item.showArrow}
              className="text-xl font-semibold transition-colors"
            >
              {item.label}
            </AnimatedLink>
          </div>
        ))}
      </div>
    </div>
  );
}
