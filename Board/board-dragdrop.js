let categorys = ['Todo', 'Inprogress', 'AwaitFeedback', 'Done'];

const BASe_URL = "https://join-kanban-app-default-rtdb.europe-west1.firebasedatabase.app/"

async function postData(path = '', data = {}) {
    let response = await fetch(BASe_URL + path + ".json", {
        method: "POST",
        header: {
            "content-type": "application/json",
        },
        body: JSON.stringify(data)
    })
    let responseToJson = await response.json();
    return responseToJson.name
}

// async function deleteData(path = '') {
//   const response = await fetch(BASE_URL + path + ".json", {
//     method: "DELETE",
//   });
//   return await response.json();
// }

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

// let singleTaks = [];

let tasks = [
    {
        'category': 'Todo',
        'id': 0,
        'taskType': 'technical Task',
        'title': 'Setup File',
        'description': 'setup file-structure in order to start working',
        'Due Date': '10.09.25',
        'prio': 'medium',
        'assignedTo': ['Robert Fox'],
        'subtasks': {
            'done': 'use Camelcase technic',
            'done': 'connect with github',
            'open': 'push code to github'
        },
    },
    {
        'category': 'Todo',
        'id': 1,
        'taskType': 'technical Task',
        'title': 'Take a zoom meeting',
        'description': 'discuss important topics and distribute roles',
        'Due Date': '25.09.25',
        'prio': 'urgent',
        'assignedTo': ['Robert Fox', 'Christina Tranvile'],
        'subtasks': {
            'done': 'invite team Members',
            'done': 'include google calender',
            'open': 'inform People about side Points'
        },
    },
    {
        'category': 'Inprogress',
        'id': 2,
        'taskType': 'User Story',
        'title': 'Add Chat function to board',
        'description': 'add Chat function to board for Users to communicate better',
        'Due Date': '30.09.25',
        'prio': 'medium',
        'assignedTo': ['Robert Fox', 'Christina Tranvile', 'Tom Cruise'],
        'subtasks': {
            '<input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">':
                '<label for="vehicle1"> I have a bike</label><br></br>',
            '<input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">':
                '<label for="vehicle1"> I have a bike</label><br></br>',
            '<input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">':
                '<label for="vehicle1"> I have a bike</label><br></br>'
        },
    }
];

// Vorlage um in task zu pushen


function createTemplate(tid) {
    
console.log('wird aufgerufen')
    return {
        'category': '',
        'id': `${tid}`,
        'taskType': '',
        'title': '',
        'description': '',
        'DueDate': '',
        'prio': '',
        'assignedTo': [

        ],
        'subtasks': [{
            '<input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">':
                '<label for="vehicle1"> I have a bike</label><br></br>'
        },
        {
            '<input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">':
                '<label for="vehicle1"> I have a bike</label><br></br>'
        },
        {
            '<input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">':
                '<label for="vehicle1"> I have a bike</label><br></br>'
        }
        ]
    }
}
// inserts checkbox into the subtasks array
function createSubtaskPoint(subtasks) {
    return {
        '<input type="checkbox" id="subTask" name="subtask" value="value">':
            `<label for="subTask">${subtasks}</label><br></br>`
    };
}

let currentDraggedElement;


let taskContainerArray = ['title', 'task-description', 'dueDate', 'IdForTaskChoise', 'subtasks'];
let taskObjectKey = ['title', 'description', 'DueDate', 'taskType', 'subtasks'];
let tid = 3;
async function getTaskInformation() {
    
    let newTask = createTemplate();
    newTask.id = tid;
    for (let valueIndex = 0; valueIndex < taskObjectKey.length; valueIndex++) {
        newTask[taskObjectKey[valueIndex]] = document.getElementById(`${taskContainerArray[valueIndex]}`).value
    }
    let Contacts = document.getElementById('IdForContacts').value
    newTask.assignedTo.push(Contacts);
    newTask.prio = prioArray[0];
    createSubtaskPoint(subtasks); // create template for subtask with checkpoint
    tid++
    createTemplate(tid); //create complete template of object with all data
    subtaskArray = newTask.subtasks; //path from subtask Array where new subtasks should be pushed into
    subtaskArray = createSubtaskPoint(subtasks); // subtasks template with variable is pushed into subtaskArray
    newTask.category = 'Todo';
    await postData("task", newTask);
    tasks.push(newTask);
    console.log('I pushed this into tasks', newTask);
    filterAndShowTasks();
};



