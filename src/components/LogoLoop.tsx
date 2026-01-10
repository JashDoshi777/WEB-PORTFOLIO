"use client";

import { useEffect, useRef, useState } from 'react';
import './LogoLoop.css';

interface LogoItem {
    node: React.ReactNode;
    title?: string;
}

interface LogoLoopProps {
    logos: LogoItem[];
    speed?: number;
    logoHeight?: number;
    gap?: number;
    pauseOnHover?: boolean;
    fadeOut?: boolean;
    fadeOutColor?: string;
}

export default function LogoLoop({
    logos,
    speed = 30,
    logoHeight = 36,
    gap = 56,
    pauseOnHover = true,
    fadeOut = true,
    fadeOutColor = '#050505'
}: LogoLoopProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [duration, setDuration] = useState(20);

    useEffect(() => {
        // Calculate animation duration based on content width and speed
        if (containerRef.current) {
            const trackWidth = containerRef.current.querySelector('.logo-track')?.scrollWidth || 0;
            const calculatedDuration = trackWidth / speed;
            setDuration(Math.max(10, calculatedDuration));
        }
    }, [logos, speed]);

    const cssVars = {
        '--logo-height': `${logoHeight}px`,
        '--logo-gap': `${gap}px`,
        '--animation-duration': `${duration}s`,
        '--fade-color': fadeOutColor,
    } as React.CSSProperties;

    return (
        <div
            ref={containerRef}
            className={`logo-loop-container ${fadeOut ? 'with-fade' : ''} ${pauseOnHover ? 'pause-on-hover' : ''}`}
            style={cssVars}
        >
            <div className="logo-track">
                {/* First set of logos */}
                {logos.map((logo, index) => (
                    <div key={`a-${index}`} className="logo-item" title={logo.title}>
                        {logo.node}
                    </div>
                ))}
                {/* Duplicate for seamless loop */}
                {logos.map((logo, index) => (
                    <div key={`b-${index}`} className="logo-item" title={logo.title}>
                        {logo.node}
                    </div>
                ))}
            </div>
        </div>
    );
}
