# Jash Doshi Portfolio - Complete Technical Documentation

## Project Overview

This is a premium, scroll-driven portfolio website for **Jash Doshi**, built with **Next.js 16**, **React 19**, **TypeScript**, and cutting-edge animation libraries. The portfolio showcases creative development work through immersive scrollytelling experiences, WebGL fluid simulations, and sophisticated motion design.

---

## Architecture

```
portfolio/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx            # Main entry point
│   │   ├── layout.tsx          # Root layout with metadata + smooth scroll
│   │   ├── globals.css         # Design system & global styles
│   │   └── favicon.ico         # Site favicon
│   │
│   └── components/             # 18 React components
│       ├── Navigation.tsx
│       ├── PortfolioScroll.tsx
│       ├── AboutSection.tsx
│       ├── TimelineSection.tsx
│       ├── ServicesSection.tsx
│       ├── ProjectsSection.tsx
│       ├── SkillsSection.tsx
│       ├── AchievementsSection.tsx
│       ├── RevealFooter.tsx
│       ├── SmoothScrollProvider.tsx
│       ├── SplashCursor.jsx
│       ├── ScrollStack.jsx
│       ├── ScrollStack.css
│       ├── LogoLoop.tsx
│       ├── LogoLoop.css
│       ├── VideoScrollAnimation.tsx
│       ├── Footer.tsx
│       └── ContactSection.tsx
│
├── public/
│   ├── scroll_animation_image_frames/   # 240 JPG frames for hero scroll
│   ├── scroll_video.mp4                 # Alternative video version
│   └── *.svg                            # Static assets
│
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
└── Dockerfile
```

---

## Technology Stack

### Core Framework
| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 16.1.1 | React framework with App Router, SSR, and optimizations |
| **React** | 19.2.3 | UI library with React 19 features |
| **TypeScript** | 5.x | Type safety and developer experience |
| **Tailwind CSS** | 4.x | Utility-first styling framework |

### Animation Libraries
| Library | Version | Purpose |
|---------|---------|---------|
| **GSAP** | 3.14.2 | Professional-grade scroll animations, pinning, timelines |
| **Framer Motion** | 12.25.0 | React-native animation primitives, gestures |
| **@gsap/react** | 2.1.2 | React hooks for GSAP |
| **Lenis** | 1.3.17 | Buttery-smooth scroll experience |

### Icons & Utilities
| Library | Purpose |
|---------|---------|
| **react-icons** | Technology icons (React, Next.js, TypeScript, etc.) |

---

## Component Deep Dive

### 1. SmoothScrollProvider.tsx
**Purpose**: Wraps the entire application with Lenis smooth scrolling integrated with GSAP.

**Technical Details**:
- Initializes Lenis with custom easing: `Math.min(1, 1.001 - Math.pow(2, -10 * t))`
- Duration: 1.2 seconds for ultra-smooth feel
- Syncs with GSAP's ScrollTrigger via `lenis.on("scroll", ScrollTrigger.update)`
- Hooks into GSAP ticker for RAF synchronization
- Disables GSAP lag smoothing for perfect sync

**Key Code**:
```typescript
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 2,
});
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```

---

### 2. PortfolioScroll.tsx - Hero Section
**Purpose**: 240-frame scroll-controlled animation sequence with text overlays.

**Technical Architecture**:
1. **Image Preloader Hook** (`useImagePreloader`):
   - Preloads 240 JPG frames from `/scroll_animation_image_frames/`
   - Shows loading progress (0-100%)
   - Triggers `isLoaded` after 400ms delay for smooth transition

2. **Canvas Rendering**:
   - Uses HTML5 Canvas for high-performance frame rendering
   - Device pixel ratio aware for crisp rendering on retina displays
   - Cover-fit algorithm for responsive image sizing
   - Hardware-accelerated via `imageSmoothingQuality: 'high'`

3. **Scroll Animation**:
   - Container height: `400vh` (4x viewport for scroll distance)
   - `useScroll` from Framer Motion tracks scroll progress
   - `useSpring` adds smooth physics (stiffness: 60, damping: 25)
   - `useMotionValueEvent` triggers frame rendering on scroll

4. **Text Overlay System**:
   - 4 text stages with opacity transforms based on scroll progress:
     - `introOpacity`: [0, 0.12] → [0.18, 0.22] 
     - `craftOpacity`: [0.28, 0.32] → [0.48, 0.52]
     - `skillsOpacity`: [0.55, 0.58] → [0.72, 0.75]
     - `ctaOpacity`: [0.85, 0.90] → [1, 1]

**Frame Mapping**:
```
Scroll Progress 0% → Frame 0
Scroll Progress 50% → Frame 120
Scroll Progress 100% → Frame 239
```

---

### 3. Navigation.tsx
**Purpose**: Fixed navigation with scroll-aware styling and mobile menu.

