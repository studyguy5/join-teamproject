

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