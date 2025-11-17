# Testing Guidelines

## ✅ Manual Testing Checklist

Before deploying, verify:

### Milestone Display
- [ ] All 12 milestones appear on homepage
- [ ] Milestone 1 is always unlocked
- [ ] Milestones 2-12 are locked initially
- [ ] Completed milestones show checkmark/completion status

### Progress Tracking
- [ ] Completing a milestone updates XP
- [ ] Completing a milestone unlocks next milestone
- [ ] Progress persists after page refresh
- [ ] Progress bar updates correctly (X/12 milestones)
- [ ] Total XP calculation is correct

### Badge System
- [ ] Bronze badge unlocks at 600 XP (after milestone 4)
- [ ] Silver badge unlocks at 1500 XP (after milestone 8)
- [ ] Gold badge unlocks at 2500 XP (after milestone 12)
- [ ] Badge display shows locked/unlocked states
- [ ] Next badge preview is accurate

### Navigation
- [ ] Clicking unlocked milestone navigates to detail page
- [ ] Clicking locked milestone does nothing (or shows modal)
- [ ] Back button returns to homepage
- [ ] All React Router links work

### Responsive Design
- [ ] Mobile (375px): Cards stack vertically, readable text
- [ ] Tablet (768px): 2-column grid, all elements visible
- [ ] Desktop (1280px+): 3-column grid, optimal spacing

### LocalStorage
- [ ] Progress saves after completing milestone
- [ ] Progress loads on page refresh
- [ ] Reset progress works (localStorage.removeItem)
- [ ] No console errors related to storage

## 🔄 Testing Progress Reset

```javascript
// Open browser console (F12) and run:

// Reset all progress
localStorage.removeItem('claudecodeninja-progress');
location.reload();

// Set custom progress for testing
const customProgress = {
  completedMilestones: [1, 2, 3, 4, 5, 6, 7, 8],
  totalXP: 1500,
  badges: ['bronze', 'silver'],
  startedAt: new Date(),
  lastActivity: new Date(),
  currentMilestone: 9,
  quizScores: {}
};
localStorage.setItem('claudecodeninja-progress', JSON.stringify(customProgress));
location.reload();
```

## 🐛 Common Issues & Fixes

### Problem: Dates not serializing correctly
```typescript
// Fix: Convert to ISO strings
const saveProgress = (progress: UserProgress): void => {
  const serializable = {
    ...progress,
    startedAt: progress.startedAt.toISOString(),
    lastActivity: progress.lastActivity.toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(serializable));
};

const loadProgress = (): UserProgress => {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  return {
    ...data,
    startedAt: new Date(data.startedAt),
    lastActivity: new Date(data.lastActivity),
  };
};
```

### Problem: TypeScript parsing error with backticks
```typescript
// ❌ BAD: Unescaped backticks
description: `Use the command `npm install` to install`

// ✅ GOOD: Escaped backticks
description: `Use the command \`npm install\` to install`
```

### Problem: Progress not updating after completion
**Diagnostic checklist**:
1. Check browser console for errors
2. Verify LocalStorage key: `claudecodeninja-progress`
3. Check if `loadProgress()` returns valid object
4. Verify `saveProgress()` is called after completion
5. Test serialization/deserialization (Dates → strings)
6. Check if `completeMilestone()` updates correctly
7. Look for React rendering issues (missing keys, stale state)