**Features**:
- **Scroll Detection**: Shows solid background after hero section ends (3.8vh threshold)
- **Active Section Tracking**: Highlights current section in nav
- **Mobile Menu**: Full-screen overlay with staggered animation (AnimatePresence)
- **Framer Motion**: `whileHover={{ y: -2 }}` for subtle lift effect

**Scroll Logic**:
```typescript
const scrollAnimationEnd = window.innerHeight * 3.8;
setIsScrolled(window.scrollY > scrollAnimationEnd);
```

---

### 4. AboutSection.tsx
**Purpose**: GSAP-powered section with marquee banners and pinned scroll timeline.

**Animation Breakdown**:
1. **Header Marquee**: Infinite horizontal scroll at 20s duration
2. **Strip 1 Marquee**: 25s duration, white background
3. **Strip 2 Marquee**: 25s duration, opposite direction, dark background

**GSAP ScrollTrigger Configuration**:
```javascript
gsap.timeline({
    scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=1500",    // 1500px scroll distance
        scrub: 1,         // Smooth scrubbing
        pin: true,        // Pin section during animation
        anticipatePin: 1,
        pinSpacing: true,
    },
});
```

**Animated Elements**:
- Hero lines: y: 100 → 0, blur: 10px → 0
- Story blocks: x: ±100 → 0, blur: 8px → 0
- Strips wrapper: y: 60 → 0

---

### 5. TimelineSection.tsx
**Purpose**: Education & Experience timeline with alternating layout and SVG path animation.

**Key Features**:
1. **SVG Path Animation**: Curved background strip that draws on scroll
   - Path calculated via `getTotalLength()`
   - `strokeDashoffset` animates from full length to 0

2. **Alternating Layout**: Cards alternate left/right on desktop using flexbox
3. **Progress Line**: Vertical line with scale animation synced to scroll

**Animation Chain**:
- Header: opacity 0→1, y: 40→0
- Progress line: scaleY 0→1
- Each card: opacity 0→1, y: 40→0, scale 0.95→1
- Dots: scale 0→1 with back.out(2) easing
- Content: staggered children reveal

---

### 6. ServicesSection.tsx
**Purpose**: Horizontal scrolling service cards with 3D tilt effect.

**Horizontal Scroll Implementation**:
```javascript
// Calculate scroll amount for centering each card
const scrollAmount = lastCardCenterInitial - firstCardCenterInitial;
const scrollDistancePerCard = Math.max(400, viewportWidth * 0.4);
const totalScrollDistance = scrollDistancePerCard * numCards;

gsap.fromTo(scrollContainer, 
    { x: -initialOffset },
    { x: -initialOffset - scrollAmount }
);
```

**Card Scaling System**:
- Centered card: scale 1.2, opacity 1
- Side cards: scale 0.7, opacity 0.4
- Uses easeOutQuad for smooth falloff

**3D Tilt Effect**:
```typescript
style={{
    transform: isHovering
        ? `perspective(1000px) rotateX(${-mouseY * 10}deg) rotateY(${mouseX * 10}deg) translateZ(20px)`
        : "perspective(1000px) rotateX(0) rotateY(0) translateZ(0)"
}}
```

---

### 7. ProjectsSection.tsx + ScrollStack.jsx
**Purpose**: Card stacking effect where cards stack and scale as you scroll.

**ScrollStack Algorithm**:
1. Cards use `position: sticky` with incremental `top` values
2. When a card becomes stuck, it scales down as more cards stack above
3. Scale formula: `Math.max(baseScale, 1 - (stackedAbove * itemScale))`
4. Uses RAF loop with lerp interpolation (factor: 0.18)

**Configuration**:
```javascript
<ScrollStack
    itemDistance={150}      // Margin between cards
    itemScale={0.03}        // Scale reduction per stacked card
    itemStackDistance={35}  // Vertical offset when stacked
    baseScale={0.92}        // Minimum scale
>
```

---

### 8. SkillsSection.tsx
**Purpose**: Skills grid with animated progress bars and technology logo loop.

**Scroll-Responsive Features**:
- Header parallax: y moves 60→0 based on scroll
- Each skill category fades in with staggered timing
- Progress bars animate width from 0% to skill level

**Technology Logos**: Uses LogoLoop component with react-icons (16 technologies displayed)

---

### 9. AchievementsSection.tsx
**Purpose**: Animated counters and award cards with 3D tilt.

**AnimatedCounter Component**:
```typescript
const animate = (currentTime) => {
    const progress = Math.min(elapsed / duration, 1);
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    setCount(Math.floor(easeOutQuart * target));
    if (progress < 1) requestAnimationFrame(animate);
};
```

**Award Cards**: 
- 3D tilt on hover (perspective, rotateX, rotateY)
- Shimmer effect via CSS animation
- GSAP staggered entrance

---

### 10. RevealFooter.tsx
**Purpose**: Footer that reveals underneath main content as you scroll.

**Reveal Mechanism**:
1. Spacer div creates scroll space (`height: 100vh`)
2. Footer is `position: fixed; bottom: 0`
3. z-index toggles between -10 and 40 based on scroll threshold
4. Main content scrolls OVER footer, revealing it

