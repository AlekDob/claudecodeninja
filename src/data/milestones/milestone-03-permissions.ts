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
};
