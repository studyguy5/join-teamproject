

let categorys = ['Todo', 'Inprogress', 'AwaitFeedback', 'Done'];

/**
 * Stores the selected priority.
 * @type {Array.<string>}
 */
let prioArray = ['Medium'];


/**
 * IDs of task input containers.
 * @type {Array.<string>}
 */
let taskContainerArray = ['title-add-task', 'task-description', 'date-add-task'];


/**
 * Keys used for creating a task object.
 * @type {Array.<string>}
 */
let taskObjectKey = ['title', 'description', 'DueDate'];


/**
 * Base URL for Firebase Realtime Database.
 * @type {Array.<string>}
 */
const BASe_URL = "https://join-kanban-app-default-rtdb.europe-west1.firebasedatabase.app/"


document.addEventListener('DOMContentLoaded', async () => {
    /**
     * Initializes page content after DOM is loaded.
     * Loads contacts from database and displays them.
     */
    init();
    contacts = await getObject(path = '/contacts')
    contactsArray = objectToArray(contacts)
    showContacts();
    sectionCheck('add-task')
    const buttons = document.querySelectorAll(".priority-section button");
    let createdArray = Array.from(buttons)
    createdArray[1].classList.add('Medium')


    /**
     * Adds the 'active' class to a section by ID.
     * @param {string} idsecTrue - ID of the section to activate.
     */
    function sectionCheck(idsecTrue) {
        document.getElementById(idsecTrue).classList.add('active')
    }


})


/**
 * All priority selection buttons.
 * @type {NodeListOf<HTMLButtonElement>}
 */
const buttons = document.querySelectorAll(".priority-section button");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        /**
         * Handles visual priority selection and stores the chosen priority.
         */
        buttons.forEach(b => b.classList.remove("Urgent", "Medium", "Low"));
        const priority = button.dataset.priority;
        button.classList.add(priority);
        prioArray[0] = priority;
    });
});


/**
 * Fetches and returns an object from Firebase.
 * @async
 * @param {string} [path=''] - Database path.
 * @returns {Promise<Object>} The retrieved data.
 */
async function getObject(path = '') {
    let response = await fetch(BASe_URL + path + ".json")
    return responseToJson = await response.json()
}


/**
 * Converts a Firebase contacts object into an array.
 * @param {Object} contacts - Contacts object.
 * @returns {Array<Object>} Array of contact objects with IDs.
 */
