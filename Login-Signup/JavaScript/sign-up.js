import { auth } from './firebase.js';
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import database from './database.js';

// Form-/UI-Elemente
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

// Utils
const show = (el) => { if (el) el.style.display = 'block'; };
const hide = (el) => { if (el) el.style.display = 'none'; };

function showGeneralError(msg) {
  if (generalError) {
    generalError.textContent = msg || 'Es ist ein Fehler aufgetreten.';
    show(generalError);
  } else {
    alert(msg);
  }
}

function clearGeneralErrors() {
  hide(generalError);
  hide(networkError);
}

// Validierungen
function validateName() {
  const name = nameInput?.value?.trim() || '';
  // Voller Name: mind. zwei Wörter mit Leerzeichen
  const valid = name.split(' ').filter(Boolean).length >= 2;
  if (!valid) show(nameErr); else hide(nameErr);
  return valid;
}

function validateEmail() {
  const email = emailInput?.value?.trim() || '';
  let ok = true;

  if (!email) {
    show(emailErr);
    hide(emailFormatErr);
    ok = false;
  } else {
    hide(emailErr);
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const goodFormat = regex.test(email);
    if (!goodFormat) {
      show(emailFormatErr);
      ok = false;
    } else {
      hide(emailFormatErr);
    }
  }
  return ok;
}

function passwordStrengthOk(pwd) {
  // einfache Stärkeprüfung: mind. 6 Zeichen, Buchstaben + Zahlen
  const hasLetter = /[A-Za-z]/.test(pwd);
  const hasNumber = /\d/.test(pwd);
  return pwd.length >= 6 && hasLetter && hasNumber;
}

function validatePassword() {
  const pwd = passwordInput?.value || '';
  let ok = true;

  if (!pwd) {
    show(pwdErr);
    hide(pwdLenErr);
    hide(pwdWeakErr);
    ok = false;
  } else {
    hide(pwdErr);
    if (pwd.length < 6) {
      show(pwdLenErr);
      hide(pwdWeakErr);
      ok = false;
    } else {
      hide(pwdLenErr);
      if (!passwordStrengthOk(pwd)) {
        show(pwdWeakErr);
        ok = false;
      } else {
        hide(pwdWeakErr);
      }
    }
  }
  return ok;
}

function validateConfirm() {
  const pwd = passwordInput?.value || '';
  const conf = confirmInput?.value || '';
  let ok = true;

  if (!conf) {
    show(confirmErr);
    hide(pwdMatchErr);
    ok = false;
  } else {
    hide(confirmErr);
    if (pwd !== conf) {
      show(pwdMatchErr);
      ok = false;
    } else {
      hide(pwdMatchErr);
    }
  }
  return ok;
}

function validatePrivacy() {
  const ok = !!privacyCheckbox?.checked;
  if (!ok) show(privacyErr); else hide(privacyErr);
  return ok;
}

function formValid() {
  const v1 = validateName();
  const v2 = validateEmail();
  const v3 = validatePassword();
  const v4 = validateConfirm();
  const v5 = validatePrivacy();
  return v1 && v2 && v3 && v4 && v5;
}

function updateSubmitState() {
  if (!signupButton) return;
  // Button-Disable ist hier okay, da die Validierung synchron ist
  signupButton.disabled = !formValid();
}

// Live-Validierungen
nameInput?.addEventListener('input', () => { validateName(); updateSubmitState(); });
emailInput?.addEventListener('input', () => { validateEmail(); updateSubmitState(); });
passwordInput?.addEventListener('input', () => { validatePassword(); validateConfirm(); updateSubmitState(); });
confirmInput?.addEventListener('input', () => { validateConfirm(); updateSubmitState(); });
privacyCheckbox?.addEventListener('change', () => { validatePrivacy(); updateSubmitState(); });

// Netzwerk-Status
function updateNetworkStatus() {
  if (!navigator.onLine) show(networkError);
  else hide(networkError);
}
window.addEventListener('online', updateNetworkStatus);
window.addEventListener('offline', updateNetworkStatus);
updateNetworkStatus();

// Submit
form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  clearGeneralErrors();

  // Final prüfen, Button sperren
  const valid = formValid();
  updateSubmitState();
  if (!valid) return;

  if (!navigator.onLine) {
    show(networkError);
    return;
  }

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  try {
    // Auth-User erstellen
    const cred = await createUserWithEmailAndPassword(auth, email, password);

    // Anzeigename setzen (optional)
    try {
      await updateProfile(cred.user, { displayName: name });
    } catch (e) {
      console.warn('Konnte Profil nicht aktualisieren:', e);
    }

    // Benutzer-Dokument in Firestore + lokal in IndexedDB ablegen
    await database.addUser({ email, name });

    // Erfolgsmeldung
    if (successMessage) show(successMessage);

    // Redirect (zur Login-Seite)
    setTimeout(() => {
      window.location.href = 'Index.html';
    }, 1200);
  } catch (error) {
    console.error('Signup error:', error, error.code, error.message);
    let msg = 'Registrierung fehlgeschlagen.';
    switch (error.code) {
      case 'auth/email-already-in-use': msg = 'Diese Email wird bereits verwendet.'; break;
      case 'auth/invalid-email': msg = 'Ungültige Email-Adresse.'; break;
      case 'auth/weak-password': msg = 'Passwort ist zu schwach (mind. 6 Zeichen, Buchstaben und Zahlen).'; break;
      case 'auth/operation-not-allowed': msg = 'Email/Passwort-Anmeldung ist in Firebase nicht aktiviert.'; break;
      case 'auth/network-request-failed': msg = 'Netzwerkfehler. Bitte Verbindung prüfen.'; break;
      case 'auth/invalid-api-key': msg = 'API-Key ist ungültig. Bitte Firebase-Konfiguration prüfen.'; break;
      case 'auth/domain-not-allowed': msg = 'Domain nicht autorisiert. Füge deine Domain in Firebase Authentication hinzu.'; break;
      default:
        if (error.message) msg += ` (${error.message})`;
    }
    showGeneralError(`${msg}${error.code ? ` [${error.code}]` : ''}`);
  } finally {
    updateSubmitState();
  }
});

// Initial Button-State
updateSubmitState();