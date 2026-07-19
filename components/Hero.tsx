import Container from "./Container";

export function Hero() {
  return (
    <Container className="py-12">
      <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
        {/* Hero Title */}
        <h1 className="animate-fade-in max-w-4xl text-4xl leading-[1.1] font-semibold tracking-tight text-balance text-neutral-950 sm:text-5xl md:text-6xl dark:text-white">
          Craft Premium React Interfaces with Absolute Speed
        </h1>

        {/* Hero Subtitle */}
        <p className="mt-6 max-w-4xl text-base leading-snug text-balance text-neutral-600 sm:text-lg md:text-xl dark:text-neutral-400">
          Beautiful, accessible, and high-performance React components built
          with Tailwind CSS. Copy, paste, and build premium interfaces
          instantly.
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