**Features**:
- Social links with hover effects
- Newsletter subscription form
- Large animated name letters
- "Back to top" button

---

### 11. SplashCursor.jsx
**Purpose**: WebGL fluid simulation cursor effect.

**Technical Details**:
- Full-screen canvas overlay
- WebGL 2.0 (with WebGL 1.0 fallback)
- Real-time Navier-Stokes fluid simulation
- Configurable parameters: density dissipation, velocity, pressure, curl

**Shader Programs**:
- `splatShader`: Creates color splats at cursor position
- `advectionShader`: Moves particles through velocity field
- `divergenceShader` / `pressureShader`: Solves pressure equations
- `vorticityShader`: Adds swirling motion
- `displayShader`: Renders final output

---

### 12. LogoLoop.tsx
**Purpose**: Infinite horizontal scrolling logo marquee.

**Implementation**:
- Duplicates logo set for seamless loop
- CSS animation with dynamic duration based on content width
- Fade edges via pseudo-elements with gradient masks
- Pause on hover capability

---

## CSS Architecture

### globals.css Design System

**CSS Variables (Dark Mode)**:
```css
:root {
    --background: #050505;
    --foreground: #ffffff;
    --text-heading: rgba(255, 255, 255, 0.9);
    --text-body: rgba(255, 255, 255, 0.6);
    --text-muted: rgba(255, 255, 255, 0.4);
    --accent: rgba(255, 255, 255, 0.08);
}
```

**Lenis Integration Styles**:
```css
html.lenis, html.lenis body { height: auto; }
.lenis.lenis-smooth { scroll-behavior: auto !important; }
.lenis.lenis-stopped { overflow: hidden; }
```

### ScrollStack.css
Handles sticky positioning, card gradients, and animation keyframes for project cards.

### LogoLoop.css
Manages infinite scroll animation and fade gradient overlays.

---

## Performance Optimizations

### 1. Image Loading
- 240 frames preloaded in parallel
- Progress indicator during load
- Deferred content display after complete load

### 2. Animation Performance
- Hardware acceleration via `will-change: transform`
- `force3D: true` in GSAP
- RAF synchronization through GSAP ticker
- Debounced resize handlers

### 3. Canvas Rendering
- Device pixel ratio compensation
- `imageSmoothingQuality: 'high'`
- Efficient cover-fit calculation

### 4. Scroll Handling
- Passive event listeners
- GSAP ScrollTrigger with `scrub` for smooth interaction
- Lenis for native-feeling momentum

---

## Build & Deployment

### Development
```bash
npm run dev     # Starts Next.js dev server on port 3000
```

### Production
```bash
npm run build   # Creates optimized production build
npm run start   # Runs production server
```

### Docker
```dockerfile
# Dockerfile included for containerized deployment
# Exposes port 3000
```

---

## File Dependencies Graph

```
layout.tsx
    └── SmoothScrollProvider.tsx (Lenis + GSAP)
        └── page.tsx
            ├── SplashCursor.jsx (WebGL canvas)
            ├── Navigation.tsx (Framer Motion)
            ├── PortfolioScroll.tsx (Canvas + Framer Motion)
            ├── AboutSection.tsx (GSAP ScrollTrigger)
            ├── TimelineSection.tsx (GSAP ScrollTrigger + SVG)
            ├── ServicesSection.tsx (GSAP + Framer Motion)
            │   └── Horizontal scroll with 3D cards
            ├── ProjectsSection.tsx
            │   └── ScrollStack.jsx (Sticky + RAF)
            │       └── ScrollStack.css
            ├── SkillsSection.tsx (Framer Motion)
            │   └── LogoLoop.tsx
            │       └── LogoLoop.css
            ├── AchievementsSection.tsx (GSAP + Framer Motion)
            └── RevealFooter.tsx (Fixed reveal pattern)
```

---

## Key Technical Decisions

1. **Hybrid Animation Approach**: GSAP for scroll-triggered animations, Framer Motion for component-level animations
2. **Canvas for Hero**: HTML5 Canvas chosen over video for precise scroll sync
3. **Lenis for Scroll**: Provides consistent smooth scrolling across browsers
4. **CSS Variables**: Maintainable dark-mode design system
5. **Sticky Card Stack**: CSS sticky positioning with JS-controlled transforms
6. **WebGL Cursor**: Client-side only, progressive enhancement approach

---

## Browser Support

- Modern browsers with WebGL 2.0 support
- Fallback to WebGL 1.0 for older browsers
- Mobile-responsive with touch support
- Reduced motion support via `prefers-reduced-motion` (recommended addition)

---

## Contact Information

- **Email**: hello@jashdoshi.dev
- **GitHub**: github.com/jashdoshi77
- **LinkedIn**: linkedin.com/in/jashdoshi77
- **Twitter**: twitter.com/jashdoshi77
- **Instagram**: instagram.com/jashdoshi77
