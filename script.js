// SimpleGo Enhanced Dashboard JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize loading screen
    initializeLoadingScreen();
    
    // Initialize dashboard functionality
    initializeDashboard();
});

function initializeLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    // Simulate loading time
    setTimeout(() => {
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            
            // Remove from DOM after animation
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }
        
        // Initialize animations after loading
        initializeScrollAnimations();
    }, 1500);
}

function initializeDashboard() {
    // Enhanced copy referral code functionality
    initializeCopyButton();
    
    // Bottom navigation functionality
    initializeBottomNavigation();
    
    // Enhanced smooth scrolling for navigation
    initializeSmoothScrolling();
    
    // Enhanced card hover animations
    initializeCardAnimations();
    
    // Activity table interactions
    initializeActivityTable();
    
    // Activity filters
    initializeActivityFilters();
    
    // Activity pagination
    initializeActivityPagination();
    
    // Consumption chart
    initializeConsumptionChart();
    
    // Initialize notification system
    initializeNotifications();
    
    // Initialize keyboard shortcuts
    initializeKeyboardShortcuts();
    
    // Initialize performance optimizations
    initializePerformanceOptimizations();
    
    // Initialize rewards carousel
    initializeRewardsCarousel();
    
    // Initialize business discovery
    initializeBusinessDiscovery();
    
    // Initialize banner carousel
    initializeBannerCarousel();
}

// ================================
// BOTTOM NAVIGATION FUNCTIONALITY
// ================================
function initializeBottomNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all items
            navItems.forEach(navItem => navItem.classList.remove('active'));
            
            // Add active class to clicked item
            item.classList.add('active');
            
            // Handle navigation based on data-section
            const section = item.dataset.section;
            handleNavigation(section);
        });
    });
}

function handleNavigation(section) {
    switch (section) {
        case 'home':
            // Scroll to top or home section
            window.scrollTo({ top: 0, behavior: 'smooth' });
            break;
        case 'activity':
            // Scroll to activity section
            scrollToSection('activity');
            break;
        case 'profile':
            // Handle profile navigation (could be a modal or separate page)
            showProfileModal();
            break;
        case 'explore':
            // Navigate to explore page
            window.location.href = 'explorar.html';
            break;
    }
}

function showProfileModal() {
    // Create a simple profile modal or redirect to profile section
    showNotification('Funcionalidad de perfil próximamente', 'info');
}

// ================================
// ENHANCED SMOOTH SCROLLING
// ================================
function initializeSmoothScrolling() {
    // Smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            scrollToSection(href.substring(1));
        });
    });
}

function scrollToSection(sectionId) {
    const target = document.getElementById(sectionId);
    
    if (target) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = target.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // Remove any active navigation highlights
        
        // Add highlight effect
        target.classList.add('section-highlight');
        setTimeout(() => {
            target.classList.remove('section-highlight');
        }, 2000);
    }
}

// ================================
// ENHANCED ANIMATIONS
// ================================
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.animate-fadeInUp');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

function initializeCardAnimations() {
    const cards = document.querySelectorAll('.reward-card, .community-card');
    
    cards.forEach(card => {
        // Touch-friendly interactions
        card.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
            
            // Add pulse effect to icons
            const icon = this.querySelector('.card-icon-circle, .community-badge');
            if (icon) {
                icon.style.transform = 'scale(1.05)';
            }
        });
        
        card.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
            
            const icon = this.querySelector('.card-icon-circle, .community-badge');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
        
        // Also handle mouse events for desktop in media query
        if (window.matchMedia('(hover: hover)').matches) {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-4px)';
                
                const icon = this.querySelector('.card-icon-circle, .community-badge');
                if (icon) {
                    icon.style.transform = 'scale(1.1)';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                
                const icon = this.querySelector('.card-icon-circle, .community-badge');
                if (icon) {
                    icon.style.transform = 'scale(1)';
                }
            });
        }
    });
}

// ================================
// NOTIFICATION SYSTEM
// ================================
function initializeNotifications() {
    // Create notification container if it doesn't exist
    if (!document.getElementById('notificationContainer')) {
        const container = document.createElement('div');
        container.id = 'notificationContainer';
        container.className = 'notification-container';
        document.body.appendChild(container);
    }
}

