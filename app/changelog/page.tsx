import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import BackgroundGrid from "@/components/site/BackgroundGrid";
import Container from "@/components/site/Container";
import ChangelogTimeline from "@/components/site/ChangelogTimeline";

export const metadata = {
  title: "Changelog | Great UI",
  description:
    "Stay up to date with the latest additions, improvements, and fixes in Great UI.",
};

export default function ChangelogPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-white text-neutral-900 transition-colors dark:bg-[#0a0a0a] dark:text-white">
      <BackgroundGrid />
      <Navbar />

      <Container>
        <main className="relative mx-auto max-w-5xl py-24 md:py-32">
          <div className="mb-20">
            <h1 className="mb-4 text-4xl font-black tracking-tight text-neutral-900 sm:text-6xl dark:text-white">
              Changelog
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-400">
              New updates and improvements to Great UI.
            </p>
          </div>

          <ChangelogTimeline />
        </main>
      </Container>

      <Footer />
    </div>
  );
}
