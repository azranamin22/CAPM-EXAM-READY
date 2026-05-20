// CAPM Dashboard - Progress tracking and visualization

class Dashboard {
    constructor() {
        this.progressTracker = window.CAPMApp.progressTracker;
        this.charts = {};
        this.studyPlans = this.generateStudyPlans();
        
        this.initialize();
    }

    initialize() {
        this.updateStats();
        this.updateDomainProgress();
        this.createReadinessChart();
        this.createPerformanceChart();
        this.updateBadges();
        this.displayStudyPlan(7);
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Study plan selector
        document.querySelectorAll('.plan-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.plan-btn').forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
                const days = parseInt(e.currentTarget.dataset.plan);
                this.displayStudyPlan(days);
            });
        });
    }

    updateStats() {
        const stats = this.progressTracker.getStats();
        
        // Update user info
        document.getElementById('userName').textContent = 'Student';
        document.getElementById('userLevel').textContent = stats.level;
        document.getElementById('userPoints').textContent = stats.totalPoints;

        // Update stat cards
        document.getElementById('completedModules').textContent = stats.completedModules;
        document.getElementById('quizzesTaken').textContent = stats.quizzesTaken;
        document.getElementById('avgScore').textContent = stats.avgScore + '%';
        document.getElementById('badgesEarned').textContent = stats.badgesEarned;

        // Update readiness score
        document.getElementById('readinessScore').textContent = stats.readiness + '%';
        
        // Update readiness message
        const readinessMessage = document.getElementById('readinessMessage');
        if (stats.readiness >= 85) {
            readinessMessage.textContent = 'Excellent! You\'re ready to take the CAPM exam!';
        } else if (stats.readiness >= 70) {
            readinessMessage.textContent = 'You\'re making great progress! Keep studying to reach exam readiness.';
        } else if (stats.readiness >= 50) {
            readinessMessage.textContent = 'Good start! Continue learning and practicing to improve your readiness.';
        } else {
            readinessMessage.textContent = 'Keep learning! Complete more modules and take practice quizzes.';
        }

        // Update recommendations
        this.updateRecommendations(stats);
    }

    updateRecommendations(stats) {
        const recommendations = [];

        if (stats.completedModules === 0) {
            recommendations.push('Start with Integration Management - it\'s fundamental to all other areas');
        }

        if (stats.quizzesTaken < 5) {
            recommendations.push('Take more practice quizzes to test your knowledge');
        }

        if (stats.avgScore < 70) {
            recommendations.push('Review learning modules for topics you\'re struggling with');
        }

        // Find weak domains
        Object.entries(stats.domainProgress).forEach(([domain, progress]) => {
            if (progress < 50) {
                const domainName = domain.charAt(0).toUpperCase() + domain.slice(1);
                recommendations.push(`Focus on ${domainName} Management - complete the learning module`);
            }
        });

        if (stats.readiness >= 70 && stats.mockExamScores === 0) {
            recommendations.push('You\'re ready for a mock exam! Test your knowledge with a full practice test');
        }

        if (recommendations.length === 0) {
            recommendations.push('Great progress! Continue reviewing and taking practice tests');
            recommendations.push('Focus on memorizing key formulas and ITTOs');
            recommendations.push('Review exam tips and common traps');
        }

        const recommendationsList = document.getElementById('recommendationsList');
        if (recommendationsList) {
            recommendationsList.innerHTML = recommendations.slice(0, 3).map(rec => 
                `<li>${rec}</li>`
            ).join('');
        }
    }

    updateDomainProgress() {
        const stats = this.progressTracker.getStats();
        
        Object.entries(stats.domainProgress).forEach(([domain, progress]) => {
            const progressFill = document.querySelector(`.progress-fill[data-domain="${domain}"]`);
            const percentageSpan = progressFill?.closest('.domain-progress-item')?.querySelector('.domain-percentage');
            
            if (progressFill) {
                progressFill.style.width = progress + '%';
                
                // Color based on progress
                if (progress >= 80) {
                    progressFill.style.background = 'var(--success-color)';
                } else if (progress >= 50) {
                    progressFill.style.background = 'var(--warning-color)';
                } else {
                    progressFill.style.background = 'var(--primary-color)';
                }
            }
            
            if (percentageSpan) {
                percentageSpan.textContent = progress + '%';
            }
        });
    }

    createReadinessChart() {
        const canvas = document.getElementById('readinessChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const readiness = this.progressTracker.getStats().readiness;

        // Destroy existing chart if it exists
        if (this.charts.readiness) {
            this.charts.readiness.destroy();
        }

        this.charts.readiness = new Chart(ctx, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [readiness, 100 - readiness],
                    backgroundColor: [
                        readiness >= 85 ? '#10b981' : readiness >= 70 ? '#f59e0b' : '#3b82f6',
                        '#e5e7eb'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                cutout: '75%',
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: false
                    }
                }
            }
        });
    }

    createPerformanceChart() {
        const canvas = document.getElementById('performanceChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const quizScores = this.progressTracker.progress.quizScores;

        // Prepare data
        const labels = quizScores.length > 0 
            ? quizScores.map((_, index) => `Quiz ${index + 1}`)
            : ['No data yet'];
        
        const data = quizScores.length > 0
            ? quizScores.map(quiz => quiz.percentage)
            : [0];

        // Destroy existing chart if it exists
        if (this.charts.performance) {
            this.charts.performance.destroy();
        }

        this.charts.performance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Quiz Score (%)',
                    data: data,
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                }
            }
        });
    }

    updateBadges() {
        const badges = this.progressTracker.progress.badges;
        const badgeElements = document.querySelectorAll('.badge-item');

        badgeElements.forEach(badge => {
            const badgeClass = badge.querySelector('span')?.textContent.toLowerCase().replace(/\s+/g, '-');
            if (badges.includes(badgeClass)) {
                badge.classList.remove('locked');
                badge.classList.add('unlocked');
            }
        });
    }

    generateStudyPlans() {
        return {
            7: [
                {
                    day: 1,
                    title: 'Integration & Scope Management',
                    tasks: [
                        'Complete Integration Management module',
                        'Complete Scope Management module',
                        'Take Integration quiz (10 questions)'
                    ]
                },
                {
                    day: 2,
                    title: 'Schedule & Cost Management',
                    tasks: [
                        'Complete Schedule Management module',
                        'Complete Cost Management module',
                        'Review key formulas (EV, CPI, SPI)',
                        'Take Schedule quiz (10 questions)'
                    ]
                },
                {
                    day: 3,
                    title: 'Quality & Resource Management',
                    tasks: [
                        'Complete Quality Management module',
                        'Complete Resource Management module',
                        'Review RACI chart and team development',
                        'Take Quality quiz (10 questions)'
                    ]
                },
                {
                    day: 4,
                    title: 'Communication & Risk Management',
                    tasks: [
                        'Complete Communication Management module',
                        'Complete Risk Management module',
                        'Memorize risk response strategies',
                        'Take Risk quiz (15 questions)'
                    ]
                },
                {
                    day: 5,
                    title: 'Procurement & Stakeholder Management',
                    tasks: [
                        'Complete Procurement Management module',
                        'Complete Stakeholder Management module',
                        'Review contract types',
                        'Take mixed quiz (20 questions)'
                    ]
                },
                {
                    day: 6,
                    title: 'Review & Practice',
                    tasks: [
                        'Review all flashcards',
                        'Take mock exam (50 questions)',
                        'Review weak areas identified',
                        'Study ITTOs for all processes'
                    ]
                },
                {
                    day: 7,
                    title: 'Final Review',
                    tasks: [
                        'Review all formulas',
                        'Review common exam traps',
                        'Take final mock exam (100 questions)',
                        'Review incorrect answers'
                    ]
                }
            ],
            14: [
                {
                    day: 1,
                    title: 'Introduction & Integration Management',
                    tasks: [
                        'Complete Integration Management module',
                        'Review Project Charter vs PM Plan',
                        'Take Integration quiz (10 questions)'
                    ]
                },
                {
                    day: 2,
                    title: 'Scope Management',
                    tasks: [
                        'Complete Scope Management module',
                        'Understand WBS and scope creep',
                        'Take Scope quiz (10 questions)',
                        'Review flashcards'
                    ]
                },
                {
                    day: 3,
                    title: 'Schedule Management - Part 1',
                    tasks: [
                        'Complete Schedule Management module',
                        'Learn Critical Path Method',
                        'Understand float and lag'
                    ]
                },
                {
                    day: 4,
                    title: 'Schedule Management - Part 2',
                    tasks: [
                        'Review fast-tracking vs crashing',
                        'Take Schedule quiz (15 questions)',
                        'Practice schedule calculations'
                    ]
                },
                {
                    day: 5,
                    title: 'Cost Management - Part 1',
                    tasks: [
                        'Complete Cost Management module',
                        'Learn EV, PV, AC concepts',
                        'Memorize CV and SV formulas'
                    ]
                },
                {
                    day: 6,
                    title: 'Cost Management - Part 2',
                    tasks: [
                        'Learn CPI, SPI, EAC formulas',
                        'Practice EVM calculations',
                        'Take Cost quiz (15 questions)'
                    ]
                },
                {
                    day: 7,
                    title: 'Quality & Resource Management',
                    tasks: [
                        'Complete Quality Management module',
                        'Complete Resource Management module',
                        'Review QA vs QC',
                        'Learn Tuckman\'s stages'
                    ]
                },
                {
                    day: 8,
                    title: 'Communication Management',
                    tasks: [
                        'Complete Communication Management module',
                        'Memorize communication channels formula',
                        'Take Communication quiz (10 questions)',
                        'Review flashcards'
                    ]
                },
                {
                    day: 9,
                    title: 'Risk Management - Part 1',
                    tasks: [
                        'Complete Risk Management module',
                        'Learn threat vs opportunity',
                        'Memorize response strategies'
                    ]
                },
                {
                    day: 10,
                    title: 'Risk Management - Part 2',
                    tasks: [
                        'Learn EMV formula',
                        'Understand qualitative vs quantitative',
                        'Take Risk quiz (20 questions)'
                    ]
                },
                {
                    day: 11,
                    title: 'Procurement & Stakeholder Management',
                    tasks: [
                        'Complete Procurement Management module',
                        'Complete Stakeholder Management module',
                        'Review contract types',
                        'Take mixed quiz (20 questions)'
                    ]
                },
                {
                    day: 12,
                    title: 'Comprehensive Review',
                    tasks: [
                        'Review all learning modules',
                        'Study all flashcards',
                        'Take mock exam (50 questions)',
                        'Identify weak areas'
                    ]
                },
                {
                    day: 13,
                    title: 'Practice & Refinement',
                    tasks: [
                        'Focus on weak domains',
                        'Review all formulas',
                        'Review ITTOs',
                        'Take practice quizzes on weak areas'
                    ]
                },
                {
                    day: 14,
                    title: 'Final Preparation',
                    tasks: [
                        'Take full mock exam (100 questions)',
                        'Review all incorrect answers',
                        'Review common exam traps',
                        'Final flashcard review'
                    ]
                }
            ]
        };
    }

    displayStudyPlan(days) {
        const plan = this.studyPlans[days];
        const container = document.getElementById('studyPlanContent');

        if (!container || !plan) return;

        const planHTML = plan.map((day, index) => `
            <div class="study-day">
                <div class="day-header">
                    <div class="day-number">Day ${day.day}</div>
                    <div class="day-title">${day.title}</div>
                </div>
                <div class="day-tasks">
                    ${day.tasks.map(task => `
                        <div class="task-item">
                            <input type="checkbox" id="task-${days}-${index}-${day.tasks.indexOf(task)}">
                            <label for="task-${days}-${index}-${day.tasks.indexOf(task)}">${task}</label>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');

        container.innerHTML = planHTML;
    }
}

// Initialize dashboard when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new Dashboard();
});

// Made with Bob
