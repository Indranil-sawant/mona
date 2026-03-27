/**
 * app/page.tsx
 * Home page — renders the Navbar + Hero section.
 * All other page sections (#products, #story, etc.) can be appended below.
 */

import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Story } from "@/components/Story";
import { ShowcaseSection } from "@/components/Showcase";

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

<<<<<<< HEAD
      {/* ── Product listings ─────────────────────────────── */}
      <section
        id="products"
        className="section-full flex flex-col justify-center py-32 bg-gradient-to-br from-[#0c0c0c] to-[#120e06]"
      >
        <div className="container-premium px-[clamp(1rem,8vw,3rem)] md:px-[10%] text-left">
          <span className="text-[clamp(0.7rem,0.9vw,0.85rem)] font-bold tracking-[0.2em] uppercase text-accent/60 leading-none mb-4 block">
            The Selection
          </span>
          <h2 className="text-[clamp(2.4rem,6vw,5.5rem)] font-extrabold tracking-tight leading-[1.05] text-shimmer text-balance uppercase mb-10">
            OUR<br />MANGOES
          </h2>
          <div className="max-w-[90%] md:max-w-[600px]">
            <p className="text-[clamp(0.95rem,1.2vw,1.1rem)] leading-[1.6] text-white/40 text-pretty">
              Our curated collection of premium Ratnagiri Alphonso mangoes is currently 
              undergoing final quality verification. 
            </p>
            <div className="mt-16 flex items-center gap-6">
              <div className="px-10 py-5 border border-white/5 rounded-full text-white font-black tracking-widest text-xs uppercase bg-white/5">
                Coming Late 2024
              </div>
              <div className="w-12 h-px bg-accent/20" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact ───────────────────────────────────────── */}
      <section
        id="contact"
        className="section-full flex flex-col justify-center py-32 bg-[#0a0a0a]"
      >
        <div className="container-premium px-[clamp(1rem,8vw,3rem)] md:px-[10%] text-left">
          <span className="text-[clamp(0.7rem,0.9vw,0.85rem)] font-bold tracking-[0.2em] uppercase text-accent/60 leading-none mb-4 block">
            Private Access
          </span>
          <h2 className="text-[clamp(2.4rem,6vw,5.5rem)] font-extrabold tracking-tight leading-[1.05] text-white text-balance uppercase mb-10">
            GET IN<br />TOUCH
          </h2>
          <div className="max-w-[90%] md:max-w-[600px]">
            <p className="text-[clamp(0.95rem,1.2vw,1.1rem)] leading-[1.6] text-white/40 mb-12 text-pretty">
              Experience the gold standard of mangoes. For wholesale inquiries 
              or private collection access, reach out to our concierge.
            </p>
            <a 
              href="mailto:concierge@monamangoes.com"
              className="inline-flex items-center gap-10 px-12 py-6 bg-gradient-to-r from-accent to-accent-alt text-[#0a0a0a] font-black rounded-full text-xs uppercase tracking-[0.2em] transition-all hover:scale-[1.05] active:scale-95 shadow-xl"
            >
              <span>Contact Concierge</span>
              <span className="text-xl">→</span>
            </a>
          </div>
        </div>
      </section>

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
=======
      {/* ── Showcase: The Varieties ────────────────────────── */}
      <ShowcaseSection />
>>>>>>> 8226d96 ( Added 3rd section for the site)
    </main>
  );
}
