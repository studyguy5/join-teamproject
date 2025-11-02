


 window.tasks = [
    
    
];

window.tasks
// searched Task function 
// done by : Arnesto @tasks 
// as parameter and modified function filter and show task to filterAndShowTasksAlternate(array)

function beginSearching() {
    const searchField = document.querySelector('#FindTask')
    init_beginSearching()
    document.querySelector('#FindTask').focus()
    searchAndRender(searchField)
}

function init_beginSearching() {
    const imgContainer = document.querySelector('.searchSymbol')
    imgContainer.setAttribute('src', "/img/icons/subtasks-x.svg")
    const inputField = document.querySelector('#FindTask')
    inputField.closest('.inputBorder').setAttribute('style', "border-color: #29ABE2 ;")
    imgContainer.setAttribute('onclick', 'finishedSearching()')
    return
}

function init_finishSearching() {
    const imgContainer = document.querySelector('.searchSymbol')
    imgContainer.setAttribute('src', "/img/icons/search.svg")
    const inputField = document.querySelector('#FindTask')
    inputField.closest('.inputBorder').setAttribute('style', "border-color: black;")
    imgContainer.setAttribute('onclick', 'beginSearching()')
    return
}

function searchAndRender(searchField) {
    searchField.addEventListener('input', () => {
        const searchKey = searchField.value.toLowerCase()
        if (searchKey.length >= 2) {
            let searchedTask = tasks.filter(task => {
                const filteredTask = (task[1].title.toLowerCase().includes(searchKey) || task[1].description.toLowerCase().includes(searchKey))
                return filteredTask
            })
            if (searchedTask.length === 0) {
                taskNotFound()
            } else {
                filterAndShowTasksAlternate(searchedTask)
            }
        } else {
            filterAndShowTasks()
        }
    })
    return;
}



function finishedSearching() {
    init_finishSearching()
    document.querySelector('#FindTask').blur()
    document.querySelector('#FindTask').value = ''
    filterAndShowTasks()
    return
}

function searchTaskEventHandling() {
    const searchField = document.querySelector('#FindTask')
    searchField.addEventListener('focus', () => {
        beginSearching()
    })
    return
}

async function filterAndShowTasksAlternate(array) {
    console.log(array)
    for (let idIndex = 0; idIndex < categorys.length; idIndex++) {
        document.getElementById(`${categorys[idIndex]}`).innerHTML = '';
        let filteredTasks = array.filter(f => f[1].category == categorys[idIndex]);
        for (let catIndex = 0; catIndex < filteredTasks.length; catIndex++) {
            let element = filteredTasks[catIndex];
            document.getElementById(`${categorys[idIndex]}`).innerHTML += renderTaskintoBoardFilter(element);
            if (document.getElementById(`${categorys[idIndex]}`)) {
                renderContactFilter(element);
            }
        }
    }
}

function renderTaskintoBoardFilter(element) {
    let taskOption = 'türkis';
    if (element.taskType === 'User Story') {
        taskOption = 'darkblue';
    }
    return `<div draggable="true" ondragstart="startDragging(${element['id']})" 
    id="TaskDiv-${element[1].id}" onclick="bigViewOfTask(${element[1].id}); renderContactForBigView(${element[1].id}); renderEditAndDeleteButton(${element[1].id})" class="TaskDiv">
    <div id="taskType" class="${taskOption}">${element[1].taskType}</div>
    <div class="taskTitle"><p>${element[1].title}</p></div>
    <div class="taskDescription"><p>${element[1].description}</p></div>
    <div class="subTasks">
    ${element[1].subtasks != null ? `
    <svg role="progress subtask">
    <rect  width="128" height="8"  class="back"/>
    <rect  width="${element[1].progress}" height="8" class="fill"/>
    </svg>
    <p class="progressDescription">${(element[1].progress / 128) * (element[1].subtasks.length)}/${(element[1].subtasks.length)} Subtasks </p>` : ''}
    </div>
    <div id="contacts-Priority-Container" class="contacts-Priority-Container" >
    <div id="${element[1].id}" class="contactsMiniView"></div>
    <div class="taskPriority">${element[1].prio == 'Urgent' ?
            `<img src="/img/icons/urgent.svg">` :
            element[1].prio == 'Medium' ?
                `<img src="/img/icons/medium.svg">` :
                element[1].prio == 'Low' ?
                    `<img src="/img/icons/low.svg">` : ''}</div>
        </div>
        <div></div>
        </div>`
}

function renderContactFilter(element) {
    let contact = document.getElementById(`${element[1].id}`)
    if (element[1].assignedTo)
        for (let ContactIndex = 0; ContactIndex < element[1].assignedTo.length; ContactIndex++) {
            let slim = element[1].assignedTo.map(c => c.split(" ").map(f => f.charAt(0)))
            contact.innerHTML += `
    <div id="contactscircle" class="contactsCircle">${slim[ContactIndex][0] + slim[ContactIndex][1]} </div>`} else { contact.innerHTML = '' };
}

function setCardZero() {
    let template;
    template = `<div class="card-zero">No tasks found in this section</div>`;
    return template
}
//-----------------------------------------------------------------------------------------------------------------

function taskNotFound() {
    const parent = document.querySelector('.DragAndDropTaskAria')
    const divs = parent.querySelectorAll('div')
    divs.forEach(div => {
        div.innerHTML = setCardZero()
    });
    return
}



