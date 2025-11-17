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

✅ **Good** (IMPLEMENTED - Current structure):
```
/Users/alekdob/Desktop/Dev/Personal/claudecodeninja/src/data/milestones/
├── index.ts                          # Exports aggregator (16 lines)
├── milestone-01-getting-started.ts   # Milestone 1 (73 lines)
├── milestone-02-core-cli.ts          # Milestone 2 (105 lines)
├── milestone-03-permissions.ts       # Milestone 3 (86 lines)
├── milestone-04-settings.ts          # Milestone 4 (96 lines)
└── milestone-{05-12}-*.ts            # Future milestones (pending)
```

❌ **Bad**:
```
/Users/alekdob/Desktop/Dev/Personal/claudecodeninja/src/data/milestones.ts  # 1200 lines
```

**Current Status**: ✅ Milestones 1-4 refactored into separate files (Jan 2025). Each file under 300 lines. Milestones 5-12 will follow same pattern when created by content-enricher agent.

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
│   │   ├── milestones.ts                   # Re-exports from milestones/
│   │   ├── milestones/
│   │   │   ├── index.ts                    # Aggregator
│   │   │   ├── milestone-01-getting-started.ts
│   │   │   ├── milestone-02-core-cli.ts
│   │   │   ├── milestone-03-permissions.ts
│   │   │   ├── milestone-04-settings.ts
│   │   │   └── milestone-{05-12}-*.ts      # Future (pending)
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
