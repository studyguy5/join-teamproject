
document.addEventListener('DOMContentLoaded', async () => {
    contacts = await getObject(path = '/contacts')
    contactsArray = objectToArray(contacts);
})

const BAsE_URL = "https://join-kanban-app-default-rtdb.europe-west1.firebasedatabase.app"

async function getObject(path = '') {
    let response = await fetch(BAsE_URL + path + ".json")
    return responseToJson = await response.json()
}

async function deleteData(firebaseID) {
    const response = await fetch(`https://join-kanban-app-default-rtdb.europe-west1.firebasedatabase.app/task/${firebaseID[0]}.json`, {
        method: "DELETE",
    });
    return await response.json();
};

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

function arraySorting(array) {
    const sortedArray = array
    sortedArray.sort((memberA, memberB) => {
        return memberA.name.localeCompare(memberB.name)
    })
    return sortedArray
}


function prioButtonactivate(id) {
    const buttonsEdit = document.querySelectorAll(".priority-sectionEdit button");
    let rightTask = tasks.find(r => r[1].id === id);
    let thisprio = rightTask[1].prio;
    buttonsEdit.forEach((button) => {
        if (button.innerText === thisprio) {
            button.classList.add(thisprio)
        }
    })
    if (buttonsEdit) {
        buttonsEdit.forEach(button => {
            button.addEventListener("click", () => {
                buttonsEdit.forEach(b => b.classList.remove("Urgent", "Medium", "Low"));
                const priority = button.dataset.priority;
                button.classList.add(priority);
                prioArray = [];
                prioArray.push(priority);
            });
        })
    };
}

function closeEditView() {
    const popup = document.getElementById('bigViewOfTask');
    popup.classList.add("dont-Show");
    first = true;
}

function getCurrentValues(id) {
    const singleTask = tasks.find(task => task[1].id === id);
    document.getElementById("titleEdit").value = `${singleTask[1].title}`
    document.getElementById('task-descriptionEdit').value = `${singleTask[1].description}`;
    document.getElementById("dueDateEdit").value = `${singleTask[1].DueDate}`;
    renderChoosenContactEdit(id);
    if (singleTask[1].subtasks?.[0]) {
        renderSubtaskEdit();
        document.getElementById(`task-text-${index}`).innerHTML += `${singleTask[1]?.subtasks?.[0] ? singleTask[1]?.subtasks?.[0].value : ''}`;
    }
    if (singleTask[1].subtasks?.[1]) {
        renderSubtaskEdit();
        document.getElementById(`task-text-${index}`).innerHTML += `${singleTask[1]?.subtasks?.[1] ? singleTask[1]?.subtasks?.[1].value : ''}`;
    }
}

function createTaskTemplateEdit(id) {
    if (!formValidationAddTaskTempEdit(id)) return;
    showReportAddedTaskTemplateEdit();
}

function setContactAndPrioValueEdit(taskToEdit) {
    let checkedImg = document.querySelectorAll('#IdForContactsEdit img.checkedEdit')
    checkedImg.forEach(img => {
        names = img.dataset.set;
        let id = img.id;
        taskToEdit[1].cid.push(id);
        taskToEdit[1].assignedTo.push(names)
    })
    taskToEdit[1].prio = prioArray[0];
}


function formValidationAddTaskTempEdit(id) {
    const title = document.getElementById("titleEdit").value;
    const dueDate = document.getElementById("dueDateEdit").value;
    if (title === "" || dueDate === "") {
        displayRequiredMessageTempEdit();
        return false;
    } else {
        getTaskInformationEdit(id);
        return true;
    }
}



function displayRequiredMessageTempEdit() {
    const titleInput = document.getElementById("titleEdit");
    const dateInput = document.getElementById("dueDateEdit");
    const titleMessage = titleInput.nextElementSibling;
    const dateMessage = dateInput.nextElementSibling;
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
}


function showReportAddedTaskTemplateEdit() {
    const popup = document.getElementById("report");
    popup.classList.add("show");
    setTimeout(() => {
        popup.classList.remove("show");
        closePopup();
    }, 1000);
}

function pushObjectEdit(taskToEdit, subtaskvalue1, subtaskvalue2) {
    let subTaskObject = {
        "value":
            `${subtaskvalue1 || subtaskvalue2}`,
        'status': 'open'
    };
    taskToEdit[1].subtasks.push(subTaskObject)
}

function getSubtaskFromTemplateEdit() {  //hole die Daten
    if (document.getElementById(`task-text-${index0}`)) {
        subtaskvalue1 = document.getElementById(`task-text-${index0}`).innerHTML
    };
    if (document.getElementById(`task-text-${index1}`)) {
        subtaskvalue2 = document.getElementById(`task-text-${index1}`).innerHTML
    }
}

