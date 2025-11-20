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

    function sectionCheck(idsecTrue) {
        document.getElementById(idsecTrue).classList.add('active')
    }
})


const buttons = document.querySelectorAll(".priority-section button");


buttons.forEach(button => {
    button.addEventListener("click", () => {
        buttons.forEach(b => b.classList.remove("Urgent", "Medium", "Low"));
        const priority = button.dataset.priority;
        button.classList.add(priority);
        prioArray[0] = priority;                 
    });
});


async function getObject(path = '') {
    let response = await fetch(BASe_URL + path + ".json")
    return responseToJson = await response.json()
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


function showContacts() {
    let contacts = document.getElementById('IdForContactsNormal')
    contacts.innerHTML = "";
    for (let index = 1; index < contactsArray.length; index++) {
        contacts.innerHTML += `<div class="contactBox">
        <div class="contactCircleNormal">${contactsArray[index].firstLetter + contactsArray[index].secondFirstLetter}</div>
        <span for="contactName" class="contactName"> ${contactsArray[index].name}</span> 
        <img  id="checkboxImg-${index}" onclick="chooseContactNormal(${index})" class="checkbox" data-set="${contactsArray[index].name}" src="/img/icons/normalCheckContact.svg">
        </div>`

    }
}


function renderfilteredContactsInNormal(filteredContacts) {

    let filtContactInPopup = document.getElementById('IdForContactsNormal')
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

    if (document.getElementById('placeholderptag')) {
        document.getElementById('placeholderptag').classList.toggle('dont-Show');
        document.getElementById('filterContactsNormal').classList.toggle('dont-Show');
        document.getElementById('filterContactsNormal').focus()
    };
}


function openContactViewNormal() {
    let contactDrop = document.getElementById('IdForContactsNormal')
    if (contactDrop.classList.contains('availibleContactsClose')) {
        contactDrop.classList.remove('availibleContactsClose');
        contactDrop.classList.add('availibleContactsOpen');
    } else if (contactDrop.classList.contains('availibleContactsOpen')) {
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
}


function renderFilteredChoosenContactNormal(filterContactIndex) {
    let listContact = document.getElementById('choosenContacts')

    listContact.innerHTML += `
    <div id="contactCircleNormalRender-${filterContactIndex}" class="contactCircleNormalRender">${filteredContacts[filterContactIndex].firstLetter + filteredContacts[filterContactIndex].secondFirstLetter}</div>
    `
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
        document.getElementById('selectedTaskNormal').innerHTML = choiseOfTask;
    }))
}


