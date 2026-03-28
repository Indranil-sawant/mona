"use client";

/**
 * StoryCanvas.tsx
 * ──────────────────────────────────────────────────────────────────────────
 * Sticky, full-screen canvas that plays a 144-frame JPEG sequence driven
 * by the user's scroll position for the secondary story section.
 *
 * Key features:
 *  • LERP-smoothed frame interpolation (no jank)
 *  • DPR (retina) aware scaling via devicePixelRatio
 *  • Progressive preloading – critical first frames load first
 *  • Responsive: canvas re-sizes on window resize via ResizeObserver
 *  • Accessibility: role="img" + aria-label
 *
 * Frame files expected at:
 *   /public/images2/ezgif-frame-001.jpg  →  ezgif-frame-144.jpg
 * ──────────────────────────────────────────────────────────────────────────
 */

import { useEffect, useRef, useCallback } from "react";

/* ── Constants ──────────────────────────────────────────────── */
const FRAME_COUNT   = 240;                        // total frames in images2
const FRAME_PATH    = (i: number) =>
  `/images2/${String(i).padStart(4, "0")}.webp`;
const LERP_FACTOR   = 0.12;                       // slightly faster smoothing
const PRELOAD_BATCH = 20;                         // how many frames to load first

interface StoryCanvasProps {
  /** 0–1 scroll progress from the parent scroll zone */
  scrollProgress: number;
  className?: string;
}

export function StoryCanvas({ scrollProgress, className = "" }: StoryCanvasProps) {
  const canvasRef         = useRef<HTMLCanvasElement>(null);
  const framesRef         = useRef<(HTMLImageElement | null)[]>(
    Array(FRAME_COUNT).fill(null)
  );
  const currentFrameRef   = useRef<number>(0);   // smoothed (LERP) frame index
  const targetFrameRef    = useRef<number>(0);   // raw frame index from scroll
  const rafRef            = useRef<number>(0);
  const reducedMotionRef  = useRef<boolean>(false);

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
    const W   = canvas.width;
    const H   = canvas.height;

    // ── Cover fit ────────────
    const imgAspect    = img.naturalWidth / img.naturalHeight;
    const canvasAspect = (W / dpr) / (H / dpr);
    let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;

    if (imgAspect > canvasAspect) {
      sw = img.naturalHeight * canvasAspect;
      sx = (img.naturalWidth - sw) / 2;
    } else {
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

    const next = Math.abs(delta) < 0.1 ? target : current + delta * LERP_FACTOR;
    currentFrameRef.current = next;

    drawFrame(next);
    rafRef.current = requestAnimationFrame(animate);
  }, [drawFrame]);

  /* ── Handle canvas resize ───────────────────── */
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width  = rect.width  * dpr;
    canvas.height = rect.height * dpr;

    drawFrame(currentFrameRef.current);
  }, [drawFrame]);

  /* ── Preload frames ───────────────────── */
  const preloadFrames = useCallback(() => {
    const loadFrame = (index: number): Promise<void> =>
      new Promise((resolve) => {
        if (framesRef.current[index]?.complete) {
          resolve();
          return;
        }
        const img = new Image();
        img.src = FRAME_PATH(index + 1);
        img.onload  = () => { framesRef.current[index] = img; resolve(); };
        img.onerror = () => { framesRef.current[index] = null; resolve(); };
        framesRef.current[index] = img;
      });

    const wave1 = Array.from({ length: PRELOAD_BATCH }, (_, i) => loadFrame(i));
    Promise.all(wave1).then(() => {
      if (!reducedMotionRef.current) return;
      drawFrame(0);
    });

    Array.from({ length: FRAME_COUNT - PRELOAD_BATCH }, (_, i) =>
      loadFrame(i + PRELOAD_BATCH)
    );
  }, [drawFrame]);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    reducedMotionRef.current = prefersReduced;

    resizeCanvas();
    const canvas = canvasRef.current!;
    const ro = new ResizeObserver(resizeCanvas);
    ro.observe(canvas);

    preloadFrames();

    if (!prefersReduced) {
      rafRef.current = requestAnimationFrame(animate);
    }

    return () => {
      ro.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [animate, preloadFrames, resizeCanvas]);

  useEffect(() => {
    const target = scrollProgress * (FRAME_COUNT - 1);
    targetFrameRef.current = target;

    if (reducedMotionRef.current) {
      drawFrame(target);
    }
  }, [scrollProgress, drawFrame]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      role="img"
      aria-label="Story of the Orchard — premium mango sequence"
    />
  );
}
