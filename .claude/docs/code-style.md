# Code Style & Conventions

## 🎨 TypeScript Rules

```typescript
// ✅ GOOD: Strict typing with interfaces
interface Milestone {
  id: number;
  title: string;
  xp: number;
  // ...
}

// ❌ BAD: Using any
const milestone: any = { ... };

// ✅ GOOD: Explicit return types
export const loadProgress = (): UserProgress => {
  // ...
};

// ❌ BAD: Implicit return
export const loadProgress = () => {
  // TypeScript infers, but not explicit
};
```

## ⚛️ React Component Rules

```tsx
// ✅ GOOD: Functional component with typed props
interface MilestoneCardProps {
  milestone: Milestone;
  onClick: () => void;
}

export const MilestoneCard = ({ milestone, onClick }: MilestoneCardProps) => {
  // Component logic
};

// ❌ BAD: Class component
export class MilestoneCard extends React.Component { ... }

// ❌ BAD: No prop typing
export const MilestoneCard = ({ milestone, onClick }) => { ... };
```

## 🎨 Tailwind CSS Guidelines

```tsx
// ✅ GOOD: Utility-first with custom utilities
<div className="glass-card p-6 rounded-xl hover:shadow-glow">

// ✅ GOOD: Conditional classes with template literals
<div className={`milestone-card ${isLocked ? 'opacity-50' : 'cursor-pointer'}`}>

// ❌ BAD: Inline styles
<div style={{ padding: '24px', borderRadius: '12px' }}>

// ❌ BAD: Custom CSS modules
<div className={styles.milestoneCard}>
```

## 📛 Naming Conventions

```typescript
// Components: PascalCase
MilestoneCard.tsx
ProgressTracker.tsx
BadgeDisplay.tsx

// Functions/variables: camelCase
loadProgress()
completeMilestone()
getCurrentBadge()

// Constants: UPPER_SNAKE_CASE
const MAX_MILESTONES = 12;
const STORAGE_KEY = 'claudecodeninja-progress';

// Types/Interfaces: PascalCase
interface UserProgress { }
type BadgeTier = 'bronze' | 'silver' | 'gold' | 'platinum';
```

## 💬 Code Comments

**When to comment**:
```typescript
// ✅ GOOD: Complex logic needs explanation
// Calculate badge tier based on total XP
// Bronze: 0-600, Silver: 600-1500, Gold: 1500-2500, Platinum: 2500+
export const getCurrentBadge = (totalXP: number): BadgeTier => {
  if (totalXP >= 2500) return 'platinum';
  if (totalXP >= 1500) return 'gold';
  if (totalXP >= 600) return 'silver';
  return 'bronze';
};

// ❌ BAD: Obvious code doesn't need comments
// This function adds two numbers
const add = (a: number, b: number) => a + b;
```

**Component documentation**:
```tsx
/**
 * MilestoneCard - Displays a single milestone with status, XP, and topics
 *
 * @param milestone - The milestone object to display
 * @param onClick - Callback when card is clicked (only for unlocked milestones)
 *
 * Status states:
 * - locked: Milestone not yet available (greyed out, no interaction)
 * - in-progress: Milestone available but not completed (clickable)
 * - completed: Milestone finished (shows checkmark, still clickable)
 */
export const MilestoneCard = ({ milestone, onClick }: MilestoneCardProps) => {
  // Component implementation
};
```
