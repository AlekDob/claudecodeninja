import { Milestone } from '../../types';

export const milestone02: Milestone = {
  id: 2,
  title: "Core CLI Commands",
  subtitle: "Master i comandi essenziali: claude, -p, -c, -r, checkpoints",
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

### -p (--print)
Modalità **print mode** per scripting e piping - stampa l'output e esce:

\`\`\`bash
# Stampa risposta e esce (utile per script)
claude -p "Genera un UUID random"

# Piping con altri comandi
claude -p "Converti questo JSON in CSV" < data.json > output.csv

# Automation in script bash
RESULT=\$(claude -p "Calcola checksum di questi file" @*.js)
echo \$RESULT
\`\`\`

💡 **Quando usarlo:**
- Script automation (Bash, CI/CD)
- Output da processare con altri tool
- Evita modalità interattiva

⚠️ **Nota**: Il contesto di progetto viene dalla **directory corrente** dove lanci \`claude\`, non da un flag specifico. Claude legge automaticamente:
- File \`CLAUDE.md\` nella root del progetto
- Configurazione in \`.claude/settings.json\`
- File referenziati con \`@\` (es. \`@src/**/*.ts\`)

### -c (--continue)
Continua la conversazione precedente:

\`\`\`bash
# Prima richiesta
claude "Crea un componente React Button"

# Continua senza ripetere contesto
claude -c "Ora aggiungi varianti primary e secondary"
claude -c "Fallo responsive per mobile"
\`\`\`

### -r (--resume)
Riprendi una conversazione specifica (non l'ultima, ma una a tua scelta):

\`\`\`bash
# Mostra lista conversazioni e scegli quale riprendere
claude -r

# Riprendi sessione specifica se conosci l'ID
claude -r abc123-session-id
\`\`\`

💡 **Differenza con -c:**
- \`-c\` = continua **ultima** conversazione automaticamente
- \`-r\` = riprendi una conversazione **specifica** dalla cronologia

💡 **Code Review**: Per review del codice, usa modalità interattiva normale e chiedi esplicitamente:
\`\`\`bash
claude "Fai code review di questo file" @src/components/Button.tsx
# oppure
claude "Analizza questi cambi per bug" @git:diff
\`\`\`

## Combinare i Flag

\`\`\`bash
# Print mode + Continue (script automation)
claude -c "Crea helper function"
OUTPUT=\$(claude -c -p "Ora stampa solo la signature")
echo \$OUTPUT

# Resume + Print (riprendere sessione in script)
claude -r session-123 -p "Finalizza implementazione"
\`\`\`

💡 **Best Practice**: I flag \`-p\`, \`-c\`, e \`-r\` sono compatibili, ma verifica sempre con \`claude --help\` per combinazioni specifiche supportate.

## Checkpoints & Rewind (Nov 2025) 🆕

Una delle feature più potenti di Claude Code 2025: **la macchina del tempo per il tuo codice**! ⏪

### Come Funziona

Claude Code crea automaticamente un **checkpoint** ogni volta che invii un prompt. Puoi tornare indietro in qualsiasi momento!

\`\`\`bash
# Metodo 1: Doppio ESC
# Premi ESC due volte per tornare al checkpoint precedente
ESC ESC

# Metodo 2: Comando /rewind
claude
> /rewind
\`\`\`

### Cosa Puoi Ripristinare

Quando fai rewind, scegli cosa ripristinare:
- 📝 **Solo conversazione** - Torna indietro nel dialogo
- 💾 **Solo codice** - Rollback delle modifiche ai file
- 🔄 **Entrambi** - Reset completo a quel punto nel tempo

### Use Cases Reali

**Scenario 1: Esplorare Alternative**
\`\`\`bash
claude "Implementa autenticazione con JWT"
# Claude crea la soluzione v1
ESC ESC  # Torna indietro
claude "Implementa autenticazione con OAuth2"
# Ora hai due approcci da confrontare!
\`\`\`

**Scenario 2: Undo Mistakes**
\`\`\`bash
claude "Refactora tutto il database layer"
# Oh no, ha rotto qualcosa!
ESC ESC  # Rollback immediato, tutto come prima
\`\`\`

**Retention**: I checkpoint vengono mantenuti per **30 giorni** 📅

## Best Practices

1. **Usa -p (print)** per scripting e automation - output pulito senza interazione
2. **Usa -c (continue)** per conversazioni iterative lunghe - mantiene contesto
3. **Usa -r (resume)** per riprendere una sessione specifica dalla cronologia
4. **Contesto progetto**: Lancia \`claude\` dalla root del progetto - legge automaticamente \`CLAUDE.md\` e \`.claude/settings.json\`
5. **Usa ESC ESC** liberamente per esplorare alternative senza paura 🆕

## Esempi Pratici

\`\`\`bash
# Sviluppo feature completa (modalità interattiva)
cd my-project  # Il contesto viene da qui + CLAUDE.md
claude "Crea sistema di autenticazione JWT" @src/auth/**
claude -c "Aggiungi refresh token"
claude -c "Implementa logout sicuro"
claude -c "Fai code review della feature auth"

# Automation in script
#!/bin/bash
RESULT=\$(claude -p "Analizza test coverage" @coverage/*)
if [[ \$RESULT == *"below 80%"* ]]; then
  echo "Warning: Low coverage!"
fi
\`\`\`

Padroneggiare questi comandi ti rende 10x più produttivo! 🚀
  `,
  xp: 100,
  badge: "⌨️ CLI Master",
  estimatedTime: "30 minuti",
  topics: ["CLI Commands", "Flags", "Print Mode", "Continue", "Resume", "Checkpoints"],
  quiz: {
    questions: [
      {
        id: "m2-q1",
        question: "Cosa fa il flag -p (--print)?",
        options: [
          "Apre modalità progetto per analizzare tutto il codebase",
          "Stampa l'output e esce (utile per scripting)",
          "Abilita modalità planning per task complessi",
          "Mostra i permessi file richiesti"
        ],
        correctAnswer: 1,
        explanation: "Il flag -p (--print) stampa l'output di Claude e esce immediatamente, senza aprire modalità interattiva. È perfetto per scripting, piping e automation."
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
      },
      {
        id: "m2-q3",
        question: "Qual è la differenza tra -c e -r?",
        options: [
          "-c continua l'ultima conversazione, -r riprende una conversazione specifica dalla cronologia",
          "-c è per code, -r è per review",
          "-c è per conversazioni, -r è per refactoring",
          "Sono identici, solo alias diversi"
        ],
        correctAnswer: 0,
        explanation: "-c (--continue) continua automaticamente l'ultima conversazione. -r (--resume) ti permette di scegliere una sessione specifica dalla cronologia per riprenderla."
      },
      {
        id: "m2-q4",
        question: "Come ottiene Claude Code il contesto del tuo progetto?",
        options: [
          "Con il flag --project",
          "Dalla directory corrente dove lanci 'claude' + file CLAUDE.md + .claude/settings.json",
          "Solo dai file che referenzi con @",
          "Analizza automaticamente tutto il filesystem"
        ],
        correctAnswer: 1,
        explanation: "Claude Code ottiene il contesto dalla directory corrente dove lo lanci, leggendo automaticamente CLAUDE.md (se presente) e la configurazione in .claude/settings.json. Non esiste un flag --project."
      }
    ]
  },
  challenge: {
    title: "Master dei Comandi CLI",
    description: "Usa tutti i comandi base in una sessione di sviluppo",
    instructions: [
      "Crea una cartella test-cli-mastery e cd dentro",
      "Usa `claude` in modalità interattiva per creare un mini progetto (es: TODO app)",
      "Usa `claude -c` per iterare e aggiungere features",
      "Usa `claude -p` per generare un README da script: `claude -p 'Genera README.md' > README.md`",
      "Prova ESC ESC per fare rewind e esplorare alternative",
      "Usa `claude -r` per riprendere una conversazione precedente dalla lista"
    ],
    verificationSteps: [
      "✅ Hai usato modalità interattiva base",
      "✅ Hai usato -c per continuare conversazione",
      "✅ Hai usato -p per output non-interattivo",
      "✅ Hai provato ESC ESC per rewind",
      "✅ Hai capito quando usare ogni flag"
    ]
  }
};
