"use client";

import ScrollStack, { ScrollStackItem } from "./ScrollStack.jsx";

const projects = [
    {
        id: 1,
        title: "E-Commerce Platform",
        category: "Web Development",
        description: "A modern e-commerce platform with seamless checkout experience and real-time inventory management. Built with cutting-edge technologies for optimal performance.",
        tags: ["Next.js", "Stripe", "Tailwind"],
        year: "2024",
        cardClass: "card-1",
    },
    {
        id: 2,
        title: "Finance Dashboard",
        category: "UI/UX Design",
        description: "Interactive financial dashboard with real-time data visualization and analytics. Designed for clarity and actionable insights.",
        tags: ["React", "D3.js", "TypeScript"],
        year: "2024",
        cardClass: "card-2",
    },
    {
        id: 3,
        title: "AI Content Platform",
        category: "Full Stack",
        description: "AI-powered content generation platform with collaborative editing features. Leveraging the latest in machine learning for creative workflows.",
        tags: ["Python", "OpenAI", "Next.js"],
        year: "2023",
        cardClass: "card-3",
    },
    {
        id: 4,
        title: "Creative Agency Site",
        category: "Motion Design",
        description: "Award-winning agency website with scroll-driven animations and 3D elements. A showcase of modern web capabilities.",
        tags: ["GSAP", "Three.js", "Framer"],
        year: "2023",
        cardClass: "card-4",
    },
];

export default function ProjectsSection() {
    return (
        <section id="work">
            <ScrollStack
                itemDistance={150}
                itemScale={0.03}
                itemStackDistance={35}
                baseScale={0.92}
                onStackComplete={() => { }}
            >
                {/* Header */}
                <div className="scroll-stack-header">
                    <p className="scroll-stack-header-label">Selected Work</p>
                    <h2 className="scroll-stack-header-title">Featured Projects</h2>
                </div>

                {/* Project Cards */}
                {projects.map((project, index) => (
                    <ScrollStackItem
                        key={project.id}
                        itemClassName={project.cardClass}
                    >
                        <div className="project-card-content">
                            {/* Project Number */}
                            <span className="project-number">
                                {String(index + 1).padStart(2, '0')}
                            </span>

                            {/* Category Badge */}
                            <span className="project-category">
                                {project.category}
                            </span>

                            {/* Title */}
                            <h3 className="project-title">{project.title}</h3>

                            {/* Description */}
                            <p className="project-description">{project.description}</p>

                            {/* Tags */}
                            <div className="project-tags">
                                {project.tags.map((tag) => (
                                    <span key={tag} className="project-tag">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Year */}
                            <span className="project-year">{project.year}</span>

                            {/* Link Icon */}
                            <a href="#" className="project-link">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                                </svg>
                            </a>
                        </div>
                    </ScrollStackItem>
                ))}
            </ScrollStack>
        </section>
    );
}
