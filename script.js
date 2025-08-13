// Tennis Quiz Application with Mailchimp Integration
class TennisQuiz {
    constructor() {
        this.currentScreen = 'hero';
        this.selectedDifficulty = null;
        this.userEmail = '';
        this.currentQuestions = [];
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.incorrectCount = 0;
        this.totalQuestions = 15;
        this.userAnswers = [];
        this.timePerQuestion = 30000; // 30 seconds
        this.questionTimer = null;
        this.answerConfirmed = false;
        this.currentSelection = null;
        this.isEmbedded = false;
        
        // Note: Mailchimp configuration is now handled securely on the backend
        // No API keys or sensitive data in frontend code
        
        this.initializeEventListeners();
        
        const didAutostart = this.tryAutostartFromParams();
        if (!didAutostart) {
            // If embedded, go directly to welcome screen and post height
            const params = new URLSearchParams(window.location.search);
            const embedMode = params.get('embed') === '1' || params.has('shopify');
            if (embedMode) {
                this.isEmbedded = true;
                this.showScreen('welcome-screen');
                this.enableEmbedAutoResize();
            } else {
                this.showScreen('hero-screen');
            }
        } else {
            // Autostart path: still enable auto-resize if embedded
            const params = new URLSearchParams(window.location.search);
            const embedMode = params.get('embed') === '1' || params.has('shopify');
            if (embedMode) {
                this.isEmbedded = true;
                this.enableEmbedAutoResize();
            }
        }
    }

    enableEmbedAutoResize() {
        try {
            // Initial post
            this.postHeightToParent();
            // Mutation observer
            const observer = new MutationObserver(() => this.postHeightToParent());
            observer.observe(document.body, { childList: true, subtree: true, attributes: true, characterData: true });
            // Periodic fallback
            this._embedResizeTimer = setInterval(() => this.postHeightToParent(), 700);
        } catch (_) { /* ignore */ }
    }

    // Parse query parameters and autostart if provided
    tryAutostartFromParams() {
        const params = new URLSearchParams(window.location.search);
        const emailParam = params.get('email') || params.get('e') || '';
        const levelParamRaw = (params.get('level') || params.get('difficulty') || params.get('lvl') || '').toLowerCase();
        const embedMode = params.get('embed') === '1' || params.has('shopify');
        const viewParam = (params.get('view') || '').toLowerCase();
        const autostart = params.get('autostart') === '1' || params.get('start') === '1' || (!!emailParam && !!levelParamRaw);

        // If embedded, add body class to simplify welcome UI
        if (embedMode) {
            document.body.classList.add('embed-mode');
            if (viewParam === 'mobile') {
                document.body.classList.add('embed-mobile');
            }
        }
        // Fallback: if body already has embed-mode class, treat as embedded
        if (document.body.classList.contains('embed-mode')) {
            this.isEmbedded = true;
        }
        
        const levelMap = {
            'latt': 'easy', 'lätt': 'easy', 'easy': 'easy',
            'medel': 'medium', 'medium': 'medium',
            'svar': 'hard', 'svår': 'hard', 'hard': 'hard',
            'expert': 'expert'
        };
        const mappedDifficulty = levelMap[levelParamRaw];
        
        if (autostart) {
            const difficultyToUse = mappedDifficulty || 'medium';
            this.startQuizWithParams(emailParam, difficultyToUse);
            return true;
        }
        
        return false;
    }

    startQuizWithParams(email, difficulty) {
        // Set internal state directly and start quiz flow
        this.userEmail = String(email).trim();
        this.selectedDifficulty = difficulty;
        
        // Prepare questions and UI
        this.generateQuestions();
        this.updateDifficultyDisplay();
        
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.incorrectCount = 0;
        this.userAnswers = [];
        
        // Reset score tracker display
        const correctEl = document.getElementById('correct-count');
        const incorrectEl = document.getElementById('incorrect-count');
        if (correctEl) correctEl.textContent = '0';
        if (incorrectEl) incorrectEl.textContent = '0';
        
        // Jump straight to quiz screen
        this.showScreen('quiz-screen');
        this.loadQuestion();
    }

