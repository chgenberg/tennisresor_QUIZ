const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');

// CLI: --model=gpt-5  --report=question-verification-report-*.json
const argModel = (process.argv.find(a => a.startsWith('--model=')) || '').split('=')[1];
const MODEL = argModel || process.env.OPENAI_MODEL || 'gpt-5';
const argReport = (process.argv.find(a => a.startsWith('--report=')) || '').split('=')[1];

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function withTokenLimit(baseParams, limit) {
    if ((MODEL || '').startsWith('gpt-5')) {
        return { ...baseParams, max_completion_tokens: limit };
    }
    return { ...baseParams, max_tokens: limit };
}

function baseParams(messages) {
    if ((MODEL || '').startsWith('gpt-5')) {
        return { model: MODEL, messages };
    }
    return { model: MODEL, messages, temperature: 0 };
}

function findLatestReport() {
    const files = fs.readdirSync(process.cwd())
        .filter(f => f.startsWith('question-verification-report-') && f.endsWith('.json'))
        .map(f => ({ f, t: fs.statSync(path.join(process.cwd(), f)).mtimeMs }))
        .sort((a,b) => b.t - a.t);
    return files.length ? files[0].f : null;
}

async function autoFixQuestions() {
    console.log(`🤖 Startar automatisk korrigering med OpenAI (modell: ${MODEL})...\n`);
    if (!process.env.OPENAI_API_KEY) { console.error('❌ OPENAI_API_KEY environment variable är inte satt!'); return; }

    const reportFile = argReport || findLatestReport();
    if (!reportFile || !fs.existsSync(reportFile)) { console.error('❌ Kan inte hitta rapportfil. Kör först verifieringen eller ange --report=...'); return; }
    console.log('📄 Använder rapport:', reportFile);

    const report = JSON.parse(fs.readFileSync(reportFile, 'utf8'));
    if (!report.corrections || !report.corrections.length) { console.log('✅ Inga korrigeringar att applicera.'); return; }
    console.log(`📊 Hittade ${report.corrections.length} frågor som behöver korrigering\n`);

    const questionsData = fs.readFileSync('questions.js', 'utf8');
    const backupFile = `questions-backup-${Date.now()}.js`;
    fs.writeFileSync(backupFile, questionsData);
    console.log(`💾 Backup skapad: ${backupFile}\n`);

    let fixedCount = 0, failedCount = 0; const fixedQuestions = [];

    for (let i = 0; i < report.corrections.length; i++) {
        const correction = report.corrections[i];
        console.log(`🔧 Fixar ${i + 1}/${report.corrections.length}: ${correction.type} - ${correction.difficulty} #${correction.index + 1}`);
        try {
            const fixed = await fixSingleQuestion(correction);
            if (fixed) { fixedQuestions.push({ ...correction, fixed }); fixedCount++; console.log('   ✅ Fixad!'); }
            else { failedCount++; console.log('   ❌ Kunde inte fixa'); }
        } catch (error) { failedCount++; console.error(`   ❌ Fel: ${error.message}`); }
        await new Promise(r => setTimeout(r, 300));
    }

    console.log('\n🔨 Applicerar alla korrigeringar...');
    const newQuestionsFile = await applyAllFixes(fixedQuestions);
    if (newQuestionsFile) { fs.writeFileSync('questions.js', newQuestionsFile); console.log('✅ Alla korrigeringar tillämpade!'); }

    console.log('\n' + '='.repeat(60));
    console.log('🎉 AUTOMATISK KORRIGERING SLUTFÖRD!');
    console.log('='.repeat(60));
    console.log(`✅ Framgångsrikt fixade: ${fixedCount}`);
    console.log(`❌ Misslyckades: ${failedCount}`);
    console.log(`💾 Backup sparad som: ${backupFile}`);
    console.log(`📄 Nya frågor sparade i: questions.js`);

    const fixReport = { timestamp: new Date().toISOString(), model: MODEL, totalFixed: fixedCount, totalFailed: failedCount, fixes: fixedQuestions };
    const fixReportFile = `auto-fix-report-${Date.now()}.json`;
    fs.writeFileSync(fixReportFile, JSON.stringify(fixReport, null, 2));
    console.log(`📋 Fix-rapport sparad: ${fixReportFile}`);
}

async function fixSingleQuestion(correction) {
    const prompt = `Du är en expert på att korrigera tennis quiz-frågor. Här är en fråga som behöver korrigering:\n\nURSPRUNGLIG FRÅGA:\n${JSON.stringify(correction.original, null, 2)}\n\nGRANSKNING FRÅN TIDIGARE:\n${correction.verification}\n\nUPPGIFT: Skapa en korrigerad version av frågan baserat på granskningens FÖRSLAG-sektion.\n\nSvara ENDAST med giltigt JSON i detta exakta format:\n{\n  "question": "Den korrigerade frågan här",\n  "answers": ["Svar 1", "Svar 2", "Svar 3", "Svar 4"],\n  "correct": 0\n}\n\nELLER för tiebreaker-frågor:\n{\n  "question": "Den korrigerade frågan här", \n  "answer": 123,\n  "tolerance": 2\n}\n\nVIKTIGT: \n- Använd korrekt svenska\n- Se till att fakta stämmer\n- Behåll samma svårighetsgrad\n- Svara ENDAST med JSON, inget annat text`;

    try {
        const base = baseParams([
            { role: 'system', content: 'Du är en tennisexpert som korrigerar quiz-frågor. Svara endast med giltigt JSON.' },
            { role: 'user', content: prompt }
        ]);
        const completion = await openai.chat.completions.create(withTokenLimit(base, 700));
        const response = completion.choices[0].message.content.trim();
        try { return JSON.parse(response); } catch { console.error(`   ❌ Kunde inte parsa JSON svar: ${response}`); return null; }
    } catch (error) { console.error(`   ❌ API fel: ${error.message || ''}`); if (error.status) console.error('   Status:', error.status); if (error.response && error.response.data) { try { console.error('   Response:', JSON.stringify(error.response.data, null, 2)); } catch(_) {} } return null; }
}

function baseParams(messages) {
    if ((MODEL || '').startsWith('gpt-5')) {
        return { model: MODEL, messages };
    }
    return { model: MODEL, messages, temperature: 0 };
}

async function applyAllFixes(fixedQuestions) {
    try {
        delete require.cache[require.resolve('./questions.js')];
        const { questionsDB, tiebreakerQuestions } = require('./questions.js');
        fixedQuestions.forEach(fix => { if (fix.type === 'regular') questionsDB[fix.difficulty][fix.index] = fix.fixed; else if (fix.type === 'tiebreaker') tiebreakerQuestions[fix.difficulty][fix.index] = fix.fixed; });
        const newFile = `// Tennis Quiz Questions Database - Auto-korrigerad ${new Date().toISOString()}\nconst questionsDB = ${JSON.stringify(questionsDB, null, 4)};\n\n// Tiebreaker questions (guess year/number) - one random will be selected for each quiz\nconst tiebreakerQuestions = ${JSON.stringify(tiebreakerQuestions, null, 4)};\n\n// Export for use in main script\nif (typeof module !== 'undefined' && module.exports) {\n    module.exports = { questionsDB, tiebreakerQuestions };\n}`;
        return newFile;
    } catch (error) { console.error('❌ Fel vid applicering av fixar:', error.message); return null; }
}

if (require.main === module) { autoFixQuestions().catch(console.error); }

module.exports = { autoFixQuestions }; 