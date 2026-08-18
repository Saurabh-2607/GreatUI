"use client";

import React from "react";
import SplitLineFlyIn from "../../ui/SplitLineFlyIn";
import { useViewer } from "@/lib/viewer-context";

export default function SplitLineFlyInPreview() {
  const { previewContainer } = useViewer();

  if (!previewContainer) {
    return (
      <div className="flex h-40 items-center justify-center font-mono text-sm text-neutral-400 dark:text-neutral-500">
        Loading scroll container...
      </div>
    );
  }

  const scrollContainerRef = { current: previewContainer };

  return (
    <div className="w-full select-none">
      <div className="flex h-screen w-full items-center justify-center text-center text-lg font-semibold text-neutral-400">
        Scroll down
      </div>

      <SplitLineFlyIn
        text="Every journey begins with a single moment of wonder—a quiet urge to explore what waits beyond the familiar. In a world alive with possibilities, small choices often shape destinies in ways we rarely expect. As horizons expand with every bold step, we discover how curiosity fuels growth far more than any roadmap written before us. Through challenges and triumphs, the stories we collect become the backbone of who we are."
        direction="alternate"
        scrollContainerRef={
          scrollContainerRef as unknown as React.RefObject<HTMLElement>
        }
      />

      <div className="flex h-screen w-full items-center justify-center text-center text-lg font-semibold text-neutral-400">
        Scroll up
      </div>
    </div>
  );
}
