export type Prop = {
  name: string;
  type: string[];
  description: string;
  default?: string;
};

export type ComponentCategory =
  "All" | "Inputs" | "Feedback" | "Data Display" | "Navigation" | "Surfaces";

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
  "All",
  "Inputs",
  "Feedback",
  "Data Display",
  "Navigation",
  "Surfaces",
];

export const components: Component[] = [
  {
    slug: "button",
    name: "Button",
    category: "Inputs",
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
    name: "MobileMockup",
    category: "Surfaces",
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
    name: "MacbookMockup",
    category: "Surfaces",
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
    slug: "interactive-checklist",
    name: "InteractiveChecklist",
    category: "Feedback",
    description:
      "An interactive CI/CD pipeline protocol checklist depicting git clone, install, build, and deploy stages with custom animated status icons.",
    interactionType:
      "Sequentially executable checklist with running spin state, skipped items, error logs, and detailed step drawer toggling.",
    dependencies: ["motion"],
    previewFile: "InteractiveChecklistPreview",
    previewImage: "/previews/InteractiveChecklistPreview.png",
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
    slug: "vinyl-card",
    name: "VinylCard",
    category: "Surfaces",
    description:
      "An interactive music album card with a spinning vinyl record that emerges from the cover sleeve upon hover.",
    interactionType:
      "Hover-triggered card sleeve scale, tilt rotations, record sliding offset, and vinyl spin animations.",
    dependencies: ["motion"],
    previewFile: "VinylCardPreview",
    previewImage: "/previews/VinylCardPreview.png",
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
    slug: "webgl-shader-transition",
    name: "WebglShaderTransition",
    category: "Navigation",
    description:
      "A fullscreen page transition system that applies WebGL custom GLSL fragment shaders (Liquid Ripple, Cyber Glitch, Vortex, and Liquid Dissolve) during route changes.",
    interactionType:
      "Full viewport canvas shader render with custom duration, chromatic aberration levels, and automated link interceptors.",
    dependencies: [],
    previewFile: "WebglShaderTransitionPreview",
    previewImage: "/previews/WebglShaderTransitionPreview.png",
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
];
