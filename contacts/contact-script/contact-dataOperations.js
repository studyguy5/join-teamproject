


/**
 * Scrolls to element and shows its details.
 * @param {string} id 
 */
function scrollIntoView(id) {
    document.getElementById(id).scrollIntoView({ behavior: "smooth", block: "center" });
    showContactDetails(id);
}


/**
 * Shows success message with timing animation.
 * @async
 * @param {number} showIntervall 
 * @param {number} hideIntervall 
 * @returns {Promise<void>}
 */
async function showSuccessMessage(showIntervall, hideIntervall) {
    await setTimer(showIntervall);
    switchMessageContentWithSlide(targetQuerry = '.add-contact-success-box');
    await setTimer(hideIntervall);
    resetContentWithSlide(targetID = 'add-contact-success-box');
    return;
}


/**
 * Converts a contacts object to an array with id properties.
 * @param {Object<string, Object>} contacts 
 * @returns {Array<Object>} Converted array of contacts.
 */
function objectToArray(contacts) {
    const object = Object.entries(contacts);
    const arrayObject = object.map((member) => {
        return {
            id: member[0],
            ...member[1]
        };
    });

    return arrayObject;
}


/**
 * Sorts contact array alphabetically by name.
 * @param {Array<Object>} array 
 * @returns {Array<Object>} Sorted array.
 */
function arraySorting(array) {
    const sortedArray = array;
    sortedArray.sort((memberA, memberB) => {
        return memberA.name?.localeCompare(memberB.name);
    });
    return sortedArray;
}

/**
 * Creates a timer that resolves after a given time.
 * @async
 * @param {number} time - Time to wait in milliseconds.
 * @returns {Promise<void>}
 */
async function setTimer(time) {
    return new Promise((resolve) => {
        setTimeout(resolve, time)
    })
}


/**
 * Collects contact form field values and converts them into an object.
 * @param {string} nameId - ID of the name input field.
 * @param {string} emailId - ID of the email input field.
 * @param {string} phoneNumberId - ID of the phone number input field.
 * @returns {Object} Contact data object.
 */
function getObjectFromContactForm(nameId, emailId, phoneNumberId) {
    const name = document.getElementById(nameId).value.trim()
    const email = document.getElementById(emailId).value.trim()
    const phoneNumber = document.getElementById(phoneNumberId).value.trim()
    let formJson = {
        "name": name,
        "email": email,
        "telefon": phoneNumber,
        "badgeColor": setBadgeColor(),
        "firstLetter": setFirstLetter(name),
        "secondFirstLetter": setSecondFirstLetter(name)
    }
    return formJson
}


/**
 * Creates a contact update object based on current input field values.
 * @param {string|number} id - ID of the contact to update.
 * @returns {Object} Updated contact data object.
 */
function getNewContactData(id) {
    const name = document.getElementById('nameEdit').value.trim();
    const email = document.getElementById('emailEdit').value.trim();
    const phoneNumber = document.getElementById('phoneEdit').value
    let formJson = {
        "name": name,
        "email": email,
        "telefon": phoneNumber,
        "badgeColor": contacts[id].badgeColor,
        "firstLetter": setFirstLetter(name),
        "secondFirstLetter": setSecondFirstLetter(name)
    }
    return formJson
}


/**
 * Adds a new contact after validation, posting data, refreshing the list, and animating the UI.
 * @async
 * @param {string} nameId - ID of the name input element.
 * @param {string} emailId - ID of the email input element.
 * @param {string} phoneNumberId - ID of the phone input element.
 * @returns {Promise<void>}
 */
async function addContact(nameId, emailId, phoneNumberId) {
    // const validation = formValidation();
    // if (!validation) return formValidation();

    const newContact = getObjectFromContactForm(nameId, emailId, phoneNumberId);
    const newContactId = await postData('/contacts', newContact);

    await refreshContactList();

    waitForDOM(() => document.getElementById(newContactId))
        .then(() => scrollIntoView(newContactId));

    closeOverlay();
    showSuccessMessage(1000, 1000);
}


/**
 * Waits until a DOM condition is met (polling every 20ms).
 * @param {Function} checkFn - Function that returns truthy when the DOM is ready.
 * @returns {Promise<void>}
 */
function waitForDOM(checkFn) {
    return new Promise(resolve => {
        const interval = setInterval(() => {
            if (checkFn()) {
                clearInterval(interval);
                resolve();
            }
        }, 20);
    });
}


/**
 * Fetches the contact list and refreshes the UI.
 * @async
 * @returns {Promise<void>}
 */
async function refreshContactList() {
    contacts = await getObject(path = '/contacts')
    contactsArray = objectToArray(contacts)
    renderContactList(arraySorting(contactsArray), targetID = 'contactList')
    return
}


/**
 * Saves changes to a contact after validation and updates the UI.
 * @async
 * @param {string|number} id - ID of the contact being saved.
 * @returns {Promise<void>}
 */
async function saveChanges(id) {

    if (formValidationEdit()) {
        const savedContact = getNewContactData(id)
        await putData(path = ('/contacts/' + `${id}`), data = savedContact)
        await refreshContactList()
        showContactDetails(id)
        closeOverlay()
    }
    // } else {
    //     formValidationEdit()
    // }
    return
}


/**
 * Fills input fields with existing contact data.
 * @param {string|number} id - ID of the contact.
 * @returns {void}
 */
function showCurrentValue(id) {
    document.getElementById('nameEdit').value = contacts[id].name
    document.getElementById('emailEdit').value = contacts[id].email
    document.getElementById('phoneEdit').value = contacts[id].telefon
    return
}


/**
 * Deletes a contact, refreshes the list, and resets the detail view.
 * @async
 * @param {string|number} id - ID of the contact to delete.
 * @returns {Promise<void>}
 */
async function deleteContact(id) {
    await deleteData(path = ('/contacts/' + `${id}`))
    await refreshContactList()
    await resetContentWithSlide(targetID = 'detailBody')
    let resp = window.innerWidth;
    if (resp > 780) {
    } else {
        closeContactOverlay();
        return
    }
}


/**
 * Retrieves the stored username from local or session storage.
 * @returns {string} The determined username.
 */
function getStoredUserName() {
    const name = localStorage.getItem('userFullName');
    if (name && name.trim()) return name.trim();
    if (sessionStorage.getItem('guest') === 'true') return 'Guest User';
    return 'User';
}


/**
 * Extracts initials from a full name.
 * @param {string} fullName - Full name to extract initials from.
 * @returns {string} Initials in uppercase.
 */
function getInitials(fullName) {
    const name = (fullName || '').trim().toLowerCase();

    if (name === 'guest user' || name === 'guest') {
        return 'G';
    }
    const parts = name.split(/\s+/).filter(Boolean);
    if (!parts.length) return 'US';
    const first = parts[0][0] || '';
    const last = parts.length > 1 ? parts[parts.length - 1][0] : (parts[0][1] || '');
    return (first + last).toUpperCase();
}


/**
 * Renders the user's initials into the UI.
 * Sets aria-label and title for accessibility.
 * @returns {void}
 */
window.renderUserInitials = function renderUserInitials() {
    const fullName = getStoredUserName();
    const initials = getInitials(fullName);
    const el = document.getElementById('userInitials');
    if (el) {
        el.textContent = initials;
        el.setAttribute('title', fullName);
        el.setAttribute('aria-label', fullName);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    try { renderUserInitials(); } catch (e) { }
});