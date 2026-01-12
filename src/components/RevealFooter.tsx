"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const socialLinks = [
    {
        name: "Instagram",
        href: "https://instagram.com/jashdoshi77",
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
        )
    },
    {
        name: "LinkedIn",
        href: "https://linkedin.com/in/jashdoshi77",
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        )
    },
    {
        name: "GitHub",
        href: "https://github.com/jashdoshi77",
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
        )
    },
    {
        name: "Twitter",
        href: "https://twitter.com/jashdoshi77",
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        )
    },
];

export default function RevealFooter() {
    const [email, setEmail] = useState("");
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
    const [isFooterActive, setIsFooterActive] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight;
            const scrollTop = window.scrollY;
            const clientHeight = window.innerHeight;

            // Check if we're in the footer reveal zone (within last viewport height)
            const footerThreshold = scrollHeight - clientHeight - 50;
            setIsFooterActive(scrollTop >= footerThreshold);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setIsSubscribed(true);
            setEmail("");
            setTimeout(() => setIsSubscribed(false), 3000);
        }
    };

    const name = "JASH";

    return (
        <>
            {/* Spacer div that creates the reveal effect */}
            <div className="h-screen" style={{ pointerEvents: isFooterActive ? 'none' : 'auto' }} />

            {/* Fixed footer that gets revealed - z-index 40 keeps it below nav (z-50) */}
            <footer
                className="fixed bottom-0 left-0 right-0 h-screen overflow-hidden transition-all duration-300"
                style={{
                    background: "linear-gradient(135deg, #0a0a0b 0%, #0d0d10 50%, #0a0a0b 100%)",
                    zIndex: isFooterActive ? 40 : -10,
                }}
            >
                {/* Gradient orbs - neutral greys */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-white/[0.03] rounded-full blur-[150px]" />
                    <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-white/[0.02] rounded-full blur-[150px]" />
                    <div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] bg-white/[0.02] rounded-full blur-[120px]" />
                </div>

                {/* Main content */}
                <div className="relative z-10 h-full flex flex-col justify-between px-8 lg:px-16 pt-24 pb-6">
                    {/* Top section - Cards only */}
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8">
                        {/* Left side - GET IN TOUCH as main CTA */}
                        <motion.div
                            className="flex flex-col gap-4"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-white/40 text-xs uppercase tracking-[0.3em] font-medium">Let&apos;s Connect</h2>
                            <a
                                href="mailto:hello@jashdoshi.dev"
                                className="group relative inline-flex items-center gap-3 px-8 py-4 overflow-hidden rounded-full cursor-pointer"
                            >
                                {/* Button background with subtle border */}
                                <span className="absolute inset-0 rounded-full bg-white/10 group-hover:bg-white/15 transition-opacity" />
                                <span className="absolute inset-[1px] rounded-full bg-[#0a0a0b]" />
                                <span className="absolute inset-0 rounded-full border border-white/20 group-hover:border-white/40 transition-colors duration-300" />
                                <span className="relative z-10 text-white text-base font-medium tracking-wide">GET IN TOUCH</span>
                                <svg className="relative z-10 w-5 h-5 text-white group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </a>
                        </motion.div>

                        {/* Right side - Info Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 lg:gap-6 max-w-3xl">
                            {/* Contact Card */}
                            <motion.div
                                className="group p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/15 hover:bg-white/[0.05] transition-all duration-500"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                viewport={{ once: true }}
                            >
                                <h4 className="text-white/50 text-[10px] uppercase tracking-[0.25em] mb-4 font-medium">Contact</h4>
                                <a
                                    href="mailto:hello@jashdoshi.dev"
                                    className="flex items-center gap-3 text-white/90 hover:text-white transition-colors text-sm font-light mb-2 group/link cursor-pointer"
                                >
                                    <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </span>
                                    <span className="group-hover/link:translate-x-1 transition-transform">hello@jashdoshi.dev</span>
                                </a>
                                <p className="text-white/30 text-xs pl-11">Available worldwide</p>
                            </motion.div>

                            {/* Social Card */}
                            <motion.div
                                className="group p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/15 hover:bg-white/[0.05] transition-all duration-500"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                viewport={{ once: true }}
                            >
                                <h4 className="text-white/50 text-[10px] uppercase tracking-[0.25em] mb-4 font-medium">Follow</h4>
                                <div className="flex gap-2">
                                    {socialLinks.map((link) => (
                                        <a
                                            key={link.name}
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.1] flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 hover:border-white/25 transition-all duration-300 cursor-pointer"
                                            onMouseEnter={() => setHoveredSocial(link.name)}
                                            onMouseLeave={() => setHoveredSocial(null)}
                                        >
                                            {link.icon}
                                        </a>
                                    ))}
                                </div>
                                <p className="text-white/40 text-xs mt-3 h-4">
                                    {hoveredSocial || "Connect with me"}
                                </p>
                            </motion.div>

                            {/* Newsletter Card */}
                            <motion.div
                                className="group p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/15 hover:bg-white/[0.05] transition-all duration-500"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                viewport={{ once: true }}
                            >
                                <h4 className="text-white/50 text-[10px] uppercase tracking-[0.25em] mb-4 font-medium">Newsletter</h4>
                                <form onSubmit={handleSubscribe} className="space-y-3">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="your@email.com"
                                        className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-white/25 focus:bg-white/[0.08] transition-all duration-300 cursor-text"
                                        required
                                    />
                                    <button
                                        type="submit"
                                        className="w-full relative overflow-hidden px-4 py-2.5 rounded-xl text-xs font-medium cursor-pointer hover:opacity-90 transition-opacity"
                                        style={{
                                            background: isSubscribed
                                                ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
                                                : "rgba(255, 255, 255, 0.1)",
                                            border: "1px solid",
                                            borderColor: isSubscribed ? "rgba(16, 185, 129, 0.5)" : "rgba(255, 255, 255, 0.15)",
                                            color: "white",
                                        }}
                                    >
                                        {isSubscribed ? "✓ SUBSCRIBED" : "SUBSCRIBE →"}
                                    </button>
                                </form>
                            </motion.div>
                        </div>
                    </div>

                    {/* Huge Name at bottom */}
                    <motion.div
                        className="flex items-end"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 1 }}
                        viewport={{ once: true }}
                    >
                        <div
                            className="w-full select-none pointer-events-none"
                            style={{ lineHeight: 0.8 }}
                        >
                            <div
                                className="flex items-end justify-start"
                                style={{
                                    fontSize: "clamp(4rem, 15vw, 14rem)",
                                    fontWeight: 900,
                                    letterSpacing: "-0.04em",
                                }}
                            >
                                {name.split("").map((letter, index) => (
                                    <motion.span
                                        key={index}
                                        className="inline-block"
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.7 + index * 0.1 }}
                                        viewport={{ once: true }}
                                        style={{
                                            background: "linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.15) 100%)",
                                            WebkitBackgroundClip: "text",
                                            WebkitTextFillColor: "transparent",
                                            backgroundClip: "text",
                                        }}
                                    >
                                        {letter}
                                    </motion.span>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Bottom copyright */}
                    <motion.div
                        className="flex items-center justify-between text-white/40 text-xs py-3 border-t border-white/[0.06]"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        viewport={{ once: true }}
                    >
                        <span className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            © {new Date().getFullYear()} Jash Doshi
                        </span>
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                            className="group flex items-center gap-2 hover:text-white transition-colors px-3 py-1.5 rounded-full hover:bg-white/[0.05] cursor-pointer"
                        >
                            <span>Back to top</span>
                            <span className="group-hover:-translate-y-1 transition-transform">↑</span>
                        </button>
                    </motion.div>
                </div>
            </footer>
        </>
    );
}
