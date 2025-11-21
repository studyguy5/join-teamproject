/**
 * Global contacts object retrieved from backend.
 * @type {Object.<string, any>}
 */
let contacts;


/**
 * Contacts converted into an array format.
 * @type {Array.<Object>}
 */
let contactsArray;



document.addEventListener('DOMContentLoaded', async () => {
    init();
    sectionCheck('contacts');
    contacts = await getObject(path = '/contacts');
    contactsArray = objectToArray(contacts);
    renderContactList(arraySorting(contactsArray), targetID = 'contactList');
});


/**
 * Validates all input fields in the form.
 * @returns {boolean} Returns true if all inputs are valid.
 */
// function formValidation() {
//     const allInput = document.querySelectorAll('input');
//     for (let index = 0; index < allInput.length; index++) {
//         const boolean = contentCheck(allInput[index]);
//         if (!boolean) {
//             if (index != 2) {
//                 getErrorLogic(allInput[index]);
//             } else {
//                 getErrorLogicIndex2(allInput[index]);
//             }
//             return false;
//         } else {
//             removeErrorMark(allInput[index]);
//         }
//     }
//     return true;
// }
function formValidation() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');

    if (!validateName(name.value)) return getErrorLogic(name), false;
    removeErrorMark(name);

    if (!validateEmail(email.value)) return getErrorLogic(email), false;
    removeErrorMark(email);

    if (!validatePhone(phone.value)) return getErrorLogic(phone), false;
    removeErrorMark(phone);

    return true;
}

function validateName(value) {
    const regex = /^[A-Za-zÄÖÜäöüß\s]+$/;
    return regex.test(value.trim());
}
function validateEmail(value) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value.trim());
}
function validatePhone(value) {
    const regex = /^[0-9]{3,20}$/;
    return regex.test(value.trim());
}











/**
 * Sets placeholder and marks input as empty.
 * @param {HTMLInputElement} inputField 
 */
function getErrorLogic(inputField) {
    inputField.setAttribute('placeholder', 'please write your ' + `${inputField.id}`);
    const errorContainer = inputField.closest('div');
    errorContainer.classList.add('input-empty');
    return;
}


/**
 * Error logic specifically for index 2 (phone number).
 * @param {HTMLInputElement} inputField 
 */
function getErrorLogicIndex2(inputField) {
    inputField.setAttribute('placeholder', 'please write your phone number ');
    const errorContainer = inputField.closest('div');
    errorContainer.classList.add('input-empty');
}


/**
 * Removes error styling and restores placeholder.
 * @param {HTMLInputElement} inputField 
 */
function removeErrorMark(inputField) {
    inputField.setAttribute('placeholder', `${inputField.id}`);
    const container = inputField.closest('div');
    container.classList.remove('input-empty');
}


/**
 * Checks if an input field has content.
 * @param {HTMLInputElement} inputField 
 * @returns {boolean} Whether the field contains non-empty content.
 */
function contentCheck(inputField) {
    let booleansValue;
    const inputFieldvalue = inputField.value.trim();
    if (inputFieldvalue) {
        booleansValue = true;
    } else {
        booleansValue = false;
    }
    return booleansValue;
}


/**
 * Adds 'active' class to selected section.
 * @param {string} idsecTrue 
 */
function sectionCheck(idsecTrue) {
    document.getElementById(idsecTrue).classList.add('active');
}


/**
 * Renders the contact list.
 * @param {Array<Object>} array 
 * @param {string} targetID 
 */
function renderContactList(array, targetID = '') {
    document.getElementById(targetID).innerHTML = '';
    for (let index = 0; index < array.length - 1; index++) {
        document.getElementById(targetID).innerHTML += setContactList(array, index);
    }
}


/**
 * Injects contact details into target container.
 * @param {string} targetID 
 * @param {Object} object 
 * @param {string} id 
 */
function getContactsDetails(targetID = '', object, id = '') {
    document.getElementById(targetID).innerHTML = setContactDetails(object, id);
}


/**
 * Shows Add Contact overlay content.
 * @param {string} targetID 
 */
function getAddOverlayContent(targetID = '') {
    switchOverlayContentWithSlide(targetID, setAddOverlayContent());
}


/**
 * Shows Edit Contact overlay content.
 * @async
 * @param {string} targetID 
 * @param {string} contactId 
 */
async function getEditOverlayContent(targetID = '', contactId) {
    await switchOverlayContentWithSlide(targetID, setEditOverlayContent(contactId));
    showCurrentValue(contactId);
}


