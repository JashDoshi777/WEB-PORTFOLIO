"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const navLinks = [
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Work", href: "#work" },
    { name: "Skills", href: "#skills" },
    { name: "Achievements", href: "#achievements" },
    { name: "Contact", href: "#contact" },
];

export default function Navigation() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Only show solid navbar after the scroll animation ends (400vh)
            const scrollAnimationEnd = window.innerHeight * 3.8;
            setIsScrolled(window.scrollY > scrollAnimationEnd);

            // Detect active section
            const sections = ["about", "services", "work", "skills", "achievements", "contact"];
            for (const section of sections.reverse()) {
                const element = document.getElementById(section);
                if (element && window.scrollY >= element.offsetTop - 200) {
                    setActiveSection(section);
                    break;
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu on resize to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMobileMenuOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Prevent scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isMobileMenuOpen]);

    const scrollToSection = (href: string) => {
        setIsMobileMenuOpen(false);
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled || isMobileMenuOpen
                    ? "bg-[#050505]/95 backdrop-blur-xl border-b border-white/5"
                    : "bg-transparent"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 md:h-20">
                        {/* Logo */}
                        <motion.a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                setIsMobileMenuOpen(false);
                                window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            className="text-lg md:text-xl font-semibold tracking-tight text-white/90 hover:text-white transition-colors"
                            whileHover={{ scale: 1.02 }}
                        >
                            Jash Doshi<span className="text-white/40">.</span>
                        </motion.a>

                        {/* Nav Links - Desktop */}
                        <div className="hidden md:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <motion.button
                                    key={link.name}
                                    onClick={() => scrollToSection(link.href)}
                                    className={`text-sm font-medium transition-colors ${activeSection === link.href.slice(1)
                                        ? "text-white"
                                        : "text-white/50 hover:text-white/80"
                                        }`}
                                    whileHover={{ y: -2 }}
                                >
                                    {link.name}
                                </motion.button>
                            ))}
                        </div>

                        {/* CTA Button - Desktop */}
                        <motion.a
                            href="mailto:hello@jashdoshi.dev"
                            className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/15 border border-white/10 rounded-full text-sm font-medium text-white/90 transition-all"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Let&apos;s Talk
                        </motion.a>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden text-white/70 hover:text-white p-2 -mr-2"
                            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                        >
                            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                {isMobileMenuOpen ? (
                                    <path d="M6 6l12 12M6 18L18 6" />
                                ) : (
                                    <path d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-[#050505]/98 backdrop-blur-xl md:hidden"
                    >
                        <div className="flex flex-col items-center justify-center h-full gap-8 pt-16">
                            {navLinks.map((link, index) => (
                                <motion.button
                                    key={link.name}
                                    onClick={() => scrollToSection(link.href)}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`text-2xl font-light transition-colors ${activeSection === link.href.slice(1)
                                        ? "text-white"
                                        : "text-white/60"
                                        }`}
                                >
                                    {link.name}
                                </motion.button>
                            ))}
                            <motion.a
                                href="mailto:hello@jashdoshi.dev"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ delay: navLinks.length * 0.1 }}
                                className="mt-4 px-8 py-3 bg-white/10 border border-white/20 rounded-full text-white font-medium"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Let&apos;s Talk
                            </motion.a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
