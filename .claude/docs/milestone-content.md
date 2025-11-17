# Milestone Content Structure

## 📝 Required Fields

Every milestone in `/Users/alekdob/Desktop/Dev/Personal/claudecodeninja/src/data/milestones/milestone-{XX}-{slug}.ts` must include:

```typescript
{
  id: number;              // Unique ID (1-12)
  title: string;           // Short title (e.g., "Getting Started")
  subtitle: string;        // One-sentence description
  description: string;     // Full Markdown content (escaped backticks!)
  xp: number;             // XP reward (100-400)
  badge: string;          // Emoji representing the milestone
  estimatedTime: string;  // "30 minuti", "1 ora", etc.
  topics: string[];       // List of topics covered
  quiz?: {                // Optional quiz
    questions: QuizQuestion[];
  };
  challenge?: {           // Optional coding challenge
    title: string;
    description: string;
    starterCode?: string;
    solution?: string;
  };
}
```

## 🔤 Markdown Formatting Rules

**CRITICAL**: Backticks must be escaped in TypeScript template strings:

```typescript
// ✅ GOOD: Escaped backticks
description: `
## Installazione

Usa il comando \`npm install\` per installare Claude Code.
`

// ❌ BAD: Unescaped backticks (will break TypeScript parsing)
description: `
## Installazione

Usa il comando `npm install` per installare Claude Code.
`
```

**Why**: Template strings in TypeScript interpret backticks as nested templates, causing syntax errors.

## 📋 Content Template

**NEW (Jan 2025)**: Use separate files for each milestone following 300-line rule.

### File Structure
Create: `/src/data/milestones/milestone-05-custom-commands.ts`

```typescript
import { Milestone } from '../../types';

export const milestone05: Milestone = {
  id: 5,
  title: "Custom Commands",
  subtitle: "Crea comandi personalizzati per automazioni ripetitive",
  description: `
# Milestone 5: Custom Commands

I Custom Commands in Claude Code ti permettono di...

## Perché usare Custom Commands?
- Automazione di task ripetitivi
- Condivisione di workflow nel team
- ...

## Come creare un Custom Command
\`\`\`bash
mkdir .claude/commands
touch .claude/commands/my-command.md
\`\`\`

[Rest of content...]
  `,
  xp: 200,
  badge: "⚡",
  estimatedTime: "1 ora",
  topics: ["Slash Commands", "Automazione", "Markdown", ".claude folder"],
  quiz: {
    questions: [
      {
        question: "Dove vanno salvati i Custom Commands?",
        options: [
          ".claude/commands/",
          ".claude/skills/",
          "commands/",
          ".claude/"
        ],
        correctAnswer: 0
      }
    ]
  }
};
```

### Add to Aggregator
Update `/src/data/milestones/index.ts`:

```typescript
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

## 🎯 The 12 Milestones

| # | Title | Topics | XP | Badge |
|---|-------|--------|----|----|
| 1 | Getting Started | Installazione, API Key, Verifica | 100 | 🚀 |
| 2 | Core CLI Commands | claude, -p, -c, -r | 100 | ⌨️ |
| 3 | Permission System | Ask/Allow/Reject | 150 | 🔐 |
| 4 | Settings & CLAUDE.md | Gerarchia, Structure | 150 | 📝 |
| 5 | Custom Commands | Slash commands, Automation | 200 | ⚡ |
| 6 | Subagents | Agent creation, Delegation | 200 | 🤖 |
| 7 | MCP Integration | GitHub, Context7, Brave | 250 | 🔌 |
| 8 | Hooks & Skills | Lifecycle, Agent Skills | 250 | 🎣 |
| 9 | SDKs & Automation | Python/TS SDK | 300 | 🛠️ |
| 10 | GitHub Actions | CI/CD, PR reviews | 300 | 🔄 |
| 11 | Advanced Features | Checkpoints, Sandboxing | 350 | 🚀 |
| 12 | Production & Scale | Cloud, Networks, Policies | 400 | 💎 |

**Status**:
- ✅ Milestones 1-4 complete with full Italian content (refactored into separate files Jan 2025)
- ⏳ Milestones 5-12 pending (use content-enricher agent)

## 🤖 Using Content Enricher Agent

**NEW (Jan 2025)**: Use the specialized `content-enricher` agent to generate milestone content from Kindle notes, PDFs, or books.

### Workflow:
1. Prepare source material (Kindle highlights, PDF, raw text)
2. Invoke content-enricher agent: `Task tool → subagent_type: "content-enricher"`
3. Provide milestone number and source content
4. Agent generates complete TypeScript file
5. Agent adds export to index.ts
6. Test with `npm run dev`

### What the Agent Does:
- Reads and structures content into 3-5 chapters
- Generates 3-5 quiz questions per milestone
- Creates practical coding challenges
- Ensures 300-line limit compliance
- Outputs ready-to-use TypeScript file
- Updates aggregator automatically

**Location**: `.claude/agents/content-enricher.md`
