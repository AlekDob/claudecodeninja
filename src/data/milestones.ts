import { Milestone } from '../types';

export const milestones: Milestone[] = [
  {
    id: 1,
    title: "Getting Started",
    subtitle: "Installa Claude Code, setup autenticazione e verifica installazione",
    description: `
# Milestone 1: Getting Started

Benvenuto nel tuo percorso per diventare Claude Code Master! 🚀

In questa prima milestone imparerai:

## Prerequisiti
- Node.js 18+ installato
- Git configurato
- Un account Anthropic con API key
- Visual Studio Code (consigliato) o editor preferito

## Installazione

\`\`\`bash
# Installa Claude Code globalmente
npm install -g @anthropic-ai/claude-code

# Oppure usa Homebrew (macOS)
brew install claude-code
\`\`\`

## Configurazione API Key

1. Ottieni la tua API key da: https://console.anthropic.com/settings/keys
2. Configura l'autenticazione:

\`\`\`bash
claude auth
\`\`\`

3. Segui il prompt interattivo per inserire la tua API key

## Verifica Installazione

Testa che tutto funzioni correttamente:

\`\`\`bash
# Verifica versione
claude --version

# Test comando base
claude "Hello, sono pronto per imparare!"
\`\`\`

Se vedi la risposta di Claude, sei pronto per partire! ✅

## Prossimi Passi

Una volta completata l'installazione, passa alla Milestone 2 per imparare i comandi CLI essenziali.
    `,
    xp: 100,
    badge: "🚀 Starter",
    estimatedTime: "30 minuti",
    topics: ["Installazione", "Prerequisiti", "API Key", "Configurazione"],
    quiz: {
      questions: [
        {
          id: "m1-q1",
          question: "Qual è il comando per installare Claude Code globalmente?",
          options: [
            "npm install claude-code",
            "npm install -g @anthropic-ai/claude-code",
            "brew install anthropic",
            "npx install claude"
          ],
          correctAnswer: 1,
          explanation: "Il comando corretto è `npm install -g @anthropic-ai/claude-code` per installazione globale via npm."
        },
        {
          id: "m1-q2",
          question: "Dove si ottiene l'API key di Claude Code?",
          options: [
            "GitHub Settings",
            "OpenAI Dashboard",
            "Anthropic Console",
            "VS Code Extensions"
          ],
          correctAnswer: 2,
          explanation: "L'API key si ottiene dal Console di Anthropic: https://console.anthropic.com/settings/keys"
        },
        {
          id: "m1-q3",
          question: "Come si configura l'autenticazione dopo aver installato Claude Code?",
          options: [
            "claude setup",
            "claude auth",
            "claude config",
            "claude login"
          ],
          correctAnswer: 1,
          explanation: "Il comando `claude auth` avvia il processo interattivo di configurazione dell'API key."
        }
      ]
    },
    challenge: {
      title: "Completa la tua Prima Interazione",
      description: "Testa la tua installazione con un prompt personalizzato",
      instructions: [
        "Apri il terminale nel tuo ambiente di lavoro",
        "Esegui il comando: `claude \"Spiegami in 3 punti cosa posso fare con Claude Code\"`",
        "Leggi la risposta e rifletti sulle possibilità"
      ],
      verificationSteps: [
        "✅ Hai ricevuto una risposta completa da Claude",
        "✅ Non ci sono errori di autenticazione",
        "✅ Hai capito le potenzialità di Claude Code"
      ]
    }
  },
  {
    id: 2,
    title: "Core CLI Commands",
    subtitle: "Master i comandi essenziali: claude, -p, -c, -r",
    description: `
# Milestone 2: Core CLI Commands

Ora che hai installato Claude Code, è tempo di imparare i comandi fondamentali! ⌨️

## Il Comando Base

\`\`\`bash
# Sintassi base
claude [prompt]

# Esempio
claude "Crea una funzione TypeScript per validare email"
\`\`\`

## Flag Essenziali

### -p (--project)
Lavora nel contesto di un progetto esistente:

\`\`\`bash
# Analizza il progetto nella directory corrente
claude -p "Analizza l'architettura di questo progetto"

# Claude leggerà automaticamente file rilevanti
claude -p "Aggiungi validazione input al form di login"
\`\`\`

### -c (--continue)
Continua la conversazione precedente:

\`\`\`bash
# Prima richiesta
claude "Crea un componente React Button"

# Continua senza ripetere contesto
claude -c "Ora aggiungi varianti primary e secondary"
claude -c "Fallo responsive per mobile"
\`\`\`

### -r (--review)
Modalità review per code review e feedback:

\`\`\`bash
# Review di un file specifico
claude -r "Rivedi src/components/Button.tsx"

# Review di modifiche recenti
claude -r "Controlla le ultime modifiche per bug potenziali"
\`\`\`

## Combinare i Flag

\`\`\`bash
# Project mode + Continue
claude -p "Inizia refactoring auth service"
claude -c -p "Continua con i test"

# Review + Project
claude -r -p "Rivedi tutto il modulo di autenticazione"
\`\`\`

## Best Practices

1. **Usa -p** quando Claude deve avere contesto dell'intero progetto
2. **Usa -c** per conversazioni iterative lunghe
3. **Usa -r** quando vuoi feedback costruttivo sul codice
4. **Combina** i flag quando ha senso per il tuo workflow

## Esempi Pratici

\`\`\`bash
# Sviluppo feature completa
claude -p "Crea sistema di autenticazione JWT"
claude -c "Aggiungi refresh token"
claude -c "Implementa logout sicuro"
claude -r "Review completo della feature auth"
\`\`\`

Padroneggiare questi comandi ti rende 10x più produttivo! 🚀
    `,
    xp: 100,
    badge: "⌨️ CLI Master",
    estimatedTime: "45 minuti",
    topics: ["CLI Commands", "Flags", "Project Mode", "Continue", "Review"],
    quiz: {
      questions: [
        {
          id: "m2-q1",
          question: "Quale flag usi per lavorare nel contesto di un intero progetto?",
          options: ["-c", "-r", "-p", "-a"],
          correctAnswer: 2,
          explanation: "Il flag -p (--project) dice a Claude Code di analizzare e lavorare nel contesto dell'intero progetto."
        },
        {
          id: "m2-q2",
          question: "Come continui una conversazione esistente senza ripetere il contesto?",
          options: [
            "claude --next",
            "claude -c",
            "claude -continue",
            "claude ->"
          ],
          correctAnswer: 1,
          explanation: "Il flag -c (--continue) permette di continuare la conversazione precedente mantenendo il contesto."
        }
      ]
    },
    challenge: {
      title: "Master dei Comandi CLI",
      description: "Usa tutti i comandi base in una sessione di sviluppo",
      instructions: [
        "Crea una cartella test-cli-mastery",
        "Usa `claude -p` per creare un mini progetto (es: TODO app)",
        "Usa `claude -c` per iterare e migliorare",
        "Usa `claude -r` per fare review del risultato"
      ],
      verificationSteps: [
        "✅ Hai usato almeno 3 comandi diversi",
        "✅ Hai capito quando usare ogni flag",
        "✅ Hai un mini progetto funzionante"
      ]
    }
  },
  {
    id: 3,
    title: "Permission System",
    subtitle: "Comprendi Ask/Allow/Reject e gestisci il tool approval workflow",
    description: `
# Milestone 3: Permission System

La sicurezza è fondamentale. Impara a gestire il sistema di permessi di Claude Code! 🔐

## I Tre Stati

### Ask (Default)
Claude chiede conferma prima di ogni azione:

\`\`\`bash
> Creating file src/utils/helper.ts
  Allow? (y/n):
\`\`\`

### Allow
Permetti azioni specifiche o tutte:

\`\`\`bash
# Allow per tutte le operazioni di file write
claude --allow write

# Allow per tutto (use with caution!)
claude --allow all
\`\`\`

### Reject
Rifiuta automaticamente certe operazioni:

\`\`\`bash
# Blocca modifiche a file di configurazione
claude --reject "*.config.js"

# Blocca operazioni di delete
claude --reject delete
\`\`\`

## Tool Approval Workflow

Claude Code ha accesso a questi tool:
- **Read**: Leggere file
- **Write**: Creare/modificare file
- **Bash**: Eseguire comandi shell
- **Edit**: Modificare file esistenti
- **Glob**: Cercare file per pattern

## Best Practices Sicurezza

### ✅ DO:
- Usa Ask mode per progetti nuovi o sensibili
- Allow solo per operazioni ripetitive sicure
- Rivedi sempre i comandi Bash prima di approvarli
- Usa Reject per proteggere file critici

### ❌ DON'T:
- Mai usare \`--allow all\` su progetti production
- Non approvare comandi Bash che non capisci
- Non disabilitare permessi per velocizzare se non sei sicuro

## Configurazione Permissions

Puoi configurare default nel CLAUDE.md:

\`\`\`markdown
## Permissions

- Allow: Read, Write (solo src/)
- Ask: Bash, Edit
- Reject: Delete, *.env
\`\`\`

## Esempi Pratici

\`\`\`bash
# Development sicuro
claude -p "Refactoring componenti" --allow write --reject "*.config.*"

# Review mode (solo lettura)
claude -r "Analizza il codice" --allow read --reject write

# Automation (trusted script)
claude --allow all "Run migration script"
\`\`\`

## Recovery da Errori

Se Claude fa qualcosa di inaspettato:

\`\`\`bash
# Annulla modifiche
git reset --hard HEAD

# Review ultimo commit Claude
git diff HEAD~1

# Reject per future sessioni
echo "*.config.js" >> .claudeignore
\`\`\`

Ricorda: **Trust, but verify!** 🛡️
    `,
    xp: 150,
    badge: "🔐 Permission Pro",
    estimatedTime: "1 ora",
    topics: ["Permissions", "Security", "Ask/Allow/Reject", "Tool Approval", "Best Practices"]
  },
  {
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
  },
  // Milestone 5-12 saranno generate nelle prossime iterazioni
];
