const OpenAI = require('openai');
const fs = require('fs');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

async function generateMoreQuestions() {
    console.log('🎾 Genererar MASSIVT fler tennisfrågor med GPT-4...\n');
    console.log('🔥 EXPERT-nivå: Extremt svårt även för tennisexperter!');
    console.log('⚡ SVÅR-nivå: Utmanande för erfarna spelare\n');
    
    if (!process.env.OPENAI_API_KEY) {
        console.error('❌ OPENAI_API_KEY environment variable är inte satt!');
        return;
    }

    const newQuestions = {
        hard: [],
        expert: [],
        tiebreakerHard: [],
        tiebreakerExpert: []
    };

    // Generera 50 frågor för varje nivå + 10 tiebreakers
    console.log('💪 Genererar 50 SVÅRA frågor...');
    newQuestions.hard = await generateRegularQuestions('hard', 50);
    
    console.log('🧠 Genererar 50 EXPERT frågor (extremt svåra!)...');
    newQuestions.expert = await generateRegularQuestions('expert', 50);
    
    console.log('🎯 Genererar 10 SVÅRA utslagsfrågor...');
    newQuestions.tiebreakerHard = await generateTiebreakerQuestions('hard', 10);
    
    console.log('🎯 Genererar 10 EXPERT utslagsfrågor (nästan omöjliga!)...');
    newQuestions.tiebreakerExpert = await generateTiebreakerQuestions('expert', 10);

    // Spara resultatet
    const timestamp = Date.now();
    const outputFile = `new-questions-${timestamp}.json`;
    fs.writeFileSync(outputFile, JSON.stringify(newQuestions, null, 2));
    
    // Sammanfattning
    const totalGenerated = newQuestions.hard.length + newQuestions.expert.length + 
                          newQuestions.tiebreakerHard.length + newQuestions.tiebreakerExpert.length;
    
    console.log('\n' + '='.repeat(70));
    console.log('🚀 MASSIV FRÅGGENERERING SLUTFÖRD!');
    console.log('='.repeat(70));
    console.log(`💪 Svåra frågor: ${newQuestions.hard.length}`);
    console.log(`🧠 Expert frågor: ${newQuestions.expert.length} (EXTREMT SVÅRA!)`);
    console.log(`🎯 Svåra utslagsfrågor: ${newQuestions.tiebreakerHard.length}`);
    console.log(`🎯 Expert utslagsfrågor: ${newQuestions.tiebreakerExpert.length} (NÄSTAN OMÖJLIGA!)`);
    console.log(`📊 Totalt genererat: ${totalGenerated} frågor`);
    console.log(`💾 Sparad som: ${outputFile}`);
    console.log(`💰 Uppskattad kostnad: ~$${(totalGenerated * 0.015).toFixed(2)}`);
    
    // Föreslå nästa steg
    console.log('\n🔧 NÄSTA STEG:');
    console.log('1. Granska de genererade frågorna');
    console.log('2. Kör: node integrate-new-questions.js (kommer skapas)');
    console.log('3. Testa de nya frågorna i quizet');
    console.log('4. Se om NÅGON kan klara Expert-nivån! 😈');
    
    // Skapa integrationsskript
    await createIntegrationScript(outputFile);
}

