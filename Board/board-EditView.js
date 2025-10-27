
document.addEventListener('DOMContentLoaded', async () => {
    contacts = await getObject(path = '/contacts')
    contactsArray = objectToArray(contacts);



})

// let taskContainerArray = ['title', 'task-description', 'dueDate'];
// let taskObjectKey = ['title', 'description', 'DueDate'];
// let categorys = ['Todo', 'Inprogress', 'AwaitFeedback', 'Done'];

const BAsE_URL = "https://join-kanban-app-default-rtdb.europe-west1.firebasedatabase.app"

// =========== get Contacts from Firebase form into array and Sorting it=======

async function getObject(path = '') {
    let response = await fetch(BAsE_URL + path + ".json")
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

function arraySorting(array) {
    const sortedArray = array
    sortedArray.sort((memberA, memberB) => {
        return memberA.name.localeCompare(memberB.name)
    })
    return sortedArray
}


function prioButtonactivate(id) {
    const buttonsEdit = document.querySelectorAll(".priority-sectionEdit button");
    console.log(buttonsEdit);
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
                console.log(priority)
                prioArray = [];
                prioArray.push(priority);
            });
        })
    };
}

function closeEditView() {
    console.log('ruft auf')
    const popup = document.getElementById('bigViewOfTask');
    popup.classList.add("dont-Show");
}

function getCurrentValues(id) {
    const singleTask = tasks.find(task => task[1].id === id);
    document.getElementById("titleEdit").value = `${singleTask[1].title}`
    document.getElementById('task-descriptionEdit').value = `${singleTask[1].description}`;
    document.getElementById("dueDateEdit").value = `${singleTask[1].DueDate}`;
    renderChoosenContactEdit(id);
    if (singleTask[1].subtasks?.[0]) {
        renderSubtaskEdit();
        document.getElementById(`listed-${index}`).innerHTML += `${singleTask[1]?.subtasks?.[0] ? singleTask[1]?.subtasks?.[0].value1 : ''}`;
    }
    if (singleTask[1].subtasks?.[1]) {
        renderSubtaskEdit();
        document.getElementById(`listed-${index}`).innerHTML += `${singleTask[1]?.subtasks?.[1] ? singleTask[1]?.subtasks?.[1].value2 : ''}`;
    }
    console.log("")
}

function createTaskTemplateEdit(id) {
    if (!formValidationAddTaskTempEdit(id)) return;

    showReportAddedTaskTemplateEdit();
}

// function constantCheck() {
//     setTimeout(() => {
//     const title = document.getElementById("title").value;
//     const description = document.getElementById('task-description').value;
//     const dueDate = document.getElementById("dueDate").value;
//     const taskType = document.getElementById("selectedTask").innerText;
//     console.log("it check's")
//     if (title !== "" && dueDate !== "" && description !== "" && taskType !== "Select Task Category") {

//     }}, 500);

// }


// function makeDisabled() {
//     document.getElementById('creatButtonID').disabled = true;
// }


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

async function getTaskInformationEdit(id) {
    console.log('arbeitet')
    const taskToEdit = tasks.find(task => task[1].id === id);
    let newTask = createTemplate();
    newTask.id = (tasks.length) + 1;
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

    filterAndShowTasksEdit();
};

async function filterAndShowTasksEdit() {
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
    console.log('arbeitet auch im edit')
    const thisT = tasks.find(task => task[1].id === id);
    let contacts = document.getElementById('IdForContactsEdit')
    console.log(contacts);
    let result = thisT[1].cid
    let onlyNumber = result.map(id => {
    return parseInt(id.split('-')[1]);
});
    
    contacts.innerHTML = "";
    for (let index = 1; index < contactsArray.length; index++) {
        contacts.innerHTML += `<div class="contactBox">
        <div class="contactCirclePopup">${contactsArray[index].firstLetter + contactsArray[index].secondFirstLetter}</div>
        <span for="contactName" class="contactName"> ${contactsArray[index].name}</span> 
        <img  id="checkboxImgEdit-${index}" onclick="chooseContactEdit(${id}, ${index})" 
        class="${onlyNumber.includes(index) ? 'checkedEdit' : 'checkboxEdit'}" data-set="${contactsArray[index].name}"
         src="/img/icons/normalCheckContact.svg">
        </div>`

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

        //    console.log(filteredContacts);
    } else if (typedValue.length < 1) {
        showContactsEdit();
    }
}


