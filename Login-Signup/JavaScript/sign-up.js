/* @ts-nocheck */
/* eslint-disable no-unused-vars */

import { auth } from './firebase.js';
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import database from './database.js';

/* ========= DOM ========= */
const form = document.getElementById('signupForm');
const signupButton = document.getElementById('signupButton');

const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmInput = document.getElementById('confirmPassword');
const privacyCheckbox = document.getElementById('privacy-policy');

const nameErr = document.getElementById('name-error');
const emailErr = document.getElementById('email-error');
const emailFormatErr = document.getElementById('email-format-error');
const pwdErr = document.getElementById('password-error');
const pwdLenErr = document.getElementById('password-length-error');
const pwdWeakErr = document.getElementById('password-weak-error');
const confirmErr = document.getElementById('confirm-password-error');
const pwdMatchErr = document.getElementById('password-match-error');
const privacyErr = document.getElementById('privacy-error');

const generalError = document.getElementById('general-error');
const networkError = document.getElementById('network-error');
const successMessage = document.getElementById('success-message');

/* ========= Helpers ========= */
const show = (el) => {
  if (!el) return;
  el.classList.add('is-visible');
  el.style.display = 'block';
  el.removeAttribute('hidden');
  requestAnimationFrame(() => { el.style.opacity = '1'; });
};
const hide = (el) => {
  if (!el) return;
  el.classList.remove('is-visible');
  el.style.opacity = '0';
  setTimeout(() => { el.style.display = 'none'; el.setAttribute('hidden', ''); }, 200);
};

function markFieldError(input, isError) {
  if (!input) return;
  input.classList.toggle('error', !!isError);
  input.setAttribute('aria-invalid', isError ? 'true' : 'false');
}

function showGeneralError(msg) {
  if (generalError) { generalError.textContent = msg || 'Es ist ein Fehler aufgetreten.'; show(generalError); }
}

function clearGeneralErrors() { hide(generalError); hide(networkError); }

/* ========= Pure checks ========= */
const isNameValid = (v) => (v?.trim()?.length ?? 0) >= 1;
const isEmailProvided = (v) => (v?.trim()?.length ?? 0) > 0;
const isEmailFormatOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v?.trim() || '');
const hasMinLen = (v, n=6) => (v?.length ?? 0) >= n;
const hasLetters = (v) => /[A-Za-z]/.test(v || '');
const hasNumbers = (v) => /\d/.test(v || '');
const isPwdStrong = (v) => hasMinLen(v, 6) && hasLetters(v) && hasNumbers(v);
const isConfirmProvided = (v) => (v?.length ?? 0) > 0;

/* ========= Validierungen ========= */
function validateName() {
  const val = nameInput.value || '';
  const ok = isNameValid(val);
  ok ? hide(nameErr) : show(nameErr);
  markFieldError(nameInput, !ok);
  return ok;
}
function validateEmail() {
  const val = emailInput.value || '';
  let ok = true;
  if (!isEmailProvided(val)) { show(emailErr); hide(emailFormatErr); ok = false; }
  else if (!isEmailFormatOk(val)) { hide(emailErr); show(emailFormatErr); ok = false; }
  else { hide(emailErr); hide(emailFormatErr); }
  markFieldError(emailInput, !ok); return ok;
}
function validatePassword() {
  const val = passwordInput.value || '';
  let ok = true;
  if (!val) { show(pwdErr); hide(pwdLenErr); hide(pwdWeakErr); ok = false; }
  else if (!hasMinLen(val, 6)) { hide(pwdErr); show(pwdLenErr); hide(pwdWeakErr); ok = false; }
  else if (!isPwdStrong(val)) { hide(pwdErr); hide(pwdLenErr); show(pwdWeakErr); ok = false; }
  else { hide(pwdErr); hide(pwdLenErr); hide(pwdWeakErr); }
  markFieldError(passwordInput, !ok); return ok;
}
function validateConfirm() {
  const pwd = passwordInput.value || '';
  const conf = confirmInput.value || '';
  let ok = true;
  if (!isConfirmProvided(conf)) { show(confirmErr); hide(pwdMatchErr); ok = false; }
  else if (pwd !== conf) { hide(confirmErr); show(pwdMatchErr); ok = false; }
  else { hide(confirmErr); hide(pwdMatchErr); }
  markFieldError(confirmInput, !ok); return ok;
}
function validatePrivacy() {
  const ok = !!privacyCheckbox.checked;
  ok ? hide(privacyErr) : show(privacyErr);
  return ok;
}

