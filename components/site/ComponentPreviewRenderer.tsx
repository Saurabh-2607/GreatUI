"use client";

import React, { useState, useEffect } from "react";
import { components } from "@/lib/registry";

interface ComponentPreviewRendererProps {
  slug: string;
  variantProps?: Record<string, unknown>;
}

function DynamicPreviewLoader({
  filename,
  componentName,
}: {
  filename: string;
  componentName: string;
}) {
  const [PreviewComp, setPreviewComp] = useState<React.ComponentType | null>(
    null,
  );
  const [error, setError] = useState(false);

  useEffect(() => {
    import(`./previews/${filename}`)
      .then((mod) => {
        setPreviewComp(() => mod.default);
      })
      .catch(() => {
        setError(true);
      });
  }, [filename]);

  if (error) {
    return (
      <div className="text-neutral-450 py-6 text-center text-xs">
        No preview component found for {componentName}.
      </div>
    );
  }

  if (!PreviewComp) {
    return <div className="text-sm text-neutral-400">Loading preview...</div>;
  }

  return <PreviewComp />;
}

export default function ComponentPreviewRenderer({
  slug,
}: ComponentPreviewRendererProps) {
  const component = components.find((c) => c.slug === slug);

  if (!component) {
    return (
      <div className="py-6 text-center text-xs text-neutral-400">
        No registry entry found for {slug}.
      </div>
    );
  }

  const previewFilename = component.previewFile || `${component.name}Preview`;

  return (
    <div className="pointer-events-auto relative z-10 flex h-full w-full items-center justify-center">
      <DynamicPreviewLoader
        key={previewFilename}
        filename={previewFilename}
        componentName={component.name}
      />
    </div>
  );
}
