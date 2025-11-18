# 🎯 Quiz System Documentation

**Created**: 2025-11-17
**Status**: ✅ Implemented and Working
**Owner**: Agent Lars (Product Manager)

---

## 📋 Overview

The quiz system validates milestone completion by requiring users to correctly answer at least **80% of questions** (typically 4 out of 5) before unlocking the next milestone.

## 🎨 Architecture

### Component Structure

```
QuizModal (Main Container)
├── QuizProgress (Progress bar & counter)
├── QuizQuestion (Individual question display)
└── QuizResults (Final score & actions)
```

### File Locations

```
src/components/LearningPath/
├── QuizModal.tsx       (~250 lines) - Main orchestrator
├── QuizQuestion.tsx    (~90 lines)  - Single question UI
├── QuizProgress.tsx    (~30 lines)  - Progress indicator
└── QuizResults.tsx     (~120 lines) - Results display
```

---

## 🔧 How It Works

### User Flow

1. **Read Milestone Content** → User studies the milestone material
2. **Click "Completa Milestone"** → Opens quiz modal (if quiz exists)
3. **Answer Questions** → 5 questions, one at a time
4. **See Immediate Feedback** → After each answer, see if correct + explanation
5. **View Final Results** → Score percentage and pass/fail status
6. **Outcomes**:
   - **Pass (≥80%)** → Milestone completed, XP awarded, next milestone unlocked
   - **Fail (<80%)** → Option to retry quiz or study more

### Technical Flow

```typescript
// 1. User clicks complete button
handleComplete() {
  if (milestone.quiz) {
    setIsQuizOpen(true);  // Opens quiz modal
  }
}

// 2. User completes quiz
handleQuizComplete(scorePercentage) {
  completeMilestone(milestoneId, xp, scorePercentage);
  // Only completes if scorePercentage >= 80%
}

// 3. Progress tracking validates
completeMilestone(id, xp, quizScore?) {
  if (quizScore < 80) return; // Blocked!
  // Otherwise proceed with completion
}
```

---

## 📊 Data Structure

### Quiz Interface

```typescript
interface Quiz {
  questions: QuizQuestion[];
}

interface QuizQuestion {
  id: string;                // Unique identifier (e.g., "m1-q1")
  question: string;          // Question text
  options: string[];         // Array of 4 options
  correctAnswer: number;     // Index of correct option (0-3)
  explanation: string;       // Shown after user answers
}
```

### Example Quiz Data

```typescript
quiz: {
  questions: [
    {
      id: "m1-q1",
      question: "Qual è la versione minima di Node.js richiesta per Claude Code?",
      options: [
        "Node.js 16.0.0",
        "Node.js 18.0.0",  // ← Correct (index 1)
        "Node.js 20.0.0",
        "Node.js 14.0.0"
      ],
      correctAnswer: 1,
      explanation: "Claude Code richiede Node.js 18.0.0+ per compatibilità..."
    }
    // ... 4 more questions
  ]
}
```

---

## 🎨 UI/UX Features

### QuizModal
- **Fullscreen overlay** with dark backdrop
- **Sticky header** with progress bar
- **Smooth animations** with Motion.dev
- **Keyboard navigation** support (ESC to close)
- **Mobile responsive** layout

### QuizQuestion
- **Radio button style** options
- **Immediate visual feedback**:
  - ✅ Green border + checkmark for correct
  - ❌ Red border + X for wrong
  - 💡 Explanation box after answer
- **Disabled state** after answering (prevents changing)

### QuizProgress
- **Visual progress bar** (gradient blue → cyan)
- **Counter text**: "Domanda 2 di 5"
- **Percentage display**: Real-time progress

### QuizResults
- **Pass state (≥80%)**:
  - 🏆 Trophy icon
  - Green color scheme
  - "Completa Milestone" button
- **Fail state (<80%)**:
  - 🔄 Retry icon
  - Amber/yellow color scheme
  - "Riprova Quiz" button
  - Encouragement message

---

## 🔐 Validation Logic

### 80% Threshold

```typescript
// Milestone 1-4: 5 questions each
// Required correct: 5 * 0.8 = 4 questions

const passed = (correctAnswers / totalQuestions) >= 0.8;
```

### Prevention of Progression

The `completeMilestone()` function has built-in validation:

