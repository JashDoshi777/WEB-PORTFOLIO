"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import LogoLoop from "./LogoLoop";
import {
    SiReact,
    SiNextdotjs,
    SiTypescript,
    SiNodedotjs,
    SiPython,
    SiPostgresql,
    SiMongodb,
    SiRedis,
    SiAmazonwebservices,
    SiVercel,
    SiDocker,
    SiGraphql,
    SiTailwindcss,
    SiFramer,
    SiThreedotjs,
    SiGreensock
} from "react-icons/si";

const skillCategories = [
    {
        title: "Frontend",
        skills: [
            { name: "React / Next.js", level: 95 },
            { name: "TypeScript", level: 90 },
            { name: "Tailwind CSS", level: 95 },
            { name: "Framer Motion", level: 85 },
        ],
    },
    {
        title: "Backend",
        skills: [
            { name: "Node.js", level: 85 },
            { name: "Python", level: 80 },
            { name: "PostgreSQL", level: 75 },
            { name: "REST APIs", level: 90 },
        ],
    },
    {
        title: "Tools & Design",
        skills: [
            { name: "Git / GitHub", level: 90 },
            { name: "Figma", level: 85 },
            { name: "VS Code", level: 95 },
            { name: "Docker", level: 70 },
        ],
    },
];

const techLogos = [
    { node: <SiReact />, title: "React" },
    { node: <SiNextdotjs />, title: "Next.js" },
    { node: <SiTypescript />, title: "TypeScript" },
    { node: <SiNodedotjs />, title: "Node.js" },
    { node: <SiPython />, title: "Python" },
    { node: <SiPostgresql />, title: "PostgreSQL" },
    { node: <SiMongodb />, title: "MongoDB" },
    { node: <SiRedis />, title: "Redis" },
    { node: <SiAmazonwebservices />, title: "AWS" },
    { node: <SiVercel />, title: "Vercel" },
    { node: <SiDocker />, title: "Docker" },
    { node: <SiGraphql />, title: "GraphQL" },
    { node: <SiTailwindcss />, title: "Tailwind" },
    { node: <SiFramer />, title: "Framer Motion" },
    { node: <SiThreedotjs />, title: "Three.js" },
    { node: <SiGreensock />, title: "GSAP" },
];

export default function SkillsSection() {
    const sectionRef = useRef<HTMLElement>(null);

    // Track scroll progress through the section
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // Parallax effect for header
    const headerY = useTransform(scrollYProgress, [0, 0.3], [60, 0]);
    const headerOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

    return (
        <section
            id="skills"
            ref={sectionRef}
            className="relative py-16 md:py-32 px-4 md:px-6 lg:px-8 bg-[#050505]"
        >
            <div className="max-w-7xl mx-auto">
                {/* Header with scroll-responsive animation */}
                <motion.div
                    style={{
                        y: headerY,
                        opacity: headerOpacity
                    }}
                    className="text-center mb-12 md:mb-20"
                >
                    <p className="text-xs md:text-sm font-medium text-white/40 uppercase tracking-widest mb-3 md:mb-4">
                        Expertise
                    </p>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white/90 tracking-tight">
                        Skills & Technologies
                    </h2>
                </motion.div>

                {/* Skills Grid - scroll responsive cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 lg:gap-16 mb-12 md:mb-20">
                    {skillCategories.map((category, index) => (
                        <motion.div
                            key={category.title}
                            style={{
                                opacity: useTransform(
                                    scrollYProgress,
                                    [0.1 + index * 0.05, 0.25 + index * 0.05],
                                    [0, 1]
                                ),
                                y: useTransform(
                                    scrollYProgress,
                                    [0.1 + index * 0.05, 0.25 + index * 0.05],
                                    [40, 0]
                                ),
                            }}
                            className="p-5 md:p-8 bg-white/[0.02] border border-white/5 rounded-xl md:rounded-2xl"
                        >
                            <h3 className="text-lg md:text-xl font-medium text-white/90 mb-5 md:mb-8">{category.title}</h3>
                            {category.skills.map((skill) => (
                                <div key={skill.name} className="mb-4 md:mb-6">
                                    <div className="flex justify-between text-xs md:text-sm mb-2">
                                        <span className="text-white/70">{skill.name}</span>
                                        <span className="text-white/40">{skill.level}%</span>
                                    </div>
                                    <div className="h-1 md:h-1.5 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            style={{
                                                width: useTransform(
                                                    scrollYProgress,
                                                    [0.15 + index * 0.05, 0.35 + index * 0.05],
                                                    ["0%", `${skill.level}%`]
                                                ),
                                            }}
                                            className="h-full bg-gradient-to-r from-white/30 to-white/60 rounded-full"
                                        />
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    ))}
                </div>

                {/* Technology Logo Loop */}
                <motion.div
                    style={{
                        opacity: useTransform(scrollYProgress, [0.35, 0.5], [0, 1]),
                    }}
                    className="text-center"
                >
                    <p className="text-xs md:text-sm text-white/40 uppercase tracking-widest mb-6 md:mb-10">
                        Technologies I Work With
                    </p>
                    <div className="relative py-2 md:py-4">
                        <LogoLoop
                            logos={techLogos}
                            speed={35}
                            logoHeight={32}
                            gap={48}
                            pauseOnHover={false}
                            fadeOut
                            fadeOutColor="#050505"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
