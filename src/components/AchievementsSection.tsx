"use client";

import { useRef, useLayoutEffect, useEffect, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface Achievement {
    number: number;
    suffix: string;
    label: string;
    description: string;
}

interface Award {
    icon: React.ReactNode;
    title: string;
    organization: string;
    year: string;
}

const achievements: Achievement[] = [
    { number: 50, suffix: "+", label: "Projects Delivered", description: "Across various industries" },
    { number: 30, suffix: "+", label: "Happy Clients", description: "Worldwide satisfaction" },
    { number: 15, suffix: "+", label: "Awards Won", description: "Design & development" },
    { number: 99, suffix: "%", label: "Client Retention", description: "Long-term partnerships" },
];

const awards: Award[] = [
    {
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 15l-2 5-1.5-3.5L5 15l3.5-1.5L10 10l2 5zM19 6l-1.5 3.5L14 11l3.5 1.5L19 16l1.5-3.5L24 11l-3.5-1.5L19 6z" />
                <path d="M9 2l-1 2.5L5.5 5.5 8 6.5l1 2.5 1-2.5 2.5-1-2.5-1L9 2z" />
            </svg>
        ),
        title: "Best Web Design",
        organization: "Awwwards",
        year: "2024",
    },
    {
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="8" r="6" />
                <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
            </svg>
        ),
        title: "Site of the Day",
        organization: "CSS Design Awards",
        year: "2024",
    },
    {
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 9H4.5a2.5 2.5 0 010-5C6 4 6 9 6 9zm12 0h1.5a2.5 2.5 0 000-5C18 4 18 9 18 9z" />
                <path d="M4 22h16M10 14.66V17c0 1.1-.9 2-2 2H6M14 14.66V17c0 1.1.9 2 2 2h2" />
                <path d="M18 9a6 6 0 01-12 0V6a2 2 0 012-2h8a2 2 0 012 2v3z" />
            </svg>
        ),
        title: "Developer Award",
        organization: "FWA",
        year: "2023",
    },
    {
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
        ),
        title: "Excellence in UX",
        organization: "UX Awards",
        year: "2023",
    },
];

// Animated counter component
function AnimatedCounter({ target, suffix, isInView }: { target: number; suffix: string; isInView: boolean }) {
    const [count, setCount] = useState(0);
    const countRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (!isInView) return;

        let startTime: number;
        const duration = 2000; // 2 seconds

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentCount = Math.floor(easeOutQuart * target);

            setCount(currentCount);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [isInView, target]);

    return (
        <span ref={countRef}>
            {count}
            {suffix}
        </span>
    );
}

