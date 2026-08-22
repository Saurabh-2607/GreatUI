"use client";

import React from "react";
import { TextReveal } from "../../ui/TextReveal";
import { useViewer } from "@/lib/viewer-context";

export default function TextRevealPreview() {
  const { previewContainer } = useViewer();

  if (!previewContainer) {
    return (
      <div className="flex h-40 items-center justify-center font-mono text-sm text-neutral-400 dark:text-neutral-500">
        Loading scroll container...
      </div>
    );
  }

  const dummyRef = { current: previewContainer };

  const paragraphs = [
    "Every journey begins with a single moment of wonder—a quiet urge to explore what waits beyond the familiar.",
    "In a world alive with possibilities, small choices often shape destinies in ways we rarely expect.",
    "As horizons expand with every bold step, we discover how curiosity fuels growth far more than any roadmap written before us.",
    "Through challenges and triumphs, the stories we collect become the backbone of who we are, reminding us that adventure is not a destination, but a mindset we choose daily.",
  ];

  return (
    <div className="w-full select-none">
      <div className="flex h-[90dvh] w-full items-center justify-center text-center text-lg font-semibold text-black dark:text-white">
        Scroll down
      </div>
      <TextReveal
        paragraphs={paragraphs}
        containerRef={dummyRef as unknown as React.RefObject<HTMLDivElement>}
      />
      <div className="flex h-[90dvh] w-full items-center justify-center text-center text-lg font-semibold text-black dark:text-white">
        Scroll up
      </div>
    </div>
  );
}
