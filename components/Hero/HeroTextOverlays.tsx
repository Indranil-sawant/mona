"use client";

/**
 * HeroTextOverlays.tsx
 * ──────────────────────────────────────────────────────────────────────────
 * Production-Grade Typography & Layout Architecture.
 * 
 * Features:
 *  • Unified Fluid Typography System (clamp-based)
 *  • Intentional Asymmetrical Composition (Left-Biased)
 *  • 100svh Mobile Viewport Handling
 *  • Zero-Overlap Scroll Staggering
 * ──────────────────────────────────────────────────────────────────────────
 */

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface HeroTextOverlaysProps {
  scrollProgress: number;
  onOrderNow: () => void;
}

/* ── Zone visibility helper ─────────────────────────────────── */
function easeOut(t: number): number {
  return 1 - Math.pow(1 - Math.max(0, Math.min(1, t)), 3);
}

function zoneVisible(p: number, start: number, end: number) {
  if (p < start || p > end) {
    return { opacity: 0, tx: -15, ty: 0 };
  }
  const len   = end - start;
  const local = (p - start) / len;
  const fade  = 0.3; 
  let v = (local < fade) ? easeOut(local / fade) : (local > 1 - fade) ? easeOut((1 - local) / fade) : 1;
  return { opacity: v, tx: (1 - v) * -15, ty: 0 };
}

/* ── Animated Typography Block ────────────────────────────── */
interface CornerBlockProps {
  progress: number;
  zoneStart: number;
  zoneEnd: number;
  position?: "left" | "right";
  textAlign?: "left" | "right";
  children: React.ReactNode;
}

function CornerBlock({ progress, zoneStart, zoneEnd, position = "left", textAlign = "left", children }: CornerBlockProps) {
  const { opacity, tx } = zoneVisible(progress, zoneStart, zoneEnd);

  // Use explicit margin/padding offsets to push wildly to the edges
  const posClasses = 
    position === 'left' ? 'left-4 sm:left-6 md:left-12 lg:left-24 xl:left-32' :
    'right-4 sm:right-6 md:right-12 lg:right-24 xl:right-32';

  const alignClasses = 
    textAlign === 'left' ? 'items-start text-left' :
    'items-end text-right';

  return (
    <div
      className={`absolute z-30 flex flex-col gap-3 md:gap-4 
                 w-auto max-w-[90vw] md:max-w-xl xl:max-w-3xl
                 top-[40%] md:top-1/2 -translate-y-1/2 
                 ${posClasses} ${alignClasses}`}
      style={{
        opacity,
        transform: `translateX(${tx}px)`,
        transition: "opacity 0.4s ease-out, transform 0.4s ease-out",
        pointerEvents: opacity > 0.5 ? "auto" : "none",
      }}
    >
      {children}
    </div>
  );
}

