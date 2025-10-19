let categorys = ['Todo', 'Inprogress', 'AwaitFeedback', 'Done'];

const BASe_URL = "https://join-kanban-app-default-rtdb.europe-west1.firebasedatabase.app/"
// const BASe_URL = "https://join-kanban-app-default-rtdb.europe-west1.firebasedatabase.app/"

let taskContainerArray = ['title', 'task-description', 'dueDate'];
let taskObjectKey = ['title', 'description', 'DueDate'];

let currentDraggedElement;
let index0 = 0;
let index1 = 1;

let subtaskArray = [];

let subtaskvalue1;
let subtaskvalue2;

// async function postData(path="", data={}) {
//     let response = await fetch(BASe_URL + path + ".json", {
//         method:"POST",
//         headers:{
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data)
//     });
//     return response.json();
// }

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
async function putData(path = '', data = {}) {
    let response = await fetch(BASe_URL + path + ".json", {
        method: "PUT",
        header: {
            "content-type": "application/json",
        },
        body: JSON.stringify(data)
    })
    return responseToJson = await response.json();
}


// um daten zu holen (GET)
async function getData(path = '') {
    let response = await fetch(BASe_URL + path + ".json")
    return allTasks = await response.json();
    
}

async function sendAlltoFirebase(contactsArray, path = 'contact') {
    for (let index = 0; index < contactsArray.length; index++) {
        await postData(path = path, data = array[index])
    }
}

let choosenCategory;
let rightColumn = document.querySelectorAll('.categorys > div img').forEach(el => {
    el.addEventListener('click', () => {
        console.log(el.dataset.categoryId)
        choosenCategory = el.dataset.categoryId
    })
})



// let tid = tasks.length;

