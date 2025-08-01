// SplitMate Desktop JavaScript - Material Design Interactions

document.addEventListener('DOMContentLoaded', function () {
    // Initialize the application
    initApp();
});

function initApp() {
    // Setup navigation
    setupNavigation();

    // Setup form interactions
    setupFormInteractions();

    // Setup dynamic calculations
    setupCalculations();

    // Setup responsive behavior
    setupResponsive();

    // Setup user interactions
    setupUserInteractions();
}

// Navigation System
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const screens = document.querySelectorAll('.screen');
    const pageTitle = document.querySelector('.page-title');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetScreen = this.getAttribute('data-screen');

            // Update active navigation
            navLinks.forEach(nav => nav.parentElement.classList.remove('active'));
            this.parentElement.classList.add('active');

            // Show target screen
            screens.forEach(screen => screen.classList.remove('active'));
            const targetElement = document.getElementById(targetScreen);
            if (targetElement) {
                targetElement.classList.add('active');
            }

            // Update page title
            const screenTitles = {
                'dashboard': 'Dashboard',
                'groups': 'Groups',
                'expenses': 'Expenses',
                'history': 'History',
                'profile': 'Profile'
            };

            if (pageTitle && screenTitles[targetScreen]) {
                pageTitle.textContent = screenTitles[targetScreen];
            }

            // Add smooth transition
            targetElement.style.opacity = '0';
            setTimeout(() => {
                targetElement.style.opacity = '1';
            }, 50);
        });
    });
}

// Form Interactions
function setupFormInteractions() {
    // Form submissions
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            showSuccessMessage('Action completed successfully!');
        });
    });

    // Member tag removal
    const removeButtons = document.querySelectorAll('.remove-member');
    removeButtons.forEach(button => {
        button.addEventListener('click', function () {
            this.parentElement.remove();
        });
    });

    // Add friend buttons
    const addFriendButtons = document.querySelectorAll('.add-friend-btn');
    addFriendButtons.forEach(button => {
        button.addEventListener('click', function () {
            this.textContent = 'Added';
            this.style.backgroundColor = 'var(--success-500)';
            this.disabled = true;
        });
    });

    // Form input focus effects
    const formInputs = document.querySelectorAll('.form-input, .form-select, .form-textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function () {
            this.parentElement.style.borderColor = 'var(--primary-500)';
        });

        input.addEventListener('blur', function () {
            this.parentElement.style.borderColor = 'var(--grey-300)';
        });
    });

    // Member search functionality
    const memberSearch = document.querySelector('.member-search');
    if (memberSearch) {
        memberSearch.addEventListener('input', function () {
            const searchTerm = this.value.toLowerCase();
            const friendItems = document.querySelectorAll('.friend-item');

            friendItems.forEach(item => {
                const name = item.querySelector('.friend-name').textContent.toLowerCase();
                const email = item.querySelector('.friend-email').textContent.toLowerCase();

                if (name.includes(searchTerm) || email.includes(searchTerm)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
}

// Dynamic Calculations
function setupCalculations() {
    // Amount input calculations
    const amountInput = document.querySelector('.amount-input input');
    if (amountInput) {
        amountInput.addEventListener('input', function () {
            updateSplitPreview();
        });
    }

    // Member checkbox calculations
    const memberCheckboxes = document.querySelectorAll('.member-checkboxes input[type="checkbox"]');
    memberCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            updateSplitPreview();
        });
    });

    // Split option changes
    const splitOptions = document.querySelectorAll('input[name="split"]');
    splitOptions.forEach(option => {
        option.addEventListener('change', function () {
            updateSplitPreview();
        });
    });
}

function updateSplitPreview() {
    const amountInput = document.querySelector('.amount-input input');
    const checkedMembers = document.querySelectorAll('.member-checkboxes input[type="checkbox"]:checked');
    const splitItems = document.querySelectorAll('.split-item');

    if (amountInput && checkedMembers.length > 0) {
        const amount = parseFloat(amountInput.value) || 0;
        const splitAmount = amount / checkedMembers.length;

        splitItems.forEach((item, index) => {
            if (index < checkedMembers.length) {
                const amountSpan = item.querySelector('.split-amount');
                if (amountSpan) {
                    amountSpan.textContent = `Rs. ${splitAmount.toFixed(2)}`;
                }
            }
        });
    }
}

// Responsive Behavior
function setupResponsive() {
    // Mobile menu toggle (if needed)
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');

    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', function () {
            sidebar.classList.toggle('open');
        });
    }

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function (e) {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
                sidebar.classList.remove('open');
            }
        }
    });

    // Handle window resize
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('open');
        }
    });
}

