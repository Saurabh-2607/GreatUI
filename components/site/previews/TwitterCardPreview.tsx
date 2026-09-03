"use client";

import React from "react";
import { TwitterCard } from "../../ui/TwitterCard";

export default function TwitterCardPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center p-12 select-none">
      <TwitterCard
        username="srbh_here"
        name="Saurabh Sharma"
        enableCardTilt={false}
      />
    </div>
  );
}
