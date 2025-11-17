# Brand Identity

## 🎨 Color Palette

```css
/* Primary - Ninja Orange */
--color-primary: #FF6B35;
--color-primary-hover: #E85A2A;
--color-primary-light: #FFA07A;

/* Secondary - Deep Blue */
--color-secondary: #004E89;
--color-secondary-hover: #003D6B;
--color-secondary-light: #006BB8;

/* Accent - Gold */
--color-accent: #F7931E;
--color-accent-hover: #E8820D;
--color-accent-light: #FFB84D;

/* Success - Cyan */
--color-success: #00D9FF;
--color-success-hover: #00C4E8;
--color-success-light: #4DE8FF;

/* Neutrals */
--color-dark: #1A1A2E;
--color-light: #F8F9FA;
--color-gray: #6C757D;
```

## 🔤 Typography

```css
/* Headings */
font-family: 'Inter', sans-serif;
font-weight: 700; /* Bold for H1, H2 */
font-weight: 600; /* Semibold for H3 */

/* Body */
font-family: 'Inter', sans-serif;
font-weight: 400; /* Regular */
line-height: 1.6;

/* Code */
font-family: 'Fira Code', monospace;
```

## ✨ Custom Utilities

```css
/* Glass card effect */
.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

/* Glow effect for hover */
.hover\:shadow-glow:hover {
  box-shadow: 0 0 20px rgba(255, 107, 53, 0.5);
}

/* Badge glow */
.badge-glow {
  box-shadow: 0 0 30px rgba(247, 147, 30, 0.6);
}
```

## 🎯 Brand Voice

- **Friendly & Approachable**: Use "tu" in Italian, casual but professional
- **Empowering**: Focus on what users will achieve, not what they lack
- **Action-Oriented**: Use verbs, encourage doing
- **Clear & Concise**: No jargon unless explained

**Example**:
- ❌ "L'utente dovrebbe implementare il pattern di delegation per ottimizzare..."
- ✅ "Usa i subagent per delegare task complessi e risparmiare tempo!"
