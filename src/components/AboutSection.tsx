"use client";

import { useRef, useLayoutEffect, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const paragraphsRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const badgeRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);

    // Set mounted after hydration
    useEffect(() => {
        setMounted(true);
    }, []);

    useLayoutEffect(() => {
        if (!mounted) return;

        const isMobile = window.innerWidth < 768;

        const ctx = gsap.context(() => {
            // Main timeline for image/visual side
            gsap.fromTo(
                imageRef.current,
                {
                    opacity: 0,
                    y: isMobile ? 40 : 0,
                    x: isMobile ? 0 : -60,
                    scale: 0.95,
                },
                {
                    opacity: 1,
                    y: 0,
                    x: 0,
                    scale: 1,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 85%",
                        end: "top 40%",
                        scrub: 1,
                    },
                }
            );

            // Floating badge animation
            gsap.fromTo(
                badgeRef.current,
                {
                    opacity: 0,
                    y: 30,
                    scale: 0.8,
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                        end: "top 30%",
                        scrub: 1,
                    },
                }
            );

            // Section label animation
            gsap.fromTo(
                ".about-label",
                {
                    opacity: 0,
                    y: 20,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: contentRef.current,
                        start: "top 90%",
                        end: "top 70%",
                        scrub: 1,
                    },
                }
            );

            // Heading animation
            if (headingRef.current) {
                const words = headingRef.current.querySelectorAll(".word");
                gsap.fromTo(
                    words,
                    {
                        opacity: 0,
                        y: 30,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        stagger: 0.05,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: headingRef.current,
                            start: "top 85%",
                            end: "top 50%",
                            scrub: 1,
                        },
                    }
                );
            }

            // Paragraphs reveal with stagger
            if (paragraphsRef.current) {
                const paragraphs = paragraphsRef.current.querySelectorAll("p");
                gsap.fromTo(
                    paragraphs,
                    {
                        opacity: 0,
                        y: 25,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        stagger: 0.15,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: paragraphsRef.current,
                            start: "top 85%",
                            end: "top 45%",
                            scrub: 1,
                        },
                    }
                );
            }

            // Stats counter animation
            if (statsRef.current) {
                const statItems = statsRef.current.querySelectorAll(".stat-item");
                gsap.fromTo(
                    statItems,
                    {
                        opacity: 0,
                        y: 30,
                        scale: 0.9,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: "back.out(1.5)",
                        scrollTrigger: {
                            trigger: statsRef.current,
                            start: "top 90%",
                            end: "top 60%",
                            scrub: 1,
                        },
                    }
                );

                // Animate the border line
                gsap.fromTo(
                    ".stats-border",
                    {
                        scaleX: 0,
                        transformOrigin: "left center",
                    },
                    {
                        scaleX: 1,
                        duration: 1.2,
                        ease: "power3.inOut",
                        scrollTrigger: {
                            trigger: statsRef.current,
                            start: "top 95%",
                            end: "top 70%",
                            scrub: 1,
                        },
                    }
                );
            }

            // Glowing orb animation (desktop only)
            if (!isMobile) {
                gsap.to(".glow-orb", {
                    scale: 1.3,
                    opacity: 0.4,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true,
                    },
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, [mounted]);

    // Split heading text into words for animation
    const headingText = "Crafting digital experiences that";
    const headingText2 = "leave an impression";

    return (
        <section
            id="about"
            ref={sectionRef}
            className="relative py-16 md:py-32 px-4 md:px-6 lg:px-8 bg-[#050505] overflow-hidden"
        >
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-center">
                    {/* Image/Visual */}
                    <div ref={imageRef} className="relative order-2 lg:order-1">
                        <div className="aspect-[4/5] md:aspect-[4/5] rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 overflow-hidden">
                            {/* Abstract visual placeholder */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="relative">
                                    <div className="glow-orb w-32 md:w-48 h-32 md:h-48 rounded-full bg-gradient-to-tr from-blue-500/20 to-purple-500/20 blur-3xl" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-5xl md:text-7xl font-light text-white/20">J</span>
                                    </div>
                                </div>
                            </div>
                            {/* Decorative grid */}
                            <div className="absolute inset-0 opacity-30">
                                <div
                                    className="h-full w-full"
                                    style={{
                                        backgroundImage:
                                            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
                                        backgroundSize: "30px 30px",
                                    }}
                                />
                            </div>
                        </div>
                        {/* Floating badge */}
                        <div
                            ref={badgeRef}
                            className="absolute -bottom-4 -right-2 md:-bottom-6 md:-right-6 px-4 md:px-6 py-3 md:py-4 bg-[#0a0a0a] border border-white/10 rounded-xl md:rounded-2xl backdrop-blur-sm"
                        >
                            <p className="text-xs md:text-sm text-white/50">Experience</p>
                            <p className="text-xl md:text-2xl font-semibold text-white/90">3+ Years</p>
                        </div>
                    </div>

                    {/* Content */}
                    <div ref={contentRef} className="order-1 lg:order-2">
                        <p className="about-label text-xs md:text-sm font-medium text-white/40 uppercase tracking-widest mb-3 md:mb-4">
                            About Me
                        </p>
                        <h2
                            ref={headingRef}
                            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white/90 tracking-tight leading-tight mb-6 md:mb-8"
                        >
                            {headingText.split(" ").map((word, i) => (
                                <span
                                    key={i}
                                    className="word inline-block mr-[0.25em]"
                                >
                                    {word}
                                </span>
                            ))}{" "}
                            <span className="text-white/50">
                                {headingText2.split(" ").map((word, i) => (
                                    <span
                                        key={i}
                                        className="word inline-block mr-[0.25em]"
                                    >
                                        {word}
                                    </span>
                                ))}
                            </span>
                        </h2>
                        <div
                            ref={paragraphsRef}
                            className="space-y-4 md:space-y-6 text-sm md:text-lg text-white/60 leading-relaxed"
                        >
                            <p>
                                I&apos;m a creative developer passionate about building immersive web
                                experiences that blend beautiful design with cutting-edge technology.
                            </p>
                            <p>
                                With a focus on motion, performance, and attention to detail, I transform
                                ideas into memorable digital products. My work spans from interactive
                                websites to complex web applications, always with a focus on user experience.
                            </p>
                            <p className="hidden md:block">
                                When I&apos;m not coding, you&apos;ll find me exploring new design trends,
                                experimenting with creative coding, or contributing to open-source projects.
                            </p>
                        </div>

                        {/* Stats */}
                        <div ref={statsRef} className="mt-8 md:mt-12 pt-6 md:pt-12 relative">
                            <div className="stats-border absolute top-0 left-0 right-0 h-px bg-white/10" />
                            <div className="grid grid-cols-3 gap-4 md:gap-8">
                                {[
                                    { number: "50+", label: "Projects" },
                                    { number: "30+", label: "Clients" },
                                    { number: "3+", label: "Years" },
                                ].map((stat) => (
                                    <div key={stat.label} className="stat-item text-center md:text-left">
                                        <p className="text-2xl md:text-3xl font-semibold text-white/90">
                                            {stat.number}
                                        </p>
                                        <p className="text-xs md:text-sm text-white/40 mt-1">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