export default function AchievementsSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const awardsRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);

    const isInView = useInView(statsRef, { once: true, margin: "-100px" });

    useEffect(() => {
        setMounted(true);
    }, []);

    // 3D tilt effect for award cards
    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        const tiltX = (y - 0.5) * 10;
        const tiltY = (x - 0.5) * -10;

        card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
    }, []);

    const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        e.currentTarget.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    }, []);

    useLayoutEffect(() => {
        if (!mounted) return;

        const isMobile = window.innerWidth < 768;

        const ctx = gsap.context(() => {
            // Header animation
            gsap.fromTo(
                ".achievements-label",
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 90%",
                        end: "top 70%",
                        scrub: 1,
                    },
                }
            );

            // Heading words animation
            const words = document.querySelectorAll(".achievements-heading .word");
            gsap.fromTo(
                words,
                { opacity: 0, y: 40, rotateX: -15 },
                {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    duration: 1,
                    stagger: 0.08,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 85%",
                        end: "top 55%",
                        scrub: 1,
                    },
                }
            );

            // Stats cards animation
            const statCards = gsap.utils.toArray<HTMLElement>(".stat-card");
            statCards.forEach((card, index) => {
                gsap.fromTo(
                    card,
                    {
                        opacity: 0,
                        y: 50,
                        scale: 0.9,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.8,
                        ease: "back.out(1.5)",
                        scrollTrigger: {
                            trigger: statsRef.current,
                            start: `top ${85 - index * 5}%`,
                            end: `top ${60 - index * 5}%`,
                            scrub: 1,
                        },
                    }
                );
            });

            // Divider line animation
            gsap.fromTo(
                ".achievements-divider",
                { scaleX: 0, transformOrigin: "center center" },
                {
                    scaleX: 1,
                    duration: 1.2,
                    ease: "power3.inOut",
                    scrollTrigger: {
                        trigger: awardsRef.current,
                        start: "top 95%",
                        end: "top 75%",
                        scrub: 1,
                    },
                }
            );

            // Awards section header
            gsap.fromTo(
                ".awards-header",
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: awardsRef.current,
                        start: "top 85%",
                        end: "top 65%",
                        scrub: 1,
                    },
                }
            );

            // Award cards staggered animation
            const awardCards = gsap.utils.toArray<HTMLElement>(".award-card");
            awardCards.forEach((card, index) => {
                gsap.fromTo(
                    card,
                    {
                        opacity: 0,
                        y: 40,
                        rotateY: -5,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        rotateY: 0,
                        duration: 0.8,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: awardsRef.current,
                            start: `top ${80 - index * 5}%`,
                            end: `top ${55 - index * 5}%`,
                            scrub: 1,
                        },
                    }
                );
            });

            // Background orb parallax
            if (!isMobile) {
                gsap.to(".achievements-orb", {
                    y: -100,
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

    const headingText = "Recognition &";
    const headingText2 = "Achievements";

    return (
        <section
            id="achievements"
            ref={sectionRef}
            className="relative py-16 md:py-32 px-4 md:px-6 lg:px-8 bg-[#050505] overflow-hidden"
        >
            {/* Background orb */}
            <div className="achievements-orb absolute top-1/4 right-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] pointer-events-none opacity-50">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/5 to-transparent rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-12 md:mb-20">
                    <p className="achievements-label text-xs md:text-sm font-medium text-white/40 uppercase tracking-widest mb-3 md:mb-4">
                        Milestones
                    </p>
                    <h2 className="achievements-heading text-3xl md:text-4xl lg:text-5xl font-light text-white/90 tracking-tight leading-tight" style={{ perspective: "1000px" }}>
                        {headingText.split(" ").map((word, i) => (
                            <span key={i} className="word inline-block mr-[0.25em]" style={{ transformStyle: "preserve-3d" }}>
                                {word}
                            </span>
                        ))}{" "}
                        <span className="text-white/50">
                            {headingText2.split(" ").map((word, i) => (
                                <span key={i} className="word inline-block mr-[0.25em]" style={{ transformStyle: "preserve-3d" }}>
                                    {word}
                                </span>
                            ))}
                        </span>
                    </h2>
                </div>

                {/* Stats Grid */}
                <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16 md:mb-24">
                    {achievements.map((achievement) => (
                        <motion.div
                            key={achievement.label}
                            className="stat-card group relative p-5 md:p-8 bg-white/[0.02] border border-white/5 rounded-xl md:rounded-2xl text-center overflow-hidden"
                            whileHover={{
                                scale: 1.03,
                                borderColor: "rgba(255,255,255,0.15)",
                                transition: { duration: 0.3 },
                            }}
                        >
                            {/* Hover glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10">
                                {/* Number */}
                                <p className="text-3xl md:text-5xl lg:text-6xl font-bold text-white/90 mb-2 md:mb-3 tabular-nums">
                                    <AnimatedCounter target={achievement.number} suffix={achievement.suffix} isInView={isInView} />
                                </p>

                                {/* Label */}
                                <p className="text-sm md:text-base text-white/70 font-medium mb-1">
                                    {achievement.label}
                                </p>

                                {/* Description */}
                                <p className="text-xs md:text-sm text-white/40 hidden md:block">
                                    {achievement.description}
                                </p>
                            </div>

                            {/* Decorative corner */}
                            <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </motion.div>
                    ))}
                </div>

                {/* Divider */}
                <div className="achievements-divider h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-16 md:mb-24" />

                {/* Awards Section */}
                <div ref={awardsRef}>
                    <p className="awards-header text-xs md:text-sm font-medium text-white/40 uppercase tracking-widest mb-8 md:mb-12 text-center">
                        Awards & Recognition
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {awards.map((award) => (
                            <div
                                key={award.title}
                                className="award-card group relative p-5 md:p-6 bg-white/[0.02] border border-white/5 rounded-xl md:rounded-2xl overflow-hidden cursor-pointer transition-all duration-300"
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
                                style={{
                                    transformStyle: "preserve-3d",
                                    transition: "transform 0.15s ease-out",
                                }}
                            >
                                {/* Shimmer effect */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    style={{
                                        background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.05) 50%, transparent 60%)",
                                        backgroundSize: "200% 100%",
                                        animation: "shimmer 1.5s infinite",
                                    }}
                                />

                                <div className="relative z-10">
                                    {/* Icon */}
                                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center mb-4 text-white/60 group-hover:text-white/90 transition-colors duration-300">
                                        {award.icon}
                                    </div>

                                    {/* Title */}
                                    <h4 className="text-base md:text-lg font-medium text-white/90 mb-1 group-hover:text-white transition-colors duration-300">
                                        {award.title}
                                    </h4>

                                    {/* Organization */}
                                    <p className="text-sm text-white/50 mb-2 group-hover:text-white/60 transition-colors duration-300">
                                        {award.organization}
                                    </p>

                                    {/* Year badge */}
                                    <span className="inline-block px-2 py-0.5 text-xs bg-white/5 text-white/40 rounded-md border border-white/10 group-hover:border-white/20 group-hover:text-white/60 transition-all duration-300">
                                        {award.year}
                                    </span>
                                </div>

                                {/* Glow on hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Add shimmer keyframes */}
            <style jsx>{`
                @keyframes shimmer {
                    0% {
                        background-position: 200% 0;
                    }
                    100% {
                        background-position: -200% 0;
                    }
                }
            `}</style>
        </section>
    );
}