function showNotification(message, type = 'info', duration = 4000) {
    const container = document.getElementById('notificationContainer');
    const notification = document.createElement('div');
    
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">
                <i class="fas ${getNotificationIcon(type)}"></i>
            </div>
            <div class="notification-message">${message}</div>
            <button class="notification-close" onclick="removeNotification(this.parentElement)">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    container.appendChild(notification);
    
    // Animate in
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Auto remove
    setTimeout(() => {
        removeNotification(notification);
    }, duration);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    return icons[type] || icons.info;
}

function removeNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentElement) {
            notification.parentElement.removeChild(notification);
        }
    }, 300);
}

// ================================
// KEYBOARD SHORTCUTS
// ================================
function initializeKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Cmd/Ctrl + K for search
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            focusSearchOrFilter();
        }
        
        // M for home navigation
        if (e.key === 'm' && !e.target.matches('input, textarea')) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            // Update active nav item
            const homeNav = document.querySelector('.nav-item[data-section="home"]');
            if (homeNav) {
                document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
                homeNav.classList.add('active');
            }
        }
        
        // Number keys for quick navigation
        if (e.key >= '1' && e.key <= '4' && !e.target.matches('input, textarea')) {
            e.preventDefault();
            quickNavigate(parseInt(e.key));
        }
    });
}

function focusSearchOrFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (filterButtons.length > 0) {
        filterButtons[0].focus();
    }
}



function quickNavigate(number) {
    const sections = ['rewards', 'communities', 'activity', 'redeem'];
    if (sections[number - 1]) {
        scrollToSection(sections[number - 1]);
    }
}

// ================================
// PERFORMANCE OPTIMIZATIONS
// ================================
function initializePerformanceOptimizations() {
    // Lazy load images
    initializeLazyLoading();
    
    // Throttle scroll events
    initializeScrollThrottling();
    
    // Optimize chart rendering
    optimizeChartRendering();
}

function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

function initializeScrollThrottling() {
    let ticking = false;
    
    function updateScrollPosition() {
        const scrollTop = window.pageYOffset;
        const header = document.querySelector('.header');
        
        if (header) {
            if (scrollTop > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateScrollPosition);
            ticking = true;
        }
    });
}

function optimizeChartRendering() {
    // Defer chart initialization until section is visible
    const chartContainer = document.querySelector('.consumption-chart-container');
    
    if (chartContainer) {
        const chartObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        initializeConsumptionChart();
                    }, 300);
                    chartObserver.unobserve(entry.target);
                }
            });
        });
        
        chartObserver.observe(chartContainer);
    }
}

// ================================
// NEW FEATURE FUNCTIONS
// ================================
function showRewardsOverview() {
    showNotification('Abriendo resumen de recompensas...', 'info');
    // Add your rewards overview logic here
}

function showAllCommunities() {
    showNotification('Cargando todas las comunidades...', 'info');
    // Add your communities view logic here
}

function exportActivity() {
    showNotification('Preparando exportación de actividad...', 'info');
    // Add your export logic here
}

// ================================
// ENHANCED COPY FUNCTIONALITY
// ================================
function initializeCopyButton() {
    const copyButton = document.getElementById('copyButton');
    const referralCode = document.getElementById('referralCode');
    
    if (copyButton && referralCode) {
        copyButton.addEventListener('click', async function() {
            try {
                if (navigator.clipboard && window.isSecureContext) {
                    await navigator.clipboard.writeText(referralCode.value);
                        showCopySuccess();
                    showNotification('¡Código copiado al portapapeles!', 'success');
                } else {
                    fallbackCopy();
                }
            } catch (err) {
                console.error('Failed to copy text: ', err);
                showCopyError();
                showNotification('Error al copiar el código', 'error');
            }
        });
    }
}

