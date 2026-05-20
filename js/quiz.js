// CAPM Quiz Engine
// Handles quiz setup, question display, answer checking, and results

class QuizEngine {
    constructor() {
        this.currentQuiz = null;
        this.currentQuestionIndex = 0;
        this.userAnswers = [];
        this.startTime = null;
        this.selectedDifficulty = 'easy';
        this.selectedDomain = 'all';
        this.questionCount = 10;
        
        this.initializeEventListeners();
        this.checkURLParams();
    }

    initializeEventListeners() {
        // Difficulty buttons
        document.querySelectorAll('.difficulty-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.difficulty-btn').forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
                this.selectedDifficulty = e.currentTarget.dataset.difficulty;
            });
        });

        // Question count buttons
        document.querySelectorAll('.count-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.count-btn').forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
                this.questionCount = parseInt(e.currentTarget.dataset.count);
            });
        });

        // Domain select
        const domainSelect = document.getElementById('domainSelect');
        if (domainSelect) {
            domainSelect.addEventListener('change', (e) => {
                this.selectedDomain = e.target.value;
            });
        }

        // Start quiz button
        const startBtn = document.getElementById('startQuizBtn');
        if (startBtn) {
            startBtn.addEventListener('click', () => this.startQuiz());
        }

        // Submit answer button
        const submitBtn = document.getElementById('submitAnswerBtn');
        if (submitBtn) {
            submitBtn.addEventListener('click', () => this.submitAnswer());
        }

        // Next question button
        const nextBtn = document.getElementById('nextQuestionBtn');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextQuestion());
        }

        // Retake quiz button
        const retakeBtn = document.getElementById('retakeQuizBtn');
        if (retakeBtn) {
            retakeBtn.addEventListener('click', () => this.resetQuiz());
        }

        // Review answers button
        const reviewBtn = document.getElementById('reviewAnswersBtn');
        if (reviewBtn) {
            reviewBtn.addEventListener('click', () => this.showReview());
        }

        // Back to results button
        const backBtn = document.getElementById('backToResultsBtn');
        if (backBtn) {
            backBtn.addEventListener('click', () => this.showResults());
        }
    }

    checkURLParams() {
        const urlParams = new URLSearchParams(window.location.search);
        const domain = urlParams.get('domain');
        if (domain) {
            this.selectedDomain = domain;
            const domainSelect = document.getElementById('domainSelect');
            if (domainSelect) {
                domainSelect.value = domain;
            }
        }
    }

    startQuiz() {
        // Get questions based on selection
        const questions = this.getQuestions();
        
        if (questions.length === 0) {
            alert('No questions available for the selected criteria.');
            return;
        }

        this.currentQuiz = {
            questions: questions,
            domain: this.selectedDomain,
            difficulty: this.selectedDifficulty
        };
        
        this.currentQuestionIndex = 0;
        this.userAnswers = [];
        this.startTime = Date.now();

        // Hide setup, show quiz
        document.getElementById('quizSetup').style.display = 'none';
        document.getElementById('quizActive').style.display = 'block';

        this.displayQuestion();
    }

    getQuestions() {
        let allQuestions = [];

        // Get questions from selected domain(s)
        if (this.selectedDomain === 'all') {
            Object.values(quizQuestions).forEach(domainQuestions => {
                allQuestions = allQuestions.concat(domainQuestions);
            });
        } else {
            allQuestions = quizQuestions[this.selectedDomain] || [];
        }

        // Filter by difficulty
        const filteredQuestions = allQuestions.filter(q => 
            q.difficulty === this.selectedDifficulty
        );

        // If not enough questions of selected difficulty, include all difficulties
        const questionsToUse = filteredQuestions.length >= this.questionCount 
            ? filteredQuestions 
            : allQuestions;

        // Shuffle and select requested number
        return window.CAPMApp.getRandomItems(questionsToUse, this.questionCount);
    }

    displayQuestion() {
        const question = this.currentQuiz.questions[this.currentQuestionIndex];
        
        // Update progress
        document.getElementById('currentQuestion').textContent = this.currentQuestionIndex + 1;
        document.getElementById('totalQuestions').textContent = this.currentQuiz.questions.length;
        
        const progressPercent = ((this.currentQuestionIndex + 1) / this.currentQuiz.questions.length) * 100;
        document.getElementById('quizProgress').style.width = progressPercent + '%';

        // Update stats
        const correctCount = this.userAnswers.filter(a => a.correct).length;
        const incorrectCount = this.userAnswers.filter(a => !a.correct).length;
        document.getElementById('correctCount').textContent = correctCount;
        document.getElementById('incorrectCount').textContent = incorrectCount;

        // Display question
        document.getElementById('questionDomain').textContent = question.domain;
        document.getElementById('questionDifficulty').textContent = question.difficulty.toUpperCase();
        document.getElementById('questionDifficulty').className = `question-difficulty ${question.difficulty}`;
        document.getElementById('questionText').textContent = question.question;

        // Display options
        const optionsContainer = document.getElementById('answerOptions');
        optionsContainer.innerHTML = question.options.map((option, index) => `
            <div class="answer-option" data-index="${index}">
                <input type="radio" name="answer" id="option${index}" value="${index}">
                <label for="option${index}">${option}</label>
            </div>
        `).join('');

        // Add click handlers to options
        document.querySelectorAll('.answer-option').forEach(option => {
            option.addEventListener('click', () => {
                const radio = option.querySelector('input[type="radio"]');
                radio.checked = true;
                document.getElementById('submitAnswerBtn').disabled = false;
                
                // Visual feedback
                document.querySelectorAll('.answer-option').forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
            });
        });

        // Reset submit button
        document.getElementById('submitAnswerBtn').disabled = true;
        document.getElementById('answerFeedback').style.display = 'none';
        document.getElementById('questionCard').style.display = 'block';
    }

    submitAnswer() {
        const selectedOption = document.querySelector('input[name="answer"]:checked');
        if (!selectedOption) return;

        const selectedIndex = parseInt(selectedOption.value);
        const question = this.currentQuiz.questions[this.currentQuestionIndex];
        const isCorrect = selectedIndex === question.correct;

        // Store answer
        this.userAnswers.push({
            questionId: question.id,
            question: question.question,
            selectedIndex: selectedIndex,
            correctIndex: question.correct,
            correct: isCorrect,
            domain: question.domain,
            explanation: question.explanation
        });

        // Show feedback
        this.showFeedback(isCorrect, question);
    }

    showFeedback(isCorrect, question) {
        document.getElementById('questionCard').style.display = 'none';
        document.getElementById('answerFeedback').style.display = 'block';

        const feedbackIcon = document.getElementById('feedbackIcon');
        const feedbackTitle = document.getElementById('feedbackTitle');
        const feedbackText = document.getElementById('feedbackText');
        const explanation = document.getElementById('explanation');

        if (isCorrect) {
            feedbackIcon.innerHTML = '<i class="fas fa-check-circle" style="color: var(--success-color); font-size: 4rem;"></i>';
            feedbackTitle.textContent = 'Correct!';
            feedbackTitle.style.color = 'var(--success-color)';
            feedbackText.textContent = 'Great job! You got it right.';
        } else {
            feedbackIcon.innerHTML = '<i class="fas fa-times-circle" style="color: var(--danger-color); font-size: 4rem;"></i>';
            feedbackTitle.textContent = 'Incorrect';
            feedbackTitle.style.color = 'var(--danger-color)';
            feedbackText.textContent = `The correct answer is: ${question.options[question.correct]}`;
        }

        explanation.innerHTML = `<strong>Explanation:</strong><br>${question.explanation}`;

        // Update button text for last question
        const nextBtn = document.getElementById('nextQuestionBtn');
        if (this.currentQuestionIndex === this.currentQuiz.questions.length - 1) {
            nextBtn.innerHTML = 'View Results <i class="fas fa-arrow-right"></i>';
        } else {
            nextBtn.innerHTML = 'Next Question <i class="fas fa-arrow-right"></i>';
        }
    }

    nextQuestion() {
        this.currentQuestionIndex++;

        if (this.currentQuestionIndex < this.currentQuiz.questions.length) {
            this.displayQuestion();
        } else {
            this.finishQuiz();
        }
    }

    finishQuiz() {
        const endTime = Date.now();
        const timeSpent = Math.floor((endTime - this.startTime) / 1000);
        
        const correctAnswers = this.userAnswers.filter(a => a.correct).length;
        const totalQuestions = this.currentQuiz.questions.length;
        const percentage = Math.round((correctAnswers / totalQuestions) * 100);
        
        // Calculate points earned
        const pointsEarned = correctAnswers * 10;

        // Save to progress tracker
        if (this.selectedDomain !== 'all') {
            window.CAPMApp.progressTracker.addQuizScore(
                this.selectedDomain,
                correctAnswers,
                totalQuestions
            );
        }

        // Hide quiz, show results
        document.getElementById('quizActive').style.display = 'none';
        document.getElementById('quizResults').style.display = 'block';

        // Display results
        this.displayResults(correctAnswers, totalQuestions, percentage, timeSpent, pointsEarned);
    }

    displayResults(correct, total, percentage, timeSpent, points) {
        // Results icon and message
        const resultsIcon = document.getElementById('resultsIcon');
        const resultsMessage = document.getElementById('resultsMessage');

        if (percentage >= 90) {
            resultsIcon.innerHTML = '<i class="fas fa-trophy" style="color: gold;"></i>';
            resultsMessage.textContent = 'Outstanding! You\'re exam ready!';
        } else if (percentage >= 70) {
            resultsIcon.innerHTML = '<i class="fas fa-star" style="color: var(--primary-color);"></i>';
            resultsMessage.textContent = 'Great job! Keep up the good work!';
        } else if (percentage >= 50) {
            resultsIcon.innerHTML = '<i class="fas fa-thumbs-up" style="color: var(--warning-color);"></i>';
            resultsMessage.textContent = 'Good effort! Review the topics and try again.';
        } else {
            resultsIcon.innerHTML = '<i class="fas fa-book" style="color: var(--danger-color);"></i>';
            resultsMessage.textContent = 'Keep studying! You\'ll get there!';
        }

        // Stats
        document.getElementById('finalScore').textContent = percentage + '%';
        document.getElementById('correctAnswers').textContent = `${correct}/${total}`;
        document.getElementById('timeSpent').textContent = window.CAPMApp.formatTime(timeSpent);
        document.getElementById('pointsEarned').textContent = `+${points} XP`;

        // Domain breakdown
        this.displayDomainBreakdown();

        // Recommendations
        this.displayRecommendations(percentage);
    }

    displayDomainBreakdown() {
        const domainStats = {};
        
        this.userAnswers.forEach(answer => {
            if (!domainStats[answer.domain]) {
                domainStats[answer.domain] = { correct: 0, total: 0 };
            }
            domainStats[answer.domain].total++;
            if (answer.correct) {
                domainStats[answer.domain].correct++;
            }
        });

        const breakdownHTML = Object.entries(domainStats).map(([domain, stats]) => {
            const percentage = Math.round((stats.correct / stats.total) * 100);
            return `
                <div class="domain-stat">
                    <div class="domain-stat-header">
                        <span>${domain}</span>
                        <span>${stats.correct}/${stats.total} (${percentage}%)</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${percentage}%; background: ${percentage >= 70 ? 'var(--success-color)' : percentage >= 50 ? 'var(--warning-color)' : 'var(--danger-color)'}"></div>
                    </div>
                </div>
            `;
        }).join('');

        document.getElementById('domainBreakdown').innerHTML = breakdownHTML;
    }

    displayRecommendations(percentage) {
        const recommendations = [];

        if (percentage < 70) {
            recommendations.push('Review the learning modules for weak areas');
            recommendations.push('Take more practice quizzes to reinforce concepts');
        }

        if (percentage >= 70 && percentage < 90) {
            recommendations.push('You\'re doing well! Focus on mastering ITTOs');
            recommendations.push('Try harder difficulty questions');
        }

        if (percentage >= 90) {
            recommendations.push('Excellent! You\'re ready for the mock exam');
            recommendations.push('Review formulas and key terms regularly');
        }

        // Find weak domains
        const domainStats = {};
        this.userAnswers.forEach(answer => {
            if (!domainStats[answer.domain]) {
                domainStats[answer.domain] = { correct: 0, total: 0 };
            }
            domainStats[answer.domain].total++;
            if (answer.correct) {
                domainStats[answer.domain].correct++;
            }
        });

        Object.entries(domainStats).forEach(([domain, stats]) => {
            const domainPercentage = (stats.correct / stats.total) * 100;
            if (domainPercentage < 70) {
                recommendations.push(`Focus on ${domain} - review the learning module`);
            }
        });

        const recommendationsHTML = recommendations.map(rec => `
            <div class="recommendation-item">
                <i class="fas fa-lightbulb"></i>
                <span>${rec}</span>
            </div>
        `).join('');

        document.getElementById('recommendationsList').innerHTML = recommendationsHTML;
    }

    showReview() {
        document.getElementById('quizResults').style.display = 'none';
        document.getElementById('answerReview').style.display = 'block';

        const reviewHTML = this.userAnswers.map((answer, index) => {
            const question = this.currentQuiz.questions[index];
            return `
                <div class="review-question ${answer.correct ? 'correct' : 'incorrect'}">
                    <div class="review-header">
                        <span class="review-number">Question ${index + 1}</span>
                        <span class="review-status">
                            ${answer.correct 
                                ? '<i class="fas fa-check-circle"></i> Correct' 
                                : '<i class="fas fa-times-circle"></i> Incorrect'}
                        </span>
                    </div>
                    <div class="review-question-text">${question.question}</div>
                    <div class="review-options">
                        ${question.options.map((option, optIndex) => `
                            <div class="review-option ${optIndex === question.correct ? 'correct-answer' : ''} ${optIndex === answer.selectedIndex && !answer.correct ? 'wrong-answer' : ''}">
                                ${option}
                                ${optIndex === question.correct ? '<i class="fas fa-check"></i>' : ''}
                                ${optIndex === answer.selectedIndex && !answer.correct ? '<i class="fas fa-times"></i>' : ''}
                            </div>
                        `).join('')}
                    </div>
                    <div class="review-explanation">
                        <strong>Explanation:</strong> ${question.explanation}
                    </div>
                </div>
            `;
        }).join('');

        document.getElementById('reviewContent').innerHTML = reviewHTML;
    }

    showResults() {
        document.getElementById('answerReview').style.display = 'none';
        document.getElementById('quizResults').style.display = 'block';
    }

    resetQuiz() {
        document.getElementById('quizResults').style.display = 'none';
        document.getElementById('answerReview').style.display = 'none';
        document.getElementById('quizSetup').style.display = 'block';
        
        this.currentQuiz = null;
        this.currentQuestionIndex = 0;
        this.userAnswers = [];
    }
}

// Initialize quiz engine when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new QuizEngine();
});

// Made with Bob