function pushSubtaskIntoArray(taskToEdit, subtaskvalue1, subtaskvalue2) {
    if (subtaskvalue1) {
        pushObjectEdit(taskToEdit, subtaskvalue1, null);
    }
    if (subtaskvalue2) {
        pushObjectEdit(taskToEdit, null, subtaskvalue2);
    }
}

let editInputId = ['titleEdit', 'task-descriptionEdit', 'dueDateEdit'];
let existingObjects = ['title', 'description', 'DueDate']
let existingFilledObjects = ['DueDate', 'description', 'title'];

async function getTaskInformationEdit(id) {
    const taskToEdit = tasks.find(task => task[1].id === id);
    let firebaseID = [taskToEdit[0]];
    await deleteData(firebaseID);
    for (let makeEmptyIndex = 0; makeEmptyIndex < existingFilledObjects.length; makeEmptyIndex++) {
        taskToEdit[1][existingFilledObjects[makeEmptyIndex]] = '';
    }
    taskToEdit[1].assignedTo = [];
    taskToEdit[1].cid = [];
    taskToEdit[1].subtasks = [];
    for (let valueIndex = 0; valueIndex < editInputId.length; valueIndex++) { //Arrays überarbeiten
        taskToEdit[1][existingObjects[valueIndex]] = document.getElementById(`${editInputId[valueIndex]}`).value
    };
    setContactAndPrioValueEdit(taskToEdit);
    getSubtaskFromTemplateEdit(taskToEdit);
    pushSubtaskIntoArray(taskToEdit, subtaskvalue1, subtaskvalue2);
    await postData("task", taskToEdit[1]);
    tasks = [];
    tasks.push(...Object.entries(await getData('task')));
    filterAndShowTasksEdit();
    closeEditView();
};

