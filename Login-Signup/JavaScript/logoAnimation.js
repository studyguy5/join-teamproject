/**
 * Animationen und Anzeige des Splash Screens auf Index-Seite.
 * @module logoAnimation
 */

document.addEventListener('DOMContentLoaded', () => {
  const mainContent = document.querySelector('.main-content');
  // const splashScreen = document.querySelector('.splash-screen');
  // if (isIndexPage()) {
  //   loadIndexPage(mainContent, splashScreen);
  // } else {
  //   showMainContent(mainContent, splashScreen);
  // }
  localStorage.setItem('signIn', false)
});

/**
 * Erkennt die Index-Seite.
 * @returns {boolean}
 */
function isIndexPage() {
  const path = window.location.pathname;
  return path.toLowerCase().includes('index.html') || path === '/' || path.endsWith('/');
}

/**
 * Prüft, ob die Navigation intern ist.
 * @returns {boolean}
 */
function isInternalNavigation() {
  const referrer = document.referrer;
  const currentDomain = window.location.origin;
  return referrer.startsWith(currentDomain) && referrer !== '';
}



setTimeout(() => {
  hideMainElementShortTime();
  hideOverlay();
}, 450);


function hideOverlay(){
  let overlay = document.querySelector('.logoOverlayResponsiv');
  overlay.classList.add('hideOverlay')
}

function hideMainElementShortTime(){
  let signUpCorner = document.querySelector('.login-container');
  let mainLoginMask = document.querySelector('.signup-container');
  let overlay = document.querySelector('.logoOverlayResponsiv');
  overlay.classList.add('animateOpacity');
  signUpCorner.style.opacity = "1";
  mainLoginMask.style.opacity = "1";
}
