import Container from "./Container";

export function BentoGrid() {
  return (
    <Container className="py-12 md:py-16">
      <div className="relative z-10 -mx-4 grid grid-cols-1 border border-neutral-200 bg-neutral-50/10 sm:-mx-6 md:grid-cols-3 dark:border-neutral-800 dark:bg-neutral-900/5">
        {/* Corner Anchors Overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-20 select-none"
          aria-hidden="true"
        >
          <div className="absolute -top-[7px] -left-[7px] h-3.5 w-3.5 rounded-[3px] border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-[#0a0a0a]" />
          <div className="absolute -top-[7px] -right-[7px] h-3.5 w-3.5 rounded-[3px] border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-[#0a0a0a]" />
          <div className="absolute -bottom-[7px] -left-[7px] h-3.5 w-3.5 rounded-[3px] border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-[#0a0a0a]" />
          <div className="absolute -right-[7px] -bottom-[7px] h-3.5 w-3.5 rounded-[3px] border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-[#0a0a0a]" />
        </div>

        {/* Cell 1: Production-Ready Code (Col Span 2) */}
        <div className="flex h-[280px] flex-col justify-between border-b border-neutral-200 p-6 md:col-span-2 md:border-r dark:border-neutral-800">
          <div>
            <span className="text-[10px] font-bold tracking-widest text-[#f6821f] uppercase">
              Production-Ready Code
            </span>
            <h3 className="mt-1.5 text-2xl font-semibold tracking-tight text-neutral-950 dark:text-white">
              Copy and paste premium hooks &amp; UI components.
            </h3>
          </div>
          <div className="overflow-hidden rounded-lg border border-neutral-200/60 bg-neutral-100/50 p-4 font-mono text-xs leading-relaxed text-neutral-600 shadow-xs dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-400">
            <span className="text-blue-500">const</span> [state, setState] ={" "}
            <span className="text-purple-500">useState</span>
            (&apos;active&apos;);
            <br />
            <span className="text-blue-500">const</span> registry ={" "}
            <span className="text-purple-500">useRegistry</span>
            (&apos;great-ui&apos;);
          </div>
        </div>

        {/* Cell 2: Theme / Aesthetics (Col Span 1) */}
        <div className="flex h-[280px] flex-col justify-between border-b border-neutral-200 p-6 md:col-span-1 dark:border-neutral-800">
          <div>
            <span className="text-neutral-450 text-[10px] font-bold tracking-widest uppercase dark:text-neutral-500">
              Aesthetics
            </span>
            <h3 className="mt-1.5 text-2xl font-semibold tracking-tight text-neutral-950 dark:text-white">
              Dark mode &amp; glassmorphism.
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-20 items-center justify-start rounded-full border border-neutral-200 bg-neutral-100 p-1 transition-all duration-300 dark:justify-end dark:border-neutral-800 dark:bg-neutral-900">
              <div className="h-8 w-8 rounded-full bg-[#f6821f] shadow-xs" />
            </div>
          </div>
        </div>

        {/* Cell 3: Performance (Col Span 1) */}
        <div className="flex h-[280px] flex-col justify-between border-b border-neutral-200 p-6 md:col-span-1 md:border-r md:border-b-0 dark:border-neutral-800">
          <div>
            <span className="text-neutral-450 text-[10px] font-bold tracking-widest uppercase dark:text-neutral-500">
              Performance
            </span>
            <h3 className="mt-1.5 text-2xl font-semibold tracking-tight text-neutral-950 dark:text-white">
              Zero bundle bloat. Pure utility.
            </h3>
          </div>
          <div className="text-5xl font-extrabold tracking-tight text-[#f6821f]">
            0ms
          </div>
        </div>

        {/* Cell 4: Frameworks (Col Span 2) */}
        <div className="flex h-[280px] flex-col justify-between p-6 md:col-span-2">
          <div>
            <span className="text-neutral-450 text-[10px] font-bold tracking-widest uppercase dark:text-neutral-500">
              Frameworks
            </span>
            <h3 className="mt-1.5 text-2xl font-semibold tracking-tight text-neutral-950 dark:text-white">
              First-class support for Next.js 16 and React 19.
            </h3>
          </div>
          <div className="text-neutral-450 flex items-center gap-4 text-xs font-semibold uppercase dark:text-neutral-500">
            <span>• Next.js</span>
            <span>• Vite</span>
            <span>• Astro</span>
            <span>• Remix</span>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default BentoGrid;
