/**
 * app/page.tsx
 * Home page — renders the Navbar + Hero section.
 * All other page sections (#products, #story, etc.) can be appended below.
 */

import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Story } from "@/components/Story";
import { ShowcaseSection } from "@/components/Showcase";
import { ExperienceSection } from "@/components/Experience";

export default function Home() {
  return (
    <main className="bg-background selection:bg-accent selection:text-black">
      {/* ── Persistent top navbar ─────────────────────────── */}
      <Navbar />

      {/* ── Hero scrollytelling section ────────────────────── */}
      <section id="hero" className="relative">
        <Hero />
      </section>

      {/* ── Story scrollytelling section ───────────────────── */}
      <section id="story" className="relative">
        <Story />
      </section>

      {/* ── Showcase: The Varieties ────────────────────────── */}
      <ShowcaseSection />

      {/* ── Experience: The Finale ─────────────────────────── */}
      <ExperienceSection />

      {/* ── Product listings ─────────────────────────────── */}


      {/* ── Footer ────────────────────────────────────────── */}
      <footer className="py-12 border-t border-white/5 bg-[#0a0a0a]">
        <div className="container-premium flex flex-col md:flex-row justify-between items-center gap-6 opacity-40 text-[clamp(0.7rem,0.9vw,0.75rem)] font-bold tracking-[0.2em] uppercase px-[clamp(1rem,4vw,3rem)]">
          <div>© 2024 MONA MANGOES · FINEST FRUIT COLLECTIVE</div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-accent transition-colors">Instagram</a>
            <a href="#" className="hover:text-accent transition-colors">Provenance</a>
            <a href="#" className="hover:text-accent transition-colors">Privacy</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