/* ========= Step-Access (silent) ========= */
function updateStepAccessSilent() {
  const nameOK = isNameValid(nameInput.value);
  emailInput.disabled = !nameOK;

  const emailOK = nameOK && isEmailProvided(emailInput.value) && isEmailFormatOk(emailInput.value);
  passwordInput.disabled = !emailOK;

  const pwdOK = emailOK && isPwdStrong(passwordInput.value);
  confirmInput.disabled = !pwdOK;

  const confirmOK = pwdOK && isConfirmProvided(confirmInput.value) && (passwordInput.value === confirmInput.value);
  const allInputsOK = nameOK && emailOK && pwdOK && confirmOK;
  signupButton.disabled = !(allInputsOK && privacyCheckbox.checked);
}

/* ========= Events ========= */
nameInput?.addEventListener('input', () => { hide(nameErr); markFieldError(nameInput, false); updateStepAccessSilent(); });
emailInput?.addEventListener('input', () => { hide(emailErr); hide(emailFormatErr); markFieldError(emailInput, false); updateStepAccessSilent(); });
passwordInput?.addEventListener('input', () => { hide(pwdErr); hide(pwdLenErr); hide(pwdWeakErr); markFieldError(passwordInput, false); updateStepAccessSilent(); });
confirmInput?.addEventListener('input', () => { hide(confirmErr); hide(pwdMatchErr); markFieldError(confirmInput, false); updateStepAccessSilent(); });

nameInput?.addEventListener('blur', () => { validateName(); updateStepAccessSilent(); });
emailInput?.addEventListener('blur', () => { validateEmail(); updateStepAccessSilent(); });
passwordInput?.addEventListener('blur', () => { validatePassword(); updateStepAccessSilent(); });
confirmInput?.addEventListener('blur', () => { validateConfirm(); updateStepAccessSilent(); });
privacyCheckbox?.addEventListener('change', () => { validatePrivacy(); updateStepAccessSilent(); });

function updateNetworkStatus() { if (!navigator.onLine) show(networkError); else hide(networkError); }
window.addEventListener('online', updateNetworkStatus);
window.addEventListener('offline', updateNetworkStatus);
updateNetworkStatus();

/* Initial */
emailInput.disabled = true;
passwordInput.disabled = true;
confirmInput.disabled = true;
signupButton.disabled = true;
updateStepAccessSilent();

/* ========= Submit ========= */
form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  clearGeneralErrors();

  const checks = [
    () => [validateName(), nameInput],
    () => [validateEmail(), emailInput],
    () => [validatePassword(), passwordInput],
    () => [validateConfirm(), confirmInput],
    () => [validatePrivacy(), privacyCheckbox],
  ];
  for (const fn of checks) {
    const [ok, el] = fn();
    if (!ok) { el?.focus?.({ preventScroll: true }); el?.scrollIntoView?.({ behavior: 'smooth', block: 'center' }); updateStepAccessSilent(); return; }
  }
  if (!navigator.onLine) { show(networkError); return; }

  signupButton.disabled = true;

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    try { await updateProfile(cred.user, { displayName: name }); } catch {}

    await database.addUser({ email, name });

    // Name für Summary speichern
    localStorage.setItem('userFullName', name);

    // Erfolgsbanner sichtbar machen und kurze Pause vor Redirect
    show(successMessage);
    setTimeout(() => { window.location.href = 'Index.html'; }, 1800);
  } catch (error) {
    let msg = 'Registrierung fehlgeschlagen.';
    switch (error.code) {
      case 'auth/email-already-in-use': msg = 'Diese Email wird bereits verwendet.'; break;
      case 'auth/invalid-email': msg = 'Ungültige Email-Adresse.'; break;
      case 'auth/weak-password': msg = 'Passwort ist zu schwach (mind. 6 Zeichen, Buchstaben und Zahlen).'; break;
      default: if (error.message) msg += ` (${error.message})`;
    }
    showGeneralError(`${msg}${error.code ? ` [${error.code}]` : ''}`);
  } finally {
    updateStepAccessSilent();
  }
});
