"use client";

import React from "react";
import AceternityButton from "../../ui/AceternityButton";

export default function AceternityButtonPreview() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 p-8 select-none">
      <AceternityButton variant="primary">Primary</AceternityButton>

      <AceternityButton variant="secondary">Secondary</AceternityButton>

      <AceternityButton variant="outline">Outline</AceternityButton>

      <AceternityButton variant="ghost">Ghost</AceternityButton>

      <AceternityButton variant="destructive">Destructive</AceternityButton>

      <AceternityButton variant="secondary" isLoading>
        Loading
      </AceternityButton>
    </div>
  );
}
