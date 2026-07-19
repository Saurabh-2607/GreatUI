import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import BackgroundGrid from "@/components/BackgroundGrid";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import Sponsors from "@/components/Sponsors";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-white pb-16 text-neutral-900 transition-colors dark:bg-[#0a0a0a] dark:text-white">
      <BackgroundGrid />
      <Navbar />
      <AnnouncementBanner />
      <Hero />
      <Sponsors />
      <Footer />
    </div>
  );
}
