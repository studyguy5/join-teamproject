let links = ['summary', 'board', 'add-task', 'contacts', 'impressum'];
// let images = ['summary.svg', 'board.svg', 'add-task.svg', 'contacts.svg', 'impressum.svg'];
// so könnten wir mittels loop die navbar rendern - also die hard gecodete navigation.html meine ich
// können wir ja besprechen
function init() {
    includeNavLinks();
}

function includeNavLinks() {
    let includeElements = document.getElementById('nav-container');
    includeElements.innerHTML = '';
    for (let i = 0; i < links.length; i++) {
        includeElements.innerHTML += `<ul class="nav-elements">
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

// function renderLinks() {

// }