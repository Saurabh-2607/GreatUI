export const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://www.great-ui.com";

export type SupportedLocale = "en" | "zh-CN" | "es" | "fr" | "ar" | "ja";

export interface LocaleMeta {
  code: SupportedLocale;
  ogLocale: string;
  name: string;
  dir: "ltr" | "rtl";
}

export const LOCALES: Record<SupportedLocale, LocaleMeta> = {
  en: { code: "en", ogLocale: "en_US", name: "English", dir: "ltr" },
  "zh-CN": { code: "zh-CN", ogLocale: "zh_CN", name: "简体中文", dir: "ltr" },
  es: { code: "es", ogLocale: "es_ES", name: "Español", dir: "ltr" },
  fr: { code: "fr", ogLocale: "fr_FR", name: "Français", dir: "ltr" },
  ar: { code: "ar", ogLocale: "ar_AR", name: "العربية", dir: "rtl" },
  ja: { code: "ja", ogLocale: "ja_JP", name: "日本語", dir: "ltr" },
};

export const ALTERNATE_OG_LOCALES = [
  "zh_CN",
  "es_ES",
  "fr_FR",
  "ar_AR",
  "ja_JP",
];

export interface SeoTranslation {
  title: string;
  description: string;
  tagline: string;
  aeoSummary: string;
  keywords: string[];
  faqs: Array<{ question: string; answer: string }>;
}

