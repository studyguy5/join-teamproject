

let normalContactsArray = [];

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


function setOnCheckedPopupNormal(choContact) {
  choContact.classList.remove('checkbox')
  choContact.classList.add('checked')
  choContact.src = "/img/icons/normalCheckedContact.svg"
  let name = choContact.dataset.set
  normalContactsArray.push(name);
}


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


function setOnCheckedPopupFilter(choContactF) {
  choContactF.classList.remove('checkbox')
  choContactF.classList.add('checked')
  choContactF.src = "/img/icons/normalCheckedContact.svg";
  let name = choContactF.dataset.set
  filteredContactsArray.push(name);
}


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

function openContactWindow(contactDrop){
  contactDrop.classList.remove('availibleContactsClose');
        contactDrop.classList.add('availableContactsOpen');
        let layer = document.getElementById('hiddenlayer2')
        layer.classList.toggle('hiddenlayer2')
}

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

function showInputFilter() {
    if (document.getElementById('placeholderpTagEdit')) {
        document.getElementById('placeholderpTagEdit').classList.toggle('dont-Show');
        document.getElementById('filterContactsEdit').classList.toggle('dont-Show');
        document.getElementById('filterContactsEdit').focus()
    };
}


/**renders the Contacts in Edit Mode DropDown */
function showContactsEdit(id) {
    const thisT = tasks.find(task => task[1].id === id);
    thisT[1].assignedTo.forEach((item) => normalContactEditModeArray.push(item));
    let preselectedEdit = normalContactEditModeArray.concat(filteredContactEditModeArray);
    let contacts = document.getElementById('IdForContactsEdit')
    contacts.innerHTML = "";
    for (let index = 0; index < contactsArray.length; index++) {
        contacts.innerHTML += renderContactsInEditDropDown(id, contactsArray, index, preselectedEdit);
    }
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
