import { Milestone } from '../../types';

export const milestone12: Milestone = {
  id: 10,
  title: "Hooks & MCP: Extend Claude Code",
  subtitle: "Automazioni lifecycle con Hooks e integrazione Model Context Protocol per connettere Claude a tool esterni",
  description: `
# Milestone 12: Hooks & MCP - Extend Claude Code

Congratulazioni! Hai completato le prime 11 milestone e padroneggiato Claude Code come **coding assistant**. Ma se potessi trasformarlo in un **sistema estendibile** che:
- Si **auto-formatta** dopo ogni edit (PreToolUse hook con Prettier)
- **Blocca commit** se rileva secrets esposti (PreCommit hook con git-secrets)
- **Legge Stripe transactions** per generare dashboard real-time (MCP server)
- **Accede a Figma designs** per generare pixel-perfect components (Figma MCP)
- **Interagisce con 500+ app** (Gmail, Slack, Notion) via MCP

Questa milestone ti insegna a **estendere Claude Code oltre i suoi limiti** con:
1. **Hooks System** - Event listeners che intercettano ogni azione di Claude
2. **Model Context Protocol (MCP)** - "USB-C per AI" che connette Claude a database/API/tool esterni

Dopo questa milestone, Claude Code non sarà più "solo un assistente" ma **la tua AI infrastructure platform** 🚀

## Capitolo 1: Hooks System Fundamentals

### 1.1 Cos'è il Hooks System?

Immagina di poter **intercettare ogni azione di Claude Code** prima che accada. Ogni volta che legge un file, scrive codice, fa commit, invia notifiche.

**Hooks = Event Listeners per l'Agent Loop di Claude Code**

Rilasciati a giugno 2025, i hooks trasformano "suggerimenti via prompt" in **codice eseguibile** che gira automaticamente.

**Lifecycle Events disponibili:**

\`\`\`typescript
// Hook types in Claude Code (aggiornato a v2.0.43)
PreToolUse      // Prima che Claude usi qualsiasi tool
PostToolUse     // Dopo che un tool completa con successo
Notification    // Quando Claude invia una notifica
Stop            // Quando Claude finisce la risposta
SubagentStart   // Quando inizia un subagent (nuovo in v2.0.43!)
\`\`\`

**Novità v2.0.43 (Novembre 2025):**
- ✨ **SubagentStart hook**: Intercetta l'avvio di ogni subagent per logging, monitoring, resource allocation
- 🔧 **tool_use_id**: PreToolUse e PostToolUse ora espongono \`{{tool_use_id}}\` per tracking granulare
- 🎯 **Use case SubagentStart**: Audit trail subagent, pre-allocazione risorse, custom permission per agent specifici

**Esempio reale - Auto-formatting:**

Senza hooks (manuale, lento):
\`\`\`bash
# Ogni volta dopo che Claude edita un file TypeScript
npm run prettier src/components/Button.tsx
\`\`\`

Con hooks (automatico, istantaneo):
\`\`\`json
// .claude/settings.json
{
  "hooks": {
    "PostToolUse": {
      "Edit": "prettier --write {{file_path}}"
    }
  }
}
\`\`\`

Ora **ogni Edit viene auto-formattato** senza che tu debba chiedere! 🎯

### 1.2 Installazione Git Hooks

Claude Code può installare **git hooks nativi** (pre-commit, post-commit, pre-push):

\`\`\`bash
# Install all git hooks for Claude Code
claude git-hooks --install

# Hooks installati in .git/hooks/:
# - pre-commit   → Validazione prima del commit
# - post-commit  → Azioni dopo commit (notifiche, cleanup)
# - pre-push     → Controlli prima del push (tests, linting)
\`\`\`

**File di configurazione hooks:**

\`\`\`bash
# Ordine di priorità (dal più specifico al globale)
.claude/settings.local.json    # Local (non in git, per te)
.claude/settings.json          # Project (committed, per team)
~/.claude/settings.json        # User global (tutti i progetti)
\`\`\`

### 1.3 Anatomy di un Hook

**Struttura base:**

\`\`\`json
{
  "hooks": {
    "EventType": {
      "ToolName": "command-to-execute {{variables}}"
    }
  }
}
\`\`\`

**Variabili disponibili:**

\`\`\`typescript
// PostToolUse variables per tool Edit
{{file_path}}      // /src/components/Button.tsx
{{old_string}}     // Testo sostituito
{{new_string}}     // Nuovo testo
{{success}}        // true/false
{{tool_use_id}}    // Unique ID per tracking (nuovo v2.0.43!)

// PreToolUse variables per tool Bash
{{command}}        // git commit -m "feat: add button"
{{description}}    // Git commit with message
{{tool_use_id}}    // Unique ID per tracking (nuovo v2.0.43!)

// Comune a tutti i tools
{{tool_name}}      // "Edit", "Bash", "Read", etc.
{{timestamp}}      // ISO 8601 timestamp
\`\`\`

**🆕 tool_use_id (v2.0.43)**: Ogni tool execution ora ha un ID univoco. Utile per:
- Correlazione tra PreToolUse e PostToolUse dello stesso tool call
- Distributed tracing nei log
- Debugging tool execution failures

**Hook complesso - Linting + Formatting:**

\`\`\`json
{
  "hooks": {
    "PostToolUse": {
      "Edit": "eslint --fix {{file_path}} && prettier --write {{file_path}}"
    }
  }
}
\`\`\`

**Risultato:** Ogni edit → ESLint corregge errori → Prettier formatta codice. Zero intervento manuale! ✨

### 1.4 Hook Best Practices

**1. Block at Submit, Not at Write**

❌ **Sbagliato** - Bloccare durante la scrittura:
\`\`\`json
{
  "hooks": {
    "PreToolUse": {
      "Edit": "validate-syntax.sh {{file_path}}"
    }
  }
}
\`\`\`
Problema: Claude si blocca ad ogni edit, anche intermedi.

✅ **Corretto** - Validare al commit:
\`\`\`json
{
  "hooks": {
    "PreCommit": "npm run test && npm run lint"
  }
}
\`\`\`
Claude lavora liberamente, validation solo al commit finale.

**2. Organize Hook Scripts**

Crea directory dedicata per hooks complessi:

\`\`\`bash
project-root/
├── .claude/
│   ├── settings.json
│   └── hooks/
│       ├── pre-commit-secrets.sh      # Secret scanning
│       ├── post-edit-format.sh        # Auto-formatting
│       └── notification-slack.sh      # Slack notifications
\`\`\`

Poi usa nei settings:
\`\`\`json
{
  "hooks": {
    "PreCommit": "./.claude/hooks/pre-commit-secrets.sh",
    "PostToolUse": {
      "Edit": "./.claude/hooks/post-edit-format.sh {{file_path}}"
    }
  }
}
\`\`\`

**3. Performance - Conditional Execution**

Esegui hooks solo per file rilevanti:

\`\`\`bash
# post-edit-format.sh
#!/bin/bash
FILE_PATH=$1

# Solo .ts/.tsx files
if [[ "$FILE_PATH" =~ \.(ts|tsx)$ ]]; then
  prettier --write "$FILE_PATH"
fi

# Solo .go files
if [[ "$FILE_PATH" =~ \.go$ ]]; then
  gofmt -w "$FILE_PATH"
fi
\`\`\`

**4. Error Handling**

Hooks devono fallire gracefully:

\`\`\`bash
#!/bin/bash
set -e  # Exit on error

# Run with timeout
timeout 30s npm run lint || {
  echo "⚠️  Linting timeout (30s), skipping..."
  exit 0  # Don't block Claude, just warn
}
\`\`\`

## Capitolo 2: Hook Automation Patterns

### 2.1 Pattern 1: Auto-Formatting

**Use case:** Claude genera codice non formattato, tu vuoi consistency automatica.

**Setup multi-language:**

\`\`\`json
{
  "hooks": {
    "PostToolUse": {
      "Edit": "./.claude/hooks/format.sh {{file_path}}"
    }
  }
}
\`\`\`

**Script format.sh:**

\`\`\`bash
#!/bin/bash
FILE="$1"

# TypeScript/JavaScript
if [[ "$FILE" =~ \.(ts|tsx|js|jsx)$ ]]; then
  prettier --write "$FILE"
  echo "✅ Formatted: $FILE (Prettier)"
fi

# Go
if [[ "$FILE" =~ \.go$ ]]; then
  gofmt -w "$FILE"
  echo "✅ Formatted: $FILE (gofmt)"
fi

# Python
if [[ "$FILE" =~ \.py$ ]]; then
  black "$FILE"
  echo "✅ Formatted: $FILE (Black)"
fi

# Rust
if [[ "$FILE" =~ \.rs$ ]]; then
  rustfmt "$FILE"
  echo "✅ Formatted: $FILE (rustfmt)"
fi
\`\`\`

**Risultato:** Ogni file editato da Claude → auto-formatted istantaneamente! 🎨

### 2.2 Pattern 2: Secret Scanning

**Use case:** Evitare commit di API keys, passwords, tokens per errore.

**Pre-commit hook con git-secrets:**

\`\`\`bash
# Install git-secrets (one time)
brew install git-secrets  # macOS
# apt-get install git-secrets  # Linux

# Setup in project
git secrets --install
git secrets --register-aws  # AWS keys
git secrets --add 'sk-[a-zA-Z0-9]{32,}'  # OpenAI keys
git secrets --add 'ghp_[a-zA-Z0-9]{36}'  # GitHub tokens
\`\`\`

**Hook configuration:**

\`\`\`json
{
  "hooks": {
    "PreCommit": "git secrets --scan"
  }
}
\`\`\`

**In azione:**

\`\`\`bash
# Claude prova a committare file con secret
git commit -m "Add config"

# Hook blocca commit:
❌ Found AWS key in config.js:12
❌ Commit blocked to protect secrets!
\`\`\`

### 2.3 Pattern 3: Conventional Commits Enforcement

**Use case:** Team deve seguire Conventional Commits spec, Claude non sempre lo fa.

**Pre-commit hook per commit message:**

\`\`\`bash
# .claude/hooks/validate-commit-msg.sh
#!/bin/bash
COMMIT_MSG=$(git log -1 --pretty=%B)

# Regex per Conventional Commits
PATTERN="^(feat|fix|docs|style|refactor|test|chore)(\(.+\))?: .{1,100}$"

if ! echo "$COMMIT_MSG" | grep -qE "$PATTERN"; then
  echo "❌ Invalid commit message format!"
  echo ""
  echo "Expected: <type>(scope): <subject>"
  echo "Examples:"
  echo "  feat(auth): add OAuth2 login"
  echo "  fix(api): resolve null pointer in handler"
  echo ""
  exit 1
fi

echo "✅ Commit message valid"
\`\`\`

**Hook config:**

\`\`\`json
{
  "hooks": {
    "PreCommit": "./.claude/hooks/validate-commit-msg.sh"
  }
}
\`\`\`

### 2.4 Pattern 4: Quick Tests on Commit

**Use case:** Eseguire solo test rilevanti (non tutta la suite) al commit.

**Smart test hook:**

\`\`\`bash
# .claude/hooks/smart-test.sh
#!/bin/bash

# Get modified files
CHANGED_FILES=$(git diff --cached --name-only --diff-filter=ACM)

# Detect affected areas
if echo "$CHANGED_FILES" | grep -q "src/auth/"; then
  echo "🧪 Running auth tests..."
  npm test -- --testPathPattern=auth
fi

if echo "$CHANGED_FILES" | grep -q "src/api/"; then
  echo "🧪 Running API tests..."
  npm test -- --testPathPattern=api
fi

# Always run critical path
echo "🧪 Running critical path tests..."
npm test -- --testPathPattern=critical
\`\`\`

**Hook config:**

\`\`\`json
{
  "hooks": {
    "PreCommit": "./.claude/hooks/smart-test.sh"
  }
}
\`\`\`

**Risultato:** Invece di 500 test (5 min), esegui solo 20 test rilevanti (30 sec) ⚡

### 2.5 Pattern 5: Slack Notifications

**Use case:** Notificare team quando Claude completa feature importanti.

**Notification hook:**

\`\`\`bash
# .claude/hooks/notify-slack.sh
#!/bin/bash
MESSAGE="$1"
SLACK_WEBHOOK="https://hooks.slack.com/services/YOUR/WEBHOOK/URL"

# Only notify for important messages
if [[ "$MESSAGE" =~ (completed|deployed|fixed critical) ]]; then
  curl -X POST "$SLACK_WEBHOOK" \
    -H 'Content-Type: application/json' \
    -d "{\\"text\\": \\"🤖 Claude Code: $MESSAGE\\"}"
fi
\`\`\`

**Hook config:**

\`\`\`json
{
  "hooks": {
    "Notification": "./.claude/hooks/notify-slack.sh '{{message}}'"
  }
}
\`\`\`

### 2.6 Pattern 6: Logging & Compliance

**Use case:** Audit trail per compliance (chi ha modificato cosa e quando).

**Audit log hook:**

\`\`\`bash
# .claude/hooks/audit-log.sh
#!/bin/bash
TOOL="$1"
TOOL_USE_ID="$2"
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
LOG_FILE=".claude/audit.log"

# Log tool usage con unique ID
echo "$TIMESTAMP | $TOOL | $TOOL_USE_ID | $USER | $PWD" >> "$LOG_FILE"

# Send to central compliance server (optional)
curl -X POST https://compliance.company.com/api/logs \
  -H "Authorization: Bearer $COMPLIANCE_TOKEN" \
  -d "{\\"timestamp\\": \\"$TIMESTAMP\\", \\"tool\\": \\"$TOOL\\", \\"tool_use_id\\": \\"$TOOL_USE_ID\\", \\"user\\": \\"$USER\\"}"
\`\`\`

**Hook config:**

\`\`\`json
{
  "hooks": {
    "PostToolUse": {
      "*": "./.claude/hooks/audit-log.sh {{tool_name}} {{tool_use_id}}"
    }
  }
}
\`\`\`

**Risultato - audit.log:**

\`\`\`
2025-01-17T14:23:45Z | Edit | tool_abc123 | alek | /Users/alek/project
2025-01-17T14:24:12Z | Bash | tool_def456 | alek | /Users/alek/project
2025-01-17T14:25:03Z | Grep | tool_ghi789 | alek | /Users/alek/project
\`\`\`

Ogni azione tracciata con **unique ID** per compliance ISO 27001, SOC 2, GDPR! 📋

**🆕 Esempio tool_use_id - Correlazione Pre/Post:**

\`\`\`bash
# .claude/hooks/track-tool-performance.sh
#!/bin/bash
HOOK_TYPE="$1"  # "pre" or "post"
TOOL_NAME="$2"
TOOL_USE_ID="$3"
PERFORMANCE_LOG=".claude/performance.log"

if [ "$HOOK_TYPE" = "pre" ]; then
  # Record start time
  echo "$TOOL_USE_ID|$TOOL_NAME|$(date +%s%3N)|START" >> "$PERFORMANCE_LOG"
else
  # Record end time and calculate duration
  START_LINE=$(grep "^$TOOL_USE_ID|" "$PERFORMANCE_LOG" | tail -1)
  START_TIME=$(echo "$START_LINE" | cut -d'|' -f3)
  END_TIME=$(date +%s%3N)
  DURATION=$((END_TIME - START_TIME))

  echo "$TOOL_USE_ID|$TOOL_NAME|$END_TIME|END|\${DURATION}ms" >> "$PERFORMANCE_LOG"

  # Alert if slow
  if [ "$DURATION" -gt 5000 ]; then
    echo "⚠️  Slow tool detected: $TOOL_NAME took \${DURATION}ms"
  fi
fi
\`\`\`

**Hook config per performance tracking:**

\`\`\`json
{
  "hooks": {
    "PreToolUse": {
      "*": "./.claude/hooks/track-tool-performance.sh pre {{tool_name}} {{tool_use_id}}"
    },
    "PostToolUse": {
      "*": "./.claude/hooks/track-tool-performance.sh post {{tool_name}} {{tool_use_id}}"
    }
  }
}
\`\`\`

**Risultato - performance.log:**

\`\`\`
tool_abc123|Edit|1737124425123|START
tool_abc123|Edit|1737124425456|END|333ms
tool_def456|Bash|1737124426789|START
tool_def456|Bash|1737124432890|END|6101ms
⚠️  Slow tool detected: Bash took 6101ms
\`\`\`

Ora hai **distributed tracing** per ogni tool call di Claude Code! 🔍

### 2.7 Pattern 7: SubagentStart Hook (New!)

**Use case:** Monitorare e controllare l'avvio di subagents, allocare risorse, custom permissions.

**⭐ Novità v2.0.43 (Novembre 2025)**: Claude Code ora espone l'evento **SubagentStart** che si triggera quando Claude delega un task a un subagent specializzato.

**Esempio 1 - Subagent Logging:**

\`\`\`json
{
  "hooks": {
    "SubagentStart": "./.claude/hooks/log-subagent.sh '{{subagent_type}}' '{{task_description}}'"
  }
}
\`\`\`

**Script log-subagent.sh:**

\`\`\`bash
#!/bin/bash
SUBAGENT_TYPE="$1"
TASK_DESC="$2"
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

echo "$TIMESTAMP | SubagentStart | Type: $SUBAGENT_TYPE | Task: $TASK_DESC" >> .claude/subagent-audit.log

# Notifica team per subagents critici
if [[ "$SUBAGENT_TYPE" =~ (security-auditor|incident-responder) ]]; then
  curl -X POST "$SLACK_WEBHOOK" \
    -H 'Content-Type: application/json' \
    -d "{\\"text\\": \\"🚨 Critical subagent started: $SUBAGENT_TYPE\\"}"
fi
\`\`\`

**Risultato - subagent-audit.log:**

\`\`\`
2025-11-18T10:23:45Z | SubagentStart | Type: frontend-specialist | Task: Create React dashboard component
2025-11-18T10:24:12Z | SubagentStart | Type: security-auditor | Task: Review authentication flow
2025-11-18T10:25:33Z | SubagentStart | Type: nextsteps-manager | Task: Update project roadmap
\`\`\`

**Esempio 2 - Resource Pre-Allocation:**

\`\`\`bash
# .claude/hooks/allocate-resources.sh
#!/bin/bash
SUBAGENT_TYPE="$1"

case "$SUBAGENT_TYPE" in
  "security-auditor")
    # Allocate extra memory for security scanning
    export NODE_OPTIONS="--max-old-space-size=4096"
    echo "✅ Allocated 4GB RAM for security-auditor"
    ;;
  "content-enricher")
    # Pre-download external resources
    curl -s https://api.openai.com/healthcheck > /dev/null
    echo "✅ Pre-warmed API connections for content-enricher"
    ;;
  *)
    echo "Standard resource allocation"
    ;;
esac
\`\`\`

**Hook config:**

\`\`\`json
{
  "hooks": {
    "SubagentStart": "./.claude/hooks/allocate-resources.sh '{{subagent_type}}'"
  }
}
\`\`\`

**Esempio 3 - Permission Gating:**

\`\`\`bash
# .claude/hooks/check-subagent-permission.sh
#!/bin/bash
SUBAGENT_TYPE="$1"
ENVIRONMENT=$(git branch --show-current)

# Block destructive subagents in production branch
if [[ "$ENVIRONMENT" == "main" ]] && [[ "$SUBAGENT_TYPE" == "incident-responder" ]]; then
  echo "❌ ERROR: incident-responder not allowed on main branch!"
  echo "Please switch to develop branch for incident response tasks"
  exit 1
fi

echo "✅ Permission granted for $SUBAGENT_TYPE on $ENVIRONMENT"
\`\`\`

**Hook config:**

\`\`\`json
{
  "hooks": {
    "SubagentStart": "./.claude/hooks/check-subagent-permission.sh '{{subagent_type}}'"
  }
}
\`\`\`

**Variabili disponibili in SubagentStart:**

\`\`\`typescript
{{subagent_type}}      // "frontend-specialist", "security-auditor", etc.
{{task_description}}   // Descrizione del task delegato
{{timestamp}}          // ISO 8601 timestamp
{{parent_task_id}}     // ID del task parent (opzionale)
\`\`\`

**Use Cases Pratici:**

1. **📊 Analytics**: Traccia quali subagents vengono usati più frequentemente
2. **🔒 Security**: Blocca subagents privilegiati in ambienti non autorizzati
3. **⚡ Performance**: Pre-alloca risorse (RAM, network) per subagents heavy
4. **💰 Cost Tracking**: Logga usage per chargeback interno teams
5. **🚨 Alerting**: Notifica team quando subagents critici (security, incident) si attivano

### 2.8 Pattern 8: Plugins System (Nov 2025) 🆕

**⭐ Novità Novembre 2025**: Claude Code introduce il **Plugins System**, un modo per installare con un click bundle completi di hooks + agents + MCP servers + slash commands!

**Plugins = One-Click Extension Packs** 📦

Prima: Installare manualmente hooks, MCP server, agents, slash commands (30+ minuti)
Dopo: \`/plugin install nome-plugin\` (10 secondi) ✨

#### Cos'è un Plugin?

Un plugin è una **collezione curata** di:
- 🪝 **Hooks** - Automazioni lifecycle
- 🤖 **Agents** - Subagents specializzati
- 🔌 **MCP Servers** - Integrazioni esterne
- ⚡ **Slash Commands** - Comandi rapidi custom

**Metafora:** I plugin sono come gli "extension packs" di VS Code, ma per Claude Code!

#### Installare un Plugin

**Comando base:**

\`\`\`bash
# List available plugins
claude /plugin list

# Install plugin
claude /plugin install security-pro

# Remove plugin
claude /plugin remove security-pro

# Update all plugins
claude /plugin update
\`\`\`

**Esempio - Security Plugin:**

\`\`\`bash
claude /plugin install security-pro

# Cosa installa automaticamente:
# ✅ Hooks: PreCommit secret scanning, vulnerability check
# ✅ MCP Server: security-scanner (SAST integration)
# ✅ Agent: security-auditor (code review specialist)
# ✅ Slash Commands: /security-audit, /dependency-check
\`\`\`

**Risultato:** In 10 secondi hai un **security toolkit completo**!

#### Plugin Popolari (Gennaio 2025)

**1. security-pro** 🔒
- Secret scanning automatico
- Dependency vulnerability checks
- SAST integration (Semgrep, Snyk)
- Security-auditor agent

\`\`\`bash
claude /plugin install security-pro
# Ready: /security-audit, /dependency-check, /vulnerability-scan
\`\`\`

**2. frontend-toolkit** 🎨
- Component generators
- Design system integration
- Figma MCP server
- Storybook automation

\`\`\`bash
claude /plugin install frontend-toolkit
# Ready: /generate-component, /figma-sync, /storybook-create
\`\`\`

**3. devops-essentials** 🚀
- CI/CD hooks (GitLab, GitHub Actions)
- Deployment automation
- Monitoring integration (Prometheus, Grafana)
- Incident-responder agent

\`\`\`bash
claude /plugin install devops-essentials
# Ready: /deploy, /rollback, /incident-report
\`\`\`

**4. testing-suite** 🧪
- Smart test runners
- Coverage tracking
- Test generation agent
- Mutation testing integration

\`\`\`bash
claude /plugin install testing-suite
# Ready: /test-smart, /coverage-report, /generate-tests
\`\`\`

#### Creare un Plugin Custom

**Plugin structure:**

\`\`\`bash
my-plugin/
├── plugin.json          # Metadata
├── hooks/              # Hook scripts
│   ├── pre-commit.sh
│   └── post-deploy.sh
├── agents/             # Subagent definitions
│   └── custom-agent.md
├── mcp-servers/        # MCP server configs
│   └── custom-mcp.js
└── commands/           # Slash commands
    └── custom-cmd.md
\`\`\`

**plugin.json:**

\`\`\`json
{
  "name": "my-company-plugin",
  "version": "1.0.0",
  "description": "Internal tools for MyCompany workflows",
  "author": "MyCompany DevOps",
  "hooks": {
    "PreCommit": "./hooks/pre-commit.sh",
    "PostDeploy": "./hooks/post-deploy.sh"
  },
  "agents": [
    {
      "name": "company-auditor",
      "path": "./agents/custom-agent.md"
    }
  ],
  "mcpServers": [
    {
      "name": "internal-api",
      "path": "./mcp-servers/custom-mcp.js",
      "transport": "stdio"
    }
  ],
  "commands": [
    {
      "name": "/company-deploy",
      "path": "./commands/custom-cmd.md"
    }
  ]
}
\`\`\`

**Publish plugin:**

\`\`\`bash
# Option 1: npm package
npm publish @mycompany/claude-plugin

# Option 2: Git repository
git tag v1.0.0
git push --tags

# Users install:
claude /plugin install @mycompany/claude-plugin
# or
claude /plugin install github:mycompany/claude-plugin
\`\`\`

#### Plugin Discovery & Marketplace

**Browse plugins:**

\`\`\`bash
# List all available plugins
claude /plugin list

# Search by category
claude /plugin search security
claude /plugin search frontend
claude /plugin search devops

# Get plugin info
claude /plugin info security-pro
\`\`\`

**Output:**

\`\`\`
Plugin: security-pro
Version: 2.1.0
Author: Anthropic Security Team
Downloads: 15,234
Rating: ⭐⭐⭐⭐⭐ (4.8/5)

Includes:
- 3 Hooks (PreCommit, PrePush, PreDeploy)
- 2 Agents (security-auditor, penetration-tester)
- 1 MCP Server (security-scanner)
- 5 Slash Commands (/security-audit, /dependency-check, ...)

Install: claude /plugin install security-pro
\`\`\`

#### Plugin Configuration

**Override defaults:**

\`\`\`json
// .claude/plugin-config.json
{
  "security-pro": {
    "hooks": {
      "PreCommit": {
        "enabled": true,
        "strictMode": false  // Don't block commits, just warn
      }
    },
    "mcpServers": {
      "security-scanner": {
        "apiKey": "\${SECURITY_API_KEY}",
        "severity": "high"  // Only alert on high/critical
      }
    }
  }
}
\`\`\`

**Risultato:** Plugins configurabili per ogni team!

#### Use Case Reale - E-commerce Team

**Before Plugins (setup time: 2 hours):**

\`\`\`bash
# Manualmente:
1. Scaricare e configurare Stripe MCP server (30 min)
2. Setup hooks per secret scanning (20 min)
3. Configurare deployment automation (40 min)
4. Installare testing tools (30 min)
Total: 2 hours + troubleshooting
\`\`\`

**After Plugins (setup time: 2 minutes):**

\`\`\`bash
claude /plugin install stripe-toolkit
claude /plugin install security-pro
claude /plugin install devops-essentials
claude /plugin install testing-suite

# Done! All configured and ready ✨
\`\`\`

**ROI:** 60x faster setup, zero configuration friction!

#### Plugin Ecosystem Stats (Gennaio 2025)

- 📦 **500+ plugins** disponibili
- 🔥 **Top 10 plugins**: 50k+ downloads
- 🌍 **Community**: 1000+ developer contributors
- ⭐ **Avg rating**: 4.6/5

**Trend:** Plugin ecosystem cresce del 40% al mese!

#### Best Practices per Plugins

**1. Start Small, Expand Later**

\`\`\`bash
# Install solo ciò che serve
claude /plugin install security-pro  # Yes
# Non installare 10 plugins subito!
\`\`\`

**2. Review Plugin Permissions**

Ogni plugin dichiara cosa può fare:

\`\`\`bash
claude /plugin info devops-essentials

Permissions:
- ✅ Read: git status, file system
- ⚠️  Write: file system, remote APIs
- 🔴 Execute: bash commands, deployments

# Se non ti fidi, non installare!
\`\`\`

**3. Keep Plugins Updated**

\`\`\`bash
# Update all plugins monthly
claude /plugin update --all

# Auto-update (optional)
claude /plugin auto-update enable
\`\`\`

**4. Use Version Pinning (Enterprise)**

\`\`\`json
// .claude/plugins.lock
{
  "security-pro": "2.1.0",  // Pinned, won't auto-update
  "frontend-toolkit": "^1.5.0"  // Semantic versioning
}
\`\`\`

## Capitolo 3: Model Context Protocol (MCP) Fundamentals

### 3.1 Cos'è MCP?

**Model Context Protocol = USB-C for AI** 🔌

Proprio come USB-C è uno standard universale per connettere dispositivi, **MCP è uno standard aperto per connettere AI a data sources, tools, e business systems**.

**Problema senza MCP:**

\`\`\`
Claude Code → Custom integration → Stripe API
Claude Code → Another custom script → Figma API
Claude Code → Yet another hack → Gmail API
\`\`\`

Ogni integrazione è custom, fragile, non riutilizzabile.

**Soluzione con MCP:**

\`\`\`
Claude Code → MCP Protocol → MCP Server (Stripe)
                           → MCP Server (Figma)
                           → MCP Server (Gmail)
\`\`\`

Uno standard, infinite connessioni! 🚀

### 3.2 Architettura MCP

**Client-Server Protocol:**

\`\`\`
┌─────────────────┐
│   Claude Code   │  ← MCP Client
│  (MCP Client)   │
└────────┬────────┘
         │ MCP Protocol
         ├─────────────────┐
         │                 │
    ┌────▼─────┐    ┌─────▼─────┐
    │  Stripe  │    │   Figma   │  ← MCP Servers
    │   MCP    │    │    MCP    │
    │  Server  │    │   Server  │
    └──────────┘    └───────────┘
\`\`\`

**MCP Servers espongono 3 primitive:**

1. **Resources** - Dati read-only (Stripe transactions, Figma designs)
2. **Tools** - Azioni executable (Create payment, Update design)
3. **Prompts** - Template pre-configurati (Generate invoice, Design review)

### 3.3 Resources - Dati Contestuali

**Esempio - Stripe Transactions Resource:**

\`\`\`typescript
// MCP Server espone resource
{
  "uri": "stripe://transactions/recent",
  "name": "Recent Stripe Transactions",
  "mimeType": "application/json",
  "description": "Last 100 transactions from Stripe"
}
\`\`\`

**Claude Code request:**

\`\`\`bash
# User chiede: "Show me failed payments this week"
# Claude Code usa MCP per leggere resource:
GET stripe://transactions/recent?status=failed&since=2025-01-13
\`\`\`

**Server response:**

\`\`\`json
[
  {
    "id": "ch_3P4K2H",
    "amount": 4999,
    "currency": "eur",
    "status": "failed",
    "failure_code": "insufficient_funds",
    "customer": "cus_ABC123"
  }
]
\`\`\`

Claude Code ora ha **contesto real-time da Stripe** per rispondere intelligentemente! 🎯

### 3.4 Tools - Azioni Eseguibili

**Esempio - Figma Design Update Tool:**

\`\`\`typescript
// MCP Server registra tool
{
  "name": "update_figma_component",
  "description": "Update a Figma component's properties",
  "inputSchema": {
    "type": "object",
    "properties": {
      "fileId": { "type": "string" },
      "componentId": { "type": "string" },
      "properties": { "type": "object" }
    },
    "required": ["fileId", "componentId", "properties"]
  }
}
\`\`\`

**Claude Code execution:**

\`\`\`bash
# User: "Change button color to #FF6B35 in design file ABC"
# Claude Code chiama MCP tool:
CALL update_figma_component({
  fileId: "ABC",
  componentId: "btn-primary",
  properties: { fill: "#FF6B35" }
})
\`\`\`

**Figma si aggiorna automaticamente!** Claude Code ora controlla tool esterni! 🔥

### 3.5 Prompts - Template Riutilizzabili

**Esempio - Invoice Generation Prompt:**

\`\`\`typescript
// MCP Server definisce prompt template
{
  "name": "generate_invoice",
  "description": "Generate invoice from Stripe transaction",
  "arguments": [
    {
      "name": "transaction_id",
      "description": "Stripe transaction ID",
      "required": true
    }
  ]
}
\`\`\`

**Claude Code usage:**

\`\`\`bash
# User: "Create invoice for transaction ch_3P4K2H"
# Claude Code usa MCP prompt:
EXECUTE generate_invoice(transaction_id: "ch_3P4K2H")
\`\`\`

MCP Server:
1. Fetches transaction da Stripe
2. Genera PDF invoice
3. Salva in cloud storage
4. Ritorna download URL

Claude risponde: "✅ Invoice generated: https://invoices.com/xyz.pdf"

### 3.6 MCP Transports

**Come comunicano Client e Server?**

**1. HTTP/HTTPS** (raccomandato per cloud):

\`\`\`bash
# Add remote MCP server via HTTP
claude mcp add --transport http stripe https://mcp.stripe.com
\`\`\`

**2. Stdio** (per server locali):

\`\`\`bash
# Add local MCP server via stdio
claude mcp add --transport stdio local-db node ./mcp-server.js
\`\`\`

**3. Custom** (WebSocket, gRPC):

MCP supporta custom transports per use case avanzati.

### 3.7 Gestione MCP Servers in Claude Code

**Comandi CLI:**

\`\`\`bash
# List configured MCP servers
claude mcp list

# Add MCP server
claude mcp add --transport http stripe https://mcp.stripe.com

# Remove MCP server
claude mcp remove stripe

# Test MCP server connection
claude mcp test stripe
\`\`\`

**Configuration file (.mcp.json):**

\`\`\`json
{
  "mcpServers": {
    "stripe": {
      "transport": "http",
      "url": "https://mcp.stripe.com",
      "apiKey": "sk_live_..."
    },
    "figma": {
      "transport": "http",
      "url": "https://mcp.figma.com",
      "token": "figd_..."
    }
  }
}
\`\`\`

Ora Claude Code può **leggere Stripe data E modificare Figma designs** in un unico workflow! 🚀

## Capitolo 4: Building MCP Servers

### 4.1 MCP Server Anatomy

**Minimal MCP Server structure:**

\`\`\`typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

// 1. Create server instance
const server = new Server(
  {
    name: "my-mcp-server",
    version: "1.0.0"
  },
  {
    capabilities: {
      resources: {},  // Expose resources
      tools: {},      // Expose tools
      prompts: {}     // Expose prompts
    }
  }
);

// 2. Register resources/tools/prompts
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return { resources: [...] };
});

// 3. Start server
const transport = new StdioServerTransport();
await server.connect(transport);
\`\`\`

### 4.2 Tutorial: Weather MCP Server (TypeScript)

**Use case:** Claude Code può leggere meteo real-time per pianificare deployment.

**Step 1 - Setup progetto:**

\`\`\`bash
mkdir weather-mcp-server
cd weather-mcp-server
npm init -y
npm install @modelcontextprotocol/sdk node-fetch
\`\`\`

**Step 2 - server.ts:**

\`\`\`typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  ListToolsRequestSchema,
  CallToolRequestSchema
} from "@modelcontextprotocol/sdk/types.js";
import fetch from "node-fetch";

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

const server = new Server(
  { name: "weather-server", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

// Register tool: get_forecast
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "get_forecast",
      description: "Get weather forecast for a city",
      inputSchema: {
        type: "object",
        properties: {
          city: {
            type: "string",
            description: "City name (e.g., 'Milan', 'Rome')"
          },
          days: {
            type: "number",
            description: "Number of days (1-7)",
            default: 3
          }
        },
        required: ["city"]
      }
    }
  ]
}));

// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "get_forecast") {
    const { city, days = 3 } = request.params.arguments;

    const response = await fetch(
      \`https://api.weatherapi.com/v1/forecast.json?key=\${WEATHER_API_KEY}&q=\${city}&days=\${days}\`
    );
    const data = await response.json();

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(data.forecast, null, 2)
        }
      ]
    };
  }

  throw new Error(\`Unknown tool: \${request.params.name}\`);
});

// Start server
const transport = new StdioServerTransport();
await server.connect(transport);
\`\`\`

**Step 3 - Build:**

\`\`\`bash
npx tsc server.ts --outDir dist
\`\`\`

**Step 4 - Add to Claude Code:**

\`\`\`bash
claude mcp add --transport stdio weather node ./dist/server.js
\`\`\`

**Step 5 - Use in Claude Code:**

\`\`\`
User: "What's the weather in Milan for next 5 days?"

Claude Code:
1. Chiama MCP tool: get_forecast(city="Milan", days=5)
2. Riceve forecast JSON
3. Risponde: "Milan forecast:
   - Wed: Sunny, 18°C
   - Thu: Cloudy, 15°C
   - Fri: Rain, 12°C
   - Sat: Sunny, 17°C
   - Sun: Partly cloudy, 16°C"
\`\`\`

🎉 **Hai appena creato il tuo primo MCP Server!**

### 4.3 Tutorial: Database MCP Server (Python)

**Use case:** Claude Code legge/scrive database SQL direttamente.

**Step 1 - Setup:**

\`\`\`bash
pip install mcp sqlalchemy
\`\`\`

**Step 2 - server.py:**

\`\`\`python
from mcp.server.models import InitializationOptions
from mcp.server import NotificationOptions, Server
from mcp.server.stdio import stdio_server
from mcp import types
from sqlalchemy import create_engine, text
import os

DB_URL = os.getenv("DATABASE_URL")
engine = create_engine(DB_URL)

server = Server("database-mcp")

@server.list_tools()
async def handle_list_tools() -> list[types.Tool]:
    return [
        types.Tool(
            name="query_db",
            description="Execute SQL query (SELECT only)",
            inputSchema={
                "type": "object",
                "properties": {
                    "query": {
                        "type": "string",
                        "description": "SQL SELECT query"
                    }
                },
                "required": ["query"]
            }
        )
    ]

@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict
) -> list[types.TextContent]:
    if name == "query_db":
        query = arguments["query"]

        # Security: only SELECT allowed
        if not query.strip().upper().startswith("SELECT"):
            raise ValueError("Only SELECT queries allowed")

        with engine.connect() as conn:
            result = conn.execute(text(query))
            rows = result.fetchall()

            return [
                types.TextContent(
                    type="text",
                    text=str(rows)
                )
            ]

    raise ValueError(f"Unknown tool: {name}")

async def main():
    async with stdio_server() as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            InitializationOptions(
                server_name="database-mcp",
                server_version="1.0.0",
                capabilities=server.get_capabilities(
                    notification_options=NotificationOptions(),
                    experimental_capabilities={}
                )
            )
        )

if __name__ == "__main__":
    import asyncio
    asyncio.run(main())
\`\`\`

**Step 3 - Add to Claude Code:**

\`\`\`bash
export DATABASE_URL="postgresql://user:pass@localhost/mydb"
claude mcp add --transport stdio database python server.py
\`\`\`

**Step 4 - Use:**

\`\`\`
User: "Show me top 10 customers by revenue"

Claude Code:
1. Chiama tool: query_db(query="SELECT name, SUM(revenue) as total FROM customers GROUP BY name ORDER BY total DESC LIMIT 10")
2. Riceve risultati
3. Genera risposta formattata
\`\`\`

🔒 **Security:** Solo SELECT queries, no DELETE/UPDATE/DROP!

### 4.4 Resource Provider Example

**Use case:** Claude Code legge Notion pages come context.

\`\`\`typescript
import { ListResourcesRequestSchema, ReadResourceRequestSchema } from "@modelcontextprotocol/sdk/types.js";

// Register resources
server.setRequestHandler(ListResourcesRequestSchema, async () => ({
  resources: [
    {
      uri: "notion://page/product-roadmap",
      name: "Product Roadmap",
      mimeType: "text/markdown",
      description: "Company product roadmap from Notion"
    }
  ]
}));

// Handle resource read
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const uri = request.params.uri;

  if (uri === "notion://page/product-roadmap") {
    const notionPage = await fetchNotionPage("ROADMAP_PAGE_ID");
    const markdown = convertNotionToMarkdown(notionPage);

    return {
      contents: [
        {
          uri,
          mimeType: "text/markdown",
          text: markdown
        }
      ]
    };
  }

  throw new Error(\`Unknown resource: \${uri}\`);
});
\`\`\`

**Risultato:** Claude Code può leggere roadmap Notion per pianificare development! 🗺️

### 4.5 Publishing MCP Servers

**Option 1 - npm package:**

\`\`\`bash
npm publish @yourorg/weather-mcp-server
\`\`\`

**Option 2 - Docker container:**

\`\`\`dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY dist/ ./dist/
CMD ["node", "dist/server.js"]
\`\`\`

**Option 3 - Cloud deployment (HTTP transport):**

Deploy to Vercel/Railway/Fly.io con HTTP endpoint, poi:

\`\`\`bash
claude mcp add --transport http weather https://weather-mcp.yourorg.com
\`\`\`

## Capitolo 5: Popular MCP Integrations

### 5.1 Stripe MCP Server

**Capabilities:**
- Read transactions, customers, subscriptions
- Create payments, refunds, invoices
- Query analytics (MRR, churn, revenue)

**Setup:**

\`\`\`bash
claude mcp add --transport http stripe https://mcp.stripe.com
\`\`\`

**Configuration (.mcp.json):**

\`\`\`json
{
  "mcpServers": {
    "stripe": {
      "transport": "http",
      "url": "https://mcp.stripe.com",
      "apiKey": "sk_live_..."
    }
  }
}
\`\`\`

**Example usage:**

\`\`\`
User: "Show me failed payments this week and refund them"

Claude Code:
1. Tool: get_failed_payments(since="2025-01-13")
2. Tool: create_refund(payment_id="ch_123", amount=4999)
3. Tool: send_customer_email(template="refund_notification")

Response: "✅ Found 3 failed payments, issued refunds, notified customers"
\`\`\`

**MRR Dashboard automation:**

\`\`\`
User: "Generate MRR report for Q1 2025"

Claude Code:
1. Resource: stripe://analytics/mrr?quarter=Q1-2025
2. Genera chart con matplotlib
3. Scrive report.md con insights
\`\`\`

### 5.2 Figma MCP Server

**Capabilities:**
- Read design files, components, styles
- Update component properties
- Generate code from designs
- Sync design tokens

**Setup:**

\`\`\`bash
claude mcp add --transport http figma https://mcp.figma.com
\`\`\`

**Configuration:**

\`\`\`json
{
  "mcpServers": {
    "figma": {
      "transport": "http",
      "url": "https://mcp.figma.com",
      "token": "figd_..."
    }
  }
}
\`\`\`

**Example - Design to Code:**

\`\`\`
User: "Generate React component from Figma design XYZ"

Claude Code:
1. Resource: figma://file/XYZ/component/Button
2. Legge properties (width, height, colors, fonts)
3. Genera React component pixel-perfect
4. Aggiunge TypeScript types
5. Scrive Storybook stories

Output: Button.tsx, Button.stories.tsx, Button.test.tsx
\`\`\`

**Design token sync:**

\`\`\`
User: "Update colors from Figma to Tailwind config"

Claude Code:
1. Resource: figma://file/ABC/styles/colors
2. Converte in Tailwind format
3. Aggiorna tailwind.config.js
\`\`\`

### 5.3 Rube - 500+ App Integrations

**Rube = MCP Server che connette a 500+ app:**
- Gmail, Outlook (email automation)
- Slack, Discord (team communication)
- Notion, Confluence (documentation)
- GitHub, GitLab (code management)
- Jira, Linear (project management)

**Setup:**

\`\`\`bash
claude mcp add --transport http rube https://mcp.rube.ai
\`\`\`

**Example workflows:**

**1. Email Triage:**

\`\`\`
User: "Summarize unread emails and draft replies"

Claude Code:
1. Tool: gmail.list_unread()
2. Analizza content
3. Tool: gmail.draft_reply(email_id, content)
\`\`\`

**2. Slack Bot:**

\`\`\`
User: "When someone mentions me in Slack, create GitHub issue"

Claude Code:
1. Resource: slack://mentions/recent
2. Parse content
3. Tool: github.create_issue(title, body, labels)
\`\`\`

**3. Documentation Sync:**

\`\`\`
User: "Sync README.md to Notion and Confluence"

Claude Code:
1. Read: README.md
2. Tool: notion.create_page(content_markdown)
3. Tool: confluence.create_page(content_html)
\`\`\`

### 5.4 Database Connectors

**PostgreSQL MCP:**

\`\`\`bash
npm install @modelcontextprotocol/server-postgres
claude mcp add --transport stdio postgres npx -y @modelcontextprotocol/server-postgres postgresql://localhost/mydb
\`\`\`

**Usage:**

\`\`\`
User: "Show me schema for users table"

Claude Code:
Tool: query_db("SELECT column_name, data_type FROM information_schema.columns WHERE table_name='users'")
\`\`\`

**MySQL MCP:**

\`\`\`bash
claude mcp add --transport stdio mysql npx -y @modelcontextprotocol/server-mysql mysql://localhost/mydb
\`\`\`

**MongoDB MCP:**

\`\`\`bash
claude mcp add --transport stdio mongodb npx -y @modelcontextprotocol/server-mongodb mongodb://localhost:27017/mydb
\`\`\`

### 5.5 Browser Automation - Chrome DevTools MCP

**Capabilities:**
- Navigate pages, click elements, fill forms
- Take screenshots, extract data
- Run JavaScript in browser context

**Setup:**

\`\`\`bash
npm install @modelcontextprotocol/server-chrome-devtools
claude mcp add --transport stdio chrome npx -y @modelcontextprotocol/server-chrome-devtools
\`\`\`

**Example - Web scraping:**

\`\`\`
User: "Scrape pricing from competitor website"

Claude Code:
1. Tool: chrome.navigate("https://competitor.com/pricing")
2. Tool: chrome.screenshot()
3. Tool: chrome.extract_text(selector=".price")
\`\`\`

### 5.6 Custom Internal MCP Servers

**Enterprise use case:** Internal tools/APIs not publicly available.

**Example - HR System MCP:**

\`\`\`typescript
// hr-mcp-server.ts
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "get_employee_data",
      description: "Get employee data from HR system",
      inputSchema: { /* ... */ }
    },
    {
      name: "request_time_off",
      description: "Submit time off request",
      inputSchema: { /* ... */ }
    }
  ]
}));
\`\`\`

**Usage:**

\`\`\`
User: "Request 5 days off in August"

Claude Code:
1. Tool: get_employee_data(user_id="current")
2. Tool: request_time_off(days=5, month="August")
3. Tool: notify_manager(request_id="...")
\`\`\`

🔒 **Security:** Deploy behind VPN, authenticate con SSO!

## Capitolo 6: Security & Best Practices

### 6.1 API Key Management

**❌ NEVER hardcode API keys:**

\`\`\`json
{
  "mcpServers": {
    "stripe": {
      "apiKey": "sk_live_ABCD1234..."  // ❌ Committed to git!
    }
  }
}
\`\`\`

**✅ Use environment variables:**

\`\`\`json
{
  "mcpServers": {
    "stripe": {
      "apiKey": "\${STRIPE_API_KEY}"  // ✅ From env
    }
  }
}
\`\`\`

**Setup:**

\`\`\`bash
# .env (gitignored!)
STRIPE_API_KEY=sk_live_...
FIGMA_TOKEN=figd_...
DATABASE_URL=postgresql://...

# Load in shell
export $(cat .env | xargs)
\`\`\`

**Vault integration (enterprise):**

\`\`\`bash
# Use HashiCorp Vault
export STRIPE_API_KEY=$(vault kv get -field=api_key secret/stripe)
\`\`\`

### 6.2 Tool Whitelisting

**Problem:** MCP server espone 50 tools, vuoi limitare Claude Code a 5 safe tools.

**Solution - Whitelist configuration:**

\`\`\`json
{
  "mcpServers": {
    "database": {
      "url": "...",
      "allowedTools": [
        "query_db",        // ✅ Read-only
        "get_schema"       // ✅ Metadata
      ],
      "blockedTools": [
        "execute_mutation",  // ❌ Dangerous
        "drop_table",        // ❌ Destructive
        "admin_query"        // ❌ Privileged
      ]
    }
  }
}
\`\`\`

**Server-side enforcement:**

\`\`\`typescript
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const allowedTools = ["query_db", "get_schema"];

  if (!allowedTools.includes(request.params.name)) {
    throw new Error(\`Tool \${request.params.name} not whitelisted\`);
  }

  // Execute tool...
});
\`\`\`

### 6.3 Read-Only vs Write Access

**Separate MCP servers per permission level:**

\`\`\`json
{
  "mcpServers": {
    "stripe-read": {
      "url": "https://mcp.stripe.com",
      "permissions": "read",
      "allowedTools": ["get_transactions", "get_customers"]
    },
    "stripe-write": {
      "url": "https://mcp.stripe.com",
      "permissions": "write",
      "allowedTools": ["create_refund", "update_customer"],
      "requireConfirmation": true  // Ask user before write
    }
  }
}
\`\`\`

**Server implementation:**

\`\`\`typescript
const PERMISSIONS = process.env.MCP_PERMISSIONS; // "read" or "write"

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const writeTool = ["create_refund", "update_customer"];

  if (writeTool.includes(request.params.name) && PERMISSIONS === "read") {
    throw new Error("Write operation not allowed in read-only mode");
  }

  // Execute...
});
\`\`\`

### 6.4 Rate Limiting

**Protect external APIs from abuse:**

\`\`\`typescript
import { RateLimiter } from "limiter";

const limiter = new RateLimiter({
  tokensPerInterval: 10,  // 10 requests
  interval: "minute"       // per minute
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  // Check rate limit
  const allowed = await limiter.removeTokens(1);
  if (!allowed) {
    throw new Error("Rate limit exceeded. Try again in 1 minute.");
  }

  // Execute tool...
});
\`\`\`

### 6.5 Audit Logging

**Track all MCP tool calls for compliance:**

\`\`\`typescript
import { createLogger } from "winston";

const logger = createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "mcp-audit.log" })
  ]
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  // Log before execution
  logger.info("MCP_TOOL_CALL", {
    timestamp: new Date().toISOString(),
    tool: name,
    arguments: args,
    user: process.env.USER
  });

  try {
    const result = await executeTool(name, args);

    // Log success
    logger.info("MCP_TOOL_SUCCESS", {
      timestamp: new Date().toISOString(),
      tool: name
    });

    return result;
  } catch (error) {
    // Log error
    logger.error("MCP_TOOL_ERROR", {
      timestamp: new Date().toISOString(),
      tool: name,
      error: error.message
    });

    throw error;
  }
});
\`\`\`

**Audit log output:**

\`\`\`json
{"level":"info","message":"MCP_TOOL_CALL","timestamp":"2025-01-17T15:30:00Z","tool":"query_db","arguments":{"query":"SELECT * FROM users"},"user":"alek"}
{"level":"info","message":"MCP_TOOL_SUCCESS","timestamp":"2025-01-17T15:30:01Z","tool":"query_db"}
\`\`\`

### 6.6 Input Validation & SQL Injection Prevention

**❌ Vulnerable code:**

\`\`\`typescript
// Direct string interpolation = SQL injection!
const query = \`SELECT * FROM users WHERE email = '\${email}'\`;
\`\`\`

**✅ Secure code:**

\`\`\`typescript
import { z } from "zod";

// Schema validation
const QuerySchema = z.object({
  email: z.string().email()
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  // Validate input
  const validated = QuerySchema.parse(request.params.arguments);

  // Use parameterized query
  const result = await db.query(
    "SELECT * FROM users WHERE email = $1",
    [validated.email]
  );

  return result;
});
\`\`\`

### 6.7 Network Security - MCP over HTTPS

**Production MCP servers MUST use HTTPS:**

\`\`\`typescript
import https from "https";
import fs from "fs";

const options = {
  key: fs.readFileSync("private-key.pem"),
  cert: fs.readFileSync("certificate.pem")
};

https.createServer(options, app).listen(443);
\`\`\`

**Certificate pinning (advanced):**

\`\`\`json
{
  "mcpServers": {
    "stripe": {
      "url": "https://mcp.stripe.com",
      "certificateFingerprint": "SHA256:ABCD1234..."
    }
  }
}
\`\`\`

### 6.8 Timeout & Resource Limits

**Prevent hung connections:**

\`\`\`typescript
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const timeout = 30000; // 30 seconds

  const result = await Promise.race([
    executeTool(request.params.name, request.params.arguments),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Tool timeout")), timeout)
    )
  ]);

  return result;
});
\`\`\`

**Memory limits:**

\`\`\`bash
# Run MCP server with limited memory
node --max-old-space-size=512 server.js  # 512MB limit
\`\`\`

## Capitolo 7: Advanced Extension Patterns

### 7.1 Chaining Hooks

**Use case:** Pipeline di validation/formatting/testing su ogni commit.

**Configuration:**

\`\`\`json
{
  "hooks": {
    "PreCommit": "bash -c './.claude/hooks/01-secrets.sh && ./.claude/hooks/02-lint.sh && ./.claude/hooks/03-test.sh'"
  }
}
\`\`\`

**Hook scripts:**

\`\`\`bash
# 01-secrets.sh
#!/bin/bash
echo "🔍 Scanning for secrets..."
git secrets --scan || exit 1

# 02-lint.sh
#!/bin/bash
echo "🧹 Linting code..."
npm run lint || exit 1

# 03-test.sh
#!/bin/bash
echo "🧪 Running quick tests..."
npm run test:critical || exit 1

echo "✅ All pre-commit checks passed!"
\`\`\`

**Risultato:** 3-stage pipeline automatica ad ogni commit! 🚀

### 7.2 Conditional Hook Execution

**Use case:** Eseguire hooks solo in determinate condizioni.

**Example - Skip hooks in CI:**

\`\`\`bash
#!/bin/bash
# .claude/hooks/format.sh

# Skip formatting in CI environment
if [ "$CI" = "true" ]; then
  echo "⏭️  Skipping formatting in CI"
  exit 0
fi

prettier --write "$1"
\`\`\`

**Example - File type conditional:**

\`\`\`bash
#!/bin/bash
FILE="$1"

# Only run on production files
if [[ "$FILE" =~ src/production/ ]]; then
  echo "🔒 Production file detected, running extra checks..."
  npm run test:e2e
fi
\`\`\`

### 7.3 Hook + MCP Integration

**Use case:** Hook triggers MCP tool call (auto-deploy on commit).

**Hook configuration:**

\`\`\`json
{
  "hooks": {
    "PostCommit": "./.claude/hooks/auto-deploy.sh"
  }
}
\`\`\`

**auto-deploy.sh:**

\`\`\`bash
#!/bin/bash
COMMIT_MSG=$(git log -1 --pretty=%B)

# If commit message contains [deploy]
if [[ "$COMMIT_MSG" =~ \[deploy\] ]]; then
  echo "🚀 Triggering deployment via MCP..."

  # Call MCP tool via Claude CLI
  claude mcp call vercel deploy_preview --args '{"branch": "main"}'

  echo "✅ Deployment triggered!"
fi
\`\`\`

**Usage:**

\`\`\`bash
git commit -m "feat: new feature [deploy]"
# → Hook rileva [deploy]
# → Chiama Vercel MCP tool
# → Preview deployment automatico!
\`\`\`

### 7.4 Dynamic MCP Server Discovery

**Use case:** Auto-discover MCP servers in monorepo.

**Script (.claude/discover-mcp.sh):**

\`\`\`bash
#!/bin/bash

# Find all package.json with "mcp-server" field
find . -name "package.json" -exec grep -l "mcp-server" {} \; | while read pkg; do
  DIR=$(dirname "$pkg")
  NAME=$(jq -r '.name' "$pkg")

  echo "Found MCP server: $NAME in $DIR"

  # Auto-add to Claude Code
  claude mcp add --transport stdio "$NAME" "node $DIR/dist/server.js"
done
\`\`\`

**Run on project init:**

\`\`\`bash
./.claude/discover-mcp.sh
# → Auto-discovers and registers all internal MCP servers!
\`\`\`

### 7.5 MCP Server with Authentication

**Use case:** MCP server che richiede OAuth2 login.

**Server implementation:**

\`\`\`typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  // Extract auth token from request metadata
  const token = request.meta?.authorization?.replace("Bearer ", "");

  if (!token) {
    throw new Error("Authentication required");
  }

  try {
    // Verify JWT
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.sub;

    // Execute tool with user context
    const result = await executeTool(request.params.name, {
      ...request.params.arguments,
      userId  // Inject authenticated user ID
    });

    return result;
  } catch (error) {
    throw new Error("Invalid authentication token");
  }
});
\`\`\`

**Client configuration:**

\`\`\`json
{
  "mcpServers": {
    "internal-api": {
      "url": "https://mcp.company.com",
      "authentication": {
        "type": "oauth2",
        "tokenUrl": "https://auth.company.com/token",
        "clientId": "\${OAUTH_CLIENT_ID}",
        "clientSecret": "\${OAUTH_CLIENT_SECRET}"
      }
    }
  }
}
\`\`\`

### 7.6 Performance - MCP Response Caching

**Use case:** Cache expensive MCP calls (database queries, API calls).

\`\`\`typescript
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 300 }); // 5 min TTL

server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const uri = request.params.uri;

  // Check cache first
  const cached = cache.get(uri);
  if (cached) {
    console.log(\`✅ Cache hit: \${uri}\`);
    return cached;
  }

  // Fetch from source
  console.log(\`❌ Cache miss: \${uri}, fetching...\`);
  const data = await fetchExpensiveData(uri);

  // Store in cache
  cache.set(uri, data);

  return data;
});
\`\`\`

**Risultato:** 95% cache hit rate, response time da 2s a 50ms! ⚡

### 7.7 Multi-MCP Orchestration

**Use case:** Claude Code coordina 3 MCP servers per workflow complesso.

**Scenario - E-commerce order processing:**

\`\`\`
User: "Process failed orders from last week"

Claude Code orchestration:
1. Stripe MCP: get_failed_payments(since="2025-01-10")
   → Returns: [order_123, order_456, order_789]

2. Database MCP: get_order_details(ids=[123,456,789])
   → Returns: Customer emails, product IDs

3. Email MCP: send_refund_notification(customers=[...])
   → Sends automated emails

4. Slack MCP: notify_team(channel="#orders", message="3 refunds processed")
   → Notifies team

Response: "✅ Processed 3 failed orders, issued refunds, notified customers and team"
\`\`\`

**Dependency graph:**

\`\`\`
Stripe → Database → Email
              ↓
            Slack
\`\`\`

Claude Code esegue in parallelo quando possibile! 🚀

### 7.8 MCP Server Monitoring

**Prometheus metrics per MCP server:**

\`\`\`typescript
import client from "prom-client";

const toolCallCounter = new client.Counter({
  name: "mcp_tool_calls_total",
  help: "Total MCP tool calls",
  labelNames: ["tool_name", "status"]
});

const toolCallDuration = new client.Histogram({
  name: "mcp_tool_call_duration_seconds",
  help: "MCP tool call duration",
  labelNames: ["tool_name"]
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const start = Date.now();
  const toolName = request.params.name;

  try {
    const result = await executeTool(toolName, request.params.arguments);

    // Metrics
    toolCallCounter.inc({ tool_name: toolName, status: "success" });
    toolCallDuration.observe({ tool_name: toolName }, (Date.now() - start) / 1000);

    return result;
  } catch (error) {
    toolCallCounter.inc({ tool_name: toolName, status: "error" });
    throw error;
  }
});

// Expose metrics endpoint
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});
\`\`\`

**Grafana dashboard:**

\`\`\`
MCP Server Metrics:
- Total tool calls: 1,234
- Success rate: 98.5%
- Avg latency: 250ms
- Top tools: query_db (45%), get_forecast (30%), send_email (15%)
\`\`\`

Monitoring production-ready per MCP servers enterprise! 📊

## Riepilogo: Extension Mastery Raggiunto!

Complimenti! Hai completato la milestone più avanzata di ClaudeCodeNinja. Ora sai:

### 🎯 Hooks System
- Configurare lifecycle hooks (PreToolUse, PostToolUse, PreCommit)
- Automatizzare formatting, linting, secret scanning
- Chain multiple hooks per pipelines complesse
- Conditional execution per performance ottimali

### 🔌 Model Context Protocol (MCP)
- Architettura client-server e 3 primitive (Resources, Tools, Prompts)
- Creare MCP servers custom in TypeScript/Python
- Integrare servizi esterni (Stripe, Figma, Database)
- Security best practices (API keys, whitelisting, rate limiting)

### ⚡ Advanced Patterns
- Hook + MCP integration per workflow automatici
- Multi-MCP orchestration per task complessi
- Caching e performance optimization
- Monitoring production-ready con Prometheus

### 🚀 Risultato Finale

Claude Code è ora la tua **AI Infrastructure Platform**:
- Zero manual work con automation completa
- Connesso a tutti i tuoi tools/database/API
- Secure e production-ready
- Scalabile per team enterprise

Usa saggiamente questi superpoteri! Il limite ora è solo la tua immaginazione. 🎓✨
  `,
  xp: 600,
  badge: "🔌 Extension Master",
  estimatedTime: "3 ore",
  topics: [
    "Hooks System Fundamentals",
    "Hook Automation Patterns",
    "Model Context Protocol (MCP)",
    "Building MCP Servers",
    "Popular MCP Integrations",
    "Security & Best Practices",
    "Advanced Extension Patterns"
  ],
  quiz: {
    questions: [
      {
        id: "m12-q1",
        question: "Qual è il principale vantaggio dei Hooks rispetto ai prompts per automazione in Claude Code?",
        options: [
          "I hooks sono più facili da scrivere dei prompts",
          "I hooks vengono eseguiti come codice automatico ad ogni evento, i prompts sono solo suggerimenti",
          "I hooks funzionano solo con TypeScript, i prompts con tutti i linguaggi",
          "I hooks richiedono meno configurazione dei prompts"
        ],
        correctAnswer: 1,
        explanation: "I hooks trasformano 'suggerimenti via prompt' in codice eseguibile che si attiva automaticamente ad ogni lifecycle event (PreToolUse, PostToolUse, etc.). I prompts invece sono solo istruzioni testuali che Claude può o meno seguire."
      },
      {
        id: "m12-q2",
        question: "Perché MCP viene chiamato 'USB-C for AI'?",
        options: [
          "Perché usa connessioni fisiche USB-C per comunicare",
          "Perché è uno standard universale per connettere AI a data sources/tools, come USB-C connette dispositivi",
          "Perché è più veloce delle altre API",
          "Perché funziona solo su dispositivi con porta USB-C"
        ],
        correctAnswer: 1,
        explanation: "MCP è uno standard aperto che permette a qualsiasi AI (Claude Code, ChatGPT, etc.) di connettersi a qualsiasi tool/database/API in modo uniforme, proprio come USB-C è uno standard universale per connettere dispositivi hardware."
      },
      {
        id: "m12-q3",
        question: "Quale hook strategy è consigliata per validation in Claude Code?",
        options: [
          "PreToolUse per bloccare ogni singolo Edit",
          "PostToolUse per validare dopo ogni Write",
          "PreCommit per validare solo al momento del commit finale",
          "Notification per avvisare dopo ogni errore"
        ],
        correctAnswer: 2,
        explanation: "Block at Submit, Not at Write è la best practice: lascia che Claude lavori liberamente, poi valida tutto insieme al PreCommit. Bloccare ad ogni Edit rallenterebbe il workflow e interferirebbe con modifiche intermedie."
      },
      {
        id: "m12-q4",
        question: "Quali sono le 3 primitive che un MCP Server può esporre?",
        options: [
          "Hooks, Prompts, APIs",
          "Resources, Tools, Prompts",
          "Servers, Clients, Protocols",
          "Read, Write, Execute"
        ],
        correctAnswer: 1,
        explanation: "Un MCP Server espone: Resources (dati read-only), Tools (azioni eseguibili), Prompts (template riutilizzabili). Queste 3 primitive coprono tutti i use case di integrazione AI."
      },
      {
        id: "m12-q5",
        question: "Quale tecnica di security è ESSENZIALE per un MCP server di database in produzione?",
        options: [
          "Permettere solo query SELECT, bloccare DELETE/UPDATE/DROP",
          "Richiedere password ad ogni query",
          "Usare solo database NoSQL invece di SQL",
          "Disabilitare HTTPS per performance migliori"
        ],
        correctAnswer: 0,
        explanation: "Read-only access è fondamentale: MCP server deve validare che le query siano solo SELECT, rifiutando DELETE/UPDATE/DROP per evitare data loss. Inoltre usare parameterized queries per prevenire SQL injection."
      }
    ]
  },
  challenge: {
    title: "Extension Infrastructure: Hooks + MCP Stack",
    description: "Crea un sistema completo di automazione con Hooks per validation e MCP server custom per business logic. Obiettivo: Zero manual intervention per workflow ricorrenti!",
    instructions: [
      "Setup Hooks Pipeline: Configura PreCommit hook con 3 stage (secrets scan, lint, quick tests)",
      "Build Weather MCP: Crea MCP server TypeScript che espone tool get_forecast con WeatherAPI",
      "Integrate Stripe MCP: Aggiungi Stripe MCP server e testa query 'failed payments this week'",
      "Security Hardening: Aggiungi API key via env vars, rate limiting (10 req/min), audit logging",
      "Advanced Pattern: Crea hook che triggera MCP tool (PostCommit → Vercel deploy se commit message contiene [deploy])",
      "Monitoring: Aggiungi Prometheus metrics al MCP server (tool calls, latency, error rate)",
      "Documentation: Scrivi README.md con setup instructions per team (hook install, MCP config, env vars)",
      "Demo Workflow: Registra video di Claude Code che usa hooks + MCP per processo end-to-end (da commit a deploy automatico)"
    ],
    verificationSteps: [
      "✅ PreCommit hook blocca commit se rileva secrets o lint errors",
      "✅ Weather MCP server risponde a get_forecast con dati real-time",
      "✅ Stripe MCP integrato, query analytics funzionanti",
      "✅ Nessun API key hardcoded, tutto via environment variables",
      "✅ Rate limiter attivo, max 10 calls/min per MCP tool",
      "✅ Audit log registra ogni tool call con timestamp/user",
      "✅ PostCommit hook triggera Vercel deploy via MCP se [deploy] in message",
      "✅ Prometheus /metrics endpoint espone tool_calls_total e duration_seconds",
      "✅ README.md completo con curl examples per testare MCP server",
      "✅ Demo video mostra workflow: commit → hooks validation → MCP deploy → Slack notification"
    ]
  }
};