function renderfilteredContactsInPopupEdit(id, filteredContactsEdit) {

    let filtContactInPopupEdit = document.getElementById('IdForContactsEdit')
    filtContactInPopupEdit.innerHTML = "";
    for (let filterContactIndex = 0; filterContactIndex < filteredContactsEdit.length; filterContactIndex++) {
        filtContactInPopupEdit.innerHTML += `
        <div  class="contactBox">
        <div class="contactCirclePopup">${filteredContactsEdit[filterContactIndex].firstLetter + filteredContactsEdit[filterContactIndex].secondFirstLetter}</div>
        <span for="contactName" class="contactName"> ${filteredContactsEdit[filterContactIndex].name}</span> 
        <img  id="checkboxImgEdit-${filterContactIndex}" onclick="chooseFilteredContactEdit(${id}, ${filterContactIndex})" class="checkboxEdit" data-set="${filteredContactsEdit[filterContactIndex].name}" src="/img/icons/normalCheckContact.svg">
        </div>
        `}

}

function chooseFilteredContactEdit(id, filterContactIndex) {
    let choContactFilter = document.getElementById(`checkboxImgEdit-${filterContactIndex}`)
    if (choContactFilter.src.includes("/img/icons/normalCheckContact.svg")) {
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
    // forschleife und if-statement einbauen - noch nicht fertig =============
    const filteredRightTask = tasks.find(task => task[1].id === id);
    if (filterContactIndex && filteredRightTask[1].assignedTo.length < 5) {
        const contFilterList = filteredContactsEdit[filterContactIndex]
        filteredRightTask[1].assignedTo.push(contFilterList?.name);
        let root = filteredRightTask[1].assignedTo;
        for (let filterIndex = root.length -1; filterIndex < root.length; filterIndex++) {
             thisFilteredTask = root.map(c => c.split(" ").map(f => f.charAt(0)))
            listContact.innerHTML += `
        <div id="contactCirclePopupRender-${id}" class="contactCirclePopupRender">${thisFilteredTask[filterIndex][0] + thisFilteredTask[filterIndex][1]}</div>
        `}

    }else if(filterContactIndex && filteredRightTask[1].assignedTo.length >= 5) {
        listContact.innerHTML += `<h6>max of length reached</h6>`
    }else if (filteredRightTask[1].assignedTo.length < 5) {
        for (let filterIndex = 0; filterIndex < filteredRightTask[1].assignedTo?.length; filterIndex++) {

            thisFilteredTask = filteredRightTask[1].assignedTo.map(c => c.split(" ").map(f => f.charAt(0)))
            listContact.innerHTML += `
    <div id="contactCirclePopupRender-${id}" class="contactCirclePopupRender">${thisFilteredTask[filterIndex][0] + thisFilteredTask[filterIndex][1]}</div>
    `;
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
          <div id="contactCirclePopupRender-${index}" class="contactCirclePopupRender">${thisTask[preIndex][0] + thisTask[preIndex][1]}</div>
    `;
        }
        // normal rendern, wenn array voll
    } else if (index && RightTask[1].assignedTo.length >= 5) {
        Choosen.innerHTML += `<h6>max of length reached</h6>`
    }

    else if (RightTask[1].assignedTo.length < 5) {
        for (let preIndex = 0; preIndex < RightTask[1].assignedTo?.length; preIndex++) {
            let num = parseInt(RightTask[1].cid[preIndex].split('-')[1]);
            
            thisTask = RightTask[1].assignedTo.map(c => c.split(" ").map(f => f.charAt(0)))
            Choosen.innerHTML += `
    <div id="contactCirclePopupRender-${num}" class="contactCirclePopupRender">${thisTask[preIndex][0] + thisTask[preIndex][1]}</div>
    `;
    index++
        }
    }
}

function deleteRenderedContactEdit(index) {
    let renderedContact = document.getElementById(`contactCirclePopupRender-${index}`)
    if(renderedContact)
    renderedContact.remove();
    renderedContact.innerHTML = '';
}


function deleteRenderedFilteredContactEdit(filterIndex) {
    let renderedContactFilter = document.getElementById(`contactCirclePopupRender-${filterIndex}`)
    if(renderedContactFilter)
    renderedContactFilter.remove();
    renderedContactFilter.innerHTML = '';
}

// ======== ab hier funktionen für das Rendern von Subtask im Edit-View =====//
// let currentCount;
// let index = currentCount;

function renderSubtaskEdit() {
    console.log('rendert')
    let subtask = document.getElementById("subtaskEdit"); // der standard input
    let list = document.getElementById("subtaskEdit-list-1"); // das zusätzliche <ul> element


    let currentCount = list.getElementsByClassName("listedEdit").length; //klasse von li element
    index = currentCount;

    if (currentCount < 2 && subtask.value.trim() === "") {
        list.innerHTML += `<li onclick="editBulletpointEditView(${index})" id="listed-${index}" class="listedEdit"> 
        <span class="dot">•</span><p id="task-text-${index}">${subtask.value}</p>
        <span class="list-icon">
                                    <img onmousedown="clearSubtaskEdit()" class="pencil" src="/img/icons/pencil-edit.svg">
                                    <img class="delimiter" src="/img/icons/delimiter-vertical.svg">
                                    <img onmousedown="deleteBulletpointEdit(${index})" class="trash" src="/img/icons/trash.svg">
                                    </span>
                                    </li>
                                    `;
        subtask.value = "";
        // d = document.getElementById('task-text-0').innerHTML;
        // console.log(d);
    } else if (currentCount < 2 && subtask.value.trim() !== "") {
        list.innerHTML += `<li onclick="editBulletpointEditView(${index})" id="listed-${index}" class="listedEdit"> 
        <span class="dot">•</span><p id="task-text-${index}">${subtask.value}</p>
        <span class="list-icon">
                                    <img onmousedown="clearSubtaskEdit()" class="pencil" src="/img/icons/pencil-edit.svg">
                                    <img class="delimiter" src="/img/icons/delimiter-vertical.svg">
                                    <img onmousedown="deleteBulletpointEdit(${index})" class="trash" src="/img/icons/trash.svg">
                                    </span>
                                    </li>
                                    `;
        subtask.value = "";
    }
}


// leere das subtask input Feld
function clearSubtaskEdit() {
    document.getElementById("subtask").value = "";
}

// lösche gerenderten Bulletpoint
function deleteBulletpointEdit(index) {
    let el = document.getElementById(`listed-${index}`);
    if (el) el.remove();
}

// bearbeite gerenderten Bulletpoint
function editBulletpointEditView(index) {
    const li = document.getElementById(`listed-${index}`);
    const textEl = document.getElementById(`task-text-${index}`);
    const inputEl = document.getElementById(`edit-input-${index}`);

    // Wenn schon ein Input da ist, nicht nochmal umbauen
    if (inputEl) {
        inputEl.focus();
        return;
    }

    const currentText = textEl ? textEl.textContent : ""; // fallback, falls kein <p> existiert

    li.innerHTML = `
    <input class="edit-input" type="text" id="edit-input-${index}" value="${currentText}">
    <span class="list-icon">
    <img onmousedown="deleteBulletpointEdit(${index})" class="trash" src="/img/icons/trash.svg">
    <img class="delimiter" src="/img/icons/delimiter-vertical.svg">
    <img onmousedown="saveBulletpointEdit(${index})" class="hook" src="/img/icons/subtasks-icon.svg">
        </span>
        `;

    document.getElementById(`edit-input-${index}`).focus();
}



function saveBulletpointEdit(index) {
    const input = document.getElementById(`edit-input-${index}`);
    const newValue = input.value.trim();

    if (newValue !== "") {
        const li = document.getElementById(`listed-${index}`);
        li.innerHTML = `<span class="dot">•</span><p id="task-text-${index}">${newValue}</p>
        <span class="list-icon">
        <img onmousedown="clearSubtask()" class="pencil" src="/img/icons/pencil-edit.svg">
        <img class="delimiter" src="/img/icons/delimiter-vertical.svg">
        <img onmousedown="deleteBulletpoint(${index})" class="trash" src="/img/icons/trash.svg">
        </span>`;
        li.setAttribute("onclick", `editBulletpointEditView(${index})`);
    }
}