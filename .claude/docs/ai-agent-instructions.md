# AI Agent Instructions

## 📝 When Asked to Add Content

**Scenario**: "Add milestone 5 about Custom Commands"

**Your workflow**:
1. Read existing milestones 1-4 to understand pattern
2. Create milestone 5 following same structure
3. Research Claude Code Custom Commands if needed
4. Write Italian content with escaped backticks
5. Include quiz questions (3-5 questions)
6. Add to milestones array
7. Test in dev server
8. Verify unlock logic works

**Template for AI**:
```typescript
{
  id: 5,
  title: "[Feature Name]",
  subtitle: "[One-line description in Italian]",
  description: `
# Milestone 5: [Title]

## Introduzione
[2-3 paragraphs explaining the concept]

## Perché è importante?
- [Reason 1]
- [Reason 2]
- [Reason 3]

## Come funziona
\`\`\`bash
[Code example with escaped backticks]
\`\`\`

## Esercizio Pratico
[Step-by-step tutorial]

## Best Practices
- [Practice 1]
- [Practice 2]

## Risorse
- [Link 1]
- [Link 2]
  `,
  xp: 200,
  badge: "⚡",
  estimatedTime: "1 ora",
  topics: ["Topic1", "Topic2", "Topic3"],
  quiz: {
    questions: [
      {
        question: "[Question in Italian]",
        options: ["[Option A]", "[Option B]", "[Option C]", "[Option D]"],
        correctAnswer: 0
      }
    ]
  }
}
```

## 🐛 When Asked to Debug

**Scenario**: "The progress tracking isn't working"

**Your diagnostic checklist**:
1. Check browser console for errors
2. Verify LocalStorage key: `claudecodeninja-progress`
3. Check if `loadProgress()` returns valid object
4. Verify `saveProgress()` is called after completion
5. Test serialization/deserialization (Dates → strings)
6. Check if `completeMilestone()` updates correctly
7. Look for React rendering issues (missing keys, stale state)

**Common fixes**: See [testing-guidelines.md](.claude/docs/testing-guidelines.md) for detailed solutions.

## 🎯 Next Steps for AI

**Pending tasks**:
1. Generate milestones 5-12 following the same pattern as 1-4
2. Implement quiz functionality with score tracking
3. Add coding challenge validation
4. Create certificate PDF generation
5. Setup Supabase for user authentication
6. Add English translation (i18n)

**When adding new milestones**:
- Follow XP distribution: 5-6 (200 XP), 7-8 (250 XP), 9-10 (300 XP), 11-12 (350-400 XP)
- Use Italian language for content
- Escape backticks in markdown: \`code\`
- Include quiz with 3-5 questions
- Add coding challenge when appropriate
- Test unlock logic after each addition
