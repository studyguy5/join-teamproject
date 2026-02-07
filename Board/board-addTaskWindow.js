
let prioArray = ['Medium'];
window.contactsArray = [];
document.addEventListener('DOMContentLoaded', () => {
    try { renderUserInitials(); } catch (e) { }
});

/**
 * DomContentLoaded initiates Popup, fills local Array, sort it and renders Contacts
 */
document.addEventListener('DOMContentLoaded', async () => {
    init();
    createaddTaskPopup();
    sectionCheck('board');
    tasks.push(...Object.entries(await getData('task')));
    const allIds = tasks.map(ta => ta[1].id)
    let rn = Math.floor(Math.random() * 50)
    while (allIds.includes(rn)) {
        rn = Math.floor(Math.random() * 10)
    }
    filterAndShowTasks();
    searchTaskEventHandling();
    contacts = await getObject(path = '/contacts')
    contactsArray = objectToArray(contacts)
    showContacts();
    /**checks which subwebsite is currently active on display */
    function sectionCheck(idsecTrue) {
        document.getElementById(idsecTrue).classList.add('active')
    }
    const buttons = document.querySelectorAll(".priority-section button");

    if (buttons) {
        buttons.forEach(button => {
            button.addEventListener("click", () => {
                buttons.forEach(b => b.classList.remove("Urgent", "Medium", "Low"));
                const priority = button.dataset.priority;
                button.classList.add(priority);
                prioArray = [];
                prioArray.push(priority);
            });
        })
    };
})


async function getData(path = '') {
    let response = await fetch(BASe_URL + path + ".json")
    return allTasks = await response.json();

}

/** show User Feedback, if the User adds an new Task*/
function showReportAddedTask() {
    const popup = document.getElementById("report");
    popup.classList.add("show");
    setTimeout(() => {
        window.location.href = "../board/board.html";
    }, 900);
    setTimeout(() => {
        popup.classList.remove("show");
    }, 1000);
}
/** renders the html for addTask Popup*/
function createaddTaskPopup() {
    let taskpopup = document.getElementById('add-task-popup')
    taskpopup.innerHTML = renderHTMLOfPopup();
}


/**toggles the div to display the Popup */
function addTask() {
    const popup = document.getElementById("add-task-popup");
    popup.classList.add("show");
    const buttons = document.querySelectorAll(".priority-section button");
    let createdArray = Array.from(buttons)
    createdArray[1].classList.add('Medium')
}


/**close the AddTask Popup */
function closePopup() {
    const popup = document.getElementById("add-task-popup");
    popup.classList.remove("show");
    document.getElementById("countInfoPopup").innerHTML = "";
    const buttons = document.querySelectorAll(".priority-section button");
    document.getElementById('UserFeedbackTitle' ).innerHTML = "";
    document.getElementById('UserFeedbackDate' ).innerHTML = "";
    document.getElementById('UserFeedbackTaskType' ).innerHTML = "";
    let createdArray = Array.from(buttons)
    createdArray[1].classList.remove('Medium')
    clearTask();
}


