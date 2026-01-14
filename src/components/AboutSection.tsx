"use client";

import { useRef, useLayoutEffect, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerWrapperRef = useRef<HTMLDivElement>(null);
    const heroLine1Ref = useRef<HTMLDivElement>(null);
    const heroLine2Ref = useRef<HTMLDivElement>(null);
    const storyBlock1Ref = useRef<HTMLDivElement>(null);
    const storyBlock2Ref = useRef<HTMLDivElement>(null);
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

            // Set initial states
            gsap.set(headerWrapperRef.current, { scaleX: 0, transformOrigin: "center center" });
            gsap.set(heroLine1Ref.current, { opacity: 0, y: 100, filter: "blur(10px)" });
            gsap.set(heroLine2Ref.current, { opacity: 0, y: 100, filter: "blur(10px)" });
            gsap.set(storyBlock1Ref.current, { opacity: 0, x: -100, filter: "blur(8px)" });
            gsap.set(storyBlock2Ref.current, { opacity: 0, x: 100, filter: "blur(8px)" });
            gsap.set(stripsWrapperRef.current, { opacity: 0, y: 60 });

            // Header expansion
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
                    end: "+=1500",
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                    pinSpacing: true,
                },
            });

            // Hero lines reveal
            tl.to(heroLine1Ref.current, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.25, ease: "power3.out" }, 0);
            tl.to(heroLine2Ref.current, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.25, ease: "power3.out" }, 0.15);

            // Story blocks
            tl.to(storyBlock1Ref.current, { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.25, ease: "power3.out" }, 0.35);
            tl.to(storyBlock2Ref.current, { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.25, ease: "power3.out" }, 0.50);

            // Strips - reveal right after story blocks
            tl.to(stripsWrapperRef.current, { opacity: 1, y: 0, duration: 0.25, ease: "power3.out" }, 0.70);

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
            className="relative bg-[#050505] overflow-visible"
        >
            {/* Gradient fade from video section above */}
            <div
                className="absolute top-0 left-0 right-0 h-32 pointer-events-none z-10"
                style={{ background: "linear-gradient(to bottom, #050505 0%, transparent 100%)" }}
            />

            {/* Pinned wrapper */}
            <div className="min-h-screen pt-16">
                {/* Large Header Marquee Banner */}
                <div ref={headerWrapperRef} className="py-3 md:py-4 overflow-hidden border-b border-white/5">
                    <div className="about-header-marquee flex whitespace-nowrap" style={{ width: "200%" }}>
                        <span className="text-2xl md:text-4xl lg:text-6xl font-black tracking-tight text-white/90 uppercase">
                            {marqueeText.repeat(6)}
                        </span>
                    </div>
                </div>

                {/* Main Content */}
                <div className="px-6 md:px-12 lg:px-20 xl:px-32 py-8 md:py-12">

                    {/* Hero Statement */}
                    <div className="mb-16 md:mb-24">
                        <div ref={heroLine1Ref}>
                            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extralight text-white tracking-tighter leading-[0.95]">
                                I build things that
                            </h2>
                        </div>
                        <div ref={heroLine2Ref}>
                            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tighter leading-[0.95]">
                                <span className="font-black text-white">live</span>
                                <span className="font-extralight text-white/50"> on the </span>
                                <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-300 to-white/70">internet</span>
                            </h2>
                        </div>
                    </div>

                    {/* Story Section - Two Column */}
                    <div className="grid md:grid-cols-2 gap-8 md:gap-16 mb-16 md:mb-24">
                        <div ref={storyBlock1Ref} className="space-y-4">
                            <p className="text-white/30 text-xs uppercase tracking-[0.3em] font-medium">My Journey</p>
                            <p className="text-lg md:text-xl lg:text-2xl text-white/80 font-light leading-relaxed">
                                Started as a <span className="text-white font-medium">curious teenager</span> tinkering with code,
                                I&apos;ve evolved into a developer who obsesses over every pixel and
                                every millisecond of load time.
                            </p>
                        </div>
                        <div ref={storyBlock2Ref} className="space-y-4">
                            <p className="text-white/30 text-xs uppercase tracking-[0.3em] font-medium">My Approach</p>
                            <p className="text-lg md:text-xl lg:text-2xl text-white/80 font-light leading-relaxed">
                                I believe the best digital experiences are the ones you
                                <span className="text-white font-medium"> don&apos;t notice</span>—they just work,
                                feel natural, and leave you wondering how it was so seamless.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Diagonal Crossing Strips */}
                <div ref={stripsWrapperRef} className="relative h-28 md:h-32">
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
