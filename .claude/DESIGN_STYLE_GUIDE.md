# 🎨 Design Style Guide - ClaudeCodeNinja

**Inspired by**: [AgentVoice.com](https://www.agentvoice.com/)
**Last Updated**: 2025-11-16
**Designer**: Agent Soo-yeon (Feature Coordinator)

---

## ⚡ Core Design Rules

### 🎯 Rule #1: Inline Tailwind Classes Only

**IMPORTANTE**: Usare SOLO classi Tailwind inline nei componenti React. NON creare classi CSS custom.

**✅ DO** (Corretto):
```tsx
// ✅ Classi Tailwind inline con valori espliciti
<div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4">
  <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg">
    Click me
  </button>
</div>

// ✅ Colori hex inline quando necessario
<div className="bg-[#111827] text-white">
  Content
</div>
```

**❌ DON'T** (Evitare):
```tsx
// ❌ Classi CSS custom
<div className="glass-card">
  <button className="btn-primary">
    Click me
  </button>
</div>

// ❌ Classi custom in index.css
.glass-card {
  @apply bg-white/10 backdrop-blur-md;
}
```

**Perché?**
1. **Consistenza visiva**: Tutti i colori e stili sono espliciti e visibili nel componente
2. **Manutenibilità**: Non serve cercare in index.css per capire gli stili
3. **Nextra-style**: Design minimale senza layer di astrazione
4. **Debugging**: Più facile identificare problemi CSS
5. **Performance**: Tailwind JIT compila solo le classi usate

**Eccezioni ammesse**:
- Animazioni `@keyframes` (troppo verbose per inline)
- Reset CSS globale (in `index.css`)
- Utility per prose content (`.prose-compact`)

---

## 🎯 Design Philosophy

**Core Principles**:
1. **Simplicity with Purpose** - Every element serves a clear function
2. **Professional Elegance** - Enterprise-ready, polished aesthetic
3. **Clarity Over Decoration** - Information hierarchy is paramount
4. **Functional Beauty** - Design enhances usability, never hinders it

**Target Audience**:
- Tech-savvy developers and AI enthusiasts
- Professional learners seeking mastery
- Italian-speaking community (primary) with global expansion potential

**Mood**: Modern, trustworthy, empowering, tech-forward

---

## 🎨 Color Palette

### Primary Colors (Nextra-style)

```css
/* Dark Mode (Primary) - Nextra Inspired */
--color-bg-primary: #111827;        /* Main background - solid, no gradients */
--color-bg-secondary: #1e293b;      /* Card backgrounds with opacity */
--color-text-primary: #ffffff;      /* Primary text */
--color-text-secondary: rgba(255, 255, 255, 0.7);  /* Secondary text */
--color-text-tertiary: rgba(255, 255, 255, 0.4);   /* Tertiary text */

/* Border & Dividers */
--color-border-subtle: rgba(255, 255, 255, 0.05);  /* Very subtle borders */
--color-border-normal: rgba(255, 255, 255, 0.1);   /* Normal borders */
--color-border-emphasis: rgba(255, 255, 255, 0.2); /* Emphasis borders */

/* Accent Colors */
--color-accent-blue: #3b82f6;       /* Soft blue - primary CTAs */
--color-accent-cyan: #06b6d4;       /* Cyan - success states */
--color-accent-purple: #8b5cf6;     /* Purple - premium features */
--color-accent-orange: #f97316;     /* Orange - highlights (ClaudeCodeNinja brand) */
```

**Tailwind Equivalents**:
```tsx
// Background
bg-[#111827]                    // Main background
bg-white/5                      // Card background (5% opacity)
bg-white/10                     // Hover states (10% opacity)

// Text
text-white                      // Primary text
text-white/70                   // Secondary text
text-white/40                   // Tertiary text (metadata)

// Borders
border-white/5                  // Subtle dividers
border-white/10                 // Normal borders
border-white/20                 // Emphasis borders
```

### Semantic Colors

```css
/* State Colors */
--color-success: #10b981;           /* Green - completed states */
--color-warning: #f59e0b;           /* Amber - in-progress */
--color-error: #ef4444;             /* Red - errors/locked */
--color-info: #3b82f6;              /* Blue - informational */

/* Text Colors */
--color-text-primary: #0f172a;      /* Dark slate - headings */
--color-text-secondary: #64748b;    /* Slate - body text */
--color-text-tertiary: #94a3b8;     /* Light slate - metadata */
--color-text-inverse: #f8fafc;      /* Off-white - dark backgrounds */
```

### Gradients

```css
/* Hero Gradients */
--gradient-hero: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
--gradient-card: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
--gradient-badge: linear-gradient(90deg, #ffd89b 0%, #19547b 100%);

/* Subtle Overlays */
--gradient-overlay: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 100%);
```

---

## 🔤 Typography

### Font Families

```css
/* Primary Font */
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Monospace (Code) */
--font-code: 'Fira Code', 'JetBrains Mono', 'Courier New', monospace;

/* Display (Headings) */
--font-display: 'Inter', sans-serif; /* Use weight 700-900 for impact */
```

### Font Scales

```css
/* Desktop Scale */
--text-xs: 0.75rem;      /* 12px - captions, metadata */
--text-sm: 0.875rem;     /* 14px - small body text */
--text-base: 1rem;       /* 16px - body text */
--text-lg: 1.125rem;     /* 18px - large body */
--text-xl: 1.25rem;      /* 20px - small headings */
--text-2xl: 1.5rem;      /* 24px - h3 */
--text-3xl: 1.875rem;    /* 30px - h2 */
--text-4xl: 2.25rem;     /* 36px - h1 */
--text-5xl: 3rem;        /* 48px - hero headings */

/* Mobile Scale (reduce by 10-15%) */
--text-mobile-4xl: 2rem;  /* 32px - mobile hero */
--text-mobile-3xl: 1.5rem; /* 24px - mobile h1 */
```

### Font Weights

```css
--font-light: 300;
--font-regular: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-black: 900;
```

### Line Heights

```css
--leading-tight: 1.25;    /* Headings */
--leading-normal: 1.5;    /* Body text */
--leading-relaxed: 1.75;  /* Long-form content */
```

---

## 📐 Spacing & Layout

### Spacing Scale (Tailwind-based)

```css
--space-0: 0px;
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
```

### Container Widths

```css
--container-xs: 480px;    /* Mobile */
--container-sm: 640px;    /* Small tablets */
--container-md: 768px;    /* Tablets */
--container-lg: 1024px;   /* Desktops */
--container-xl: 1280px;   /* Wide desktops */
--container-2xl: 1536px;  /* Ultra-wide */
```

### Grid System

```css
/* Column Grid */
--grid-cols-mobile: 4;    /* 4 columns on mobile */
--grid-cols-tablet: 8;    /* 8 columns on tablet */
--grid-cols-desktop: 12;  /* 12 columns on desktop */

/* Gutter */
--grid-gap: 1.5rem;       /* 24px between columns */
```

---

## 🎭 UI Components

### Buttons

**Primary Button** (CTAs, main actions):
```css
background: var(--color-accent-blue);
color: white;
padding: 0.75rem 1.5rem; /* 12px 24px */
border-radius: 9999px; /* Fully rounded */
font-weight: 600;
transition: all 0.2s ease;
box-shadow: 0 4px 6px rgba(59, 130, 246, 0.25);

/* Hover */
background: #2563eb; /* Darker blue */
transform: translateY(-2px);
box-shadow: 0 6px 12px rgba(59, 130, 246, 0.35);
```

**Secondary Button** (Less emphasis):
```css
background: transparent;
color: var(--color-accent-blue);
border: 2px solid var(--color-accent-blue);
padding: 0.75rem 1.5rem;
border-radius: 9999px;
font-weight: 600;
transition: all 0.2s ease;

/* Hover */
background: var(--color-accent-blue);
color: white;
```

**Ghost Button** (Minimal):
```css
background: transparent;
color: var(--color-text-secondary);
padding: 0.5rem 1rem;
border-radius: 0.5rem;
font-weight: 500;

/* Hover */
background: rgba(59, 130, 246, 0.1);
color: var(--color-accent-blue);
```

---

### Cards

**Glass Card** (Primary style):
```css
background: rgba(255, 255, 255, 0.1);
backdrop-filter: blur(10px);
border: 1px solid rgba(255, 255, 255, 0.2);
border-radius: 1rem; /* 16px */
padding: 1.5rem; /* 24px */
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
transition: all 0.3s ease;

/* Hover */
transform: translateY(-4px);
box-shadow: 0 12px 48px rgba(0, 0, 0, 0.15);
border-color: rgba(255, 255, 255, 0.3);
```

**Solid Card** (Alternative):
```css
background: white;
border: 1px solid #e2e8f0;
border-radius: 1rem;
padding: 1.5rem;
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

/* Dark Mode */
background: #1e293b;
border-color: #334155;
```

**Featured Card** (Milestones, achievements):
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
color: white;
border-radius: 1rem;
padding: 2rem;
position: relative;
overflow: hidden;

/* Glow effect */
box-shadow: 0 0 40px rgba(102, 126, 234, 0.4);
```

---

### Badges

**XP Badge**:
```css
background: linear-gradient(90deg, #ffd89b 0%, #19547b 100%);
color: white;
padding: 0.25rem 0.75rem; /* 4px 12px */
border-radius: 9999px;
font-size: 0.875rem; /* 14px */
font-weight: 600;
display: inline-flex;
align-items: center;
gap: 0.25rem;
```

**Status Badge** (Locked/Unlocked/Completed):
```css
/* Locked */
background: rgba(239, 68, 68, 0.1);
color: #ef4444;
border: 1px solid rgba(239, 68, 68, 0.3);

/* Unlocked */
background: rgba(59, 130, 246, 0.1);
color: #3b82f6;
border: 1px solid rgba(59, 130, 246, 0.3);

/* Completed */
background: rgba(16, 185, 129, 0.1);
color: #10b981;
border: 1px solid rgba(16, 185, 129, 0.3);

/* Common styles */
padding: 0.25rem 0.5rem;
border-radius: 0.375rem;
font-size: 0.75rem;
font-weight: 600;
text-transform: uppercase;
letter-spacing: 0.05em;
```

---

### Progress Bars

**Linear Progress**:
```css
/* Container */
background: rgba(148, 163, 184, 0.2);
height: 0.5rem; /* 8px */
border-radius: 9999px;
overflow: hidden;

/* Fill */
background: linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%);
height: 100%;
border-radius: 9999px;
transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
```

**Circular Progress** (Badge unlock):
```css
/* Use SVG circle with stroke-dasharray animation */
stroke: url(#gradient); /* Gradient stroke */
stroke-width: 4;
stroke-linecap: round;
transform-origin: center;
transition: stroke-dashoffset 0.5s ease;
```

---

## 🎬 Animations & Transitions

### Timing Functions

```css
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-smooth: cubic-bezier(0.25, 0.1, 0.25, 1);
```

### Duration

```css
--duration-fast: 150ms;
--duration-normal: 250ms;
--duration-slow: 350ms;
--duration-slower: 500ms;
```

### Common Animations

**Fade In**:
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

animation: fadeIn 0.3s ease-out;
```

**Slide Up**:
```css
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

animation: slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
```

**Badge Glow** (Achievement unlock):
```css
@keyframes badgeGlow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(102, 126, 234, 0.4);
  }
  50% {
    box-shadow: 0 0 40px rgba(102, 126, 234, 0.8);
  }
}

animation: badgeGlow 2s ease-in-out infinite;
```

**Shimmer** (Loading state):
```css
@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

background: linear-gradient(
  90deg,
  rgba(255,255,255,0) 0%,
  rgba(255,255,255,0.3) 50%,
  rgba(255,255,255,0) 100%
);
background-size: 1000px 100%;
animation: shimmer 2s infinite;
```

---

## 📱 Responsive Design

### Breakpoints

```css
/* Mobile First Approach */
--breakpoint-sm: 640px;   /* Small tablets */
--breakpoint-md: 768px;   /* Tablets */
--breakpoint-lg: 1024px;  /* Desktops */
--breakpoint-xl: 1280px;  /* Wide desktops */
--breakpoint-2xl: 1536px; /* Ultra-wide */
```

### Responsive Patterns

**Container Padding**:
```css
/* Mobile */
padding: 1rem; /* 16px */

/* Tablet (md) */
@media (min-width: 768px) {
  padding: 2rem; /* 32px */
}

/* Desktop (lg) */
@media (min-width: 1024px) {
  padding: 3rem; /* 48px */
}
```

**Grid Layout**:
```css
/* Mobile: Stack vertically */
display: grid;
grid-template-columns: 1fr;
gap: 1rem;

/* Tablet: 2 columns */
@media (min-width: 768px) {
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

/* Desktop: 3 columns */
@media (min-width: 1024px) {
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}
```

---

## 🌗 Dark Mode

### Color Adjustments

```css
/* Light Mode (Default) */
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --text-primary: #0f172a;
}

/* Dark Mode */
@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: #0f172a;
    --bg-secondary: #1e293b;
    --text-primary: #f8fafc;
  }
}

/* Or toggle class */
.dark {
  --bg-primary: #0f172a;
  --bg-secondary: #1e293b;
  --text-primary: #f8fafc;
}
```

### Component Adjustments

**Cards in Dark Mode**:
```css
.dark .card {
  background: rgba(30, 41, 59, 0.5);
  border-color: rgba(148, 163, 184, 0.2);
}
```

**Buttons in Dark Mode**:
```css
.dark .button-secondary {
  border-color: rgba(255, 255, 255, 0.2);
  color: #f8fafc;
}
```

---

## 🖼️ Icons & Illustrations

### Icon Library

**Recommended**: [Lucide React](https://lucide.dev/) (already in use)

**Icon Sizes**:
```css
--icon-xs: 16px;
--icon-sm: 20px;
--icon-base: 24px;
--icon-lg: 32px;
--icon-xl: 48px;
```

**Icon Styles**:
- **Stroke width**: 2px (standard), 1.5px (light), 2.5px (bold)
- **Color**: Inherit from parent or use semantic colors
- **Hover**: Subtle scale (1.1x) or color shift

### Illustration Style

- **Minimalist**: Clean lines, limited colors
- **Isometric**: For 3D-like diagrams (optional)
- **Abstract shapes**: Gradients for backgrounds
- **No realistic photos**: Keep it vector-based

---

## ✅ Accessibility

### Contrast Ratios

```css
/* WCAG AA Compliance */
--contrast-normal: 4.5:1;  /* Body text minimum */
--contrast-large: 3:1;     /* Large text (18px+) minimum */

/* WCAG AAA (Target) */
--contrast-normal-aaa: 7:1;
--contrast-large-aaa: 4.5:1;
```

### Focus States

```css
/* Keyboard focus */
:focus-visible {
  outline: 2px solid var(--color-accent-blue);
  outline-offset: 2px;
  border-radius: 0.25rem;
}

/* Remove default outline */
:focus {
  outline: none;
}
```

### Screen Reader Support

```html
<!-- Hidden text for screen readers -->
<span class="sr-only">Milestone 1: Introduction to Claude Code</span>

<!-- ARIA labels -->
<button aria-label="Close dialog">
  <XIcon size={20} />
</button>
```

---

## 📦 Component Library Reference

### Tailwind CSS Classes (Currently Used)

**Common Utilities**:
```css
/* Glass Card Effect */
.glass-card {
  @apply bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl;
}

/* Shadow Glow */
.shadow-glow {
  @apply shadow-lg shadow-primary-500/20;
}

/* Badge Glow */
.badge-glow {
  @apply shadow-md shadow-accent-gold/40;
}
```

---

## 🎯 Design System Checklist

When designing a new component, ensure:

- [ ] **Color contrast** meets WCAG AA (4.5:1 for text)
- [ ] **Responsive** on mobile, tablet, desktop
- [ ] **Dark mode** variant designed
- [ ] **Hover/Focus states** defined
- [ ] **Loading states** considered
- [ ] **Error states** handled
- [ ] **Animations** are subtle (not distracting)
- [ ] **Accessibility**: keyboard navigation, screen readers
- [ ] **Spacing** follows 4px/8px grid system
- [ ] **Typography** uses defined scales

---

## 🚀 Motion.dev Animation Library

**Migration from Framer Motion**: We've upgraded to Motion.dev, the next-generation animation library with better performance and smaller bundle size.

### Installation

```bash
npm install motion
```

**Requirements**: React 18.2+

### Basic Usage

```tsx
import { motion } from "motion/react"

function Component() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    />
  )
}
```

### Common Animation Patterns

**Fade In + Slide Up** (Page entries):
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
>
  {content}
</motion.div>
```

**Hover Scale** (Interactive cards):
```tsx
<motion.div
  whileHover={{ scale: 1.02, y: -4 }}
  whileTap={{ scale: 0.98 }}
  transition={{ duration: 0.2 }}
>
  {content}
</motion.div>
```

**Staggered Children** (List animations):
```tsx
<motion.div>
  {items.map((item, index) => (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.05,
        duration: 0.3
      }}
    >
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

**Progress Bar Fill** (Animated progress):
```tsx
<motion.div
  className="progress-fill"
  initial={{ width: 0 }}
  animate={{ width: `${percentage}%` }}
  transition={{
    duration: 1,
    ease: [0.4, 0, 0.2, 1],
    delay: 0.2
  }}
/>
```

**Badge Unlock** (Achievement reveal):
```tsx
<motion.div
  initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
  animate={{ scale: 1, opacity: 1, rotate: 0 }}
  transition={{
    delay: 0.2,
    type: 'spring',
    stiffness: 200
  }}
>
  {badge}
</motion.div>
```

### Transition Timing

Use these easing functions for consistent motion:

```tsx
// Ease out (preferred for entries)
transition={{ ease: [0.4, 0, 0.2, 1] }}

// Ease in (for exits)
transition={{ ease: [0.4, 0, 1, 1] }}

// Spring (for playful interactions)
transition={{ type: 'spring', stiffness: 200 }}
```

### Performance Best Practices

1. **Use transform properties**: `x`, `y`, `scale`, `rotate` (GPU-accelerated)
2. **Avoid animating**: `width`, `height`, `top`, `left` (triggers layout)
3. **Limit simultaneous animations**: Max 3-4 complex animations at once
4. **Use `will-change` sparingly**: Only for critical animations

```tsx
// ✅ Good - GPU accelerated
<motion.div animate={{ x: 100, scale: 1.2 }} />

// ❌ Avoid - triggers layout reflow
<motion.div animate={{ width: 100, height: 100 }} />
```

### Motion.dev vs Framer Motion

**Advantages**:
- 🚀 **Smaller bundle size**: ~40% smaller than Framer Motion
- ⚡ **Better performance**: Hybrid engine (CSS + JavaScript)
- 🎯 **120fps animations**: Native browser animations where possible
- 📦 **Modern API**: Cleaner, more intuitive

**Migration**:
```tsx
// Old (Framer Motion)
import { motion } from 'framer-motion'

// New (Motion.dev)
import { motion } from 'motion/react'

// API is 100% compatible!
```

---

## 📚 Resources

### Design Tools
- **Figma**: For mockups and prototypes
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide Icons**: Icon library
- **Motion.dev**: Modern animation library (12M+ downloads/month)

### Inspiration Sources
- [AgentVoice.com](https://www.agentvoice.com/) - Primary inspiration
- [Vercel Design](https://vercel.com/design) - Modern SaaS aesthetic
- [Linear](https://linear.app/) - Clean, fast UI patterns
- [Stripe](https://stripe.com/) - Professional enterprise design

### Color Tools
- [Coolors](https://coolors.co/) - Color palette generator
- [Contrast Checker](https://webaim.org/resources/contrastchecker/) - WCAG compliance

---

## 🚀 Implementation Guidelines

### Adding New Components

1. **Define the component** in Figma or sketch
2. **Check this style guide** for colors, spacing, typography
3. **Implement in React** with TypeScript
4. **Use Tailwind utilities** (avoid custom CSS when possible)
5. **Add Framer Motion** for transitions (if needed)
6. **Test responsiveness** on mobile, tablet, desktop
7. **Verify accessibility** (keyboard nav, screen reader)
8. **Document in Storybook** (future phase)

### Modifying Existing Styles

1. **Read the component** to understand current implementation
2. **Check brand identity** (.claude/docs/brand-identity.md)
3. **Preserve consistency** with other components
4. **Test on all breakpoints**
5. **Update this guide** if introducing new patterns

---

## 🎨 Quick Reference

### Color Variables (CSS)

```css
:root {
  /* Primary */
  --primary-dark: #32373c;
  --primary-gray: #1e293b;
  --primary-light: #f8fafc;

  /* Accent */
  --accent-blue: #3b82f6;
  --accent-cyan: #06b6d4;
  --accent-purple: #8b5cf6;
  --accent-orange: #f97316;

  /* Semantic */
  --success: #10b981;
  --warning: #f59e0b;
  --error: #ef4444;
  --info: #3b82f6;
}
```

### Tailwind Config (Recommended Extensions)

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#32373c',
          gray: '#1e293b',
          light: '#f8fafc',
        },
        accent: {
          blue: '#3b82f6',
          cyan: '#06b6d4',
          purple: '#8b5cf6',
          orange: '#f97316',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'glow': '0 0 40px rgba(102, 126, 234, 0.4)',
      }
    }
  }
}
```

---

**Maintained by**: Agent Soo-yeon (Feature Coordinator)
**Version**: 1.0
**Last Review**: 2025-11-16
**Next Review**: When adding new component patterns or major redesigns