/**validate values and decide if it is true or error feedback is neccesery */
function createTaskTemplate() {
    const title = document.getElementById("title").value;
    const dueDate = document.getElementById("dueDate").value;
    const taskType = document.getElementById("selectedTask").innerText;
    if (title === "" && dueDate === "" && taskType === "Select Task Category") {
        document.getElementById("UserFeedbackTitle").innerHTML = `This Field is required`;
        document.getElementById("UserFeedbackDate").innerHTML = `This Field is required`;
        document.getElementById("UserFeedbackTaskType").innerHTML = `This Field is required`;
    }
    if (title === "" && dueDate === "") {
        document.getElementById("UserFeedbackTitle").innerHTML = `This Field is required`;
        document.getElementById("UserFeedbackDate").innerHTML = `This Field is required`;
    } else if (dueDate === "" && taskType === 'Select Task Category') {
        document.getElementById("UserFeedbackDate").innerHTML = `This Field is required`;
        document.getElementById("UserFeedbackTaskType").innerHTML = `This Field is required`;
    } else if (title === "" && taskType === 'Select Task Category') {
        document.getElementById("UserFeedbackTitle").innerHTML = `This Field is required`;
        document.getElementById("UserFeedbackTaskType").innerHTML = `This Field is required`;
    } else if (taskType === 'Select Task Category') {
        document.getElementById("UserFeedbackTaskType").innerHTML = `This Field is required`;
    } else if (title === '') {
        document.getElementById("UserFeedbackTitle").innerHTML = `This Field is required`;
    } else if (dueDate === '') {
        document.getElementById("UserFeedbackDate").innerHTML = `This Field is required`;
    } else {
        getTaskInformation();
        document.getElementById('creatButtonID').disabled = true;
        showReportAddedTaskTemplate();
    }
}


/**show the User some feedback, that the Task has been created */
function showReportAddedTaskTemplate() {
    const popup = document.getElementById("report");
    popup.classList.add("show");
    setTimeout(() => {
        popup.classList.remove("show");
        closePopup();
    }, 1000);
    // document.getElementById('creatButtonID').disabled = false;
}


const BASE_URL = "https://join-kanban-app-default-rtdb.europe-west1.firebasedatabase.app"

/**basic function to fetch contacts from firebase */
async function getObject(path = '') {
    let response = await fetch(BASE_URL + path + ".json")
    return responseToJson = await response.json()
}

/**trasform the json based Contacts into an array */
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

/**sort it cronologic from A to Z */
function arraySorting(array) {
    const sortedArray = array
    sortedArray.sort((memberA, memberB) => {
        return memberA.name.localeCompare(memberB.name)
    })
    return sortedArray
}

/**show the contacts in the reserved place within the dropdown Menü */
function showContacts() {
    let contacts = document.getElementById('IdForContacts')
    let preselected = normalContactsArray.concat(filteredContactsArray); // Arrays müssen noch angepasst werden
    contacts.innerHTML = "";
    for (let index = 0; index < contactsArray.length; index++) {
        contacts.innerHTML += `<div onclick="chooseContact(${index})" class="contactBox">
        <div class="contactCirclePopup">${contactsArray[index].firstLetter + contactsArray[index].secondFirstLetter}</div>
        <span for="contactName" class="contactName"> ${contactsArray[index].name}</span> 
        <img  id="checkboxImg-${index}"  class="${preselected.includes(contactsArray[index].name) ? 'checked' : 'checkbox'}" data-set="${contactsArray[index].name}" data-index="${index}" src="/img/icons/normalCheckContact.svg">
        </div>`
    }
}

/**checks if the Contacts have been rendered allready or not to save the choosen ones in the list */
let firstTime = true;
function openContactWithCounterForPopup(id) {
    if (firstTime) {
        showContacts(id);
        openContactView();
        showInput();
        firstTime = false;
    } else {
        openContactView();
        showInput();
    }
}

/**it filters Contacts regarding to your specific typed letters*/
let filteredContacts;
function filterContactsInPopup() {
    let r;
    let typedValue = document.getElementById('filterContacts').value
    if (typedValue.length > 0) {
        let val = Object.values(contactsArray);
        r = val.slice(1)
        filteredContacts = r.filter(fn => { return fn.name.toLowerCase().includes(typedValue.toLowerCase()) })
        renderfilteredContactsInPopup(filteredContacts);
    } else if (typedValue.length < 1) {
        showContacts();
    }
}