    initializeEventListeners() {
        // Hero CTA button
        document.getElementById('start-quiz-hero').addEventListener('click', () => {
            this.showScreen('welcome-screen');
        });

        // Start form submission
        document.getElementById('start-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.startQuiz();
        });

        // Privacy policy modal
        document.getElementById('privacy-link').addEventListener('click', (e) => {
            e.preventDefault();
            this.showPrivacyModal();
        });

        // Modal close events
        document.querySelectorAll('.close-modal, .close-modal-btn').forEach(element => {
            element.addEventListener('click', () => {
                this.hidePrivacyModal();
            });
        });

        // Close modal when clicking outside
        document.getElementById('privacy-modal').addEventListener('click', (e) => {
            if (e.target.id === 'privacy-modal') {
                this.hidePrivacyModal();
            }
        });

        // Next button
        document.getElementById('next-question').addEventListener('click', () => {
            this.nextQuestion();
        });

        // Play again button
        document.getElementById('play-again').addEventListener('click', () => {
            this.resetQuiz();
        });

        // Facebook share button
        document.getElementById('share-facebook').addEventListener('click', () => {
            this.shareOnFacebook();
        });

        // Newsletter form - temporarily disabled
        document.getElementById('newsletter-form').addEventListener('submit', (e) => {
            e.preventDefault();
            // this.subscribeToNewsletter();
            // Show success message without actually subscribing
            document.getElementById('mailchimp-signup').style.display = 'none';
            alert('Tack! Newsletter-funktionen kommer snart tillbaka.');
        });

