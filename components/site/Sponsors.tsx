import Container from "./Container";

export function Sponsors() {
  return (
    <div className="relative w-full">
      <div
        className="pointer-events-none absolute top-0 right-0 left-0 z-20 h-px select-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-border-100) 50%, transparent 50%)",
          backgroundSize: "32px 1px",
          backgroundRepeat: "repeat-x",
        }}
      />

      <Container>
        <div className="grid w-full grid-cols-1 sm:grid-cols-3">
          <a
            href="https://github.com/sponsors/Saurabh-2607"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-full cursor-pointer flex-col items-center justify-center gap-2 border-x-[1.5px] border-b border-neutral-200 py-8 transition-all hover:bg-[#f6821f]/[0.02] sm:border-y-0 dark:border-neutral-800"
          >
            +
            <span className="text-sm font-semibold tracking-wide text-neutral-600 transition-colors group-hover:text-[#f6821f] dark:text-neutral-400">
              Place your logo here
            </span>
          </a>
          <a
            href="https://github.com/sponsors/Saurabh-2607"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-full cursor-pointer flex-col items-center justify-center gap-2 border-x-[1.5px] border-b border-neutral-200 py-8 transition-all hover:bg-[#f6821f]/[0.02] sm:border-y-0 dark:border-neutral-800"
          >
            +
            <span className="text-sm font-semibold tracking-wide text-neutral-600 transition-colors group-hover:text-[#f6821f] dark:text-neutral-400">
              Place your logo here
            </span>
          </a>
          <a
            href="https://github.com/sponsors/Saurabh-2607"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-full cursor-pointer flex-col items-center justify-center gap-2 border-x-[1.5px] border-b border-neutral-200 py-8 transition-all last:border-b-0 hover:bg-[#f6821f]/[0.02] sm:border-y-0 dark:border-neutral-800"
          >
            +
            <span className="text-sm font-semibold tracking-wide text-neutral-600 transition-colors group-hover:text-[#f6821f] dark:text-neutral-400">
              Place your logo here
            </span>
          </a>
        </div>
      </Container>
    </div>
  );
}

export default Sponsors;