async function filterAndShowTasksEdit() {
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

let first = true;
function openContactWithCounter(id) {
    if (first) {
        showContactsEdit(id);
        openContactViewEdit();
        showInputFilter();
        first = false;
    } else {
        openContactViewEdit();
        showInputFilter();
    }
}

function openContactViewEdit() {
    let contactDrop = document.getElementById('IdForContactsEdit')
    if (contactDrop.classList.contains('availibleContactsCloseEdit')) {
        contactDrop.classList.remove('availibleContactsCloseEdit');
        contactDrop.classList.add('availibleContactsOpenEdit');
    } else if (contactDrop.classList.contains('availibleContactsOpenEdit')) {
        contactDrop.classList.remove('availibleContactsOpenEdit');
        contactDrop.classList.add('availibleContactsCloseEdit');
    }

    if (document.querySelectorAll('availibleContactsOpenEdit')) {
        let contact = document.getElementById('arrowImgCEdit')
        contact.classList.toggle('select-arrow-openEdit')
    }
}

function showInputFilter() {
    console.log('show input')
    if (document.getElementById('placeholderpTagEdit')) {
        document.getElementById('placeholderpTagEdit').classList.toggle('dont-Show');
        document.getElementById('filterContactsEdit').classList.toggle('dont-Show');
        document.getElementById('filterContactsEdit').focus()
    };
}


function showContactsEdit(id) {
    const thisT = tasks.find(task => task[1].id === id);
    let contacts = document.getElementById('IdForContactsEdit')
    let result = thisT[1]?.cid
    let onlyNumber = result?.map(id => {
        return parseInt(id.split('-')[1]);
    });
    contacts.innerHTML = "";
    for (let index = 1; index < contactsArray.length; index++) {
        contacts.innerHTML += renderContactsInEdit(id, contactsArray, index, onlyNumber); 
    }
}

let filteredContactsEdit = [];
function filterContactsInPopupEdit(id) {
    let r;
    let typedValue = document.getElementById('filterContactsEdit').value
    if (typedValue.length > 0) {
        let val = Object.values(contactsArray);
        r = val.slice(1)
        filteredContactsEdit = r.filter(fn => { return fn.name.toLowerCase().includes(typedValue.toLowerCase()) })
        renderfilteredContactsInPopupEdit(id, filteredContactsEdit);
    } else if (typedValue.length < 1) {
        showContactsEdit(id);
    }
}


function renderfilteredContactsInPopupEdit(id, filteredContactsEdit) {
    let filtContactInPopupEdit = document.getElementById('IdForContactsEdit')
    filtContactInPopupEdit.innerHTML = "";
    for (let filterContactIndex = 0; filterContactIndex < filteredContactsEdit.length; filterContactIndex++) {
        filtContactInPopupEdit.innerHTML += renderHTMLForFilteredContactsInEdit(id, filteredContactsEdit, filterContactIndex); }
}

function chooseFilteredContactEdit(id, filterContactIndex) {
    let choContactFilter = document.getElementById(`checkboxImgEdit-${filterContactIndex}`)
    if (choContactFilter.classList.contains("checkboxEdit")) {
        choContactFilter.classList.remove('checkboxEdit')
        choContactFilter.classList.add('checkedEdit')
        renderFilteredChoosenContact(id, filterContactIndex)
        choContactFilter.src = "/img/icons/normalCheckedContact.svg"
    } else {
        choContactFilter.classList.add('checkboxEdit')
        choContactFilter.classList.remove('checkedEdit')
        deleteRenderedFilteredContactEdit(id, filterContactIndex);
        choContactFilter.src = "/img/icons/normalCheckContact.svg"
    }
}


function renderFilteredChoosenContact(id, filterContactIndex) {
    let listContact = document.getElementById('choosenContactsEdit')
    const filteredRightTask = tasks.find(task => task[1].id === id);
    if (filterContactIndex && filteredRightTask[1].assignedTo.length < 5) {
        const contFilterList = filteredContactsEdit[filterContactIndex]
        filteredRightTask[1].assignedTo.push(contFilterList?.name);
        let root = filteredRightTask[1].assignedTo;
        for (let filterIndex = root.length - 1; filterIndex < root.length; filterIndex++) {
            thisFilteredTask = root.map(c => c.split(" ").map(f => f.charAt(0)))
            listContact.innerHTML += `
        <div id="contactCirclePopupRender-${id}" class="contactCirclePopupRender">${thisFilteredTask[filterIndex][0] + thisFilteredTask[filterIndex][1]}</div>
        `}
    } else if (filterContactIndex && filteredRightTask[1].assignedTo.length >= 5) {
        listContact.innerHTML += `<h6>max of length reached</h6>`
    } else if (filteredRightTask[1].assignedTo.length < 5) {
        for (let filterIndex = 0; filterIndex < filteredRightTask[1].assignedTo?.length; filterIndex++) {
            thisFilteredTask = filteredRightTask[1].assignedTo.map(c => c.split(" ").map(f => f.charAt(0)))
            listContact.innerHTML += `
    <div id="contactCirclePopupRender-${id}" class="contactCirclePopupRender">${thisFilteredTask[filterIndex][0] + thisFilteredTask[filterIndex][1]}</div>`;
        }
    }
}
let preIndex;

// Liste der Kontakte
function chooseContactEdit(id, index) {
    let choContact = document.getElementById(`checkboxImgEdit-${index}`)
    if (choContact.classList.contains("checkboxEdit")) {
        choContact.classList.remove('checkboxEdit')
        choContact.classList.add('checkedEdit')
        renderChoosenContactEdit(id, index);
        choContact.src = "/img/icons/normalCheckedContact.svg"
    } else {
        choContact.classList.add('checkboxEdit')
        choContact.classList.remove('checkedEdit')
        deleteRenderedContactEdit(index);
        choContact.src = "/img/icons/normalCheckContact.svg"
    }
}


let thisTask;
function renderChoosenContactEdit(id, index) {
    let Choosen = document.getElementById('choosenContactsEdit')
    const RightTask = tasks.find(task => task[1].id === id);
    // render und pushen wenn array < 2
    if (index && RightTask[1].assignedTo.length < 5) {
        const list = contactsArray[index].name
        RightTask[1].assignedTo.push(list);   // pushe ihn ins assignedTo array
        for (let preIndex = RightTask[1].assignedTo.length - 1; preIndex < RightTask[1].assignedTo.length; preIndex++) {    //iteriere drüber

            thisTask = RightTask[1].assignedTo.map(c => c.split(" ").map(f => f.charAt(0)))
            Choosen.innerHTML += `
          <div id="contactCirclePopupRender-${index}" class="contactCirclePopupRender">${thisTask[preIndex][0] + thisTask[preIndex][1]}</div>`;
        }
        // normal rendern, wenn array voll
    } else if (index && RightTask[1].assignedTo.length >= 5) {
        Choosen.innerHTML += `<h6>max of length reached</h6>`
    } else if (RightTask[1].assignedTo?.length < 5) {
        for (let preIndex = 0; preIndex < RightTask[1].assignedTo?.length; preIndex++) {
            let num = parseInt(RightTask[1].cid[preIndex].split('-')[1]);
            thisTask = RightTask[1].assignedTo.map(c => c.split(" ").map(f => f.charAt(0)))
            Choosen.innerHTML += `
    <div id="contactCirclePopupRender-${num}" class="contactCirclePopupRender">${thisTask[preIndex][0] + thisTask[preIndex][1]}</div>`;
            index++
        }
    }
}

function deleteRenderedContactEdit(index) {
    let renderedContact = document.getElementById(`contactCirclePopupRender-${index}`)
    if (renderedContact) renderedContact.remove();
    renderedContact.innerHTML = '';
}


function deleteRenderedFilteredContactEdit(filterIndex) {
    let renderedContactFilter = document.getElementById(`contactCirclePopupRender-${filterIndex}`)
    if (renderedContactFilter) renderedContactFilter.remove();
    renderedContactFilter.innerHTML = '';
}