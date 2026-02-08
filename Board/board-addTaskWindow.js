
let prioArray = ['Medium'];
window.contactsArray = [];
document.addEventListener('DOMContentLoaded', () => {
    try { renderUserInitials(); } catch (e) { }
     const taskId = sessionStorage.getItem("shineTaskId");
  if (taskId) {
    setTimeout(() => letShineLastEditedTask(taskId), 500);
    setTimeout(() => cleanBorder(taskId), 6500);
    // Aufräumen
    sessionStorage.removeItem("shineTaskId");
    sessionStorage.removeItem("shineStartTime");
  }
});

/**
 * DomContentLoaded initiates Popup, fills local Array, sort it and renders Contacts
 */
document.addEventListener('DOMContentLoaded', async () => {
    init();
    createaddTaskPopup();
    sectionCheck('board');
    tasks.push(...Object.entries(await getData('task')));
    filterAndShowTasks();
    searchTaskEventHandling();
    contacts = await getObject(path = '/contacts')
    contactsArray = objectToArray(contacts)
    showContacts();
    function sectionCheck(idsecTrue) {
        document.getElementById(idsecTrue).classList.add('active')
    }
    getPrioButtonsReactive();
})

function getPrioButtonsReactive() {
    const buttons = document.querySelectorAll(".priority-section button");
    if (buttons) {
        buttons.forEach(button => {
            button.addEventListener("click", () => {
                buttons.forEach(b => b.classList.remove("Urgent", "Medium", "Low"));
                const priority = button.dataset.priority;
                button.classList.add(priority);
                prioArray = [];
                prioArray.push(priority);
            });
        })
    };
}
async function getData(path = '') {
    let response = await fetch(BASe_URL + path + ".json")
    return allTasks = await response.json();

}

/** show User Feedback, if the User adds an new Task*/
function showReportAddedTask() {
    const popup = document.getElementById("report");
    popup.classList.add("show");
    setTimeout(() => {
        window.location.href = "../board/board.html";
    }, 900);
    setTimeout(() => {
        popup.classList.remove("show");
    }, 1000);
}
/** renders the html for addTask Popup*/
function createaddTaskPopup() {
    let taskpopup = document.getElementById('add-task-popup')
    taskpopup.innerHTML = renderHTMLOfPopup();
}


/**toggles the div to display the Popup */
function addTask() {
    const popup = document.getElementById("add-task-popup");
    popup.classList.add("show");
    const buttons = document.querySelectorAll(".priority-section button");
    let createdArray = Array.from(buttons)
    createdArray[1].classList.add('Medium')
}


/**close the AddTask Popup */
function closePopup() {
    const popup = document.getElementById("add-task-popup");
    popup.classList.remove("show");
    document.getElementById("countInfoPopup").innerHTML = "";
    const buttons = document.querySelectorAll(".priority-section button");
    document.getElementById('UserFeedbackTitle').innerHTML = "";
    document.getElementById('UserFeedbackDate').innerHTML = "";
    document.getElementById('UserFeedbackTaskType').innerHTML = "";
    let createdArray = Array.from(buttons)
    createdArray[1].classList.remove('Medium')
    clearTask();
}


/**validate values and decide if it is true or error feedback is neccesery */
function createTaskTemplate() {
    const title = document.getElementById("title").value;
    const dueDate = document.getElementById("dueDate").value;
    const taskType = document.getElementById("selectedTask").innerText;
    decideFeedback(title, dueDate, taskType);
}

function decideFeedback(title, dueDate, taskType) {
    if (title === "" && dueDate === "" && taskType === "Select Task Category") { showTitleDateTaskTypeFeedback(); }
    if (title === "" && dueDate === "") {showTitleDateFeedback();}
    else if (dueDate === "" && taskType === 'Select Task Category') {showDateTasktypeFeedback();
    } else if (title === "" && taskType === 'Select Task Category') {showTitleTasktypeFeedback();
    } else if (taskType === 'Select Task Category') {
        document.getElementById("UserFeedbackTaskType").innerHTML = `This Field is required`;
    } else if (title === '') {
        document.getElementById("UserFeedbackTitle").innerHTML = `This Field is required`;
    } else if (dueDate === '') {
        document.getElementById("UserFeedbackDate").innerHTML = `This Field is required`;
    } else {
        getTaskInformation();
        document.getElementById('creatButtonID').disabled = true;
        showReportAddedTaskTemplate();
        setTimeout(() => {
            enableButton();
        }, 3500);
    }
}

