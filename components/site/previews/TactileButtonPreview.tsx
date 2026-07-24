"use client";

import React from "react";
import TactileButton from "@/components/ui/TactileButton";

export default function TactileButtonPreview() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 p-8 select-none">
      <TactileButton variant="primary">Primary</TactileButton>

      <TactileButton variant="secondary">Secondary</TactileButton>

      <TactileButton variant="outline">Outline</TactileButton>

      <TactileButton variant="ghost">Ghost</TactileButton>

      <TactileButton variant="destructive">Destructive</TactileButton>

      <TactileButton variant="secondary" isLoading>
        Loading
      </TactileButton>
    </div>
  );
}
