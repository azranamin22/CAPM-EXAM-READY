// CAPM Flashcards - Spaced repetition learning system

class FlashcardSystem {
    constructor() {
        this.currentDeck = null;
        this.currentCardIndex = 0;
        this.sessionCards = [];
        this.sessionStats = {
            known: 0,
            unknown: 0,
            startTime: null
        };
        this.isFlipped = false;
        this.studyMode = 'spaced';
        
        this.initialize();
    }

    initialize() {
        this.setupDeckSelection();
        this.setupModeSelection();
        this.setupStudyControls();
        this.setupKeyboardShortcuts();
    }

    setupDeckSelection() {
        document.querySelectorAll('.deck-card').forEach(card => {
            card.addEventListener('click', () => {
                const deck = card.dataset.deck;
                this.startStudySession(deck);
            });
        });
    }

    setupModeSelection() {
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
                this.studyMode = e.currentTarget.dataset.mode;
            });
        });
    }

    setupStudyControls() {
        // Flashcard flip
        const flashcard = document.getElementById('flashcard');
        if (flashcard) {
            flashcard.addEventListener('click', () => this.flipCard());
        }

        // Difficulty buttons
        document.querySelectorAll('.difficulty-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const difficulty = e.currentTarget.dataset.difficulty;
                this.rateCard(difficulty);
            });
        });

        // Exit button
        const exitBtn = document.getElementById('exitStudyBtn');
        if (exitBtn) {
            exitBtn.addEventListener('click', () => this.exitStudy());
        }

        // Study more button
        const studyMoreBtn = document.getElementById('studyMoreBtn');
        if (studyMoreBtn) {
            studyMoreBtn.addEventListener('click', () => this.returnToSetup());
        }
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Only handle shortcuts when studying
            if (document.getElementById('flashcardStudy').style.display !== 'block') {
                return;
            }

            switch(e.key) {
                case ' ':
                    e.preventDefault();
                    this.flipCard();
                    break;
                case '1':
                    if (this.isFlipped) this.rateCard('hard');
                    break;
                case '2':
                    if (this.isFlipped) this.rateCard('good');
                    break;
                case '3':
                    if (this.isFlipped) this.rateCard('easy');
                    break;
            }
        });
    }

    startStudySession(deckName) {
        // Get cards for selected deck
        let cards = [];
        
        if (deckName === 'all') {
            Object.values(flashcards).forEach(domainCards => {
                cards = cards.concat(domainCards);
            });
        } else if (deckName === 'formulas') {
            // Get all cards with 'Formulas' category
            Object.values(flashcards).forEach(domainCards => {
                cards = cards.concat(domainCards.filter(card => card.category === 'Formulas'));
            });
        } else if (deckName === 'ittos') {
            // Get all cards with 'Processes' or 'Key Documents' category
            Object.values(flashcards).forEach(domainCards => {
                cards = cards.concat(domainCards.filter(card => 
                    card.category === 'Processes' || card.category === 'Key Documents'
                ));
            });
        } else if (deckName === 'terms') {
            // Get all cards with 'Key Terms' category
            Object.values(flashcards).forEach(domainCards => {
                cards = cards.concat(domainCards.filter(card => card.category === 'Key Terms'));
            });
        } else {
            // Specific domain
            cards = flashcards[deckName] || [];
        }

        if (cards.length === 0) {
            alert('No cards available for this deck.');
            return;
        }

        // Apply study mode filter
        if (this.studyMode === 'new') {
            // For demo, just shuffle all cards
            cards = window.CAPMApp.shuffleArray(cards);
        } else if (this.studyMode === 'spaced') {
            // For demo, shuffle cards (in real app, would use spaced repetition algorithm)
            cards = window.CAPMApp.shuffleArray(cards);
        } else {
            // Study all - shuffle
            cards = window.CAPMApp.shuffleArray(cards);
        }

        this.sessionCards = cards.slice(0, Math.min(20, cards.length));
        this.currentCardIndex = 0;
        this.sessionStats = {
            known: 0,
            unknown: 0,
            startTime: Date.now()
        };

        // Show study interface
        document.getElementById('flashcardSetup').style.display = 'none';
        document.getElementById('flashcardStudy').style.display = 'block';

        this.displayCard();
    }

    displayCard() {
        if (this.currentCardIndex >= this.sessionCards.length) {
            this.completeSession();
            return;
        }

        const card = this.sessionCards[this.currentCardIndex];
        this.isFlipped = false;

        // Update progress
        document.getElementById('currentCard').textContent = this.currentCardIndex + 1;
        document.getElementById('totalCards').textContent = this.sessionCards.length;
        
        const progressPercent = ((this.currentCardIndex + 1) / this.sessionCards.length) * 100;
        document.getElementById('cardProgress').style.width = progressPercent + '%';

        // Update stats
        document.getElementById('knownCount').textContent = this.sessionStats.known;
        document.getElementById('unknownCount').textContent = this.sessionStats.unknown;

        // Display card front
        document.getElementById('cardType').textContent = card.category;
        document.getElementById('cardTypeBack').textContent = card.category;
        document.getElementById('cardFront').textContent = card.front;
        document.getElementById('cardBack').innerHTML = card.back.replace(/\n/g, '<br>');
        document.getElementById('cardExtra').textContent = card.domain;

        // Reset flip state
        const flashcard = document.getElementById('flashcard');
        flashcard.classList.remove('flipped');

        // Hide controls until flipped
        document.querySelectorAll('.difficulty-btn').forEach(btn => {
            btn.style.opacity = '0.5';
            btn.style.pointerEvents = 'none';
        });
    }

    flipCard() {
        const flashcard = document.getElementById('flashcard');
        flashcard.classList.toggle('flipped');
        this.isFlipped = !this.isFlipped;

        // Show controls when flipped
        if (this.isFlipped) {
            document.querySelectorAll('.difficulty-btn').forEach(btn => {
                btn.style.opacity = '1';
                btn.style.pointerEvents = 'auto';
            });
        }
    }

    rateCard(difficulty) {
        if (!this.isFlipped) return;

        // Update stats
        if (difficulty === 'hard') {
            this.sessionStats.unknown++;
        } else {
            this.sessionStats.known++;
        }

        // Move to next card
        this.currentCardIndex++;
        
        // Add small delay for better UX
        setTimeout(() => {
            this.displayCard();
        }, 200);
    }

    completeSession() {
        const endTime = Date.now();
        const timeSpent = Math.floor((endTime - this.sessionStats.startTime) / 1000);
        const totalCards = this.sessionCards.length;
        const retentionRate = Math.round((this.sessionStats.known / totalCards) * 100);
        const xpEarned = totalCards * 5;

        // Add points to progress tracker
        window.CAPMApp.progressTracker.addPoints(xpEarned);

        // Hide study, show complete
        document.getElementById('flashcardStudy').style.display = 'none';
        document.getElementById('studyComplete').style.display = 'block';

        // Display stats
        document.getElementById('cardsReviewed').textContent = totalCards;
        document.getElementById('sessionTime').textContent = window.CAPMApp.formatTime(timeSpent);
        document.getElementById('retentionRate').textContent = retentionRate + '%';
        document.getElementById('xpEarned').textContent = `+${xpEarned} XP`;

        // Mock next review schedule
        document.getElementById('dueToday').textContent = Math.floor(Math.random() * 10);
        document.getElementById('dueTomorrow').textContent = Math.floor(Math.random() * 15);
        document.getElementById('dueThisWeek').textContent = Math.floor(Math.random() * 30);
    }

    exitStudy() {
        if (confirm('Are you sure you want to exit? Your progress will be saved.')) {
            this.returnToSetup();
        }
    }

    returnToSetup() {
        document.getElementById('flashcardStudy').style.display = 'none';
        document.getElementById('studyComplete').style.display = 'none';
        document.getElementById('flashcardSetup').style.display = 'block';
    }
}

// Initialize flashcard system when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new FlashcardSystem();
});

// Made with Bob
