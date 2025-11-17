import { Milestone } from '../../types';

export const milestone04: Milestone = {
  id: 4,
  title: "Settings & CLAUDE.md",
  subtitle: "Setup gerarchia settings, struttura CLAUDE.md e folder organization",
  description: `
# Milestone 4: Settings & CLAUDE.md

Il file CLAUDE.md è il cuore del tuo progetto. Impara a configurarlo correttamente! 📝

## Gerarchia Settings

Claude Code legge settings in questo ordine (priorità crescente):

1. **Global** (~/.claude/config.md)
2. **Project** (./CLAUDE.md)
3. **Directory** (./folder/CLAUDE.md)
4. **Inline** (flag CLI)

## Struttura CLAUDE.md Consigliata

\`\`\`markdown
# Project Name

Brief description of the project

## Tech Stack

- Framework: React 18 + TypeScript
- Styling: Tailwind CSS
- State: Zustand
- Build: Vite

## Project Structure

\`\`\`
src/
├── components/     # React components
├── hooks/          # Custom hooks
├── utils/          # Helper functions
├── types/          # TypeScript types
└── assets/         # Static assets
\`\`\`

## Code Style

- Use functional components with hooks
- Prefer TypeScript strict mode
- Follow Airbnb style guide
- Components in PascalCase
- Utils in camelCase

## Testing

- Framework: Vitest
- Components: Testing Library
- Run: \`npm test\`

## Permissions

- Allow: Read, Write (src/ only)
- Ask: Bash, Delete
- Reject: *.env, *.config.js

## Context

This is a learning management platform with gamification...
\`\`\`

## Sezioni Essenziali

### 1. Overview
Chi, cosa, perché del progetto

### 2. Tech Stack
Tecnologie, framework, librerie

### 3. Structure
Organizzazione cartelle e file

### 4. Code Style
Convenzioni, best practices

### 5. Permissions
Regole di sicurezza

### 6. Context
Background importante

## Directory CLAUDE.md

Per sotto-cartelle complesse:

\`\`\`markdown
# src/components/

React components following atomic design

## Conventions

- One component per file
- Colocate styles and tests
- Export from index.ts

## Structure

- atoms/      # Base components
- molecules/  # Composite components
- organisms/  # Complex components
\`\`\`

## Best Practices

✅ **Mantieni sincronizzato** - Aggiorna CLAUDE.md quando cambia architettura
✅ **Sii specifico** - Più dettagli = migliori risultati
✅ **Documenta decisioni** - Spiega il perché, non solo il cosa
✅ **Usa examples** - Mostra pattern con codice vero

❌ **Evita vago** - "Usa best practices" è inutile
❌ **Non duplicare** - Non ripetere info nel codice
❌ **Non obsoleto** - CLAUDE.md vecchio è peggio di niente

## Template Starter

\`\`\`bash
# Generate CLAUDE.md template
claude "Create comprehensive CLAUDE.md for React + TypeScript project"
\`\`\`

Un buon CLAUDE.md ti fa risparmiare ore di context! 🎯
  `,
  xp: 150,
  badge: "📝 Architect",
  estimatedTime: "1 ora 30 minuti",
  topics: ["CLAUDE.md", "Settings", "Project Structure", "Best Practices", "Documentation"]
};
