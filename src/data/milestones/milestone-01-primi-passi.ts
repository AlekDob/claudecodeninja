import { Milestone } from '../../types';

export const milestone01: Milestone = {
  id: 1,
  title: "Primi Passi con Claude Code",
  subtitle: "Installa Claude Code, configura l'autenticazione e padroneggia i comandi base",
  description: `
# Milestone 1: Primi Passi con Claude Code

Benvenuto in ClaudeCodeNinja! 🚀 Stai per iniziare un viaggio che trasformerà il modo in cui sviluppi software.

Claude Code non è solo un assistente AI - è il tuo partner di programmazione che comprende il contesto del tuo progetto, rispetta le tue preferenze e ti aiuta a scrivere codice di qualità in modo più veloce ed efficiente.

In questa prima milestone costruirai le fondamenta essenziali: installerai Claude Code, configurerai l'autenticazione in modo sicuro e padroneggerai i comandi base che userai ogni giorno.

## Capitolo 1: Prerequisiti di Sistema

Prima di iniziare, verifica di avere:

### 1.1 Requisiti Software

- **Node.js 18.0.0+** - Verifica con: \`node --version\`
- **npm** (incluso con Node.js) - Verifica con: \`npm --version\`
- **Git** (consigliato ma non obbligatorio) - Verifica con: \`git --version\`

### 1.2 Account Anthropic

Avrai bisogno di **una delle seguenti opzioni**:

**Opzione A - API Key** (Per sviluppatori esperti):
- Crea account su [console.anthropic.com](https://console.anthropic.com)
- Genera una API key dalla dashboard
- Controllo granulare sui costi

**Opzione B - Subscription** (Consigliato per principianti):
- Setup immediato tramite \`claude /login\`
- Piani mensili con crediti inclusi
- Gestione automatica dei costi

💡 **Non hai ancora deciso?** Non preoccuparti, il comando \`claude /login\` ti guiderà nella scelta migliore per te.

---

### 1.3 Sistemi Operativi Supportati

- macOS 10.15 (Catalina) o successivo
- Windows 10/11 con PowerShell o WSL2
- Linux (Ubuntu 20.04+, Fedora 34+, o equivalenti)

---

## Capitolo 2: Installazione e Configurazione

### 2.1 Installazione

#### Via npm (Tutti i sistemi)

\`\`\`bash
# Installa Claude Code globalmente
npm install -g @anthropic-ai/claude-code

# Verifica l'installazione
claude --version
\`\`\`

#### Via Homebrew (macOS/Linux)

\`\`\`bash
brew tap anthropic-ai/tap
brew install claude-code
\`\`\`

---

#### VS Code Extension (Beta) 🆕

**Novità 2025**: Claude Code è ora disponibile anche come **estensione nativa per VS Code**!

**Vantaggi**:
- ✨ **Sidebar panel** integrato con il tuo editor
- 👀 **Inline diffs** - vedi modifiche di Claude in real-time
- 🔄 **Real-time code changes** - visualizzazione modifiche mentre Claude lavora
- 🎯 **No terminal switching** - tutto nell'IDE

**Installazione**:

1. **Via VS Code Marketplace**:
   \`\`\`bash
   # Apri VS Code e vai a:
   # View → Extensions (o CTRL+SHIFT+X / CMD+SHIFT+X)
   # Cerca "Claude Code" e clicca Install
   \`\`\`

2. **Via Command Line**:
   \`\`\`bash
   code --install-extension anthropic-ai.claude-code
   \`\`\`

**Quando usare VS Code Extension vs Terminal**:

📝 **VS Code Extension** - Migliore per:
- Lavorare su file aperti nell'editor
- Visualizzare modifiche inline
- Integration con VS Code workflow
- Progetti piccoli/medi

💻 **Terminal CLI** - Migliore per:
- Automation e scripting
- CI/CD integration
- Progetti grandi con molti file
- Headless environments

💡 **Tip**: Puoi usare ENTRAMBI! Installa l'extension per UI-driven tasks e usa la CLI per automation.

---

### 2.2 Autenticazione con Claude Code

Claude Code offre due modalità di autenticazione per adattarsi alle tue esigenze:

#### Metodo 1: Login Interattivo (Consigliato per Principianti) 🚀

Il modo più semplice è usare il comando di login:

\`\`\`bash
claude /login
\`\`\`

Ti verrà chiesto di scegliere:

**Opzione A - API Key**:
- Hai già una chiave API da [console.anthropic.com](https://console.anthropic.com)
- Vuoi controllo granulare sui costi
- Setup per integrazione aziendale

**Opzione B - Subscription**:
- Setup immediato, niente configurazione manuale
- Piani mensili con crediti inclusi
- Gestione automatica dei costi
- Perfetto per chi inizia

💡 **Tip**: Se sei nuovo, parti con la Subscription per iniziare subito. Potrai sempre passare all'API key in seguito.

---

#### Metodo 2: Variabili d'Ambiente (Avanzato) ⚙️

Per utenti esperti o setup automatizzati (CI/CD, team):

**Su macOS/Linux**:
\`\`\`bash
# Apri il file di configurazione della shell
nano ~/.zshrc  # macOS (default da Catalina)
# oppure
nano ~/.bashrc  # Linux

# Aggiungi questa riga alla fine del file
export ANTHROPIC_API_KEY="sk-ant-tua-chiave-qui"

# Salva (CTRL+O, Invio, CTRL+X) e ricarica
source ~/.zshrc
\`\`\`

**Su Windows**:
1. Tasto destro su "Questo PC" → Proprietà
2. Impostazioni di sistema avanzate
3. Variabili d'ambiente
4. Nuova variabile utente:
   - Nome: \`ANTHROPIC_API_KEY\`
   - Valore: la tua chiave API
5. OK e riavvia il terminale

---

#### Verifica Configurazione ✅

Indipendentemente dal metodo scelto, verifica che tutto funzioni:

\`\`\`bash
claude "Ciao! Sei configurato correttamente?"
\`\`\`

Se ricevi una risposta, tutto funziona! 🎉

> ⚠️ **IMPORTANTE**: Non committare mai l'API key su Git! Claude Code la salva localmente con permessi restrittivi.

---

### 2.3 Scegliere il Modello AI

Claude Code offre tre modelli, ciascuno ottimizzato per casi d'uso diversi:

#### 💎 **Opus 4.1** (Massima Potenza)
- **Quando usarlo**: Architettura complessa, problemi difficili, design di sistema
- **Velocità**: Più lenta (ma vale l'attesa)
- **Potenza**: Massima intelligenza disponibile
- **Costo**: Più alto
- **Ideale per**:
  - Progettazione architetturale
  - Algoritmi complessi
  - Code review approfondite
  - Refactoring di sistemi legacy

#### 🚀 **Sonnet 4.5** (Consigliato - Bilanciato)
- **Quando usarlo**: Sviluppo quotidiano, la maggior parte dei task
- **Velocità**: Bilanciata e affidabile
- **Potenza**: Eccellente per 95% dei casi
- **Costo**: Medio
- **Ideale per**:
  - Debugging e troubleshooting
  - Generazione codice standard
  - Refactoring di componenti
  - Spiegazioni tecniche

#### ⚡ **Haiku 4.5** (Massima Velocità)
- **Quando usarlo**: Task semplici e ripetitivi
- **Velocità**: Rapidissima (perfetto per iterazioni veloci)
- **Potenza**: Ottima per task basilari
- **Costo**: Più basso
- **Ideale per**:
  - Formattazione codice
  - Fix di sintassi semplici
  - Domande rapide
  - Generazione commenti

---

#### Come Cambiare Modello

**In modalità interattiva**:
\`\`\`bash
# Avvia Claude
claude

# Cambia modello con slash command
/model
\`\`\`

**All'avvio da riga di comando**:
\`\`\`bash
# Specifica il modello con flag
claude --model sonnet "Analizza questo codice" @app.ts
claude --model opus "Design pattern per questo sistema"
claude --model haiku "Formatta questo file" @utils.js
\`\`\`

💡 **Strategia consigliata**:
1. **Inizia con Sonnet 4.5** per tutto
2. **Passa a Opus 4.1** se Sonnet non riesce o serve analisi profonda
3. **Usa Haiku 4.5** per risparmiare su task banali (fix typo, formatting)

## Capitolo 3: Modalità di Utilizzo

### 3.1 One-Shot Mode (Comando Singolo)

Esegui un prompt e ottieni una risposta immediata:

\`\`\`bash
claude "Spiega la differenza tra let e const in JavaScript"
\`\`\`

**Perfetto per**:
- Domande rapide
- Generazione di snippet
- Spiegazioni veloci
- Script automation

---

### 3.2 Interactive Mode (Modalità Interattiva)

Avvia una conversazione continua:

\`\`\`bash
claude
\`\`\`

**In modalità interattiva puoi**:
- Fare domande multiple senza rilanciare il comando
- Mantenere il contesto tra richieste successive
- Usare slash commands (\`/help\`, \`/model\`, \`/clear\`)
- Referenziare file con \`@\`

**Per uscire**: Premi \`ESC\` due volte oppure digita \`/exit\`

---

### 3.3 Referenziare File con @

Una delle feature più potenti - includi file nel contesto:

\`\`\`bash
# Singolo file
claude "Spiega questa funzione" @src/utils/helper.ts

# Pattern con wildcard
claude "Trova bug in questi componenti" @src/components/*.tsx

# Ricorsivo
claude "Analizza tutta l'architettura" @src/**/*.ts
\`\`\`

**Wildcard supportati**:
- \`*\` - tutti i file in una directory (singolo livello)
- \`**\` - ricorsivo (tutte le sottocartelle)
- \`?\` - singolo carattere qualsiasi

## Capitolo 4: CLI Flags Essenziali

### 4.1 --print / -p (Output Pulito)

Stampa solo l'output di Claude senza formattazione extra:

\`\`\`bash
# Salva risposta in file
claude --print "Genera un UUID random" > uuid.txt

# Piping in script
claude -p "Converti JSON in CSV" @data.json | tee output.csv
\`\`\`

**Quando usarlo**:
- Script automation
- Piping con altri comandi
- Salvataggio output diretto

---

### 4.2 --verbose / -v (Debug Mode)

Mostra dettagli tecnici (token usati, modello, timing):

\`\`\`bash
claude --verbose "Analizza questo codice" @main.ts
\`\`\`

**Output include**:
- Numero token usati (input + output)
- Modello Claude utilizzato
- Tempo di risposta
- Costi stimati

**Quando usarlo**:
- Monitoraggio costi
- Debug performance
- Ottimizzazione prompt

---

### 4.3 --model / -m (Selezione Modello)

Specifica quale modello Claude usare:

\`\`\`bash
# Modello veloce per test rapidi
claude --model haiku "Test formattazione"

# Modello bilanciato (default)
claude --model sonnet "Refactoring componente"

# Modello potente per task complessi
claude --model opus "Analisi architetturale completa"
\`\`\`

**Modelli disponibili** (aggiornati al 2025):
- \`opus\` → Claude Opus 4.1 (massima potenza)
- \`sonnet\` → Claude Sonnet 4.5 (bilanciato, default)
- \`haiku\` → Claude Haiku 4.5 (massima velocità)

---

### 4.4 Lavorare con Progetti

Quando lavori su un progetto, Claude Code può comprendere il contesto completo:

\`\`\`bash
cd my-react-app
# Claude Code comprende automaticamente il contesto della directory corrente
claude "Come posso ottimizzare le performance?"
\`\`\`

**Cosa fa**:
- Legge file referenziati con @ (es. @src/**/*.ts)
- Rispetta \`.gitignore\` per escludere file comuni (node_modules, etc.)
- Usa \`ignorePatterns\` in \`.claude/settings.json\` per controllo preciso
- Permette di fornire contesto specifico senza sovraccaricare

> ⚠️ **Attenzione ai costi**: referenziare molti file può aumentare i costi. Configura \`ignorePatterns\` per escludere file non necessari.

**Best practice - Configurazione ignorePatterns**:
\`\`\`bash
# Crea directory config se non esiste
mkdir -p .claude

# Crea file di configurazione progetto
cat > .claude/settings.json <<EOF
{
  "ignorePatterns": [
    "node_modules/**",
    "dist/**",
    "build/**",
    ".git/**",
    "*.log",
    ".env*",
    "coverage/**"
  ]
}
EOF
\`\`\`

> 💡 **Nota**: Claude Code rispetta anche \`.gitignore\`, ma \`ignorePatterns\` offre controllo più preciso e garantisce che i file siano completamente invisibili.

## Capitolo 5: Slash Commands

Disponibili in modalità interattiva per controllo rapido:

**\`/help\`** - Mostra tutti i comandi disponibili

**\`/config\`** - Visualizza o modifica configurazioni

**\`/model\`** - Cambia modello rapidamente (sonnet/opus/haiku)

**\`/clear\`** - Pulisce il contesto della conversazione (risparmia token)

**\`/login\`** - Riconfigura autenticazione (API key o Subscription)

**\`/exit\`** - Esce dalla modalità interattiva

---

### Controlli con Tasto ESC

**ESC (singolo)**: Interrompe la generazione in corso

**ESC ESC (doppio)**: Esce dalla modalità interattiva

## Capitolo 6: Troubleshooting

### 6.1 Errore: command not found: claude

**Soluzioni**:
1. Verifica installazione globale: \`npm list -g @anthropic-ai/claude-code\`
2. Controlla PATH: \`npm config get prefix\`
3. Su macOS/Linux, aggiungi a \`~/.zshrc\` o \`~/.bashrc\`:
   \`export PATH="$PATH:$(npm config get prefix)/bin"\`
4. Riavvia il terminale dopo aver modificato PATH

---

### 6.2 Errore: Authentication failed

**Soluzioni**:
1. Usa il nuovo comando di login: \`claude /login\`
2. Se usi API key, verifica su [console.anthropic.com](https://console.anthropic.com)
3. Controlla che la key sia valida e non scaduta
4. Riavvia il terminale per ricaricare le variabili d'ambiente

> 💡 **Nota**: Claude Code gestisce automaticamente i permessi dei file di autenticazione. Non è necessario modificarli manualmente.

---

### 6.3 Risposte lente o timeout

**Soluzioni**:
1. Riduci contesto - evita file grandi o troppi file
2. Configura \`ignorePatterns\` in \`.claude/settings.json\` per escludere node_modules, .git, dist
3. Prova modello più veloce: \`--model haiku\`
4. Verifica connessione internet
5. Usa \`/clear\` in modalità interattiva per resettare il contesto

## Capitolo 7: Best Practices

### 7.1 Sicurezza API Key

✅ **DA FARE**:
- Usa \`claude /login\` per configurazione guidata
- Salva key solo tramite variabili d'ambiente
- Usa Subscription per progetti personali
- Revoca vecchie keys quando non servono più

❌ **DA NON FARE**:
- Mai committare su Git (aggiungi a .gitignore)
- Mai condividere via email/chat non criptate
- Mai hardcodare in script o codice

---

### 7.2 Ottimizzazione Costi

💡 **Tips per risparmiare**:
- **Scegli il modello giusto**: Usa Haiku per task semplici, Sonnet per la maggior parte, Opus solo quando necessario
- **Riduci contesto**: Configura \`ignorePatterns\` in \`.claude/settings.json\` per escludere file non necessari
- **Gestisci sessioni**: Usa \`/clear\` in conversazioni lunghe per resettare il contesto
- **Sii specifico**: Referenzia solo i file strettamente necessari con \`@\`
- **Monitora uso**: Controlla dashboard su console.anthropic.com

**Esempio di costi approssimativi** (gennaio 2025):
- Haiku 4.5: ~$0.25 per 1M token input
- Sonnet 4.5: ~$3 per 1M token input
- Opus 4.1: ~$15 per 1M token input

---

### 7.3 Workflow Consigliato

Per progetti nuovi:

\`\`\`bash
cd my-new-project
git init

# Crea directory config Claude Code
mkdir -p .claude

# Configura ignorePatterns per ottimizzare contesto e costi
cat > .claude/settings.json <<EOF
{
  "ignorePatterns": [
    "node_modules/**",
    "dist/**",
    "build/**",
    ".git/**",
    ".env*",
    "*.log",
    "coverage/**"
  ]
}
EOF

# Prima interazione con contesto progetto
claude "Analizza struttura e suggerisci miglioramenti"
\`\`\`

**Workflow quotidiano**:
1. **Quick questions**: One-shot mode
2. **Debugging**: Interactive mode con \`@file\`
3. **Refactoring**: Referenzia file con \`@\` e wildcard (es. @src/**/*.ts)
4. **Review**: Sonnet per check standard, Opus per analisi profonde

## Riepilogo

Congratulazioni! 🎉 Hai completato la prima milestone. Ora sai:

✅ Verificare requisiti e preparare l'ambiente
✅ Installare Claude Code via npm o Homebrew
✅ Autenticarti con \`claude /login\` (API Key o Subscription)
✅ Scegliere il modello giusto (Opus 4.1 / Sonnet 4.5 / Haiku 4.5)
✅ Usare modalità interattiva e one-shot
✅ Referenziare file con \`@\` e wildcard
✅ Padroneggiare CLI flags essenziali (\`--print\`, \`--verbose\`, \`--model\`)
✅ Navigare con slash commands (\`/help\`, \`/model\`, \`/clear\`, \`/exit\`)
✅ Gestire controlli ESC per interrompere o uscire
✅ Risolvere problemi comuni (PATH, auth, performance)
✅ Applicare best practices per sicurezza e ottimizzazione costi

**Prossimi Passi**: Nella Milestone 2 imparerai i comandi CLI avanzati per controllo file, gestione permessi e workflow produttivi. 🚀
  `,
  xp: 100,
  badge: "🚀 Iniziatore",
  estimatedTime: "20-30 minuti",
  topics: [
    "Installazione",
    "Requisiti di sistema",
    "API Key e autenticazione",
    "CLI basics",
    "Modalità interattiva",
    "File references",
    "Troubleshooting"
  ],
  quiz: {
    questions: [
      {
        id: "m1-q1",
        question: "Qual è la versione minima di Node.js richiesta per Claude Code?",
        options: [
          "Node.js 16.0.0",
          "Node.js 18.0.0",
          "Node.js 20.0.0",
          "Node.js 14.0.0"
        ],
        correctAnswer: 1,
        explanation: "Claude Code richiede Node.js versione 18.0.0 o superiore per garantire compatibilità con le API moderne e performance ottimali."
      },
      {
        id: "m1-q2",
        question: "Come si configura l'autenticazione in Claude Code?",
        options: [
          "Eseguendo 'claude auth'",
          "Eseguendo 'claude /login' in modalità interattiva",
          "Modificando manualmente ~/.config/claude/auth.json",
          "Usando il flag --api-key ogni volta"
        ],
        correctAnswer: 1,
        explanation: "In Claude Code 2025, l'autenticazione si configura con 'claude /login' che guida attraverso la scelta tra API Key e Subscription. Claude gestisce automaticamente i permessi dei file di autenticazione."
      },
      {
        id: "m1-q3",
        question: "Quale comando avvia Claude Code in modalità interattiva?",
        options: [
          "claude --interactive",
          "claude start",
          "claude",
          "claude -i"
        ],
        correctAnswer: 2,
        explanation: "Semplicemente eseguendo 'claude' senza argomenti si avvia la modalità interattiva, dove puoi fare domande multiple e usare slash commands."
      },
      {
        id: "m1-q4",
        question: "Come si referenzia un file specifico quando fai una domanda a Claude Code?",
        options: [
          "claude 'domanda' --file=path/to/file.ts",
          "claude 'domanda' @path/to/file.ts",
          "claude 'domanda' #path/to/file.ts",
          "claude 'domanda' <path/to/file.ts>"
        ],
        correctAnswer: 1,
        explanation: "Il simbolo @ viene usato per referenziare file: 'claude \"domanda\" @path/to/file.ts'. Puoi anche usare wildcard come @src/**/*.tsx"
      },
      {
        id: "m1-q5",
        question: "Qual è il modo corretto per uscire dalla modalità interattiva?",
        options: [
          "Premere CTRL+C",
          "Digitare '/exit' o premere ESC due volte",
          "Chiudere il terminale",
          "Premere CTRL+D"
        ],
        correctAnswer: 1,
        explanation: "Puoi uscire dalla modalità interattiva digitando '/exit' (o '/quit') oppure premendo il tasto ESC due volte rapidamente."
      }
    ]
  },
  challenge: {
    title: "Setup Completo e Prima Conversazione",
    description: "Completa l'installazione di Claude Code, configuralo correttamente e conduci la tua prima conversazione interattiva per verificare che tutto funzioni.",
    instructions: [
      "Verifica che Node.js 18+ sia installato: esegui 'node --version' nel terminale",
      "Installa Claude Code globalmente: 'npm install -g @anthropic-ai/claude-code'",
      "Configura autenticazione: avvia 'claude' in modalità interattiva e usa '/login' per configurare API Key o Subscription",
      "Verifica l'installazione: esegui 'claude --version' e controlla che mostri la versione",
      "Avvia modalità interattiva: esegui 'claude' e premi Invio",
      "Fai una domanda tecnica (es. 'Spiega la differenza tra let e const in JavaScript')",
      "Prova a cambiare modello: digita '/model haiku' e fai un'altra domanda",
      "Usa /clear per resettare il contesto e fai una domanda su un topic diverso",
      "Esci dalla modalità interattiva premendo ESC due volte o digitando '/exit'"
    ],
    verificationSteps: [
      "✅ Node.js 18+ è installato e funzionante",
      "✅ Claude Code è installato globalmente e 'claude --version' mostra la versione",
      "✅ L'autenticazione è configurata correttamente (nessun errore API key)",
      "✅ Hai ricevuto risposte coerenti in modalità interattiva",
      "✅ Sei riuscito a cambiare modello con /model",
      "✅ Hai usato /clear per resettare il contesto",
      "✅ Sei uscito correttamente dalla modalità interattiva"
    ]
  },
  resources: [
    {
      id: 'aitmpl-marketplace',
      type: 'link',
      title: 'Claude Code Templates',
      description: 'Marketplace di agenti, comandi e skills per Claude Code',
      url: 'https://aitmpl.com/'
    },
    {
      id: 'claude-docs',
      type: 'link',
      title: 'Claude Code Docs',
      description: 'Documentazione ufficiale completa di Claude Code',
      url: 'https://code.claude.com/docs/en/overview'
    },
    {
      id: 'skillsmp-marketplace',
      type: 'link',
      title: 'Skills Marketplace',
      description: 'Marketplace dedicato alle skills per Claude Code',
      url: 'https://skillsmp.com/'
    },
    {
      id: 'claude-md-starter',
      type: 'template',
      title: 'Template CLAUDE.md Starter',
      description: 'Template base per creare il tuo primo CLAUDE.md con tutte le sezioni essenziali',
      filename: 'CLAUDE.md',
      language: 'markdown',
      content: `# CLAUDE.md

## 📋 Project Name
[Il nome del tuo progetto]

## 🎯 Overview
Descrizione breve del progetto e del suo scopo principale.

**Tipo di progetto**: [Web App / Mobile App / Library / CLI Tool / etc.]
**Target audience**: [Chi userà questo progetto]
**Problema risolto**: [Quale problema risolve]

## 🛠 Tech Stack

**Core**:
- Framework principale e versione
- Runtime/Language e versione
- Package manager

**Frontend** (se applicabile):
- UI Framework
- Styling solution
- State management

**Backend** (se applicabile):
- Server framework
- Database
- Auth solution

**Tools**:
- Build tool
- Testing framework
- Deployment platform

## 📂 Project Structure

**⚠️ CRITICAL: Organize by Domain, Not by Type**

❌ **WRONG (Technical Organization)**:
\\\`\\\`\\\`
src/
  ├── components/    # 150+ components mixed
  ├── services/      # 40+ services mixed
  ├── utils/         # 30+ utility files
  └── hooks/         # 35+ hooks mixed
\\\`\\\`\\\`

✅ **CORRECT (Domain Organization)**:
\\\`\\\`\\\`
src/
  ├── features/
  │   ├── products/
  │   │   ├── components/
  │   │   ├── services/
  │   │   ├── hooks/
  │   │   └── types/
  │   ├── orders/
  │   │   ├── components/
  │   │   ├── services/
  │   │   ├── hooks/
  │   │   └── types/
  │   └── customers/
  │       ├── components/
  │       ├── services/
  │       ├── hooks/
  │       └── types/
  └── shared/
      ├── components/  # Actually shared (buttons, modals)
      ├── hooks/       # Actually shared (useApi, useAuth)
      └── utils/       # Actually shared (date, validation)
\\\`\\\`\\\`

### The 4 Sacred Rules:

**1️⃣ The 20-Line Rule**
- Files under 20 lines should be consolidated
- Exception: Config files and type definitions
- Small files create navigation overhead for AI

**2️⃣ The 300-Line Rule**
- Files over 300 lines are doing too much
- Split by responsibility or domain
- Large files overwhelm AI context window

**3️⃣ The Domain Rule** (Most Important!)
- **Files that change together live together**
- Group by feature/domain, NOT by technical type
- When adding a cart feature, you touch: cart components, cart service, cart types
- Keep them together in \\\`features/cart/\\\`

**4️⃣ The Name Rule**
- If you can't tell what a file does from its name, the name sucks
- Be specific: \\\`productPriceCalculator.ts\\\` not \\\`utils.ts\\\`
- Avoid: \\\`helpers.ts\\\`, \\\`utils.ts\\\`, \\\`index.ts\\\`, \\\`data.ts\\\`

## 📐 Code Style

**Naming Conventions**:
- \\\`PascalCase\\\`: Components, Types, Interfaces
- \\\`camelCase\\\`: Functions, variables
- \\\`UPPER_SNAKE_CASE\\\`: Constants, env variables

**Function Rules**:
- Max 20 lines per function
- Max 300 lines per file
- Single Responsibility Principle
- Explicit return types (TypeScript)

**TypeScript**:
- Strict mode enabled
- No \\\`any\\\` types allowed
- Explicit interface exports

## 🧪 Testing

**Test Strategy**:
- [Unit tests / Integration tests / E2E tests]
- Test coverage target: [XX%]

**Testing Tools**:
- [Jest / Vitest / Playwright / etc.]

**How to run tests**:
\\\`\\\`\\\`bash
npm run test
\\\`\\\`\\\`

## 🔧 Development

**Setup**:
\\\`\\\`\\\`bash
npm install
npm run dev
\\\`\\\`\\\`

**Environment Variables**:
\\\`\\\`\\\`bash
# .env.example
VITE_API_URL=
VITE_API_KEY=
\\\`\\\`\\\`

**Common Commands**:
\\\`\\\`\\\`bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run test     # Run tests
\\\`\\\`\\\`

## 🚀 Deployment

**Platform**: [Vercel / Netlify / Railway / etc.]
**URL**: [Production URL]

**Deploy process**:
1. [Step 1]
2. [Step 2]
3. [Step 3]

## 📚 Detailed Documentation

All detailed documentation has been organized into focused files:

### 📂 **Core Documentation**
👉 **\\\`/docs/architecture.md\\\`** - System architecture and design decisions
👉 **\\\`/docs/api.md\\\`** - API documentation and endpoints
👉 **\\\`/docs/deployment.md\\\`** - Deployment guide and production setup

### 🎯 **Feature Documentation**
👉 **\\\`/docs/features/\\\`** - Feature-specific documentation by domain
👉 **\\\`/docs/testing.md\\\`** - Testing strategy and guidelines
👉 **\\\`/docs/troubleshooting.md\\\`** - Common issues and solutions

### 🚀 **Development**
👉 **\\\`/docs/setup.md\\\`** - Development environment setup
👉 **\\\`/docs/contributing.md\\\`** - Contributing guidelines
👉 **\\\`/docs/changelog.md\\\`** - Version history and changes

**Note**: Keeping documentation in separate files follows the **300-line rule** and makes it easier for AI to find relevant context.

## 🧠 Context for AI

**Project Philosophy**:
[Spiega la filosofia del progetto, le decisioni architetturali, i trade-off]

**Code Patterns**:
[Pattern ricorrenti nel codice, convenzioni specifiche del progetto]

**Common Tasks**:
- Adding new component: [workflow]
- Adding new route: [workflow]
- Adding new API endpoint: [workflow]

**Known Issues**:
- [Issue 1 e soluzione]
- [Issue 2 e soluzione]

---

**Last Updated**: [Date]
**Version**: 1.0.0
**Author**: [Your Name]
`
    }
  ]
};