function createTemplate() {
    
    console.log('createTemplate() wird aufgerufen')
    return {
        'category': `${choosenCategory}`,
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

function pushObject(subtaskvalue1, subtaskvalue2) {
    if (subtaskvalue1) {
        let subTaskObject1 = {
            "value1":
            `${subtaskvalue1}`
            
        };
        subtaskArray.push(subTaskObject1)
    } else { { '' } }
    if (subtaskvalue2) {
        ;
        let subTaskObject2 = {
            "value2":
            `${subtaskvalue2}`
        };
        subtaskArray.push(subTaskObject2);
    } else { { '' } }
}

function getSubtaskFromTemplate() {
    if (document.getElementById(`task-text-${index0}`)) {
        
        subtaskvalue1 = document.getElementById(`task-text-${index0}`).innerHTML
    } else { '' };
    if (document.getElementById(`task-text-${index1}`)) {
        subtaskvalue2 = document.getElementById(`task-text-${index1}`).innerHTML
    } else { '' }
}

function setContactAndPrioValue(newTask) {
    let checkedImg = document.querySelectorAll('#IdForContacts img.checked')
    checkedImg.forEach(img => {
        names = img.dataset.set;
        newTask.assignedTo.push(names)
    })
    console.log(newTask.assignedTo);
    newTask.prio = prioArray[0];
    
    
}




async function getTaskInformation(index) {
    console.log('arbeitet')
    let newTask = createTemplate();
    newTask.id = (tasks.length) +1;
    for (let valueIndex = 0; valueIndex < taskObjectKey.length; valueIndex++) {
        newTask[taskObjectKey[valueIndex]] = document.getElementById(`${taskContainerArray[valueIndex]}`).value
    };
    newTask.taskType = document.getElementById('IdForTaskChoise').innerText
    setContactAndPrioValue(newTask, index);
    getSubtaskFromTemplate();
    createTemplate(); //create complete template of object with all data
    subtaskArray = newTask.subtasks; //path from subtask Array where new subtasks should be pushed into
    pushObject(subtaskvalue1, subtaskvalue2); // subtasks template with variable is pushed into subtaskArray
    newTask.category = choosenCategory ? choosenCategory : 'Todo';
    await postData("task", newTask);
    console.log(newTask);
    tasks = [];
    tasks.push(...Object.entries(await getData('task')));
    // tasks.push(newTask);
    // clearInputs();
    filterAndShowTasks();
};


async function filterAndShowTasks() {
    console.log(tasks)
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
console.log(Taskavailable);

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
    return `<div draggable="true" ondragstart="startDragging(${element['id']})" 
    id="TaskDiv" onclick="bigViewOfTask(${element.id}); renderContactForBigView(${element.id}); renderEditAndDeleteButton(${element.id})" class="TaskDiv">
    <div id="taskType" class="${taskOption}">${element.taskType}</div>
    <div class="taskTitle"><p>${element.title}</p></div>
    <div class="taskDescription"><p>${element.description}</p></div>
    <div class="subTasks">
    ${element.subtasks != null  ? `
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
    // if bedingung einbauen, wenn subtask.lenght = 0 -> dann nichts anzeigen (no barchart, no numbers)
    
    function bigViewOfTask(id) {
        const elements = tasks.find(task => task[1].id === id);
        if (elements[1].taskType === 'User Story') {
            taskOption = 'darkblueBigView';
        } else {
            taskOption = 'türkisBigView';
    }
    let connectionToTaskWindow = document.getElementById('bigViewOfTask')
    connectionToTaskWindow.classList.remove('dont-Show')
    connectionToTaskWindow.innerHTML = `
    <div class="bigViewHeadlineCloseArea" id="bigViewHeadlineCloseArea">
    <div class="${taskOption}">${elements[1].taskType}</div>
    <div class="closeIcon" id="closeIcon"><img onclick="closeBigView()" src="/img/icons/closeFrame.svg" alt="closeButton"></div>
    </div>
    <div class="titleBigView"><h2>${elements[1].title}</h2></div>
    <div class="descriptionBigView"><p>${elements[1].description}</p></div>
    <div class="dueDateBigView"> <p>Due Date:</p> ${elements[1]["DueDate"]}</div>
    <div class="priorityBigView"><p>Priority:</p>${elements[1].prio == 'Urgent' ?
            `${elements[1].prio}<img src="/img/icons/urgent.svg">` :
            elements[1].prio == 'Medium' ?
            `${elements[1].prio}<img src="/img/icons/medium.svg">` :
            elements[1].prio == 'Low' ?
            `${elements[1].prio}<img src="/img/icons/low.svg">` : ''}
            </div>
     <div class="assignedToBigView"><p>Assigned To:</p> 
     <div id="contactsBV" class="contactsBV"></div>
     </div>
     
     <div class="subtaskBigView"><p>${elements[1].subtasks != null ? `Subtasks`: ''}</p>
     <div id="subTaskForBigView" class="subTaskForBigView"> 
     <div id="subtaskBigView1" class="subtaskImgDiv">  ${elements[1].subtasks != null ?
        `<img id="subtaskBigViewImg1" class="checkboxS1" onclick="confirmSubtask1(); checkDone(${elements, id})" src="/img/icons/normalCheckContact.svg">` : ''}
        <p>${Object.values(elements[1].subtasks != null ? elements[1].subtasks[0] : '')}</p></div></br>
        <div  class="subtaskImgDiv"> ${elements[1].subtasks != null ?
            `<img id="subtaskBigViewImg2" class="checkboxS2" onclick="confirmSubtask2(); checkDone(${elements, id})"src="/img/icons/normalCheckContact.svg">` : ''}
            <p>${Object.values(elements[1].subtasks != null ? elements[1].subtasks[1] : '')}</p></div>
            </div>
            </div>
            <div class="editeDeleteArea" id="editeDeleteArea"></div>
            `
            
        };
        
        function renderEditAndDeleteButton(id) {
    let editandDelete = document.getElementById('editeDeleteArea')
    editandDelete.innerHTML = `<div class="editAndDeleteButton">
    <div onclick="deleteTaskFromBoard(${id})" class="deleteField">
    <img class="deleteImg" src="/img/icons/delete-symbol.svg">
    <h4>Delete</h4>
    </div>
    <hr class="lineToSeperate">
    <div class="editField">
    <img class="editImg" src="/img/icons/edit-symbol.svg">
    <h4>Edit</h4>
    </div>
    </div>
    `
}

function renderContactForBigView(id) {
    let rightContacts = tasks.find(task => task[1].id === id)
    let contactForBig = document.getElementById('contactsBV')
    for (let BVindex = 0; BVindex < rightContacts[1].assignedTo.length; BVindex++) {
        let short = rightContacts[1].assignedTo.map(sh => sh.split(" ").map(c => c.charAt(0)))
        contactForBig.innerHTML += `
        <div class="singleContactBoxForBigView">
        <div id="contactCirclePopupRender-${BVindex}" class="contactCircleBigView">${short[BVindex][0] + short[BVindex][1]}</div>
        <div id="singleContactInBigView-${BVindex}" > ${rightContacts[1].assignedTo[BVindex]}</div>
        </div>
        ` }
        
    }

    async function deleteTaskFromBoard(id) {
        let openedTask = tasks.find(task => task[1].id === id)
        let indexOfopenedTask = tasks.indexOf(tasks.find(task => task[1].id === id))
        console.log(openedTask);
        let firebaseID = [openedTask[0]];
        console.log(firebaseID[0]);
        tasks.splice(indexOfopenedTask, 1);
        closeBigView();
        await deleteData(firebaseID);
        filterAndShowTasks();
        // hier einen index rausschneiden um den Eintrag zu löschen
        
    }
    
    async function deleteData(firebaseID) {
      const response = await fetch(`https://join-kanban-app-default-rtdb.europe-west1.firebasedatabase.app/task/${firebaseID[0]}.json`, {
        method: "DELETE",
      });
      return await response.json();
    };
function confirmSubtask1() {
    let choSubtask1 = document.getElementById(`subtaskBigViewImg1`)
    if (choSubtask1.src.includes("/img/icons/normalCheckContact.svg")) {
        choSubtask1.classList.remove('checkboxS1')
        choSubtask1.classList.add('checkedSubtask')
        choSubtask1.src = "/img/icons/normalCheckedContact.svg"
    } else {
        choSubtask1.classList.add('checkboxS1')
        choSubtask1.classList.remove('checkedSubtask')
        choSubtask1.src = "/img/icons/normalCheckContact.svg"
    }

}

function confirmSubtask2() {
    let choSubtask2 = document.getElementById(`subtaskBigViewImg2`)
    if (choSubtask2.src.includes("/img/icons/normalCheckContact.svg")) {
        choSubtask2.classList.remove('checkboxS2')
        choSubtask2.classList.add('checkedSubtask')
        choSubtask2.src = "/img/icons/normalCheckedContact.svg"
    } else {
        choSubtask2.classList.add('checkboxS2')
        choSubtask2.classList.remove('checkedSubtask')
        choSubtask2.src = "/img/icons/normalCheckContact.svg"
    }
}


function renderContact(element) {
    let contact = document.getElementById(`${element.id}`)
    if (element.assignedTo)
        for (let ContactIndex = 0; ContactIndex < element.assignedTo.length; ContactIndex++) {
            let slim = element.assignedTo.map(c => c.split(" ").map(f => f.charAt(0)))
            contact.innerHTML += `
    <div id="contactscircle" class="contactsCircle">${slim[ContactIndex][0] + slim[ContactIndex][1]} </div>
    `} else { contact.innerHTML = '' };
}



function closeBigView() {
    let closefeature = document.getElementById('bigViewOfTask')
    closefeature.classList.add('dont-Show')
};


// functions for drag and drop (prefent default, save id from moving element and change categeroy at the drop location)
function moveTo(category) {
    let er = tasks.find(ct => ct[1].id == [currentDraggedElement]);
    er[1].category = category;
    filterAndShowTasks();
}

function startDragging(id) {
    currentDraggedElement = id
}

function preventDefault(ev) {
    ev.preventDefault();
}



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
