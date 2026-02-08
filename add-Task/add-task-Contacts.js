

let addTaskNormalContactArray = [];
let indexArray = [];

/**
 * Toggles selection of a contact in the normal view.
 * @param {number} index - Contact index.
 */
function chooseContactNormal(index) {
    let choContact = document.getElementById(`checkboxImg-${index}`)
    if (choContact.classList.contains('checkbox')) {
        setOnCheckedNormal(choContact);
        processCurrentCombinedContacts();
    } else {
        returnToUncheckedNormal(choContact);
        processCurrentCombinedContacts();
    }
}

function setOnCheckedNormal(choContact) {
    choContact.classList.remove('checkbox')
    choContact.classList.add('checked')
    choContact.src = "/img/icons/normalCheckedContact.svg"
    let name = choContact.dataset.set
    addTaskNormalContactArray.push(name);
    let i = choContact.dataset.index;
    indexArray.push(i);
}

function returnToUncheckedNormal(choContact) {
    choContact.classList.add('checkbox')
    choContact.classList.remove('checked')
    let name = choContact.dataset.set;
    const indexToRemove = addTaskNormalContactArray.indexOf(name);
    if (indexToRemove !== -1) {
        addTaskNormalContactArray.splice(indexToRemove, 1);
    }
    let i = choContact.dataset.index;
    const indexOfIndex = indexArray.indexOf(i);
    if (indexOfIndex !== -1) {
        indexArray.splice(indexOfIndex, 1);
    }
    choContact.src = "/img/icons/normalCheckContact.svg"
}


let addTaskNormalFilteredContactArray = [];
/**
 * Toggles selection of a filtered contact.
 * @param {number} filterContactIndex - Index of filtered contact.
 */
function chooseFilteredContactNormal(filterContactIndex) {
    let choContact = document.getElementById(`checkboxImg-${filterContactIndex}`)
    if (choContact.classList.contains('checkbox')) {
        setOnChecked(choContact);
        processCurrentCombinedContacts()
    } else {
        returnToUnchecked(choContact);
        processCurrentCombinedContacts();
    }
}

function setOnChecked(choContact) {
    choContact.classList.remove('checkbox')
    choContact.classList.add('checked')
    choContact.src = "/img/icons/normalCheckedContact.svg"
    let name = choContact.dataset.set
    addTaskNormalFilteredContactArray.push(name);
}

function returnToUnchecked(choContact) {
    choContact.classList.add('checkbox')
    choContact.classList.remove('checked')
    let name = choContact.dataset.set;
    const indexToRemove = addTaskNormalFilteredContactArray.indexOf(name);
    if (indexToRemove !== -1) {
        addTaskNormalFilteredContactArray.splice(indexToRemove, 1);
    }
    choContact.src = "/img/icons/normalCheckContact.svg"
}



function processCurrentCombinedContacts() {
    let countFilter = addTaskNormalFilteredContactArray.concat(addTaskNormalContactArray);
    if ((countFilter.length) > 6) {
        document.getElementById('countInfo').innerHTML = `+ ${(countFilter.length) - 6}`
    }
    if ((countFilter.length) <= 6) {
        document.getElementById('countInfo').innerHTML = "";
        document.getElementById('choosenContacts').innerHTML = "";
        let combo = addTaskNormalFilteredContactArray.concat(addTaskNormalContactArray);
        let result = combo.slice(0, 6);
        result.forEach((result) => {
            let compareIndexFiltered = contactsArray.findIndex(contactsArray => result == contactsArray.name);
            document.getElementById('choosenContacts').innerHTML += renderFilteredChoosenContactNormal(compareIndexFiltered)
        })
    }
}


/**
 * Toggles the input field for filtering contacts in the normal view.
 */
function showInputNormal() {
    if (document.getElementById('placeholderptag')) {
        document.getElementById('placeholderptag').classList.toggle('dont-Show');
        document.getElementById('filterContactsNormal').classList.toggle('dont-Show');
        document.getElementById('filterContactsNormal').focus()
    };
}


/**
 * Opens or closes the contact dropdown list in the normal view.
 */
function openContactViewNormal() {
    let contactDrop = document.getElementById('IdForContactsNormal')
    if (contactDrop.classList.contains('availibleContactsClose')) {
        contactDrop.classList.remove('availibleContactsClose');
        contactDrop.classList.add('availibleContactsOpen');
    } else if (contactDrop.classList.contains('availibleContactsOpen')) {
        contactDrop.classList.remove('availibleContactsOpen');
        contactDrop.classList.add('availibleContactsClose');
    }
    if (document.querySelectorAll('availibleContactsOpen')) {
        let contact = document.getElementById('arrowImgC')
        contact.classList.toggle('select-arrow-open')
    }
}