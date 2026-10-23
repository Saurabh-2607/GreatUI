import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import ThemeProvider from "@/components/site/ThemeProvider";
import { SearchCommand } from "@/components/site/SearchCommand";
import VideoPreloader from "@/components/site/VideoPreloader";
import {
  getLanguageAlternates,
  getAllSeoKeywords,
  ALTERNATE_OG_LOCALES,
  generateRootLdJsonGraph,
} from "@/lib/i18n-seo";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const ttCommons = localFont({
  src: [
    {
      path: "../public/fonts/TT Commons Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/TT Commons Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/TT Commons DemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/TT Commons Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/TT Commons ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-tt",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://www.great-ui.com",
  ),
  title: {
    default: "Great UI - Craft Premium React Interfaces with Absolute Speed",
    template: "%s | Great UI",
  },
  description:
    "Beautiful, accessible, and high-performance React components built with Tailwind CSS. Copy, paste, and build premium interfaces instantly.",
  keywords: getAllSeoKeywords(),
  authors: [
    { name: "Great UI Team", url: "https://github.com/Saurabh-2607/GreatUI" },
  ],
  creator: "Great UI",
  publisher: "Great UI",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Great UI - Craft Premium React Interfaces with Absolute Speed",
    description:
      "Beautiful, accessible, and high-performance React components built with Tailwind CSS. Copy, paste, and build premium interfaces instantly.",
    url: "https://www.great-ui.com",
    siteName: "Great UI",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Great UI - Craft Premium React Interfaces with Absolute Speed",
      },
    ],
    locale: "en_US",
    alternateLocale: ALTERNATE_OG_LOCALES,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Great UI - Craft Premium React Interfaces with Absolute Speed",
    description:
      "Beautiful, accessible, and high-performance React components built with Tailwind CSS.",
    site: "@GreatUIHQ",
    creator: "@GreatUIHQ",
    images: ["/twitter-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/Great-UI.png",
  },
  alternates: {
    canonical: "/",
    languages: getLanguageAlternates("/"),
  },
};

export function BreakpointIndicator() {
  if (process.env.NODE_ENV === "production") return null;

  return (
    <div className="fixed bottom-1 left-1 z-50 flex size-6 items-center justify-center rounded-full bg-gray-800 p-3 font-mono text-xs text-white">
      <div className="block sm:hidden">xs</div>
      <div className="hidden sm:block md:hidden">sm</div>
      <div className="hidden md:block lg:hidden">md</div>
      <div className="hidden lg:block xl:hidden">lg</div>
      <div className="hidden xl:block 2xl:hidden">xl</div>
      <div className="hidden 2xl:block">2xl</div>
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${ttCommons.variable} dark h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white font-sans text-neutral-900 transition-colors dark:bg-neutral-950 dark:text-neutral-100">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateRootLdJsonGraph()),
          }}
        />
        <ThemeProvider>
          <SearchCommand />
          {children}
          <BreakpointIndicator />
          <VideoPreloader />
        </ThemeProvider>
      </body>
    </html>
  );
}
