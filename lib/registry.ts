export type Prop = {
  name: string;
  type: string[];
  description: string;
  default?: string;
};

export type ComponentCategory =
  "Buttons" | "Inputs" | "Navigation" | "Illustrations" | "Utilities";

export type Component = {
  slug: string;
  name: string;
  category: ComponentCategory;
  description: string;
  interactionType: string;
  dependencies: string[];
  props: Prop[];
  previewFile?: string;
  previewImage?: string;
  code?: string;
  usageCode?: string;
};

export const categories: ComponentCategory[] = [
  "Buttons",
  "Inputs",
  "Navigation",
  "Illustrations",
  "Utilities",
];

export const components: Component[] = [
  {
    slug: "button",
    name: "Button",
    category: "Buttons",
    description:
      "A versatile button component supporting multiple variants, sizes, icons, and a loading state.",
    interactionType:
      "Clickable element with hover, active, focus, and loading states.",
    dependencies: [],
    previewFile: "ButtonPreview",
    previewImage: "/previews/button.png",
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
    name: "Mobile Mockup",
    category: "Illustrations",
    description:
      "An interactive mobile device frame mockup with a realistic smartphone chassis, status bar, and WhatsApp mobile chat UI.",
    interactionType:
      "Animated message stream, interactive audio notes, and responsive dark/light mode device chassis.",
    dependencies: ["motion"],
    previewFile: "MobileMockupPreview",
    previewImage: "/previews/MobileMockupPreview.png",
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
    name: "Macbook Mockup",
    category: "Illustrations",
    description:
      "A realistic 3D Macbook Pro device frame mockup with aluminum casing, keyboard base, and dual-pane WhatsApp Web chat UI.",
    interactionType:
      "Interactive dual-pane sidebar & chat stream, voice notes, and desktop laptop frame animations.",
    dependencies: ["motion"],
    previewFile: "MacbookMockupPreview",
    previewImage: "/previews/MacbookMockupPreview.png",
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
    name: "Deployment Checklist",
    category: "Utilities",
    description:
      "An interactive CI/CD pipeline protocol checklist depicting git clone, install, build, and deploy stages with custom animated status icons.",
    interactionType:
      "Sequentially executable checklist with running spin state, skipped items, error logs, and detailed step drawer toggling.",
    dependencies: ["motion"],
    previewFile: "DeploymentChecklistPreview",
    previewImage: "/previews/DeploymentChecklistPreview.png",
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
    slug: "vinyl-album-card",
    name: "Vinyl Album Card",
    category: "Illustrations",
    description:
      "An interactive music album card with a spinning vinyl record that emerges from the cover sleeve upon hover.",
    interactionType:
      "Hover-triggered card sleeve scale, tilt rotations, record sliding offset, and vinyl spin animations.",
    dependencies: ["motion"],
    previewFile: "VinylAlbumCardPreview",
    previewImage: "/previews/VinylAlbumCardPreview.png",
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
    slug: "page-transition-shader",
    name: "Page Transition Shader",
    category: "Navigation",
    description:
      "A fullscreen page transition system that applies WebGL custom GLSL fragment shaders (Liquid Ripple, Cyber Glitch, Vortex, and Liquid Dissolve) during route changes.",
    interactionType:
      "Full viewport canvas shader render with custom duration, chromatic aberration levels, and automated link interceptors.",
    dependencies: [],
    previewFile: "PageTransitionShaderPreview",
    previewImage: "/previews/PageTransitionShaderPreview.png",
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
          "Callback function fired at mid-transition (covered state) to perform state/view swaps.",
      },
      {
        name: "isDark",
        type: ["boolean"],
        description: "Toggle theme colours inside WebGL rendering context.",
        default: "false",
      },
      {
        name: "shaderMode",
        type: ["'ripple'", "'glitch'", "'vortex'", "'liquid'"],
        description: "Choose fragment shader animation mode.",
        default: "'ripple'",
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
    name: "Animated Select",
    category: "Inputs",
    description:
      "A premium interactive dropdown component with dynamic spring-based menu expanding animations and sequenced staggering list items.",
    interactionType:
      "Hover and click active states, chevron micro-rotation, stagger item animations, and responsive layout.",
    dependencies: ["motion"],
    previewFile: "AnimatedSelectPreview",
    previewImage: "/previews/AnimatedSelectPreview.png",
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
    name: "Animated Link",
    category: "Navigation",
    description:
      "An interactive link component supporting 13 premium hover variants including custom clipping masks, SVG sine waves, and text marquee animations.",
    interactionType:
      "Hover text fill, SVG loops, marquee transition, doodle draw underline, overline, and dash arrow reveals.",
    dependencies: ["motion"],
    previewFile: "AnimatedLinkPreview",
    previewImage: "/previews/AnimatedLinkPreview.png",
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
    name: "ASCII Image",
    category: "Illustrations",
    description:
      "A real-time hardware-accelerated WebGL shader component that proceduralizes any image into customizable density-based ASCII art with masking overlays.",
    interactionType:
      "WebGL fragment shader rendering, linear alpha gradient overlay masking, and content container placement.",
    dependencies: [],
    previewFile: "AsciiImagePreview",
    previewImage: "/previews/AsciiImagePreview.png",
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
    name: "Terminal Loader",
    category: "Utilities",
    description:
      "A retro, terminal-inspired monospace loading indicator that animates character blocks and trailing density particles in real-time.",
    interactionType:
      "Continuous procedural loop animation with customizable speed, matrix dimensions, character glyph trails, and colors.",
    dependencies: [],
    previewFile: "TerminalLoaderPreview",
    previewImage: "/previews/TerminalLoaderPreview.png",
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
    name: "Image Hover Reveal",
    category: "Illustrations",
    description:
      "A dual-image avatar surface implementing directional hover reveals and cursor coordinate tracking spring slices.",
    interactionType:
      "Hover entry angle detection, coordinate tracking springs, clip path interpolation, and dual state cross-fade reveals.",
    dependencies: ["motion"],
    previewFile: "ImageHoverRevealPreview",
    previewImage: "/previews/ImageHoverRevealPreview.png",
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
    name: "Minimal Buttons",
    category: "Buttons",
    description:
      "A tactile, retro-modern button component featuring beveled top-border highlights, inner gradients, and inset shadow detailing.",
    interactionType:
      "Press animation and smooth theme-aligned tactile hover state shifts.",
    dependencies: [],
    previewFile: "MinimalButtonsPreview",
    previewImage: "/previews/MinimalButtonsPreview.png",
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
    name: "Aceternity Button",
    category: "Buttons",
    description:
      "A soft, convex tactile button component featuring inner shadows, active scaling states, and smooth gradients for premium feedback.",
    interactionType:
      "Hover offset transitions, inset shadow focus states, and press-down scale animations.",
    dependencies: [],
    previewFile: "AceternityButtonPreview",
    previewImage: "/previews/AceternityButtonPreview.png",
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
    name: "Avatar Stack",
    category: "Illustrations",
    description:
      "A dynamic stack of overlapping user avatars featuring custom tooltip display variants that track hover directions or coordinates with spring dynamics.",
    interactionType:
      "Hover animations: spring-tilt (follows coordinate movements), spring-box (tilts the box container), and slide-blur (directional blur reveal).",
    dependencies: ["motion"],
    previewFile: "AvatarStackPreview",
    previewImage: "/previews/AvatarStackPreview.png",
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
    name: "Diagonal Marquee Carousel",
    category: "Illustrations",
    description:
      "A premium diagonally slanted, infinitely scrolling marquee showing cards or landscapes with offset speeds, alternating directions, and soft gradients.",
    interactionType:
      "Infinite linear scroll with custom angles, layout parameters, and card-zoom states.",
    dependencies: ["motion"],
    previewFile: "DiagonalMarqueeCarouselPreview",
    previewImage: "/previews/DiagonalMarqueeCarouselPreview.png",
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
    name: "Revision Timeline",
    category: "Utilities",
    description:
      "A premium interactive document revision history log timeline featuring Gaussian-weighted dial scale indicators, spring-based sliding position centering, and parsed markdown log lists.",
    interactionType:
      "Gaussian scaling sliders, date hover indicators, paging click navigation, and markdown syntax parsers.",
    dependencies: ["motion"],
    previewFile: "RevisionTimelinePreview",
    previewImage: "/previews/RevisionTimelinePreview.png",
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
];
