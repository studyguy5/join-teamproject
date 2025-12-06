

let links = ['summary', 'add-task', 'board', 'contacts'];

function init() {
    checkSignUpStatus();
    renderUserInitials();
}

/**render the Initials from the User name */
window.renderUserInitials = function renderUserInitials() {
  const fullName = getStoredUserName();
  const initials = getInitials(fullName);
  const el = document.getElementById('userInitials');
  if (el) {
    el.textContent = initials;
    el.setAttribute('title', fullName);
    el.setAttribute('aria-label', fullName);
  }
};

function getInitials(fullName) {
  const name = (fullName || '').trim().toLowerCase();
  // Wenn Gast-User, immer "G"!
  if (name === 'guest user' || name === 'guest') {
    return 'G';
  }
  const parts = name.split(/\s+/).filter(Boolean);
  if (!parts.length) return 'US';
  const first = parts[0][0] || '';
  const last = parts.length > 1 ? parts[parts.length - 1][0] : (parts[0][1] || '');
  return (first + last).toUpperCase();
}

function getStoredUserName() {
  const name = localStorage.getItem('userFullName');
  if (name && name.trim()) return name.trim();
  if (sessionStorage.getItem('guest') === 'true') return 'Guest User';
  return 'User';
}

function deleteSession(){
    localStorage.removeItem('guest')
    sessionStorage.removeItem('guest')
    localStorage.removeItem('userFullName')
}

function checkSignUpStatus(){
    let signUpStatus = sessionStorage.getItem('guest')
    let signUpStatus1 = localStorage.getItem('userFullName')
    if(signUpStatus || signUpStatus1){
        includeNavLinks();
        includePrivacyLinks();
    }else{
        includeNavLinksWithoutUser();
        includePrivacyLinksWithoutUser();
        document.getElementById('userInitials').style.display= "none";
    }
}

function includeNavLinks() {
    let includeElements = document.getElementById('nav-container');
    for (let i = 0; i < links.length; i++) {
        includeElements.innerHTML += `
        <ul id="${links[i]}" class="nav-elements ${links[i]}">
        <li>
            <a href="/${links[i]}/${links[i]}.html">
                <img src="/img/icons/${links[i]}.svg"/>
                <span>${links[i]}</span>
            </a>
        </li></ul>
        `
    }
}

function includeNavLinksWithoutUser() {
    let includeElements = document.getElementById('nav-container');
        includeElements.innerHTML += `
        <ul id="LogIn" class="nav-elements LogIn">
        <li>
            <a href="/login-signup/index.html">
                <img src="/img/icons/logInIcon.svg"/>
                <span>Log In</span>
            </a>
        </li></ul>
        `
}


function includePrivacyLinks() {
    let include = document.getElementById('nav-container')
    include.innerHTML += `
    <section class="privacy-legal-section">
                <a href="/privacy-policy/privacy-policy.html"><h4>Privacy Policy</h4></a>
                <a href="/legal-Notice/legal-notice.html"><h4>Legal notice</h4></a>
            </section>`
}

function includePrivacyLinksWithoutUser() {
    let include = document.getElementById('nav-container')
    include.innerHTML += `
    <section class="privacy-legal-sectionNonUser">
                <a href="/privacy-policy/privacy-policy.html"><h4>Privacy Policy</h4></a>
                <a href="/legal-Notice/legal-notice.html"><h4>Legal notice</h4></a>
            </section>`
}


// muss noch aufgerufen werden
// function renderUserInitials() {
//     if (window.location.pathname !== "/privacy-policy/privacy-policy.html" || "/legal-notice/legal-notice.html") {
//         let profileInfo = document.getElementById('userInitials')
//         if (!profileInfo) {
//             return
//         } 
//         // profileInfo.innerHTML = `<h2>RG</h2>`
//     } else {}
// }


let isOpen = false;
function openMenu() {
    let menu = document.getElementById('profileMenu')
    if (!isOpen) {
        menu.classList.remove('dontShow', 'slideback')
        menu.classList.add('profileMenu')
        isOpen = true;
    } else if (isOpen) {
        menu.classList.add('slideback')
        menu.classList.add('dontShow') 
                isOpen = false;
    }

}