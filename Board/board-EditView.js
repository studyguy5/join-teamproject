
const BAsE_URL = "https://join-kanban-app-default-rtdb.europe-west1.firebasedatabase.app"

document.addEventListener('DOMContentLoaded', async () => {
    contacts = await getObject(path = '/contacts')
    contactsArray = objectToArray(contacts);
    
})



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
    const arrayObject = object.map((member) => {
        return {
            id: member[0],
            ...member[1]
        }
    })
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
    let thisprio = rightTask?.[1].prio;
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
    normalContactEditModeArray = [];
    first = true;
}

/**here we get all the values allready saved and put it into and Edit Mode View to change them */
function getCurrentValues(id) {
    const singleTask = tasks.find(task => task[1].id === id);
    document.getElementById("titleEdit").value = `${singleTask[1].title}`
    document.getElementById('task-descriptionEdit').value = `${singleTask[1].description}`;
    document.getElementById("dueDateEdit").value = `${singleTask[1].DueDate}`;
    // renderChoosenContactEdit(id);
    if(singleTask[1].subtasks?.[0])
        for (let subEditIndex = 0; subEditIndex < singleTask[1].subtasks.length; subEditIndex++) {
        renderSubtaskEdit(id);
            let existingSubs = document.querySelectorAll(`.task-textEdit-${subEditIndex}`);
            if(existingSubs)
            existingSubs.forEach(sub => {sub.innerHTML = `${singleTask[1]?.subtasks?.[subEditIndex] ? singleTask[1]?.subtasks?.[subEditIndex].value : ''}`});
        }
}


function createTaskTemplateEdit(id) {
    const title = document.getElementById("titleEdit").value;
    const dueDate = document.getElementById("dueDateEdit").value;
    if (title === "" && dueDate === "") {
        document.getElementById("UserFeedbackTitleEditMode").innerHTML = `This Field is required`;
        document.getElementById("UserFeedbackDateEditMode").innerHTML = `This Field is required`;
    } else if (title === '') {
        document.getElementById("UserFeedbackTitleEditMode").innerHTML = `This Field is required`;
    } else if (dueDate === '') {
        document.getElementById("UserFeedbackDateEditMode").innerHTML = `This Field is required`;
    } else {
        showReportAddedTaskTemplateEdit();
        getTaskInformationEdit(id);
    }
}

function constantCheckTitleEdit() {
    const titleEdit = document.getElementById("titleEdit").value;
    if (titleEdit.length < 2)
        return showUserFeedbackTitleEdit(title),
            document.getElementById('task-descriptionEdit').disabled = true, false;
    document.getElementById("UserFeedbackTitleEditMode").innerHTML = "";
    document.getElementById('task-descriptionEdit').disabled = false;

    if (!validateTitleEdit(titleEdit))
        return showUserFeedbackTitleEditForm(title),
            document.getElementById('task-descriptionEdit').disabled = true, false;
    document.getElementById("UserFeedbackTitleEditMode").innerHTML = "";
    document.getElementById('task-descriptionEdit').disabled = false;

}

function dateInspect() {
    document.getElementById('dueDateEdit').min = new Date().toISOString().split('T')[0];
}


function constantCheckDateEdit() {
    const dueDateEdit = document.getElementById("dueDateEdit").value;
    let current = new Date();
    let dateOb = new Date(dueDateEdit);
    if (dateOb < current) {
        const dateField = document.getElementById("UserFeedbackDateEditMode");
        dateField.innerHTML = `Date is in the past`;
    }
    else if (!validateDateEdit(dueDateEdit)) {
        return showUserFeedbackDueDateEdit();
    } else if (validateDateEdit(dueDateEdit)) {
        document.getElementById('creatButtonIDEdit').disabled = false;
        clearUserFeedback = document.getElementById("UserFeedbackDateEditMode");
        clearUserFeedback.innerHTML = '';
    }
}

function validateTitleEdit(title) {
    const titleRegex = /^[A-Za-zÄÖÜäöüß\s1-9]+$/;
    return titleRegex.test(title.trim());
}


function validateDateEdit(dueDate) {
    let dateOb = new Date(dueDate);
    return isDateValid(dateOb);
}

function isDateValid(dateOb) {
    return !isNaN(new Date(dateOb));
}

function showUserFeedbackTitleEdit() {
    const titleUserFeedbackLength = document.getElementById("UserFeedbackTitleEditMode");
    titleUserFeedbackLength.innerHTML = `title is too short`;
}

function showUserFeedbackTitleEditForm() {
    const titleUserFeedbackForm = document.getElementById("UserFeedbackTitleEditMode");
    titleUserFeedbackForm.innerHTML = `form of Title is incorrect`
}

function showUserFeedbackDueDateEdit() {
    const dateInput = document.getElementById("UserFeedbackDateEditMode");
    dateInput.innerHTML = `form of DueDate is incorrect`;
    const categoryInput = document.getElementById("categoryValue");

}


function showReportAddedTaskTemplateEdit() {
    const popup = document.getElementById("report");
    popup.classList.add("show");
    setTimeout(() => {
        popup.classList.remove("show");
        closePopup();
    }, 1000);
}

/**show an User Feedback if the User saves a edited Task */
function editFeedback() {
    const feedback = document.getElementById("edit-feedback");
    feedback.classList.add("show");
    setTimeout(() => {
        feedback.classList.remove("show");
    }, 2000);
}

