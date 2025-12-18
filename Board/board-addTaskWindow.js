
let prioArray = [];
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
    let createdArray =  Array.from(buttons)
    createdArray[1].classList.add('Medium')

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
}


/**close the AddTask Popup */
function closePopup() {
    const popup = document.getElementById("add-task-popup");
    popup.classList.remove("show");
    clearTask();
}


/**check value lenght of input-Fields */
function constantCheck() {
    
    const title = document.getElementById("title").value;
        const description = document.getElementById('task-description').value;
        const dueDate = document.getElementById("dueDate").value;
        const taskType = document.getElementById("selectedTask").innerText;
            
}

function constantCheckTitlePopup() {
    console.log('validation läuft')
    const title = document.getElementById("title").value;
    if (title.length < 2)
        return showUserFeedbackTitlePopup(title);
    document.getElementById('task-description').disabled = true, false;
    document.getElementById("UserFeedbackTitle").innerHTML = "";
    document.getElementById('task-description').disabled = false;

    if (!validateTitleAddTaskNormal(title))
        return showUserFeedbackTitleFormPopup(title);
    document.getElementById('task-description').disabled = true, false;
    document.getElementById("UserFeedbackTitle").innerHTML = "";
    document.getElementById('task-description').disabled = false;
    
}

function constantCheckDatePopup() {

    const dueDate = document.getElementById("dueDate").value;
    if (dueDate !== "")
        document.getElementById('creatButtonID').disabled = false;
    if (!validateDateAddTaskPopup(dueDate))
        return showUserFeedbackDueDatePopup();
    if (validateDateAddTaskPopup(dueDate))
        clearUserFeedback = document.getElementById("UserFeedbackDate");
    clearUserFeedback.innerHTML = '';

}

function validateTitleAddTaskNormal(title) {
    const titleRegex = /^[A-Za-zÄÖÜäöüß\s]+$/;
    return titleRegex.test(title.trim());
}

function validateDateAddTaskPopup(dueDate) {
    const dateRegex = /^\d{2}\.\d{2}\.\d{4}$/;
    return dateRegex.test(dueDate.trim());
}

function showUserFeedbackTitlePopup() {
    const titleUserFeedbackLength = document.getElementById("UserFeedbackTitle");
    titleUserFeedbackLength.innerHTML = `title is too short`;
}

function showUserFeedbackTitleFormPopup() {
    const titleUserFeedbackForm = document.getElementById("UserFeedbackTitle");
    titleUserFeedbackForm.innerHTML = `form of Title is incorrect`
}

function showUserFeedbackDueDatePopup() {
    const dateInput = document.getElementById("UserFeedbackDate");
    dateInput.innerHTML = `form of DueDate is incorrect`;
}


/**validate values and decide if it is true or error feedback is neccesery */
function createTaskTemplate() {
    const title = document.getElementById("title").value;
    const dueDate = document.getElementById("dueDate").value;
    const taskType = document.getElementById("selectedTask").innerText; // <-- hidden input
    if (title === "" && dueDate === "") {
        document.getElementById("UserFeedbackTitle").innerHTML = `This Field is required`;
        document.getElementById("UserFeedbackDate").innerHTML = `This Field is required`;
    }else if(dueDate === "" && taskType === 'Select Task Category'){
        document.getElementById("UserFeedbackDate").innerHTML = `This Field is required`;
        document.getElementById("UserFeedbackTaskType").innerHTML = `This Field is required`;
    }else if(title === "" && taskType ==='Select Task Category'){
        document.getElementById("UserFeedbackTitle").innerHTML = `This Field is required`;
        document.getElementById("UserFeedbackTaskType").innerHTML = `This Field is required`;
    }else if(taskType === 'Select Task Category'){
        document.getElementById("UserFeedbackTaskType").innerHTML = `This Field is required`;
    }else if(title === ''){
        document.getElementById("UserFeedbackTitle").innerHTML = `This Field is required`;
    }else if(dueDate === ''){
        document.getElementById("UserFeedbackDate").innerHTML = `This Field is required`;
    } else {
        getTaskInformation();
        showReportAddedTaskTemplate();
    }
}