export function HeroTextOverlays({ scrollProgress, onOrderNow }: HeroTextOverlaysProps) {
  return (
    <div className="container-premium relative min-h-[100svh] w-full overflow-x-hidden pointer-events-none px-[clamp(1rem,4vw,3rem)] pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
      
      {/* ── ZONE 1: BRAND INTRO (0%–33%) LEFT ── */}
      <CornerBlock progress={scrollProgress} zoneStart={0} zoneEnd={0.33} position="left" textAlign="left">
        <span className="text-[#FFC300] text-[10px] sm:text-xs md:text-sm font-bold tracking-[0.4em] uppercase mb-2 sm:mb-4 block drop-shadow-md">
          Harvested For Perfection
        </span>
        <h1 
          className="text-white font-serif tracking-tighter leading-[0.85] drop-shadow-2xl uppercase"
          style={{ fontSize: "clamp(3rem, 12vw, 9rem)" }}
        >
          MONA<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFC300] to-[#FF6A00]">MANGOES</span>
        </h1>
        <div className="mt-4 sm:mt-8 flex items-center gap-3 sm:gap-5 max-w-[85vw]">
          <div className="w-8 sm:w-16 h-1 bg-[#FF6A00] shrink-0 drop-shadow-md" />
          <p className="text-base sm:text-lg md:text-2xl text-white/90 font-medium drop-shadow-md text-pretty">
            Indulge in <span className="text-[#FFC300] font-serif italic pr-1 whitespace-nowrap">Pure Sweetness</span>
          </p>
        </div>
      </CornerBlock>

      {/* ── ZONE 2: EXCELLENCE (35%–64%) RIGHT ── */}
      <CornerBlock progress={scrollProgress} zoneStart={0.35} zoneEnd={0.64} position="right" textAlign="left">
        <span className="text-[#FFC300] text-[10px] sm:text-xs md:text-sm font-bold tracking-[0.4em] uppercase mb-2 sm:mb-4 block drop-shadow-md">
          Premium Selection
        </span>
        <h2 
          className="text-white font-serif tracking-tighter leading-[0.85] drop-shadow-2xl uppercase"
          style={{ fontSize: "clamp(2.5rem, 10vw, 7rem)" }}
        >
          EXCELLENCE<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFC300] to-[#FF6A00]">IN EVERY BITE</span>
        </h2>
        <div className="h-[2px] w-8 sm:w-12 bg-[#FFC300]/40 mt-2 sm:mt-4" />
      </CornerBlock>

      {/* ── ZONE 3: ORIGIN (66%–89%) LEFT ── */}
      <CornerBlock progress={scrollProgress} zoneStart={0.66} zoneEnd={0.89} position="left" textAlign="left">
        <span className="text-[#FFC300] text-[10px] sm:text-xs md:text-sm font-bold tracking-[0.4em] uppercase mb-2 sm:mb-4 block drop-shadow-md">
          Authentic Provenance
        </span>
        <h3 
          className="text-white font-serif tracking-tighter leading-[0.85] drop-shadow-2xl uppercase"
          style={{ fontSize: "clamp(2rem, 8vw, 5.5rem)" }}
        >
          HANDPICKED<br />
          <span className="text-[#FFC300]">FROM SOURCE</span>
        </h3>
        <div className="mt-4 sm:mt-6 bg-black/40 p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl backdrop-blur-md border border-white/10 w-full max-w-[280px] sm:max-w-[320px] md:max-w-md text-left flex flex-col gap-4 shadow-2xl">
          <p className="text-sm sm:text-base md:text-xl text-white/95 font-medium leading-snug">
            Directly from the sun-drenched orchards of Ratnagiri, where generation-old tradition meets modern excellence.
          </p>
        </div>
      </CornerBlock>

      {/* ── ZONE 4: CTA (91%–100%) RIGHT ── */}
      <CornerBlock progress={scrollProgress} zoneStart={0.91} zoneEnd={1.0} position="right" textAlign="left">
        <div className="flex flex-col items-start gap-6 sm:gap-10">
          <div className="flex flex-col items-start gap-1 sm:gap-2">
            <h2 
              className="text-white font-serif tracking-tighter leading-[0.85] drop-shadow-2xl uppercase"
              style={{ fontSize: "clamp(2.5rem, 9vw, 6rem)" }}
            >
              LIMITED<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFC300] to-[#FF6A00]">GOLD BATCH</span>
            </h2>
            <p className="text-[#FFC300] text-[10px] sm:text-xs md:text-sm font-bold tracking-[0.4em] uppercase mt-1 sm:mt-2">
              Authenticated · Premium
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto mt-2 sm:mt-4 pointer-events-auto">
            <a
              id="hero-cta-collection"
              href="/collection"
              className="px-8 sm:px-10 py-4 sm:py-5 bg-white/5 border border-white/10 text-white font-black rounded-full text-xs sm:text-sm uppercase tracking-widest transition-all hover:bg-white/10 active:scale-[0.97] flex items-center justify-center gap-4 sm:gap-6 group"
            >
              <span>Collection</span>
              <span className="text-[#FFC300] transition-transform group-hover:translate-x-2">→</span>
            </a>
            <button
              id="hero-cta-order"
              onClick={(e) => { e.preventDefault(); onOrderNow(); }}
              className="px-8 sm:px-12 py-4 sm:py-5 bg-gradient-to-r from-[#FFC300] to-[#FF6A00] text-black font-black rounded-full text-sm sm:text-lg uppercase tracking-widest transition-all hover:scale-[1.03] active:scale-[0.97] shadow-[0_0_20px_rgba(255,195,0,0.4)] sm:shadow-[0_0_40px_rgba(255,195,0,0.5)]"
            >
              Order Now
            </button>
          </div>
        </div>
      </CornerBlock>
    </div>
  );
}
