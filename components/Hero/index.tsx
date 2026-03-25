"use client";

/**
 * Hero/index.tsx
 * ──────────────────────────────────────────────────────────────────────────
 * Main hero wrapper — orchestrates:
 *   • 500vh tall scroll zone
 *   • Sticky full-screen container (canvas + overlays live here)
 *   • Real-time scroll → scrollProgress (0–1) via useScroll
 *   • Passes progress down to HeroCanvas + HeroTextOverlays
 *
 * Architecture note:
 *   The scroll zone is 500vh (the "scroll driver"). The sticky inner
 *   panel is 100vh and stays pinned while the user scrolls through
 *   the 500vh zone. Canvas + overlays react to scrollProgress.
 * ──────────────────────────────────────────────────────────────────────────
 */

import { useRef, useEffect, useState, useCallback } from "react";
import { HeroCanvas }       from "./HeroCanvas";
import { HeroTextOverlays } from "./HeroTextOverlays";
import { OrderModal }      from "../OrderModal";

/* ── Leaf SVG (decorative parallax element) ─────────────────── */
function LeafOverlay({ progress }: { progress: number }) {
  // Move leaf at 0.3× scroll speed (parallax)
  const ty = progress * -80; // up to -80px offset
  return (
    <div
      className="absolute bottom-0 right-0 w-40 md:w-56 lg:w-72 pointer-events-none z-10 leaf-parallax"
      style={{
        transform: `translateY(${ty}px) translateX(20px)`,
        opacity:   0.18,
        transition: "transform 0.1s linear",
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 200 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
      >
        <path
          d="M100 10 C160 50, 190 130, 160 210 C130 290, 70 310, 40 260 C10 210, 30 130, 70 80 C85 60, 95 40, 100 10Z"
          fill="#2E7D32"
          opacity="0.9"
        />
        <path
          d="M100 10 C90 80, 80 160, 85 250"
          stroke="#1B5E20"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        {[60, 100, 140, 180].map((y, i) => (
          <path
            key={i}
            d={`M${90 - i * 2} ${y} C${65 + i * 3} ${y - 10}, ${50 + i * 4} ${y + 5}, ${35 + i * 5} ${y - 5}`}
            stroke="#1B5E20"
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
            opacity="0.7"
          />
        ))}
      </svg>
    </div>
  );
}

/* ── Scroll progress indicator bar ─────────────────────────── */
function ProgressBar({ progress }: { progress: number }) {
  return (
    <div
      className="fixed bottom-0 left-0 h-0.5 z-50 transition-none"
      style={{
        width:      `${progress * 100}%`,
        background: "linear-gradient(90deg, #FFC300, #FF6A00)",
        boxShadow:  "0 0 8px rgba(255,195,0,0.8)",
      }}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
      aria-label="Hero scroll progress"
    />
  );
}

/* ── Main Hero Component ────────────────────────────────────── */
export function Hero() {
  const scrollZoneRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isModalOpen, setIsModalOpen]       = useState(false);

  /* ── Compute scroll progress relative to scroll zone ─────── */
  const handleScroll = useCallback(() => {
    const el = scrollZoneRef.current;
    if (!el) return;

    const rect     = el.getBoundingClientRect();
    const zoneH    = el.offsetHeight - window.innerHeight;
    const scrolled = -rect.top;
    const clamped  = Math.max(0, Math.min(1, scrolled / zoneH));
    setScrollProgress(clamped);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleOrderNow = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  return (
    <>
      <ProgressBar progress={scrollProgress} />

      <OrderModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      <div
        ref={scrollZoneRef}
        id="hero"
        className="relative w-full"
        style={{ height: "500vh" }}
      >
        <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-background">
          <div
            className="absolute inset-0 z-0"
            style={{
              background: "linear-gradient(135deg, #1a1a1a 0%, #3b2f1c 60%, #1a1a1a 100%)",
            }}
            aria-hidden="true"
          />

          <HeroCanvas
            scrollProgress={scrollProgress}
            className="z-10"
          />

          <LeafOverlay progress={scrollProgress} />

          <HeroTextOverlays
            scrollProgress={scrollProgress}
            onOrderNow={handleOrderNow}
          />

          {scrollProgress < 0.04 && (
            <div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2 pointer-events-none"
              aria-label="Scroll down to explore"
            >
              <span
                className="text-[10px] tracking-widest uppercase font-semibold"
                style={{ color: "rgba(255,195,0,0.6)" }}
              >
                scroll to explore
              </span>
              <div
                className="w-5 h-8 rounded-full border flex items-start justify-center pt-1.5"
                style={{ borderColor: "rgba(255,195,0,0.4)" }}
                aria-hidden="true"
              >
                <div
                  className="w-1 h-2.5 rounded-full"
                  style={{
                    background: "#FFC300",
                    animation: "floatDrift 1.6s ease-in-out infinite",
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
