"use client";

/**
 * StoryTextOverlays.tsx
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

import React from "react";
import { motion } from "framer-motion";

interface StoryTextOverlaysProps {
  scrollProgress: number;
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

export function StoryTextOverlays({ scrollProgress }: StoryTextOverlaysProps) {
  return (
    <div className="container-premium relative section-full min-h-[100svh] w-full overflow-x-hidden pointer-events-none px-[clamp(1rem,4vw,3rem)]">
      
      {/* ── ZONE 1: THE LEGACY (0%–30%) LEFT ── */}
      <CornerBlock
        progress={scrollProgress}
        zoneStart={0}
        zoneEnd={0.30}
        position="left"
        textAlign="left"
      >
        <span className="text-[#FFC300] text-[10px] sm:text-xs md:text-sm font-bold tracking-[0.4em] uppercase mb-2 sm:mb-4 block drop-shadow-md">
          The Heritage
        </span>
        <h2 
          className="text-white font-serif tracking-tighter leading-[0.85] drop-shadow-2xl uppercase"
          style={{ fontSize: "clamp(2.5rem, 10vw, 7rem)" }}
        >
          OUR<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFC300] to-[#FF6A00]">ORCHARDS</span>
        </h2>
        <div className="mt-4 sm:mt-8 bg-black/40 p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl backdrop-blur-md border border-white/10 w-full max-w-[280px] sm:max-w-[320px] md:max-w-md text-left flex flex-col gap-4 shadow-2xl">
          <p className="text-sm sm:text-base md:text-xl text-white/95 font-medium leading-snug text-pretty">
            Nurtured by generations in the heart of Maharashtra.
          </p>
        </div>
        <div className="h-[2px] w-8 sm:w-12 bg-[#FFC300]/40 mt-2 sm:mt-4" />
      </CornerBlock>

      {/* ── ZONE 2: HARVEST (33%–60%) RIGHT ── */}
      <CornerBlock
        progress={scrollProgress}
        zoneStart={0.33}
        zoneEnd={0.60}
        position="right"
        textAlign="left"
      >
        <span className="text-[#FFC300] text-[10px] sm:text-xs md:text-sm font-bold tracking-[0.4em] uppercase mb-2 sm:mb-4 block drop-shadow-md">
          Selection Process
        </span>
        <h2 
          className="text-white font-serif tracking-tighter leading-[0.85] drop-shadow-2xl uppercase"
          style={{ fontSize: "clamp(2.5rem, 10vw, 7rem)" }}
        >
          HAND<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFC300] to-[#FF6A00]">PICKED</span>
        </h2>
        <div className="mt-4 sm:mt-8 bg-black/40 p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl backdrop-blur-md border border-white/10 w-full max-w-[280px] sm:max-w-[320px] md:max-w-md text-left flex flex-col gap-4 shadow-2xl">
          <p className="text-sm sm:text-base md:text-xl text-[#FFC300]/90 font-medium leading-relaxed italic">
            &quot;Only 1 in 100 mangoes makes it to the MONA Gold selection. Authenticity in every fiber.&quot;
          </p>
        </div>
      </CornerBlock>

      {/* ── ZONE 3: JOURNEY (63%–88%) LEFT ── */}
      <CornerBlock
        progress={scrollProgress}
        zoneStart={0.63}
        zoneEnd={0.88}
        position="left"
        textAlign="left"
      >
        <span className="text-[#FFC300] text-[10px] sm:text-xs md:text-sm font-bold tracking-[0.4em] uppercase mb-2 sm:mb-4 block drop-shadow-md">
          Track Origin
        </span>
        <h3 
          className="text-white font-serif tracking-tighter leading-[0.85] drop-shadow-2xl uppercase"
          style={{ fontSize: "clamp(2rem, 8vw, 5.5rem)" }}
        >
          FROM THE<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFC300] to-[#FF6A00]">SOURCE</span>
        </h3>
        <div className="flex items-center gap-6 sm:gap-8 group mt-4 sm:mt-6 pointer-events-auto">
          <div className="w-1 px-3 sm:px-4 py-8 sm:py-12 border-l-2 border-[#FFC300]/30 flex flex-col justify-between">
            <div className="w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-[#FFC300] -ml-[7px] sm:-ml-[11px] shadow-[0_0_15px_#FFC300]" />
            <div className="w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-[#FF6A00] -ml-[7px] sm:-ml-[11px]" />
          </div>
          <div className="flex flex-col gap-6 sm:gap-10">
            <div>
              <h4 className="text-white font-black text-base sm:text-xl uppercase tracking-tighter leading-none drop-shadow-md">Day 1: Picking</h4>
              <p className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-[#FFC300]/60 mt-1">Orchard Fresh</p>
            </div>
            <div>
              <h4 className="text-white font-black text-base sm:text-xl uppercase tracking-tighter leading-none drop-shadow-md">Day 3: Delivery</h4>
              <p className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-[#FFC300]/60 mt-1">Global Arrival</p>
            </div>
          </div>
        </div>
      </CornerBlock>

      {/* ── ZONE 4: FINALE (91%–100%) LEFT ── */}
      <CornerBlock
        progress={scrollProgress}
        zoneStart={0.91}
        zoneEnd={1.0}
        position="left"
        textAlign="left"
      >
        <div className="flex flex-col items-start gap-8 sm:gap-12 pointer-events-auto">
          <div className="text-left flex flex-col items-start gap-2 sm:gap-4">
            <h2 
              className="text-white font-serif tracking-tighter leading-[0.85] drop-shadow-2xl uppercase"
              style={{ fontSize: "clamp(2.5rem, 10vw, 7rem)" }}
            >
              PURE<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFC300] to-[#FF6A00]">GOLD</span>
            </h2>
            <p className="text-xs sm:text-lg md:text-2xl text-[#FFC300]/90 font-medium drop-shadow-md tracking-[0.2em] uppercase mt-1 sm:mt-2">
              UNCOMPROMISING QUALITY
            </p>
          </div>
          
          <div className="relative w-28 h-28 sm:w-40 sm:h-40 md:w-56 md:h-56 flex items-center justify-start translate-x-[-10px] md:translate-x-[-40px]">
            <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_20s_linear_infinite] opacity-60">
              <path id="circlePathS_Final" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
              <text className="text-[7.5px] font-black uppercase tracking-[0.25em] fill-[#FFC300]">
                <textPath xlinkHref="#circlePathS_Final">
                  · Premium · Authentic · Harvest · Limited · Selection · Gold ·
                </textPath>
              </text>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 sm:w-20 sm:h-20 md:w-32 md:h-32 rounded-full border-2 border-[#FFC300]/20 flex flex-col items-center justify-center">
                <span className="text-[8px] sm:text-[12px] font-black text-[#FFC300] uppercase block">Mona</span>
                <span className="text-[10px] sm:text-[14px] font-black text-white uppercase sm:-mt-1 tracking-widest block">Gold</span>
              </div>
            </div>
          </div>
        </div>
      </CornerBlock>
    </div>
  );
}
