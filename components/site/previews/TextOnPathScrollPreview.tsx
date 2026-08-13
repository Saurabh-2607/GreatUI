"use client";

import React from "react";
import TextOnPathScroll from "@/components/ui/TextOnPathScroll";
import { useViewer } from "@/lib/viewer-context";

export default function TextOnPathScrollPreview() {
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
      <div className="flex h-[80vh] w-full items-center justify-center text-center text-lg font-semibold text-neutral-800 dark:text-neutral-200">
        Scroll down
      </div>

      {/* We pass a custom className to reduce the overall height for the preview window so it's not too long */}
      <TextOnPathScroll
        scrollContainerRef={
          scrollContainerRef as unknown as React.RefObject<HTMLElement>
        }
        className="h-[800vh]"
        textProps={{ fontSize: 320 }}
        scrollOffsets={["100%", "-100%"]}
        path={
          <svg
            width="14100"
            height="4987"
            viewBox="0 0 14100 4987"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              id="scroll-path"
              d="M8.88672 3008.55C8.88672 3008.55 1941.56 3569.02 3210.39 3562.55C4687.66 3555.01 6429.9 4167.86 6909.39 2770.55C7188.33 1957.66 7100.36 1215.96 6490.89 610.047C5726.51 -149.874 4473.23 -171.413 3730.89 610.047C2853.15 1534.03 3636.24 2923.36 4601.89 3755.05C5541.46 4564.27 6529.98 4436.89 7746.39 4196.05C8642.06 4018.71 8948.83 3202.68 9861.89 3200.55C10747.7 3198.47 11761.9 3258.69 11931.9 4128.05C12139.8 5191.48 10146.3 5098.15 9194.39 4580.55C8589.56 4251.68 8152.12 3886.82 8097.39 3200.55C8002.83 2015.06 9781.75 2325.89 10959.4 2160.05C12174.6 1988.91 14092.9 2397.55 14092.9 2397.55"
              stroke="transparent"
              strokeWidth="64"
            />
          </svg>
        }
      />

      <div className="flex h-[80vh] w-full items-center justify-center text-center text-lg font-semibold text-neutral-800 dark:text-neutral-200">
        Scroll up
      </div>
    </div>
  );
}
