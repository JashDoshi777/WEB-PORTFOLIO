"use client";

import { useRef, useLayoutEffect, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const marqueeRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const textLine1Ref = useRef<HTMLDivElement>(null);
    const textLine2Ref = useRef<HTMLDivElement>(null);
    const textLine3Ref = useRef<HTMLDivElement>(null);
    const textLine4Ref = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const stripsWrapperRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useLayoutEffect(() => {
        if (!mounted) return;

        const ctx = gsap.context(() => {
            // Header marquee loop
            gsap.to(".about-header-marquee", {
                xPercent: -50,
                repeat: -1,
                duration: 20,
                ease: "linear",
            });

            // Strip 1 marquee loop
            gsap.to(".about-strip-1-marquee", {
                xPercent: -50,
                repeat: -1,
                duration: 25,
                ease: "linear",
            });

            // Strip 2 marquee loop (opposite direction)
            gsap.to(".about-strip-2-marquee", {
                xPercent: 50,
                repeat: -1,
                duration: 25,
                ease: "linear",
            });

            // Set initial states - all hidden
            gsap.set(cardRef.current, { opacity: 0, y: 60, scale: 0.95 });
            gsap.set(textLine1Ref.current, { opacity: 0, x: 150 });
            gsap.set(textLine2Ref.current, { opacity: 0, x: -150 });
            gsap.set(textLine3Ref.current, { opacity: 0, x: 150 });
            gsap.set(textLine4Ref.current, { opacity: 0, x: -150 });
            gsap.set(statsRef.current, { opacity: 0, y: 40 });
            gsap.set(stripsWrapperRef.current, { opacity: 0, y: 60 });

            // Main pinned scroll timeline
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=2000",
                    scrub: 1.5,
                    pin: true,
                    anticipatePin: 1,
                },
            });

            // Fade marquee header
            tl.to(marqueeRef.current, {
                opacity: 0.2,
                duration: 0.15,
            }, 0);

            // Reveal card
            tl.to(cardRef.current, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.2,
                ease: "power2.out",
            }, 0);

            // Text lines staggered reveal
            tl.to(textLine1Ref.current, {
                opacity: 1,
                x: 0,
                duration: 0.2,
                ease: "power2.out",
            }, 0.15);

            tl.to(textLine2Ref.current, {
                opacity: 1,
                x: 0,
                duration: 0.2,
                ease: "power2.out",
            }, 0.28);

            tl.to(textLine3Ref.current, {
                opacity: 1,
                x: 0,
                duration: 0.2,
                ease: "power2.out",
            }, 0.41);

            tl.to(textLine4Ref.current, {
                opacity: 1,
                x: 0,
                duration: 0.2,
                ease: "power2.out",
            }, 0.54);

            // Stats reveal
            tl.to(statsRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.15,
                ease: "power2.out",
            }, 0.67);

            // Strips reveal at the end
            tl.to(stripsWrapperRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.18,
                ease: "power2.out",
            }, 0.8);

        }, sectionRef);

        return () => ctx.revert();
    }, [mounted]);

    const marqueeText = "CREATIVE DEVELOPER ✦ UI/UX ENTHUSIAST ✦ WEB ARCHITECT ✦ PROBLEM SOLVER ✦ ";
    const strip1Text = "★ Driven by Passion, Built with Code ★ Custom Web Experiences ★ Innovative Self-Made Creations ★ Tailored Web Solutions ★ ";
    const strip2Text = "★ Premium Quality ★ Performance First ★ Pixel Perfect ★ Digital Craft ★ Modern Development ★ Creative Coding ★ ";

    return (
        <section
            id="about"
            ref={sectionRef}
            className="relative min-h-screen bg-[#050505]"
        >
            {/* Large Header Marquee Banner */}
            <div ref={marqueeRef} className="py-2 md:py-3 overflow-hidden border-b border-white/5">
                <div className="about-header-marquee flex whitespace-nowrap" style={{ width: "200%" }}>
                    <span className="text-3xl md:text-5xl lg:text-7xl font-black tracking-tight text-white/90 uppercase">
                        {marqueeText.repeat(6)}
                    </span>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="px-6 md:px-12 lg:px-20 py-6 md:py-8">
                <div className="flex items-start gap-10 md:gap-16 lg:gap-20">
                    {/* Left Side - Card */}
                    <div
                        ref={cardRef}
                        className="flex-shrink-0 w-56 md:w-72 lg:w-80"
                    >
                        <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-white/10">
                            {/* Background effects */}
                            <div className="absolute inset-0 opacity-60">
                                <div className="absolute top-0 left-1/4 w-40 h-40 bg-purple-600/30 rounded-full blur-[70px]" />
                                <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-blue-600/30 rounded-full blur-[70px]" />
                            </div>

                            {/* Grid pattern */}
                            <div
                                className="absolute inset-0 opacity-[0.04]"
                                style={{
                                    backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                                    backgroundSize: "30px 30px",
                                }}
                            />

                            {/* Card content */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                                {/* Avatar */}
                                <div className="relative mb-4">
                                    <div className="absolute inset-0 w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 blur-xl opacity-40 animate-pulse" />
                                    <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/20 flex items-center justify-center backdrop-blur-sm">
                                        <span className="text-3xl md:text-5xl font-thin text-white/70">JD</span>
                                    </div>
                                </div>

                                {/* Title */}
                                <p className="text-white/40 text-sm tracking-widest uppercase mb-4">About Me</p>

                                {/* Status */}
                                <div className="flex items-center gap-2 mt-auto">
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-400/80 animate-pulse" />
                                    <span className="text-xs text-white/40">Available</span>
                                </div>
                            </div>

                            {/* Corner accents */}
                            <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-white/10 rounded-tl" />
                            <div className="absolute top-3 right-3 w-6 h-6 border-r-2 border-t-2 border-white/10 rounded-tr" />
                            <div className="absolute bottom-3 left-3 w-6 h-6 border-l-2 border-b-2 border-white/10 rounded-bl" />
                            <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-white/10 rounded-br" />

                            {/* Side accent */}
                            <div className="absolute -right-0.5 top-1/3 w-1 h-24 bg-gradient-to-b from-purple-500 via-blue-500 to-cyan-400 rounded-full" />

                            {/* Location tag */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                                <span className="text-[10px] text-white/30 tracking-wider">INDIA • 2026</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Text Content */}
                    <div className="flex-1 pt-4">
                        {/* Animated text lines - reduced spacing */}
                        <div className="space-y-3 md:space-y-4 mb-10 md:mb-12">
                            <div ref={textLine1Ref}>
                                <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-white/90 leading-tight">
                                    Crafting digital experiences
                                </h2>
                            </div>

                            <div ref={textLine2Ref}>
                                <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light leading-tight">
                                    <span className="text-white/50">that </span>
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">inspire</span>
                                    <span className="text-white/50"> and </span>
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">engage</span>
                                </h2>
                            </div>

                            <div ref={textLine3Ref} className="max-w-2xl">
                                <p className="text-base md:text-lg lg:text-xl text-white/50 leading-relaxed">
                                    I'm a creative developer passionate about building
                                    intuitive, high-performance web applications that
                                    deliver meaningful results.
                                </p>
                            </div>

                            <div ref={textLine4Ref} className="max-w-2xl">
                                <p className="text-base md:text-lg lg:text-xl text-white/40 leading-relaxed">
                                    From concept to launch, I focus on user-centered design
                                    and clean, maintainable code.
                                </p>
                            </div>
                        </div>

                        {/* Stats */}
                        <div ref={statsRef}>
                            <div className="h-px bg-gradient-to-r from-white/20 via-white/10 to-transparent mb-8 max-w-xl" />
                            <div className="flex gap-10 md:gap-14 lg:gap-20">
                                {[
                                    { number: "3+", label: "YEARS" },
                                    { number: "50+", label: "PROJECTS" },
                                    { number: "30+", label: "CLIENTS" },
                                ].map((stat) => (
                                    <div key={stat.label}>
                                        <p className="text-3xl md:text-4xl lg:text-5xl font-light text-white/90 mb-1">
                                            {stat.number}
                                        </p>
                                        <p className="text-xs md:text-sm text-white/40 uppercase tracking-widest">
                                            {stat.label}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Diagonal Crossing Strips */}
            <div ref={stripsWrapperRef} className="relative h-48 md:h-56 mt-4">
                {/* Strip 1 - White/Light - Tilted Down-Right */}
                <div
                    className="absolute w-[300vw] left-[-100vw] bg-white py-5 md:py-6 shadow-2xl z-10"
                    style={{ transform: "rotate(-4deg)", top: "5%" }}
                >
                    <div className="about-strip-1-marquee whitespace-nowrap" style={{ display: "inline-block", width: "200%" }}>
                        <span className="text-xl md:text-2xl lg:text-3xl font-bold text-[#050505] tracking-wide inline-block">
                            {strip1Text.repeat(15)}
                        </span>
                    </div>
                </div>

                {/* Strip 2 - Dark - Tilted Down-Left (Crossing) */}
                <div
                    className="absolute w-[300vw] left-[-100vw] bg-[#151515] py-5 md:py-6 shadow-2xl border-y border-white/5 z-20"
                    style={{ transform: "rotate(4deg)", top: "50%" }}
                >
                    <div className="about-strip-2-marquee whitespace-nowrap" style={{ display: "inline-block", width: "200%", transform: "translateX(-50%)" }}>
                        <span className="text-xl md:text-2xl lg:text-3xl font-bold text-white/90 tracking-wide inline-block">
                            {strip2Text.repeat(15)}
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