function enableButton(){
    document.getElementById('creatButtonID').disabled = false;
}


function showTitleDateTaskTypeFeedback() {
    document.getElementById("UserFeedbackTitle").innerHTML = `This Field is required`;
    document.getElementById("UserFeedbackDate").innerHTML = `This Field is required`;
    document.getElementById("UserFeedbackTaskType").innerHTML = `This Field is required`;
}


function showTitleDateFeedback() {
    document.getElementById("UserFeedbackTitle").innerHTML = `This Field is required`;
    document.getElementById("UserFeedbackDate").innerHTML = `This Field is required`;
}


function showDateTasktypeFeedback() {
    document.getElementById("UserFeedbackDate").innerHTML = `This Field is required`;
    document.getElementById("UserFeedbackTaskType").innerHTML = `This Field is required`;
}


function showTitleTasktypeFeedback() {
    document.getElementById("UserFeedbackTitle").innerHTML = `This Field is required`;
    document.getElementById("UserFeedbackTaskType").innerHTML = `This Field is required`;
}


/**show the User some feedback, that the Task has been created */
function showReportAddedTaskTemplate() {
    const popup = document.getElementById("report");
    popup.classList.add("show");
    setTimeout(() => {
        popup.classList.remove("show");
        closePopup();
    }, 1000);
    // document.getElementById('creatButtonID').disabled = false;
}


const BASE_URL = "https://join-kanban-app-default-rtdb.europe-west1.firebasedatabase.app"

/**basic function to fetch contacts from firebase */
async function getObject(path = '') {
    let response = await fetch(BASE_URL + path + ".json")
    return responseToJson = await response.json()
}


/**trasform the json based Contacts into an array */
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


/**sort it cronologic from A to Z */
function arraySorting(array) {
    const sortedArray = array
    sortedArray.sort((memberA, memberB) => {
        return memberA.name.localeCompare(memberB.name)
    })
    return sortedArray
}


function resetTaskType() {
    resetTasktypeDropDown();
}


/**here the dropdown Menü for the taskType will be opened */
function openTasktypeDropDown() {
    let drop = document.getElementById('dropId')
    drop.classList.toggle('dropTasktypeClose')
    let layer = document.getElementById('hiddenlayer')
    layer.classList.toggle('hiddenlayer')
    if (document.querySelectorAll('.dropTasktypeOpen')) {
        let ch = document.getElementById('arrowImg')
        ch.classList.toggle('select-arrow-open')
    }
}

function resetTasktypeDropDown() {
    let drop = document.getElementById('dropId')
    if (drop.classList.contains('dropTasktypeClose')) {
    } else {
        drop.classList.add('dropTasktypeClose');
        drop.classList.remove('dropTasktypeOpen');
        let layer = document.getElementById('hiddenlayer')
        layer.classList.toggle('hiddenlayer')
        if (document.querySelectorAll('.dropTasktypeOpen')) {
            let ch = document.getElementById('arrowImg')
            ch.classList.toggle('select-arrow-open')
        }
    }
}

/**here we take the value you click on and render your choise into the input-field innerHTML */
function chooseValue() {
    let choise = document.querySelectorAll('.taskOption')
    choise.forEach(b => b.addEventListener('click', () => {
        const choiseOfTask = b.dataset.value
        document.getElementById('selectedTask').innerHTML = choiseOfTask;
        document.getElementById('UserFeedbackTaskType').innerHTML = "";
    }))
}

function dateInspectPopup() {
    document.getElementById('dueDate').min = new Date().toISOString().split('T')[0];
}

/**in order to not affect all onclicks by one click we need a tool to stop the recognition in a specific div */
function stopBubbling(event) {
    event.stopPropagation()
}

/** resets the typed values in the mask to zero or empty */
function clearTask() {
    clearLeftSide();
    clearContacts();
    clearPrioTasktypeAndSub();
}

function clearLeftSide() {
    const title = document.getElementById("title").value = "";
    document.getElementById("UserFeedbackTitle").innerHTML = "";
    const description = document.getElementById('task-description').value = "";
    const dueDate = document.getElementById("dueDate").value = "";
    document.getElementById("UserFeedbackDate").innerHTML = "";
}

function clearContacts() {
    let count = document.querySelectorAll('.contactBox .checked')
    count.forEach(ob => ob.classList.remove('checked')),
        count.forEach(ob => ob.classList.add('checkbox')),
        count.forEach(ob => ob.src = "/img/icons/normalCheckContact.svg");
    document.getElementById(`choosenContacts`).innerHTML = "";
    document.getElementById("countInfoPopup").innerHTML = "";
}

