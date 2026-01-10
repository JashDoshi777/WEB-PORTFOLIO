"use client";

import { useRef, useLayoutEffect, useEffect, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { section } from "framer-motion/client";

// Register GSAP plugins
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface Service {
    icon: React.ReactNode;
    title: string;
    description: string;
    features: string[];
}

interface CardMouseState {
    x: number;
    y: number;
    isHovering: boolean;
}

const services: Service[] = [
    {
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
        ),
        title: "Web Development",
        description: "Building high-performance, scalable web applications with modern technologies and best practices.",
        features: ["React / Next.js", "TypeScript", "Performance Optimization"],
    },
    {
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 19l7-7 3 3-7 7-3-3z" />
                <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                <path d="M2 2l7.586 7.586" />
                <circle cx="11" cy="11" r="2" />
            </svg>
        ),
        title: "UI/UX Design",
        description: "Creating intuitive, beautiful interfaces that delight users and drive engagement.",
        features: ["User Research", "Prototyping", "Design Systems"],
    },
    {
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
        ),
        title: "Motion Design",
        description: "Bringing interfaces to life with smooth, purposeful animations that enhance user experience.",
        features: ["GSAP / Framer Motion", "Scroll Animations", "Micro-interactions"],
    },
    {
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <path d="M8 21h8M12 17v4" />
                <path d="M7 8h.01M12 8h.01M17 8h.01" />
            </svg>
        ),
        title: "Full-Stack Solutions",
        description: "End-to-end development from database architecture to deployment and everything in between.",
        features: ["Node.js / Python", "Database Design", "API Development"],
    },
];

