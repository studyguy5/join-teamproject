
let prioArray = [];
window.contactsArray = [];
document.addEventListener('DOMContentLoaded', async () => {
    init();
    createaddTaskPopup();
    sectionCheck('board');
    
    tasks.push(...Object.values(await getData('task')));
    filterAndShowTasks();
    searchTaskEventHandling();
    contacts = await getObject(path = '/contacts')
    console.log(contacts);
    contactsArray = objectToArray(contacts)
    console.log(contactsArray);
    showContacts();
    // renderContact();
   
    // renderMiniContactList(arraySorting(contactsArray), targetID = 'contactList') hier logik für das rendern der Mini-Contacte einbauen

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


function formValidationAddTaskTemp() {
    const title = document.getElementById("title").value;
    const dueDate = document.getElementById("dueDate").value;
    const category = document.getElementById("categoryValue").value; // <-- hidden input
    
    if (title === "" || dueDate === "") {
        displayRequiredMessageTemp();
        return false;
    }
    return true;
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
    } else {
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

function showContacts() {
    let contacts = document.getElementById('IdForContacts')
    for (let index = 1; index < contactsArray.length; index++) {
        // console.log(contactsArray);
        contacts.innerHTML += `<div onclick="" class="contactBox">
        <div class="contactCirclePopup">${contactsArray[index].firstLetter + contactsArray[index].secondFirstLetter}</div>
            <span for="contactName" class="contactName"> ${contactsArray[index].name}</span> 
            <img  id="checkboxImg-${index}" onclick="chooseContact(${index})" class="checkbox" data-set="${contactsArray[index].name}" src="/img/icons/normalCheckContact.svg">
            </div>`

    }
}

function chooseContact(index){
    let choContact = document.getElementById(`checkboxImg-${index}`)
    if(choContact.src.includes("/img/icons/normalCheckContact.svg")){
        choContact.classList.remove('checkbox')
        choContact.classList.add('checked')
        renderChoosenContact(index);
    choContact.src= "/img/icons/normalCheckedContact.svg"}else{
        choContact.classList.add('checkbox')
        choContact.classList.remove('checked')
        deleteRenderedContact(index);
        choContact.src= "/img/icons/normalCheckContact.svg"
    }
}

function renderChoosenContact(index){
    let listContact = document.getElementById('choosenContacts')
    
    listContact.innerHTML+=`
    <div id="contactCirclePopupRender-${index}" class="contactCirclePopupRender">${contactsArray[index].firstLetter + contactsArray[index].secondFirstLetter}</div>
    `
    console.log(listContact);
}

function deleteRenderedContact(index){
    let renderedContact = document.getElementById(`contactCirclePopupRender-${index}`)
    renderedContact.remove(`contactCirclePopupRender-${index}`)
    renderedContact.innerHTML = '';
}

function openTasktypeDropDown(){
    let drop = document.getElementById('dropId')
    drop.classList.toggle('dropTasktypeClose')
    let layer = document.getElementById('hiddenlayer')
    layer.classList.toggle('hiddenlayer')
    if(document.querySelectorAll('.dropTasktypeOpen')){
        let ch = document.getElementById('arrowImg')
        ch.classList.toggle('select-arrow-open') 
    }
}

function openContactView(){
    let contactDrop = document.getElementById('IdForContacts')
    contactDrop.classList.toggle('availibleContactsClose')
    if(document.querySelectorAll('availibleContactsOpen')){
        let contact = document.getElementById('arrowImgC')
        contact.classList.toggle('select-arrow-open')
    }
}

function chooseValue(){
    let choise = document.querySelectorAll('.taskOption')
    
    choise.forEach(b => b.addEventListener('click', () => {
        const choiseOfTask = b.dataset.value
        console.log(choiseOfTask);
        document.getElementById('selectedTask').innerHTML = choiseOfTask;
    }))
    
}

function stopBubbling(event){
        
        event.stopPropagation()
    }


