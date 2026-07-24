"use client";

import React from "react";
import AnimatedSelect from "@/components/ui/AnimatedSelect";

export default function AnimatedSelectPreview() {
  return (
    <div className="flex h-[420px] w-full items-center justify-center p-8 select-none">
      <div className="relative -top-24">
        <AnimatedSelect
          placeholder="Choose Option"
          width={240}
          itemHeight={42}
          triggerHeight={46}
        />
      </div>
    </div>
  );
}
