# Development Workflow

## ➕ Adding a New Milestone

### Method 1: Using Content Enricher Agent (RECOMMENDED)

**Best for**: Creating content-rich milestones from external sources (Kindle, PDFs, books)

1. **Prepare source material**:
   - Kindle highlights export
   - PDF content
   - Raw text notes

2. **Invoke content-enricher agent**:
   ```
   Use Task tool with subagent_type: "content-enricher"
   ```

3. **Provide to agent**:
   - Milestone number (5-12)
   - Source content
   - Specific focus areas (optional)

4. **Agent outputs**:
   - Complete milestone file: `/src/data/milestones/milestone-{XX}-{slug}.ts`
   - Updated aggregator: `/src/data/milestones/index.ts`

5. **Test in dev server**:
   ```bash
   npm run dev
   # Check http://localhost:3000/
   # Verify milestone appears in list
   # Test unlock logic
   ```

### Method 2: Manual Creation

**Best for**: Quick additions or updates to existing milestones

1. **Create milestone file**:
   ```bash
   # File location:
   /Users/alekdob/Desktop/Dev/Personal/claudecodeninja/src/data/milestones/milestone-05-custom-commands.ts
   ```

2. **Write milestone object**:
   ```typescript
   import { Milestone } from '../../types';

   export const milestone05: Milestone = {
     id: 5,
     title: "Your Title",
     subtitle: "Your subtitle",
     description: `Your Markdown content with \`escaped backticks\``,
     xp: 200,
     badge: "⚡",
     estimatedTime: "1 ora",
     topics: ["Topic1", "Topic2"],
   };
   ```

3. **Update aggregator**:
   ```typescript
   // File: /src/data/milestones/index.ts
   export { milestone05 } from './milestone-05-custom-commands';

   import { milestone05 } from './milestone-05-custom-commands';

   export const milestones: Milestone[] = [
     milestone01,
     milestone02,
     milestone03,
     milestone04,
     milestone05,  // Add here
   ];
   ```

4. **Test in dev server**:
   ```bash
   npm run dev
   # Verify milestone appears and unlocks correctly
   ```

### Verification Checklist
After adding any milestone:
- [ ] Milestone appears in list on HomePage
- [ ] Unlock logic works (sequential progression)
- [ ] XP calculation correct
- [ ] Badge unlocks at right threshold
- [ ] Quiz questions display (if present)
- [ ] Code examples render properly
- [ ] All backticks escaped in code blocks

## 🔧 Modifying Progress Tracking

If you need to change how progress is stored:

1. **Update TypeScript interface**:
   ```typescript
   // File: /Users/alekdob/Desktop/Dev/Personal/claudecodeninja/src/types/index.ts

   export interface UserProgress {
     completedMilestones: number[];
     totalXP: number;
     // Add new field:
     streakDays?: number;  // Example: track daily streaks
   }
   ```

2. **Update utility functions**:
   ```typescript
   // File: /Users/alekdob/Desktop/Dev/Personal/claudecodeninja/src/utils/progressTracking.ts

   export const loadProgress = (): UserProgress => {
     const defaultProgress: UserProgress = {
       completedMilestones: [],
       totalXP: 0,
       badges: [],
       startedAt: new Date(),
       lastActivity: new Date(),
       currentMilestone: 1,
       quizScores: {},
       streakDays: 0,  // Initialize new field
     };
     // ...
   };
   ```

3. **Update UI components**:
   ```tsx
   // File: /Users/alekdob/Desktop/Dev/Personal/claudecodeninja/src/components/LearningPath/ProgressTracker.tsx

   const progress = loadProgress();

   return (
     <div>
       <p>Streak: {progress.streakDays} giorni 🔥</p>
       {/* Rest of component */}
     </div>
   );
   ```

## 📄 Adding a New Page

1. **Create page component**:
   ```tsx
   // File: /Users/alekdob/Desktop/Dev/Personal/claudecodeninja/src/pages/CertificatePage.tsx

   export const CertificatePage = () => {
     return (
       <div className="container mx-auto px-4 py-8">
         <h1>Your Certificate</h1>
         {/* Certificate content */}
       </div>
     );
   };
   ```

2. **Add route**:
   ```tsx
   // File: /Users/alekdob/Desktop/Dev/Personal/claudecodeninja/src/App.tsx

   import { CertificatePage } from './pages/CertificatePage';

   function App() {
     return (
       <Router>
         <Routes>
           <Route path="/" element={<HomePage />} />
           <Route path="/milestone/:id" element={<MilestonePage />} />
           <Route path="/certificate" element={<CertificatePage />} />
         </Routes>
       </Router>
     );
   }
   ```

3. **Add navigation link**:
   ```tsx
   // In ProgressTracker or other component:
   import { Link } from 'react-router-dom';

   <Link to="/certificate" className="btn-primary">
     View Certificate
   </Link>
   ```

## 🔧 Common Commands

```bash
# Start development server
npm run dev
# → http://localhost:3000/

# Build for production
npm run build
# → Outputs to /Users/alekdob/Desktop/Dev/Personal/claudecodeninja/dist/

# Preview production build locally
npm run preview

# Type checking (no build)
npx tsc --noEmit

# Lint code (when ESLint configured)
npm run lint

# Format code (when Prettier configured)
npm run format
```
