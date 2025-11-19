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

### 4.4 --project / -P (Modalità Progetto)

Carica automaticamente il contesto del progetto:

\`\`\`bash
cd my-react-app
claude --project "Come posso ottimizzare le performance?"
\`\`\`

**Cosa fa**:
- Legge tutti i file nel progetto (rispettando \`.claudeignore\`)
- Invia struttura directory e contenuti
- Permette a Claude di comprendere l'intero contesto

> ⚠️ **Attenzione ai costi**: modalità project può inviare molti file. Usa \`.claudeignore\` per escludere node_modules, build, etc.

**Best practice**:
\`\`\`bash
# Crea .claudeignore prima di usare --project
echo "node_modules/
dist/
build/
.git/
*.log" > .claudeignore
\`\`\`

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
4. Verifica permessi file config: \`chmod 600 ~/.config/claude/auth.json\`

---

### 6.3 Risposte lente o timeout

**Soluzioni**:
1. Riduci contesto - evita file grandi o troppi file
2. Usa \`.claudeignore\` per escludere node_modules, .git, dist
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
- **Riduci contesto**: Usa \`.claudeignore\` per escludere file non necessari
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

# Crea .claudeignore PRIMA di usare --project
echo "node_modules/
dist/
build/
.git/
.env
*.log
coverage/" > .claudeignore

# Prima interazione con contesto progetto
claude --project "Analizza struttura e suggerisci miglioramenti"
\`\`\`

**Workflow quotidiano**:
1. **Quick questions**: One-shot mode
2. **Debugging**: Interactive mode con \`@file\`
3. **Refactoring**: \`--project\` per contesto completo
4. **Review**: Sonnet per check standard, Opus per analisi profonde

## Riepilogo

Congratulazioni! 🎉 Hai completato la prima milestone. Ora sai:

✅ Verificare requisiti e preparare l'ambiente
✅ Installare Claude Code via npm o Homebrew
✅ Autenticarti con \`claude /login\` (API Key o Subscription)
✅ Scegliere il modello giusto (Opus 4.1 / Sonnet 4.5 / Haiku 4.5)
✅ Usare modalità interattiva e one-shot
✅ Referenziare file con \`@\` e wildcard
✅ Padroneggiare CLI flags essenziali (\`--print\`, \`--verbose\`, \`--model\`, \`--project\`)
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
        question: "Dove viene salvata la API key dopo aver eseguito 'claude auth' su macOS?",
        options: [
          "~/.claude/config.json",
          "~/.config/claude/auth.json",
          "~/Library/Claude/auth.json",
          "/etc/claude/auth.json"
        ],
        correctAnswer: 1,
        explanation: "Su macOS e Linux, Claude Code salva l'API key in ~/.config/claude/auth.json con permessi restrittivi (600) per sicurezza."
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
      "Configura l'API key: esegui 'claude auth' e incolla la tua key da console.anthropic.com",
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
  }
};
