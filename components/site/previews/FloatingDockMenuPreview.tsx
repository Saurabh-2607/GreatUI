"use client";

import React from "react";
import FloatingDockMenu from "@/components/ui/FloatingDockMenu";

export default function FloatingDockMenuPreview() {
  return (
    <div className="relative flex h-96 w-full items-end justify-center p-6 pb-8 select-none">
      <FloatingDockMenu isFixed={false} />
    </div>
  );
}
