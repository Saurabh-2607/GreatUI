import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#171717] text-white">
      <Navbar />

      <main className="px-4">
        <Hero />
      </main>
    </div>
  );
}


