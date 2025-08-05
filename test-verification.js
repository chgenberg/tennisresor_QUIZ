const { verifyQuestion, verifyTiebreakerQuestion } = require('./verify-questions.js');
const { questionsDB, tiebreakerQuestions } = require('./questions.js');

async function testVerification() {
    console.log('🧪 Testar frågeverifiering med några exempel...\n');
    
    if (!process.env.OPENAI_API_KEY) {
        console.error('❌ OPENAI_API_KEY environment variable är inte satt!');
        return;
    }

    console.log('✅ OpenAI API-nyckel är satt\n');

    // Testa några frågor från varje svårighetsgrad
    const testCases = [
        {
            type: 'regular',
            difficulty: 'easy',
            question: questionsDB.easy[0]
        },
        {
            type: 'regular', 
            difficulty: 'medium',
            question: questionsDB.medium[0]
        },
        {
            type: 'tiebreaker',
            difficulty: 'easy',
            question: tiebreakerQuestions.easy[0]
        }
    ];

    for (let i = 0; i < testCases.length; i++) {
        const test = testCases[i];
        console.log(`📝 Test ${i + 1}/${testCases.length}: ${test.type} - ${test.difficulty}`);
        
        try {
            let result;
            if (test.type === 'regular') {
                const q = test.question;
                console.log(`   Fråga: "${q.question}"`);
                console.log(`   Rätt svar: "${q.answers[q.correct]}"`);
                
                result = await verifyQuestion(
                    q.question,
                    q.answers,
                    q.correct,
                    test.difficulty
                );
            } else {
                const q = test.question;
                console.log(`   Utslagsfråga: "${q.question}"`);
                console.log(`   Rätt svar: ${q.answer} (±${q.tolerance})`);
                
                result = await verifyTiebreakerQuestion(
                    q.question,
                    q.answer,
                    q.tolerance,
                    test.difficulty
                );
            }
            
            if (result) {
                console.log('   📋 OpenAI Granskning:');
                console.log('   ' + result.replace(/\n/g, '\n   '));
                
                if (result.includes('STATUS: KORRIGERA')) {
                    console.log('   ⚠️  Denna fråga behöver korrigering!');
                } else {
                    console.log('   ✅ Denna fråga ser bra ut!');
                }
            } else {
                console.log('   ❌ Fel vid granskning');
            }
            
        } catch (error) {
            console.error(`   ❌ Fel: ${error.message}`);
        }
        
        console.log('\n' + '-'.repeat(60) + '\n');
        
        // Paus mellan anrop
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    console.log('🧪 Test slutfört!');
    console.log('\nOm du vill köra alla frågor, använd: npm run verify-questions');
    console.log('⚠️  Observera: Fullständig granskning kostar ~$3-5');
}

// Kör test
testVerification().catch(console.error); 