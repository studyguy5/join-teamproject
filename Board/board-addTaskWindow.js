
let prioArray = [];
window.contactsArray = [];
document.addEventListener('DOMContentLoaded', async () => {
    init();
    createaddTaskPopup();
    sectionCheck('board');
    tasks.push(...Object.entries(await getData('task')));
   const allIds = tasks.map(ta => ta[1].id) 
    console.log(allIds);
    let rn = Math.floor(Math.random()*50)
    while (allIds.includes(rn)) {
      rn = Math.floor(Math.random()*10)  
    }
    console.log(rn);
    filterAndShowTasks();
    searchTaskEventHandling();
    contacts = await getObject(path = '/contacts')
    console.log(contacts);
    contactsArray = objectToArray(contacts)
    console.log(contactsArray);
    showContacts();
    
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
                console.log(priority)
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

function createaddTaskPopup() {
    let taskpopup = document.getElementById('add-task-popup')
    taskpopup.innerHTML = renderHTMLOfPopup();
}



function addTask() {
    const popup = document.getElementById("add-task-popup");
    popup.classList.add("show");
}



function closePopup() {
    const popup = document.getElementById("add-task-popup");
    popup.classList.remove("show");
}


function createTaskTemplate() {
    if (!formValidationAddTaskTemp()) return;
    showReportAddedTaskTemplate();
}

function constantCheck() {
    setTimeout(() => {
    const title = document.getElementById("title").value;
    const description = document.getElementById('task-description').value;
    const dueDate = document.getElementById("dueDate").value;
    const taskType = document.getElementById("selectedTask").innerText;
    console.log("it check's")
    if (title !== "" && dueDate !== "" && description !== "" && taskType !== "Select Task Category") {
    }}, 500);
}


function makeDisabled() {
    document.getElementById('creatButtonID').disabled = true;
}


function formValidationAddTaskTemp() {
    const title = document.getElementById("title").value;
    const dueDate = document.getElementById("dueDate").value;
    const taskType = document.getElementById("selectedTask").innerText; // <-- hidden input
    if (title === "" || dueDate === "" || taskType === "Select Task Category") {
        displayRequiredMessageTemp();
        return false;
    } else {
        getTaskInformation();
        return true;
    }
}


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
    }else {
        categoryMessage.classList.add("d-none");
        categoryDiv.classList.remove("input-error");
    }
}


function showReportAddedTaskTemplate() {
    const popup = document.getElementById("report");
    popup.classList.add("show");
    setTimeout(() => {
        popup.classList.remove("show");
        closePopup();
    }, 1000);
}


const BASE_URL = "https://join-kanban-app-default-rtdb.europe-west1.firebasedatabase.app"

async function getObject(path = '') {
    let response = await fetch(BASE_URL + path + ".json")
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
    return arrayObject;
}


function arraySorting(array) {
    const sortedArray = array
    sortedArray.sort((memberA, memberB) => {
        return memberA.name.localeCompare(memberB.name)
    })
    return sortedArray
}


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

let first = true;
function openContactWithCounter(id) {
    if (first) {
        showContacts(id);
        openContactView();
        showInput();
        first = false;
    } else {
        openContactView();
        showInput();
    }
}


let filteredContacts;
function filterContactsInPopup() {
    let r;
    let typedValue = document.getElementById('filterContacts').value
    if (typedValue.length > 0) {
        let val = Object.values(contactsArray);
        r = val.slice(1)
        filteredContacts = r.filter(fn => {return fn.name.toLowerCase().includes(typedValue.toLowerCase())})
        renderfilteredContactsInPopup(filteredContacts);    
    }else if(typedValue.length < 1){
        showContacts();
    }
}


function renderfilteredContactsInPopup(filteredContacts){
    let filtContactInPopup =  document.getElementById('IdForContacts')
    filtContactInPopup.innerHTML = "";
    for (let filterContactIndex = 0; filterContactIndex < filteredContacts.length; filterContactIndex++) {   
        filtContactInPopup.innerHTML += `
        <div onclick="" class="contactBox">
        <div class="contactCirclePopup">${filteredContacts[filterContactIndex].firstLetter + filteredContacts[filterContactIndex].secondFirstLetter}</div>
        <span for="contactName" class="contactName"> ${filteredContacts[filterContactIndex].name}</span> 
        <img  id="checkboxImg-${filterContactIndex}" onclick="chooseFilteredContact(${filterContactIndex})" class="checkbox" data-set="${filteredContacts[filterContactIndex].name}" src="/img/icons/normalCheckContact.svg">
        </div>`}
    }

    
    function showInput() {
        console.log('show input')
        if (document.getElementById('placeholderpTag')){
            document.getElementById('placeholderpTag').classList.toggle('dont-Show');
            document.getElementById('filterContacts').classList.toggle('dont-Show');
            document.getElementById('filterContacts').focus()};
    }
    

