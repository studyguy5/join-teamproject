function clearTaskNormal() {
    const title = document.getElementById("title-add-task").value = "";
    const description = document.getElementById('task-description').value = "";
    const dueDate = document.getElementById("date-add-task").value = "";
    document.getElementById('choosenContacts').innerHTML = "";
    const buttons = document.querySelectorAll(".priority-section button");
    buttons.forEach(b => b.classList.remove("Urgent", "Medium", "Low"));
    prioArray.length = 0; // ▼▼▼ optional: Auswahl zurücksetzen
    const taskType = document.getElementById("selectedTaskNormal").innerText = "Select Task Category";
    document.getElementById('subtask-list-1').innerHTML = "";
}


async function filterAndShowTasks() {
    for (let idIndex = 0; idIndex < categorys.length; idIndex++) {
        document.getElementById(`${categorys[idIndex]}`).innerHTML = '';
        let filteredTasks = tasks.filter(f => f[1].category == categorys[idIndex]);
        for (let catIndex = 0; catIndex < filteredTasks.length; catIndex++) {
            let element = filteredTasks[catIndex][1];
            document.getElementById(`${categorys[idIndex]}`).innerHTML += renderTaskintoBoard(element);
            if (document.getElementById(`${categorys[idIndex]}`)) {
                renderContact(element);
            }
        }
    }
}


let progress;
let TaskDone;
Taskavailable = document.querySelectorAll('.subTaskForBigView > subtaskImgDiv img')


function checkDone(id) {
    let sort = tasks.filter(tasks => tasks[1].id === id);
    TaskDone = document.querySelectorAll('.subTaskForBigView .subtaskImgDiv .checkedSubtask')
    sort[0][1].progress = (TaskDone.length / sort[0][1].subtasks.length) * 128
    filterAndShowTasks(id);
}


// function renderTaskintoBoard(element) {
//     let taskOption = 'türkis';
//     if (element.taskType === 'User Story') {
//         taskOption = 'darkblue';
//     }
//     return `<div draggable="true" ondragstart="startDragging(${element['id']})" 
//     id="TaskDiv" onclick="bigViewOfTask(${element.id}); renderContactForBigView(${element.id}); renderEditAndDeleteButton(${element.id})" class="TaskDiv">
//     <div id="taskType" class="${taskOption}">${element.taskType}</div>
//     <div class="taskTitle"><p>${element.title}</p></div>
//     <div class="taskDescription"><p>${element.description}</p></div>
//     <div class="subTasks">
//     ${element.subtasks != null ? `
//     <svg role="progress subtask">
//     <rect  width="128" height="8"  class="back"/>
//     <rect  width="${element.progress}" height="8" class="fill"/>
//     </svg>
//     <p class="progressDescription">${(element.progress / 128) * (element.subtasks.length)}/${(element.subtasks.length)} Subtasks </p>` : ''}
//     </div>
//     <div id="contacts-Priority-Container" class="contacts-Priority-Container" >
//     <div id="${element.id}" class="contactsMiniView"></div>
//     <div class="taskPriority">${element.prio == 'Urgent' ?
//             `<img src="/img/icons/urgent.svg">` :
//             element.prio == 'Medium' ?
//                 `<img src="/img/icons/medium.svg">` :
//                 element.prio == 'Low' ?
//                     `<img src="/img/icons/low.svg">` : ''}</div>
//         </div>
//         <div></div>
//         </div>`
// }
function renderTaskintoBoard(element) {
    let taskOption = 'türkis';
    if (element.taskType === 'User Story') {
        taskOption = 'darkblue';
    }

    taskTemplate(element, taskOption); //das template wurde ausgelagert
}


let currentDraggedElement;
let index0 = 0;
let index1 = 1;
let subtaskArray = [];
let subtaskvalue1;
let subtaskvalue2;
/* --- dein vorhandener add-task.js Code bleibt komplett wie er ist --- */

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
    try { renderUserInitials(); } catch (e) { }
});