
let normalContactEditModeArray = [];
let filteredContactEditModeArray = [];


/**renders the Contacts in Edit Mode DropDown */
function showContactsEdit(id) {
    const thisT = tasks.find(task => task[1].id === id);
    thisT[1].assignedTo.forEach((item) => normalContactEditModeArray.push(item));
    thisT[1].assignedTo = [];
    let preselectedEdit = normalContactEditModeArray.concat(filteredContactEditModeArray);
    let contacts = document.getElementById('IdForContactsEdit')
    contacts.innerHTML = "";
    for (let index = 0; index < contactsArray.length; index++) {
        contacts.innerHTML += renderContactsInEditDropDown(id, contactsArray, index, preselectedEdit);
    }
}


/**shows the non-filtered choosen Contacts in the list */
function chooseContactEdit(id, index) {
    // let presentTask = tasks.find(inf => inf[1].id === id)
    // presentTask[1].assignedTo.forEach((item) => normalContactEditModeArray.push(item));
    let choContact = document.getElementById(`checkboxImgEdit-${index}`)
    if (choContact.classList.contains("checkboxEdit")) {
        setAsChecked(choContact);
        processCurrentContactEdit(id, index);
    } else {
        returnToUnchecked(choContact);
        processCurrentContactEdit(id, index);
    }
}

/**this sets contact as checked in the edit Mode */
function setAsChecked(choContact) {
    choContact.classList.remove('checkboxEdit')
    choContact.classList.add('checkedEdit')
    choContact.src = "/img/icons/normalCheckedContact.svg"
    let name = choContact.dataset.set
    normalContactEditModeArray.push(name);
}

/**this sets contact back to unchecked in the edit Mode */
function returnToUnchecked(choContact) {
    choContact.classList.add('checkboxEdit')
    choContact.classList.remove('checkedEdit')
    let name = choContact.dataset.set;
    const indexToRemove = normalContactEditModeArray.indexOf(name);
    if (indexToRemove !== -1) {
        normalContactEditModeArray.splice(indexToRemove, 1);
    }
    choContact.src = "/img/icons/normalCheckContact.svg"
}

/**this function is needed for collecting all choosen contacts and
 * render it under the dropDown menu
 */
function processCurrentContactEdit(id) {
    let combo = normalContactEditModeArray.concat(filteredContactEditModeArray);
    console.log(combo.length);
    if ((combo.length) > 6) {
        document.getElementById('countInfoEdit').innerHTML = `+ ${(combo.length) - 6}`
    }
    if ((combo.length) <= 6) {
        document.getElementById('countInfoEdit').innerHTML = "";
        document.getElementById('choosenContactsEdit').innerHTML = "";
        let result = combo.slice(0, 6);
        result.forEach((result) => {
            let compareIndexFilteredEdit = contactsArray.findIndex(contactsArray => result == contactsArray.name);
            document.getElementById('choosenContactsEdit').innerHTML += renderChoosenContactEdit(compareIndexFilteredEdit);
        })
    }
}

/**shows the choosen Contacts in the filtered list */
function chooseFilteredContactEdit(id, filterContactIndex) {
    let choContactFilter = document.getElementById(`checkboxImgEdit-${filterContactIndex}`)
    if (choContactFilter.classList.contains("checkboxEdit")) {
        setAsCheckedFilter(choContactFilter);
        processCurrentContactEdit(id, filterContactIndex);
    } else {
        returnToUncheckedFilter(choContactFilter);
        processCurrentContactEdit(id, filterContactIndex);
    }
}

/**this sets choosen contacts, which were filtered before, as checked */
function setAsCheckedFilter(choContactFilter) {
    choContactFilter.classList.remove('checkboxEdit')
    choContactFilter.classList.add('checkedEdit')
    choContactFilter.src = "/img/icons/normalCheckedContact.svg"
    let name = choContactFilter.dataset.set
    filteredContactEditModeArray.push(name);
}

/**this sets choosen contacts, which were filtered before, back as unchecked */
function returnToUncheckedFilter(choContactFilter) {
    choContactFilter.classList.add('checkboxEdit')
    choContactFilter.classList.remove('checkedEdit')
    let name = choContactFilter.dataset.set;
    const indexToRemove = filteredContactEditModeArray.indexOf(name);
    if (indexToRemove !== -1) {
        filteredContactEditModeArray.splice(indexToRemove, 1);
    }
    choContactFilter.src = "/img/icons/normalCheckContact.svg"
}


/**filters the contacts accordingly into the DropDown window */
let filteredContactsEdit = [];
function filterContactsInPopupEdit(id) {
    let r;
    let typedValue = document.getElementById('filterContactsEdit').value
    if (typedValue.length > 0) {
        let val = Object.values(contactsArray);
        r = val.slice(1)
        filteredContactsEdit = r.filter(fn => { return fn.name.toLowerCase().includes(typedValue.toLowerCase()) })
        renderfilteredContactsInPopupEdit(id, filteredContactsEdit);
    } else if (typedValue.length < 1) {
        showContactsEdit(id);
    }
}

/**renders the filtered Contacts inot the list */
function renderfilteredContactsInPopupEdit(id, filteredContactsEdit) {
    // const thisTFilter = tasks.find(task => task[1].id === id);
    let preselectedFilterEdit = normalContactEditModeArray.concat(filteredContactEditModeArray);
    let filtContactInPopupEdit = document.getElementById('IdForContactsEdit')
    filtContactInPopupEdit.innerHTML = "";
    for (let filterContactIndex = 0; filterContactIndex < filteredContactsEdit.length; filterContactIndex++) {
        filtContactInPopupEdit.innerHTML += renderHTMLForFilteredContactsInEdit(id, filteredContactsEdit, filterContactIndex, preselectedFilterEdit);
    }
}

/**this opens or closes the contact dropdown, according the current status */
function openContactViewEdit() {
    let contactDrop = document.getElementById('IdForContactsEdit')
    if (contactDrop.classList.contains('availibleContactsCloseEdit')) {
        contactDrop.classList.remove('availibleContactsCloseEdit');
        contactDrop.classList.add('availibleContactsOpenEdit');
    } else if (contactDrop.classList.contains('availibleContactsOpenEdit')) {
        contactDrop.classList.remove('availibleContactsOpenEdit');
        contactDrop.classList.add('availibleContactsCloseEdit');
    }
    if (document.querySelectorAll('availibleContactsOpenEdit')) {
        let contact = document.getElementById('arrowImgCEdit')
        contact.classList.toggle('select-arrow-openEdit')
    }
}

/**this makes the input field for filtering contacts visible, if an User clicks */
function showInputFilter() {
    if (document.getElementById('placeholderpTagEdit')) {
        document.getElementById('placeholderpTagEdit').classList.toggle('dont-Show');
        document.getElementById('filterContactsEdit').classList.toggle('dont-Show');
        document.getElementById('filterContactsEdit').focus()
    };
}