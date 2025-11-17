# Gamification System

## 🎮 Progress Tracking Architecture

```typescript
// Location: /Users/alekdob/Desktop/Dev/Personal/claudecodeninja/src/utils/progressTracking.ts

interface UserProgress {
  completedMilestones: number[];    // [1, 2, 3] = completed milestones 1-3
  totalXP: number;                  // Sum of XP from completed milestones
  badges: BadgeTier[];              // ['bronze', 'silver'] = unlocked badges
  startedAt: Date;                  // First interaction timestamp
  lastActivity: Date;               // Most recent interaction
  currentMilestone: number;         // Next milestone to unlock
  quizScores: Record<number, number>; // { 1: 8, 2: 10 } = quiz scores
}
```

## 🏅 Badge System Logic

```typescript
// Location: /Users/alekdob/Desktop/Dev/Personal/claudecodeninja/src/data/badges.ts

Bronze: 0-600 XP
  - Unlocks after: Milestones 1-4 completed
  - Title: "Claude Code Apprentice"
  - Emoji: 🥉

Silver: 600-1500 XP
  - Unlocks after: Milestones 5-8 completed
  - Title: "Claude Code Developer"
  - Emoji: 🥈

Gold: 1500-2500 XP
  - Unlocks after: Milestones 9-12 completed
  - Title: "Claude Code Expert"
  - Emoji: 🥇

Platinum: 2500+ XP
  - Unlocks after: All milestones + 3 coding projects
  - Title: "Claude Code Master"
  - Emoji: 💎
  - Includes: Digital certificate PDF
```

## 🔓 Milestone Unlock Rules

```typescript
// Milestone 1: Always unlocked (entry point)
// Milestone N: Requires Milestone N-1 completed

// Example:
// User completes Milestone 1 → Milestone 2 unlocks
// User completes Milestone 2 → Milestone 3 unlocks
// Cannot skip milestones

// Implementation in progressTracking.ts:
export const getMilestoneStatus = (milestoneId: number): 'locked' | 'in-progress' | 'completed' => {
  const progress = loadProgress();

  if (progress.completedMilestones.includes(milestoneId)) {
    return 'completed';
  }

  if (milestoneId === 1 || progress.completedMilestones.includes(milestoneId - 1)) {
    return 'in-progress';
  }

  return 'locked';
};
```

## 📊 XP Distribution

**Milestone XP Distribution**:
- Milestones 1-2: 100 XP each (basics)
- Milestones 3-4: 150 XP each (fundamentals)
- Milestones 5-6: 200 XP each (intermediate)
- Milestones 7-8: 250 XP each (advanced features)
- Milestones 9-10: 300 XP each (integrations)
- Milestones 11-12: 350-400 XP each (production)

**Total XP**: 2,750 points across all 12 milestones
