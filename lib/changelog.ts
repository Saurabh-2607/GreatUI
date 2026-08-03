export type ChangelogItem = {
  date: string;
  description: string;
  features: string[];
};

export const changelogData: ChangelogItem[] = [
  {
    date: "August 4, 2026",
    description:
      "Added the premium Card and scroll-driven Text Reveal components.",
    features: [
      "Added [Card](/components/card) component with a minimal hover effect",
      "Added [Text Reveal](/components/text-reveal) component featuring scroll-driven letter-by-letter reveal.",
    ],
  },
  {
    date: "August 1, 2026",
    description:
      "Added highly requested premium visual components and interactive layouts.",
    features: [
      "Added [Frosted Glass Reveal](/components/frosted-glass-reveal) component with dynamic cursor tracking and SVG displacement.",
      "Added [Floating Menu](/components/floating-menu) component with staggering spring animations.",
      "Added [Accordion](/components/accordion) component with seamless height morphing.",
    ],
  },
  {
    date: "July 29, 2026",
    description:
      "Major documentation overhaul adding shadcn-like registry commands and CLI tooling.",
    features: [
      "Added a floating installation command generator with package manager selection.",
      "Added component registry API routes to power dynamic documentation.",
      "Implemented a site-wide search command palette with cmdk integration.",
    ],
  },
  {
    date: "July 25, 2026",
    description:
      "The foundational release featuring the initial batch of 15+ UI building blocks.",
    features: [
      "Released [Revision Timeline](/components/revision-timeline) component with interactive revision logging.",
      "Added [Diagonal Marquee Carousel](/components/diagonal-marquee-carousel) for infinite angled scrolling.",
      "Added [Avatar Stack](/components/avatar-stack) component with interactive spring-driven hover variants.",
      "Added [Minimal Buttons](/components/minimal-buttons) collection showcasing elegant tactile states.",
      "Added [Aceternity Button](/components/aceternity-button) integration for glowing gradient borders.",
    ],
  },
];
