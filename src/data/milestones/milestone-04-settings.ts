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
  estimatedTime: "1 ora",
  topics: ["CLAUDE.md", "Settings", "Project Structure", "Best Practices", "Documentation"],
  quiz: {
    questions: [
      {
        id: "m4-q1",
        question: "Qual è l'ordine di priorità con cui Claude Code legge le impostazioni (dalla più bassa alla più alta)?",
        options: [
          "Inline → Directory → Project → Global",
          "Global → Project → Directory → Inline",
          "Project → Global → Inline → Directory",
          "Directory → Project → Global → Inline"
        ],
        correctAnswer: 1,
        explanation: "Claude Code legge le impostazioni in ordine crescente di priorità: Global (~/.claude/config.md) → Project (./CLAUDE.md) → Directory (./folder/CLAUDE.md) → Inline (flag CLI). Le impostazioni successive sovrascrivono quelle precedenti."
      },
      {
        id: "m4-q2",
        question: "Quali sono le 6 sezioni essenziali di un CLAUDE.md ben strutturato?",
        options: [
          "Header, Body, Footer, Sidebar, Navigation, Footer",
          "Overview, Tech Stack, Structure, Code Style, Permissions, Context",
          "Introduction, Setup, Configuration, Usage, Examples, Troubleshooting",
          "Title, Description, Installation, Commands, Options, Help"
        ],
        correctAnswer: 1,
        explanation: "Le 6 sezioni essenziali sono: 1) Overview (chi, cosa, perché), 2) Tech Stack (tecnologie usate), 3) Structure (organizzazione cartelle), 4) Code Style (convenzioni), 5) Permissions (regole di sicurezza), 6) Context (background importante)."
      },
      {
        id: "m4-q3",
        question: "Dove dovresti creare un CLAUDE.md specifico per una sotto-cartella complessa?",
        options: [
          "Nel file CLAUDE.md principale del progetto (root)",
          "Direttamente nella sotto-cartella stessa (es: ./src/components/CLAUDE.md)",
          "Nel file .claude/settings.json",
          "Non è possibile creare CLAUDE.md per sotto-cartelle"
        ],
        correctAnswer: 1,
        explanation: "Per sotto-cartelle complesse, puoi creare un CLAUDE.md specifico direttamente nella cartella (es: ./src/components/CLAUDE.md). Questo fornisce contesto specifico per quella parte del progetto e sovrascrive (con priorità maggiore) il CLAUDE.md di root."
      },
      {
        id: "m4-q4",
        question: "Quale di queste è una best practice per mantenere CLAUDE.md efficace?",
        options: [
          "Scrivere frasi generiche come 'Usa best practices' per dare libertà a Claude",
          "Duplicare tutte le informazioni già presenti nei commenti del codice",
          "Mantenere CLAUDE.md sincronizzato con l'architettura e documentare le decisioni (il perché)",
          "Creare CLAUDE.md una sola volta e non aggiornarlo mai"
        ],
        correctAnswer: 2,
        explanation: "Le best practices includono: 1) Mantieni sincronizzato - aggiorna quando cambia architettura, 2) Sii specifico - più dettagli = migliori risultati, 3) Documenta decisioni - spiega il perché, non solo il cosa, 4) Usa esempi - mostra pattern con codice reale."
      },
      {
        id: "m4-q5",
        question: "Cosa succede se hai impostazioni conflittuali in CLAUDE.md (root) e in un flag CLI --allowed-tools?",
        options: [
          "Claude Code genera un errore e si ferma",
          "Viene usata l'impostazione del CLAUDE.md (priorità maggiore)",
          "Viene usata l'impostazione del flag CLI (priorità maggiore)",
          "Claude Code chiede all'utente quale usare"
        ],
        correctAnswer: 2,
        explanation: "I flag CLI (Inline) hanno la priorità più alta nella gerarchia settings. Quindi se specifichi --allowed-tools nella CLI, questa impostazione sovrascrive tutto ciò che è definito in CLAUDE.md, directory CLAUDE.md o global config."
      }
    ]
  },
  challenge: {
    title: "CLAUDE.md Architect Challenge",
    description: "Struttura un progetto completo con CLAUDE.md multi-livello",
    instructions: [
      "Crea una cartella test-claude-md-setup e cd dentro",
      "Crea un file CLAUDE.md nella root con tutte le 6 sezioni essenziali (Overview, Tech Stack, Structure, Code Style, Permissions, Context)",
      "Crea una sotto-cartella src/components/ e un CLAUDE.md specifico per i componenti con convenzioni di naming e struttura",
      "Crea un file .claude/settings.json con ignorePatterns per node_modules e .env",
      "Usa `claude \"Analizza la struttura del progetto\"` per verificare che Claude legga correttamente il contesto",
      "Modifica il CLAUDE.md di root aggiungendo una nuova sezione e riprova il comando per vedere come Claude risponde diversamente"
    ],
    verificationSteps: [
      "✅ Hai creato CLAUDE.md nella root con 6 sezioni essenziali",
      "✅ Hai creato CLAUDE.md specifico in src/components/",
      "✅ Hai configurato .claude/settings.json con ignorePatterns",
      "✅ Hai verificato che Claude legga il contesto correttamente",
      "✅ Hai testato come le modifiche a CLAUDE.md influenzano le risposte di Claude"
    ]
  }
};
