# ClaudeCodeNinja

Learning path gamificato per diventare Claude Code Master. Progetto creato interamente con Claude Code come showcase del prodotto!

## 🎯 Project Type

Interactive learning platform con gamification system.

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 3
- **Routing**: React Router v6
- **Animations**: Framer Motion
- **Markdown**: React Markdown + Remark GFM
- **Icons**: Lucide React
- **Storage**: LocalStorage (Supabase ready)

## 📁 Project Structure

```
claudecodeninja/
├── src/
│   ├── components/          # React components
│   │   ├── LearningPath/   # Milestone cards, progress tracking
│   │   ├── Gamification/   # Badges, achievements
│   │   └── ui/             # Reusable UI components
│   ├── pages/              # Route pages (Home, Milestone)
│   ├── data/               # Static data (milestones, badges)
│   ├── utils/              # Helper functions (progress tracking)
│   ├── types/              # TypeScript interfaces
│   └── assets/             # CSS, images
├── public/                 # Static files
│   ├── badges/            # Badge SVG assets
│   └── images/            # Other images
└── package.json
```

## 🎨 Code Style

- **Components**: Functional components with hooks only
- **TypeScript**: Strict mode enabled, no `any` types
- **Naming**: PascalCase for components, camelCase for functions/variables
- **Files**: One component per file, colocate related files
- **Imports**: Absolute imports via `@/` alias
- **CSS**: Tailwind utility-first, custom utilities in `assets/css/index.css`

## 🧩 Component Guidelines

### MilestoneCard
Shows individual milestone with:
- Status (locked/in-progress/completed)
- XP reward, estimated time, badge emoji
- Topics covered
- Click to navigate to detail page

### ProgressTracker
Displays:
- Progress bar (X/12 milestones)
- Total XP
- Current badge tier
- Next badge preview

### BadgeDisplay
Grid of all 4 badges:
- Bronze, Silver, Gold, Platinum
- Locked/unlocked states
- XP requirements

## 🎮 Gamification Logic

### Progress Tracking (LocalStorage)
```typescript
interface UserProgress {
  completedMilestones: number[]
  totalXP: number
  badges: BadgeTier[]
  startedAt: Date
  lastActivity: Date
  quizScores: Record<number, number>
}
```

### Badge Tiers
- Bronze: 0-600 XP (Milestones 1-4)
- Silver: 600-1500 XP (Milestones 5-8)
- Gold: 1500-2500 XP (Milestones 9-12)
- Platinum: 2500+ XP (All + projects)

### Milestone Unlock Logic
- Milestone 1 always unlocked
- Milestone N requires N-1 completed
- Sequential unlocking only

## 📝 Content Structure

Each milestone includes:
- `title` & `subtitle`
- `description` (Markdown formatted)
- `xp` reward
- `badge` emoji
- `estimatedTime`
- `topics` array
- `quiz` (optional)
- `challenge` (optional)

## 🎯 Development Workflow

### Add New Milestone
1. Add to `src/data/milestones.ts`
2. Include all required fields
3. Escape backticks in description: \`code\`
4. Test in dev server

### Modify Progress Tracking
1. Update types in `src/types/index.ts`
2. Update logic in `src/utils/progressTracking.ts`
3. Update UI components to reflect changes

### Add New Page
1. Create in `src/pages/`
2. Add route in `src/App.tsx`
3. Use existing layout patterns

## 🧪 Testing

No automated tests yet. Manual testing checklist:

- [ ] All milestones load correctly
- [ ] Progress tracking persists on refresh
- [ ] Locked milestones cannot be accessed
- [ ] Completing milestone updates XP and badges
- [ ] Navigation works between pages
- [ ] Responsive on mobile/tablet/desktop

## 🔧 Common Tasks

### Run Development Server
```bash
npm run dev
# Opens on http://localhost:3000
```

### Build for Production
```bash
npm run build
# Outputs to dist/
```

### Preview Production Build
```bash
npm run preview
```

### Reset Progress (for testing)
Open browser console:
```javascript
localStorage.removeItem('claudecodeninja-progress')
```

## 🚀 Future Enhancements

Planned features (not yet implemented):
- Supabase integration for user auth and sync
- Quiz functionality with score tracking
- Coding challenges with validation
- Certificate PDF generation
- English i18n version
- Dark/light theme toggle
- Social sharing for badges

## 🎨 Brand Colors

```css
--primary: #FF6B35     /* Ninja Orange - Action & Energy */
--secondary: #004E89   /* Deep Blue - Professional */
--accent: #F7931E      /* Gold - Achievements */
--success: #00D9FF     /* Cyan - Progress */
--dark: #1A1A2E        /* Dark background */
--light: #F8F9FA       /* Light background */
```

## 🐛 Known Issues

None yet! Report any bugs you find.

## 📦 Dependencies

Key dependencies and their purpose:
- `react-router-dom`: Client-side routing
- `framer-motion`: Smooth animations
- `react-markdown`: Render milestone content
- `lucide-react`: Icon library
- `@supabase/supabase-js`: Future auth/sync (not active yet)

## 🤝 Contributing

This project is a showcase of AI-first development.

When working on this project:
1. Keep component structure simple and readable
2. Maintain gamification integrity (don't allow cheating!)
3. Add new milestones following existing patterns
4. Test progress tracking thoroughly
5. Keep markdown content well-formatted

## 📄 License

MIT - Created by Alek Dobrohotov with Claude Code
