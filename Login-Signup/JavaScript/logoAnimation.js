/**
 * Animationen und Anzeige des Splash Screens auf Index-Seite.
 * @module logoAnimation
 */

document.addEventListener('DOMContentLoaded', () => {
  const mainContent = document.querySelector('.main-content');
  const splashScreen = document.querySelector('.splash-screen');
  if (isIndexPage()) {
    loadIndexPage(mainContent, splashScreen);
  } else {
    showMainContent(mainContent, splashScreen);
  }
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

/**
 * Lädt den Splash-Screen beim Seitenaufruf.
 * @param {HTMLElement} mainContent
 * @param {HTMLElement} splashScreen
 */
function loadIndexPage(mainContent, splashScreen) {
  if (isInternalNavigation()) {
    showMainContent(mainContent, splashScreen);
  } else {
    playSplashAnimation(mainContent, splashScreen);
  }
}

/**
 * Spielt die Animation für Splash-Screen.
 * @param {HTMLElement} mainContent
 * @param {HTMLElement} splashScreen
 */
function playSplashAnimation(mainContent, splashScreen) {
  setTimeout(() => {
    fadeOutSplash(splashScreen);
    setTimeout(() => {
      hideSplashShowContent(mainContent, splashScreen);
    }, 500);
  }, 1000);
}

/**
 * Blendet den Splash-Screen aus.
 * @param {HTMLElement} splashScreen
 */
function fadeOutSplash(splashScreen) {
  if (splashScreen) splashScreen.style.opacity = '0';
}

/**
 * Versteckt den Splash-Screen und zeigt das Haupt-Element.
 * @param {HTMLElement} mainContent
 * @param {HTMLElement} splashScreen
 */
function hideSplashShowContent(mainContent, splashScreen) {
  if (splashScreen) splashScreen.style.display = 'none';
  if (mainContent) mainContent.classList.add('visible');
}

/**
 * Zeigt das Haupt-Element dauerhaft an.
 * @param {HTMLElement} mainContent
 * @param {HTMLElement} splashScreen
 */
function showMainContent(mainContent, splashScreen) {
  if (splashScreen) splashScreen.style.display = 'none';
  if (mainContent) mainContent.classList.add('visible');
}