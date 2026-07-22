"use client";

import React from "react";
import posthog from "posthog-js";
import ComponentPreviewRenderer from "./ComponentPreviewRenderer";
import { type Component } from "@/lib/registry";

interface ComponentCardProps {
  component: Component;
}

export default function ComponentCard({ component }: ComponentCardProps) {
  return (
    <div
      className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl bg-neutral-50/50 shadow-xs transition-all duration-300 select-none hover:bg-neutral-100/50 hover:shadow-md dark:bg-neutral-900/30 dark:hover:bg-[#141414]/80"
      onClick={() =>
        posthog.capture("component_card_clicked", {
          component_slug: component.slug,
          component_name: component.name,
          component_category: component.category,
        })
      }
    >
      <div className="relative flex h-56 w-full items-center justify-center overflow-hidden rounded-b-2xl bg-[#0d0d0d]">
        {component.previewImage ? (
          <img
            src={component.previewImage}
            alt={component.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="pointer-events-none relative z-10 flex w-full items-center justify-center">
            <ComponentPreviewRenderer slug={component.slug} />
          </div>
        )}
      </div>

      <div className="flex flex-col p-6">
        <div className="flex items-center justify-between gap-2">
          <span className="font-semiBold text-2xl text-neutral-900 transition-colors group-hover:text-[#f6821f] dark:text-white">
            {component.name}
          </span>
        </div>
        <p className="mt-2 line-clamp-2 text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
          {component.description}
        </p>
      </div>
    </div>
  );
}