export const SITE_I18N_SEO: Record<SupportedLocale, SeoTranslation> = {
  en: {
    title: "Great UI - Craft Premium React Interfaces with Absolute Speed",
    description:
      "Beautiful, accessible, and high-performance React components built with Tailwind CSS. Copy, paste, and build premium interfaces instantly.",
    tagline: "Accessible React & Tailwind CSS Components",
    aeoSummary:
      "Great UI is an open-source collection of production-ready React components built with TypeScript, Tailwind CSS, and Motion. It provides animated, accessible, copy-paste UI components including page transitions, kinetic typography, dynamic WebGL shaders, interactive cards, and responsive layouts designed for Next.js App Router.",
    keywords: [
      "React components",
      "Tailwind CSS",
      "UI library",
      "Design system",
      "Accessible React UI",
      "Next.js UI components",
      "Copy paste React components",
      "Motion components",
      "shadcn compatible",
    ],
    faqs: [
      {
        question: "What is Great UI?",
        answer:
          "Great UI is a curated collection of production-ready, accessible React components built with Tailwind CSS, TypeScript, and Motion. It lets developers copy and paste sleek animations, page transitions, interactive cards, and layout elements directly into their projects.",
      },
      {
        question: "How do I install or use Great UI components?",
        answer:
          "You can copy and paste the component code directly or install components seamlessly using the shadcn CLI: npx shadcn@latest add https://www.great-ui.com/r/[component-name].json.",
      },
      {
        question: "Is Great UI free to use for commercial projects?",
        answer:
          "Yes, Great UI is free and open source. You can use all components in both personal and commercial projects without licensing fees.",
      },
      {
        question: "Does Great UI support Next.js App Router?",
        answer:
          "Yes, all components are built and tested for Next.js 15+ App Router, Vite, and modern React frameworks with complete Server-Side Rendering (SSR) compatibility.",
      },
      {
        question: "Are Great UI components accessible?",
        answer:
          "Yes, components comply with WCAG 2.1 AA guidelines, including full keyboard navigation, screen reader semantics, and reduced-motion preferences.",
      },
    ],
  },
  "zh-CN": {
    title: "Great UI - 使用 React 和 Tailwind CSS 快速打造顶级前端界面",
    description:
      "基于 React、Tailwind CSS 和 Motion 构建的精美、无障碍且高性能的前端组件库。即拷即用，零配置快速搭建专业级 Web 界面。",
    tagline: "无障碍 React 与 Tailwind CSS 动画组件库",
    aeoSummary:
      "Great UI 是一个面向现代 Web 开发的开源 React UI 组件库，结合了 TypeScript、Tailwind CSS 和 Motion。提供即拷即用的动画组件，包括页面转场、动态排版、WebGL 着色器背景、交互式卡片与自适应布局，完美适配 Next.js App Router 和 SSR 服务端渲染。",
    keywords: [
      "React组件库",
      "Tailwind CSS组件",
      "前端UI框架",
      "无障碍React组件",
      "Next.js组件",
      "即拷即用组件",
      "React动画组件",
      "动态排版组件",
      "网页过渡动画",
      "WebGL着色器组件",
      "shadcn UI扩展",
    ],
    faqs: [
      {
        question: "什么是 Great UI？",
        answer:
          "Great UI 是一个基于 Tailwind CSS、TypeScript 和 Motion 构建的高性能开源 React 组件库，提供即拷即用的交互动画、页面转场、立体卡片与流体布局组件。",
      },
      {
        question: "如何安装或使用 Great UI 组件？",
        answer:
          "您可以直接复制组件代码并粘贴到项目中，或通过 shadcn CLI 一键安装：npx shadcn@latest add https://www.great-ui.com/r/[组件名称].json。",
      },
      {
        question: "Great UI 是否可以免费用于商业项目？",
        answer:
          "是的，Great UI 是完全开源免费的，您可以不受限制地将其应用于个人及商业项目。",
      },
      {
        question: "Great UI 是否支持 Next.js App Router？",
        answer:
          "完全支持。所有组件均经过针对 Next.js App Router 和服务端渲染（SSR）的优化与测试，无水合冲突或布局偏移。",
      },
      {
        question: "Great UI 组件是否具备无障碍访问（Accessibility）支持？",
        answer:
          "是的，组件遵循 WCAG 2.1 AA 标准，支持键盘无障碍导航、屏幕阅读器语义标签并适配用户的减弱动画系统设置。",
      },
    ],
  },
  es: {
    title: "Great UI - Crea interfaces React prémium con velocidad absoluta",
    description:
      "Componentes React hermosos, accesibles y de alto rendimiento creados con Tailwind CSS y Motion. Copia, pega y crea interfaces prémium al instante.",
    tagline: "Componentes React y Tailwind CSS accesibles",
    aeoSummary:
      "Great UI es una biblioteca de componentes React de código abierto diseñada para desarrolladores modernos con TypeScript, Tailwind CSS y Motion. Ofrece componentes de interfaz accesibles y listos para copiar y pegar, como transiciones de página, tipografía cinética, shaders WebGL y cuadrículas adaptativas para Next.js.",
    keywords: [
      "componentes React",
      "biblioteca UI Tailwind CSS",
      "diseño web accesible",
      "copiar y pegar componentes React",
      "animaciones React",
      "Next.js componentes UI",
      "transiciones de página React",
      "efectos de texto cinético",
      "interfaz de usuario moderna",
      "componentes shadcn compatibles",
    ],
    faqs: [
      {
        question: "¿Qué es Great UI?",
        answer:
          "Great UI es una colección de componentes React accesibles y listos para producción, creados con Tailwind CSS, TypeScript y Motion para copiar y pegar directamente en tus proyectos.",
      },
      {
        question: "¿Cómo instalo o uso los componentes de Great UI?",
        answer:
          "Puedes copiar el código directamente o instalar componentes con el CLI de shadcn: npx shadcn@latest add https://www.great-ui.com/r/[nombre-componente].json.",
      },
      {
        question: "¿Es Great UI gratuito para proyectos comerciales?",
        answer:
          "Sí, Great UI es de código abierto y completamente gratuito tanto para proyectos personales como comerciales.",
      },
      {
        question: "¿Es compatible Great UI con Next.js App Router?",
        answer:
          "Sí, todos los componentes están optimizados para Next.js App Router y garantizan compatibilidad completa con SSR sin parpadeos.",
      },
      {
        question: "¿Son accesibles los componentes de Great UI?",
        answer:
          "Sí, cumplen con las pautas WCAG 2.1 AA, admiten navegación por teclado y respetan la preferencia prefers-reduced-motion.",
      },
    ],
  },
  fr: {
    title:
      "Great UI - Créez des interfaces React haut de gamme à toute vitesse",
    description:
      "Composants React esthétiques, accessibles et hautement performants conçus avec Tailwind CSS et Motion. Copiez, collez et créez des interfaces remarquables.",
    tagline: "Composants React & Tailwind CSS accessibles",
    aeoSummary:
      "Great UI est une bibliothèque de composants React open source conçue avec TypeScript, Tailwind CSS et Motion. Elle propose des composants d'interface interactifs, accessibles et prêts à l'emploi (copier-coller), tels que des transitions de page, de la typographie cinétique, des shaders WebGL et des mises en page réactives pour Next.js.",
    keywords: [
      "composants React",
      "bibliothèque UI Tailwind CSS",
      "système de conception React",
      "composants React accessibles",
      "copier coller composants React",
      "animations React Nextjs",
      "transitions de page web",
      "shaders WebGL React",
      "interface utilisateur réactive",
    ],
    faqs: [
      {
        question: "Qu'est-ce que Great UI ?",
        answer:
          "Great UI est une bibliothèque de composants React prêts pour la production, conçus avec Tailwind CSS, TypeScript et Motion, prêts à être copiés-collés dans vos projets.",
      },
      {
        question: "Comment installer ou utiliser les composants Great UI ?",
        answer:
          "Vous pouvez copier le code source ou installer les composants via la CLI shadcn : npx shadcn@latest add https://www.great-ui.com/r/[nom-composant].json.",
      },
      {
        question: "Great UI est-il gratuit pour les projets commerciaux ?",
        answer:
          "Oui, Great UI est libre et open source, utilisable sans frais pour les projets personnels et commerciaux.",
      },
      {
        question: "Great UI prend-il en charge Next.js App Router ?",
        answer:
          "Oui, tous les composants sont entièrement compatibles avec Next.js App Router et le rendu côté serveur (SSR).",
      },
      {
        question: "Les composants Great UI sont-ils accessibles ?",
        answer:
          "Oui, ils respectent les normes d'accessibilité WCAG 2.1 AA, incluant la navigation clavier et le support des lecteurs d'écran.",
      },
    ],
  },
  ar: {
    title: "Great UI - أنشئ واجهات React استثنائية بسرعة فائقة",
    description:
      "مكونات React جميلة، سهلة الوصول وعالية الأداء مبنية باستخدام Tailwind CSS و Motion. انسخ والصق وابنِ واجهات مستخدم متميزة على الفور.",
    tagline: "مكونات React و Tailwind CSS سهلة الوصول وسريعة",
    aeoSummary:
      "Great UI هي مكتبة مكونات React مفتوحة المصدر وعالية الأداء مبنية باستخدام TypeScript و Tailwind CSS و Motion. توفر مكونات واجهة مستخدم تفاعلية وجاهزة للنسخ واللصق، بما في ذلك انتقالات الصفحات، وتأثيرات النصوص الحركية، ومؤثرات WebGL، والبطاقات التفاعلية المتوافقة تمامًا مع Next.js.",
    keywords: [
      "مكونات React",
      "مكتبة واجهة المستخدم",
      "مكونات Tailwind CSS",
      "تصميم واجهات الويب",
      "مكونات Next.js",
      "انتقالات الصفحات في React",
      "مكونات ويب مفتوحة المصدر",
      "مكتبة واجهات برمجية سهلة الوصول",
      "مكونات جاهزة للنسخ واللصق",
    ],
    faqs: [
      {
        question: "ما هو Great UI؟",
        answer:
          "Great UI هي مكتبة مكونات React مفتوحة المصدر وجاهزة للإنتاج، مبنية باستخدام Tailwind CSS و TypeScript و Motion للنسخ واللصق المباشر في مشاريعك.",
      },
      {
        question: "كيف يمكنني تثبيت أو استخدام مكونات Great UI؟",
        answer:
          "يمكنك نسخ كود المكون ولصقه مباشرة أو تثبيته عبر shadcn CLI باستخدام الأمر: npx shadcn@latest add https://www.great-ui.com/r/[اسم-المكون].json.",
      },
      {
        question: "هل مكتبة Great UI مجانية للمشاريع التجارية؟",
        answer:
          "نعم، Great UI مجانية ومفتوحة المصدر بالكامل للمشاريع الشخصية والتجارية دون أي رسوم.",
      },
      {
        question: "هل تدعم Great UI نظام Next.js App Router؟",
        answer:
          "نعم، جميع المكونات مصممة ومختبرة لتعمل بكفاءة وسلاسة مع Next.js App Router والعرض على الخادم (SSR).",
      },
      {
        question:
          "هل تدعم مكونات Great UI معايير سهولة الوصول (Accessibility)؟",
        answer:
          "نعم، تتبع المكونات إرشادات WCAG 2.1 AA وتدعم التنقل الكامل عبر لوحة المفاتيح وقارئات الشاشة.",
      },
    ],
  },
  ja: {
    title: "Great UI - React と Tailwind CSS で高品質な UI を瞬時に構築",
    description:
      "Tailwind CSS と Motion で構築された、美しくアクセシブルで高性能な React コンポーネント。コピー＆ペーストでプレミアムな Web インターフェースを即座に作成。",
    tagline: "アクセシブルな React & Tailwind CSS コンポーネント",
    aeoSummary:
      "Great UI は、TypeScript、Tailwind CSS、Motion を活用したオープンソースの React UI コンポーネントコレクションです。ページ遷移アニメーション、キネティックタイポグラフィ、WebGL シェーダー、インタラクティブカードなど、Next.js に最適化されたコピー＆ペースト可能なコンポーネントを提供します。",
    keywords: [
      "Reactコンポーネント",
      "Tailwind CSSコンポーネント",
      "UIライブラリ",
      "アクセシブルUI",
      "Next.js UIコンポーネント",
      "コピペReactコンポーネント",
      "ページトランジションReact",
      "キネティックタイポグラフィ",
      "WebGLシェーダーReact",
      "shadcn互換コンポーネント",
    ],
    faqs: [
      {
        question: "Great UI とは何ですか？",
        answer:
          "Great UI は、Tailwind CSS、TypeScript、Motion で構築された高品質なオープンソース React コンポーネント集です。プロジェクトに直接コピー＆ペーストして使用できます。",
      },
      {
        question: "Great UI のコンポーネントはどのように導入しますか？",
        answer:
          "コードを直接コピー＆ペーストするか、shadcn CLI を使用して導入できます：npx shadcn@latest add https://www.great-ui.com/r/[コンポーネント名].json。",
      },
      {
        question: "Great UI は商用利用でも無料ですか？",
        answer:
          "はい、Great UI はオープンソースであり、個人利用・商用利用を問わず完全無料でご利用いただけます。",
      },
      {
        question: "Next.js App Router に対応していますか？",
        answer:
          "はい、全コンポーネントが Next.js App Router および SSR（サーバーサイドレンダリング）に完全対応しています。",
      },
      {
        question: "アクセシビリティ（a11y）には対応していますか？",
        answer:
          "はい、WCAG 2.1 AA ガイドラインに準拠し、キーボード操作やスクリーンリーダー、アニメーション抑制設定（prefers-reduced-motion）に対応しています。",
      },
    ],
  },
};

