"use client";

import { useEffect, useRef, useCallback } from "react";

const FRAME_COUNT = 239;
const FRAME_PATH = (i: number) =>
  `/images3/ezgif-frame-${String(i).padStart(3, "0")}.jpg`;
const LERP_FACTOR = 0.08;
const PRELOAD_BATCH = 24;

interface ShowcaseCanvasProps {
  scrollProgress: number;
}

export function ShowcaseCanvas({ scrollProgress }: ShowcaseCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<(HTMLImageElement | null)[]>(Array(FRAME_COUNT).fill(null));
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const rafRef = useRef(0);
  const reducedMotionRef = useRef(false);

  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const clampedIdx = Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(frameIndex)));
    const img = framesRef.current[clampedIdx];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const W = canvas.width;
    const H = canvas.height;

    // Cover Fit Implementation
    const imgAspect = img.naturalWidth / img.naturalHeight;
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
    // Add a slight scaling multiplier so it feels immersive (105% zoom)
    const zoom = 1.05;
    const drawW = W * zoom;
    const drawH = H * zoom;
    const offX = (W - drawW) / 2;
    const offY = (H - drawH) / 2;
    ctx.drawImage(img, sx, sy, sw, sh, offX, offY, drawW, drawH);
  }, []);

  const animate = useCallback(() => {
    const current = currentFrameRef.current;
    const target = targetFrameRef.current;
    const delta = target - current;

    const next = Math.abs(delta) < 0.1 ? target : current + delta * LERP_FACTOR;
    currentFrameRef.current = next;
    drawFrame(next);

    rafRef.current = requestAnimationFrame(animate);
  }, [drawFrame]);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    drawFrame(currentFrameRef.current);
  }, [drawFrame]);

  const preloadFrames = useCallback(() => {
    const loadFrame = (index: number): Promise<void> =>
      new Promise((resolve) => {
        if (framesRef.current[index]?.complete) return resolve();
        const img = new Image();
        img.src = FRAME_PATH(index + 1);
        img.onload = () => { framesRef.current[index] = img; resolve(); };
        img.onerror = () => { framesRef.current[index] = null; resolve(); };
        framesRef.current[index] = img;
      });

    const wave1 = Array.from({ length: PRELOAD_BATCH }, (_, i) => loadFrame(i));
    Promise.all(wave1).then(() => {
      if (!reducedMotionRef.current) drawFrame(0);
    });

    setTimeout(() => {
      Promise.all(
        Array.from({ length: FRAME_COUNT - PRELOAD_BATCH }, (_, i) => loadFrame(i + PRELOAD_BATCH))
      );
    }, 1000);
  }, [drawFrame]);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    reducedMotionRef.current = prefersReduced;
    resizeCanvas();
    const ro = new ResizeObserver(resizeCanvas);
    ro.observe(canvasRef.current!);
    preloadFrames();
    if (!prefersReduced) rafRef.current = requestAnimationFrame(animate);
    return () => { ro.disconnect(); cancelAnimationFrame(rafRef.current); };
  }, [animate, preloadFrames, resizeCanvas]);

  useEffect(() => {
    const target = scrollProgress * (FRAME_COUNT - 1);
    targetFrameRef.current = target;
    if (reducedMotionRef.current) drawFrame(target);
  }, [scrollProgress, drawFrame]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
      role="img"
      aria-label="Mango animation exploring different varieties"
    />
  );
}
