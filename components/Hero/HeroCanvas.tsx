"use client";

/**
 * HeroCanvas.tsx
 * ──────────────────────────────────────────────────────────────────────────
 * Sticky, full-screen canvas that plays a 240-frame JPEG sequence driven
 * by the user's scroll position.
 *
 * Key features:
 *  • LERP-smoothed frame interpolation (no jank)
 *  • DPR (retina) aware scaling via devicePixelRatio
 *  • Progressive preloading – critical first frames load first
 *  • Responsive: canvas re-sizes on window resize via ResizeObserver
 *  • prefers-reduced-motion respected – shows static first frame
 *  • Accessibility: role="img" + aria-label
 *
 * Frame files expected at:
 *   /public/images/ezgif-frame-001.jpg  →  ezgif-frame-240.jpg
 * ──────────────────────────────────────────────────────────────────────────
 */

import { useEffect, useRef, useCallback } from "react";

/* ── Constants ──────────────────────────────────────────────── */
const FRAME_COUNT   = 240;                        // total frames in sequence
const FRAME_PATH    = (i: number) =>
  `/images/ezgif-frame-${String(i).padStart(3, "0")}.jpg`;
const LERP_FACTOR   = 0.10;                       // smoothing (0 = no lerp, 1 = instant)
const PRELOAD_BATCH = 20;                         // how many frames to load first

interface HeroCanvasProps {
  /** 0–1 scroll progress from the parent scroll zone */
  scrollProgress: number;
  className?: string;
}

export function HeroCanvas({ scrollProgress, className = "" }: HeroCanvasProps) {
  const canvasRef         = useRef<HTMLCanvasElement>(null);
  const framesRef         = useRef<(HTMLImageElement | null)[]>(
    Array(FRAME_COUNT).fill(null)
  );
  const currentFrameRef   = useRef<number>(0);   // smoothed (LERP) frame index
  const targetFrameRef    = useRef<number>(0);   // raw frame index from scroll
  const rafRef            = useRef<number>(0);
  const reducedMotionRef  = useRef<boolean>(false);
  const loadedCountRef    = useRef<number>(0);

  /* ── Draw a single frame onto the canvas ────────────────── */
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const clampedIdx = Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(frameIndex)));
    const img = framesRef.current[clampedIdx];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const W   = canvas.width;   // already DPR-scaled
    const H   = canvas.height;

    // ── Cover fit (like background-size: cover) ────────────
    const imgAspect    = img.naturalWidth / img.naturalHeight;
    const canvasAspect = (W / dpr) / (H / dpr);
    let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;

    if (imgAspect > canvasAspect) {
      // Image is wider – crop sides
      sw = img.naturalHeight * canvasAspect;
      sx = (img.naturalWidth - sw) / 2;
    } else {
      // Image is taller – crop top/bottom
      sh = img.naturalWidth / canvasAspect;
      sy = (img.naturalHeight - sh) / 2;
    }

    ctx.clearRect(0, 0, W, H);
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, W, H);
  }, []);

  /* ── RAF animation loop with LERP ───────────────────────── */
  const animate = useCallback(() => {
    const current = currentFrameRef.current;
    const target  = targetFrameRef.current;
    const delta   = target - current;

    // Lerp towards target frame
    const next = Math.abs(delta) < 0.1 ? target : current + delta * LERP_FACTOR;
    currentFrameRef.current = next;

    drawFrame(next);

    rafRef.current = requestAnimationFrame(animate);
  }, [drawFrame]);

  /* ── Handle canvas resize (DPR-aware) ───────────────────── */
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width  = rect.width  * dpr;
    canvas.height = rect.height * dpr;

    // Immediately redraw current frame after resize
    drawFrame(currentFrameRef.current);
  }, [drawFrame]);

  /* ── Preload frames in priority waves ───────────────────── */
  const preloadFrames = useCallback(() => {
    const loadFrame = (index: number): Promise<void> =>
      new Promise((resolve) => {
        if (framesRef.current[index]?.complete) {
          resolve();
          return;
        }
        const img = new Image();
        img.src = FRAME_PATH(index + 1); // files are 1-indexed
        img.onload  = () => { framesRef.current[index] = img; loadedCountRef.current++; resolve(); };
        img.onerror = () => { framesRef.current[index] = null; resolve(); };
        framesRef.current[index] = img;
      });

    // Wave 1: first PRELOAD_BATCH frames → draw first frame ASAP
    const wave1 = Array.from({ length: PRELOAD_BATCH }, (_, i) => loadFrame(i));
    Promise.all(wave1).then(() => {
      if (!reducedMotionRef.current) return; // reduced-motion draws static frame here
      drawFrame(0);
    });

    // Wave 2: rest of frames lazily
    Promise.all(
      Array.from({ length: FRAME_COUNT - PRELOAD_BATCH }, (_, i) =>
        loadFrame(i + PRELOAD_BATCH)
      )
    );
  }, [drawFrame]);

  /* ── Mount: setup canvas, ResizeObserver, start loop ────── */
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    reducedMotionRef.current = prefersReduced;

    // Initial resize
    resizeCanvas();

    // Observe container size changes
    const canvas = canvasRef.current!;
    const ro = new ResizeObserver(resizeCanvas);
    ro.observe(canvas);

    // Start preloading
    preloadFrames();

    if (!prefersReduced) {
      rafRef.current = requestAnimationFrame(animate);
    }

    return () => {
      ro.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [animate, preloadFrames, resizeCanvas]);

  /* ── Update target frame when scrollProgress changes ─────── */
  useEffect(() => {
    const target = scrollProgress * (FRAME_COUNT - 1);
    targetFrameRef.current = target;

    // Reduced-motion: draw directly without LERP animation
    if (reducedMotionRef.current) {
      drawFrame(target);
    }
  }, [scrollProgress, drawFrame]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      role="img"
      aria-label="Premium MONA Mango — scrolling animation showing ripe mangoes from orchard to table"
    />
  );
}
