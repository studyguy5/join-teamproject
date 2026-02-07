

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
        renderfilteredContactsInNormal(filteredContacts); // hier schauen ob name der Funktion passt
    } else if (typedValue.length < 1) {
        showContacts();
    }
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
        'assignedTo': [
        ],
        'subtasks': [
        ]
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

let subtaskvalue;

/**
 * Pushes up to two subtask objects into the global subtask array.
 * @param {string} subtaskvalue - First subtask value
 * @param {string} subtaskvalue - Second subtask value
 * @returns {void}
*/
function pushObject(subtaskArray, subtaskvalue) {
    if (subtaskvalue) {
        let subTaskObject1 = { "value": `${subtaskvalue}`, 'status': 'open' };
        subtaskArray.push(subTaskObject1)
    }
}


/**
 * Reads subtask values from the template by index.
 * @returns {void}
*/
function getSubtaskFromTemplate(subtaskArray) {
    let inputs = document.querySelectorAll('.ul-div li p');
    inputs.forEach(inputs => {
        let subInput = inputs.innerHTML.trim();
        if (!subInput) return;
        pushObject(subtaskArray, subInput);
    });
}


/**
 * Sets assigned contacts and priority to a task object.
 * @param {object} newTask - Task object to modify
 * @returns {void}
*/
function setContactAndPrioValue(newTask) {
    let contactsCombined = addTaskNormalFilteredContactArray.concat(addTaskNormalContactArray);
    contactsCombined.forEach((item) => {
        newTask.assignedTo.push(item)
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
    let rn = getRandomNumber();
    newTask.id = rn;
    for (let valueIndex = 0; valueIndex < taskObjectKey.length; valueIndex++) {
        newTask[taskObjectKey[valueIndex]] = document.getElementById(`${taskContainerArray[valueIndex]}`).value};
    newTask.taskType = document.getElementById('selectedTaskNormal').innerText
    setContactAndPrioValue(newTask, index);
    subtaskArray = newTask.subtasks;
    getSubtaskFromTemplate(subtaskArray);
    createTemplate();
    newTask.category = 'Todo';
    await postData("task", newTask);
    tasks = [];
    tasks.push(...Object.entries(await getData('task')));
    filterAndShowTasks();
    shinePackageAddTaskNormal();
};

function getRandomNumber(){
    let allIds = tasks.forEach(t => allIds.push(t[1].id));
    let rn = Math.trunc(Math.floor(Math.random() * 150)) +1;
    while (allIds.includes(rn)) {
        rn = Math.trunc(Math.floor(Math.random() * 150)) +1;
    }
    return rn;
}

function shinePackageAddTaskNormal(){
    letShineLastEditedTask();
    setTimeout(() => {
        cleanBorder();
    }, 2500);
}

function letShineLastEditedTask(firebaseID, taskToEdit, id) {
    if (!firebaseID || !taskToEdit) {
        let taskToEdit = tasks.find(task => task[1].id === id);
        let last = document.getElementById(`TaskDiv-${id}`);
        last?.classList.add('tor');
    } else {
        let last = document.getElementById(`TaskDiv-${taskToEdit[1].id}`);
        last?.classList.add('tor');
    }
}

function cleanBorder() {
    let last = document.querySelectorAll('.tor');
    last.forEach(element => {
        element.classList.remove('tor');
    });
}


