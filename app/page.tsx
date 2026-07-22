import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import Footer from "@/components/site/Footer";
import BackgroundGrid from "@/components/site/BackgroundGrid";
import AnnouncementBanner from "@/components/site/AnnouncementBanner";
// import Sponsors from "@/components/site/Sponsors";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-white pb-16 text-neutral-900 transition-colors dark:bg-[#0a0a0a] dark:text-white">
      <BackgroundGrid />
      <Navbar />
      <AnnouncementBanner />
      <Hero />
      {/* <Sponsors /> */}
      <Footer />
    </div>
  );
}