/**the filtered Contacts are rendered here */
function renderfilteredContactsInPopup(filteredContacts) {
    let filtContactInPopup = document.getElementById('IdForContacts')
    let preselected = normalContactsArray.concat(filteredContactsArray);
    filtContactInPopup.innerHTML = "";
    for (let filterContactIndex = 0; filterContactIndex < filteredContacts.length; filterContactIndex++) {
        filtContactInPopup.innerHTML += `
        <div onclick="chooseFilteredContact(${filterContactIndex})" class="contactBox">
        <div class="contactCirclePopup">${filteredContacts[filterContactIndex].firstLetter + filteredContacts[filterContactIndex].secondFirstLetter}</div>
        <span for="contactName" class="contactName"> ${filteredContacts[filterContactIndex].name}</span> 
        <img  id="checkboxImg-${filterContactIndex}"  class="${preselected.includes(filteredContacts[filterContactIndex].name) ? 'checked' : 'checkbox'}" data-set="${filteredContacts[filterContactIndex].name}" data-index="${filterContactIndex}" src="/img/icons/normalCheckContact.svg">
        </div>`}
}

/**if you click, the p-tag will be resplaced with an inputfield to filter */
function showInput() {
    if (document.getElementById('placeholderpTag')) {
        document.getElementById('placeholderpTag').classList.toggle('dont-Show');
        document.getElementById('filterContacts').classList.toggle('dont-Show');
        document.getElementById('filterContacts').focus()
    };
}

/**here the Contact DropDown will open and the arrow makes an 180deg move */
function openContactView() {
    let contactDrop = document.getElementById('IdForContacts')
    if (contactDrop.classList.contains('availibleContactsClose')) {
        contactDrop.classList.remove('availibleContactsClose');
        contactDrop.classList.add('availableContactsOpen');
        let layer = document.getElementById('hiddenlayer2')
        layer.classList.toggle('hiddenlayer2')
    } else if (contactDrop.classList.contains('availableContactsOpen')) {
        contactDrop.classList.remove('availableContactsOpen');
        contactDrop.classList.add('availibleContactsClose');
        let layer = document.getElementById('hiddenlayer2')
        layer.classList.toggle('hiddenlayer2')
        let input = document.getElementById('filterContacts').value;
        if(input.length > 0 ){
            document.getElementById('filterContacts').value = "";
            // showContacts();
            console.log('hat funktioniert');

        }
    }
    if (document.querySelectorAll('availableContactsOpen')) {
        let contact = document.getElementById('arrowImgC')
        contact.classList.toggle('select-arrow-open')
    }
}

function closeContactView() {
    let contactDrop = document.getElementById('IdForContacts')
    if (contactDrop.classList.contains('availableContactsOpen')) {
        contactDrop.classList.remove('availableContactsOpen');
        contactDrop.classList.add('availibleContactsClose');
        showInput();
        let layer = document.getElementById('hiddenlayer2')
        layer.classList.toggle('hiddenlayer2')
    } else if (contactDrop.classList.contains('availibleContactsClose')) {
    }
    if (document.querySelectorAll('availableContactsOpen')) {
        let contact = document.getElementById('arrowImgC')
        contact.classList.toggle('select-arrow-open')
    }
}

function resetTaskType() {
    resetTasktypeDropDown();
}


/**here the dropdown Menü for the taskType will be opened */
function openTasktypeDropDown() {
    let drop = document.getElementById('dropId')
    drop.classList.toggle('dropTasktypeClose')
    let layer = document.getElementById('hiddenlayer')
    layer.classList.toggle('hiddenlayer')
    if (document.querySelectorAll('.dropTasktypeOpen')) {
        let ch = document.getElementById('arrowImg')
        ch.classList.toggle('select-arrow-open')
    }
}

function resetTasktypeDropDown() {
    let drop = document.getElementById('dropId')
    if (drop.classList.contains('dropTasktypeClose')) {
    } else {
        drop.classList.add('dropTasktypeClose');
        drop.classList.remove('dropTasktypeOpen');
        let layer = document.getElementById('hiddenlayer')
        layer.classList.toggle('hiddenlayer')
        if (document.querySelectorAll('.dropTasktypeOpen')) {
            let ch = document.getElementById('arrowImg')
            ch.classList.toggle('select-arrow-open')
        }
    }
}

