"use client";

import React from "react";

interface ComponentPreviewRendererProps {
  slug: string;
  variantProps?: Record<string, unknown>;
}

export default function ComponentPreviewRenderer({
  slug,
}: ComponentPreviewRendererProps) {
  return (
    <div className="py-6 text-center text-xs text-neutral-400">
      No preview available for {slug}.
    </div>
  );
}
