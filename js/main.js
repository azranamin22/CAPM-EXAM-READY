// CAPM Exam Prep - Main JavaScript
// Core functionality for theme, navigation, search, and data management

// ============================================
// LOCAL STORAGE MANAGEMENT
// ============================================
class StorageManager {
    static get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.error('Error reading from localStorage:', e);
            return defaultValue;
        }
    }

    static set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error('Error writing to localStorage:', e);
        }
    }

    static remove(key) {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.error('Error removing from localStorage:', e);
        }
    }
}

// ============================================
// USER PROGRESS TRACKING
// ============================================
class ProgressTracker {
    constructor() {
        this.progress = StorageManager.get('userProgress', {
            completedModules: [],
            quizScores: [],
            flashcardsReviewed: [],
            mockExamScores: [],
            totalPoints: 0,
            level: 'Beginner',
            badges: [],
            domainProgress: {
                integration: 0,
                scope: 0,
                schedule: 0,
                cost: 0,
                quality: 0,
                resource: 0,
                communication: 0,
                risk: 0,
                procurement: 0,
                stakeholder: 0
            },
            studyStreak: 0,
            lastStudyDate: null
        });
    }

    save() {
        StorageManager.set('userProgress', this.progress);
    }

    completeModule(domain) {
        if (!this.progress.completedModules.includes(domain)) {
            this.progress.completedModules.push(domain);
            this.addPoints(50);
            this.updateDomainProgress(domain, 100);
            this.checkBadges();
            this.save();
        }
    }

    addQuizScore(domain, score, totalQuestions) {
        const quizData = {
            domain,
            score,
            totalQuestions,
            percentage: Math.round((score / totalQuestions) * 100),
            date: new Date().toISOString()
        };
        
        this.progress.quizScores.push(quizData);
        this.addPoints(score * 10);
        this.updateDomainProgress(domain, quizData.percentage);
        this.checkBadges();
        this.save();
        
        return quizData;
    }

    addMockExamScore(score, totalQuestions) {
        const examData = {
            score,
            totalQuestions,
            percentage: Math.round((score / totalQuestions) * 100),
            date: new Date().toISOString()
        };
        
        this.progress.mockExamScores.push(examData);
        this.addPoints(score * 5);
        this.checkBadges();
        this.save();
        
        return examData;
    }

    addPoints(points) {
        this.progress.totalPoints += points;
        this.updateLevel();
    }

    updateLevel() {
        const points = this.progress.totalPoints;
        if (points >= 5000) {
            this.progress.level = 'Exam Ready';
        } else if (points >= 2500) {
            this.progress.level = 'Advanced';
        } else if (points >= 1000) {
            this.progress.level = 'Intermediate';
        } else {
            this.progress.level = 'Beginner';
        }
    }

    updateDomainProgress(domain, percentage) {
        if (this.progress.domainProgress[domain] !== undefined) {
            this.progress.domainProgress[domain] = Math.max(
                this.progress.domainProgress[domain],
                percentage
            );
        }
    }

    checkBadges() {
        const badges = [];
        
        // First Steps - Complete first module
        if (this.progress.completedModules.length >= 1 && !this.progress.badges.includes('first-steps')) {
            badges.push('first-steps');
        }
        
        // Quiz Master - Score 90%+ on 5 quizzes
        const highScores = this.progress.quizScores.filter(q => q.percentage >= 90);
        if (highScores.length >= 5 && !this.progress.badges.includes('quiz-master')) {
            badges.push('quiz-master');
        }
        
        // Domain Expert - Complete all modules in one domain
        if (this.progress.completedModules.length >= 1 && !this.progress.badges.includes('domain-expert')) {
            badges.push('domain-expert');
        }
        
        // Exam Ready - Achieve 85%+ readiness
        const readiness = this.calculateReadiness();
        if (readiness >= 85 && !this.progress.badges.includes('exam-ready')) {
            badges.push('exam-ready');
        }
        
        // CAPM Champion - Complete all domains
        if (this.progress.completedModules.length >= 10 && !this.progress.badges.includes('capm-champion')) {
            badges.push('capm-champion');
        }
        
        badges.forEach(badge => {
            if (!this.progress.badges.includes(badge)) {
                this.progress.badges.push(badge);
            }
        });
    }

    calculateReadiness() {
        const domainValues = Object.values(this.progress.domainProgress);
        const avgDomainProgress = domainValues.reduce((a, b) => a + b, 0) / domainValues.length;
        
        const quizAvg = this.progress.quizScores.length > 0
            ? this.progress.quizScores.reduce((sum, q) => sum + q.percentage, 0) / this.progress.quizScores.length
            : 0;
        
        const mockExamAvg = this.progress.mockExamScores.length > 0
            ? this.progress.mockExamScores.reduce((sum, e) => sum + e.percentage, 0) / this.progress.mockExamScores.length
            : 0;
        
        // Weighted average: 40% domain progress, 30% quiz performance, 30% mock exam
        const readiness = (avgDomainProgress * 0.4) + (quizAvg * 0.3) + (mockExamAvg * 0.3);
        
        return Math.round(readiness);
    }

    getStats() {
        return {
            completedModules: this.progress.completedModules.length,
            quizzesTaken: this.progress.quizScores.length,
            avgScore: this.progress.quizScores.length > 0
                ? Math.round(this.progress.quizScores.reduce((sum, q) => sum + q.percentage, 0) / this.progress.quizScores.length)
                : 0,
            badgesEarned: this.progress.badges.length,
            totalPoints: this.progress.totalPoints,
            level: this.progress.level,
            readiness: this.calculateReadiness(),
            domainProgress: this.progress.domainProgress
        };
    }

