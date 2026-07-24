"use client";

import React from "react";
import BrowseAllButton from "@/components/ui/BrowseAllButton";

export default function BrowseAllButtonPreview() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 p-8 select-none">
      <BrowseAllButton variant="primary">Primary</BrowseAllButton>

      <BrowseAllButton variant="secondary">Secondary</BrowseAllButton>

      <BrowseAllButton variant="outline">Outline</BrowseAllButton>

      <BrowseAllButton variant="ghost">Ghost</BrowseAllButton>

      <BrowseAllButton variant="destructive">Destructive</BrowseAllButton>

      <BrowseAllButton variant="secondary" isLoading>
        Loading
      </BrowseAllButton>
    </div>
  );
}