function fallbackCopy() {
    const referralCode = document.getElementById('referralCode');
    try {
        referralCode.select();
        referralCode.setSelectionRange(0, 99999);
        document.execCommand('copy');
        showCopySuccess();
        showNotification('¡Código copiado!', 'success');
    } catch (err) {
        console.error('Fallback copy failed: ', err);
        showCopyError();
        showNotification('Error al copiar', 'error');
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

// ================================
// ACTIVITY TABLE ENHANCEMENTS
// ================================
function initializeActivityTable() {
    const rows = document.querySelectorAll('.activity-table tbody tr');
    
    rows.forEach(row => {
        row.addEventListener('click', function() {
            // Add click effect
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Show activity details
            showActivityDetails(this);
        });
    });
    
    // Enhanced tooltip functionality - touch optimized
    const badges = document.querySelectorAll('.double-reward-badge');
    badges.forEach(badge => {
        // Touch interaction for mobile
        badge.addEventListener('touchstart', function() {
            showTooltip(this, 'Vuelve antes del 30 de abril para duplicar tus recompensas');
        });
        
        badge.addEventListener('touchend', function() {
            setTimeout(() => hideTooltip(), 2000); // Auto-hide after 2 seconds on touch
        });
        
        // Mouse interaction only for devices that support hover
        if (window.matchMedia('(hover: hover)').matches) {
        badge.addEventListener('mouseenter', function() {
            showTooltip(this, 'Vuelve antes del 30 de abril para duplicar tus recompensas');
        });
        
        badge.addEventListener('mouseleave', function() {
            hideTooltip();
        });
        }
    });
}

function showActivityDetails(row) {
    const date = row.querySelector('.date').textContent;
    const place = row.querySelector('.place').textContent.trim();
    const credits = row.querySelector('.credits').textContent;
    
    showNotification(`Actividad: ${place} - ${date} - ${credits}`, 'info', 6000);
}

// ================================
// EXISTING FUNCTIONS (ENHANCED)
// ================================

// ... existing code ...

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
            
            // Show feedback
            showNotification(`Filtro aplicado: ${this.textContent}`, 'info', 2000);
        });
    });
}

// Tooltip functionality
function showTooltip(element, text) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = text;
    
    document.body.appendChild(tooltip);
    
    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
    
    setTimeout(() => tooltip.classList.add('show'), 100);
}

function hideTooltip() {
    const tooltip = document.querySelector('.tooltip');
    if (tooltip) {
        tooltip.classList.remove('show');
        setTimeout(() => {
            if (tooltip.parentElement) {
                tooltip.parentElement.removeChild(tooltip);
            }
        }, 200);
    }
}

// Enhanced reward card removal
function removeRewardCard(cardId) {
    const card = document.querySelector(`[data-card-id="${cardId}"]`);
    if (card) {
    showConfirmationDialog(
            'Eliminar Tarjeta',
            '¿Estás seguro de que quieres eliminar esta tarjeta de recompensas?',
        () => {
            animateCardRemoval(card, cardId);
                showNotification('Tarjeta eliminada exitosamente', 'success');
        }
    );
    }
}

function animateCardRemoval(card, cardId) {
    card.style.transform = 'scale(0.8) rotateX(90deg)';
    card.style.opacity = '0';
    
    setTimeout(() => {
        card.remove();
    updateCardsGrid();
    saveRemovedCard(cardId);
    }, 300);
}

// Enhanced community joining
function joinCommunity(communityId) {
    const communityCard = event.target.closest('.community-card');
    const communityTitle = communityCard.querySelector('.community-title').textContent;
    
    showNotification(`Uniéndote a ${communityTitle}...`, 'info');
    
    setTimeout(() => {
        // Simulate API call
        const joinedCommunities = JSON.parse(localStorage.getItem('joinedCommunities') || '[]');
        
        if (!joinedCommunities.find(c => c.id === communityId)) {
            const community = {
                id: communityId,
                name: communityTitle,
                joinedDate: new Date().toISOString()
            };
            
            joinedCommunities.push(community);
            localStorage.setItem('joinedCommunities', JSON.stringify(joinedCommunities));
            
            updateJoinedCommunitiesDisplay();
            updateCommunityButton(communityId);
            showCommunityWelcomeNotification(community);
        }
    }, 1000);
}

function updateJoinedCommunitiesDisplay() {
    const joinedCommunitiesContainer = document.getElementById('joinedCommunities');
    const joinedCommunities = JSON.parse(localStorage.getItem('joinedCommunities') || '[]');
    
    if (joinedCommunities.length === 0) {
        joinedCommunitiesContainer.innerHTML = `
            <div class="empty-communities">
                <div class="empty-icon">🏘️</div>
                <p>Aún no te has unido a ninguna comunidad</p>
                <p class="empty-subtitle">¡Únete a una comunidad y comienza a recibir beneficios exclusivos!</p>
        </div>
        `;
    } else {
        joinedCommunitiesContainer.innerHTML = joinedCommunities.map(community => `
            <div class="joined-community-card">
                <div class="joined-community-icon">🏘️</div>
                <div class="joined-community-info">
                    <div class="joined-community-name">${community.name}</div>
                    <div class="joined-community-status">Miembro activo</div>
        </div>
                <div class="community-actions">
                    <button class="community-action-btn" onclick="openCommunityChat('${community.id}')">
                        <i class="fas fa-comments"></i>
                    </button>
                    <button class="community-action-btn" onclick="leaveCommunity('${community.id}')">
                        <i class="fas fa-sign-out-alt"></i>
                    </button>
        </div>
            </div>
        `).join('');
    }
}

