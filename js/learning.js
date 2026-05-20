// CAPM Learning Module - Interactive learning functionality

class LearningModule {
    constructor() {
        this.currentDomain = 'integration';
        this.initialize();
    }

    initialize() {
        this.setupDomainNavigation();
        this.setupModuleToggles();
        this.loadCurrentDomain();
    }

    setupDomainNavigation() {
        const domainLinks = document.querySelectorAll('.domain-link');
        
        domainLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Update active state
                domainLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                // Get domain from data attribute
                const domain = link.dataset.domain;
                this.switchDomain(domain);
            });
        });

        // Handle hash changes (for direct links)
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.substring(1);
            if (hash) {
                this.switchDomain(hash);
            }
        });

        // Load domain from URL hash on page load
        const initialHash = window.location.hash.substring(1);
        if (initialHash) {
            this.switchDomain(initialHash);
        }
    }

    setupModuleToggles() {
        // Module toggle functionality is handled by inline onclick
        // This is already defined in the HTML
    }

    switchDomain(domain) {
        this.currentDomain = domain;
        
        // Hide all domain sections
        document.querySelectorAll('.domain-section').forEach(section => {
            section.style.display = 'none';
        });
        
        // Show selected domain
        const domainSection = document.getElementById(domain);
        if (domainSection) {
            domainSection.style.display = 'block';
            
            // Scroll to top of content
            domainSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        
        // Update active link
        document.querySelectorAll('.domain-link').forEach(link => {
            link.classList.remove('active');
            if (link.dataset.domain === domain) {
                link.classList.add('active');
            }
        });
    }

    loadCurrentDomain() {
        // Load the current domain (default is integration)
        const domainSection = document.getElementById(this.currentDomain);
        if (domainSection) {
            domainSection.style.display = 'block';
        }
    }
}

// Module toggle function (called from HTML)
function toggleModule(element) {
    const moduleCard = element.closest('.module-card');
    const content = moduleCard.querySelector('.module-content');
    const icon = element.querySelector('i');
    
    // Toggle active state
    element.classList.toggle('active');
    content.classList.toggle('active');
    
    // Rotate icon
    if (element.classList.contains('active')) {
        icon.style.transform = 'rotate(180deg)';
    } else {
        icon.style.transform = 'rotate(0deg)';
    }
}

// Mark module as complete
function markComplete(domain) {
    // Add to progress tracker
    window.CAPMApp.progressTracker.completeModule(domain);
    
    // Show success message
    showNotification('Module completed! +50 XP earned', 'success');
    
    // Update UI
    const button = event.target.closest('button');
    if (button) {
        button.innerHTML = '<i class="fas fa-check-circle"></i> Completed';
        button.classList.remove('btn-secondary');
        button.classList.add('btn-success');
        button.disabled = true;
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Initialize learning module when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new LearningModule();
});

// Made with Bob
