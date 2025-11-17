# ClaudeCodeNinja Documentation

This directory contains the detailed project documentation, organized following the **300-line rule** from the Medium article on CLAUDE.md best practices.

## 📚 Documentation Structure

Instead of a single massive CLAUDE.md file (1000+ lines), documentation is split into focused, digestible files:

| File | Purpose | Lines | Key Topics |
|------|---------|-------|------------|
| **[file-organization.md](./file-organization.md)** | Project structure & organization laws | ~150 | 4 laws (20-line, 300-line, Domain, Name), absolute paths, file tree |
| **[code-style.md](./code-style.md)** | Code standards & conventions | ~100 | TypeScript rules, React patterns, Tailwind, naming, comments |
| **[gamification-system.md](./gamification-system.md)** | Gamification architecture | ~80 | UserProgress, badge logic, unlock rules, XP distribution |
| **[milestone-content.md](./milestone-content.md)** | Content creation guidelines | ~120 | Required fields, markdown rules, template, 12 milestones roadmap |
| **[development-workflow.md](./development-workflow.md)** | Development procedures | ~130 | Adding milestones, modifying tracking, adding pages, commands |
| **[testing-guidelines.md](./testing-guidelines.md)** | Testing procedures | ~110 | Manual checklist, progress reset, common issues & fixes |
| **[ai-agent-instructions.md](./ai-agent-instructions.md)** | AI development guidelines | ~90 | When to add content, when to debug, templates, next steps |
| **[brand-identity.md](./brand-identity.md)** | Design system | ~60 | Color palette, typography, utilities, brand voice |
| **[deployment.md](./deployment.md)** | Deployment guide | ~70 | Vercel setup, optimizations, security, analytics |

**Total**: ~910 lines split across 9 focused files (vs 1000+ line monolith)

## 🎯 How to Use This Documentation

### For Human Developers
Start with the main **[CLAUDE.md](../../CLAUDE.md)** in the project root. It provides:
- Quick overview
- Tech stack summary
- Links to all detailed docs
- Quick start guide

Then navigate to specific topics as needed using the index.

### For AI Agents
1. **Always read the main CLAUDE.md first** for context
2. **Follow the links** to detailed docs for specific questions
3. **Read multiple docs** if the task spans topics (e.g., adding content requires both `milestone-content.md` and `code-style.md`)

### When to Read Each File

**Before adding milestones 5-12:**
- Read: `milestone-content.md`, `code-style.md`, `ai-agent-instructions.md`
- Reference: existing milestones in `/src/data/milestones.ts`

**Before debugging progress tracking:**
- Read: `testing-guidelines.md`, `gamification-system.md`
- Check: browser console, LocalStorage

**Before refactoring file structure:**
- Read: `file-organization.md`
- Verify: doesn't violate the 4 laws

**Before deploying:**
- Read: `deployment.md`, `testing-guidelines.md`
- Run: full manual testing checklist

**Before changing design:**
- Read: `brand-identity.md`
- Verify: stays consistent with color palette and brand voice

## 📖 Documentation Philosophy

This structure follows principles from the Medium article "CLAUDE.md Setup Guide":

1. **The 300-Line Rule**: No file over 300 lines. Split by topic, not by arbitrary line count.
2. **The Domain Rule**: Organize by feature/domain, not by technical type.
3. **The Name Rule**: Use clear, descriptive filenames that explain the content.
4. **Progressive Disclosure**: Main CLAUDE.md gives overview, detailed docs provide depth.

## 🔄 Keeping Documentation Updated

When making changes to the project:

1. **Update the relevant doc file**, not CLAUDE.md
2. **Update CLAUDE.md** only if you change:
   - Tech stack
   - Project purpose
   - Overall structure
3. **Update this README** if you add/remove doc files

## 🚀 Future Additions

Planned documentation files (when needed):

- `supabase-integration.md` - When adding Phase 2 user auth
- `quiz-system.md` - When implementing interactive quizzes
- `challenge-validation.md` - When adding coding challenge verification
- `i18n-strategy.md` - When adding English translation
- `analytics-tracking.md` - When implementing PostHog/Plausible

---

**Last Updated**: 2025-11-16
**Maintained By**: Claude Code (Agent Soo-yeon)
