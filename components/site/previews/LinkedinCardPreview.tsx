"use client";

import React from "react";
import { LinkedinCard } from "../../ui/LinkedinCard";

export default function LinkedinCardPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center p-12 select-none">
      <LinkedinCard
        username="great-ui"
        name="Great UI"
        headline="Premium React UI Components"
        connections="10K+"
        location="San Francisco, CA"
        enableCardTilt={false}
      />
    </div>
  );
}
