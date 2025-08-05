const fs = require('fs');

async function integrateNewQuestions() {
    console.log('🔧 Integrerar 120 nya frågor i questions.js...');
    
    // Läs nya frågor
    const newQuestions = JSON.parse(fs.readFileSync('new-questions-1754402608030.json', 'utf8'));
    
    // Läs befintliga frågor
    const { questionsDB, tiebreakerQuestions } = require('./questions.js');
    
    console.log('📊 FÖRE integration:');
    console.log(`  Hard: ${questionsDB.hard.length} frågor`);
    console.log(`  Expert: ${questionsDB.expert.length} frågor`);
    console.log(`  Hard tiebreakers: ${tiebreakerQuestions.hard.length}`);
    console.log(`  Expert tiebreakers: ${tiebreakerQuestions.expert.length}`);
    
    // Lägg till nya frågor
    questionsDB.hard.push(...newQuestions.hard);
    questionsDB.expert.push(...newQuestions.expert);
    tiebreakerQuestions.hard.push(...newQuestions.tiebreakerHard);
    tiebreakerQuestions.expert.push(...newQuestions.tiebreakerExpert);
    
    // Skapa backup
    const backupFile = `questions-backup-${Date.now()}.js`;
    fs.copyFileSync('questions.js', backupFile);
    console.log(`💾 Backup skapad: ${backupFile}`);
    
    // Skriv nya filen
    const newFile = `// Tennis Quiz Questions Database - MASSIVT uppdaterad ${new Date().toISOString()}
const questionsDB = ${JSON.stringify(questionsDB, null, 4)};

// Tiebreaker questions (guess year/number) - one random will be selected for each quiz
const tiebreakerQuestions = ${JSON.stringify(tiebreakerQuestions, null, 4)};

// Export for use in main script
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { questionsDB, tiebreakerQuestions };
}`;
    
    fs.writeFileSync('questions.js', newFile);
    
    console.log('\n🎉 MASSIV INTEGRATION KLAR!');
    console.log('📊 EFTER integration:');
    console.log(`  💪 Hard: ${questionsDB.hard.length} frågor (+${newQuestions.hard.length})`);
    console.log(`  🧠 Expert: ${questionsDB.expert.length} frågor (+${newQuestions.expert.length}) - EXTREMT SVÅRA!`);
    console.log(`  🎯 Hard tiebreakers: ${tiebreakerQuestions.hard.length} (+${newQuestions.tiebreakerHard.length})`);
    console.log(`  🎯 Expert tiebreakers: ${tiebreakerQuestions.expert.length} (+${newQuestions.tiebreakerExpert.length}) - NÄSTAN OMÖJLIGA!`);
    
    const total = questionsDB.easy.length + questionsDB.medium.length + questionsDB.hard.length + questionsDB.expert.length;
    console.log(`\n🏆 TOTALT I DATABASEN: ${total} frågor!`);
    console.log('😈 Lycka till med Expert-nivån! Den är gjord för att vara EXTREMT svår!');
}

if (require.main === module) {
    integrateNewQuestions().catch(console.error);
}

module.exports = { integrateNewQuestions };