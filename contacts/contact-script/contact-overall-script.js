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


/**this event Listener executes the init function, the section check and pullls the contacts from firebase */
document.addEventListener('DOMContentLoaded', async () => {
    init();
    sectionCheck('contacts');
    contacts = await getObject(path = '/contacts');
    contactsArray = objectToArray(contacts);
    renderContactList(arraySorting(contactsArray), targetID = 'contactList');
});


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
    for (let index = 0; index < array.length; index++) {
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
    document.querySelector('.overlay-content').classList.add('Showed');

    // document.body.style.overflowY = 'hidden';
}



