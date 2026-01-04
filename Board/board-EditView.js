
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
    first = true;
}

/**here we get all the values allready saved and put it into and Edit Mode View to change them */
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

function constantCheckDateEdit() {
    const dueDateEdit = document.getElementById("dueDateEdit").value;
    let current = new Date();
    let dateOb = new Date(dueDateEdit);
    if (dateOb < current) {
        const dateField = document.getElementById("UserFeedbackDateEditMode");
        dateField.innerHTML = `Date is in the past`;}
         else if (!validateDateEdit(dueDateEdit)) {
        return showUserFeedbackDueDateEdit();
    }else if (validateDateEdit(dueDateEdit)) {
        document.getElementById('creatButtonIDEdit').disabled = false;
        clearUserFeedback = document.getElementById("UserFeedbackDateEditMode");
        clearUserFeedback.innerHTML = '';
    }
}

function validateTitleEdit(title) {
    const titleRegex = /^[A-Za-zÄÖÜäöüß\s]+$/;
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
    let checkedImg = document.querySelectorAll('#IdForContactsEdit img.checkedEdit')
    taskToEdit[1].cid = [];
    taskToEdit[1].assignedTo = [];
    taskToEdit[1].subtasks = [];
    checkedImg.forEach(img => {
        names = img.dataset.set;
        let id = img.id;
        taskToEdit[1].cid.push(id);
        taskToEdit[1].assignedTo.push(names)
    })
    taskToEdit[1].prio = prioArray[0];
}

/**taskes values and creates object with it and pushes it after that into subtasks */
function pushObjectEdit(taskToEdit, subtaskvalue1, subtaskvalue2) {
    let subTaskObject = {
        "value":
            `${subtaskvalue1 || subtaskvalue2}`,
        'status': 'open'
    };
    taskToEdit[1].subtasks.push(subTaskObject);
}

/**here we get the actual values out from innerHTML */
function getSubtaskFromTemplateEdit(taskToEdit) {  //hole die Daten
    if (document.getElementById(`task-text-${index0}`)) {
        subtaskvalue1 = document.getElementById(`task-text-${index0}`).innerHTML
    };
    if (document.getElementById(`task-text-${index1}`)) {
        subtaskvalue2 = document.getElementById(`task-text-${index1}`).innerHTML
    }
    taskToEdit[1].subtasks = [];    // hier leere ich das Arry local, damit beide values aus dem Edit Modus eingefügt werden können, egal ob alt oder neu
    // so entsteht kein doppelter Eintrag und es ist nach aktuellem Bearbeitungsstand im Edit-Mode
}

/**here we check if values are here and execute the function above to create and push */
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
    pushSubtaskIntoArray(taskToEdit, subtaskvalue1, subtaskvalue2);
    await postData("task", taskToEdit[1]);
    tasks = [];
    tasks.push(...Object.entries(await getData('task')));
    filterAndShowTasksEdit();
    closeEditView();
    editFeedback();
};

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

/**renders the Contacts in Edit Mode */
function showContactsEdit(id) {
    const thisT = tasks.find(task => task[1].id === id);
    let contacts = document.getElementById('IdForContactsEdit')
    let result = thisT[1]?.cid //ever Image path hier in result
    let onlyNumber = result?.map(id => {    //change the entrys here
        return parseInt(id.split('-')[1]);  // return the first number and split the delete the rest
    });
    contacts.innerHTML = "";
    for (let index = 1; index < contactsArray.length; index++) {
        contacts.innerHTML += renderContactsInEdit(id, contactsArray, index, onlyNumber);
    }
}

/**filters the contacts accordingly to your inputs in the input-field */
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
    let filtContactInPopupEdit = document.getElementById('IdForContactsEdit')
    filtContactInPopupEdit.innerHTML = "";
    for (let filterContactIndex = 0; filterContactIndex < filteredContactsEdit.length; filterContactIndex++) {
        filtContactInPopupEdit.innerHTML += renderHTMLForFilteredContactsInEdit(id, filteredContactsEdit, filterContactIndex);
    }
}

