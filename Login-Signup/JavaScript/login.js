import { auth } from './firebase.js';
import {
  signInWithEmailAndPassword,
  signInAnonymously,
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
function clearErrors() { setText(emailErr,''); setText(pwdErr,''); setText(generalErr,''); }
function showGeneralError(msg){ setText(generalErr, msg || 'Login fehlgeschlagen.'); }

function validateEmailField(){
  const email = emailInput?.value?.trim() || '';
  if(!email){ setText(emailErr,'Bitte gib deine Email ein.'); return false; }
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ setText(emailErr,'Bitte gib eine gültige Email ein.'); return false; }
  setText(emailErr,''); return true;
}
function validatePasswordField(){
  const pwd = passwordInput?.value || '';
  if(!pwd){ setText(pwdErr,'Bitte gib dein Passwort ein.'); return false; }
  setText(pwdErr,''); return true;
}
function formValid(){ return validateEmailField() & validatePasswordField(); }

emailInput?.addEventListener('input', validateEmailField);
passwordInput?.addEventListener('input', validatePasswordField);

function updateNetworkStatus(){
  if(!navigator.onLine){ showGeneralError('Keine Internetverbindung verfügbar.'); }
  else if(generalErr?.textContent === 'Keine Internetverbindung verfügbar.'){ setText(generalErr,''); }
}
window.addEventListener('online', updateNetworkStatus);
window.addEventListener('offline', updateNetworkStatus);
updateNetworkStatus();

function getRedirectUrl(defaultTarget = '../summary.html'){
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
  if(!formValid()) return;
  if(!navigator.onLine){ showGeneralError('Keine Internetverbindung verfügbar.'); return; }

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  try{
    const cred = await signInWithEmailAndPassword(auth, email, password);

    // Name aus Firebase-Profile oder DB lesen
    let fullName = cred.user?.displayName || '';
    try {
      const profile = await database.getUser(email); // erwarte { name: "Vorname Nachname" }
      if(profile?.name) fullName = profile.name;
    } catch {}

    if(!fullName){
      // Fallback aus Email (vor @) – nicht perfekt, aber besser als leer
      fullName = email.split('@')[0];
    }

    storeNameForSummary(fullName);

    const target = getRedirectUrl('../summary.html');
    window.location.href = target;
  }catch(error){
    let msg = 'Email oder Passwort ist falsch.';
    switch (error.code) {
      case 'auth/too-many-requests': msg = 'Zu viele Versuche. Bitte später erneut versuchen.'; break;
      case 'auth/invalid-email': msg = 'Ungültige Email-Adresse.'; break;
      default: if (error.message) msg += ` (${error.message})`;
    }
    showGeneralError(`${msg}${error.code ? ` [${error.code}]` : ''}`);
  }
});

guestBtn?.addEventListener('click', async ()=>{
  clearErrors();
  if(!navigator.onLine){ showGeneralError('Keine Internetverbindung verfügbar.'); return; }

  try{
    sessionStorage.setItem('guest','true');
    localStorage.setItem('userFullName', 'Guest User');
    const target = getRedirectUrl('../summary.html');
    window.location.href = target;
  }catch(e){
    showGeneralError('Konnte nicht zur Summary weiterleiten.');
  }
});
