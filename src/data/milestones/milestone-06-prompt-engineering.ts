import { Milestone } from '../../types';

export const milestone06: Milestone = {
  id: 7,
  title: "Prompt Engineering per Claude Code",
  subtitle: "Impara l'arte di scrivere prompt efficaci che generano codice di qualità e risposte precise",
  description: `
# Milestone 6: Prompt Engineering per Claude Code

Benvenuto nella milestone che trasformerà il modo in cui comunichi con Claude Code! 🎯

Hai imparato a **usare** Claude Code e a capire **come funziona** sotto il cofano. Ora è il momento di padroneggiare **l'arte del prompting** - la skill più importante per ottenere risultati eccellenti.

**Perché il Prompt Engineering è cruciale?**

La qualità della risposta di Claude Code è **direttamente proporzionale** alla qualità del tuo prompt. Un prompt ben scritto:
- Riduce iterazioni e tempo di sviluppo
- Produce codice che rispetta la tua architettura
- Previene bug e vulnerabilità di sicurezza
- Comunica chiaramente aspettative e vincoli

In questa milestone imparerai:
- L'anatomia di un prompt efficace (4 elementi fondamentali)
- Quando usare prompt conversazionali vs strutturati
- L'importanza della precisione (e dove applicarla)
- Come sfruttare il contesto implicito ed esplicito
- Tecniche di contextual chaining per task complessi
- Pattern di prompting per scenari comuni (feature, debug, refactor)

---

## Capitolo 1: L'Anatomia di un Prompt Efficace

Un prompt efficace non è solo "cosa vuoi fare" - è una comunicazione strutturata che contiene quattro elementi chiave.

### 1.1 I Quattro Elementi Fondamentali

Ogni prompt eccellente include:

**1. Clear Intent (Intento Chiaro)** 📍
Cosa stai cercando di ottenere? L'obiettivo primario.

**2. Specific Context (Contesto Specifico)** 🔍
Informazioni tecniche, di business, vincoli, aspettative di qualità.

**3. Desired Outcome (Risultato Desiderato)** 🎯
Criteri di successo espliciti - come fai a sapere che è "completo"?

**4. Quality Indicators (Indicatori di Qualità)** ✨
Definizione di "buono" - standard, best practices, performance.

### 1.1.1 Template Visivo

Ecco come appare un prompt perfetto con tutti e 4 gli elementi:

\`\`\`bash
claude "[INTENTO CHIARO] - Cosa vuoi ottenere

Context:
  - [Informazioni tecniche: framework, librerie, versioni]
  - [Pattern esistenti: file da seguire come esempio]
  - [Vincoli: cosa non deve fare, limitazioni]

Requirements:
  - [Requisito funzionale #1]
  - [Requisito funzionale #2]
  - [Requisito funzionale #3]

Success criteria:
  - [Criterio di successo #1 - misurabile]
  - [Criterio di successo #2 - verificabile]
  - [Criterio di successo #3 - testabile]

Quality expectations:
  - [Standard di codice: patterns, typing]
  - [Security: validazione, sanitizzazione]
  - [Testing: coverage, edge cases]
  - [Performance: metriche, limiti]"
\`\`\`

### 1.2 Esempio: Vago vs Efficace

**❌ Prompt Vago:**
\`\`\`bash prompt-bad
claude "Aggiungi autenticazione utente"
\`\`\`

**Cosa manca?**
- Quale tipo di autenticazione? (JWT, session, OAuth?)
- Dove va integrato?
- Quali sono i requisiti di sicurezza?
- Come definisci "completo"?

**✅ Prompt Efficace:**

\`\`\`bash prompt-good
claude "Aggiungi autenticazione JWT alla nostra API Express:

Context:
  - Stiamo usando Express 4.x con TypeScript
  - Modello utente esistente in @models/User.ts
  - Devi proteggere le route in @routes/api.ts

Requirements:
  - Token JWT con scadenza 24h
  - Endpoint di login (POST /auth/login)
  - Middleware per verificare i token (@middleware/auth.ts)
  - Hash delle password con bcrypt (minimo 10 rounds)

Success criteria:
  - Le route protette ritornano 401 se non c'è un token valido
  - Il login ritorna JWT con credenziali valide
  - I test passano sia per successo che per fallimento

Quality expectations:
  - Segui il nostro pattern di gestione errori (@utils/errors.ts)
  - Aggiungi tipi TypeScript per tutte le funzioni
  - Includi validazione input
  - Niente password nei log"
\`\`\`

**Differenza evidente:**
1. ✅ **Intent**: "JWT-based authentication"
2. ✅ **Context**: Express, TypeScript, existing models
3. ✅ **Outcome**: Login endpoint, middleware, tests
4. ✅ **Quality**: Error handling, types, validation, security

### 1.3 La Psicologia del Prompting

Quando costruisci un prompt, pensa in **quattro dimensioni**:

**📐 Technical Requirements (Il "Cosa" e il "Come")**
- Linguaggi, framework, librerie
- Pattern architetturali
- Integration points

**💼 Business Context (Il "Perché" e "Per Chi")**
- Obiettivo di business
- User story
- Vincoli di progetto

**⭐ Quality Expectations (Definizione di "Buono")**
- Performance requirements
- Security standards
- Code quality (testing, typing)

**🚧 Constraints (Limiti e Confini)**
- Cosa NON deve fare
- Compatibilità
- Budget (tempo, costi API)

---

## Capitolo 2: Prompt Conversazionali vs Strutturati

Non esiste un "formato giusto" per i prompt - dipende dal **contesto** e dalla **complessità**.

### 2.1 Prompt Conversazionali

**Quando usarli:**
- Esplorazione iniziale di un problema
- Brainstorming di soluzioni
- Debugging di issue non chiari
- Richieste semplici e dirette

**Caratteristiche:**
- Linguaggio naturale e fluente
- Tono colloquiale
- Singola richiesta ben espressa

**Esempio:**
\`\`\`bash
claude "Ho notato che la funzione getUserData in @api.ts è lenta quando
ci sono più di 1000 utenti. Puoi analizzare il problema e suggerire
ottimizzazioni? Usiamo Postgres 14."
\`\`\`

**Quando funziona bene:**
- Problema chiaro ma soluzione aperta
- Serve analisi prima di implementazione
- Il contesto è già nel progetto (file referenziati)

### 2.2 Prompt Strutturati

**Quando usarli:**
- Feature complesse con requisiti multipli
- Integrazioni che toccano più file
- Task con vincoli specifici
- Quando serve precisione assoluta

**Caratteristiche:**
- Organizzazione in sezioni (bullet points)
- Separazione chiara tra requisiti tecnici e di business
- Lista esplicita di criteri di successo

**Esempio:**
\`\`\`bash prompt-good
claude "Implementa modifica profilo utente

Business Context:
- Gli utenti devono poter aggiornare le loro informazioni
- Parte della pagina impostazioni account
- Deve prevenire email duplicate

Technical Requirements:
- Aggiungi endpoint PUT /api/users/:id/profile
- Aggiorna modello User per includere: bio, avatar_url, location
- Valida unicità email prima dell'update
- Usa middleware auth esistente (@middleware/auth.ts)

Integration Points:
- Form frontend in @components/ProfileForm.tsx
- Si connette alla tabella users di Supabase
- Deve invalidare la cache dopo l'update

Success Criteria:
- L'utente può aggiornare bio, avatar, location
- La validazione email previene duplicati
- Ritorna 409 Conflict se l'email esiste
- Richiede autenticazione (401 se non loggato)
- Le modifiche si riflettono immediatamente nella UI

Quality Standards:
- TypeScript strict mode
- Validazione Zod per l'input
- Unit test per l'endpoint
- Segui convenzioni RESTful"
\`\`\`

**Quando funziona bene:**
- Requisiti chiari e multipli
- Serve evitare ambiguità
- Multiple integration points
- Team collaboration (prompt come documentazione)

### 2.3 Come Scegliere?

**Flow Decision:**
\`\`\`
È una feature complessa (>3 requisiti)?
  ├─ SÌ → Usa Prompt Strutturato
  └─ NO → Prompt Conversazionale è sufficiente

Ci sono vincoli critici (security, performance)?
  ├─ SÌ → Usa Prompt Strutturato
  └─ NO → Prompt Conversazionale va bene

Stai esplorando un problema (analisi)?
  ├─ SÌ → Usa Prompt Conversazionale
  └─ NO → Valuta complessità

Il prompt sarà condiviso nel team?
  ├─ SÌ → Usa Prompt Strutturato (più chiaro)
  └─ NO → Scegli in base a preferenza
\`\`\`

---

## Capitolo 3: L'Importanza della Precisione

**Verità scomoda:** La maggior parte dei prompt fallisce per **mancanza di precisione**, non per complessità.

### 3.1 Perché la Precisione Conta

**Precisione ≠ Verbosità**

Un prompt preciso **non è** lungo - è **specifico** nei punti critici.

**Benefici della precisione:**
- ✅ Riduce iterazioni (meno back-and-forth)
- ✅ Codice si integra meglio con architettura esistente
- ✅ Previene security vulnerabilities (es. SQL injection)
- ✅ Risparmia tempo (e costi API)

**Costi della vaghezza:**
- ❌ Claude Code deve "indovinare" le aspettative
- ❌ Genera codice generico che richiede refactor
- ❌ Possibili bug nascosti per assunzioni sbagliate

### 3.2 Dove Essere Precisi

**🔴 Critical Precision (Sempre preciso):**

1. **Technical Requirements**
   - ❌ **Vago:** "Aggiungi supporto database"
   - ✅ **Preciso:** "Aggiungi supporto PostgreSQL usando libreria node-postgres (pg) v8.x"

2. **Business Logic**
   - ❌ **Vago:** "Calcola lo sconto"
   - ✅ **Preciso:** "Calcola sconto 10% se totale carrello > €100, 5% se > €50, altrimenti 0%"

3. **Integration Points**
   - ❌ **Vago:** "Connettiti all'API"
   - ✅ **Preciso:** "Connettiti all'API REST esistente (@services/api.ts) usando wrapper fetchWithAuth"

4. **Performance Requirements**
   - ❌ **Vago:** "Rendilo veloce"
   - ✅ **Preciso:** "Tempo di risposta < 200ms per query su tabelle fino a 100k righe"

**🟡 Medium Precision (Specificare se rilevante):**

- Code style (se diverso da default progetto)
- Naming conventions
- File structure

**🟢 Low Precision (Claude Code può inferire):**

- Formatting (indentation, spacing)
- Import organization
- Basic TypeScript types (se evidenti dal contesto)

### 3.3 Esempio Pratico: Escalation di Precisione

**Livello 1 - Troppo Vago:**
\`\`\`bash
claude "Aggiungi validazione al form"
\`\`\`
*Risultato*: Claude Code genera validazione generica, forse client-side, forse Yup/Joi, non sa cosa validare.

**Livello 2 - Meglio ma Incompleto:**
\`\`\`bash
claude "Aggiungi validazione Zod al form di registrazione"
\`\`\`
*Risultato*: Usa Zod ✅, ma non sa quali campi, quali regole, dove mostrare errori.

**Livello 3 - Preciso ✅:**
\`\`\`bash prompt-good
claude "Aggiungi validazione Zod al form di registrazione (@components/RegisterForm.tsx):

Campi da validare:
- email: formato email valido, obbligatorio
- password: min 8 caratteri, deve includere numero + maiuscola, obbligatorio
- confirmPassword: deve corrispondere a password, obbligatorio
- age: numero, min 18, max 120, obbligatorio

Timing validazione:
- Al submit (blocca se non valido)
- All'evento blur per ogni campo (mostra errore immediatamente)

Visualizzazione errori:
- Mostra errori a livello campo sotto ogni input
- Usa componente ErrorText esistente (@components/ErrorText.tsx)
- Pulisci errori quando l'utente inizia a digitare

Successo:
- Il form invia solo se tutti i campi sono validi
- Gli errori sono user-friendly ('Email non valida' e non 'Invalid email format')"
\`\`\`
*Risultato*: Implementazione completa, integrata, user-friendly ✨

---

## Capitolo 4: Context-Aware Prompting

Claude Code è **context-aware** - può inferire informazioni dal progetto. Ma devi sapere **quando aiutarlo** esplicitamente.

### 4.1 Contesto Implicito vs Esplicito

**Contesto Implicito** 🧠
Claude Code "apprende" automaticamente:
- Pattern di codice esistenti nel progetto
- Librerie installate (\`package.json\`)
- Struttura file e naming conventions
- TypeScript types definiti

**Quando funziona:**
\`\`\`bash
# Claude Code sa già che usi Express + TypeScript
claude "Aggiungi una nuova route per recuperare gli ordini utente"
\`\`\`

Se hai già routes in \`@routes/*.ts\` che seguono un pattern, Claude Code lo replicherà.

**Contesto Esplicito** 📍
Devi specificare quando:
- Il task è complesso e tocca più aree
- Serve deviare dal pattern esistente
- Ci sono vincoli non evidenti dal codice
- Integration con servizi esterni

**Esempio:**
\`\`\`bash
# Esplicito: indichi esattamente cosa e dove
claude "Aggiungi middleware di rate limiting:
- Usa libreria express-rate-limit
- Applica a tutte le route /api/*
- Limite: 100 richieste/15 minuti per IP
- Salva in Redis (connessione esistente @config/redis.ts)
- Ritorna 429 con messaggio errore JSON"
\`\`\`

### 4.2 Quando Referenziare File Esplicitamente

**Usa @references quando:**

1. **File non ovvi dal contesto**
   \`\`\`bash
   claude "Spiega il flusso di autenticazione" @middleware/auth.ts @services/jwt.ts
   \`\`\`

2. **Serve vedere implementazione attuale**
   \`\`\`bash
   claude "Refactorizza per usare async/await" @utils/database.ts
   \`\`\`

3. **Multi-file coordination**
   \`\`\`bash
   claude "Sincronizza queste due implementazioni" @client/api.ts @server/routes.ts
   \`\`\`

4. **Pattern da replicare**
   \`\`\`bash
   claude "Crea un validator simile per il modello Product" @validators/UserValidator.ts
   \`\`\`

**Non serve @reference quando:**
- File già menzionato in conversazione corrente
- Pattern generale del progetto (Claude Code inferisce)
- File generici (README, package.json)

---

## Capitolo 5: Building Contextual Chains

Per task complessi, **spezza il prompt in catene contestuali** invece di un mega-prompt monolitico.

### 5.1 Il Pattern Analysis → Implementation → Extension

**Perché funziona:**
- Permette a Claude Code di "ragionare" step-by-step
- Puoi correggere la direzione dopo ogni step
- Costruisce shared understanding progressivamente

**Struttura:**

**Step 1 - Analysis (Analisi)** 🔍
\`\`\`bash
claude "Analizza il pattern attuale di gestione errori in @utils/errors.ts
e @routes/*.ts. Come vengono gestiti gli errori attualmente?"
\`\`\`

*Attendi risposta. Claude Code spiega il pattern attuale.*

**Step 2 - Implementation (Implementazione)** 🔨
\`\`\`bash
claude "Ora aggiungi middleware centralizzato per gestione errori che:
- Cattura tutti gli errori dalle routes
- Logga con Winston (logger esistente @utils/logger.ts)
- Ritorna formato JSON consistente
- Usa lo stesso pattern che hai identificato"
\`\`\`

*Attendi implementazione. Verifichi che sia corretta.*

**Step 3 - Extension (Estensione)** 🚀
\`\`\`bash
claude "Ottimo! Ora aggiungi classi errore personalizzate per:
- ValidationError (400)
- NotFoundError (404)
- UnauthorizedError (401)
Salvale in @utils/errors.ts e aggiorna le routes per usarle"
\`\`\`

### 5.2 Esempio Completo: Feature Multi-Step

**Scenario**: Aggiungere sistema di notifiche email.

**❌ Approccio Monolitico (Sconsigliato):**
\`\`\`bash
claude "Aggiungi notifiche email per: registrazione utente, reset password,
conferma ordine. Usa SendGrid. Crea template. Aggiungi sistema code.
Gestisci fallimenti. Aggiungi retry logic. Logga tutto. Rendilo testabile."
\`\`\`

Troppo complesso. Claude Code potrebbe:
- Fare assunzioni sbagliate
- Generare implementazioni incomplete
- Mescolare concerns

**✅ Approccio Chain (Consigliato):**

**Chain Step 1 - Infrastructure:**
\`\`\`bash
claude "Imposta integrazione SendGrid:
- Aggiungi @sendgrid/mail a package.json
- Crea classe EmailService in @services/email.ts
- Carica API key da env (SENDGRID_API_KEY)
- Aggiungi metodo sendEmail(to, subject, html)
- Includi gestione errori base"
\`\`\`

**Chain Step 2 - Templates:**
\`\`\`bash
claude "Crea template email in @templates/emails/:
- welcome.html (per nuova registrazione utente)
- password-reset.html (con placeholder link reset)
- order-confirmation.html (con dettagli ordine)
Usa i nostri colori brand da @styles/theme.ts"
\`\`\`

**Chain Step 3 - Integration:**
\`\`\`bash
claude "Integra invio email:
- In @routes/auth.ts: invia email benvenuto dopo registrazione
- In @routes/password.ts: invia email reset con token
- In @routes/orders.ts: invia conferma dopo ordine completato
Usa EmailService esistente dallo step 1"
\`\`\`

**Chain Step 4 - Queue & Reliability:**
\`\`\`bash
claude "Aggiungi coda Bull per invio email asincrono:
- Crea coda email in @queues/email.ts
- Sposta chiamate sendEmail a queue.add()
- Aggiungi retry logic (3 tentativi, exponential backoff)
- Logga fallimenti in @logs/email-failures.log"
\`\`\`

**Vantaggi:**
- ✅ Ogni step è verificabile
- ✅ Puoi fermarti e testare
- ✅ Modifichi direzione se necessario
- ✅ Build shared understanding

---

## Capitolo 6: Pattern di Prompting per Scenari Comuni

Ecco pattern collaudati per scenari ricorrenti.

### 6.1 Pattern: Feature Request

**Quando usare:** Aggiungere nuova funzionalità.

**Template:**
\`\`\`
[BUSINESS CONTEXT]
Why this feature? Who benefits?

[TECHNICAL REQUIREMENTS]
What to build? Technologies?

[INTEGRATION POINTS]
Where does it fit? Existing files?

[SUCCESS CRITERIA]
How do you know it's done?

[QUALITY EXPECTATIONS]
Tests? Performance? Security?
\`\`\`

**Esempio Reale:**
\`\`\`bash prompt-good
claude "Aggiungi funzionalità ricerca prodotti

Business Context:
- Gli utenti devono trovare prodotti velocemente
- Ricerca per nome, categoria, tags
- Parte della navigazione principale

Technical Requirements:
- Aggiungi endpoint GET /api/products/search
- Accetta query params: q (termine ricerca), category, tags[]
- Usa ricerca full-text PostgreSQL (setup esistente)
- Ritorna max 50 risultati, ordinati per rilevanza

Integration Points:
- Aggiungi route in @routes/products.ts
- Usa modello Product esistente (@models/Product.ts)
- Connetti al componente SearchBar (@components/SearchBar.tsx)

Success Criteria:
- La ricerca ritorna risultati rilevanti in < 500ms
- Gestisce errori di battitura (fuzzy matching)
- Query vuota ritorna 400 Bad Request
- I risultati includono: id, name, category, price, image_url

Quality Expectations:
- Aggiungi test per accuratezza ricerca
- Sanitizza input (previeni SQL injection)
- Cache per ricerche frequenti (Redis)
- Logga query lente (> 1s) per monitoraggio"
\`\`\`

### 6.2 Pattern: Debugging

**Quando usare:** Fixare bug o issue.

**Template:**
\`\`\`
[SYMPTOM]
What's broken? Error message?

[EXPECTED BEHAVIOR]
What should happen?

[CONTEXT]
When does it occur? Environment?

[WHAT YOU TRIED]
Steps already attempted?

[RELEVANT FILES]
@files that might be involved
\`\`\`

**Esempio Reale:**
\`\`\`bash
claude "Debug memory leak nel server API

Symptom:
- L'uso di memoria cresce da 200MB → 2GB in 6 ore
- Alla fine crasha con 'Out of Memory'
- Succede solo in produzione, non in dev

Expected Behavior:
- La memoria dovrebbe stabilizzarsi attorno a 300-400MB

Context:
- Si verifica sotto carico alto (>1000 richieste/min)
- Iniziato dopo il deploy v2.3.0 (aggiunto caching)
- Production usa Node 18.x, PM2 cluster mode

What I Tried:
- Controllato event listener leaks (nessuno trovato)
- Rivisto modifiche recenti (logica caching sospetta)
- Heap snapshot mostra oggetto Map() che cresce

Relevant Files:
@services/cache.ts @middleware/response-cache.ts @routes/api.ts

Per favore:
1. Analizza implementazione cache per leaks
2. Suggerisci fix con cleanup appropriato
3. Aggiungi monitoraggio memoria"
\`\`\`

### 6.3 Pattern: Refactoring

**Quando usare:** Migliorare codice esistente.

**Template:**
\`\`\`
[CURRENT STATE]
What needs refactoring? Why?

[DESIRED STATE]
What should it become?

[CONSTRAINTS]
What must NOT change? (API, behavior)

[SCOPE]
Which files/functions?
\`\`\`

**Esempio Reale:**
\`\`\`bash
claude "Refactorizza logica di autenticazione

Current State:
- Codice auth sparso in più file route
- Logica validazione JWT duplicata
- Difficile da testare, difficile da mantenere
- Vedi @routes/users.ts @routes/orders.ts @routes/admin.ts

Desired State:
- Auth centralizzata in @middleware/auth.ts
- Singola funzione JWT verify
- Middleware riutilizzabile per route protette
- Facile aggiungere role-based access control dopo

Constraints:
- NON DEVE cambiare endpoint API o formato risposta
- DEVE mantenere backward compatibility
- I test esistenti devono ancora passare

Scope:
- Estrai logica auth da tutti i file route
- Crea middleware authenticate
- Crea middleware requireRole (per uso futuro)
- Aggiorna routes per usare nuovo middleware

Quality:
- Aggiungi unit test per middleware
- Documenta utilizzo nei commenti codice
- Segui pattern gestione errori esistente"
\`\`\`

---

## Riepilogo

Congratulazioni! 🎉 Ora padroneggi l'arte del Prompt Engineering per Claude Code.

**Hai imparato:**

✅ **I 4 elementi di un prompt efficace**: Intent, Context, Outcome, Quality
✅ **Conversazionale vs Strutturato**: Quando usare ogni stile
✅ **L'importanza della precisione**: Dove essere precisi e perché
✅ **Context-aware prompting**: Sfruttare contesto implicito ed esplicito
✅ **Contextual chaining**: Spezzare task complessi in step sequenziali
✅ **Pattern collaudati**: Feature Request, Debugging, Refactoring

**Perché è importante:**

1. **Risparmi tempo** - prompt precisi = meno iterazioni
2. **Codice migliore** - requisiti chiari = implementazioni accurate
3. **Meno bug** - specifichi vincoli = previeni vulnerabilità
4. **Collaborazione** - prompt strutturati = documentazione condivisibile
5. **Scalabilità** - pattern ripetibili = team allineato

**Prossimi Passi:**

Applica questi pattern nelle prossime milestones:
- **Milestone 7**: MCP Integration (prompt per configurazioni complesse)
- **Milestone 8**: Hooks & Skills (prompt per agent personalizzati)
- **Milestone 9**: SDKs & Automation (prompt programmatici via API)

Il prompt engineering non è solo una skill - è il **linguaggio** con cui comunichi le tue intenzioni a Claude Code. Più preciso sei, più potente diventa il tool! 🚀
  `,
  xp: 200,
  badge: "🎯 Prompt Master",
  estimatedTime: "1 ora",
  topics: [
    "Anatomia prompt efficaci",
    "Prompt conversazionali",
    "Prompt strutturati",
    "Precisione e contesto",
    "Contextual chaining",
    "Pattern per feature request",
    "Pattern per debugging",
    "Pattern per refactoring",
    "Context-aware prompting"
  ],
  quiz: {
    questions: [
      {
        id: "m6-q1",
        question: "Quali sono i 4 elementi fondamentali di un prompt efficace?",
        options: [
          "Titolo, Descrizione, Codice, Test",
          "Clear Intent, Specific Context, Desired Outcome, Quality Indicators",
          "Problema, Soluzione, Implementazione, Verifica",
          "What, Why, When, Where"
        ],
        correctAnswer: 1,
        explanation: "Un prompt efficace include sempre: 1) **Clear Intent** (cosa vuoi ottenere), 2) **Specific Context** (informazioni tecniche e vincoli), 3) **Desired Outcome** (criteri di successo espliciti), 4) **Quality Indicators** (definizione di 'buono')."
      },
      {
        id: "m6-q2",
        question: "Quando è meglio usare un prompt CONVERSAZIONALE invece di uno STRUTTURATO?",
        options: [
          "Sempre, perché è più naturale da scrivere",
          "Per esplorazione iniziale, brainstorming, o richieste semplici",
          "Mai, i prompt strutturati sono sempre migliori",
          "Solo quando hai fretta"
        ],
        correctAnswer: 1,
        explanation: "I prompt **conversazionali** funzionano meglio per: esplorazione di problemi, brainstorming, debugging non chiaro, richieste semplici. I prompt **strutturati** servono per feature complesse, requisiti multipli, e quando serve precisione assoluta."
      },
      {
        id: "m6-q3",
        question: "Dove è CRITICO essere precisi in un prompt?",
        options: [
          "Formattazione del codice e indentazione",
          "Organizzazione degli import",
          "Technical requirements, business logic, integration points, performance",
          "Nomi delle variabili"
        ],
        correctAnswer: 2,
        explanation: "La precisione è **critica** per: 1) Technical requirements (quale libreria, versione), 2) Business logic (regole specifiche), 3) Integration points (dove si collega), 4) Performance requirements (metriche misurabili). Formatting e naming Claude Code può inferirli dal progetto."
      },
      {
        id: "m6-q4",
        question: "Cos'è il 'contextual chaining' e perché è utile?",
        options: [
          "Concatenare più comandi shell in un unico comando",
          "Spezzare task complessi in step sequenziali (Analysis → Implementation → Extension)",
          "Collegare file con import in TypeScript",
          "Usare context providers in React"
        ],
        correctAnswer: 1,
        explanation: "**Contextual chaining** è la tecnica di spezzare task complessi in step sequenziali (es. Analysis → Implementation → Extension). Funziona perché: permette a Claude Code di 'ragionare' step-by-step, puoi correggere dopo ogni step, costruisce shared understanding progressivamente."
      },
      {
        id: "m6-q5",
        question: "Quale di questi prompt segue MEGLIO il pattern 'Feature Request'?",
        options: [
          "claude 'Add search functionality'",
          "claude 'Make the search faster'",
          "claude 'Add product search: GET /api/products/search, accept query q, use PostgreSQL full-text, return max 50 results, integrate with @components/SearchBar.tsx'",
          "claude 'Search is broken, fix it'"
        ],
        correctAnswer: 2,
        explanation: "Il pattern **Feature Request** richiede: Business Context (perché), Technical Requirements (cosa), Integration Points (dove), Success Criteria (quando è fatto), Quality Expectations (come bene). L'opzione 3 include endpoint specifico, parametri, tecnologia, limiti, e integration - tutti elementi chiave."
      }
    ]
  },
  challenge: {
    title: "Scrivere Prompt Efficaci in Pratica",
    description: "Applica le tecniche di prompt engineering per risolvere scenari reali e confronta prompt vaghi vs efficaci",
    instructions: [
      "Crea una directory di test: 'mkdir ~/prompt-engineering-test && cd ~/prompt-engineering-test'",
      "Scenario 1 - Prompt Vago: Esegui 'claude \"Add validation to the form\"' (senza creare file) e osserva come Claude Code chiede chiarimenti",
      "Scenario 2 - Prompt Efficace: Ora esegui un prompt strutturato completo con i 4 elementi (Intent, Context, Outcome, Quality) per la stessa feature di validazione form",
      "Scenario 3 - Contextual Chain: Crea un file 'api.js' con una funzione semplice, poi usa una catena di 3 prompt: 1) 'Analyze error handling in @api.js', 2) 'Add try-catch with proper error handling', 3) 'Add logging for errors'",
      "Scenario 4 - Pattern Debugging: Crea un file con un bug intenzionale (es. divisione per zero), poi scrivi un prompt seguendo il pattern Debugging (Symptom, Expected, Context, Tried, Files)",
      "Confronta la qualità delle risposte tra prompt vaghi ed efficaci",
      "Documenta (in un file notes.md) le differenze che hai notato: numero di iterazioni, precisione della risposta, qualità del codice generato"
    ],
    verificationSteps: [
      "✅ Hai sperimentato la differenza tra prompt vago ('Add validation') e prompt efficace (con 4 elementi)",
      "✅ Hai usato contextual chaining (3 step sequenziali) per un task complesso",
      "✅ Hai applicato il pattern Debugging con Symptom, Expected Behavior, Context, What You Tried, Files",
      "✅ Hai documentato le differenze in qualità e precisione",
      "✅ Comprendi quando usare prompt conversazionali vs strutturati",
      "✅ Sai identificare dove essere precisi (technical requirements, business logic, integration points)"
    ]
  }
};
