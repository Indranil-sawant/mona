"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { ShowcaseCanvas } from "./ShowcaseCanvas";
import { ShowcaseTextOverlays } from "./ShowcaseTextOverlays";

/**
 * Showcase/index.tsx
 * ──────────────────────────────────────────────────────────────────────────
 * A premium, full-screen scrollytelling section using /public/images3/
 * It creates a 500vh scroll zone where the screen stays sticky
 * for an immersive mango animation synchronized smoothly to scrolling.
 * ──────────────────────────────────────────────────────────────────────────
 */

export function ShowcaseSection() {
  const scrollZoneRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const el = scrollZoneRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const zoneH = el.offsetHeight - window.innerHeight;
    const scrolled = -rect.top;
    const clamped = Math.max(0, Math.min(1, scrolled / zoneH));
    setScrollProgress(clamped);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <section
      ref={scrollZoneRef}
      id="showcase"
      className="relative w-full z-20 bg-[#050505]"
      style={{ height: "500vh" }}
      aria-label="Mango Showcase Section"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Background ambient light */}
        <div className="absolute inset-0 z-0 bg-radial-gradient from-[#1a130a] via-[#050505] to-[#010101]" />
        
        {/* Film grain effect */}
        <div 
          className="absolute inset-0 z-10 opacity-10 pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")"
          }}
        />

        {/* The 240-frame Canvas Layer */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          <ShowcaseCanvas scrollProgress={scrollProgress} />
        </div>

        {/* Sync Text Overlays */}
        <ShowcaseTextOverlays scrollProgress={scrollProgress} />

        {/* Bottom smooth edge gradient into next section */}
        <div 
          className="absolute inset-x-0 bottom-0 h-48 z-40 pointer-events-none"
          style={{
            background: "linear-gradient(to top, #0a0a0a 0%, transparent 100%)"
          }}
        />
        
        {/* Top smooth edge gradient */}
        <div 
          className="absolute inset-x-0 top-0 h-32 z-40 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, #0a0a0a 0%, transparent 100%)"
          }}
        />
      </div>
    </section>
  );
}