function createTask() {
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


const categoryDiv = document.getElementById("IdForTaskChoiseNormal");
const options = document.querySelectorAll("#dropIdNormal .taskOption");
const hiddenInput = document.getElementById("categoryValue");
const selectedTask = document.getElementById("selectedTaskNormal");

options.forEach(opt => {
    opt.addEventListener("click", () => {
        selectedTask.textContent = opt.dataset.value;
        hiddenInput.value = opt.dataset.value;
        document.getElementById("dropIdNormal").classList.remove("dropTasktypeOpen");
    });
});


function formValidationAddTask() {
    const title = document.getElementById("title-add-task").value;
    const dueDate = document.getElementById("date-add-task").value;
    const category = document.getElementById("categoryValue").value; 

    if (title === "" || dueDate === "" || category === "") {
        displayRequiredMessage();
        return false;
    } else {
        getTaskInformationNormal();
        return true;
    }
}


function constantCheck() {
    setTimeout(() => {
        const title = document.getElementById("title-add-task").value;
        const description = document.getElementById('task-description').value;
        const dueDate = document.getElementById("date-add-task").value;
        const taskType = document.getElementById("selectedTaskNormal").innerText;
        if (title !== "" && dueDate !== "" && description !== "" && taskType !== "Select Task Category") {

            document.getElementById('creatButtonIDNormal').disabled = false;
        }
    }, 500);
}


let filteredContacts;
function filterContactsInNormal() {
    let r;

    let typedValue = document.getElementById('filterContactsNormal').value

    if (typedValue.length > 0) {
        let val = Object.values(contactsArray);

        r = val.slice(1)
        filteredContacts = r.filter(fn => { return fn.name.toLowerCase().includes(typedValue.toLowerCase()) })

        renderfilteredContactsInNormal(filteredContacts);

    } else if (typedValue.length < 1) {
        showContacts();
    }
}


function toggleRequiredMessage(input, message, hasError) {
    message.classList.toggle("d-none", !hasError);
    input.classList.toggle("input-error", hasError);
}

function displayRequiredMessage() {
    const titleInput = document.getElementById("title-add-task");
    const dateInput = document.getElementById("date-add-task");
    const categoryDiv = document.getElementById("IdForTaskChoiseNormal");
    const categoryInput = document.getElementById("categoryValue");

    toggleRequiredMessage(titleInput, titleInput.nextElementSibling, titleInput.value === "");
    toggleRequiredMessage(dateInput, dateInput.nextElementSibling, dateInput.value === "");
    toggleRequiredMessage(
        categoryDiv,
        categoryDiv.parentElement.querySelector(".required"),
        categoryInput.value === ""
    );
}


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


function openTaskTypeDropDownNormal() {
    let arrow = document.getElementById('arrowImgNormal')
    arrow.classList.toggle('select-arrow-open')
    let drop = document.getElementById('dropIdNormal')
    drop.classList.toggle('dropTasktypeClose')
}


document.addEventListener('click', (e) => {
    const contactBox = document.getElementById('IdForContactsNormal');
    const contactTrigger = document.querySelector('.section-right-select');
    const categoryDrop = document.getElementById('dropIdNormal');
    const categoryTrigger = document.getElementById('IdForTaskChoiseNormal');

    
    if (!contactTrigger.contains(e.target) && !contactBox.contains(e.target)) {
        contactBox.classList.add('availibleContactsClose');
        contactBox.classList.remove('availibleContactsOpen');
         document.getElementById('placeholderptag').classList.remove('dont-Show');
         document.getElementById('filterContactsNormal').classList.add('dont-Show');
    }

    
    if (!categoryTrigger.contains(e.target) && !categoryDrop.contains(e.target)) {
        categoryDrop.classList.add('dropTasktypeClose');
        document.getElementById('arrowImgNormal').classList.remove('select-arrow-open');
    }
});


function createTemplate() {
    return {
        'category': `Todo`,
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


function pushObject(subtaskvalue1, subtaskvalue2) {
    if (subtaskvalue1) {
        let subTaskObject1 = { "value": `${subtaskvalue1}`, 'status': 'open' };
        subtaskArray.push(subTaskObject1)
    }
    if (subtaskvalue2) {
        let subTaskObject2 = { "value": `${subtaskvalue2}`, 'status': 'open' };
        subtaskArray.push(subTaskObject2);
    }
}


async function getData(path = '') {
    let response = await fetch(BASe_URL + path + ".json")
    return allTasks = await response.json();
}


function getSubtaskFromTemplate() {
    if (document.getElementById(`task-text-${index0}`)) {
        subtaskvalue1 = document.getElementById(`task-text-${index0}`).innerHTML
    }
    if (document.getElementById(`task-text-${index1}`)) {
        subtaskvalue2 = document.getElementById(`task-text-${index1}`).innerHTML
    }
}


function setContactAndPrioValue(newTask) {
    let checkedImg = document.querySelectorAll('#IdForContacts img.checked')
    checkedImg.forEach(img => {
        names = img.dataset.set;
        newTask.assignedTo.push(names)
    })
    
    newTask.prio = prioArray[0] || '';       
}


async function getTaskInformationNormal(index) {
    let newTask = createTemplate();
    newTask.id = (tasks.length) + 1;
    for (let valueIndex = 0; valueIndex < taskObjectKey.length; valueIndex++) {
        newTask[taskObjectKey[valueIndex]] = document.getElementById(`${taskContainerArray[valueIndex]}`).value
    };
    newTask.taskType = document.getElementById('selectedTaskNormal').innerText
    setContactAndPrioValue(newTask, index);
    getSubtaskFromTemplate();
    createTemplate(); 
    subtaskArray = newTask.subtasks; 
    pushObject(subtaskvalue1, subtaskvalue2); 
    newTask.category = 'Todo';
    await postData("task", newTask);
    tasks = [];
    tasks.push(...Object.entries(await getData('task')));
    filterAndShowTasks();
};









