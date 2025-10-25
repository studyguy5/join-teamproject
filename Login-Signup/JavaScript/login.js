import { auth } from './firebase.js';
import {
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import database from './database.js';

const form = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const emailErr = document.getElementById('login-email-error');
const pwdErr = document.getElementById('login-password-error');
const generalErr = document.getElementById('login-general-error');
const guestBtn = document.querySelector('.btn-secondary');

const setText = (el, txt) => { if (el) el.textContent = txt || ''; };
function showEl(el, txt){
  if(!el) return;
  if (el === generalErr) el.classList.add('error-message-login');
  el.classList.add('is-visible');
  setText(el, txt);
  el.style.display = 'block';
  el.removeAttribute('hidden');
}
function hideEl(el){
  if(!el) return;
  el.classList.remove('is-visible');
  el.style.display = 'none';
  el.setAttribute('hidden', '');
}
function markFieldError(input, isError) {
  if (!input) return;
  input.classList.toggle('error', !!isError);
  input.classList.toggle('valid', !isError && !!input.value);
  input.setAttribute('aria-invalid', isError ? 'true' : 'false');
}
function clearErrors() {
  hideEl(emailErr);
  hideEl(pwdErr);
  hideEl(generalErr);
  markFieldError(emailInput,false);
  markFieldError(passwordInput,false);
}
function showGeneralError(msg){
  showEl(generalErr, msg || 'Login fehlgeschlagen.');
}

function validateEmailField(){
  const email = emailInput?.value?.trim() || '';
  if(!email){ showEl(emailErr,'Bitte gib deine Email ein.'); markFieldError(emailInput,true); return false; }
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ showEl(emailErr,'Bitte gib eine gültige Email ein.'); markFieldError(emailInput,true); return false; }
  hideEl(emailErr); markFieldError(emailInput,false); return true;
}
function validatePasswordField(){
  const pwd = passwordInput?.value || '';
  if(!pwd){ showEl(pwdErr,'Bitte gib dein Passwort ein.'); markFieldError(passwordInput,true); return false; }
  hideEl(pwdErr); markFieldError(passwordInput,false); return true;
}
function formValid(){ return validateEmailField() && validatePasswordField(); }

/*
  Verhalten geändert:
  - Beim Tippen in das Email-Feld: nur vorhandene Email-Fehler entfernen (keine aktive Validierung).
  - Bei Blur des Email-Feldes oder Focus auf Passwort: Email wird validiert und ggf. Fehlermeldung angezeigt.
  - Beim Tippen ins Passwort-Feld: Passwort-Fehler / allgemeine Fehler ausgeblendet, aber Email bleibt validiert (falls bereits geprüft).
*/

// Beim Tippen in Email: Fehler nur ausblenden, aber NICHT sofort valide/invalid anzeigen
emailInput?.addEventListener('input', () => {
  // Entferne störende Fehlermeldung während der Eingabe, zeige aber keine neue Fehlermeldung
  hideEl(emailErr);
  markFieldError(emailInput, false);
  hideEl(generalErr);
});

// Wenn Email-Feld verlassen wird: validieren und ggf. Fehler anzeigen
emailInput?.addEventListener('blur', () => {
  validateEmailField();
});

// Wenn der Nutzer ins Passwortfeld wechselt: Email validieren (zeigt Fehlermeldung erst jetzt, falls ungültig)
passwordInput?.addEventListener('focus', () => {
  validateEmailField();
});

// Passwort-Input: wie gehabt, Passwort-Feld validieren und allgemeine Fehlermeldung entfernen
passwordInput?.addEventListener('input', () => {
  validatePasswordField();
  hideEl(generalErr);
});

function updateNetworkStatus(){
  // Kein generalErr beim Offline-Status. Wenn du später ein Netzwerk-UI willst, leg ein eigenes Element an.
  if (!navigator.onLine) {
    // keine action
  } else {
    if (generalErr && generalErr.textContent === 'Keine Internetverbindung verfügbar.') hideEl(generalErr);
  }
}
window.addEventListener('online', updateNetworkStatus);
window.addEventListener('offline', updateNetworkStatus);
updateNetworkStatus();

function getRedirectUrl(defaultTarget = '../summary/summary.html'){
  try{
    const params = new URLSearchParams(window.location.search);
    let target = params.get('redirect') || defaultTarget;
    if(target.startsWith('/')) return new URL(target, window.location.origin).href;
    return new URL(target, window.location.href).href;
  }catch{ return defaultTarget; }
}

function storeNameForSummary(nameLike){
  const cleaned = (nameLike || '').toString().trim();
  if(cleaned) localStorage.setItem('userFullName', cleaned);
}

form?.addEventListener('submit', async (e)=>{
  e.preventDefault();
  clearErrors();
  // Bei Submit: Vollvalidierung
  if(!formValid()) return;
  if(!navigator.onLine){
    // kein generalErr hier — nur echte Auth-Fehler sollen generalErr zeigen
    return;
  }

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  try{
    const cred = await signInWithEmailAndPassword(auth, email, password);

    // Name aus Firebase-Profile oder DB lesen
    let fullName = cred.user?.displayName || '';
    try {
      const profile = await database.getUser(email);
      if(profile?.name) fullName = profile.name;
    } catch {}

    if(!fullName){
      fullName = email.split('@')[0];
    }

    storeNameForSummary(fullName);

    // Erfolg: Fehlermeldungen entfernen und Styles rücksetzen
    hideEl(generalErr);
    markFieldError(emailInput,false);
    markFieldError(passwordInput,false);

    const target = getRedirectUrl('../summary/summary.html');
    window.location.href = target;
  }catch(error){
    // Auth-Fehler: allgemeine Meldung und rote Felder
    let msg = 'Email oder Passwort ist falsch.';
    switch (error.code) {
      case 'auth/too-many-requests':
        msg = 'Zu viele Versuche. Bitte später erneut versuchen.'; break;
      case 'auth/invalid-email':
        msg = 'Ungültige Email-Adresse.'; break;
      default:
        if (error.message) msg += ` (${error.message})`;
    }
    showGeneralError(`${msg}${error.code ? ` [${error.code}]` : ''}`);
    markFieldError(emailInput, true);
    markFieldError(passwordInput, true);
  }
});

guestBtn?.addEventListener('click', async ()=>{
  clearErrors();
  if(!navigator.onLine){
    return;
  }
  try{
    sessionStorage.setItem('guest','true');
    localStorage.setItem('userFullName', 'Guest User');
    const target = getRedirectUrl('../summary/summary.html');
    window.location.href = target;
  }catch(e){
    showGeneralError('Konnte nicht zur Summary weiterleiten.');
  }
});