        // Difficulty selection visual feedback
        document.querySelectorAll('input[name="difficulty"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.updateDifficultySelection(e.target.value);
            });
        });
    }

    updateDifficultySelection(difficulty) {
        // Remove previous selections
        document.querySelectorAll('.option-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        // Add selection to current choice
        const selectedCard = document.querySelector(`input[value="${difficulty}"]`).nextElementSibling;
        selectedCard.classList.add('selected');
        
        this.selectedDifficulty = difficulty;

        // Auto-start in embed mode to avoid Start button clicks being blocked by hosts
        if (this.isEmbedded) {
            setTimeout(() => this.startQuizWithParams('', difficulty), 50);
        }
    }

    showPrivacyModal() {
        document.getElementById('privacy-modal').style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    hidePrivacyModal() {
        document.getElementById('privacy-modal').style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    validateForm() {
        const difficulty = document.querySelector('input[name="difficulty"]:checked');

        // Embed mode or when email/consent fields are not present: only difficulty required
        if (this.isEmbedded || !document.getElementById('email')) {
            if (!difficulty) {
                this.showNotification('Vänligen välj en svårighetsgrad', 'error');
                return false;
            }
            return true;
        }

        const emailInput = document.getElementById('email');
        const privacyEl = document.getElementById('privacy-consent');
        const email = emailInput ? emailInput.value.trim() : '';
        const privacy = privacyEl ? privacyEl.checked : false;

        if (!email || !this.isValidEmail(email)) {
            this.showNotification('Vänligen ange en giltig e-postadress', 'error');
            return false;
        }

        if (!difficulty) {
            this.showNotification('Vänligen välj en svårighetsgrad', 'error');
            return false;
        }

        if (!privacy) {
            this.showNotification('Du måste godkänna integritetsvillkoren för att fortsätta', 'error');
            return false;
        }

        return true;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'error' ? 'fa-exclamation-triangle' : 'fa-info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'error' ? '#e53935' : '#4caf50'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            z-index: 10000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    async startQuiz() {
        if (!this.validateForm()) {
            return;
        }

        this.userEmail = document.getElementById('email').value.trim();
        this.selectedDifficulty = document.querySelector('input[name="difficulty"]:checked').value;
        
        // Newsletter signup temporarily disabled - can be re-enabled later
        // if (document.getElementById('privacy-consent').checked) {
        //     await this.subscribeEmailToMailchimp(this.userEmail);
        // }
        
        // Generate random questions for selected difficulty
        this.generateQuestions();
        
        // Update difficulty display
        this.updateDifficultyDisplay();
        
        // Reset quiz state
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.incorrectCount = 0;
        this.userAnswers = [];
        
        // Reset score tracker display
        document.getElementById('correct-count').textContent = '0';
        document.getElementById('incorrect-count').textContent = '0';
        
        // Show quiz screen
        this.showScreen('quiz-screen');
        
        // Load first question
        this.loadQuestion();
    }

    async subscribeEmailToMailchimp(email) {
        try {
            // All Mailchimp communication is now handled securely through backend API
            const response = await fetch('/api/mailchimp/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    tags: ['tennis-quiz'],
                    merge_fields: {
                        QUIZ_DATE: new Date().toISOString(),
                        DIFFICULTY: this.selectedDifficulty
                    }
                })
            });

            if (response.ok) {
                console.log('Successfully subscribed to newsletter');
            } else if (response.status === 503) {
                console.log('Newsletter service not configured');
                // Continue with quiz even if newsletter service is not available
            }
        } catch (error) {
            console.error('Failed to subscribe to newsletter:', error);
            // Don't block the quiz if subscription fails
        }
    }

    generateQuestions() {
        const allQuestions = questionsDB[this.selectedDifficulty];
        const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
        this.currentQuestions = shuffled.slice(0, this.totalQuestions - 1); // 14 regular questions
        
        // Add one random tiebreaker question as the last question
        const tiebreakers = tiebreakerQuestions[this.selectedDifficulty];
        const randomTiebreaker = tiebreakers[Math.floor(Math.random() * tiebreakers.length)];
        this.currentQuestions.push(randomTiebreaker);
    }

    updateDifficultyDisplay() {
        const difficultyNames = {
            'easy': 'Lätt',
            'medium': 'Medel',
            'hard': 'Svår',
            'expert': 'Expert'
        };
        
        document.getElementById('current-difficulty').textContent = difficultyNames[this.selectedDifficulty];
        document.getElementById('total-questions').textContent = this.totalQuestions;
    }

    loadQuestion() {
        if (this.currentQuestionIndex >= this.currentQuestions.length) {
            this.showResults();
            return;
        }

        const question = this.currentQuestions[this.currentQuestionIndex];
        const isTiebreaker = question.hasOwnProperty('answer');
        
        // Update progress
        this.updateProgress();
        
        // Update question number
        document.getElementById('question-num').textContent = this.currentQuestionIndex + 1;
        document.getElementById('current-question').textContent = this.currentQuestionIndex + 1;
        
        // Set question text
        let questionText = question.question;
        if (isTiebreaker) {
            questionText = `🎯 UTSLAGSFRÅGA: ${question.question}`;
        }
        document.getElementById('question-text').textContent = questionText;
        
        // Create answer options or input field
        if (isTiebreaker) {
            this.createTiebreakerInput(question);
        } else {
            this.createAnswerOptions(question.answers);
        }
        
        // Reset answer state for new question
        this.answerConfirmed = false;
        this.currentSelection = null;
        
        // Hide next button
        document.getElementById('next-question').style.display = 'none';
        
        // Start timer (optional)
        this.startQuestionTimer();

        // Update height after DOM changes
        this.postHeightToParent();
    }

    createTiebreakerInput(question) {
        const container = document.getElementById('answers-container');
        container.innerHTML = `
            <div class="tiebreaker-container">
                <div class="tiebreaker-input-wrapper">
                    <input type="number" id="tiebreaker-answer" class="tiebreaker-input" 
                           placeholder="Skriv ditt svar här..." 
                           autocomplete="off" inputmode="numeric" pattern="[0-9]*" enterkeyhint="done">
                    <button id="submit-tiebreaker" class="submit-tiebreaker">
                        <i class="fas fa-check"></i>
                        Svara
                    </button>
                </div>
            </div>
        `;
        
        // Add event listeners
        const input = document.getElementById('tiebreaker-answer');
        const submitBtn = document.getElementById('submit-tiebreaker');
        
        const submitAnswer = () => {
            const userAnswer = parseFloat(input.value);
            if (!isNaN(userAnswer)) {
                this.checkTiebreakerAnswer(userAnswer, question);
            } else {
                this.showNotification('Vänligen ange ett giltigt nummer', 'error');
            }
        };
        
        submitBtn.addEventListener('click', submitAnswer);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                submitAnswer();
            }
        });
        
        // Focus on input
        setTimeout(() => input.focus(), 100);
    }

    checkTiebreakerAnswer(userAnswer, question) {
        const correctAnswer = question.answer;
        const tolerance = question.tolerance;
        const isCorrect = Math.abs(userAnswer - correctAnswer) <= tolerance;
        
        // Disable input
        document.getElementById('tiebreaker-answer').disabled = true;
        document.getElementById('submit-tiebreaker').disabled = true;
        
        // Update score and visual feedback
        const inputEl = document.getElementById('tiebreaker-answer');
        const submitBtn = document.getElementById('submit-tiebreaker');
        
        if (isCorrect) {
            this.score++;
            this.updateScoreTracker('correct');
            // Show success with green styling
            inputEl.style.borderColor = '#22c55e';
            inputEl.style.backgroundColor = '#f0fdf4';
            submitBtn.style.background = 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)';
        } else {
            this.incorrectCount++;
            this.updateScoreTracker('incorrect');
            // Show error with red styling
            inputEl.style.borderColor = '#ef4444';
            inputEl.style.backgroundColor = '#fef2f2';
            submitBtn.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
        }
        
        // Store answer
        this.userAnswers[this.currentQuestionIndex] = {
            selectedAnswer: userAnswer,
            correct: isCorrect,
            question: question.question,
            correctAnswer: correctAnswer,
            isTiebreaker: true
        };
        
        // Show next button after delay
        setTimeout(() => {
            document.getElementById('next-question').style.display = 'block';
        }, 2000);
    }

    updateProgress() {
        const progressPercent = ((this.currentQuestionIndex + 1) / this.totalQuestions) * 100;
        document.querySelector('.progress-fill').style.width = `${progressPercent}%`;
    }

    createAnswerOptions(answers) {
        const container = document.getElementById('answers-container');
        container.innerHTML = '';
        
        answers.forEach((answer, index) => {
            const button = document.createElement('button');
            button.className = 'answer-option';
            button.textContent = answer;
            button.setAttribute('data-index', index);
            
            button.addEventListener('click', () => {
                this.selectAnswer(index, button);
            });
            
            container.appendChild(button);
        });
    }

    selectAnswer(selectedIndex, buttonElement) {
        // Don't allow selection if answer is already confirmed
        if (this.answerConfirmed) {
            return;
        }
        
        // Mark this as the final selection
        this.currentSelection = selectedIndex;
        
        // Confirm answer immediately
        this.confirmAnswer();
    }
    
    confirmAnswer() {
        if (this.answerConfirmed || this.currentSelection === null) {
            return;
        }
        
        this.answerConfirmed = true;
        const selectedIndex = this.currentSelection;
        
        // Store final answer
        const question = this.currentQuestions[this.currentQuestionIndex];
        this.userAnswers[this.currentQuestionIndex] = {
            selectedIndex: selectedIndex,
            correct: selectedIndex === question.correct,
            question: question.question,
            selectedAnswer: question.answers[selectedIndex],
            correctAnswer: question.answers[question.correct],
            isTiebreaker: false
        };
        
        // Clear timer
        if (this.questionTimer) {
            clearTimeout(this.questionTimer);
        }
        
        // Show correct/incorrect
        this.revealAnswer(selectedIndex);
        
        // Show next button after a delay
        setTimeout(() => {
            document.getElementById('next-question').style.display = 'block';
        }, 1500);
    }

    revealAnswer(selectedIndex) {
        const question = this.currentQuestions[this.currentQuestionIndex];
        const allButtons = document.querySelectorAll('.answer-option');
        
        allButtons.forEach((btn, index) => {
            btn.classList.add('disabled');
            
            if (index === question.correct) {
                btn.classList.add('correct');
            } else if (index === selectedIndex) {
                btn.classList.add('incorrect');
            }
        });
        
        // Update score and tracker
        if (selectedIndex === question.correct) {
            this.score++;
            this.updateScoreTracker('correct');
        } else {
            this.incorrectCount++;
            this.updateScoreTracker('incorrect');
        }

        // Height may change due to classes; notify parent
        this.postHeightToParent();
    }



    updateScoreTracker(type) {
        const correctEl = document.getElementById('correct-count');
        const incorrectEl = document.getElementById('incorrect-count');
        
        // Update counts
        correctEl.textContent = this.score;
        incorrectEl.textContent = this.incorrectCount;
        
        // Add animation
        const scoreItem = type === 'correct' ? 
            correctEl.parentElement : incorrectEl.parentElement;
        
        scoreItem.classList.add('updated');
        setTimeout(() => {
            scoreItem.classList.remove('updated');
        }, 300);
    }

    startQuestionTimer() {
        // Optional: Add timer functionality
        // For now, we'll skip the automatic timer
    }

    nextQuestion() {
        this.currentQuestionIndex++;
        this.loadQuestion();
    }

    showResults() {
        const percentage = Math.round((this.score / this.totalQuestions) * 100);
        
        document.getElementById('final-score').textContent = `${this.score}/${this.totalQuestions}`;
        document.getElementById('score-percentage').textContent = `${percentage}%`;
        document.getElementById('completed-difficulty').textContent = 
            this.selectedDifficulty.charAt(0).toUpperCase() + this.selectedDifficulty.slice(1);
        
        // Show trophy animation based on score
        const trophyIcon = document.getElementById('trophy-icon');
        if (percentage >= 90) {
            trophyIcon.className = 'fas fa-trophy';
            trophyIcon.style.color = '#FFD700';
        } else if (percentage >= 70) {
            trophyIcon.className = 'fas fa-medal';
            trophyIcon.style.color = '#C0C0C0';
        } else if (percentage >= 50) {
            trophyIcon.className = 'fas fa-award';
            trophyIcon.style.color = '#CD7F32';
        } else {
            trophyIcon.className = 'fas fa-thumbs-up';
            trophyIcon.style.color = '#7cb342';
        }
        
        // Update score message with links
        const scoreMessage = this.getScoreMessage(percentage);
        document.getElementById('score-message').innerHTML = scoreMessage;
        
        // Setup sharing functionality
        this.setupSocialSharing(percentage);
        
        this.showScreen('results-screen');
        
        // Save result to localStorage
        const result = {
            score: this.score,
            total: this.totalQuestions,
            percentage: percentage,
            difficulty: this.selectedDifficulty,
            timestamp: new Date().toISOString()
        };
        localStorage.setItem('tennisQuizResult', JSON.stringify(result));
        
        // Log result to server
        this.logResult(result);

        // Post to parent for host page actions
        this.postResultToParent(result);
    }

    postResultToParent(result) {
        try {
            if (window.parent && window.parent !== window) {
                window.parent.postMessage({ type: 'quiz:result', payload: result }, '*');
            }
        } catch (e) { /* ignore */ }
    }

    getScoreMessage(percentage) {
        const recordInfo = '<span class="record-line"><span class="emoji">🏆</span> Rekord: Jens Bryntesson & Andrés Ruiz Jansson - 14/15 på alla nivåer!</span>';
        const ctaInfo = '<span class="cta-line"><span class="emoji">🎾</span> <a href="https://www.tennisresor.net/pages/resor" target="_blank">Boka din tennisresa här!</a></span>';
        
        let mainMessage = '';
        if (percentage >= 90) {
            mainMessage = 'Fantastiskt! Du är en sann tennisexpert! <span class="emoji">🏆</span> Du är nästan lika bra som Jens & Andrés!';
        } else if (percentage >= 80) {
            mainMessage = 'Mycket bra! Du har utmärkta tenniskunskaper! <span class="emoji">🥇</span>';
        } else if (percentage >= 70) {
            mainMessage = 'Bra jobbat! Du vet mycket om tennis! <span class="emoji">🥈</span>';
        } else if (percentage >= 60) {
            mainMessage = 'Hyfsigt! Du har grundläggande tenniskunskaper! <span class="emoji">🥉</span>';
        } else if (percentage >= 40) {
            mainMessage = 'Okej resultat! Kanske dags för en tennisresa? <span class="emoji">📚</span>';
        } else {
            mainMessage = 'Övning ger färdighet! <span class="emoji">📺</span>';
        }
        
        return `${mainMessage}${recordInfo}${ctaInfo}`;
    }

    updateTrophyDisplay(percentage) {
        const trophy = document.getElementById('trophy-icon');
        
        if (percentage >= 90) {
            trophy.style.color = '#FFD700'; // Gold
        } else if (percentage >= 70) {
            trophy.style.color = '#C0C0C0'; // Silver
        } else if (percentage >= 50) {
            trophy.style.color = '#CD7F32'; // Bronze
        } else {
            trophy.style.color = '#808080'; // Gray
        }
    }

    storeResult() {
        const result = {
            email: this.userEmail,
            difficulty: this.selectedDifficulty,
            score: this.score,
            totalQuestions: this.totalQuestions,
            percentage: Math.round((this.score / this.totalQuestions) * 100),
            date: new Date().toISOString(),
            userAnswers: this.userAnswers
        };
        
        // Store in localStorage for this session
        localStorage.setItem('tennisQuizResult', JSON.stringify(result));
    }

    async sendResultToServer() {
        const result = {
            email: this.userEmail,
            difficulty: this.selectedDifficulty,
            score: this.score,
            totalQuestions: this.totalQuestions,
            percentage: Math.round((this.score / this.totalQuestions) * 100),
            date: new Date().toISOString()
        };
        
        try {
            const response = await fetch('/api/submit-result', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(result)
            });
            
            if (response.ok) {
                console.log('Result submitted successfully');
                
                // Mailchimp integration temporarily disabled
                // await this.updateMailchimpTags(result);
            }
        } catch (error) {
            console.error('Failed to submit result:', error);
        }
    }

    async updateMailchimpTags(result) {
        try {
            const response = await fetch('/api/mailchimp/update-tags', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: result.email,
                    tags: [
                        `quiz-${result.difficulty}`,
                        `score-${result.percentage >= 80 ? 'high' : result.percentage >= 50 ? 'medium' : 'low'}`
                    ],
                    merge_fields: {
                        LAST_QUIZ: new Date().toISOString(),
                        QUIZ_SCORE: result.percentage
                    }
                })
            });

            if (response.status === 503) {
                console.log('Newsletter service not configured - skipping tag update');
            }
        } catch (error) {
            console.error('Failed to update Mailchimp tags:', error);
        }
    }

    async subscribeToNewsletter() {
        const email = document.getElementById('newsletter-email').value.trim();
        
        if (!this.isValidEmail(email)) {
            this.showNotification('Vänligen ange en giltig e-postadress', 'error');
            return;
        }

        try {
            const response = await fetch('/api/mailchimp/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    tags: ['tennis-quiz', 'post-quiz-signup'],
                    merge_fields: {
                        QUIZ_DATE: new Date().toISOString(),
                        QUIZ_SCORE: Math.round((this.score / this.totalQuestions) * 100)
                    }
                })
            });

            if (response.ok) {
                this.showNotification('Tack för din prenumeration! Kolla din e-post för bekräftelse.', 'success');
                document.getElementById('mailchimp-signup').style.display = 'none';
            } else if (response.status === 503) {
                this.showNotification('Nyhetsbrev-tjänsten är inte tillgänglig just nu.', 'error');
            } else {
                this.showNotification('Något gick fel. Försök igen senare.', 'error');
            }
        } catch (error) {
            console.error('Newsletter subscription error:', error);
            this.showNotification('Kunde inte prenumerera just nu. Försök igen senare.', 'error');
        }
    }

    shareOnFacebook() {
        const percentage = Math.round((this.score / this.totalQuestions) * 100);
        const difficultyNames = {
            'easy': 'Lätt',
            'medium': 'Medel',
            'hard': 'Svår',
            'expert': 'Expert'
        };
        
        const shareText = `Jag fick ${this.score}/${this.totalQuestions} (${percentage}%) på Tennisresors Quiz (${difficultyNames[this.selectedDifficulty]})! Kan du slå mitt resultat?`;
        const shareUrl = window.location.href;
        
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
        
        // Open Facebook share dialog
        window.open(facebookUrl, 'facebook-share-dialog', 'width=626,height=436,resizable=yes,scrollbars=yes');
    }

    resetQuiz() {
        // Reset all state
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.incorrectCount = 0;
        this.userAnswers = [];
        this.selectedDifficulty = null;
        this.userEmail = '';
        
        // Reset form
        document.getElementById('start-form').reset();
        document.querySelectorAll('.option-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        // Hide newsletter signup
        document.getElementById('mailchimp-signup').style.display = 'none';
        
        // Show hero screen
        this.showScreen('hero-screen');
    }

    showScreen(screenId) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Show selected screen with delay for animation
        setTimeout(() => {
            const targetScreen = document.getElementById(screenId);
            if (targetScreen) {
                targetScreen.classList.add('active');
            }
            
            this.currentScreen = screenId;
            
            // Scroll to top
            window.scrollTo(0, 0);

            // Notify parent for auto-resize if embedded
            this.postHeightToParent();
        }, 100);
    }

    postHeightToParent() {
        try {
            const height = Math.max(
                document.documentElement.scrollHeight,
                document.body.scrollHeight,
                document.documentElement.clientHeight
            );
            if (window.parent && window.parent !== window) {
                window.parent.postMessage({ type: 'quiz:height', height }, '*');
            }
        } catch (e) { /* ignore */ }
    }

    setupSocialSharing(percentage) {
        const difficultyNames = {
            easy: 'Lätt',
            medium: 'Medel', 
            hard: 'Svår',
            expert: 'Expert'
        };
        
        const baseMessage = `Jag fick ${this.score}/${this.totalQuestions} rätt (${percentage}%) i Tennisresor.net QUIZ på ${difficultyNames[this.selectedDifficulty]} nivå! 🎾`;
        const encouragement = "Hur många rätt får du? Testa ditt tennis-kunnande! 💪";
        const url = "https://www.tennisresor.net";
        
        // Create sharing buttons if they don't exist
        this.createSharingButtons();
        
        // Facebook sharing
        const facebookBtn = document.getElementById('share-facebook');
        if (facebookBtn) {
            facebookBtn.onclick = () => {
                const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(baseMessage + ' ' + encouragement)}`;
                window.open(facebookUrl, '_blank', 'width=600,height=400');
            };
        }
        
        // WhatsApp sharing
        const whatsappBtn = document.getElementById('share-whatsapp');
        if (whatsappBtn) {
            whatsappBtn.onclick = () => {
                const whatsappMessage = `${baseMessage}\n\n${encouragement}\n\n${url}`;
                const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`;
                window.open(whatsappUrl, '_blank');
            };
        }
        
        // Messenger sharing
        const messengerBtn = document.getElementById('share-messenger');
        if (messengerBtn) {
            messengerBtn.onclick = () => {
                const messengerUrl = `https://m.me/?text=${encodeURIComponent(baseMessage + '\n\n' + encouragement + '\n\n' + url)}`;
                window.open(messengerUrl, '_blank');
            };
        }
        
        // Copy link functionality
        const copyBtn = document.getElementById('copy-link');
        if (copyBtn) {
            copyBtn.onclick = () => {
                const textToCopy = `${baseMessage}\n\n${encouragement}\n\n${url}`;
                
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(textToCopy).then(() => {
                        this.showCopyFeedback(copyBtn);
                    });
                } else {
                    // Fallback for older browsers
                    const textArea = document.createElement('textarea');
                    textArea.value = textToCopy;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                    this.showCopyFeedback(copyBtn);
                }
            };
        }
    }
    
    createSharingButtons() {
        const actionButtons = document.querySelector('.action-buttons');
        if (!actionButtons) return;
        
        // Remove old buttons except play again
        const existingShares = actionButtons.querySelectorAll('.share-btn');
        existingShares.forEach(btn => btn.remove());
        
        // Create new sharing section
        const sharingSection = document.createElement('div');
        sharingSection.className = 'sharing-section';
        sharingSection.innerHTML = `
            <h4 class="sharing-title">🎾 Dela ditt resultat!</h4>
            <div class="sharing-buttons">
                <button id="share-facebook" class="share-btn facebook-btn">
                    <i class="fab fa-facebook-f"></i>
                    <span>Facebook</span>
                </button>
                <button id="share-whatsapp" class="share-btn whatsapp-btn">
                    <i class="fab fa-whatsapp"></i>
                    <span>WhatsApp</span>
                </button>
                <button id="share-messenger" class="share-btn messenger-btn">
                    <i class="fab fa-facebook-messenger"></i>
                    <span>Messenger</span>
                </button>
                <button id="copy-link" class="share-btn copy-btn">
                    <i class="fas fa-link"></i>
                    <span>Kopiera</span>
                </button>
            </div>
        `;
        
        // Insert before play again button
        const playAgainBtn = actionButtons.querySelector('.play-again-btn');
        if (playAgainBtn) {
            actionButtons.insertBefore(sharingSection, playAgainBtn);
        } else {
            actionButtons.appendChild(sharingSection);
        }
    }
    
    showCopyFeedback(button) {
        const originalContent = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i><span>Kopierat!</span>';
        button.style.background = 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)';
        
        setTimeout(() => {
            button.innerHTML = originalContent;
            button.style.background = '';
        }, 2000);
    }

    async logResult(result) {
        try {
            const response = await fetch('/api/log-quiz-result', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(result)
            });

            if (response.ok) {
                console.log('Result logged successfully');
            } else {
                console.error('Failed to log result:', response.status);
            }
        } catch (error) {
            console.error('Network error logging result:', error);
        }
    }
}

