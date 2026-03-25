"use client";

/**
 * StoryTextOverlays.tsx
 * ──────────────────────────────────────────────────────────────────────────
 * Premium Text Overlays for the Story Section.
 * Using the same corner-block architecture to maintain consistency.
 * ──────────────────────────────────────────────────────────────────────────
 */

import React from "react";
import { motion } from "framer-motion";

interface StoryTextOverlaysProps {
  scrollProgress: number;
}

/* ── Zone visibility helper (same as Hero) ─────────────────── */
function easeOut(t: number): number {
  return 1 - Math.pow(1 - Math.max(0, Math.min(1, t)), 3);
}

function zoneVisible(p: number, start: number, end: number) {
  if (p < start || p > end) {
    const before = p < start;
    return { opacity: 0, tx: before ? 40 : -40, ty: before ? 20 : -20 };
  }
  const len   = end - start;
  const local = (p - start) / len;
  const fade  = 0.22;
  let v = (local < fade) ? easeOut(local / fade) : (local > 1 - fade) ? easeOut((1 - local) / fade) : 1;
  return { opacity: v, tx: 0, ty: 0 };
}

/* ── Animated Corner Block ──────────────────────────────────── */
interface CornerBlockProps {
  progress: number;
  zoneStart: number;
  zoneEnd: number;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  children: React.ReactNode;
}

function CornerBlock({ progress, zoneStart, zoneEnd, position, children }: CornerBlockProps) {
  const { opacity, tx, ty } = zoneVisible(progress, zoneStart, zoneEnd);

  const isLeft = position.includes("left");
  const isTop  = position.includes("top");
  const xDir   = isLeft ? -1 : 1;
  const yDir   = isTop  ? -1 : 1;

  const posClasses = {
    "top-left":     "top-24 left-6 md:top-40 md:left-14",
    "top-right":    "top-24 right-6 md:top-40 md:right-14",
    "bottom-left":  "bottom-10 left-6 md:bottom-16 md:left-14",
    "bottom-right": "bottom-10 right-6 md:bottom-16 md:right-14",
  };

  const alignClasses = {
    "top-left":     "text-left items-start",
    "top-right":    "text-right items-end",
    "bottom-left":  "text-left items-start",
    "bottom-right": "text-right items-end",
  };

  return (
    <div
      className={`absolute z-30 flex flex-col gap-2 md:gap-4 max-w-[280px] md:max-w-[450px] lg:max-w-[600px] ${posClasses[position]} ${alignClasses[position]}`}
      style={{
        opacity,
        transform: `translate(${tx * xDir}px, ${ty * yDir}px)`,
        transition: "opacity 0.15s linear, transform 0.15s linear",
        pointerEvents: opacity > 0.3 ? "auto" : "none",
      }}
    >
      {children}
    </div>
  );
}

