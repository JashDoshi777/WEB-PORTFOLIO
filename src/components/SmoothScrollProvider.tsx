"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function SmoothScrollProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        // Initialize Lenis with buttery smooth settings
        const lenis = new Lenis({
            duration: 1.2, // Smooth duration - higher = smoother
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing for ultra-smooth feel
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            touchMultiplier: 2,
            infinite: false,
        });

        lenisRef.current = lenis;

        // Sync Lenis with GSAP ScrollTrigger
        lenis.on("scroll", ScrollTrigger.update);

        // Add Lenis's requestAnimationFrame to GSAP's ticker
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        // Disable GSAP's lag smoothing for perfect sync
        gsap.ticker.lagSmoothing(0);

        // Expose lenis to window for debugging and external access
        (window as typeof window & { lenis?: Lenis }).lenis = lenis;

        // Cleanup on unmount
        return () => {
            gsap.ticker.remove(lenis.raf);
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    return <>{children}</>;
}
