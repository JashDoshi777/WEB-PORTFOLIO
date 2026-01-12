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
    const headerWrapperRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const textLine1Ref = useRef<HTMLDivElement>(null);
    const textLine2Ref = useRef<HTMLDivElement>(null);
    const textLine3Ref = useRef<HTMLDivElement>(null);
    const textLine4Ref = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const stripsWrapperRef = useRef<HTMLDivElement>(null);
    const stat1Ref = useRef<HTMLDivElement>(null);
    const stat2Ref = useRef<HTMLDivElement>(null);
    const stat3Ref = useRef<HTMLDivElement>(null);
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

            // Set initial states - all hidden with enhanced effects
            // Header starts collapsed to center (scaleX: 0)
            gsap.set(headerWrapperRef.current, {
                scaleX: 0,
                transformOrigin: "center center"
            });
            gsap.set(cardRef.current, { opacity: 0, y: 80, scale: 0.9, rotateY: -15, filter: "blur(10px)" });
            gsap.set(textLine1Ref.current, { opacity: 0, x: 200, filter: "blur(8px)" });
            gsap.set(textLine2Ref.current, { opacity: 0, x: -200, filter: "blur(8px)" });
            gsap.set(textLine3Ref.current, { opacity: 0, y: 60, filter: "blur(6px)" });
            gsap.set(textLine4Ref.current, { opacity: 0, y: 60, filter: "blur(6px)" });
            gsap.set(statsRef.current, { opacity: 0 });
            gsap.set(stat1Ref.current, { opacity: 0, y: 50, scale: 0.8 });
            gsap.set(stat2Ref.current, { opacity: 0, y: 50, scale: 0.8 });
            gsap.set(stat3Ref.current, { opacity: 0, y: 50, scale: 0.8 });
            gsap.set(stripsWrapperRef.current, { opacity: 0, y: 80, scale: 0.95 });

            // Header expansion from center - starts early as section enters viewport
            gsap.to(headerWrapperRef.current, {
                scaleX: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 90%",
                    end: "top 30%",
                    scrub: 0.3,
                },
            });

            // Main pinned scroll timeline
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=2000",
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                    pinSpacing: true,
                },
            });

            // Reveal card with 3D effect - starts immediately when pinned
            tl.to(cardRef.current, {
                opacity: 1,
                y: 0,
                scale: 1,
                rotateY: 0,
                filter: "blur(0px)",
                duration: 0.25,
                ease: "power3.out",
            }, 0);

            // Text line 1 - dramatic slide in
            tl.to(textLine1Ref.current, {
                opacity: 1,
                x: 0,
                filter: "blur(0px)",
                duration: 0.2,
                ease: "power3.out",
            }, 0.12);

            // Text line 2 - slide from opposite direction
            tl.to(textLine2Ref.current, {
                opacity: 1,
                x: 0,
                filter: "blur(0px)",
                duration: 0.2,
                ease: "power3.out",
            }, 0.22);

            // Text line 3 - fade up
            tl.to(textLine3Ref.current, {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 0.18,
                ease: "power2.out",
            }, 0.35);

            // Text line 4 - fade up
            tl.to(textLine4Ref.current, {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 0.18,
                ease: "power2.out",
            }, 0.45);

            // Stats container fade in
            tl.to(statsRef.current, {
                opacity: 1,
                duration: 0.1,
            }, 0.55);

            // Stats staggered reveal with scale
            tl.to(stat1Ref.current, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.12,
                ease: "back.out(1.7)",
            }, 0.58);

            tl.to(stat2Ref.current, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.12,
                ease: "back.out(1.7)",
            }, 0.65);

            tl.to(stat3Ref.current, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.12,
                ease: "back.out(1.7)",
            }, 0.72);

            // Strips reveal at the end with scale
            tl.to(stripsWrapperRef.current, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.2,
                ease: "power3.out",
            }, 0.82);

        }, sectionRef);

        return () => ctx.revert();
    }, [mounted]);

    const marqueeText = "CREATIVE DEVELOPER ✦ UI/UX ENTHUSIAST ✦ WEB ARCHITECT ✦ PROBLEM SOLVER ✦ ";
    const strip1Text = "★ Driven by Passion, Built with Code ★ Custom Web Experiences ★ Innovative Self-Made Creations ★ Tailored Web Solutions ★ ";
    const strip2Text = "★ Premium Quality ★ Performance First ★ Pixel Perfect ★ Digital Craft ★ Modern Development ★ Creative Coding ★ ";

    const stats = [
        { number: "3+", label: "YEARS", ref: stat1Ref },
        { number: "50+", label: "PROJECTS", ref: stat2Ref },
        { number: "30+", label: "CLIENTS", ref: stat3Ref },
    ];

    return (
        <section
            id="about"
            ref={sectionRef}
            className="relative bg-[#050505] overflow-visible"
        >
            {/* Pinned wrapper that includes header and content */}
            <div className="min-h-screen pt-20">
                {/* Large Header Marquee Banner - Expands from center on scroll */}
                <div ref={headerWrapperRef} className="py-3 md:py-4 overflow-hidden border-b border-white/5">
                    <div className="about-header-marquee flex whitespace-nowrap" style={{ width: "200%" }}>
                        <span className="text-2xl md:text-4xl lg:text-6xl font-black tracking-tight text-white/90 uppercase">
                            {marqueeText.repeat(6)}
                        </span>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="px-6 md:px-12 lg:px-20 py-3 md:py-4">
                    <div className="flex items-start gap-8 md:gap-12 lg:gap-16">
                        {/* Left Side - Card */}
                        <div
                            ref={cardRef}
                            className="flex-shrink-0 w-48 md:w-56 lg:w-64"
                            style={{ perspective: "1000px" }}
                        >
                            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-white/10">
                                {/* Background effects - neutral grey color scheme */}
                                <div className="absolute inset-0 opacity-60">
                                    <div className="absolute top-0 left-1/4 w-40 h-40 bg-neutral-400/20 rounded-full blur-[70px]" />
                                    <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-zinc-400/25 rounded-full blur-[70px]" />
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
                                        <div className="absolute inset-0 w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-neutral-300 to-zinc-400 blur-xl opacity-30 animate-pulse" />
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

                                {/* Side accent - neutral grey gradient */}
                                <div className="absolute -right-0.5 top-1/3 w-1 h-24 bg-gradient-to-b from-neutral-300 via-zinc-400 to-neutral-500 rounded-full" />

                                {/* Location tag */}
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                                    <span className="text-[10px] text-white/30 tracking-wider">INDIA • 2026</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Text Content */}
                        <div className="flex-1 pt-4">
                            {/* Animated text lines - enhanced typography */}
                            <div className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                                <div ref={textLine1Ref}>
                                    <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-white leading-[1.1]">
                                        <span className="font-extralight">Crafting</span>{" "}
                                        <span className="font-bold italic">digital</span>{" "}
                                        <span className="font-light">experiences</span>
                                    </h2>
                                </div>

                                <div ref={textLine2Ref}>
                                    <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-[1.1]">
                                        <span className="text-white/40 font-light">that </span>
                                        <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-zinc-300">inspire</span>
                                        <span className="text-white/40 font-light"> and </span>
                                        <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 via-neutral-100 to-white">engage</span>
                                    </h2>
                                </div>

                                <div ref={textLine3Ref} className="max-w-2xl pt-1">
                                    <p className="text-base md:text-lg lg:text-xl text-white/60 leading-relaxed font-light">
                                        I&apos;m a <span className="text-white font-semibold">creative developer</span> passionate about building
                                        intuitive, <span className="text-white/90 font-medium">high-performance</span> web applications that
                                        deliver meaningful results.
                                    </p>
                                </div>

                                <div ref={textLine4Ref} className="max-w-2xl">
                                    <p className="text-base md:text-lg lg:text-xl text-white/40 leading-relaxed font-light italic">
                                        From concept to launch, I focus on user-centered design
                                        and clean, maintainable code.
                                    </p>
                                </div>
                            </div>

                            {/* Stats */}
                            <div ref={statsRef}>
                                <div className="h-px bg-gradient-to-r from-white/30 via-white/15 to-transparent mb-4 max-w-xl" />
                                <div className="flex gap-8 md:gap-12 lg:gap-16">
                                    {stats.map((stat) => (
                                        <div key={stat.label} ref={stat.ref}>
                                            <p className="text-3xl md:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mb-0.5">
                                                {stat.number}
                                            </p>
                                            <p className="text-xs md:text-sm text-white/50 uppercase tracking-[0.25em] font-medium">
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
                <div ref={stripsWrapperRef} className="relative h-28 md:h-32">
                    {/* Strip 1 - White/Light - Tilted Down-Right */}
                    <div
                        className="absolute w-[300vw] left-[-100vw] bg-white py-5 md:py-6 shadow-2xl z-10"
                        style={{ transform: "rotate(-4deg)", top: "5%" }}
                    >
                        <div className="about-strip-1-marquee whitespace-nowrap" style={{ display: "inline-block", width: "200%" }}>
                            <span className="text-xl md:text-2xl lg:text-3xl font-black text-[#050505] tracking-wide inline-block uppercase">
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
                            <span className="text-xl md:text-2xl lg:text-3xl font-black text-white/90 tracking-wide inline-block uppercase">
                                {strip2Text.repeat(15)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
