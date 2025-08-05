# 🎾 Tennis Quiz

Ett interaktivt tennisquiz med fyra svårighetsgrader, byggt för att integreras i Shopify-webbplatser via Railway deployment.

## ✨ Funktioner

- **4 Svårighetsgrader**: Lätt, Medel, Svår, Expert
- **200+ Frågor**: 50 unika frågor per svårighetsgrad
- **Slumpmässiga frågor**: Varje quiz innehåller 10 slumpmässigt valda frågor
- **Responsiv design**: Fungerar perfekt på desktop, tablet och mobil
- **Facebook-delning**: Dela ditt resultat med vänner
- **Interaktiv design**: Moderna animationer och övergångar
- **Integritetsskydd**: GDPR-kompatibel hantering av e-postadresser

## 🚀 Snabbstart

### Lokal utveckling

1. **Klona repositoriet**
   ```bash
   git clone [din-repo-url]
   cd tennis-quiz
   ```

2. **Installera dependencies**
   ```bash
   npm install
   ```

3. **Starta utvecklingsservern**
   ```bash
   npm start
   ```

4. **Öppna i webbläsaren**
   ```
   http://localhost:3000
   ```

## 🛠 Railway Deployment

### Steg-för-steg guide

1. **Förbered ditt GitHub-repo**
   - Pusha all kod till GitHub
   - Se till att alla filer är committade

2. **Skapa Railway-projekt**
   - Gå till [railway.app](https://railway.app)
   - Klicka "New Project"
   - Välj "Deploy from GitHub repo"
   - Välj ditt tennis-quiz repository

3. **Konfigurera deployment**
   - Railway upptäcker automatiskt `package.json`
   - Start-kommandot är redan konfigurerat: `npm start`
   - Inga ytterligare inställningar behövs

4. **Få din URL**
   - Efter deployment får du en URL som: `https://tennis-quiz-production.railway.app`
   - Denna URL kan du använda i din Shopify-integration

### Environment Variables (Valfritt)

Om du vill konfigurera ytterligare inställningar i Railway:

```bash
NODE_ENV=production
PORT=3000  # Railway sätter detta automatiskt
```

## 🔗 Shopify Integration

### Metod 1: iFrame Embed

```html
<iframe 
  src="https://din-railway-url.railway.app" 
  width="100%" 
  height="800px" 
  frameborder="0"
  style="border-radius: 10px;">
</iframe>
```

### Metod 2: Popup Modal

```javascript
// Lägg till i din Shopify-tema
function openTennisQuiz() {
  const popup = window.open(
    'https://din-railway-url.railway.app',
    'tennisQuiz',
    'width=900,height=700,scrollbars=yes,resizable=yes'
  );
}
```

### Metod 3: Direkt länk

```html
<a href="https://din-railway-url.railway.app" 
   target="_blank" 
   class="tennis-quiz-button">
  🎾 Testa dina tenniskunskaper!
</a>
```

## 📱 Teknisk översikt

### Frontend
- **HTML5**: Semantisk struktur
- **CSS3**: Modern styling med CSS Grid och Flexbox
- **JavaScript (ES6+)**: Vanilla JS utan externa ramverk
- **FontAwesome**: Ikoner
- **Google Fonts**: Typografi (Poppins)

### Backend
- **Node.js**: Runtime
- **Express.js**: Webbserver
- **Helmet**: Säkerhet
- **CORS**: Cross-origin requests
- **Compression**: Gzip-komprimering

### Hosting
- **Railway**: Cloud deployment platform
- **GitHub**: Källkodshantering och automatisk deployment

## 🎯 Quiz-struktur

### Svårighetsgrader

**Lätt (Easy)**
- Grundläggande tennisregler
- Kända spelare och turneringar
- Allmän tenniskunskap

**Medel (Medium)**
- Tennishistoria
- Spelare och deras prestationer
- Tekniska aspekter

**Svår (Hard)**
- Detaljerad tennishistoria
- Avancerade regler och tekniker
- Obskyr tenniskultur

**Expert (Expert)**
- Mycket specifika fakta
- Sällsynta tennishistoriska händelser
- Tekniska detaljer på expertnivå

## 🔒 Säkerhet och Integritet

- **GDPR-kompatibel**: Tydlig integritetspolicy
- **Säker datahantering**: Ingen känslig data lagras permanent
- **Helmet.js**: Säkerhetsheaders
- **CORS-konfiguration**: Kontrollerade cross-origin requests

## 🎨 Anpassning

### Färger och styling
Redigera `styles.css` för att ändra färgschema:

```css
:root {
  --primary-color: #4CAF50;
  --secondary-color: #2196F3;
  --accent-color: #FF9800;
}
```

### Frågor
Lägg till nya frågor i `questions.js`:

```javascript
const newQuestion = {
  question: "Din fråga här?",
  answers: ["Alternativ 1", "Alternativ 2", "Alternativ 3", "Alternativ 4"],
  correct: 0 // Index för rätt svar (0-3)
};
```

## 📊 Analytics (Framtida utbyggnad)

För att spåra quiz-resultat kan du integrera:

- **Google Analytics**: Användarinteraktion
- **Database**: PostgreSQL eller MongoDB för resultatlagring
- **Dashboard**: Admin-panel för att se statistik

## 🐛 Felsökning

### Vanliga problem

**Quiz laddar inte**
- Kontrollera att alla filer finns
- Verifiera att `questions.js` laddas före `script.js`

**Styling ser fel ut**
- Kontrollera att `styles.css` länkas korrekt
- Verifiera att externa fonts och ikoner laddas

**Facebook-delning fungerar inte**
- Kontrollera att URL:en är korrekt
- Testa Facebook debugger: [developers.facebook.com/tools/debug](https://developers.facebook.com/tools/debug)

## 🔄 Uppdateringar

För att uppdatera din deployment:

1. Gör ändringar i koden
2. Committa till GitHub
3. Railway deployer automatiskt nya ändringar

## 📞 Support

Om du behöver hjälp:
- Kontrollera Railway-loggar för felmeddelanden
- Testa lokalt först innan deployment
- Verifiera att alla dependencies är installerade

## 📄 Licens

MIT License - fri att använda och modifiera för kommersiella ändamål.

---

**Gjord med ❤️ för tennisälskare** 