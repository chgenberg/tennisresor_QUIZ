const OpenAI = require('openai');
const fs = require('fs');
const { questionsDB, tiebreakerQuestions } = require('./questions.js');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

async function verifyQuestion(question, answers, correctIndex, difficulty) {
    const prompt = `Du är en tennisexpert och språkgranskare. Granska denna tennisfråga noggrant:

FRÅGA: "${question}"
SVARSALTERNATIV: 
1. ${answers[0]}
2. ${answers[1]} 
3. ${answers[2]}
4. ${answers[3]}

MARKERAT RÄTT SVAR: ${answers[correctIndex]} (alternativ ${correctIndex + 1})
SVÅRIGHETSGRAD: ${difficulty}

Kontrollera:
1. SVENSKA GRAMMATIK - Är frågan och svaren korrekt svenska?
2. FAKTAKORREKTHET - Är det markerade svaret verkligen rätt?
3. SVÅRIGHETSGRAD - Passar frågan för nivån "${difficulty}"?
4. SVARSALTERNATIV - Är alla alternativ trovärdiga distraktorer?

Svara ENDAST med följande format:
STATUS: [OK/KORRIGERA]
SVENSKA: [kommentar om språket]
FAKTA: [kommentar om riktigheten] 
SVÅRIGHETSGRAD: [kommentar om nivån]
FÖRSLAG: [om korrigering behövs, ge korrigerad version]

Exempel på korrigering:
FRÅGA: "Korrigerad fråga här?"
SVAR: ["Alt 1", "Alt 2", "Alt 3", "Alt 4"]
RÄTT: 2 (för alternativ 3, 0-indexerat)`;

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                {
                    role: "system", 
                    content: "Du är en professionell tennisexpert och språkgranskare som granskar quiz-frågor för korrekt svenska och tennisfakta."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            max_tokens: 800,
            temperature: 0.1
        });

        return completion.choices[0].message.content;
    } catch (error) {
        console.error(`Fel vid granskning av fråga: ${error.message}`);
        return null;
    }
}

async function verifyTiebreakerQuestion(question, answer, tolerance, difficulty) {
    const prompt = `Du är en tennisexpert och språkgranskare. Granska denna utslagsfråga:

FRÅGA: "${question}"
RÄTT SVAR: ${answer}
TOLERANS: ±${tolerance}
SVÅRIGHETSGRAD: ${difficulty}

Kontrollera:
1. SVENSKA GRAMMATIK - Är frågan korrekt svenska?
2. FAKTAKORREKTHET - Är svaret ${answer} korrekt?
3. TOLERANS - Är ±${tolerance} rimlig tolerans?
4. SVÅRIGHETSGRAD - Passar frågan för nivån "${difficulty}"?

Svara ENDAST med följande format:
STATUS: [OK/KORRIGERA]
SVENSKA: [kommentar om språket]
FAKTA: [kommentar om riktigheten]
TOLERANS: [kommentar om toleransen]
FÖRSLAG: [om korrigering behövs, ge korrigerad version]`;

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                {
                    role: "system",
                    content: "Du är en professionell tennisexpert som granskar utslagsfrågor för tennis-quiz."
                },
                {
                    role: "user", 
                    content: prompt
                }
            ],
            max_tokens: 600,
            temperature: 0.1
        });

        return completion.choices[0].message.content;
    } catch (error) {
        console.error(`Fel vid granskning av utslagsfråga: ${error.message}`);
        return null;
    }
}

