document.addEventListener('DOMContentLoaded', function() {
    const addButtons = document.querySelectorAll('.cta-button.add');
    const maxRewards = 5;
    let selectedCount = 2; // Already have 2 active rewards

    // Update the limit message
    function updateLimitMessage() {
        const remaining = maxRewards - selectedCount;
        const messageSpan = document.querySelector('.rewards-limit-message span');
        
        if (remaining > 0) {
            messageSpan.innerHTML = `Puedes seleccionar hasta <strong>${remaining} recompensas más</strong> para seguir tu progreso`;
        } else {
            messageSpan.innerHTML = `Has alcanzado el <strong>límite máximo</strong> de recompensas seleccionadas`;
        }
    }

    // Handle add button clicks
    addButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (selectedCount >= maxRewards) {
                // Show limit reached message
                showNotification('Has alcanzado el límite máximo de 5 recompensas', 'warning');
                return;
            }

            // Change button to "added" state
            this.classList.remove('add');
            this.classList.add('added');
            this.disabled = true;
            this.innerHTML = '<i class="fas fa-check"></i> Agregada';

            // Update the row to active state
            const row = this.closest('.rewards-row');
            row.classList.add('active');

            // Update status badge
            const statusBadge = row.querySelector('.status-badge');
            statusBadge.classList.remove('available');
            statusBadge.classList.add('active');
            statusBadge.textContent = 'Activa';

            // Increment counter
            selectedCount++;
            updateLimitMessage();

            // Show success message
            const businessName = row.querySelector('.business-name').textContent;
            showNotification(`¡${businessName} agregado a tus recompensas!`, 'success');

            // Disable other buttons if limit reached
            if (selectedCount >= maxRewards) {
                const remainingButtons = document.querySelectorAll('.cta-button.add');
                remainingButtons.forEach(btn => {
                    btn.disabled = true;
                    btn.style.opacity = '0.5';
                    btn.style.cursor = 'not-allowed';
                });
            }
        });
    });

    // Notification system
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
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 16px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 10px;
            min-width: 300px;
            animation: slideIn 0.3s ease;
            ${type === 'success' ? 'background: #4CAF50;' : ''}
            ${type === 'warning' ? 'background: #FF9800;' : ''}
            ${type === 'info' ? 'background: #6b64db;' : ''}
        `;

        // Add animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(notification);

        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 3000);

        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
            margin-left: auto;
            padding: 0;
            line-height: 1;
        `;
        
        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        });
    }

    // Initialize the page
    updateLimitMessage();

    // Add hover effects to rows
    const rows = document.querySelectorAll('.rewards-row');
    rows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateX(5px)';
            }
        });

        row.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
}); 