"use client";

import { useRef, useLayoutEffect, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface TimelineItem {
    type: "education" | "experience";
    title: string;
    organization: string;
    period: string;
    description: string;
    skills?: string[];
}

const timelineData: TimelineItem[] = [
    {
        type: "experience",
        title: "Senior Frontend Developer",
        organization: "Tech Innovators Inc.",
        period: "2023 - Present",
        description:
            "Leading the frontend development team, architecting scalable solutions, and implementing cutting-edge web technologies for enterprise clients.",
        skills: ["React", "Next.js", "TypeScript", "GSAP"],
    },
    {
        type: "education",
        title: "Master's in Computer Science",
        organization: "Stanford University",
        period: "2021 - 2023",
        description:
            "Specialized in Human-Computer Interaction and Web Technologies. Thesis focused on immersive web experiences and motion design.",
    },
    {
        type: "experience",
        title: "Frontend Developer",
        organization: "Digital Agency Co.",
        period: "2020 - 2023",
        description:
            "Built responsive and interactive web applications for diverse clients. Specialized in animation and performance optimization.",
        skills: ["JavaScript", "Vue.js", "CSS3", "Three.js"],
    },
    {
        type: "education",
        title: "Bachelor's in Software Engineering",
        organization: "MIT",
        period: "2016 - 2020",
        description:
            "Strong foundation in computer science fundamentals, algorithms, and software development methodologies.",
    },
    {
        type: "experience",
        title: "Junior Web Developer",
        organization: "StartUp Hub",
        period: "2019 - 2020",
        description:
            "Started my professional journey building websites and learning modern development practices in a fast-paced startup environment.",
        skills: ["HTML5", "CSS3", "JavaScript", "React"],
    },
];

export default function TimelineSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);
    const progressLineRef = useRef<HTMLDivElement>(null);
    const curvePathRef = useRef<SVGPathElement>(null);
    const [pathLength, setPathLength] = useState(0);
    const [mounted, setMounted] = useState(false);

    // Set mounted state after hydration
    useEffect(() => {
        setMounted(true);
    }, []);

    // Calculate path length on mount
    useEffect(() => {
        if (curvePathRef.current) {
            setPathLength(curvePathRef.current.getTotalLength());
        }
    }, [mounted]);

    useLayoutEffect(() => {
        if (!mounted) return;

        const isMobile = window.innerWidth < 768;

        const ctx = gsap.context(() => {
            // Animate the section header
            gsap.fromTo(
                ".timeline-header",
                {
                    opacity: 0,
                    y: 40,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 85%",
                        end: "top 60%",
                        scrub: 1,
                    },
                }
            );

            // Animate the straight progress line
            gsap.fromTo(
                progressLineRef.current,
                {
                    scaleY: 0,
                    transformOrigin: "top center",
                },
                {
                    scaleY: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: timelineRef.current,
                        start: "top 80%",
                        end: "bottom 20%",
                        scrub: 0.5,
                    },
                }
            );

            // Animate the curved background strip (only on desktop)
            if (pathLength > 0 && !isMobile) {
                gsap.fromTo(
                    curvePathRef.current,
                    {
                        strokeDashoffset: pathLength,
                    },
                    {
                        strokeDashoffset: 0,
                        ease: "none",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top 80%",
                            end: "bottom 20%",
                            scrub: 0.5,
                        },
                    }
                );
            }

            // Animate timeline items
            const items = gsap.utils.toArray<HTMLElement>(".timeline-item");
            items.forEach((item) => {
                // Card animation
                gsap.fromTo(
                    item.querySelector(".timeline-card"),
                    {
                        opacity: 0,
                        y: 40,
                        scale: 0.95,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: item,
                            start: "top 90%",
                            end: "top 60%",
                            scrub: 1,
                        },
                    }
                );

                // Dot animation
                gsap.fromTo(
                    item.querySelector(".timeline-dot"),
                    {
                        scale: 0,
                        opacity: 0,
                    },
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 0.5,
                        ease: "back.out(2)",
                        scrollTrigger: {
                            trigger: item,
                            start: "top 85%",
                            end: "top 65%",
                            scrub: 1,
                        },
                    }
                );

                // Content stagger animation
                gsap.fromTo(
                    item.querySelectorAll(".timeline-content > *"),
                    {
                        opacity: 0,
                        y: 15,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        stagger: 0.08,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: item,
                            start: "top 80%",
                            end: "top 50%",
                            scrub: 1,
                        },
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [pathLength, mounted]);

    return (
        <section
            id="timeline"
            ref={sectionRef}
            className="relative py-16 md:py-32 px-4 md:px-6 lg:px-8 bg-[#050505] overflow-hidden"
        >
            {/* Background Curved Grey Strip - Hidden on mobile via CSS */}
            <svg
                className="absolute inset-0 w-full h-full pointer-events-none hidden md:block"
                viewBox="0 0 1440 1800"
                preserveAspectRatio="xMidYMid slice"
                style={{ opacity: 0.8 }}
            >
                <path
                    ref={curvePathRef}
                    d="M -100 0 
                       Q 200 200, 400 300 
                       T 800 500 
                       T 1200 700 
                       T 600 1000 
                       T 200 1200 
                       T 800 1400 
                       T 1540 1800"
                    fill="none"
                    stroke="url(#greyStripGradient)"
                    strokeWidth="40"
                    strokeLinecap="round"
                    strokeDasharray={pathLength || 3000}
                    strokeDashoffset={pathLength || 3000}
                />
                <defs>
                    <linearGradient id="greyStripGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgba(100,100,100,0.25)" />
                        <stop offset="50%" stopColor="rgba(150,150,150,0.35)" />
                        <stop offset="100%" stopColor="rgba(100,100,100,0.25)" />
                    </linearGradient>
                </defs>
            </svg>

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="timeline-header text-center mb-12 md:mb-20">
                    <p className="text-xs md:text-sm font-medium text-white/40 uppercase tracking-widest mb-3 md:mb-4">
                        My Journey
                    </p>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white/90 tracking-tight">
                        Education & Experience
                    </h2>
                </div>

                {/* Timeline */}
                <div ref={timelineRef} className="relative">
                    {/* Straight Vertical Line - Background */}
                    <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-[2px] h-full bg-white/10" />

                    {/* Straight Vertical Line - Progress */}
                    <div
                        ref={progressLineRef}
                        className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-[3px] h-full bg-gradient-to-b from-white/60 via-white/40 to-white/60 rounded-full"
                        style={{ boxShadow: "0 0 15px rgba(255,255,255,0.3)" }}
                    />

                    {/* Timeline Items */}
                    <div className="relative">
                        {timelineData.map((item, index) => (
                            <div
                                key={index}
                                className={`timeline-item relative flex mb-12 md:mb-20 last:mb-0 
                                    pl-10 md:pl-0
                                    ${index % 2 === 0
                                        ? "md:flex-row md:items-center"
                                        : "md:flex-row-reverse md:items-center"
                                    }`}
                            >
                                {/* Card */}
                                <div
                                    className={`timeline-card w-full md:w-[calc(50%-40px)] 
                                        ${index % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8 md:text-left"}`}
                                >
                                    <div className="timeline-content p-4 md:p-6 rounded-xl bg-[#0a0a0a] border border-white/10 hover:border-white/20 transition-all duration-300">
                                        {/* Type Badge */}
                                        <span className="inline-block px-2 md:px-3 py-1 text-xs font-medium rounded-full mb-2 md:mb-3 bg-white/10 text-white/70">
                                            {item.type === "education" ? "📚 Education" : "💼 Experience"}
                                        </span>

                                        {/* Period */}
                                        <p className="text-xs md:text-sm text-white/40 mb-1 md:mb-2">{item.period}</p>

                                        {/* Title */}
                                        <h3 className="text-lg md:text-xl font-semibold text-white/90 mb-1">
                                            {item.title}
                                        </h3>

                                        {/* Organization */}
                                        <p className="text-sm md:text-base text-white/60 mb-2 md:mb-3">{item.organization}</p>

                                        {/* Description */}
                                        <p className="text-xs md:text-sm text-white/50 leading-relaxed">
                                            {item.description}
                                        </p>

                                        {/* Skills */}
                                        {item.skills && (
                                            <div className={`flex flex-wrap gap-1.5 md:gap-2 mt-3 md:mt-4 
                                                ${index % 2 === 0 ? "md:justify-end" : "md:justify-start"}`}
                                            >
                                                {item.skills.map((skill) => (
                                                    <span
                                                        key={skill}
                                                        className="px-1.5 md:px-2 py-0.5 md:py-1 text-[10px] md:text-xs bg-white/5 text-white/50 rounded-md border border-white/10"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Center Dot */}
                                <div className="timeline-dot absolute left-2 md:left-1/2 md:-translate-x-1/2 w-4 md:w-5 h-4 md:h-5 rounded-full bg-[#050505] border-[2px] md:border-[3px] border-white/50 z-10">
                                    <div className="absolute inset-0.5 md:inset-1 rounded-full bg-white/30" />
                                </div>

                                {/* Empty space for alternating layout (desktop only) */}
                                <div className="hidden md:block md:w-[calc(50%-40px)]" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