```typescript
export const completeMilestone = (
  milestoneId: number,
  xp: number,
  quizScore?: number
): void => {
  // Validate quiz score if provided
  if (quizScore !== undefined && quizScore < 80) {
    console.warn(`Quiz score ${quizScore}% is below 80% threshold.`);
    return; // BLOCKS completion!
  }

  // Only proceeds if quizScore >= 80 or no quiz
  // ...
};
```

---

## 💾 Data Persistence

### LocalStorage Tracking

```typescript
interface UserProgress {
  completedMilestones: number[];       // [1, 2, 3]
  quizScores: Record<number, number>;  // { 1: 100, 2: 80, 3: 100 }
  totalXP: number;
  // ...
}
```

### Quiz Scores Storage

- **Key**: `claudecodeninja-progress`
- **Format**: JSON with `quizScores` object
- **Example**:
  ```json
  {
    "completedMilestones": [1, 2],
    "quizScores": {
      "1": 100,
      "2": 80
    },
    "totalXP": 200
  }
  ```

---

## 🚀 Adding New Quiz Questions

### Step 1: Define Quiz in Milestone Data

```typescript
// src/data/milestones/milestone-XX-slug.ts
export const milestoneXX: Milestone = {
  id: XX,
  title: "...",
  // ... other fields
  quiz: {
    questions: [
      {
        id: "mXX-q1",
        question: "Your question here?",
        options: [
          "Option A",
          "Option B",
          "Option C (correct)",
          "Option D"
        ],
        correctAnswer: 2,  // Index of correct option
        explanation: "Explanation why C is correct..."
      }
      // Add 4-5 more questions
    ]
  }
};
```

### Best Practices for Quiz Questions

✅ **DO**:
- Write clear, unambiguous questions
- Ensure exactly ONE correct answer
- Provide helpful explanations
- Cover key concepts from milestone
- Mix difficulty levels (easy/medium/hard)

❌ **DON'T**:
- Use trick questions
- Make options too similar
- Require memorization of exact syntax
- Test trivial details

---

## 🎯 Current Status

### Milestones with Quizzes

- ✅ **Milestone 1** - 5 questions (Basics, Installation, CLI)
- ✅ **Milestone 2** - 5 questions (Core CLI, File Management)
- ✅ **Milestone 3** - 5 questions (Permissions, Security)
- ✅ **Milestone 4** - 5 questions (Settings, Configuration)
- ⏳ **Milestone 5-12** - Pending (ready for content-enricher)

### Features Completed

- ✅ Quiz modal with navigation
- ✅ Immediate feedback per question
- ✅ 80% validation threshold
- ✅ Progress bar and counter
- ✅ Results screen with retry
- ✅ LocalStorage persistence
- ✅ Dark/light mode support
- ✅ Mobile responsive
- ✅ Smooth animations

### Future Enhancements

- ⏳ Timer for quiz (optional gamification)
- ⏳ Quiz statistics dashboard
- ⏳ Badge for perfect scores (100%)
- ⏳ Leaderboard (requires Supabase)

---

## 🐛 Troubleshooting

### Quiz Not Showing

**Issue**: Click "Completa Milestone" but no quiz appears

**Solutions**:
1. Check milestone data has `quiz` field defined
2. Verify `quiz.questions` has at least 1 question
3. Check browser console for errors
4. Ensure `QuizModal` is imported in `MilestonePage.tsx`

### Can't Progress Despite 80%+

**Issue**: Scored 80% or higher but milestone not completing

**Solutions**:
1. Check `progressTracking.ts` validation logic
2. Verify `quizScore` is passed as percentage (0-100), not decimal (0-1)
3. Clear localStorage and retry: `localStorage.removeItem('claudecodeninja-progress')`
4. Check browser console for warnings

### Questions Not Displaying Correctly

**Issue**: Options rendering incorrectly or feedback not showing

**Solutions**:
1. Verify `correctAnswer` index matches options array (0-based)
2. Check for malformed markdown in question text
3. Ensure `explanation` field is not empty
4. Test in different browsers

---

## 📚 Related Documentation

- [Gamification System](.claude/docs/gamification-system.md) - XP and badges
- [Milestone Content](.claude/docs/milestone-content.md) - Content structure
- [Development Workflow](.claude/docs/development-workflow.md) - Adding features
- [Testing Guidelines](.claude/docs/testing-guidelines.md) - Testing procedures

---

**Last Updated**: 2025-11-17
**Implemented By**: Agent Lars (Product Manager)
**Status**: ✅ Production Ready
