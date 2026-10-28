"use client";

import React from "react";
import { useProps } from "@/lib/PropsContext";
import FluidAppDock from "@/components/ui/FluidAppDock";

export default function FluidAppDockPreview() {
  const { props } = useProps();

  return (
    <div className="relative flex h-96 w-full items-center justify-center p-6 select-none">
      <FluidAppDock isFixed={false} {...props} />
    </div>
  );
}
