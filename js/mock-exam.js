// CAPM Mock Exam - Full exam simulation

class MockExam {
    constructor() {
        this.examMode = null;
        this.examQuestions = [];
        this.currentQuestionIndex = 0;
        this.userAnswers = [];
        this.flaggedQuestions = new Set();
        this.startTime = null;
        this.timerInterval = null;
        this.timeLimit = 0;
        
        this.initialize();
    }

    initialize() {
        this.setupModeSelection();
        this.setupExamControls();
    }

    setupModeSelection() {
        document.querySelectorAll('.select-mode-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const modeCard = e.target.closest('.mode-card');
                const mode = modeCard.dataset.mode;
                this.startExam(mode);
            });
        });
    }

    setupExamControls() {
        // Navigation buttons
        const prevBtn = document.getElementById('prevQuestionBtn');
        const nextBtn = document.getElementById('nextQuestionBtn');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previousQuestion());
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextQuestion());
        }

        // Flag button
        const flagBtn = document.getElementById('flagQuestionBtn');
        if (flagBtn) {
            flagBtn.addEventListener('click', () => this.toggleFlag());
        }

        // Review button
        const reviewBtn = document.getElementById('reviewBtn');
        if (reviewBtn) {
            reviewBtn.addEventListener('click', () => this.showNavigator());
        }

        // End exam button
        const endBtn = document.getElementById('endExamBtn');
        if (endBtn) {
            endBtn.addEventListener('click', () => this.confirmEndExam());
        }

        // Close navigator
        const closeNav = document.getElementById('closeNavigator');
        if (closeNav) {
            closeNav.addEventListener('click', () => this.hideNavigator());
        }

        // Submit exam
        const submitBtn = document.getElementById('submitExamBtn');
        if (submitBtn) {
            submitBtn.addEventListener('click', () => this.submitExam());
        }

        // Review exam button
        const reviewExamBtn = document.getElementById('reviewExamBtn');
        if (reviewExamBtn) {
            reviewExamBtn.addEventListener('click', () => this.showExamReview());
        }

        // Retake exam button
        const retakeBtn = document.getElementById('retakeExamBtn');
        if (retakeBtn) {
            retakeBtn.addEventListener('click', () => this.resetExam());
        }

        // Back to results button
        const backBtn = document.getElementById('backToExamResultsBtn');
        if (backBtn) {
            backBtn.addEventListener('click', () => this.showResults());
        }

        // Review filters
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
                const filter = e.currentTarget.dataset.filter;
                this.filterReview(filter);
            });
        });
    }

    startExam(mode) {
        this.examMode = mode;
        
        // Set exam parameters based on mode
        let questionCount, timeLimit;
        switch(mode) {
            case 'full':
                questionCount = 150;
                timeLimit = 180 * 60; // 3 hours in seconds
                break;
            case 'mini':
                questionCount = 50;
                timeLimit = 60 * 60; // 1 hour
                break;
            case 'practice':
                questionCount = 100;
                timeLimit = 0; // Untimed
                break;
        }

        this.timeLimit = timeLimit;

        // Get random questions from all domains
        let allQuestions = [];
        Object.values(quizQuestions).forEach(domainQuestions => {
            allQuestions = allQuestions.concat(domainQuestions);
        });

        this.examQuestions = window.CAPMApp.getRandomItems(allQuestions, questionCount);
        this.currentQuestionIndex = 0;
        this.userAnswers = new Array(this.examQuestions.length).fill(null);
        this.flaggedQuestions = new Set();
        this.startTime = Date.now();

        // Hide setup, show exam
        document.getElementById('examSetup').style.display = 'none';
        document.getElementById('examActive').style.display = 'block';

        // Start timer if timed
        if (this.timeLimit > 0) {
            this.startTimer();
        } else {
            document.querySelector('.exam-timer').style.display = 'none';
        }

        this.displayQuestion();
        this.updateNavigator();
    }

    startTimer() {
        let remainingTime = this.timeLimit;
        
        const updateTimer = () => {
            const hours = Math.floor(remainingTime / 3600);
            const minutes = Math.floor((remainingTime % 3600) / 60);
            const seconds = remainingTime % 60;
            
            const timerDisplay = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            document.getElementById('examTimer').textContent = timerDisplay;
            
            // Warning when 10 minutes left
            if (remainingTime === 600) {
                alert('10 minutes remaining!');
            }
            
            // Auto-submit when time runs out
            if (remainingTime <= 0) {
                clearInterval(this.timerInterval);
                alert('Time is up! Your exam will be submitted automatically.');
                this.submitExam();
                return;
            }
            
            remainingTime--;
        };
        
        updateTimer();
        this.timerInterval = setInterval(updateTimer, 1000);
    }

    displayQuestion() {
        const question = this.examQuestions[this.currentQuestionIndex];
        
        // Update question counter
        document.getElementById('currentExamQuestion').textContent = this.currentQuestionIndex + 1;
        document.getElementById('totalExamQuestions').textContent = this.examQuestions.length;
        
        // Display question
        document.getElementById('examQuestionDomain').textContent = question.domain;
        document.getElementById('examQuestionText').textContent = question.question;
        
        // Display flag status
        const flagIndicator = document.getElementById('questionFlag');
        if (this.flaggedQuestions.has(this.currentQuestionIndex)) {
            flagIndicator.style.display = 'inline-block';
        } else {
            flagIndicator.style.display = 'none';
        }
        
        // Display options
        const optionsContainer = document.getElementById('examAnswerOptions');
        optionsContainer.innerHTML = question.options.map((option, index) => `
            <div class="exam-answer-option ${this.userAnswers[this.currentQuestionIndex] === index ? 'selected' : ''}" data-index="${index}">
                <input type="radio" name="examAnswer" id="examOption${index}" value="${index}" ${this.userAnswers[this.currentQuestionIndex] === index ? 'checked' : ''}>
                <label for="examOption${index}">${option}</label>
            </div>
        `).join('');
        
        // Add click handlers
        document.querySelectorAll('.exam-answer-option').forEach(option => {
            option.addEventListener('click', () => {
                const radio = option.querySelector('input[type="radio"]');
                radio.checked = true;
                this.selectAnswer(parseInt(radio.value));
                
                // Visual feedback
                document.querySelectorAll('.exam-answer-option').forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
            });
        });
        
        // Update navigation buttons
        document.getElementById('prevQuestionBtn').disabled = this.currentQuestionIndex === 0;
        
        const nextBtn = document.getElementById('nextQuestionBtn');
        if (this.currentQuestionIndex === this.examQuestions.length - 1) {
            nextBtn.innerHTML = 'Review & Submit <i class="fas fa-arrow-right"></i>';
        } else {
            nextBtn.innerHTML = 'Next <i class="fas fa-arrow-right"></i>';
        }
    }

    selectAnswer(answerIndex) {
        this.userAnswers[this.currentQuestionIndex] = answerIndex;
        this.updateNavigator();
    }

    toggleFlag() {
        if (this.flaggedQuestions.has(this.currentQuestionIndex)) {
            this.flaggedQuestions.delete(this.currentQuestionIndex);
        } else {
            this.flaggedQuestions.add(this.currentQuestionIndex);
        }
        this.displayQuestion();
        this.updateNavigator();
    }

    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.displayQuestion();
        }
    }

    nextQuestion() {
        if (this.currentQuestionIndex < this.examQuestions.length - 1) {
            this.currentQuestionIndex++;
            this.displayQuestion();
        } else {
            this.showNavigator();
        }
    }

    showNavigator() {
        document.getElementById('questionNavigator').style.display = 'block';
        this.updateNavigator();
    }

    hideNavigator() {
        document.getElementById('questionNavigator').style.display = 'none';
    }

    updateNavigator() {
        const grid = document.getElementById('navigatorGrid');
        if (!grid) return;
        
        grid.innerHTML = this.examQuestions.map((_, index) => {
            const answered = this.userAnswers[index] !== null;
            const flagged = this.flaggedQuestions.has(index);
            const current = index === this.currentQuestionIndex;
            
            let className = 'nav-question';
            if (current) className += ' current';
            if (answered) className += ' answered';
            if (flagged) className += ' flagged';
            if (!answered) className += ' unanswered';
            
            return `<button class="${className}" data-index="${index}">${index + 1}</button>`;
        }).join('');
        
        // Add click handlers
        grid.querySelectorAll('.nav-question').forEach(btn => {
            btn.addEventListener('click', () => {
                this.currentQuestionIndex = parseInt(btn.dataset.index);
                this.hideNavigator();
                this.displayQuestion();
            });
        });
    }

    confirmEndExam() {
        const unanswered = this.userAnswers.filter(a => a === null).length;
        let message = 'Are you sure you want to end the exam?';
        if (unanswered > 0) {
            message += `\n\nYou have ${unanswered} unanswered question(s).`;
        }
        
        if (confirm(message)) {
            this.submitExam();
        }
    }

    submitExam() {
        // Stop timer
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
        
        const endTime = Date.now();
        const timeSpent = Math.floor((endTime - this.startTime) / 1000);
        
        // Calculate results
        let correct = 0;
        this.examQuestions.forEach((question, index) => {
            if (this.userAnswers[index] === question.correct) {
                correct++;
            }
        });
        
        const total = this.examQuestions.length;
        const percentage = Math.round((correct / total) * 100);
        const passed = percentage >= 61;
        
        // Save to progress tracker
        window.CAPMApp.progressTracker.addMockExamScore(correct, total);
        
        // Hide exam, show results
        document.getElementById('examActive').style.display = 'none';
        document.getElementById('examResults').style.display = 'block';
        
        this.displayResults(correct, total, percentage, timeSpent, passed);
    }

    displayResults(correct, total, percentage, timeSpent, passed) {
        // Results badge and title
        const badge = document.getElementById('resultsBadge');
        const title = document.getElementById('resultsTitle');
        const subtitle = document.getElementById('resultsSubtitle');
        
        if (passed) {
            badge.innerHTML = '<i class="fas fa-trophy" style="color: gold;"></i>';
            badge.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            title.textContent = 'Congratulations!';
            subtitle.textContent = 'You passed the mock exam!';
        } else {
            badge.innerHTML = '<i class="fas fa-book" style="color: #3b82f6;"></i>';
            badge.style.background = 'linear-gradient(135deg, #3b82f6, #2563eb)';
            title.textContent = 'Keep Studying!';
            subtitle.textContent = 'You need 61% to pass. Review and try again!';
        }
        
        // Stats
        document.getElementById('finalExamScore').textContent = percentage + '%';
        document.getElementById('correctExamAnswers').textContent = `${correct}/${total}`;
        document.getElementById('examTimeSpent').textContent = window.CAPMApp.formatTime(timeSpent);
        document.getElementById('examAccuracy').textContent = percentage + '%';
        
        const xpEarned = correct * 5;
        document.getElementById('examXP').textContent = `+${xpEarned} XP`;
        
        // Domain performance
        this.displayDomainPerformance();
        
        // Weak areas
        this.displayWeakAreas(percentage);
        
        // Recommendations
        this.displayExamRecommendations(passed, percentage);
    }

    displayDomainPerformance() {
        const domainStats = {};
        
        this.examQuestions.forEach((question, index) => {
            const domain = question.domain;
            if (!domainStats[domain]) {
                domainStats[domain] = { correct: 0, total: 0 };
            }
            domainStats[domain].total++;
            if (this.userAnswers[index] === question.correct) {
                domainStats[domain].correct++;
            }
        });
        
        const grid = document.getElementById('domainPerformanceGrid');
        grid.innerHTML = Object.entries(domainStats).map(([domain, stats]) => {
            const percentage = Math.round((stats.correct / stats.total) * 100);
            const color = percentage >= 70 ? '#10b981' : percentage >= 50 ? '#f59e0b' : '#ef4444';
            
            return `
                <div class="domain-perf-item">
                    <div class="domain-perf-header">
                        <span class="domain-perf-name">${domain}</span>
                        <span class="domain-perf-score" style="color: ${color}">${percentage}%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${percentage}%; background: ${color}"></div>
                    </div>
                    <div class="domain-perf-details">${stats.correct}/${stats.total} correct</div>
                </div>
            `;
        }).join('');
    }

    displayWeakAreas(overallPercentage) {
        const domainStats = {};
        
        this.examQuestions.forEach((question, index) => {
            const domain = question.domain;
            if (!domainStats[domain]) {
                domainStats[domain] = { correct: 0, total: 0 };
            }
            domainStats[domain].total++;
            if (this.userAnswers[index] === question.correct) {
                domainStats[domain].correct++;
            }
        });
        
        const weakDomains = Object.entries(domainStats)
            .filter(([_, stats]) => (stats.correct / stats.total) < 0.7)
            .sort((a, b) => (a[1].correct / a[1].total) - (b[1].correct / b[1].total));
        
        const list = document.getElementById('weakAreasList');
        if (weakDomains.length === 0) {
            list.innerHTML = '<p class="no-weak-areas">Great job! No significant weak areas identified.</p>';
        } else {
            list.innerHTML = weakDomains.map(([domain, stats]) => {
                const percentage = Math.round((stats.correct / stats.total) * 100);
                return `
                    <div class="weak-area-item">
                        <div class="weak-area-icon">
                            <i class="fas fa-exclamation-triangle"></i>
                        </div>
                        <div class="weak-area-info">
                            <h4>${domain}</h4>
                            <p>${percentage}% correct - Review this knowledge area</p>
                        </div>
                        <a href="learning.html#${domain.toLowerCase().split(' ')[0]}" class="btn btn-sm btn-primary">
                            Study Now
                        </a>
                    </div>
                `;
            }).join('');
        }
    }

    displayExamRecommendations(passed, percentage) {
        const recommendations = [];
        
        if (passed) {
            recommendations.push({
                icon: 'trophy',
                title: 'You\'re Exam Ready!',
                text: 'Consider scheduling your real CAPM exam',
                color: '#10b981'
            });
            recommendations.push({
                icon: 'redo',
                title: 'Keep Practicing',
                text: 'Take more mock exams to maintain your skills',
                color: '#3b82f6'
            });
        } else {
            recommendations.push({
                icon: 'book',
                title: 'Review Learning Modules',
                text: 'Focus on weak knowledge areas',
                color: '#f59e0b'
            });
            recommendations.push({
                icon: 'question-circle',
                title: 'Practice More Quizzes',
                text: 'Build confidence with targeted practice',
                color: '#3b82f6'
            });
        }
        
        recommendations.push({
            icon: 'layer-group',
            title: 'Study Flashcards',
            text: 'Reinforce key concepts and formulas',
            color: '#8b5cf6'
        });
        
        const grid = document.getElementById('examRecommendations');
        grid.innerHTML = recommendations.map(rec => `
            <div class="recommendation-card">
                <div class="rec-icon" style="background: ${rec.color}">
                    <i class="fas fa-${rec.icon}"></i>
                </div>
                <h3>${rec.title}</h3>
                <p>${rec.text}</p>
            </div>
        `).join('');
    }

    showExamReview() {
        document.getElementById('examResults').style.display = 'none';
        document.getElementById('examReview').style.display = 'block';
        this.displayReview('all');
    }

    displayReview(filter) {
        const reviewContainer = document.getElementById('reviewQuestions');
        
        let questionsToShow = this.examQuestions.map((q, index) => ({ question: q, index }));
        
        if (filter === 'incorrect') {
            questionsToShow = questionsToShow.filter(({ question, index }) => 
                this.userAnswers[index] !== question.correct
            );
        } else if (filter === 'flagged') {
            questionsToShow = questionsToShow.filter(({ index }) => 
                this.flaggedQuestions.has(index)
            );
        }
        
        reviewContainer.innerHTML = questionsToShow.map(({ question, index }) => {
            const userAnswer = this.userAnswers[index];
            const isCorrect = userAnswer === question.correct;
            
            return `
                <div class="review-question-item ${isCorrect ? 'correct' : 'incorrect'}">
                    <div class="review-q-header">
                        <span class="review-q-number">Question ${index + 1}</span>
                        <span class="review-q-domain">${question.domain}</span>
                        <span class="review-q-status">
                            ${isCorrect 
                                ? '<i class="fas fa-check-circle"></i> Correct' 
                                : '<i class="fas fa-times-circle"></i> Incorrect'}
                        </span>
                    </div>
                    <div class="review-q-text">${question.question}</div>
                    <div class="review-q-options">
                        ${question.options.map((option, optIndex) => `
                            <div class="review-option ${optIndex === question.correct ? 'correct-answer' : ''} ${optIndex === userAnswer && !isCorrect ? 'wrong-answer' : ''}">
                                ${option}
                                ${optIndex === question.correct ? '<i class="fas fa-check"></i>' : ''}
                                ${optIndex === userAnswer && !isCorrect ? '<i class="fas fa-times"></i>' : ''}
                            </div>
                        `).join('')}
                    </div>
                    <div class="review-q-explanation">
                        <strong>Explanation:</strong> ${question.explanation}
                    </div>
                </div>
            `;
        }).join('');
    }

    filterReview(filter) {
        this.displayReview(filter);
    }

    showResults() {
        document.getElementById('examReview').style.display = 'none';
        document.getElementById('examResults').style.display = 'block';
    }

    resetExam() {
        // Clear timer
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
        
        // Reset state
        this.examMode = null;
        this.examQuestions = [];
        this.currentQuestionIndex = 0;
        this.userAnswers = [];
        this.flaggedQuestions = new Set();
        
        // Show setup
        document.getElementById('examResults').style.display = 'none';
        document.getElementById('examReview').style.display = 'none';
        document.getElementById('examSetup').style.display = 'block';
    }
}

// Initialize mock exam when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new MockExam();
});

// Made with Bob