/**
 * Shows contact details and highlights selection.
 * @param {string} id 
 */
function showContactDetails(id) {
    selectedNameCheck(id);
    switchContentWithSlide(targetID = 'detailBody', id);
}


/**
 * Highlights selected contact name.
 * @param {string} id 
 */
function selectedNameCheck(id) {
    document.querySelectorAll('.contact-name').forEach((divContainer) => {
        divContainer.classList.remove('selected');
    });
    document.getElementById(id).classList.add('selected');
}


/**
 * Closes overlay window.
 */
function closeOverlay() {
    document.querySelector('.overlay').classList.remove('showed');
    document.body.style.overflowY = '';
}


/**
 * Opens overlay window and scrolls into view.
 */
function overlayShow() {
    document.querySelector('.overlay').classList.add('showed');
    document.getElementById('overlay-content').scrollIntoView({ behavior: "smooth", block: "center" });
    document.body.style.overflowY = 'hidden';
}


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
        return memberA.name.localeCompare(memberB.name);
    });
    return sortedArray;
}


/**
 * Slides content out, updates details, then slides back in.
 * @async
 * @param {string} targetID 
 * @param {string} id 
 */
async function switchContentWithSlide(targetID = '', id) {
    const container = document.getElementById(targetID);
    const slideOutAnimation = container.animate(transformArrayStart, animationAttributeObjectStart);
    await slideOutAnimation.finished;
    getContactsDetails(targetID, contacts, id = id);
    container.animate(transformArrayFinish, animationAttributeObjectFinish);
    return;
}


/**
 * Switches the message content inside a container using slide-out and slide-in animations.
 * @async
 * @param {string} [targetQuerry=''] - CSS selector of the target container.
 * @returns {Promise<void>}
 */
async function switchMessageContentWithSlide(targetQuerry = '') {
    const container = document.querySelector(targetQuerry)
    const slideOutAnimation = container.animate(transformArrayStart, animationAttributeObjectStart);
    await slideOutAnimation.finished;
    container.innerHTML = setSucessMessage()
    container.animate(transformArrayFinish, animationAttributeObjectFinish);
    return;
}


/**
 * Resets the content of an element using a slide animation.
 * @async
 * @param {string} [targetID=''] - ID of the target element.
 * @returns {Promise<void>}
 */
async function resetContentWithSlide(targetID = '') {
    const container = document.getElementById(targetID)
    const slideOutAnimation = container.animate(transformArrayStart, animationAttributeObjectStart);
    await slideOutAnimation.finished;
    document.getElementById(targetID).innerHTML = ''
    container.animate(transformArrayFinish, animationAttributeObjectFinish);
    return;
}


/**
 * Replaces content inside an overlay with slide-out and slide-in animations.
 * @async
 * @param {string} [targetID=''] - ID of the overlay container.
 * @param {string} htmlContent - HTML content to inject into the container.
 * @returns {Promise<void>}
 */
async function switchOverlayContentWithSlide(targetID = '', htmlContent) {
    const container = document.getElementById(targetID)
    const slideOutAnimation = container.animate(overlayTransformArrayStart, overlayAnimationAttributeObjectStart);
    await slideOutAnimation.finished;
    container.innerHTML = htmlContent
    container.animate(overlayTransformArrayFinish, overlayAnimationAttributeObjectFinish);
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
    const name = document.getElementById('name').value.trim()
    const email = document.getElementById('email').value.trim()
    const phoneNumber = document.getElementById('phone').value.trim()
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
    const validation = formValidation();
    if (!validation) return formValidation();

    const newContact = getObjectFromContactForm(nameId, emailId, phoneNumberId);
    const newContactId = await postData('/contacts', newContact);

    await refreshContactList();

    waitForDOM(() => document.getElementById(newContactId))
        .then(() => scrollIntoView(newContactId));

    closeOverlay();
    showSuccessMessage(500, 3000);
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
    const validation = formValidation()
    if (validation) {
        const savedContact = getNewContactData(id)
        await putData(path = ('/contacts/' + `${id}`), data = savedContact)
        await refreshContactList()
        showContactDetails(id)
        closeOverlay()
    } else {
        formValidation()
    }
    return
}


/**
 * Fills input fields with existing contact data.
 * @param {string|number} id - ID of the contact.
 * @returns {void}
 */
function showCurrentValue(id) {
    document.getElementById('name').value = contacts[id].name
    document.getElementById('email').value = contacts[id].email
    document.getElementById('phone').value = contacts[id].telefon
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
    return
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
  try { renderUserInitials(); } catch (e) {}
});