function showCommunityWelcomeNotification(community) {
    showNotification(`¡Bienvenido a ${community.name}! Ahora puedes acceder a beneficios exclusivos.`, 'success', 6000);
}

// Initialize when page loads
let currentPage = 1;
let currentFilter = 'all';

// ... existing functions continue with enhancements ...

// Activity Pagination
let totalItems = 0;

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

// Terms and Conditions Modal functionality
function openTermsModal(cardType) {
    const modal = document.getElementById('termsModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    
    if (!modal || !modalTitle || !modalContent) return;
    
    // Set the title and content based on card type
    const content = getTermsContent(cardType);
    modalTitle.textContent = content.title;
    modalContent.innerHTML = content.html;
    
    // Show the modal with animation
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeTermsModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', handleEscapeKey);
}

function closeTermsModal() {
    const modal = document.getElementById('termsModal');
    if (!modal) return;
    
    modal.classList.remove('show');
    document.body.style.overflow = '';
    
    // Remove event listeners
    document.removeEventListener('keydown', handleEscapeKey);
}

function handleEscapeKey(e) {
    if (e.key === 'Escape') {
        closeTermsModal();
    }
}

function getTermsContent(cardType) {
    const content = {
        'monthly-challenge': {
            title: 'Términos y Condiciones - Reto del Mes',
            html: `
                <h4>🏆 Reto del Mes - Diciembre 2024</h4>
                <p><strong>Objetivo:</strong> Visita 4 restaurantes diferentes durante el mes de diciembre para obtener una recompensa de $20 en créditos.</p>
                
                <h5>Condiciones del Reto</h5>
                <ul>
                    <li>El reto debe completarse entre el 1 y 31 de diciembre de 2024</li>
                    <li>Cada visita debe ser a un restaurante diferente registrado en SimpleGo</li>
                    <li>El gasto mínimo por visita debe ser de $10 USD</li>
                    <li>Los créditos se otorgarán automáticamente al completar las 4 visitas</li>
                    <li>Solo puede participar una vez por usuario al mes</li>
                </ul>
                
                <h5>Elegibilidad</h5>
                <ul>
                    <li>Usuario activo de SimpleGo con cuenta verificada</li>
                    <li>Sin infracciones previas en los términos de servicio</li>
                    <li>Disponible solo para usuarios mayores de 18 años</li>
                </ul>
                
                <h5>Limitaciones</h5>
                <p>Los créditos obtenidos expiran 90 días después de ser otorgados. SimpleGo se reserva el derecho de modificar o cancelar este reto en cualquier momento. En caso de actividad fraudulenta, el usuario será descalificado automáticamente.</p>
                
                <p><small>Última actualización: 1 de diciembre, 2024</small></p>
            `
        },
        'olive-garden': {
            title: 'Términos y Condiciones - Olive Garden',
            html: `
                <h4>🍰 Postre Gratis en Olive Garden</h4>
                <p><strong>Recompensa:</strong> Obtén un postre gratuito al completar 10 visitas a Olive Garden.</p>
                
                <h5>Condiciones de la Tarjeta</h5>
                <ul>
                    <li>Válido solo en ubicaciones participantes de Olive Garden</li>
                    <li>Cada visita debe tener un gasto mínimo de $15 USD</li>
                    <li>Los sellos se otorgan una vez por día por usuario</li>
                    <li>El postre debe canjearse dentro de 30 días después de completar la tarjeta</li>
                    <li>No acumulable con otras promociones</li>
                </ul>
                
                <h5>Postres Disponibles</h5>
                <ul>
                    <li>Tiramisu clásico</li>
                    <li>Cheesecake de fresa</li>
                    <li>Mousse de chocolate</li>
                    <li>Gelato (sabores disponibles según temporada)</li>
                </ul>
                
                <h5>Restricciones</h5>
                <p>El postre gratuito no incluye bebidas adicionales. Válido para cenar en restaurante únicamente, no aplica para órdenes para llevar o delivery. La promoción no tiene valor monetario y no puede ser transferida.</p>
                
                <h5>Cancelación</h5>
                <p>Puedes cancelar esta tarjeta de recompensas en cualquier momento, pero perderás todo el progreso acumulado. Los sellos no son reembolsables.</p>
                
                <p><small>Términos sujetos a cambios. Última actualización: 15 de noviembre, 2024</small></p>
            `
        },
        'papa-johns': {
            title: 'Términos y Condiciones - Papa Johns',
            html: `
                <h4>🍕 Pizza Gratis en Papa Johns</h4>
                <p><strong>Recompensa:</strong> Obtén una pizza mediana gratuita al completar 10 visitas a Papa Johns.</p>
                
                <h5>Condiciones de la Tarjeta</h5>
                <ul>
                    <li>Válido en todas las ubicaciones de Papa Johns participantes</li>
                    <li>Gasto mínimo de $12 USD por visita para obtener sello</li>
                    <li>Máximo un sello por día por usuario</li>
                    <li>La pizza gratuita debe canjearse dentro de 45 días</li>
                    <li>Disponible para órdenes en tienda, para llevar y delivery</li>
                </ul>
                
                <h5>Pizzas Elegibles</h5>
                <ul>
                    <li>Cualquier pizza mediana del menú regular</li>
                    <li>Incluye hasta 3 ingredientes adicionales sin costo</li>
                    <li>Masa disponible: tradicional, delgada o pan</li>
                    <li>No incluye pizzas especiales o de edición limitada</li>
                </ul>
                
                <h5>Términos Adicionales</h5>
                <p>Los costos de delivery y propinas no están incluidos en la promoción. Para órdenes de delivery, se aplican las tarifas normales de envío. La pizza gratuita no puede ser cambiada por efectivo o crédito en tienda.</p>
                
                <h5>Validez y Transferencia</h5>
                <p>Esta tarjeta es personal e intransferible. Los sellos acumulados no pueden ser combinados entre diferentes cuentas de usuario. Papa Johns se reserva el derecho de verificar la elegibilidad en cualquier momento.</p>
                
                <p><small>Promoción válida hasta agotar existencias. Última actualización: 20 de noviembre, 2024</small></p>
            `
        }
    };
    
    return content[cardType] || {
        title: 'Términos y Condiciones',
        html: '<p>No se encontraron términos específicos para esta tarjeta.</p>'
    };
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

// Make modal functions globally available
window.openTermsModal = openTermsModal;
window.closeTermsModal = closeTermsModal;

// Communities functionality
let userCommunities = [];

function joinCommunity(communityId) {
    const communityData = {
        'pizza-lovers': {
            id: 'pizza-lovers',
            name: 'Amantes de la Pizza',
            icon: '🍕',
            description: 'Descuentos exclusivos en pizzerías, nuevas aperturas y eventos especiales',
            members: 2847,
            merchants: 45
        },
        'coffee-lovers': {
            id: 'coffee-lovers',
            name: 'Cafeteros',
            icon: '☕',
            description: 'Para los amantes del café, ofertas especiales y degustaciones',
            members: 1523,
            merchants: 28
        },
        'shoppers': {
            id: 'shoppers',
            name: 'Shoppers',
            icon: '🛍️',
            description: 'Descuentos en tiendas, pre-ventas y acceso a colecciones exclusivas',
            members: 3201,
            merchants: 67
        },
        'entertainment': {
            id: 'entertainment',
            name: 'Entretenimiento',
            icon: '🎬',
            description: 'Ofertas en cines, teatros, conciertos y eventos culturales',
            members: 987,
            merchants: 23
        }
    };

    const community = communityData[communityId];
    if (!community) return;

    // Check if already joined
    if (userCommunities.some(c => c.id === communityId)) {
        showNotification('Ya eres miembro de esta comunidad', 'info');
        return;
    }

    // Add to user communities
    userCommunities.push({
        ...community,
        joinedDate: new Date().toLocaleDateString('es-ES'),
        status: 'Activo'
    });

    // Update UI
    updateJoinedCommunitiesDisplay();
    updateCommunityButton(communityId);
    
    // Show success notification
    showNotification(`¡Te has unido exitosamente a ${community.name}!`, 'success');
    
    // Simulate notification about benefits
    setTimeout(() => {
        showCommunityWelcomeNotification(community);
    }, 2000);
}

function updateJoinedCommunitiesDisplay() {
    const joinedCommunitiesContainer = document.getElementById('joinedCommunities');
    
    if (!joinedCommunitiesContainer) return;
    
    if (userCommunities.length === 0) {
        joinedCommunitiesContainer.innerHTML = `
            <div class="empty-communities">
                <div class="empty-icon">🏘️</div>
                <p>Aún no te has unido a ninguna comunidad</p>
                <p class="empty-subtitle">¡Únete a una comunidad y comienza a recibir beneficios exclusivos!</p>
            </div>
        `;
        return;
    }

    const communitiesHTML = userCommunities.map(community => `
        <div class="joined-community-card">
            <div class="joined-community-icon">${community.icon}</div>
            <div class="joined-community-info">
                <div class="joined-community-name">${community.name}</div>
                <div class="joined-community-status">Miembro desde ${community.joinedDate}</div>
            </div>
            <div class="community-actions">
                <button class="community-action-btn" onclick="openCommunityChat('${community.id}')">
                    <i class="fas fa-comments"></i> Chat
                </button>
                <button class="community-action-btn" onclick="leaveCommunity('${community.id}')">
                    <i class="fas fa-sign-out-alt"></i> Salir
                </button>
            </div>
        </div>
    `).join('');

    joinedCommunitiesContainer.innerHTML = communitiesHTML;
}

function updateCommunityButton(communityId) {
    const button = document.querySelector(`button[onclick="joinCommunity('${communityId}')"]`);
    if (button) {
        button.innerHTML = '<span>✓ Unido</span>';
        button.classList.remove('secondary');
        button.classList.add('joined');
        button.style.background = 'var(--success)';
        button.style.color = 'white';
        button.disabled = true;
    }
}

function leaveCommunity(communityId) {
    const community = userCommunities.find(c => c.id === communityId);
    if (!community) return;

    showConfirmationDialog(
        'Salir de la Comunidad',
        `¿Estás seguro de que quieres salir de "${community.name}"? Perderás todos los beneficios exclusivos de esta comunidad.`,
        () => {
            // Remove from user communities
            userCommunities = userCommunities.filter(c => c.id !== communityId);
            
            // Update UI
            updateJoinedCommunitiesDisplay();
            resetCommunityButton(communityId);
            
            showNotification(`Has salido de ${community.name}`, 'info');
        }
    );
}

function resetCommunityButton(communityId) {
    const button = document.querySelector(`button[onclick="joinCommunity('${communityId}')"]`);
    if (button) {
        const isMainCard = button.classList.contains('primary');
        button.innerHTML = isMainCard ? '<span>Unirme ahora</span>' : '<span>Unirme</span>';
        button.classList.remove('joined');
        button.classList.add(isMainCard ? 'primary' : 'secondary');
        button.style.background = '';
        button.style.color = '';
        button.disabled = false;
    }
}

function openCommunityChat(communityId) {
    const community = userCommunities.find(c => c.id === communityId);
    if (!community) return;

    // For now, just show a notification. In a real app, this would open a chat interface
    showCommunityNotification(
        'Chat de Comunidad',
        `Bienvenido al chat de ${community.name}! Aquí podrás comunicarte directamente con comercios y otros miembros.`,
        'info'
    );
}

function showCommunityWelcomeNotification(community) {
    showCommunityNotification(
        '¡Bienvenido a la comunidad!',
        `Como miembro de ${community.name}, recibirás notificaciones sobre ofertas exclusivas y podrás comunicarte directamente con ${community.merchants} comercios afiliados.`,
        'success'
    );
}

function showCommunityNotification(title, message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `community-notification ${type}`;
    notification.innerHTML = `
        <div class="community-notification-content">
            <div class="community-notification-header">
                <h4>${title}</h4>
                <button class="community-notification-close" onclick="this.parentElement.parentElement.parentElement.remove()">
                    <span>&times;</span>
                </button>
            </div>
            <p>${message}</p>
        </div>
    `;

    // Add styles for community notification
    const style = document.createElement('style');
    style.textContent = `
        .community-notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            max-width: 350px;
            z-index: 1000;
            border-left: 4px solid var(--primary);
            animation: slideInRight 0.3s ease;
        }
        .community-notification.success {
            border-left-color: var(--success);
        }
        .community-notification-content {
            padding: 16px;
        }
        .community-notification-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
        }
        .community-notification-header h4 {
            margin: 0;
            font-size: 16px;
            color: var(--text);
        }
        .community-notification-close {
            background: none;
            border: none;
            font-size: 18px;
            cursor: pointer;
            color: var(--text-light);
            padding: 0;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .community-notification p {
            margin: 0;
            font-size: 14px;
            color: var(--text-light);
            line-height: 1.4;
        }
    `;
    
    if (!document.head.querySelector('style[data-community-notifications]')) {
        style.setAttribute('data-community-notifications', 'true');
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Make community functions globally available
window.joinCommunity = joinCommunity;
window.leaveCommunity = leaveCommunity;
window.openCommunityChat = openCommunityChat;

// Community scroll functionality (native scrolling)
function initializeCommunityScroll() {
    const scrollContainer = document.querySelector('.communities-scroll');
    if (!scrollContainer) return;
    
    // Optional: Add smooth scroll behavior for programmatic scrolling
    scrollContainer.style.scrollBehavior = 'smooth';
    
    // Optional: Auto-scroll hint (subtle animation to show it's scrollable)
    setTimeout(() => {
        if (scrollContainer.scrollWidth > scrollContainer.clientWidth) {
            scrollContainer.scrollLeft = 20;
            setTimeout(() => {
                scrollContainer.scrollLeft = 0;
            }, 1000);
        }
    }, 2000);
}

// ================================
// REWARDS CAROUSEL FUNCTIONALITY
// ================================
function initializeRewardsCarousel() {
    const carousel = document.querySelector('.rewards-cards-grid');
    const indicators = document.querySelectorAll('.scroll-indicator');
    
    if (!carousel || !indicators.length) return;
    
    // Handle scroll events to update indicators
    let scrollTimeout;
    carousel.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            updateActiveIndicator();
        }, 100);
    });
    
    // Handle indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            scrollToCard(index);
        });
    });
    
    // Touch/swipe handling for better mobile experience
    let startX = 0;
    let scrollLeft = 0;
    let isDown = false;
    
    carousel.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
        carousel.style.cursor = 'grabbing';
    });
    
    carousel.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.touches[0].pageX - carousel.offsetLeft;
        const walk = (x - startX) * 1.5;
        carousel.scrollLeft = scrollLeft - walk;
    });
    
    carousel.addEventListener('touchend', () => {
        isDown = false;
        carousel.style.cursor = 'grab';
    });
    
    function updateActiveIndicator() {
        const scrollLeft = carousel.scrollLeft;
        const cardWidth = carousel.querySelector('.reward-card').offsetWidth;
        const containerWidth = carousel.offsetWidth;
        
        // Calculate which card is most visible
        let activeIndex = 0;
        const cards = carousel.querySelectorAll('.reward-card');
        
        cards.forEach((card, index) => {
            const cardLeft = card.offsetLeft;
            const cardCenter = cardLeft + (cardWidth / 2);
            const containerCenter = scrollLeft + (containerWidth / 2);
            
            if (Math.abs(cardCenter - containerCenter) < cardWidth / 2) {
                activeIndex = index;
            }
        });
        
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === activeIndex);
        });
    }
    
    function scrollToCard(index) {
        const cards = carousel.querySelectorAll('.reward-card');
        if (cards[index]) {
            const cardLeft = cards[index].offsetLeft;
            const containerWidth = carousel.offsetWidth;
            const cardWidth = cards[index].offsetWidth;
            
            // Center the card in the viewport
            const scrollPosition = cardLeft - (containerWidth / 2) + (cardWidth / 2);
            
            carousel.scrollTo({
                left: Math.max(0, scrollPosition),
                behavior: 'smooth'
            });
        }
    }
    

    
    // Initialize first indicator as active
    setTimeout(() => {
        updateActiveIndicator();
    }, 500);
    
    // Update indicators on resize
    window.addEventListener('resize', () => {
        setTimeout(() => {
            updateActiveIndicator();
        }, 100);
    });
}

