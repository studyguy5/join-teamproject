

let links = ['summary', 'add-task', 'board', 'contacts'];



function init() {
    includeNavLinks();
    includePrivacyLinks();
    renderUserInitials();
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

function includePrivacyLinks() {
    let include = document.getElementById('nav-container')
    include.innerHTML += `
    <section class="privacy-legal-section">
                <a href="/privacy-policy/privacy-policy.html"><h4>Privacy Policy</h4></a>
                <a href="/legal-Notice/legal-notice.html"><h4>Legal notice</h4></a>
            </section>
    `
}

// muss noch aufgerufen werden
function renderUserInitials() {
    if (window.location.pathname !== "/privacy-policy/privacy-policy.html" || "/legal-notice/legal-notice.html") {
        let profileInfo = document.getElementById('userInitials')
        profileInfo.innerHTML = `<h2>RG</h2>`
    } else {}
}


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

// function setActive(links, i) {
//     console.log('active Funktion arbeitet', links)
//     let active = document.getElementById(`'${links[i]}'`)
    
//     active.classList.add('active')
    
// };

// document.addEventListener('DOMContentLoaded', async () => {
 
//     sectionCheck('contacts')

// function sectionCheck(idsecTrue) {
//     document.getElementById(idsecTrue).classList.add('active')
// }}