export default function ServicesSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [mounted, setMounted] = useState(false);
    const [cardMouseStates, setCardMouseStates] = useState<CardMouseState[]>(
        services.map(() => ({ x: 0, y: 0, isHovering: false }))
    );

    useEffect(() => {
        setMounted(true);
    }, []);

    // Track mouse position per card for 3D tilt effects
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, cardIndex: number) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
        const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

        setCardMouseStates(prev => {
            const newStates = [...prev];
            newStates[cardIndex] = { x, y, isHovering: true };
            return newStates;
        });
    };

    const handleMouseEnter = (cardIndex: number) => {
        setCardMouseStates(prev => {
            const newStates = [...prev];
            newStates[cardIndex] = { ...newStates[cardIndex], isHovering: true };
            return newStates;
        });
    };

    const handleMouseLeave = (cardIndex: number) => {
        setCardMouseStates(prev => {
            const newStates = [...prev];
            newStates[cardIndex] = { x: 0, y: 0, isHovering: false };
            return newStates;
        });
    };

    useLayoutEffect(() => {
        if (!mounted) return;

        const ctx = gsap.context(() => {
            // Header animation
            gsap.fromTo(
                ".services-label",
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: headerRef.current,
                        start: "top 90%",
                        end: "top 70%",
                        scrub: 1,
                    },
                }
            );

            // Heading words animation
            if (headerRef.current) {
                const words = headerRef.current.querySelectorAll(".word");
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
                            trigger: headerRef.current,
                            start: "top 85%",
                            end: "top 55%",
                            scrub: 1,
                        },
                    }
                );
            }

            // Decorative line animation
            gsap.fromTo(
                ".services-line",
                { scaleX: 0, transformOrigin: "left center" },
                {
                    scaleX: 1,
                    duration: 1.2,
                    ease: "power3.inOut",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        end: "top 50%",
                        scrub: 1,
                    },
                }
            );

            // Horizontal scroll animation with full viewport pinning
            if (cardsRef.current && sectionRef.current) {
                const scrollContainer = cardsRef.current;
                const cards = scrollContainer.querySelectorAll(".service-card") as NodeListOf<HTMLElement>;
                const numCards = cards.length;

                if (numCards > 0) {
                    // Wait for layout to settle
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            // Force layout recalculation
                            scrollContainer.getBoundingClientRect();

                            const viewportWidth = window.innerWidth;
                            const viewportCenter = viewportWidth / 2;

                            // Get card dimensions - measure actual rendered size after layout
                            const cardWidth = cards[0].getBoundingClientRect().width;
                            const gap = viewportWidth >= 768 ? 32 : 24;

                            // Calculate positions: cards are positioned with paddingLeft = 8vw initially
                            const paddingLeft = viewportWidth * 0.08;

                            // First card's center position when at initial position (paddingLeft)
                            const firstCardCenterInitial = paddingLeft + (cardWidth / 2);

                            // Calculate offset needed to center first card initially
                            // We need to shift container left so first card's center aligns with viewport center
                            const initialOffset = firstCardCenterInitial - viewportCenter;

                            // Last card's left edge position
                            const lastCardLeftEdge = paddingLeft + (numCards - 1) * (cardWidth + gap);
                            // Last card's center position when at initial position
                            const lastCardCenterInitial = lastCardLeftEdge + (cardWidth / 2);

                            // Calculate how much we need to scroll to center the last card
                            // Scroll amount = difference between last card center and first card center positions
                            const scrollAmount = lastCardCenterInitial - firstCardCenterInitial;

                            // Each card gets equal time in the scroll sequence
                            const scrollDistancePerCard = Math.max(400, viewportWidth * 0.4);
                            const totalScrollDistance = scrollDistancePerCard * numCards;

                            // Setup initial card states with optimized rendering
                            cards.forEach((card, index) => {
                                // Enable hardware acceleration
                                gsap.set(card, {
                                    willChange: "transform, opacity",
                                    force3D: true,
                                });

                                if (index === 0) {
                                    gsap.set(card, { scale: 1, opacity: 1 });
                                } else {
                                    gsap.set(card, { scale: 0.94, opacity: 0.6 });
                                }
                            });

                            // Set initial position to center first card
                            gsap.set(scrollContainer, {
                                x: -initialOffset,
                                willChange: "transform",
                                force3D: true,
                            });

                            // Main horizontal scroll animation
                            const horizontalScrollTween = gsap.fromTo(
                                scrollContainer,
                                { x: -initialOffset },
                                {
                                    x: -initialOffset - scrollAmount,
                                    ease: "none",
                                    immediateRender: false,
                                    scrollTrigger: {
                                        trigger: sectionRef.current,
                                        start: "top top",
                                        end: () => `+=${totalScrollDistance}`,
                                        pin: true,
                                        pinSpacing: true,
                                        anticipatePin: 1,
                                        invalidateOnRefresh: true,
                                        refreshPriority: -1,
                                        scrub: 1, // Smooth scrubbing with slight delay for better performance
                                        markers: false,
                                        fastScrollEnd: true,
                                        onUpdate: (self) => {
                                            const progress = Math.min(1, Math.max(0, self.progress));

                                            // Update horizontal scroll position (centered)
                                            const currentX = -initialOffset - (progress * scrollAmount);
                                            gsap.set(scrollContainer, { x: currentX });

                                            // Update card states based on progress
                                            // Each card gets 1/numCards of the scroll progress
                                            const cardProgress = progress * numCards;
                                            const activeCardIndex = Math.min(Math.floor(cardProgress), numCards - 1);
                                            const cardLocalProgress = Math.max(0, Math.min(1, cardProgress - activeCardIndex));

                                            // Batch DOM updates for better performance - NO BLUR for performance
                                            cards.forEach((card, index) => {
                                                const distance = Math.abs(index - activeCardIndex);
                                                let scale: number;
                                                let opacity: number;

                                                if (distance === 0 && index === activeCardIndex) {
                                                    const focusProgress = Math.min(1, cardLocalProgress * 2);
                                                    scale = 0.94 + (0.06 * focusProgress);
                                                    opacity = 0.7 + (0.3 * focusProgress);
                                                } else if (distance === 1 && index === activeCardIndex + 1) {
                                                    const nextProgress = Math.max(0, Math.min(1, (cardLocalProgress - 1) * 2));
                                                    scale = 0.94 + (0.06 * nextProgress);
                                                    opacity = 0.7 + (0.3 * nextProgress);
                                                } else if (distance === 1 && index === activeCardIndex - 1) {
                                                    const fadeProgress = 1 - Math.max(0, Math.min(1, (cardLocalProgress + 1) * 2));
                                                    scale = 1 - (0.06 * fadeProgress);
                                                    opacity = 1 - (0.3 * fadeProgress);
                                                } else {
                                                    scale = 0.94;
                                                    opacity = index < activeCardIndex ? 0.5 : 0.6;
                                                }

                                                if (progress >= 0.99 && index === numCards - 1) {
                                                    scale = 1;
                                                    opacity = 1;
                                                }

                                                gsap.set(card, { scale, opacity });
                                            });
                                        },
                                        onLeave: () => {
                                            gsap.set(cards[numCards - 1], { scale: 1, opacity: 1 });
                                            gsap.set(scrollContainer, { x: -initialOffset - scrollAmount });
                                        },
                                        onEnterBack: () => {
                                            // Reset to first card centered when scrolling back up
                                            gsap.set(cards[0], { scale: 1, opacity: 1 });
                                            for (let i = 1; i < numCards; i++) {
                                                gsap.set(cards[i], { scale: 0.94, opacity: 0.6 });
                                            }
                                            gsap.set(scrollContainer, { x: -initialOffset });
                                        },
                                        onRefresh: (self) => {
                                            // Ensure proper state after refresh
                                            const progress = self.progress || 0;
                                            if (progress === 0) {
                                                gsap.set(cards[0], { scale: 1, opacity: 1 });
                                                gsap.set(scrollContainer, { x: -initialOffset });
                                            } else if (progress >= 0.99) {
                                                gsap.set(cards[numCards - 1], { scale: 1, opacity: 1 });
                                                gsap.set(scrollContainer, { x: -initialOffset - scrollAmount });
                                            }
                                        },
                                    },
                                }
                            );

                            // Handle window resize - debounce to prevent excessive refreshes
                            let resizeTimeout: NodeJS.Timeout;
                            const handleResize = () => {
                                clearTimeout(resizeTimeout);
                                resizeTimeout = setTimeout(() => {
                                    ScrollTrigger.refresh();
                                }, 300);
                            };

                            window.addEventListener("resize", handleResize);

                            // Store cleanup function
                            (sectionRef.current as any)._scrollCleanup = () => {
                                window.removeEventListener("resize", handleResize);
                                cards.forEach(card => {
                                    gsap.set(card, { clearProps: "willChange" });
                                });
                                gsap.set(scrollContainer, { clearProps: "willChange" });
                                ScrollTrigger.getAll().forEach(trigger => {
                                    if (trigger.vars.trigger === sectionRef.current) {
                                        trigger.kill();
                                    }
                                });
                            };
                        });
                    });
                }
            }
        }, sectionRef);

        return () => {
            ctx.revert();
            // Clean up any resize listeners
            if (sectionRef.current && (sectionRef.current as any)._scrollCleanup) {
                (sectionRef.current as any)._scrollCleanup();
            }
        };
    }, [mounted]);

    const headingText = "What I";
    const headingText2 = "Bring to the Table";

    return (
        <section
            id="services"
            ref={sectionRef}
            className="relative bg-[#050505] overflow-visible"
            style={{ perspective: "1000px", minHeight: "100vh" }}
        >
            {/* Full-screen dark overlay to hide other sections */}
            <div className="absolute inset-0 bg-[#050505] z-0" />

            {/* Background gradient orb */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] md:w-[1200px] h-[800px] md:h-[1200px] pointer-events-none z-1">
                <div className="absolute inset-0 bg-gradient-radial from-blue-500/8 via-purple-500/5 to-transparent blur-3xl animate-pulse" />
            </div>

            {/* Main content - flexbox with top alignment for proper pinning */}
            <div className="relative z-10 h-screen flex flex-col pt-12 md:pt-16">
                {/* Header */}
                <div ref={headerRef} className="text-center mb-4 md:mb-6 px-4 flex-shrink-0">
                    <p className="services-label text-xs md:text-sm font-medium text-white/40 uppercase tracking-widest mb-2 md:mb-3">
                        Services
                    </p>
                    <div className="services-line h-px w-16 md:w-24 bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto mb-3 md:mb-4" />
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-white/90 tracking-tight leading-tight" style={{ perspective: "1000px" }}>
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

                {/* Services Horizontal Scroll Container */}
                <div
                    ref={cardsRef}
                    className="flex gap-6 md:gap-8 items-start py-6 md:py-8 flex-1"
                    style={{
                        paddingLeft: "8vw",
                        paddingRight: "8vw",
                        overflow: "visible",
                        willChange: "transform",
                    }}
                >
                    {services.map((service, index) => {
                        const mouseState = cardMouseStates[index];
                        return (
                            <motion.div
                                key={service.title}
                                ref={(el) => { cardRefs.current[index] = el; }}
                                className="service-card group relative p-5 md:p-6 bg-white/[0.02] backdrop-blur-sm border border-white/5 rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer flex-shrink-0 w-[80vw] sm:w-[60vw] md:w-[320px] lg:w-[350px] h-auto"
                                onMouseMove={(e) => handleMouseMove(e, index)}
                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={() => handleMouseLeave(index)}
                                style={{
                                    transformStyle: "preserve-3d",
                                    transform: mouseState.isHovering
                                        ? `perspective(1000px) rotateX(${-mouseState.y * 10}deg) rotateY(${mouseState.x * 10}deg) translateZ(20px)`
                                        : "perspective(1000px) rotateX(0) rotateY(0) translateZ(0)",
                                    transition: mouseState.isHovering
                                        ? "transform 0.1s ease-out"
                                        : "transform 0.5s ease-out",
                                }}
                            >
                                <div className="card-content relative z-10">
                                    {/* Icon */}
                                    <div className="relative w-12 h-12 md:w-14 md:h-14 mb-4 md:mb-5">
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-xl" />
                                        <div className="absolute inset-0 flex items-center justify-center text-white/70 group-hover:text-white transition-colors duration-300">
                                            {service.icon}
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl md:text-2xl font-medium text-white/90 mb-2 md:mb-3 group-hover:text-white transition-colors duration-300">
                                        {service.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-sm md:text-base text-white/50 leading-relaxed mb-4 md:mb-5 group-hover:text-white/70 transition-colors duration-300">
                                        {service.description}
                                    </p>

                                    {/* Features */}
                                    <div className="flex flex-wrap gap-2">
                                        {service.features.map((feature) => (
                                            <span
                                                key={feature}
                                                className="px-3 py-1.5 text-xs bg-white/5 text-white/50 rounded-full border border-white/10 group-hover:bg-white/10 group-hover:text-white/80 group-hover:border-white/20 transition-all duration-300"
                                            >
                                                {feature}
                                            </span>
                                        ))}
                                    </div>

                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Scroll indicator */}
                <div className="flex justify-center mt-8 md:mt-12 pb-8">
                    <div className="flex items-center gap-3 text-white/30">
                        <motion.div
                            animate={{ x: [0, 10, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
