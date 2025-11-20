import { Milestone } from '../../types';

export const milestone03: Milestone = {
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
# Allow solo strumenti specifici (Write, Edit, Bash, Read, Glob)
claude --allowed-tools Write

# Oppure con alias camelCase
claude --allowedTools "Write,Edit"

# Bypass completo permessi (solo in sandbox!)
claude --dangerously-skip-permissions
\`\`\`

### Reject
Blocca automaticamente determinati strumenti:

\`\`\`bash
# Blocca operazioni di Bash (comandi shell)
claude --disallowed-tools Bash

# Oppure con alias camelCase
claude --disallowedTools "Write,Bash"
\`\`\`

### Permission Mode
Modalità di gestione permessi:

\`\`\`bash
# Accetta automaticamente Edit (modifica file)
claude --permission-mode acceptEdits

# Bypass tutti i permessi (come dangerously-skip-permissions)
claude --permission-mode bypassPermissions

# Default: chiede conferma per ogni azione
claude --permission-mode default

# Plan mode: modalità pianificazione (solo analisi, no modifiche)
claude --permission-mode plan
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
- Usa Ask mode (default) per progetti nuovi o sensibili
- Usa \`--allowed-tools\` solo per operazioni ripetitive sicure
- Rivedi sempre i comandi Bash prima di approvarli
- Usa \`--disallowed-tools Bash\` per proteggere da esecuzioni shell pericolose
- Usa \`--permission-mode plan\` per analisi senza modifiche

### ❌ DON'T:
- Mai usare \`--dangerously-skip-permissions\` su progetti production
- Non approvare comandi Bash che non capisci
- Non usare \`--permission-mode bypassPermissions\` se non sei sicuro

## Configurazione Permissions

### Nel file \`.claude/settings.json\`:

\`\`\`json
{
  "ignorePatterns": [
    "*.env",
    "*.config.js",
    ".git/**",
    "node_modules/**"
  ]
}
\`\`\`

### Nel CLAUDE.md (documentazione progetto):

\`\`\`markdown
## Permissions

### Default Settings
- Ask: Bash, Edit (richiedi conferma per shell e modifiche)
- Allow: Read, Glob (sempre consentiti)
- Reject via ignorePatterns: \`.env\`, config files

### Recommended Flags
- Development: \`claude --allowed-tools "Read,Write,Edit,Glob"\`
- Review: \`claude --permission-mode plan\`
- Automation: \`claude --allowedTools "Read,Bash" --disallowedTools "Write"\`
\`\`\`

## Esempi Pratici

\`\`\`bash
# Development sicuro (solo Write/Edit, no Bash)
claude --allowed-tools "Write,Edit" --disallowed-tools "Bash" "Refactoring componenti"

# Review mode (solo analisi, no modifiche)
claude --permission-mode plan "Analizza il codice per bug"

# Automation (trusted script con Bash)
claude --allowedTools "Read,Bash" "Run migration script"

# Print mode con permessi (output non-interattivo)
claude --print --allowed-tools "Read" "Genera report coverage"

# Continue con protezioni
claude -c --disallowedTools "Write,Bash" "Continua analisi"
\`\`\`

## Recovery da Errori

Se Claude fa qualcosa di inaspettato:

\`\`\`bash
# Annulla modifiche con git
git reset --hard HEAD

# Review ultimo commit Claude
git diff HEAD~1

# Aggiungi pattern da ignorare in .claude/settings.json
# (NON esiste .claudeignore!)
\`\`\`

### Configurare Ignore Patterns

Edita \`.claude/settings.json\`:

\`\`\`json
{
  "ignorePatterns": [
    "*.config.js",
    "*.env",
    "package-lock.json",
    "dist/**",
    ".git/**"
  ]
}
\`\`\`

💡 **Nota**: Claude Code rispetta automaticamente \`.gitignore\`, ma \`ignorePatterns\` aggiunge ulteriori protezioni specifiche per Claude.

Ricorda: **Trust, but verify!** 🛡️
  `,
  xp: 150,
  badge: "🔐 Permission Pro",
  estimatedTime: "40 minuti",
  topics: ["Permissions", "Security", "Ask/Allow/Reject", "Tool Approval", "Best Practices"],
  quiz: {
    questions: [
      {
        id: "m3-q1",
        question: "Quale flag usi per permettere SOLO le operazioni di Write e Edit?",
        options: [
          "claude --allow write,edit",
          "claude --allowed-tools \"Write,Edit\"",
          "claude --permit \"Write,Edit\"",
          "claude --enable-tools Write Edit"
        ],
        correctAnswer: 1,
        explanation: "Il flag corretto è --allowed-tools (o alias --allowedTools) seguito dai nomi dei tool separati da virgola. I nomi tool sono PascalCase: Write, Edit, Bash, Read, Glob."
      },
      {
        id: "m3-q2",
        question: "Come blocchi l'esecuzione di comandi shell (Bash) per sicurezza?",
        options: [
          "claude --reject bash",
          "claude --no-bash",
          "claude --disallowed-tools Bash",
          "claude --block-shell"
        ],
        correctAnswer: 2,
        explanation: "Il flag --disallowed-tools Bash (o alias --disallowedTools) blocca l'uso dello strumento Bash, impedendo l'esecuzione di comandi shell."
      },
      {
        id: "m3-q3",
        question: "Quale modalità usi per fare SOLO analisi senza modificare file?",
        options: [
          "claude --read-only",
          "claude --permission-mode plan",
          "claude --review-mode",
          "claude --no-write"
        ],
        correctAnswer: 1,
        explanation: "Il flag --permission-mode plan abilita la modalità pianificazione, che permette solo analisi senza modifiche ai file. Ideale per code review e analisi."
      },
      {
        id: "m3-q4",
        question: "Dove configuri i pattern di file da ignorare per Claude Code?",
        options: [
          "Nel file .claudeignore",
          "Nel file .gitignore",
          "Nel file .claude/settings.json sotto ignorePatterns",
          "Tramite flag --ignore"
        ],
        correctAnswer: 2,
        explanation: "I pattern da ignorare vanno in .claude/settings.json sotto la chiave ignorePatterns. Il file .claudeignore NON esiste ufficialmente. Claude rispetta anche .gitignore automaticamente."
      },
      {
        id: "m3-q5",
        question: "Quale flag bypassa TUTTI i permessi (da usare solo in sandbox)?",
        options: [
          "claude --skip-all",
          "claude --permission-mode bypassPermissions",
          "claude --dangerously-skip-permissions",
          "Entrambe b e c sono corrette"
        ],
        correctAnswer: 3,
        explanation: "Sia --permission-mode bypassPermissions che --dangerously-skip-permissions bypassano tutti i controlli di permessi. Usare SOLO in ambiente sandbox senza accesso internet!"
      }
    ]
  },
  challenge: {
    title: "Permission Pro Challenge",
    description: "Configura permessi granulari per proteggere un progetto",
    instructions: [
      "Crea una cartella test-permissions e cd dentro",
      "Crea un file .claude/settings.json con ignorePatterns per .env e *.config.js",
      "Usa `claude --permission-mode plan \"Analizza questo progetto\"` per analisi sicura",
      "Usa `claude --allowed-tools \"Read,Write\" --disallowed-tools \"Bash\" \"Crea un README.md\"` per permettere solo file operations",
      "Prova `claude --print --allowedTools Read \"Conta righe di codice\" > report.txt` per output automatico",
      "Verifica che Bash sia bloccato tentando un comando shell"
    ],
    verificationSteps: [
      "✅ Hai creato .claude/settings.json con ignorePatterns",
      "✅ Hai usato --permission-mode plan per analisi",
      "✅ Hai usato --allowed-tools e --disallowed-tools",
      "✅ Hai verificato che Bash sia bloccato",
      "✅ Hai capito quando usare ogni modalità di permessi"
    ]
  }
};
