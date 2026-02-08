
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
    setPrioButtonActive(buttonsEdit);

}

function setPrioButtonActive(buttonsEdit) {
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
    if (singleTask[1].subtasks?.[0])
        for (let subEditIndex = 0; subEditIndex < singleTask[1].subtasks.length; subEditIndex++) {
            renderSubtaskEdit(id);
            let existingSubs = document.querySelectorAll(`.task-textEdit-${subEditIndex}`);
            if (existingSubs)
                existingSubs.forEach(sub => { sub.innerHTML = `${singleTask[1]?.subtasks?.[subEditIndex] ? singleTask[1]?.subtasks?.[subEditIndex].value : ''}` });
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
        if (!subChange) return;
        pushObjectEdit(taskToEdit, subChange);
    })
    updateProgress(taskToEdit);
}

function updateProgress(taskToEdit){
    console.log(taskToEdit[1].subtasks);
    let firebaseIde = taskToEdit[0];
    let done = taskToEdit[1].subtasks.filter((item) => item.status === "closed");
    taskToEdit[1].progress = ((done.length / taskToEdit[1].subtasks.length) * 128);
    putData(`task/${firebaseIde}/progress`, `${taskToEdit[1].progress}`)
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
    iterateAboveExistingValues(taskToEdit);
    setContactAndPrioValueEdit(taskToEdit);
    getSubtaskFromTemplateEdit(taskToEdit);
    await postData("task", taskToEdit[1]);
    tasks = [];
    tasks.push(...Object.entries(await getData('task')));
    filterAndShowTasksEdit();
    closeEditView();
    editFeedback();
    shinePackage();
};

function iterateAboveExistingValues(taskToEdit){
    for (let makeEmptyIndex = 0; makeEmptyIndex < existingFilledObjects.length; makeEmptyIndex++) {
        taskToEdit[1][existingFilledObjects[makeEmptyIndex]] = '';
    }
    for (let valueIndex = 0; valueIndex < editInputId.length; valueIndex++) { //Arrays überarbeiten
        taskToEdit[1][existingObjects[valueIndex]] = document.getElementById(`${editInputId[valueIndex]}`).value
    };
}


// ===========hier den shiny effect einfügen==============================================

function shinePackage(){
    letShineLastEditedTask(firebaseID, taskToEdit, id);
    setTimeout(() => {
        cleanBorder();
    }, 2500);
}


function letShineLastEditedTask(firebaseID, taskToEdit, id) {
    if (!firebaseID || !taskToEdit) {
        let taskToEdit = tasks.find(task => task[1].id === id);
        let last = document.getElementById(`TaskDiv-${id}`);
        last?.classList.add('tor');
    } else {
        let last = document.getElementById(`TaskDiv-${taskToEdit[1].id}`);
        last?.classList.add('tor');
    }
}

function cleanBorder() {
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








