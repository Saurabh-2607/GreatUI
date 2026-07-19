import Link from "next/link";
import Container from "./Container";
import Button from "./Button";

export function Hero() {

  return (
    <Container className="py-12">
      <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
        {/* Hero Title */}
        <h1 className="max-w-4xl text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-neutral-950 dark:text-white leading-[1.1] text-balance animate-fade-in">
          Craft Premium React Interfaces with Absolute Speed
        </h1>

        {/* Hero Subtitle */}
        <p className="mt-6 max-w-4xl text-base sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-400 leading-snug text-balance">
          Beautiful, accessible, and high-performance React components built with Tailwind CSS.
          Copy, paste, and build premium interfaces instantly.
        </p>

        {/* Action Row */}
        {/* <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <Link href="/components/button">
            <Button variant="primary" size="md">
              Explore Components
            </Button>
          </Link>
        </div> */}
      </div>
    </Container>
  );
}

export default Hero;
