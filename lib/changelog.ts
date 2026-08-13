export type ChangelogItem = {
  date: string;
  features: string[];
};

export const changelogData: ChangelogItem[] = [
  {
    date: "August 14, 2026",
    features: [
      "Added [Multilingual Quote](/components/multilingual-quote) component featuring animated quotes, language toggles, and fully customizable props.",
    ],
  },
  {
    date: "August 13, 2026",
    features: [
      "Added [Text on Path Scroll](/components/text-on-path-scroll) component featuring scroll-driven animations along an SVG path.",
      "Added [Scrambled Install Command](/components/scrambled-install-command) component featuring an animated scramble text effect.",
    ],
  },
  {
    date: "August 12, 2026",
    features: [
      "Overhaul of the styling and overall aesthetics of great-ui.com",
    ],
  },
  {
    date: "August 9, 2026",
    features: [
      "Added [Team Section](/components/team-section) component featuring layout reveals, grayscale-to-color hovers, and a floating preview layout.",
      "Added [Github Card](/components/github-card) component featuring 3D hover tilt, live contributions calendar fetching, and interactive tooltips.",
    ],
  },
  {
    date: "August 4, 2026",
    features: [
      "Added [Card](/components/card) component with a minimal hover effect",
      "Added [Text Reveal](/components/text-reveal) component featuring scroll-driven letter-by-letter reveal.",
    ],
  },
  {
    date: "August 1, 2026",
    features: [
      "Added [Frosted Glass Reveal](/components/frosted-glass-reveal) component with dynamic cursor tracking and SVG displacement.",
      "Added [Floating Menu](/components/floating-menu) component with staggering spring animations.",
      "Added [Accordion](/components/accordion) component with seamless height morphing.",
    ],
  },
  {
    date: "July 29, 2026",
    features: [
      "Added a floating installation command generator with package manager selection.",
      "Added component registry API routes to power dynamic documentation.",
      "Implemented a site-wide search command palette with cmdk integration.",
    ],
  },
  {
    date: "July 25, 2026",
    features: [
      "Released [Revision Timeline](/components/revision-timeline) component with interactive revision logging.",
      "Added [Diagonal Marquee Carousel](/components/diagonal-marquee-carousel) for infinite angled scrolling.",
      "Added [Avatar Stack](/components/avatar-stack) component with interactive spring-driven hover variants.",
      "Added [Minimal Buttons](/components/minimal-buttons) collection showcasing elegant tactile states.",
      "Added [Aceternity Button](/components/aceternity-button) integration for glowing gradient borders.",
    ],
  },
];