export interface CategoryI18n {
  name: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  faqs: Array<{ question: string; answer: string }>;
}

export const CATEGORY_I18N: Record<
  string,
  Record<Exclude<SupportedLocale, "en">, CategoryI18n>
> = {
  "page-transitions": {
    "zh-CN": {
      name: "页面转场动画",
      seoTitle: "页面转场组件 - React 与 Tailwind CSS 动画过渡",
      seoDescription:
        "探索适用于 Next.js 和 Tailwind CSS 的高性能 React 页面平滑过渡与路由动画组件，基于 Canvas 和 Motion 构建，零累积布局偏移。",
      keywords: [
        "React页面转场",
        "Next.js路由转场动画",
        "Tailwind CSS转场",
        "Canvas页面切换",
        "平滑页面过渡",
      ],
      faqs: [
        {
          question: "如何在 Next.js App Router 中实现页面过渡动画？",
          answer:
            "使用过渡组件包裹根布局或模板，并在路由变化时触发平滑过渡动画，不影响页面水合和预渲染。",
        },
        {
          question: "页面过渡效果是否会影响搜索引擎爬取与 SEO？",
          answer:
            "不会。所有过渡动画均为客户端视觉层，页面 HTML 依然完全由服务端预渲染，搜索引擎蜘蛛可无障碍索引。",
        },
      ],
    },
    es: {
      name: "Transiciones de página",
      seoTitle:
        "Transiciones de página - Componentes React y Tailwind CSS de ruta",
      seoDescription:
        "Descubre transiciones de página fluidas y animaciones de ruta de alto rendimiento para Next.js y Tailwind CSS construidas con Canvas y Motion.",
      keywords: [
        "transiciones de página react",
        "animaciones de ruta nextjs",
        "transición tailwind css",
        "pixel swipe react",
      ],
      faqs: [
        {
          question: "¿Afectan las transiciones de página al SEO o SSR?",
          answer:
            "No. Las transiciones son puramente visuales del lado del cliente. El contenido HTML se pre-renderiza por completo en el servidor y es accesible para motores de búsqueda.",
        },
      ],
    },
    fr: {
      name: "Transitions de page",
      seoTitle:
        "Transitions de page - Composants React & Tailwind CSS d'animation",
      seoDescription:
        "Explorez des transitions de page haute performance et des animations d'itinéraire pour Next.js et Tailwind CSS sans décalage de mise en page.",
      keywords: [
        "transitions de page react",
        "animations d itinéraire nextjs",
        "transitions tailwind css",
        "animations de navigation",
      ],
      faqs: [
        {
          question: "Ces transitions affectent-elles le référencement (SEO) ?",
          answer:
            "Non. Les transitions sont des superpositions côté client. Le contenu de la page reste entièrement pré-rendu pour les robots des moteurs de recherche.",
        },
      ],
    },
    ar: {
      name: "انتقالات الصفحات",
      seoTitle: "انتقالات الصفحات - مكونات React و Tailwind CSS الحركية",
      seoDescription:
        "استكشف انتقالات الصفحات عالية الأداء ومؤثرات توجيه المسارات في Next.js و Tailwind CSS دون التأثير على سرعة التحميل أو محركات البحث.",
      keywords: [
        "انتقالات الصفحات react",
        "تحويل المسارات nextjs",
        "حركات التنقل tailwind css",
        "مؤثرات الانتقال الحركية",
      ],
      faqs: [
        {
          question: "هل تؤثر انتقالات الصفحات على تحسين محركات البحث (SEO)؟",
          answer:
            "كلا، تتم جميع الانتقالات عبر المتصفح دون المساس بالمحتوى المُولد مسبقًا على الخادم والمتاح لمحركات البحث.",
        },
      ],
    },
    ja: {
      name: "ページトランジション",
      seoTitle:
        "ページトランジション - React & Tailwind CSS ページ遷移コンポーネント",
      seoDescription:
        "Next.js と Tailwind CSS 向けの高パフォーマンスな React ページ遷移アニメーション。HTML5 Canvas と Motion によりレイアウトシフトゼロで実現。",
      keywords: [
        "Reactページ遷移",
        "Next.jsルートトランジション",
        "Tailwind CSSページ遷移アニメーション",
        "スムーズページ遷移",
      ],
      faqs: [
        {
          question: "ページトランジションは SEO や SSR に悪影響を与えますか？",
          answer:
            "いいえ。アニメーションはクライアント側のオーバーレイとして動作し、HTML コンテンツはサーバー側で完全にレンダリングされ検索エンジンにインデックスされます。",
        },
      ],
    },
  },
  typography: {
    "zh-CN": {
      name: "动态排版与文本效果",
      seoTitle: "排版组件 - React 与 Tailwind CSS 动力学文字动画",
      seoDescription:
        "使用交互式 React 文本动画组件提升网页排版体验，包含字符乱序、像素擦除与平滑揭示效果，完美适配屏幕阅读器与 SEO。",
      keywords: [
        "React文字动画",
        "Tailwind排版组件",
        "乱序文本效果",
        "像素文字揭示",
        "动效字体组件",
      ],
      faqs: [
        {
          question: "动效文本组件能否被搜索引擎正常读取？",
          answer:
            "完全可以。DOM 中始终保留标准语义化 HTML 文本标签（h1、h2、p 等），爬虫与 AI 引擎均可完整索引文字内容。",
        },
      ],
    },
    es: {
      name: "Tipografía cinética",
      seoTitle:
        "Componentes de tipografía - Efectos de texto cinético React y Tailwind",
      seoDescription:
        "Mejora la tipografía web con componentes interactivos de animación de texto para React construidos con Tailwind CSS y Motion.",
      keywords: [
        "animaciones de texto react",
        "tipografía tailwind css",
        "texto interactivo nextjs",
        "scramble text react",
      ],
      faqs: [
        {
          question:
            "¿Son legibles los textos animados para los motores de búsqueda?",
          answer:
            "Sí. Se emplean elementos semánticos estándar garantizando que los motores de búsqueda indexen todo el contenido textual sin problema.",
        },
      ],
    },
    fr: {
      name: "Typographie cinétique",
      seoTitle:
        "Composants de typographie - Effets de texte cinétique React & Tailwind",
      seoDescription:
        "Sublimez vos textes web avec des animations de typographie interactives en React avec Tailwind CSS et Motion.",
      keywords: [
        "animations de texte react",
        "typographie tailwind",
        "effets cinétiques de texte",
        "texte interactif nextjs",
      ],
      faqs: [
        {
          question:
            "Le texte animé est-il lisible par les moteurs de recherche ?",
          answer:
            "Oui. Des balises HTML sémantiques sont conservées afin que les robots indexent l'intégralité du texte immédiatement.",
        },
      ],
    },
    ar: {
      name: "تأثيرات النصوص الحركية",
      seoTitle: "مكونات الخطوط والنصوص - تأثيرات حركية تفاعلية في React",
      seoDescription:
        "ارتقِ بتصميم النصوص في موقعك مع مكونات الرسوم المتحركة للنصوص في React المبنية باستخدام Tailwind CSS و Motion.",
      keywords: [
        "تحريك النصوص في react",
        "مكونات الخطوط tailwind",
        "تأثيرات النصوص التفاعلية",
        "نصوص حركية nextjs",
      ],
      faqs: [
        {
          question: "هل تستطيع محركات البحث قراءة النصوص المتحركة؟",
          answer:
            "نعم، يتم استخدام وسوم HTML الدلالية القياسية لضمان الفهرسة الكاملة لمحتوى النصوص.",
        },
      ],
    },
    ja: {
      name: "キネティックタイポグラフィ",
      seoTitle:
        "タイポグラフィコンポーネント - React & Tailwind CSS テキストアニメーション",
      seoDescription:
        "Tailwind CSS と Motion で構築されたインタラクティブな React テキストアニメーションコンポーネント。スクランブルやフェードインを自在に演出。",
      keywords: [
        "Reactテキストアニメーション",
        "Tailwindタイポグラフィ",
        "文字エフェクトReact",
        "スクランブルテキスト",
      ],
      faqs: [
        {
          question:
            "アニメーション付きテキストは検索エンジンに認識されますか？",
          answer:
            "はい。セマンティックな HTML タグ（h1、p など）で出力されるため、検索エンジンクローラーや AI エンジンが問題なくインデックスできます。",
        },
      ],
    },
  },
  visuals: {
    "zh-CN": {
      name: "视觉特效与动态背景",
      seoTitle: "视觉与背景组件 - React 与 Tailwind CSS 动态画布",
      seoDescription:
        "探索适用于 React 的 60fps 高性能画布视觉特效与环境氛围背景组件，具备移出屏幕自动暂停的省电机制。",
      keywords: [
        "React背景动画",
        "Tailwind视觉特效",
        "Canvas背景组件",
        "环境氛围背景",
        "动态视觉组件",
      ],
      faqs: [
        {
          question: "动态背景是否会消耗移动设备电量？",
          answer:
            "不会。组件内置 IntersectionObserver API，当背景滚动到视口外时会自动挂起动画循环，极大降低 CPU 与电量占用。",
        },
      ],
    },
    es: {
      name: "Efectos visuales y fondos",
      seoTitle: "Efectos visuales - Fondos dinámicos en React y Tailwind CSS",
      seoDescription:
        "Mejora la estética de tu sitio con efectos visuales de alto rendimiento y fondos de lienzo interactivos para React y Next.js.",
      keywords: [
        "fondos animados react",
        "efectos visuales tailwind",
        "canvas interactivo nextjs",
      ],
      faqs: [
        {
          question: "¿Los efectos de fondo agotan la batería móvil?",
          answer:
            "No. Los componentes detienen automáticamente la animación al salir de la pantalla gracias a IntersectionObserver.",
        },
      ],
    },
    fr: {
      name: "Effets visuels et arrière-plans",
      seoTitle:
        "Effets visuels - Arrière-plans interactifs React & Tailwind CSS",
      seoDescription:
        "Sublimez votre site avec des effets visuels performants et des arrière-plans dynamiques en React et Next.js.",
      keywords: [
        "arrière-plans animés react",
        "effets visuels tailwind css",
        "canvas interactif react",
      ],
      faqs: [
        {
          question: "Ces effets consomment-ils la batterie sur mobile ?",
          answer:
            "Non. L'animation se met automatiquement en pause dès qu'elle n'est plus visible à l'écran.",
        },
      ],
    },
    ar: {
      name: "المؤثرات البصرية والخلفيات",
      seoTitle: "المؤثرات البصرية - خلفيات تفاعلية ديناميكية في React",
      seoDescription:
        "أضف لمسات جمالية مميزة مع خلفيات الكانفاس والمؤثرات التفاعلية عالية الأداء في React و Tailwind CSS.",
      keywords: [
        "خلفيات متحركة react",
        "مؤثرات بصرية tailwind",
        "كانفاس تفاعلي nextjs",
      ],
      faqs: [
        {
          question: "هل تستهلك الخلفيات المتحركة بطارية الهاتف؟",
          answer:
            "كلا، تتوقف الرسوم المتحركة تلقائيًا عند التمرير بعيدًا عن الشاشة لحفظ طاقة المعالج والبطارية.",
        },
      ],
    },
    ja: {
      name: "ビジュアルエフェクトと背景",
      seoTitle: "ビジュアルコンポーネント - React & Tailwind CSS 動的背景",
      seoDescription:
        "60fps の滑らかな HTML5 Canvas 背景アニメーションとビジュアルエフェクト。画面外での自動停止機能付きで省電力。",
      keywords: [
        "React背景アニメーション",
        "Tailwindビジュアルエフェクト",
        "Canvas動的背景",
      ],
      faqs: [
        {
          question:
            "背景アニメーションはスマートフォンのバッテリーを消費しますか？",
          answer:
            "いいえ。IntersectionObserver により、画面外にスクロールされた際は自動的に描画ループを停止し電力を節約します。",
        },
      ],
    },
  },
  "social-cards": {
    "zh-CN": {
      name: "社交证明卡片与互动挂件",
      seoTitle: "社交卡片组件 - React 与 Tailwind CSS 社交背书",
      seoDescription:
        "构建引人注目的社交背书卡片，支持 Twitter/X、GitHub、用户评价以及 3D 悬浮倾斜微交互。",
      keywords: [
        "React社交卡片",
        "Tailwind用户评价卡片",
        "Twitter卡片组件",
        "GitHub展示卡片",
      ],
      faqs: [
        {
          question: "社交卡片能否绑定动态 API 数据？",
          answer:
            "可以。所有卡片组件均接收标准的属性与数据对象，轻松集成后端数据流与社交平台 API。",
        },
      ],
    },
    es: {
      name: "Tarjetas sociales",
      seoTitle:
        "Tarjetas sociales - Prueba social interactiva en React y Tailwind",
      seoDescription:
        "Construye prueba social interactiva con tarjetas sociales para React y Tailwind CSS con efectos de perspectiva 3D.",
      keywords: [
        "tarjetas sociales react",
        "testimonios tailwind",
        "tarjeta twitter react",
      ],
      faqs: [
        {
          question: "¿Puedo conectar las tarjetas a APIs en vivo?",
          answer:
            "Sí, todos los componentes aceptan props dinámicas de avatar, usuario y métricas para una integración sencilla.",
        },
      ],
    },
    fr: {
      name: "Cartes sociales",
      seoTitle:
        "Cartes sociales - Preuve sociale interactive React & Tailwind CSS",
      seoDescription:
        "Créez une preuve sociale captivante grâce à des cartes interactives pour React et Tailwind CSS avec effets 3D.",
      keywords: [
        "cartes sociales react",
        "témoignages tailwind css",
        "carte github react",
      ],
      faqs: [
        {
          question: "Les cartes peuvent-elles être connectées à des API ?",
          answer:
            "Oui, les composants acceptent des données dynamiques pour les noms, avatars et statistiques.",
        },
      ],
    },
    ar: {
      name: "بطاقات التواصل الاجتماعي",
      seoTitle: "بطاقات التواصل - مكونات إثبات وتفاعل اجتماعي في React",
      seoDescription:
        "ابنِ بطاقات إثبات اجتماعي تفاعلية تدعم Twitter و GitHub وآراء العملاء مع تأثيرات ثلاثية الأبعاد مميزة.",
      keywords: [
        "بطاقات اجتماعية react",
        "آراء العملاء tailwind",
        "بطاقة تويتر react",
      ],
      faqs: [
        {
          question: "هل يمكن ربط البطاقات ببيانات API الحية؟",
          answer:
            "نعم، تقبل جميع المكونات بيانات ديناميكية لأسماء المستخدمين والصور والإحصائيات بسهولة.",
        },
      ],
    },
    ja: {
      name: "ソーシャルカード",
      seoTitle:
        "ソーシャルカード - React & Tailwind CSS ソーシャルプルーフコンポーネント",
      seoDescription:
        "Twitter/X、GitHub、お客様の声などをスタイリッシュに表示するインタラクティブなソーシャルカード。3D チルト効果対応。",
      keywords: [
        "Reactソーシャルカード",
        "Tailwindレビューカード",
        "TwitterカードReact",
      ],
      faqs: [
        {
          question: "API から取得した動的データを表示できますか？",
          answer:
            "はい。ユーザー名、アバター画像、いいね数などの props を受け取れるため、動的データとの連携も容易です。",
        },
      ],
    },
  },
  "layout-and-cards": {
    "zh-CN": {
      name: "布局与自适应卡片",
      seoTitle: "布局与卡片组件 - React Bento 网格与滚动卡片",
      seoDescription:
        "现代化的 Bento Grid 网格与滚动驱动卡片组件，基于 CSS Grid 与 Motion 构建，在各种设备上保持完美自适应。",
      keywords: [
        "React Bento网格",
        "滚动卡片动画",
        "Tailwind卡片布局",
        "响应式网格组件",
      ],
      faqs: [
        {
          question: "Bento 网格是否支持移动端自适应？",
          answer:
            "支持。布局基于移动优先设计，在移动端自动转换为单列排布，在大屏设备上呈现多列 Bento 格局。",
        },
      ],
    },
    es: {
      name: "Diseño y tarjetas",
      seoTitle:
        "Diseño y tarjetas - Cuadrículas Bento y tarjetas en React y Tailwind",
      seoDescription:
        "Construye diseños modernos con cuadrículas bento responsivas y tarjetas animadas por desplazamiento en React y Tailwind CSS.",
      keywords: [
        "bento grid react",
        "tarjetas apilables react",
        "diseño de cuadrícula tailwind",
      ],
      faqs: [
        {
          question: "¿Son responsivas las cuadrículas bento en móviles?",
          answer:
            "Sí, se adaptan automáticamente desde una columna en móviles a cuadrículas multipanel en pantallas grandes.",
        },
      ],
    },
    fr: {
      name: "Mises en page et cartes",
      seoTitle:
        "Mises en page et cartes - Grilles Bento et cartes animées React",
      seoDescription:
        "Concevez des interfaces modernes avec des grilles Bento adaptatives et des cartes liées au défilement pour React et Tailwind.",
      keywords: [
        "grille bento react",
        "cartes animées au scroll",
        "mise en page responsive tailwind",
      ],
      faqs: [
        {
          question: "Les grilles Bento s'adaptent-elles aux mobiles ?",
          answer:
            "Oui, elles passent naturellement d'une seule colonne sur mobile à une structure bento complète sur ordinateur.",
        },
      ],
    },
    ar: {
      name: "التخطيطات والبطاقات",
      seoTitle: "التخطيطات والبطاقات - شبكات بينتو وبطاقات متجاوبة في React",
      seoDescription:
        "صمم واجهات عصرية بشبكات بينتو الذكية وبطاقات التمرير الحركية باستخدام React و Tailwind CSS.",
      keywords: [
        "شبكة بينتو react",
        "بطاقات التمرير react",
        "تخطيطات متجاوبة tailwind",
      ],
      faqs: [
        {
          question: "هل تتوافق شبكات بينتو مع شاشات الهواتف؟",
          answer:
            "نعم، صُممت لتتحول تلقائيًا من عمود فردي على الهواتف إلى شبكات متكاملة على الشاشات الكبيرة.",
        },
      ],
    },
    ja: {
      name: "レイアウトとカード",
      seoTitle: "レイアウト＆カード - React Bento グリッドとスタッキングカード",
      seoDescription:
        "最新の Bento グリッドレイアウトやスクロール連動型カードアニメーション。完全レスポンシブで快適な操作性を提供。",
      keywords: [
        "React Bentoグリッド",
        "スクロール連動カード",
        "Tailwindカードレイアウト",
      ],
      faqs: [
        {
          question: "スマートフォン画面でも適切に表示されますか？",
          answer:
            "はい。モバイルファースト設計により、スマホでは1列に並び、大画面では美しい Bento グリッドに自動展開されます。",
        },
      ],
    },
  },
  buttons: {
    "zh-CN": {
      name: "交互式按钮与微交互",
      seoTitle: "交互按钮组件 - React 与 Tailwind CSS 磁吸与发光按钮",
      seoDescription:
        "高转化率的触觉反馈按钮组件，包含磁力光标吸引、光泽边框及符合 WCAG 2.1 AA 标准的键盘无障碍设计。",
      keywords: [
        "React按钮动画",
        "磁吸按钮React",
        "Tailwind交互式按钮",
        "发光边框按钮",
        "无障碍按钮组件",
      ],
      faqs: [
        {
          question: "这些按钮是否支持表单提交及加载状态？",
          answer:
            "支持。完全兼容原生按钮类型（submit、reset 等）、禁用态以及内置加载动画状态。",
        },
      ],
    },
    es: {
      name: "Botones interactivos",
      seoTitle:
        "Botones interactivos - Componentes táctiles en React y Tailwind CSS",
      seoDescription:
        "Mejora tus llamadas a la acción con botones interactivos para React con física magnética y accesibilidad por teclado.",
      keywords: [
        "botones react animados",
        "botón magnético react",
        "botones tailwind css accesibles",
      ],
      faqs: [
        {
          question: "¿Son accesibles estos botones con teclado?",
          answer:
            "Sí, cumplen con WAI-ARIA e incluyen anillos de enfoque visibles y soporte completo para teclas Enter y Espacio.",
        },
      ],
    },
    fr: {
      name: "Boutons interactifs",
      seoTitle:
        "Boutons interactifs - Micro-interactions tactiles React & Tailwind",
      seoDescription:
        "Optimisez vos taux de conversion avec des boutons interactifs en React offrant des effets magnétiques et une accessibilité complète.",
      keywords: [
        "boutons interactifs react",
        "bouton magnétique react",
        "boutons tailwind accessibles",
      ],
      faqs: [
        {
          question: "Ces boutons sont-ils accessibles au clavier ?",
          answer:
            "Oui, ils intègrent un anneau de focus natif et respectent les recommandations WAI-ARIA.",
        },
      ],
    },
    ar: {
      name: "الأزرار التفاعلية",
      seoTitle: "الأزرار التفاعلية - مكونات أزرار جذابة ومغناطيسية في React",
      seoDescription:
        "زد من تفاعل المستخدمين مع أزرار تفاعلية عالية الأداء في React تدعم الانجذاب المغناطيسي وسهولة الوصول الكاملة.",
      keywords: [
        "أزرار تفاعلية react",
        "زر مغناطيسي react",
        "أزرار سهلة الوصول tailwind",
      ],
      faqs: [
        {
          question: "هل تدعم الأزرار التنقل بلوحة المفاتيح؟",
          answer:
            "نعم، تتوافق تمامًا مع معايير WAI-ARIA وتستجيب لمفاتيح Enter و Space بسلاسة.",
        },
      ],
    },
    ja: {
      name: "インタラクティブボタン",
      seoTitle:
        "ボタンコンポーネント - React & Tailwind CSS マグネティック＆シマーボタン",
      seoDescription:
        "マグネティックカーソル追従やシマーエフェクトを備えた高コンバージョンな React ボタンコンポーネント。キーボード操作完全対応。",
      keywords: [
        "Reactボタンアニメーション",
        "マグネティックボタン",
        "アクセシブルボタンReact",
      ],
      faqs: [
        {
          question: "キーボード操作に対応していますか？",
          answer:
            "はい。フォーカスリングを備え、Enter や Space キーでの操作など WAI-ARIA ガイドラインに完全準拠しています。",
        },
      ],
    },
  },
  "theme-transitions": {
    "zh-CN": {
      name: "明暗主题切换动画",
      seoTitle: "主题切换动画 - React 与 Next.js 暗黑模式平滑过渡",
      seoDescription:
        "基于原生 View Transitions API 与圆形裁剪蒙版实现的沉浸式主题过渡效果，彻底告别未样式化闪烁（FOUC）。",
      keywords: [
        "React主题切换动画",
        "Next.js暗黑模式动画",
        "View Transitions API主题",
        "圆形扩散主题切换",
      ],
      faqs: [
        {
          question: "在不支持 View Transitions API 的浏览器中表现如何？",
          answer:
            "组件自带优雅降级方案，在旧版浏览器中自动回退为标准 CSS 过渡或平滑切换，绝不出错。",
        },
      ],
    },
    es: {
      name: "Transiciones de tema",
      seoTitle:
        "Transiciones de tema - Animaciones de modo oscuro en React y Next.js",
      seoDescription:
        "Implementa transiciones fluidas de modo oscuro en React y Next.js mediante View Transitions API y clip-path.",
      keywords: [
        "transición de modo oscuro react",
        "view transitions api tema",
        "cambio de tema circular nextjs",
      ],
      faqs: [
        {
          question:
            "¿Qué ocurre en navegadores sin soporte de View Transitions?",
          answer:
            "El componente incluye una alternativa progresiva que aplica transiciones CSS inmediatas sin errores.",
        },
      ],
    },
    fr: {
      name: "Transitions de thème",
      seoTitle:
        "Transitions de thème - Animations de mode sombre React & Next.js",
      seoDescription:
        "Intégrez des animations de passage au mode sombre saisissantes grâce à l'API View Transitions et clip-path.",
      keywords: [
        "transition mode sombre react",
        "view transitions api dark mode",
        "bascule de thème animée nextjs",
      ],
      faqs: [
        {
          question:
            "Comment se comporte le composant sur les anciens navigateurs ?",
          answer:
            "Un repli automatique applique une transition CSS fluide sans interrompre l'expérience utilisateur.",
        },
      ],
    },
    ar: {
      name: "انتقالات المظهر والوضع الليلي",
      seoTitle: "انتقالات المظهر - تحويلات الوضع الليلي السلسة في React",
      seoDescription:
        "أضف تأثيرات انتقال دائرية ناعمة عند التبديل بين الوضع النهاري والليلي باستخدام View Transitions API.",
      keywords: [
        "الوضع الليلي react",
        "انتقال المظهر nextjs",
        "تبديل الوضع الداكن بسلاسة",
      ],
      faqs: [
        {
          question: "ماذا يحدث في المتصفحات التي لا تدعم View Transitions API؟",
          answer:
            "يتضمن المكون آلية تحول تلقائية تطبق الانتقالات المباشرة دون حدوث أي وميض أو أخطاء.",
        },
      ],
    },
    ja: {
      name: "テーマ切替アニメーション",
      seoTitle:
        "テーマトランジション - React & Next.js ダークモード切替アニメーション",
      seoDescription:
        "ブラウザ標準の View Transitions API や円形 clip-path を活用した滑らかなダークモード切替。FOUC（スタイルのチラつき）ゼロ。",
      keywords: [
        "Reactテーマ切り替え",
        "ダークモードアニメーション",
        "View Transitions API",
      ],
      faqs: [
        {
          question: "View Transitions API 非対応ブラウザではどうなりますか？",
          answer:
            "プログレッシブエンハンスメントにより、自動的にフォールバック処理が行われエラーなく即座に切り替わります。",
        },
      ],
    },
  },
  shaders: {
    "zh-CN": {
      name: "WebGL 着色器与画布动画",
      seoTitle: "WebGL 着色器组件 - React 与 GPU 加速画布图形",
      seoDescription:
        "无需引入庞大 3D 引擎，使用原生 WebGL 与轻量 GLSL 片元着色器为 React 应用赋予前沿流体与视觉扭曲效果。",
      keywords: [
        "React WebGL着色器",
        "GLSL片元着色器React",
        "GPU加速画布动画",
        "流体着色器背景",
      ],
      faqs: [
        {
          question: "这些着色器是否依赖 Three.js 等大型第三方库？",
          answer:
            "不依赖。所有着色器均为纯原生 WebGL 和轻量 Canvas 实现，运行时代价微乎其微。",
        },
      ],
    },
    es: {
      name: "Shaders WebGL",
      seoTitle: "Shaders WebGL - Gráficos GPU interactivos en React",
      seoDescription:
        "Añade shaders de fragmentos WebGL acelerados por GPU a tus proyectos React sin la sobrecarga de Three.js.",
      keywords: [
        "shaders webgl react",
        "glsl fragment shader react",
        "animaciones gpu canvas nextjs",
      ],
      faqs: [
        {
          question: "¿Requieren Three.js u otras librerías pesadas?",
          answer:
            "No. Están construidos con WebGL puro y ligero para un impacto mínimo en el tamaño final del paquete.",
        },
      ],
    },
    fr: {
      name: "Shaders WebGL",
      seoTitle: "Shaders WebGL - Graphismes GPU interactifs pour React",
      seoDescription:
        "Ajoutez des shaders WebGL accélérés par GPU à vos applications React sans dépendre d'un moteur 3D volumineux.",
      keywords: [
        "shaders webgl react",
        "fragment shader glsl react",
        "graphismes gpu canvas nextjs",
      ],
      faqs: [
        {
          question: "Les shaders nécessitent-ils Three.js ?",
          answer:
            "Non, ils utilisent du WebGL natif léger sans alourdir le bundle de l'application.",
        },
      ],
    },
    ar: {
      name: "تظليلات WebGL الرسومية",
      seoTitle: "تظليلات WebGL - مؤثرات رسومية متقدمة بمعالجة GPU في React",
      seoDescription:
        "أضف تأثيرات بصرية حركية متقدمة عبر WebGL بدون الحاجة لمكتبات ثلاثية الأبعاد ثقيلة وبكفاءة عالية.",
      keywords: [
        "تظليلات webgl react",
        "رسومات gpu الكانفاس",
        "تأثيرات بصرية متطورة nextjs",
      ],
      faqs: [
        {
          question: "هل تتطلب هذه التظليلات مكتبات ضخمة مثل Three.js؟",
          answer:
            "كلا، كُتبت بالاعتماد المباشر على WebGL الخام الخفيف لضمان أقصى سرعة وأقل حجم كود.",
        },
      ],
    },
    ja: {
      name: "WebGL シェーダー",
      seoTitle: "WebGL シェーダー - React & GPU アクセラレーション描画",
      seoDescription:
        "Three.js などの重厚なライブラリなしで、軽量な生 WebGL と GLSL フラグメントシェーダーによる高精彩エフェクトを実現。",
      keywords: [
        "React WebGLシェーダー",
        "GLSLフラグメントシェーダー",
        "GPUキャンバスアニメーション",
      ],
      faqs: [
        {
          question: "Three.js などの 3D ライブラリは必須ですか？",
          answer:
            "いいえ。軽量な生 WebGL 実装のためバンドルサイズを肥大化させることなく高速に動作します。",
        },
      ],
    },
  },
};

