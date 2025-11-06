document.addEventListener('DOMContentLoaded', () => {
  const mainContent = document.querySelector('.main-content');
  const splashScreen = document.querySelector('.splash-screen');
  if (isIndexPage()) {
    loadIndexPage(mainContent, splashScreen);
  } else {
    showMainContent(mainContent, splashScreen);
  }
});


function isIndexPage() {
  const path = window.location.pathname;
  return path.toLowerCase().includes('index.html') || path === '/' || path.endsWith('/');
}


function isInternalNavigation() {
  const referrer = document.referrer;
  const currentDomain = window.location.origin;
  return referrer.startsWith(currentDomain) && referrer !== '';
}


function loadIndexPage(mainContent, splashScreen) {
  if (isInternalNavigation()) {
    showMainContent(mainContent, splashScreen);
  } else {
    playSplashAnimation(mainContent, splashScreen);
  }
}


function playSplashAnimation(mainContent, splashScreen) {
  setTimeout(() => {
    fadeOutSplash(splashScreen);
    setTimeout(() => {
      hideSplashShowContent(mainContent, splashScreen);
    }, 500);
  }, 1000);
}


function fadeOutSplash(splashScreen) {
  if (splashScreen) splashScreen.style.opacity = '0';
}


function hideSplashShowContent(mainContent, splashScreen) {
  if (splashScreen) splashScreen.style.display = 'none';
  if (mainContent) mainContent.classList.add('visible');
}


function showMainContent(mainContent, splashScreen) {
  if (splashScreen) splashScreen.style.display = 'none';
  if (mainContent) mainContent.classList.add('visible');
}