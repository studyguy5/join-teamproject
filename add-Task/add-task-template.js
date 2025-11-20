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
