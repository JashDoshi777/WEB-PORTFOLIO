"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";

const TOTAL_FRAMES = 192;
const IMAGE_PATH = "/scroll_animation_image_frames/ezgif-frame-";

function useImagePreloader(totalFrames: number) {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const frameNumber = i.toString().padStart(3, "0");
      img.src = `${IMAGE_PATH}${frameNumber}.jpg`;

      img.onload = () => {
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / totalFrames) * 100));
        if (loadedCount === totalFrames) {
          setImages(loadedImages);
          setTimeout(() => setIsLoaded(true), 400);
        }
      };

      img.onerror = () => {
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / totalFrames) * 100));
      };

      loadedImages.push(img);
    }
  }, [totalFrames]);

  return { images, loadProgress, isLoaded };
}

function LoadingScreen({ progress }: { progress: number }) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505]"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <span className="text-8xl md:text-9xl font-thin tracking-tighter text-white/90 tabular-nums">
        {progress}<span className="text-3xl text-white/40">%</span>
      </span>
      <div className="w-48 h-[2px] bg-white/10 mt-8 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-white/40 to-white/80 rounded-full"
          animate={{ width: `${progress}%` }}
        />
      </div>
    </motion.div>
  );
}

export default function PortfolioScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { images, loadProgress, isLoaded } = useImagePreloader(TOTAL_FRAMES);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 25,
    restDelta: 0.001,
  });

  const frameIndex = useTransform(smoothProgress, [0, 1], [0, TOTAL_FRAMES - 1]);

  // Text opacities - simple bottom-positioned captions
  const introOpacity = useTransform(smoothProgress, [0, 0.12, 0.18, 0.22], [1, 1, 0, 0]);
  const craftOpacity = useTransform(smoothProgress, [0.28, 0.32, 0.48, 0.52], [0, 1, 1, 0]);
  const skillsOpacity = useTransform(smoothProgress, [0.55, 0.58, 0.72, 0.75], [0, 1, 1, 0]);
  const ctaOpacity = useTransform(smoothProgress, [0.85, 0.90, 1, 1], [0, 1, 1, 1]);

  const renderFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      if (!canvas || images.length === 0) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const frameIdx = Math.round(Math.max(0, Math.min(index, images.length - 1)));
      const img = images[frameIdx];

      if (img && img.complete && img.naturalWidth > 0) {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const dpr = window.devicePixelRatio || 1;

        // Set canvas size with device pixel ratio for crisp rendering
        canvas.width = vw * dpr;
        canvas.height = vh * dpr;
        canvas.style.width = `${vw}px`;
        canvas.style.height = `${vh}px`;

        // Scale context for high-DPI
        ctx.scale(dpr, dpr);

        // Enable high-quality image rendering
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        const imgAspect = img.naturalWidth / img.naturalHeight;
        const viewAspect = vw / vh;

        let drawW, drawH, drawX, drawY;

        if (viewAspect > imgAspect) {
          drawW = vw;
          drawH = vw / imgAspect;
          drawX = 0;
          drawY = (vh - drawH) / 2;
        } else {
          drawH = vh;
          drawW = vh * imgAspect;
          drawX = (vw - drawW) / 2;
          drawY = 0;
        }

        ctx.fillStyle = "#050505";
        ctx.fillRect(0, 0, vw, vh);
        ctx.drawImage(img, drawX, drawY, drawW, drawH);

        // Reset scale for next frame
        ctx.setTransform(1, 0, 0, 1, 0, 0);
      }
    },
    [images]
  );

  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (isLoaded) renderFrame(latest);
  });

  useEffect(() => {
    if (isLoaded && images.length > 0) renderFrame(0);
  }, [isLoaded, images, renderFrame]);

  useEffect(() => {
    if (!isLoaded) return;
    const handleResize = () => renderFrame(frameIndex.get());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [frameIndex, isLoaded, renderFrame]);

  return (
    <>
      {!isLoaded && <LoadingScreen progress={loadProgress} />}

      <div ref={containerRef} className="relative" style={{ height: "400vh" }}>
        {/* Sticky canvas */}
        <div className="sticky top-0 left-0 w-screen h-screen">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ opacity: isLoaded ? 1 : 0, transition: "opacity 0.6s ease" }}
          />

          {/* Gradient fade at bottom for text readability */}
          <div
            className="absolute bottom-0 left-0 right-0 h-80 pointer-events-none"
            style={{ background: "linear-gradient(to top, rgba(5,5,5,0.9) 0%, transparent 100%)" }}
          />

          {/* Intro Text */}
          {isLoaded && (
            <motion.div
              className="absolute bottom-20 left-0 right-0 text-center pointer-events-none px-6"
              style={{ opacity: introOpacity }}
            >
              <p className="text-white/40 text-xs uppercase tracking-[0.4em] mb-4 font-medium">Full-Stack Developer & Creative Technologist</p>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-extralight text-white tracking-tight mb-3">
                Jash Doshi
              </h1>
              <p className="text-white/50 text-base md:text-lg font-light max-w-md mx-auto">
                Turning bold ideas into seamless digital experiences
              </p>
            </motion.div>
          )}

          {/* Craft Text */}
          {isLoaded && (
            <motion.div
              className="absolute bottom-20 left-0 right-0 text-center pointer-events-none px-6"
              style={{ opacity: craftOpacity }}
            >
              <p className="text-white/40 text-xs uppercase tracking-[0.3em] mb-4">Philosophy</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extralight text-white tracking-tight mb-4">
                Where Code Meets Artistry
              </h2>
              <p className="text-white/50 text-base md:text-lg font-light max-w-lg mx-auto">
                I believe great software should feel invisible—intuitive, fast, and beautiful
              </p>
            </motion.div>
          )}

          {/* Skills Text */}
          {isLoaded && (
            <motion.div
              className="absolute bottom-20 left-0 right-0 text-center pointer-events-none px-6"
              style={{ opacity: skillsOpacity }}
            >
              <p className="text-white/40 text-xs uppercase tracking-[0.3em] mb-4">Expertise</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extralight text-white tracking-tight mb-4">
                Motion · Performance · Precision
              </h2>
              <p className="text-white/50 text-base md:text-lg font-light max-w-lg mx-auto">
                React, Next.js, TypeScript & modern web technologies
              </p>
            </motion.div>
          )}

          {/* CTA Text */}
          {isLoaded && (
            <motion.div
              className="absolute bottom-20 left-0 right-0 text-center px-6"
              style={{ opacity: ctaOpacity }}
            >
              <p className="text-white/40 text-xs uppercase tracking-[0.3em] mb-4">Ready to Collaborate?</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extralight text-white tracking-tight mb-6">
                Let&apos;s Create Something Extraordinary
              </h2>
              <a
                href="#contact"
                className="inline-flex items-center gap-3 px-6 py-3 border border-white/30 rounded-full text-sm text-white hover:bg-white hover:text-black transition-all duration-300"
              >
                Get in touch
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </motion.div>
          )}

          {/* Scroll indicator - only at start */}
          {isLoaded && (
            <motion.div
              className="absolute bottom-6 left-1/2 -translate-x-1/2"
              style={{ opacity: introOpacity }}
            >
              <motion.div
                className="w-5 h-8 rounded-full border border-white/30 flex justify-center pt-1.5"
              >
                <motion.div
                  className="w-1 h-1.5 bg-white/60 rounded-full"
                  animate={{ y: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                />
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}
