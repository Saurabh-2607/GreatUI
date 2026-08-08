"use client";

import React from "react";
import ComponentPreviewRenderer from "./ComponentPreviewRenderer";
import { type Component } from "@/lib/registry";

interface ComponentCardProps {
  component: Component;
}

export default function ComponentCard({ component }: ComponentCardProps) {
  return (
    <div className="group flex h-full w-full flex-col select-none">
      <div className="relative flex h-56 w-full items-center justify-center overflow-hidden bg-[#0d0d0d] p-3">
        {component.previewImage ? (
          <img
            src={component.previewImage}
            alt={component.name}
            className="h-full w-full scale-135 object-contain"
          />
        ) : (
          <div className="pointer-events-none relative z-10 flex w-full items-center justify-center">
            <ComponentPreviewRenderer slug={component.slug} />
          </div>
        )}
      </div>

      <div className="flex flex-col p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xl font-semibold text-neutral-900 transition-colors group-hover:text-[#f6821f] dark:text-white">
            {component.name}
          </span>
        </div>
      </div>
    </div>
  );
}
