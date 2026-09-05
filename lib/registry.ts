export type Prop = {
  name: string;
  type: string[];
  description: string;
  default?: string;
};

export type Component = {
  slug: string;
  name: string;
  category: string;
  description: string;
  interactionType: string;
  dependencies: string[];
  dependencyNotes?: string;
  props: Prop[];
  previewFile?: string;
  preview?: string;
  code?: string;
  usageCode?: string;
  inspiration?: string;
};

export const components: Component[] = [
  {
    slug: "linkedin-card",
    category: "Social Cards",
    inspiration: "",
    preview: "https://ik.imagekit.io/niqgaoeg3/GUI-linkedin-Card.mp4",
    name: "LinkedIn Card",
    description:
      "An interactive LinkedIn profile card component that supports both static and animated 3D tilt effects.",
    interactionType:
      "Hover triggers a magnetic 3D tilt effect on the card and the link with spring physics.",
    dependencies: ["motion"],
    previewFile: "LinkedinCardPreview",
    props: [
      {
        name: "username",
        type: ["string"],
        description: "The LinkedIn username (handle) of the profile.",
      },
      {
        name: "name",
        type: ["string"],
        description: "The display name of the profile.",
        default: "'LinkedIn User'",
      },
      {
        name: "avatarUrl",
        type: ["string"],
        description: "Optional custom URL for the avatar image.",
      },
      {
        name: "bannerUrl",
        type: ["string"],
        description: "Optional custom URL for the banner image.",
      },
      {
        name: "headline",
        type: ["string"],
        description: "The headline text for the profile.",
        default: "'Software Engineer'",
      },
      {
        name: "connections",
        type: ["number | string"],
        description: "Number of connections to display.",
        default: "'500+'",
      },
      {
        name: "location",
        type: ["string"],
        description: "Location of the user.",
        default: "'San Francisco, CA'",
      },
      {
        name: "text",
        type: ["string"],
        description: "The text shown before the link.",
        default: "'Connect on'",
      },
      {
        name: "linkText",
        type: ["string"],
        description: "The text for the link.",
        default: "'LinkedIn'",
      },
      {
        name: "href",
        type: ["string"],
        description: "Custom URL for the profile link.",
      },
      {
        name: "enableLinkTilt",
        type: ["boolean"],
        description:
          "Whether to enable mouse tracking 3D tilt effect on the link hover.",
        default: "true",
      },
      {
        name: "linkTiltMaxRotate",
        type: ["number"],
        description: "Maximum tilt angle in degrees for the link rotation.",
        default: "5",
      },
      {
        name: "enableCardTilt",
        type: ["boolean"],
        description:
          "Whether to enable mouse tracking 3D tilt effect on the card hover.",
        default: "true",
      },
      {
        name: "cardTiltMaxRotate",
        type: ["number"],
        description: "Maximum tilt angle in degrees for the card rotation.",
        default: "5",
      },
      {
        name: "className",
        type: ["string"],
        description: "Additional CSS classes to style the outer container.",
      },
      {
        name: "popoverClassName",
        type: ["string"],
        description:
          "Additional CSS classes to style the popup card container.",
      },
      {
        name: "linkClassName",
        type: ["string"],
        description:
          "Additional CSS classes to style the anchor trigger element.",
      },
      {
        name: "labelClassName",
        type: ["string"],
        description:
          "Additional CSS classes to style the label description text.",
      },
    ],
  },
  {
    slug: "twitter-card",
    category: "Social Cards",
    inspiration: "",
    preview: "https://ik.imagekit.io/niqgaoeg3/GUI-x-Card.mp4",
    name: "Twitter(X) Card",
    description:
      "An interactive Twitter profile card component that supports both static and animated 3D tilt effects.",
    interactionType:
      "Hover triggers a magnetic 3D tilt effect on the card and the link with spring physics.",
    dependencies: ["motion"],
    dependencyNotes:
      "This component uses a 3rd party API (https://api.fxtwitter.com) to fetch public profile data.",
    previewFile: "TwitterCardPreview",
    props: [
      {
        name: "username",
        type: ["string"],
        description: "The X (Twitter) username (handle) of the profile.",
      },
      {
        name: "name",
        type: ["string"],
        description: "The display name of the profile.",
        default: "'Twitter User'",
      },
      {
        name: "avatarUrl",
        type: ["string"],
        description: "Optional custom URL for the avatar image.",
      },
      {
        name: "staticCard",
        type: ["boolean"],
        description:
          "If true, renders the card statically without the link/popover interaction.",
        default: "false",
      },
      {
        name: "enableLinkTilt",
        type: ["boolean"],
        description:
          "Whether to enable mouse tracking 3D tilt effect on the link hover.",
        default: "true",
      },
      {
        name: "linkTiltMaxRotate",
        type: ["number"],
        description: "Maximum tilt angle in degrees for the link rotation.",
        default: "5",
      },
      {
        name: "enableCardTilt",
        type: ["boolean"],
        description:
          "Whether to enable mouse tracking 3D tilt effect on the card hover.",
        default: "true",
      },
      {
        name: "cardTiltMaxRotate",
        type: ["number"],
        description: "Maximum tilt angle in degrees for the card rotation.",
        default: "5",
      },
      {
        name: "className",
        type: ["string"],
        description: "Additional CSS classes to style the outer container.",
      },
      {
        name: "popoverClassName",
        type: ["string"],
        description:
          "Additional CSS classes to style the popup card container.",
      },
      {
        name: "linkClassName",
        type: ["string"],
        description:
          "Additional CSS classes to style the anchor trigger element.",
      },
      {
        name: "labelClassName",
        type: ["string"],
        description:
          "Additional CSS classes to style the label description text.",
      },
    ],
  },
  {
    slug: "radial-gooey-menu",
    category: "Visuals",
    inspiration: "",
    preview: "https://ik.imagekit.io/niqgaoeg3/GUI-gooey-menu.mp4",
    name: "Radial Gooey Menu",
    description:
      "A liquid radial gooey menu component with spring-physics magnetic hover effects and smooth SVG blob matrix filtering.",
    interactionType:
      "Click center trigger to expand radial menu items with fluid gooey filter effects and magnetic cursor tracking.",
    dependencies: ["motion"],
    previewFile: "RadialGooeyMenuPreview",
    props: [
      {
        name: "items",
        type: ["RadialGooeyMenuItem[]"],
        description:
          "Array of menu items containing icon, label, and click handler.",
      },
      {
        name: "radius",
        type: ["number"],
        description: "Radial expansion distance of menu items in pixels.",
        default: "80",
      },
      {
        name: "blur",
        type: ["number"],
        description: "SVG Gaussian blur deviation for the gooey effect.",
        default: "10",
      },
      {
        name: "springStiffness",
        type: ["number"],
        description: "Stiffness configuration for magnetic cursor tracking.",
        default: "150",
      },
      {
        name: "springDamping",
        type: ["number"],
        description: "Damping configuration for magnetic cursor tracking.",
        default: "15",
      },
      {
        name: "defaultOpen",
        type: ["boolean"],
        description: "Initial expanded state of the gooey menu.",
        default: "false",
      },
      {
        name: "onToggle",
        type: ["(isOpen: boolean) => void"],
        description: "Callback fired when the menu opens or closes.",
      },
      {
        name: "onItemSelect",
        type: ["(item: RadialGooeyMenuItem, index: number) => void"],
        description: "Callback fired when a child menu item is selected.",
      },
      {
        name: "className",
        type: ["string"],
        description: "Custom classes applied to the outer container.",
      },
      {
        name: "buttonClassName",
        type: ["string"],
        description: "Custom classes applied to the central trigger button.",
      },
      {
        name: "itemClassName",
        type: ["string"],
        description: "Custom classes applied to radial item buttons.",
      },
    ],
  },
  {
    slug: "floating-dock-menu",
    category: "Visuals",
    inspiration: "",
    preview: "https://ik.imagekit.io/niqgaoeg3/GUI-Floating-Dock-Menu.mp4",
    name: "Floating Dock Menu",
    description:
      "An expandable floating dock menu with smooth layout morphing, active pill indicator, toggle switches, and submenus.",
    interactionType:
      "Click dock tabs to expand upward into interactive menus with toggle switches and actions.",
    dependencies: ["motion"],
    previewFile: "FloatingDockMenuPreview",
    props: [
      {
        name: "tabs",
        type: ["NavTabItem[]"],
        description:
          "Array of dock tabs with icon, label, and nested menu items.",
      },
      {
        name: "defaultActiveIndex",
        type: ["number", "null"],
        description: "Index of initially active tab, or null for collapsed.",
        default: "null",
      },
      {
        name: "menuWidth",
        type: ["number"],
        description: "Width in pixels of the expanded menu.",
        default: "310",
      },
      {
        name: "showIcons",
        type: ["boolean"],
        description: "Whether to render icons beside menu items.",
        default: "true",
      },
      {
        name: "isFixed",
        type: ["boolean"],
        description: "Position fixed at bottom center of viewport.",
        default: "true",
      },
      {
        name: "onTabChange",
        type: ["(index: number | null) => void"],
        description: "Callback fired when active tab changes.",
      },
      {
        name: "onItemToggle",
        type: ["(tabId: string, itemId: string, enabled: boolean) => void"],
        description: "Callback fired when a switch inside a menu is toggled.",
      },
      {
        name: "className",
        type: ["string"],
        description: "Custom classes applied to the outer dock container.",
      },
    ],
  },
  {
    slug: "accordion",
    category: "Layout & Cards",
    inspiration: "",
    preview: "https://ik.imagekit.io/greatui/accordian.mp4",
    name: "Accordion",
    description:
      "An interactive Accordion component with smooth expand/collapse animations.",
    interactionType:
      "Accordion toggle with height animation and chevron rotation on click.",
    dependencies: ["motion"],
    previewFile: "AccordionPreview",
    props: [
      {
        name: "items",
        type: ["AccordionItem[]"],
        description:
          "Array of Accordion items containing title and description.",
      },
    ],
  },
  {
    slug: "button",
    category: "Buttons",
    inspiration: "",
    preview: "https://ik.imagekit.io/greatui/button.mp4",
    name: "Button",
    description:
      "A versatile button component supporting multiple variants, sizes, icons, and a loading state.",
    interactionType:
      "Clickable element with hover, active, focus, and loading states.",
    dependencies: [],
    previewFile: "ButtonPreview",
    props: [
      {
        name: "variant",
        type: [
          "'primary'",
          "'secondary'",
          "'outline'",
          "'ghost'",
          "'destructive'",
        ],
        description: "The visual style variant of the button.",
        default: "'primary'",
      },
      {
        name: "size",
        type: ["'sm'", "'md'", "'lg'", "'icon'"],
        description: "The height and padding size of the button.",
        default: "'md'",
      },
      {
        name: "isLoading",
        type: ["boolean"],
        description: "If true, shows a spinner and disables user interaction.",
        default: "false",
      },
      {
        name: "leftIcon",
        type: ["React.ReactNode"],
        description: "An icon element placed to the left of the button text.",
      },
      {
        name: "rightIcon",
        type: ["React.ReactNode"],
        description: "An icon element placed to the right of the button text.",
      },
      {
        name: "disabled",
        type: ["boolean"],
        description: "Disables the button and prevents click actions.",
        default: "false",
      },
    ],
  },
  {
    slug: "mobile-mockup",
    category: "Visuals",
    inspiration: "",
    preview: "https://ik.imagekit.io/greatui/mobileMockup.mp4",
    name: "Mobile Mockup",
    description:
      "An interactive mobile device frame mockup with a realistic smartphone chassis, status bar, and WhatsApp mobile chat UI.",
    interactionType:
      "Animated message stream, interactive audio notes, and responsive dark/light mode device chassis.",
    dependencies: ["motion"],
    previewFile: "MobileMockupPreview",
    props: [
      {
        name: "headerTitle",
        type: ["string"],
        description: "Contact or group name shown in the WhatsApp header bar.",
        default: "'Taylor'",
      },
      {
        name: "headerSubtitle",
        type: ["string"],
        description: "Status or subtitle shown under the header title.",
        default: "'online'",
      },
      {
        name: "avatarUrl",
        type: ["string"],
        description: "Optional URL for the user avatar image.",
      },
      {
        name: "avatarFallback",
        type: ["string"],
        description: "Fallback text or initial if no avatar image is supplied.",
        default: "'T'",
      },
      {
        name: "messages",
        type: ["ChatMessage[]"],
        description:
          "List of chat messages to render inside the mobile screen.",
      },
      {
        name: "autoPlay",
        type: ["boolean"],
        description:
          "Whether to animate message streaming and typing indicator automatically.",
        default: "true",
      },
    ],
  },
  {
    slug: "macbook-mockup",
    category: "Visuals",
    inspiration: "",
    preview: "https://ik.imagekit.io/greatui/macbookMockup.mp4",
    name: "Macbook Mockup",
    description:
      "A realistic 3D Macbook Pro device frame mockup with aluminum casing, keyboard base, and dual-pane WhatsApp Web chat UI.",
    interactionType:
      "Interactive dual-pane sidebar & chat stream, voice notes, and desktop laptop frame animations.",
    dependencies: ["motion"],
    previewFile: "MacbookMockupPreview",
    props: [
      {
        name: "headerTitle",
        type: ["string"],
        description:
          "Active chat contact or group name in WhatsApp Web header.",
        default: "'Alex (Design Lead)'",
      },
      {
        name: "headerSubtitle",
        type: ["string"],
        description: "Status or subtitle text in the chat header.",
        default: "'online'",
      },
      {
        name: "avatarUrl",
        type: ["string"],
        description: "Optional URL for the contact profile avatar.",
      },
      {
        name: "avatarFallback",
        type: ["string"],
        description: "Fallback initial for contact avatar.",
        default: "'A'",
      },
      {
        name: "messages",
        type: ["ChatMessage[]"],
        description: "Array of chat messages for the desktop chat stream.",
      },
      {
        name: "autoPlay",
        type: ["boolean"],
        description: "Toggle automated message sequence and typing state loop.",
        default: "true",
      },
    ],
  },
  {
    slug: "deployment-checklist",
    category: "Layout & Cards",
    inspiration: "",
    preview: "https://ik.imagekit.io/greatui/deploymentchecklist.mp4",
    name: "Deployment Checklist",
    description:
      "An interactive CI/CD pipeline protocol checklist depicting git clone, install, build, and deploy stages with custom animated status icons.",
    interactionType:
      "Sequentially executable checklist with running spin state, skipped items, error logs, and detailed step drawer toggling.",
    dependencies: ["motion"],
    previewFile: "DeploymentChecklistPreview",
    props: [
      {
        name: "initialTasks",
        type: ["Task[]"],
        description:
          "Initial list of pipeline tasks containing id, title, subtitle, status, and info log attributes.",
      },
    ],
  },
  {
    slug: "floating-menu",
    category: "Visuals",
    inspiration: "",
    preview: "https://ik.imagekit.io/greatui/floatingmenu.mp4",
    name: "Floating Menu",
    description:
      "A floating, animated capsule menu that expands into a full-screen navigation overlay.",
    interactionType:
      "Click to expand capsule into a full menu with staggered link animations.",
    dependencies: ["motion"],
    previewFile: "FloatingMenuPreview",
    props: [
      {
        name: "title",
        type: ["ReactNode"],
        description:
          "The logo or title component rendered in the capsule header.",
      },
      {
        name: "primaryLinks",
        type: ["MenuLink[]"],
        description: "Large, primary navigation links.",
      },
      {
        name: "secondaryLinks",
        type: ["MenuLink[]"],
        description: "Smaller, secondary section links.",
      },
      {
        name: "socialLinks",
        type: ["MenuLink[]"],
        description: "External social media links.",
      },
    ],
  },
  {
    slug: "vinyl-album-card",
    category: "Layout & Cards",
    inspiration: "",
    preview: "https://ik.imagekit.io/greatui/vinyl.mp4",
    name: "Vinyl Album Card",
    description:
      "An interactive music album card with a spinning vinyl record that emerges from the cover sleeve upon hover.",
    interactionType:
      "Hover-triggered card sleeve scale, tilt rotations, record sliding offset, and vinyl spin animations.",
    dependencies: ["motion"],
    previewFile: "VinylAlbumCardPreview",
    props: [
      {
        name: "title",
        type: ["string"],
        description: "The name of the song or album track.",
        default: "'Crashing Worlds'",
      },
      {
        name: "artist",
        type: ["string"],
        description: "The name of the performing artist or band.",
        default: "'The Bebos'",
      },
      {
        name: "releaseType",
        type: ["string"],
        description:
          "The classification of the release (e.g. Single, Album, EP).",
        default: "'Single'",
      },
      {
        name: "year",
        type: ["string"],
        description: "The release calendar year.",
        default: "'2057'",
      },
      {
        name: "coverImage",
        type: ["string"],
        description: "URL or local asset path of the album cover image.",
        default: "'https://ik.imagekit.io/ybq4azred/greatui/album_art.png'",
      },
    ],
  },
  /* {
    slug: "liquid-ripple-shader",
    category: "Shaders",
    inspiration: "",
    preview: "https://ik.imagekit.io/greatui/liquidRiple.mp4",
    name: "Liquid Ripple Shader",
    description:
      "A fullscreen WebGL page transition that animates a fluid concentric ripple wave expanding from the center of the viewport during route changes.",
    interactionType:
      "Full viewport canvas shader render triggered on navigation with configurable duration and chromatic aberration.",
    dependencies: [],
    previewFile: "LiquidRippleShaderPreview",
    props: [
      {
        name: "trigger",
        type: ["number"],
        description:
          "Value key to programmatically trigger the transition overlay.",
        default: "0",
      },
      {
        name: "onViewSwap",
        type: ["() => void"],
        description:
          "Callback fired at mid-transition to perform state/view swaps.",
      },
      {
        name: "isDark",
        type: ["boolean"],
        description: "Toggle theme colours inside the WebGL rendering context.",
        default: "false",
      },
      {
        name: "duration",
        type: ["number"],
        description: "Total transition time in milliseconds.",
        default: "900",
      },
      {
        name: "aberration",
        type: ["number"],
        description: "Chromatic RGB aberration distance scale.",
        default: "1.0",
      },
    ],
  },
  {
    slug: "cyber-glitch-shader",
    category: "Shaders",
    inspiration: "",
    preview: "https://ik.imagekit.io/greatui/cyberglitch.mp4",
    name: "Cyber Glitch Shader",
    description:
      "A fullscreen WebGL page transition that applies an RGB-split chromatic aberration glitch effect across the viewport during route changes.",
    interactionType:
      "Full viewport canvas shader render triggered on navigation with configurable duration and chromatic aberration.",
    dependencies: [],
    previewFile: "CyberGlitchShaderPreview",
    props: [
      {
        name: "trigger",
        type: ["number"],
        description:
          "Value key to programmatically trigger the transition overlay.",
        default: "0",
      },
      {
        name: "onViewSwap",
        type: ["() => void"],
        description:
          "Callback fired at mid-transition to perform state/view swaps.",
      },
      {
        name: "isDark",
        type: ["boolean"],
        description: "Toggle theme colours inside the WebGL rendering context.",
        default: "false",
      },
      {
        name: "duration",
        type: ["number"],
        description: "Total transition time in milliseconds.",
        default: "900",
      },
      {
        name: "aberration",
        type: ["number"],
        description: "Chromatic RGB aberration distance scale.",
        default: "1.0",
      },
    ],
  },
  {
    slug: "vortex-spiral-shader",
    category: "Shaders",
    inspiration: "",
    preview: "https://ik.imagekit.io/greatui/swirl.mp4",
    name: "Vortex Spiral Shader",
    description:
      "A fullscreen WebGL page transition that spins a rotating swirl vortex wipe across the viewport during route changes.",
    interactionType:
      "Full viewport canvas shader render triggered on navigation with configurable duration and chromatic aberration.",
    dependencies: [],
    previewFile: "VortexSpiralShaderPreview",
    props: [
      {
        name: "trigger",
        type: ["number"],
        description:
          "Value key to programmatically trigger the transition overlay.",
        default: "0",
      },
      {
        name: "onViewSwap",
        type: ["() => void"],
        description:
          "Callback fired at mid-transition to perform state/view swaps.",
      },
      {
        name: "isDark",
        type: ["boolean"],
        description: "Toggle theme colours inside the WebGL rendering context.",
        default: "false",
      },
      {
        name: "duration",
        type: ["number"],
        description: "Total transition time in milliseconds.",
        default: "900",
      },
      {
        name: "aberration",
        type: ["number"],
        description: "Chromatic RGB aberration distance scale.",
        default: "1.0",
      },
    ],
  },
  {
    slug: "liquid-dissolve-shader",
    category: "Shaders",
    inspiration: "",
    preview: "https://ik.imagekit.io/greatui/liquidDisolve.mp4",
    name: "Liquid Dissolve Shader",
    description:
      "A fullscreen WebGL page transition that melts the viewport away using organic fractal noise dissolve during route changes.",
    interactionType:
      "Full viewport canvas shader render triggered on navigation with configurable duration and chromatic aberration.",
    dependencies: [],
    previewFile: "LiquidDissolveShaderPreview",
    props: [
      {
        name: "trigger",
        type: ["number"],
        description:
          "Value key to programmatically trigger the transition overlay.",
        default: "0",
      },
      {
        name: "onViewSwap",
        type: ["() => void"],
        description:
          "Callback fired at mid-transition to perform state/view swaps.",
      },
      {
        name: "isDark",
        type: ["boolean"],
        description: "Toggle theme colours inside the WebGL rendering context.",
        default: "false",
      },
      {
        name: "duration",
        type: ["number"],
        description: "Total transition time in milliseconds.",
        default: "900",
      },
      {
        name: "aberration",
        type: ["number"],
        description: "Chromatic RGB aberration distance scale.",
        default: "1.0",
      },
    ],
  },
  {
    slug: "animated-select",
    category: "Visuals",
    inspiration: "",
    preview: "https://ik.imagekit.io/greatui/dropdown.mp4",
    name: "Animated Select",
    description:
      "A premium interactive dropdown component with dynamic spring-based menu expanding animations and sequenced staggering list items.",
    interactionType:
      "Hover and click active states, chevron micro-rotation, stagger item animations, and responsive layout.",
    dependencies: ["motion"],
    previewFile: "AnimatedSelectPreview",
    props: [
      {
        name: "placeholder",
        type: ["string"],
        description: "Placeholder text displayed when no option is selected.",
        default: "'Select Action'",
      },
      {
        name: "options",
        type: ["DropdownOption[]"],
        description: "Array of items to display inside the menu list.",
      },
      {
        name: "className",
        type: ["string"],
        description: "Additional CSS classes to style the dropdown container.",
      },
      {
        name: "width",
        type: ["number"],
        description: "Total width of the dropdown in pixels.",
        default: "192",
      },
      {
        name: "itemHeight",
        type: ["number"],
        description: "Height of each option in the list in pixels.",
        default: "40",
      },
      {
        name: "itemGap",
        type: ["number"],
        description: "Vertical gap space between menu items in pixels.",
        default: "4",
      },
      {
        name: "triggerHeight",
        type: ["number"],
        description: "Height of the trigger button in pixels.",
        default: "44",
      },
      {
        name: "onSelect",
        type: ["(option: DropdownOption) => void"],
        description:
          "Callback function fired when a dropdown menu item is selected.",
      },
    ],
  }, */
  {
    slug: "animated-link",
    category: "Visuals",
    inspiration: "",
    preview: "https://ik.imagekit.io/greatui/links.mp4",
    name: "Animated Link",
    description:
      "An interactive link component supporting 13 premium hover variants including custom clipping masks, SVG sine waves, and text marquee animations.",
    interactionType:
      "Hover text fill, SVG loops, marquee transition, doodle draw underline, overline, and dash arrow reveals.",
    dependencies: ["motion"],
    previewFile: "AnimatedLinkPreview",
    props: [
      {
        name: "href",
        type: ["string"],
        description: "Target URL or path for navigation.",
      },
      {
        name: "variant",
        type: ["AnimatedLinkVariant"],
        description: "Visual style preset for the hover effect animation.",
        default: "'underline'",
      },
      {
        name: "className",
        type: ["string"],
        description: "Additional CSS classes to apply custom styling.",
      },
      {
        name: "showArrow",
        type: ["boolean"],
        description: "Render a clean arrow indicator next to the link text.",
        default: "false",
      },
    ],
  },
  /* {
    slug: "ascii-image",
    category: "Visuals",
    inspiration: "",
    preview: "/previews/AsciiImagePreview.png",
    name: "ASCII Image",
    description:
      "A real-time hardware-accelerated WebGL shader component that proceduralizes any image into customizable density-based ASCII art with masking overlays.",
    interactionType:
      "WebGL fragment shader rendering, linear alpha gradient overlay masking, and content container placement.",
    dependencies: [],
    previewFile: "AsciiImagePreview",
    props: [
      {
        name: "src",
        type: ["string"],
        description: "Source URL of the image to display and transform.",
      },
      {
        name: "width",
        type: ["number"],
        description: "Width of the component and WebGL canvas in pixels.",
        default: "500",
      },
      {
        name: "height",
        type: ["number"],
        description: "Height of the component and WebGL canvas in pixels.",
        default: "500",
      },
      {
        name: "className",
        type: ["string"],
        description: "Additional CSS classes to style the container.",
      },
      {
        name: "mask",
        type: ["string"],
        description:
          "CSS mask image applied to the ASCII WebGL canvas overlay.",
        default: "'linear-gradient(to bottom, black 20%, transparent 100%)'",
      },
      {
        name: "baseMask",
        type: ["string"],
        description:
          "CSS mask image applied to the underlying clean base image.",
        default: "'linear-gradient(to bottom, transparent 20%, black 100%)'",
      },
      {
        name: "charSize",
        type: ["number"],
        description: "Size coefficient for the ASCII character grid scaling.",
        default: "8.0",
      },
    ],
  }, */
  {
    slug: "terminal-loader",
    category: "Visuals",
    inspiration: "",
    preview: "https://ik.imagekit.io/greatui/terminalLoader.mp4",
    name: "Terminal Loader",
    description:
      "A retro, terminal-inspired monospace loading indicator that animates character blocks and trailing density particles in real-time.",
    interactionType:
      "Continuous procedural loop animation with customizable speed, matrix dimensions, character glyph trails, and colors.",
    dependencies: [],
    previewFile: "TerminalLoaderPreview",
    props: [
      {
        name: "rows",
        type: ["number"],
        description: "Number of terminal rows to render vertically.",
        default: "5",
      },
      {
        name: "cols",
        type: ["number"],
        description: "Number of terminal columns (characters wide).",
        default: "60",
      },
      {
        name: "blockWidth",
        type: ["number"],
        description: "Length of the active solid cursor blocks.",
        default: "3",
      },
      {
        name: "speed",
        type: ["number"],
        description: "Interval animation frame speed in milliseconds.",
        default: "50",
      },
      {
        name: "color",
        type: ["string"],
        description: "Tailwind CSS class for the character trail text color.",
        default: "'text-rose-500'",
      },
      {
        name: "bgColor",
        type: ["string"],
        description:
          "Tailwind CSS class for the solid block cursor background color.",
        default: "'bg-rose-500'",
      },
      {
        name: "charEmpty",
        type: ["string"],
        description: "The background glyph character representing empty space.",
        default: "'.'",
      },
      {
        name: "charTrail",
        type: ["string[]"],
        description:
          "Ordered array of characters forming the fading visual trail.",
        default: "['▓', '▒', '░']",
      },
      {
        name: "className",
        type: ["string"],
        description: "Additional CSS classes to style the container wrapper.",
      },
    ],
  },
  {
    slug: "image-hover-reveal",
    category: "Visuals",
    inspiration: "",
    preview: "/previews/ImageHoverRevealPreview.png",
    name: "Image Hover Reveal",
    description:
      "A dual-image avatar surface implementing directional hover reveals and cursor coordinate tracking spring slices.",
    interactionType:
      "Hover entry angle detection, coordinate tracking springs, clip path interpolation, and dual state cross-fade reveals.",
    dependencies: ["motion"],
    previewFile: "ImageHoverRevealPreview",
    props: [
      {
        name: "src",
        type: ["string"],
        description:
          "Source URL of the avatar image to be revealed from grayscale to color.",
        default:
          "'https://ik.imagekit.io/ybq4azred/temp_avatar_new_1784920336469.png'",
      },
      {
        name: "overlaySrc",
        type: ["string"],
        description:
          "Optional secondary transition image URL revealed on hover.",
      },
      {
        name: "alt",
        type: ["string"],
        description: "Alt accessibility description for the avatar image.",
        default: "'Avatar Hover'",
      },
      {
        name: "variant",
        type: ["'directional' | 'slice'"],
        description:
          "The reveal animation variant (directional entry angle or pointer coordinate-tracking slide).",
        default: "'directional'",
      },
      {
        name: "className",
        type: ["string"],
        description: "Additional CSS classes to style the card boundary.",
      },
    ],
  },
  {
    slug: "minimal-buttons",
    category: "Buttons",
    inspiration: "",
    preview: "https://ik.imagekit.io/greatui/shadowButton.mp4",
    name: "Minimal Buttons",
    description:
      "A tactile, retro-modern button component featuring beveled top-border highlights, inner gradients, and inset shadow detailing.",
    interactionType:
      "Press animation and smooth theme-aligned tactile hover state shifts.",
    dependencies: [],
    previewFile: "MinimalButtonsPreview",
    props: [
      {
        name: "href",
        type: ["string"],
        description:
          "Optional URL navigation path. If provided, renders an anchor tag using Next Link.",
      },
      {
        name: "variant",
        type: ["'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'"],
        description:
          "Tactile beveled visual variants aligned with theme actions.",
        default: "'primary'",
      },
      {
        name: "isLoading",
        type: ["boolean"],
        description: "Controls the button loading indicator spinner state.",
        default: "false",
      },
      {
        name: "className",
        type: ["string"],
        description: "Additional CSS classes to style the button wrapper.",
      },
    ],
  },
  {
    slug: "aceternity-button",
    category: "Buttons",
    inspiration: "",
    preview: "https://ik.imagekit.io/greatui/aceternitybutton.mp4",
    name: "Aceternity Button",
    description:
      "A soft, convex tactile button component featuring inner shadows, active scaling states, and smooth gradients for premium feedback.",
    interactionType:
      "Hover offset transitions, inset shadow focus states, and press-down scale animations.",
    dependencies: [],
    previewFile: "AceternityButtonPreview",
    props: [
      {
        name: "href",
        type: ["string"],
        description:
          "Optional URL path. If provided, renders an anchor tag using Next Link.",
      },
      {
        name: "variant",
        type: ["'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'"],
        description: "Tactile convex style variants aligned with colors.",
        default: "'primary'",
      },
      {
        name: "size",
        type: ["'sm' | 'md' | 'lg' | 'xl'"],
        description: "Size dimensions of the tactile button layout.",
        default: "'md'",
      },
      {
        name: "isLoading",
        type: ["boolean"],
        description: "Controls the button loading indicator spinner state.",
        default: "false",
      },
      {
        name: "className",
        type: ["string"],
        description: "Additional CSS classes to style the button container.",
      },
    ],
  },
  {
    slug: "avatar-stack",
    category: "Layout & Cards",
    inspiration: "",
    preview: "/previews/AvatarStackPreview.png",
    name: "Avatar Stack",
    description:
      "A dynamic stack of overlapping user avatars featuring custom tooltip display variants that track hover directions or coordinates with spring dynamics.",
    interactionType:
      "Hover animations: spring-tilt (follows coordinate movements), spring-box (tilts the box container), and slide-blur (directional blur reveal).",
    dependencies: ["motion"],
    previewFile: "AvatarStackPreview",
    props: [
      {
        name: "users",
        type: ["User[]"],
        description:
          "Custom list of avatar users with names and portrait URLs.",
      },
      {
        name: "variant",
        type: ["'spring-tilt' | 'spring-box' | 'slide-blur'"],
        description:
          "The visual style and animation variant of the hover tooltip.",
        default: "'spring-tilt'",
      },
      {
        name: "size",
        type: ["'sm' | 'md' | 'lg'"],
        description: "The dimensions of the avatar items.",
        default: "'md'",
      },
      {
        name: "className",
        type: ["string"],
        description:
          "Additional CSS classes to style the avatar wrapper stack.",
      },
      {
        name: "avatarClassName",
        type: ["string"],
        description: "Custom styles for individual avatar images.",
      },
      {
        name: "tooltipClassName",
        type: ["string"],
        description: "Custom styles for the hover tooltip blocks.",
      },
    ],
  },
  {
    slug: "diagonal-marquee-carousel",
    category: "Layout & Cards",
    inspiration: "",
    preview: "https://ik.imagekit.io/greatui/marquee.mp4",
    name: "Diagonal Marquee Carousel",
    description:
      "A premium diagonally slanted, infinitely scrolling marquee showing cards or landscapes with offset speeds, alternating directions, and soft gradients.",
    interactionType:
      "Infinite linear scroll with custom angles, layout parameters, and card-zoom states.",
    dependencies: ["motion"],
    previewFile: "DiagonalMarqueeCarouselPreview",
    props: [
      {
        name: "cards",
        type: ["CardItem[]"],
        description:
          "Custom array of card items containing urls, titles, and IDs.",
      },
      {
        name: "angle",
        type: ["number"],
        description: "Rotation angle offset in degrees.",
        default: "-25",
      },
      {
        name: "baseSpeed",
        type: ["number"],
        description: "Standard scroll duration in seconds per loop cycle.",
        default: "40",
      },
      {
        name: "alternateDirections",
        type: ["boolean"],
        description: "Scroll alternating rows in reverse directions.",
        default: "true",
      },
      {
        name: "className",
        type: ["string"],
        description: "Custom class name for the wrapper frame.",
      },
      {
        name: "cardClassName",
        type: ["string"],
        description: "Custom class name for individual marquee cards.",
      },
      {
        name: "fadeClassName",
        type: ["string"],
        description: "Custom class name for top and bottom gradient fades.",
      },
    ],
  },
  {
    slug: "revision-timeline",
    category: "Layout & Cards",
    inspiration: "",
    preview: "https://ik.imagekit.io/greatui/timeline.mp4",
    name: "Revision Timeline",
    description:
      "A premium interactive document revision history log timeline featuring Gaussian-weighted dial scale indicators, spring-based sliding position centering, and parsed markdown log lists.",
    interactionType:
      "Gaussian scaling sliders, date hover indicators, paging click navigation, and markdown syntax parsers.",
    dependencies: ["motion"],
    previewFile: "RevisionTimelinePreview",
    props: [
      {
        name: "revisions",
        type: ["TimelineRevision[]"],
        description:
          "List of document history revision items containing date, time, title, author, and markdown content log.",
      },
      {
        name: "defaultActiveId",
        type: ["string"],
        description: "Optional ID of the revision log active by default.",
      },
      {
        name: "className",
        type: ["string"],
        description: "Optional class name for the root wrapper container.",
      },
      {
        name: "showNavigation",
        type: ["boolean"],
        description: "Whether to display the previous/next navigation row.",
      },
      {
        name: "showDateLabel",
        type: ["boolean"],
        description:
          "Whether to display the active revision date label in the toolbar.",
      },
      {
        name: "pastPaddingDays",
        type: ["number"],
        description:
          "Number of past placeholder days to pad before the active revisions.",
      },
      {
        name: "futurePaddingDays",
        type: ["number"],
        description:
          "Number of future placeholder days to pad after the active revisions.",
      },
      {
        name: "height",
        type: ["string", "number"],
        description:
          "Optional height for the revision log content area, accepts CSS units or pixel numbers.",
      },
      {
        name: "onActiveIdChange",
        type: ["(activeId: string) => void"],
        description:
          "Callback fired when the active revision selection changes.",
      },
    ],
  },
  // {
  //   slug: "frosted-glass-reveal",
  //   inspiration: "",
  //   preview: "https://ik.imagekit.io/greatui/frostedglass.mp4",
  //   name: "Frosted Glass Reveal",
  //   description:
  //     "An interactive frosted glass image reveal effect that simulates realistic light refraction and tracks the user's cursor.",
  //   interactionType:
  //     "Hover entry detection, cursor coordinate spring tracking, SVG fractal noise displacement filter, and masked reveal lens.",
  //   dependencies: ["motion"],
  //   previewFile: "FrostedGlassRevealPreview",
  //   props: [
  //     {
  //       name: "imageUrl",
  //       type: ["string"],
  //       description: "The source URL of the image to display.",
  //       default:
  //         "'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1600&auto=format&fit=crop'",
  //     },
  //     {
  //       name: "className",
  //       type: ["string"],
  //       description: "Additional CSS classes to style the container.",
  //     },
  //     {
  //       name: "revealShape",
  //       type: ["'circle' | 'square' | 'rounded'"],
  //       description: "The physical shape of the cursor magnifying reveal lens.",
  //       default: "'circle'",
  //     },
  //     {
  //       name: "glassStrength",
  //       type: ["number"],
  //       description:
  //         "The standard deviation intensity for the SVG Gaussian Blur frosted effect.",
  //       default: "22",
  //     },
  //   ],
  // },
  {
    slug: "card",
    category: "Layout & Cards",
    inspiration: "",
    preview: "https://ik.imagekit.io/greatui/card.mp4",
    name: "Card",
    description:
      "A card component that displays an image, a title, and a date, and highlights custom divider lines on hover.",
    interactionType: "Hover divider line scaling.",
    dependencies: ["motion"],
    previewFile: "CardPreview",
    props: [
      {
        name: "title",
        type: ["string"],
        description: "Title heading of the card.",
      },
      {
        name: "src",
        type: ["string"],
        description: "Source URL of the image card.",
      },
      {
        name: "date",
        type: ["string"],
        description: "Date string label displayed on the right of the card.",
      },
      {
        name: "className",
        type: ["string"],
        description: "Additional CSS classes to style the card container.",
      },
      {
        name: "imgClassName",
        type: ["string"],
        description: "Additional CSS classes to style the card image element.",
      },
      {
        name: "titleClassName",
        type: ["string"],
        description:
          "Additional CSS classes to style the title heading element.",
      },
      {
        name: "dateClassName",
        type: ["string"],
        description: "Additional CSS classes to style the date label element.",
      },
      {
        name: "dividerClassName",
        type: ["string"],
        description:
          "Additional CSS classes to style the animated border divider elements.",
      },
    ],
  },
  {
    slug: "text-reveal",
    category: "Typography",
    inspiration: "https://x.com/samitkapoorr",
    preview: "https://ik.imagekit.io/greatui/textscroll.mp4",
    name: "Text Reveal",
    description:
      "A scroll-driven text mask reveal component that animates words and characters letter-by-letter as the viewport scrolls.",
    interactionType:
      "Scroll-driven character color shifts, character blur transitions, and watermark opacity fades.",
    dependencies: ["motion"],
    previewFile: "TextRevealPreview",
    props: [
      {
        name: "paragraphs",
        type: ["string[]"],
        description:
          "An array of text paragraphs to scroll through and animate.",
      },
      {
        name: "className",
        type: ["string"],
        description:
          "Additional CSS classes to style the text container wrapper.",
      },
      {
        name: "paragraphClassName",
        type: ["string"],
        description:
          "Additional CSS classes to style each individual paragraph element.",
      },
      {
        name: "highlightColor",
        type: ["string"],
        description:
          "Text reveal progress highlight color (RGB values format recommended).",
      },
      {
        name: "lightWatermarkColor",
        type: ["string"],
        description:
          "Watermark color in light theme mode (RGB values format recommended).",
      },
      {
        name: "darkWatermarkColor",
        type: ["string"],
        description:
          "Watermark color in dark theme mode (RGB values format recommended).",
      },
      {
        name: "lightTextColor",
        type: ["string"],
        description:
          "Final revealed text color in light theme mode (RGB values format recommended).",
      },
      {
        name: "darkTextColor",
        type: ["string"],
        description:
          "Final revealed text color in dark theme mode (RGB values format recommended).",
      },
    ],
  },
  {
    slug: "github-card",
    category: "Social Cards",
    inspiration: "",
    preview: "https://ik.imagekit.io/greatui/avatarhover.mp4",
    name: "Github Card",
    description:
      "A customizable hover link component that reveals a realistic 3D-tilted GitHub contributions calendar popup with interactive tooltips.",
    interactionType:
      "Hover-triggered 3D card rotation, coordinate tracking, contribution block micro-scaling, and interactive cell tooltips.",
    dependencies: ["motion"],
    dependencyNotes:
      "This component uses a 3rd party API (https://github-contributions-api.jogruber.de) to fetch public contributions. You can also configure it to use the official GitHub REST API by providing a GitHub Personal Access Token.",
    previewFile: "GithubCardPreview",
    props: [
      {
        name: "username",
        type: ["string"],
        description:
          "The target GitHub username to display and seed the contributions map.",
      },
      {
        name: "name",
        type: ["string"],
        description: "The full display name inside the profile card header.",
        default: "'GitHub User'",
      },
      {
        name: "avatarUrl",
        type: ["string"],
        description:
          "Custom URL for the profile avatar image (defaults to GitHub profile avatar).",
      },
      {
        name: "year",
        type: ["number | string"],
        description:
          "The calendar year displayed in the contribution count details.",
        default: "2026",
      },
      {
        name: "text",
        type: ["string"],
        description: "Preceding label text for the hover link wrapper.",
        default: "'Follow me on'",
      },
      {
        name: "linkText",
        type: ["string"],
        description: "The clickable anchor text triggering the popover card.",
        default: "'GitHub'",
      },
      {
        name: "href",
        type: ["string"],
        description: "Custom target URL for the profile anchor link.",
      },
      {
        name: "themeScheme",
        type: ["'monochrome' | 'green' | 'blue' | 'purple'"],
        description: "Predefined color palette scheme for contribution levels.",
        default: "'monochrome'",
      },
      {
        name: "enableTilt",
        type: ["boolean"],
        description:
          "Whether to enable mouse tracking 3D tilt effect on hover.",
        default: "true",
      },
      {
        name: "tiltMaxRotate",
        type: ["number"],
        description: "Maximum tilt angle in degrees for the 3D card rotation.",
        default: "5",
      },
      {
        name: "className",
        type: ["string"],
        description: "Additional CSS classes to style the outer container.",
      },
      {
        name: "popoverClassName",
        type: ["string"],
        description:
          "Additional CSS classes to style the popup card container.",
      },
      {
        name: "linkClassName",
        type: ["string"],
        description:
          "Additional CSS classes to style the anchor trigger element.",
      },
      {
        name: "labelClassName",
        type: ["string"],
        description:
          "Additional CSS classes to style the label description text.",
      },
    ],
  },
  {
    slug: "team-section",
    category: "Layout & Cards",
    inspiration: "",
    preview: "https://ik.imagekit.io/greatui/teamSection.mp4",
    name: "Team Section",
    description:
      "A premium interactive team listing component featuring custom layout reveals, grayscale-to-color hover effects, and responsive layout.",
    interactionType:
      "Hover-triggered grayscale-to-color active states, slide-in designations, and absolute floating team member image preview.",
    dependencies: ["motion"],
    previewFile: "TeamSectionPreview",
    props: [
      {
        name: "speakers",
        type: ["Speaker[]"],
        description:
          "An array of speaker details: name, position, company, image, and optional social URL.",
      },
      {
        name: "grayscale",
        type: ["boolean"],
        description:
          "Toggle the grayscale filter on the speaker avatar images.",
        default: "true",
      },
      {
        name: "align",
        type: ["'center' | 'baseline' | 'end'"],
        description:
          "The vertical alignment of speaker name and designation in desktop rows.",
        default: "'baseline'",
      },
      {
        name: "slideDistance",
        type: ["number"],
        description:
          "The transition offset distance in pixels for the slide animations.",
        default: "20",
      },
      {
        name: "activeImageClassName",
        type: ["string"],
        description:
          "Additional CSS classes to style the floating active speaker image container.",
      },
      {
        name: "rowClassName",
        type: ["string"],
        description:
          "Additional CSS classes to style the individual desktop rows.",
      },
      {
        name: "className",
        type: ["string"],
        description: "Additional CSS classes to style the speakers container.",
      },
    ],
  },
  {
    slug: "scrambled-install-command",
    category: "Typography",
    inspiration: "",
    preview: "https://ik.imagekit.io/zoffdbb7mk/command-copy-scramble-text.mp4",
    name: "Scrambled Install Command",
    description:
      "A copy-to-clipboard command installation component featuring an animated scramble text effect.",
    interactionType:
      "Scrambles text on change, copy to clipboard, package manager selection.",
    dependencies: [],
    previewFile: "ScrambledInstallCommandPreview",
    props: [
      {
        name: "installCommand",
        type: ["string"],
        description: "The base command to be displayed and copied.",
      },
      {
        name: "pkgManager",
        type: ["PkgManager"],
        description: "The currently selected package manager.",
      },
      {
        name: "setPkgManager",
        type: ["(pm: PkgManager) => void"],
        description: "State setter for changing package manager.",
      },
      {
        name: "animationVariant",
        type: ["'full' | 'smart'"],
        description:
          "Whether to scramble the whole text or just the changed part.",
        default: "'full'",
      },
      {
        name: "className",
        type: ["string"],
        description: "Additional CSS classes to style the main container.",
      },
      {
        name: "headerClassName",
        type: ["string"],
        description: "Additional CSS classes to style the header bar.",
      },
      {
        name: "codeClassName",
        type: ["string"],
        description: "Additional CSS classes to style the code block area.",
      },
      {
        name: "buttonContainerClassName",
        type: ["string"],
        description:
          "Additional CSS classes to style the package manager buttons container.",
      },
      {
        name: "buttonClassName",
        type: ["string"],
        description:
          "Additional CSS classes applied to all package manager buttons.",
      },
      {
        name: "activeButtonClassName",
        type: ["string"],
        description:
          "Additional CSS classes applied to the active package manager button.",
      },
      {
        name: "inactiveButtonClassName",
        type: ["string"],
        description:
          "Additional CSS classes applied to inactive package manager buttons.",
      },
      {
        name: "copyButtonClassName",
        type: ["string"],
        description: "Additional CSS classes applied to the copy button.",
      },
      {
        name: "terminalIcon",
        type: ["React.ReactNode"],
        description:
          "Custom SVG icon element to replace the default terminal icon.",
      },
      {
        name: "availableManagers",
        type: ["PkgManager[]"],
        description: "Array of available package managers to display.",
        default: "['pnpm', 'npm', 'yarn', 'bun']",
      },
      {
        name: "scrambleIntervalMs",
        type: ["number"],
        description: "Interval in milliseconds between each scramble frame.",
        default: "32",
      },
    ],
  },
  {
    slug: "text-on-path-scroll",
    category: "Typography",
    inspiration: "",
    preview: "https://ik.imagekit.io/zoffdbb7mk/textscroll.mp4",
    name: "Text On Path Scroll",
    description:
      "A scroll-driven text animation that follows a custom SVG path as the user scrolls.",
    interactionType: "Scroll-driven text offset animation along an SVG path.",
    dependencies: ["motion"],
    previewFile: "TextOnPathScrollPreview",
    props: [
      {
        name: "text",
        type: ["string"],
        description:
          "The text to display on the path. Recommend appending special characters like • or · between repetitions.",
        default:
          "'CRAFTING BEAUTIFUL DIGITAL EXPERIENCES • PUSHING THE BOUNDARIES OF WEB DESIGN • WRITING CLEAN CODE • BUILDING EXCEPTIONAL INTERFACES • '",
      },
      {
        name: "className",
        type: ["string"],
        description: "Additional CSS classes to apply to the container.",
      },
      {
        name: "scrollContainerRef",
        type: ["React.RefObject<HTMLElement | null>"],
        description:
          "Optional ref for a custom scroll container (e.g. for preview panels).",
      },
      {
        name: "path",
        type: ["React.ReactNode"],
        description:
          'The SVG element containing the path. Must include a <path id="scroll-path" />.',
      },
      {
        name: "textProps",
        type: ["React.SVGProps<SVGTextElement>"],
        description:
          "Additional props to pass to the `<text>` SVG element. Useful for changing fontSize.",
      },
    ],
  },
  {
    slug: "multilingual-quote",
    category: "Typography",
    inspiration: "",
    name: "Multilingual Quote",
    description:
      "An animated quote section component with multi-language support.",
    interactionType: "Language toggle with smooth animated text transitions.",
    dependencies: ["motion"],
    previewFile: "MultilingualQuotePreview",
    preview: "https://ik.imagekit.io/zoffdbb7mk/quote-multilingual.mp4",
    props: [
      {
        name: "quotes",
        type: ["Quote[]"],
        description: "Array of quote objects containing id, label, and text.",
      },
      {
        name: "defaultLanguage",
        type: ["string"],
        description: "The id of the language quote to show by default.",
      },
      {
        name: "authorName",
        type: ["string"],
        description: "The name of the quote author.",
      },
      {
        name: "authorLink",
        type: ["string"],
        description: "Optional URL for the author's link.",
      },
      {
        name: "className",
        type: ["string"],
        description: "Optional CSS classes to apply to the container.",
      },
      {
        name: "quoteClassName",
        type: ["string"],
        description: "Optional CSS classes to apply to the quote text.",
      },
    ],
  },
  {
    slug: "pixel-to-ascii-image",
    category: "Visuals",
    name: "Pixel To Ascii Image",
    inspiration: "https://razorpay.com/ai-builders/",
    description:
      "An image component that pixelates and then converts into ASCII art on hover.",
    interactionType:
      "Hover triggers a procedural pixelation followed by an ASCII art conversion.",
    dependencies: ["motion"],
    previewFile: "PixelToAsciiImagePreview",
    preview: "https://ik.imagekit.io/zoffdbb7mk/pixel-to-ascii.mp4",
    props: [
      {
        name: "src",
        type: ["string"],
        description: "The source URL of the image.",
      },
      {
        name: "ease",
        type: ["number[]"],
        description: "Framer Motion easing array.",
        default: "[0.85, 0, 0.15, 1]",
      },
      {
        name: "width",
        type: ["number"],
        description: "The width of the canvas.",
        default: "500",
      },
      {
        name: "height",
        type: ["number"],
        description: "The height of the canvas.",
        default: "500",
      },
      {
        name: "className",
        type: ["string"],
        description: "Additional CSS classes.",
      },
      {
        name: "charSize",
        type: ["number"],
        description: "The size of the ASCII characters in pixels.",
        default: "10",
      },
    ],
  },
  {
    slug: "staggered-page-transition",
    category: "Page Transitions",
    name: "Staggered Page Transition",
    description:
      "A gorgeous staggered layout transition built with Framer Motion.",
    interactionType:
      "Triggered on route change or programmatically. Covers the viewport in staggered animated panels, seamlessly revealing the next view underneath.",
    dependencies: ["motion"],
    previewFile: "StaggeredPageTransitionPreview",
    preview: "https://ik.imagekit.io/zoffdbb7mk/staggering-page-transition.mp4",
    props: [
      {
        name: "trigger",
        type: ["number"],
        description:
          "Value key to programmatically trigger the transition overlay.",
        default: "0",
      },
      {
        name: "onViewSwap",
        type: ["() => void"],
        description:
          "Callback fired at mid-transition to perform state/view swaps.",
      },
      {
        name: "className",
        type: ["string"],
        description: "Additional CSS classes to style the container wrapper.",
      },
      {
        name: "panelClassName",
        type: ["string"],
        description:
          "Additional CSS classes to style the individual transitioning panels.",
      },
      {
        name: "columns",
        type: ["number"],
        description: "The number of vertical columns the curtain splits into.",
        default: "5",
      },
      {
        name: "duration",
        type: ["number"],
        description: "The duration of the animation for each panel in seconds.",
        default: "0.75",
      },
      {
        name: "staggerDelay",
        type: ["number"],
        description: "The delay between each panel's animation in seconds.",
        default: "0.075",
      },
      {
        name: "ease",
        type: ["string", "number[]"],
        description:
          "The bezier curve easing array or string for the animation.",
        default: "[0.85, 0, 0.15, 1]",
      },
      {
        name: "direction",
        type: ["'top'", "'bottom'", "'left'", "'right'"],
        description:
          "The direction the curtain enters from. Also determines if panels are vertical or horizontal.",
        default: '"top"',
      },
      {
        name: "exitOpposite",
        type: ["boolean"],
        description:
          "If true, the curtain will exit in the opposite direction it entered.",
        default: "true",
      },
    ],
    usageCode: `// 1. General Setup (All React Frameworks)
// The RouteTransitionProvider is framework-agnostic. Wrap your app with it 
// and pass your router's navigation function to the 'navigate' prop.
import { RouteTransitionProvider } from "@/components/ui/StaggeredPageTransition";

export function AppWrapper({ children }) {
  // Get your framework's router hook here (e.g. useRouter, useNavigate, useLocation)
  const navigate = (url: string) => { /* your router push function */ };
  
  return (
    <RouteTransitionProvider navigate={navigate}>
      {children}
    </RouteTransitionProvider>
  );
}


// 2. Next.js App Router Setup
// Create a client-side wrapper in a new file (e.g. components/TransitionWrapper.tsx):
"use client";
import { useRouter } from "next/navigation";
import { RouteTransitionProvider } from "@/components/ui/StaggeredPageTransition";

export function TransitionWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  
  return (
    <RouteTransitionProvider navigate={(url) => router.push(url)} panelClassName="bg-rose-500">
      {children}
    </RouteTransitionProvider>
  );
}

// Then wrap your application in layout.tsx:
// <TransitionWrapper>{children}</TransitionWrapper>


// 3. React Router (Vite / Remix) Setup
// Simply wrap your Routes with the provider and pass the navigate hook:
import { useNavigate, Routes, Route } from "react-router-dom";
import { RouteTransitionProvider } from "@/components/ui/StaggeredPageTransition";

export function AppShell() {
  const navigate = useNavigate();

  return (
    <RouteTransitionProvider navigate={navigate}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </RouteTransitionProvider>
  );
}



}`,
  },
  {
    slug: "color-wipe-page-transition",
    category: "Page Transitions",
    name: "Color Wipe Page Transition",
    description:
      "A fast, colorful screen transition featuring staggered horizontal bands with vibrant doodle accents.",
    interactionType:
      "Programmatically triggered. Covers the screen horizontally with 10 staggered lines before sliding out to reveal the new state.",
    dependencies: ["motion"],
    previewFile: "ColorWipePageTransitionPreview",
    preview: "https://ik.imagekit.io/zoffdbb7mk/ColorWipeTransition.mp4",
    props: [
      {
        name: "trigger",
        type: ["number"],
        description:
          "Value key to programmatically trigger the transition overlay.",
        default: "0",
      },
      {
        name: "onViewSwap",
        type: ["() => void"],
        description:
          "Callback fired at mid-transition to perform state/view swaps.",
      },
      {
        name: "panelColor",
        type: ["string"],
        description:
          "An optional hex code or CSS color string to override the default background color of the transitioning panels.",
      },
      {
        name: "columns",
        type: ["number"],
        description:
          "The number of vertical/horizontal bands the screen splits into.",
        default: "10",
      },
      {
        name: "duration",
        type: ["number"],
        description: "The duration of the animation for each band in seconds.",
        default: "0.45",
      },
      {
        name: "staggerDelay",
        type: ["number"],
        description: "The delay between each band's animation in seconds.",
        default: "0.03",
      },
      {
        name: "ease",
        type: ["string", "number[]"],
        description:
          "The bezier curve easing array or string for the animation.",
        default: "[0.85, 0, 0.15, 1]",
      },
      {
        name: "direction",
        type: ["'top'", "'bottom'", "'left'", "'right'"],
        description:
          "The direction the curtain enters from. Also determines if bands are vertical or horizontal.",
        default: '"left"',
      },
      {
        name: "exitOpposite",
        type: ["boolean"],
        description:
          "If true, the curtain will exit in the opposite direction it entered.",
        default: "false",
      },
      {
        name: "showLeadingStroke",
        type: ["boolean"],
        description:
          "Whether to show the colorful stroke on the leading edge of the wipe.",
        default: "true",
      },
      {
        name: "showTrailingStroke",
        type: ["boolean"],
        description:
          "Whether to show the colorful stroke on the trailing edge of the wipe.",
        default: "true",
      },
      {
        name: "strokeWidth",
        type: ["number"],
        description:
          "The width (or height for vertical directions) of the colorful doodle stroke in pixels.",
        default: "10",
      },
      {
        name: "leadingStrokeColors",
        type: ["string[]"],
        description:
          "Array of hex colors to use for the colorful doodle accents on the leading edge of the wipe.",
        default: '["#facc15", "#ec4899", "#38bdf8", ...]',
      },
      {
        name: "trailingStrokeColors",
        type: ["string[]"],
        description:
          "Array of hex colors to use for the colorful doodle accents on the trailing edge of the wipe.",
        default: '["#facc15", "#ec4899", "#38bdf8", ...]',
      },
    ],
    usageCode: `// 1. General Setup (All React Frameworks)
// The RouteTransitionProvider is framework-agnostic. Wrap your app with it 
// and pass your router's navigation function to the 'navigate' prop.
import { RouteTransitionProvider } from "@/components/ui/ColorWipePageTransition";

export function AppWrapper({ children }) {
  // Get your framework's router hook here (e.g. useRouter, useNavigate, useLocation)
  const navigate = (url: string) => { /* your router push function */ };
  
  return (
    <RouteTransitionProvider navigate={navigate}>
      {children}
    </RouteTransitionProvider>
  );
}


// 2. Next.js App Router Setup
// Create a client-side wrapper in a new file (e.g. components/TransitionWrapper.tsx):
"use client";
import { useRouter } from "next/navigation";
import { RouteTransitionProvider } from "@/components/ui/ColorWipePageTransition";

export function TransitionWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  
  return (
    <RouteTransitionProvider navigate={(url) => router.push(url)}>
      {children}
    </RouteTransitionProvider>
  );
}

// Then wrap your application in layout.tsx:
// <TransitionWrapper>{children}</TransitionWrapper>


// 3. React Router (Vite / Remix) Setup
// Simply wrap your Routes with the provider and pass the navigate hook:
import { useNavigate, Routes, Route } from "react-router-dom";
import { RouteTransitionProvider } from "@/components/ui/ColorWipePageTransition";

export function AppShell() {
  const navigate = useNavigate();

  return (
    <RouteTransitionProvider navigate={navigate}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </RouteTransitionProvider>
  );
}`,
  },
  {
    slug: "split-line-fly-in",
    category: "Typography",
    preview: "https://ik.imagekit.io/zoffdbb7mk/flyIntext.mp4",
    name: "Split Line Fly In",
    description:
      "A scroll-driven text animation component where lines fly in from opposite sides of the viewport and settle at the center.",
    interactionType:
      "Lines fly in from left and right boundaries as the user scrolls down.",
    dependencies: ["motion"],
    previewFile: "SplitLineFlyInPreview",
    props: [
      {
        name: "text",
        type: ["string"],
        description:
          "The paragraph text to automatically measure and split into visual lines.",
      },
      {
        name: "lines",
        type: ["string[]"],
        description:
          "An explicit array of lines to animate, bypassing dynamic layout detection.",
      },
      {
        name: "direction",
        type: ["'left'", "'right'", "'alternate'"],
        description: "The entry direction of the lines.",
        default: '"alternate"',
      },
      {
        name: "itemClassName",
        type: ["string"],
        description: "Additional CSS classes to apply to each line element.",
      },
      {
        name: "scrollContainerRef",
        type: ["React.RefObject<HTMLElement | null>"],
        description: "Optional ref for a custom scroll container.",
      },
      {
        name: "offset",
        type: ["string[]"],
        description:
          "Scroll container offsets defining animation start and end points.",
        default: '["start end", "end 60%"]',
      },
      {
        name: "flyInDistance",
        type: ["string"],
        description: "Horizontal translation starting distance (e.g., '70vw').",
        default: '"70vw"',
      },
      {
        name: "blurStart",
        type: ["string"],
        description: "Initial CSS blur filter intensity (e.g., '12px').",
        default: '"12px"',
      },
      {
        name: "wordSpacingStart",
        type: ["string"],
        description: "Initial word spacing value (e.g., '2.5em').",
        default: '"2.5em"',
      },
      {
        name: "wordSpacingEnd",
        type: ["string"],
        description: "Final word spacing value (e.g., '0.25em').",
        default: '"0.25em"',
      },
      {
        name: "staggerFactor",
        type: ["number"],
        description: "Speed stagger factor between line entries.",
        default: "0.6",
      },
      {
        name: "animationDuration",
        type: ["number"],
        description: "Animation scroll range duration for each line.",
        default: "0.4",
      },
    ],
  },
  {
    slug: "blur-scroll-reveal",
    category: "Typography",
    preview: "https://ik.imagekit.io/zoffdbb7mk/BlurTextScroll.mp4",
    name: "Blur Scroll Reveal",
    description:
      "A scroll-driven text animation component where words or lines fade and transition from blur to sharp as they scroll into view.",
    interactionType:
      "Text blurs and fades in as the container scrolls through the viewport.",
    dependencies: ["motion"],
    previewFile: "BlurScrollRevealPreview",
    props: [
      {
        name: "text",
        type: ["string"],
        description: "The text content to animate.",
        default: '"Grinding Hard"',
      },
      {
        name: "variant",
        type: ["'word'", "'line'"],
        description: "Whether to animate word-by-word or visual line-by-line.",
        default: '"word"',
      },
      {
        name: "itemClassName",
        type: ["string"],
        description: "Additional CSS classes to apply to each text element.",
      },
      {
        name: "scrollContainerRef",
        type: ["React.RefObject<HTMLElement | null>"],
        description: "Optional ref for a custom scroll container.",
      },
      {
        name: "offset",
        type: ["string[]"],
        description:
          "Scroll container offsets defining animation start and end points.",
        default: '["start end", "end 60%"]',
      },
      {
        name: "opacity",
        type: ["number[]"],
        description:
          "An array defining start and end opacity values (e.g., [0, 1]).",
        default: "[0, 1]",
      },
      {
        name: "blur",
        type: ["string[]"],
        description:
          "An array defining start and end blur intensity values (e.g., ['12px', '0px']).",
        default: '["12px", "0px"]',
      },
      {
        name: "y",
        type: ["(string | number)[]"],
        description:
          "An array defining start and end vertical translation values (e.g., ['10px', '0px']).",
        default: '["10px", "0px"]',
      },
      {
        name: "scale",
        type: ["number[]"],
        description:
          "An array defining start and end scale values (e.g., [1, 1]).",
        default: "[1, 1]",
      },
      {
        name: "containerClassName",
        type: ["string"],
        description:
          "Additional CSS classes to apply to the inner wrapper container.",
      },
      {
        name: "staggerFactor",
        type: ["number"],
        description: "Relative speed stagger factor between entries.",
        default: "0.85",
      },
      {
        name: "animationDuration",
        type: ["number"],
        description: "Animation scroll range duration for each element.",
        default: "0.12",
      },
    ],
  },
  {
    slug: "word-focus-scroll",
    category: "Typography",
    preview: "https://ik.imagekit.io/zoffdbb7mk/wordFocus.mp4",
    name: "Word Focus Scroll",
    description:
      "A scroll-driven text focusing component where individual words scale up, unblur, and fade in sequentially on scroll and lock into focus.",
    interactionType:
      "Words dynamically focus (fade in, scale up, and unblur) one by one in a staggered sequence relative to scroll progress, remaining fully focused once revealed.",
    dependencies: ["motion"],
    previewFile: "WordFocusScrollPreview",
    props: [
      {
        name: "text",
        type: ["string"],
        description: "The paragraph text to animate.",
      },
      {
        name: "minScale",
        type: ["number"],
        description:
          "The minimum scale applied to blurred/dimmed words before focus.",
        default: "0.85",
      },
      {
        name: "maxBlur",
        type: ["number"],
        description:
          "The maximum CSS blur radius in pixels applied to out-of-focus words.",
        default: "6",
      },
      {
        name: "minOpacity",
        type: ["number"],
        description: "The minimum opacity applied to out-of-focus words.",
        default: "0",
      },
      {
        name: "staggerFactor",
        type: ["number"],
        description:
          "Relative speed stagger factor across the entire word list.",
        default: "0.8",
      },
      {
        name: "wordDuration",
        type: ["number"],
        description:
          "Animation scroll range duration for each individual word focus.",
        default: "0.1",
      },
      {
        name: "itemClassName",
        type: ["string"],
        description: "Additional CSS classes to style the text elements.",
      },
      {
        name: "scrollContainerRef",
        type: ["React.RefObject<HTMLElement | null>"],
        description: "Optional ref for a custom scroll container.",
      },
      {
        name: "offset",
        type: ["string[]"],
        description:
          "Scroll container offsets defining the active viewport focus window.",
        default: '["start 90%", "end 60%"]',
      },
    ],
  },
  {
    slug: "swipe-theme-change",
    category: "Theme Transitions",
    name: "Swipe Theme Provider",
    description:
      "A transition manager that switches between light and dark themes using a directional wipe/swipe transition via the Web View Transition API.",
    interactionType:
      "Triggered programmatically or using directional controls. Wipes the screen in the selected direction.",
    preview: "https://ik.imagekit.io/zoffdbb7mk/GUI-SwipeThemeProviders.mp4",
    dependencies: [],
    previewFile: "SwipeThemeChangePreview",
    props: [
      {
        name: "duration",
        type: ["number"],
        description: "Duration of the swipe transition in milliseconds.",
        default: "650",
      },
      {
        name: "easing",
        type: ["string"],
        description: "The CSS transition easing function.",
        default: "'ease-in-out'",
      },
      {
        name: "onSwipe",
        type: ["() => void"],
        description:
          "An optional callback triggered during the view transition update phase.",
      },
      {
        name: "theme",
        type: ["'light' | 'dark'"],
        description: "Optional controlled theme state parameter.",
      },
      {
        name: "onThemeChange",
        type: ["(theme: 'light' | 'dark') => void"],
        description: "An optional callback triggered when the theme toggles.",
      },
      {
        name: "getKeyframes",
        type: ["(dir: SwipeDirection) => Keyframe[]"],
        description:
          "Optional callback function returning custom animation keyframes based on swipe direction.",
      },
      {
        name: "direction",
        type: ["SwipeDirection"],
        description:
          "The default transition direction: short presets ('left', 'right', 'top', 'bottom'), corner presets ('top-left', 'top-right', 'bottom-left', 'bottom-right'), or long names.",
        default: "'left'",
      },
      {
        name: "angle",
        type: ["number"],
        description: "Relative slant offset in degrees to angle linear swipes.",
        default: "0",
      },
    ],
    usageCode: `// 1. Wrap your application root (e.g. app/layout.tsx in Next.js or App.tsx in Vite)
import SwipeThemeProvider from "@/components/ui/SwipeThemeProvider";

export default function RootLayout({ children }) {
  return (
    <SwipeThemeProvider angle={15}>
      {children}
    </SwipeThemeProvider>
  );
}

// 2. Trigger transitions in any child component using the useSwipeTheme hook
import { useSwipeTheme } from "@/components/ui/SwipeThemeProvider";

export function CustomThemeToggle() {
  const { triggerSwipe, isAnimating, theme } = useSwipeTheme();

  return (
    <button
      disabled={isAnimating}
      onClick={() => triggerSwipe("left")}
      className="px-4 py-2 bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 rounded-lg font-bold"
    >
      Active: {theme}
    </button>
  );
}`,
  },
  {
    slug: "circular-theme-provider",
    category: "Theme Transitions",
    name: "Circular Theme Provider",
    description:
      "A transition manager that switches between light and dark themes using a custom circular clip-path view transition centered at the user's cursor position or specified coordinates.",
    interactionType:
      "Triggered by user clicks or programmatically. Wipes the screen outward in an expanding circle.",
    preview: "https://ik.imagekit.io/zoffdbb7mk/GUI-CircularThemeProvider.mp4",
    dependencies: [],
    previewFile: "CircularThemeProviderPreview",
    props: [
      {
        name: "duration",
        type: ["number"],
        description: "Duration of the circle-wipe transition in milliseconds.",
        default: "500",
      },
      {
        name: "easing",
        type: ["string"],
        description: "The CSS transition easing function.",
        default: "'ease-in-out'",
      },
      {
        name: "onTransition",
        type: ["() => void"],
        description:
          "An optional callback triggered during the view transition update phase.",
      },
      {
        name: "theme",
        type: ["'light' | 'dark'"],
        description: "Optional controlled theme state parameter.",
      },
      {
        name: "onThemeChange",
        type: ["(theme: 'light' | 'dark') => void"],
        description: "An optional callback triggered when the theme toggles.",
      },
      {
        name: "defaultCenter",
        type: ["TransitionOrigin"],
        description:
          "Default center origin: presets ('top-left', 'top-right', 'bottom-left', 'bottom-right', 'center'), coordinate object ({x, y}), mouse event, or HTMLElement.",
      },
    ],
    usageCode: `// 1. Wrap your application root (e.g. app/layout.tsx in Next.js or App.tsx in Vite)
import CircularThemeProvider from "@/components/ui/CircularThemeProvider";

export default function RootLayout({ children }) {
  return (
    <CircularThemeProvider>
      {children}
    </CircularThemeProvider>
  );
}

// 2. Trigger transitions in any child component using the useCircularTheme hook
import { useCircularTheme } from "@/components/ui/CircularThemeProvider";

export function CustomThemeToggle() {
  const { triggerTransition, isAnimating, theme } = useCircularTheme();

  return (
    <button
      disabled={isAnimating}
      onClick={(e) => triggerTransition(e)}
      className="px-4 py-2 bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 rounded-lg font-bold"
    >
      Active: {theme}
    </button>
  );
}`,
  },
  {
    slug: "split-theme-provider",
    category: "Theme Transitions",
    name: "Split Theme Provider",
    description:
      "A transition manager that switches between light and dark themes using a vertical or horizontal split transition starting from the center (in-to-out) or edges (out-to-in).",
    interactionType:
      "Triggered programmatically or using control buttons. Splits the viewport outward from the center, or inward from the edges.",
    preview: "https://ik.imagekit.io/zoffdbb7mk/GUI-SplitThemeProvider.mp4",
    dependencies: [],
    previewFile: "SplitThemeProviderPreview",
    props: [
      {
        name: "duration",
        type: ["number"],
        description: "Duration of the split transition in milliseconds.",
        default: "600",
      },
      {
        name: "easing",
        type: ["string"],
        description: "The CSS transition easing function.",
        default: "'ease-in-out'",
      },
      {
        name: "onTransition",
        type: ["() => void"],
        description:
          "An optional callback triggered during the view transition update phase.",
      },
      {
        name: "theme",
        type: ["'light' | 'dark'"],
        description: "Optional controlled theme state parameter.",
      },
      {
        name: "onThemeChange",
        type: ["(theme: 'light' | 'dark') => void"],
        description: "An optional callback triggered when the theme toggles.",
      },
      {
        name: "direction",
        type: ["'horizontal' | 'vertical'"],
        description: "The default split transition direction.",
        default: "'horizontal'",
      },
      {
        name: "mode",
        type: ["'in-to-out' | 'out-to-in'"],
        description:
          "Whether the split starts at the center and splits outward, or at the edges and meets in the middle.",
        default: "'in-to-out'",
      },
    ],
    usageCode: `// 1. Wrap your application root (e.g. app/layout.tsx in Next.js or App.tsx in Vite)
import SplitThemeProvider from "@/components/ui/SplitThemeProvider";

export default function RootLayout({ children }) {
  return (
    <SplitThemeProvider direction="horizontal" mode="in-to-out">
      {children}
    </SplitThemeProvider>
  );
}

// 2. Trigger transitions in any child component using the useSplitTheme hook
import { useSplitTheme } from "@/components/ui/SplitThemeProvider";

export function CustomThemeToggle() {
  const { triggerTransition, isAnimating, theme } = useSplitTheme();

  return (
    <button
      disabled={isAnimating}
      onClick={() => triggerTransition("horizontal", "out-to-in")}
      className="px-4 py-2 bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 rounded-lg font-bold"
    >
      Active: {theme}
    </button>
  );
}`,
  },
  {
    slug: "curtain-page-transition",
    category: "Page Transitions",
    name: "Curtain Page Transition",
    description:
      "A premium curtain split transition effect that splits horizontally or vertically to reveal new content, built with Framer Motion.",
    interactionType:
      "Programmatically triggered on route change or view swaps, splitting the viewport in two halves that slide outwards to reveal the next state.",
    dependencies: ["motion"],
    previewFile: "CurtainPageTransitionPreview",
    preview: "https://ik.imagekit.io/niqgaoeg3/GUI-Curtain-Transition.mp4",
    props: [
      {
        name: "trigger",
        type: ["number"],
        description:
          "Value key to programmatically trigger the transition overlay.",
        default: "0",
      },
      {
        name: "onViewSwap",
        type: ["() => void"],
        description:
          "Callback fired at mid-transition to perform state/view swaps.",
      },
      {
        name: "className",
        type: ["string"],
        description: "Additional CSS classes to style the container wrapper.",
      },
      {
        name: "panelClassName",
        type: ["string"],
        description:
          "Additional CSS classes to style the individual curtain halves.",
      },
      {
        name: "duration",
        type: ["number"],
        description: "The duration of the animation for each half in seconds.",
        default: "0.8",
      },
      {
        name: "ease",
        type: ["string", "number[]"],
        description:
          "The bezier curve easing array or string for the animation.",
        default: "[0.76, 0, 0.24, 1]",
      },
      {
        name: "direction",
        type: ["'vertical'", "'horizontal'"],
        description:
          "The axis along which the curtain splits. Vertical splits horizontally (slides up/down), Horizontal splits vertically (slides left/right).",
        default: "'horizontal'",
      },
    ],
    usageCode: `// 1. General Setup (All React Frameworks)
import { RouteTransitionProvider } from "@/components/ui/CurtainPageTransition";

export function AppWrapper({ children }) {
  const navigate = (url: string) => { /* your router push function */ };
  
  return (
    <RouteTransitionProvider navigate={navigate}>
      {children}
    </RouteTransitionProvider>
  );
}

// 2. Next.js App Router Setup
"use client";
import { useRouter } from "next/navigation";
import { RouteTransitionProvider } from "@/components/ui/CurtainPageTransition";

export function TransitionWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  
  return (
    <RouteTransitionProvider navigate={(url) => router.push(url)} panelClassName="bg-rose-500">
      {children}
    </RouteTransitionProvider>
  );
}

// 3. React Router (Vite / Remix) Setup
import { useNavigate, Routes, Route } from "react-router-dom";
import { RouteTransitionProvider } from "@/components/ui/CurtainPageTransition";

export function AppShell() {
  const navigate = useNavigate();

  return (
    <RouteTransitionProvider navigate={navigate}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </RouteTransitionProvider>
  );
}`,
  },
  {
    slug: "interlocking-page-transition",
    category: "Page Transitions",
    name: "Interlocking Page Transition",
    description:
      "A premium full-screen transition where columns (vertical) or rows (horizontal) enter from opposite sides (interlocking) and exit along the same path, built with Framer Motion.",
    interactionType:
      "Programmatically triggered on route change or view swaps, showing full-screen interlocking columns entering from top/bottom or left/right and sliding away to reveal content.",
    dependencies: ["motion"],
    previewFile: "InterlockingPageTransitionPreview",
    preview:
      "https://ik.imagekit.io/niqgaoeg3/GUI-Interlocking-Page-Transition.mp4",
    props: [
      {
        name: "trigger",
        type: ["number"],
        description:
          "Value key to programmatically trigger the transition overlay.",
        default: "0",
      },
      {
        name: "onViewSwap",
        type: ["() => void"],
        description:
          "Callback fired when the screen is fully covered mid-transition to perform state/view swaps.",
      },
      {
        name: "className",
        type: ["string"],
        description: "Additional CSS classes to style the container wrapper.",
      },
      {
        name: "panelClassName",
        type: ["string"],
        description:
          "Additional CSS classes to style the individual interlocking panels.",
      },
      {
        name: "duration",
        type: ["number"],
        description: "The duration of the column slide animation in seconds.",
        default: "0.8",
      },
      {
        name: "ease",
        type: ["string", "number[]"],
        description:
          "The bezier curve easing array or string for the animation.",
        default: "[0.76, 0, 0.24, 1]",
      },
      {
        name: "columns",
        type: ["number"],
        description: "The number of interlocking columns or rows to render.",
        default: "4",
      },
      {
        name: "direction",
        type: ["'vertical'", "'horizontal'"],
        description:
          "The layout and movement orientation of the interlocking columns.",
        default: "'vertical'",
      },
    ],
    usageCode: `// 1. General Setup (All React Frameworks)
import { RouteTransitionProvider } from "@/components/ui/InterlockingPageTransition";

export function AppWrapper({ children }) {
  const navigate = (url: string) => { /* your router push function */ };
  
  return (
    <RouteTransitionProvider navigate={navigate} columns={4} direction="vertical">
      {children}
    </RouteTransitionProvider>
  );
}

// 2. Next.js App Router Setup
"use client";
import { useRouter } from "next/navigation";
import { RouteTransitionProvider } from "@/components/ui/InterlockingPageTransition";

export function TransitionWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  
  return (
    <RouteTransitionProvider navigate={(url) => router.push(url)} columns={6} direction="horizontal">
      {children}
    </RouteTransitionProvider>
  );
}

// 3. React Router (Vite / Remix) Setup
import { useNavigate, Routes, Route } from "react-router-dom";
import { RouteTransitionProvider } from "@/components/ui/InterlockingPageTransition";

export function AppShell() {
  const navigate = useNavigate();

  return (
    <RouteTransitionProvider navigate={navigate}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </RouteTransitionProvider>
  );
}`,
  },
  {
    slug: "sweep-page-transition",
    category: "Page Transitions",
    name: "Sweep Page Transition",
    description:
      "A premium multi-layered wipe screen transition that animates overlapping sheets of color in sequence across the viewport.",
    interactionType:
      "Programmatically triggered on route change or view swaps, showing three overlapping solid color sweeps sliding in sequence and sliding offscreen in reverse order to reveal content.",
    dependencies: ["motion"],
    previewFile: "SweepPageTransitionPreview",
    preview: "https://ik.imagekit.io/niqgaoeg3/GUI-Sweep-Page-Transition.mp4",
    props: [
      {
        name: "trigger",
        type: ["number"],
        description:
          "Value key to programmatically trigger the transition overlay.",
        default: "0",
      },
      {
        name: "onViewSwap",
        type: ["() => void"],
        description:
          "Callback fired when the screen is fully covered mid-transition to perform state/view swaps.",
      },
      {
        name: "className",
        type: ["string"],
        description: "Additional CSS classes to style the container wrapper.",
      },
      {
        name: "colors",
        type: ["string[]"],
        description:
          "An array of hex or CSS colors mapping to sequential wipe layers.",
        default: `["#e2e8f0", "#cbd5e1", "#94a3b8"]`,
      },
      {
        name: "duration",
        type: ["number"],
        description:
          "The duration of the sweep animation for each layer in seconds.",
        default: "0.7",
      },
      {
        name: "staggerDelay",
        type: ["number"],
        description: "The delay between successive sweep layers in seconds.",
        default: "0.1",
      },
      {
        name: "ease",
        type: ["string", "number[]"],
        description:
          "The bezier curve easing array or string for the animation.",
        default: "[0.76, 0, 0.24, 1]",
      },
      {
        name: "direction",
        type: ["'top'", "'bottom'", "'left'", "'right'"],
        description: "The sweep wipe starting direction.",
        default: "'left'",
      },
      {
        name: "exitOpposite",
        type: ["boolean"],
        description:
          "Whether layers exit off to the opposite side of entry or retract back.",
        default: "true",
      },
    ],
    usageCode: `// 1. General Setup (All React Frameworks)
import { RouteTransitionProvider } from "@/components/ui/SweepPageTransition";

export function AppWrapper({ children }) {
  const navigate = (url: string) => { /* your router push function */ };
  
  return (
    <RouteTransitionProvider navigate={navigate} colors={["#fda4af", "#f43f5e", "#be123c"]}>
      {children}
    </RouteTransitionProvider>
  );
}

// 2. Next.js App Router Setup
"use client";
import { useRouter } from "next/navigation";
import { RouteTransitionProvider } from "@/components/ui/SweepPageTransition";

export function TransitionWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  
  return (
    <RouteTransitionProvider navigate={(url) => router.push(url)} duration={0.8}>
      {children}
    </RouteTransitionProvider>
  );
}

// 3. React Router (Vite / Remix) Setup
import { useNavigate, Routes, Route } from "react-router-dom";
import { RouteTransitionProvider } from "@/components/ui/SweepPageTransition";

export function AppShell() {
  const navigate = useNavigate();

  return (
    <RouteTransitionProvider navigate={navigate}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </RouteTransitionProvider>
  );
}`,
  },
  {
    slug: "pixel-page-transition",
    category: "Page Transitions",
    name: "Pixel Page Transition",
    description:
      "A full-screen block pixel dissolve page transition where grids of random shuffled pixels fade in and out using Framer Motion.",
    interactionType:
      "Programmatically triggered on route change or view swaps, filling the screen with a grid of block pixels in a shuffled random order, then dissolving them to reveal content.",
    dependencies: ["motion"],
    previewFile: "PixelPageTransitionPreview",
    preview: "https://ik.imagekit.io/niqgaoeg3/GUI-Pixel-page-Transition.mp4",
    props: [
      {
        name: "trigger",
        type: ["number"],
        description:
          "Value key to programmatically trigger the transition overlay.",
        default: "0",
      },
      {
        name: "onViewSwap",
        type: ["() => void"],
        description:
          "Callback fired when the screen is fully covered mid-transition to perform state/view swaps.",
      },
      {
        name: "className",
        type: ["string"],
        description: "Additional CSS classes to style the grid wrapper.",
      },
      {
        name: "panelClassName",
        type: ["string"],
        description:
          "Additional CSS classes to style the individual grid pixels.",
      },
      {
        name: "pixelSize",
        type: ["number"],
        description: "Target base size of each pixel grid cell in pixels.",
        default: "40",
      },
      {
        name: "duration",
        type: ["number"],
        description:
          "The scale/fade transition duration of individual cells in seconds.",
        default: "0.2",
      },
      {
        name: "staggerDuration",
        type: ["number"],
        description:
          "The maximum delay stagger range for shuffled pixel animations in seconds.",
        default: "0.4",
      },
    ],
    usageCode: `// 1. General Setup (All React Frameworks)
import { RouteTransitionProvider } from "@/components/ui/PixelPageTransition";

export function AppWrapper({ children }) {
  const navigate = (url: string) => { /* your router push function */ };
  
  return (
    <RouteTransitionProvider navigate={navigate} pixelSize={40}>
      {children}
    </RouteTransitionProvider>
  );
}

// 2. Next.js App Router Setup
"use client";
import { useRouter } from "next/navigation";
import { RouteTransitionProvider } from "@/components/ui/PixelPageTransition";

export function TransitionWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  
  return (
    <RouteTransitionProvider navigate={(url) => router.push(url)}>
      {children}
    </RouteTransitionProvider>
  );
}

// 3. React Router (Vite / Remix) Setup
import { useNavigate, Routes, Route } from "react-router-dom";
import { RouteTransitionProvider } from "@/components/ui/PixelPageTransition";

export function AppShell() {
  const navigate = useNavigate();

  return (
    <RouteTransitionProvider navigate={navigate}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </RouteTransitionProvider>
  );
}`,
  },
  {
    slug: "sine-wave-page-transition",
    category: "Page Transitions",
    name: "Sine Wave Page Transition",
    description:
      "A visually stunning full-screen wipe transition where staggered panels ripple in and out in a normalized sine wave delay pattern.",
    interactionType:
      "Programmatically triggered on route change or view swaps, showing a smooth staggered sine wave curtain drop or row sweep across the viewport.",
    dependencies: ["motion"],
    previewFile: "SineWavePageTransitionPreview",
    preview:
      "https://ik.imagekit.io/niqgaoeg3/GUI-Sine-Wave-Page-Transition.mp4",
    props: [
      {
        name: "trigger",
        type: ["number"],
        description:
          "Value key to programmatically trigger the transition overlay.",
        default: "0",
      },
      {
        name: "onViewSwap",
        type: ["() => void"],
        description:
          "Callback fired when the screen is fully covered mid-transition to perform state/view swaps.",
      },
      {
        name: "className",
        type: ["string"],
        description: "Additional CSS classes to style the container wrapper.",
      },
      {
        name: "panelClassName",
        type: ["string"],
        description:
          "Additional CSS classes to style the individual wave panels.",
      },
      {
        name: "columns",
        type: ["number"],
        description:
          "The number of vertical columns or horizontal rows forming the wave.",
        default: "20",
      },
      {
        name: "duration",
        type: ["number"],
        description:
          "The duration of each column/row slide animation in seconds.",
        default: "0.5",
      },
      {
        name: "maxDelay",
        type: ["number"],
        description:
          "The maximum stagger delay amplitude added by the normalized sine wave in seconds.",
        default: "0.4",
      },
      {
        name: "ease",
        type: ["string", "number[]"],
        description:
          "The bezier curve easing array or string for the animation.",
        default: "[0.76, 0, 0.24, 1]",
      },
      {
        name: "direction",
        type: ["'top'", "'bottom'", "'left'", "'right'"],
        description:
          "The entry direction of the wave panels (also determines orientation).",
        default: "'top'",
      },
      {
        name: "exitOpposite",
        type: ["boolean"],
        description:
          "Whether wave panels exit off to the opposite side of entry or bounce back.",
        default: "true",
      },
    ],
    usageCode: `// 1. General Setup (All React Frameworks)
import { RouteTransitionProvider } from "@/components/ui/SineWavePageTransition";

export function AppWrapper({ children }) {
  const navigate = (url: string) => { /* your router push function */ };
  
  return (
    <RouteTransitionProvider navigate={navigate} columns={20} maxDelay={0.4}>
      {children}
    </RouteTransitionProvider>
  );
}

// 2. Next.js App Router Setup
"use client";
import { useRouter } from "next/navigation";
import { RouteTransitionProvider } from "@/components/ui/SineWavePageTransition";

export function TransitionWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  
  return (
    <RouteTransitionProvider navigate={(url) => router.push(url)} columns={30} direction="left">
      {children}
    </RouteTransitionProvider>
  );
}

// 3. React Router (Vite / Remix) Setup
import { useNavigate, Routes, Route } from "react-router-dom";
import { RouteTransitionProvider } from "@/components/ui/SineWavePageTransition";

export function AppShell() {
  const navigate = useNavigate();

  return (
    <RouteTransitionProvider navigate={navigate}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </RouteTransitionProvider>
  );
}`,
  },
  {
    slug: "cascade-page-transition",
    category: "Page Transitions",
    name: "Cascade Page Transition",
    description:
      "A vibrant, cascading full-screen page transition where columns or rows sweep in an in-to-out or out-to-in V-pattern with optional edge stroke outline accents.",
    interactionType:
      "Programmatically triggered on route change or view swaps, showing a cascade of colored stripes with customizable borders.",
    dependencies: ["motion"],
    previewFile: "CascadePageTransitionPreview",
    preview: "https://ik.imagekit.io/niqgaoeg3/GUI-Cascade-Page-Transition.mp4",
    props: [
      {
        name: "trigger",
        type: ["number"],
        description:
          "Value key to programmatically trigger the transition overlay.",
        default: "0",
      },
      {
        name: "onViewSwap",
        type: ["() => void"],
        description:
          "Callback fired when the screen is fully covered mid-transition to perform state/view swaps.",
      },
      {
        name: "className",
        type: ["string"],
        description: "Additional CSS classes to style the container wrapper.",
      },
      {
        name: "panelClassName",
        type: ["string"],
        description:
          "Additional CSS classes to style the individual colored stripes.",
      },
      {
        name: "columns",
        type: ["number"],
        description:
          "The number of vertical columns or horizontal rows to render.",
        default: "14",
      },
      {
        name: "colors",
        type: ["string[]"],
        description: "Array of colors forming the solid stripe sequence.",
      },
      {
        name: "duration",
        type: ["number"],
        description: "The slide animation duration of each panel in seconds.",
        default: "0.55",
      },
      {
        name: "staggerDelay",
        type: ["number"],
        description: "Symmetrical cascade delay increment in seconds.",
        default: "0.035",
      },
      {
        name: "ease",
        type: ["string", "number[]"],
        description:
          "The bezier curve easing array or string for the animation.",
        default: "[0.76, 0, 0.24, 1]",
      },
      {
        name: "direction",
        type: ["'top'", "'bottom'", "'left'", "'right'"],
        description:
          "The entry direction of the solid stripes (also determines orientation).",
        default: "'top'",
      },
      {
        name: "exitOpposite",
        type: ["boolean"],
        description:
          "Whether panels exit off to the opposite side of entry or bounce back.",
        default: "true",
      },
      {
        name: "mode",
        type: ["'in-to-out'", "'out-to-in'"],
        description:
          "Whether stripes enter from the center outwards or from edges inwards.",
        default: "'in-to-out'",
      },
      {
        name: "showLeadingStroke",
        type: ["boolean"],
        description:
          "Whether to render a stroke outline on the leading edge of the sweeps.",
        default: "false",
      },
      {
        name: "showTrailingStroke",
        type: ["boolean"],
        description:
          "Whether to render a stroke outline on the trailing edge of the sweeps.",
        default: "false",
      },
      {
        name: "strokeWidth",
        type: ["number"],
        description: "Stroke border thickness in pixels.",
        default: "10",
      },
      {
        name: "leadingStrokeColors",
        type: ["string[]"],
        description: "Array of colors forming the leading edge strokes.",
      },
      {
        name: "trailingStrokeColors",
        type: ["string[]"],
        description: "Array of colors forming the trailing edge strokes.",
      },
    ],
    usageCode: `// 1. General Setup (All React Frameworks)
import { RouteTransitionProvider } from "@/components/ui/CascadePageTransition";

export function AppWrapper({ children }) {
  const navigate = (url: string) => { /* your router push function */ };
  
  return (
    <RouteTransitionProvider navigate={navigate} columns={14}>
      {children}
    </RouteTransitionProvider>
  );
}

// 2. Next.js App Router Setup
"use client";
import { useRouter } from "next/navigation";
import { RouteTransitionProvider } from "@/components/ui/CascadePageTransition";

export function TransitionWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  
  return (
    <RouteTransitionProvider navigate={(url) => router.push(url)} direction="left" columns={10}>
      {children}
    </RouteTransitionProvider>
  );
}

// 3. React Router (Vite / Remix) Setup
import { useNavigate, Routes, Route } from "react-router-dom";
import { RouteTransitionProvider } from "@/components/ui/CascadePageTransition";

export function AppShell() {
  const navigate = useNavigate();

  return (
    <RouteTransitionProvider navigate={navigate}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </RouteTransitionProvider>
  );
}`,
  },
  {
    slug: "venetian-blinds-page-transition",
    category: "Page Transitions",
    name: "Venetian Blinds Page Transition",
    description:
      "A clean full-screen venetian blinds page transition where horizontal or vertical slats scale/rotate open and closed staggered in configurable layouts.",
    interactionType:
      "Programmatically triggered on route change or view swaps, showing a staggered 3D venetian blinds scale-reveal across the viewport.",
    dependencies: ["motion"],
    previewFile: "VenetianBlindsPageTransitionPreview",
    preview:
      "https://ik.imagekit.io/niqgaoeg3/GUI-Venetian-Blinds-Page-Transition.mp4",
    props: [
      {
        name: "trigger",
        type: ["number"],
        description:
          "Value key to programmatically trigger the transition overlay.",
        default: "0",
      },
      {
        name: "onViewSwap",
        type: ["() => void"],
        description:
          "Callback fired when the screen is fully covered mid-transition to perform state/view swaps.",
      },
      {
        name: "className",
        type: ["string"],
        description: "Additional CSS classes to style the container wrapper.",
      },
      {
        name: "panelClassName",
        type: ["string"],
        description:
          "Additional CSS classes to style the individual blinds panels.",
      },
      {
        name: "columns",
        type: ["number"],
        description: "The number of shutter flap columns or rows.",
        default: "20",
      },
      {
        name: "duration",
        type: ["number"],
        description:
          "The flip/scale transition duration of each panel in seconds.",
        default: "0.5",
      },
      {
        name: "staggerDelay",
        type: ["number"],
        description:
          "Stagger delay increment between adjacent shutters in seconds.",
        default: "0.02",
      },
      {
        name: "staggerType",
        type: ["'linear'", "'center-out'", "'edge-in'"],
        description:
          "Symmetrical delay layouts (linear waterfall, center-out, or edge-in).",
        default: "'linear'",
      },
      {
        name: "ease",
        type: ["string", "number[]"],
        description:
          "The bezier curve easing array or string for the animation.",
        default: "[0.76, 0, 0.24, 1]",
      },
      {
        name: "direction",
        type: ["'horizontal'", "'vertical'"],
        description:
          "Orientation layout (horizontal rows scaleY or vertical columns scaleX).",
        default: "'horizontal'",
      },
      {
        name: "origin",
        type: ["'center'", "'top'", "'bottom'", "'left'", "'right'"],
        description: "Transform scaling origin pivot.",
        default: "'center'",
      },
    ],
    usageCode: `// 1. General Setup (All React Frameworks)
import { RouteTransitionProvider } from "@/components/ui/VenetianBlindsPageTransition";

export function AppWrapper({ children }) {
  const navigate = (url: string) => { /* your router push function */ };
  
  return (
    <RouteTransitionProvider navigate={navigate} columns={20} staggerType="center-out">
      {children}
    </RouteTransitionProvider>
  );
}

// 2. Next.js App Router Setup
"use client";
import { useRouter } from "next/navigation";
import { RouteTransitionProvider } from "@/components/ui/VenetianBlindsPageTransition";

export function TransitionWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  
  return (
    <RouteTransitionProvider navigate={(url) => router.push(url)} direction="vertical" origin="left">
      {children}
    </RouteTransitionProvider>
  );
}

// 3. React Router (Vite / Remix) Setup
import { useNavigate, Routes, Route } from "react-router-dom";
import { RouteTransitionProvider } from "@/components/ui/VenetianBlindsPageTransition";

export function AppShell() {
  const navigate = useNavigate();

  return (
    <RouteTransitionProvider navigate={navigate}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </RouteTransitionProvider>
  );
}`,
  },
  {
    slug: "blur-fade-theme-transition",
    category: "Theme Transitions",
    name: "Blur Fade Theme Transition",
    description:
      "A simple and elegant theme provider that cross-fades and blurs between light and dark modes.",
    interactionType:
      "Triggered programmatically. Smoothly cross-fades and blurs the screen during theme changes.",
    preview:
      "https://ik.imagekit.io/niqgaoeg3/GUI-blur-fade-theme-transition.mp4",
    dependencies: [],
    previewFile: "BlurFadeThemeTransitionPreview",
    props: [
      {
        name: "duration",
        type: ["number"],
        description: "Duration of the blur transition in milliseconds.",
        default: "500",
      },
      {
        name: "maxBlur",
        type: ["number"],
        description: "Maximum blur applied during the transition (in px).",
        default: "16",
      },
      {
        name: "theme",
        type: ["'light' | 'dark'"],
        description: "Optional controlled theme state parameter.",
      },
      {
        name: "onThemeChange",
        type: ["(theme: 'light' | 'dark') => void"],
        description: "An optional callback triggered when the theme toggles.",
      },
    ],
    usageCode: `// 1. Wrap your application root (e.g. app/layout.tsx in Next.js or App.tsx in Vite)
import BlurFadeThemeTransition from "@/components/ui/BlurFadeThemeTransition";

export default function RootLayout({ children }) {
  return (
    <BlurFadeThemeTransition>
      {children}
    </BlurFadeThemeTransition>
  );
}

// 2. Trigger transitions in any child component using the useBlurFadeThemeTransition hook
import { useBlurFadeThemeTransition } from "@/components/ui/BlurFadeThemeTransition";

export function CustomThemeToggle() {
  const { triggerTransition, isAnimating, theme } = useBlurFadeThemeTransition();

  return (
    <button
      disabled={isAnimating}
      onClick={() => triggerTransition()}
      className="px-4 py-2 bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 rounded-lg font-bold"
    >
      Active: {theme}
    </button>
  );
}`,
  },
  {
    slug: "cross-blur-page-transition",
    category: "Page Transitions",
    name: "CrossBlur Page Transition",
    description:
      "A layout utilizing soft filters and cross-fading blurs to create a gentle transition between pages.",
    interactionType:
      "Programmatically triggered on route change or view swaps, applying a soft blur over the screen.",
    preview:
      "https://ik.imagekit.io/niqgaoeg3/GUI-cross-blur-page-transition.mp4",
    dependencies: ["motion"],
    previewFile: "CrossBlurPageTransitionPreview",
    props: [
      {
        name: "trigger",
        type: ["number"],
        description:
          "Value key to programmatically trigger the transition overlay.",
        default: "0",
      },
      {
        name: "onViewSwap",
        type: ["() => void"],
        description:
          "Callback fired at mid-transition to perform state/view swaps.",
      },
      {
        name: "duration",
        type: ["number"],
        description: "The duration of the animation in seconds.",
        default: "0.6",
      },
      {
        name: "maxBlur",
        type: ["number"],
        description: "Maximum blur amount applied (in px).",
        default: "20",
      },
    ],
    usageCode: `// Example Usage
import CrossBlurPageTransition from "@/components/ui/CrossBlurPageTransition";

export default function PageTransitionWrapper() {
  const [trigger, setTrigger] = useState(0);

  return (
    <>
      <button onClick={() => setTrigger(prev => prev + 1)}>Navigate</button>
      <CrossBlurPageTransition trigger={trigger} onViewSwap={() => { /* route swap logic */ }} />
    </>
  );
}`,
  },
];
