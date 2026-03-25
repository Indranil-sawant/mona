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
    "top-left":     "top-14 left-6 md:top-24 md:left-14",
    "top-right":    "top-14 right-6 md:top-24 md:right-14",
    "bottom-left":  "bottom-10 left-6 md:bottom-20 md:left-14",
    "bottom-right": "bottom-10 right-6 md:bottom-20 md:right-14",
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
          className="font-black leading-[0.82] tracking-tighter text-white"
          style={{ fontSize: "clamp(2.5rem, 8vw, 6.5rem)" }}
        >
          NURTURED<br />
          BY NATURE
        </h2>
        <p className="text-[#f5e6c8] text-sm md:text-xl font-medium opacity-80 leading-tight">
          Grown in the legendary soils of Ratnagiri, every MONA mango is a 
          <span className="text-[#FFC300]"> testament to time.</span>
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
        <h2 
          className="font-black leading-[0.95] text-white tracking-tighter"
          style={{ fontSize: "clamp(2rem, 7vw, 5.5rem)" }}
        >
          THE ART OF<br />
          <span className="text-[#FFC300]">SELECTION</span>
        </h2>
        <div className="h-[2px] w-32 bg-gradient-to-l from-[#FF6A00] to-transparent mt-3" />
        <p className="text-[#f5e6c8] text-sm md:text-lg font-medium opacity-80 leading-relaxed text-right">
          Only the top 1% of the harvest makes it to our luxury 
          crates. Hand-selected for weight, aroma, and color.
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
        <h3 
          className="font-black leading-[1.1] text-white tracking-tighter"
          style={{ fontSize: "clamp(1.8rem, 5vw, 4rem)" }}
        >
          THE JOURNEY<br />
          <span className="text-[#FF6A00]">TO YOU</span>
        </h3>
        <p className="text-[#f5e6c8] text-base md:text-xl font-medium leading-relaxed max-w-[400px]">
          We ship directly from our orchards to ensure 
          <span className="text-[#FFC300] font-bold"> maximum freshness</span> 
          and unmatched flavor profile.
        </p>
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
        <div className="flex flex-col items-end">
          <h2 
            className="font-black leading-[0.9] text-white tracking-tighter text-right"
            style={{ fontSize: "clamp(2.5rem, 9vw, 7rem)" }}
          >
            A TASTE OF<br />
            <span className="text-[#FFC300]">GOLD</span>
          </h2>
          <p className="text-[#FF6A00] text-lg md:text-2xl font-black uppercase tracking-[0.2em] mt-4">
            Uncompromising Quality
          </p>
          <span className="text-xs md:text-sm font-bold text-[#f5e6c8]/60 tracking-[0.4em] uppercase mt-2">
            Experience the Gold Standard
          </span>
        </div>
      </CornerBlock>
    </>
  );
}
