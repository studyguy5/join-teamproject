let contacts;
let contactsArray;


document.addEventListener('DOMContentLoaded', async () => {
    init() 
    sectionCheck('contacts')
    contacts = await getObject(path = '/contacts')  
    contactsArray = objectToArray(contacts)
    renderContactList(arraySorting(contactsArray), targetID = 'contactList')
})


//validation functions
function formValidation() {
    const allInput = document.querySelectorAll('input');
    for (let index = 0; index < allInput.length; index++) {
        const boolean = contentCheck(allInput[index])
        if (!boolean) {
            if (index != 2) {
                getErrorLogic(allInput[index])

            } else {
                getErrorLogicIndex2(allInput[index])
            }
            return false
        } else {
            removeErrorMark(allInput[index])
        }
    }
    return true
}


function getErrorLogic(inputField) {
    inputField.setAttribute('placeholder', 'please write your ' + `${inputField.id}`)
    const errorContainer = inputField.closest('div');
    errorContainer.classList.add('input-empty')
    return
}


function getErrorLogicIndex2(inputField) {
    inputField.setAttribute('placeholder', 'please write your phone number ')
    const errorContainer = inputField.closest('div');
    errorContainer.classList.add('input-empty')
}


function removeErrorMark(inputField) {
    inputField.setAttribute('placeholder', `${inputField.id}`)
    const container = inputField.closest('div');
    container.classList.remove('input-empty')
}


//view and interactions functions
function contentCheck(inputField) {
    let booleansValue;
    const inputFieldvalue = inputField.value.trim()
    if (inputFieldvalue) {
        booleansValue = true
    } else {
        booleansValue = false
    }
    return booleansValue
}


function sectionCheck(idsecTrue) {
    document.getElementById(idsecTrue).classList.add('active')
}


function renderContactList(array, targetID = '') {
    document.getElementById(targetID).innerHTML = '';
    for (let index = 0; index < array.length - 1; index++) {
        document.getElementById(targetID).innerHTML += setContactList(array, index)
    }
}


function getContactsDetails(targetID = '', object, id = '') {
    document.getElementById(targetID).innerHTML = setContactDetails(object, id)
}


function getAddOverlayContent(targetID = '') {
    switchOverlayContentWithSlide(targetID, setAddOverlayContent())
}


async function getEditOverlayContent(targetID = '', contactId) {
    await switchOverlayContentWithSlide(targetID, setEditOverlayContent(contactId))
    showCurrentValue(contactId)
}


function showContactDetails(id) {
    selectedNameCheck(id);
    switchContentWithSlide(targetID = 'detailBody', id)
}


function selectedNameCheck(id) {
    document.querySelectorAll('.contact-name').forEach((divContainer) => {
        divContainer.classList.remove('selected')
    })
    document.getElementById(id).classList.add('selected')
}


function closeOverlay() {
    document.querySelector('.overlay').classList.remove('showed')
    document.body.style.overflowY = ''
}


function overlayShow() {
    document.querySelector('.overlay').classList.add('showed')
    document.getElementById('overlay-content').scrollIntoView({ behavior: "smooth", block: "center" })
    document.body.style.overflowY = 'hidden'
}


function scrollIntoView(id) {
    document.getElementById(id).scrollIntoView({ behavior: "smooth", block: "center" })
    showContactDetails(id)
}


async function showSuccessMessage(showIntervall, hideIntervall) {
    await setTimer(showIntervall)
    switchMessageContentWithSlide(targetQuerry = '.add-contact-success-box')
    await setTimer(hideIntervall)
    resetContentWithSlide(targetID = 'add-contact-success-box')
    return;
}


//data in general functions     targetObject = let contacts in Zeile 1
function objectToArray(contacts) {          
    const object = Object.entries(contacts) 
        console.log(object);
    const arrayObject = object.map((member) => {
        return {
            id: member[0],
            ...member[1]
        }
    })
    console.log(arrayObject);

    return arrayObject;
}


function arraySorting(array) {
    const sortedArray = array
    sortedArray.sort((memberA, memberB) => {
        return memberA.name.localeCompare(memberB.name)
    })
    return sortedArray
}


