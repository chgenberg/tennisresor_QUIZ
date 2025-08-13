#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { questionsDB, tiebreakerQuestions } = require('./questions.js');

function ensureDir(dir) {
	if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function escapeCsv(value) {
	if (value === null || value === undefined) return '';
	const s = String(value).replace(/\r?\n/g, ' ').trim();
	if (s.includes(',') || s.includes('"')) {
		return '"' + s.replace(/"/g, '""') + '"';
	}
	return s;
}

function exportStandard(questionsDB) {
	const rows = [];
	rows.push(['type','difficulty','question','answers','correctIndex','correctAnswerText']);
	for (const difficulty of Object.keys(questionsDB)) {
		for (const q of questionsDB[difficulty]) {
			const answers = Array.isArray(q.answers) ? q.answers : [];
			const correctIndex = Number.isInteger(q.correct) ? q.correct : '';
			const correctText = (answers[correctIndex] ?? '').toString();
			rows.push([
				'choice',
				difficulty,
				q.question,
				answers.join(' | '),
				correctIndex,
				correctText
			]);
		}
	}
	return rows;
}

function exportTiebreakers(tiebreakerQuestions) {
	const rows = [];
	rows.push(['type','difficulty','question','answer','tolerance','hint']);
	for (const difficulty of Object.keys(tiebreakerQuestions)) {
		for (const q of tiebreakerQuestions[difficulty]) {
			const answer = Array.isArray(q.answer) ? q.answer.join(' | ') : q.answer;
			const tol = Array.isArray(q.tolerance) ? q.tolerance.join(' | ') : (q.tolerance ?? '');
			rows.push([
				'tiebreaker',
				difficulty,
				q.question,
				answer ?? '',
				tol,
				q.hint ?? ''
			]);
		}
	}
	return rows;
}

function toCsv(rows) {
	return rows.map(r => r.map(escapeCsv).join(',')).join('\n') + '\n';
}

(function main(){
	const outDir = path.join(__dirname, 'exports');
	ensureDir(outDir);
	const ts = new Date().toISOString().replace(/[:.]/g,'-');

	// JSON export
	const jsonPayload = {
		questionsDB,
		tiebreakerQuestions,
		generatedAt: new Date().toISOString()
	};
	const jsonPath = path.join(outDir, `questions-export-${ts}.json`);
	fs.writeFileSync(jsonPath, JSON.stringify(jsonPayload, null, 2), 'utf8');

	// CSV export (two sheets merged with header blocks)
	const standardRows = exportStandard(questionsDB);
	const tieRows = exportTiebreakers(tiebreakerQuestions);

	const csvParts = [];
	csvParts.push('# Multiple-choice questions');
	csvParts.push(toCsv(standardRows));
	csvParts.push('');
	csvParts.push('# Tiebreaker questions');
	csvParts.push(toCsv(tieRows));
	const csv = csvParts.join('\n');
	const csvPath = path.join(outDir, `questions-export-${ts}.csv`);
	fs.writeFileSync(csvPath, csv, 'utf8');

	console.log('Export complete:');
	console.log('JSON:', jsonPath);
	console.log('CSV :', csvPath);
})(); 