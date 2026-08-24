export type ChangelogItem = {
  date: string;
  features: string[];
};

export const changelogData: ChangelogItem[] = [
  {
    date: "August 25, 2026",
    features: [
      "Added [Venetian Blinds Page Transition](/components/venetian-blinds-page-transition) component featuring staggered horizontal or vertical slats scaling open and shut with customizable staggers and pivot origins.",
      "Added [Cascade Page Transition](/components/cascade-page-transition) component featuring a V-shaped symmetrical stepped cascade delay slide animation of solid colored stripes across the screen.",
      "Added [Sine Wave Page Transition](/components/sine-wave-page-transition) component featuring staggered columns or rows forming a smooth ripple wave sweep across the screen in normalized sine-wave offset delays.",
      "Added [Pixel Page Transition](/components/pixel-page-transition) component featuring a full-screen block pixel dissolve page transition with customizable pixel size, fade durations, and stagger delays.",
      "Added [Sweep Page Transition](/components/sweep-page-transition) component featuring overlapping sliding sheets of color entering from 4 configurable directions with reversed stagger exit patterns.",
      "Added [Interlocking Page Transition](/components/interlocking-page-transition) component featuring staggered interlocking columns or rows entering from opposite directions and sliding offscreen with customizable opposite exit paths.",
      "Added [Curtain Page Transition](/components/curtain-page-transition) component featuring a premium split-half horizontal or vertical curtain screen transition.",
    ],
  },
  {
    date: "August 20, 2026",
    features: [
      "Added [Swipe Theme Provider](/components/swipe-theme-change) component featuring 8-directional swipe/wipe transitions (linear and corner sweeps) with customizable slant angles.",
      "Added [Circular Theme Provider](/components/circular-theme-provider) component featuring outward circular wipe transitions from cursor click positions.",
      "Added [Split Theme Provider](/components/split-theme-provider) component featuring horizontal and vertical split transitions with configurable in-to-out and out-to-in modes.",
    ],
  },
  {
    date: "August 18, 2026",
    features: [
      "Added [Word Focus Scroll](/components/word-focus-scroll) component featuring scroll-driven active word scaling, unblurring, and fade-in focus.",
      "Added [Blur Scroll Reveal](/components/blur-scroll-reveal) component featuring a scroll-driven text reveal with smooth CSS blur-to-sharp transitions.",
      "Added [Split Line Fly In](/components/split-line-fly-in) component featuring scroll-driven lines flying in from opposite sides of the viewport and settling at the center.",
    ],
  },
  {
    date: "August 16, 2026",
    features: [
      "Added [Color Wipe Page Transition](/components/color-wipe-page-transition) component featuring staggered horizontal bands with vibrant doodle accents.",
      "Added [Staggered Page Transition](/components/staggered-page-transition) component featuring a smooth staggered wipe effect for route transitions.",
    ],
  },
  {
    date: "August 15, 2026",
    features: [
      "Added [Pixel To Ascii Image](/components/pixel-to-ascii-image) component that pixelates and turns into ASCII art on hover.",
    ],
  },
  {
    date: "August 14, 2026",
    features: [
      "Added [Multilingual Quote](/components/multilingual-quote) component featuring animated quotes, language toggles, and fully customizable props.",
    ],
  },
  {
    date: "August 13, 2026",
    features: [
      "Added [Text On Path Scroll](/components/text-on-path-scroll) component featuring scroll-driven animations along an SVG path.",
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
