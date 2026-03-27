"use client";

import React from "react";

interface Props {
  scrollProgress: number;
}

// Fade in and out with smooth transforms
function Segment({
  progress,
  start,
  end,
  children,
  align = "center",
}: {
  progress: number;
  start: number;
  end: number;
  children: React.ReactNode;
  align?: "left" | "center" | "right";
}) {
  const isVisible = progress >= start - 0.05 && progress <= end + 0.05;
  
  // Opacity peaks in the middle of the range
  const middle = (start + end) / 2;
  const radius = (end - start) / 2;
  const distanceFromCenter = Math.abs(progress - middle);
  const rawOpacity = 1 - (distanceFromCenter / radius);
  const opacity = Math.max(0, Math.min(1, rawOpacity));

  // Y transform - slides up as you scroll
  const localProgress = (progress - start) / (end - start);
  const translateY = 40 - (localProgress * 80);

  if (!isVisible) return null;

  // We use strict absolute positioning for bulletproof placement
  return (
    <div
      className="absolute inset-0 pointer-events-none z-30"
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        transition: "opacity 0.1s linear, transform 0.1s linear",
      }}
    >
      <div 
        className={`absolute top-1/2 -translate-y-1/2 flex flex-col 
          ${align === 'left' ? 'left-12 md:left-32 lg:left-48 xl:left-64 items-start text-left max-w-[80vw] md:max-w-xl lg:max-w-2xl' : 
            align === 'right' ? 'right-12 md:right-32 lg:right-48 xl:right-64 items-end text-right max-w-[80vw] md:max-w-xl lg:max-w-2xl' : 
            'left-1/2 -translate-x-1/2 items-center text-center w-[90vw] md:max-w-3xl px-4'}`}
      >
        {children}
      </div>
    </div>
  );
}

export function ShowcaseTextOverlays({ scrollProgress }: Props) {
  return (
    <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden">
      
      {/* Subtle vignette for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-60" />

      {/* ── Segment 1 (0.00 – 0.25) ────────────────────────── */}
      <Segment progress={scrollProgress} start={0.0} end={0.25} align="center">
        <span className="text-[#FFC300] text-xs md:text-sm font-bold tracking-[0.4em] uppercase mb-4 block drop-shadow-md">
          Chapter III
        </span>
        <h2 
          className="text-white font-black tracking-tight leading-none drop-shadow-2xl"
          style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
        >
          The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFC300] to-[#FF6A00]">Varieties</span>
        </h2>
        <p className="mt-8 text-lg md:text-2xl text-white/90 font-medium drop-shadow-lg">
          Explore our magnificent selection of Ratnagiri Alphonso, Kesar, Pairi, and Totapuri.
        </p>
      </Segment>

      {/* ── Segment 2 (0.25 – 0.50) ────────────────────────── */}
      <Segment progress={scrollProgress} start={0.25} end={0.50} align="left">
        <h2 
          className="text-white font-black tracking-tighter leading-[0.85] drop-shadow-2xl"
          style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)" }}
        >
          PURE<br />
          <span className="text-[#FFC300] font-serif font-medium whitespace-nowrap block" style={{ fontStyle: 'italic', paddingRight: '0.1em' }}>Devotion</span>
        </h2>
        <div className="mt-8 flex items-center gap-5">
          <div className="w-16 h-1 bg-[#FF6A00] shrink-0 drop-shadow-md" />
          <p className="text-lg md:text-2xl text-white/90 font-medium drop-shadow-md">Nurtured with ancestral care.</p>
        </div>
      </Segment>

      {/* ── Segment 3 (0.50 – 0.75) ────────────────────────── */}
      <Segment progress={scrollProgress} start={0.50} end={0.75} align="right">
        <div className="flex flex-col items-end">
          <h2 
            className="text-[#FF6A00] font-black tracking-tight drop-shadow-2xl uppercase leading-none"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
          >
            Nature&apos;s
          </h2>
          <h2 
            className="text-white font-black tracking-tighter drop-shadow-2xl leading-none -mt-2"
            style={{ fontSize: "clamp(4rem, 9vw, 8rem)" }}
          >
            GOLD
          </h2>
        </div>
        
        {/* We add a strict max-width here so it never touches the left side/mango */}
        <div className="mt-8 bg-black/40 p-6 md:p-8 rounded-2xl backdrop-blur-md border border-white/10 w-full max-w-[320px] md:max-w-md text-right flex flex-col gap-4 shadow-2xl">
          <p className="text-base md:text-xl text-white/95 font-medium leading-snug">
            Unmatched sweetness, distinct aroma, and the creamiest texture the earth has to offer.
          </p>
          <p className="text-sm md:text-lg text-[#FFC300]/90 font-medium leading-relaxed">
            Hand-harvested at the exact moment of perfect ripeness, locking in a breathtaking symphony of tropical flavors that explode on your palate. Every single mango is a golden masterpiece.
          </p>
        </div>
      </Segment>

      {/* ── Segment 4 (0.75 – 1.00) ────────────────────────── */}
      <Segment progress={scrollProgress} start={0.75} end={1.00} align="center">
        <h2 
          className="text-white font-black tracking-tight leading-tight drop-shadow-2xl"
          style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
        >
          The Harvest <span className="text-[#FFC300] block md:inline">Awaits</span>
        </h2>
        <a 
          href="#contact" 
          className="mt-12 inline-block px-12 py-5 bg-gradient-to-r from-[#FFC300] to-[#FF6A00] text-black text-lg font-black tracking-widest uppercase rounded-full shadow-[0_0_40px_rgba(255,195,0,0.5)] pointer-events-auto hover:scale-105 transition-transform"
        >
          Reserve Yours Now
        </a>
      </Segment>

    </div>
  );
}
