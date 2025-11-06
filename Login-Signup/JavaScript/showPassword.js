document.addEventListener('DOMContentLoaded', () => {
  const lookOn = 'svg/visibility_off.svg';
  const lookOff = 'svg/visibility.svg';
  setupPasswordIcons('password', 'togglePassword', lookOn, lookOff);
  setupPasswordIcons('confirmPassword', 'toggleConfirmPassword', lookOn, lookOff);
});


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


function handlePasswordInput(input, toggle, lock, lookOn) {
  if (input.value.length > 0) {
    showToggleIcon(toggle, lock);
  } else {
    resetPasswordField(input, toggle, lock, lookOn);
  }
}


function togglePasswordVisibility(input, toggle, lookOn, lookOff) {
  if (input.type === 'password') {
    setPasswordTypeText(input, toggle, lookOff);
  } else {
    setPasswordTypePassword(input, toggle, lookOn);
  }
}


function setInitialPasswordIcon(input, toggle, lock, lookOn) {
  if (input.value.length > 0) {
    showToggleIcon(toggle, lock);
  } else {
    resetPasswordField(input, toggle, lock, lookOn);
  }
}


function showToggleIcon(toggle, lock) {
  toggle.style.display = 'block';
  lock.style.display = 'none';
}


function resetPasswordField(input, toggle, lock, lookOn) {
  toggle.style.display = 'none';
  lock.style.display = 'block';
  input.type = 'password';
  toggle.src = lookOn;
}


function setPasswordTypeText(input, toggle, lookOff) {
  input.type = 'text';
  toggle.src = lookOff;
}


function setPasswordTypePassword(input, toggle, lookOn) {
  input.type = 'password';
  toggle.src = lookOn;
}