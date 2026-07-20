import type { Metadata } from "next";
import localFont from "next/font/local";
import { Databuddy } from "@databuddy/sdk/react";
import ThemeProvider from "@/components/ThemeProvider";
import "./globals.css";

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
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://great-ui.com"),
  title: {
    default: "Great UI - Craft Premium React Interfaces with Absolute Speed",
    template: "%s | Great UI",
  },
  description:
    "Beautiful, accessible, and high-performance React components built with Tailwind CSS. Copy, paste, and build premium interfaces instantly.",
  keywords: [
    "React components",
    "Tailwind CSS",
    "UI library",
    "Design system",
    "Accessible React UI",
    "Next.js UI components",
    "Copy paste React components",
  ],
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
    url: "https://great-ui.com",
    siteName: "Great UI",
    images: [
      {
        url: "/Great-UI.png",
        width: 1200,
        height: 630,
        alt: "Great UI Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Great UI - Craft Premium React Interfaces with Absolute Speed",
    description:
      "Beautiful, accessible, and high-performance React components built with Tailwind CSS.",
    images: ["/Great-UI.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/Great-UI.png",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ttCommons.variable} dark h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-white font-sans text-neutral-900 transition-colors dark:bg-[#0a0a0a] dark:text-[#ededed]">
        <ThemeProvider>
          <Databuddy
            clientId={process.env.NEXT_PUBLIC_DATABUDDY_CLIENT_ID!}
            trackWebVitals
            trackErrors
          />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
