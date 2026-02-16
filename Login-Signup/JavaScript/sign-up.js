/**
 * Registrierungs-Formular für neuen Benutzer, mit Validierung und UI-Fehleranzeige.
 * Erstellt anschließend einen neuen Benutzer über Firebase und speichert die Daten lokal.
 * 
 * @module sign-up
 */

import { auth } from './firebase.js';
import { createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import database from './database.js';

// export {auth, database};
// export { showGeneralError, clearGeneralErrors };

/** @type {HTMLFormElement|null} */
const form = document.getElementById('signupForm');
/** @type {HTMLButtonElement|null} */
const signupButton = document.getElementById('signupButton');
/** @type {HTMLInputElement|null} */
const nameInput = document.getElementById('name');
/** @type {HTMLInputElement|null} */
const emailInput = document.getElementById('email');
/** @type {HTMLInputElement|null} */
const passwordInput = document.getElementById('password');
/** @type {HTMLInputElement|null} */
const confirmInput = document.getElementById('confirmPassword');
/** @type {HTMLInputElement|null} */
const privacyCheckbox = document.getElementById('privacy-policy');
/** @type {HTMLElement|null} */
const nameErr = document.getElementById('name-error');
/** @type {HTMLElement|null} */
const emailErr = document.getElementById('email-error');
/** @type {HTMLElement|null} */
const emailFormatErr = document.getElementById('email-format-error');
/** @type {HTMLElement|null} */
const pwdErr = document.getElementById('password-error');
/** @type {HTMLElement|null} */
const pwdLenErr = document.getElementById('password-length-error');
/** @type {HTMLElement|null} */
const pwdWeakErr = document.getElementById('password-weak-error');
/** @type {HTMLElement|null} */
const confirmErr = document.getElementById('confirm-password-error');
/** @type {HTMLElement|null} */
const pwdMatchErr = document.getElementById('password-match-error');
/** @type {HTMLElement|null} */
const privacyErr = document.getElementById('privacy-error');
/** @type {HTMLElement|null} */
const generalError = document.getElementById('general-error');
/** @type {HTMLElement|null} */
const networkError = document.getElementById('network-error');
/** @type {HTMLElement|null} */
const successMessage = document.getElementById('success-message');


// let form = document.getElementById('signupForm');

//**
// Submit handler validiert die Eingaben im Inputfeld und setzt einen Focus und scrollt an den Eingabeort
//  */ ========== Submit Handler ==========
/**this here sets up a pre defined setting for the sign Up Mask in order to create a good UX */
form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  clearGeneralErrors();
  validateSignUpData();
  behaviourIfError();
  if (!navigator.onLine) {
    showElement(networkError);
    return;}
  disableSignUpButton();
//**
// hier ein try/catch für die SingUp Datenverarbeitung - Daten sind Validiert, werden in firebase angelegt und es wird ein User angelegt
// sollte das nicht funktioneren, fängt das Catch diesen Fehler ab und zeigt dann das Userfeedback, dass die Registrierung
// fehlgeschlagen ist - weiters wird genau angezeigt, ob Daten bereits in Verwendung sind oder was das Problem ist */
  try {createUserWithGivenData();
  } catch (error) {
    catchErrorfromSignIn(error)
  } finally {
    updateStepAccessSilent();}
});






/**validates all fields from the sign Up Mask */
function validateSignUpData(){
  const checks = [
    () => [validateName(), nameInput],
    () => [validateEmail(), emailInput],
    () => [validatePassword(), passwordInput],
    () => [validateConfirm(), confirmInput],
    () => [validatePrivacy(), privacyCheckbox],
  ];
  return checks;
}
let checks = validateSignUpData();

/**handels the behaviour if any Error occurs */
function behaviourIfError(){
  for (const fn of checks) {
    const [ok, el] = fn();
    if (!ok) {
      el?.focus?.({ preventScroll: true });
      el?.scrollIntoView?.({ behavior: 'smooth', block: 'center' });
      updateStepAccessSilent();
      return;
    }
  }
}

