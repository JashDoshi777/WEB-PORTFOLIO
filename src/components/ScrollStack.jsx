'use client';
import { useRef, useEffect, useCallback } from 'react';
import './ScrollStack.css';

export const ScrollStackItem = ({ children, itemClassName = '' }) => (
    <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
);

const ScrollStack = ({
    children,
    className = '',
    itemDistance = 100,
    itemScale = 0.03,
    itemStackDistance = 30,
    baseScale = 0.85,
    onStackComplete
}) => {
    const containerRef = useRef(null);
    const cardsRef = useRef([]);
    const animationRef = useRef(null);
    const currentScalesRef = useRef([]);
    const targetScalesRef = useRef([]);

    // Faster lerp for more responsive feel
    const lerp = useCallback((start, end, factor) => {
        const diff = end - start;
        if (Math.abs(diff) < 0.001) return end;
        return start + diff * factor;
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const cards = Array.from(container.querySelectorAll('.scroll-stack-card'));
        cardsRef.current = cards;

        // Initialize scales
        currentScalesRef.current = cards.map(() => 1);
        targetScalesRef.current = cards.map(() => 1);

        // Mobile detection
        const isMobile = window.innerWidth < 768;
        const stickyTopBase = isMobile ? 70 : 100;
        const stackDistance = isMobile ? 20 : itemStackDistance;
        const cardMargin = isMobile ? 80 : itemDistance;

        // Set sticky positions
        cards.forEach((card, i) => {
            card.style.position = 'sticky';
            card.style.top = `${stickyTopBase + i * stackDistance}px`;
            card.style.marginBottom = i < cards.length - 1 ? `${cardMargin}px` : '0';
            card.style.zIndex = i + 1;
        });

        // Animation settings
        const lerpFactor = 0.18; // Higher = more responsive
        let isRunning = true;

        const animate = () => {
            if (!isRunning) return;

            cards.forEach((card, i) => {
                const rect = card.getBoundingClientRect();
                const stickyTop = stickyTopBase + i * stackDistance;
                const isStuck = rect.top <= stickyTop + 5;

                // Calculate target scale
                let targetScale = 1;
                if (isStuck) {
                    let stackedAbove = 0;
                    for (let j = i + 1; j < cards.length; j++) {
                        const nextRect = cards[j].getBoundingClientRect();
                        const nextStickyTop = stickyTopBase + j * stackDistance;
                        if (nextRect.top <= nextStickyTop + 5) {
                            stackedAbove++;
                        }
                    }
                    targetScale = Math.max(baseScale, 1 - (stackedAbove * itemScale));
                }

                targetScalesRef.current[i] = targetScale;

                // Smooth interpolation
                const currentScale = currentScalesRef.current[i];
                const newScale = lerp(currentScale, targetScale, lerpFactor);
                currentScalesRef.current[i] = newScale;

                // Apply scale transform only (no blur for performance)
                card.style.transform = `scale(${newScale.toFixed(4)})`;
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        // Start loop
        animationRef.current = requestAnimationFrame(animate);

        // Scroll listener for onStackComplete
        const handleScroll = () => {
            const lastCard = cards[cards.length - 1];
            if (lastCard) {
                const rect = lastCard.getBoundingClientRect();
                const stickyTop = 100 + (cards.length - 1) * itemStackDistance;
                if (rect.top <= stickyTop + 5) {
                    onStackComplete?.();
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            isRunning = false;
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            window.removeEventListener('scroll', handleScroll);
        };
    }, [itemDistance, itemScale, itemStackDistance, baseScale, lerp, onStackComplete]);

    return (
        <div className={`scroll-stack-container ${className}`.trim()} ref={containerRef}>
            {children}
            <div className="scroll-stack-end" />
        </div>
    );
};

export default ScrollStack;