async function generateRegularQuestions(difficulty, count) {
    const questions = [];
    
    const difficultyDescriptions = {
        hard: `SVÅR NIVÅ för erfarna tennisspelare:
- Djup kunskap om tennishistoria och turneringar
- Tekniska detaljer om spel och utrustning  
- Kända men inte alltför obskyra fakta
- Kräver seriös tennisintresse`,

        expert: `EXPERT NIVÅ - EXTREMT SVÅR för även hardcore tennisexperter:
- Obskyra historiska detaljer från 1800-tal/tidigt 1900-tal
- Mycket specifika ATP/WTA statistik och rekord
- Tekniska detaljer om racket-utveckling och regeltolkningar
- Sällsynta fakta som bara de mest nördiga tennisentusiasterna känner till
- Detaljer om mindre kända turneringar och spelare
- Exakta datum, mått, och tekniska specifikationer
- Nästan omöjligt utan encyklopedisk tenniskunskap!`
    };
    
    for (let i = 0; i < count; i++) {
        console.log(`  Genererar ${difficulty} fråga ${i + 1}/${count}...`);
        
        const expertPrompt = difficulty === 'expert' ? `
VIKTIGT FÖR EXPERT-NIVÅ:
- Frågan ska vara SÅ SVÅR att även tennisexperter knappt kan svara
- Använd obskyra historiska fakta, tekniska detaljer, sällsynta statistik
- Fokusera på: tidiga tennishistoria, teknisk utveckling, obskyr regelhistoria
- Exempel på svårighetsgrad: "Vem designade det första laminated racket 1947?"
- Undvik "kända" spelare som Federer/Nadal/Djokovic - använd historiska figurer` : '';
        
        const prompt = `Du är en tennisexpert som skapar quiz-frågor. Skapa EN enda ${difficulty}-nivå tennisfråga.

SVÅRIGHETSGRAD: ${difficulty.toUpperCase()}
${difficultyDescriptions[difficulty]}

${expertPrompt}

KRAV:
- Frågan ska vara unik och inte upprepa befintliga frågor
- Använd korrekt svenska
- Faktiskt korrekt information som kan verifieras
- 4 trovärdiga svarsalternativ
- Ett tydligt rätt svar

ÄMNESOMRÅDEN (${difficulty === 'expert' ? 'fokusera på obskyra områden' : 'välj varierat'}):
${difficulty === 'expert' ? `
- Tidig tennishistoria (1800-tal, tidigt 1900-tal)
- Teknisk racket- och strängutveckling
- Obskyra regeltolkningar och historiska förändringar  
- Mindre kända turneringar och organisationer
- Sällsynta rekord och statistik
- Tekniska mått och specifikationer
- Historiska innovationer och uppfinningar` : `
- Tennishistoria och turneringar
- Spelare och deras prestationer  
- Tennis-teknik och utrustning
- Tennisregler och protokoll
- ATP/WTA statistik och ranking
- Grand Slam-turneringar
- Davis Cup/Fed Cup historia`}

Svara ENDAST med giltigt JSON:
{
  "question": "Din ${difficulty === 'expert' ? 'extremt svåra' : 'svåra'} fråga här?",
  "answers": ["Alternativ 1", "Alternativ 2", "Alternativ 3", "Alternativ 4"],
  "correct": 0
}`;

        try {
            const completion = await openai.chat.completions.create({
                model: "gpt-4",
                messages: [
                    {
                        role: "system",
                        content: `Du är en professionell tennishistoriker och expert som skapar ${difficulty === 'expert' ? 'extremt svåra' : 'svåra'} quiz-frågor. ${difficulty === 'expert' ? 'Gör frågorna SÅ SVÅRA att även tennisexperter knappt kan svara på dem!' : ''} Svara endast med giltigt JSON.`
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                max_tokens: 400,
                temperature: 0.9  // Hög kreativitet för unika frågor
            });

            const response = completion.choices[0].message.content.trim();
            
            try {
                const question = JSON.parse(response);
                questions.push(question);
                const preview = question.question.substring(0, 60);
                console.log(`    ✅ "${preview}..."`);
            } catch (parseError) {
                console.log(`    ❌ Kunde inte parsa: ${response.substring(0, 100)}...`);
            }
            
        } catch (error) {
            console.error(`    ❌ API fel: ${error.message}`);
        }
        
        // Paus mellan requests för att undvika rate limiting
        await new Promise(resolve => setTimeout(resolve, 300));
    }
    
    return questions;
}

async function generateTiebreakerQuestions(difficulty, count) {
    const questions = [];
    
    const difficultyDescriptions = {
        hard: 'Svåra numeriska frågor om tennis med specifika siffror som kräver god tenniskunskap.',
        expert: `EXTREMT specifika numeriska frågor för tennisexperter:
- Obskyra tekniska mått och specifikationer
- Exakta datum för historiska händelser
- Sällsynta statistik och rekord
- Tekniska detaljer som bara experter känner till`
    };
    
    for (let i = 0; i < count; i++) {
        console.log(`  Genererar ${difficulty} utslagsfråga ${i + 1}/${count}...`);
        
        const expertPrompt = difficulty === 'expert' ? `
EXTREMT SVÅRA NUMERISKA FRÅGOR:
- Använd obskyra tekniska mått, historiska datum, sällsynta statistik
- Exempel: "Hur många gram vägde den första gummibollen 1870?"
- Fokusera på detaljer som bara tennishistoriker skulle veta` : '';
        
        const prompt = `Du är en tennisexpert som skapar numeriska utslagsfrågor. Skapa EN enda ${difficulty}-nivå utslagsfråga.

SVÅRIGHETSGRAD: ${difficulty.toUpperCase()}  
${difficultyDescriptions[difficulty]}

${expertPrompt}

KRAV:
- Frågan ska kräva ett numeriskt svar (år, antal, procent, gram, cm, etc.)
- Faktiskt korrekt information som kan verifieras
- Rimlig tolerans för fel (men inte för bred)
- Använd korrekt svenska

ÄMNESOMRÅDEN:
${difficulty === 'expert' ? `
- Tekniska mått och specifikationer från tennishistoria
- Exakta datum för obskyra händelser
- Sällsynta statistik och rekord
- Tekniska detaljer om utrustning och regelverk` : `
- Specifika år för viktiga tennisevent
- Antal titlar, matcher, poäng
- Rekord och statistik
- Prispengar och ranking-poäng`}

Svara ENDAST med giltigt JSON:
{
  "question": "Din numeriska ${difficulty === 'expert' ? 'extremt svåra' : 'svåra'} fråga här?",
  "answer": 123,
  "tolerance": 2
}`;

        try {
            const completion = await openai.chat.completions.create({
                model: "gpt-4", 
                messages: [
                    {
                        role: "system",
                        content: `Du är en tennishistoriker som skapar ${difficulty === 'expert' ? 'extremt svåra' : 'svåra'} numeriska quiz-frågor. ${difficulty === 'expert' ? 'Gör frågorna nästan omöjliga!' : ''} Svara endast med giltigt JSON.`
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                max_tokens: 250,
                temperature: 0.9
            });

            const response = completion.choices[0].message.content.trim();
            
            try {
                const question = JSON.parse(response);
                questions.push(question);
                const preview = question.question.substring(0, 50);
                console.log(`    ✅ "${preview}..." → ${question.answer} (±${question.tolerance})`);
            } catch (parseError) {
                console.log(`    ❌ Kunde inte parsa: ${response.substring(0, 100)}...`);
            }
            
        } catch (error) {
            console.error(`    ❌ API fel: ${error.message}`);
        }
        
        await new Promise(resolve => setTimeout(resolve, 300));
    }
    
    return questions;
}

async function createIntegrationScript(questionsFile) {
    const integrationScript = `const fs = require('fs');

async function integrateNewQuestions() {
    console.log('🔧 Integrerar 120 nya frågor i questions.js...');
    
    // Läs nya frågor
    const newQuestions = JSON.parse(fs.readFileSync('${questionsFile}', 'utf8'));
    
    // Läs befintliga frågor
    const { questionsDB, tiebreakerQuestions } = require('./questions.js');
    
    console.log('📊 FÖRE integration:');
    console.log(\`  Hard: \${questionsDB.hard.length} frågor\`);
    console.log(\`  Expert: \${questionsDB.expert.length} frågor\`);
    console.log(\`  Hard tiebreakers: \${tiebreakerQuestions.hard.length}\`);
    console.log(\`  Expert tiebreakers: \${tiebreakerQuestions.expert.length}\`);
    
    // Lägg till nya frågor
    questionsDB.hard.push(...newQuestions.hard);
    questionsDB.expert.push(...newQuestions.expert);
    tiebreakerQuestions.hard.push(...newQuestions.tiebreakerHard);
    tiebreakerQuestions.expert.push(...newQuestions.tiebreakerExpert);
    
    // Skapa backup
    const backupFile = \`questions-backup-\${Date.now()}.js\`;
    fs.copyFileSync('questions.js', backupFile);
    console.log(\`💾 Backup skapad: \${backupFile}\`);
    
    // Skriv nya filen
    const newFile = \`// Tennis Quiz Questions Database - MASSIVT uppdaterad \${new Date().toISOString()}
const questionsDB = \${JSON.stringify(questionsDB, null, 4)};

// Tiebreaker questions (guess year/number) - one random will be selected for each quiz
const tiebreakerQuestions = \${JSON.stringify(tiebreakerQuestions, null, 4)};

// Export for use in main script
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { questionsDB, tiebreakerQuestions };
}\`;
    
    fs.writeFileSync('questions.js', newFile);
    
    console.log('\\n🎉 MASSIV INTEGRATION KLAR!');
    console.log('📊 EFTER integration:');
    console.log(\`  💪 Hard: \${questionsDB.hard.length} frågor (+\${newQuestions.hard.length})\`);
    console.log(\`  🧠 Expert: \${questionsDB.expert.length} frågor (+\${newQuestions.expert.length}) - EXTREMT SVÅRA!\`);
    console.log(\`  🎯 Hard tiebreakers: \${tiebreakerQuestions.hard.length} (+\${newQuestions.tiebreakerHard.length})\`);
    console.log(\`  🎯 Expert tiebreakers: \${tiebreakerQuestions.expert.length} (+\${newQuestions.tiebreakerExpert.length}) - NÄSTAN OMÖJLIGA!\`);
    
    const total = questionsDB.easy.length + questionsDB.medium.length + questionsDB.hard.length + questionsDB.expert.length;
    console.log(\`\\n🏆 TOTALT I DATABASEN: \${total} frågor!\`);
    console.log('😈 Lycka till med Expert-nivån! Den är gjord för att vara EXTREMT svår!');
}

if (require.main === module) {
    integrateNewQuestions().catch(console.error);
}

module.exports = { integrateNewQuestions };`;
    
    fs.writeFileSync('integrate-new-questions.js', integrationScript);
    console.log('📝 Integrationsskript skapat: integrate-new-questions.js');
}

// Kör generation
if (require.main === module) {
    generateMoreQuestions().catch(console.error);
}

module.exports = { generateMoreQuestions }; 