import { auth } from './firebase.js';
import { createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import database from './database.js';


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


// ========== Helpers ==========

function showElement(element) {
  if (!element) return;
  element.classList.add('is-visible');
  element.style.display = 'block';
  element.removeAttribute('hidden');
  requestAnimationFrame(() => { element.style.opacity = '1'; });
}


function hideElement(element) {
  if (!element) return;
  element.classList.remove('is-visible');
  element.style.opacity = '0';
  setTimeout(() => {
    element.style.display = 'none';
    element.setAttribute('hidden', '');
  }, 200);
}


function setFieldError(input, isError) {
  if (!input) return;
  input.classList.toggle('error', !!isError);
  input.classList.toggle('valid', !isError && !!input.value);
  input.setAttribute('aria-invalid', isError ? 'true' : 'false');
}


function showGeneralError(msg) {
  if (generalError) {
    generalError.textContent = msg || 'Es ist ein Fehler aufgetreten.';
    showElement(generalError);
  }
}


function clearGeneralErrors() {
  hideElement(generalError);
  hideElement(networkError);
}


// ========== Pure Checks ==========

function isNameValid(val) {
  return (val?.trim()?.length ?? 0) >= 1;
}


function isEmailProvided(val) {
  return (val?.trim()?.length ?? 0) > 0;
}


function isEmailFormatOk(val) {
  return /^[^\s@]+@[^\s@]+$/.test(val?.trim() || '');
}


function hasMinLen(val, min = 6) {
  return (val?.length ?? 0) >= min;
}


function hasLetters(val) {
  return /[A-Za-z]/.test(val || '');
}


function hasNumbers(val) {
  return /\d/.test(val || '');
}


function isPasswordStrong(val) {
  return hasMinLen(val, 6) && hasLetters(val) && hasNumbers(val);
}


function isConfirmProvided(val) {
  return (val?.length ?? 0) > 0;
}


// ========== Validations ==========

function validateName() {
  const val = nameInput.value || '';
  const ok = isNameValid(val);
  ok ? hideElement(nameErr) : showElement(nameErr);
  setFieldError(nameInput, !ok);
  return ok;
}


function validateEmail() {
  const val = emailInput.value || '';
  let ok = true;
  if (!isEmailProvided(val)) {
    showElement(emailErr);
    hideElement(emailFormatErr);
    ok = false;
  } else if (!isEmailFormatOk(val)) {
    hideElement(emailErr);
    showElement(emailFormatErr);
    ok = false;
  } else {
    hideElement(emailErr);
    hideElement(emailFormatErr);
  }
  setFieldError(emailInput, !ok);
  return ok;
}


function validatePassword() {
  const val = passwordInput.value || '';
  let ok = true;
  if (!val) {
    showElement(pwdErr);
    hideElement(pwdLenErr);
    hideElement(pwdWeakErr);
    ok = false;
  } else if (!hasMinLen(val, 6)) {
    hideElement(pwdErr);
    showElement(pwdLenErr);
    hideElement(pwdWeakErr);
    ok = false;
  } else if (!isPasswordStrong(val)) {
    hideElement(pwdErr);
    hideElement(pwdLenErr);
    showElement(pwdWeakErr);
    ok = false;
  } else {
    hideElement(pwdErr);
    hideElement(pwdLenErr);
    hideElement(pwdWeakErr);
  }
  setFieldError(passwordInput, !ok);
  return ok;
}


function validateConfirm() {
  const pwd = passwordInput.value || '';
  const conf = confirmInput.value || '';
  let ok = true;
  if (!isConfirmProvided(conf)) {
    showElement(confirmErr);
    hideElement(pwdMatchErr);
    ok = false;
  } else if (pwd !== conf) {
    hideElement(confirmErr);
    showElement(pwdMatchErr);
    ok = false;
  } else {
    hideElement(confirmErr);
    hideElement(pwdMatchErr);
  }
  setFieldError(confirmInput, !ok);
  return ok;
}


function validatePrivacy() {
  const ok = !!privacyCheckbox.checked;
  ok ? hideElement(privacyErr) : showElement(privacyErr);
  return ok;
}


// ========== Step Access (Silent) ==========

function updateStepAccessSilent() {
  const nameValid = isNameValid(nameInput.value);
  emailInput.disabled = !nameValid;

  const emailValid = nameValid && isEmailProvided(emailInput.value) && isEmailFormatOk(emailInput.value);
  passwordInput.disabled = !emailValid;

  const pwdValid = emailValid && isPasswordStrong(passwordInput.value);
  confirmInput.disabled = !pwdValid;

  const confirmValid = pwdValid && isConfirmProvided(confirmInput.value) && (passwordInput.value === confirmInput.value);
  const allInputsValid = nameValid && emailValid && pwdValid && confirmValid;
  signupButton.disabled = !(allInputsValid && privacyCheckbox.checked);
}


// ========== Events ==========

nameInput?.addEventListener('input', () => {
  hideElement(nameErr);
  setFieldError(nameInput, false);
  updateStepAccessSilent();
});


emailInput?.addEventListener('input', () => {
  hideElement(emailErr);
  hideElement(emailFormatErr);
  setFieldError(emailInput, false);
  updateStepAccessSilent();
});


passwordInput?.addEventListener('input', () => {
  hideElement(pwdErr);
  hideElement(pwdLenErr);
  hideElement(pwdWeakErr);
  setFieldError(passwordInput, false);
  updateStepAccessSilent();
});


confirmInput?.addEventListener('input', () => {
  hideElement(confirmErr);
  hideElement(pwdMatchErr);
  setFieldError(confirmInput, false);
  updateStepAccessSilent();
});


nameInput?.addEventListener('blur', () => {
  validateName();
  updateStepAccessSilent();
});


emailInput?.addEventListener('blur', () => {
  validateEmail();
  updateStepAccessSilent();
});


passwordInput?.addEventListener('blur', () => {
  validatePassword();
  updateStepAccessSilent();
});


confirmInput?.addEventListener('blur', () => {
  validateConfirm();
  updateStepAccessSilent();
});


privacyCheckbox?.addEventListener('change', () => {
  validatePrivacy();
  updateStepAccessSilent();
});


// ========== Network Status ==========

function updateNetworkStatus() {
  if (!navigator.onLine) {
    showElement(networkError);
  } else {
    hideElement(networkError);
  }
}

window.addEventListener('online', updateNetworkStatus);

window.addEventListener('offline', updateNetworkStatus);

updateNetworkStatus();


// ========== Initial Button States ==========

emailInput.disabled = true;
passwordInput.disabled = true;
confirmInput.disabled = true;
signupButton.disabled = true;
updateStepAccessSilent();


// ========== Submit Handler ==========

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
    if (!ok) {
      el?.focus?.({ preventScroll: true });
      el?.scrollIntoView?.({ behavior: 'smooth', block: 'center' });
      updateStepAccessSilent();
      return;
    }
  }

  if (!navigator.onLine) {
    showElement(networkError);
    return;
  }

  signupButton.disabled = true;
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    try { await updateProfile(cred.user, { displayName: name }); } catch { }
    await database.addUser({ email, name });
    localStorage.setItem('userFullName', name);
    showElement(successMessage);
    setTimeout(() => { window.location.href = 'Index.html'; }, 1800);
  } catch (error) {
    let msg = 'Registrierung fehlgeschlagen.';
    if (error.code === 'auth/email-already-in-use') msg = 'Diese Email wird bereits verwendet.';
    else if (error.code === 'auth/invalid-email') msg = 'Ungültige Email-Adresse.';
    else if (error.code === 'auth/weak-password') msg = 'Passwort ist zu schwach (mind. 6 Zeichen, Buchstaben und Zahlen).';
    else if (error.message) msg += ` (${error.message})`;
    showGeneralError(`${msg}${error.code ? ` [${error.code}]` : ''}`);
  } finally {
    updateStepAccessSilent();
  }
});