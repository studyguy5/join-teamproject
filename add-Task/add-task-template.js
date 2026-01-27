/**
 * Generates an HTML template string for a task element.
 *
 * @param {Object} element - The task object containing task details.
 * @param {number} element.id - The unique identifier of the task.
 * @param {string} element.taskType - The type/category of the task.
 * @param {string} element.title - The title of the task.
 * @param {string} element.description - The description of the task.
 * @param {Array} [element.subtasks] - An optional array of subtasks.
 * @param {number} [element.progress] - The progress of subtasks, used for the progress bar width.
 * @param {string} element.prio - The priority of the task ("Urgent", "Medium", "Low").
 * @param {string} taskOption - A string representing additional CSS class for the task type.
 * @returns {string} HTML string representing the task element.
 */
function taskTemplate(element, taskOption){
    return `<div draggable="true" ondragstart="startDragging(${element['id']})" 
    id="TaskDiv" onclick="bigViewOfTask(${element.id}); renderContactForBigView(${element.id}); renderEditAndDeleteButton(${element.id})" class="TaskDiv">
    <div id="taskType" class="${taskOption}">${element.taskType}</div>
    <div class="taskTitle"><p>${element.title}</p></div>
    <div class="taskDescription"><p>${element.description}</p></div>
    <div class="subTasks">
    ${element.subtasks != null ? `
    <svg role="progress subtask">
    <rect  width="128" height="8"  class="back"/>
    <rect  width="${element.progress}" height="8" class="fill"/>
    </svg>
    <p class="progressDescription">${(element.progress / 128) * (element.subtasks.length)}/${(element.subtasks.length)} Subtasks </p>` : ''}
    </div>
    <div id="contacts-Priority-Container" class="contacts-Priority-Container" >
    <div id="${element.id}" class="contactsMiniView"></div>
    <div class="taskPriority">${element.prio == 'Urgent' ?
            `<img src="/img/icons/urgent.svg">` :
            element.prio == 'Medium' ?
                `<img src="/img/icons/medium.svg">` :
                element.prio == 'Low' ?
                    `<img src="/img/icons/low.svg">` : ''}</div>
        </div>
        <div></div>
        </div>`
}


/**
 * Renders the contact list in the normal view.
 */
function showContacts() {
    let contacts = document.getElementById('IdForContactsNormal')
    contacts.innerHTML = "";
    for (let index = 1; index < contactsArray.length; index++) {
        contacts.innerHTML += `<div onclick="chooseContactNormal(${index})" class="contactBox">
        <div class="contactCircleNormal">${contactsArray[index].firstLetter + contactsArray[index].secondFirstLetter}</div>
        <span for="contactName" class="contactName"> ${contactsArray[index].name}</span> 
        <img  id="checkboxImg-${index}"  class="checkbox" data-set="${contactsArray[index].name}" src="/img/icons/normalCheckContact.svg">
        </div>`
    }
}


/**
 * Renders filtered contacts in the normal view.
 * @param {Array<Object>} filteredContacts - Array of filtered contact objects.
 */
function renderfilteredContactsInNormal(filteredContacts) {
    let filtContactInPopup = document.getElementById('IdForContactsNormal')
    filtContactInPopup.innerHTML = "";
    for (let filterContactIndex = 0; filterContactIndex < filteredContacts.length; filterContactIndex++) {
        filtContactInPopup.innerHTML += `
   <div onclick="" class="contactBox">
        <div class="contactCircleNormal">${filteredContacts[filterContactIndex].firstLetter + filteredContacts[filterContactIndex].secondFirstLetter}</div>
        <span for="contactName" class="contactName"> ${filteredContacts[filterContactIndex].name}</span> 
        <img  id="checkboxImg-${filterContactIndex}" onclick="chooseFilteredContactNormal(${filterContactIndex})" class="checkbox" data-set="${filteredContacts[filterContactIndex].name}" src="/img/icons/normalCheckContact.svg">
        </div>
   `}
}

/**
 * Renders a chosen contact (normal view) as a circle.
 * @param {number} index - Contact index.
 */
function renderChoosenContactNormal(index) {
    let listContact = document.getElementById('choosenContacts')

    listContact.innerHTML += `
    <div id="contactCircleNormalRender-${index}" class="contactCircleNormalRender">${contactsArray[index].firstLetter + contactsArray[index].secondFirstLetter}</div>
    `
}


/**
 * Renders a chosen filtered contact.
 * @param {number} filterContactIndex - Filtered contact index.
 */
function renderFilteredChoosenContactNormal(filterContactIndex) {
    let listContact = document.getElementById('choosenContacts')

    listContact.innerHTML += `
    <div id="contactCircleNormalRender-${filterContactIndex}" class="contactCircleNormalRender">${filteredContacts[filterContactIndex].firstLetter + filteredContacts[filterContactIndex].secondFirstLetter}</div>
    `
}