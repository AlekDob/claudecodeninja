import { Milestone } from '../../types';

export const milestone02: Milestone = {
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
};