/**here we take the value you click on and render your choise into the input-field innerHTML */
function chooseValue() {
    let choise = document.querySelectorAll('.taskOption')
    choise.forEach(b => b.addEventListener('click', () => {
        const choiseOfTask = b.dataset.value
        document.getElementById('selectedTask').innerHTML = choiseOfTask;
        document.getElementById('UserFeedbackTaskType').innerHTML = "";
    }))
}

function dateInspectPopup() {
    document.getElementById('dueDate').min = new Date().toISOString().split('T')[0];
}

/**in order to not affect all onclicks by one click we need a tool to stop the recognition in a specific div */
function stopBubbling(event) {
    event.stopPropagation()
}

/** resets the typed values in the mask to zero or empty */
function clearTask() {
    const title = document.getElementById("title").value = "";
    document.getElementById("UserFeedbackTitle").innerHTML = "";
    const description = document.getElementById('task-description').value = "";
    const dueDate = document.getElementById("dueDate").value = "";
    document.getElementById("UserFeedbackDate").innerHTML = "";
    let count = document.querySelectorAll('.contactBox .checked')
    count.forEach(ob => ob.classList.remove('checked')),
        count.forEach(ob => ob.classList.add('checkbox')),
        count.forEach(ob => ob.src = "/img/icons/normalCheckContact.svg");
    document.getElementById(`choosenContacts`).innerHTML = "";
    document.getElementById("countInfoPopup").innerHTML = "";
    const buttons = document.querySelectorAll(".priority-section button");
    buttons.forEach(b => b.classList.remove("Urgent", "Medium", "Low"));
    buttons[1].classList.add('Medium');
    const taskType = document.getElementById("selectedTask").innerText = "Select Task Category";
    document.getElementById("UserFeedbackTaskType").innerHTML = "";
    document.getElementById("subtask").value = "";
    document.getElementById('subtask-list-1').classList.remove('scrollClass')
    document.getElementById('subtask-list-1').innerHTML = "";
}

/* ===================== USERNAME & INITIALEN (wie in summary) ===================== */
/**we check the local storage and fetch the username */
function getStoredUserName() {
    const name = localStorage.getItem('userFullName');
    if (name && name.trim()) return name.trim();
    if (sessionStorage.getItem('guest') === 'true') return 'Guest User';
    return 'User';
}
/** here we take the fullName trim the whitespaces change all to low letters and return G if guest */
function getInitials(fullName) {
    const name = (fullName || '').trim().toLowerCase();
    if (name === 'guest user' || name === 'guest') {
        return 'G';
    }
    const parts = name.split(/\s+/).filter(Boolean);
    if (!parts.length) return 'US';
    const first = parts[0][0] || '';
    const last = parts.length > 1 ? parts[parts.length - 1][0] : (parts[0][1] || '');
    return (first + last).toUpperCase();
}

window.renderUserInitials = function renderUserInitials() {
    const fullName = getStoredUserName();
    const initials = getInitials(fullName);
    const el = document.getElementById('userInitials');
    if (el) {
        el.textContent = initials;
        el.setAttribute('title', fullName);
        el.setAttribute('aria-label', fullName);
    }
};

/**her this function is for developing purposes only to fill task with random values to speed up the testing part */
function randomFill() {
    document.getElementById('title').value = 'Beispieltitel';
    document.getElementById('task-description').value = 'Meine Beschreibung hier...';
    document.getElementById('dueDate').value = '12.05.2028';
    document.getElementById('selectedTask').innerHTML = 'User Story';
    prioButton()
}

/**here add to the Urgent button the class Urgent in order to have a prio choosen for testing */
function prioButton() {
    let buttonsEdit = document.querySelectorAll(".priority-section button");
    buttonsEdit.forEach((button) => {
        if (button.innerText === 'Urgent') {
            button.classList.add('Urgent')
        }
    })
}
