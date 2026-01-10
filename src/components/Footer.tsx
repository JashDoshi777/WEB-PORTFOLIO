"use client";

import { motion } from "framer-motion";

const socialLinks = [
    {
        name: "GitHub",
        href: "https://github.com",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
            </svg>
        ),
    },
    {
        name: "LinkedIn",
        href: "https://linkedin.com",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
        ),
    },
    {
        name: "Twitter",
        href: "https://twitter.com",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
            </svg>
        ),
    },
    {
        name: "Dribbble",
        href: "https://dribbble.com",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32" />
            </svg>
        ),
    },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative py-12 px-6 lg:px-8 bg-[#050505] border-t border-white/5">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                    {/* Logo & Copyright */}
                    <div>
                        <motion.a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            className="text-xl font-semibold tracking-tight text-white/90 hover:text-white transition-colors inline-block mb-2"
                            whileHover={{ scale: 1.02 }}
                        >
                            Jash Doshi<span className="text-white/40">.</span>
                        </motion.a>
                        <p className="text-sm text-white/40">
                            © {currentYear} All rights reserved.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-wrap items-center gap-4 md:gap-8">
                        {["About", "Services", "Work", "Skills", "Achievements", "Contact"].map((link) => (
                            <motion.a
                                key={link}
                                href={`#${link.toLowerCase()}`}
                                className="text-sm text-white/50 hover:text-white transition-colors"
                                whileHover={{ y: -2 }}
                            >
                                {link}
                            </motion.a>
                        ))}
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center gap-4">
                        {socialLinks.map((social) => (
                            <motion.a
                                key={social.name}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-white/10 transition-all"
                                whileHover={{ scale: 1.1, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                title={social.name}
                            >
                                {social.icon}
                            </motion.a>
                        ))}
                    </div>
                </div>

                {/* Back to top */}
                <div className="flex justify-center mt-12">
                    <motion.button
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        className="flex flex-col items-center gap-2 text-white/30 hover:text-white/60 transition-colors group"
                        whileHover={{ y: -5 }}
                    >
                        <motion.svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            className="rotate-180"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                            <path d="M12 5v14M5 12l7 7 7-7" />
                        </motion.svg>
                        <span className="text-xs uppercase tracking-widest">Back to Top</span>
                    </motion.button>
                </div>
            </div>
        </footer>
    );
}