// Initialize quiz when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .question-feedback {
            animation: slideIn 0.3s ease;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .answer-option {
            transition: all 0.3s ease;
        }
        
        .tennis-logo {
            position: relative;
        }
        
        /* Horizontal layout optimizations */
        @media (max-aspect-ratio: 4/3) {
            .welcome-left, .results-left {
                flex: 0.8;
            }
            
            .welcome-right, .results-right {
                flex: 1.2;
            }
        }
        
        /* iFrame optimizations */
        @media (max-height: 600px) {
            .screen {
                padding: 20px;
            }
            
            .form-header {
                margin-bottom: 15px;
            }
            
            .difficulty-options {
                gap: 8px;
            }
            
            .option-card {
                padding: 12px;
            }
            
            .option-card p {
                display: none;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Initialize the quiz application
    window.tennisQuiz = new TennisQuiz();
    
    // Add some fun interactions
    addInteractiveElements();
});

function addInteractiveElements() {
    // Add hero image parallax effect
    const heroImage = document.querySelector('.hero-image');
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (heroImage && !isTouch) {
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            heroImage.style.transform = `scale(1.1) translate(${x}px, ${y}px)`;
        });
    }

    // Add tennis ball hover effect
    const tennisLogo = document.querySelector('.tennis-logo');
    if (tennisLogo) {
        tennisLogo.addEventListener('mouseenter', () => {
            const ball = tennisLogo.querySelector('i');
            ball.style.animation = 'bounce-slow 0.5s ease';
            setTimeout(() => {
                ball.style.animation = 'bounce-slow 3s ease-in-out infinite';
            }, 500);
        });
    }
    
    // Add hover effects to difficulty cards
    document.querySelectorAll('.option-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            if (!card.classList.contains('selected')) {
                card.style.transform = 'translateY(-3px)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (!card.classList.contains('selected')) {
                card.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && window.tennisQuiz.currentScreen === 'welcome-screen') {
            const form = document.getElementById('start-form');
            if (form.checkValidity()) {
                window.tennisQuiz.startQuiz();
            }
        }
        
        if (e.key === 'Escape') {
            window.tennisQuiz.hidePrivacyModal();
        }
        
        // Answer selection with number keys
        if (window.tennisQuiz.currentScreen === 'quiz-screen' && e.key >= '1' && e.key <= '4') {
            const answerIndex = parseInt(e.key) - 1;
            const answerButton = document.querySelector(`.answer-option[data-index="${answerIndex}"]`);
            if (answerButton && !answerButton.classList.contains('disabled')) {
                answerButton.click();
            }
        }
    });
}

// Preload images and resources
function preloadResources() {
    // Preload hero image
    const heroImage = new Image();
    heroImage.src = 'Public/AndresJens.jpg';
    
    // Preload FontAwesome icons
    const icons = ['fa-tennis-ball', 'fa-trophy', 'fa-play', 'fa-facebook-f', 'fa-redo', 'fa-seedling', 'fa-chart-line', 'fa-fire', 'fa-crown', 'fa-brain', 'fa-layer-group', 'fa-gift'];
    icons.forEach(icon => {
        const element = document.createElement('i');
        element.className = `fas ${icon}`;
        element.style.display = 'none';
        document.body.appendChild(element);
        setTimeout(() => document.body.removeChild(element), 100);
    });
}

// Call preload
preloadResources(); 