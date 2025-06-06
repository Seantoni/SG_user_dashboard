// SimpleGo Dashboard JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard functionality
    initializeDashboard();
});

function initializeDashboard() {
    // Copy referral code functionality
    initializeCopyButton();
    
    // Smooth scrolling for navigation
    initializeSmoothScrolling();
    
    // Card hover animations
    initializeCardAnimations();
    
    // Activity table interactions
    initializeActivityTable();
    
    // Activity filters
    initializeActivityFilters();
    
    // Activity pagination
    initializeActivityPagination();
    
    // Consumption chart
    initializeConsumptionChart();
    
    // Mobile menu functionality (if needed)
    initializeMobileMenu();
}

// Copy referral code to clipboard
function initializeCopyButton() {
    const copyButton = document.getElementById('copyButton');
    const referralCode = document.getElementById('referralCode');
    
    if (copyButton && referralCode) {
        copyButton.addEventListener('click', function() {
            // Select and copy the referral code
            referralCode.select();
            referralCode.setSelectionRange(0, 99999); // For mobile devices
            
            try {
                // Modern clipboard API
                if (navigator.clipboard && window.isSecureContext) {
                    navigator.clipboard.writeText(referralCode.value).then(() => {
                        showCopySuccess();
                    }).catch(() => {
                        // Fallback to execCommand
                        fallbackCopy();
                    });
                } else {
                    // Fallback for older browsers
                    fallbackCopy();
                }
            } catch (err) {
                console.error('Failed to copy text: ', err);
                showCopyError();
            }
        });
    }
}

function fallbackCopy() {
    const referralCode = document.getElementById('referralCode');
    try {
        document.execCommand('copy');
        showCopySuccess();
    } catch (err) {
        console.error('Fallback copy failed: ', err);
        showCopyError();
    }
}

function showCopySuccess() {
    const copyButton = document.getElementById('copyButton');
    const originalText = copyButton.textContent;
    
    copyButton.textContent = '¡Copiado!';
    copyButton.style.background = 'var(--success)';
    
    setTimeout(() => {
        copyButton.textContent = originalText;
        copyButton.style.background = 'var(--primary)';
    }, 2000);
}

function showCopyError() {
    const copyButton = document.getElementById('copyButton');
    const originalText = copyButton.textContent;
    
    copyButton.textContent = 'Error';
    copyButton.style.background = 'var(--danger)';
    
    setTimeout(() => {
        copyButton.textContent = originalText;
        copyButton.style.background = 'var(--primary)';
    }, 2000);
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Enhanced card animations
function initializeCardAnimations() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add pulse effect to card icons
            const icon = this.querySelector('.card-icon-circle');
            if (icon) {
                icon.style.transform = 'scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.card-icon-circle');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });
}

// Activity table interactions
function initializeActivityTable() {
    const rows = document.querySelectorAll('.activity-table tbody tr');
    
    rows.forEach(row => {
        row.addEventListener('click', function() {
            // Add click effect
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Add tooltip functionality to double reward badges
    const badges = document.querySelectorAll('.double-reward-badge');
    badges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            showTooltip(this, 'Vuelve antes del 30 de abril para duplicar tus recompensas');
        });
        
        badge.addEventListener('mouseleave', function() {
            hideTooltip();
        });
    });
}

// Activity filters functionality
function initializeActivityFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update current filter
            currentFilter = this.getAttribute('data-filter');
            
            // Reset to first page when filter changes
            currentPage = 1;
            
            // Update pagination with new filter
            updatePagination();
        });
    });
}

// Tooltip functionality
function showTooltip(element, text) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = text;
    tooltip.style.cssText = `
        position: absolute;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 12px;
        white-space: nowrap;
        z-index: 1000;
        pointer-events: none;
        opacity: 0;
        transform: translateY(-10px);
        transition: all 0.2s ease;
    `;
    
    document.body.appendChild(tooltip);
    
    const rect = element.getBoundingClientRect();
    tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
    
    setTimeout(() => {
        tooltip.style.opacity = '1';
        tooltip.style.transform = 'translateY(0)';
    }, 10);
}

function hideTooltip() {
    const tooltip = document.querySelector('.tooltip');
    if (tooltip) {
        tooltip.style.opacity = '0';
        tooltip.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            tooltip.remove();
        }, 200);
    }
}

// Mobile menu functionality
function initializeMobileMenu() {
    // Add mobile menu toggle if header needs it
    const header = document.querySelector('.header');
    
    if (window.innerWidth <= 768) {
        // Add mobile-specific interactions
        handleMobileInteractions();
    }
    
    // Listen for window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            handleMobileInteractions();
        }
    });
}

