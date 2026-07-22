"use client";

import React from "react";
import Button from "@/components/ui/Button";

interface ComponentPreviewRendererProps {
  slug: string;
  variantProps?: Record<string, unknown>;
}

export default function ComponentPreviewRenderer({
  slug,
}: ComponentPreviewRendererProps) {
  if (slug === "button") {
    return (
      <div className="flex flex-wrap items-center justify-center gap-4 p-6">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="primary" isLoading>
          Loading
        </Button>
      </div>
    );
  }

  return (
    <div className="py-6 text-center text-xs text-neutral-400">
      No preview available for {slug}.
    </div>
  );
}