// ================================
// BUSINESS DISCOVERY FUNCTIONALITY
// ================================
function initializeBusinessDiscovery() {
    initializeCategoryFilters();
    initializeBusinessCards();
}

function initializeCategoryFilters() {
    const categoryFilters = document.querySelectorAll('.category-filter');
    const businessCards = document.querySelectorAll('.business-card');
    
    categoryFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            // Remove active class from all filters
            categoryFilters.forEach(f => f.classList.remove('active'));
            
            // Add active class to clicked filter
            filter.classList.add('active');
            
            // Get selected category
            const selectedCategory = filter.dataset.category;
            
            // Filter business cards
            filterBusinessCards(selectedCategory, businessCards);
            
            // Add haptic feedback
            if (navigator.vibrate) {
                navigator.vibrate(50);
            }
        });
    });
}

function filterBusinessCards(category, businessCards) {
    businessCards.forEach(card => {
        const cardCategory = card.dataset.category;
        
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.3s ease forwards';
        } else {
            card.style.display = 'none';
        }
    });
    
    // Update grid layout after filtering
    setTimeout(() => {
        const grid = document.querySelector('.business-cards-grid');
        if (grid) {
            grid.style.animation = 'fadeInUp 0.2s ease forwards';
        }
    }, 100);
}

function initializeBusinessCards() {
    const businessCards = document.querySelectorAll('.business-card');
    
    // Add touch interactions for business cards
    businessCards.forEach(card => {
        card.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        card.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
        
        // Handle card clicks
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const businessName = card.getAttribute('title');
            addBusinessToWallet(businessName, card);
        });
    });
}

