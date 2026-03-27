"use client";

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

export function StoryTextOverlays({ scrollProgress }: StoryTextOverlaysProps) {
  return (
    <div className="container-premium relative section-full min-h-[100svh] w-full overflow-x-hidden pointer-events-none px-[clamp(1rem,4vw,3rem)]">
      
      {/* ── ZONE 1: THE LEGACY (0%–30%) ── */}
      <CornerBlock
        progress={scrollProgress}
        zoneStart={0}
        zoneEnd={0.30}
      >
        <span className="text-[clamp(0.7rem,0.9vw,0.85rem)] font-bold tracking-[0.2em] uppercase text-accent/60 leading-none">
          The Heritage
        </span>
        <h2 className="text-[clamp(2.4rem,6vw,5.5rem)] font-extrabold tracking-tight leading-[1.05] text-white text-balance uppercase">
          OUR<br />
          <span className="text-shimmer">ORCHARDS</span>
        </h2>
        <p className="text-[clamp(1.2rem,2.2vw,1.6rem)] font-medium leading-[1.3] text-foreground/50 text-pretty">
          Nurtured by generations in the heart of Maharashtra.
        </p>
        <div className="h-[2px] w-12 bg-accent/40 mt-4" />
      </CornerBlock>

      {/* ── ZONE 2: HARVEST (33%–60%) ── */}
      <CornerBlock
        progress={scrollProgress}
        zoneStart={0.33}
        zoneEnd={0.60}
      >
        <span className="text-[clamp(0.7rem,0.9vw,0.85rem)] font-bold tracking-[0.2em] uppercase text-accent/60 leading-none">
          Selection Process
        </span>
        <h2 className="text-[clamp(2.4rem,6vw,5.5rem)] font-extrabold tracking-tight leading-[1.05] text-white text-balance uppercase">
          HAND<br />
          <span className="text-accent-alt">PICKED</span>
        </h2>
        <div className="p-8 bg-black/40 backdrop-blur-2xl border border-white/5 rounded-[40px] max-w-full md:max-w-[480px] mt-2">
          <p className="text-[clamp(0.95rem,1.2vw,1.1rem)] leading-[1.6] text-foreground/90 italic text-pretty">
            &quot;Only 1 in 100 mangoes makes it to the MONA Gold selection. Authenticity in every fiber.&quot;
          </p>
        </div>
      </CornerBlock>

      {/* ── ZONE 3: JOURNEY (63%–88%) ── */}
      <CornerBlock
        progress={scrollProgress}
        zoneStart={0.63}
        zoneEnd={0.88}
      >
        <span className="text-[clamp(0.7rem,0.9vw,0.85rem)] font-bold tracking-[0.3em] uppercase text-accent/60 leading-none">
          Track Origin
        </span>
        <h3 className="text-[clamp(1.8rem,4vw,3rem)] font-bold leading-[1.1] text-white text-balance uppercase">
          FROM THE<br />
          <span className="text-accent">SOURCE</span>
        </h3>
        <div className="flex items-center gap-8 group mt-6 pointer-events-auto">
          <div className="w-1 px-4 py-12 border-l-2 border-accent/20 flex flex-col justify-between">
            <div className="w-3 h-3 rounded-full bg-accent -ml-[11px] shadow-[0_0_15px_#FFC300]" />
            <div className="w-3 h-3 rounded-full bg-accent-alt -ml-[11px]" />
          </div>
          <div className="flex flex-col gap-10">
            <div>
              <h4 className="text-white font-black text-xl uppercase tracking-tighter leading-none">Day 1: Picking</h4>
              <p className="text-[clamp(0.7rem,0.9vw,0.85rem)] font-bold tracking-[0.2em] uppercase text-accent/40 mt-1">Orchard Fresh</p>
            </div>
            <div>
              <h4 className="text-white font-black text-xl uppercase tracking-tighter leading-none">Day 3: Delivery</h4>
              <p className="text-[clamp(0.7rem,0.9vw,0.85rem)] font-bold tracking-[0.2em] uppercase text-accent/40 mt-1">Global Arrival</p>
            </div>
          </div>
        </div>
      </CornerBlock>

      {/* ── ZONE 4: FINALE (91%–100%) ── */}
      <CornerBlock
        progress={scrollProgress}
        zoneStart={0.91}
        zoneEnd={1.0}
      >
        <div className="flex flex-col items-start gap-12 pointer-events-auto">
          <div className="text-left flex flex-col items-start gap-4">
            <h2 className="text-[clamp(2.4rem,6vw,5.5rem)] font-extrabold tracking-tight leading-[1.05] text-shimmer text-balance uppercase">
              PURE<br />
              <span className="text-accent">GOLD</span>
            </h2>
            <p className="text-[clamp(1.2rem,2.2vw,1.6rem)] font-medium leading-[1.3] text-foreground/50 text-pretty">
              UNCOMPROMISING QUALITY
            </p>
          </div>
          
          <div className="relative w-40 h-40 md:w-56 md:h-56 flex items-center justify-start translate-x-[-10px] md:translate-x-[-40px]">
            <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_20s_linear_infinite] opacity-60">
              <path id="circlePathS_Final" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
              <text className="text-[7.5px] font-black uppercase tracking-[0.25em] fill-accent">
                <textPath xlinkHref="#circlePathS_Final">
                  · Premium · Authentic · Harvest · Limited · Selection · Gold ·
                </textPath>
              </text>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 md:w-32 md:h-32 rounded-full border-2 border-accent/20 flex flex-col items-center justify-center">
                <span className="text-[12px] font-black text-accent uppercase">Mona</span>
                <span className="text-[14px] font-black text-white uppercase -mt-1 tracking-widest">Gold</span>
              </div>
            </div>
          </div>
        </div>
      </CornerBlock>
    </div>
  );
}
