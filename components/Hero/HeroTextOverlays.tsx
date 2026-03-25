"use client";

/**
 * HeroTextOverlays.tsx
 * ──────────────────────────────────────────────────────────────────────────
 * Premium Four-Corner Layout (Scrollytelling).
 * 
 * Reverted to corner composition to avoid central overlap, 
 * but with UPGRADED bold typography and premium styling.
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
    const before = p < start;
    return { opacity: 0, tx: before ? 40 : -40, ty: before ? 20 : -20 };
  }
  const len   = end - start;
  const local = (p - start) / len;
  const fade  = 0.22; // 22% of zone for fade in/out
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

export function HeroTextOverlays({ scrollProgress, onOrderNow }: HeroTextOverlaysProps) {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    const generated = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      size: (i % 6) + 3,
      left: (i * 12) % 100,
      delay: (i * 0.5) % 10,
      duration: 10 + (i % 12),
      color: ["#FFC300", "#FF6A00", "#FFD54F", "#FFFFFF"][i % 4],
      opacity: 0.15 + (i % 5) * 0.05,
    }));
    setParticles(generated);
  }, []);

  return (
    <>
      {/* ── AMBIENT FILL: Particles ── */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none" aria-hidden="true">
        {particles.map((p) => (
          <span
            key={p.id}
            className="particle"
            style={{
              width: p.size, height: p.size, left: `${p.left}%`, bottom: "-10px",
              background: p.color, opacity: p.opacity,
              animationDelay: `${p.delay}s`, animationDuration: `${p.duration}s`,
              filter: p.color === "#FFFFFF" ? "blur(3px)" : "none",
            }}
          />
        ))}
      </div>

      {/* ── Persistent Right-side Badge ── */}
      <div 
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 pointer-events-none hidden lg:flex flex-col items-center gap-8"
        style={{ opacity: 0.35 - scrollProgress * 0.35 }}
      >
        <div className="h-24 w-px bg-gradient-to-b from-transparent via-[#FFC300] to-transparent" />
        <span className="text-[10px] font-bold tracking-[0.6em] uppercase vertical-text" style={{ color: "#FFC300", writingMode: "vertical-rl" }}>
          Premium · Est. 2024 · Luxury Collection
        </span>
        <div className="h-24 w-px bg-gradient-to-b from-transparent via-[#FFC300] to-transparent" />
      </div>

      {/* ════════════════════════════════════════════════════
          ZONE 1 · Top-Left · DOMINANT HEADLINE (0%–45%)
          ════════════════════════════════════════════════════ */}
      <CornerBlock
        progress={scrollProgress}
        zoneStart={0}
        zoneEnd={0.45}
        position="top-left"
      >
        <span className="text-[11px] md:text-sm font-bold tracking-[0.4em] uppercase text-[#FFC300] mb-[-8px]">
          Harvested For Perfection
        </span>
        <h1 
          className="font-black text-shimmer leading-[0.82] tracking-tighter"
          style={{ fontSize: "clamp(3.5rem, 12vw, 8.5rem)" }}
        >
          MONA<br />
          MANGOES
        </h1>
        <p className="text-[#f5e6c8] text-sm md:text-2xl font-medium opacity-80 max-w-[200px] md:max-w-none leading-tight">
          Indulge in <span className="text-[#FFD54F]">Pure Sweetness</span>
        </p>
      </CornerBlock>

      {/* ════════════════════════════════════════════════════
          ZONE 2 · Top-Right · EXCELLENCE (30%–60%)
          ════════════════════════════════════════════════════ */}
      <CornerBlock
        progress={scrollProgress}
        zoneStart={0.30}
        zoneEnd={0.65}
        position="top-right"
      >
        <h2 
          className="font-black leading-[0.95] text-white tracking-tighter"
          style={{ fontSize: "clamp(2.5rem, 9vw, 6.8rem)" }}
        >
          EXCELLENCE<br />
          <span className="text-[#FF6A00]">IN EVERY</span><br />
          SINGLE BITE
        </h2>
        <div className="h-[2px] w-32 bg-gradient-to-l from-[#FFC300] to-transparent mt-3" />
      </CornerBlock>

      {/* ════════════════════════════════════════════════════
          ZONE 3 · Bottom-Left · ORIGIN (55%–85%)
          ════════════════════════════════════════════════════ */}
      <CornerBlock
        progress={scrollProgress}
        zoneStart={0.55}
        zoneEnd={0.88}
        position="bottom-left"
      >
        <div className="flex flex-col gap-4">
          <h3 
            className="font-black leading-[1.1] text-white tracking-tighter"
            style={{ fontSize: "clamp(1.8rem, 5vw, 4rem)" }}
          >
            HANDPICKED<br />
            <span className="text-[#FFC300]">FROM THE SOURCE</span>
          </h3>
          <p className="text-[#f5e6c8] text-base md:text-xl font-medium leading-relaxed max-w-[400px]">
            From orchard to your table — experience the richness of 
            <span className="text-[#FFD54F] font-bold"> nature&apos;s finest mangoes.</span>
          </p>
          <div className="text-[11px] md:text-sm font-bold tracking-[0.3em] uppercase text-[#FFC300]/60">
            🌿 Ratnagiri · Maharashtra
          </div>
        </div>
      </CornerBlock>

      {/* ════════════════════════════════════════════════════
          ZONE 4 · Bottom-Right · CTA (75%–100%)
          ════════════════════════════════════════════════════ */}
      <CornerBlock
        progress={scrollProgress}
        zoneStart={0.75}
        zoneEnd={1.0}
        position="bottom-right"
      >
        <div className="flex flex-col items-end gap-8">
          <div className="text-right">
            <p className="text-sm md:text-xl font-bold mb-2 text-[#f5e6c8]/60 uppercase tracking-widest">Limited Seasonal Batch</p>
            <div className="flex gap-2 text-[#FFC300] justify-end text-lg md:text-2xl">
              {"★★★★★".split("").map((s, i) => <span key={i}>{s}</span>)}
            </div>
          </div>
          
          <div className="flex flex-col gap-5 items-end w-full sm:w-auto">
            <a
              id="hero-cta-collection"
              href="/collection"
              className="w-full sm:w-auto px-10 py-5 translate-x-2 md:px-14 md:py-7 bg-gradient-to-r from-[#FFC300] to-[#FF6A00] text-[#1a1a1a] font-black rounded-full text-base md:text-xl uppercase tracking-tighter transition-all hover:scale-105 active:scale-95 shadow-[0_12px_48px_rgba(255,195,0,0.4)] pointer-events-auto flex items-center justify-center gap-3"
            >
              <span>Explore Collection</span>
              <span className="text-2xl">→</span>
            </a>
            <button
              id="hero-cta-order"
              onClick={(e) => { e.preventDefault(); onOrderNow(); }}
              className="w-full sm:w-auto px-10 py-5 md:px-14 md:py-7 border-2 border-[#FFC300]/30 text-[#FFC300] font-black rounded-full text-base md:text-xl uppercase tracking-tighter hover:bg-[#FFC300]/10 backdrop-blur-xl transition-all hover:scale-105 active:scale-95 pointer-events-auto"
            >
              Order Now
            </button>
          </div>
        </div>
      </CornerBlock>
    </>
  );
}
