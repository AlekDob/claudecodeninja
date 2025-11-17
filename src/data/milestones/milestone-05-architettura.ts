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

Claude Code fornisce questi tool all'LLM:

#### File Operations
- \`read_file\`: Legge contenuto di un file
- \`write_file\`: Scrive o sovrascrive un file
- \`edit_file\`: Modifica porzioni di file esistente
- \`delete_file\`: Elimina un file
- \`create_directory\`: Crea una directory
- \`list_directory\`: Lista contenuti di una directory

#### Code Navigation
- \`search_files\`: Cerca pattern in file (regex)
- \`find_definition\`: Trova definizione di simbolo (TypeScript/Python)
- \`find_references\`: Trova tutti gli usi di un simbolo

#### Execution Tools
- \`execute_command\`: Esegue comandi shell (npm, git, etc.)
- \`run_tests\`: Esegue test suite
- \`start_dev_server\`: Avvia server di sviluppo

#### Visual Integration
- \`analyze_screenshot\`: Analizza immagini incollate con Control-V
- \`generate_diagram\`: Crea diagrammi Mermaid

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
- Configurabile in \`~/.config/claude/settings.json\`

**2. File Watching**:
- Solo file nel progetto corrente sono accessibili
- Rispetta \`.claudeignore\` per esclusioni
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
2. **Ogni modifica richiede conferma** (a meno che non usi \`--always-allow\`)
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

Per task ripetitivi (es. test automation), configura \`always_allow\`:

\`\`\`json
// ~/.config/claude/settings.json
{
  "permissions": {
    "execute_command": {
      "npm test": "always",
      "npm run build": "always"
    },
    "write_file": {
      "src/generated/**": "always"
    }
  }
}
\`\`\`

### 4.4 Sfrutta Screenshot Integration

Claude Code può analizzare screenshot incollati con **Control-V** (non Command-V su macOS!):

\`\`\`bash
# Avvia modalità interattiva
claude

# Fai uno screenshot (macOS: Cmd+Shift+4)
# Incolla con Control-V (non Cmd-V!)
# Claude Code chiama tool analyze_screenshot
\`\`\`

Usa questo per:
- Replicare UI da mockup
- Debuggare rendering issues
- Implementare design esatti

### 4.5 Debugging Tool Use Issues

Se Claude Code sembra "bloccato", probabilmente un tool request è fallito:

**Abilita verbose mode**:
\`\`\`bash
claude --verbose "Your command"
\`\`\`

Vedrai:
- Ogni tool request
- Input/output di ogni tool
- Errori dettagliati

**Comandi diagnostici**:
\`\`\`bash
# Check permessi correnti
claude /config permissions

# Reset permessi per un path
claude /config reset-permissions src/

# View tool use history
claude --debug
\`\`\`

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
❌ **Falso**: Tutto rimane locale. Claude Code salva conversazioni in \`~/.config/claude/conversations/\` sul tuo computer.

✅ **Vero**: Solo i prompt e le risposte vengono inviati all'API di Anthropic. Il codice generato è scritto localmente.

### Misconception 5: "Devo essere online per usare Claude Code"
❌ **Parzialmente vero**: Claude Code richiede connessione per comunicare con l'API LLM.

✅ **Futuro**: Con self-hosted models (via Ollama/LMStudio) potrai usare Claude Code offline.

---

## Capitolo 6: Architettura Estesa - MCP e Agent SDK

L'architettura a tre livelli è estensibile tramite:

### 6.1 Model Context Protocol (MCP)

MCP ti permette di aggiungere **nuovi tool custom** senza modificare Claude Code.

Esempio: tool per accedere a database Postgres:

\`\`\`json
// .mcp.json
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

Ora l'LLM può usare tool come \`query_database\`, \`list_tables\`, etc.

### 6.2 Agent SDK (Python/TypeScript)

Per integrazioni programmatiche:

\`\`\`typescript
import { ClaudeClient } from '@anthropic-ai/claude-sdk';

const client = new ClaudeClient({ apiKey: process.env.ANTHROPIC_API_KEY });

const result = await client.chat({
  model: 'sonnet',
  messages: [{ role: 'user', content: 'Analyze @app.ts' }],
  tools: ['read_file', 'write_file']
});
\`\`\`

Userai questo per:
- GitHub Actions (CI/CD automation)
- Custom dashboard
- Batch processing

**Approfondimento**: Milestone 9 (SDKs & Automation) e Milestone 7 (MCP Integration)

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
  estimatedTime: "1-2 ore",
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
        question: "Come incolli uno screenshot per analisi in Claude Code (su macOS)?",
        options: [
          "Fai screenshot con Cmd+Shift+4, poi incolla con Cmd+V",
          "Fai screenshot con Cmd+Shift+4, poi incolla con Control-V",
          "Trascini l'immagine nel terminale",
          "Usi il comando 'claude --screenshot path/to/image.png'"
        ],
        correctAnswer: 1,
        explanation: "Su macOS devi usare **Control-V** (non Cmd-V!) per incollare screenshot in Claude Code. Il sistema rileva l'immagine e chiama il tool 'analyze_screenshot' per permettere all'LLM di analizzare visivamente il contenuto."
      }
    ]
  },
  challenge: {
    title: "Debugging Tool Use in Azione",
    description: "Sperimenta con il sistema di tool use osservando come Claude Code orchestra le operazioni tra te e l'LLM",
    instructions: [
      "Crea una directory di test: 'mkdir ~/claude-test && cd ~/claude-test'",
      "Crea un file con bug intenzionale: 'echo \"function divide(a, b) { return a / b; }\" > calc.js'",
      "Avvia Claude Code in verbose mode: 'claude --verbose \"Fix divide by zero bug in @calc.js\"'",
      "Osserva nel terminale la sequenza di tool requests (read_file → write_file)",
      "Quando Claude Code chiede permesso per write_file, scegli 'v' (view full) per vedere il diff completo",
      "Approva con 'y' e osserva il tool result che conferma il successo",
      "Verifica il file modificato: 'cat calc.js'",
      "Esegui 'claude /config permissions' per vedere i permessi correnti",
      "Ripeti l'operazione su un altro file, questa volta approva con 'a' (always) e osserva come non chiede più conferma"
    ],
    verificationSteps: [
      "✅ Hai visto nel verbose mode la tool request 'read_file' per calc.js",
      "✅ Hai visto la tool request 'write_file' con il nuovo contenuto",
      "✅ Hai usato 'v' per visualizzare il diff completo prima di approvare",
      "✅ Il file calc.js ora contiene un check per divisione per zero",
      "✅ Hai visualizzato i permessi con 'claude /config permissions'",
      "✅ Comprendi che l'LLM richiede tool, Claude Code li esegue dopo conferma"
    ]
  }
};
