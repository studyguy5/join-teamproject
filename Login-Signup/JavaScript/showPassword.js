/**
 * Steuert Sichtbarkeit und Icons für Passwortfelder.
 * @module showPassword
 */

document.addEventListener('DOMContentLoaded', () => {
  const lookOn = 'svg/visibility_off.svg';
  const lookOff = 'svg/visibility.svg';
  setupPasswordIcons('password', 'togglePassword', lookOn, lookOff);
  setupPasswordIcons('confirmPassword', 'toggleConfirmPassword', lookOn, lookOff);
});

/**
 * Initialisiert die Icons für das Passwortfeld.
 * @param {string} inputId - Die ID des Passwortfelds.
 * @param {string} toggleId - Die ID des Toggle-Icons.
 * @param {string} lookOn - Icon für "Passwort versteckt".
 * @param {string} lookOff - Icon für "Passwort sichtbar".
 */
function setupPasswordIcons(inputId, toggleId, lookOn, lookOff) {
  const input = document.getElementById(inputId);
  const toggle = document.getElementById(toggleId);
  const lock = document.querySelector(`#${inputId} + .input-icon`);
  if (input && toggle && lock) {
    input.addEventListener('input', () => handlePasswordInput(input, toggle, lock, lookOn));
    toggle.addEventListener('click', () => togglePasswordVisibility(input, toggle, lookOn, lookOff));
    setInitialPasswordIcon(input, toggle, lock, lookOn);
  }
}

/**
 * Wechselt zwischen Icon und Sichtbarkeit je nach Inhalt des Feldes.
 * @param {HTMLInputElement} input
 * @param {HTMLElement} toggle
 * @param {HTMLElement} lock
 * @param {string} lookOn
 */
function handlePasswordInput(input, toggle, lock, lookOn) {
  if (input.value.length > 0) {
    showToggleIcon(toggle, lock);
  } else {
    resetPasswordField(input, toggle, lock, lookOn);
  }
}

/**
 * Toggle zwischen sichtbarem und verstecktem Passwort.
 * @param {HTMLInputElement} input
 * @param {HTMLElement} toggle
 * @param {string} lookOn
 * @param {string} lookOff
 */
function togglePasswordVisibility(input, toggle, lookOn, lookOff) {
  if (input.type === 'password') {
    setPasswordTypeText(input, toggle, lookOff);
  } else {
    setPasswordTypePassword(input, toggle, lookOn);
  }
}

/**
 * Initialisiert das Icon je nach aktuellem Zustand.
 * @param {HTMLInputElement} input
 * @param {HTMLElement} toggle
 * @param {HTMLElement} lock
 * @param {string} lookOn
 */
function setInitialPasswordIcon(input, toggle, lock, lookOn) {
  if (input.value.length > 0) {
    showToggleIcon(toggle, lock);
  } else {
    resetPasswordField(input, toggle, lock, lookOn);
  }
}

/**
 * Zeigt das Toggle-Icon und blendet das Schloss aus.
 * @param {HTMLElement} toggle
 * @param {HTMLElement} lock
 */
function showToggleIcon(toggle, lock) {
  toggle.style.display = 'block';
  lock.style.display = 'none';
}

/**
 * Setzt das Feld zurück auf Passwort & zeigt Schloss-Icon.
 * @param {HTMLInputElement} input
 * @param {HTMLElement} toggle
 * @param {HTMLElement} lock
 * @param {string} lookOn
 */
function resetPasswordField(input, toggle, lock, lookOn) {
  toggle.style.display = 'none';
  lock.style.display = 'block';
  input.type = 'password';
  toggle.src = lookOn;
}

/**
 * Setzt das Feld auf sichtbar (Typ="text").
 * @param {HTMLInputElement} input
 * @param {HTMLElement} toggle
 * @param {string} lookOff
 */
function setPasswordTypeText(input, toggle, lookOff) {
  input.type = 'text';
  toggle.src = lookOff;
}

/**
 * Setzt das Feld auf Passwort (Typ="password").
 * @param {HTMLInputElement} input
 * @param {HTMLElement} toggle
 * @param {string} lookOn
 */
function setPasswordTypePassword(input, toggle, lookOn) {
  input.type = 'password';
  toggle.src = lookOn;
}