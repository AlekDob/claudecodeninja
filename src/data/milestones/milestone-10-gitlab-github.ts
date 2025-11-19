import { Milestone } from '../../types';

export const milestone10: Milestone = {
  id: 12,
  title: "GitLab & GitHub Enterprise Integration",
  subtitle: "Workflow automation, CI/CD pipeline e code review per team enterprise con Claude Code",
  description: `
# Milestone 10: GitLab & GitHub Enterprise Integration

Benvenuto nella milestone che separa progetti personali da sistemi enterprise production-ready!

Fino ad ora hai usato Claude Code per task individuali: scrivere feature, debuggare, refactoring. Ma nei contesti aziendali? Come integri Claude Code con GitLab CI/CD? Come automatizzi code review su 50+ merge request al giorno? Come garantisci security e compliance?

Questa milestone ti trasforma in un **DevOps Engineer con superpoteri AI**. Imparerai a:
- Configurare Claude Code con GitLab/GitHub Enterprise
- Automatizzare CI/CD pipeline con AI-driven optimization
- Implementare code review automation che fa risparmiare 20+ ore/settimana al team
- Gestire branching strategy (GitFlow vs Trunk-based) con Claude Code
- Integrare security scanning (SAST) e secrets management

La differenza tra "so usare Git" e "so orchestrare workflow enterprise da €100K/anno"? Questa milestone. 🚀

## Capitolo 1: Setup GitLab Enterprise con Claude Code

### 1.1 Prerequisiti e Token Setup

Prima di tutto: GitLab vs GitHub? Entrambi validi, ma GitLab domina in contesti enterprise europei per:
- **Self-hosted**: Dati on-premise per compliance GDPR
- **CI/CD integrato**: Non serve GitHub Actions separato
- **Costo**: GitLab Free/Premium vs GitHub Enterprise (5x più costoso)

**Setup Token GitLab:**

\`\`\`bash
# 1. Vai su GitLab → Settings → Access Tokens
# 2. Crea Personal Access Token con scope:
#    - api (full access)
#    - read_repository
#    - write_repository

# 3. Salva in .env (MAI committare!)
echo "GITLAB_TOKEN=glpat-xxxxxxxxxxxx" >> .env.local

# 4. Configura Git per usare token
git config --global credential.helper store
git config --global user.name "Il Tuo Nome"
git config --global user.email "tua@email.com"
\`\`\`

**Verifica Setup:**

\`\`\`bash
# Test connessione GitLab
curl --header "PRIVATE-TOKEN: glpat-xxxx" \
  "https://gitlab.com/api/v4/user"

# Output atteso: { "id": 123, "username": "tuousername", ... }
\`\`\`

### 1.2 Configurare .gitlab-ci.yml per Claude Code

Il cuore di GitLab CI/CD è \`.gitlab-ci.yml\`. Ecco un template ottimizzato per progetti con Claude Code:

\`\`\`yaml
# .gitlab-ci.yml - Template Production-Ready

stages:
  - validate
  - test
  - build
  - deploy

variables:
  NODE_VERSION: "20"
  DOCKER_DRIVER: overlay2

# Template riutilizzabile
.node_template: &node_template
  image: node:20-alpine
  cache:
    key: npm-cache
    paths:
      - node_modules/
  before_script:
    - npm ci --prefer-offline

# STAGE 1: Validate
lint:
  <<: *node_template
  stage: validate
  script:
    - npm run lint
    - npm run typecheck
  rules:
    - if: '$CI_PIPELINE_SOURCE == "merge_request_event"'

# STAGE 2: Test
test:unit:
  <<: *node_template
  stage: test
  script:
    - npm run test:unit -- --coverage
  coverage: '/All files[^|]*\|[^|]*\s+([\d\.]+)/'
  artifacts:
    reports:
      coverage_report:
        coverage_format: cobertura
        path: coverage/cobertura-coverage.xml

test:e2e:
  <<: *node_template
  stage: test
  services:
    - postgres:15
  variables:
    POSTGRES_DB: test_db
    POSTGRES_USER: test
    POSTGRES_PASSWORD: test
  script:
    - npm run test:e2e
  rules:
    - if: '$CI_COMMIT_BRANCH == "main"'
    - if: '$CI_PIPELINE_SOURCE == "merge_request_event"'

# STAGE 3: Build
build:
  <<: *node_template
  stage: build
  script:
    - npm run build
  artifacts:
    paths:
      - dist/
    expire_in: 1 week
  only:
    - main
    - develop

# STAGE 4: Deploy
deploy:staging:
  stage: deploy
  image: alpine:latest
  before_script:
    - apk add --no-cache curl
  script:
    - curl -X POST $WEBHOOK_STAGING
  environment:
    name: staging
    url: https://staging.tuodominio.com
  only:
    - develop

deploy:production:
  stage: deploy
  image: alpine:latest
  before_script:
    - apk add --no-cache curl
  script:
    - curl -X POST $WEBHOOK_PRODUCTION
  environment:
    name: production
    url: https://tuodominio.com
  when: manual
  only:
    - main
\`\`\`

**Ottimizzazioni Chiave:**

1. **Caching intelligente**: \`node_modules/\` cached tra job
2. **Parallelizzazione**: lint + test girano in parallelo
3. **Conditional pipelines**: E2E solo su main/MR (risparmio 60% CI minutes)
4. **Manual deploy production**: Zero accidental deploys
5. **Coverage reports**: Integrati in GitLab UI

### 1.3 Claude Code per Generare Pipeline

Invece di scrivere manualmente .gitlab-ci.yml, usa Claude Code:

\`\`\`bash
# Prompt ottimizzato per Claude Code
claude "Genera .gitlab-ci.yml per progetto Next.js 14 con:
- TypeScript strict mode
- Vitest per unit test
- Playwright per E2E
- Deploy Vercel staging su branch develop
- Deploy production manuale su main
- Security scan con Trivy
- SAST analysis

Ottimizza per ridurre CI minutes usando cache e parallel jobs."
\`\`\`

Claude Code genera pipeline production-ready in 30 secondi vs 2 ore manuali! 🎯

## Capitolo 2: GitHub Enterprise Alternative

### 2.1 Setup GitHub Actions con Claude Code

GitHub Actions usa workflow files in \`.github/workflows/\`:

\`\`\`yaml
# .github/workflows/ci.yml

name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  lint-and-test:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [18, 20]

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: \${{ matrix.node-version }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Type check
        run: npm run typecheck

      - name: Unit tests
        run: npm run test:unit

      - name: Upload coverage
        uses: codecov/codecov-action@v4
        with:
          token: \${{ secrets.CODECOV_TOKEN }}

  build:
    needs: lint-and-test
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Upload build artifacts
        uses: actions/upload-artifact@v4
        with:
          name: dist
          path: dist/
          retention-days: 7
\`\`\`

### 2.2 Claude Code GitHub Action Ufficiale

Anthropic fornisce un'action ufficiale per integrare Claude Code nei workflow:

\`\`\`yaml
# .github/workflows/claude-code-review.yml

name: Claude Code Review

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  code-review:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0  # Full history per analisi

      - name: Claude Code Review
        uses: anthropics/claude-code-action@v1
        with:
          anthropic-api-key: \${{ secrets.ANTHROPIC_API_KEY }}
          review-prompt: |
            Analizza questo PR e fornisci:
            1. Code quality assessment
            2. Potential bugs o security issues
            3. Suggerimenti performance
            4. Compliance con coding standards del progetto

          auto-comment: true
          fail-on-issues: false
\`\`\`

**Risultato**: Ogni PR riceve automaticamente review AI dettagliata! 🤖

### 2.3 GitLab vs GitHub: Quando Usare Cosa

| Criterio | GitLab | GitHub |
|----------|---------|---------|
| **Self-hosted** | ✅ Eccellente | ⚠️ GitHub Enterprise costoso |
| **CI/CD integrato** | ✅ Nativo | ⚠️ Richiede Actions setup |
| **Open source** | ✅ GitLab CE gratis | ❌ Solo cloud gratuito limitato |
| **Enterprise EU** | ✅ GDPR compliance facile | ⚠️ Server US-based |
| **Community** | ⚠️ Più piccola | ✅ Più grande al mondo |
| **Marketplace** | ⚠️ Limitato | ✅ GitHub Marketplace enorme |

**Raccomandazione**: GitLab per enterprise EU con compliance, GitHub per startups/open source.

## Capitolo 3: Branching Strategies con Claude Code

### 3.1 GitFlow: Il Classico Enterprise

GitFlow è lo standard per team che rilasciano versioni scheduled (es: ogni 2 settimane):

\`\`\`
main (production)
  |
  |-- develop (integration)
       |
       |-- feature/user-dashboard
       |-- feature/payment-integration
       |-- hotfix/critical-bug
\`\`\`

**Workflow GitFlow con Claude Code:**

\`\`\`bash
# 1. Crea feature branch
git checkout -b feature/new-dashboard develop

# 2. Chiedi a Claude Code di implementare
claude "Implementa dashboard utente con:
- Overview stats (ordini, revenue)
- Grafici Chart.js ultimi 30 giorni
- Export CSV
Segui design system in CLAUDE.md"

# 3. Claude Code genera codice
# ...codice generato...

# 4. Test automatici
npm run test

# 5. Commit
git add .
git commit -m "feat: add user dashboard with analytics"

# 6. Push e crea MR
git push origin feature/new-dashboard

# 7. Apri Merge Request su GitLab
# GitLab CI/CD parte automaticamente
\`\`\`

**Pro GitFlow:**
- Chiaro per team grandi (>20 devs)
- Supporta multiple release in parallelo
- Hotfix isolati da development

**Contro:**
- Overhead branches (lento)
- Merge conflicts frequenti
- Non adatto a continuous deployment

### 3.2 Trunk-Based Development: Il Moderno

Trunk-based è lo standard 2025 per team che fanno continuous deployment:

\`\`\`
main (trunk)
  |
  |-- short-lived-branch (max 1 giorno)
  |-- another-branch (max 1 giorno)
\`\`\`

**Regole Trunk-Based:**
1. Branch vive MAX 1 giorno
2. Merge su main ALMENO 1 volta/giorno
3. Feature flags per nascondere codice incompleto
4. CI/CD ultra-veloce (<5 minuti)

**Workflow Trunk-Based con Claude Code:**

\`\`\`bash
# 1. Branch piccolo e focale
git checkout -b quick-fix-typo main

# 2. Fix veloce
claude "Correggi typo in homepage hero title"

# 3. Test + commit + push
npm test && git add . && \
git commit -m "fix: correct hero title typo" && \
git push origin quick-fix-typo

# 4. Merge immediato (< 1 ora review)
# 5. Delete branch
git branch -d quick-fix-typo
\`\`\`

**Feature Flags per Trunk-Based:**

\`\`\`typescript
// lib/featureFlags.ts
export const FEATURES = {
  NEW_DASHBOARD: process.env.NEXT_PUBLIC_FF_DASHBOARD === 'true',
  PAYMENT_V2: process.env.NEXT_PUBLIC_FF_PAYMENT_V2 === 'true',
} as const;

// Uso in componente
import { FEATURES } from '@/lib/featureFlags';

export function Dashboard() {
  if (!FEATURES.NEW_DASHBOARD) {
    return <LegacyDashboard />;
  }

  return <NewDashboard />;
}
\`\`\`

**Quando Usare Trunk-Based:**
- ✅ Team <15 persone
- ✅ Continuous deployment (10+ deploy/giorno)
- ✅ Buona test coverage (>80%)
- ✅ CI/CD veloce (<5 min)

### 3.3 Claude Code per Gestire Merge Conflicts

I merge conflicts sono il nemico #1 nei team. Claude Code li risolve in secondi:

\`\`\`bash
# Scenario: merge conflict su checkout.tsx
git merge develop
# CONFLICT in src/features/checkout/Checkout.tsx

# Chiedi aiuto a Claude Code
claude "Ho merge conflict in Checkout.tsx tra:
- main: implementa Stripe
- develop: implementa PayPal

Risolvilo mantenendo ENTRAMBI i payment provider con switch runtime."

# Claude Code analizza ENTRAMBE le versioni e genera:
\`\`\`typescript
// Risoluzione intelligente con strategy pattern
import { StripeProvider } from './providers/stripe';
import { PayPalProvider } from './providers/paypal';

export function Checkout({ paymentMethod }: Props) {
  const provider = paymentMethod === 'stripe'
    ? new StripeProvider()
    : new PayPalProvider();

  return <CheckoutForm provider={provider} />;
}
\`\`\`

Tempo risparmiato: 30 minuti → 2 minuti! ⚡

## Capitolo 4: Code Review Automation

### 4.1 Il Problema delle Code Review Manuali

Scenario tipico team enterprise:
- 50 MR/giorno
- Ogni review: 15-30 minuti
- Totale: **12-25 ore/giorno** di review

**Costo annuale**: €150K-300K in tempo developer! 💸

### 4.2 AI-Driven Code Review con Claude Code

GitLab/GitHub possono triggerare Claude Code automaticamente su ogni MR:

**Setup GitLab CI per Auto-Review:**

\`\`\`yaml
# .gitlab-ci.yml
code-review:
  stage: validate
  image: node:20-alpine
  script:
    - npm install -g claude-code-cli
    - |
      claude review \
        --mr-id=$CI_MERGE_REQUEST_IID \
        --focus="security,performance,standards" \
        --auto-comment \
        --block-on-critical
  rules:
    - if: '$CI_PIPELINE_SOURCE == "merge_request_event"'
  allow_failure: false
\`\`\`

**Cosa Controlla Claude Code:**

1. **Security Issues**:
   - SQL injection risks
   - XSS vulnerabilities
   - Secrets hardcoded
   - Dependency vulnerabilities

2. **Performance Problems**:
   - N+1 query patterns
   - Memory leaks
   - Inefficient algorithms
   - Bundle size bloat

3. **Standards Compliance**:
   - Coding conventions da CLAUDE.md
   - TypeScript strict mode
   - Test coverage <80%
   - Missing documentation

### 4.3 Custom Review Checklist

Personalizza review focus per il tuo progetto:

\`\`\`markdown
# .claude/commands/review.md

Esegui code review su MR corrente con focus:

SECURITY:
- Verifica input validation su form
- Check SQL queries per injection
- Conferma secrets in .env (non hardcoded)
- Dependency audit (npm audit)

PERFORMANCE:
- Identifica re-renders inutili React
- Check database query efficiency
- Verifica immagini ottimizzate (<200KB)
- Bundle size impact (<500KB increase)

STANDARDS:
- Max 20 righe per funzione
- Max 300 righe per file
- TypeScript strict compliance
- Test coverage >=80% su nuovo codice

ACCESSIBILITY:
- ARIA labels su interactive elements
- Keyboard navigation funzionante
- Color contrast ratio >=4.5:1
- Screen reader compatibility

Output atteso:
1. Lista issue trovati (critical/warning/info)
2. Suggerimenti fix con code snippets
3. Score 0-100 code quality
4. Raccomandazione: APPROVE / REQUEST_CHANGES / COMMENT
\`\`\`

**Uso:**
\`\`\`bash
# Su ogni MR, esegui:
claude /review

# Claude Code analizza tutti i file modificati e genera report!
\`\`\`

## Capitolo 5: CI/CD Pipeline Optimization

### 5.1 Il Problema: Pipeline Lente = Developer Frustrati

Pipeline lenta = context switching = produttività -50%:
- Developer pusha codice
- Pipeline impiega 20 minuti
- Developer switcha su altro task
- Pipeline fallisce
- Developer deve ri-contestualizzarsi (10 min persi)
- Fix + re-push
- Ciclo riparte...

**Goal**: Pipeline <5 minuti per feedback immediato.

### 5.2 Ottimizzazioni Essenziali

**1. Parallelizzazione Aggressiva:**

\`\`\`yaml
# PRIMA (seriale): 15 minuti totali
stages:
  - lint     # 3 min
  - test     # 8 min
  - build    # 4 min

# DOPO (parallelo): 8 minuti totali
stages:
  - validate  # lint + test in parallelo

validate:
  parallel:
    matrix:
      - JOB: [lint, test:unit, test:e2e]
\`\`\`

**2. Caching Intelligente:**

\`\`\`yaml
cache:
  key:
    files:
      - package-lock.json  # Invalida solo quando dependencies cambiano
  paths:
    - node_modules/
    - .next/cache/        # Next.js build cache
    - .cache/             # Tool caches
  policy: pull-push
\`\`\`

**3. Docker Layer Caching:**

\`\`\`dockerfile
# Ottimizza ordine layers per max cache hits
FROM node:20-alpine

# Layer 1: Dependencies (cambia raramente)
COPY package*.json ./
RUN npm ci --only=production

# Layer 2: Source code (cambia spesso)
COPY . .

# Layer 3: Build (ri-eseguito solo se layer 1 o 2 cambiano)
RUN npm run build
\`\`\`

**4. Conditional Jobs:**

\`\`\`yaml
# E2E test SOLO se tocchi frontend
test:e2e:
  rules:
    - changes:
        - src/pages/**/*
        - src/components/**/*
\`\`\`

**Risultato**: Pipeline da 20 minuti → 4 minuti! 🚀

### 5.3 Claude Code per Ottimizzare Pipeline

Chiedi a Claude Code di analizzare la tua pipeline:

\`\`\`bash
claude "Analizza .gitlab-ci.yml e suggerisci ottimizzazioni per:
- Ridurre execution time
- Minimizzare CI minutes cost
- Mantenere stessa code coverage
- Improve caching strategy

Fornisci benchmark stimato per ogni ottimizzazione."
\`\`\`

Claude Code genera report con impact analysis! 📊

## Capitolo 6: Security & Compliance

### 6.1 SAST (Static Application Security Testing)

Integra security scanning automatico:

\`\`\`yaml
# GitLab CI con Semgrep (SAST tool)
sast:
  stage: validate
  image: returntocorp/semgrep
  script:
    - semgrep scan --config=auto --json > sast-report.json
  artifacts:
    reports:
      sast: sast-report.json
  allow_failure: false  # Blocca MR se critical issues
\`\`\`

**Cosa Detecta SAST:**
- SQL Injection
- XSS (Cross-Site Scripting)
- CSRF tokens mancanti
- Hardcoded secrets
- Insecure crypto
- Path traversal

### 6.2 Secrets Management

**❌ MAI FARE:**
\`\`\`typescript
// CRITICAL SECURITY ISSUE!
const STRIPE_KEY = "sk_live_xxxxxxxxxxxx";  // Hardcoded!
\`\`\`

**✅ SEMPRE FARE:**

1. **GitLab CI/CD Variables:**
\`\`\`
Settings → CI/CD → Variables
- STRIPE_SECRET_KEY (Protected + Masked)
- DATABASE_URL (Protected + Masked)
\`\`\`

2. **Runtime Access:**
\`\`\`typescript
// lib/stripe.ts
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});
\`\`\`

3. **Pre-commit Hook Check:**
\`\`\`bash
# .husky/pre-commit
#!/bin/sh
npx --no -- secretlint "**/*"
\`\`\`

### 6.3 Dependency Security Audit

\`\`\`yaml
# Audit dependencies automatico
security:audit:
  stage: validate
  script:
    - npm audit --audit-level=high
    - npm outdated
  allow_failure: false
\`\`\`

**Claude Code per Security Review:**
\`\`\`bash
claude "Esegui security audit completo:
1. Scan codice per vulnerabilities (XSS, SQL injection, etc)
2. Check dependencies per CVE known
3. Verifica secrets non committati
4. Valuta OWASP Top 10 compliance

Genera report con severity (critical/high/medium/low)."
\`\`\`

## Capitolo 7: Issue Tracking Integration

### 7.1 Auto-Close Issue da Commit

GitLab/GitHub supportano keyword per auto-close issue:

\`\`\`bash
git commit -m "fix: resolve login timeout issue

Implements retry logic with exponential backoff.
Added unit tests for edge cases.

Closes #142"
\`\`\`

Al merge su main, issue #142 si chiude automaticamente! ✅

### 7.2 Claude Code per Generare Issue Template

\`\`\`bash
claude "Analizza questo bug e genera issue template GitLab:
- Title ottimizzato per searchability
- Description con steps to reproduce
- Expected vs actual behavior
- Environment info (browser, OS, version)
- Severity label (critical/high/medium/low)
- Assignment suggerito basato su codeowner"
\`\`\`

### 7.3 Automated Issue Triage

\`\`\`yaml
# .gitlab-ci.yml
issue:triage:
  stage: validate
  rules:
    - if: '$CI_PIPELINE_SOURCE == "issue"'
  script:
    - claude triage-issue --id=$CI_ISSUE_ID --auto-label
\`\`\`

Claude Code analizza issue e aggiunge automaticamente:
- Labels (bug/feature/documentation)
- Milestone assignment
- Time estimate
- Related issues links

## Riepilogo: Il Tuo Setup Enterprise Day 1

Quando inizi un progetto enterprise, questa è la checklist:

### ✅ Setup Iniziale (2 ore)

1. **Crea repository GitLab/GitHub**
2. **Setup .gitlab-ci.yml o GitHub Actions** con template da questa milestone
3. **Configura branch protection** su main (require MR + CI pass)
4. **Setup secrets** per API keys
5. **Abilita auto-review** Claude Code su MR

### 📈 Ottimizzazione Continua (ogni sprint)

- Monitora CI/CD pipeline time (goal: <5 min)
- Review security audit report settimanale
- Aggiorna dependencies (automated con Dependabot/Renovate)
- Raffina auto-review checklist basandoti su pattern ricorrenti

### 🎯 Risultato

Un progetto dove:
- **Deploy automatici** 10+ volte/giorno
- **Zero security issues** in production
- **Code review** in <30 minuti (vs 4 ore)
- **CI/CD** costa -70% (ottimizzazioni cache)
- **Developer happiness** +200% (feedback immediato)

La differenza tra "progetto con Git" e "enterprise DevOps pipeline da €200K/anno"? **Questa milestone**.

Ora sei pronto per orchestrare workflow che fanno sembrare i team 10x più produttivi. Usalo saggiamente! 🏗️
  `,
  xp: 450,
  badge: "⚙️ DevOps Master",
  estimatedTime: "2 ore",
  topics: [
    "GitLab CI/CD Setup",
    "GitHub Actions Integration",
    "Branching Strategies (GitFlow vs Trunk-Based)",
    "Code Review Automation",
    "Pipeline Optimization",
    "Security & SAST",
    "Issue Tracking Integration"
  ],
  quiz: {
    questions: [
      {
        id: "m10-q1",
        question: "Qual è la principale differenza tra GitFlow e Trunk-Based Development?",
        options: [
          "GitFlow usa Git, Trunk-Based usa SVN",
          "GitFlow ha branch long-lived (settimane), Trunk-Based ha branch short-lived (max 1 giorno)",
          "GitFlow è più veloce di Trunk-Based",
          "Trunk-Based non supporta CI/CD"
        ],
        correctAnswer: 1,
        explanation: "Trunk-Based Development richiede branch che vivono massimo 1 giorno e merge frequenti (almeno 1/giorno) su main. GitFlow invece usa branch long-lived come develop, feature, release che possono durare settimane. Trunk-based è lo standard 2025 per continuous deployment."
      },
      {
        id: "m10-q2",
        question: "Quale ottimizzazione ha il maggior impatto sulla velocità di una pipeline CI/CD?",
        options: [
          "Usare immagini Docker più piccole",
          "Parallelizzare job indipendenti invece di eseguirli in sequenza",
          "Cambiare da GitLab a GitHub Actions",
          "Aumentare RAM del runner"
        ],
        correctAnswer: 1,
        explanation: "Parallelizzare job indipendenti (es: lint, test, build) può ridurre il tempo totale del 50-70%. Se lint (3 min), test (8 min) e build (4 min) girano in parallelo, il tempo totale è 8 min invece di 15 min sequenziali. È l'ottimizzazione con maggior ROI."
      },
      {
        id: "m10-q3",
        question: "Cos'è SAST e quando viene eseguito?",
        options: [
          "Static Application Security Testing, eseguito in produzione per monitorare attacchi",
          "Static Application Security Testing, eseguito durante CI/CD per trovare vulnerabilità nel codice",
          "Secure Authentication and Session Token, usato per login sicuro",
          "System Administrator Security Tool, per configurare firewall"
        ],
        correctAnswer: 1,
        explanation: "SAST (Static Application Security Testing) analizza il codice sorgente durante CI/CD per identificare vulnerabilità come SQL injection, XSS, hardcoded secrets. È 'shift-left security': trovare problemi prima del deploy invece che in produzione."
      },
      {
        id: "m10-q4",
        question: "Qual è il vantaggio principale dell'automated code review con AI rispetto a review manuale?",
        options: [
          "L'AI scrive codice migliore degli umani",
          "Feedback immediato (<1 min) invece di ore/giorni di attesa",
          "L'AI sostituisce completamente i developer senior",
          "Costa meno assumere developer junior"
        ],
        correctAnswer: 1,
        explanation: "Il vantaggio chiave è la velocità: AI review fornisce feedback in <1 minuto vs ore/giorni per review umana. Questo elimina context switching (developer non deve aspettare) e accelera il ciclo di sviluppo. L'AI non sostituisce review umane su decisioni architetturali, ma automatizza check meccanici."
      },
      {
        id: "m10-q5",
        question: "Quale keyword nel commit message chiude automaticamente una issue su GitLab/GitHub?",
        options: [
          "Fixes #123",
          "Closes #123",
          "Resolves #123",
          "Tutte le precedenti"
        ],
        correctAnswer: 3,
        explanation: "GitLab e GitHub riconoscono multiple keyword: Closes, Fixes, Resolves (e varianti come Close, Fix, Resolve). Quando il commit con keyword viene mergiato su branch default (main), la issue viene automaticamente chiusa. Esempio: 'fix: login bug\\n\\nCloses #123'"
      }
    ]
  },
  challenge: {
    title: "Setup Enterprise CI/CD da Zero",
    description: "Configura pipeline production-ready con security, automated review e deployment automation",
    instructions: [
      "Crea repository GitLab o GitHub per progetto Next.js/React",
      "Setup .gitlab-ci.yml o GitHub Actions workflow con: lint, typecheck, test, build, deploy",
      "Configura branch protection su main (require MR approval + CI pass)",
      "Implementa automated code review usando Claude Code (custom checklist con security focus)",
      "Aggiungi SAST scanning (Semgrep o simile) che blocca MR se trova critical issues",
      "Setup secrets management per API keys (GitLab CI/CD Variables o GitHub Secrets)",
      "Ottimizza pipeline per <5 minuti usando: parallel jobs, caching, conditional execution",
      "Configura auto-close issue da commit con keyword (Closes #N)",
      "Test completo: crea feature branch, push codice, verifica automated review, merge su main"
    ],
    verificationSteps: [
      "✅ Pipeline completa con tutte le stage (validate, test, build, deploy)",
      "✅ Parallelizzazione: lint + test girano in parallelo (<8 min totali)",
      "✅ Automated review attivo: ogni MR riceve commento AI con issues",
      "✅ SAST scanning funzionante: detecta almeno 1 vulnerability di test",
      "✅ Branch protection: impossibile push diretto su main",
      "✅ Secrets gestiti correttamente: zero hardcoded keys nel codice",
      "✅ Auto-close issue funzionante: commit con 'Closes #N' chiude issue",
      "✅ Deploy staging automatico su branch develop",
      "✅ Deploy production manuale su main"
    ]
  }
};
