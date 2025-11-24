import { Milestone } from '../../types';

export const milestone07: Milestone = {
  id: 8,
  title: "Tecniche Avanzate di Prompting",
  subtitle: "Padroneggia precisione, pattern, meta-prompting, Plan Mode, Thinking Mode e best practices specifiche per Claude 4.x (Sonnet 4.5 & Haiku 4.5)",
  description: `
# Milestone 7: Tecniche Avanzate di Prompting

Benvenuto nel livello avanzato del prompt engineering! 🚀

Hai imparato l'anatomia di un prompt efficace nella Milestone 6. Ora è il momento di affinare le tue competenze con tecniche che separano i **principianti** dai **maestri** del prompting.

**Cosa imparerai in questa milestone:**

Questa milestone si basa sui fondamentali della Milestone 6 e introduce:
- **Precisione strategica** - Dove essere specifici e dove Claude Code può inferire
- **Context-aware prompting** - Sfruttare contesto implicito del progetto e catene contestuali
- **Pattern collaudati** - Feature Request, Debugging, Refactoring, Learning
- **Pitfall comuni** - Ambiguità, information overload, vincoli mancanti
- **Meta-prompting** - Far ragionare Claude Code sul problema prima di risolverlo
- **Plan Mode** - Modalità architetto per visione d'insieme e pianificazione multi-file
- **Thinking Mode** - Modalità ragionamento profondo per problemi complessi
- **Best Practices Claude 4.x** - Tecniche specifiche per Claude Sonnet 4.5 e Haiku 4.5

Al termine di questa milestone sarai in grado di:
- ✅ Scrivere prompt precisi che riducono iterazioni del 70%
- ✅ Costruire catene contestuali per task complessi multi-step
- ✅ Evitare i 4 pitfall più comuni che rovinano i prompt
- ✅ Applicare meta-prompting per decisioni architetturali
- ✅ Riconoscere quale pattern usare per ogni scenario
- ✅ Attivare Plan Mode per refactoring e architetture complesse
- ✅ Usare Thinking Mode per debugging avanzato e ottimizzazioni
- ✅ Sfruttare le capacità specifiche di Claude 4.x (context awareness, extended thinking, orchestrazione subagenti)

---

## Capitolo 1: L'Importanza della Precisione

**Verità fondamentale:** La precisione **non è verbosità** - è **specificità nei punti critici**.

### 1.1 Perché la Precisione Conta

**Scenario comune:**

Prompt vago:
- "Aggiungi validazione al database"

**Cosa succede:**
- ❌ Claude Code deve **indovinare** quale database (SQL? NoSQL?)
- ❌ Quale tipo di validazione (schema? business rules?)
- ❌ Dove applicarla (model layer? API layer?)
- ❌ Genera codice generico che richiede refactoring

**Benefici della precisione:**
- ✅ Riduce iterazioni (meno "non è quello che volevo")
- ✅ Il codice si integra con l'architettura esistente
- ✅ Previene security vulnerabilities
- ✅ Risparmia tempo (e costi API)

**La regola d'oro:**

> Sii preciso dove conta. Claude Code può inferire il resto dal contesto del progetto.

### 1.2 Dove Essere Precisi (Critical Precision)

**🔴 Sempre preciso per:**

**1. Technical Requirements**

- ❌ Vago: "Aggiungi supporto database"
- ✅ Preciso: "Aggiungi supporto PostgreSQL 14 usando libreria node-postgres (pg) v8.x"

**2. Business Logic**

- ❌ Vago: "Calcola lo sconto per gli utenti premium"
- ✅ Preciso: "Applica sconto 15% se utente ha tier='premium' E ha speso >€500 negli ultimi 3 mesi, altrimenti 0%"

**3. Integration Points**

- ❌ Vago: "Connettiti all'API esterna"
- ✅ Preciso: "Usa wrapper fetchWithAuth (@services/api.ts) per chiamare endpoint POST /v2/payments con headers Authorization e Content-Type JSON"

**4. Performance Requirements**

- ❌ Vago: "Rendilo più veloce"
- ✅ Preciso: "Tempo di risposta <200ms per query su tabelle fino a 100k righe, usa index su columns user_id e created_at"

### 1.3 Dove Claude Code Può Inferire (Low Precision)

**🟢 Non serve specificare:**

- Formattazione codice (indentazione, spaziatura)
- Organizzazione import (Claude Code segue pattern esistenti)
- Tipi TypeScript base (se evidenti dal contesto)
- Convenzioni naming (se consistenti nel progetto)

**Esempio pratico:**

\`\`\`bash prompt-good
claude "Aggiungi endpoint GET /api/orders/:id in @routes/orders.ts
- Usa modello Order esistente (@models/Order.ts)
- Ritorna 404 se ordine non trovato
- Includi dati utente associato (join con tabella users)
- Tempo di risposta <300ms"
\`\`\`

**Cosa non hai specificato ma Claude Code inferisce:**
- ✅ Express router pattern (dal file routes esistente)
- ✅ Error handling pattern (da altri endpoint)
- ✅ Response format JSON (standard API)
- ✅ TypeScript typing (strict mode progetto)

### 1.4 Escalation di Precisione

Quando un prompt è troppo vago, **incrementa la precisione progressivamente**.

**Livello 1 - Troppo Vago:**

\`\`\`bash prompt-bad
claude "Aggiungi autenticazione"
\`\`\`

**Livello 2 - Meglio ma Incompleto:**

\`\`\`bash
claude "Aggiungi autenticazione JWT all'API Express"
\`\`\`

**Livello 3 - Preciso ✅:**

\`\`\`bash prompt-good
claude "Implementa autenticazione JWT per API Express:

Technical Stack:
- jsonwebtoken v9.x per generare e verificare token
- bcrypt v5.x per hash password (10 rounds)
- Express middleware (@middleware/auth.ts)

Requirements:
- POST /auth/login: ritorna JWT con scadenza 24h
- Middleware verifyToken: valida JWT e attacca user a req.user
- Proteggi tutte le route /api/protected/* con middleware

Security:
- JWT secret da env (JWT_SECRET)
- Password non devono essere loggati mai
- Rate limit: max 5 login tentativi/15min per IP

Success Criteria:
- Route protette ritornano 401 se token mancante/invalido
- Login funziona con credenziali valide
- Token contiene: user_id, email, role"
\`\`\`

**Risultato:** Implementazione completa, sicura, production-ready ✨

---

## Capitolo 2: Context-Aware Prompting

Claude Code è **context-aware** - legge il tuo progetto e apprende pattern. Ma devi sapere **quando aiutarlo esplicitamente**.

### 2.1 Contesto Implicito vs Esplicito

**Contesto Implicito 🧠**

Claude Code inferisce automaticamente:
- Pattern di codice nel progetto
- Librerie installate (\`package.json\`, \`requirements.txt\`)
- Struttura file e naming conventions
- TypeScript types e interfaces definite

**Quando funziona:**

\`\`\`bash
# Claude Code sa già che usi React + TypeScript
claude "Crea componente Card per mostrare dati prodotto"
\`\`\`

Se hai già componenti in \`@components/*.tsx\` che seguono un pattern (props tipizzate, functional components), Claude Code lo replicherà.

**Contesto Esplicito 📍**

Specifica esplicitamente quando:
- Il task tocca più aree del progetto
- Serve deviare dal pattern standard
- Ci sono vincoli non evidenti dal codice
- Integration con servizi esterni (API, database)

**Esempio:**

\`\`\`bash prompt-good
claude "Crea sistema di notifiche real-time:

Context:
- Backend: Express con Socket.io già configurato (@config/socket.ts)
- Frontend: React con hook useSocket custom (@hooks/useSocket.ts)
- Database: PostgreSQL con tabella notifications già esistente

Integration:
- Server: emetti evento 'notification' quando creata in DB
- Client: usa useSocket per ascoltare e mostrare toast
- Toast component: usa Toastify esistente (@components/Toast.tsx)

Notifications types:
- 'order_confirmed': verde, 5s timeout
- 'payment_failed': rosso, permanente fino a close
- 'message_received': blu, 10s timeout"
\`\`\`

### 2.2 Leveraging Project Context

**Strategia: Reference espliciti con @notation**

**Usa @file quando:**

1. **File non ovvio dal contesto**
   \`\`\`bash
   claude "Spiega flusso autenticazione" @middleware/auth.ts @services/jwt.ts
   \`\`\`

2. **Serve vedere implementazione corrente**
   \`\`\`bash
   claude "Refactorizza per usare async/await" @utils/database.ts
   \`\`\`

3. **Multi-file coordination**
   \`\`\`bash
   claude "Sincronizza API client e server" @client/api.ts @server/routes.ts
   \`\`\`

4. **Pattern da replicare**
   \`\`\`bash
   claude "Crea validator simile per Product" @validators/UserValidator.ts
   \`\`\`

**Non serve @reference quando:**
- File già menzionato nella conversazione corrente
- Pattern generale (Claude Code lo inferisce da altri file)
- File standard (README, package.json, .env.example)

### 2.3 Building Contextual Chains

Per task complessi, **spezza in catene contestuali** invece di un mega-prompt monolitico.

**Pattern: Analysis → Implementation → Extension**

**Perché funziona:**
- ✅ Claude Code ragiona step-by-step
- ✅ Puoi correggere direzione dopo ogni step
- ✅ Costruisce shared understanding progressivamente
- ✅ Ogni step è verificabile e testabile

**Esempio: Sistema di notifiche email**

**Step 1 - Analysis:**

\`\`\`bash
claude "Analizza pattern attuale di invio email in @services/email.ts
Quali librerie usiamo? Come gestiamo fallimenti?"
\`\`\`

*Attendi risposta. Claude Code analizza il pattern.*

**Step 2 - Implementation:**

\`\`\`bash
claude "Aggiungi coda Bull per invio email asincrono:
- Crea coda in @queues/email.ts
- Sposta chiamate sendEmail a queue.add()
- Configura worker per processare coda
- Salva job ID per tracking"
\`\`\`

*Attendi implementazione. Verifichi che funzioni.*

**Step 3 - Extension:**

\`\`\`bash
claude "Aggiungi reliability features:
- Retry logic (max 3 tentativi, exponential backoff)
- Dead letter queue per fallimenti permanenti
- Logging dettagliato in @logs/email.log
- Dashboard monitoring (endpoint GET /api/queues/email/status)"
\`\`\`

**Vantaggi vs Mega-Prompt:**
- ✅ Testing incrementale
- ✅ Rollback facile se uno step fallisce
- ✅ Comprensione condivisa (tu e Claude Code)
- ✅ Documentazione naturale (chat diventa spec)

### 2.4 Environmental Context

**Different environments = different solutions**

**Sviluppo vs Produzione:**

\`\`\`bash prompt-good
claude "Configura caching Redis:

Development:
- Usa Redis locale (localhost:6379)
- Cache timeout: 10 secondi (per testing rapido)
- Logging verboso di hit/miss
- Flush cache a ogni restart

Production:
- Usa Redis cluster (REDIS_URL da env)
- Cache timeout: 1 ora
- Logging solo errori
- Monitoring con Redis insights
- Connection pooling (min 5, max 20)

Entrambi:
- Chiavi formato: 'app:v1:{resource}:{id}'
- Serializzazione JSON per oggetti complessi
- Graceful degradation se Redis non disponibile"
\`\`\`

### 2.5 Team and Organizational Context

**Coding standards e architectural decisions sono contesto cruciale.**

**Esempio - Standards team:**

\`\`\`bash prompt-good
claude "Aggiungi nuova API route GET /api/analytics/revenue

Team Standards:
- Seguiamo RESTful conventions rigide
- Usiamo Zod per validazione input (schema in @schemas/)
- Error responses formato RFC 7807 (Problem Details)
- Tutti gli endpoint hanno OpenAPI documentation
- Rate limiting per default (100 req/min per user)

Architectural Context:
- Analytics data vive in ClickHouse, non PostgreSQL
- Usa client esistente @db/clickhouse.ts
- Query complesse vanno in @queries/analytics.ts
- Caching obbligatorio per query >500ms (usa Redis)

Security:
- Route richiede role='admin' o role='analyst'
- Audit log ogni chiamata (@services/audit.ts)
- Sanitizza date range input (max 1 anno)"
\`\`\`

---

## Capitolo 3: Pattern di Prompting Specifici

Pattern collaudati per scenari ricorrenti.

### 3.1 Feature Request Pattern

**Quando usare:** Aggiungere nuova funzionalità.

**Template:**

\`\`\`
[CONTESTO BUSINESS]
Perché questa feature? Chi ne beneficia? User story?

[REQUISITI TECNICI]
Cosa costruire? Stack tecnologico? Modelli dati?

[PUNTI DI INTEGRAZIONE]
Dove si inserisce? File esistenti da modificare?

[CRITERI DI SUCCESSO]
Come sai che è completato? Test di accettazione?

[ASPETTATIVE DI QUALITÀ]
Performance? Sicurezza? Testing? Monitoring?
\`\`\`

**Esempio reale:**

\`\`\`bash prompt-good
claude "Implementa funzionalità 'Salva per dopo' per prodotti

Business Context:
- Gli utenti possono salvare prodotti da comprare in futuro
- Alternativa al carrello (non è acquisto immediato)
- Aumenta retention e conversione
- Target: utenti registrati, massimo 50 prodotti salvati

Technical Requirements:
- Aggiungi tabella 'saved_products' (user_id, product_id, saved_at)
- Endpoint POST /api/users/me/saved/:productId
- Endpoint DELETE /api/users/me/saved/:productId
- Endpoint GET /api/users/me/saved (ritorna lista con dati prodotto)

Integration Points:
- Component ProductCard: aggiungi bottone heart icon
- Hook useSavedProducts per gestire stato client (@hooks/)
- Usa auth middleware esistente (@middleware/auth.ts)
- Notifica utente con toast (@components/Toast.tsx)

Success Criteria:
- L'utente può salvare/rimuovere prodotti con un click
- Lista salvati persiste tra sessioni
- Limite 50 prodotti enforcement (ritorna 400 se superato)
- Prodotti eliminati vengono rimossi da salvati automaticamente
- Tempo di risposta <100ms per operazioni singole

Quality Expectations:
- Unique constraint su (user_id, product_id) per prevenire duplicati
- Soft delete su prodotti (flag deleted_at) invece di cascade
- Index su user_id per query veloci
- Test unitari per limiti e edge cases
- Analytics tracking: 'product_saved' e 'product_unsaved' events"
\`\`\`

### 3.2 Debugging Pattern

**Quando usare:** Risolvere bug o problemi di performance.

**Template:**

\`\`\`
[SINTOMO]
Cosa è rotto? Messaggi di errore? Quando?

[COMPORTAMENTO ATTESO]
Cosa dovrebbe succedere invece?

[CONTESTO]
Ambiente? Condizioni di carico? Modifiche recenti?

[COSA HAI PROVATO]
Step già tentati? Ipotesi?

[FILE RILEVANTI]
@files potenzialmente coinvolti
\`\`\`

**Esempio reale:**

\`\`\`bash
claude "Debug timeout intermittente su checkout

Symptom:
- Checkout fallisce con '504 Gateway Timeout'
- Succede ~20% delle volte, in modo random
- Errore dopo esattamente 30 secondi
- Logs mostrano: 'Payment gateway connection timeout'

Expected Behavior:
- Checkout dovrebbe completare in <5 secondi
- Fallimenti dovrebbero ritornare 500 con messaggio chiaro
- Payment gateway risponde tipicamente in 2-3 secondi

Context:
- Iniziato dopo deploy v3.2.0 (aggiunto inventory check)
- Succede solo in produzione (staging OK)
- Traffic normale ~500 checkout/ora
- Spike a 2000/ora quando succede timeout
- Payment gateway: Stripe (timeout config 30s)

What I Tried:
- Verificato Stripe status page (tutto verde)
- Aumentato timeout Nginx a 60s (no differenza)
- Controllato DB connection pool (utilization 40%)
- Heap dump durante timeout (nessun memory leak)
- Sospetto: inventory check chiama API terza parte lenta

Relevant Files:
@routes/checkout.ts @services/payment.ts @services/inventory.ts

Please:
1. Analizza chiamate sequenziali in checkout flow
2. Identifica bottleneck (probabilmente inventory API)
3. Suggerisci fix (timeout più basso? retry? cache?)
4. Aggiungi monitoring per future issues"
\`\`\`

### 3.3 Refactoring Pattern

**Quando usare:** Migliorare codice esistente senza cambiare behavior.

**Template:**

\`\`\`
[STATO ATTUALE]
Qual è il problema? Perché refactorare?

[STATO DESIDERATO]
Cosa dovrebbe diventare? Benefici?

[VINCOLI]
Cosa NON deve cambiare? (API, comportamento, test)

[SCOPE]
Quali file/funzioni? Quanto in profondità?
\`\`\`

**Esempio reale:**

\`\`\`bash prompt-good
claude "Refactorizza error handling per consistency

Current State:
- Error handling inconsistente tra routes
- Alcuni file usano try-catch, altri callbacks
- Formato errore JSON varia (a volte {error}, a volte {message})
- Difficile debuggare (stack trace mancante in prod)
- Vedi @routes/users.ts @routes/orders.ts @routes/payments.ts

Desired State:
- Middleware centralizzato error handler
- Formato errore consistente RFC 7807:
  {
    "type": "ValidationError",
    "title": "Invalid input",
    "status": 400,
    "detail": "Email format is invalid",
    "instance": "/api/users"
  }
- Logging strutturato (Winston) con correlation ID
- Stack trace solo in development
- Classi error custom (ValidationError, NotFoundError, etc.)

Constraints:
- NON cambiare status code delle responses
- NON modificare public API contracts
- Tutti i test esistenti devono passare
- Deploy graduale (usa feature flag ERROR_HANDLING_V2)

Scope:
- Crea @middleware/errorHandler.ts
- Crea @errors/index.ts con classi custom
- Refactorizza tutte le routes in @routes/
- Aggiorna @utils/logger.ts per structured logging
- Mantieni backward compatibility per 2 settimane

Quality:
- Unit test per ogni classe error
- Integration test per error responses
- Documenta migration guide per il team
- Performance: overhead <5ms per request"
\`\`\`

### 3.4 Learning Pattern

**Quando usare:** Capire codice esistente o concetti complessi.

**Template:**

\`\`\`
[COSA IMPARARE]
Quale concetto? Quali file?

[COMPRENSIONE ATTUALE]
Cosa sai già?

[DOMANDE SPECIFICHE]
Cosa non è chiaro? Casi limite?

[OBIETTIVO DI APPRENDIMENTO]
Perché devi capire questo?
\`\`\`

**Esempio reale:**

\`\`\`bash
claude "Spiega il sistema di permissions del progetto

What to Learn:
- Come funziona role-based access control (RBAC)
- Dove sono definiti roles e permissions
- Come vengono verificati nelle API routes
- Chi può modificare permissions

Current Understanding:
- So che usiamo middleware auth per verificare JWT
- Vedo references a 'role' in User model
- Non capisco come sono mappati roles → permissions
- Non so se permissions sono hardcoded o configurabili

Specific Questions:
1. Quali roles esistono? (admin, user, guest?)
2. Come verifico se user può 'delete_order'?
3. Possiamo cambiare permissions runtime o sono statiche?
4. C'è inheritance tra roles? (admin ha tutti i permessi di user?)
5. Come testiamo scenarios di permission denied?

Learning Goal:
Devo implementare nuova feature 'analytics dashboard'
che richiede role 'analyst' con permissions specifiche.
Voglio seguire pattern esistente del progetto.

Files:
@middleware/auth.ts @models/User.ts @config/permissions.ts"
\`\`\`

---

## Capitolo 4: Common Pitfalls e Come Evitarli

Anche sviluppatori esperti cadono in queste trappole.

### 4.1 Pitfall: Ambiguous Requirements

**Problema:** Requisiti ambigui forzano Claude Code a fare assunzioni che potrebbero non allinearsi alle tue esigenze.

**Perché succede:**
- ❌ Assumi che Claude Code conosca il tuo contesto business
- ❌ Usi termini relativi senza baseline ("più veloce", "migliore")
- ❌ Mischi richieste multiple senza priorità chiara

**Esempio problema:**

\`\`\`bash prompt-bad
claude "Migliora le performance del dashboard"
\`\`\`

**Cosa è ambiguo:**
- Quale dashboard? (admin? user? analytics?)
- Quali metriche? (load time? query speed? rendering?)
- Quanto miglioramento? (10%? 50%? 2x?)
- Ci sono vincoli? (budget? compatibilità?)

**Fix:**

\`\`\`bash prompt-good
claude "Ottimizza dashboard analytics per caricamento <2s

Current State:
- Dashboard admin (/admin/analytics) carica in 8-12 secondi
- Esegue 15 query SQL sequenziali
- Fetcha dati ultimi 30 giorni a ogni load
- Nessun caching attivo

Target Performance:
- First Contentful Paint <500ms
- Full dashboard interactive <2s
- Query database aggregate <1s total

Constraints:
- Dati devono essere real-time (max 5 min staleness)
- Non possiamo cambiare schema database
- Budget: Redis cache OK, CDN no

Optimization Ideas:
- Parallel queries invece di sequential
- Cache queries aggregati in Redis (5 min TTL)
- Lazy load charts sotto la fold
- Prefetch dati al login admin

Measure:
- Lighthouse Performance score >85
- Server response time <200ms
- Usa @utils/performance.ts per timing logs"
\`\`\`

### 4.2 Pitfall: Information Overload

**Problema:** Troppa informazione oscura la richiesta principale e confonde le priorità.

**Perché succede:**
- ❌ Cerchi di risolvere tutto in un prompt
- ❌ Includi nice-to-have insieme a must-have
- ❌ Stream-of-consciousness senza struttura

**Esempio problema:**

\`\`\`bash prompt-bad
claude "Aggiungi user registration con email validation e password strength meter e 2FA opzionale e social login Google/GitHub e avatar upload con resize e email confirmation con magic link e remember me checkbox e CAPTCHA per bot prevention e password reset flow e account deletion e GDPR compliance export e dark mode toggle e notification preferences e..."
\`\`\`

**Cosa è sovraccarico:**
- 15+ features mescolate insieme
- Nessuna priorità (cosa serve subito vs futuro?)
- Claude Code non sa da dove iniziare
- Rischio di implementazione superficiale

**Fix - Usa Contextual Chain:**

**Prompt 1 - MVP:**

\`\`\`bash prompt-good
claude "Implementa user registration base (MVP):

Must-Have (Phase 1):
- Form: email, password, confirm password
- Validazione: email format, password min 8 chars
- Endpoint POST /auth/register
- Hash password con bcrypt (10 rounds)
- Salva user in DB (table users)
- Ritorna JWT token

Success Criteria:
- User registrato può fare login
- Password hashata correttamente
- Email unique (constraint DB)
- Test unitari per validazione"
\`\`\`

**Prompt 2 - Security (dopo MVP):**

\`\`\`bash
claude "Aggiungi security features a registration:

Based on: implementazione MVP esistente in @routes/auth.ts

Add:
- Password strength meter (weak/medium/strong)
- Email confirmation link (token expires 24h)
- Rate limiting (max 5 registrazioni/ora per IP)
- CAPTCHA (hCaptcha) dopo 3 tentativi falliti

Integration:
- Use EmailService (@services/email.ts) per confirmation
- Use Redis (@config/redis.ts) per rate limit tracking
- Frontend: PasswordStrength component in @components/"
\`\`\`

**Prompt 3 - Enhancements (opzionale):**

\`\`\`bash
claude "Aggiungi nice-to-have features:
- Social login Google OAuth 2.0
- Avatar upload (max 2MB, auto-resize 200x200)
- Remember me (JWT expires 30 giorni invece di 24h)"
\`\`\`

### 4.3 Pitfall: Missing Constraints

**Problema:** Vincoli mancanti generano soluzioni tecnicamente corrette ma praticamente inutilizzabili.

**Perché succede:**
- ❌ Assumi che i vincoli siano ovvi
- ❌ Dimentichi infrastruttura esistente
- ❌ Non consideri non-functional requirements

**Esempio problema:**

\`\`\`bash prompt-bad
claude "Aggiungi file upload per documenti utente"
\`\`\`

**Vincoli mancanti:**
- Dimensione massima file?
- Formati accettati?
- Dove salvare? (S3? filesystem? database?)
- Chi può uploadare? (auth required?)
- Scansione antivirus?
- Costi storage?

**Claude Code potrebbe generare:**
- Upload illimitato (vulnerabilità DoS)
- Salvataggio su filesystem locale (non scala)
- Nessuna validazione formato (security risk)
- Nessun quota per utente (costi incontrollati)

**Fix:**

\`\`\`bash prompt-good
claude "Implementa upload documenti con constraints

Feature:
- Gli utenti possono uploadare documenti (fatture, contratti)

Constraints:
- Max file size: 10MB per file
- Formati accettati: PDF, PNG, JPG, DOCX
- Max 20 file per utente (quota)
- Storage: AWS S3 bucket 'app-user-documents'
- Auth: solo utenti registrati (role='user' o 'admin')
- Virus scan: ClamAV prima di salvare su S3
- File naming: {userId}/{timestamp}_{originalName}

Security:
- Validare MIME type (non solo estensione)
- Generare signed URL per download (expires 1h)
- No esecuzione file uploadati (S3 bucket policy)
- Rate limit: max 10 upload/ora per user

Implementation:
- Usa multer per parsing multipart/form-data
- Endpoint POST /api/documents/upload
- Endpoint GET /api/documents/:id/download (signed URL)
- Salva metadata in DB (table documents: id, user_id, filename, size, mime_type, s3_key, uploaded_at)

Success:
- Upload funziona per file validi
- Reject file >10MB con 413 Payload Too Large
- Reject formati non validi con 400 Bad Request
- Reject se quota superata con 403 Forbidden
- Virus trovati ritornano 400 con messaggio"
\`\`\`

### 4.4 Pitfall: Ignoring Conventions

**Problema:** Soluzioni generiche che non rispettano le convenzioni del tuo progetto creano debito tecnico e confusione.

**Perché succede:**
- ❌ Non menzioni convenzioni progetto
- ❌ Assumi che Claude Code conosca i tuoi standard
- ❌ Focus solo su funzionalità, ignori qualità

**Esempio problema:**

\`\`\`bash prompt-bad
claude "Aggiungi logging per le API calls"
\`\`\`

**Cosa potrebbe generare:**
- \`console.log()\` invece di logger strutturato
- Formato log inconsistente
- Log sensibile (password, token)
- Nessuna correlation ID per tracing

**Fix:**

\`\`\`bash prompt-good
claude "Aggiungi logging per API calls seguendo project conventions

Project Logging Standards:
- Usiamo Winston structured logger (@utils/logger.ts)
- Log levels: error, warn, info, debug
- Production: solo error e warn
- Development: tutti i levels

Format Convention:
{
  "timestamp": "ISO 8601",
  "level": "info",
  "correlationId": "uuid",
  "service": "api",
  "method": "GET",
  "path": "/api/users",
  "statusCode": 200,
  "responseTime": 45,
  "userId": "optional"
}

What to Log:
- Request: method, path, correlation ID
- Response: status code, response time
- Errors: stack trace, user ID, context

What NOT to Log (Security):
- Password fields
- JWT tokens
- Credit card numbers
- API keys

Implementation:
- Middleware logRequest in @middleware/logger.ts
- Attach correlation ID a ogni request (req.id)
- Use logger.info() per success, logger.error() per failures
- Includi responseTime usando process.hrtime()

Integration:
- Apply middleware globally in @app.ts
- Logs vanno in file @logs/api-{date}.log (rotate daily)
- In production, stream a CloudWatch"
\`\`\`

---

## Capitolo 5: Advanced Techniques - Meta-Prompting

**Meta-prompting = Chiedere a Claude Code di ragionare sul problema prima di risolverlo.**

### 5.1 Cos'è il Meta-Prompting

**Definizione:**

Invece di chiedere direttamente una soluzione, chiedi a Claude Code di:
1. **Analizzare** il problema e le sue sfumature
2. **Proporre** alternative e trade-offs
3. **Ragionare** sulle implicazioni di ogni scelta
4. **Raccomandare** approccio migliore
5. **Implementare** dopo consenso

**Perché funziona:**
- ✅ Forza pensiero sistematico
- ✅ Evidenzia considerazioni nascoste
- ✅ Documenta rationale delle decisioni
- ✅ Produce soluzioni più ponderate

### 5.2 Quando Usare Meta-Prompting

**✅ Ideale per:**

1. **Architectural Decisions**
   - "Dovremmo usare microservices o monolith?"
   - "SQL o NoSQL per questo use case?"
   - "REST o GraphQL per la nostra API?"

2. **Complex Trade-offs**
   - "Come bilanciare performance vs consistency?"
   - "Caching aggressivo vs dati real-time?"
   - "Build in-house vs integrare third-party?"

3. **Technical Debt**
   - "Vale la pena refactorare ora o dopo?"
   - "Quale modulo tacklerare first?"

4. **Scaling Strategies**
   - "Come prepararsi a 10x traffic?"
   - "Horizontal vs vertical scaling?"

**❌ Non serve per:**
- Task semplici e diretti ("aggiungi endpoint")
- Bug evidenti ("fixa typo")
- Richieste standardizzate ("segui pattern X")

### 5.3 Pattern di Meta-Prompting

**Template:**

\`\`\`
[SPAZIO DEL PROBLEMA]
Descrivi il problema, obiettivi, vincoli

[RICHIESTA DI ANALISI]
"Prima di implementare, per favore:
1. Analizza il problema e identifica considerazioni chiave
2. Proponi 2-3 approcci alternativi con pro/contro
3. Raccomanda l'approccio migliore per il nostro contesto
4. Spiega il ragionamento dietro la tua raccomandazione"

[DOPO IL CONSENSO]
"Perfetto! Ora implementa l'approccio raccomandato."
\`\`\`

**Esempio reale: Architettura Caching**

\`\`\`bash prompt-good
claude "Meta-prompt: Strategia caching per dashboard analytics

Context:
- Dashboard esegue 20+ query aggregate su DB
- Dati cambiano ogni ~5 minuti (updates batch)
- 500 utenti attivi, dashboard aperta 50-100 volte/giorno
- Current: nessun caching, query durano 3-8 secondi
- Stack: Node.js, PostgreSQL, possibile aggiungere Redis

Goals:
- Ridurre load time a <1 secondo
- Mantenere dati freschi (staleness accettabile: max 5 min)
- Minimizzare complessità operativa
- Budget: possiamo aggiungere Redis ma preferiremmo evitare

Constraints:
- Non possiamo cambiare schema DB (in uso da altri servizi)
- Dashboard deve funzionare anche se cache fallisce
- Nessun budget per CDN o servizi caching esterni

Before implementing, please:
1. Analizza il problema: cosa sta causando lentezza? Query? Network? Rendering?
2. Proponi 3 strategie di caching con pros/cons:
   - In-memory caching (Node.js)
   - Redis caching layer
   - Materialized views PostgreSQL
   - (o alternative che suggerisci)
3. Per ogni strategia, valuta:
   - Complessità implementazione
   - Operational overhead
   - Performance improvement stimato
   - Failure modes (cosa succede se cache down?)
   - Invalidation strategy (quando refreshare?)
4. Raccomanda l'approccio migliore per il nostro context
5. Spiega il reasoning dietro la tua scelta

Dopo la tua analisi, implementeremo la soluzione scelta."
\`\`\`

**Risposta attesa da Claude Code:**

Claude Code analizzerà e proporrà qualcosa tipo:

\`\`\`
Analysis:
- Bottleneck principale: 20 query aggregate sequenziali
- Ogni query 150-400ms, totale 3-8s
- Dati cambiano ogni 5 min (predictable)

Strategies:

1. **In-Memory Caching (Node.js)**
   Pros:
   - Zero dependencies
   - Semplice implementazione
   - Latency bassissima (<1ms)
   Cons:
   - Cache non condivisa tra istanze (se clustered)
   - Memory usage cresce con data size
   - Invalidation complessa se multi-server
   Estimate: 95% reduction (3-8s → 0.1-0.2s)

2. **Redis Caching**
   Pros:
   - Cache condivisa tra istanze
   - TTL automatico
   - Failure modes ben gestiti
   Cons:
   - Dependency esterna (operational overhead)
   - Network latency Redis (1-5ms)
   - Costo infrastructure
   Estimate: 90% reduction (3-8s → 0.2-0.5s)

3. **Materialized Views PostgreSQL**
   Pros:
   - No cache layer extra
   - Query ultra-veloci (pre-computed)
   - Consistent con source data
   Cons:
   - Refresh ogni 5 min impatta DB
   - Schema change required
   - Rigido (hard to invalidate on-demand)
   Estimate: 85% reduction (3-8s → 0.3-0.8s)

Recommendation: **In-Memory Caching (Strategy 1)**

Reasoning:
- Requisiti: 50-100 dashboard opens/day = low traffic
- Data size: probabilmente <10MB di cache
- Single server o small cluster: shared cache non critico
- Zero operational overhead: no Redis da gestire
- Graceful fallback: se cache miss, query DB (slow ma funziona)
- Staleness 5 min: TTL-based invalidation semplice

Implementation approach:
- NodeCache library (TTL support)
- Cache key: 'dashboard:analytics:v1'
- TTL: 5 minuti
- Warming: pre-populate cache a deploy
- Monitoring: cache hit rate metric

If traffic grows 10x → migrate to Redis.
\`\`\`

**Dopo la raccomandazione:**

\`\`\`bash
claude "Perfetto! Implementa la strategia In-Memory Caching con NodeCache:
- Segui esattamente il tuo reasoning
- Aggiungi cache warming script
- Includi monitoring per hit rate
- Documenta failure mode (fallback to DB)"
\`\`\`

### 5.4 Meta-Prompting per Decisioni Architetturali

**Scenario: Scegliere Pattern Architetturale**

\`\`\`bash prompt-good
claude "Meta-prompt: Architettura per notification system

Problem Space:
- Need to send notifications: email, SMS, push, in-app
- Expected volume: 10k notifications/day now, 100k in 6 months
- Types: transactional (order confirm) e marketing (promotions)
- Multiple channels: user preferences decide which channels
- Delivery guarantees: transactional MUST deliver, marketing best-effort

Current State:
- Sending inline in API requests (slow, blocks response)
- No retry logic (failures lost)
- No visibility (don't know if delivered)

Goals:
- Decouple notification sending from API requests
- Reliable delivery for transactional notifications
- Scale to 100k+/day without infrastructure changes
- Support adding new channels (WhatsApp future)
- Monitoring and alerting for failures

Constraints:
- Budget: prefer managed services over self-hosted
- Team: 2 backend devs, limited DevOps time
- Stack: Node.js, PostgreSQL, AWS environment
- Timeline: MVP in 2 weeks

Before proposing implementation, please:
1. Analyze notification patterns: what are key requirements?
2. Propose architectural patterns:
   - Simple queue (SQS + Lambda)
   - Event-driven (EventBridge + subscribers)
   - Full platform (AWS SNS/SES)
   - Job queue (Bull + Redis)
   - (or alternatives you recommend)
3. Evaluate each pattern on:
   - Scalability (can it handle 100k/day?)
   - Reliability (delivery guarantees?)
   - Development complexity (time to MVP?)
   - Operational overhead (monitoring, maintenance?)
   - Cost at 10k and 100k/day
   - Flexibility (easy to add channels?)
4. Recommend best pattern for our constraints
5. Sketch high-level architecture diagram (text-based)

After your analysis, we'll implement the recommended approach."
\`\`\`

**Valore del Meta-Prompting qui:**

Claude Code considererà:
- Trade-off tra semplicità (SQS+Lambda) vs flessibilità (custom queue)
- Costi managed services vs operational burden self-hosted
- Timeline urgente (2 settimane) vs scalabilità futura
- Team size limited → prefer managed, less maintenance

Produrrà raccomandazione ponderata invece di saltare a implementazione.

---

## Capitolo 6: Plan Mode e Thinking Mode - Superpotenze Cognitive

Hai padroneggiato prompt efficaci, pattern avanzati, e meta-prompting.
Ma Claude Code ha **due modalità speciali** che sbloccano capacità cognitive ancora più potenti.

Pensa a queste modalità come **gear differenti** di un'auto:
- **Modalità normale**: buona per la maggior parte dei percorsi (prompt conversazionali)
- **Plan Mode**: prima marcia alta per **ampiezza** (multi-file, architetture)
- **Thinking Mode**: massima marcia per **profondità** (problemi complessi, logica intricata)

### 6.1 Plan Mode: Padroneggiare l'Ampiezza

**Cosa fa Plan Mode:**

Plan Mode trasforma Claude Code da **assistente reattivo** in **architetto proattivo**.

Invece di rispondere direttamente alla tua richiesta, Claude Code:
1. **Analizza** il contesto completo e le dipendenze
2. **Ricerca** scenari e casi d'uso attraverso la codebase
3. **Crea** un piano implementativo dettagliato
4. **Presenta** il piano per review prima di eseguire qualsiasi modifica

**Attivazione:**

\`\`\`bash
# Premi Shift + Tab due volte per attivare Plan Mode
Shift + Tab (twice)
\`\`\`

**Quando Usare Plan Mode:**

✅ **Multi-file refactoring**: Cambiamenti attraverso numerosi file

Esempio scenario:
\`\`\`bash
# Senza Plan Mode - RISCHIOSO
claude "Rinomina la funzione getUserData in fetchUserProfile
ovunque nel progetto"

# Claude Code modifica direttamente 40+ file
# Rischio: breaking changes, import rotti, test falliti

# Con Plan Mode - SICURO
[Shift + Tab twice]
claude "Rinomina la funzione getUserData in fetchUserProfile
ovunque nel progetto"

# Claude Code:
# 1. Analizza: trova tutti i 47 file che usano getUserData
# 2. Identifica: import statements, test files, documentation
# 3. Presenta piano:
#    - Aggiorna definizione in @utils/api.ts
#    - Aggiorna 32 import in @components/*
#    - Aggiorna 8 test in @tests/*
#    - Aggiorna 6 doc references in @docs/*
#    - Ordine: prima test, poi implementation, poi docs
# 4. Aspetta tua approvazione prima di procedere
\`\`\`

✅ **Architecture decisions**: Prima di implementare nuove feature o sistemi

Scenario:
\`\`\`bash
[Shift + Tab twice]
claude "Implementa notification system con supporto per email,
SMS, push notifications, e in-app notifications"

# Plan Mode analizza:
# - Patterns esistenti nel progetto
# - Librerie già installate
# - Architecture attuale (monolith? microservices?)
# - Database schema e tabelle esistenti

# Presenta piano:
# 1. Crea notification service layer (@services/notifications/)
# 2. Definisci interface NotificationChannel
# 3. Implementa adapters: EmailAdapter, SMSAdapter, PushAdapter, InAppAdapter
# 4. Aggiungi tabella notifications (schema migration)
# 5. Crea queue system per sending asincrono
# 6. Aggiungi monitoring e retry logic
# 7. Crea test suite per ogni channel

# Chiede conferma prima di generare una riga di codice
\`\`\`

✅ **Complex migrations**: Database updates, API versioning, framework upgrades

Scenario:
\`\`\`bash
[Shift + Tab twice]
claude "Migra da Sequelize ORM a Prisma ORM mantenendo
compatibilità API esistente"

# Plan Mode:
# - Analizza tutti i modelli Sequelize esistenti
# - Identifica query patterns usati nel progetto
# - Mappa relazioni (hasMany, belongsTo, etc.)
# - Identifica transazioni e complex queries

# Piano proposto:
# 1. Setup Prisma schema basato su modelli Sequelize attuali
# 2. Crea migration scripts per schema database
# 3. Implementa adapter layer per mantenere API backward compatible
# 4. Migra modelli uno alla volta (User → Order → Product → ...)
# 5. Per ogni modello:
#    - Genera Prisma schema
#    - Aggiorna repository layer
#    - Aggiorna test
#    - Deploy feature flag per A/B testing
# 6. Monitoring per verificare performance parity
\`\`\`

✅ **Unknown codebases**: Quando esplori progetti non familiari

Scenario:
\`\`\`bash
[Shift + Tab twice]
claude "Aggiungi OAuth2 authentication con Google e GitHub"

# Se è un nuovo progetto, Plan Mode:
# 1. Analizza stack esistente (Express? NestJS? Fastify?)
# 2. Cerca auth patterns già implementati
# 3. Identifica dove configurare routes
# 4. Verifica librerie OAuth2 compatibili con stack
# 5. Presenta piano comprensivo che si integra con architettura esistente

# Invece di assumere pattern generici
\`\`\`

**Plan Mode Benefits:**

• **Previene cascading issues** dovuti a comprensione incompleta

Se rinomini funzione ma dimentichi file nascosto → Plan Mode lo trova prima.

• **Identifica potential conflicts** prima che avvengano

Due branch modificano stesso file? Plan Mode vede entrambi.

• **Fornisce clear roadmap** per modifiche complesse

Sai esattamente cosa verrà modificato, in che ordine, e perché.

• **Riduce bisogno di fix successivi**

Meno "ops, ho dimenticato di aggiornare quel file" → meno iterazioni.

### 6.2 Thinking Mode: Risolvere in Profondità

**Cosa fa Thinking Mode:**

Thinking Mode dà a Claude Code **capacità di ragionamento estese** per problemi logici intricati.

Quando attivato, Claude Code:
- Alloca risorse computazionali aggiuntive
- Esplora multiple ipotesi in parallelo
- Considera scenari non ovvi e casi limite
- Fornisce ragionamento dettagliato per le conclusioni

**Attivazione:**

Usa frasi trigger nel prompt:

\`\`\`bash
# Trigger phrases che attivano Thinking Mode:
- "Ultra think:"
- "Think deeply:"
- "Deep reasoning:"
- "Analyze thoroughly:"
\`\`\`

**Quando Usare Thinking Mode:**

✅ **Complex debugging**: Bug elusivi con cause non ovvie

Scenario:
\`\`\`bash
claude "Ultra think: Perché la nostra strategia di caching sta
causando memory leak in produzione?

Context:
- Memory usage cresce linearmente 10MB/ora
- Iniziato 3 settimane fa dopo deploy v2.4.0
- Succede solo in production, non in staging
- Database metrics look normal
- No error logs rilevanti

Affected services:
@services/cache.ts @utils/redis.ts @config/memory.ts"

# Thinking Mode analizza:
# 1. Pattern across multiple dimensions:
#    - Timing (perché 3 settimane fa?)
#    - Environment (perché solo production?)
#    - Growth rate (perché lineare?)
# 2. Considera correlazioni non ovvie:
#    - Deploy v2.4.0 added new feature → più cache keys?
#    - Production traffic pattern diverso da staging?
#    - TTL configuration differente tra env?
# 3. Esplora ipotesi alternative:
#    - Memory leak in Redis client
#    - Cache keys mai invalidate
#    - Event emitter listeners non rimossi
#    - Closures che mantengono riferimenti
# 4. Verifica ognuna con reasoning chains
# 5. Suggerisce multiple hypotheses con evidenza
\`\`\`

✅ **Algorithm optimization**: Performance-critical code sections

Scenario:
\`\`\`bash
claude "Think deeply: Ottimizza l'algoritmo di matching
per ridurre tempo esecuzione da O(n²) a O(n log n)

Current implementation @algorithms/matcher.ts:
- Compara ogni utente con ogni altro utente
- ~10k utenti = 100M comparazioni
- Esecuzione: 45 secondi
- Target: <5 secondi

Constraints:
- Must maintain exact matching logic (no approximations)
- Scoring function è complex (15+ factors)
- Real-time requirement per API endpoint"

# Thinking Mode:
# 1. Analizza bottleneck attuale (nested loops)
# 2. Esplora strutture dati alternative:
#    - Spatial hashing per clustering
#    - KD-tree per nearest neighbor
#    - Inverted index per fast filtering
# 3. Considera trade-offs:
#    - Pre-computation overhead
#    - Memory usage increase
#    - Accuracy vs speed
# 4. Propone soluzione ibrida:
#    - Pre-filter con inverted index (filters 90% candidates)
#    - Detailed scoring solo su remaining 10%
#    - Parallel processing per remaining candidates
# 5. Stima performance: O(n log n) → ~3 secondi
\`\`\`

✅ **Security analysis**: Identificare vulnerabilità

Scenario:
\`\`\`bash
claude "Ultra think: Analizza questo authentication flow per
identificare security vulnerabilities

Flow:
1. User submits email + password
2. Server verifica credentials
3. Genera JWT token (24h expiry)
4. Ritorna token a client
5. Client stores in localStorage
6. Ogni request include token in header

Code:
@routes/auth.ts @middleware/jwt.ts @services/user.ts"

# Thinking Mode cerca vulnerabilità che quick analysis potrebbe perdere:

# 1. Token storage (localStorage):
#    - Vulnerable to XSS attacks
#    - Consider httpOnly cookies invece

# 2. Password verification:
#    - Timing attack possible?
#    - Constant-time comparison needed?

# 3. JWT secret:
#    - How is secret generated/stored?
#    - Rotazione del secret implemented?

# 4. Token refresh:
#    - Expired token handling?
#    - Refresh token mechanism?

# 5. Rate limiting:
#    - Brute force protection?
#    - Account lockout after N failures?

# 6. Session invalidation:
#    - Logout invalida token?
#    - Blacklist per revoked tokens?

# Suggerisce fix prioritizzati per ogni vulnerability
\`\`\`

✅ **Business logic**: Regole intricate con molti edge cases

Scenario:
\`\`\`bash
claude "Deep reasoning: Implementa sistema di pricing dinamico
con queste regole:

Business Rules:
- Base price varia per categoria prodotto (10 categorie)
- Sconto volume: 5% se qty 10-50, 10% se qty 50-100, 15% se >100
- Utenti premium: ulteriore 5% su tutto
- Early bird discount: 10% se ordine prima delle 10:00
- Seasonal pricing: estate +20%, inverno -15% (tranne elettronica)
- Flash sales: override tutti gli sconti se attivo
- Price floor: mai sotto costo di produzione + 10%
- Bundle deals: se prodotti A+B insieme, sconto 8%
- Loyalty points: convertibili 100 punti = €1 sconto
- Tax computation: varia per stato (50 stati US)

Edge Cases:
- Cosa succede se utente premium compra >100 qty durante flash sale
  con bundle deal e usa loyalty points?
- Validation: prevent negative final price
- Audit: log ogni step del price calculation per compliance"

# Thinking Mode:
# 1. Identifica regole che potrebbero confliggere
# 2. Definisce ordine di precedenza chiaro:
#    - Flash sale override → base price
#    - Volume discount → after base
#    - Premium discount → additive
#    - Early bird → additive
#    - Bundle → se applicabile
#    - Loyalty → final step
#    - Tax → ultimo calcolo
# 3. Gestisce edge cases:
#    - Negative price → clamp a floor price
#    - Multiple discounts → cap at 50% max total discount
#    - Seasonal + Flash → flash wins
# 4. Genera implementation con step-by-step calculations
# 5. Include extensive test cases per ogni edge case
\`\`\`

**Thinking Mode Benefits:**

• **Catches subtle issues** che quick analysis potrebbe perdere

Bug nascosti in logica complessa → Thinking Mode li trova.

• **Provides deeper understanding** di sistemi complessi

Non solo "come funziona" ma "perché funziona così, implicazioni, alternative".

• **Generates more creative solutions**

Esplora solution space più ampiamente → trova approcci innovativi.

• **Explains reasoning** per better learning

Capire il PERCHÉ dietro le soluzioni → impari principi trasferibili.

### 6.3 Combinare le Modalità per Massimo Impatto

Il **vero potere** emerge quando combini entrambe le modalità per task eccezionalmente complessi.

**Pattern: Plan Mode per struttura, Thinking Mode per dettagli**

**Scenario: Refactoring di sistema legacy complesso**

**Step 1 - Plan Mode per Breadth:**

\`\`\`bash
[Shift + Tab twice]
claude "Piano completo per refactorare authentication system legacy:

Current State:
- 15 file sparsi nel codebase
- Mix di patterns (session-based e JWT)
- Nessun test coverage
- Security vulnerabilities note
- Codice 5+ anni vecchio

Target State:
- Architettura modulare con clear separation
- 100% JWT-based (no sessions)
- 80%+ test coverage
- Security best practices (OWASP compliant)
- Backward compatibility per 6 mesi"

# Plan Mode genera roadmap dettagliata:

1. **Analysis Phase** (Week 1)
   - Audit current authentication flows
   - Document all entry points and dependencies
   - Identify breaking vs non-breaking changes

2. **Foundation Phase** (Week 2-3)
   - Create new auth module (@auth/v2/)
   - Implement core JWT services
   - Setup test infrastructure

3. **Migration Phase** (Week 4-6)
   - Implement feature flags for gradual rollout
   - Migrate endpoints one by one
   - Parallel run old and new system

4. **Deprecation Phase** (Week 7-8)
   - Sunset old system
   - Remove legacy code
   - Update documentation

# Piano approvato → procedi con implementation
\`\`\`

**Step 2 - Thinking Mode per dettagli critici:**

Dopo approval del piano, usa Thinking Mode per parti complesse:

\`\`\`bash
claude "Ultra think: Durante la migration phase del piano,
come gestiamo la transizione per utenti con sessioni attive?

Constraints:
- 50k utenti con sessioni attive
- Sessioni scadono tra 7 giorni
- Non possiamo forzare logout massivo (UX terribile)
- Nuova architettura supporta solo JWT
- Downtime accettabile: <1 minuto

Come facciamo smooth transition senza rompere esperienza utente?"

# Thinking Mode analizza:

# 1. Problemi da risolvere:
#    - Sessioni vecchie non compatibili con nuovo sistema
#    - Cookie-based session vs JWT token
#    - Credential re-authentication necessaria?

# 2. Alternative considerate:
#    A. Dual authentication support (session + JWT in parallelo)
#       Pros: zero downtime, graduale migration
#       Cons: complessità doppia, maintenance burden
#
#    B. One-time token exchange (converti session → JWT)
#       Pros: automazione completa, no user action
#       Cons: security considerations per exchange
#
#    C. Lazy migration (rinnovo a login successivo)
#       Pros: semplice implementation
#       Cons: utenti attivi per settimane senza migration

# 3. Recommendation: Hybrid approach
#    - Dual support per 30 giorni (transizione)
#    - Background job converte sessioni attive in JWT
#    - User notification: "Sistema aggiornato, rilogin entro 7 giorni"
#    - Grace period con fallback a session se JWT manca

# 4. Implementation plan dettagliato
#    - Auth middleware checks JWT first, fallback a session
#    - Migration script: session → JWT conversion
#    - Monitor migration progress (dashboard)
#    - Sunset date configurabile (env variable)
\`\`\`

**Strategic Mode Selection:**

| Task Type | Recommended Mode | Why |
|-----------|------------------|-----|
| New feature across multiple files | Plan Mode | Needs broad understanding |
| Debugging race condition | Thinking Mode | Requires deep analysis |
| Refactoring legacy system | Both | Plan structure, think through complex parts |
| Performance optimization | Thinking Mode | Needs detailed analysis |
| API design | Plan Mode | Considers all touchpoints |
| Algorithm design | Thinking Mode | Complex logic requires depth |

### 6.4 Cost Considerations e Ottimizzazione

**Importante:** Entrambe le modalità consumano token aggiuntivi perché richiedono più elaborazione.

**Token Usage:**

- **Normal Mode**: 1x token usage (baseline)
- **Plan Mode**: Tipicamente 2-3x normal token usage
- **Thinking Mode**: Can be 3-5x normal token usage
- **Combined**: Potenzialmente 5-7x normal token usage

**Cost Optimization Strategies:**

**1. Use modes selectively for high-value tasks**

❌ Non serve:
\`\`\`bash
[Thinking Mode]
claude "Aggiungi bottone rosso al form"
\`\`\`

✅ Vale il costo:
\`\`\`bash
[Thinking Mode]
claude "Ultra think: Ottimizza query database che sta causando
timeout in produzione con 100k+ utenti concorrenti"
\`\`\`

**2. Start with normal mode for exploration**

\`\`\`bash
# Step 1: Quick exploration (normal mode)
claude "Quali sono le opzioni per real-time communication
tra browser e server?"

# Step 2: Dopo identificato approcci (WebSocket, SSE, Long Polling)
#         usa Thinking Mode per decidere
[Thinking Mode]
claude "Deep reasoning: Considerando nostro use case (chat app,
10k concurrent users, message latency <100ms), quale approccio
(WebSocket vs SSE vs Long Polling) è ottimale? Analizza
performance, scalability, browser support, implementation complexity"
\`\`\`

**3. Activate performance modes for final implementation**

\`\`\`bash
# Exploration (normal)
claude "Come posso implementare rate limiting?"

# Planning (after understanding approaches)
[Plan Mode]
claude "Piano implementazione rate limiting usando Redis + Lua script"

# Implementation (normal mode è sufficiente se piano è chiaro)
claude "Implementa il piano discusso"
\`\`\`

**4. Set token limits in configuration if needed**

Se hai budget constraints, puoi configurare limiti:
\`\`\`bash
# In ~/.claude/config.json (se disponibile)
{
  "token_limits": {
    "plan_mode_max_tokens": 8000,
    "thinking_mode_max_tokens": 10000
  }
}
\`\`\`

### 6.5 Esempio Pratico Progressivo

**Scenario: Implementare sistema di real-time analytics dashboard**

**Progressione attraverso le modalità:**

**Phase 1 - Normal Mode (Exploration):**

\`\`\`bash
claude "Quali sono le best practices per real-time analytics dashboard
con aggiornamenti ogni secondo?"

# Quick overview di approcci:
# - WebSocket push
# - Server-Sent Events
# - Polling con cache
# - etc.
\`\`\`

**Phase 2 - Plan Mode (Architecture):**

\`\`\`bash
[Shift + Tab twice]
claude "Crea piano architetturale completo per real-time analytics dashboard:

Requirements:
- 5k utenti concorrenti
- Metrics aggiornati ogni 1 secondo
- 20+ metric types (revenue, users, conversions, etc.)
- Filtri real-time (date range, region, product)
- Export capabilities (CSV, PDF)
- Mobile responsive

Stack:
- Backend: Node.js + PostgreSQL + Redis
- Frontend: React + Chart.js
- Infrastructure: AWS

Plan phase coverage: architecture, data flow, components, deployment"

# Plan Mode output:

## Architecture Plan

### 1. Data Pipeline
- PostgreSQL: source of truth
- Redis: aggregated metrics cache (1s TTL)
- Background worker: aggregate metrics ogni secondo

### 2. Real-Time Communication
- WebSocket server (Socket.io)
- Rooms per dashboard instance (isolate updates)
- Heartbeat mechanism (detect disconnections)

### 3. Frontend Components
- DashboardContainer (WebSocket management)
- MetricCard (individual metric display)
- ChartRenderer (Chart.js wrapper)
- FilterPanel (date, region, product selection)
- ExportModal (CSV/PDF generation)

### 4. Performance Optimizations
- Lazy load charts (viewport visible)
- Throttle filter changes (300ms debounce)
- Cache export queries (5 min)
- Connection pooling database

### 5. Monitoring
- WebSocket connection metrics
- Query performance tracking
- Error rate monitoring
- Alert se > 5% error rate

Implementation sequence: Data pipeline → WebSocket → Frontend → Optimizations
\`\`\`

**Phase 3 - Thinking Mode (Complex Parts):**

Dopo approval del piano, usa Thinking Mode per parti critiche:

\`\`\`bash
claude "Ultra think: Nel piano architetturale, la parte 'Background worker
aggregates metrics ogni secondo' ha potential scalability issues.

Problem:
- 20 metric types × 1000 query aggregations = 20k queries/secondo
- PostgreSQL può gestire ~5k queries/sec con current hardware
- Rischio: database overload durante peak traffic
- Non possiamo upgradefare hardware (budget constraint)

Analyze:
1. Root cause: perché così tante queries?
2. Alternative approaches per ridurre DB load
3. Trade-offs: accuracy vs performance vs complexity
4. Recommended solution con implementation path"

# Thinking Mode deep dive:

## Root Cause Analysis

Current approach fa 20k queries perché:
- Each metric computed independently (no batching)
- Separate query per filter combination
- No incremental updates (recompute from scratch ogni secondo)

## Alternative Approaches

### Option A: Materialized Views + Incremental Updates
- Pre-aggregate common metric combinations
- Update only changed data (delta computation)
- Pros: DB load reduced 90% (20k → 2k queries/sec)
- Cons: Staleness up to 5 seconds, complex delta logic

### Option B: Stream Processing (Kafka + Flink)
- Event stream per user action
- Continuous aggregation in-memory
- Pros: True real-time, infinite scalability
- Cons: Infrastructure overhead, learning curve, cost

### Option C: Smart Caching with Cache Warming
- Pre-compute top 80% used filters (Pareto principle)
- Lazy compute remaining 20%
- Update cache incrementally
- Pros: Balanced trade-off, no new infrastructure
- Cons: Requires usage analytics, cache invalidation complexity

## Recommended: Option C (Smart Caching)

Reasoning:
1. **Budget constraint** eliminates Option B (too expensive)
2. **5s staleness** too high for "real-time" requirement (Option A)
3. **Option C** provides 90% users <1s freshness, acceptable for remaining 10%

Implementation Path:
1. Analyze dashboard usage (which filters used most)
2. Pre-compute top 80% filter combinations hourly
3. Update incrementally every second (delta computation)
4. Lazy compute edge cases on-demand
5. Monitor cache hit rate (target >80%)

Expected Results:
- Database load: 20k → 3k queries/sec (85% reduction)
- Latency P95: <500ms (from 2-3s current)
- Cache hit rate: ~85% after 1 week of learning
\`\`\`

**Questo approccio progressivo:**
- ✅ Esplora opzioni (normal mode)
- ✅ Crea piano strutturato (plan mode)
- ✅ Risolve dettagli complessi (thinking mode)
- ✅ Ottimizza costi (usa modalità appropriate per ogni step)

---

## Capitolo 7: Riepilogo delle Modalità Avanzate

**Quando Usare Ogni Modalità:**

**Normal Mode (Default):**
- Feature semplici e dirette
- Bug evidenti
- Domande conversazionali
- Modifiche a file singolo
- Pattern ben definiti

**Plan Mode (Shift + Tab twice):**
- Multi-file refactoring
- Architectural decisions
- Complex migrations
- Unknown codebases
- Quando serve vedere il big picture PRIMA di cambiare codice

**Thinking Mode ("Ultra think:", "Think deeply:"):**
- Complex debugging (cause non ovvie)
- Algorithm optimization
- Security analysis
- Business logic intricata
- Quando serve deep reasoning su problemi complessi

**Combined (Plan + Thinking):**
- Refactoring sistemi legacy
- Implementazioni critiche con high stakes
- Quando serve sia breadth CHE depth

**Principio Guida:**

> **"Normal mode per esecuzione, Plan mode per struttura, Thinking mode per complessità."**

Se non sei sicuro quale usare, inizia con **normal mode**. Se la risposta è troppo superficiale o manca considerazioni importanti, **escalate** a Plan o Thinking mode.

---

## Capitolo 8: Cost Optimization - Ottenere di Più Pagando Meno 💰

Claude Code addebita API calls in base ai token elaborati. **Un uso intelligente può ridurre i costi del 90% ottenendo gli stessi risultati.**

Questa sezione ti mostra 15 strategie concrete per **ottimizzare i costi** senza compromettere la qualità. Risparmio stimato: **da $100/mese a $10/mese** per utente medio.

### 8.1 Smart Tool Usage - Ottimizzare Strumenti Base

#### 1. Usa Haiku per 80% del Lavoro (5x Cheaper) 💸

**Problema:** Claude Sonnet è default, ma costa 5x Haiku.

**Soluzione:** Usa Haiku per operazioni semplici:

\`\`\`bash
# Operazioni semplici con Haiku (€0.25 per 1M input tokens)
claude --model haiku "Leggi @utils/helpers.ts e spiega cosa fa"
claude --model haiku "Crea test per questa funzione" @validators/email.ts
claude --model haiku "Aggiungi commenti JSDoc a questo file" @components/Button.tsx

# Operazioni complesse con Sonnet (€3 per 1M input tokens)
claude --model sonnet "Refactorizza architettura per supportare multi-tenancy"
claude --model sonnet "Debug race condition nel payment flow"
\`\`\`

**Quando usare Haiku:**
- ✅ File reading e spiegazioni
- ✅ Code generation semplice (CRUD, utilities)
- ✅ Testing per funzioni straightforward
- ✅ Formatting e linting
- ✅ Documentation generation

**Quando usare Sonnet:**
- 🎯 Architectural decisions
- 🎯 Complex debugging (race conditions, memory leaks)
- 🎯 Security analysis
- 🎯 Performance optimization
- 🎯 Business logic complessa

**Risparmio:** Se 80% lavoro è Haiku-compatible → **risparmio $80/mese** (da $100 a $20).

#### 2. Search First, Read Second (100x Cheaper) 🔍

**Problema:** Leggere file grandi (10MB log) costa $5, search costa $0.05.

**Soluzione:** Usa \`grep\` per trovare esattamente cosa serve prima di leggere:

\`\`\`bash
# ❌ Costoso: read intero log (10MB, 250k righe)
claude "Leggi @logs/application.log e trova errori di autenticazione"
# Cost: $5 per read completo

# ✅ Economico: search prima, poi read solo le righe rilevanti
claude "Cerca 'Authentication failed' in @logs/application.log e mostra le ultime 50 occorrenze"
# Cost: $0.05 per search, poi $0.10 per read 50 righe
# Saving: $4.85 (97% cheaper!)
\`\`\`

**Pattern ottimale:**

\`\`\`bash
# Step 1: Search per identificare file rilevanti
claude "Cerca dove viene usata la funzione validatePayment nel progetto"

# Step 2: Read SOLO i file necessari identificati
claude "Leggi le prime 100 righe di @services/payment.ts dove usi validatePayment"
\`\`\`

**Risparmio:** 100x più economico per grandi codebase.

#### 3. Read Files in Chunks (100x Cheaper) 📑

**Problema:** Leggere file da 5000 righe interamente costa $1, leggere 50 righe costa $0.01.

**Soluzione:** Specifica range di righe quando possibile:

\`\`\`bash
# ❌ Costoso: leggi tutto (5000 righe, 200KB)
claude "Analizza @models/User.ts"
# Cost: $1

# ✅ Economico: leggi solo la sezione rilevante
claude "Leggi righe 1-100 di @models/User.ts (schema definition)"
# Cost: $0.01 (100x cheaper!)

# Se serve più context dopo:
claude "Ora leggi righe 100-200 (metodi di validazione)"
# Cost: $0.01

# Totale: $0.02 invece di $1 → risparmio $0.98 (98%)
\`\`\`

**Pattern ottimale:**

\`\`\`bash
# 1. Guarda struttura file (table of contents)
claude "Elenca funzioni/classi in @services/analytics.ts senza leggere implementazione"

# 2. Leggi solo sezioni rilevanti
claude "Leggi solo la funzione calculateRevenue in @services/analytics.ts"
\`\`\`

**Risparmio:** $0.98 per file grande → **$49/mese** se analizzi 50 file/mese.

#### 4. Run Tasks in Parallel (3x Faster, Same Cost) ⚡

**Problema:** Task sequenziali sono lenti, parallel è gratis.

**Soluzione:** Quando task sono indipendenti, eseguili in parallelo:

\`\`\`bash
# ❌ Sequenziale (lento):
claude "Leggi @api/users.ts"
# Attendi risposta...
claude "Leggi @api/orders.ts"
# Attendi risposta...
claude "Leggi @api/products.ts"
# Totale: 60 secondi

# ✅ Parallelo (veloce):
claude "Leggi questi file in parallelo: @api/users.ts @api/orders.ts @api/products.ts"
# Totale: 20 secondi (3x faster!)
# Cost: identico, velocità 3x
\`\`\`

**Quando parallelizzare:**
- ✅ Lettura di file indipendenti
- ✅ Test execution su file separati
- ✅ Lint check su moduli diversi
- ✅ Documentation generation per sezioni diverse

**Risparmio:** Stesso costo, **40% tempo risparmiato** → più produttività.

### 8.2 Exploration & Planning - Ridurre Trial-and-Error

#### 5. Use Explore Agent for Unfamiliar Code ($20-30 → $5) 🔭

**Problema:** Ricerche random costano $20-30 (trial-and-error), explore agent trova subito per $5.

**Soluzione:** Quando esplori codebase sconosciuta, usa subagent specializzato:

\`\`\`bash
# ❌ Costoso: trial-and-error
claude "Cerca funzione di autenticazione... forse in @auth/? No? Prova @services/? Ah no, @middleware/"
# Cost: $20-30 per multiple tentativi

# ✅ Economico: explore agent trova first try
claude "Usa explore agent per trovare dove viene gestita autenticazione nel progetto"
# Cost: $5 (explore agent analizza struttura e trova subito)
# Saving: $15-25 (75-83% cheaper!)
\`\`\`

**Pattern ottimale:**

\`\`\`bash
# Prima volta su nuovo progetto:
claude "Explore agent: mappa architettura progetto (entry points, modules, dependencies)"

# Poi ricerche mirate:
claude "Basandoti sulla mappa, mostra implementazione login flow"
\`\`\`

**Risparmio:** $15-25 per exploration → **$150/mese** se esplori 10 progetti nuovi.

#### 6. Plan Major Changes First ($0.50 → Saves $50 in Wasted Rework) 📋

**Problema:** Refactoring senza piano costa $50 in rework (breaking changes, rollback).

**Soluzione:** Usa Plan Mode (Shift+Tab twice) PRIMA di toccare codice:

\`\`\`bash
# ❌ Costoso: refactor diretto senza piano
claude "Rinomina getUserData in fetchUserProfile ovunque"
# Claude Code modifica 40 file
# Scopri che ha rotto import, test falliti, rollback
# Cost: $50 in rework + tempo perso

# ✅ Economico: Plan Mode prima
[Shift + Tab twice]
claude "Crea piano per rinominare getUserData in fetchUserProfile ovunque"
# Claude Code analizza:
# - 47 file coinvolti
# - 32 import da aggiornare
# - 8 test files
# - 6 doc references
# - Ordine: test → implementation → docs
# Presenta piano, chiede approval
# Cost: $0.50 per planning
# Implementazione: $5
# ZERO rework
# Saving: $44.50 (90% cheaper!)
\`\`\`

**Pattern ottimale:**

\`\`\`bash
# Sempre per refactoring multi-file:
[Shift + Tab twice]
claude "Piano per [MODIFICA COMPLESSA]"
# Review piano
# Approve
claude "Implementa il piano approvato step-by-step"
\`\`\`

**Risparmio:** $44.50 per refactor → **$200/mese** se fai 5 refactoring/mese.

### 8.3 Budget Monitoring - Never Overspend Again

#### 7. Turn On Budget Alerts (70% and 90% Warnings) 🚨

**Problema:** Scopri di aver speso $500 solo a fine mese (troppo tardi).

**Soluzione:** Setup script per alert automatici:

\`\`\`bash
# Setup hook per budget tracking
cat > .claude/hooks/post-prompt.sh <<'EOF'
#!/bin/bash

# Get current month spend
SPEND=\$(claude billing --current-month --format json | jq '.total')
BUDGET=\${MONTHLY_BUDGET:-100}  # Default $100/mese

# Calculate percentage
PERCENT=\$(echo "scale=2; \$SPEND / \$BUDGET * 100" | bc)

# Alert at 70%
if (( \$(echo "\$PERCENT > 70" | bc -l) )); then
  echo "⚠️  Budget Alert: Hai speso \$\${SPEND} (\${PERCENT}% del budget \$\${BUDGET})"
fi

# Alert at 90%
if (( \$(echo "\$PERCENT > 90" | bc -l) )); then
  echo "🚨 Budget Alert CRITICO: \$\${SPEND}/\$\${BUDGET} (\${PERCENT}%) - Rallenta usage!"
fi
EOF

chmod +x .claude/hooks/post-prompt.sh
\`\`\`

**Benefici:**
- ✅ Warning a 70% budget (tempo di correggere)
- ✅ Alert critico a 90% (stop non-essential usage)
- ✅ Mai overspend sorpresa a fine mese

**Risparmio:** Previene overspending di **$200-500/mese** in surprise bills.

### 8.4 Query Optimization - Smart Prompting

#### 8. Limit Search Results (10k Results $5 → Top 50 $0.50) 🎯

**Problema:** "Trova tutti i match" ritorna 10k risultati ($5), ne usi solo i primi 50.

**Soluzione:** Specifica limite esplicito:

\`\`\`bash
# ❌ Costoso: tutti i risultati
claude "Trova tutte le occorrenze di 'import React' nel progetto"
# Ritorna 10,000 match (ogni file)
# Cost: $5

# ✅ Economico: limita a top N
claude "Trova le prime 50 occorrenze di 'import React'"
# Cost: $0.50 (10x cheaper!)
# E probabilmente 50 sono sufficienti per capire il pattern
\`\`\`

**Pattern ottimale:**

\`\`\`bash
# Inizia small, espandi se serve
claude "Trova primi 10 file che usano axios"
# Se servono più risultati:
claude "Mostra altri 20 file"
\`\`\`

**Risparmio:** $4.50 per search → **$90/mese** se fai 20 ricerche/mese.

#### 9. Be Specific in Requests (Vague = 3x Cost) 🎯

**Problema:** Prompt vago forza Claude Code a esplorare multiple ipotesi (3x costo).

**Soluzione:** Prompt preciso riduce ambiguità:

\`\`\`bash
# ❌ Vago (costoso):
claude "Migliora le performance"
# Claude Code esplora:
# - Database optimization?
# - Frontend rendering?
# - API caching?
# - Network latency?
# Cost: $15 (multiple analisi)

# ✅ Preciso (economico):
claude "Ottimizza query SQL in @services/analytics.ts per ridurre tempo esecuzione da 3s a <500ms. Focus su index e query structure."
# Cost: $5 (analisi mirata)
# Saving: $10 (67% cheaper!)
\`\`\`

**Pattern ottimale:**

\`\`\`bash
# Template preciso:
claude "[AZIONE] [FILE SPECIFICO] per [OBIETTIVO MISURABILE] usando [APPROCCIO]"

# Esempi:
claude "Refactorizza @utils/parser.ts per ridurre complexity da 45 a <15 usando helper functions"
claude "Aggiungi caching a @api/products.ts per ridurre DB queries da 50 a <5 usando Redis"
\`\`\`

**Risparmio:** $10 per richiesta → **$200/mese** se fai 20 richieste vaghe/mese.

#### 10. Use Path Shortcuts (Faster = Cheaper) ⚡

**Problema:** Typing full path ogni volta è lento e verbose.

**Soluzione:** Setup alias nel tuo shell:

\`\`\`bash
# Aggiungi a ~/.bashrc o ~/.zshrc
alias cu='claude @src/utils/'
alias cc='claude @src/components/'
alias cs='claude @src/services/'
alias ct='claude @tests/'

# Uso:
cu "Spiega validator.ts"
# Invece di:
claude "Spiega @src/utils/validator.ts"

# Risparmio tempo = meno token typati = costi ridotti
\`\`\`

**Risparmio:** Indiretto, ma **5-10 min/giorno** risparmiati → più produttività.

#### 11. Create Task Checklists (Finish 40% Faster) ✅

**Problema:** Task multi-step senza checklist = forgotten steps = rework.

**Soluzione:** Chiedi checklist PRIMA di iniziare:

\`\`\`bash
# Invece di:
claude "Implementa user registration con email validation e password hashing e JWT e..."

# Fai:
claude "Crea checklist TODO per implementare user registration completo"

# Claude Code genera:
# ☐ Setup database schema (users table)
# ☐ Create POST /auth/register endpoint
# ☐ Implement email validation (regex)
# ☐ Hash password with bcrypt
# ☐ Generate JWT token
# ☐ Write unit tests
# ☐ Add integration tests
# ☐ Update API documentation

# Poi implement step-by-step:
claude "Implementa step 1: setup database schema"
claude "Implementa step 2: create endpoint"
# etc.

# Nessun forgotten step = zero rework = finish 40% faster
\`\`\`

**Risparmio:** 40% tempo risparmiato → **$120/mese** in productivity.

#### 12. Read Smart (50 Lines $0.01 vs 5000 Lines $1) 📖

**Problema:** Leggere intero file database.ts (5000 righe) costa $1, serve solo 1 funzione.

**Soluzione:** Chiedi esattamente cosa serve:

\`\`\`bash
# ❌ Costoso:
claude "Leggi @db/database.ts"
# 5000 righe, cost $1

# ✅ Economico:
claude "Leggi solo la funzione executeQuery in @db/database.ts"
# 50 righe, cost $0.01
# Saving: $0.99 (99% cheaper!)
\`\`\`

**Pattern ottimale:**

\`\`\`bash
# Specific function
claude "Mostra implementazione di authenticateUser in @services/auth.ts"

# Specific class
claude "Mostra classe UserRepository in @repositories/user.ts"

# Specific section
claude "Mostra exports da @utils/helpers.ts (solo interface)"
\`\`\`

**Risparmio:** $0.99 per file → **$50/mese** se analizzi 50 file/mese.

#### 13. Don't Ask the Same Question Twice (Session Memory is Free) 🧠

**Problema:** Re-run stessa query costa denaro, session memory è gratis.

**Soluzione:** Usa session memory per context:

\`\`\`bash
# ❌ Costoso: re-ask
claude "Quali sono le routes principali?"
# ...later...
claude "Quali sono le routes principali?"  # Stessa query!
# Cost: 2x

# ✅ Economico: use session memory
claude "Quali sono le routes principali?"
# ...later...
claude "Basandoti sulle routes discusse prima, aggiungi middleware di logging"
# Cost: 1x (session memory free)
\`\`\`

**Pattern ottimale:**

\`\`\`bash
# Riferisci conversazione precedente:
claude "Come suggerito prima, implementa caching con quella strategia"
claude "Usando la funzione che hai appena creato, aggiungi error handling"
\`\`\`

**Risparmio:** Evita duplicati → **$30/mese**.

#### 14. Let System Filter First (95% Cheaper) 🔎

**Problema:** Fetch tutti i 10k record poi filter in Claude Code costa $5, filter nel DB costa $0.25.

**Soluzione:** Filter alla source (database, API, filesystem):

\`\`\`bash
# ❌ Costoso: fetch all, filter in Claude
claude "Leggi tutti gli ordini in @data/orders.json e mostra solo quelli >€100"
# Fetch 10,000 ordini, poi filter
# Cost: $5

# ✅ Economico: filter alla source
claude "Esegui query SQL: SELECT * FROM orders WHERE amount > 100"
# Database filtra, ritorna solo 500 match
# Cost: $0.25 (95% cheaper!)
\`\`\`

**Pattern ottimale:**

\`\`\`bash
# Database query con WHERE clause
claude "Query database per utenti registrati ultimi 7 giorni (WHERE created_at > NOW() - INTERVAL 7 DAY)"

# Filesystem search con grep
claude "Cerca solo in file TypeScript (*.ts) per 'export class'"

# API call con query params
claude "Fetch /api/products?category=electronics&inStock=true"
\`\`\`

**Risparmio:** $4.75 per query → **$95/mese** se fai 20 queries/mese.

#### 15. Make These Habits Automatic (Setup Script, Save Forever) 🤖

**Problema:** Ricordarsi di applicare tutte queste ottimizzazioni è tedioso.

**Soluzione:** Automation script che forza best practices:

\`\`\`bash
# Create ~/bin/smart-claude wrapper
cat > ~/bin/smart-claude <<'EOF'
#!/bin/bash

# Funzione helper: suggest cheaper alternative
suggest_optimization() {
  local prompt="$1"

  # Check 1: Large file read without range
  if echo "$prompt" | grep -q "Leggi.*\.ts" && ! echo "$prompt" | grep -q "righe"; then
    echo "💡 Optimization: Specifica range di righe per risparmiare. Esempio: 'Leggi righe 1-100 di...'"
    echo "Continue? (y/n)"
    read -r continue
    [[ "$continue" != "y" ]] && exit 0
  fi

  # Check 2: Search without limit
  if echo "$prompt" | grep -q -i "trova.*tutte" && ! echo "$prompt" | grep -q "primi"; then
    echo "💡 Optimization: Limita risultati per risparmiare. Esempio: 'Trova prime 50...'"
    echo "Continue? (y/n)"
    read -r continue
    [[ "$continue" != "y" ]] && exit 0
  fi

  # Check 3: Using Sonnet for simple task
  if [[ "$MODEL" == "sonnet" ]] && echo "$prompt" | grep -q -E "leggi|spiega|lista"; then
    echo "💡 Optimization: Operazione semplice, Haiku è 5x cheaper. Switch to Haiku? (y/n)"
    read -r switch
    [[ "$switch" == "y" ]] && MODEL="haiku"
  fi
}

# Main logic
MODEL="\${CLAUDE_MODEL:-haiku}"  # Default Haiku
PROMPT="\$*"

suggest_optimization "\$PROMPT"

# Execute
claude --model "\$MODEL" "\$PROMPT"
EOF

chmod +x ~/bin/smart-claude

# Alias nel ~/.bashrc
echo 'alias c="smart-claude"' >> ~/.bashrc
source ~/.bashrc

# Uso:
c "Leggi utils.ts"  # Suggerisce di specificare righe
c "Trova tutte le funzioni"  # Suggerisce di limitare risultati
c "Spiega questo file"  # Suggerisce di usare Haiku invece di Sonnet
\`\`\`

**Benefici:**
- ✅ Automation forza best practices
- ✅ Suggerimenti real-time durante typing
- ✅ Default intelligenti (Haiku per semplice)
- ✅ Risparmio automatico senza pensarci

**Risparmio totale automation:** **$300-500/mese** in optimizations automatiche.

### 8.5 Riepilogo Cost Optimization

**Tabella Risparmio Complessivo:**

| Strategia | Risparmio Mensile | Difficulty | ROI |
|-----------|-------------------|------------|-----|
| 1. Usa Haiku 80% tempo | $80 | Easy | 🔥🔥🔥 |
| 2. Search first, read second | $100 | Easy | 🔥🔥🔥 |
| 3. Read files in chunks | $49 | Easy | 🔥🔥 |
| 4. Run tasks parallel | Productivity +40% | Medium | 🔥🔥 |
| 5. Explore agent | $150 | Easy | 🔥🔥🔥 |
| 6. Plan major changes first | $200 | Medium | 🔥🔥🔥 |
| 7. Budget alerts | Prevents $200-500 overspend | Easy | 🔥🔥🔥 |
| 8. Limit search results | $90 | Easy | 🔥🔥 |
| 9. Be specific in requests | $200 | Medium | 🔥🔥🔥 |
| 10. Path shortcuts | Productivity +10% | Easy | 🔥 |
| 11. Task checklists | $120 (40% faster) | Easy | 🔥🔥 |
| 12. Read smart (specific functions) | $50 | Easy | 🔥🔥 |
| 13. Use session memory | $30 | Easy | 🔥 |
| 14. Filter at source | $95 | Medium | 🔥🔥 |
| 15. Automation script | $300-500 | Hard | 🔥🔥🔥 |

**Risparmio Totale Mensile:** **$1500-2000** se applichi tutte le strategie! 💰

**Quick Wins (Implement Today):**
1. ✅ Switch default model a Haiku (1 min setup)
2. ✅ Use search before read (immediate habit)
3. ✅ Setup budget alerts (5 min script)
4. ✅ Create path shortcuts (2 min aliases)
5. ✅ Be specific in prompts (immediate habit)

**Risparmio Quick Wins:** **$500/mese** con 10 minuti di setup! 🚀

---

## Capitolo 9: Best Practices per Claude 4.x (Sonnet 4.5 & Haiku 4.5)

Benvenuto nell'ultimo capitolo avanzato! 🚀

Hai imparato tutte le tecniche fondamentali di prompt engineering nei capitoli precedenti. Ora è il momento di scoprire le **best practices specifiche per i modelli Claude 4.x**, in particolare **Claude Sonnet 4.5** e **Claude Haiku 4.5**.

**Perché un capitolo dedicato a Claude 4.x?**

I modelli Claude 4.x rappresentano un salto evolutivo significativo rispetto alle generazioni precedenti:
- **Precisione nelle istruzioni**: Seguono le direttive in modo più letterale e accurato
- **Ragionamento a lungo termine**: Capacità eccezionali di tracciamento dello stato su sessioni estese
- **Consapevolezza del contesto**: Comprendono il budget di token rimanente e gestiscono il contesto in modo intelligente
- **Orchestrazione nativa**: Delegano proattivamente a subagenti specializzati quando appropriato
- **Stile comunicativo**: Più conciso, diretto e orientato all'azione

**Cosa imparerai:**
- ✅ Principi generali per Claude 4.x (esplicitezza, contesto, esempi)
- ✅ Ragionamento a lungo termine e tracciamento dello stato
- ✅ Gestione flussi multi-finestra di contesto
- ✅ Controllo verbosità e stile di comunicazione
- ✅ Pattern di utilizzo strumenti (azione vs suggerimento)
- ✅ Controllo formato output e markdown
- ✅ Ricerca agentiva e raccolta informazioni
- ✅ Orchestrazione subagenti
- ✅ Capacità di pensiero esteso (Extended Thinking)
- ✅ Creazione documenti e UI creative
- ✅ Ottimizzazione chiamate parallele
- ✅ Minimizzare allucinazioni nel codice

---

### 9.1 Principi Generali per Claude 4.x

I modelli Claude 4.x rispondono eccezionalmente bene a istruzioni chiare ed esplicite. Tuttavia, la loro precisione richiede alcuni accorgimenti specifici.

#### 9.1.1 Sii Esplicito con le Tue Istruzioni

**Problema comune con Claude 4.x:**
Se vuoi un comportamento "oltre le aspettative", devi **richiederlo esplicitamente**. I modelli precedenti inferivano più aggressivamente; Claude 4.x segue letteralmente le istruzioni.

**Esempio pratico:**

\`\`\`bash prompt-vague
# ❌ Meno efficace (Claude 4.x creerà il minimo necessario)
claude "Crea una dashboard di analisi"
\`\`\`

**Cosa succede:**
- Claude 4.x genera una dashboard base con grafici standard
- Mancano interazioni avanzate, animazioni, stati caricamento
- Layout generico senza personalità

\`\`\`bash prompt-explicit
# ✅ Più efficace (Claude 4.x creerà implementazione ricca)
claude "Crea una dashboard di analisi. Includi il maggior numero possibile di
funzionalità e interazioni rilevanti. Vai oltre le basi per creare
un'implementazione completamente funzionante con:
- Grafici interattivi con drill-down
- Filtri real-time e date pickers
- Export data (CSV, PDF)
- Stati di caricamento e skeleton screens
- Animazioni fluide per transizioni
- Responsive design per mobile e tablet"
\`\`\`

**Cosa succede:**
- ✅ Dashboard completa con tutte le feature richieste
- ✅ Interazioni polished e user experience curata
- ✅ Codice production-ready con error handling

**Regola chiave:**
> Con Claude 4.x, **esplicitare è meglio che implicare**. Se vuoi qualcosa, dichiaralo chiaramente.

#### 9.1.2 Aggiungi Contesto e Motivazione

Spiegare **perché** un comportamento è importante aiuta Claude 4.x a comprendere meglio i tuoi obiettivi e fornire risposte più mirate.

**Esempio: Preferenze di formattazione**

\`\`\`bash prompt-no-context
# ❌ Senza contesto
claude "NON usare mai i puntini di sospensione nel codice generato"
\`\`\`

**Problema:** Claude 4.x seguirà la regola, ma potrebbe non capire il contesto più ampio.

\`\`\`bash prompt-with-context
# ✅ Con contesto e motivazione
claude "La tua risposta sarà letta ad alta voce da un motore di sintesi vocale
per utenti non vedenti, quindi non usare mai i puntini di sospensione (...)
poiché il motore TTS non saprà come pronunciarli. Usa invece frasi complete
con punteggiatura standard."
\`\`\`

**Vantaggio:** Claude 4.x è abbastanza intelligente da **generalizzare dalla spiegazione**:
- ✅ Eviterà anche altri pattern problematici per TTS (emoji complesse, ASCII art)
- ✅ Userà linguaggio chiaro e pronunciabile
- ✅ Strutturerà frasi per lettura fluida

**Casi d'uso comuni:**

**1. Security Requirements**
\`\`\`bash
# ✅ Con motivazione
claude "Implementa validazione input con whitelist strict.
Motivazione: Questa API è esposta pubblicamente e ha subito attacchi SQL injection
nel passato. La validazione deve bloccare QUALSIASI carattere non alphanumerico
per prevenire ulteriori exploit."
\`\`\`

**2. Performance Requirements**
\`\`\`bash
# ✅ Con motivazione
claude "Ottimizza questa query per <100ms di risposta.
Motivazione: Questa query alimenta la dashboard principale vista da 5000+ utenti
simultanei. Ogni 10ms di latenza aggiuntivo costa €500/mese in server scaling."
\`\`\`

**3. Architecture Decisions**
\`\`\`bash
# ✅ Con motivazione
claude "Usa Redis per session storage invece di in-memory.
Motivazione: Stiamo migrando a Kubernetes con auto-scaling, quindi le sessioni
devono essere condivise tra pod. Redis offre persistence e failover,
requisiti critici per la nostra SLA 99.9%."
\`\`\`

#### 9.1.3 Sii Vigile con Esempi e Dettagli

**Verità fondamentale:** Claude 4.x presta **estrema attenzione** ai dettagli e agli esempi.

**Problema:** Se fornisci esempi con comportamenti indesiderati, Claude 4.x potrebbe replicarli pensando che siano intenzionali.

**Esempio: Documentazione API**

\`\`\`bash prompt-bad-example
# ❌ Esempio con comportamento indesiderato
claude "Genera documentazione per endpoint REST seguendo questo esempio:

GET /users
Returns: All users (no pagination)

Ora documenta tutti gli endpoint in @routes/api.js"
\`\`\`

**Problema:** L'esempio mostra "no pagination", quindi Claude 4.x potrebbe:
- ❌ Documentare altri endpoint senza pagination
- ❌ Pensare che pagination non sia importante nel progetto
- ❌ Non menzionare limiti, offset, o cursors negli altri endpoint

\`\`\`bash prompt-good-example
# ✅ Esempio con best practices
claude "Genera documentazione per endpoint REST seguendo questo esempio:

GET /users?limit=50&offset=0
Returns: Paginated list of users (max 100 per page)
Headers: X-Total-Count, Link (prev/next)

Ora documenta tutti gli endpoint in @routes/api.js usando lo stesso livello
di dettaglio: parametri query, limiti, headers, status codes."
\`\`\`

**Vantaggio:**
- ✅ Ogni endpoint documentato includerà pagination
- ✅ Headers e status codes saranno consistenti
- ✅ Best practices replicate in tutta la documentazione

**Regola d'oro:**
> I tuoi esempi sono un **template implicito**. Claude 4.x li seguirà fedelmente.

**Checklist Esempi:**
- ✅ Gli esempi mostrano SOLO comportamenti che vuoi replicare?
- ✅ Includono tutti gli elementi importanti (error handling, edge cases)?
- ✅ Seguono le convenzioni del progetto?
- ✅ Non contengono shortcuts o semplificazioni che non vuoi nel codice finale?

---

### 9.2 Ragionamento a Lungo Termine e Tracciamento dello Stato

Una delle capacità più impressionanti di Claude 4.5 è il **ragionamento a lungo termine** con eccezionale **tracciamento dello stato**.

**Cosa significa:**
- Claude 4.5 mantiene l'orientamento durante sessioni estese (multi-finestra)
- Si concentra su **progresso incrementale** (poche cose alla volta, ben fatte)
- Può salvare stato e continuare da una finestra di contesto nuova senza perdere il filo

**Quando è utile:**
- Refactoring complessi che richiedono ore di lavoro
- Implementazione feature multi-file con testing iterativo
- Debugging session lunghe con ipotesi da verificare
- Progetti che richiedono pianificazione → implementazione → testing → deployment

#### 9.2.1 Consapevolezza del Contesto (Context Awareness)

Claude 4.5 ha una capacità unica: **sa quanto budget di token gli rimane**.

**Cosa significa:**
- Traccia la finestra di contesto rimanente durante la conversazione
- Può decidere autonomamente quando salvare stato prima che il contesto si esaurisca
- Ottimizza il lavoro in base allo spazio disponibile

**Esempio pratico:**

\`\`\`bash
# Claude 4.5 in azione
User: "Refactora l'intero modulo di autenticazione per usare JWT invece di sessions"

Claude: "Okay, questo è un refactoring complesso. Procederò in modo incrementale:
1. Prima creo i test per comportamento corrente (così non perdiamo funzionalità)
2. Implemento JWT auth in parallelo a sessions (backwards compatibility)
3. Migro routes uno alla volta
4. Rimuovo sessions solo quando tutti i test passano

Ho ~180k token rimanenti, quindi posso completare step 1-2 in questa finestra.
Salverò lo stato in progress.md prima di procedere allo step 3."
\`\`\`

**Come sfruttare questa capacità:**

\`\`\`bash prompt-context-aware
# ✅ Prompt per sfruttare context awareness
claude "Questo è un task lungo (refactor completo auth system).

La tua finestra di contesto verrà automaticamente compattata mentre si avvicina
al suo limite, permettendoti di continuare a lavorare indefinitamente.

IMPORTANTE:
- Non interrompere i task in anticipo per preoccupazioni sul budget token
- Man mano che ti avvicini al limite, salva progresso e stato in progress.md
- Sii persistente e autonomo: completa i task completamente
- Non interrompere mai artificialmente nessun task indipendentemente dal contesto rimanente

Procedi con il refactoring sistematicamente."
\`\`\`

**Cosa succede:**
- ✅ Claude 4.5 lavorerà fino a completamento (anche se richiede multiple finestre)
- ✅ Salverà stato automaticamente quando necessario
- ✅ Riprenderà da dove ha lasciato senza perdere contesto

#### 9.2.2 Flussi di Lavoro Multi-Finestra di Contesto

Per task che si estendono su **più finestre di contesto**, segui queste best practices:

**1. Usa un prompt diverso per la prima finestra**

\`\`\`bash prompt-first-window
# ✅ Prima finestra: Setup framework
claude "Questo è un task multi-session: implementare dashboard analytics completa.

PRIMA FINESTRA (setup):
1. Crea suite di test completa (tests.json) per tracciare progresso
2. Setup script di configurazione (init.sh) per:
   - Avviare dev server
   - Eseguire test suite
   - Linting e type checking
3. Crea progress.md per tracciare stato e next steps
4. Pianifica l'implementazione in milestones incrementali

NON iniziare l'implementazione ancora. Focus su framework di qualità della vita."
\`\`\`

**2. Fai scrivere test in formato strutturato**

\`\`\`bash
# ✅ Chiedi test strutturati PRIMA di iniziare
claude "Prima di iniziare l'implementazione, crea tests.json con:
- Lista di tutti i test necessari (functional, integration, e2e)
- Status: not_started | in_progress | passing | failing
- Priority: critical | high | medium | low

IMPORTANTE: È inaccettabile rimuovere o modificare test perché ciò potrebbe
portare a funzionalità mancanti o difettose. I test sono il contratto."
\`\`\`

**Formato tests.json:**
\`\`\`json
{
  "tests": [
    {
      "id": 1,
      "name": "authentication_flow",
      "type": "integration",
      "priority": "critical",
      "status": "passing",
      "file": "tests/auth.test.js"
    },
    {
      "id": 2,
      "name": "user_crud_operations",
      "type": "functional",
      "priority": "high",
      "status": "failing",
      "file": "tests/users.test.js",
      "failing_reason": "Validation error on empty email"
    },
    {
      "id": 3,
      "name": "api_rate_limiting",
      "type": "integration",
      "priority": "medium",
      "status": "not_started",
      "file": "tests/api.test.js"
    }
  ],
  "summary": {
    "total": 25,
    "passing": 18,
    "failing": 2,
    "not_started": 5
  }
}
\`\`\`

**3. Configura strumenti di qualità della vita**

\`\`\`bash
# ✅ Setup script per evitare lavoro ripetuto
claude "Crea init.sh che:
1. Verifica dependencies (npm ci se necessario)
2. Avvia dev server in background
3. Esegue test suite e mostra summary
4. Esegue linter e type checking
5. Mostra git status e log delle ultime 3 commit

Questo script sarà usato all'inizio di ogni nuova finestra di contesto."
\`\`\`

**4. Ricominciare da capo vs Compattazione**

Claude 4.5 è **estremamente efficace** nel scoprire lo stato dal filesystem locale.

**Due approcci:**

**Approccio A: Compattazione** (mantenere storia conversazione)
- Utile quando: Hai fatto decisioni architetturali complesse che vuoi ricordare
- Limite: La compattazione può perdere dettagli sottili

**Approccio B: Fresh start** (finestra nuova, Claude ricostruisce stato da files)
- Utile quando: Hai salvato tutto lo stato in files (progress.md, tests.json, git log)
- Vantaggio: Claude 4.5 ricostruisce contesto perfettamente da filesystem

\`\`\`bash prompt-fresh-start
# ✅ Prompt per fresh start ottimale
claude "Sono di ritorno per continuare il task.

PRIMA DI PROCEDERE:
1. Chiama pwd per confermare working directory
2. Leggi progress.md per capire stato corrente
3. Leggi tests.json per vedere quali test passano/falliscono
4. Esegui git log --oneline -10 per vedere commit recenti
5. Esegui ./init.sh per setup environment e vedere test status
6. Esegui manualmente un test di integrazione fondamentale per verificare funzionalità base

Solo dopo questi check, procedi con l'implementazione delle feature rimanenti."
\`\`\`

**5. Fornisci strumenti di verifica**

Per task autonomi lunghi, Claude ha bisogno di **verificare correttezza** senza feedback umano continuo.

**Strumenti utili:**
- **Playwright MCP server**: Per testare UI interattivamente
- **Computer Use capability**: Per navigare browser e verificare visualmente
- **Test suites automatizzate**: Per validazione continua

\`\`\`bash
# ✅ Setup verifica autonoma
claude "Dopo ogni feature implementata:
1. Esegui test suite completa
2. Usa Playwright per testare user journey end-to-end
3. Verifica visualmente la UI per layout issues
4. Committa solo se tutti i test passano

Se i test falliscono, debugga autonomamente. NON committare codice con test failing."
\`\`\`

**6. Incoraggia utilizzo completo del contesto**

\`\`\`bash prompt-full-context
# ✅ Massimizza efficienza
claude "Questo è un task molto lungo, quindi pianifica chiaramente il tuo lavoro.

È INCORAGGIATO spendere l'intero contesto di output lavorando sul task:
- Completa componenti in modo efficiente prima di procedere
- Lavora sistematicamente fino a completamento
- Assicurati solo di non esaurire il contesto con lavoro significativo non committato

Continua a lavorare sistematicamente fino a quando non hai completato questo task
o ti avvicini al limite del contesto (in quel caso, salva stato e committa)."
\`\`\`

#### 9.2.3 Migliori Pratiche di Gestione dello Stato

**Regola fondamentale:** Separa **dati strutturati** (JSON) da **note narrative** (Markdown).

**Usa formati strutturati per dati di stato:**

\`\`\`json tests.json
{
  "tests": [
    {"id": 1, "name": "auth_flow", "status": "passing"},
    {"id": 2, "name": "user_mgmt", "status": "failing"}
  ],
  "summary": {
    "total": 50,
    "passing": 45,
    "failing": 5
  }
}
\`\`\`

**Usa testo non strutturato per note di progresso:**

\`\`\`markdown progress.md
# Progresso Sessione 3

## Completato
- ✅ Corretta validazione token autenticazione
- ✅ Aggiornato modello utente per gestire edge cases
- ✅ Implementato rate limiting su /api/auth

## Prossimi Step
- 🔄 Investigare fallimenti test user_management (test #2)
- 📋 TODO: Aggiungere logging per audit trail
- 📋 TODO: Documentare nuovi endpoint in OpenAPI spec

## Note Importanti
- NON rimuovere test perché ciò potrebbe portare a funzionalità mancanti
- Il bug di rate limiting era causato da Redis cache key duplicata
- Performance migliorata del 40% dopo ottimizzazione query
\`\`\`

**Usa git per tracciamento dello stato:**

Claude 4.5 si comporta **eccezionalmente bene** con git:
- Legge git log per capire progressione lavoro
- Usa commit messages per ricostruire decision rationale
- Crea checkpoint con commit incrementali

\`\`\`bash
# ✅ Incoraggia uso strategico di git
claude "Committa frequentemente con messaggi descrittivi:
- Ogni feature completata = 1 commit
- Ogni bug fix = 1 commit
- Ogni refactor significativo = 1 commit

Formato commit message:
feat: Add JWT authentication middleware
fix: Resolve race condition in user session cleanup
refactor: Extract payment logic into service layer

Questo permette rollback granulare e facilita il tracking dello stato."
\`\`\`

**Sottolinea progresso incrementale:**

\`\`\`bash
# ✅ Incoraggia focus incrementale
claude "Concentrati su POCHE cose alla volta, ma falle BENE:
- Non iniziare 10 feature contemporaneamente
- Completa 1 feature end-to-end (implementazione + test + docs)
- Solo dopo, passa alla successiva

Progresso incrementale = meno bug, più facile debugging, stato sempre committable."
\`\`\`

---

### 9.3 Stile di Comunicazione

Claude 4.5 ha uno stile di comunicazione **evoluto** rispetto ai modelli precedenti.

**Caratteristiche dello stile Claude 4.5:**
- ✅ **Più diretto e radicato**: Rapporti basati su fatti, non auto-celebrativi
- ✅ **Più conversazionale**: Fluido e colloquiale, meno robotico
- ✅ **Meno verboso**: Salta riassunti dettagliati per efficienza (se non richiesti)

**Esempio comparativo:**

**Claude 3.5 (stile verboso):**
\`\`\`
Ho completato con successo l'implementazione della funzionalità di autenticazione JWT!
Ecco un riepilogo dettagliato di tutto ciò che ho fatto:

1. Ho creato il middleware di autenticazione in src/middleware/auth.js
2. Ho implementato la generazione di token JWT con secret key
3. Ho aggiunto validazione del token con error handling robusto
4. Ho integrato il middleware nelle routes protette
5. Ho scritto test completi per tutti gli scenari

La soluzione implementata segue le best practices di sicurezza...
[continua per 3 paragrafi]
\`\`\`

**Claude 4.5 (stile conciso):**
\`\`\`
Autenticazione JWT implementata:
- Middleware in src/middleware/auth.js
- Token generation + validation con error handling
- Integrato in routes protette
- Test completi (passing)

Prossimo step?
\`\`\`

**Come bilanciare verbosità:**

Se **preferisci più visibilità** nel processo di ragionamento:

\`\`\`bash prompt-verbose
# ✅ Richiedi aggiornamenti espliciti
claude "Implementa autenticazione JWT.

Dopo aver completato un task che coinvolge l'uso di strumenti, fornisci un breve
riassunto del lavoro che hai svolto, includendo:
- File creati/modificati
- Decisioni architetturali significative
- Eventuali trade-off o limitazioni
- Prossimi step suggeriti"
\`\`\`

Se **preferisci efficienza** (azione diretta):

\`\`\`bash prompt-efficient
# ✅ Massima efficienza
claude "Implementa autenticazione JWT.

Focus sull'esecuzione: esegui il lavoro e riporta solo risultati finali e blockers.
Salta riassunti intermedi se non critici."
\`\`\`

---

### 9.4 Pattern di Utilizzo Strumenti (Azione vs Suggerimento)

Claude 4.5 è addestrato per **seguire precisamente le istruzioni**. Questo significa che devi essere esplicito su **cosa vuoi che faccia**.

**Problema comune:**

\`\`\`bash prompt-ambiguous
# ❌ Ambiguo (Claude suggerirà, non agirà)
claude "Puoi suggerire alcuni cambiamenti per migliorare questa funzione?"
\`\`\`

**Cosa succede:**
- Claude 4.5 fornirà **suggerimenti testuali** (lista di modifiche)
- NON implementerà le modifiche direttamente
- Dovrai fare un altro prompt per chiedere l'implementazione

\`\`\`bash prompt-explicit-action
# ✅ Esplicito (Claude agirà)
claude "Cambia questa funzione per migliorarne le prestazioni."
\`\`\`

O:

\`\`\`bash
claude "Fai queste modifiche al flusso di autenticazione."
\`\`\`

**Cosa succede:**
- ✅ Claude 4.5 **implementerà** le modifiche direttamente
- ✅ Userà gli strumenti (Edit, Write) per modificare i file
- ✅ Committa dopo aver completato (se richiesto)

**Rendere Claude più proattivo per impostazione predefinita:**

Se vuoi che Claude 4.5 **agisca sempre** (a meno di non specificare diversamente), aggiungi questo al tuo **CLAUDE.md** (system prompt):

\`\`\`markdown CLAUDE.md
## Behavior: Default to Action

<default_to_action>
Per impostazione predefinita, implementa i cambiamenti piuttosto che solo suggerirli.

Se l'intento dell'utente non è chiaro, deduci l'azione probabile più utile e procedi,
utilizzando gli strumenti per scoprire i dettagli mancanti invece di indovinare.

Prova a dedurre l'intento dell'utente su se una chiamata di strumento
(ad es. modifica o lettura di file) è intesa o meno, e agisci di conseguenza.

Se davvero non sei sicuro, chiedi chiarimento PRIMA di agire.
</default_to_action>
\`\`\`

**Rendere Claude più conservativo:**

Se invece vuoi che Claude 4.5 sia **esitante** e agisca solo su istruzioni esplicite:

\`\`\`markdown CLAUDE.md
## Behavior: Conservative Actions

<do_not_act_before_instructions>
Non saltare nell'implementazione o non modificare i file a meno che non sia
chiaramente istruito di apportare cambiamenti.

Quando l'intento dell'utente è ambiguo, predefinito per:
- Fornire informazioni
- Fare ricerche
- Fornire raccomandazioni

Procedi con modifiche, alterazioni o implementazioni SOLO quando l'utente
le richiede esplicitamente.
</do_not_act_before_instructions>
\`\`\`

---

### 9.5 Controlla il Formato delle Risposte

Claude 4.x tende a usare **markdown formattato** (elenchi puntati, grassetto, intestazioni) per organizzare le risposte. A volte questo può essere eccessivo.

**Strategie per controllare il formato:**

**1. Dì a Claude cosa fare invece di cosa non fare**

\`\`\`bash prompt-negative
# ❌ Meno efficace (istruzione negativa)
claude "Non usare markdown nella tua risposta"
\`\`\`

\`\`\`bash prompt-positive
# ✅ Più efficace (istruzione positiva)
claude "La tua risposta dovrebbe essere composta da paragrafi di prosa che
scorrono dolcemente, usando frasi complete e struttura narrativa."
\`\`\`

**2. Usa indicatori di formato XML**

\`\`\`bash
# ✅ Formato XML per controllo granulare
claude "Analizza questo codice e scrivi un rapporto.

Scrivi le sezioni di prosa della tua risposta in tag <smoothly_flowing_prose_paragraphs>.
Usa blocchi di codice solo per esempi reali di codice."
\`\`\`

**3. Abbina lo stile del tuo prompt all'output desiderato**

Lo stile di formattazione del tuo prompt influenza la risposta di Claude.

\`\`\`bash prompt-with-markdown
# ❌ Prompt con markdown = risposta con markdown
claude "Analizza questo bug e spiega:
- Causa del problema
- Impatto sul sistema
- Soluzione proposta
- Next steps"
\`\`\`

**Risultato:** Claude userà elenchi puntati anche nella risposta.

\`\`\`bash prompt-without-markdown
# ✅ Prompt senza markdown = risposta in prosa
claude "Analizza questo bug e spiega la causa del problema, il suo impatto
sul sistema, la soluzione proposta e i prossimi step. Usa prosa chiara e scorrevole."
\`\`\`

**Risultato:** Claude scriverà paragrafi fluidi senza elenchi puntati.

**4. Prompt dettagliato per minimizzare markdown**

Se vuoi **minimizzare drasticamente** l'uso di markdown:

\`\`\`markdown CLAUDE.md
## Output Style: Minimal Markdown

<avoid_excessive_markdown_and_bullet_points>
Quando scrivi rapporti, documenti, spiegazioni tecniche, analisi o qualsiasi
contenuto di lunga forma, scrivi in prosa chiara e scorrevole usando paragrafi
e frasi complete.

Usa interruzioni di paragrafo standard per l'organizzazione e riserva markdown
principalmente per:
- \\\`codice inline\\\`
- Blocchi di codice (\\\`\\\`\\\`...\\\`\\\`\\\`)
- Intestazioni semplici (###)

Evita di usare **grassetto** e *corsivo*.

NON usare elenchi ordinati (1. ...) o elenchi non ordinati (*) a meno che:
a) Stai presentando elementi veramente discreti dove un formato di elenco è
   la migliore opzione
b) L'utente richiede esplicitamente un elenco o una classifica

Invece di elencare elementi con punti elenco o numeri, incorporali naturalmente
nelle frasi.

Questa guida si applica soprattutto alla scrittura tecnica. Usare prosa invece
di formattazione eccessiva migliorerà la soddisfazione dell'utente.

NON produrre mai una serie di punti elenco eccessivamente brevi.

Il tuo obiettivo è testo leggibile e scorrevole che guida il lettore naturalmente
attraverso le idee piuttosto che frammentare le informazioni in punti isolati.
</avoid_excessive_markdown_and_bullet_points>
\`\`\`

---

### 9.6 Ricerca e Raccolta di Informazioni

Claude 4.5 dimostra **capacità eccezionali** di ricerca agentiva: può trovare e sintetizzare informazioni da più fonti in modo efficace.

**Quando usare ricerca agentiva:**
- Devi capire codice legacy senza documentazione
- Serve analizzare dipendenze e vulnerabilità
- Vuoi confrontare approcci architetturali
- Hai bisogno di raccogliere best practices da più fonti

**Best practices per ricerca ottimale:**

**1. Fornisci criteri di successo chiari**

\`\`\`bash prompt-vague-research
# ❌ Vago
claude "Cerca informazioni su come implementare caching"
\`\`\`

\`\`\`bash prompt-clear-criteria
# ✅ Criteri chiari
claude "Ricerca strategie di caching per dashboard analytics con:

CRITERI DI SUCCESSO:
- Confronto Redis vs in-memory vs materialized views
- Performance: latency <100ms per 10k concurrent users
- Cost: soluzione deve costare <$200/mese
- Scalability: supporto fino a 1M requests/day
- Maintenance: deploy e monitoring semplici

Priorità: Performance > Cost > Maintenance

Fornisci raccomandazione finale con reasoning chiaro."
\`\`\`

**2. Incoraggia verifica della fonte**

\`\`\`bash
# ✅ Verifica multi-fonte
claude "Ricerca best practices per JWT authentication.

IMPORTANTE: Verifica le informazioni su più fonti:
- Documentazione ufficiale (RFC 7519)
- OWASP guidelines
- Implementazioni production-tested (Auth0, Firebase)
- Vulnerabilità note (CVE database)

Se le fonti sono in disaccordo, spiega le differenze e raccomanda l'approccio
più sicuro/aggiornato."
\`\`\`

**3. Per ricerca complessa, usa approccio strutturato**

\`\`\`bash prompt-structured-research
# ✅ Approccio strutturato per ricerca complessa
claude "Ricerca architettura ottimale per microservices deployment.

APPROCCIO STRUTTURATO:
1. Man mano che raccogli dati, sviluppa diverse ipotesi concorrenti:
   - Hypothesis A: Kubernetes + Istio
   - Hypothesis B: AWS ECS + API Gateway
   - Hypothesis C: Docker Swarm + Traefik

2. Traccia i tuoi livelli di confidenza nelle note di progresso:
   - Hypothesis A: 70% confident (pro: scaling, contro: complexity)
   - Hypothesis B: 50% confident (pro: managed service, contro: vendor lock-in)
   - Hypothesis C: 30% confident (pro: semplicity, contro: limited features)

3. Autocritica regolarmente il tuo approccio e piano:
   - Sto esplorando abbastanza alternative?
   - Sto bias verso una soluzione per familiarità?
   - Ho considerato i vincoli del team (skill, budget)?

4. Aggiorna un file di albero di ipotesi (hypothesis-tree.md) per persistere
   le informazioni e fornire trasparenza.

5. Suddividi questo task di ricerca complesso sistematicamente:
   - Week 1: Exploration (raccolta dati, ipotesi iniziali)
   - Week 2: Deep dive (testing POC per top 2 candidati)
   - Week 3: Decision (raccomandazione finale con migration plan)

Procedi con questa ricerca strutturata."
\`\`\`

**Cosa succede:**
- ✅ Claude 4.5 esplorerà sistematicamente tutte le alternative
- ✅ Traccerà confidenza e reasoning per trasparenza
- ✅ Critica iterativamente i risultati per evitare bias
- ✅ Produce una raccomandazione ben ragionata

**Esempio output:**

\`\`\`markdown hypothesis-tree.md
# Microservices Architecture Research

## Hypothesis A: Kubernetes + Istio (70% confident)
**Pros:**
- Industry standard, massive ecosystem
- Auto-scaling, self-healing
- Service mesh for observability

**Cons:**
- High complexity (3-6 months learning curve)
- Ops overhead (need dedicated DevOps engineer)
- Cost: $500-1000/month for managed Kubernetes

**Confidence reasoning:**
Strong technical fit, but team has no K8s experience. Risk of over-engineering.

---

## Hypothesis B: AWS ECS + API Gateway (50% confident)
**Pros:**
- Fully managed (less ops burden)
- Integrates with AWS ecosystem
- Cost-effective for current scale

**Cons:**
- Vendor lock-in (migration difficult)
- Less flexibility than K8s
- Limited service mesh features

**Confidence reasoning:**
Good for MVP and current team skills, but might hit limitations at scale.

---

## Hypothesis C: Docker Swarm + Traefik (30% confident)
**Pros:**
- Simplest to setup and maintain
- Low ops overhead
- Cost: $100-200/month

**Cons:**
- Limited ecosystem and community
- Fewer features than K8s/ECS
- Scaling limitations at 100k+ req/s

**Confidence reasoning:**
Too simple for long-term growth. Not future-proof.

---

## Recommendation: AWS ECS + API Gateway (Start), Kubernetes (Later)
**Rationale:**
- Start with ECS for MVP (3-6 months)
- Gain microservices experience with lower complexity
- Plan migration to K8s when hitting scale (1M+ req/day)
- This staged approach reduces risk and matches team capabilities

**Migration trigger:** When ECS costs exceed $1000/month OR team grows to 5+ engineers
\`\`\`

---

### 9.7 Orchestrazione di Subagenti

Claude 4.5 ha capacità **significativamente migliorate** di orchestrazione nativa di subagenti.

**Cosa significa:**
- Claude 4.5 riconosce autonomamente quando un task trarrebbe beneficio da un subagent specializzato
- Delega proattivamente senza richiedere istruzioni esplicite
- Coordina il lavoro di multiple subagents per task complessi

**Quando Claude 4.5 delega a subagenti:**
- Task richiede competenze specializzate (es. security audit, performance optimization)
- Task trarrebbe beneficio da una finestra di contesto fresca
- Task è indipendente e può essere parallelizzato

**Come sfruttare questa capacità:**

**1. Assicurati che gli strumenti dei subagenti siano ben definiti**

Se stai usando **Claude Code** con subagents configurati in \`.claude/agents/\`, assicurati che le definizioni siano chiare:

\`\`\`yaml .claude/agents/security-auditor.yml
name: security-auditor
description: |
  Specialized security auditor for code review, vulnerability detection,
  and OWASP compliance checking.

  Use this agent when:
  - You need comprehensive security audit
  - Implementing authentication/authorization
  - Reviewing user input handling
  - Checking for common vulnerabilities (SQL injection, XSS, CSRF)

capabilities:
  - Static code analysis for security issues
  - Dependency vulnerability scanning
  - OWASP Top 10 compliance checking
  - Security best practices recommendations
\`\`\`

**2. Lascia che Claude orchestri naturalmente**

\`\`\`bash prompt-natural-orchestration
# ✅ Descrivi il task, Claude 4.5 delegherà se appropriato
claude "Implementa un sistema di autenticazione completo con:
- JWT tokens
- Password hashing (bcrypt)
- Rate limiting
- Session management
- OAuth2 integration (Google, GitHub)

Assicurati che sia production-ready e secure."
\`\`\`

**Cosa succede:**
- Claude 4.5 implementerà le feature base autonomamente
- Delegherà a **security-auditor agent** per audit finale
- Il subagent controllerà:
  - Vulnerabilità comuni (SQL injection, XSS)
  - Password strength requirements
  - Token expiration e refresh logic
  - Rate limiting configuration
- Claude 4.5 integrerà le raccomandazioni del subagent

**3. Regola conservatività se necessario**

Se Claude 4.5 delega **troppo aggressivamente** (rallentando il workflow):

\`\`\`markdown CLAUDE.md
## Subagent Delegation: Conservative

<conservative_subagent_delegation>
Delega ai subagenti solo quando il task trae **chiaramente** beneficio da un
agente separato con una nuova finestra di contesto.

NON delegare se:
- Il task è semplice e puoi completarlo autonomamente
- La delegazione introdurrebbe latency non necessaria
- Il subagent non ha competenze significativamente superiori alle tue per questo task

Delega quando:
- Il task richiede expertise altamente specializzata (es. security audit profondo)
- Serve una finestra di contesto fresca per task complesso
- Il task può essere parallelizzato per efficienza
</conservative_subagent_delegation>
\`\`\`

**Esempio di orchestrazione multi-subagent:**

\`\`\`bash
# ✅ Claude 4.5 orchestrerà multiple subagents in parallelo
claude "Prepara questo progetto per production deployment:

1. Security audit completo
2. Performance optimization (identificare bottleneck)
3. Setup CI/CD pipeline
4. Documentazione completa (README, API docs, deployment guide)

Deadline: 2 giorni. Delegare a subagents dove appropriato per velocizzare."
\`\`\`

**Cosa succede:**
- Claude 4.5 analizza il task e identifica 4 workstream indipendenti
- Delega in parallelo:
  - **security-auditor** → Security audit
  - **performance-optimizer** → Performance profiling
  - **devops-engineer** → CI/CD setup
  - **technical-writer** → Documentation
- Claude 4.5 coordina i risultati e integra tutto il lavoro
- Produce un report finale unificato

---

### 9.8 Autoconoscenza del Modello

Claude 4.5 deve **sapere chi è** per identificarsi correttamente nella tua applicazione.

**Problema comune:**
- Claude potrebbe non sapere quale modello specifico sta utilizzando
- Applicazioni che richiedono stringhe di modello API precise potrebbero ricevere valori errati

**Soluzione: Specifica nel system prompt**

\`\`\`markdown CLAUDE.md
## Model Identity

<model_identity>
L'assistente è Claude, creato da Anthropic.
Il modello attuale è **Claude Sonnet 4.5**.

Quando l'utente chiede "quale modello sei?" o "quale versione di Claude?",
rispondi sempre con: "Sono Claude Sonnet 4.5, il modello più recente di Anthropic."
</model_identity>
\`\`\`

**Per app che richiedono stringhe API specifiche:**

\`\`\`markdown CLAUDE.md
## Model String for API Calls

<model_api_string>
Quando è necessario specificare un modello LLM (es. per chiamate API,
configurazione, o script), usa:

**Default model:** Claude Sonnet 4.5
**API string:** \\\`claude-sonnet-4-5-20250929\\\`

A meno che l'utente non richieda esplicitamente un modello diverso,
predefinito sempre a Claude Sonnet 4.5.

Altri modelli disponibili:
- Claude Haiku 4.5: \\\`claude-haiku-4-5-20250929\\\` (per task semplici, più economico)
- Claude Opus 4.1: \\\`claude-opus-4-1-20250514\\\` (per task creativi complessi)
</model_api_string>
\`\`\`

**Esempio uso:**

\`\`\`bash
# User chiede configurazione API
User: "Setup chiamata API per tradurre testo"

# Claude 4.5 usa la stringa corretta
Claude: "Ecco la configurazione API per traduzione:

\\\`\\\`\\\`javascript
const response = await anthropic.messages.create({
  model: 'claude-sonnet-4-5-20250929',  // ✅ Stringa corretta
  max_tokens: 1024,
  messages: [{
    role: 'user',
    content: 'Traduci questo testo in italiano: ...'
  }]
});
\\\`\\\`\\\`

Sto usando Claude Sonnet 4.5, il modello ottimale per traduzione con
ottimo balance qualità/costo."
\`\`\`

---

### 9.9 Sfrutta le Capacità di Pensiero Esteso (Extended Thinking)

Claude 4.x offre **capacità di pensiero esteso** particolarmente utili per:
- Ragionamento multi-step complesso
- Riflessione dopo l'uso di strumenti
- Debugging con ipotesi multiple
- Decisioni architetturali con trade-off

**Come attivare pensiero esteso:**

\`\`\`bash prompt-extended-thinking
# ✅ Richiedi riflessione esplicita
claude "Dopo aver ricevuto i risultati degli strumenti, rifletti attentamente
sulla loro qualità e determina i passaggi successivi ottimali prima di procedere.

Usa il tuo pensiero esteso per:
1. Analizzare i dati ricevuti
2. Identificare pattern o anomalie
3. Generare ipotesi multiple
4. Valutare pro/contro di ogni approccio
5. Selezionare l'azione ottimale

Solo dopo questa riflessione, intraprendi la migliore azione successiva."
\`\`\`

**Esempio pratico: Debugging complesso**

\`\`\`bash
claude "Debug questo memory leak nel server Node.js.

PROCESSO:
1. Leggi i file rilevanti (@server.js @middleware/*.js)
2. Esegui profiling con \\\`node --inspect\\\`
3. **RIFLETTI**: Analizza i dati del profiler e genera 3-5 ipotesi su dove
   potrebbe essere il leak
4. **RIFLETTI**: Per ogni ipotesi, valuta la probabilità e il modo migliore
   per verificarla
5. Testa l'ipotesi più probabile
6. **RIFLETTI**: I risultati confermano o confutano l'ipotesi? Cosa ho imparato?
7. Itera fino a identificare il leak

Usa pensiero esteso per ragionamento trasparente ad ogni step."
\`\`\`

**Cosa succede:**
- Claude 4.5 espliciterà il suo ragionamento in ogni fase
- Genererà ipotesi multiple e le valuterà sistematicamente
- Imparerà da ogni test e aggiornerà le sue credenze
- Fornirà trasparenza completa sul processo di problem-solving

**Vantaggio:**
- ✅ Debugging più efficace (meno tentativi casuali)
- ✅ Trasparenza sul reasoning (puoi correggere se prende direzione sbagliata)
- ✅ Learning per sessioni future (Claude ricorda pattern che funzionano)

> **Nota:** Per dettagli completi su Extended Thinking, consulta la documentazione ufficiale Anthropic.

---

### 9.10 Creazione di Documenti e UI Creative

Claude 4.5 **eccelle** nella creazione di:
- Presentazioni professionali
- Animazioni e transizioni fluide
- Documenti visivi (infografiche, diagrammi)
- UI creative e distintive

**Performance:**
- Corrisponde o supera Claude Opus 4.1 in creatività visiva
- Output lucido e utilizzabile **al primo tentativo** nella maggior parte dei casi
- Seguire le istruzioni più forte rispetto ai modelli precedenti

**Best practices per risultati eccezionali:**

**1. Fornisci incoraggiamento esplicito per creatività**

\`\`\`bash prompt-creative
# ✅ Incoraggia creatività massima
claude "Crea una presentazione professionale su 'AI in Healthcare'.

IMPORTANTE: Non trattenerti. Dai il massimo. Crea una dimostrazione impressionante
che mostra le capacità di design moderno:
- Layout creativi e asimmetrici (non solo slide centrate generiche)
- Palette di colori sofisticata e distintiva
- Animazioni fluide per transizioni tra slide
- Infografiche e data visualization coinvolgenti
- Tipografia riflessiva con gerarchia chiara

Obiettivo: Questa presentazione deve impressionare un CTO e un board di investitori."
\`\`\`

**2. Specifica direzione estetica e vincoli di design**

\`\`\`bash prompt-design-direction
# ✅ Guida specifica per estetica
claude "Crea una dashboard di analytics per SaaS B2B.

DESIGN DIRECTION:
- **Color palette**: Blu scuro (#1A202C) + Ciano (#00D9FF) con accenti dorati (#F7931E)
- **Typography**: Inter per titoli (font-weight: 600), system font per corpo
- **Layout**: Card-based con ombre sottili (shadow-lg) e border-radius 12px
- **Spacing**: Generoso (padding 24px, gap 16px) per layout pulito
- **Interactions**:
  - Hover states con transform scale(1.02) e transition 200ms
  - Micro-animazioni per chart reveal (stagger delay 100ms)
  - Skeleton screens per loading states

DESIGN PRINCIPLES:
- Gerarchia: Dati critici prominenti (font-size 2xl), dettagli secondari (text-sm)
- Contrasto: Background scuro per ridurre affaticamento visivo
- Equilibrio: Grid asimmetrico (1/3 sidebar, 2/3 content)
- Movimento: Animazioni sottili, non distraenti

Crea implementazione production-ready con questi vincoli."
\`\`\`

**3. Incoraggia diversità di design e estetiche di fusione**

\`\`\`bash prompt-fusion-aesthetics
# ✅ Estetiche di fusione per risultati distintivi
claude "Crea landing page per app di produttività.

FUSION AESTHETICS:
- Combina elementi da diverse fonti:
  - Schema colori ispirato a Stripe (gradiente sottile, professionale)
  - Tipografia in stile Apple (SF Pro, spaziatura generosa, minimalista)
  - Layout asimmetrico in stile Awwwards (coraggioso, non centrato)
  - Micro-interazioni in stile Vercel (fluide, performanti)

Evita:
- ❌ Layout generici centrati con hero section standard
- ❌ Gradienti semplicistici (linear-gradient viola-blu)
- ❌ Stile uniforme e prevedibile

Obiettivo: Design che si distingue, memorabile, che fa dire 'wow' agli utenti."
\`\`\`

**4. Richiedi funzionalità specifiche esplicitamente**

\`\`\`bash prompt-feature-rich
# ✅ Richiedi feature specifiche
claude "Crea un task manager interattivo.

FEATURE REQUIREMENTS:
- ✅ Drag-and-drop per riordinare task (usa react-beautiful-dnd)
- ✅ Inline editing (double-click su task per editare)
- ✅ Filtri real-time (All / Active / Completed) con transizioni animate
- ✅ Date picker integrato (usa react-datepicker)
- ✅ Tag colorati con autocomplete
- ✅ Statistiche dashboard (task completed today/week/month)
- ✅ Dark mode toggle con transizione smooth
- ✅ Export data (JSON, CSV)
- ✅ Keyboard shortcuts (Cmd+K command palette)
- ✅ Undo/Redo con Cmd+Z / Cmd+Shift+Z

Includi il maggior numero possibile di funzionalità e interazioni rilevanti.
Vai oltre le basi per creare un'implementazione completamente funzionante."
\`\`\`

**Esempio output: Claude 4.5 genera UI impressionante**

\`\`\`jsx TaskManager.jsx
import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DatePicker from 'react-datepicker';
import { motion, AnimatePresence } from 'framer-motion';

export default function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [darkMode, setDarkMode] = useState(false);
  const [showCommandPalette, setShowCommandPalette] = useState(false);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.metaKey && e.key === 'k') {
        e.preventDefault();
        setShowCommandPalette(true);
      }
      // Undo/Redo logic...
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // ... implementazione completa con tutte le feature richieste
}
\`\`\`

**Risultato:**
- ✅ UI distintiva e memorabile
- ✅ Tutte le feature richieste implementate
- ✅ Animazioni fluide e micro-interazioni
- ✅ Codice production-ready con error handling
- ✅ Responsive design per mobile/tablet/desktop

---

### 9.11 Ottimizza le Chiamate di Strumenti Parallele

Claude 4.x **eccelle** nell'esecuzione parallela di strumenti, con Sonnet 4.5 particolarmente aggressivo nel lanciare più operazioni contemporaneamente.

**Comportamento di default:**
- ✅ Esegue più ricerche speculative durante la ricerca
- ✅ Legge più file contemporaneamente per costruire contesto più velocemente
- ✅ Esegue comandi bash in parallelo (attenzione: può creare bottleneck sistema)

**Questo comportamento è facilmente steerable.**

**Per massimizzare efficienza parallela (~100% successo rate):**

\`\`\`markdown CLAUDE.md
## Tool Usage: Parallel Execution

<use_parallel_tool_calls>
Se intendi chiamare più strumenti e non ci sono dipendenze tra le chiamate,
fai tutte le chiamate di strumenti indipendenti **in parallelo**.

Dai priorità alle chiamate di strumenti simultanee ogni volta che le azioni
possono essere eseguite in parallelo piuttosto che sequenzialmente.

**Esempi:**
- Leggere 3 file → 3 chiamate Read in parallelo
- Cercare 5 pattern diversi → 5 chiamate Grep in parallelo
- Eseguire test suite + lint + type check → 3 comandi bash in parallelo

**IMPORTANTE:** Se alcune chiamate dipendono da risultati di chiamate precedenti
per informare parametri, NON chiamare questi strumenti in parallelo.
Chiamali sequenzialmente.

**MAI** usare segnaposti o indovinare parametri mancanti nelle chiamate di strumenti.

Massimizza l'uso di chiamate di strumenti parallele dove possibile per
aumentare velocità ed efficienza.
</use_parallel_tool_calls>
\`\`\`

**Esempio pratico:**

\`\`\`bash
# ✅ Claude 4.5 eseguirà in parallelo
claude "Analizza la codebase:
1. Leggi @src/api/routes.js @src/api/middleware.js @src/api/controllers.js
2. Cerca pattern TODO in tutti i file TypeScript
3. Esegui npm test e npm run lint"
\`\`\`

**Cosa succede:**
- Claude 4.5 lancia **3 Read** in parallelo per i file
- Lancia **1 Grep** per cercare TODO
- Lancia **2 Bash** in parallelo (test + lint)
- Totale: ~2-3 secondi invece di 10-15 secondi (se sequenziale)

**Per ridurre aggressività parallela:**

Se Claude 4.5 sta sovraccaricando il sistema (es. 10 comandi bash contemporaneamente):

\`\`\`markdown CLAUDE.md
## Tool Usage: Sequential for Stability

<reduce_parallel_execution>
Esegui le operazioni **sequenzialmente** con brevi pause tra ogni passaggio
per garantire stabilità del sistema.

Esegui in parallelo SOLO quando:
- Le operazioni sono veramente indipendenti
- Non c'è rischio di overload sistema (max 3 bash commands in parallelo)
- File reads sono su file piccoli (<1000 righe)

Per operazioni pesanti (build, test suite, database migrations),
esegui sempre sequenzialmente.
</reduce_parallel_execution>
\`\`\`

---

### 9.12 Riduci Creazione di File nella Codifica Agentiva

Claude 4.x potrebbe a volte creare **file temporanei** per scopi di test e iterazione, specialmente quando lavora con codice complesso.

**Perché lo fa:**
- Usa script Python come "blocco note temporaneo" per esplorare soluzioni
- Crea file di test per verificare ipotesi prima di implementare
- Genera dati mock per testare edge cases

**Quando è utile:**
- ✅ Testing di algoritmi complessi (sorting, parsing, compression)
- ✅ Data exploration (CSV parsing, JSON transformation)
- ✅ Prototipazione rapida prima di implementazione finale

**Quando è un problema:**
- ❌ Repository si riempie di file temporanei non tracciati
- ❌ Confusione tra file "working" e file "final"
- ❌ Cleanup manuale necessario dopo ogni sessione

**Come minimizzare creazione file:**

\`\`\`markdown CLAUDE.md
## File Management: Clean Up Temporary Files

<cleanup_temporary_files>
Se crei file temporanei, script helper, o file di test per iterazione,
**pulisci questi file** rimuovendoli alla fine del task.

**File temporanei comuni:**
- test_*.py (script Python di esplorazione)
- temp_*.js (test file)
- scratch.md (note temporanee)
- output_*.json (dati generati per testing)

**Workflow:**
1. Crea file temporanei se necessario per iterazione
2. Usa questi file per testare e validare approccio
3. Implementa soluzione finale nei file appropriati
4. **RIMUOVI** file temporanei prima di committare

**Eccezioni (non rimuovere):**
- File di test ufficiali (tests/*.test.js)
- File di configurazione (*.config.js)
- Documentation (*.md se parte del progetto)
</cleanup_temporary_files>
\`\`\`

**Esempio:**

\`\`\`bash
# Claude 4.5 workflow
User: "Implementa algoritmo di sorting custom per prodotti"

Claude:
1. Crea temp_sorting.py per esplorare algoritmo
2. Testa con dati mock
3. Implementa sorting in @src/utils/sorting.js
4. Testa con test ufficiali
5. **Rimuove temp_sorting.py** ✅
6. Committa solo @src/utils/sorting.js e test
\`\`\`

---

### 9.13 Migliora Generazione Codice Visivo e Frontend

Claude 4.x può generare **UI di alta qualità**, visivamente distintive e funzionali. Tuttavia, senza guida, il codice frontend può predefinito a **modelli generici** che mancano di interesse visivo.

**Problema comune:**
- Layout centrati generici
- Gradienti semplicistici (linear-gradient viola-blu)
- Card bianche con shadow-sm standard
- Mancanza di personalità e creatività

**Soluzione: Guida esplicita per risultati UI eccezionali**

Abbiamo già coperto questo nella sezione 9.10, ma ecco un recap con focus specifico su frontend:

**1. Incoraggiamento esplicito per creatività**

\`\`\`bash
claude "Crea dashboard analytics.

Non trattenerti. Dai il massimo. Crea una dimostrazione impressionante
che mostra le capacità di sviluppo web moderno."
\`\`\`

**2. Direzione estetica specifica**

\`\`\`bash
claude "Usa palette blu scuro + ciano, tipografia sans-serif moderna
(Inter per titoli, system font per corpo), layout card-based con ombre sottili.
Includi hover states, transizioni, micro-interazioni."
\`\`\`

**3. Diversità di design**

\`\`\`bash
claude "Fornisci più opzioni di design. Crea estetiche di fusione combinando
elementi da diverse fonti: schema colori da fonte A, tipografia da fonte B,
layout da fonte C. Evita layout generici centrati."
\`\`\`

**4. Feature richieste esplicitamente**

\`\`\`bash
claude "Includi il maggior numero possibile di funzionalità e interazioni
rilevanti. Aggiungi animazioni e elementi interattivi. Crea implementazione
completamente funzionante oltre le basi."
\`\`\`

---

### 9.14 Evita Concentrarsi sul Passaggio dei Test (Test Hard-Coding)

Claude 4.x a volte può concentrarsi **troppo pesantemente** sul far passare i test a scapito di soluzioni più generali.

**Problema:**
- Codifica valori hard-coded che funzionano solo per input di test specifici
- Usa workaround invece di implementare logica reale
- Crea script helper per refactoring complesso invece di usare strumenti standard

**Esempio problema:**

\`\`\`javascript
// ❌ Hard-coded per far passare test
function calculateDiscount(user) {
  // Test input: user.id = 123
  if (user.id === 123) return 0.15;  // Hardcoded!
  return 0;
}
\`\`\`

**Soluzione: Implementazione generale e robusta**

\`\`\`markdown CLAUDE.md
## Code Quality: General Solutions, Not Test-Specific

<no_hardcoded_test_solutions>
Scrivi una soluzione di **alta qualità e di uso generale** utilizzando
gli strumenti standard disponibili.

**NON:**
- ❌ Creare script helper o workaround per completare il task più velocemente
- ❌ Codificare valori hard-coded che funzionano solo per input di test specifici
- ❌ Implementare soluzioni che passano i test ma falliscono per input reali

**INVECE:**
- ✅ Implementa la logica effettiva che risolve il problema in generale
- ✅ Usa strumenti standard direttamente (Edit, Write, Bash)
- ✅ Crea una soluzione che funziona per **tutti gli input validi**, non solo test cases

**I test sono per verificare correttezza, non per definire la soluzione.**

Se un test è errato o un task è irragionevole, **informami** piuttosto che
aggirare il problema con workaround.

La soluzione deve essere:
- Robusta (gestisce edge cases)
- Mantenibile (codice chiaro, non clever tricks)
- Estensibile (facile aggiungere features)
- Production-ready (error handling, logging, performance)
</no_hardcoded_test_solutions>
\`\`\`

**Esempio corretto:**

\`\`\`javascript
// ✅ Implementazione generale
function calculateDiscount(user) {
  // Business logic reale
  if (user.tier === 'premium' && user.lifetimeSpend > 500) {
    return 0.15;  // 15% discount
  }
  if (user.tier === 'gold') {
    return 0.10;  // 10% discount
  }
  return 0;  // No discount
}
\`\`\`

---

### 9.15 Minimizzare Allucinazioni nella Codifica Agentiva

Claude 4.x è **meno soggetto ad allucinazioni** rispetto ai modelli precedenti: fornisce risposte più accurate, radicate e intelligenti basate sul codice.

**Tuttavia**, puoi **incoraggiare ulteriormente** questo comportamento per minimizzare completamente le allucinazioni.

**Problema comune:**
- Claude risponde a domande su codice **senza leggere i file**
- Specola su implementazioni invece di investigare
- Fa affermazioni basate su assunzioni invece di fatti

**Soluzione: Enforce Investigation Before Answering**

\`\`\`markdown CLAUDE.md
## Code Analysis: Investigate Before Answering

<investigate_before_answering>
**NON speculare mai su codice che non hai aperto.**

Se l'utente fa riferimento a un file specifico, **DEVI leggere il file PRIMA
di rispondere**.

**Workflow obbligatorio:**
1. User chiede: "Come funziona la funzione getUserData in api.js?"
2. TU: Usa Read tool per aprire @src/api.js
3. TU: Analizza il codice effettivo
4. TU: Fornisci risposta radicata basata su codice reale

**MAI:**
- ❌ Rispondere senza investigare ("Probabilmente usa fetch per chiamare API...")
- ❌ Fare assunzioni su architettura senza leggere i file
- ❌ Suggerire modifiche senza vedere implementazione corrente

**SEMPRE:**
- ✅ Investigare e leggere file rilevanti PRIMA di rispondere
- ✅ Basare risposte su fatti dal codice, non speculazioni
- ✅ Se non sei sicuro, **LEGGI IL CODICE** invece di indovinare

Fornisci risposte radicate e prive di allucinazioni.
</investigate_before_answering>
\`\`\`

**Esempio workflow:**

\`\`\`bash
User: "Perché la validazione email fallisce in user registration?"

# ❌ Claude 4.x senza guida (potrebbe speculare)
Claude: "Probabilmente manca un regex per validare formato email.
Prova ad aggiungere /^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$/..."

# ✅ Claude 4.5 con investigate_before_answering
Claude: "Leggo i file rilevanti per capire il problema..."
*Read @src/validators/userValidator.js*
*Read @src/models/User.js*

Claude: "Ho investigato il codice. Il problema è in userValidator.js linea 23:

\\\`\\\`\\\`javascript
// PROBLEMA: regex troppo strict, rifiuta email con subdomain
const emailRegex = /^[\\w]+@[\\w]+\\.[a-z]{2,3}$/;
\\\`\\\`\\\`

Questo regex rifiuta email valide come:
- john.doe@example.com (punto nel local part)
- user@mail.company.co.uk (subdomain multi-level)

Fix: usa regex più permissivo che segue RFC 5322..."
\`\`\`

**Vantaggio:**
- ✅ Risposte accurate basate su codice reale
- ✅ Zero allucinazioni (tutto è verificabile)
- ✅ Fix mirati invece di suggerimenti generici

---

### 9.16 Considerazioni sulla Migrazione a Claude 4.5

Se stai **migrando** da Claude 3.x o Opus 4 a Claude 4.5, considera questi accorgimenti:

**1. Sii specifico sul comportamento desiderato**

Claude 4.5 segue istruzioni **più letteralmente**. Se prima dicevi "migliora questa funzione" e Claude inferiva cosa migliorare, ora devi essere esplicito:

\`\`\`bash
# Prima (Claude 3.x inferiva)
claude "Migliora questa funzione"

# Ora (Claude 4.5 richiede specificità)
claude "Migliora questa funzione:
- Riduci complessità ciclomatica (target <10)
- Aggiungi error handling per edge cases
- Ottimizza performance (target <100ms)
- Aggiungi TypeScript types"
\`\`\`

**2. Inquadra le istruzioni con modificatori**

Aggiungere **modificatori** che incoraggiano Claude ad aumentare qualità e dettaglio:

\`\`\`bash
# ❌ Senza modificatori
claude "Crea una dashboard di analisi"

# ✅ Con modificatori
claude "Crea una dashboard di analisi. Includi il maggior numero possibile di
funzionalità e interazioni rilevanti. Vai oltre le basi per creare
un'implementazione completamente funzionante."
\`\`\`

**3. Richiedi funzionalità specifiche esplicitamente**

Animazioni, interazioni, stati di caricamento - tutto deve essere **richiesto esplicitamente**:

\`\`\`bash
# ✅ Feature list esplicita
claude "Crea dashboard con:
- Animazioni fluide per transizioni
- Stati di caricamento (skeleton screens)
- Filtri real-time con debouncing
- Export data (CSV, PDF)
- Dark mode toggle
- Responsive design mobile-first"
\`\`\`

**4. Aggiorna il tuo CLAUDE.md**

Se hai un CLAUDE.md esistente, aggiorna con le best practices Claude 4.5:
- Aggiungi \`<default_to_action>\` se vuoi comportamento proattivo
- Aggiungi \`<use_parallel_tool_calls>\` per massima efficienza
- Aggiungi \`<investigate_before_answering>\` per zero allucinazioni
- Specifica model identity: "Claude Sonnet 4.5"

---

### 9.17 Riepilogo: Best Practices Claude 4.x

**Principi fondamentali:**
1. ✅ **Sii esplicito** - Claude 4.x segue letteralmente le istruzioni
2. ✅ **Aggiungi contesto** - Spiega perché un comportamento è importante
3. ✅ **Esempi curati** - Claude replica fedelmente i pattern che mostri
4. ✅ **Ragionamento incrementale** - Focus su poche cose alla volta, ben fatte
5. ✅ **Tracciamento stato** - Usa JSON per dati strutturati, Markdown per note, Git per storia
6. ✅ **Consapevolezza contesto** - Sfrutta context awareness per task lunghi
7. ✅ **Flussi multi-finestra** - Setup framework → Iterazione → Testing → Deployment
8. ✅ **Stile comunicativo** - Controlla verbosità esplicitamente se necessario
9. ✅ **Tool usage esplicito** - "Implementa" invece di "Puoi suggerire"
10. ✅ **Formato output** - Guida markdown con prompt positivi e XML tags
11. ✅ **Ricerca strutturata** - Ipotesi concorrenti, confidenza tracking, autocritica
12. ✅ **Orchestrazione subagenti** - Lascia delegare naturalmente, regola se troppo aggressivo
13. ✅ **Model identity** - Specifica "Claude Sonnet 4.5" nel system prompt
14. ✅ **Extended thinking** - Richiedi riflessione esplicita per ragionamento complesso
15. ✅ **UI creative** - Incoraggia creatività, specifica direzione estetica, richiedi feature
16. ✅ **Parallel tool calls** - Massimizza efficienza con chiamate simultanee
17. ✅ **Cleanup files** - Rimuovi file temporanei dopo iterazione
18. ✅ **General solutions** - Evita hard-coding per test, implementa logica reale
19. ✅ **Investigate first** - Leggi codice prima di rispondere, zero speculazioni

**Prompt template universal per Claude 4.5:**

\`\`\`bash
claude "[DESCRIZIONE TASK SPECIFICA]

[CONTESTO E MOTIVAZIONE]

[REQUIREMENTS ESPLICITI]
- Technical: [specifiche tecniche precise]
- Business: [logica business dettagliata]
- Integration: [integration points e dependencies]
- Quality: [standard qualità, performance, security]

[COMPORTAMENTO ATTESO]
- [Azione 1]: [descrizione specifica]
- [Azione 2]: [descrizione specifica]

[CONSTRAINTS]
- [Vincolo 1]: [dettaglio]
- [Vincolo 2]: [dettaglio]

[SUCCESS CRITERIA]
- ✅ [Criterio 1]
- ✅ [Criterio 2]

Vai oltre le basi per creare un'implementazione completamente funzionante."
\`\`\`

---

## Capitolo 10: Riepilogo e Best Practices

Complimenti! Hai padroneggiato le tecniche avanzate di prompting. 🎓

### 10.1 Recap Tecniche Apprese

**1. Precisione Strategica (Capitolo 1)**
- ✅ Sii preciso per: technical requirements, business logic, integration points, performance
- ✅ Claude Code inferisce: formatting, naming (se consistent), basic types

**2. Context-Aware Prompting (Capitolo 2)**
- ✅ Sfrutta contesto implicito (pattern progetto, librerie)
- ✅ Usa @ notation per reference espliciti quando serve
- ✅ Costruisci contextual chains (Analysis → Implementation → Extension) per task complessi

**3. Pattern Collaudati (Capitolo 3)**
- ✅ **Feature Request**: Business + Technical + Integration + Success + Quality
- ✅ **Debugging**: Symptom + Expected + Context + Tried + Files
- ✅ **Refactoring**: Current + Desired + Constraints + Scope
- ✅ **Learning**: What + Current Understanding + Questions + Goal

**4. Evita Pitfall (Capitolo 4)**
- ✅ **Ambiguity**: Usa baseline misurabili, non termini relativi ("più veloce")
- ✅ **Overload**: Spezza in step, prioritizza must-have vs nice-to-have
- ✅ **Missing Constraints**: Specifica limiti tecnici, sicurezza, performance, costi
- ✅ **Ignoring Conventions**: Riferisci standard progetto, pattern esistenti

**5. Meta-Prompting (Capitolo 5)**
- ✅ Usa per decisioni architetturali e trade-off complessi
- ✅ Chiedi analisi → alternative → raccomandazione → reasoning
- ✅ Implementa dopo consenso

**6. Plan Mode (Capitolo 6)**
- ✅ Shift + Tab twice per attivare
- ✅ Per multi-file refactoring, architecture decisions, complex migrations
- ✅ Analizza → Ricerca → Crea piano → Presenta per review

**7. Thinking Mode (Capitolo 6)**
- ✅ Trigger phrases: "Ultra think:", "Think deeply:", etc.
- ✅ Per complex debugging, algorithm optimization, security analysis
- ✅ Ragionamento esteso con multiple ipotesi

### 10.2 Decision Matrix: Quale Tecnica Usare?

| Scenario | Tecnica Consigliata | Esempio |
|----------|---------------------|---------|
| Feature semplice | Conversational + Precisione | "Add endpoint GET /api/users with pagination (limit, offset)" |
| Feature complessa | Structured Feature Pattern | Business + Technical + Integration + Success + Quality |
| Bug oscuro | Debugging Pattern + Thinking Mode | Symptom + Expected + Context + Tried + Files + "Ultra think:" |
| Refactor multi-file | Refactoring Pattern + Plan Mode | Current + Desired + Constraints + Scope + [Shift+Tab twice] |
| Task multi-step | Contextual Chain | Analysis → Implementation → Extension |
| Decisione architetturale | Meta-Prompting | Analyze → Alternatives → Recommend → Reasoning |
| Imparare codebase | Learning Pattern | What + Understanding + Questions + Goal |
| Migration complessa | Plan Mode + Thinking Mode | Plan Mode per roadmap, Thinking Mode per edge cases |
| Optimization algoritmo | Thinking Mode | "Think deeply:" + constraints + current complexity |

### 10.3 Checklist Prima di Inviare Prompt

**Prima di premere Enter, verifica:**

- [ ] **Intent chiaro?** Claude Code capisce cosa vuoi ottenere?
- [ ] **Context sufficiente?** Technical stack, file coinvolti, pattern da seguire?
- [ ] **Outcome definito?** Success criteria misurabili e verificabili?
- [ ] **Vincoli espliciti?** Performance, security, budget, constraints?
- [ ] **Priorità chiare?** Must-have vs nice-to-have separati?
- [ ] **Pattern appropriato?** Feature/Debug/Refactor/Learning/Meta?
- [ ] **Modalità giusta?** Normal/Plan Mode/Thinking Mode per il task?
- [ ] **Reference espliciti?** @ notation per file non ovvi?
- [ ] **Conventions menzionate?** Standard progetto, architectural decisions?

### 10.4 Prossimi Passi

**Pratica questi pattern nelle prossime milestones:**

- **Milestone 8**: Model Context Protocol - userai meta-prompting per scegliere MCP servers
- **Milestone 9**: Hooks & Extension Points - pattern feature request per custom hooks
- **Milestone 10**: Claude Code SDK - contextual chains per automation scripts
- **Milestone 11**: CI/CD Integration - debugging pattern per pipeline failures
- **Milestone 12**: Team Workflows - tutti i pattern in contesto team collaboration

### 10.5 Mantra del Prompt Expert

> **"Precisione nei dettagli, contesto per coerenza, pattern per efficienza, meta-thinking per decisioni."**

**Ricorda:**

1. **Un buon prompt risparmia 10 iterazioni** 🚀
2. **Contesto implicito è potente, ma esplicito è sicuro** 📍
3. **Pattern accelerano, non limitano la creatività** 🎯
4. **Meta-prompting per decisioni, direct prompting per esecuzione** 🧠
5. **Ogni prompt è documentazione per il futuro te (e il team)** 📝

Congratulazioni! Sei ora un **Prompt Engineering Expert** per Claude Code. 🎓✨
  `,
  xp: 250,
  badge: "🎓 Prompt Expert",
  estimatedTime: "1h 30min",
  topics: [
    "Precisione strategica nei prompt",
    "Context-aware prompting",
    "Contextual chaining per task complessi",
    "Feature Request Pattern",
    "Debugging Pattern",
    "Refactoring Pattern",
    "Learning Pattern",
    "Pitfall: Ambiguous Requirements",
    "Pitfall: Information Overload",
    "Pitfall: Missing Constraints",
    "Pitfall: Ignoring Conventions",
    "Meta-prompting per decisioni architetturali",
    "Plan Mode: Modalità architetto proattivo",
    "Thinking Mode: Ragionamento profondo",
    "Combinare modalità per massimo impatto",
    "Cost Optimization: 15 strategie per ridurre costi 90%",
    "Smart Tool Usage (Haiku vs Sonnet)",
    "Search first, read second (100x cheaper)",
    "Read files in chunks",
    "Exploration con subagents",
    "Plan major changes first",
    "Budget alerts e monitoring",
    "Query optimization strategies",
    "Automation script per cost optimization",
    "Best Practices Claude 4.x (Sonnet 4.5 & Haiku 4.5)",
    "Principi generali: esplicitezza, contesto, esempi",
    "Ragionamento a lungo termine e tracciamento stato",
    "Context awareness e flussi multi-finestra",
    "Stile comunicativo Claude 4.5",
    "Pattern utilizzo strumenti (azione vs suggerimento)",
    "Controllo formato risposte e markdown",
    "Ricerca agentiva strutturata",
    "Orchestrazione subagenti nativa",
    "Autoconoscenza modello e API strings",
    "Extended Thinking per ragionamento complesso",
    "Creazione documenti e UI creative",
    "Ottimizzazione chiamate parallele",
    "Gestione file temporanei",
    "Generazione codice frontend distintivo",
    "Evitare test hard-coding",
    "Minimizzare allucinazioni nel codice",
    "Migrazione da Claude 3.x a Claude 4.5"
  ],
  quiz: {
    questions: [
      {
        id: "m7-q1",
        question: "Qual è la differenza tra precisione e verbosità in un prompt?",
        options: [
          "Precisione significa scrivere prompt lunghi, verbosità significa scrivere prompt corti",
          "Precisione è specificità nei punti critici, verbosità è aggiungere dettagli inutili",
          "Non c'è differenza, sono sinonimi",
          "Precisione riguarda il codice, verbosità riguarda la documentazione"
        ],
        correctAnswer: 1,
        explanation: "**Precisione ≠ Verbosità**. Un prompt preciso è **specifico nei punti critici** (technical requirements, business logic, integration points, performance), mentre può essere conciso altrove. La verbosità aggiunge dettagli che Claude Code può inferire dal contesto del progetto."
      },
      {
        id: "m7-q2",
        question: "Quando dovresti usare reference espliciti con @ notation?",
        options: [
          "Sempre, per ogni file menzionato nel prompt",
          "Mai, Claude Code trova automaticamente tutti i file",
          "Quando file non è ovvio dal contesto, serve vedere implementazione corrente, o c'è multi-file coordination",
          "Solo per file più grandi di 300 righe"
        ],
        correctAnswer: 2,
        explanation: "Usa **@ notation** quando: 1) File non è ovvio dal contesto, 2) Serve vedere implementazione corrente, 3) C'è coordinazione multi-file, 4) Pattern da replicare. Non serve per file già menzionati in conversazione, pattern generali, o file standard (README, package.json)."
      },
      {
        id: "m7-q3",
        question: "Cos'è il contextual chaining e perché è preferibile a un mega-prompt monolitico?",
        options: [
          "È concatenare comandi bash con && per eseguirli sequenzialmente",
          "È spezzare task complessi in step sequenziali (Analysis → Implementation → Extension) per ragionamento incrementale",
          "È linkare file TypeScript con import/export",
          "È creare catene di middleware in Express"
        ],
        correctAnswer: 1,
        explanation: "**Contextual chaining** è spezzare task complessi in step sequenziali. Vantaggi: Claude Code ragiona step-by-step, puoi correggere direzione dopo ogni step, testing incrementale, shared understanding progressivo. Preferibile a mega-prompt perché evita ambiguità e permette rollback se uno step fallisce."
      },
      {
        id: "m7-q4",
        question: "Quale di questi è un esempio del pitfall 'Missing Constraints'?",
        options: [
          "claude 'Aggiungi file upload per documenti utente' (senza specificare max size, formati accettati, storage location)",
          "claude 'Crea componente Button' (senza specificare colori)",
          "claude 'Aggiungi logging' (senza specificare il formato)",
          "Tutte le precedenti"
        ],
        correctAnswer: 0,
        explanation: "Il pitfall **Missing Constraints** genera soluzioni tecnicamente corrette ma inutilizzabili. L'esempio 'file upload' manca: max size (DoS risk), formati accettati (security), storage location (scalability), auth requirements, virus scanning. Claude Code potrebbe generare upload illimitato, salvataggio locale, nessuna validazione - tutti problemi gravi in produzione."
      },
      {
        id: "m7-q5",
        question: "Quale pattern useresti per questo scenario: 'Devo capire come funziona il sistema di permissions del progetto per implementare una nuova feature che richiede role specifico'?",
        options: [
          "Feature Request Pattern",
          "Debugging Pattern",
          "Refactoring Pattern",
          "Learning Pattern"
        ],
        correctAnswer: 3,
        explanation: "Usa il **Learning Pattern** quando devi capire codice esistente prima di implementare. Template: What to Learn + Current Understanding + Specific Questions + Learning Goal. Nel tuo caso: vuoi capire RBAC system (what), sai che esiste middleware auth (understanding), chiedi come verificare permissions (questions), per implementare analytics dashboard (goal)."
      },
      {
        id: "m7-q6",
        question: "Quando è appropriato usare Meta-Prompting invece di chiedere direttamente l'implementazione?",
        options: [
          "Sempre, per ogni prompt per ottenere la migliore risposta",
          "Mai, è solo una perdita di tempo",
          "Per decisioni architetturali, trade-off complessi, e scelte di scaling strategy",
          "Solo quando non sai cosa vuoi"
        ],
        correctAnswer: 2,
        explanation: "**Meta-prompting** è ideale per: decisioni architetturali (microservices vs monolith?), trade-off complessi (performance vs consistency?), technical debt decisions, scaling strategies. Chiedi a Claude Code di analizzare → proporre alternative → raccomandare → spiegare reasoning. NON serve per task semplici, bug evidenti, o pattern standardizzati."
      },
      {
        id: "m7-q7",
        question: "Quale di questi prompt segue meglio il Debugging Pattern?",
        options: [
          "claude 'Il checkout non funziona, fixa'",
          "claude 'Checkout è lento'",
          "claude 'Debug timeout checkout: Symptom (504 dopo 30s, 20% volte random), Expected (<5s completion), Context (post deploy v3.2.0, prod only, spike 2000 checkout/h), Tried (verificato Stripe status, aumentato nginx timeout, sospetto inventory API), Files @routes/checkout.ts @services/payment.ts'",
          "claude 'Guarda @routes/checkout.ts e trova il bug'"
        ],
        correctAnswer: 2,
        explanation: "Il **Debugging Pattern** richiede: Symptom (cosa è rotto, quando), Expected Behavior (cosa dovrebbe succedere), Context (ambiente, carico, modifiche recenti), What You Tried (step tentati, ipotesi), Relevant Files (@ notation). L'opzione 3 include tutti gli elementi, permettendo a Claude Code di diagnosticare efficacemente."
      },
      {
        id: "m7-q8",
        question: "Quale strategia di Cost Optimization offre il maggior risparmio con la minore difficoltà di implementazione?",
        options: [
          "Creare automation script per forzare best practices (risparmio $300-500/mese, difficulty hard)",
          "Usare Haiku invece di Sonnet per 80% delle operazioni semplici (risparmio $80/mese, difficulty easy)",
          "Implementare Plan Mode per tutti i refactoring multi-file (risparmio $200/mese, difficulty medium)",
          "Setup budget alerts con hook script (previene overspend $200-500/mese, difficulty easy)"
        ],
        correctAnswer: 3,
        explanation: "Setup **budget alerts** (opzione 4) offre il miglior ROI: previene overspend di $200-500/mese con solo 5 minuti di setup (difficulty easy). Altre ottime quick wins: Haiku default (1 min setup, $80/mese), search before read (habit immediato, $100/mese). L'automation script offre risparmio massimo ma richiede skill bash avanzate."
      }
    ]
  },
  challenge: {
    title: "Master Advanced Prompting in Real Scenarios",
    description: "Applica tutte le tecniche avanzate (precisione, contextual chaining, pattern, meta-prompting) in scenari realistici di sviluppo",
    instructions: [
      "Scenario 1 - Precisione: Crea un file mock 'api.js' con una funzione getUserData che fa query DB. Scrivi due prompt: uno vago ('ottimizza questa funzione') e uno preciso con constraints specifici (max 200ms, cache Redis 5min TTL, handle >10k users). Confronta le risposte di Claude Code",
      "Scenario 2 - Contextual Chain: Implementa un sistema di notifiche email in 3 step sequenziali: Step 1 (Infrastructure: setup SendGrid), Step 2 (Templates: crea HTML templates), Step 3 (Integration: connetti alle routes). Usa il pattern Analysis → Implementation → Extension",
      "Scenario 3 - Feature Request Pattern: Scrivi un prompt completo per aggiungere funzionalità 'Wishlist prodotti' seguendo il template: Business Context + Technical Requirements + Integration Points + Success Criteria + Quality Expectations. Verifica che Claude Code generi implementazione production-ready",
      "Scenario 4 - Debugging Pattern: Introduci un bug intenzionale (es. memory leak con event listener non rimosso). Scrivi prompt debugging completo con: Symptom, Expected Behavior, Context (quando iniziato), What You Tried (steps già tentati), Relevant Files. Claude Code dovrebbe identificare il leak",
      "Scenario 5 - Meta-Prompting: Chiedi a Claude Code di analizzare strategia di caching per un dashboard (in-memory vs Redis vs materialized views). Usa template: Problem Space + Goals + Constraints + 'Please analyze, propose alternatives, recommend approach, explain reasoning'. Implementa dopo la sua raccomandazione",
      "Scenario 6 - Pitfall Avoidance: Prendi un prompt vago con tutti i 4 pitfall (ambiguous, overload, missing constraints, ignoring conventions) e refactoralo in prompt perfetto che evita ogni pitfall. Documenta le modifiche",
      "Crea file 'prompting-journal.md' con: per ogni scenario, il prompt iniziale, l'iterazione migliorata, la risposta di Claude Code, e le lesson learned"
    ],
    verificationSteps: [
      "✅ Hai confrontato prompt vago vs preciso e documentato la differenza in qualità di risposta",
      "✅ Hai costruito una contextual chain completa (3+ step) con testing incrementale",
      "✅ Hai scritto un Feature Request prompt completo con tutti e 5 gli elementi (Business, Technical, Integration, Success, Quality)",
      "✅ Hai applicato il Debugging Pattern con Symptom, Expected, Context, Tried, Files",
      "✅ Hai usato meta-prompting per una decisione architetturale (caching strategy) e implementato la raccomandazione di Claude Code",
      "✅ Hai identificato e corretto tutti e 4 i pitfall comuni in un prompt reale",
      "✅ Il tuo prompting-journal.md documenta chiaramente le lesson learned per ogni scenario",
      "✅ Comprendi quando usare ogni pattern (Feature/Debug/Refactor/Learning/Meta) e sai evitare i pitfall"
    ]
  }
};
