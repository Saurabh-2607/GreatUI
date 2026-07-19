import Link from "next/link";
import Container from "./Container";
import Button from "./Button";

export function Hero() {

  return (
    <Container className="py-12">
      <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
        {/* Hero Title */}
        <h1 className="max-w-[65%] text-5xl font-semibold tracking-tight text-neutral-950 dark:text-white leading-[1.1] text-balance animate-fade-in">
          Not Just Another UI Component Library
        </h1>

        {/* Hero Subtitle */}
        <p className="mt-4 max-w-3xl text-lg md:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed text-balance">
          Clean, accessible, and composable React components built with Tailwind CSS v4.
          Copy, paste, and ship without npm bloat.
        </p>

        {/* Action Row */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <Link href="/components/button">
            <Button variant="primary" size="md">
              Explore Components
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
}

export default Hero;
