// Tennis Quiz Application
class TennisQuiz {
    constructor() {
        this.currentScreen = 'welcome';
        this.selectedDifficulty = null;
        this.userEmail = '';
        this.currentQuestions = [];
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.totalQuestions = 10;
        this.userAnswers = [];
        this.timePerQuestion = 30000; // 30 seconds
        this.questionTimer = null;
        
        this.initializeEventListeners();
        this.showScreen('welcome-screen');
    }

    initializeEventListeners() {
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
        document.getElementById('next-btn').addEventListener('click', () => {
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
        const email = document.getElementById('email').value.trim();
        const difficulty = document.querySelector('input[name="difficulty"]:checked');
        const privacy = document.getElementById('privacy-consent').checked;

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
            background: ${type === 'error' ? '#f44336' : '#4CAF50'};
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

    startQuiz() {
        if (!this.validateForm()) {
            return;
        }

        this.userEmail = document.getElementById('email').value.trim();
        this.selectedDifficulty = document.querySelector('input[name="difficulty"]:checked').value;
        
        // Generate random questions for selected difficulty
        this.generateQuestions();
        
        // Update difficulty display
        this.updateDifficultyDisplay();
        
        // Reset quiz state
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.userAnswers = [];
        
        // Show quiz screen
        this.showScreen('quiz-screen');
        
        // Load first question
        this.loadQuestion();
    }

    generateQuestions() {
        const allQuestions = questionsDB[this.selectedDifficulty];
        const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
        this.currentQuestions = shuffled.slice(0, this.totalQuestions);
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
        
        // Update progress
        this.updateProgress();
        
        // Update question number
        document.getElementById('question-num').textContent = this.currentQuestionIndex + 1;
        document.getElementById('current-question').textContent = this.currentQuestionIndex + 1;
        
        // Set question text
        document.getElementById('question-text').textContent = question.question;
        
        // Create answer options
        this.createAnswerOptions(question.answers);
        
        // Hide next button
        document.getElementById('next-btn').style.display = 'none';
        
        // Start timer (optional)
        this.startQuestionTimer();
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
        // Clear previous selections
        document.querySelectorAll('.answer-option').forEach(btn => {
            btn.classList.remove('selected');
        });
        
        // Mark current selection
        buttonElement.classList.add('selected');
        
        // Store answer
        const question = this.currentQuestions[this.currentQuestionIndex];
        this.userAnswers[this.currentQuestionIndex] = {
            selectedIndex: selectedIndex,
            correct: selectedIndex === question.correct,
            question: question.question,
            selectedAnswer: question.answers[selectedIndex],
            correctAnswer: question.answers[question.correct]
        };
        
        // Clear timer
        if (this.questionTimer) {
            clearTimeout(this.questionTimer);
        }
        
        // Show correct/incorrect immediately
        this.revealAnswer(selectedIndex);
        
        // Show next button after a delay
        setTimeout(() => {
            document.getElementById('next-btn').style.display = 'flex';
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
        
        // Update score
        if (selectedIndex === question.correct) {
            this.score++;
            this.showFeedback('Rätt svar!', 'success');
        } else {
            this.showFeedback(`Fel svar. Rätt svar var: ${question.answers[question.correct]}`, 'error');
        }
    }

    showFeedback(message, type) {
        // Create temporary feedback element
        const feedback = document.createElement('div');
        feedback.className = `question-feedback ${type}`;
        feedback.textContent = message;
        feedback.style.cssText = `
            margin-top: 20px;
            padding: 15px;
            border-radius: 8px;
            background: ${type === 'success' ? '#e8f5e8' : '#ffebee'};
            color: ${type === 'success' ? '#2e7d32' : '#c62828'};
            border: 1px solid ${type === 'success' ? '#4CAF50' : '#f44336'};
            font-weight: 500;
            text-align: center;
            animation: slideIn 0.3s ease;
        `;
        
        document.querySelector('.question-container').appendChild(feedback);
        
        // Remove after delay
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.parentNode.removeChild(feedback);
            }
        }, 3000);
    }

    startQuestionTimer() {
        // Optional: Add timer functionality
        // For now, we'll skip the automatic timer
        /*
        this.questionTimer = setTimeout(() => {
            // Auto-select random answer if no answer given
            const randomIndex = Math.floor(Math.random() * 4);
            const randomButton = document.querySelector(`[data-index="${randomIndex}"]`);
            if (randomButton && !randomButton.classList.contains('disabled')) {
                this.selectAnswer(randomIndex, randomButton);
            }
        }, this.timePerQuestion);
        */
    }

    nextQuestion() {
        this.currentQuestionIndex++;
        this.loadQuestion();
    }

    showResults() {
        this.showScreen('results-screen');
        this.displayResults();
    }

    displayResults() {
        const percentage = Math.round((this.score / this.totalQuestions) * 100);
        
        // Update score display
        document.getElementById('final-score').textContent = this.score;
        document.getElementById('score-percentage').textContent = `${percentage}%`;
        
        // Set score message based on performance
        const message = this.getScoreMessage(percentage);
        document.getElementById('score-message').textContent = message;
        
        // Update difficulty display
        const difficultyNames = {
            'easy': 'Lätt',
            'medium': 'Medel', 
            'hard': 'Svår',
            'expert': 'Expert'
        };
        document.getElementById('completed-difficulty').textContent = difficultyNames[this.selectedDifficulty];
        
        // Update trophy color based on score
        this.updateTrophyDisplay(percentage);
        
        // Store result for sharing
        this.storeResult();
    }

    getScoreMessage(percentage) {
        if (percentage >= 90) {
            return "Fantastiskt! Du är en sann tennisexpert! 🏆";
        } else if (percentage >= 80) {
            return "Mycket bra! Du har utmärkta tenniskunskaper! 🥇";
        } else if (percentage >= 70) {
            return "Bra jobbat! Du vet mycket om tennis! 🥈";
        } else if (percentage >= 60) {
            return "Hyfsigt! Du har grundläggande tenniskunskaper! 🥉";
        } else if (percentage >= 40) {
            return "Okej resultat, men det finns utrymme för förbättring! 📚";
        } else {
            return "Kanske dags att titta mer på tennis? 📺";
        }
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
        
        // Here you could also send to a backend server
        // this.sendResultToServer(result);
    }

    shareOnFacebook() {
        const percentage = Math.round((this.score / this.totalQuestions) * 100);
        const difficultyNames = {
            'easy': 'Lätt',
            'medium': 'Medel',
            'hard': 'Svår',
            'expert': 'Expert'
        };
        
        const shareText = `Jag fick ${this.score}/${this.totalQuestions} (${percentage}%) på Tennis Quiz (${difficultyNames[this.selectedDifficulty]})! Kan du slå mitt resultat?`;
        const shareUrl = window.location.href;
        
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
        
        // Open Facebook share dialog
        window.open(facebookUrl, 'facebook-share-dialog', 'width=626,height=436,resizable=yes,scrollbars=yes');
    }

    resetQuiz() {
        // Reset all state
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.userAnswers = [];
        this.selectedDifficulty = null;
        this.userEmail = '';
        
        // Reset form
        document.getElementById('start-form').reset();
        document.querySelectorAll('.option-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        // Show welcome screen
        this.showScreen('welcome-screen');
    }

    showScreen(screenId) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Show selected screen
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.add('active');
        }
        
        this.currentScreen = screenId;
        
        // Scroll to top
        window.scrollTo(0, 0);
    }

    // Optional: Send results to server
    async sendResultToServer(result) {
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
            }
        } catch (error) {
            console.error('Failed to submit result:', error);
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
        
        .notification {
            font-family: 'Poppins', sans-serif;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .answer-option {
            transition: all 0.3s ease;
        }
        
        .answer-option:hover:not(.disabled) {
            transform: translateX(5px);
        }
        
        .screen {
            min-height: 600px;
        }
        
        @media (max-width: 768px) {
            .notification {
                left: 20px;
                right: 20px;
                top: 20px;
                transform: translateY(-100%);
            }
            
            .notification.show {
                transform: translateY(0);
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
    // Add tennis ball animation on page load
    const tennisAnimation = document.querySelector('.tennis-animation i');
    if (tennisAnimation) {
        tennisAnimation.addEventListener('animationiteration', () => {
            // Add bounce effect randomly
            if (Math.random() > 0.7) {
                tennisAnimation.style.animation = 'bounce 0.6s ease, spin 3s linear infinite';
                setTimeout(() => {
                    tennisAnimation.style.animation = 'spin 3s linear infinite';
                }, 600);
            }
        });
    }
    
    // Add hover effects to difficulty cards
    document.querySelectorAll('.option-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            if (!card.parentElement.querySelector('input').checked) {
                card.style.transform = 'translateY(0) scale(1)';
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
    });
}

// Preload images and resources
function preloadResources() {
    // Preload FontAwesome icons
    const icons = ['fa-tennis-ball', 'fa-trophy', 'fa-play', 'fa-facebook-f', 'fa-redo'];
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