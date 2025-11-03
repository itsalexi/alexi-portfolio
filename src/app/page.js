import Hero from "../components/Hero";
import { Spotlight } from "../components/ui/spotlight";
import { Meteors } from "../components/ui/meteors";
import ClickParticles from "../components/ClickParticles";

export default function Home() {
  return (
    <div className="relative flex min-h-screen items-stretch justify-center overflow-hidden bg-zinc-50 font-sans dark:bg-black">
      <ClickParticles />
      <Spotlight
        className="left-0 top-0 hidden md:left-1/4 md:top-0 md:block"
        fill="#60a5fa"
      />
      <div className="pointer-events-none absolute inset-0">
        <Meteors number={5} />
      </div>
      <main className="relative z-10 flex min-h-screen w-full max-w-3xl flex-col py-16 px-6 sm:px-12">
        <section aria-label="Hero" className="flex flex-1 items-center">
          <div className="w-full">
            <Hero />
          </div>
        </section>
        <section aria-label="At a Glance" className="hidden" />
        <section aria-label="Featured Projects" className="hidden" />
        <section aria-label="Recent Talks" className="hidden" />
        <section aria-label="Recent Blog Posts" className="hidden" />
        <section aria-label="Security Research Highlights" className="hidden" />
        <section aria-label="Footer" className="hidden" />
      </main>
    </div>
  );
}
