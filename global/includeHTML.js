let links = ['summary', 'board', 'add-task', 'contacts'];



function init() {
    includeNavLinks();
    includePrivacyLinks();
    renderUserInitials();
    console.log('wird aufgerufen')
}

function includeNavLinks() {
    let includeElements = document.getElementById('nav-container');
    for (let i = 0; i < links.length; i++) {
        includeElements.innerHTML += `
        
        <ul class="nav-elements">
        <li id="${links[i]}">
            <a href="/${links[i]}/${links[i]}.html">
                <img src="/img/icons/${links[i]}.svg"/>
                <span>${links[i]}</span>
            </a>
        </li></ul>
        `
    }
    console.log('arbeitet', links)
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
    let profileInfo = document.getElementById('userInitials')
    profileInfo.innerHTML = `<h2>RG</h2>`
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
        setTimeout(() => { menu.classList.add('dontShow') }, 500)
        isOpen = false;
    }

}