function clearPrioTasktypeAndSub() {
    const buttons = document.querySelectorAll(".priority-section button");
    buttons.forEach(b => b.classList.remove("Urgent", "Medium", "Low"));
    buttons[1].classList.add('Medium');
    const taskType = document.getElementById("selectedTask").innerText = "Select Task Category";
    document.getElementById("UserFeedbackTaskType").innerHTML = "";
    document.getElementById("subtask").value = "";
    document.getElementById('subtask-list-1').classList.remove('scrollClass')
    document.getElementById('subtask-list-1').innerHTML = "";
}

/* ===================== USERNAME & INITIALEN (wie in summary) ===================== */
/**we check the local storage and fetch the username */
function getStoredUserName() {
    const name = localStorage.getItem('userFullName');
    if (name && name.trim()) return name.trim();
    if (sessionStorage.getItem('guest') === 'true') return 'Guest User';
    return 'User';
}
/** here we take the fullName trim the whitespaces change all to low letters and return G if guest */
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

/**her this function is for developing purposes only to fill task with random values to speed up the testing part */
function randomFill() {
    document.getElementById('title').value = 'Beispieltitel';
    document.getElementById('task-description').value = 'Meine Beschreibung hier...';
    document.getElementById('dueDate').value = '12.05.2028';
    document.getElementById('selectedTask').innerHTML = 'User Story';
    prioButton()
}

/**here add to the Urgent button the class Urgent in order to have a prio choosen for testing */
function prioButton() {
    let buttonsEdit = document.querySelectorAll(".priority-section button");
    buttonsEdit.forEach((button) => {
        if (button.innerText === 'Urgent') {
            button.classList.add('Urgent')
        }
    })
}

// let currentCount;
// let index = currentCount;


/**
 * Renders a new subtask list item if the input is valid.
 * Adds the subtask to the HTML list and resets the input field.
 */
function renderSubtaskInPopup(){
    let subtask = document.getElementById("subtask"); 
    let list = document.getElementById("subtask-list-1"); //ul list (unorganised list)
    let currentCount = list.getElementsByClassName("listed").length; 
    index = currentCount;
    if (subtask.value.trim() !==""){
        list.innerHTML += renderHTMLForSubtasks(index, subtask); 
        subtask.value = "";}
    if(currentCount > 2 ){
        document.getElementById('subtask-list-1').classList.add('scrollClass')
    }
}

function clearSubtask() {
    document.getElementById("subtask").value = "";
}

/**
 * Deletes a bullet point (subtask) by its index.
 * @param {number} index - Index of the bullet point to delete.
 */
function deleteBulletpoint(index) {
    let el = document.getElementById(`listed-${index}`);
    if (el) el.remove();
}

/**
 * Turns a bullet point into an editable input field.
 * @param {number} index - Index of the bullet point to edit.
 */
function editBulletpoint(index) {
    const li = document.getElementById(`listed-${index}`);
    const textEl = document.getElementById(`task-text-${index}`);
    const inputEl = document.getElementById(`edit-input-${index}`);
    if (inputEl) {
        inputEl.focus();
        return;}
    const currentText = textEl ? textEl.textContent : ""; 
    li.innerHTML = renderEditModeForBulletPoint(currentText, index);
    document.getElementById(`edit-input-${index}`).focus();
}


/**
 * Saves the edited bullet point text back into the list item.
 * @param {number} index - Index of the bullet point to save.
 */
function saveBulletpoint(index) {
    const input = document.getElementById(`edit-input-${index}`);
    const newValue = input.value.trim();
    if (newValue !== "") {
        const li = document.getElementById(`listed-${index}`);
        li.innerHTML = renderHTMLForSavingBulletPoint(index, newValue);
        li.setAttribute("onclick", `editBulletpoint(${index})`);
    }
}

/**
 * Enables pressing "Enter" in the subtask input field to trigger subtask creation.
 */
function enableEnterForSubtask() {
    let subtask = document.getElementById("subtask");
    subtask.addEventListener("keydown", e => {
        if (e.key === "Enter") {
            e.preventDefault();
            renderSubtask();
        }
    });
}

/**
 * Initializes event listeners when the DOM is fully loaded.
 */
window.addEventListener("DOMContentLoaded", enableEnterForSubtask);