async function verifyAllQuestions() {
    console.log('🎾 Startar granskning av alla tennisfrågor med OpenAI...\n');
    
    if (!process.env.OPENAI_API_KEY) {
        console.error('❌ OPENAI_API_KEY environment variable är inte satt!');
        console.log('Lägg till din OpenAI API-nyckel som environment variable i Railway.');
        return;
    }

    const results = {
        total: 0,
        needsCorrection: 0,
        errors: 0,
        corrections: []
    };

    // Granska vanliga frågor
    for (const [difficulty, questions] of Object.entries(questionsDB)) {
        console.log(`\n📊 Granskar ${difficulty.toUpperCase()} (${questions.length} frågor):`);
        
        for (let i = 0; i < questions.length; i++) {
            const q = questions[i];
            results.total++;
            
            console.log(`  Fråga ${i + 1}/${questions.length}: Granskar...`);
            
            const verification = await verifyQuestion(
                q.question, 
                q.answers, 
                q.correct, 
                difficulty
            );
            
            if (verification) {
                if (verification.includes('STATUS: KORRIGERA')) {
                    results.needsCorrection++;
                    results.corrections.push({
                        type: 'regular',
                        difficulty,
                        index: i,
                        original: q,
                        verification
                    });
                    console.log(`    ⚠️  Behöver korrigering`);
                } else {
                    console.log(`    ✅ OK`);
                }
            } else {
                results.errors++;
                console.log(`    ❌ Fel vid granskning`);
            }
            
            // Kort paus för att undvika rate limiting
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    }

    // Granska utslagsfrågor
    console.log('\n🎯 Granskar UTSLAGSFRÅGOR:');
    for (const [difficulty, questions] of Object.entries(tiebreakerQuestions)) {
        console.log(`\n📊 Granskar ${difficulty.toUpperCase()} utslagsfrågor (${questions.length} frågor):`);
        
        for (let i = 0; i < questions.length; i++) {
            const q = questions[i];
            results.total++;
            
            console.log(`  Utslagsfråga ${i + 1}/${questions.length}: Granskar...`);
            
            const verification = await verifyTiebreakerQuestion(
                q.question,
                q.answer,
                q.tolerance,
                difficulty
            );
            
            if (verification) {
                if (verification.includes('STATUS: KORRIGERA')) {
                    results.needsCorrection++;
                    results.corrections.push({
                        type: 'tiebreaker',
                        difficulty,
                        index: i,
                        original: q,
                        verification
                    });
                    console.log(`    ⚠️  Behöver korrigering`);
                } else {
                    console.log(`    ✅ OK`);
                }
            } else {
                results.errors++;
                console.log(`    ❌ Fel vid granskning`);
            }
            
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    }

    // Spara resultat
    const reportFile = `question-verification-report-${Date.now()}.json`;
    fs.writeFileSync(reportFile, JSON.stringify(results, null, 2));

    // Sammanfattning
    console.log('\n' + '='.repeat(60));
    console.log('📋 GRANSKNINGSRAPPORT:');
    console.log('='.repeat(60));
    console.log(`📊 Totalt granskade frågor: ${results.total}`);
    console.log(`✅ Frågor som är OK: ${results.total - results.needsCorrection - results.errors}`);
    console.log(`⚠️  Frågor som behöver korrigering: ${results.needsCorrection}`);
    console.log(`❌ Fel vid granskning: ${results.errors}`);
    console.log(`📄 Detaljerad rapport sparad i: ${reportFile}`);

    if (results.needsCorrection > 0) {
        console.log('\n🔧 FRÅGOR SOM BEHÖVER KORRIGERING:');
        console.log('-'.repeat(40));
        
        results.corrections.forEach((correction, index) => {
            console.log(`\n${index + 1}. ${correction.type.toUpperCase()} - ${correction.difficulty.toUpperCase()} #${correction.index + 1}`);
            console.log(`Fråga: "${correction.original.question}"`);
            console.log('Granskning:');
            console.log(correction.verification);
            console.log('-'.repeat(40));
        });
    }

    console.log('\n🎾 Granskning klar!');
}

// Kör granskning om detta script körs direkt
if (require.main === module) {
    verifyAllQuestions().catch(console.error);
}

module.exports = { verifyAllQuestions, verifyQuestion, verifyTiebreakerQuestion }; 