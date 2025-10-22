let categorys = ['Todo', 'Inprogress', 'AwaitFeedback', 'Done'];
let prioArray = [];
let taskContainerArray = ['title-add-task', 'task-description', 'date-add-task'];
let taskObjectKey = ['title', 'description', 'DueDate'];

const BASe_URL = "https://join-kanban-app-default-rtdb.europe-west1.firebasedatabase.app/"

document.addEventListener('DOMContentLoaded', async () => {
    init();
    contacts = await getObject(path = '/contacts')
    contactsArray = objectToArray(contacts)
    showContacts();
    sectionCheck('add-task')
    
    console.log(tasks);
function sectionCheck(idsecTrue) {
    document.getElementById(idsecTrue).classList.add('active')
}})

 
    const buttons = document.querySelectorAll(".priority-section button");
    
    buttons.forEach(button => {
      button.addEventListener("click", () => {
        buttons.forEach(b => b.classList.remove("Urgent", "Medium", "Low"));
        const priority = button.dataset.priority;
        button.classList.add(priority);
      console.log(priority)});
    });
  

    async function getObject(path = '') {
    let response = await fetch(BASe_URL + path + ".json")
    return responseToJson = await response.json()
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

function showContacts() {
    let contacts = document.getElementById('IdForContactsNormal')
    contacts.innerHTML = "";
    for (let index = 1; index < contactsArray.length; index++) {
        // console.log(contactsArray);
        contacts.innerHTML += `<div class="contactBox">
        <div class="contactCircleNormal">${contactsArray[index].firstLetter + contactsArray[index].secondFirstLetter}</div>
        <span for="contactName" class="contactName"> ${contactsArray[index].name}</span> 
        <img  id="checkboxImg-${index}" onclick="chooseContactNormal(${index})" class="checkbox" data-set="${contactsArray[index].name}" src="/img/icons/normalCheckContact.svg">
        </div>`

    }
}

function renderfilteredContactsInNormal(filteredContacts){

   let filtContactInPopup =  document.getElementById('IdForContactsNormal')
   filtContactInPopup.innerHTML = "";
   for (let filterContactIndex = 0; filterContactIndex < filteredContacts.length; filterContactIndex++) {   
   filtContactInPopup.innerHTML += `
   <div onclick="" class="contactBox">
        <div class="contactCircleNormal">${filteredContacts[filterContactIndex].firstLetter + filteredContacts[filterContactIndex].secondFirstLetter}</div>
        <span for="contactName" class="contactName"> ${filteredContacts[filterContactIndex].name}</span> 
        <img  id="checkboxImg-${filterContactIndex}" onclick="chooseFilteredContactNormal(${filterContactIndex})" class="checkbox" data-set="${filteredContacts[filterContactIndex].name}" src="/img/icons/normalCheckContact.svg">
        </div>
   `}

}
function showInputNormal() {

    if (document.getElementById('placeholderptag')){
        document.getElementById('placeholderptag').classList.toggle('dont-Show');
        document.getElementById('filterContactsNormal').classList.toggle('dont-Show');
        document.getElementById('filterContactsNormal').focus()
    };
}

function openContactViewNormal() {
    let contactDrop = document.getElementById('IdForContactsNormal')
    if(contactDrop.classList.contains('availibleContactsClose')) {
    contactDrop.classList.remove('availibleContactsClose');
    contactDrop.classList.add('availibleContactsOpen');
  } else if(contactDrop.classList.contains('availibleContactsOpen')) {
    contactDrop.classList.remove('availibleContactsOpen');
    contactDrop.classList.add('availibleContactsClose');
  }

    if (document.querySelectorAll('availibleContactsOpen')) {
        let contact = document.getElementById('arrowImgC')
        contact.classList.toggle('select-arrow-open')
    }
}

function chooseContactNormal(index) {
    let choContact = document.getElementById(`checkboxImg-${index}`)
    if (choContact.src.includes("/img/icons/normalCheckContact.svg")) {
        choContact.classList.remove('checkbox')
        choContact.classList.add('checked')
        renderChoosenContactNormal(index);
        choContact.src = "/img/icons/normalCheckedContact.svg"
    } else {
        choContact.classList.add('checkbox')
        choContact.classList.remove('checked')
        deleteRenderedContactNormal(index);
        choContact.src = "/img/icons/normalCheckContact.svg"
    }
}

function chooseFilteredContactNormal(filterContactIndex) {
    let choContact = document.getElementById(`checkboxImg-${filterContactIndex}`)
    if (choContact.src.includes("/img/icons/normalCheckContact.svg")) {
        choContact.classList.remove('checkbox')
        choContact.classList.add('checked')
        renderFilteredChoosenContactNormal(filterContactIndex)
        choContact.src = "/img/icons/normalCheckedContact.svg"
    } else {
        choContact.classList.add('checkbox')
        choContact.classList.remove('checked')
        deleteRenderedContactNormal(filterContactIndex);
        choContact.src = "/img/icons/normalCheckContact.svg"
    }
}

function renderChoosenContactNormal(index) {
    let listContact = document.getElementById('choosenContacts')

    listContact.innerHTML += `
    <div id="contactCircleNormalRender-${index}" class="contactCircleNormalRender">${contactsArray[index].firstLetter + contactsArray[index].secondFirstLetter}</div>
    `
    console.log(listContact);
}

function renderFilteredChoosenContactNormal(filterContactIndex) {
    let listContact = document.getElementById('choosenContacts')

    listContact.innerHTML += `
    <div id="contactCircleNormalRender-${filterContactIndex}" class="contactCircleNormalRender">${filteredContacts[filterContactIndex].firstLetter + filteredContacts[filterContactIndex].secondFirstLetter}</div>
    `
    console.log(listContact);
}

function deleteRenderedContactNormal(index) {
    let renderedContact = document.getElementById(`contactCircleNormalRender-${index}`)
    renderedContact.remove(`contactCircleNormalRender-${index}`)
    renderedContact.innerHTML = '';
}



function chooseValueNormal() {
    let choise = document.querySelectorAll('.taskOption')
    
    choise.forEach(b => b.addEventListener('click', () => {
        const choiseOfTask = b.dataset.value
        console.log(choiseOfTask);
        document.getElementById('selectedTaskNormal').innerHTML = choiseOfTask;
    }))
    
}


function createTask() {
    console.log('createTask() wird aufgerufen');
    if (!formValidationAddTask()) return;

    const popup = document.getElementById("report");
    popup.classList.add("show");

      setTimeout(() => {
          window.location.href = "../board/board.html";
        }, 5000);
        
        setTimeout(() => {
            popup.classList.remove("show");
        }, 1000);
    }
    
    
    const categoryDiv = document.getElementById("category");
    if (categoryDiv) {
        const trigger = categoryDiv.querySelector(".select-trigger");
        const options = categoryDiv.querySelectorAll(".options li");
        const hiddenInput = document.getElementById("categoryValue");
        
        options.forEach(opt => {
            opt.addEventListener("click", () => {
      trigger.innerHTML = `${opt.textContent} <img src="../img/icons/arrow_drop_downaa.svg">`;
      hiddenInput.value = opt.dataset.value;
    });
  });
}


function formValidationAddTask() {
    const title = document.getElementById("title-add-task").value;
    const dueDate = document.getElementById("date-add-task").value;
    // const category = document.getElementById("categoryValue").value;
    
    if (title === "" || dueDate === "") {
        displayRequiredMessage();
        return false;
    }
    return true;
}


function constantCheck() {
    setTimeout(() => {
    const title = document.getElementById("title-add-task").value;
    const description = document.getElementById('task-description').value;
    const dueDate = document.getElementById("date-add-task").value;
    const taskType = document.getElementById("selectedTaskNormal").innerText;
    console.log("it check's")
    if (title !== "" && dueDate !== "" && description !== "" && taskType !== "Select Task Category") {

        document.getElementById('creatButtonIDNormal').disabled = false;
    }}, 500);

}

let filteredContacts;
function filterContactsInNormal() {
    let r;
    
    let typedValue = document.getElementById('filterContactsNormal').value
    
    if (typedValue.length > 0) {
        let val = Object.values(contactsArray);
        
         r = val.slice(1)
         filteredContacts = r.filter(fn => {return fn.name.toLowerCase().includes(typedValue.toLowerCase())})
            
        renderfilteredContactsInNormal(filteredContacts);    
    
    //    console.log(filteredContacts);
    }else if(typedValue.length < 1){
        showContacts();
    }
}



function displayRequiredMessage() {
    const titleInput = document.getElementById("title-add-task");
    const dateInput = document.getElementById("date-add-task");
    const categoryInput = document.getElementById("categoryValue");
    const categoryDiv = document.getElementById("category");
    
    const titleMessage = titleInput.nextElementSibling;
    const dateMessage = dateInput.nextElementSibling;
    const categoryMessage = categoryDiv.nextElementSibling;
    
    if (titleInput.value === "") {
        titleMessage.classList.remove("d-none");
        titleInput.classList.add("input-error");
    } else {
        titleMessage.classList.add("d-none");
        titleInput.classList.remove("input-error");
    }
    
    if (dateInput.value === "") {
        dateMessage.classList.remove("d-none");
        dateInput.classList.add("input-error");
    } else {
        dateMessage.classList.add("d-none");
        dateInput.classList.remove("input-error");
    }
    
    if (categoryInput.value === "") {
        categoryMessage.classList.remove("d-none");
        categoryDiv.classList.add("input-error");
    } else {
        categoryMessage.classList.add("d-none");
        categoryDiv.classList.remove("input-error");
    }
}
async function postData(path = '', data = {}) {
    console.log('post Data')
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

function openTaskTypeDropDownNormal() {
    let arrow = document.getElementById('arrowImgNormal')
    arrow.classList.toggle('select-arrow-open')
    let drop = document.getElementById('dropIdNormal')
    drop.classList.toggle('dropTasktypeClose')
}


function createTemplate() {
    
    console.log('createTemplate() wird aufgerufen')
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

async function getData(path = '') {
    let response = await fetch(BASe_URL + path + ".json")
    return allTasks = await response.json();
    
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



async function getTaskInformationNormal(index) {
    console.log('arbeitet')
    let newTask = createTemplate();
    newTask.id = (tasks.length) +1;
    for (let valueIndex = 0; valueIndex < taskObjectKey.length; valueIndex++) {
        newTask[taskObjectKey[valueIndex]] = document.getElementById(`${taskContainerArray[valueIndex]}`).value
    };
    newTask.taskType = document.getElementById('selectedTaskNormal').innerText
    setContactAndPrioValue(newTask, index);
    getSubtaskFromTemplate();
    createTemplate(); //create complete template of object with all data
    subtaskArray = newTask.subtasks; //path from subtask Array where new subtasks should be pushed into
    pushObject(subtaskvalue1, subtaskvalue2); // subtasks template with variable is pushed into subtaskArray
    newTask.category = 'Todo';
    await postData("task", newTask);
    console.log(newTask);
    tasks = [];
    tasks.push(...Object.entries(await getData('task')));
    // tasks.push(newTask);
    // clearInputs();
    filterAndShowTasks();
};

function clearTaskNormal(){
    const title = document.getElementById("title-add-task").value = "";
    const description = document.getElementById('task-description').value = "";
    const dueDate = document.getElementById("date-add-task").value = "";
    document.getElementById('choosenContacts').innerHTML= "";
    const buttons = document.querySelectorAll(".priority-section button");
    buttons.forEach(b => b.classList.remove("Urgent", "Medium", "Low"));
    const taskType = document.getElementById("selectedTaskNormal").innerText = "Select Task Category";
    document.getElementById('subtask-list-1').innerHTML = "";
}

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


let currentDraggedElement;
let index0 = 0;
let index1 = 1;

let subtaskArray = [];

let subtaskvalue1;
let subtaskvalue2;