/**searches for checked img, empties all relevant arrays and takes all current choosen ones
 * in order to keep it up to date and prevent double pushing 
*/
function setContactAndPrioValueEdit(taskToEdit) {
    let allContact = normalContactEditModeArray.concat(filteredContactEditModeArray);
    taskToEdit[1].assignedTo = [];
    allContact.forEach(item => {
        // names = img.dataset.set;
        taskToEdit[1].assignedTo.push(item)
    })
    taskToEdit[1].prio = prioArray[0];
}


/**taskes values and creates object with it and pushes it after that into subtasks */
function pushObjectEdit(taskToEdit, subtaskvalueEdit) {
    if (subtaskvalueEdit) {
        let subTaskObject = { "value": `${subtaskvalueEdit}`, 'status': 'open' };
        taskToEdit[1].subtasks.push(subTaskObject);
    }
}

/**here we get the actual values out from innerHTML */
function getSubtaskFromTemplateEdit(taskToEdit) {//hole die Daten
    let changes = document.querySelectorAll('.ul-divEdit li p');
    taskToEdit[1].subtasks = []; // hier leere ich das Arry local, damit beide values aus dem Edit Modus eingefügt werden können, egal ob alt oder neu
    changes.forEach(changes => {
        let subChange = changes.innerHTML.trim();
        if(!subChange) return;
        pushObjectEdit(taskToEdit, subChange);
    })
}



let editInputId = ['titleEdit', 'task-descriptionEdit', 'dueDateEdit'];
let existingObjects = ['title', 'description', 'DueDate']
let existingFilledObjects = ['DueDate', 'description', 'title'];

let first = true;

/**main function to get all the values, this function is used more times */
async function getTaskInformationEdit(id) {
    const taskToEdit = tasks.find(task => task[1].id === id);
    let firebaseID = [taskToEdit[0]];
    await deleteData(firebaseID);
    for (let makeEmptyIndex = 0; makeEmptyIndex < existingFilledObjects.length; makeEmptyIndex++) {
        taskToEdit[1][existingFilledObjects[makeEmptyIndex]] = '';
    }
    for (let valueIndex = 0; valueIndex < editInputId.length; valueIndex++) { //Arrays überarbeiten
        taskToEdit[1][existingObjects[valueIndex]] = document.getElementById(`${editInputId[valueIndex]}`).value
    };
    setContactAndPrioValueEdit(taskToEdit);
    getSubtaskFromTemplateEdit(taskToEdit);
    await postData("task", taskToEdit[1]);
    tasks = [];
    tasks.push(...Object.entries(await getData('task')));
    filterAndShowTasksEdit();
    closeEditView();
    editFeedback();
    letShineLastEditedTask(firebaseID, taskToEdit, id);
    setTimeout(() => {
        cleanBorder();
    }, 2500);
};
// ===========hier den shiny effect einfügen==============================================
function letShineLastEditedTask(firebaseID, taskToEdit, id) {
    if(!firebaseID || !taskToEdit){
      let taskToEdit = tasks.find(task => task[1].id === id);
      let last = document.getElementById(`TaskDiv-${id}`);
      last?.classList.add('tor');
    }else{
      let last = document.getElementById(`TaskDiv-${taskToEdit[1].id}`);
      last?.classList.add('tor');
    }
}

function cleanBorder(){
    let last = document.querySelectorAll('.tor');
    last.forEach(element => {
        element.classList.remove('tor');
    });
}

/**filter the task and display it into the board page */
async function filterAndShowTasksEdit() {
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

/**opens the Contact view and switches from p-tag to input field */
function openContactWithCounter() {
    openContactViewEdit();  //open the div for contacts
    showInputFilter();  // change from p-tag to input ready to write and search
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
    if (document.getElementById('placeholderpTagEdit')) {
        document.getElementById('placeholderpTagEdit').classList.toggle('dont-Show');
        document.getElementById('filterContactsEdit').classList.toggle('dont-Show');
        document.getElementById('filterContactsEdit').focus()
    };
}

/**renders the Contacts in Edit Mode DropDown */
function showContactsEdit(id) {
    const thisT = tasks.find(task => task[1].id === id);
    thisT[1].assignedTo.forEach((item) => normalContactEditModeArray.push(item));
    let preselectedEdit = normalContactEditModeArray.concat(filteredContactEditModeArray);
    let contacts = document.getElementById('IdForContactsEdit')
    contacts.innerHTML = "";
    for (let index = 0; index < contactsArray.length; index++) {
        contacts.innerHTML += renderContactsInEditDropDown(id, contactsArray, index, preselectedEdit);
    }
}

/**filters the contacts accordingly into the DropDown window */
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

/**renders the filtered Contacts inot the list */
function renderfilteredContactsInPopupEdit(id, filteredContactsEdit) {
    // const thisTFilter = tasks.find(task => task[1].id === id);
    let preselectedFilterEdit = normalContactEditModeArray.concat(filteredContactEditModeArray);
    let filtContactInPopupEdit = document.getElementById('IdForContactsEdit')
    filtContactInPopupEdit.innerHTML = "";
    for (let filterContactIndex = 0; filterContactIndex < filteredContactsEdit.length; filterContactIndex++) {
        filtContactInPopupEdit.innerHTML += renderHTMLForFilteredContactsInEdit(id, filteredContactsEdit, filterContactIndex, preselectedFilterEdit);
    }
}




// /**deletes a filtered Contacts in Edit-Mode */
// function deleteRenderedFilteredContactEdit(filterIndex) {
//     let renderedContactFilter = document.getElementById(`contactCirclePopupRender-${filterIndex}`)
//     if (renderedContactFilter) renderedContactFilter.remove();
//     renderedContactFilter.innerHTML = '';
// }