/**disables the sign Up button if needed */
function disableSignUpButton(){
  signupButton.disabled = true;
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  return {name, email, password};
}

/**here we create a new User with the data filled in from the Sign Up Mask */
async function createUserWithGivenData(){
  // const email = emailInput.value; //übernommen aus dem Feedback
  // const password = passwordInput.value; //übernommen aus dem Feedback
  const cred = await createUserWithEmailAndPassword(auth, email, password);
    try { await updateProfile(cred.user, { displayName: name }); } catch { }
    await database.addUser({ email, name });
    localStorage.setItem('userFullName', name);
    showElement(successMessage);
    setTimeout(() => { window.location.href = 'index.html'; }, 1800);
}

/**we also have to catch any Errors during the SignIN process */
function catchErrorfromSignIn(error){
  let msg = 'Registrierung fehlgeschlagen.';
    if (error.code === 'auth/email-already-in-use') msg = 'Diese Email wird bereits verwendet.';
    else if (error.code === 'auth/invalid-email') msg = 'Ungültige Email-Adresse.';
    else if (error.code === 'auth/weak-password') msg = 'Passwort ist zu schwach (mind. 6 Zeichen, Buchstaben und Zahlen).';
    else if (error.message) msg += ` (${error.message})`;
    showGeneralError(`${msg}${error.code ? ` [${error.code}]` : ''}`);
}

// ========== Helpers ==========

/**
 * Zeigt ein Element an (macht sichtbar, entfernt hidden und setzt opacity).
 * @param {HTMLElement} element
 */
function showElement(element) {
  if (!element) return;
  element.classList.add('is-visible');
  element.style.display = 'block';
  element.removeAttribute('hidden');
  requestAnimationFrame(() => { element.style.opacity = '1'; });
}

/**
 * Blendet ein Element aus und setzt opacity zurück.
 * @param {HTMLElement} element
 */
function hideElement(element) {
  if (!element) return;
  element.classList.remove('is-visible');
  element.style.opacity = '0';
  setTimeout(() => {
    element.style.display = 'none';
    element.setAttribute('hidden', '');
  }, 200);
}


/**
 * Markiert ein Eingabefeld als Fehler/valide, setzt aria-invalid entsprechend.
 * @param {HTMLInputElement} input
 * @param {boolean} isError
*/
function setFieldError(input, isError) {
  if (!input) return;
  input.classList.toggle('error', !!isError);
  input.classList.toggle('valid', !isError && !!input.value);
  input.setAttribute('aria-invalid', isError ? 'true' : 'false');
}

/**
 * Zeigt eine allgemeine Fehlermeldung an.
 * @param {string} msg
*/
function showGeneralError(msg) {
  if (generalError) {
    generalError.textContent = msg || 'Es ist ein Fehler aufgetreten.';
    showElement(generalError);
  }
}

/**
 * Blendet alle generellen Fehlermeldungen aus.
*/
function clearGeneralErrors() {
  hideElement(generalError);
  hideElement(networkError);
}


// ========== Pure Checks ==========

/**
 * Prüfung ob Name gültig ist (nicht leer).
 * @param {string} val
 * @returns {boolean}
*/
function isNameValid(val) {
  return (val?.trim()?.length ?? 0) >= 5;
}

/**
 * Prüfung ob Email angegeben ist.
 * @param {string} val
 * @returns {boolean}
*/
function isEmailProvided(val) {
  return (val?.trim()?.length ?? 0) > 10;
}

/**
 * Prüfung ob Email-Format gültig ist.
 * @param {string} val
 * @returns {boolean}
*/
function isEmailFormatOk(val) {
  return /^[^\s@]+@[^\s@]+$/.test(val?.trim() || '');
}

/**
 * Mindestlänge eines Strings prüfen.
 * @param {string} val
 * @param {number} [min=6]
 * @returns {boolean}
*/
function hasMinLen(val, min = 6) {
  return (val?.length ?? 0) >= min;
}

