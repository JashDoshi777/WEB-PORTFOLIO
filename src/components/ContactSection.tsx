"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

export default function ContactSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        console.log("Form submitted:", formState);
    };

    return (
        <section
            id="contact"
            ref={ref}
            className="relative py-16 md:py-32 px-4 md:px-6 lg:px-8 bg-[#0a0a0a] overflow-hidden"
        >
            {/* Background gradient */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] md:w-[800px] h-[200px] md:h-[400px] bg-gradient-to-t from-blue-500/10 via-purple-500/5 to-transparent blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24">
                    {/* Left side - CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        <p className="text-xs md:text-sm font-medium text-white/40 uppercase tracking-widest mb-3 md:mb-4">
                            Get In Touch
                        </p>
                        <h2 className="text-3xl md:text-4xl lg:text-6xl font-light text-white/90 tracking-tight leading-tight mb-6 md:mb-8">
                            Let&apos;s create something{" "}
                            <span className="text-white/50">amazing together</span>
                        </h2>
                        <p className="text-sm md:text-lg text-white/60 leading-relaxed mb-8 md:mb-12">
                            Have a project in mind? I&apos;d love to hear about it. Whether it&apos;s a
                            new website, mobile app, or just a conversation about what&apos;s possible,
                            let&apos;s connect.
                        </p>

                        {/* Contact info */}
                        <div className="space-y-4 md:space-y-6">
                            <motion.a
                                href="mailto:hello@jashdoshi.dev"
                                className="flex items-center gap-3 md:gap-4 group"
                                whileHover={{ x: 5 }}
                            >
                                <div className="w-10 md:w-12 h-10 md:h-12 rounded-lg md:rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/50">
                                        <path d="M3 8l9 6 9-6M21 8v10a2 2 0 01-2 2H5a2 2 0 01-2-2V8l9 6 9-6z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs md:text-sm text-white/40">Email</p>
                                    <p className="text-sm md:text-base text-white/80 group-hover:text-white transition-colors">hello@jashdoshi.dev</p>
                                </div>
                            </motion.a>

                            <motion.a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 md:gap-4 group"
                                whileHover={{ x: 5 }}
                            >
                                <div className="w-10 md:w-12 h-10 md:h-12 rounded-lg md:rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/50">
                                        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs md:text-sm text-white/40">LinkedIn</p>
                                    <p className="text-sm md:text-base text-white/80 group-hover:text-white transition-colors">Let&apos;s connect</p>
                                </div>
                            </motion.a>

                            <motion.a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 md:gap-4 group"
                                whileHover={{ x: 5 }}
                            >
                                <div className="w-10 md:w-12 h-10 md:h-12 rounded-lg md:rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/50">
                                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs md:text-sm text-white/40">GitHub</p>
                                    <p className="text-sm md:text-base text-white/80 group-hover:text-white transition-colors">View my code</p>
                                </div>
                            </motion.a>
                        </div>
                    </motion.div>

                    {/* Right side - Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <form onSubmit={handleSubmit} className="p-5 md:p-8 bg-white/[0.02] border border-white/5 rounded-xl md:rounded-2xl">
                            <div className="space-y-4 md:space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-xs md:text-sm text-white/40 mb-2">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={formState.name}
                                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                        className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-white/5 border border-white/10 rounded-lg md:rounded-xl text-sm md:text-base text-white placeholder-white/30 focus:outline-none focus:border-white/20 transition-colors"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-xs md:text-sm text-white/40 mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={formState.email}
                                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                        className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-white/5 border border-white/10 rounded-lg md:rounded-xl text-sm md:text-base text-white placeholder-white/30 focus:outline-none focus:border-white/20 transition-colors"
                                        placeholder="john@example.com"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-xs md:text-sm text-white/40 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        value={formState.message}
                                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                        rows={4}
                                        className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-white/5 border border-white/10 rounded-lg md:rounded-xl text-sm md:text-base text-white placeholder-white/30 focus:outline-none focus:border-white/20 transition-colors resize-none"
                                        placeholder="Tell me about your project..."
                                        required
                                    />
                                </div>

                                <motion.button
                                    type="submit"
                                    className="w-full py-3 md:py-4 bg-white/10 hover:bg-white/15 border border-white/10 rounded-lg md:rounded-xl text-sm md:text-base text-white font-medium flex items-center justify-center gap-2 transition-colors"
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                >
                                    Send Message
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
                                    </svg>
                                </motion.button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
