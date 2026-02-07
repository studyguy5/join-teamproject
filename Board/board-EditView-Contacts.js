


let normalContactEditModeArray = [];
let filteredContactEditModeArray = [];
/**shows the non-filtered choosen Contacts in the list */
function chooseContactEdit(id, index) {
    let choContact = document.getElementById(`checkboxImgEdit-${index}`)
    if (choContact.classList.contains("checkboxEdit")) {
        choContact.classList.remove('checkboxEdit')
        choContact.classList.add('checkedEdit')
        choContact.src = "/img/icons/normalCheckedContact.svg"
        let name = choContact.dataset.set
        normalContactEditModeArray.push(name);
        processCurrentContactEdit(id, index);
    } else {
        choContact.classList.add('checkboxEdit')
        choContact.classList.remove('checkedEdit')
        let name = choContact.dataset.set;
        const indexToRemove = normalContactEditModeArray.indexOf(name);
        if (indexToRemove !== -1) {
            normalContactEditModeArray.splice(indexToRemove, 1);
        }
        processCurrentContactEdit(id, index);
        choContact.src = "/img/icons/normalCheckContact.svg"
    }
}


function processCurrentContactEdit(id) {
    let combo = normalContactEditModeArray.concat(filteredContactEditModeArray);
    console.log(combo.length);
    if ((combo.length) > 6) {
        document.getElementById('countInfoEdit').innerHTML = `+ ${(combo.length) - 6}`}
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
        choContactFilter.classList.remove('checkboxEdit')
        choContactFilter.classList.add('checkedEdit')
        choContactFilter.src = "/img/icons/normalCheckedContact.svg"
        let name = choContactFilter.dataset.set
        filteredContactEditModeArray.push(name); 
        processCurrentContactEdit(id, filterContactIndex);
    } else {
        choContactFilter.classList.add('checkboxEdit')
        choContactFilter.classList.remove('checkedEdit')
        let name = choContact.dataset.set;
        const indexToRemove = filteredContactEditModeArray.indexOf(name);
        if (indexToRemove !== -1) {
            filteredContactEditModeArray.splice(indexToRemove, 1);
        }
        processCurrentContactEdit(id, filterContactIndex);
        choContactFilter.src = "/img/icons/normalCheckContact.svg"
    }
}