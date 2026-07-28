import Container from "./Container";
import TerminalLoader from "@/components/ui/TerminalLoader";
import AvatarStack from "@/components/ui/AvatarStack";
import AnimatedSelect from "@/components/ui/AnimatedSelect";
import AceternityButton from "@/components/ui/AceternityButton";
import MinimalButtons from "@/components/ui/MinimalButtons";
import ImageHoverReveal from "@/components/ui/ImageHoverReveal";
import AnimatedLink from "@/components/ui/AnimatedLink";
import MobileMockup from "@/components/ui/MobileMockup";
import VinylAlbumCard from "@/components/ui/VinylAlbumCard";

export function BentoGrid() {
  return (
    <Container className="py-12 md:py-16">
      <div className="relative z-10 -mx-4 border border-neutral-200 bg-neutral-50/10 sm:-mx-6 dark:border-neutral-800 dark:bg-neutral-900/5">
        <div
          className="pointer-events-none absolute inset-0 z-20 select-none"
          aria-hidden="true"
        >
          <div className="absolute -top-[7px] -left-[7px] h-3.5 w-3.5 rounded-[3px] border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-[#0a0a0a]" />
          <div className="absolute -top-[7px] -right-[7px] h-3.5 w-3.5 rounded-[3px] border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-[#0a0a0a]" />
          <div className="absolute -bottom-[7px] -left-[7px] h-3.5 w-3.5 rounded-[3px] border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-[#0a0a0a]" />
          <div className="absolute -right-[7px] -bottom-[7px] h-3.5 w-3.5 rounded-[3px] border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-[#0a0a0a]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="flex items-center justify-center border-b border-neutral-200 p-8 md:row-span-3 md:border-r md:border-b-0 dark:border-neutral-800">
            <MobileMockup autoPlay={true} />
          </div>

          <div className="flex min-h-[190px] items-center justify-center border-b border-neutral-200 p-6 md:col-span-2 dark:border-neutral-800">
            <TerminalLoader
              rows={5}
              cols={35}
              speed={60}
              color="text-amber-500"
              bgColor="bg-amber-500"
            />
          </div>

          <div className="relative z-30 flex min-h-[190px] items-center justify-center border-b border-neutral-200 p-6 md:border-r dark:border-neutral-800">
            <AnimatedSelect placeholder="Choose Option" width={180} />
          </div>

          <div className="flex min-h-[190px] items-center justify-center border-b border-neutral-200 p-6 dark:border-neutral-800">
            <AvatarStack size="lg" variant="spring-tilt" />
          </div>

          <div className="flex min-h-[190px] items-center justify-center p-6 md:col-span-2 dark:border-neutral-800">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <AceternityButton variant="primary" size="md">
                Aceternity Gradient
              </AceternityButton>
              <MinimalButtons variant="secondary" size="default">
                Minimal Button
              </MinimalButtons>
              <MinimalButtons variant="destructive" size="default">
                Destructive
              </MinimalButtons>
              <MinimalButtons variant="outline" size="default" isLoading={true}>
                Loading state
              </MinimalButtons>
            </div>
          </div>

          <div className="flex h-[220px] items-center justify-center border-t border-r border-neutral-200 p-6 dark:border-neutral-800">
            <ImageHoverReveal
              variant="directional"
              className="h-28 w-28 rounded-2xl"
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80"
            />
          </div>

          <div className="relative h-[220px] overflow-hidden border-t border-r border-neutral-200 dark:border-neutral-800">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="origin-center scale-[0.44]">
                <VinylAlbumCard />
              </div>
            </div>
          </div>

          <div className="flex h-[220px] items-center justify-center border-t border-neutral-200 p-6 dark:border-neutral-800">
            <div className="flex flex-col items-center justify-center gap-4">
              <AnimatedLink href="#" variant="underline">
                Underline
              </AnimatedLink>
              <AnimatedLink href="#" variant="clipDoodle">
                Doodle
              </AnimatedLink>
              <AnimatedLink href="#" variant="wavy">
                Wavy Link
              </AnimatedLink>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default BentoGrid;
