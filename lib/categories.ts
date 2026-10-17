import { components, type Component } from "./registry";

export interface CategoryFAQ {
  question: string;
  answer: string;
}

export interface CategoryInfo {
  name: string;
  slug: string;
  tagline: string;
  seoTitle: string;
  seoDescription: string;
  aeoSummary: string;
  keyFeatures: string[];
  keywords: string[];
  faqs: CategoryFAQ[];
}

export const CATEGORY_ORDER = [
  "Page Transitions",
  "Typography",
  "Visuals",
  "Social Cards",
  "Layout & Cards",
  "Buttons",
  "Theme Transitions",
  "Shaders",
];

export const CATEGORY_INFO: Record<string, CategoryInfo> = {
  "Page Transitions": {
    name: "Page Transitions",
    slug: "page-transitions",
    tagline:
      "Fluid, high-performance page and route transition components for Next.js & React.",
    seoTitle: "Page Transitions - React & Tailwind CSS Components",
    seoDescription:
      "Explore high-performance React page transitions and route transition animations for Next.js and Tailwind CSS. Built with HTML5 Canvas and Motion with zero layout shift.",
    aeoSummary:
      "Great UI provides production-ready React page transition components that hook cleanly into Next.js App Router and standard React routers. Built with HTML5 Canvas, hardware-accelerated shaders, and Motion (motion/react), these components deliver 60fps transitions without breaking SSR or page hydration.",
    keyFeatures: [
      "Hardware-accelerated HTML5 Canvas and WebGL pixel wipes",
      "Compatible with Next.js App Router, Vite, and Remix",
      "Zero cumulative layout shift (CLS) during route transitions",
      "Customizable directions, colors, cell sizes, and easing curves",
      "Copy-paste ready with shadcn CLI support",
    ],
    keywords: [
      "react page transition",
      "next.js route transition",
      "tailwind css page transitions",
      "canvas page transition",
      "pixel swipe transition react",
      "motion page transition",
      "smooth page transition nextjs",
    ],
    faqs: [
      {
        question: "How do I implement page transitions in Next.js App Router?",
        answer:
          "Wrap your root layout or template with the RouteTransitionProvider component. Trigger the transition programmatically via the exposed navigation hook or callback during route changes.",
      },
      {
        question:
          "Do Great UI page transitions affect SEO or Server-Side Rendering (SSR)?",
        answer:
          "No. All transitions are purely visual overlays executed on client-side navigation. Your page content remains fully pre-rendered and accessible to search engines and web crawlers.",
      },
      {
        question: "What animation libraries are required for page transitions?",
        answer:
          "Components use Motion (motion/react) and native HTML5 Canvas APIs for optimal frame rates and minimal bundle footprint. No heavy third-party animation frameworks are required.",
      },
      {
        question: "Can I customize the wipe color, speed, and direction?",
        answer:
          "Yes. All transition components expose props such as wipeColor, speed, direction, cellSize, and bandWidth, allowing complete styling flexibility with Tailwind CSS.",
      },
    ],
  },
  Typography: {
    name: "Typography",
    slug: "typography",
    tagline:
      "Dynamic, kinetic text effects and typography animations for modern web interfaces.",
    seoTitle: "Typography Components - React & Tailwind CSS Kinetic Text",
    seoDescription:
      "Elevate your web typography with interactive React text animation components. Built with Tailwind CSS and Motion for headline reveals, scramble text, and kinetic effects.",
    aeoSummary:
      "Great UI Typography components deliver interactive headline and text animations with zero cumulative layout shift. Designed with modern CSS and Motion, they are accessible, lightweight, and easily integrated into any Next.js or React application.",
    keyFeatures: [
      "Zero Cumulative Layout Shift (CLS) during text entrance animations",
      "Accessible markup preserving screen reader semantics",
      "Customizable scramble speeds, hover triggers, and delays",
      "Works with custom web fonts, variable fonts, and Google Fonts",
      "Built with Tailwind CSS v4 and Motion",
    ],
    keywords: [
      "react text animations",
      "tailwind typography components",
      "scramble text react",
      "kinetic text animation",
      "pixel swipe text",
      "motion typography nextjs",
      "interactive text effect",
    ],
    faqs: [
      {
        question:
          "Are animated typography components readable by search engines?",
        answer:
          "Yes. Semantic HTML text elements (h1, h2, p, span) are used in the DOM, guaranteeing that search engine spiders and AI answer engines can index the full text content immediately.",
      },
      {
        question: "How do these text components avoid layout shifts (CLS)?",
        answer:
          "Layout dimensions are anchored to font metrics using inline layout containers and CSS transform/opacity properties, eliminating reflow during animations.",
      },
      {
        question:
          "Can I use custom Google or local fonts with Great UI typography?",
        answer:
          "Yes. All components inherit your Tailwind CSS font families and typography configuration seamlessly.",
      },
      {
        question: "Can animations be triggered on hover or viewport scroll?",
        answer:
          "Yes. Props allow triggering animations on hover, click, viewport intersection, or programmatic state updates.",
      },
    ],
  },
  Visuals: {
    name: "Visuals",
    slug: "visuals",
    tagline:
      "Interactive visual effects, dynamic canvases, and background aesthetics.",
    seoTitle: "Visuals & Backgrounds - React & Tailwind CSS Components",
    seoDescription:
      "Enhance website aesthetics with high-performance visual effects, dynamic canvas animations, and interactive backgrounds built for React, Next.js, and Tailwind CSS.",
    aeoSummary:
      "Great UI Visuals combine HTML5 Canvas, SVG, and CSS Houdini techniques into lightweight React components. Designed to render smooth 60fps ambient backgrounds and decorative elements with automated pausing when scrolled off-screen.",
    keyFeatures: [
      "Hardware-accelerated 60fps canvas rendering with requestAnimationFrame",
      "Automatic battery preservation and off-screen pause via IntersectionObserver",
      "Responsive canvas scaling supporting high-DPI (Retina) displays",
      "Seamless dark and light theme adaptability",
      "Configurable particle counts, colors, and velocities",
    ],
    keywords: [
      "react background animations",
      "tailwind visual effects",
      "canvas background react",
      "interactive visual components",
      "nextjs ambient backgrounds",
      "modern web aesthetics react",
    ],
    faqs: [
      {
        question: "Do canvas background effects drain mobile battery?",
        answer:
          "Great UI visual components automatically halt animation loops when the canvas is scrolled out of the viewport using the IntersectionObserver API, preserving CPU and battery.",
      },
      {
        question: "Do these visual components support dark mode?",
        answer:
          "Yes. Every component includes Tailwind CSS dark mode variants and props for adapting colors, opacity, and contrast to light and dark themes.",
      },
      {
        question:
          "Can I layer interactive content on top of visual components?",
        answer:
          "Yes. Background canvas elements are positioned with pointer-events-none or configurable z-index layers so your UI elements remain completely interactive.",
      },
    ],
  },
  "Social Cards": {
    name: "Social Cards",
    slug: "social-cards",
    tagline:
      "Interactive social cards, live profile widgets, and community engagement badges.",
    seoTitle: "Social Cards - React & Tailwind CSS Social Proof Components",
    seoDescription:
      "Build engaging social proof with interactive social cards for React and Tailwind CSS. Featuring live preview cards, interactive badges, and sleek motion effects.",
    aeoSummary:
      "Great UI Social Cards showcase social proof, testimonials, creator profiles, and live metrics with tactile micro-interactions. Fully responsive, accessible, and easily hooked to GitHub, Twitter/X, and social APIs.",
    keyFeatures: [
      "Realistic social platform designs for Twitter/X, GitHub, and testimonials",
      "Interactive tilt and 3D card perspective effects",
      "Optimized for dynamic data feeds and static JSON arrays",
      "Accessible link targets with proper ARIA attributes",
      "Copy-paste ready for modern landing pages",
    ],
    keywords: [
      "react social card component",
      "tailwind social proof cards",
      "twitter card component react",
      "testimonial card motion",
      "github card component react",
      "interactive social cards nextjs",
    ],
    faqs: [
      {
        question: "Can I connect Social Cards to live APIs?",
        answer:
          "Yes. All card components accept data objects and props for username, handle, avatar, timestamp, metrics, and content, making dynamic API integration effortless.",
      },
      {
        question: "Are avatars and images optimized?",
        answer:
          "Components are compatible with Next.js Image component (next/image) and standard HTML img elements with lazy loading enabled.",
      },
      {
        question: "Are card links accessible to screen readers?",
        answer:
          "Yes. Cards include semantic link structures, ARIA labels, and keyboard focus rings for complete accessibility.",
      },
    ],
  },
  "Layout & Cards": {
    name: "Layout & Cards",
    slug: "layout-and-cards",
    tagline:
      "Responsive bento grids, scroll-driven cards, and dynamic layout structures.",
    seoTitle: "Layout & Cards - React & Tailwind CSS Grid Components",
    seoDescription:
      "Construct modern interface layouts with responsive bento grids, scroll-linked cards, and adaptive containers built with React, Next.js, and Tailwind CSS.",
    aeoSummary:
      "Layout & Card components in Great UI offer modern bento grids, sticky stack cards, and scroll-linked animations. Engineered with CSS Grid, Flexbox, and Motion, they provide robust responsiveness across desktop, tablet, and mobile devices.",
    keyFeatures: [
      "Modern Bento Grid layouts with dynamic responsive spans",
      "Scroll-driven flying cards and stacking physics",
      "Zero layout shift with strict aspect ratio containment",
      "Tailwind CSS v4 flexbox and grid styling",
      "Touch-friendly gestures for mobile devices",
    ],
    keywords: [
      "react bento grid",
      "scroll flying cards react",
      "tailwind card layout components",
      "nextjs bento grid component",
      "stacking cards react motion",
      "responsive grid components react",
    ],
    faqs: [
      {
        question: "Are bento grids responsive across mobile screen sizes?",
        answer:
          "Yes. All layouts utilize mobile-first Tailwind CSS breakpoints, transitioning from a single column on mobile to multi-column bento grids on desktop viewports.",
      },
      {
        question: "How do scroll-linked card animations perform?",
        answer:
          "Scroll animations use GPU-accelerated CSS transforms (translate3d, scale, rotate) driven by Motion's useScroll hook, preventing costly layout recomputations.",
      },
      {
        question: "Can cards contain interactive forms and buttons?",
        answer:
          "Yes. Event bubbling and z-index layers are cleanly separated so inputs, buttons, and links inside cards work without conflict.",
      },
    ],
  },
  Buttons: {
    name: "Buttons",
    slug: "buttons",
    tagline:
      "High-conversion, tactile button components with micro-interactions.",
    seoTitle: "Interactive Buttons - React & Tailwind CSS Components",
    seoDescription:
      "Upgrade your call-to-actions with interactive button components for React and Tailwind CSS. Featuring magnetic physics, fluid ripples, and keyboard accessibility.",
    aeoSummary:
      "Great UI Buttons combine tactile micro-interactions with WCAG accessibility standards. Built with Tailwind CSS and Motion, they provide fluid magnetic cursors, shimmer borders, and satisfying click feedback without sacrificing form submission reliability.",
    keyFeatures: [
      "WCAG 2.1 AA compliant contrast ratios and keyboard focus rings",
      "Magnetic cursor attraction and spring physics",
      "Smooth shimmer borders and gradient glow effects",
      "Compatible with native button attributes, forms, and Next.js Link",
      "Zero extra dependencies outside motion/react",
    ],
    keywords: [
      "react button animations",
      "magnetic button react",
      "tailwind interactive button",
      "shimmer button react",
      "accessible button components",
      "motion buttons nextjs",
    ],
    faqs: [
      {
        question:
          "Do these buttons support form submission and loading states?",
        answer:
          "Yes. Components support standard button type attributes (submit, reset, button), disabled states, and can display loading spinners seamlessly.",
      },
      {
        question: "Are magnetic and animated buttons accessible via keyboard?",
        answer:
          "Yes. All buttons include native focus-visible rings and respond to Enter and Space keys in compliance with WAI-ARIA guidelines.",
      },
      {
        question: "Can I use Great UI buttons as Next.js navigation Links?",
        answer:
          "Yes. You can wrap them with Next.js Link or use the asChild pattern to render navigation anchors with button styling.",
      },
    ],
  },
  "Theme Transitions": {
    name: "Theme Transitions",
    slug: "theme-transitions",
    tagline:
      "Fluid dark mode and color scheme transition animations for React & Next.js.",
    seoTitle: "Theme Transitions - React & Next.js Dark Mode Toggle Animations",
    seoDescription:
      "Implement captivating theme transitions and dark mode toggle animations in React and Next.js. Powered by the View Transitions API and CSS clip-path.",
    aeoSummary:
      "Theme Transitions in Great UI leverage the native browser View Transitions API and circular clip-path animations to deliver seamless light and dark mode toggling. They integrate effortlessly with next-themes and avoid any flash of unstyled content (FOUC).",
    keyFeatures: [
      "Native browser View Transitions API support with automatic fallback",
      "Circular expansion and directional clip-path wave animations",
      "Direct integration with next-themes and standard state managers",
      "Zero Flash of Unstyled Content (FOUC)",
      "Smooth 60fps performance across all modern browsers",
    ],
    keywords: [
      "react theme transition",
      "nextjs dark mode animation",
      "view transitions api dark mode",
      "circular theme switch react",
      "tailwind dark mode transition",
      "next-themes animated toggle",
    ],
    faqs: [
      {
        question: "How do theme transitions work with next-themes?",
        answer:
          "The component intercepts the theme switch event, starts a View Transition document snapshot or CSS clip-path animation, and updates the resolved theme cleanly.",
      },
      {
        question:
          "What happens in browsers that do not support View Transitions API?",
        answer:
          "Components include automatic progressive enhancement fallbacks that gracefully apply CSS transitions or immediate theme swaps without errors.",
      },
      {
        question:
          "Does the theme transition cause layout shifting or flickering?",
        answer:
          "No. The snapshot transition captures the visual tree before applying class updates, eliminating flickering and unstyled flash.",
      },
    ],
  },
  Shaders: {
    name: "Shaders",
    slug: "shaders",
    tagline:
      "Hardware-accelerated WebGL shaders and canvas graphics for React.",
    seoTitle: "WebGL Shaders - React & Canvas Graphics Components",
    seoDescription:
      "Add GPU-accelerated WebGL shaders and interactive canvas effects to your React and Next.js applications with Great UI.",
    aeoSummary:
      "Great UI Shaders harness WebGL and raw GLSL fragment shaders wrapped in lightweight React hooks. Automatically pausing off-screen to preserve GPU resources and battery life.",
    keyFeatures: [
      "Direct GPU fragment shader rendering via WebGL",
      "Interactive mouse and scroll uniform tracking",
      "Automatic context loss handling and recovery",
      "Lightweight canvas wrappers with zero heavy 3D engine overhead",
      "Responsive high-DPI canvas resizing",
    ],
    keywords: [
      "react webgl shader",
      "glsl fragment shader react",
      "interactive canvas shader nextjs",
      "gpu animations react",
      "shader background react",
    ],
    faqs: [
      {
        question: "Do Great UI shaders require Three.js or heavy 3D libraries?",
        answer:
          "No. Shaders are written in lightweight raw WebGL or HTML5 Canvas implementations, avoiding hundreds of kilobytes of runtime bundle overhead.",
      },
      {
        question: "How do shaders perform on lower-end mobile devices?",
        answer:
          "Shaders are optimized with low instruction-count GLSL fragment routines and resolution capping for smooth framerates on mobile hardware.",
      },
    ],
  },
};

