"use client";

import React from "react";
import { motion } from "framer-motion";

interface ExperienceTextOverlaysProps {
  scrollProgress: number;
}

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

export function ExperienceTextOverlays({ scrollProgress }: ExperienceTextOverlaysProps) {
  return (
    <div className="container-premium relative section-full min-h-[100svh] w-full overflow-x-hidden pointer-events-none px-[clamp(1rem,4vw,3rem)]">
      
      {/* ── ZONE 1: TASTE (0%–22%) LEFT ── */}
      <CornerBlock progress={scrollProgress} zoneStart={0} zoneEnd={0.22} position="left" textAlign="left">
        <span className="text-[#1B4332] text-[10px] sm:text-xs md:text-sm font-bold tracking-[0.4em] uppercase mb-2 sm:mb-4 block drop-shadow-md">
          The Culinary Experience
        </span>
        <h2 
          className="text-white font-serif tracking-tighter leading-[0.85] drop-shadow-2xl uppercase"
          style={{ fontSize: "clamp(2.5rem, 10vw, 7rem)" }}
        >
          A SYMPHONY<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B4332] to-[#2D6A4F]">OF TASTE</span>
        </h2>
        <div className="mt-4 sm:mt-8 bg-black/40 p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl backdrop-blur-md border border-white/10 w-full max-w-[280px] sm:max-w-[320px] md:max-w-md text-left flex flex-col gap-4 shadow-2xl">
          <p className="text-sm sm:text-base md:text-xl text-white/95 font-medium leading-snug text-pretty">
            Bite into the luscious, melting texture that defines the crown jewel of fruits. Let the nectar speak.
          </p>
        </div>
        <div className="h-[2px] w-8 sm:w-12 bg-[#1B4332]/40 mt-2 sm:mt-4" />
      </CornerBlock>

      {/* ── ZONE 2: TEXTURE (25%–48%) RIGHT ── */}
      <CornerBlock progress={scrollProgress} zoneStart={0.25} zoneEnd={0.48} position="right" textAlign="left">
        <span className="text-[#1B4332] text-[10px] sm:text-xs md:text-sm font-bold tracking-[0.4em] uppercase mb-2 sm:mb-4 block drop-shadow-md">
          Velvet Canvas
        </span>
        <h2 
          className="text-white font-serif tracking-tighter leading-[0.85] drop-shadow-2xl uppercase"
          style={{ fontSize: "clamp(2.5rem, 10vw, 7rem)" }}
        >
          PURE<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B4332] to-[#2D6A4F]">NECTAR</span>
        </h2>
        <div className="mt-4 sm:mt-8 bg-black/40 p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl backdrop-blur-md border border-white/10 w-full max-w-[280px] sm:max-w-[320px] md:max-w-md text-left flex flex-col gap-4 shadow-2xl">
          <p className="text-sm sm:text-base md:text-xl text-[#1B4332]/90 font-medium leading-relaxed italic">
            "Fibers dissolving into pure sweetness. A luxurious sensory journey unparalleled."
          </p>
        </div>
      </CornerBlock>

      {/* ── ZONE 3: AROMA (51%–75%) LEFT ── */}
      <CornerBlock progress={scrollProgress} zoneStart={0.51} zoneEnd={0.75} position="left" textAlign="left">
        <span className="text-[#1B4332] text-[10px] sm:text-xs md:text-sm font-bold tracking-[0.4em] uppercase mb-2 sm:mb-4 block drop-shadow-md">
          Sensory Prestige
        </span>
        <h3 
          className="text-white font-serif tracking-tighter leading-[0.85] drop-shadow-2xl uppercase"
          style={{ fontSize: "clamp(2rem, 8vw, 5.5rem)" }}
        >
          TROPICAL<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B4332] to-[#2D6A4F]">AROMA</span>
        </h3>
        <div className="flex flex-col gap-6 sm:gap-10 mt-6 sm:mt-12 group pointer-events-auto w-full max-w-[280px] md:max-w-md bg-black/40 p-5 sm:p-6 backdrop-blur-md rounded-xl sm:rounded-2xl border border-white/10 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#1B4332] flex items-center justify-center shadow-[0_0_15px_#1B4332]">
              <span className="text-white font-black">1</span>
            </div>
            <p className="text-white font-black uppercase tracking-widest text-xs sm:text-sm">Breathe</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#2D6A4F] flex items-center justify-center">
              <span className="text-white font-black">2</span>
            </div>
            <p className="text-white font-black uppercase tracking-widest text-xs sm:text-sm">Savor</p>
          </div>
        </div>
      </CornerBlock>

      {/* ── ZONE 4: FINALE (78%–100%) RIGHT ── */}
      <CornerBlock progress={scrollProgress} zoneStart={0.78} zoneEnd={1.0} position="right" textAlign="right">
        <div className="flex flex-col items-end gap-8 sm:gap-12 pointer-events-auto">
          <div className="text-right flex flex-col items-end gap-2 sm:gap-4">
            <h2 
              className="text-white font-serif tracking-tighter leading-[0.85] drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] uppercase"
              style={{ fontSize: "clamp(2.5rem, 10vw, 7rem)" }}
            >
              YOURS<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFC300] to-[#f5e6c8] drop-shadow-md">TO SAVOR</span>
            </h2>
            <p className="text-xs sm:text-lg md:text-2xl text-[#f5e6c8] font-black drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)] tracking-[0.2em] uppercase mt-1 sm:mt-2">
              THE SEASON HAS ARRIVED
            </p>
          </div>
          
          <a
            href="#contact"
            className="mt-4 sm:mt-8 px-10 sm:px-14 py-4 sm:py-5 bg-gradient-to-r from-[#1B4332] via-[#20523C] to-[#2D6A4F] text-white font-sans font-black rounded-full text-[10px] sm:text-xs md:text-sm uppercase tracking-widest transition-all duration-300 hover:scale-[1.05] hover:-translate-y-1 active:scale-[0.98] shadow-[0_0_30px_rgba(27,67,50,0.5)] whitespace-nowrap"
          >
            Indulge Now <span className="ml-2">→</span>
          </a>
        </div>
      </CornerBlock>
    </div>
  );
}