function handleMobileInteractions() {
    // Mobile-specific functionality
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        // Add touch interactions for mobile
        card.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        card.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Utility function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    }).format(amount);
}

// Utility function to format dates
function formatDate(date) {
    return new Intl.DateTimeFormat('es-ES', {
        day: 'numeric',
        month: 'long'
    }).format(new Date(date));
}

// Animation observer for scroll-triggered animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
            }
        });
    }, observerOptions);
    
    // Observe all sections for scroll animations
    const sections = document.querySelectorAll('.section, .card');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Initialize scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeScrollAnimations();
});

// Add loading state management
function showLoadingState(element) {
    const originalContent = element.innerHTML;
    element.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Cargando...';
    element.disabled = true;
    
    return function hideLoading() {
        element.innerHTML = originalContent;
        element.disabled = false;
    };
}

// Reward card management functionality
function removeRewardCard(cardId) {
    const card = document.querySelector(`[data-card-id="${cardId}"]`);
    if (!card) return;
    
    // Get card info for confirmation
    const cardTitle = card.querySelector('.reward-card-title').textContent.trim();
    
    // Show confirmation dialog
    showConfirmationDialog(
        '¿Eliminar tarjeta de recompensa?',
        `¿Estás seguro de que quieres eliminar "${cardTitle}"? Perderás todo el progreso acumulado.`,
        () => {
            // Animate removal
            animateCardRemoval(card, cardId);
        }
    );
}

function animateCardRemoval(card, cardId) {
    // Remove card from DOM immediately
    card.remove();
    
    // Update grid layout
    updateCardsGrid();
    
    // Show success message
    showNotification(`Tarjeta eliminada correctamente`, 'success');
    
    // Save to localStorage for persistence
    saveRemovedCard(cardId);
}

function updateCardsGrid() {
    const grid = document.querySelector('.rewards-cards-grid');
    const rewardCards = grid.querySelectorAll('.reward-card:not(.add-more):not(.monthly-challenge)');
    const addMoreCard = grid.querySelector('.reward-card.add-more');
    const challengeCard = grid.querySelector('.reward-card.monthly-challenge');
    
    // Clean up any remaining animation styles (except challenge card)
    const allCards = grid.querySelectorAll('.reward-card:not(.monthly-challenge)');
    allCards.forEach(card => {
        card.style.transition = '';
        card.style.transform = '';
        card.style.filter = '';
        card.style.gridColumn = '';
        card.style.justifySelf = '';
        card.style.order = '';
        card.classList.remove('removing');
    });
    
    // Reset grid styles
    grid.style.justifyContent = '';
    grid.style.gridTemplateColumns = '';
    
    // Always ensure challenge card is first
    if (challengeCard) {
        grid.insertBefore(challengeCard, grid.firstChild);
    }
    
    // Always ensure add-more card is last
    if (addMoreCard) {
        grid.appendChild(addMoreCard);
    }
}

function showConfirmationDialog(title, message, onConfirm) {
    // Create modal overlay
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    
    // Create modal content
    const modal = document.createElement('div');
    modal.className = 'modal-dialog';
    modal.innerHTML = `
        <div class="modal-header">
            <h3>${title}</h3>
        </div>
        <div class="modal-body">
            <p>${message}</p>
        </div>
        <div class="modal-footer">
            <button class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
            <button class="btn btn-danger" onclick="confirmAction()">Eliminar</button>
        </div>
    `;
    
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    // Add event listeners
    window.confirmAction = () => {
        onConfirm();
        closeModal();
    };
    
    window.closeModal = () => {
        overlay.remove();
        delete window.confirmAction;
        delete window.closeModal;
    };
    
    // Close on overlay click
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeModal();
        }
    });
}

function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ'}</span>
            <span class="notification-message">${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">×</button>
    `;

    // Style notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 20px;
        border-radius: 12px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 300px;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
        ${type === 'success' ? 'background: linear-gradient(135deg, #4CAF50, #45a049);' : ''}
        ${type === 'error' ? 'background: linear-gradient(135deg, #f44336, #d32f2f);' : ''}
        ${type === 'info' ? 'background: linear-gradient(135deg, #2196F3, #1976D2);' : ''}
    `;

    document.body.appendChild(notification);

    // Auto remove after 4 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 4000);
}

function saveRemovedCard(cardId) {
    const removedCards = JSON.parse(localStorage.getItem('removedRewardCards') || '[]');
    if (!removedCards.includes(cardId)) {
        removedCards.push(cardId);
        localStorage.setItem('removedRewardCards', JSON.stringify(removedCards));
    }
}

// Activity Pagination
let currentPage = 1;
const itemsPerPage = 10;
let totalItems = 0;
let currentFilter = 'all';