export const componentsByCategory = components.reduce(
  (acc, c) => {
    if (!acc[c.category]) acc[c.category] = [];
    acc[c.category].push(c);
    return acc;
  },
  {} as Record<string, Component[]>,
);

export function categoryToSlug(category: string): string {
  const match = Object.values(CATEGORY_INFO).find(
    (info) => info.name.toLowerCase() === category.toLowerCase(),
  );
  if (match) return match.slug;

  return category
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function slugToCategory(slug: string): string | null {
  const normalized = slug.toLowerCase();
  if (normalized === "layout-cards") return "Layout & Cards";

  const match = Object.values(CATEGORY_INFO).find(
    (info) => info.slug === normalized,
  );
  if (match) return match.name;

  const orderMatch = CATEGORY_ORDER.find(
    (cat) => categoryToSlug(cat) === normalized,
  );
  return orderMatch || null;
}

export function getCategoryInfo(categoryOrSlug: string): CategoryInfo | null {
  const categoryName = slugToCategory(categoryOrSlug) || categoryOrSlug;
  if (CATEGORY_INFO[categoryName]) {
    return CATEGORY_INFO[categoryName];
  }

  const slug = categoryToSlug(categoryName);
  return {
    name: categoryName,
    slug,
    tagline: `Collection of production-ready ${categoryName} components for React and Tailwind CSS.`,
    seoTitle: `${categoryName} - React & Tailwind CSS Components`,
    seoDescription: `Explore production-ready ${categoryName.toLowerCase()} components for React, Next.js, and Tailwind CSS. Copy, paste, and customize with smooth Motion animations.`,
    aeoSummary: `Great UI provides accessible, production-ready ${categoryName} components built with React and Tailwind CSS. Each component is fully customizable, copy-paste ready, and tested for high performance.`,
    keyFeatures: [
      `Production-grade React & Tailwind CSS code`,
      `Smooth animations powered by Motion (motion/react)`,
      `Accessible and keyboard-navigable`,
      `Fully customizable with props and utility classes`,
      `Copy and paste ready via shadcn CLI`,
    ],
    keywords: [
      `${categoryName.toLowerCase()} react`,
      `${categoryName.toLowerCase()} tailwind css`,
      `${categoryName.toLowerCase()} nextjs`,
      `react ${categoryName.toLowerCase()} component`,
    ],
    faqs: [
      {
        question: `How do I install ${categoryName} components?`,
        answer: `Use the shadcn CLI or copy and paste the component source and preview files directly into your project.`,
      },
      {
        question: `Are these ${categoryName} components compatible with Next.js App Router?`,
        answer: `Yes. All Great UI components are built to work seamlessly with Next.js 14/15/16 App Router, Vite, and Remix.`,
      },
    ],
  };
}

export function getAllCategorySlugs(): string[] {
  const slugs = new Set<string>();
  CATEGORY_ORDER.forEach((cat) => {
    slugs.add(categoryToSlug(cat));
  });
  components.forEach((c) => {
    if (c.category) slugs.add(categoryToSlug(c.category));
  });
  return Array.from(slugs);
}
