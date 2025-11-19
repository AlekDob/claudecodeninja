import { Milestone } from '../../types';

export const milestone11: Milestone = {
  id: 9,
  title: "Subagents & Skills: Multi-Agent Mastery",
  subtitle: "Orchestrare team di AI specializzati con Protocol Droids, Skills personalizzate e task delegation",
  description: `
# Milestone 11: Subagents & Skills - Multi-Agent Mastery

Benvenuto nella milestone che trasforma Claude Code da "assistente singolo" a **esercito di specialisti orchestrato**!

Fino ad ora hai usato Claude Code come un unico agente AI che fa tutto. Ma se potessi delegare task complessi a **specialisti dedicati**? Un frontend expert per React, un database wizard per SQL optimization, un security auditor per vulnerability scanning?

Questa è la rivoluzione dei **Subagents** e delle **Skills** in Claude Code 2025. Non più "un AI per tutto" ma **multi-agent orchestration** come nei team umani enterprise.

In questa milestone imparerai:
- Creare **Protocol Droids** (subagents specializzati) per task ricorrenti
- Sviluppare **Skills custom** per domain knowledge (Stripe, Discord, etc.)
- Orchestrare **parallel task delegation** per velocità 10x
- Implementare **B-MAD Method** per workflow enterprise
- Costruire un **Agent Army** che lavora 24/7

La differenza tra "uso Claude Code" e "orchestro team AI da consulenza €500/ora"? Questa milestone. 🤖

## Capitolo 1: Subagents Fundamentals

### 1.1 Cos'è un Subagent?

Immagina un team software enterprise:
- **Tech Lead**: Coordina tutto, prende decisioni architetturali
- **Frontend Dev**: Specialista React/UI/UX
- **Backend Dev**: Specialista API/Database
- **DevOps**: Specialista CI/CD/Infrastructure
- **Security**: Specialista vulnerabilities/compliance

Claude Code normale = **una persona fa tutto** (lento, errori, superficiale)

Claude Code con Subagents = **team specializzato** (veloce, expert-level, parallelo)

**Anatomia di un Subagent:**

\`\`\`markdown
# .claude/agents/frontend-specialist.md

You are a Frontend Development Expert specializing in React 18+ and modern UI/UX.

EXPERTISE:
- React functional components with TypeScript
- Tailwind CSS utility-first styling
- Framer Motion animations
- Accessibility (WCAG AA compliance)
- Performance optimization (Code splitting, lazy loading)

TOOLS AVAILABLE:
- Read/Write files
- Execute bash commands
- Search codebase

WORKFLOW:
1. Analyze component requirements
2. Check design system compliance
3. Generate TypeScript component with proper typing
4. Add accessibility attributes
5. Optimize for performance
6. Generate tests

DO NOT:
- Use class components (functional only)
- Inline large CSS (use Tailwind)
- Skip accessibility attributes
- Create components >300 lines (split them)

RETURN FORMAT:
- Component file path
- Props interface
- Usage example
- Test file
\`\`\`

**Quando Claude Code delega** a questo subagent:
1. Task entra nel **context isolato** del subagent
2. Subagent usa **solo i tool permessi**
3. Lavora con **focus laser** sulla specializzazione
4. Ritorna **risultato strutturato**
5. **Zero pollution** del context principale

### 1.2 Subagents vs Context Principale

**Problema Context Pollution:**

\`\`\`
Claude Code (context unico):
↓
Task 1: "Crea frontend dashboard" (800 token context)
+ Task 2: "Ottimizza query database" (600 token)
+ Task 3: "Setup CI/CD pipeline" (700 token)
= 2100 token context MESCOLATO
→ Confusione, risposte generiche, errori cross-domain
\`\`\`

**Soluzione Multi-Agent:**

\`\`\`
Claude Code (orchestrator):
↓
├─ Subagent: frontend-specialist (800 token ISOLATI)
│  → Dashboard React perfetto
├─ Subagent: database-expert (600 token ISOLATI)
│  → Query ottimizzata
└─ Subagent: devops-specialist (700 token ISOLATI)
   → Pipeline CI/CD configurata

= 3 task PARALLELI, zero interferenza, expert-level
\`\`\`

**Vantaggi Chiave:**

1. **Isolation**: Context separati = zero confusion
2. **Specialization**: Prompt tuned per expertise
3. **Parallelization**: Task simultanei = 3-10x velocità
4. **Reusability**: Agent riutilizzabile cross-project
5. **Team Sharing**: Condividi agents con colleghi

### 1.3 Creare il Tuo Primo Subagent

**Scenario**: Voglio un subagent per code review security-focused.

**Step-by-Step:**

\`\`\`bash
# 1. Crea directory agents
mkdir -p .claude/agents

# 2. Crea file subagent
touch .claude/agents/security-auditor.md
\`\`\`

**Contenuto security-auditor.md:**

\`\`\`markdown
You are a Security Auditor specialized in web application vulnerabilities.

FOCUS AREAS:
1. OWASP Top 10 vulnerabilities
2. SQL Injection & XSS detection
3. Authentication/Authorization flaws
4. Sensitive data exposure
5. Dependency vulnerabilities

AUDIT WORKFLOW:
1. Scan all modified files in current branch
2. Identify security-critical code (auth, DB queries, API endpoints)
3. Run static analysis checks
4. Verify input validation
5. Check for hardcoded secrets
6. Review dependencies for CVEs

TOOLS:
- Grep for pattern matching
- Read source files
- Execute: npm audit, semgrep

SEVERITY LEVELS:
- CRITICAL: Immediate exploit risk (SQL injection, auth bypass)
- HIGH: Data exposure risk (XSS, CSRF)
- MEDIUM: Security best practice violations
- LOW: Info disclosure, weak crypto

OUTPUT FORMAT:
Security Audit Report
- Files scanned: [count]
- Critical issues: [count with file:line]
- High issues: [count with file:line]
- Recommendations: [numbered list]
- Risk score: [0-100]
\`\`\`

**Invocare il Subagent:**

\`\`\`bash
# Metodo 1: Automatico (Claude Code rileva task matching)
claude "Esegui security audit completo su branch feature/payment"

# Metodo 2: Esplicito con Task tool
claude "Use security-auditor subagent to audit current codebase"
\`\`\`

Claude Code **riconosce automaticamente** quando un task matcha l'expertise del subagent e delega!

## Capitolo 2: Skills - Domain Knowledge Supercharge

### 2.1 Skills vs Subagents: Quando Usare Cosa?

**Confusione comune**: "Skills e Subagents sono la stessa cosa?"

**NO! Differenze chiave:**

| Feature | Subagents | Skills |
|---------|-----------|--------|
| **Scopo** | Task delegation & execution | Knowledge injection |
| **Context** | Isolato, parallelo | Shared con main conversation |
| **Tool Access** | Limitato (configurable) | Full access a tutti i tool |
| **Invocazione** | Auto-detection o esplicita | Auto-detection basata su keywords |
| **Use Case** | "Fai questo task complesso" | "Sai come funziona X?" |
| **Esempio** | "Deploy su AWS con terraform" | "Integra Stripe checkout" |

**Metafora Restaurant:**

- **Subagent** = Chef specializzato (riceve ordine, cucina in cucina isolata, ritorna piatto)
- **Skill** = Libro di ricette (chef principale legge ricetta, cucina lui stesso)

### 2.2 Anatomia di una Skill

Una Skill è una **directory** con file SKILL.md che contiene:
1. **Knowledge base**: Documentazione domain-specific
2. **Code examples**: Snippet riutilizzabili
3. **Best practices**: Pattern testati
4. **Tools** (opzionali): Script eseguibili

**Esempio Skill: Stripe Integration**

\`\`\`
.claude/skills/stripe-integration/
├── SKILL.md              # Main documentation
├── examples/
│   ├── checkout.ts       # Stripe checkout example
│   ├── webhook.ts        # Webhook handler
│   └── subscription.ts   # Subscription management
└── scripts/
    └── test-webhook.sh   # Test webhook locally
\`\`\`

**SKILL.md Content:**

\`\`\`markdown
Stripe Payment Integration Skill

This skill provides comprehensive knowledge for integrating Stripe payments in Node.js/TypeScript applications.

PREREQUISITES:
- Stripe account with API keys
- Node.js 18+ with TypeScript
- Express or Next.js API routes

CORE CONCEPTS:

1. Payment Intent Flow:
   - Client creates PaymentIntent on backend
   - Frontend confirms with Stripe.js
   - Webhook confirms payment success
   - Update order status in database

2. Webhook Security:
   - ALWAYS verify webhook signature
   - Use constructEvent() with webhook secret
   - Return 200 immediately, process async
   - Implement idempotency for retries

3. Environment Setup:
   STRIPE_SECRET_KEY=sk_test_xxx (backend only)
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx (frontend OK)

CODE EXAMPLES:

Create Payment Intent (API Route):
[Vedi examples/checkout.ts]

Handle Webhook:
[Vedi examples/webhook.ts]

COMMON PITFALLS:
- Exposing secret key in frontend (CRITICAL!)
- Not verifying webhook signatures (CRITICAL!)
- Blocking webhook response (timeouts)
- Missing idempotency (duplicate charges)

TESTING:
Use Stripe CLI for local webhook testing:
stripe listen --forward-to localhost:3000/api/webhooks
\`\`\`

**Quando Claude Code usa questa Skill:**

\`\`\`bash
# Tu chiedi:
claude "Implementa Stripe checkout per subscription mensile €49"

# Claude Code:
# 1. Detecta "Stripe" keyword
# 2. Carica stripe-integration skill
# 3. Usa examples come template
# 4. Genera codice seguendo best practices
# 5. Include webhook handler con signature verification
\`\`\`

### 2.3 Creare Skills Custom

**Scenario**: Hai codebase legacy con pattern specifici che Claude deve seguire.

**Crea Skill "Legacy API Patterns":**

\`\`\`bash
mkdir -p .claude/skills/legacy-api-patterns
touch .claude/skills/legacy-api-patterns/SKILL.md
\`\`\`

**SKILL.md:**

\`\`\`markdown
Legacy API Patterns - Company XYZ

CONTEXT:
Our legacy API uses custom patterns that must be followed for consistency.

ERROR HANDLING PATTERN:
All API routes return this structure:
{
  success: boolean,
  data?: T,
  error?: { code: string, message: string, details?: any }
}

Never throw exceptions directly. Always catch and format.

Example:
export async function handleGetUser(req, res) {
  try {
    const user = await db.users.findById(req.params.id);
    if (!user) {
      return res.json({
        success: false,
        error: { code: 'USER_NOT_FOUND', message: 'User not found' }
      });
    }
    return res.json({ success: true, data: user });
  } catch (err) {
    return res.json({
      success: false,
      error: { code: 'INTERNAL_ERROR', message: err.message }
    });
  }
}

AUTHENTICATION MIDDLEWARE:
ALWAYS use requireAuth middleware before protected routes:
router.get('/api/protected', requireAuth, handler);

LOGGING CONVENTION:
Use our custom logger (NOT console.log):
import { logger } from '@/lib/logger';
logger.info('message', { metadata });
logger.error('error', { error, context });

DATABASE QUERIES:
Use repository pattern (NOT raw Prisma in routes):
import { userRepository } from '@/repositories/user';
const user = await userRepository.findById(id);
\`\`\`

**Risultato**: Claude Code genera API routes che seguono ESATTAMENTE i pattern legacy!

## Capitolo 3: B-MAD Method & Protocol Droids

### 3.1 Cos'è il B-MAD Method?

**B-MAD** = **Breakthrough Method for Agile AI-Driven Development**

È una metodologia per orchestrare subagents in workflow enterprise complessi, ispirata alle squadre Agile.

**Ruoli B-MAD Standard:**

1. **Product Owner (PO)**: Claude Code principale
   - Raccoglie requisiti user
   - Coordina sprint planning
   - Valida deliverables

2. **Tech Lead**: Architecture Specialist
   - Decisioni tecniche
   - Code review
   - Performance optimization

3. **Frontend Team**: UI/UX Specialists
   - Component development
   - Styling & animations
   - Accessibility

4. **Backend Team**: API/Database Specialists
   - API endpoints
   - Database schema
   - Business logic

5. **QA Team**: Test Specialists
   - Unit/Integration tests
   - E2E test scenarios
   - Bug reporting

6. **DevOps**: Infrastructure Specialists
   - CI/CD pipelines
   - Deployment automation
   - Monitoring setup

### 3.2 Workflow B-MAD Pratico

**Scenario**: Implementare feature "User Dashboard con Analytics"

**Sprint Planning (PO - Claude Code principale):**

\`\`\`bash
claude "Analizza requisiti feature User Dashboard:
- Overview stats (ordini, revenue, utenti attivi)
- Grafici Chart.js ultimi 30 giorni
- Export CSV
- Responsive design

Genera breakdown task per team specialists."
\`\`\`

**Claude Code genera Task Delegation:**

\`\`\`markdown
Feature: User Dashboard con Analytics

ARCHITECTURE DECISIONS (Tech Lead):
- Task: Design component structure & data flow
- Delegate to: architecture-specialist subagent
- Output: Component hierarchy, API contracts

FRONTEND IMPLEMENTATION (Frontend Team):
- Task: Dashboard UI components
- Delegate to: frontend-specialist subagent
- Input: Component specs da architecture
- Output: React components + Tailwind styling

BACKEND IMPLEMENTATION (Backend Team):
- Task: Analytics API endpoints
- Delegate to: backend-specialist subagent
- Input: API contracts da architecture
- Output: /api/analytics/* endpoints

DATABASE (Backend Team):
- Task: Queries optimization per analytics
- Delegate to: database-specialist subagent
- Output: Optimized SQL queries con indexes

TESTING (QA Team):
- Task: Test suite completa
- Delegate to: test-specialist subagent
- Input: Components + API da altri team
- Output: Unit + Integration + E2E tests

DEPLOYMENT (DevOps):
- Task: Deploy dashboard su staging
- Delegate to: devops-specialist subagent
- Output: CI/CD pipeline + staging URL
\`\`\`

**Esecuzione Parallela:**

\`\`\`bash
# Claude Code esegue task IN PARALLELO
# (architecture prima, poi altri 4 simultanei)

# 1. Architecture (sequenziale, blocca gli altri)
architecture-specialist → genera specs

# 2-5. Sviluppo (parallelo dopo architecture)
frontend-specialist → Dashboard.tsx
backend-specialist → api/analytics.ts
database-specialist → analytics-queries.sql
test-specialist → dashboard.test.ts

# 6. Deployment (sequenziale, dopo sviluppo)
devops-specialist → deploy staging
\`\`\`

**Tempo Totale**:
- Senza subagents: 6 task × 20 min = **120 minuti**
- Con subagents paralleli: 20 min (arch) + 20 min (parallel) + 10 min (deploy) = **50 minuti**

**Saving: 70 minuti = 58% più veloce!** ⚡

### 3.3 Protocol Droids Pattern

Il nome "Protocol Droids" viene da Star Wars (C-3PO) = assistenti specializzati.

**Creare Protocol Droid Library:**

\`\`\`
.claude/agents/
├── product-manager.md         # Requirements gathering
├── architect.md               # System design
├── frontend-specialist.md     # React/UI
├── backend-specialist.md      # API/Logic
├── database-specialist.md     # SQL optimization
├── test-specialist.md         # Testing strategy
├── devops-specialist.md       # Infrastructure
├── security-specialist.md     # Security audit
└── documentation-specialist.md # Docs generation
\`\`\`

**Condividi con Team:**

\`\`\`bash
# Commit agents in repository
git add .claude/agents/
git commit -m "feat: add Protocol Droids for team collaboration"
git push

# Ogni team member avrà gli stessi specialist!
# Consistency guarantee: stessi prompt = stesso output
\`\`\`

## Capitolo 4: Parallel Task Delegation

### 4.1 Task Tool Deep Dive

Il **Task tool** in Claude Code permette parallelizzazione vera:

\`\`\`typescript
// Claude Code internals (concettuale)
await Promise.all([
  task({ subagent: 'frontend', prompt: 'Build Dashboard UI' }),
  task({ subagent: 'backend', prompt: 'Build Analytics API' }),
  task({ subagent: 'database', prompt: 'Optimize queries' })
]);
// 3 subagents girano SIMULTANEAMENTE!
\`\`\`

**Sintassi Task Delegation:**

\`\`\`bash
claude "Execute these tasks in parallel:
1. [frontend-specialist] Create Dashboard component
2. [backend-specialist] Create /api/analytics endpoint
3. [test-specialist] Generate test suite

Wait for all tasks to complete, then integrate results."
\`\`\`

**Claude Code orchestrazione:**

\`\`\`
Main Agent:
├─ Task 1 (frontend) → RUNNING in parallel
├─ Task 2 (backend)  → RUNNING in parallel
└─ Task 3 (test)     → RUNNING in parallel
    ↓
All tasks complete → Integration phase
\`\`\`

### 4.2 Dependency Management

Non tutti i task possono essere paralleli. Alcuni hanno **dependencies**:

\`\`\`
Task Graph:
1. Architecture Design (root - nessuna dependency)
   ↓
2. Database Schema (depends on: 1)
   ↓
3a. Backend API (depends on: 2) ← CAN RUN IN PARALLEL
3b. Frontend UI (depends on: 1)  ← CAN RUN IN PARALLEL
   ↓
4. Integration Tests (depends on: 3a, 3b)
   ↓
5. Deployment (depends on: 4)
\`\`\`

**Orchestrazione Intelligente:**

\`\`\`bash
claude "Implement User Profile feature with dependencies:
SEQUENTIAL:
1. [architect] Design system architecture → wait for completion
2. [database] Create schema based on architecture → wait

PARALLEL (after step 2):
3a. [backend] Implement API endpoints
3b. [frontend] Build profile UI components

SEQUENTIAL (after step 3):
4. [test] Generate integration tests
5. [devops] Deploy to staging

Respect dependencies, maximize parallelization."
\`\`\`

### 4.3 Monitoring & Debugging Parallel Tasks

**Problem**: Con 5 task paralleli, come debugghi errori?

**Solution**: Structured logging per subagent

\`\`\`markdown
# Output Claude Code con task paralleli

[ORCHESTRATOR] Starting parallel task execution...
[ORCHESTRATOR] Tasks: frontend, backend, database, test (4 parallel)

[TASK:frontend] Starting Dashboard component generation...
[TASK:backend] Starting Analytics API development...
[TASK:database] Starting query optimization...
[TASK:test] Starting test suite generation...

[TASK:frontend] ✅ Dashboard.tsx created (120 lines)
[TASK:backend] ✅ /api/analytics endpoint created
[TASK:database] ⚠️  Warning: Missing index on users.created_at
[TASK:database] ✅ Queries optimized (3 indexes added)
[TASK:test] ❌ ERROR: Cannot import Dashboard.tsx (dependency issue)

[ORCHESTRATOR] Tasks completed: 3/4 success, 1 failure
[ORCHESTRATOR] Analyzing failure: test task missing frontend output
[ORCHESTRATOR] Retrying test task with frontend output...
[TASK:test] ✅ Test suite generated (15 tests, 100% coverage)

[ORCHESTRATOR] ✅ All tasks completed successfully
[ORCHESTRATOR] Integration phase starting...
\`\`\`

**Debug Tips:**

1. **Logs strutturati**: Ogni task prefixato con [TASK:name]
2. **Dependency tracking**: Claude Code detecta missing deps
3. **Auto-retry**: Failure con dependency → retry automatico
4. **Rollback**: Se task critico fallisce, rollback partial changes

## Capitolo 5: Advanced Patterns & Best Practices

### 5.1 Agent Composition Patterns

**Pattern 1: Chain of Responsibility**

Task passa attraverso catena di agents:

\`\`\`
Input → Agent 1 → Agent 2 → Agent 3 → Output

Esempio:
User Story → [product-manager] → Requirements
Requirements → [architect] → Technical Spec
Technical Spec → [frontend] → Implementation
Implementation → [test] → Test Suite
\`\`\`

**Pattern 2: Fan-Out / Fan-In**

Un task si divide, poi risultati si uniscono:

\`\`\`
                ┌─ Agent A ─┐
Input → Split ─┼─ Agent B ─┤→ Merge → Output
                └─ Agent C ─┘

Esempio:
Feature Spec → Split per componenti
├─ [frontend] → Header.tsx
├─ [frontend] → Sidebar.tsx
└─ [frontend] → MainContent.tsx
→ Merge → Integrated Dashboard
\`\`\`

**Pattern 3: Reviewer Pattern**

Un agent crea, altro agent reviewed:

\`\`\`
[developer] → Code
     ↓
[reviewer] → Feedback
     ↓
[developer] → Fixed Code
\`\`\`

**Implementazione:**

\`\`\`bash
claude "Implement payment checkout with review cycle:
1. [backend-specialist] Create /api/checkout endpoint
2. [security-auditor] Review for vulnerabilities
3. If issues found: [backend-specialist] fix them
4. [test-specialist] Generate security tests
5. Final approval required before merge"
\`\`\`

### 5.2 Skill Library Organization

Per progetti grandi, organizza skills in library:

\`\`\`
.claude/skills/
├── integrations/
│   ├── stripe-payments/
│   ├── sendgrid-email/
│   ├── twilio-sms/
│   └── google-oauth/
├── frameworks/
│   ├── nextjs-patterns/
│   ├── react-best-practices/
│   └── tailwind-utilities/
├── infrastructure/
│   ├── aws-deployment/
│   ├── vercel-optimization/
│   └── cloudflare-workers/
└── company-specific/
    ├── legacy-api-patterns/
    ├── design-system/
    └── coding-standards/
\`\`\`

**Auto-discovery**: Claude Code scansiona tutte le subdirectory in \`.claude/skills/\`

### 5.3 Performance Optimization

**Problem**: Troppi agents rallentano?

**Solution**: Agent pooling & caching

\`\`\`markdown
# .claude/config.yml (conceptual)

agents:
  max_parallel: 7              # Max simultaneous subagents
  timeout: 300                 # 5 min timeout per task
  cache_prompts: true          # Cache agent system prompts
  auto_reload: false           # Don't reload agents on every task

skills:
  lazy_load: true              # Load skills only when needed
  cache_examples: true         # Cache code examples in memory
\`\`\`

**Benchmark Results:**

| Configuration | Task Completion Time |
|---------------|---------------------|
| No parallelization | 120 min |
| 3 parallel agents | 50 min (-58%) |
| 7 parallel agents | 35 min (-71%) |
| 7 parallel + caching | 28 min (-77%) |

**Best Practices:**

1. **Batch similar tasks**: Raggruppa task simili per stesso agent
2. **Limit agent count**: 5-7 paralleli = sweet spot (oltre rallenta)
3. **Cache prompts**: Riutilizza system prompts cross-tasks
4. **Async non-blocking**: Orchestrator non aspetta se non necessario

## Capitolo 6: Real-World Use Cases

### 6.1 E-Commerce Platform Development

**Team Configuration:**

\`\`\`
Product Owner (main Claude): Coordina feature development
├─ Frontend Team:
│  ├─ component-specialist: Product cards, checkout flow
│  └─ styling-specialist: Tailwind theme, animations
├─ Backend Team:
│  ├─ api-specialist: REST endpoints, validation
│  └─ database-specialist: Schema design, query optimization
├─ Integration Team:
│  ├─ stripe-specialist: Payment processing
│  └─ email-specialist: Transactional emails
└─ Quality Team:
   ├─ test-specialist: E2E test scenarios
   └─ security-auditor: PCI compliance checks
\`\`\`

**Workflow Example:**

\`\`\`bash
claude "Implement complete checkout flow:
PARALLEL PHASE 1:
- [component-specialist] Cart summary component
- [api-specialist] POST /api/cart endpoint
- [database-specialist] cart_items table schema

SEQUENTIAL PHASE 2 (after Phase 1):
- [stripe-specialist] Payment intent creation

PARALLEL PHASE 3:
- [component-specialist] Checkout form + Stripe Elements
- [email-specialist] Order confirmation email template
- [test-specialist] Checkout E2E tests

FINAL:
- [security-auditor] PCI compliance verification
"
\`\`\`

**Result**: Feature completa in **3 ore** invece di 2 giorni! 🚀

### 6.2 API Migration Project

**Scenario**: Migrare 50 API endpoints da REST a GraphQL

**Agent Strategy:**

\`\`\`
1. [analyzer-agent]: Scansiona tutti REST endpoints
   → Genera mapping REST → GraphQL

2. [graphql-specialist]: Per ogni endpoint (parallelo 10x):
   → Crea GraphQL resolver
   → Genera TypeScript types
   → Migra business logic

3. [test-specialist]: Per ogni resolver (parallelo):
   → Genera integration tests
   → Confronta output REST vs GraphQL

4. [documentation-specialist]:
   → Genera API documentation
   → Migration guide per frontend
\`\`\`

**Timeline**:
- Manual migration: **6 settimane** (1 dev fulltime)
- Agent-assisted: **3 giorni** (orchestrator + 10 parallel agents)

**Saving: 97% tempo risparmiato!** 🎯

### 6.3 Legacy Code Modernization

**Challenge**: Codebase 100K+ lines, jQuery → React

**Multi-Agent Approach:**

\`\`\`markdown
PHASE 1: Analysis (Sequential)
[analyzer]: Map jQuery components → React equivalents
[analyzer]: Identify reusable patterns
[analyzer]: Generate migration priority list

PHASE 2: Component Migration (Parallel 15x components)
[frontend-specialist]: Migrate HomePage.jsx
[frontend-specialist]: Migrate ProductList.jsx
[frontend-specialist]: Migrate Checkout.jsx
... (15 components in parallel)

PHASE 3: Integration (Sequential)
[integration-specialist]: Wire React components
[routing-specialist]: Setup React Router
[state-specialist]: Implement Redux store

PHASE 4: Testing (Parallel)
[test-specialist]: Unit tests per component
[e2e-specialist]: Visual regression tests
[performance-specialist]: Lighthouse audits

PHASE 5: Deployment
[devops]: Gradual rollout strategy
[monitoring]: Setup error tracking
\`\`\`

## Capitolo 7: Troubleshooting & Common Pitfalls

### 7.1 Context Pollution Despite Subagents

**Problem**: Anche con subagents, context si sporca.

**Cause**: Subagent ritorna troppo output che inquina main context

**Solution**:

\`\`\`markdown
# In subagent prompt:

RETURN FORMAT:
Keep output MINIMAL. Return only:
- Summary (2-3 sentences)
- File paths created/modified
- Critical errors/warnings
- Next steps required

DO NOT return:
- Full code listings
- Detailed logs
- Debug information
- Redundant confirmations
\`\`\`

### 7.2 Agent Selection Conflicts

**Problem**: Due agents hanno expertise overlapping, Claude non sa quale delegare.

**Solution**: Explicit specialization boundaries

\`\`\`markdown
# frontend-specialist.md
SPECIALIZATION:
- React components (UI only)
- NOT API calls (delegate to api-specialist)
- NOT state management (delegate to state-specialist)

# api-specialist.md
SPECIALIZATION:
- API endpoints & HTTP logic
- NOT UI rendering (delegate to frontend-specialist)
- NOT database queries (delegate to database-specialist)
\`\`\`

### 7.3 Dependency Hell

**Problem**: Task A dipende da Task B che dipende da Task C...

**Solution**: Dependency declaration upfront

\`\`\`bash
claude "Execute tasks with explicit dependencies:

TASK GRAPH:
1. [database] Schema design (no deps)
2. [backend] API implementation (deps: 1)
3. [frontend] UI components (deps: 2)
4. [test] Integration tests (deps: 2, 3)

Respect dependency order, parallelize where possible."
\`\`\`

## Riepilogo: Il Tuo Agent Army Setup

### ✅ Quick Start (30 minuti)

1. **Crea directory structure:**
\`\`\`bash
mkdir -p .claude/agents .claude/skills
\`\`\`

2. **Crea 3 core agents:**
- frontend-specialist.md
- backend-specialist.md
- security-auditor.md

3. **Crea 2 core skills:**
- company-coding-standards/
- primary-tech-stack/ (React, Node, etc.)

4. **Test delegation:**
\`\`\`bash
claude "Use frontend-specialist to create login form component"
\`\`\`

### 📈 Advanced Setup (2 ore)

1. **B-MAD Method implementation:**
- Product Owner (main Claude)
- 6+ specialist agents
- Task dependency mapping

2. **Skill library organization:**
- integrations/ (Stripe, SendGrid, etc.)
- frameworks/ (Next.js, React patterns)
- company-specific/ (legacy patterns)

3. **Parallel workflow optimization:**
- Dependency graph per feature type
- Agent pooling configuration
- Performance monitoring

### 🎯 Enterprise Setup (1 giorno)

1. **Complete Protocol Droids suite** (12+ agents)
2. **Comprehensive Skills library** (20+ domains)
3. **Custom orchestration workflows** per project type
4. **Team sharing & onboarding docs**
5. **Performance benchmarks & optimization**

### 🚀 Risultato

Un sistema dove:
- **Feature development**: 10x più veloce (parallel agents)
- **Code quality**: Expert-level (specialist agents)
- **Team consistency**: Stesso agent = stesso output
- **Knowledge preservation**: Skills catturano tribal knowledge
- **Zero context pollution**: Isolamento perfetto

La differenza tra "uso Claude Code" e "orchestro agent army enterprise"? **Questa milestone**.

Ora hai superpoteri multi-agent. Usali saggiamente! 🤖⚡
  `,
  xp: 500,
  badge: "🤖 Agent Commander",
  estimatedTime: "2h 30min",
  topics: [
    "Subagents Architecture",
    "Protocol Droids Pattern",
    "Skills Development",
    "Multi-Agent Orchestration",
    "B-MAD Method",
    "Parallel Task Delegation",
    "Agent Best Practices"
  ],
  quiz: {
    questions: [
      {
        id: "m11-q1",
        question: "Qual è la differenza principale tra Subagents e Skills in Claude Code?",
        options: [
          "Subagents sono più veloci, Skills sono più accurate",
          "Subagents eseguono task in context isolato, Skills iniettano knowledge nel context principale",
          "Subagents costano meno token, Skills sono gratuite",
          "Non c'è differenza, sono sinonimi"
        ],
        correctAnswer: 1,
        explanation: "Subagents operano in context ISOLATO per task delegation parallela, mentre Skills iniettano domain knowledge nel context PRINCIPALE condiviso. Subagents = 'fai questo task', Skills = 'sai come funziona X?'. Context isolation è il vantaggio chiave dei subagents."
      },
      {
        id: "m11-q2",
        question: "Nel B-MAD Method, qual è il ruolo del 'Product Owner' (main Claude)?",
        options: [
          "Scrive tutto il codice personalmente",
          "Coordina specialist agents, valida deliverables, gestisce dependencies",
          "Esegue solo i test finali",
          "Non ha un ruolo, ogni agent lavora autonomamente"
        ],
        correctAnswer: 1,
        explanation: "Il Product Owner (main Claude) è l'ORCHESTRATORE: coordina task delegation agli specialist agents, gestisce dependencies tra task, valida output e integra risultati. Non scrive codice direttamente, DELEGA agli specialisti come un PM reale."
      },
      {
        id: "m11-q3",
        question: "Quale pattern risolve il problema del 'context pollution' quando si lavora su task multi-domain?",
        options: [
          "Usare prompt più lunghi per più contesto",
          "Fare reset della conversazione ogni 10 messaggi",
          "Delegare a subagents con context isolato per domain",
          "Disabilitare la memoria di Claude Code"
        ],
        correctAnswer: 2,
        explanation: "Context pollution = mischiare frontend + backend + database nello stesso context → confusione. Solution: delegare ogni domain a SUBAGENT ISOLATO. Frontend specialist ha solo context React, backend specialist solo API context. Zero cross-contamination!"
      },
      {
        id: "m11-q4",
        question: "In un workflow con 6 task, 3 possono girare in parallelo dopo task 1, poi task 4 dipende dai 3 paralleli. Quanto tempo si risparmia vs esecuzione sequenziale?",
        options: [
          "Nessun risparmio, parallelizzazione non funziona",
          "~50% risparmio (1+max(3 paralleli)+1 vs 6 sequenziali)",
          "~80% risparmio (tutto parallelo)",
          "Dipende solo dalla velocità internet"
        ],
        correctAnswer: 1,
        explanation: "Sequenziale: T1+T2+T3+T4+T5+T6 = 6T. Parallelo ottimizzato: T1 + max(T2,T3,T4) + T5,T6 = ~3T. Risparmio = (6T-3T)/6T = 50%. In pratica: task 1 sequenziale (es. 20min), 3 paralleli (20min totali), task finale (10min) = 50min vs 120min sequenziale = 58% saving!"
      },
      {
        id: "m11-q5",
        question: "Quale formato è corretto per un file Protocol Droid (subagent)?",
        options: [
          "JSON con chiavi 'name', 'role', 'tools'",
          "Markdown (.md) in .claude/agents/ con sezioni EXPERTISE, WORKFLOW, TOOLS, DO NOT",
          "Python script con classe Agent",
          "YAML configuration file"
        ],
        correctAnswer: 1,
        explanation: "Protocol Droids sono file MARKDOWN (.md) in .claude/agents/. Struttura standard: EXPERTISE (cosa sa fare), WORKFLOW (come lavora), TOOLS (tool permessi), DO NOT (limiti), RETURN FORMAT (output strutturato). Esempio: .claude/agents/frontend-specialist.md"
      }
    ]
  },
  challenge: {
    title: "Costruisci Agent Army per Feature Completa",
    description: "Crea suite di subagents e skills, orchestrali per implementare feature enterprise end-to-end usando B-MAD Method",
    instructions: [
      "Crea 5 Protocol Droids in .claude/agents/: frontend-specialist, backend-specialist, database-specialist, test-specialist, security-auditor",
      "Ogni agent deve avere: EXPERTISE, WORKFLOW, TOOLS, DO NOT, RETURN FORMAT chiaramente definiti",
      "Crea 2 Skills custom in .claude/skills/: company-coding-standards/ e primary-framework/ (React o altro stack)",
      "Ogni skill deve avere SKILL.md con: domain knowledge, code examples, best practices, common pitfalls",
      "Implementa feature 'User Profile con Analytics' usando B-MAD orchestration con dependency management",
      "Feature requirements: frontend (ProfileCard, StatsChart), backend (/api/profile, /api/analytics), database (user_stats table), tests (unit + E2E), security audit",
      "Esegui task in parallel dove possibile: architecture → (frontend || backend || database) in parallel → tests → security audit",
      "Documenta dependency graph: quali task dipendono da quali, quali possono essere paralleli",
      "Test che ogni agent generi output nel formato specificato (summary + file paths, no full code dump)",
      "Verifica risparmio tempo: calcola tempo sequenziale vs parallelo, target >50% saving"
    ],
    verificationSteps: [
      "✅ 5 Protocol Droids creati in .claude/agents/ con struttura completa",
      "✅ 2 Skills create in .claude/skills/ con SKILL.md + examples/",
      "✅ Feature 'User Profile' implementata usando agent delegation",
      "✅ Dependency graph documentato e rispettato nell'esecuzione",
      "✅ Almeno 3 task eseguiti in parallelo (frontend, backend, database)",
      "✅ Ogni agent ritorna output strutturato (non dump di codice)",
      "✅ Security audit eseguito da security-auditor agent",
      "✅ Test suite generata da test-specialist agent",
      "✅ Risparmio tempo >50% vs esecuzione sequenziale",
      "✅ Skills utilizzate correttamente (keyword detection automatica)"
    ]
  }
};