/**display the specific error message */
function displayRequiredMessageTemp() {
    const titleInput = document.getElementById("title");
    const dateInput = document.getElementById("dueDate");
    const categoryInput = document.getElementById("categoryValue");
    const categoryDiv = document.getElementById("IdForTaskChoise");
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

/**show the User some feedback, that the Task has been created */
function showReportAddedTaskTemplate() {
    const popup = document.getElementById("report");
    popup.classList.add("show");
    setTimeout(() => {
        popup.classList.remove("show");
        closePopup();
    }, 1000);
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
    contacts.innerHTML = "";
    for (let index = 1; index < contactsArray.length; index++) {
        contacts.innerHTML += `<div class="contactBox">
        <div class="contactCirclePopup">${contactsArray[index].firstLetter + contactsArray[index].secondFirstLetter}</div>
        <span for="contactName" class="contactName"> ${contactsArray[index].name}</span> 
        <img  id="checkboxImg-${index}" onclick="chooseContact(${index})" class="checkbox" data-set="${contactsArray[index].name}" src="/img/icons/normalCheckContact.svg">
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
    filtContactInPopup.innerHTML = "";
    for (let filterContactIndex = 0; filterContactIndex < filteredContacts.length; filterContactIndex++) {
        filtContactInPopup.innerHTML += `
        <div onclick="" class="contactBox">
        <div class="contactCirclePopup">${filteredContacts[filterContactIndex].firstLetter + filteredContacts[filterContactIndex].secondFirstLetter}</div>
        <span for="contactName" class="contactName"> ${filteredContacts[filterContactIndex].name}</span> 
        <img  id="checkboxImg-${filterContactIndex}" onclick="chooseFilteredContact(${filterContactIndex})" class="checkbox" data-set="${filteredContacts[filterContactIndex].name}" src="/img/icons/normalCheckContact.svg">
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
        contactDrop.classList.add('availibleContactsOpen');
        let layer = document.getElementById('hiddenlayer2')
        layer.classList.toggle('hiddenlayer2')
    } else if (contactDrop.classList.contains('availibleContactsOpen')) {
        contactDrop.classList.remove('availibleContactsOpen');
        contactDrop.classList.add('availibleContactsClose');
        let layer = document.getElementById('hiddenlayer2')
        layer.classList.toggle('hiddenlayer2')
    }
    if (document.querySelectorAll('availibleContactsOpen')) {
        let contact = document.getElementById('arrowImgC')
        contact.classList.toggle('select-arrow-open')
    }
}

/**here we check which Contacts have the checkbox img and change it into checked to make it visible */
function chooseContact(index) {
    let choContact = document.getElementById(`checkboxImg-${index}`)
    if (choContact.src.includes("/img/icons/normalCheckContact.svg")) {
        choContact.classList.remove('checkbox')
        choContact.classList.add('checked')
        renderChoosenContact(index);
        choContact.src = "/img/icons/normalCheckedContact.svg"
    } else {
        choContact.classList.add('checkbox')
        choContact.classList.remove('checked')
        deleteRenderedContact(index);
        choContact.src = "/img/icons/normalCheckContact.svg"
    }
}

/**her we make the choosen Contacts within the filtered Contacts visible */
function chooseFilteredContact(filterContactIndex) {
    let choContactF = document.getElementById(`checkboxImg-${filterContactIndex}`)
    if (choContactF.src.includes("/img/icons/normalCheckContact.svg")) {
        choContactF.classList.remove('checkbox')
        choContactF.classList.add('checked')
        renderFilteredChoosenContact(filterContactIndex)
        choContactF.src = "/img/icons/normalCheckedContact.svg"
    } else {
        choContactF.classList.add('checkbox')
        choContactF.classList.remove('checked')
        deleteRenderedContact(filterContactIndex);
        choContactF.src = "/img/icons/normalCheckContact.svg"
    }
}

/**the choosen Contacts are rendered on the below of the dropdown List  */
function renderChoosenContact(index) {
    let listContact = document.getElementById('choosenContacts')
    listContact.innerHTML += `
    <div id="contactCirclePopupRender-${index}" class="contactCirclePopupRender">${contactsArray[index].firstLetter + contactsArray[index].secondFirstLetter}</div>`
}

/**here we render the filtered choosen Contacts below the dropdown */
function renderFilteredChoosenContact(filterContactIndex) {
    let listContact = document.getElementById('choosenContacts')
    listContact.innerHTML += `
    <div id="contactCirclePopupRender-${filterContactIndex}" class="contactCirclePopupRender">${filteredContacts[filterContactIndex].firstLetter + filteredContacts[filterContactIndex].secondFirstLetter}</div>`
}

/**here we can delete a choosen Contacts if we decide we want another contact */
function deleteRenderedContact(index) {
    let renderedContact = document.getElementById(`contactCirclePopupRender-${index}`)
    renderedContact.remove(`contactCirclePopupRender-${index}`)
    renderedContact.innerHTML = '';
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

/**here we take the value you click on and render your choise into the input-field innerHTML */
function chooseValue() {
    let choise = document.querySelectorAll('.taskOption')
    choise.forEach(b => b.addEventListener('click', () => {
        const choiseOfTask = b.dataset.value
        document.getElementById('selectedTask').innerHTML = choiseOfTask;
    }))
}

/**in order to not affect all onclicks by one click we need a tool to stop the recognition in a specific div */
function stopBubbling(event) {
    event.stopPropagation()
}

/** resets the typed values in the mask to zero or empty */
function clearTask() {
    const title = document.getElementById("title").value = "";
    const description = document.getElementById('task-description').value = "";
    const dueDate = document.getElementById("dueDate").value = "";
    document.getElementById(`choosenContacts`).innerHTML = "";
    const buttons = document.querySelectorAll(".priority-section button");
    buttons.forEach(b => b.classList.remove("Urgent", "Medium", "Low"));
    const taskType = document.getElementById("selectedTask").innerText = "Select Task Category";
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
