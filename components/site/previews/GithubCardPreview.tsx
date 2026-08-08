"use client";

import React from "react";
import { GithubCard } from "@/components/ui/GithubCard";

export default function GithubCardPreview() {
  return (
    <div className="flex items-center justify-center p-12 select-none">
      <GithubCard
        username="Saurabh-2607"
        name="Saurabh Sharma"
        year={2026}
        themeScheme="green"
        enableCardTilt={false}
      />
    </div>
  );
}
