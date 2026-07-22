import Container from "./Container";

export function Sponsors() {
  return (
    <Container className="py-20 md:py-28">
      <div className="flex flex-col items-center justify-center text-center">
        <h2 className="text-4xl leading-[1.0] font-semibold tracking-tight text-balance text-neutral-950 sm:text-5xl md:text-6xl dark:text-white">
          Sponsors
        </h2>
        <p className="leading-tighter mt-4 max-w-2xl text-lg tracking-normal text-pretty text-neutral-600 sm:text-xl md:text-2xl dark:text-neutral-400">
          Support independent open-source component development and feature your
          logo.
        </p>
      </div>

      <div className="relative z-10 -mx-4 mt-16 grid grid-cols-1 border border-neutral-200 bg-neutral-50/10 sm:-mx-6 md:grid-cols-3 dark:border-neutral-800 dark:bg-neutral-900/5">
        {/* Corner Anchors Overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-20 select-none"
          aria-hidden="true"
        >
          <div className="absolute -top-[7px] -left-[7px] h-3.5 w-3.5 rounded-[3px] border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-[#0a0a0a]" />
          <div className="absolute -top-[7px] left-1/3 hidden h-3.5 w-3.5 -translate-x-1/2 rounded-[3px] border border-neutral-200 bg-white md:block dark:border-neutral-800 dark:bg-[#0a0a0a]" />
          <div className="absolute -top-[7px] left-2/3 hidden h-3.5 w-3.5 -translate-x-1/2 rounded-[3px] border border-neutral-200 bg-white md:block dark:border-neutral-800 dark:bg-[#0a0a0a]" />
          <div className="absolute -top-[7px] -right-[7px] h-3.5 w-3.5 rounded-[3px] border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-[#0a0a0a]" />
          <div className="absolute -bottom-[7px] -left-[7px] h-3.5 w-3.5 rounded-[3px] border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-[#0a0a0a]" />
          <div className="absolute -bottom-[7px] left-1/3 hidden h-3.5 w-3.5 -translate-x-1/2 rounded-[3px] border border-neutral-200 bg-white md:block dark:border-neutral-800 dark:bg-[#0a0a0a]" />
          <div className="absolute -bottom-[7px] left-2/3 hidden h-3.5 w-3.5 -translate-x-1/2 rounded-[3px] border border-neutral-200 bg-white md:block dark:border-neutral-800 dark:bg-[#0a0a0a]" />
          <div className="absolute -right-[7px] -bottom-[7px] h-3.5 w-3.5 rounded-[3px] border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-[#0a0a0a]" />
        </div>

        {/* Sponsor Link 1 */}
        <a
          href="https://github.com/sponsors/Saurabh-2607"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex cursor-pointer flex-col items-center justify-center gap-2 bg-transparent p-12 text-center no-underline transition-colors duration-400 ease-out hover:bg-neutral-100/50 dark:hover:bg-[#141414]/60"
        >
          <span className="text-neutral-450 text-3xl font-light transition-colors duration-300 group-hover:text-[#f6821f] dark:text-neutral-500">
            +
          </span>
          <span className="text-sm font-semibold tracking-wide text-neutral-600 transition-colors duration-300 group-hover:text-[#f6821f] dark:text-neutral-400">
            Place your logo here
          </span>
        </a>

        {/* Sponsor Link 2 */}
        <a
          href="https://github.com/sponsors/Saurabh-2607"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex cursor-pointer flex-col items-center justify-center gap-2 border-t border-neutral-200 bg-transparent p-12 text-center no-underline transition-colors duration-400 ease-out hover:bg-neutral-100/50 md:border-t-0 md:border-l dark:border-neutral-800 dark:hover:bg-[#141414]/60"
        >
          <span className="text-neutral-450 text-3xl font-light transition-colors duration-300 group-hover:text-[#f6821f] dark:text-neutral-500">
            +
          </span>
          <span className="text-sm font-semibold tracking-wide text-neutral-600 transition-colors duration-300 group-hover:text-[#f6821f] dark:text-neutral-400">
            Place your logo here
          </span>
        </a>

        {/* Sponsor Link 3 */}
        <a
          href="https://github.com/sponsors/Saurabh-2607"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex cursor-pointer flex-col items-center justify-center gap-2 border-t border-neutral-200 bg-transparent p-12 text-center no-underline transition-colors duration-400 ease-out hover:bg-neutral-100/50 md:border-t-0 md:border-l dark:border-neutral-800 dark:hover:bg-[#141414]/60"
        >
          <span className="text-neutral-450 text-3xl font-light transition-colors duration-300 group-hover:text-[#f6821f] dark:text-neutral-500">
            +
          </span>
          <span className="text-sm font-semibold tracking-wide text-neutral-600 transition-colors duration-300 group-hover:text-[#f6821f] dark:text-neutral-400">
            Place your logo here
          </span>
        </a>
      </div>
    </Container>
  );
}

export default Sponsors;
