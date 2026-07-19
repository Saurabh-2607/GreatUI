import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import BackgroundGrid from "@/components/BackgroundGrid";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import Sponsors from "@/components/Sponsors";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-white dark:bg-[#0a0a0a] text-neutral-900 dark:text-white transition-colors overflow-x-hidden pb-16">
      <BackgroundGrid />
      <Navbar />
      <AnnouncementBanner />
      <Hero />
      <Sponsors />
      <Footer />
    </div>
  );
}