/**shows the choosen Contacts in the filtered list */
function chooseFilteredContactEdit(id, filterContactIndex) {
    let choContactFilter = document.getElementById(`checkboxImgEdit-${filterContactIndex}`)
    if (choContactFilter.classList.contains("checkboxEdit")) {
        choContactFilter.classList.remove('checkboxEdit')
        choContactFilter.classList.add('checkedEdit')
        let countEditFiltered = document.querySelectorAll('.contactBox .checked')
        if ((countEditFiltered.length) > 6) {
            document.getElementById('countInfo').innerHTML = `+ ${(countEditFiltered.length) - 6} Contact(s)`
            renderFilteredChoosenContact(id, filterContactIndex)
        }
        else { choContactFilter.src = "/img/icons/normalCheckedContact.svg" }
    } else {
        choContactFilter.classList.add('checkboxEdit')
        choContactFilter.classList.remove('checkedEdit')
        deleteRenderedFilteredContactEdit(id, filterContactIndex);
        choContactFilter.src = "/img/icons/normalCheckContact.svg"
    }
}

/**renders the filtered Contacts below the list the same as the non-filtered contacts
 * and checks if an index is involved and new contacts were choosen or just the old ones
 */
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

/**shows the non-filtered choosen Contacts in the list */
function chooseContactEdit(id, index) {
    let choContact = document.getElementById(`checkboxImgEdit-${index}`)
    if (choContact.classList.contains("checkboxEdit")) {
        choContact.classList.remove('checkboxEdit')
        choContact.classList.add('checkedEdit')
        let countEditNormal = document.querySelectorAll('.contactBox .checkedEdit')
        if ((countEditNormal.length) > 6) {
            deleteOnetime = true;
            document.getElementById('countInfoEdit').innerHTML = `+ ${(countEditNormal.length) - 6} Contact(s)`
        } else {
            renderChoosenContactEdit(id, index);
            choContact.src = "/img/icons/normalCheckedContact.svg"
        }
    } else {
        choContact.classList.add('checkboxEdit')
        choContact.classList.remove('checkedEdit')
        deleteRenderedContactEdit(index);
        choContact.src = "/img/icons/normalCheckContact.svg"
    }
}


let thisTask;
/**renders the choosen Contacts below the list and check if an index is involved
 * and new Contacts were choosen or just the old ones
 */
function renderChoosenContactEdit(id, index) {
    let Choosen = document.getElementById('choosenContactsEdit')
    const RightTask = tasks.find(task => task[1].id === id);
    if (index && RightTask[1].assignedTo?.length < 5) {
        const list = contactsArray[index].name
        RightTask[1].assignedTo = [];
        RightTask[1].assignedTo.push(list);   // pushe ihn ins assignedTo array
        for (let preIndex = RightTask[1].assignedTo.length - 1; preIndex < RightTask[1].assignedTo.length; preIndex++) {
            thisTask = RightTask[1].assignedTo.map(c => c.split(" ").map(f => f.charAt(0)))
            Choosen.innerHTML += `
          <div id="contactCirclePopupRender-${index}" class="contactCirclePopupRender">${thisTask[preIndex][0] + thisTask[preIndex][1]}</div>`;
        }
    } else if (index && RightTask[1]?.assignedTo?.length >= 5) {
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

let deleteOnetime = true;
/**deletes a rendered Contact in Edit Mode */
function deleteRenderedContactEdit(index) {
    let counted = document.querySelectorAll('.contactBox .checkedEdit')
    if (counted.length > 6) {
        counted.length - 1
        document.getElementById('countInfoEdit').innerHTML = `+ ${(counted.length) - 6} Contact(s)`
    } else if (counted.length <= 6 && deleteOnetime && document.getElementById('countInfoEdit').innerHTML != "") { document.getElementById('countInfoEdit').innerHTML = ""; deleteOnetime = false }
    else {
        let renderedContact = document.getElementById(`contactCirclePopupRender-${index}`)
        if (renderedContact) renderedContact.remove();
        renderedContact.innerHTML = '';
    }
}

/**deletes a filtered Contacts in Edit-Mode */
function deleteRenderedFilteredContactEdit(filterIndex) {
    let renderedContactFilter = document.getElementById(`contactCirclePopupRender-${filterIndex}`)
    if (renderedContactFilter) renderedContactFilter.remove();
    renderedContactFilter.innerHTML = '';
}