function objectToArray(contacts) {
    const object = Object.entries(contacts)
    const arrayObject = object.map((member) => {
        return {
            id: member[0],
            ...member[1]
        }
    })
    return arrayObject;
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
 * Toggles the input field for filtering contacts in the normal view.
 */
function showInputNormal() {
    if (document.getElementById('placeholderptag')) {
        document.getElementById('placeholderptag').classList.toggle('dont-Show');
        document.getElementById('filterContactsNormal').classList.toggle('dont-Show');
        document.getElementById('filterContactsNormal').focus()
    };
}


/**
 * Opens or closes the contact dropdown list in the normal view.
 */
function openContactViewNormal() {
    let contactDrop = document.getElementById('IdForContactsNormal')
    if (contactDrop.classList.contains('availibleContactsClose')) {
        contactDrop.classList.remove('availibleContactsClose');
        contactDrop.classList.add('availibleContactsOpen');
    } else if (contactDrop.classList.contains('availibleContactsOpen')) {
        contactDrop.classList.remove('availibleContactsOpen');
        contactDrop.classList.add('availibleContactsClose');
    }

    if (document.querySelectorAll('availibleContactsOpen')) {
        let contact = document.getElementById('arrowImgC')
        contact.classList.toggle('select-arrow-open')
    }
}


/**
 * Toggles selection of a contact in the normal view.
 * @param {number} index - Contact index.
 */
function chooseContactNormal(index) {
    let choContact = document.getElementById(`checkboxImg-${index}`)
    if (choContact.classList.contains('checkbox')) {
        choContact.classList.remove('checkbox')
        choContact.classList.add('checked')
        let count = document.querySelectorAll('.contactBox .checked')
        if ((count.length) > 6) {
            deleteONETime = true;
            document.getElementById('countInfo').innerHTML = `+ ${(count.length) - 6}`
        } else {
            renderChoosenContactNormal(index);
            choContact.src = "/img/icons/normalCheckedContact.svg"
        }
    } else {
        choContact.classList.add('checkbox')
        choContact.classList.remove('checked')
        deleteRenderedContactNormal(index);
        choContact.src = "/img/icons/normalCheckContact.svg"
    }
}


/**
 * Toggles selection of a filtered contact.
 * @param {number} filterContactIndex - Index of filtered contact.
 */
function chooseFilteredContactNormal(filterContactIndex) {
    let choContact = document.getElementById(`checkboxImg-${filterContactIndex}`)
    if (choContact.classList.contains('checkbox')) {
        choContact.classList.remove('checkbox')
        choContact.classList.add('checked')
        let countFilter = document.querySelectorAll('.contactBox .checked')
        if ((countFilter.length) > 6) {
            deleteONETime = true;
            document.getElementById('countInfo').innerHTML = `+ ${(countFilter.length) - 6}`
        } else {
            renderFilteredChoosenContactNormal(filterContactIndex)
            choContact.src = "/img/icons/normalCheckedContact.svg"
        }
    } else {
        choContact.classList.add('checkbox')
        choContact.classList.remove('checked')
        deleteRenderedContactNormal(filterContactIndex);
        choContact.src = "/img/icons/normalCheckContact.svg"
    }
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

let deleteONETime = true;
/**
 * Removes a rendered chosen contact circle.
 * @param {number} index - Contact index.
 */
function deleteRenderedContactNormal(index) {
    let countedInNormal = document.querySelectorAll('.contactBox .checked')
    if (countedInNormal.length > 6) {
        countedInNormal.length - 1
        document.getElementById('countInfo').innerHTML = `+ ${(countedInNormal.length) - 6}`;
    } else if (countedInNormal.length <= 6 && deleteONETime && document.getElementById('countInfo').innerHTML != "") {
        document.getElementById('countInfo').innerHTML = ""; deleteONETime = false;
    } else {
        let renderedContact = document.getElementById(`contactCircleNormalRender-${index}`)
        renderedContact.remove(`contactCircleNormalRender-${index}`)
        renderedContact.innerHTML = '';
    }
}


/**
 * Adds click listeners to task option elements and sets the chosen value.
 */
function chooseValueNormal() {
    let choise = document.querySelectorAll('.taskOption')

    choise.forEach(b => b.addEventListener('click', () => {
        const choiseOfTask = b.dataset.value
        document.getElementById('selectedTaskNormal').innerHTML = choiseOfTask;
        document.getElementById('UserFeedbackTaskType').innerHTML = "";
    }))
}


/**
 * Validates form data and creates a task. 
 * Shows a popup and redirects to the board page.
 * @returns {void}
 */
function showSuccessMessage() {
    const popup = document.getElementById("report");
    popup.classList.add("show");

    setTimeout(() => {
        window.location.href = "../board/board.html";
    }, 3500);

    setTimeout(() => {
        popup.classList.remove("show");
    }, 2250);
    document.getElementById('creatButtonIDNormal').disabled = false;
}


/** @type {HTMLElement | null} */
const categoryDiv = document.getElementById("IdForTaskChoiseNormal");
/** @type {HTMLElement | null} */
const options = document.querySelectorAll("#dropIdNormal .taskOption");
/** @type {HTMLElement | null} */
const hiddenInput = document.getElementById("categoryValue");
/** @type {HTMLElement | null} */
const selectedTask = document.getElementById("selectedTaskNormal");

/**
 * Handles selection of task category options.
 */
// options.forEach(opt => {
//     opt.addEventListener("click", () => {
//         selectedTask.textContent = opt.dataset.value;
//         hiddenInput.value = opt.dataset.value;
//         document.getElementById("dropIdNormal").classList.remove("dropTasktypeOpen");
//     });
// });


/**
 * Validates required fields for task creation.
 * @returns {boolean} True if valid, otherwise false.
 */
function commonConstantCheck() {
    const title = document.getElementById("title-add-task").value;
    const dueDate = document.getElementById("date-add-task").value;
    const taskType = document.getElementById("selectedTaskNormal").innerText;
    if (title === "" && dueDate === "" && taskType === "Select Task Category") {
        document.getElementById("UserFeedbackTitle").innerHTML = `This Field is required`;
        document.getElementById("UserFeedbackDate").innerHTML = `This Field is required`;
        document.getElementById("UserFeedbackTaskType").innerHTML = `This Field is required`;
    }
    if (title === "" && dueDate === "") {
        document.getElementById("UserFeedbackTitle").innerHTML = `This Field is required`;
        document.getElementById("UserFeedbackDate").innerHTML = `This Field is required`;
    } else if (dueDate === "" && taskType === 'Select Task Category') {
        document.getElementById("UserFeedbackDate").innerHTML = `This Field is required`;
        document.getElementById("UserFeedbackTaskType").innerHTML = `This Field is required`;
    } else if (title === "" && taskType === 'Select Task Category') {
        document.getElementById("UserFeedbackTitle").innerHTML = `This Field is required`;
        document.getElementById("UserFeedbackTaskType").innerHTML = `This Field is required`;
    } else if (taskType === 'Select Task Category') {
        document.getElementById("UserFeedbackTaskType").innerHTML = `This Field is required`;
    } else if (title === '') {
        document.getElementById("UserFeedbackTitle").innerHTML = `This Field is required`;
    } else if (dueDate === '') {
        document.getElementById("UserFeedbackDate").innerHTML = `This Field is required`;
    } else {
        getTaskInformationNormal();
        document.getElementById('creatButtonIDNormal').disabled = true;
        showSuccessMessage();
    }
}

function commonUserFeedback() {
    document.getElementById("UserFeedbackTitle").innerHTML = `This Field is required`;
    document.getElementById("UserFeedbackDate").innerHTML = `This Field is required`;
}


/**
 * Continuously checks form inputs and enables the create button when valid.
 * @returns {void}
 */
function constantCheckTitle() {
    const title = document.getElementById("title-add-task").value;
    if (title.length < 2)
        return showUserFeedbackTitle(title);
    document.getElementById('task-description').disabled = true, false;
    document.getElementById("UserFeedbackTitle").innerHTML = "";
    document.getElementById('task-description').disabled = false;

    if (!validateTitleAddTaskNormal(title))
        return showUserFeedbackTitleForm(title);
    document.getElementById('task-description').disabled = true, false;
    document.getElementById("UserFeedbackTitle").innerHTML = "";
    document.getElementById('task-description').disabled = false;

}

let attribute = true;

function constantCheckDate() {
    const dueDate = document.getElementById("date-add-task").value;
    let current = new Date();
    let dateOb = new Date(dueDate);
    if (dateOb < current) {
        const dateField = document.getElementById("UserFeedbackDate");
        dateField.innerHTML = `Date is in the past`;
    }
    else if (!validateDateAddTaskNormal(dueDate)) {
        return showUserFeedbackDueDate();
    }
    else if (validateDateAddTaskNormal(dueDate)) {
        document.getElementById('creatButtonIDNormal').disabled = false;
        clearUserFeedback = document.getElementById("UserFeedbackDate");
        clearUserFeedback.innerHTML = '';
    }

}

function validateTitleAddTaskNormal(title) {
    const titleRegex = /^[A-Za-zÄÖÜäöüß\s]+$/;
    return titleRegex.test(title.trim());
}

function validateDateAddTaskNormal(dueDate) {
    let dateOb = new Date(dueDate);
    return isDateValid(dateOb);
}

function isDateValid(dateOb) {
    return !isNaN(new Date(dateOb));
}



/** @type {any[]} */
let filteredContacts;

/**
 * Filters contact list based on typed input in normal mode.
 * @returns {void}
 */
function filterContactsInNormal() {
    let r;
    let typedValue = document.getElementById('filterContactsNormal').value
    if (typedValue.length > 0) {
        let val = Object.values(contactsArray);
        r = val.slice(1)
        filteredContacts = r.filter(fn => { return fn.name.toLowerCase().includes(typedValue.toLowerCase()) })
        renderfilteredContactsInNormal(filteredContacts);
    } else if (typedValue.length < 1) {
        showContacts();
    }
}


/**
 * Displays required field messages for task creation form.
 * @returns {void}
 */
function showUserFeedbackTitle() {
    const titleUserFeedbackLength = document.getElementById("UserFeedbackTitle");
    titleUserFeedbackLength.innerHTML = `title is too short`;
}

function showUserFeedbackTitleForm() {
    const titleUserFeedbackForm = document.getElementById("UserFeedbackTitle");
    titleUserFeedbackForm.innerHTML = `form of Title is incorrect`
}

function showUserFeedbackDueDate() {
    const dateInput = document.getElementById("UserFeedbackDate");
    dateInput.innerHTML = `form of DueDate is incorrect`;
    const categoryInput = document.getElementById("categoryValue");

}


/**
 * Sends data to backend via POST request.
 * @param {string} path - Backend path
 * @param {object} data - Data to send
 * @returns {Promise<string>} Firebase ID or created object name
 */
async function postData(path = '', data = {}) {
    let response = await fetch(BASe_URL + path + ".json", {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(data)
    });
    let responseToJson = await response.json();
    return responseToJson.name
}


let index0 = 0;
let index1 = 1;
let index2 = 2;
let index3 = 3;
let index4 = 4;
let index5 = 5;

let subtaskvalue1;
let subtaskvalue2;
let subtaskvalue3;
let subtaskvalue4;
let subtaskvalue5;
let subtaskvalue6;

/**
 * Toggles the task-type dropdown menu.
 * @returns {void}
 */
function openTaskTypeDropDownNormal() {
    let arrow = document.getElementById('arrowImgNormal')
    arrow.classList.toggle('select-arrow-open')
    let drop = document.getElementById('dropIdNormal')
    if (drop.classList.contains('dropTasktypeClose')) {
        drop.classList.remove('dropTasktypeClose')
    } else {
        drop.classList.add('dropTasktypeClose')
    }
}


/**
 * Handles closing dropdowns when clicking outside.
 */
document.addEventListener('click', (e) => {
    const contactBox = document.getElementById('IdForContactsNormal');
    const contactTrigger = document.querySelector('.section-right-select');
    const categoryDrop = document.getElementById('dropIdNormal');
    const categoryTrigger = document.getElementById('IdForTaskChoiseNormal');


    if (!contactTrigger.contains(e.target) && !contactBox.contains(e.target)) {
        contactBox.classList.add('availibleContactsClose');
        contactBox.classList.remove('availibleContactsOpen');
        document.getElementById('placeholderptag').classList.remove('dont-Show');
        document.getElementById('filterContactsNormal').classList.add('dont-Show');
    }


    if (!categoryTrigger.contains(e.target) && !categoryDrop.contains(e.target)) {
        categoryDrop.classList.add('dropTasktypeClose');
        document.getElementById('arrowImgNormal').classList.remove('select-arrow-open');
    }
});


/**
 * Creates a default task template.
 * @returns {object} New task object
 */
function createTemplate() {
    return {
        'category': `Todo`,
        'id': '',
        'taskType': '',
        'title': '',
        'description': '',
        'DueDate': '',
        'prio': '',
        'progress': '0',
        'cid': [
        ],
        'assignedTo': [
        ],
        'subtasks': [
        ]
    }
}


/**
 * Pushes up to two subtask objects into the global subtask array.
 * @param {string} subtaskvalue1 - First subtask value
 * @param {string} subtaskvalue2 - Second subtask value
 * @returns {void}
 */
function pushObject(subtaskvalue1, subtaskvalue2, subtaskvalue3, subtaskvalue4, subtaskvalue5, subtaskvalue6) {
    if (subtaskvalue1) {
        let subTaskObject1 = { "value": `${subtaskvalue1}`, 'status': 'open' };
        subtaskArray.push(subTaskObject1)
    }
    if (subtaskvalue2) {
        let subTaskObject2 = { "value": `${subtaskvalue2}`, 'status': 'open' };
        subtaskArray.push(subTaskObject2);
    }
    if (subtaskvalue3) {
        let subTaskObject3 = { "value": `${subtaskvalue3}`, 'status': 'open' };
        subtaskArray.push(subTaskObject3);
    }
    if (subtaskvalue4) {
        let subTaskObject4 = { "value": `${subtaskvalue4}`, 'status': 'open' };
        subtaskArray.push(subTaskObject4);
    }
    if (subtaskvalue5) {
        let subTaskObject5 = { "value": `${subtaskvalue5}`, 'status': 'open' };
        subtaskArray.push(subTaskObject5);
    }
    if (subtaskvalue6) {
        let subTaskObject6 = { "value": `${subtaskvalue6}`, 'status': 'open' };
        subtaskArray.push(subTaskObject6);
    }
}


/**
 * Retrieves data from backend.
 * @param {string} path - Database path
 * @returns {Promise<any>} Task data result
 */
async function getData(path = '') {
    let response = await fetch(BASe_URL + path + ".json")
    return allTasks = await response.json();
}



/**
 * Reads subtask values from the template by index.
 * @returns {void}
 */
function getSubtaskFromTemplate() {
    if (document.getElementById(`task-text-${index0}`)) {
        subtaskvalue1 = document.getElementById(`task-text-${index0}`).innerHTML
    }
    if (document.getElementById(`task-text-${index1}`)) {
        subtaskvalue2 = document.getElementById(`task-text-${index1}`).innerHTML
    }
    if (document.getElementById(`task-text-${index2}`)) {
        subtaskvalue3 = document.getElementById(`task-text-${index2}`).innerHTML
    }
    if (document.getElementById(`task-text-${index3}`)) {
        subtaskvalue4 = document.getElementById(`task-text-${index3}`).innerHTML
    }
    if (document.getElementById(`task-text-${index4}`)) {
        subtaskvalue5 = document.getElementById(`task-text-${index4}`).innerHTML
    }
    if (document.getElementById(`task-text-${index5}`)) {
        subtaskvalue6 = document.getElementById(`task-text-${index5}`).innerHTML
    }
}


/**
 * Sets assigned contacts and priority to a task object.
 * @param {object} newTask - Task object to modify
 * @returns {void}
 */
function setContactAndPrioValue(newTask) {
    let checkedImg = document.querySelectorAll('#IdForContactsNormal img.checked')
    checkedImg.forEach(img => {
        let id = img.id;
        newTask.cid.push(id);
        names = img.dataset.set;
        newTask.assignedTo.push(names)
    })
     newTask.prio = prioArray[0];
}


/**
 * Collects all task data from the form, creates a task object,
 * saves it to backend, reloads tasks and re-renders the board.
 * @param {number} [index] - Optional index
 * @returns {Promise<void>}
 */
async function getTaskInformationNormal(index) {
    let newTask = createTemplate();
    let allIds = tasks.map(ta => ta[1].id)
    let rn = Math.floor(Math.random() * 55)
    while (allIds.includes(rn)) {
        rn = Math.floor(Math.random() * 13)
    }
    newTask.id = rn;
    for (let valueIndex = 0; valueIndex < taskObjectKey.length; valueIndex++) {
        newTask[taskObjectKey[valueIndex]] = document.getElementById(`${taskContainerArray[valueIndex]}`).value
    };
    newTask.taskType = document.getElementById('selectedTaskNormal').innerText
    setContactAndPrioValue(newTask, index);
    getSubtaskFromTemplate();
    createTemplate();
    subtaskArray = newTask.subtasks;
    pushObject(subtaskvalue1, subtaskvalue2, subtaskvalue3, subtaskvalue4, subtaskvalue5, subtaskvalue6);
    newTask.category = 'Todo';
    await postData("task", newTask);
    tasks = [];
    tasks.push(...Object.entries(await getData('task')));
    filterAndShowTasks();
};


