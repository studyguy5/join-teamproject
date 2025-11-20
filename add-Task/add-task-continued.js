function clearTaskNormal() {
    const title = document.getElementById("title-add-task").value = "";
    const description = document.getElementById('task-description').value = "";
    const dueDate = document.getElementById("date-add-task").value = "";
    document.getElementById('choosenContacts').innerHTML = "";
    const buttons = document.querySelectorAll(".priority-section button");
    buttons.forEach(b => b.classList.remove("Urgent", "Medium", "Low"));
    prioArray.length = 0; 
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


function renderTaskintoBoard(element) {
    let taskOption = 'türkis';
    if (element.taskType === 'User Story') {
        taskOption = 'darkblue';
    }

    taskTemplate(element, taskOption); 
}


let currentDraggedElement;
let index0 = 0;
let index1 = 1;
let subtaskArray = [];
let subtaskvalue1;
let subtaskvalue2;


function getStoredUserName() {
    const name = localStorage.getItem('userFullName');
    if (name && name.trim()) return name.trim();
    if (sessionStorage.getItem('guest') === 'true') return 'Guest User';
    return 'User';
}


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


document.addEventListener('DOMContentLoaded', () => {
    try { renderUserInitials(); } catch (e) { }
});