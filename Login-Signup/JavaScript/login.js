import { auth } from './firebase.js';
import {
  signInWithEmailAndPassword,
  signInAnonymously,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import database from './database.js';

// Form-/UI-Elemente
const form = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

const emailErr = document.getElementById('login-email-error');
const pwdErr = document.getElementById('login-password-error');
const generalErr = document.getElementById('login-general-error');
const guestBtn = document.querySelector('.btn-secondary');

// Utils
const setText = (el, txt) => { if (el) el.textContent = txt || ''; };
function clearErrors() {
  setText(emailErr, '');
  setText(pwdErr, '');
  setText(generalErr, '');
}
function showGeneralError(msg) {
  setText(generalErr, msg || 'Login fehlgeschlagen.');
}

// Validierungen
function validateEmailField() {
  const email = emailInput?.value?.trim() || '';
  if (!email) {
    setText(emailErr, 'Bitte gib deine Email ein.');
    return false;
  }
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) {
    setText(emailErr, 'Bitte gib eine gültige Email ein.');
    return false;
  }
  setText(emailErr, '');
  return true;
}
function validatePasswordField() {
  const pwd = passwordInput?.value || '';
  if (!pwd) {
    setText(pwdErr, 'Bitte gib dein Passwort ein.');
    return false;
  }
  setText(pwdErr, '');
  return true;
}
function formValid() {
  const v1 = validateEmailField();
  const v2 = validatePasswordField();
  return v1 && v2;
}

// Live-Validierungen
emailInput?.addEventListener('input', validateEmailField);
passwordInput?.addEventListener('input', validatePasswordField);

// Online/Offline-Anzeige über General-Error
function updateNetworkStatus() {
  if (!navigator.onLine) {
    showGeneralError('Keine Internetverbindung verfügbar.');
  } else if (generalErr?.textContent === 'Keine Internetverbindung verfügbar.') {
    setText(generalErr, '');
  }
}
window.addEventListener('online', updateNetworkStatus);
window.addEventListener('offline', updateNetworkStatus);
updateNetworkStatus();

/**
 * Ziel-URL bestimmen.
 * Default ist jetzt RELATIV nach oben: '../summary.html'
 * (weil dein Login unter /Login-Signup/ läuft und summary.html im Projekt-Root liegt)
 */
function getRedirectUrl(defaultTarget = '../summary.html') {
  try {
    const params = new URLSearchParams(window.location.search);
    let target = params.get('redirect') || defaultTarget;
    if (target.startsWith('/')) {
      return new URL(target, window.location.origin).href; // absolute Pfade
    }
    return new URL(target, window.location.href).href;      // relative Pfade
  } catch {
    return defaultTarget;
  }
}

// Submit
form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  clearErrors();

  if (!formValid()) return;
  if (!navigator.onLine) {
    showGeneralError('Keine Internetverbindung verfügbar.');
    return;
  }

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  try {
    await signInWithEmailAndPassword(auth, email, password);

    try { await database.getUser(email); } 
    catch (e) { console.warn('Konnte Benutzerprofil nicht laden:', e); }

    const target = getRedirectUrl('../summary.html');
    window.location.href = target;
  } catch (error) {
    console.error('Login error:', error, error.code, error.message);
    let msg = 'Email oder Passwort ist falsch.';
    switch (error.code) {
      case 'auth/too-many-requests': msg = 'Zu viele Versuche. Bitte später erneut versuchen.'; break;
      case 'auth/invalid-email': msg = 'Ungültige Email-Adresse.'; break;
      case 'auth/operation-not-allowed': msg = 'Email/Passwort-Anmeldung ist in Firebase nicht aktiviert.'; break;
      case 'auth/user-disabled': msg = 'Dieser Account ist deaktiviert.'; break;
      case 'auth/network-request-failed': msg = 'Netzwerkfehler. Bitte Verbindung prüfen.'; break;
      case 'auth/invalid-api-key': msg = 'API-Key ist ungültig. Bitte Firebase-Konfiguration prüfen.'; break;
      case 'auth/domain-not-allowed': msg = 'Domain nicht autorisiert. Füge deine Domain in Firebase Authentication hinzu.'; break;
      default:
        if (error.message) msg += ` (${error.message})`;
    }
    showGeneralError(`${msg}${error.code ? ` [${error.code}]` : ''}`);
  }
});

// Gast-Login
guestBtn?.addEventListener('click', async () => {
  clearErrors();

  if (!navigator.onLine) {
    showGeneralError('Keine Internetverbindung verfügbar.');
    return;
  }

  try {
    await signInAnonymously(auth);

    const target = getRedirectUrl('../summary.html');
    window.location.href = target;
  } catch (e) {
    console.error('Guest login error:', e, e.code, e.message);
    let msg = 'Gast-Login fehlgeschlagen.';
    if (e.code === 'auth/operation-not-allowed') {
      msg = 'Gast-Login ist in Firebase nicht aktiviert (Authentication → Sign-in method → Anonymous).';
    }
    showGeneralError(`${msg}${e.code ? ` [${e.code}]` : ''}`);
  }
});