export function getLanguageAlternates(
  pathname: string,
): Record<string, string> {
  const cleanPath =
    pathname === "/"
      ? ""
      : pathname.startsWith("/")
        ? pathname
        : `/${pathname}`;
  const fullUrl = `${BASE_URL}${cleanPath}`;

  return {
    en: fullUrl,
    "zh-CN": fullUrl,
    es: fullUrl,
    fr: fullUrl,
    ar: fullUrl,
    ja: fullUrl,
    "x-default": fullUrl,
  };
}

export function getAllSeoKeywords(): string[] {
  const keywordSet = new Set<string>();

  (Object.keys(SITE_I18N_SEO) as SupportedLocale[]).forEach((locale) => {
    SITE_I18N_SEO[locale].keywords.forEach((kw) => keywordSet.add(kw));
  });

  return Array.from(keywordSet);
}

export function generateRootLdJsonGraph() {
  const websiteEntity = {
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    url: BASE_URL,
    name: "Great UI",
    alternateName: [
      "Great-UI",
      "GreatUI",
      "极佳 UI",
      "Great UI React",
      "Great UI Components",
    ],
    description: SITE_I18N_SEO.en.description,
    inLanguage: ["en-US", "zh-CN", "es-ES", "fr-FR", "ar-SA", "ja-JP"],
    publisher: {
      "@id": `${BASE_URL}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/components?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const softwareEntity = {
    "@type": "SoftwareApplication",
    "@id": `${BASE_URL}/#software`,
    name: "Great UI",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "All",
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    softwareVersion: "1.0.0",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: BASE_URL,
    description: SITE_I18N_SEO.en.aeoSummary,
    featureList: [
      "Copy-paste accessible React components",
      "Tailwind CSS v4 styling",
      "Motion/react 60fps animations",
      "Hardware-accelerated HTML5 Canvas and WebGL Shaders",
      "Next.js App Router and SSR zero-shift transitions",
      "WCAG 2.1 AA keyboard accessibility",
      "shadcn CLI instant installation",
    ],
  };

  const organizationEntity = {
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    name: "Great UI",
    url: BASE_URL,
    logo: `${BASE_URL}/logo/logo-dark.png`,
    sameAs: [
      "https://github.com/Saurabh-2607/GreatUI",
      "https://x.com/GreatUIHQ",
    ],
    description:
      "Open-source React and Tailwind CSS UI library crafting premium developer tools and components.",
  };

  const allFaqs = (Object.keys(SITE_I18N_SEO) as SupportedLocale[]).flatMap(
    (locale) =>
      SITE_I18N_SEO[locale].faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        inLanguage: locale,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.answer,
          inLanguage: locale,
        },
      })),
  );

  const faqEntity = {
    "@type": "FAQPage",
    "@id": `${BASE_URL}/#faq`,
    mainEntity: allFaqs,
  };

  return {
    "@context": "https://schema.org",
    "@graph": [websiteEntity, softwareEntity, organizationEntity, faqEntity],
  };
}