function initializeActivityPagination() {
    const activityRows = document.querySelectorAll('.activity-table tbody tr');
    totalItems = activityRows.length;
    
    // Initialize pagination
    updatePagination();
    
    // Event listeners for pagination controls
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                updatePagination();
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const totalPages = Math.ceil(getFilteredItemsCount() / itemsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                updatePagination();
            }
        });
    }
    
    // Event listener for page number buttons
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('page-btn')) {
            const page = parseInt(e.target.getAttribute('data-page'));
            if (page && page !== currentPage) {
                currentPage = page;
                updatePagination();
            }
        }
    });
}

function getFilteredItemsCount() {
    const activityRows = document.querySelectorAll('.activity-table tbody tr');
    if (currentFilter === 'all') {
        return activityRows.length;
    } else if (currentFilter === 'double-rewards') {
        return Array.from(activityRows).filter(row => 
            row.querySelector('.double-reward-badge')
        ).length;
    }
    return activityRows.length;
}

function updatePagination() {
    const activityRows = document.querySelectorAll('.activity-table tbody tr');
    const filteredRows = getFilteredRows();
    const totalFilteredItems = filteredRows.length;
    const totalPages = Math.ceil(totalFilteredItems / itemsPerPage);
    
    // Hide all rows first
    activityRows.forEach(row => {
        row.style.display = 'none';
    });
    
    // Show only the rows for current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    filteredRows.slice(startIndex, endIndex).forEach(row => {
        row.style.display = '';
    });
    
    // Update pagination info
    const paginationInfo = document.getElementById('pagination-info');
    if (paginationInfo) {
        const start = totalFilteredItems === 0 ? 0 : startIndex + 1;
        const end = Math.min(endIndex, totalFilteredItems);
        paginationInfo.textContent = `Mostrando ${start}-${end} de ${totalFilteredItems} actividades`;
    }
    
    // Update pagination controls
    updatePaginationControls(totalPages);
}

function getFilteredRows() {
    const activityRows = document.querySelectorAll('.activity-table tbody tr');
    if (currentFilter === 'all') {
        return Array.from(activityRows);
    } else if (currentFilter === 'double-rewards') {
        return Array.from(activityRows).filter(row => 
            row.querySelector('.double-reward-badge')
        );
    }
    return Array.from(activityRows);
}

function updatePaginationControls(totalPages) {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const paginationPages = document.getElementById('pagination-pages');
    
    // Update prev/next buttons
    if (prevBtn) {
        prevBtn.disabled = currentPage === 1;
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentPage === totalPages || totalPages === 0;
    }
    
    // Update page buttons
    if (paginationPages) {
        paginationPages.innerHTML = '';
        
        // Calculate which pages to show
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, startPage + 4);
        
        // Adjust start if we're near the end
        if (endPage - startPage < 4) {
            startPage = Math.max(1, endPage - 4);
        }
        
        for (let i = startPage; i <= endPage; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
            pageBtn.setAttribute('data-page', i);
            pageBtn.textContent = i;
            paginationPages.appendChild(pageBtn);
        }
    }
}

// Consumption Chart
function initializeConsumptionChart() {
    const ctx = document.getElementById('consumptionChart');
    if (!ctx) return;
    
    const data = {
        labels: ['Restaurantes', 'Cafeterías', 'Compras', 'Entretenimiento', 'Servicios'],
        datasets: [{
            data: [45.75, 28.50, 22.25, 15.50, 8.00],
            backgroundColor: [
                '#6B64DB',
                '#8A84E2', 
                '#A89FE8',
                '#C5B9ED',
                '#E2D4F2'
            ],
            borderColor: '#FFFFFF',
            borderWidth: 3,
            hoverBackgroundColor: [
                '#5951C5',
                '#7A74DB',
                '#9889E1',
                '#B5A9E6',
                '#D2C4EB'
            ],
            hoverBorderWidth: 4
        }]
    };
    
    const config = {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#FFFFFF',
                    bodyColor: '#FFFFFF',
                    borderColor: '#6B64DB',
                    borderWidth: 1,
                    cornerRadius: 8,
                    padding: 12,
                    displayColors: true,
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((value / total) * 100);
                            return `${label}: $${value.toFixed(2)} (${percentage}%)`;
                        }
                    }
                }
            },
            cutout: '60%',
            elements: {
                arc: {
                    borderJoinStyle: 'round'
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            },
            animation: {
                animateRotate: true,
                animateScale: true,
                duration: 1000,
                easing: 'easeInOutQuart'
            }
        }
    };
    
    new Chart(ctx, config);
}

// Export functions for potential external use
window.SimpleGoDashboard = {
    initializeDashboard,
    formatCurrency,
    formatDate,
    showLoadingState,
    removeRewardCard,
    updatePagination,
    initializeConsumptionChart
}; 