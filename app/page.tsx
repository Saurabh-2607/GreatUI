import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";
import BackgroundGrid from "@/components/site/BackgroundGrid";
// import AnnouncementBanner from "@/components/site/AnnouncementBanner";
import Sponsors from "@/components/site/Sponsors";
import BentoGrid from "@/components/site/BentoGrid";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Great UI - Accessible React & Tailwind Components",
  description:
    "A curated collection of beautiful, copy-paste React components built with TypeScript, Tailwind CSS, and Framer Motion. Craft premium interfaces instantly.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-white pb-16 text-neutral-900 transition-colors dark:bg-[#0a0a0a] dark:text-white">
      <BackgroundGrid />
      <Navbar />
      {/* <AnnouncementBanner /> */}
      <Hero />
      <BentoGrid />
      <Contact />
      <Sponsors />
      <Footer />
    </div>
  );
}
