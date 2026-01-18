

/**
 * Clears the input fields and resets the task form for normal tasks.
 */
function clearTaskNormal() {
    const title = document.getElementById("title-add-task").value = "";
    const description = document.getElementById('task-description').value = "";
    const dueDate = document.getElementById("date-add-task").value = "";
    let count = document.querySelectorAll('.contactBox .checked')
    count.forEach(ob => ob.classList.remove('checked')),
        count.forEach(ob => ob.classList.add('checkbox')),
        count.forEach(ob => ob.src = "/img/icons/normalCheckContact.svg");
    document.getElementById('choosenContacts').innerHTML = "";
    const buttons = document.querySelectorAll(".priority-section button");
    buttons.forEach(b => b.classList.remove("Urgent", "Medium", "Low"));
    buttons[1].classList.add('Medium');
    prioArray.length = 0;
    const taskType = document.getElementById("selectedTaskNormal").innerText = "Select Task Category";
    document.getElementById('subtask-list-1').innerHTML = "";
}

async function filterAndShowTasks() {
    for (let idIndex = 0; idIndex < categorys.length; idIndex++) {
       let col =  document.getElementById(`${categorys[idIndex]}`)?.innerHTML;
       if(col){document.getElementById(`${categorys[idIndex]}`).innerHTML = ""}
        let filteredTasks = tasks.filter(f => f[1].category == categorys[idIndex]);
        for (let catIndex = 0; catIndex < filteredTasks.length; catIndex++) {
            let element = filteredTasks[catIndex][1];
            if(col){document.getElementById(`${categorys[idIndex]}`).innerHTML += renderTaskintoBoardAddTask(element);}
            if (document.getElementById(`${categorys[idIndex]}`)) {
                renderContact(element);
            }
        }
    }
}


/**
 * Filters tasks by category and renders them on the board.
 */



let progress;
let TaskDone;
Taskavailable = document.querySelectorAll('.subTaskForBigView > subtaskImgDiv img');


/**
 * Updates the progress of a task based on completed subtasks.
 * @param {string} id - The ID of the task to check.
 */
function checkDone(id) {
    let sort = tasks.filter(tasks => tasks[1].id === id);
    TaskDone = document.querySelectorAll('.subTaskForBigView .subtaskImgDiv .checkedSubtask');
    sort[0][1].progress = (TaskDone.length / sort[0][1].subtasks.length) * 128;
    filterAndShowTasks(id);
}


/**
 * Renders a single task into the board with a color depending on its type.
 * @param {Object} element - The task object to render.
 */
function renderTaskintoBoardAddTask(element) {
    console.log('arbeitet')
    let taskOption = 'türkis';
    if (element.taskType === 'User Story') {
        taskOption = 'darkblue';
    }

    taskTemplate(element);
}


let currentDraggedElement;

let subtaskArray = [];



/**
 * Retrieves the stored user name from localStorage or sessionStorage.
 * @returns {string} The user's full name or a default value.
 */
function getStoredUserName() {
    const name = localStorage.getItem('userFullName');
    if (name && name.trim()) return name.trim();
    if (sessionStorage.getItem('guest') === 'true') return 'Guest User';
    return 'User';
}

function dateInspectNormal() {
    document.getElementById('date-add-task').min = new Date().toISOString().split('T')[0];
}


/**
 * Generates initials from a full name.
 * @param {string} fullName - The full name of the user.
 * @returns {string} The initials of the user.
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