// User Interactions
function setupUserInteractions() {
    // Action button interactions
    const actionButtons = document.querySelectorAll('.action-button');
    actionButtons.forEach(button => {
        button.addEventListener('click', function () {
            const action = this.querySelector('span').textContent;

            // Navigate to appropriate screen based on action
            switch (action) {
                case 'Add Expense':
                    navigateToScreen('expenses');
                    break;
                case 'Create Group':
                    navigateToScreen('groups');
                    break;
                case 'Settle Up':
                    // Could navigate to settle up screen
                    showSuccessMessage('Settle up feature coming soon!');
                    break;
                case 'View History':
                    navigateToScreen('history');
                    break;
            }
        });
    });

    // Card interactions
    const listItems = document.querySelectorAll('.list-item');
    listItems.forEach(item => {
        item.addEventListener('click', function () {
            // Add hover effect
            this.style.backgroundColor = 'var(--grey-50)';
            setTimeout(() => {
                this.style.backgroundColor = '';
            }, 200);
        });
    });

    // Settings interactions
    const settingsItems = document.querySelectorAll('.settings-item');
    settingsItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            const setting = this.querySelector('span').textContent;
            showSuccessMessage(`${setting} feature coming soon!`);
        });
    });
}

// Utility Functions
function navigateToScreen(screenId) {
    const navLink = document.querySelector(`[data-screen="${screenId}"]`);
    if (navLink) {
        navLink.click();
    }
}

function showSuccessMessage(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification success';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="material-icons">check_circle</i>
            <span>${message}</span>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--success-500);
        color: white;
        padding: var(--spacing-4);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;

    // Add to page
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

function showErrorMessage(message) {
    const notification = document.createElement('div');
    notification.className = 'notification error';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="material-icons">error</i>
            <span>${message}</span>
        </div>
    `;

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--error-500);
        color: white;
        padding: var(--spacing-4);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Data Management
function saveFormData(form) {
    const formData = new FormData(form);
    const data = {};

    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }

    localStorage.setItem(`form_${form.className}`, JSON.stringify(data));
}

function loadFormData(form) {
    const saved = localStorage.getItem(`form_${form.className}`);
    if (saved) {
        const data = JSON.parse(saved);
        Object.keys(data).forEach(key => {
            const input = form.querySelector(`[name="${key}"]`);
            if (input) {
                input.value = data[key];
            }
        });
    }
}

// Auto-save forms
document.addEventListener('DOMContentLoaded', function () {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        // Load saved data
        loadFormData(form);

        // Auto-save on input change
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', () => saveFormData(form));
            input.addEventListener('change', () => saveFormData(form));
        });
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', function (e) {
    // Escape key to close modals/dropdowns
    if (e.key === 'Escape') {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar && sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
        }
    }

    // Number keys for quick navigation
    if (e.key >= '1' && e.key <= '5') {
        const screens = ['dashboard', 'groups', 'expenses', 'history', 'profile'];
        const index = parseInt(e.key) - 1;
        if (screens[index]) {
            navigateToScreen(screens[index]);
        }
    }
});

// Performance optimizations
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounced resize handler
const debouncedResize = debounce(function () {
    setupResponsive();
}, 250);

window.addEventListener('resize', debouncedResize);

// Export functions for external use
window.SplitMateDesktop = {
    navigateToScreen,
    showSuccessMessage,
    showErrorMessage,
    updateSplitPreview,
    saveFormData,
    loadFormData
}; 