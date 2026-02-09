

let normalContactsArray = [];

/** tis sets a choosen contact as choosen in the dropdown list */
function chooseContact(index) {
  let choContact = document.getElementById(`checkboxImg-${index}`)
  if (choContact.classList.contains('checkbox')) {
    setOnCheckedPopupNormal(choContact);
    processCurrentContact()
  } else {
    returnToUncheckedPopupNormal(choContact);
    processCurrentContact()
  }
}

/**this is the help function to set the contact as choosen */
function setOnCheckedPopupNormal(choContact) {
  choContact.classList.remove('checkbox')
  choContact.classList.add('checked')
  choContact.src = "/img/icons/normalCheckedContact.svg"
  let name = choContact.dataset.set
  normalContactsArray.push(name);
}

/**this is the help function to set the contact back to unchoosen */
function returnToUncheckedPopupNormal(choContact) {
  choContact.classList.add('checkbox')
  choContact.classList.remove('checked')
  let name = choContact.dataset.set;
  const indexToRemove = normalContactsArray.indexOf(name);
  if (indexToRemove !== -1) {
    normalContactsArray.splice(indexToRemove, 1);
  }
  choContact.src = "/img/icons/normalCheckContact.svg"
}


let filteredContactsArray = [];


/**here we make the choosen Contacts within the filtered Contacts visible */
function chooseFilteredContact(filterContactIndex) {
  let choContactF = document.getElementById(`checkboxImg-${filterContactIndex}`)
  if (choContactF.classList.contains('checkbox')) {
    setOnCheckedPopupFilter(choContactF);
    processCurrentContact();
  } else {
    returnToUncheckedPopupFilter(choContactF);
    processCurrentContact();
  }
}

/**here the help function to set filtered contact as choosen */
function setOnCheckedPopupFilter(choContactF) {
  choContactF.classList.remove('checkbox')
  choContactF.classList.add('checked')
  choContactF.src = "/img/icons/normalCheckedContact.svg";
  let name = choContactF.dataset.set
  filteredContactsArray.push(name);
}

/**here the help function to set filtered contacts as unchoosen */
function returnToUncheckedPopupFilter(choContactF) {
  choContactF.classList.add('checkbox')
  choContactF.classList.remove('checked')
  let name = choContactF.dataset.set;
  const indexToRemove = filteredContactsArray.indexOf(name);
  if (indexToRemove !== -1) {
    filteredContactsArray.splice(indexToRemove, 1);
  }
  choContactF.src = "/img/icons/normalCheckContact.svg";
}

/**this function collects all choosen contacts and renders it unter the drop down list */
function processCurrentContact() {
  let comboPopup = normalContactsArray.concat(filteredContactsArray);
  if ((comboPopup.length) > 6) {
    document.getElementById('countInfoPopup').innerHTML = `+ ${(countPopup.length) - 6}`;
  }
  if ((comboPopup.length) <= 6) {
    document.getElementById('countInfoPopup').innerHTML = "";
    document.getElementById('choosenContacts').innerHTML = "";
    let combo = normalContactsArray.concat(filteredContactsArray);
    let result = combo.slice(0, 6);
    result.forEach((result) => {
      let compareIndex = contactsArray.findIndex(contactsArray => result == contactsArray.name);
      document.getElementById('choosenContacts').innerHTML += renderChoosenContact(compareIndex)
    });
  }
}

/**here the Contact DropDown will open and the arrow makes an 180deg move */
function openContactView() {
    let contactDrop = document.getElementById('IdForContacts')
    if (contactDrop.classList.contains('availibleContactsClose')) {
        openContactWindow(contactDrop);
    } else if (contactDrop.classList.contains('availableContactsOpen')) {
        closeContactWindow(contactDrop);
    }
    if (document.querySelectorAll('availableContactsOpen')) {
        let contact = document.getElementById('arrowImgC')
        contact.classList.toggle('select-arrow-open')
    }
}

/**this funciton opens the drop down list */
function openContactWindow(contactDrop){
  contactDrop.classList.remove('availibleContactsClose');
        contactDrop.classList.add('availableContactsOpen');
        let layer = document.getElementById('hiddenlayer2')
        layer.classList.toggle('hiddenlayer2')
}

/**this function closes the drop down list */
function closeContactWindow(contactDrop){
  contactDrop.classList.remove('availableContactsOpen');
        contactDrop.classList.add('availibleContactsClose');
        let layer = document.getElementById('hiddenlayer2')
        layer.classList.toggle('hiddenlayer2')
        let input = document.getElementById('filterContacts').value;
        if(input.length > 0 ){
            document.getElementById('filterContacts').value = "";
        }
}

/**this function closes the contact dropDown if the whole Popup gets closed
 * in order to reset it for next time
 */
function closeContactView() {
    let contactDrop = document.getElementById('IdForContacts')
    if (contactDrop.classList.contains('availableContactsOpen')) {
        contactDrop.classList.remove('availableContactsOpen');
        contactDrop.classList.add('availibleContactsClose');
        showInput();
        let layer = document.getElementById('hiddenlayer2')
        layer.classList.toggle('hiddenlayer2')
    } else if (contactDrop.classList.contains('availibleContactsClose')) {
    }
    if (document.querySelectorAll('availableContactsOpen')) {
        let contact = document.getElementById('arrowImgC')
        contact.classList.toggle('select-arrow-open')
    }
}




/**show the contacts in the reserved place within the dropdown Menü */
function showContacts() {
    let contacts = document.getElementById('IdForContacts')
    let preselected = normalContactsArray.concat(filteredContactsArray); // Arrays müssen noch angepasst werden
    contacts.innerHTML = "";
    for (let index = 0; index < contactsArray.length; index++) {
        contacts.innerHTML += renderHTMLForContactsInPopup(index, contactsArray, preselected);
    }
}


/**checks if the Contacts have been rendered allready or not to save the choosen ones in the list */
let firstTime = true;
function openContactWithCounterForPopup(id) {
    if (firstTime) {
        showContacts(id);
        openContactView();
        showInput();
        firstTime = false;
    } else {
        openContactView();
        showInput();
    }
}


/**it filters Contacts regarding to your specific typed letters*/
let filteredContacts;
function filterContactsInPopup() {
    let r;
    let typedValue = document.getElementById('filterContacts').value
    if (typedValue.length > 0) {
        let val = Object.values(contactsArray);
        r = val.slice(1)
        filteredContacts = r.filter(fn => { return fn.name.toLowerCase().includes(typedValue.toLowerCase()) })
        renderfilteredContactsInPopup(filteredContacts);
    } else if (typedValue.length < 1) {
        showContacts();
    }
}


/**the filtered Contacts are rendered here */
function renderfilteredContactsInPopup(filteredContacts) {
    let filtContactInPopup = document.getElementById('IdForContacts')
    let preselected = normalContactsArray.concat(filteredContactsArray);
    filtContactInPopup.innerHTML = "";
    for (let filterContactIndex = 0; filterContactIndex < filteredContacts.length; filterContactIndex++) {
        filtContactInPopup.innerHTML += renderHTMLForFilteredContactsInPopup(filteredContacts, filterContactIndex, preselected); }
}


/**if you click, the p-tag will be resplaced with an inputfield to filter */
function showInput() {
    if (document.getElementById('placeholderpTag')) {
        document.getElementById('placeholderpTag').classList.toggle('dont-Show');
        document.getElementById('filterContacts').classList.toggle('dont-Show');
        document.getElementById('filterContacts').focus()
    };
}
