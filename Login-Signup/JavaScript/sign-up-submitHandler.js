
import { auth, database} from './sign-up.js';
import { createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";


//**
// Submit handler validiert die Eingaben im Inputfeld und setzt einen Focus und scrollt an den Eingabeort
//  */ ========== Submit Handler ==========

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

function validateSignUpData(){
  const checks = [
    () => [validateName(), nameInput],
    () => [validateEmail(), emailInput],
    () => [validatePassword(), passwordInput],
    () => [validateConfirm(), confirmInput],
    () => [validatePrivacy(), privacyCheckbox],
  ];
}

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

function disableSignUpButton(){
  signupButton.disabled = true;
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;
}

async function createUserWithGivenData(){
  const cred = await createUserWithEmailAndPassword(auth, email, password);
    try { await updateProfile(cred.user, { displayName: name }); } catch { }
    await database.addUser({ email, name });
    localStorage.setItem('userFullName', name);
    showElement(successMessage);
    setTimeout(() => { window.location.href = 'index.html'; }, 1800);
}

function catchErrorfromSignIn(error){
  let msg = 'Registrierung fehlgeschlagen.';
    if (error.code === 'auth/email-already-in-use') msg = 'Diese Email wird bereits verwendet.';
    else if (error.code === 'auth/invalid-email') msg = 'Ungültige Email-Adresse.';
    else if (error.code === 'auth/weak-password') msg = 'Passwort ist zu schwach (mind. 6 Zeichen, Buchstaben und Zahlen).';
    else if (error.message) msg += ` (${error.message})`;
    showGeneralError(`${msg}${error.code ? ` [${error.code}]` : ''}`);
}