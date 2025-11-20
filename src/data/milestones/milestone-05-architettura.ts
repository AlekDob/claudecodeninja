import { Milestone } from '../../types';

export const milestone05: Milestone = {
  id: 5,
  title: "L'Architettura di Claude Code",
  subtitle: "Scopri come funziona Claude Code sotto il cofano: orchestrazione, tool use e il sistema a tre livelli",
  description: `
# Milestone 5: L'Architettura di Claude Code

Benvenuto nella milestone più tecnica del percorso! 🏗️

Finora hai imparato a **usare** Claude Code. Ora è il momento di capire **come funziona** sotto il cofano.

Comprendere l'architettura di Claude Code non è solo curiosità accademica - è una competenza pratica che ti permette di:

- Scrivere prompt più efficaci sfruttando il sistema di tool use
- Anticipare cosa Claude può e non può fare
- Debuggare problemi di permessi e security
- Ottimizzare workflow per velocità e costi
- Costruire integrazioni custom con MCP e Agent SDK

## Capitolo 1: L'Architettura a Tre Livelli

Claude Code **non è** l'intelligenza artificiale. È un **orchestratore** che coordina tre attori distinti.

### 1.1 Il Modello Mentale Corretto

La maggior parte delle persone pensa:

❌ **Sbagliato**: "Claude Code è l'AI che genera codice"

✅ **Corretto**: "Claude Code è il bridge tra me e il modello LLM, fornendo tool per interagire con il filesystem"

### 1.2 I Tre Livelli

\`\`\`
┌─────────────────────────────────────────┐
│           TU (Developer)                │
│  - Lanci comandi                        │
│  - Approvi permessi                     │
│  - Fornisci contesto                    │
└─────────────────────────────────────────┘
              ↕ (Interfaccia CLI)
┌─────────────────────────────────────────┐
│        CLAUDE CODE (Orchestrator)       │
│  - Gestisce permessi                    │
│  - Esegue tool requests                 │
│  - Formatta output                      │
│  - Salva conversazioni                  │
└─────────────────────────────────────────┘
              ↕ (API HTTP)
┌─────────────────────────────────────────┐
│      LLM (Claude Sonnet/Opus/Haiku)     │
│  - Comprende linguaggio naturale        │
│  - Genera risposte                      │
│  - Richiede tool quando necessario      │
│  - Interpreta risultati                 │
└─────────────────────────────────────────┘
\`\`\`

### 1.3 Flusso di una Richiesta

Vediamo cosa succede quando esegui:

\`\`\`bash
claude "Fix the bug in @app.ts"
\`\`\`

**Step 1 - Input Processing (Claude Code)**:
- Legge il file \`app.ts\`
- Costruisce il prompt con contesto
- Invia tutto al modello LLM via API

**Step 2 - AI Reasoning (LLM)**:
- Analizza il codice
- Identifica il bug
- **Richiede tool**: "Ho bisogno di riscrivere app.ts"

**Step 3 - Tool Execution (Claude Code)**:
- Riceve tool request dall'LLM
- Chiede permesso all'utente (se necessario)
- Esegue l'operazione su filesystem
- Restituisce risultato all'LLM

**Step 4 - Confirmation (LLM)**:
- Riceve conferma che il file è stato modificato
- Genera messaggio di successo per l'utente

**Step 5 - Output (Claude Code)**:
- Formatta risposta
- Mostra risultato nel terminale

### 1.4 Perché Questa Architettura?

**Sicurezza**: L'LLM non ha accesso diretto al filesystem. Ogni operazione passa attraverso Claude Code che gestisce permessi.

**Flessibilità**: Puoi cambiare modello LLM (Sonnet → Opus → Haiku) senza cambiare workflow.

**Trasparenza**: Vedi ogni tool request prima che venga eseguita.

**Estensibilità**: Puoi aggiungere nuovi tool tramite MCP (Model Context Protocol) senza modificare l'LLM.

---

## Capitolo 2: Il Sistema di Tool Use

Il vero "potere" di Claude Code è il **tool use system** - la capacità dell'LLM di richiedere operazioni sul filesystem.

### 2.1 Come Funziona Tool Use

Quando l'LLM decide che ha bisogno di eseguire un'azione, genera una **tool request** in formato JSON:

\`\`\`json
{
  "type": "tool_use",
  "id": "toolu_abc123",
  "name": "write_file",
  "input": {
    "path": "src/app.ts",
    "content": "export const app = () => { ... }"
  }
}
\`\`\`

Claude Code riceve questa richiesta, la valida e:

1. **Verifica permessi**: Controlla se l'utente ha già approvato questa operazione
2. **Chiede conferma** (se necessario): Mostra diff e aspetta \`y\` o \`n\`
3. **Esegue l'azione**: Scrive il file su disco
4. **Ritorna risultato** all'LLM:

\`\`\`json
{
  "type": "tool_result",
  "tool_use_id": "toolu_abc123",
  "content": "File written successfully"
}
\`\`\`

### 2.2 Tool Disponibili in Claude Code

Claude Code fornisce questi tool all'LLM (categorie generali):

#### File Operations
Claude Code espone tool per operazioni su file come:
- Lettura contenuto file
- Scrittura/sovrascrittura file
- Modifica porzioni di file esistenti
- Creazione/eliminazione directory
- Lista contenuti directory

> 💡 **Nota**: I nomi esatti dei tool (\`read_file\`, \`write_file\`, etc.) possono variare tra versioni. Gli esempi JSON in questo milestone sono pseudocodice illustrativo, non API stabili garantite.

#### Code Navigation
Tool per navigazione codice:
- Ricerca pattern in file (regex/glob)
- Definizioni simboli (TypeScript/Python)
- Riferimenti a funzioni/classi

#### Execution Tools
Tool per esecuzione comandi:
- Esecuzione comandi shell (npm, git, build scripts)
- Test runner integration
- Dev server management

#### Visual Integration (dipende da interfaccia)
- Analisi screenshot/immagini (supporto varia per terminale/IDE)
- Generazione diagrammi (Mermaid, etc.)

### 2.3 Esempio di Tool Chain

Quando chiedi a Claude Code di "refactorare una funzione", ecco la sequenza di tool:

\`\`\`
User: "Refactor getUserData in @api.ts to use async/await"

LLM → Tool: read_file("api.ts")
↓
Claude Code → Esegue lettura
↓
Claude Code → Ritorna contenuto
↓
LLM → Analizza codice, genera nuova versione
↓
LLM → Tool: write_file("api.ts", new_content)
↓
Claude Code → Mostra diff, chiede conferma
↓
User → Approva con 'y'
↓
Claude Code → Scrive file
↓
Claude Code → Conferma successo a LLM
↓
LLM → "Ho refactorato getUserData per usare async/await"
\`\`\`

### 2.4 Security nel Tool Use

Claude Code implementa tre livelli di protezione:

**1. Permission System**:
- Prima volta che l'LLM richiede un tool, Claude Code chiede conferma
- Puoi approvare per sempre (\`a\`), solo una volta (\`y\`), o rifiutare (\`n\`)
- Configurabile in \`~/.claude/settings.json\` tramite \`permissions.allow\` e \`permissions.deny\`

**2. File Watching**:
- Solo file nel progetto corrente sono accessibili
- Claude Code rispetta \`.gitignore\` automaticamente
- Usa \`permissions.deny\` in settings per escludere file sensibili (es. \`.env\`, config files)
- No accesso a file di sistema critici

**3. Command Validation**:
- Comandi shell passano attraverso sandboxing
- Alcuni comandi pericolosi richiedono sempre conferma (\`rm -rf\`, \`sudo\`)

---

## Capitolo 3: Esempio Completo - Fix di un Bug

Vediamo un esempio reale completo per solidificare la comprensione.

### 3.1 Il Problema

Hai questo file \`calculator.ts\`:

\`\`\`typescript
export function divide(a: number, b: number): number {
  return a / b;
}

export function calculate(operation: string, a: number, b: number): number {
  if (operation === 'divide') {
    return divide(a, b);
  }
  throw new Error('Unknown operation');
}
\`\`\`

Bug: nessun check per divisione per zero!

### 3.2 Lancio Comando

\`\`\`bash
claude "Fix the divide by zero bug in @calculator.ts"
\`\`\`

### 3.3 Sequenza di Tool Use

**Tool Request 1 - Read File**:

\`\`\`json
{
  "name": "read_file",
  "input": { "path": "calculator.ts" }
}
\`\`\`

Claude Code esegue, ritorna il contenuto all'LLM.

**LLM Reasoning**:
"Vedo che \`divide()\` non controlla se \`b === 0\`. Devo aggiungere un check e lanciare un errore."

**Tool Request 2 - Write File**:

\`\`\`json
{
  "name": "write_file",
  "input": {
    "path": "calculator.ts",
    "content": "export function divide(a: number, b: number): number {\n  if (b === 0) {\n    throw new Error('Cannot divide by zero');\n  }\n  return a / b;\n}\n\nexport function calculate(operation: string, a: number, b: number): number {\n  if (operation === 'divide') {\n    return divide(a, b);\n  }\n  throw new Error('Unknown operation');\n}"
  }
}
\`\`\`

**Claude Code - Richiesta Permesso**:

\`\`\`diff
File: calculator.ts
Action: write_file

- export function divide(a: number, b: number): number {
+ export function divide(a: number, b: number): number {
+   if (b === 0) {
+     throw new Error('Cannot divide by zero');
+   }
    return a / b;
  }

Allow? [y]es, [n]o, [a]lways, [v]iew full:
\`\`\`

**User Input**: \`y\`

**Claude Code - Execution**:
Scrive il file su disco.

**Tool Result**:

\`\`\`json
{
  "type": "tool_result",
  "content": "File written successfully to calculator.ts"
}
\`\`\`

**LLM - Final Response**:
"Ho fixato il bug aggiungendo un check per divisione per zero nella funzione \`divide()\`. Ora lancia un errore se \`b === 0\`."

### 3.4 Cosa Imparare da Questo Esempio

1. **L'LLM non "vede" il file** finché non lo richiede via tool
2. **Ogni modifica richiede conferma** (a meno che non sia in \`permissions.allow\`)
3. **Il processo è trasparente**: vedi ogni step
4. **Tool use è sequenziale**: read → reason → write → confirm

---

## Capitolo 4: Best Practices per Tool-Aware Development

Ora che conosci l'architettura, ecco come sfruttarla al meglio.

### 4.1 Scrivi Prompt Pensando ai Tool

❌ **Generico**:
\`\`\`bash
claude "Make the app faster"
\`\`\`

✅ **Tool-aware**:
\`\`\`bash
claude "Analyze performance bottlenecks in @src/**/*.ts and suggest optimizations. Show me the top 3 changes."
\`\`\`

Il secondo prompt guida l'LLM verso tool specifici (\`search_files\`, \`read_file\`) e produce risultati più mirati.

### 4.2 Usa @references per Ridurre Tool Calls

Invece di lasciare che l'LLM richieda file:

❌ **Inefficiente**:
\`\`\`bash
claude "Explain how authentication works in this project"
\`\`\`
(LLM dovrà fare tool requests per trovare i file giusti)

✅ **Efficiente**:
\`\`\`bash
claude "Explain how authentication works" @auth/*.ts @middleware/auth.ts
\`\`\`
(File già inclusi nel contesto, zero tool calls)

### 4.3 Configura Permessi per Workflow Ripetitivi

Per task ripetitivi (es. test automation), configura permessi persistenti:

\`\`\`json
// ~/.claude/settings.json (path corretto 2025)
{
  "permissions": {
    "allow": [
      "Bash(npm run test:*)",
      "Bash(npm run build)",
      "Write(src/generated/**)"
    ],
    "deny": [
      "Read(./.env)",
      "Read(**/*.key)",
      "WebFetch"
    ]
  }
}
\`\`\`

> ⚠️ **Nota**: La sintassi \`permissions.allow\` e \`permissions.deny\` è quella ufficiale di Claude Code 2025. I vecchi formati (\`ignorePatterns\`, etc.) sono deprecati.

### 4.4 Sfrutta Screenshot Integration (dipende da interfaccia)

> ⚠️ **Attenzione**: Il supporto screenshot varia tra interfacce (CLI, VS Code Extension, etc.). Verifica la tua versione specifica.

Alcune interfacce di Claude Code supportano l'analisi di screenshot:

\`\`\`bash
# Avvia modalità interattiva
claude

# Fai screenshot (metodo dipende da OS)
# Incolla (shortcut varia: Control-V, Cmd-V, drag&drop dipende da terminale/IDE)
# Claude Code può chiamare tool per analisi visiva
\`\`\`

Possibili use case (se supportati):
- Replicare UI da mockup
- Debuggare rendering issues
- Implementare design da wireframe

### 4.5 Debugging Tool Use Issues

Se Claude Code sembra "bloccato", probabilmente un tool request è fallito:

**Verifica con la tua CLI**:
\`\`\`bash
# Controlla flag disponibili
claude --help

# Alcune versioni espongono verbose logging
# (il flag esatto dipende dalla versione, es. --verbose, --debug, etc.)
\`\`\`

**Opzioni comuni di debugging**:
- Controlla log/output dettagliato se disponibile
- Verifica permessi in \`~/.claude/settings.json\`
- Rivedi le tool requests nel terminale
- Consulta documentazione della tua versione specifica

> 💡 **Nota**: Comandi come \`claude /config permissions\` e \`claude --debug\` sono esempi concettuali. Verifica sempre con \`claude --help\` i comandi reali disponibili nella tua installazione.

---

## Capitolo 5: Common Misconceptions

### Misconception 1: "Claude Code scrive codice"
❌ **Falso**: Claude Code non scrive codice. L'LLM (Sonnet/Opus/Haiku) genera il codice. Claude Code si limita a eseguire i tool requests (es. \`write_file\`).

✅ **Vero**: Claude Code è un orchestratore che permette all'LLM di interagire con il filesystem.

### Misconception 2: "L'LLM ha accesso ai miei file"
❌ **Falso**: L'LLM **non vede** i tuoi file finché non li richiede via tool, e Claude Code chiede permesso.

✅ **Vero**: L'LLM opera solo su testo che riceve. Claude Code legge i file e li invia all'LLM solo dopo conferma.

### Misconception 3: "Cambiare modello cambia i tool disponibili"
❌ **Falso**: I tool sono forniti da **Claude Code**, non dall'LLM. Sonnet, Opus e Haiku hanno accesso agli stessi tool.

✅ **Vero**: Cambiare modello cambia solo "intelligenza" e velocità, non capacità.

### Misconception 4: "Claude Code salva codice nel cloud"
❌ **Falso**: I file del tuo progetto rimangono locali. Le conversazioni sono salvate localmente (la posizione esatta dipende dalla piattaforma, tipicamente \`~/.claude/\`).

✅ **Vero**: Porzioni di testo/codice usate come contesto vengono inviate all'API LLM nel rispetto delle policy di privacy di Anthropic. Il codice generato è scritto localmente su tuo filesystem.

### Misconception 5: "Devo essere online per usare Claude Code"
❌ **Parzialmente vero**: Claude Code richiede connessione per comunicare con l'API LLM di Anthropic.

✅ **Scenario futuro/sperimentale**: L'uso di modelli self-hosted (Ollama, LM Studio, etc.) è in sperimentazione in alcune build, ma non è una feature ufficiale garantita di tutte le versioni di Claude Code. Controlla la roadmap ufficiale per aggiornamenti.

---

## Capitolo 6: Architettura Estesa - MCP e Agent SDK

L'architettura a tre livelli è estensibile tramite:

### 6.1 Model Context Protocol (MCP)

MCP ti permette di aggiungere **nuovi tool custom** senza modificare Claude Code.

Esempio concettuale: configurazione MCP per database Postgres:

\`\`\`json
// Esempio pseudocodice (verifica docs MCP ufficiali per sintassi precisa)
{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "DATABASE_URL": "postgresql://localhost/mydb"
      }
    }
  }
}
\`\`\`

> ⚠️ **Nota**: Questo è un esempio per illustrare il concetto. La struttura esatta del file di config MCP e i nomi dei campi dipendono dal server MCP specifico che usi. Consulta sempre la documentazione del server MCP che stai integrando.

### 6.2 Agent SDK (Python/TypeScript)

Per integrazioni programmatiche (esempio concettuale):

\`\`\`typescript
// Pseudocodice illustrativo - verifica pacchetti ufficiali Anthropic
import { AnthropicClient } from '@anthropic-ai/sdk';

const client = new AnthropicClient({
  apiKey: process.env.ANTHROPIC_API_KEY
});

const result = await client.messages.create({
  model: 'claude-sonnet-4-5',
  messages: [{ role: 'user', content: 'Analyze code' }],
  // Tool use configuration dipende da SDK specifico
});
\`\`\`

> ⚠️ **Nota**: Gli snippet SDK sono pseudocodice per illustrare il concetto. Per codice reale, fai riferimento ai pacchetti ufficiali Anthropic per la tua lingua:
> - **TypeScript/JavaScript**: \`@anthropic-ai/sdk\`
> - **Python**: \`anthropic\`
>
> Consulta la documentazione ufficiale per API, parametri e best practices aggiornate.

**Use cases** (con SDK reali):
- GitHub Actions (CI/CD automation)
- Custom dashboard e monitoring
- Batch processing di file

**Approfondimento**: Milestone 10 (Hooks & MCP) e Milestone 12 (GitLab/GitHub CI/CD)

---

## Riepilogo

Congratulazioni! 🎉 Ora capisci davvero come funziona Claude Code.

**Hai imparato**:

✅ **Architettura a tre livelli**: Tu → Claude Code (orchestrator) → LLM
✅ **Tool use system**: Come l'LLM richiede operazioni e Claude Code le esegue
✅ **Tool disponibili**: File ops, code navigation, execution, visual integration
✅ **Sequenza completa**: Da prompt a tool request a execution a risultato
✅ **Security model**: Permessi, file watching, command validation
✅ **Best practices**: Prompt tool-aware, @references, screenshot integration
✅ **Debugging**: Verbose mode, config, permission management
✅ **Common misconceptions**: Separazione tra orchestrator e LLM
✅ **Estensibilità**: MCP per custom tools, Agent SDK per programmatic access

**Perché è importante**:

1. **Scrivi prompt migliori** - sai quali tool l'LLM può usare
2. **Anticipa comportamenti** - comprendi la sequenza read → reason → write
3. **Debuggi velocemente** - identifichi se il problema è nell'LLM o nel tool
4. **Ottimizzi workflow** - configuri permessi e usi @references
5. **Costruisci integrazioni** - conosci i punti di estensione (MCP, SDK)

**Prossimi Passi**:

Nelle prossime milestones applicherai questa conoscenza per:
- **Milestone 6**: Creare Subagents che sfruttano tool use
- **Milestone 7**: Integrare MCP servers (GitHub, Brave, Supabase)
- **Milestone 8**: Creare Agent Skills custom
- **Milestone 9**: Usare SDKs per automation

L'architettura è la base. Ora costruiamo sopra! 🚀
  `,
  xp: 200,
  badge: "🏗️ Architetto",
  estimatedTime: "1 ora",
  topics: [
    "Architettura a tre livelli",
    "Tool use system",
    "Orchestrazione",
    "Security model",
    "File operations",
    "Code navigation",
    "Debugging tool use",
    "MCP e Agent SDK"
  ],
  quiz: {
    questions: [
      {
        id: "m5-q1",
        question: "Quale affermazione descrive correttamente il ruolo di Claude Code?",
        options: [
          "Claude Code è il modello LLM che genera il codice",
          "Claude Code è un orchestratore che permette all'LLM di interagire con il filesystem",
          "Claude Code è un editor di codice con AI integrata",
          "Claude Code è un servizio cloud che salva il tuo codice"
        ],
        correctAnswer: 1,
        explanation: "Claude Code **non è** l'AI. È un orchestratore (bridge) tra te e il modello LLM (Sonnet/Opus/Haiku), fornendo tool che permettono all'LLM di leggere/scrivere file, eseguire comandi, etc."
      },
      {
        id: "m5-q2",
        question: "Quando l'LLM vuole modificare un file, cosa succede?",
        options: [
          "L'LLM modifica direttamente il file sul filesystem",
          "L'LLM genera una 'tool request' che Claude Code esegue dopo aver chiesto permesso",
          "Claude Code modifica il file e poi chiede conferma all'LLM",
          "Il file viene inviato ad Anthropic per la modifica"
        ],
        correctAnswer: 1,
        explanation: "L'LLM **non ha accesso diretto** al filesystem. Genera una 'tool request' (es. write_file) in formato JSON, Claude Code valida la richiesta, chiede permesso all'utente (se necessario), esegue l'operazione e ritorna il risultato all'LLM."
      },
      {
        id: "m5-q3",
        question: "Quale di questi NON è un tool fornito da Claude Code?",
        options: [
          "read_file - Legge contenuto di un file",
          "execute_command - Esegue comandi shell",
          "deploy_to_cloud - Deploy automatico su AWS",
          "analyze_screenshot - Analizza immagini incollate"
        ],
        correctAnswer: 2,
        explanation: "Claude Code fornisce tool per operazioni locali (file ops, code navigation, execution, visual integration). NON include tool per deploy cloud - questi vanno implementati tramite MCP (Model Context Protocol) o custom scripts."
      },
      {
        id: "m5-q4",
        question: "Perché l'architettura a tre livelli (User → Claude Code → LLM) è vantaggiosa?",
        options: [
          "Permette di cambiare modello LLM senza cambiare tool disponibili",
          "L'LLM lavora più velocemente avendo accesso diretto ai file",
          "Riduce i costi perché non serve API key",
          "Claude Code può funzionare offline senza connessione internet"
        ],
        correctAnswer: 0,
        explanation: "La separazione tra orchestrator (Claude Code) e LLM permette flessibilità: puoi switchare tra Sonnet/Opus/Haiku senza cambiare tool. Inoltre garantisce security (l'LLM non ha accesso diretto al filesystem) e trasparenza (vedi ogni tool request)."
      },
      {
        id: "m5-q5",
        question: "Quale sintassi usi in ~/.claude/settings.json per permettere automaticamente comandi npm test e build?",
        options: [
          "ignorePatterns: [\"npm run test:*\", \"npm run build\"]",
          "allowCommands: [\"npm test\", \"npm build\"]",
          "permissions.allow: [\"Bash(npm run test:*)\", \"Bash(npm run build)\"]",
          "autoApprove: { bash: [\"npm test\", \"npm build\"] }"
        ],
        correctAnswer: 2,
        explanation: "La sintassi ufficiale di Claude Code 2025 usa l'array 'permissions.allow' con pattern come \"Bash(npm run test:*)\" per permettere automaticamente specifici comandi shell. Questo evita di dover approvare manualmente test e build ripetitivi."
      }
    ]
  },
  challenge: {
    title: "Debugging Tool Use in Azione",
    description: "Sperimenta con il sistema di tool use osservando come Claude Code orchestra le operazioni tra te e l'LLM",
    instructions: [
      "Crea una directory di test: 'mkdir ~/claude-test && cd ~/claude-test'",
      "Crea un file con bug intenzionale: 'echo \"function divide(a, b) { return a / b; }\" > calc.js'",
      "Avvia Claude Code: 'claude \"Fix divide by zero bug in @calc.js\"'",
      "Osserva nel terminale la sequenza di tool requests (file read → file write)",
      "Quando Claude Code chiede permesso per scrivere, scegli 'v' (se disponibile) per vedere il diff completo",
      "Approva con 'y' e osserva il tool result che conferma il successo",
      "Verifica il file modificato: 'cat calc.js'",
      "Crea ~/.claude/settings.json con permissions.allow per file .js: {\"permissions\": {\"allow\": [\"Write(*.js)\"]}}",
      "Ripeti l'operazione su un altro file e osserva che Claude Code non chiede più conferma per modifiche a file .js"
    ],
    verificationSteps: [
      "✅ Hai visto nel terminale le tool requests per calc.js",
      "✅ Hai visto la richiesta di modifica file con il nuovo contenuto",
      "✅ Hai approvato la modifica e verificato il successo",
      "✅ Il file calc.js ora contiene un check per divisione per zero",
      "✅ Hai configurato permissions.allow in ~/.claude/settings.json",
      "✅ Comprendi che l'LLM richiede tool, Claude Code li esegue dopo conferma"
    ]
  }
};