//animation-functions
async function switchContentWithSlide(targetID = '', id) {
    const container = document.getElementById(targetID)
    const slideOutAnimation = container.animate(transformArrayStart, animationAttributeObjectStart);
    await slideOutAnimation.finished;
    getContactsDetails(targetID, contacts, id = id)
    container.animate(transformArrayFinish, animationAttributeObjectFinish);
    return;
}


async function switchMessageContentWithSlide(targetQuerry = '') {
    const container = document.querySelector(targetQuerry)
    const slideOutAnimation = container.animate(transformArrayStart, animationAttributeObjectStart);
    await slideOutAnimation.finished;
    container.innerHTML = setSucessMessage()
    container.animate(transformArrayFinish, animationAttributeObjectFinish);
    return;
}


async function resetContentWithSlide(targetID = '') {
    const container = document.getElementById(targetID)
    const slideOutAnimation = container.animate(transformArrayStart, animationAttributeObjectStart);
    await slideOutAnimation.finished;
    document.getElementById(targetID).innerHTML = ''
    container.animate(transformArrayFinish, animationAttributeObjectFinish);
    return;
}


async function switchOverlayContentWithSlide(targetID = '', htmlContent) {
    const container = document.getElementById(targetID)
    const slideOutAnimation = container.animate(overlayTransformArrayStart, overlayAnimationAttributeObjectStart);
    await slideOutAnimation.finished;
    container.innerHTML = htmlContent
    container.animate(overlayTransformArrayFinish, overlayAnimationAttributeObjectFinish);
}


async function setTimer(time) {
    return new Promise((resolve) => {
        setTimeout(resolve, time)
    })
}


//API and DOM connections functions
function getObjectFromContactForm(nameId, emailId, phoneNumberId) {
    const name = document.getElementById(nameId).value.trim()   // method removes whitespace from both sides of a string.
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


// async function addContact(nameId, emailId, phoneNumberId) {
//     const validation = formValidation()
//     if (validation) {
//         const newContact = getObjectFromContactForm(nameId, emailId, phoneNumberId)
//         const newContactId = await postData(path = '/contacts', data = newContact)
//         await refreshContactList()
//         scrollIntoView(newContactId)
//         closeOverlay()
//         showSuccessMessage(500, 3000)
//     } else {
//         formValidation()
//     }
//     return
// }
async function addContact(nameId, emailId, phoneNumberId) {
    const validation = formValidation();
    if (!validation) return formValidation();

    const newContact = getObjectFromContactForm(nameId, emailId, phoneNumberId);
    const newContactId = await postData('/contacts', newContact);

    await refreshContactList();

    // wiederholtes prüfen bis es existiert
    waitForDOM(() => document.getElementById(newContactId))
        .then(() => scrollIntoView(newContactId));

    closeOverlay();
    showSuccessMessage(500, 3000);
}

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



async function refreshContactList() {
    contacts = await getObject(path = '/contacts')
    contactsArray = objectToArray(contacts)
    renderContactList(arraySorting(contactsArray), targetID = 'contactList')
    return
}


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


function showCurrentValue(id) {
    document.getElementById('name').value = contacts[id].name
    document.getElementById('email').value = contacts[id].email
    document.getElementById('phone').value = contacts[id].telefon
    return
}


async function deleteContact(id) {
    await deleteData(path = ('/contacts/' + `${id}`))
    await refreshContactList()
    await resetContentWithSlide(targetID = 'detailBody')
    return
}


/* --- dein vorhandener contact-overall-script.js Code bleibt komplett wie er ist --- */

/* ===================== USERNAME & INITIALEN (wie in summary) ===================== */
function getStoredUserName() {
  const name = localStorage.getItem('userFullName');
  if (name && name.trim()) return name.trim();
  if (sessionStorage.getItem('guest') === 'true') return 'Guest User';
  return 'User';
}


function getInitials(fullName) {
  const name = (fullName || '').trim().toLowerCase();
  // Wenn Gast-User, immer "G"!
  if (name === 'guest user' || name === 'guest') {
    return 'G';
  }
  const parts = name.split(/\s+/).filter(Boolean);
  if (!parts.length) return 'US';
  const first = parts[0][0] || '';
  const last = parts.length > 1 ? parts[parts.length - 1][0] : (parts[0][1] || '');
  return (first + last).toUpperCase();
}


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
