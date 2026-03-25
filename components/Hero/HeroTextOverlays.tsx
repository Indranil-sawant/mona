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
  children: React.ReactNode;
}

function CornerBlock({ progress, zoneStart, zoneEnd, children }: CornerBlockProps) {
  const { opacity, tx } = zoneVisible(progress, zoneStart, zoneEnd);

  return (
    <div
      className="absolute z-30 flex flex-col gap-3 md:gap-4 w-full 
                 max-w-[90%] md:max-w-[600px] 
                 top-[40%] md:top-1/2 -translate-y-1/2 
                 left-[clamp(1rem,8vw,3rem)] md:left-[10%]
                 text-left items-start"
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
      
      {/* ── ZONE 1: BRAND INTRO (0%–33%) ── */}
      <CornerBlock progress={scrollProgress} zoneStart={0} zoneEnd={0.33}>
        <span className="text-[clamp(0.7rem,0.9vw,0.85rem)] font-bold tracking-[0.2em] uppercase text-accent/60 leading-none">
          Harvested For Perfection
        </span>
        <h1 className="text-[clamp(2.4rem,6vw,5.5rem)] font-extrabold tracking-tight leading-[1.05] text-shimmer text-balance uppercase">
          MONA<br />
          MANGOES
        </h1>
        <p className="text-[clamp(1.2rem,2.2vw,1.6rem)] font-medium leading-[1.3] text-foreground/50 text-pretty">
          Indulge in <span className="text-accent underline decoration-accent/20 underline-offset-8">Pure Sweetness</span>
        </p>
      </CornerBlock>

      {/* ── ZONE 2: EXCELLENCE (35%–64%) ── */}
      <CornerBlock progress={scrollProgress} zoneStart={0.35} zoneEnd={0.64}>
        <span className="text-[clamp(0.7rem,0.9vw,0.85rem)] font-bold tracking-[0.2em] uppercase text-accent/60 leading-none">
          Premium Selection
        </span>
        <h2 className="text-[clamp(2.4rem,6vw,5.5rem)] font-extrabold tracking-tight leading-[1.05] text-white text-balance uppercase">
          EXCELLENCE<br />
          IN EVERY BITE
        </h2>
        <div className="h-[2px] w-12 bg-accent/40 mt-4" />
      </CornerBlock>

      {/* ── ZONE 3: ORIGIN (66%–89%) ── */}
      <CornerBlock progress={scrollProgress} zoneStart={0.66} zoneEnd={0.89}>
        <span className="text-[clamp(0.7rem,0.9vw,0.85rem)] font-bold tracking-[0.2em] uppercase text-accent/60 leading-none">
          Authentic Provenance
        </span>
        <h3 className="text-[clamp(1.8rem,4vw,3rem)] font-bold leading-[1.1] text-white text-balance uppercase">
          HANDPICKED<br />
          FROM SOURCE
        </h3>
        <p className="text-[clamp(0.95rem,1.2vw,1.1rem)] leading-[1.6] text-foreground/40 max-w-[400px]">
          Directly from the sun-drenched orchards of Ratnagiri, where generation-old tradition meets modern excellence.
        </p>
      </CornerBlock>

      {/* ── ZONE 4: CTA (91%–100%) ── */}
      <CornerBlock progress={scrollProgress} zoneStart={0.91} zoneEnd={1.0}>
        <div className="flex flex-col items-start gap-10">
          <div className="flex flex-col items-start gap-2">
            <h2 className="text-[clamp(2rem,5vw,4rem)] font-extrabold tracking-tight leading-[1.05] text-white uppercase text-balance">
              LIMITED<br />
              <span className="text-accent">GOLD</span> BATCH
            </h2>
            <p className="text-[clamp(0.7rem,0.9vw,0.85rem)] font-bold tracking-[0.2em] uppercase text-accent/30">
              Authenticated · Premium
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4">
            <a
              id="hero-cta-collection"
              href="/collection"
              className="px-10 py-5 bg-white/5 border border-white/10 text-white font-black rounded-full text-sm uppercase tracking-widest transition-all hover:bg-white/10 active:scale-[0.97] pointer-events-auto flex items-center justify-center gap-6 group"
            >
              <span>Collection</span>
              <span className="text-accent transition-transform group-hover:translate-x-2">→</span>
            </a>
            <button
              id="hero-cta-order"
              onClick={(e) => { e.preventDefault(); onOrderNow(); }}
              className="px-10 py-5 bg-gradient-to-r from-accent to-accent-alt text-[#0a0a0a] font-black rounded-full text-sm uppercase tracking-widest transition-all hover:scale-[1.03] active:scale-[0.97] pointer-events-auto shadow-2xl"
            >
              Order Now
            </button>
          </div>
        </div>
      </CornerBlock>
    </div>
  );
}
