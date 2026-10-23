import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import ComponentShowcase from "@/components/site/ComponentShowcase";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";
import BackgroundGrid from "@/components/site/BackgroundGrid";
import Sponsors from "@/components/site/Sponsors";
import Testimonials from "@/components/site/Testimonials";
import CTASection from "@/components/site/CTASection";

import type { Metadata } from "next";
import {
  getLanguageAlternates,
  getAllSeoKeywords,
  ALTERNATE_OG_LOCALES,
} from "@/lib/i18n-seo";

export const metadata: Metadata = {
  title: "Great UI - Accessible React & Tailwind Components",
  description:
    "A curated collection of beautiful, copy-paste React components built with TypeScript, Tailwind CSS, and Framer Motion. Craft premium interfaces instantly.",
  keywords: getAllSeoKeywords(),
  openGraph: {
    title: "Great UI - Accessible React & Tailwind Components",
    description:
      "A curated collection of beautiful, copy-paste React components built with TypeScript, Tailwind CSS, and Framer Motion. Craft premium interfaces instantly.",
    url: "/",
    locale: "en_US",
    alternateLocale: ALTERNATE_OG_LOCALES,
  },
  alternates: {
    canonical: "/",
    languages: getLanguageAlternates("/"),
  },
};

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-white text-neutral-900 transition-colors dark:bg-neutral-950 dark:text-white">
      <BackgroundGrid />
      <Navbar />
      <Hero />
      <ComponentShowcase />
      <Testimonials />
      <Sponsors />
      <CTASection />
      <Contact />
      <Footer />
    </div>
  );
}