    reset() {
        StorageManager.remove('userProgress');
        this.progress = {
            completedModules: [],
            quizScores: [],
            flashcardsReviewed: [],
            mockExamScores: [],
            totalPoints: 0,
            level: 'Beginner',
            badges: [],
            domainProgress: {
                integration: 0,
                scope: 0,
                schedule: 0,
                cost: 0,
                quality: 0,
                resource: 0,
                communication: 0,
                risk: 0,
                procurement: 0,
                stakeholder: 0
            },
            studyStreak: 0,
            lastStudyDate: null
        };
        this.save();
    }
}

// Initialize global progress tracker
const progressTracker = new ProgressTracker();

// ============================================
// THEME MANAGEMENT
// ============================================
class ThemeManager {
    constructor() {
        this.theme = StorageManager.get('theme', 'light');
        this.applyTheme();
    }

    toggle() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        this.applyTheme();
        StorageManager.set('theme', this.theme);
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        
        // Update theme toggle icon
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.className = this.theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
            }
        }
    }
}

// Initialize theme manager
const themeManager = new ThemeManager();

// ============================================
// SEARCH FUNCTIONALITY
// ============================================
class SearchManager {
    constructor() {
        this.searchData = this.buildSearchIndex();
    }

    buildSearchIndex() {
        return [
            // Integration Management
            { title: 'Integration Management', type: 'Domain', url: 'learning.html#integration', keywords: 'integration charter plan change control' },
            { title: 'Project Charter', type: 'Concept', url: 'learning.html#integration', keywords: 'charter authorization sponsor' },
            { title: 'Change Control', type: 'Concept', url: 'learning.html#integration', keywords: 'change control ccb approval' },
            
            // Risk Management
            { title: 'Risk Management', type: 'Domain', url: 'learning.html#risk', keywords: 'risk threat opportunity mitigation' },
            { title: 'Risk Response Strategies', type: 'Concept', url: 'learning.html#risk', keywords: 'avoid mitigate transfer accept exploit enhance' },
            { title: 'EMV Formula', type: 'Formula', url: 'learning.html#risk', keywords: 'emv expected monetary value probability impact' },
            
            // Scope Management
            { title: 'Scope Management', type: 'Domain', url: 'learning.html#scope', keywords: 'scope wbs requirements' },
            { title: 'WBS', type: 'Concept', url: 'learning.html#scope', keywords: 'wbs work breakdown structure decomposition' },
            
            // Schedule Management
            { title: 'Schedule Management', type: 'Domain', url: 'learning.html#schedule', keywords: 'schedule timeline critical path' },
            { title: 'Critical Path', type: 'Concept', url: 'learning.html#schedule', keywords: 'critical path float slack' },
            
            // Cost Management
            { title: 'Cost Management', type: 'Domain', url: 'learning.html#cost', keywords: 'cost budget earned value' },
            { title: 'Earned Value', type: 'Formula', url: 'learning.html#cost', keywords: 'ev pv ac cpi spi earned value' },
            
            // Quality Management
            { title: 'Quality Management', type: 'Domain', url: 'learning.html#quality', keywords: 'quality assurance control' },
            
            // Resource Management
            { title: 'Resource Management', type: 'Domain', url: 'learning.html#resource', keywords: 'resource team raci' },
            
            // Communication Management
            { title: 'Communication Management', type: 'Domain', url: 'learning.html#communication', keywords: 'communication channels stakeholder' },
            
            // Procurement Management
            { title: 'Procurement Management', type: 'Domain', url: 'learning.html#procurement', keywords: 'procurement contract vendor' },
            
            // Stakeholder Management
            { title: 'Stakeholder Management', type: 'Domain', url: 'learning.html#stakeholder', keywords: 'stakeholder engagement' }
        ];
    }

    search(query) {
        if (!query || query.length < 2) return [];
        
        const lowerQuery = query.toLowerCase();
        return this.searchData.filter(item => 
            item.title.toLowerCase().includes(lowerQuery) ||
            item.keywords.toLowerCase().includes(lowerQuery)
        ).slice(0, 10);
    }
}

const searchManager = new SearchManager();

// ============================================
// EVENT LISTENERS
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => themeManager.toggle());
    }

    // Search functionality
    const searchBtn = document.getElementById('searchBtn');
    const searchModal = document.getElementById('searchModal');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    if (searchBtn && searchModal) {
        searchBtn.addEventListener('click', () => {
            searchModal.classList.add('active');
            if (searchInput) searchInput.focus();
        });

        searchModal.addEventListener('click', (e) => {
            if (e.target === searchModal) {
                searchModal.classList.remove('active');
            }
        });

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const query = e.target.value;
                const results = searchManager.search(query);
                
                if (results.length > 0) {
                    searchResults.innerHTML = results.map(result => `
                        <a href="${result.url}" class="search-result-item">
                            <div class="result-type">${result.type}</div>
                            <div class="result-title">${result.title}</div>
                        </a>
                    `).join('');
                } else if (query.length >= 2) {
                    searchResults.innerHTML = '<div class="no-results">No results found</div>';
                } else {
                    searchResults.innerHTML = '';
                }
            });
        }
    }

    // Close search on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchModal) {
            searchModal.classList.remove('active');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#!') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Update active nav link based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.sidebar-nav a[href^="#"]');

    if (sections.length > 0 && navLinks.length > 0) {
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }
});

// ============================================
// UTILITY FUNCTIONS
// ============================================
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function getRandomItems(array, count) {
    const shuffled = shuffleArray(array);
    return shuffled.slice(0, Math.min(count, array.length));
}

// ============================================
// EXPORT FOR OTHER MODULES
// ============================================
window.CAPMApp = {
    progressTracker,
    themeManager,
    searchManager,
    StorageManager,
    formatDate,
    formatTime,
    shuffleArray,
    getRandomItems
};

// Made with Bob