function openContactView() {
    let contactDrop = document.getElementById('IdForContacts')
    if(contactDrop.classList.contains('availibleContactsClose')) {
        contactDrop.classList.remove('availibleContactsClose');
        contactDrop.classList.add('availibleContactsOpen');
        let layer = document.getElementById('hiddenlayer2')
        layer.classList.toggle('hiddenlayer2')
  } else if(contactDrop.classList.contains('availibleContactsOpen')) {
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


function renderChoosenContact(index) {
    let listContact = document.getElementById('choosenContacts')
    listContact.innerHTML += `
    <div id="contactCirclePopupRender-${index}" class="contactCirclePopupRender">${contactsArray[index].firstLetter + contactsArray[index].secondFirstLetter}</div>`
}


function renderFilteredChoosenContact(filterContactIndex) {
    let listContact = document.getElementById('choosenContacts')
    listContact.innerHTML += `
    <div id="contactCirclePopupRender-${filterContactIndex}" class="contactCirclePopupRender">${filteredContacts[filterContactIndex].firstLetter + filteredContacts[filterContactIndex].secondFirstLetter}</div>`
}


function deleteRenderedContact(index) {
    let renderedContact = document.getElementById(`contactCirclePopupRender-${index}`)
    renderedContact.remove(`contactCirclePopupRender-${index}`)
    renderedContact.innerHTML = '';
}


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


function chooseValue() {
    let choise = document.querySelectorAll('.taskOption')
    choise.forEach(b => b.addEventListener('click', () => {
        const choiseOfTask = b.dataset.value
        console.log(choiseOfTask);
        document.getElementById('selectedTask').innerHTML = choiseOfTask;
    }))
}


function stopBubbling(event) {
    event.stopPropagation()
}


function clearTask(){
    const title = document.getElementById("title").value = "";
    const description = document.getElementById('task-description').value = "";
    const dueDate = document.getElementById("dueDate").value = "";
    document.getElementById(`choosenContacts`).innerHTML= "";
    const buttons = document.querySelectorAll(".priority-section button");
    buttons.forEach(b => b.classList.remove("Urgent", "Medium", "Low"));
    const taskType = document.getElementById("selectedTask").innerText = "Select Task Category";
    document.getElementById('subtask-list-1').innerHTML = "";
}


/* --- dein vorhandener board-addTaskWindow.js Code bleibt komplett wie er ist --- */
/* ===================== USERNAME & INITIALEN (wie in summary) ===================== */
function getStoredUserName() {
  const name = localStorage.getItem('userFullName');
  if (name && name.trim()) return name.trim();
  if (sessionStorage.getItem('guest') === 'true') return 'Guest User';
  return 'User';
}


function getInitials(fullName) {
  const parts = (fullName || '').trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return 'US';
  const first = parts[0][0] || '';
  const last  = parts.length > 1 ? parts[parts.length - 1][0] : (parts[0][1] || '');
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


document.addEventListener('DOMContentLoaded', () => {
  try { renderUserInitials(); } catch (e) {}
});

function randomFill(){
document.getElementById('title').value = 'Beispieltitel';
document.getElementById('task-description').value = 'Meine Beschreibung hier...';
document.getElementById('dueDate').value = '12.05.2028';
document.getElementById('selectedTask').innerHTML = 'User Story';
prioButtonactivate()
}
function prioButtonactivate() {
    const buttonsEdit = document.querySelectorAll(".priority-sectionEdit button");
    let rightTask = tasks.find(r => r[1].id > 10);
    let thisprio = rightTask[1].prio;
    buttonsEdit.forEach((button) => {
        if (button.innerText === thisprio) {
            button.classList.add(thisprio)
        }
    })
}
