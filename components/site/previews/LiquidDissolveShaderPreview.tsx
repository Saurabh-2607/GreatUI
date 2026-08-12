"use client";

import {
  WebglTransitionProvider,
  useWebglTransition,
} from "../../ui/PageTransitionShader";

function DissolveControl() {
  const { setShaderMode, triggerTransition } = useWebglTransition();
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-10 select-none">
      <div className="text-center">
        <p className="text-sm font-semibold tracking-wide text-neutral-500 dark:text-neutral-400">
          Liquid Dissolve
        </p>
        <p className="mt-1 text-xs text-neutral-400 dark:text-neutral-500">
          Organic fractal noise dissolve transition.
        </p>
      </div>
      <button
        onClick={() => {
          setShaderMode("liquid");
          triggerTransition();
        }}
        className="cursor-pointer rounded-xl bg-neutral-950 px-5 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:bg-neutral-800 active:scale-95 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100"
      >
        Trigger Dissolve
      </button>
    </div>
  );
}

export default function LiquidDissolveShaderPreview() {
  return (
    <WebglTransitionProvider>
      <DissolveControl />
    </WebglTransitionProvider>
  );
}
