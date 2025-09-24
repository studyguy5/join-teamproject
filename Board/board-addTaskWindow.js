
let prioArray = [];
window.contactsArray = [];
document.addEventListener('DOMContentLoaded', async () => {
    init();
    createaddTaskPopup();
    sectionCheck('board');
    filterAndShowTasks();
    
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
                buttons.forEach(b => b.classList.remove("urgent", "medium", "low"));
                const priority = button.dataset.priority;
                button.classList.add(priority);
                // prioArray.push(priority);
                console.log(priority)
                prioArray = [];
                prioArray.push(priority);
            });
        })
    };
})



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
    showReportAddedTaskTemplate();
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


