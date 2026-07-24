"use client";

import React from "react";
import DocumentHistoryTimeline, {
  TimelineRevision,
} from "@/components/ui/DocumentHistoryTimeline";

const MOCK_REVISIONS: TimelineRevision[] = [
  {
    id: "rev-1",
    date: "July 19, 2026",
    time: "16:00",
    title: "Release Candidate 1",
    author: "Saurabh",
    kind: "major",
    content: `### Release Candidate v1.0.0-rc1
- Codebase is fully optimized and typechecked with zero compile errors.
- Verified smooth scrolling on timelines and marquee carousels.
- Readied documentation panel and code previews.
> Verified responsive behavior across multiple screen viewports.

![Release Preview](https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80)

- Final regression pass completed for mobile and desktop states.
- Confirmed all timeline interactions are responsive under load.`,
  },
  {
    id: "rev-2",
    date: "July 18, 2026",
    time: "14:30",
    title: "Daily Sync Completed",
    author: "Saurabh",
    kind: "minor",
    content: `### Weekly Sync Wrap-Up
- Reviewed the latest UI tweaks and interaction polish.
- Confirmed the responsive layout changes on mobile and desktop.
- Shared the next iteration notes with the design team.
> "The new timeline flow feels much more intuitive and polished."

![Sync Notes](https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80)

- Added extra detail cards for the active revision view.
- Ensured the metadata display is stable across all browser widths.`,
  },
  {
    id: "rev-3",
    date: "July 16, 2026",
    time: "10:45",
    title: "Accessibility Pass",
    author: "Saurabh",
    kind: "minor",
    content: `### Accessibility Improvements
- Added stronger focus states for interactive elements.
- Improved screen-reader labels on the history controls.
- Verified keyboard navigation across the preview surface.
> "The timeline now works smoothly with keyboard-only navigation."

![Accessibility Audit](/previews/MobileMockupPreview.png)

- Updated contrast tokens and interactive role attributes.
- Polished the hover states for a cleaner, calmer experience.`,
  },
];

export default function DocumentHistoryTimelinePreview() {
  return (
    <div className="flex w-full items-center justify-center bg-transparent p-6">
      <DocumentHistoryTimeline revisions={MOCK_REVISIONS} />
    </div>
  );
}
