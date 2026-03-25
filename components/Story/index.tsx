"use client";

/**
 * Story/index.tsx
 * ──────────────────────────────────────────────────────────────────────────
 * Secondary scrollytelling section — "Our Story".
 * Mirrors the Hero architecture for design consistency.
 * ──────────────────────────────────────────────────────────────────────────
 */

import { useRef, useEffect, useState, useCallback } from "react";
import { StoryCanvas }       from "./StoryCanvas";
import { StoryTextOverlays } from "./StoryTextOverlays";

export function Story() {
  const scrollZoneRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

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

  return (
    <div
      ref={scrollZoneRef}
      id="story"
      className="relative w-full"
      style={{ height: "400vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Dark backdrop for the canvas */}
        <div
          className="absolute inset-0 z-0 bg-[#0a0a0a]"
          aria-hidden="true"
        />

        {/* The Frame Sequence Canvas */}
        <StoryCanvas
          scrollProgress={scrollProgress}
          className="z-10"
        />

        {/* Text Overlays for the Story */}
        <StoryTextOverlays
          scrollProgress={scrollProgress}
        />

        {/* Aesthetic Gradient Shadows */}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,10,0.8)] via-transparent to-[rgba(10,10,10,0.8)] z-20 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent z-40 pointer-events-none" />
      </div>
    </div>
  );
}
