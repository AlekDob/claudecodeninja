# Resend Email Setup Guide

Questa guida spiega come configurare l'invio email con Resend per il form di contatto.

## 📋 Prerequisiti

1. Account Resend (gratuito per 100 email/giorno)
2. Dominio verificato (opzionale, ma raccomandato)

## 🚀 Passaggi di Setup

### 1. Crea Account Resend

1. Vai su [https://resend.com](https://resend.com)
2. Registrati gratuitamente
3. Verifica la tua email

### 2. Ottieni API Key

1. Vai su [https://resend.com/api-keys](https://resend.com/api-keys)
2. Clicca su "Create API Key"
3. Dai un nome (es. "ClaudeCodeNinja Production")
4. Seleziona permessi: `Sending access`
5. Copia la chiave generata (inizia con `re_...`)

### 3. Configura Variabili d'Ambiente

#### Sviluppo Locale

Crea un file `.env` nella root del progetto:

```bash
RESEND_API_KEY=re_your_actual_api_key_here
```

**IMPORTANTE**: Il file `.env` è già in `.gitignore`, non committarlo mai!

#### Produzione (Vercel)

1. Vai al tuo progetto su Vercel Dashboard
2. Settings → Environment Variables
3. Aggiungi:
   - **Name**: `RESEND_API_KEY`
   - **Value**: la tua API key da Resend
   - **Environment**: Production (e Preview se vuoi)
4. Salva

### 4. Configura Dominio Verificato (Opzionale ma Raccomandato)

Con il piano gratuito puoi inviare da `onboarding@resend.dev`, ma per un aspetto più professionale:

1. Vai su [https://resend.com/domains](https://resend.com/domains)
2. Clicca "Add Domain"
3. Inserisci il tuo dominio (es. `alekdob.com`)
4. Aggiungi i record DNS forniti al tuo provider DNS
5. Attendi la verifica (può richiedere fino a 24h)

Una volta verificato, aggiorna `/api/contact.ts`:

```typescript
from: 'ClaudeCodeNinja <noreply@alekdob.com>',
```

## 🧪 Test

### Test Locale

1. Avvia il dev server: `npm run dev`
2. Vai su `http://localhost:3000`
3. Compila il form di contatto
4. Controlla:
   - Console del browser per errori
   - Email su `gmail@alekdob.com`
   - Dashboard Resend per log di invio

### Test Produzione

1. Fai deploy su Vercel: `git push`
2. Aspetta il deploy
3. Testa il form sul sito live
4. Controlla Dashboard Resend → Logs

## 📊 Monitoring

Dashboard Resend mostra:

- Email inviate/fallite
- Bounce rate
- Log dettagliati per ogni invio
- Statistiche di utilizzo

## ⚠️ Limiti Piano Gratuito

- **100 email/giorno**
- **3.000 email/mese**
- Solo dominio `onboarding@resend.dev` (senza verifica dominio)

Per maggiori email o domini custom, considera upgrade a piano paid.

## 🔧 Troubleshooting

### Email non arrivano

1. **Controlla spam/junk** nella casella destinazione
2. **Verifica API key** in Vercel Environment Variables
3. **Controlla Resend Dashboard** → Logs per errori
4. **Testa con dominio verificato** invece di `onboarding@resend.dev`

### Errore 403 Forbidden

- API key non valida o scaduta
- Rigenerala su Resend Dashboard

### Errore 422 Unprocessable Entity

- Email destinatario non valida
- Campi mancanti nel payload
- Verifica il formato JSON inviato

## 📚 Risorse

- [Resend Documentation](https://resend.com/docs)
- [Resend Quickstart](https://resend.com/docs/send-with-nodejs)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

---

**Fatto con ❤️ da Alek Dobrohotov**
[alekdob.com](https://alekdob.com) · [Medium](https://medium.com/@aleksandardobrohotov)
