"use client";

import React from "react";
import MinimalButtons from "../../ui/MinimalButtons";

export default function MinimalButtonsPreview() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 p-8 select-none">
      <MinimalButtons variant="primary">Primary</MinimalButtons>

      <MinimalButtons variant="secondary">Secondary</MinimalButtons>

      <MinimalButtons variant="outline">Outline</MinimalButtons>

      <MinimalButtons variant="ghost">Ghost</MinimalButtons>

      <MinimalButtons variant="destructive">Destructive</MinimalButtons>

      <MinimalButtons variant="secondary" isLoading>
        Loading
      </MinimalButtons>
    </div>
  );
}
