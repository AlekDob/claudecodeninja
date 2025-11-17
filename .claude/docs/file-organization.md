# File Organization Laws

## 📋 The Four Laws

### 1. The 20-Line Rule
**Files under 20 lines don't need folder nesting.**

✅ **Good**:
```
/Users/alekdob/Desktop/Dev/Personal/claudecodeninja/src/types/index.ts
```

❌ **Bad**:
```
/Users/alekdob/Desktop/Dev/Personal/claudecodeninja/src/types/milestone/index.ts
```

**Why**: Interfaces are simple, no need for complexity.

### 2. The 300-Line Rule
**Files over 300 lines should be broken into feature folders.**

✅ **Good** (when `milestones.ts` grows to include all 12):
```
/Users/alekdob/Desktop/Dev/Personal/claudecodeninja/src/data/milestones/
├── index.ts           # Re-exports all milestones
├── beginner.ts        # Milestones 1-4
├── intermediate.ts    # Milestones 5-8
└── advanced.ts        # Milestones 9-12
```

❌ **Bad**:
```
/Users/alekdob/Desktop/Dev/Personal/claudecodeninja/src/data/milestones.ts  # 1200 lines
```

**Current Status**: `milestones.ts` is ~400 lines (4 milestones). When 5-12 are added, split it.

### 3. The Domain Rule
**Organize by feature/domain, not by technical type.**

✅ **Good**:
```
/Users/alekdob/Desktop/Dev/Personal/claudecodeninja/src/components/LearningPath/
├── MilestoneCard.tsx
├── ProgressTracker.tsx
└── MilestoneList.tsx  # Future component
```

❌ **Bad**:
```
/Users/alekdob/Desktop/Dev/Personal/claudecodeninja/src/components/
├── cards/
│   └── MilestoneCard.tsx
├── trackers/
│   └── ProgressTracker.tsx
└── lists/
    └── MilestoneList.tsx
```

**Why**: Features change together. "LearningPath" is a coherent domain.

### 4. The Name Rule
**Absolute paths > Relative paths. No `../../../` hell.**

✅ **Good**:
```typescript
import { MilestoneCard } from '@/components/LearningPath/MilestoneCard';
import { milestones } from '@/data/milestones';
import type { UserProgress } from '@/types';
```

❌ **Bad**:
```typescript
import { MilestoneCard } from '../../../components/LearningPath/MilestoneCard';
import { milestones } from '../../data/milestones';
```

**Configuration**: `@/` alias configured in `vite.config.ts`:
```typescript
resolve: {
  alias: {
    '@': '/Users/alekdob/Desktop/Dev/Personal/claudecodeninja/src',
  },
}
```

## 📂 Complete File Structure

```
/Users/alekdob/Desktop/Dev/Personal/claudecodeninja/
├── src/
│   ├── components/
│   │   ├── LearningPath/
│   │   │   ├── MilestoneCard.tsx           # Individual milestone display
│   │   │   └── ProgressTracker.tsx         # Dashboard with XP/badges
│   │   ├── Gamification/
│   │   │   └── BadgeDisplay.tsx            # Badge collection grid
│   │   └── ui/                             # Future reusable components
│   ├── pages/
│   │   ├── HomePage.tsx                    # Landing with all milestones
│   │   └── MilestonePage.tsx               # Individual milestone detail
│   ├── data/
│   │   ├── milestones.ts                   # Milestone content (1-4 done, 5-12 pending)
│   │   └── badges.ts                       # Badge tier configuration
│   ├── utils/
│   │   └── progressTracking.ts             # LocalStorage persistence logic
│   ├── types/
│   │   └── index.ts                        # TypeScript interfaces
│   ├── assets/
│   │   └── css/
│   │       └── index.css                   # Tailwind + custom utilities
│   ├── App.tsx                             # React Router setup
│   └── main.tsx                            # Application entry
├── public/
│   ├── badges/                             # Badge SVG assets (to be added)
│   └── images/                             # Static images
├── .claude/
│   └── docs/                               # Documentation files
├── package.json                            # Dependencies (Node 18 compatible)
├── vite.config.ts                          # Vite configuration with @ alias
├── tailwind.config.js                      # Brand colors and custom utilities
├── tsconfig.json                           # TypeScript strict mode
├── README.md                               # User documentation
└── CLAUDE.md                               # This file - Agent documentation
```