export function generateCategoryLdJsonGraph(
  categorySlug: string,
  englishName: string,
  englishDescription: string,
  englishFaqs: Array<{ question: string; answer: string }>,
  componentCount: number,
) {
  const i18nData = CATEGORY_I18N[categorySlug];
  const pageUrl = `${BASE_URL}/components/category/${categorySlug}`;

  const alternateNames: string[] = [englishName];
  if (i18nData) {
    (Object.keys(i18nData) as Array<keyof typeof i18nData>).forEach((loc) => {
      alternateNames.push(i18nData[loc].name);
    });
  }

  const multilingualFaqs = [
    ...englishFaqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      inLanguage: "en-US",
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
        inLanguage: "en-US",
      },
    })),
  ];

  if (i18nData) {
    (Object.keys(i18nData) as Array<keyof typeof i18nData>).forEach((loc) => {
      const categoryLoc = i18nData[loc];
      categoryLoc.faqs.forEach((f) => {
        multilingualFaqs.push({
          "@type": "Question",
          name: f.question,
          inLanguage: loc,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.answer,
            inLanguage: loc,
          },
        });
      });
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${englishName} Components`,
    alternateName: alternateNames,
    headline: `${englishName} Components for React & Tailwind CSS`,
    description: englishDescription,
    url: pageUrl,
    inLanguage: ["en-US", "zh-CN", "es-ES", "fr-FR", "ar-SA", "ja-JP"],
    isPartOf: {
      "@type": "WebSite",
      name: "Great UI",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Great UI",
      url: BASE_URL,
      logo: `${BASE_URL}/logo/logo-dark.png`,
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: componentCount,
    },
    hasPart: {
      "@type": "FAQPage",
      mainEntity: multilingualFaqs,
    },
  };
}

export function generateComponentLdJsonGraph(
  slug: string,
  name: string,
  description: string,
  category: string,
) {
  const componentUrl = `${BASE_URL}/components/${slug}`;
  const ogImageUrl = `${BASE_URL}/api/og?title=${encodeURIComponent(name)}&breadcrumbs=Components,${encodeURIComponent(category)}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareSourceCode",
        "@id": `${componentUrl}/#sourcecode`,
        name: `${name} Component`,
        programmingLanguage: "TypeScript",
        runtimePlatform: "React",
        targetProduct: {
          "@type": "SoftwareApplication",
          name: "React & Next.js",
          applicationCategory: "DeveloperApplication",
        },
        codeRepository: "https://github.com/Saurabh-2607/GreatUI",
        description,
        url: componentUrl,
        image: ogImageUrl,
        inLanguage: ["en", "zh-CN", "es", "fr", "ar", "ja"],
        keywords: [
          name,
          `${name} React component`,
          `${name} Tailwind CSS`,
          `${category} component`,
          "copy paste UI component",
          "Next.js App Router component",
          "accessible react component",
        ],
      },
      {
        "@type": "TechArticle",
        "@id": `${componentUrl}/#article`,
        headline: `${name} - React & Tailwind CSS Component`,
        description,
        url: componentUrl,
        image: ogImageUrl,
        inLanguage: ["en-US", "zh-CN", "es-ES", "fr-FR", "ar-SA", "ja-JP"],
        isPartOf: {
          "@type": "WebSite",
          name: "Great UI",
          url: BASE_URL,
        },
        author: {
          "@type": "Organization",
          name: "Great UI",
          url: BASE_URL,
        },
      },
    ],
  };
}
