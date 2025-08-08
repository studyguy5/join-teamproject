// let links = ['summary', 'board', 'add-task', 'contacts', 'impressum'];
// let images = ['summary.svg', 'board.svg', 'add-task.svg', 'contacts.svg', 'impressum.svg'];
// so könnten wir mittels loop die navbar rendern - also die hard gecodete navigation.html meine ich
// können wir ja besprechen
async function init() {
    await includeHTML();
}

async function includeHTML() {
    let includeElements = document.querySelectorAll("[w3-include-html]");
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        const file = element.getAttribute("w3-include-html"); // navbar id hier einbinden und mit forloop und array hier oben html erzeugen ???
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = "Page not found";
        }
    }
}