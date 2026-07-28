"use client";

import {
  WebglTransitionProvider,
  useWebglTransition,
} from "@/components/ui/PageTransitionShader";

function VortexControl() {
  const { setShaderMode, triggerTransition } = useWebglTransition();
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-10 select-none">
      <div className="text-center">
        <p className="text-sm font-semibold tracking-wide text-neutral-500 dark:text-neutral-400">
          Vortex Spiral
        </p>
        <p className="mt-1 text-xs text-neutral-400 dark:text-neutral-500">
          Rotating swirl vortex wipe transition.
        </p>
      </div>
      <button
        onClick={() => {
          setShaderMode("vortex");
          triggerTransition();
        }}
        className="cursor-pointer rounded-xl bg-neutral-950 px-5 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:bg-neutral-800 active:scale-95 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100"
      >
        Trigger Vortex
      </button>
    </div>
  );
}

export default function VortexSpiralShaderPreview() {
  return (
    <WebglTransitionProvider>
      <VortexControl />
    </WebglTransitionProvider>
  );
}
