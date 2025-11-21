import { Milestone } from '../../types';

export const milestone09: Milestone = {
  id: 6,
  title: "Project Setup & Architecture",
  subtitle: "Struttura progetti enterprise con CLAUDE.md, ADR, feature specs e organizzazione ottimale",
  description: `
# Milestone 9: Project Setup & Architecture

Benvenuto nel cuore della consulenza aziendale con Claude Code!

Fino ad ora hai imparato a usare Claude Code per task specifici: scrivere codice, risolvere bug, fare refactoring. Ma quando inizi un progetto da zero? Come strutturi tutto perché Claude Code sia massimamente efficace?

Questa milestone è diversa. Non ti insegno "trucchi" ma **metodologie professionali** che uso quotidianamente con clienti enterprise che pagano €2000/giorno per avere progetti strutturati correttamente.

Imparerai a trasformare Claude Code da "assistente che risponde a domande" in "architetto che guida lo sviluppo". La differenza? Un progetto ben strutturato praticamente si scrive da solo.

Preparati a pensare come un Tech Lead, non solo come developer. 🚀

## Capitolo 1: CLAUDE.md di Progetto - Il Cervello del Tuo Sistema

### 1.1 Cos'è CLAUDE.md e Perché è Cruciale

Immagina di assumere un nuovo developer senior. Cosa gli diresti il primo giorno?

- "Ecco come lavoriamo qui"
- "Queste sono le nostre convenzioni"
- "Usa questa struttura per i componenti"
- "Non fare mai X, sempre Y"

**CLAUDE.md è esattamente questo: il brief di onboarding per Claude Code.**

Ma c'è un problema che vedo sempre: developer che creano CLAUDE.md di 500+ righe pensando "più informazioni = meglio". SBAGLIATO!

Claude Code legge TUTTO il file ad ogni sessione. Un file troppo lungo:
- **Diluisce** le informazioni importanti
- **Confonde** con dettagli irrilevanti
- **Rallenta** le risposte (più token da processare)

> 💡 **REGOLA D'ORO**: 100-200 righe è il sweet spot. Abbastanza per dare contesto, non troppo da distrarre.

**Metafora del Ristorante:**

- **Senza CLAUDE.md**: È come un cameriere nuovo che ogni giorno dimentica come funziona il ristorante
- **CLAUDE.md troppo lungo**: È come dare al cameriere un manuale di 500 pagine (non lo leggerà mai)
- **CLAUDE.md ottimale**: È come una checklist di 2 pagine con le cose ESSENZIALI

### 1.2 Struttura Template Completo

Ecco il template che uso per tutti i miei progetti (testato su 50+ progetti reali):

\`\`\`markdown
[Nome Progetto]

Overview: [Cosa fa l'app in 1 frase]
Business Value: [Perché esiste]
Target Users: [Chi la userà]
Key Features: [3-5 feature principali]

Tech Stack:
- Frontend: React 18, TypeScript 5.3, Tailwind CSS
- Backend: Node.js 20, Express, PostgreSQL 15
- Infrastructure: Vercel (frontend), Railway (backend)
- External Services: Stripe, SendGrid, Supabase Auth

Directory Structure:
/src/
  /features/        # Domain-driven organization
    /auth/          # Authentication feature
    /checkout/      # Payment processing
  /shared/          # Shared utilities
  /infrastructure/  # External service integrations
/tests/            # Test files mirror src structure
/.claude/          # Claude Code configuration

Coding Standards:

TypeScript:
- Strict mode SEMPRE abilitato
- NO any type (usa unknown se necessario)
- Explicit return types per funzioni pubbliche
- Interfaces per oggetti, types per union/primitivi

React:
- Functional components ONLY (no classi)
- Custom hooks in /hooks directory
- Props destructuring nel parametro
- Memo solo quando dimostrato necessario

Styling:
- Tailwind CSS inline (NO file CSS separati)
- Design tokens in tailwind.config.js
- Mobile-first responsive design
- Dark mode via CSS variables

File Organization:
- Max 300 righe per file
- Max 20 righe per funzione
- Co-location: test vicino al codice
- Barrel exports per features

Core Commands:
npm run dev        # Start development server
npm run build      # Production build
npm test          # Run all tests
npm run e2e       # Cypress E2E tests
npm run typecheck # TypeScript validation

Environment Variables:
- .env.local per development
- Vercel env vars per production
- NEVER commit .env files
- Use NEXT_PUBLIC_ prefix per client vars

DO NOT:
- Use Bootstrap o jQuery (abbiamo Tailwind)
- Create "utils" o "helpers" generici (usa domain names)
- Skip tests per "risparmiare tempo"
- Commit direttamente su main
- Usare console.log in produzione (usa logger)

Key Decisions:
- Database: PostgreSQL per ACID compliance (vedi ADR-001)
- Auth: Supabase invece di Auth0 per costi (vedi ADR-002)
- Monorepo: No, deploy separati più semplici (vedi ADR-003)

Current Sprint:
Working on: User Dashboard (Sprint 12)
Branch: feature/user-dashboard
Deadline: 2025-02-01
\`\`\`

### 1.3 Iterazione e Raffinamento

Il CLAUDE.md non è statico! Deve evolvere con il progetto:

**Workflow di Raffinamento:**

1. **Inizia minimalista** (50 righe)
2. **Aggiungi quando Claude sbaglia** ripetutamente
3. **Rimuovi sezioni inutilizzate** ogni 2 settimane
4. **Version control** per tracciare evoluzione

**Esempio Evoluzione Reale:**

\`\`\`markdown
# Versione 1 (Settimana 1) - 50 righe
Basic setup, tech stack

# Versione 2 (Settimana 2) - 120 righe
+ Aggiunte convenzioni dopo che Claude usava any type
+ Struttura directory dopo confusione su dove mettere file

# Versione 3 (Settimana 4) - 180 righe
+ Pattern di error handling dopo inconsistenze
+ Regole di testing dopo coverage basso

# Versione 4 (Settimana 8) - 150 righe
- Rimossa sezione Docker (migrato a Vercel)
- Consolidate regole duplicate
\`\`\`

> ⚠️ **ANTI-PATTERN COMUNE**: "Aggiungo tutto subito per essere completo"
>
> NO! Parti con il minimo e aggiungi basandoti su PROBLEMI REALI, non ipotetici.

## Capitolo 2: CLAUDE.md di Directory - Quando il Contesto Cambia

### 2.1 Quando è Utile?

Non tutti i progetti necessitano di CLAUDE.md nested. Usali SOLO quando:

**✅ USA quando:**
- **Monorepo** con progetti indipendenti
- **Codice legacy** con convenzioni diverse
- **Team separati** che lavorano su parti diverse
- **Tecnologie diverse** nella stessa directory

**❌ NON USARE quando:**
- Regole già coperte dal root CLAUDE.md
- Directory con <10 file
- Risk di contraddizioni con root

**Test Decisionale:**

Chiediti: "Le regole di questa directory sono FONDAMENTALMENTE diverse dal resto?"
- Sì → Crea CLAUDE.md dedicato
- No → Usa root CLAUDE.md

### 2.2 Esempio Pratico: Monorepo E-commerce

\`\`\`
/project-root/
  CLAUDE.md              # "Monorepo con 3 progetti, convenzioni generali"

  /backend/
    CLAUDE.md            # "API REST Node.js + Express + MongoDB"
    package.json         # Dependencies backend

  /frontend/
    CLAUDE.md            # "Next.js 14 App Router + Tailwind"
    package.json         # Dependencies frontend

  /mobile/
    CLAUDE.md            # "React Native + Expo, no DOM APIs"
    package.json         # Dependencies mobile
\`\`\`

**Root CLAUDE.md (generale):**
\`\`\`markdown
E-commerce Platform Monorepo

Overview:
Monorepo con 3 applicazioni:
- backend: API REST
- frontend: Web app
- mobile: App iOS/Android

Shared Conventions:
- TypeScript everywhere
- Prettier + ESLint config in root
- Commit convention: conventional-commits
- Branch naming: feature/[ticket]-[description]

DO NOT:
- Don't share types between projects (use codegen)
- Don't reference cross-project files directly
\`\`\`

**Backend CLAUDE.md (specifico):**
\`\`\`markdown
Backend API

Stack:
- Node.js 20 + Express 4
- MongoDB with Mongoose
- Jest for testing

Architecture:
- Repository pattern for data access
- Service layer for business logic
- Controller for HTTP handling

Conventions:
- Error codes in /constants/errors.ts
- Validation with Joi schemas
- Async/await (no callbacks)

Port:
Development: 3000
Testing: 3001
\`\`\`

### 2.3 Hierarchical Override

Le regole seguono una gerarchia chiara:

\`\`\`
Root CLAUDE.md (base rules)
    ↓
Directory CLAUDE.md (override specific rules)
    ↓
Claude Code decision
\`\`\`

**Esempio Override Esplicito:**

\`\`\`markdown
/legacy-module/CLAUDE.md

LEGACY CODE - SPECIAL RULES

This directory contains legacy jQuery code.
Different rules apply here:

OVERRIDE: Use jQuery patterns
- OK to use $ selector (nowhere else!)
- Keep existing callback style (don't convert to promises)
- Bootstrap 3 classes (not Tailwind)

WHY:
Migration planned for Q3 2025. Until then, maintain consistency with existing code.
\`\`\`

## Capitolo 3: Organizzazione Cartelle Best Practices

### 3.1 La Cartella \`.claude/\` - Lo Standard 2025

Dal 2025, Claude Code riconosce automaticamente questa struttura:

\`\`\`
.claude/
├── commands/          # Slash commands personalizzati
│   ├── commit.md      # /commit → genera commit message
│   ├── review.md      # /review → code review checklist
│   └── deploy.md      # /deploy → deployment workflow
│
├── agents/            # Protocol droids (B-Mad Method)
│   ├── frontend-specialist.md
│   └── database-expert.md
│
├── skills/            # Domain knowledge
│   ├── stripe-integration/
│   │   └── skill.md
│   └── discord-bot/
│       └── skill.md
│
└── docs/              # Project documentation
    ├── architecture.md
    ├── database-schema.md
    └── api-specification.md
\`\`\`

**Perché questa struttura?**

Claude Code **pre-carica** questi path. È come avere bookmarks invece di cercare ogni volta.

### 3.2 Custom Slash Commands

I slash commands sono **prompt templates riutilizzabili**. Invece di riscrivere lo stesso prompt ogni volta:

**Crea** \`.claude/commands/bug-report.md\`:

\`\`\`markdown
Bug Report

Analizza questo bug report e genera:

1. Root cause analysis
2. Fix suggerito con code
3. Test per prevenire regressioni
4. Stima tempo fix

Context Needed:
- Error message/stack trace
- Steps to reproduce
- Expected vs actual behavior
- Environment (browser, OS, etc)
\`\`\`

**Usa** nel terminale:
\`\`\`bash
/bug-report

[Claude Code carica automaticamente il template]
\`\`\`

> 💡 **PRO TIP**: I commands sono committable su Git = tutto il team usa gli stessi prompt!

### 3.3 The Great Component Soup Disaster

Parliamo del **più grande errore** che vedo in progetti enterprise. E sì, l'ho fatto anch'io con Flow v1.

Ho organizzato i file "come un developer professionista" — per tipo tecnico:

**❌ THE NIGHTMARE (Technical Organization):**
\`\`\`
/src
├── components/
│   ├── ProductCard.vue
│   ├── ProductList.vue
│   ├── ProductFilter.vue
│   ├── OrderSummary.vue
│   ├── OrderDetails.vue
│   ├── OrderHistory.vue
│   ├── CustomerProfile.vue
│   ├── CustomerList.vue
│   ├── CustomerSearch.vue
│   └── [...147 more components]
├── services/
│   ├── productService.ts
│   ├── orderService.ts
│   ├── customerService.ts
│   └── [...43 more services]
├── utils/
│   ├── formatters.ts
│   ├── validators.ts
│   ├── helpers.ts
│   └── [...28 more utility files]
└── hooks/
    ├── useProducts.ts
    ├── useOrders.ts
    └── [...35 more hooks]
\`\`\`

Questa struttura sembra organizzata. Segue convenzioni comuni. Ogni developer la riconosce.

**È anche completamente inutile per AI agents.**

**Ecco cosa è successo**: Ho chiesto a Claude "aggiungi filtro per categorie prodotto". Richiesta semplice, giusto?

Claude ha passato **15 minuti** a:
1. Cercare tra 147 componenti quali erano relativi ai prodotti
2. Cross-reference con 43 services per trovare il product service
3. Caccia attraverso 35 hooks per il product hook
4. Scavare in utils per il formatter giusto

Quando Claude finalmente aveva abbastanza contesto, aveva caricato così tanto codice **irrilevante** che iniziava a fare decisioni strane — come usare pattern dal customer service quando lavorava sui prodotti, perché "sembravano simili".

**Il problema non è Claude. Il problema è che l'organizzazione tecnica oscura i confini di dominio.**

Così ho ristrutturato Flow completamente:

**✅ THE SOLUTION (Domain Organization):**
\`\`\`
/src
├── features/
│   ├── products/
│   │   ├── components/
│   │   │   ├── ProductCard.vue
│   │   │   ├── ProductList.vue
│   │   │   └── ProductFilter.vue
│   │   ├── services/
│   │   │   └── productService.ts
│   │   ├── composables/
│   │   │   └── useProducts.ts
│   │   ├── types/
│   │   │   └── product.types.ts
│   │   └── CLAUDE.md
│   ├── orders/
│   │   ├── components/
│   │   ├── services/
│   │   ├── composables/
│   │   └── types/
│   ├── customers/
│   │   ├── components/
│   │   ├── services/
│   │   ├── composables/
│   │   └── types/
│   └── inventory/
│       ├── components/
│       ├── services/
│       ├── composables/
│       └── types/
└── shared/
    ├── components/  # Actually shared (buttons, modals, layouts)
    ├── composables/ # Actually shared (useApi, useAuth)
    └── utils/       # Actually shared (date formatting, validation)
\`\`\`

**Stesso codice. Organizzazione diversa. Efficacia AI completamente diversa.**

Ora quando chiedo a Claude di lavorare sui prodotti, apre la cartella \`/features/products/\` e ha **immediatamente TUTTO il contesto** necessario. Componenti. Services. Types. Composables. Tutto relativo ai prodotti in un posto.

**Il risultato?** Quel task "aggiungi filtro categorie prodotto" è passato da **15 minuti a 3 minuti**. E Claude non ha fatto errori cross-domain perché non stava nuotando in contesto irrilevante.

### Le 4 Regole Sacre per CLAUDE.md

Dopo aver ristrutturato 6 progetti e gestito team di sviluppo in tutta Europa, ho distillato l'organizzazione file in **quattro regole**. Queste vanno direttamente in ogni CLAUDE.md che scrivo:

**1️⃣ The 20-Line Rule**

File sotto 20 righe dovrebbero probabilmente essere consolidati.

**Eccezione**: File di configurazione e definizioni di tipi.

**Perché conta**: File piccoli creano overhead di navigazione per l'AI. Claude deve costantemente cambiare contesto tra file, perdendo il filo di ciò che sta cercando di fare.

❌ **Bad:**
\`\`\`
/utils/formatDate.ts          // 8 lines
/utils/formatCurrency.ts      // 6 lines
/utils/formatPhoneNumber.ts   // 9 lines
\`\`\`

✅ **Good:**
\`\`\`
/utils/formatters.ts          // 35 lines - all formatters together
\`\`\`

---

**2️⃣ The 300-Line Rule**

File oltre 300 righe stanno facendo troppo. Dividi per responsabilità o dominio.

**Perché conta**: File grandi sovraccaricano la context window di Claude. Inizia a perdere dettagli sepolti nel mezzo, facendo errori perché sta cercando di tenere troppo in memoria.

Quando ho diviso un \`orderService.ts\` di 600 righe in:
- \`orderService.ts\` (core CRUD operations)
- \`orderValidation.ts\` (validation logic)
- \`orderCalculations.ts\` (price calculations, tax, etc.)

L'accuratezza di Claude su task relativi agli ordini è passata dal **70% al 95%**. Poteva ora comprendere completamente ogni pezzo invece di confondersi con un service massiccio.

---

**3️⃣ The Domain Rule** (LA PIÙ IMPORTANTE!)

**Files that change together live together.** Raggruppa per feature/domain, NON per tipo tecnico.

Questa è la grande. Quella che ha cambiato tutto.

Quando aggiungi una feature shopping cart, toccherai:
- Cart components (UI)
- Cart service (API calls)
- Cart types (TypeScript definitions)
- Cart composables (reusable logic)

Se questi sono sparsi tra \`/components/\`, \`/services/\`, \`/types/\`, e \`/hooks/\`, stai facendo archeologia ogni volta che fai una modifica. E lo stesso vale per Claude.

**Raggruppa per domain. Sempre.**

---

**4️⃣ The Name Rule**

Se non riesci a capire cosa fa un file dal suo nome, il nome fa schifo. Sii specifico.

❌ **Bad names:**
\`\`\`
helpers.ts           (helper per cosa?)
utils.ts            (utility per cosa?)
index.ts            (il nome di file più malvagio nella programmazione)
data.ts             (che dati?)
\`\`\`

✅ **Good names:**
\`\`\`
productPriceCalculator.ts
customerEmailValidator.ts
orderStatusFormatter.ts
supabaseAuthClient.ts
\`\`\`

Claude non deve aprire un file per sapere cosa fa. **Il nome racconta la storia.**

> 💡 **Concetto Chiave**: L'organizzazione dei file è comunicazione. Non stai organizzando per te stesso in questo momento. Stai organizzando per il tuo futuro self, il tuo team, e i tuoi AI agents. La struttura domain-driven comunica "cosa va insieme" a colpo d'occhio.

Usa questo quando decidi dove dovrebbe vivere nuovo codice!

## Capitolo 4: Database Schema Documentation

### 4.1 Dove Documentare Schema

La scelta dipende dalla complessità:

| Tabelle | Dove Documentare | Perché |
|---------|------------------|---------|
| <10 | CLAUDE.md root | Contesto immediato |
| 10-30 | .claude/docs/database.md | Separato ma accessibile |
| 30+ | Directory /database/schema/ | Necessita organizzazione |

### 4.2 Formato Schema (ASCII Art)

Claude Code adora ASCII art per visualizzare relazioni:

\`\`\`markdown
Database Schema

Core Tables:

users
├── id (UUID, PK)
├── email (VARCHAR 255, UNIQUE, NOT NULL)
├── name (VARCHAR 100)
├── role (ENUM: admin|user|guest)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)

orders (1:N with users)
├── id (UUID, PK)
├── user_id (UUID, FK → users.id, NOT NULL)
├── status (ENUM: pending|processing|shipped|delivered)
├── total (DECIMAL 10,2)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)

order_items (N:1 with orders, N:1 with products)
├── id (UUID, PK)
├── order_id (UUID, FK → orders.id, CASCADE DELETE)
├── product_id (UUID, FK → products.id)
├── quantity (INT, CHECK > 0)
├── price (DECIMAL 10,2)
└── subtotal (DECIMAL 10,2, GENERATED)

Relationships Diagram:

users ──┐
        ├──< orders ──< order_items >── products
        │
        └──< user_sessions

Legend:
──<  = One to Many
>──  = Many to One
>──< = Many to Many
\`\`\`

### 4.3 Esempi SQL Migration

Con schema ben documentato, Claude Code genera migration perfette:

**Tu**: "Genera migration Prisma da schema documentato"

**Claude Code** genera:

\`\`\`prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String?
  role      UserRole @default(USER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  orders    Order[]
  sessions  UserSession[]

  @@map("users")
}

enum UserRole {
  ADMIN
  USER
  GUEST
}

model Order {
  id        String      @id @default(uuid())
  userId    String      @map("user_id")
  status    OrderStatus @default(PENDING)
  total     Decimal     @db.Decimal(10, 2)
  createdAt DateTime    @default(now())
  updatedAt DateTime    @updatedAt

  user      User        @relation(fields: [userId], references: [id])
  items     OrderItem[]

  @@map("orders")
}
\`\`\`

## Capitolo 5: Feature vs Task Definition

### 5.1 Gerarchia di Lavoro

Pensa al lavoro come una matrioska russa:

\`\`\`
📦 Epic (Feature) - "Sistema Autenticazione Completo"
  └── 📋 Story (Task) - "Implementare login con Google"
      └── ✅ Subtask - "Configurare OAuth client"
\`\`\`

**Le differenze PRATICHE:**

| Livello | Durata | Valore | Esempio |
|---------|---------|---------|----------|
| **Feature** | 2-8 settimane | Business completo | "Sistema pagamenti" |
| **Task** | 1-3 giorni | Pezzo funzionante | "Integra Stripe checkout" |
| **Subtask** | 1-4 ore | Azione tecnica | "Setup webhook Stripe" |

### 5.2 Template Feature Specification

Questo template ha salvato GIORNI di lavoro prevenendo scope creep:

\`\`\`markdown
Feature: Sistema Notifiche Real-time

Business Value:
- Problema: Utenti non sanno quando ordini sono pronti
- Soluzione: Notifiche push real-time
- Impatto: -30% chiamate supporto, +15% soddisfazione

User Stories:
- Come cliente, voglio ricevere notifica quando ordine è spedito
- Come admin, voglio inviare broadcast a tutti gli utenti
- Come driver, voglio confermare consegna con un tap

Acceptance Criteria (Testabile!):
- Notifica arriva entro 5 secondi da evento
- Funziona offline (coda + retry)
- Utente può disabilitare per categoria
- Analytics su delivery rate
- Fallback email se push fallisce

Technical Specs:

Database:
notifications (id, user_id, type, title, body, read_at, clicked_at, created_at)
notification_preferences (user_id, category, channel, enabled)

API Endpoints:
- POST /api/notifications/send
- GET /api/notifications/user/:id
- PUT /api/notifications/:id/read
- POST /api/notifications/broadcast

Frontend Components:
- NotificationBell.tsx (header icon + count)
- NotificationPanel.tsx (dropdown list)
- NotificationSettings.tsx (preferences)

External Services:
- Firebase Cloud Messaging (push)
- SendGrid (email fallback)
- Mixpanel (analytics)

Out of Scope (NO Scope Creep!):
- SMS notifications (Future fase 2)
- In-app chat (Diverso epic)
- Notification scheduling (Futura feature)

Dependencies:
- User authentication implementato
- Firebase project configurato
- Privacy policy aggiornata per push

Risks & Mitigations:
Risk: iOS rejetta app per troppe notifiche
Mitigation: Rate limiting max 10/giorno/user

Risk: Firebase down
Mitigation: Queue locale + retry con exponential backoff

Effort Estimate:
- Backend API: 3 giorni
- Frontend UI: 2 giorni
- Integration test: 1 giorno
- Deploy + monitoring: 1 giorno
TOTALE: 7 giorni (1.5 sprints)
\`\`\`

### 5.3 Come Claude Code Aiuta

Con feature spec dettagliata, Claude Code diventa CHIRURGICO:

\`\`\`bash
# Breakdown automatico
claude "Analizza feature spec e genera task breakdown con stime"

# Genera tutto il boilerplate
claude "Genera API endpoints da technical specs"

# Identifica rischi nascosti
claude "Quali altri rischi non ho considerato?"

# Test scenarios
claude "Genera test scenarios da acceptance criteria"
\`\`\`

## Capitolo 6: Architecture Decision Records (ADR)

### 6.1 Cos'è un ADR?

Un ADR è come una **"scatola nera" per decisioni tecniche**.

Quante volte ti è capitato?
- "Perché usiamo MongoDB invece di PostgreSQL?"
- "Chi ha deciso di usare questo framework?"
- "Perché non usiamo semplicemente X?"

Senza ADR: 🤷‍♂️ "Boh, era già così"

Con ADR: 📋 "Ecco esattamente perché, con pro e contro"

### 6.2 Struttura ADR

\`\`\`markdown
ADR-004: Usare Server-Side Rendering (SSR) con Next.js

Status: Accepted
Date: 2025-01-15
Author: Marco Rossi
Deciders: Team Frontend

Context:
La nostra e-commerce app ha problemi SEO. Google non indicizza bene le pagine
prodotto perché sono client-side rendered. Perdiamo traffico organico.

Decision:
Migreremo a Next.js 14 con App Router per SSR/SSG dove necessario.

Alternatives Considered:

1. Restare su React SPA + Prerendering
Pro:
- Minimo refactoring
- Team già conosce codebase

Contro:
- Prerendering limitato
- No real-time SEO data
- Complessità configurazione

2. Migrare tutto a SSR puro (Remix/SvelteKit)
Pro:
- Performance ottimale
- SEO perfetto

Contro:
- Rewrite completo (3-6 mesi)
- Team deve imparare nuovo framework
- Risk progetto

3. Next.js Incremental (SCELTA)
Pro:
- Migrazione incrementale possibile
- React components riutilizzabili
- SSR/SSG/CSR mix ottimale
- Vercel deployment semplice

Contro:
- App Router learning curve
- Alcune limitazioni su third-party libraries

Consequences:

Positive:
- +200% traffico organico stimato
- -50% Time to First Byte
- Better Core Web Vitals

Negative:
- 2 mesi migration effort
- Hosting costs +30% (server rendering)
- Complessità debugging SSR

Implementation Plan:
1. Proof of concept su /products (1 settimana)
2. Migrazione incremental routes (6 settimane)
3. Deprecazione vecchio SPA (2 settimane)

Review Date:
2025-07-15 - Verificare metriche SEO e decidere se completare migrazione

Lessons Learned:
(Compilare dopo implementazione)
\`\`\`

### 6.3 Workflow ADR con Claude Code

Claude Code ECCELLE nel generare ADR perché ha context su TUTTE le tecnologie:

\`\`\`bash
# Genera ADR con analisi completa
claude "Aiutami a decidere tra REST vs GraphQL per nuovo progetto.
Contesto: 5 developers, 20+ endpoints, mobile + web clients.
Genera ADR completo con raccomandazione."

# Review ADR esistente
claude "Analizza ADR-002 alla luce dei nuovi requisiti.
È ancora valida la decisione o serve revisione?"

# Impact analysis
claude "Se implementiamo ADR-005 (microservices), quali altri
ADR dovremmo creare per decisioni correlate?"
\`\`\`

## Capitolo 7: Integration con .mcp.json

### 7.1 Cos'è MCP (Model Context Protocol)?

MCP è il **"ponte" tra Claude Code e tool esterni**.

Pensa a MCP come USB per AI:
- **Senza MCP**: Claude può solo leggere/scrivere file
- **Con MCP**: Claude può controllare browser, database, API, monitoring...

### 7.2 Esempio .mcp.json

\`\`\`json
{
  "mcpServers": {
    "puppeteer": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-puppeteer"],
      "env": {
        "HEADLESS": "false"
      }
    },

    "supabase": {
      "command": "npx",
      "args": ["supabase-mcp-server"],
      "env": {
        "SUPABASE_URL": "\${SUPABASE_URL}",
        "SUPABASE_SERVICE_KEY": "\${SUPABASE_SERVICE_KEY}"
      }
    },

    "sentry": {
      "command": "npx",
      "args": ["@sentry/mcp-server"],
      "env": {
        "SENTRY_DSN": "\${SENTRY_DSN}",
        "SENTRY_ORG": "my-company",
        "SENTRY_PROJECT": "frontend"
      }
    }
  }
}
\`\`\`

### 7.3 Use Cases Potenti

**Con Puppeteer MCP:**
\`\`\`bash
claude "Apri Chrome, vai su nostro sito staging, fai screenshot
di tutte le pagine e analizza problemi UX"
\`\`\`

**Con Supabase MCP:**
\`\`\`bash
claude "Query database per trovare utenti inattivi da 30+ giorni
e genera report con suggerimenti re-engagement"
\`\`\`

**Con Sentry MCP:**
\`\`\`bash
claude "Analizza ultimi 50 errori in produzione, raggruppa per
tipo e suggerisci fix prioritizzati per impatto"
\`\`\`

> 🚀 **GAME CHANGER**: Claude Code non solo scrive codice, ma INTERAGISCE con l'infrastruttura!

## Riepilogo: Il Tuo Setup Day 1

Quando inizi un nuovo progetto, questa è la checklist:

### ✅ Quick Setup (30 minuti)
1. **Crea CLAUDE.md root** (100-150 righe)
2. **Setup .claude/commands/** con 3-5 commands base
3. **Documenta database schema** (anche solo draft)
4. **Scrivi prima Feature Spec**
5. **Configura .mcp.json** per tool essenziali

### 📈 Evoluzione (Prime 2 settimane)
- Affina CLAUDE.md basandoti su problemi reali
- Aggiungi ADR per decisioni importanti
- Espandi commands quando trovi pattern ripetitivi
- Documenta "Out of Scope" per prevenire scope creep

### 🎯 Risultato
Un progetto dove Claude Code:
- Sa ESATTAMENTE come lavorare
- Non fa errori ripetitivi
- Mantiene consistenza perfetta
- Genera codice production-ready al primo colpo

La differenza tra hobby project e consulenza enterprise da €2000/giorno? **La struttura**.

Ora ce l'hai anche tu. Usala saggiamente! 🏗️
  `,
  xp: 400,
  badge: "🏗️ Architect",
  estimatedTime: "1h 30min",
  topics: [
    "CLAUDE.md Best Practices",
    "Project Organization",
    "Architecture Decision Records",
    "Feature Specifications",
    "Database Documentation",
    "MCP Configuration"
  ],
  quiz: {
    questions: [
      {
        id: "m9-q1",
        question: "Qual è la lunghezza ideale per un CLAUDE.md di progetto?",
        options: [
          "20-50 righe per essere conciso",
          "100-200 righe per bilanciare completezza e focus",
          "500+ righe per coprire ogni dettaglio",
          "Non c'è limite, più informazioni meglio è"
        ],
        correctAnswer: 1,
        explanation: "100-200 righe è il sweet spot: abbastanza per dare contesto essenziale, non troppo da diluire le informazioni importanti. Un file troppo lungo rallenta Claude Code e confonde con dettagli irrilevanti."
      },
      {
        id: "m9-q2",
        question: "Quando è appropriato creare un CLAUDE.md di directory invece di usare solo quello root?",
        options: [
          "Sempre, per ogni directory del progetto",
          "Mai, crea solo confusione",
          "Quando la directory ha regole fondamentalmente diverse dal resto del progetto",
          "Solo per directory con più di 100 file"
        ],
        correctAnswer: 2,
        explanation: "Un CLAUDE.md di directory è utile quando hai monorepo, codice legacy con convenzioni diverse, o tecnologie completamente diverse. Non serve per piccole variazioni già coperte dal root CLAUDE.md."
      },
      {
        id: "m9-q3",
        question: "Nella gerarchia Feature → Task → Subtask, quali sono le durate tipiche?",
        options: [
          "Feature: 2-8 giorni, Task: 1 ora, Subtask: 15 minuti",
          "Feature: 2-8 settimane, Task: 1-3 giorni, Subtask: 1-4 ore",
          "Feature: 1 giorno, Task: 1 ora, Subtask: 10 minuti",
          "Non esistono durate standard, dipende dal progetto"
        ],
        correctAnswer: 1,
        explanation: "Feature (Epic) richiede 2-8 settimane per valore business completo, Task (Story) è completabile in 1-3 giorni, Subtask è un'azione tecnica di 1-4 ore. Questa gerarchia aiuta nella pianificazione realistica."
      },
      {
        id: "m9-q4",
        question: "Qual è lo scopo principale di un ADR (Architecture Decision Record)?",
        options: [
          "Documentare bug e come sono stati risolti",
          "Tracciare le ore lavorate su ogni feature",
          "Catturare il 'perché' dietro decisioni architetturali importanti",
          "Generare automaticamente la documentazione API"
        ],
        correctAnswer: 2,
        explanation: "Un ADR documenta PERCHÉ è stata presa una decisione tecnica importante, quali alternative sono state considerate, e quali sono le conseguenze. Questo previene il 'perché abbiamo scelto X?' mesi dopo."
      },
      {
        id: "m9-q5",
        question: "Quale vantaggio offre MCP (Model Context Protocol) rispetto a Claude Code standard?",
        options: [
          "Rende Claude Code più veloce nelle risposte",
          "Permette a Claude Code di interagire con tool esterni oltre a file locali",
          "Riduce il consumo di token nelle conversazioni",
          "Genera codice di qualità superiore"
        ],
        correctAnswer: 1,
        explanation: "MCP è il 'ponte' che permette a Claude Code di controllare browser (Puppeteer), database (Supabase), monitoring (Sentry) e altri tool esterni. Senza MCP, Claude può solo leggere/scrivere file locali."
      }
    ]
  },
  challenge: {
    title: "Setup Progetto E-Commerce da Zero",
    description: "Struttura un progetto e-commerce professionale con tutta la documentazione necessaria per Claude Code",
    instructions: [
      "Crea un CLAUDE.md root di 150 righe con overview, tech stack, coding standards e comandi principali",
      "Se usi monorepo, crea CLAUDE.md specifici per frontend/backend con regole dedicate",
      "Documenta lo schema database per users, products, orders e order_items usando ASCII art",
      "Scrivi una Feature Spec completa per 'Sistema Pagamenti con Stripe' includendo user stories e acceptance criteria",
      "Crea un ADR che spiega 'Perché Stripe invece di PayPal' con analisi pro/contro",
      "Configura .mcp.json base per almeno 2 tool esterni (es. Supabase, Puppeteer)"
    ],
    verificationSteps: [
      "✅ CLAUDE.md bilanciato (100-200 righe) con info essenziali",
      "✅ Schema database chiaro con relazioni visualizzate",
      "✅ Feature Spec con 'Out of Scope' per prevenire scope creep",
      "✅ ADR con alternatives considered e decision rationale",
      "✅ Struttura .claude/ con commands personalizzati",
      "✅ MCP configurato per integrazione tool esterni"
    ]
  }
};