function addBusinessToWallet(businessName, card) {
    // Animate card
    card.style.borderColor = 'var(--success)';
    card.style.transform = 'scale(1.05)';
    
    // Add check icon overlay
    const checkOverlay = document.createElement('div');
    checkOverlay.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(34, 197, 94, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 14px;
        z-index: 10;
    `;
    checkOverlay.innerHTML = '<i class="fas fa-check" style="color: white; font-size: 20px;"></i>';
    card.appendChild(checkOverlay);
    
    // Show success notification
    showNotification(`¡${businessName} agregado a tu cartera!`, 'success');
    
    // Add to local storage (simulate adding to wallet)
    const addedBusinesses = JSON.parse(localStorage.getItem('addedBusinesses') || '[]');
    if (!addedBusinesses.includes(businessName)) {
        addedBusinesses.push(businessName);
        localStorage.setItem('addedBusinesses', JSON.stringify(addedBusinesses));
    }
    
    // Reset card after 2 seconds
    setTimeout(() => {
        card.style.borderColor = 'var(--border)';
        card.style.transform = 'scale(1)';
        if (checkOverlay.parentNode) {
            checkOverlay.remove();
        }
    }, 2000);
}

// ================================
// BANNER CAROUSEL FUNCTIONALITY
// ================================
function initializeBannerCarousel() {
    const carousel = document.querySelector('.banner-carousel');
    const indicators = document.querySelectorAll('.banner-indicator');
    const banners = document.querySelectorAll('.banner-container');
    
    if (!carousel || !indicators.length || !banners.length) return;
    
    let currentIndex = 0;
    
    // Add scroll event listener to update indicators
    carousel.addEventListener('scroll', () => {
        updateIndicatorsOnScroll();
    });
    
    // Add click event listeners to indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            scrollToBanner(index);
        });
    });
    
    function updateIndicatorsOnScroll() {
        const scrollLeft = carousel.scrollLeft;
        const bannerWidth = banners[0].offsetWidth + 12; // width + gap
        const newIndex = Math.round(scrollLeft / bannerWidth);
        
        if (newIndex !== currentIndex && newIndex >= 0 && newIndex < indicators.length) {
            currentIndex = newIndex;
            updateActiveIndicator();
        }
    }
    
    function scrollToBanner(index) {
        const bannerWidth = banners[0].offsetWidth + 12; // width + gap
        const scrollPosition = index * bannerWidth;
        
        carousel.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
        
        currentIndex = index;
        updateActiveIndicator();
    }
    
    function updateActiveIndicator() {
        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    // Auto-scroll functionality (optional)
    let autoScrollInterval;
    
    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            const nextIndex = (currentIndex + 1) % banners.length;
            scrollToBanner(nextIndex);
        }, 3000); // Change banner every 3 seconds
    }
    
    function stopAutoScroll() {
        if (autoScrollInterval) {
            clearInterval(autoScrollInterval);
        }
    }
    
    // Start auto-scroll
    startAutoScroll();
    
    // Pause auto-scroll on user interaction
    carousel.addEventListener('touchstart', stopAutoScroll);
    carousel.addEventListener('mousedown', stopAutoScroll);
    
    // Resume auto-scroll after user interaction ends
    let resumeTimeout;
    carousel.addEventListener('touchend', () => {
        clearTimeout(resumeTimeout);
        resumeTimeout = setTimeout(startAutoScroll, 3000);
    });
    
    carousel.addEventListener('mouseup', () => {
        clearTimeout(resumeTimeout);
        resumeTimeout = setTimeout(startAutoScroll, 3000);
    });
}

// Initialize communities when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize communities display
    updateJoinedCommunitiesDisplay();
    
    // Initialize community scroll
    setTimeout(initializeCommunityScroll, 100); // Small delay to ensure DOM is ready
}); 