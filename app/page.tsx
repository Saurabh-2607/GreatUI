import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import BackgroundGrid from "@/components/BackgroundGrid";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-white dark:bg-[#0a0a0a] text-neutral-900 dark:text-white transition-colors overflow-x-hidden pb-16">
      <BackgroundGrid />
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
}


