export type Prop = {
  name: string;
  type: string[];
  description: string;
  default?: string;
};

export type Component = {
  slug: string;
  name: string;
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
    slug: "accordion",
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
  {
    slug: "liquid-ripple-shader",
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
  },
  {
    slug: "animated-link",
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
  {
    slug: "ascii-image",
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
  },
  {
    slug: "terminal-loader",
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
  {
    slug: "frosted-glass-reveal",
    inspiration: "",
    preview: "https://ik.imagekit.io/greatui/frostedglass.mp4",
    name: "Frosted Glass Reveal",
    description:
      "An interactive frosted glass image reveal effect that simulates realistic light refraction and tracks the user's cursor.",
    interactionType:
      "Hover entry detection, cursor coordinate spring tracking, SVG fractal noise displacement filter, and masked reveal lens.",
    dependencies: ["motion"],
    previewFile: "FrostedGlassRevealPreview",
    props: [
      {
        name: "imageUrl",
        type: ["string"],
        description: "The source URL of the image to display.",
        default:
          "'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1600&auto=format&fit=crop'",
      },
      {
        name: "className",
        type: ["string"],
        description: "Additional CSS classes to style the container.",
      },
      {
        name: "revealShape",
        type: ["'circle' | 'square' | 'rounded'"],
        description: "The physical shape of the cursor magnifying reveal lens.",
        default: "'circle'",
      },
      {
        name: "glassStrength",
        type: ["number"],
        description:
          "The standard deviation intensity for the SVG Gaussian Blur frosted effect.",
        default: "22",
      },
    ],
  },
  {
    slug: "card",
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
    inspiration: "",
    preview: "https://ik.imagekit.io/ybq4azred/command-copy-scramble-text.mp4",
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
    inspiration: "",
    preview: "https://ik.imagekit.io/ybq4azred/preview-s_rollsvgtext.mp4",
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
    inspiration: "",
    name: "Multilingual Quote",
    description:
      "An animated quote section component with multi-language support.",
    interactionType: "Language toggle with smooth animated text transitions.",
    dependencies: ["motion"],
    previewFile: "MultilingualQuotePreview",
    preview: "https://ik.imagekit.io/ybq4azred/quote-multilingual.mp4",
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
    name: "Pixel To Ascii Image",
    inspiration: "https://razorpay.com/ai-builders/",
    description:
      "An image component that pixelates and then converts into ASCII art on hover.",
    interactionType:
      "Hover triggers a procedural pixelation followed by an ASCII art conversion.",
    dependencies: ["motion"],
    previewFile: "PixelToAsciiImagePreview",
    preview: "https://ik.imagekit.io/ybq4azred/pixel-to-ascii.mp4",
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
    name: "Staggered Page Transition",
    description:
      "A gorgeous staggered layout transition built with Framer Motion.",
    interactionType:
      "Triggered on route change or programmatically. Covers the viewport in staggered animated panels, seamlessly revealing the next view underneath.",
    dependencies: ["motion"],
    previewFile: "StaggeredPageTransitionPreview",
    preview: "https://ik.imagekit.io/ybq4azred/staggering-page-transition.mp4",
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
    name: "Color Wipe Page Transition",
    description:
      "A fast, colorful screen transition featuring staggered horizontal bands with vibrant doodle accents.",
    interactionType:
      "Programmatically triggered. Covers the screen horizontally with 10 staggered lines before sliding out to reveal the new state.",
    dependencies: ["motion"],
    previewFile: "ColorWipePageTransitionPreview",
    preview: "https://ik.imagekit.io/ybq4azred/ColorWipeTransition.mp4",
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
];
