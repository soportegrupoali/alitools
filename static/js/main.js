// JavaScript Global para SOTALI - Sistema de Órdenes de Trabajo

// Function to update date and time in header
function updateDateTime() {
    const now = new Date();
    
    // Days of the week in Spanish
    const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const dayOfWeek = daysOfWeek[now.getDay()];
    
    // Format date as DD/MM/YYYY
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    
    // Format time as HH:MM AM/PM
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const formattedTime = `${hours}:${minutes} ${ampm}`;
    
    // Full datetime string
    const fullDateTime = `${dayOfWeek}, ${formattedDate} - ${formattedTime}`;
    const mobileDateTime = `${formattedDate} ${formattedTime}`;
    
    // Update both desktop and mobile displays
    const desktopElement = document.getElementById('currentDateTime');
    const mobileElement = document.getElementById('currentDateTimeMobile');
    
    if (desktopElement) {
        desktopElement.textContent = fullDateTime;
    }
    if (mobileElement) {
        mobileElement.textContent = mobileDateTime;
    }
}

// Update footer timestamp
function updateFooterTimestamp() {
    const lastUpdateElement = document.getElementById('lastUpdate');
    if (lastUpdateElement) {
        lastUpdateElement.textContent = new Date().toLocaleString('es-ES');
    }
}

// Add hover effects to cards
function initializeCardHoverEffects() {
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Initialize tooltips
function initializeTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Initialize popovers
function initializePopovers() {
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
}

// Show loading spinner
function showLoading(buttonElement) {
    const originalText = buttonElement.textContent;
    buttonElement.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status"></span>Cargando...';
    buttonElement.disabled = true;
    return originalText;
}

// Hide loading spinner
function hideLoading(buttonElement, originalText) {
    buttonElement.innerHTML = originalText;
    buttonElement.disabled = false;
}

// Show success message
function showSuccessMessage(message) {
    showAlert(message, 'success');
}

// Show error message
function showErrorMessage(message) {
    showAlert(message, 'danger');
}

// Show alert message
function showAlert(message, type = 'info') {
    const alertContainer = document.createElement('div');
    alertContainer.className = `alert alert-${type} alert-dismissible fade show`;
    alertContainer.innerHTML = `
        <i class="fas fa-info-circle me-2"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    // Find the main container and prepend the alert
    const mainContainer = document.querySelector('main');
    if (mainContainer) {
        mainContainer.insertBefore(alertContainer, mainContainer.firstChild);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (alertContainer.parentNode) {
                alertContainer.remove();
            }
        }, 5000);
    }
}

// Confirm dialog
function confirmAction(message, callback) {
    if (confirm(message)) {
        callback();
    }
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN'
    }).format(amount);
}

// Format date
function formatDate(date) {
    return new Date(date).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
}

// Format datetime
function formatDateTime(date) {
    return new Date(date).toLocaleString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Validate form
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;
    
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('is-invalid');
            isValid = false;
        } else {
            field.classList.remove('is-invalid');
        }
    });
    
    return isValid;
}

// CSRF Token helper for AJAX requests
function getCSRFToken() {
    return document.querySelector('[name=csrfmiddlewaretoken]')?.value;
}

// Make AJAX request with CSRF protection
function makeAjaxRequest(url, options = {}) {
    const defaultOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCSRFToken(),
            'X-Requested-With': 'XMLHttpRequest'
        }
    };
    
    return fetch(url, { ...defaultOptions, ...options });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Update datetime immediately and then every second
    updateDateTime();
    setInterval(updateDateTime, 1000);
    
    // Update footer timestamp
    updateFooterTimestamp();
    
    // Initialize Bootstrap components
    initializeTooltips();
    initializePopovers();
    
    // Initialize card hover effects
    initializeCardHoverEffects();
    
    // Initialize form validation on submit
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!this.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
            }
            this.classList.add('was-validated');
        });
    });
    
    // Initialize auto-hide alerts
    document.querySelectorAll('.alert').forEach(alert => {
        if (!alert.querySelector('.btn-close')) {
            setTimeout(() => {
                if (alert.parentNode) {
                    alert.remove();
                }
            }, 5000);
        }
    });
});

// Export functions for use in other scripts
window.SOTALI = {
    updateDateTime,
    showLoading,
    hideLoading,
    showSuccessMessage,
    showErrorMessage,
    showAlert,
    confirmAction,
    formatCurrency,
    formatDate,
    formatDateTime,
    validateForm,
    makeAjaxRequest
};