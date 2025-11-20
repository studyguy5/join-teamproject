/**
 * Stellt Login-Logik, Validierungen und UI-Hilfsfunktionen bereit.
 * @module login
 */

import { auth } from './firebase.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import database from './database.js';

/** @type {HTMLFormElement|null} */
const form = document.getElementById('loginForm');
/** @type {HTMLInputElement|null} */
const emailInput = document.getElementById('email');
/** @type {HTMLInputElement|null} */
const passwordInput = document.getElementById('password');
/** @type {HTMLElement|null} */
const emailError = document.getElementById('login-email-error');
/** @type {HTMLElement|null} */
const passwordError = document.getElementById('login-password-error');
/** @type {HTMLElement|null} */
const generalError = document.getElementById('login-general-error');
/** @type {HTMLElement|null} */
const guestBtn = document.querySelector('.btn-secondary');

/**
 * Setzt den Text eines HTML-Elements.
 * @param {HTMLElement} element
 * @param {string} text
 */
function setText(element, text) {
  if (element) element.textContent = text || '';
}

/**
 * Zeigt ein Element mit Text an.
 * @param {HTMLElement} element
 * @param {string} text
 */
function showElement(element, text) {
  if (!element) return;
  element.classList.add('is-visible');
  setText(element, text);
  element.style.display = 'block';
  element.removeAttribute('hidden');
  if (element === generalError) element.classList.add('error-message-login');
}

/**
 * Blendet ein HTML-Element aus.
 * @param {HTMLElement} element
 */
function hideElement(element) {
  if (!element) return;
  element.classList.remove('is-visible');
  element.style.display = 'none';
  element.setAttribute('hidden', '');
}

/**
 * Markiert ein Eingabefeld als Fehler/valide.
 * @param {HTMLInputElement} input
 * @param {boolean} hasError
 */
function setFieldError(input, hasError) {
  if (!input) return;
  input.classList.toggle('error', !!hasError);
  input.classList.toggle('valid', !hasError && !!input.value);
  input.setAttribute('aria-invalid', hasError ? 'true' : 'false');
}

/**
 * Blendet alle Fehlermeldungen aus und setzt Felder zurück.
 */
function clearFormErrors() {
  hideElement(emailError);
  hideElement(passwordError);
  hideElement(generalError);
  setFieldError(emailInput, false);
  setFieldError(passwordInput, false);
}

/**
 * Zeigt eine allgemeine Fehlermeldung an.
 * @param {string} message
 */
function showGeneralErrorMessage(message) {
  showElement(generalError, message || 'Login fehlgeschlagen.');
}

/**
 * Validiert das E-Mail-Eingabefeld.
 * @returns {boolean}
 */
function validateEmailInput() {
  const email = emailInput?.value?.trim() || '';
  if (!email) {
    showElement(emailError, 'Bitte gib deine Email ein.');
    setFieldError(emailInput, true);
    return false;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showElement(emailError, 'Bitte gib eine gültige Email ein.');
    setFieldError(emailInput, true);
    return false;
  }
  hideElement(emailError);
  setFieldError(emailInput, false);
  return true;
}

/**
 * Validiert das Passwortfeld.
 * @returns {boolean}
 */
function validatePasswordInput() {
  const password = passwordInput?.value || '';
  if (!password) {
    showElement(passwordError, 'Bitte gib dein Passwort ein.');
    setFieldError(passwordInput, true);
    return false;
  }
  hideElement(passwordError);
  setFieldError(passwordInput, false);
  return true;
}

/**
 * Prüft, ob das Formular vollständig und valide ist.
 * @returns {boolean}
 */
function isFormValid() {
  return validateEmailInput() && validatePasswordInput();
}

/**
 * Aktualisiert die UI für den Netzwerkstatus.
 */
function updateNetworkUi() {
  if (navigator.onLine) {
    if (generalError && generalError.textContent === 'Keine Internetverbindung verfügbar.') {
      hideElement(generalError);
    }
  }
}

/**
 * Liefert die Ziel-URL für die Weiterleitung.
 * @param {string} [defaultTarget]
 * @returns {string}
 */
function getRedirectUrl(defaultTarget = '../summary/summary.html') {
  try {
    const params = new URLSearchParams(window.location.search);
    let target = params.get('redirect') || defaultTarget;
    if (target.startsWith('/')) return new URL(target, window.location.origin).href;
    return new URL(target, window.location.href).href;
  } catch {
    return defaultTarget;
  }
}

/**
 * Speichert den Namen für die Summary-Anzeige.
 * @param {string} nameLike
 */
function storeSummaryName(nameLike) {
  const cleaned = (nameLike || '').toString().trim();
  if (cleaned) localStorage.setItem('userFullName', cleaned);
}

// EVENTS

emailInput?.addEventListener('input', () => {
  hideElement(emailError);
  setFieldError(emailInput, false);
  hideElement(generalError);
});

emailInput?.addEventListener('blur', () => {
  validateEmailInput();
});

passwordInput?.addEventListener('focus', () => {
  validateEmailInput();
});

passwordInput?.addEventListener('input', () => {
  validatePasswordInput();
  hideElement(generalError);
});

window.addEventListener('online', updateNetworkUi);

window.addEventListener('offline', updateNetworkUi);

updateNetworkUi();

form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  clearFormErrors();
  if (!isFormValid()) return;
  if (!navigator.onLine) return;

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  try {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    let fullName = cred.user?.displayName || '';
    try {
      const profile = await database.getUser(email);
      if (profile?.name) fullName = profile.name;
    } catch {}
    if (!fullName) fullName = email.split('@')[0];
    storeSummaryName(fullName);

    hideElement(generalError);
    setFieldError(emailInput, false);
    setFieldError(passwordInput, false);

    const redirectUrl = getRedirectUrl('../summary/summary.html');
    window.location.href = redirectUrl;

  } catch (error) {
    let msg = 'Email oder Passwort ist falsch.';

    if (error.code === 'auth/too-many-requests') {
        msg = 'Zu viele Versuche. Bitte später erneut versuchen.';
    }
    if (error.code === 'auth/invalid-email') {
        msg = 'Ungültige Email-Adresse.';
    }

    showGeneralErrorMessage(msg);
    setFieldError(emailInput, true);
    setFieldError(passwordInput, true);
  }
});

guestBtn?.addEventListener('click', () => {
  clearFormErrors();
  if (!navigator.onLine) return;
  sessionStorage.setItem('guest', 'true');
  localStorage.setItem('userFullName', 'Guest User');
  const url = getRedirectUrl('../summary/summary.html');
  window.location.href = url;
});