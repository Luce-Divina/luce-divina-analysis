// Password Protection - Client Version
const CORRECT_PASSWORD = 'spqr';

function checkPassword(password) {
    return password.toLowerCase() === CORRECT_PASSWORD.toLowerCase();
}

function login() {
    const password = document.getElementById('password-input').value;
    const errorMsg = document.getElementById('error-msg');

    if (checkPassword(password)) {
        // Store session
        sessionStorage.setItem('authenticated', 'true');
        showDashboard();
        return true;
    } else {
        errorMsg.textContent = 'Incorrect password. Please try again.';
        document.getElementById('password-input').value = '';
        return false;
    }
}

function logout() {
    sessionStorage.removeItem('authenticated');
    location.reload();
}

function showDashboard() {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('dashboard').style.display = 'flex';
    // Add authenticated class - CSS handles mobile header visibility
    document.body.classList.add('authenticated');
    // Always scroll to top
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    initializeCharts();
}

function checkAuth() {
    if (sessionStorage.getItem('authenticated') === 'true') {
        showDashboard();
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();

    // Login form handler
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            login();
        });
    }
});