/**
 * Prüft, ob Zeichen im Passwort enthalten sind.
 * @param {string} val
 * @returns {boolean}
*/
function hasLetters(val) {
  return /[A-Za-z]/.test(val || '');
}

/**
 * Prüft, ob Zahlen im Passwort enthalten sind.
 * @param {string} val
 * @returns {boolean}
*/
function hasNumbers(val) {
  return /\d/.test(val || '');
}

/**
 * Prüft, ob das Passwort stark genug ist.
 * @param {string} val
 * @returns {boolean}
 */
function isPasswordStrong(val) {
  return hasMinLen(val, 6) && hasLetters(val) && hasNumbers(val);
}

/**
 * Bestätigungsfeld muss ausgefüllt sein.
 * @param {string} val
 * @returns {boolean}
*/
function isConfirmProvided(val) {
  return (val?.length ?? 0) > 0;
}

// ========== Validations ==========

/**
 * Validiert das Name-Feld und zeigt ggf. Fehlermeldung.
 * @returns {boolean}
*/
function validateName() {
  const val = nameInput.value || '';
  const ok = isNameValid(val);
  ok ? hideElement(nameErr) : showElement(nameErr);
  setFieldError(nameInput, !ok);
  return ok;
}

/**
 * Validiert das Email-Feld und zeigt ggf. Fehlermeldung/Format-Fehler.
 * @returns {boolean}
*/
function validateEmail() {
  const val = emailInput.value || '';
  let ok = true;
  if (!isEmailProvided(val)) {
    showElement(emailErr);
    hideElement(emailFormatErr);
    ok = false;
  } else if (!isEmailFormatOk(val)) {hideElement(emailErr); showElement(emailFormatErr);
    ok = false;} 
    else {hideElement(emailErr); hideElement(emailFormatErr);}
  setFieldError(emailInput, !ok);
  return ok;
}

/**
 * Validiert das Passwortfeld und zeigt ggf. Fehlermeldungen zu Länge/Stärke.
 * @returns {boolean}
*/
function validatePassword() {
  const val = passwordInput.value || '';
  let ok = true;
  if (!val) {
    validationFunctionSet1();
    ok = false;
  } else if (!hasMinLen(val, 6)) {
    validationFunctionSet2();
    ok = false;
  } else if (!isPasswordStrong(val)) {
    validationFunctionSet3();
    ok = false;
  } else {
    validationFunctionSet4();}
  setFieldError(passwordInput, !ok);
  return ok;}


//**Hilfsfunktion für die Validation */
function validationFunctionSet1(){
    showElement(pwdErr);
    hideElement(pwdLenErr);
    hideElement(pwdWeakErr);
}

function validationFunctionSet2(){
    hideElement(pwdErr);
    showElement(pwdLenErr);
    hideElement(pwdWeakErr);
}

function validationFunctionSet3(){
    hideElement(pwdErr);
    hideElement(pwdLenErr);
    showElement(pwdWeakErr);
}

function validationFunctionSet4(){
    hideElement(pwdErr);
    hideElement(pwdLenErr);
    hideElement(pwdWeakErr);
}



/**
 * Validiert das Bestätigungsfeld für das Passwort.
 * @returns {boolean}
 */
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
  } setFieldError(confirmInput, !ok);
  return ok;}

/**
 * Validiert die Checkbox für Datenschutz.
 * @returns {boolean}
 */
function validatePrivacy() {
  const ok = !!privacyCheckbox.checked;
  ok ? hideElement(privacyErr) : showElement(privacyErr);
  return ok;
}

// ========== Step Access (Silent) ==========

/**
 * Erlaubt/verbietet die nächsten Schritte je nach Formstatus.
 */
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


//**========== Events ==========
// Ist für die Logik in der SignUp Maske zuständig */ 

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

/**
 * Prüft Netzwerkstatus und zeigt ggf. Hinweis an.
 */
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


//**========== Initial Button States ==========
// setzt die Input Felder Standardmäßig auf disabled */ 

emailInput.disabled = true;
passwordInput.disabled = true;
confirmInput.disabled = true;
signupButton.disabled = true;
updateStepAccessSilent();




