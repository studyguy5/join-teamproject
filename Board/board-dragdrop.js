let categorys = ['Todo', 'Inprogress', 'AwaitFeedback', 'Done'];
const BASe_URL = "https://join-kanban-app-default-rtdb.europe-west1.firebasedatabase.app/"

let taskContainerArray = ['title', 'task-description', 'dueDate'];
let taskObjectKey = ['title', 'description', 'DueDate'];

let currentDraggedElement;
window.index0 = 0;
window.index1 = 1;

let subtaskArray = [];

let subtaskvalue1;
let subtaskvalue2;

/**basic function to post Data into firebase */
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

/**basic function to replace Data within firebase */
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

/**basic function to update Data within firebase */
async function patchData(path = '', data = {}) {
    const response = await fetch(BASe_URL + path + ".json", {
        method: "PATCH",
        mode: 'cors',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    return await response.json();
}


/**basic function to get Data from firebase */
async function getData(path = '') {
    let response = await fetch(BASe_URL + path + ".json")
    return allTasks = await response.json();

}

/**send all Data into firebase as the name says */
async function sendAlltoFirebase(contactsArray, path = 'contact') {
    for (let index = 0; index < contactsArray.length; index++) {
        await postData(path = path, data = array[index])
    }
}


let choosenCategory;
/**this eventListener chanes the category if you add a Task on Inprogress or AwaitFeedback */
let rightColumn = document.querySelectorAll('.categorys > div img')
if (rightColumn)
    rightColumn.forEach(el => {
        el.addEventListener('click', () => {
            choosenCategory = el.dataset.categoryId
        })
    })

/**the same as above but for the categorys in the responsiv view, these are other divs made visible for responsiv design */
let rigthColumnRe = document.querySelectorAll('.DragAndDropTaskAria > div img')
if (rigthColumnRe)
    rigthColumnRe.forEach(el => {
        el.addEventListener('click', () => {
            choosenCategory = el.dataset.categoryId
        })
    })

/**the template for Task itself to post local and into firebase */
function createTemplate() {
    return {
        'category': `${choosenCategory}`,
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

/**create a object with the value given and push it into the subtask array */
function pushObject(subtaskvalue1, subtaskvalue2) {
    if (subtaskvalue1) {
        let subTaskObject1 = { "value": `${subtaskvalue1}`, 'status': 'open' };
        subtaskArray.push(subTaskObject1)
    }
    if (subtaskvalue2) {
        let subTaskObject2 = {"value": `${subtaskvalue2}`, 'status': 'open'};
        subtaskArray.push(subTaskObject2);
    }
}

/**filter the subtask out of the div in order to work with and push it later */
function getSubtaskFromTemplate() {
    if (document.getElementById(`task-text-${index0}`)) {
        subtaskvalue1 = document.getElementById(`task-text-${index0}`).innerHTML
    };
    if (document.getElementById(`task-text-${index1}`)) {
        subtaskvalue2 = document.getElementById(`task-text-${index1}`).innerHTML
    }
}

/**filter the data from dataset and id and push it separate inot arrays to display and work with it later */
function setContactAndPrioValue(newTask) {
    let checkedImg = document.querySelectorAll('#IdForContacts img.checked')
    checkedImg.forEach(img => {
        names = img.dataset.set;
        let id = img.id;
        newTask.cid.push(id);
        newTask.assignedTo.push(names)
    })
    newTask.prio = prioArray[0];
}

/**get all the typed in Data and push it into the created object structure (called template) */
async function getTaskInformation(index) {
    let newTask = createTemplate();
    const allIds = tasks.map(ta => ta[1].id)
    let rn = Math.floor(Math.random() * 50)
    while (allIds.includes(rn)) {
        rn = Math.floor(Math.random() * 10)
    }
    newTask.id = rn;
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
    tasks = [];
    tasks.push(...Object.entries(await getData('task')));
    filterAndShowTasks();
};

/**filter the results and sort it according to the category in each column */
async function filterAndShowTasks() {
    for (let idIndex = 0; idIndex < categorys.length; idIndex++) {
        document.getElementById(`${categorys[idIndex]}`).innerHTML = '';
        let filteredTasks = tasks.filter(f => f[1].category == categorys[idIndex]);
        if (filteredTasks == '' || filteredTasks == null) {
            document.getElementById(`${categorys[idIndex]}`).innerHTML = `<div id="emptyCategory" class="emptyCategory"> No Tasks ${categorys[idIndex]}</div>`
        } else {
            for (let catIndex = 0; catIndex < filteredTasks.length; catIndex++) {
                let element = filteredTasks[catIndex][1];
                document.getElementById(`${categorys[idIndex]}`).innerHTML += renderTaskintoBoard(element);
                if (document.getElementById(`${categorys[idIndex]}`)) {
                    renderContact(element);
                }
            }
        }
    }
}


let progress;
let TaskDone;
Taskavailable = document.querySelectorAll('.subTaskForBigView > subtaskImgDiv img')

/**check if an subtask gets checked and update this on firebase in order to show it other Users in the world */
function checkDone(id) {
    let sort = tasks.filter(tasks => tasks[1].id === id);
    let firebaseIde = sort[0][0];
    TaskDone = document.querySelectorAll('.subTaskForBigView .subtaskImgDiv .checkedSubtask')
    sort[0][1].progress = (TaskDone.length / sort[0][1].subtasks.length) * 128
    putData(`task/${firebaseIde}/progress`, `${sort[0][1].progress}`)
    filterAndShowTasks(id);
}

/**is in charge of the big View, checks the taskType in sets the color accordingly and renders after that the whole task */
function bigViewOfTask(id) {
    const elements = tasks.find(task => task[1].id === id);
    if (elements[1].taskType === 'User Story') {
        taskOption = 'darkblueBigView';
    } else {
        taskOption = 'türkisBigView';
    }
    // let connectionToTaskWindow = document.getElementById('bigViewContent')
    // connectionToTaskWindow.classList.remove('dont-Show')
    let connectionToTaskBackground = document.getElementById('bigViewOfTask')
    connectionToTaskBackground.classList.remove('dont-Show')
    let connectionToTaskWindow = document.getElementById('bigViewContent')
    connectionToTaskWindow.innerHTML = renderBigViewHTML(elements, id);
}

/**switch Case to change the categorys in responsiv view and resplace the DragAndDrop system */
function moveUpCategory(id) {
    let curTask = tasks.filter(tasks => tasks[1].id === id);
    switch (curTask[0][1].category) {
        case 'Todo': 
            break;
        case 'Inprogress': curTask[0][1].category = 'Todo', filterAndShowTasks(id); 
            break;
        case 'AwaitFeedback': curTask[0][1].category = 'Inprogress', filterAndShowTasks(id); 
            break;
        case 'Done': curTask[0][1].category = 'AwaitFeedback', filterAndShowTasks(id);
            break;
        default: 
            break;
    }

}


function moveDownCategory(id) {
    let CurTask = tasks.filter(tasks => tasks[1].id === id);
    switch (CurTask[0][1].category) {
        case 'Todo': CurTask[0][1].category = 'Inprogress', filterAndShowTasks(id);
            break;
        case 'Inprogress': CurTask[0][1].category = 'AwaitFeedback', filterAndShowTasks(id);
            break;
        case 'AwaitFeedback': CurTask[0][1].category = 'Done', filterAndShowTasks(id);
            break;
        case 'Done': 
            break;
        default: 
            break;
    }
}

/**renders the Edit and Delete area with the buttons on each bigView */
function renderEditAndDeleteButton(id) {
    let editandDelete = document.getElementById('editeDeleteArea')
    editandDelete.innerHTML = renderHTMLForEditandDeleteButton(id);
}

/**renders the Contacts in the bigView */
function renderContactForBigView(id) {
    let rightContacts = tasks.find(task => task[1].id === id)
    let contactForBig = document.getElementById('contactsBV')
    for (let BVindex = 0; BVindex < rightContacts[1].assignedTo?.length; BVindex++) {
        let short = rightContacts[1].assignedTo.map(sh => sh.split(" ").map(c => c.charAt(0)))
        contactForBig.innerHTML += renderContactHTMLForBigView(rightContacts, BVindex, short);
    }
}

/**if the user wants to delete a Task, it will be updated local and in firebase */
async function deleteTaskFromBoard(id) {
    let openedTask = tasks.find(task => task[1].id === id)
    let firebaseID = [openedTask[0]];
    closeBigView();
    await deleteData(firebaseID);
    tasks = [];
    tasks.push(...Object.entries(await getData('task')));
    filterAndShowTasks();
}

/**delete in firebase */
async function deleteData(firebaseID) {
    const response = await fetch(`https://join-kanban-app-default-rtdb.europe-west1.firebasedatabase.app/task/${firebaseID[0]}.json`, {
        method: "DELETE",
    });
    return await response.json();
};

/**renders the Edit View in the same div as the BigView */
function activateEditModus(id) {
    let edit = document.getElementById('bigViewContent')
    edit.innerHTML = "";
    edit.innerHTML = renderBigEditView(id);
    getCurrentValues(id);
    prioButtonactivate(id);
    showContactsEdit(id);
}

/**changes the img if an user sets a Subtask as done in bigView */
function confirmSubtask1(id) {
    let RT1 = tasks.find(task => task[1].id === id)
    let firebaseId = RT1[0]
    let choSubtask1 = document.getElementById(`subtaskBigViewImg1`)
    if (choSubtask1.src.includes("/img/icons/normalCheckContact.svg")) {
        choSubtask1.classList.remove('checkboxS1')
        choSubtask1.classList.add('checkedSubtask')
        choSubtask1.src = "/img/icons/normalCheckedContact.svg"
        putData(`task/${firebaseId}/subtasks/0/status`, 'closed')
    } else {
        choSubtask1.classList.add('checkboxS1')
        choSubtask1.classList.remove('checkedSubtask')
        choSubtask1.src = "/img/icons/normalCheckContact.svg"
        putData(`task/${firebaseId}/subtasks/0/status`, 'open')
    }
}


function confirmSubtask2(id) {
    let RT2 = tasks.find(task => task[1].id === id)
    let firebaseId = RT2[0]
    let choSubtask2 = document.getElementById(`subtaskBigViewImg2`)
    if (choSubtask2.src.includes("/img/icons/normalCheckContact.svg")) {
        choSubtask2.classList.remove('checkboxS2')
        choSubtask2.classList.add('checkedSubtask')
        choSubtask2.src = "/img/icons/normalCheckedContact.svg"
        putData(`task/${firebaseId}/subtasks/1/status`, 'closed')
    } else {
        choSubtask2.classList.add('checkboxS2')
        choSubtask2.classList.remove('checkedSubtask')
        choSubtask2.src = "/img/icons/normalCheckContact.svg"
        putData(`task/${firebaseId}/subtasks/1/status`, 'open')
    }
}

/**renders the Contacts in BigView */
function renderContact(element) {
    let contact = document.getElementById(`${element.id}`)
    if (element.assignedTo)
        for (let ContactIndex = 0; ContactIndex < element.assignedTo.length; ContactIndex++) {
            let slim = element.assignedTo.map(c => c.split(" ").map(f => f.charAt(0)))
            contact.innerHTML += `
    <div id="contactscircle" class="contactsCircle">${slim[ContactIndex][0] + slim[ContactIndex][1]} </div>`
        } else { contact.innerHTML = '' };
}

/**closes the bigView as the name says */
async function closeBigView() {
    let closefeature = document.getElementById('bigViewOfTask')
    closefeature.classList.add('dont-Show')
    tasks = [];
    tasks.push(...Object.entries(await getData('task')));
    filterAndShowTasks();
};

/**this function searches for the task id matching with currentDraggedElement and
 * changes the category into the category the task is trying to drop on a new area (dragAndDrop)
 */
function moveTo(category) {
    let er = tasks.find(ct => ct[1].id == [currentDraggedElement]);
    er[1].category = category;
    putData(`task/${er[0]}/category`, `${category}`);
    filterAndShowTasks();
}

/**this is triggered if you start to pull a task out of its area */
function startDragging(id) {
    currentDraggedElement = id
    document.getElementById(`TaskDiv-${id}`).style.transform = 'rotate(5deg)';
}

let once = false;

/**this prevents the default setting in javascript in order to make drag and drop working */
function preventDefault(ev, category) {
    ev.preventDefault();
    let re = tasks.find(ct => ct[1].id == [currentDraggedElement]);
    let checkEmpty = document.querySelectorAll(`#${category} .emptyCategory`)
    if (checkEmpty.length !== 0) { document.getElementById(`${category}`).innerHTML = ""; }
    let demo = document.querySelectorAll(`.${category} .TaskDivDemo`)
    if (demo.length == 0 && re[1].category != category) {
        document.getElementById(category).innerHTML += `
    <div class="TaskDivDemo" id="TaskDivDemo">Drop me here</div>`;
        once = true;
    }
}

/**if a task leaves a category,the info "no Tasks in this category" will be removed once */
function leaveCategory(category) {
    let clean = document.querySelectorAll(`.${category} .TaskDivDemo`);
    if (clean.length === 1 && once === true) {
        clean[0].remove();
        once = false;
    }
}


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


