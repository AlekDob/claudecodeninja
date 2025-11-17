import { Milestone } from '../../types';

export const milestone07: Milestone = {
  id: 7,
  title: "Tecniche Avanzate di Prompting",
  subtitle: "Padroneggia precisione, contesto, pattern e meta-prompting per risultati professionali",
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

Al termine di questa milestone sarai in grado di:
- ✅ Scrivere prompt precisi che riducono iterazioni del 70%
- ✅ Costruire catene contestuali per task complessi multi-step
- ✅ Evitare i 4 pitfall più comuni che rovinano i prompt
- ✅ Applicare meta-prompting per decisioni architetturali
- ✅ Riconoscere quale pattern usare per ogni scenario

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

## Capitolo 6: Riepilogo e Best Practices

Complimenti! Hai padroneggiato le tecniche avanzate di prompting. 🎓

### 6.1 Recap Tecniche Apprese

**1. Precisione Strategica**
- ✅ Sii preciso per: technical requirements, business logic, integration points, performance
- ✅ Claude Code inferisce: formatting, naming (se consistent), basic types

**2. Context-Aware Prompting**
- ✅ Sfrutta contesto implicito (pattern progetto, librerie)
- ✅ Usa @ notation per reference espliciti quando serve
- ✅ Costruisci contextual chains (Analysis → Implementation → Extension) per task complessi

**3. Pattern Collaudati**
- ✅ **Feature Request**: Business + Technical + Integration + Success + Quality
- ✅ **Debugging**: Symptom + Expected + Context + Tried + Files
- ✅ **Refactoring**: Current + Desired + Constraints + Scope
- ✅ **Learning**: What + Current Understanding + Questions + Goal

**4. Evita Pitfall**
- ✅ **Ambiguity**: Usa baseline misurabili, non termini relativi ("più veloce")
- ✅ **Overload**: Spezza in step, prioritizza must-have vs nice-to-have
- ✅ **Missing Constraints**: Specifica limiti tecnici, sicurezza, performance, costi
- ✅ **Ignoring Conventions**: Riferisci standard progetto, pattern esistenti

**5. Meta-Prompting**
- ✅ Usa per decisioni architetturali e trade-off complessi
- ✅ Chiedi analisi → alternative → raccomandazione → reasoning
- ✅ Implementa dopo consenso

### 6.2 Decision Matrix: Quale Tecnica Usare?

| Scenario | Tecnica Consigliata | Esempio |
|----------|---------------------|---------|
| Feature semplice | Conversational + Precisione | "Add endpoint GET /api/users with pagination (limit, offset)" |
| Feature complessa | Structured Feature Pattern | Business + Technical + Integration + Success + Quality |
| Bug oscuro | Debugging Pattern | Symptom + Expected + Context + Tried + Files |
| Refactor | Refactoring Pattern | Current + Desired + Constraints + Scope |
| Task multi-step | Contextual Chain | Analysis → Implementation → Extension |
| Decisione architetturale | Meta-Prompting | Analyze → Alternatives → Recommend → Reasoning |
| Imparare codebase | Learning Pattern | What + Understanding + Questions + Goal |

### 6.3 Checklist Prima di Inviare Prompt

**Prima di premere Enter, verifica:**

- [ ] **Intent chiaro?** Claude Code capisce cosa vuoi ottenere?
- [ ] **Context sufficiente?** Technical stack, file coinvolti, pattern da seguire?
- [ ] **Outcome definito?** Success criteria misurabili e verificabili?
- [ ] **Vincoli espliciti?** Performance, security, budget, constraints?
- [ ] **Priorità chiare?** Must-have vs nice-to-have separati?
- [ ] **Pattern appropriato?** Feature/Debug/Refactor/Learning/Meta?
- [ ] **Reference espliciti?** @ notation per file non ovvi?
- [ ] **Conventions menzionate?** Standard progetto, architectural decisions?

### 6.4 Prossimi Passi

**Pratica questi pattern nelle prossime milestones:**

- **Milestone 8**: Model Context Protocol - userai meta-prompting per scegliere MCP servers
- **Milestone 9**: Hooks & Extension Points - pattern feature request per custom hooks
- **Milestone 10**: Claude Code SDK - contextual chains per automation scripts
- **Milestone 11**: CI/CD Integration - debugging pattern per pipeline failures
- **Milestone 12**: Team Workflows - tutti i pattern in contesto team collaboration

### 6.5 Mantra del Prompt Expert

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
  estimatedTime: "2 ore",
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
    "Advanced prompting techniques"
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