async function filterAndShowTasks() {
    console.log(tasks)
    for (let idIndex = 0; idIndex < categorys.length; idIndex++) {
        document.getElementById(`${categorys[idIndex]}`).innerHTML = '';

        let filteredTasks = tasks.filter(f => f.category == categorys[idIndex]);

        for (let catIndex = 0; catIndex < filteredTasks.length; catIndex++) {
            let element = filteredTasks[catIndex];
            // singleTaks.push(element);
        

            document.getElementById(`${categorys[idIndex]}`).innerHTML += renderTaskintoBoard(element);
            if (document.getElementById(`${categorys[idIndex]}`)) {
                renderContact(element);
            }

        }
    }

    //  deleteData('');

}

function renderTaskintoBoard(element) {
    let taskOption = 'türkis';
    if (element.taskType !== 'technical Task') {
        taskOption = 'darkblue';
    }
    return `<div draggable="true" ondragstart="startDragging(${element['id']})" id="TaskDiv" onclick="bigViewOfTask(${element.id})" class="TaskDiv">
    <div id="taskType" class="${taskOption}">${element.taskType}</div>
    <div class="taskTitle"><p>${element.title}</p></div>
    <div class="taskDescription"><p>${element.description}</p></div>
    <div class="subTasks">
    <svg role="progress subtask">
          <rect  width="128" height="8"  class="back"/>
          <rect  width="110" height="8" class="fill"/>
        </svg>
        <p class="progressDescription">x/y Subtasks </p>
        </div>
    <div id="contacts-Priority-Container" class="contacts-Priority-Container" >
    <div id="${element.id}" class="contactsMiniView"></div>
    <div class="taskPriority">${element.prio == 'urgent' ?
            `<img src="/img/icons/urgent.svg">` :
            element.prio == 'medium' ?
                `<img src="/img/icons/medium.svg">` :
                element.prio == 'low' ?
                    `<img src="/img/icons/low.svg">` : ''}</div>
        </div>
    </div>`

}


function bigViewOfTask(id) {
    const elements = tasks.find(task => task.id === id);
    if (elements.taskType !== 'technical Task') {
        taskOption = 'darkblueBigView';
    } else {
        taskOption = 'türkisBigView';
    }
    let connectionToTaskWindow = document.getElementById('bigViewOfTask')
    connectionToTaskWindow.classList.remove('dont-Show')
    connectionToTaskWindow.innerHTML = `
    <div class="bigViewHeadlineCloseArea" id="bigViewHeadlineCloseArea">
    <div class="${taskOption}">${elements.taskType}</div>
    <div class="closeIcon" id="closeIcon"><img onclick="closeBigView()" src="/img/icons/closeFrame.svg" alt="testObject"></div>
    </div>
    <div class="titleBigView"><h2>${elements.title}</h2></div>
    <div class="descriptionBigView"><p>${elements.description}</p></div>
    <div class="dueDateBigView"> <p>Due Date:</p> ${elements["Due Date"]}</div>
    <div class="priorityBigView"><p>Priority</p>${elements.prio == 'urgent' ?
            `<img src="/img/icons/urgent.svg">` :
            elements.prio == 'medium' ?
                `<img src="/img/icons/medium.svg">` :
                elements.prio == 'low' ?
                    `<img src="/img/icons/low.svg">` : ''}
     </div>
     <div class="assignedToBigView"><p>assigned To:</p> 
     <div id="contacts" class="contacts">
     </div>
     `
    console.log(prioArray[0]);
};


function renderContact(element) {
    let contact = document.getElementById(`${element.id}`)
    if (contact)
        for (let ContactIndex = 0; ContactIndex < element.assignedTo.length; ContactIndex++) {
            let slim = element.assignedTo.map(c => c.split(" ").map(f => f.charAt(0)))
            contact.innerHTML += `
    <div id="contactscircle" class="contactsCircle">${slim[ContactIndex][0] + slim[ContactIndex][1]} </div>
    `};
}



function closeBigView() {
    let closefeature = document.getElementById('bigViewOfTask')
    closefeature.classList.add('dont-Show')
};


// functions for drag and drop (prefent default, save id from moving element and change categeroy at the drop location)
function moveTo(category) {
    tasks[currentDraggedElement]['category'] = category;

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
