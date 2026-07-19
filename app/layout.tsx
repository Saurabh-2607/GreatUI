import type { Metadata } from "next";
import localFont from "next/font/local";
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
  title: "Great UI",
  description:
    "A collection of clean, accessible, and composable React components built with Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ttCommons.variable} dark h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans bg-white dark:bg-[#0a0a0a] text-neutral-900 dark:text-[#ededed] transition-colors">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
