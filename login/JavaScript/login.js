function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        
        
        if (elementId === 'login-email-error') {
            document.getElementById('email').style.border = '1px solid #ff0000';
        } else if (elementId === 'login-password-error') {
            document.getElementById('password').style.border = '1px solid #ff0000';
        }
    }
}

function hideError(elementId) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
}

function validateInputs(email, password) {
    if (!email || !password) return 'Please enter your email and password.';
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) return 'email';
    if (password.length < 6) return 'password';
    return '';
}

function setLoginButtonState(loading) {
    const loginButton = document.querySelector('.btn-primary');
    if (loginButton) {
        loginButton.disabled = loading;
        loginButton.textContent = loading ? 'Logging in...' : 'Log in';
    }
}

function handleLogin(event) {
    event.preventDefault();
    resetLoginErrors();

    let email = document.getElementById('email').value.trim().toLowerCase();
    let password = document.getElementById('password').value;

    let validation = validateInputs(email, password);
    if (handleValidationErrors(validation)) return;

    await attemptLogin(email, password);
}

function resetLoginErrors() {
    hideError('login-email-error');
    hideError('login-password-error');
    hideError('login-general-error');
}

function handleValidationErrors(validation) {
    if (validation === 'email') {
        showError('login-email-error', 'Please enter a valid email address.');
        return true;
    }
    if (validation === 'password') {
        showError('login-password-error', 'The password must be at least 6 characters long.');
        return true;
    }
    if (validation) {
        showError('login-general-error', validation);
        return true;
    }
    return false;
}

function handleGuestLogin() {
    localStorage.setItem('currentUser', JSON.stringify({ isGuest: true, name: 'Guest User' }));

    sessionStorage.setItem('newLogin', 'true');
    
    window.location.href = 'summary.html';
}

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const loginButton = document.querySelector('.btn-primary');
    const guestLoginButton = document.querySelector('.btn-secondary');

    document.getElementById('email').addEventListener('input', function() {
        document.getElementById('login-email-error').style.display = 'none';
        this.style.border = '1px solid #D1D1D1';
    });

    document.getElementById('password').addEventListener('input', function() {
        document.getElementById('login-password-error').style.display = 'none';
        this.style.border = '1px solid #D1D1D1';
    });

    if (loginForm) loginForm.addEventListener('submit', handleLogin);
    if (loginButton) loginButton.addEventListener('click', handleLogin);
    if (guestLoginButton) guestLoginButton.addEventListener('click', handleGuestLogin);
});