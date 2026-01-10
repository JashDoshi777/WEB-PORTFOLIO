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
                            const scrollDistancePerCard = Math.max(1200, viewportWidth * 1.0);
                            const totalScrollDistance = scrollDistancePerCard * numCards;

                            // Setup initial card states with optimized rendering
                            cards.forEach((card, index) => {
                                // Enable hardware acceleration
                                gsap.set(card, { 
                                    willChange: "transform, opacity, filter",
                                    force3D: true,
                                });
                                
                                if (index === 0) {
                                    gsap.set(card, { scale: 1, opacity: 1, filter: "blur(0px)" });
                                } else {
                                    gsap.set(card, { scale: 0.88, opacity: 0.5, filter: "blur(3px)" });
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
                                            
                                            // Batch DOM updates for better performance
                                            cards.forEach((card, index) => {
                                                const distance = Math.abs(index - activeCardIndex);
                                                
                                                let scale: number;
                                                let opacity: number;
                                                let blur: number;
                                                
                                                if (distance === 0 && index === activeCardIndex) {
                                                    // Active card - transitioning into focus
                                                    const focusProgress = Math.min(1, cardLocalProgress * 2);
                                                    scale = 0.88 + (0.12 * focusProgress);
                                                    opacity = 0.5 + (0.5 * focusProgress);
                                                    blur = 3 - (3 * focusProgress);
                                                } else if (distance === 1 && index === activeCardIndex + 1) {
                                                    // Next card - coming into view
                                                    const nextProgress = Math.max(0, Math.min(1, (cardLocalProgress - 1) * 2));
                                                    scale = 0.88 + (0.12 * nextProgress);
                                                    opacity = 0.5 + (0.5 * nextProgress);
                                                    blur = 3 - (3 * nextProgress);
                                                } else if (distance === 1 && index === activeCardIndex - 1) {
                                                    // Previous card - fading out
                                                    const fadeProgress = 1 - Math.max(0, Math.min(1, (cardLocalProgress + 1) * 2));
                                                    scale = 1 - (0.12 * fadeProgress);
                                                    opacity = 1 - (0.6 * fadeProgress);
                                                    blur = 0 + (3 * fadeProgress);
                                                } else {
                                                    // Cards further away - keep dimmed
                                                    scale = 0.88;
                                                    opacity = index < activeCardIndex ? 0.3 : 0.4;
                                                    blur = 3;
                                                }
                                                
                                                // Ensure last card is fully visible at end
                                                if (progress >= 0.99 && index === numCards - 1) {
                                                    scale = 1;
                                                    opacity = 1;
                                                    blur = 0;
                                                }
                                                
                                                // Update card with batched properties
                                                gsap.set(card, { 
                                                    scale, 
                                                    opacity, 
                                                    filter: `blur(${blur}px)`,
                                                });
                                            });
                                        },
                                        onLeave: () => {
                                            // Ensure last card is fully visible and centered when leaving section
                                            gsap.set(cards[numCards - 1], { scale: 1, opacity: 1, filter: "blur(0px)" });
                                            gsap.set(scrollContainer, { x: -initialOffset - scrollAmount });
                                        },
                                        onEnterBack: () => {
                                            // Reset to first card centered when scrolling back up
                                            gsap.set(cards[0], { scale: 1, opacity: 1, filter: "blur(0px)" });
                                            for (let i = 1; i < numCards; i++) {
                                                gsap.set(cards[i], { scale: 0.88, opacity: 0.5, filter: "blur(3px)" });
                                            }
                                            gsap.set(scrollContainer, { x: -initialOffset });
                                        },
                                        onRefresh: function(this: ScrollTrigger) {
                                            // Ensure proper state after refresh
                                            const progress = this.progress || 0;
                                            if (progress === 0) {
                                                gsap.set(cards[0], { scale: 1, opacity: 1, filter: "blur(0px)" });
                                                gsap.set(scrollContainer, { x: -initialOffset });
                                            } else if (progress >= 0.99) {
                                                gsap.set(cards[numCards - 1], { scale: 1, opacity: 1, filter: "blur(0px)" });
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
            className="relative bg-[#050505] overflow-hidden"
            style={{ perspective: "1000px", minHeight: "100vh" }}
        >
            {/* Full-screen dark overlay to hide other sections */}
            <div className="absolute inset-0 bg-[#050505] z-0" />

            {/* Background gradient orb */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] md:w-[1200px] h-[800px] md:h-[1200px] pointer-events-none z-1">
                <div className="absolute inset-0 bg-gradient-radial from-blue-500/8 via-purple-500/5 to-transparent blur-3xl animate-pulse" />
            </div>

            {/* Main content - flexbox centered vertically */}
            <div className="relative z-10 min-h-screen flex flex-col justify-center py-20 md:py-24">
                {/* Header */}
                <div ref={headerRef} className="text-center mb-6 md:mb-10 px-4">
                    <p className="services-label text-xs md:text-sm font-medium text-white/40 uppercase tracking-widest mb-3 md:mb-4">
                        Services
                    </p>
                    <div className="services-line h-px w-16 md:w-24 bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto mb-4 md:mb-6" />
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white/90 tracking-tight leading-tight" style={{ perspective: "1000px" }}>
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
                    className="flex gap-6 md:gap-8 items-center py-12 md:py-16"
                    style={{ 
                        paddingLeft: "8vw", 
                        paddingRight: "8vw",
                        minHeight: "auto",
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
                                className="service-card group relative p-6 md:p-8 bg-white/[0.02] backdrop-blur-sm border border-white/5 rounded-2xl md:rounded-3xl overflow-hidden cursor-none flex-shrink-0 w-[80vw] sm:w-[60vw] md:w-[350px] lg:w-[380px] max-h-none"
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
                                {/* Custom cursor follower */}
                                {mouseState.isHovering && (
                                    <motion.div
                                        className="absolute w-40 h-40 rounded-full pointer-events-none z-0"
                                        style={{
                                            background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)",
                                            left: `${(mouseState.x + 1) * 50}%`,
                                            top: `${(mouseState.y + 1) * 50}%`,
                                            transform: "translate(-50%, -50%)",
                                        }}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ duration: 0.2 }}
                                    />
                                )}

                                {/* Animated gradient border */}
                                <div
                                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                    style={{
                                        background: "linear-gradient(135deg, rgba(139,92,246,0.3) 0%, rgba(59,130,246,0.2) 50%, rgba(236,72,153,0.3) 100%)",
                                        padding: "1px",
                                        mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                                        maskComposite: "exclude",
                                        WebkitMaskComposite: "xor",
                                    }}
                                />

                                {/* Glow effect on hover */}
                                <motion.div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                    style={{
                                        background: `radial-gradient(800px circle at ${(mouseState.x + 1) * 50}% ${(mouseState.y + 1) * 50}%, rgba(139,92,246,0.06), transparent 50%)`,
                                    }}
                                />

                                <div className="card-content relative z-10">
                                    {/* Icon with enhanced glow */}
                                    <div className="relative w-16 h-16 md:w-20 md:h-20 mb-6 md:mb-8">
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl" />
                                        <motion.div
                                            className="absolute inset-0 flex items-center justify-center text-white/70 group-hover:text-white transition-colors duration-300"
                                            animate={mouseState.isHovering ? { scale: 1.1 } : { scale: 1 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {service.icon}
                                        </motion.div>
                                        {/* Animated glow ring */}
                                        <motion.div
                                            className="absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-100"
                                            style={{
                                                background: "conic-gradient(from 0deg, rgba(139,92,246,0.4), rgba(59,130,246,0.4), rgba(236,72,153,0.4), rgba(139,92,246,0.4))",
                                                filter: "blur(8px)",
                                            }}
                                            animate={{
                                                rotate: [0, 360],
                                            }}
                                            transition={{
                                                duration: 4,
                                                repeat: Infinity,
                                                ease: "linear",
                                            }}
                                        />
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-2xl md:text-3xl font-medium text-white/90 mb-4 md:mb-5 group-hover:text-white transition-colors duration-300">
                                        {service.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-base md:text-lg text-white/50 leading-relaxed mb-6 md:mb-8 group-hover:text-white/70 transition-colors duration-300">
                                        {service.description}
                                    </p>

                                    {/* Features */}
                                    <div className="flex flex-wrap gap-2 md:gap-3">
                                        {service.features.map((feature, featureIndex) => (
                                            <motion.span
                                                key={feature}
                                                className="px-4 md:px-5 py-2 md:py-2.5 text-xs md:text-sm bg-white/5 text-white/50 rounded-full border border-white/10 group-hover:bg-white/10 group-hover:text-white/80 group-hover:border-white/20 transition-all duration-300"
                                                whileHover={{ scale: 1.05, y: -2 }}
                                            >
                                                {feature}
                                            </motion.span>
                                        ))}
                                    </div>

                                    {/* Arrow indicator */}
                                    <motion.div
                                        className="absolute top-8 md:top-10 right-8 md:right-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        whileHover={{ scale: 1.2, rotate: 45 }}
                                    >
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/60">
                                            <path d="M7 17L17 7M17 7H7M17 7V17" />
                                        </svg>
                                    </motion.div>
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
                        <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
