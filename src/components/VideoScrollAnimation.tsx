"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";

export default function VideoScrollAnimation() {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadProgress, setLoadProgress] = useState(0);
    const [videoDuration, setVideoDuration] = useState(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    // Text opacities - simple bottom-positioned captions
    const introOpacity = useTransform(smoothProgress, [0, 0.12, 0.18, 0.22], [1, 1, 0, 0]);
    const craftOpacity = useTransform(smoothProgress, [0.28, 0.32, 0.48, 0.52], [0, 1, 1, 0]);
    const skillsOpacity = useTransform(smoothProgress, [0.55, 0.58, 0.72, 0.75], [0, 1, 1, 0]);
    const ctaOpacity = useTransform(smoothProgress, [0.85, 0.90, 1, 1], [0, 1, 1, 1]);

    // Seek video based on scroll progress
    const seekVideo = useCallback(
        (progress: number) => {
            const video = videoRef.current;
            if (!video || !isLoaded || videoDuration === 0) return;

            const targetTime = progress * videoDuration;

            // Only seek if the difference is significant (performance optimization)
            if (Math.abs(video.currentTime - targetTime) > 0.01) {
                video.currentTime = targetTime;
            }
        },
        [isLoaded, videoDuration]
    );

    useMotionValueEvent(smoothProgress, "change", (latest) => {
        seekVideo(latest);
    });

    // Handle video loading
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleLoadedMetadata = () => {
            setVideoDuration(video.duration);
        };

        const handleCanPlayThrough = () => {
            setIsLoaded(true);
            // Start at frame 0
            video.currentTime = 0;
        };

        const handleProgress = () => {
            if (video.buffered.length > 0) {
                const bufferedEnd = video.buffered.end(video.buffered.length - 1);
                const duration = video.duration;
                if (duration > 0) {
                    setLoadProgress(Math.round((bufferedEnd / duration) * 100));
                }
            }
        };

        video.addEventListener("loadedmetadata", handleLoadedMetadata);
        video.addEventListener("canplaythrough", handleCanPlayThrough);
        video.addEventListener("progress", handleProgress);

        // Force load
        video.load();

        return () => {
            video.removeEventListener("loadedmetadata", handleLoadedMetadata);
            video.removeEventListener("canplaythrough", handleCanPlayThrough);
            video.removeEventListener("progress", handleProgress);
        };
    }, []);

    // Initial seek after load
    useEffect(() => {
        if (isLoaded) {
            seekVideo(smoothProgress.get());
        }
    }, [isLoaded, seekVideo, smoothProgress]);

    return (
        <>
            {/* Loading Screen */}
            {!isLoaded && (
                <motion.div
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505]"
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="text-8xl md:text-9xl font-thin tracking-tighter text-white/90 tabular-nums">
                        {loadProgress}<span className="text-3xl text-white/40">%</span>
                    </span>
                    <div className="w-48 h-[2px] bg-white/10 mt-8 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-white/40 to-white/80 rounded-full"
                            animate={{ width: `${loadProgress}%` }}
                        />
                    </div>
                </motion.div>
            )}

            <div ref={containerRef} className="relative" style={{ height: "400vh" }}>
                {/* Sticky video container */}
                <div className="sticky top-0 left-0 w-screen h-screen overflow-hidden">
                    <video
                        ref={videoRef}
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{
                            opacity: isLoaded ? 1 : 0,
                            transition: "opacity 0.6s ease",
                        }}
                        src="/scroll_video.mp4"
                        muted
                        playsInline
                        preload="auto"
                        suppressHydrationWarning
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
                            <p className="text-white/40 text-xs uppercase tracking-[0.4em] mb-4 font-medium">
                                Full-Stack Developer & Creative Technologist
                            </p>
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