export function StoryTextOverlays({ scrollProgress }: StoryTextOverlaysProps) {
  return (
    <>
      {/* ════════════════════════════════════════════════════
          ZONE 1 · Top-Left · THE ORIGIN (0%–45%)
          ════════════════════════════════════════════════════ */}
      <CornerBlock
        progress={scrollProgress}
        zoneStart={0}
        zoneEnd={0.45}
        position="top-left"
      >
        <span className="text-[11px] md:text-sm font-bold tracking-[0.4em] uppercase text-[#FF6A00] mb-[-8px]">
          Our Legacy
        </span>
        <h2 
          className="font-black leading-[0.82] tracking-tighter text-shimmer"
          style={{ fontSize: "clamp(3.5rem, 11vw, 8rem)" }}
        >
          NURTURED<br />
          BY NATURE
        </h2>
        <div className="h-[2px] w-24 bg-gradient-to-r from-[#FF6A00] to-transparent mt-2" />
        <p className="text-[#f5e6c8] text-sm md:text-2xl font-medium opacity-80 leading-tight max-w-[250px] md:max-w-md">
          Grown in the legendary soils of Ratnagiri, every MONA mango is a 
          <span className="text-[#FFC300] font-bold"> testament to time.</span>
        </p>
      </CornerBlock>

      {/* ════════════════════════════════════════════════════
          ZONE 2 · Top-Right · THE CRAFT (30%–65%)
          ════════════════════════════════════════════════════ */}
      <CornerBlock
        progress={scrollProgress}
        zoneStart={0.30}
        zoneEnd={0.65}
        position="top-right"
      >
        <span className="text-[11px] md:text-sm font-bold tracking-[0.4em] uppercase text-[#FFC300] mb-[-8px]">
          The Artisanship
        </span>
        <h2 
          className="font-black leading-[0.9] text-white tracking-tighter"
          style={{ fontSize: "clamp(2.5rem, 9vw, 6.5rem)" }}
        >
          THE ART OF<br />
          <span className="text-[#FFC300]">SELECTION</span>
        </h2>
        <div className="h-[2px] w-32 bg-gradient-to-l from-[#FFC300] to-transparent mt-3" />
        <p className="text-[#f5e6c8] text-sm md:text-xl font-medium opacity-80 leading-relaxed text-right max-w-[280px] md:max-w-lg">
          Only the top 1% of the harvest makes it to our luxury 
          crates. <span className="text-white">Hand-selected for weight, aroma, and color.</span>
        </p>
      </CornerBlock>

      {/* ════════════════════════════════════════════════════
          ZONE 3 · Bottom-Left · THE MOMENT (55%–85%)
          ════════════════════════════════════════════════════ */}
      <CornerBlock
        progress={scrollProgress}
        zoneStart={0.55}
        zoneEnd={0.88}
        position="bottom-left"
      >
        <div className="flex flex-col gap-6">
          <h3 
            className="font-black leading-[0.85] text-white tracking-tighter"
            style={{ fontSize: "clamp(2rem, 5vw, 4.2rem)" }}
          >
            THE JOURNEY<br />
            <span className="text-[#FF6A00]">DIRECT TO YOU</span>
          </h3>
          <p className="text-[#f5e6c8] text-lg md:text-2xl font-medium leading-tight max-w-[320px] md:max-w-xl">
            We ship directly from our orchards to ensure 
            <span className="text-[#FFC300] font-bold"> maximum freshness</span> 
            and an unmatched flavor profile.
          </p>
          <div className="text-[12px] md:text-base font-bold tracking-[0.3em] uppercase text-[#FF6A00]/70 flex items-center gap-4">
            <span className="w-12 h-px bg-[#FF6A00]/40" />
            Orchard to Table
          </div>
        </div>
      </CornerBlock>

      {/* ════════════════════════════════════════════════════
          ZONE 4 · Bottom-Right · THE PROMISE (75%–100%)
          ════════════════════════════════════════════════════ */}
      <CornerBlock
        progress={scrollProgress}
        zoneStart={0.75}
        zoneEnd={1.0}
        position="bottom-right"
      >
        <div className="flex flex-col items-end gap-6 text-right">
          <h2 
            className="font-black leading-[0.82] text-shimmer tracking-tighter"
            style={{ fontSize: "clamp(3.5rem, 11vw, 7.8rem)" }}
          >
            A TASTE OF<br />
            <span className="text-[#FFC300]">GOLD</span>
          </h2>
          <div className="flex flex-col items-end">
            <p className="text-[#FF6A00] text-xl md:text-3xl font-black uppercase tracking-[0.3em] leading-none">
              Uncompromising Quality
            </p>
            <span className="text-sm md:text-lg font-bold text-[#f5e6c8]/50 tracking-[0.4em] uppercase mt-4">
              The Purest Selection
            </span>
          </div>
          
          {/* Circular badge element (decorative) */}
          <div className="mt-8 w-24 h-24  md:w-32 md:h-32 rounded-full border border-[#FFC300]/20 flex items-center justify-center p-4 text-center">
            <span className="text-[10px] md:text-[12px] font-bold text-[#FFC300] uppercase tracking-tighter leading-none">
              Certified<br />Premium<br />Harvest
            </span>
          </div>
        </div>
      </CornerBlock>
    </>
  );
}
