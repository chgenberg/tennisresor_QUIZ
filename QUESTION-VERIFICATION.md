# 🎾 Tennis Quiz - Frågeverifiering med OpenAI

Detta system använder OpenAI GPT-4 för att automatiskt granska och korrigera alla quiz-frågor för korrekt svenska och tennisfakta.

## 🚀 Setup

1. **Få en OpenAI API-nyckel:**
   - Gå till [platform.openai.com](https://platform.openai.com)
   - Skapa konto eller logga in
   - Navigera till "API Keys"
   - Klicka "Create new secret key"
   - Kopiera nyckeln (börjar med `sk-...`)

2. **Sätt Environment Variable i Railway:**
   - Logga in på Railway
   - Gå till ditt projekt (tennisresorquiz-production)
   - Klicka "Variables" i sidebar
   - Lägg till: `OPENAI_API_KEY` = din nyckel

## 📊 Vad granskas

### Vanliga frågor (200+ st):
- ✅ **Svenska grammatik** - Korrekt språk och stavning
- ✅ **Faktakorrekthet** - Tennisfakta stämmer
- ✅ **Svårighetsgrad** - Passar nivån (lätt/medel/svår/expert)
- ✅ **Svarsalternativ** - Trovärdiga distraktorer

### Utslagsfrågor (40 st):
- ✅ **Svenska grammatik** - Korrekt språk
- ✅ **Faktakorrekthet** - Numeriskt svar stämmer
- ✅ **Tolerans** - Rimlig felmarginal (±)
- ✅ **Svårighetsgrad** - Passar nivån

## 🔧 Användning

### Lokalt (för test):
```bash
# Sätt API-nyckel
export OPENAI_API_KEY="sk-din-nyckel-här"

# Kör verifiering
npm run verify-questions
```

### På Railway:
```bash
# SSH:a in i Railway container
railway shell

# Kör verifiering
npm run verify-questions
```

## 📋 Rapporter

Systemet genererar:
- **Konsollutskrift** - Live progress och sammanfattning
- **JSON-rapport** - Detaljerad fil: `question-verification-report-[timestamp].json`

### Exempel på rapport:
```
🎾 Startar granskning av alla tennisfrågor med OpenAI...

📊 Granskar EASY (50 frågor):
  Fråga 1/50: Granskar...
    ✅ OK
  Fråga 2/50: Granskar...
    ⚠️  Behöver korrigering

=============================================================
📋 GRANSKNINGSRAPPORT:
=============================================================
📊 Totalt granskade frågor: 240
✅ Frågor som är OK: 220
⚠️  Frågor som behöver korrigering: 18
❌ Fel vid granskning: 2
📄 Detaljerad rapport sparad i: question-verification-report-1703123456789.json
```

## 🔧 Korrigeringar

För frågor som behöver korrigering får du:

```
STATUS: KORRIGERA
SVENSKA: Grammatikfel - "spilaren" ska vara "spelaren"
FAKTA: Korrekt svar
SVÅRIGHETSGRAD: Passar nivån
FÖRSLAG: 
FRÅGA: "Vilken spelare vann Wimbledon 2023?"
SVAR: ["Novak Djokovic", "Carlos Alcaraz", "Daniil Medvedev", "Jannik Sinner"]
RÄTT: 0
```

## 💰 Kostnad

Uppskattad kostnad med GPT-4:
- **240 frågor** × **~500 tokens/fråga** = ~120,000 tokens
- **Kostnad:** ~$3-5 per fullständig granskning
- **Rekommendation:** Kör 1-2 gånger per månad eller vid stora ändringar

## 🛠 Tekniska detaljer

- **Model:** GPT-4 (för bästa faktakontroll)
- **Temperature:** 0.1 (konsistenta svar)
- **Rate limiting:** 500ms paus mellan frågor
- **Error handling:** Fortsätter vid enskilda fel
- **Format:** Strukturerad output för enkel parsing

## 📝 Manuell användning

Du kan också granska enskilda frågor:

```javascript
const { verifyQuestion } = require('./verify-questions');

const result = await verifyQuestion(
  "Vem vann Wimbledon 2023?",
  ["Djokovic", "Alcaraz", "Medvedev", "Sinner"],
  0, // Djokovic är rätt (index 0)
  "medium"
);

console.log(result);
``` 