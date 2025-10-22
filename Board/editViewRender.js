

document.addEventListener('DOMContentLoaded', async () => {
  contacts = await getObject(path = '/contacts')
  contactsArray = objectToArray(contacts);
  
})

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



function closeEditView() {
  console.log('ruft auf')
  const popup = document.getElementById('bigViewOfTask');
  popup.classList.add("dont-Show");
}

function getCurrentValues(id){
  const singleTask = tasks.find(task => task[1].id === id);
    document.getElementById("titleEdit").value = `${singleTask[1].title}`
    document.getElementById('task-descriptionEdit').value = `${singleTask[1].description}`;
    document.getElementById("dueDateEdit").value = `${singleTask[1].DueDate}`;
    renderChoosenContactEdit(id);
    document.getElementById("selectedTaskEditView").innerText = `${singleTask[1].taskType}`;
    console.log("")
}


function openTasktypeDropDownEdit() {
    let drop = document.getElementById('dropIdEdit')
    drop.classList.toggle('dropTasktypeCloseEdit')
    let layer = document.getElementById('hiddenlayer')
    layer.classList.toggle('hiddenlayer')
    if (document.querySelectorAll('.dropTasktypeOpenEdit')) {
        let ch = document.getElementById('arrowImgEdit')
        ch.classList.toggle('select-arrow-openEdit')
    }
}

function chooseValueEdit() {
    let choise = document.querySelectorAll('.taskOptionEdit')

    choise.forEach(b => b.addEventListener('click', () => {
        const choiseOfTask = b.dataset.value
        console.log(choiseOfTask);
        document.getElementById('selectedTaskEditView').innerHTML = choiseOfTask;
    }))

}

function openContactViewEdit() {
    let contactDrop = document.getElementById('IdForContactsEdit')
    if(contactDrop.classList.contains('availibleContactsCloseEdit')) {
    contactDrop.classList.remove('availibleContactsCloseEdit');
    contactDrop.classList.add('availibleContactsOpenEdit');
  } else if(contactDrop.classList.contains('availibleContactsOpenEdit')) {
    contactDrop.classList.remove('availibleContactsOpenEdit');
    contactDrop.classList.add('availibleContactsCloseEdit');
  }
    
    if (document.querySelectorAll('availibleContactsOpenEdit')) {
        let contact = document.getElementById('arrowImgCEdit')
        contact.classList.toggle('select-arrow-openEdit')
    }
}

function showContactsEdit() {
  console.log('arbeitet auch im edit')
    let contacts = document.getElementById('IdForContactsEdit')
    console.log(contacts);
    contacts.innerHTML = "";
    for (let index = 1; index < contactsArray.length; index++) {
        // console.log(contactsArray);
        contacts.innerHTML += `<div class="contactBox">
        <div class="contactCirclePopup">${contactsArray[index].firstLetter + contactsArray[index].secondFirstLetter}</div>
        <span for="contactName" class="contactName"> ${contactsArray[index].name}</span> 
        <img  id="checkboxImg-${index}" onclick="chooseContactEdit(${index})" class="checkbox" data-set="${contactsArray[index].name}" src="/img/icons/normalCheckContact.svg">
        </div>`

    }
}

function chooseContactEdit(index) {
    let choContact = document.getElementById(`checkboxImg-${index}`)
    if (choContact.src.includes("/img/icons/normalCheckContact.svg")) {
        choContact.classList.remove('checkbox')
        choContact.classList.add('checked')
        renderChoosenContactEdit(index);
        choContact.src = "/img/icons/normalCheckedContact.svg"
    } else {
        choContact.classList.add('checkbox')
        choContact.classList.remove('checked')
        deleteRenderedContactEdit(index);
        choContact.src = "/img/icons/normalCheckContact.svg"
    }
}

function chooseFilteredContact(filterContactIndex) {
    let choContact = document.getElementById(`checkboxImg-${filterContactIndex}`)
    if (choContact.src.includes("/img/icons/normalCheckContact.svg")) {
        choContact.classList.remove('checkbox')
        choContact.classList.add('checked')
        renderFilteredChoosenContact(filterContactIndex)
        choContact.src = "/img/icons/normalCheckedContact.svg"
    } else {
        choContact.classList.add('checkbox')
        choContact.classList.remove('checked')
        deleteRenderedContact(filterContactIndex);
        choContact.src = "/img/icons/normalCheckContact.svg"
    }
}

let thisTask;
function renderChoosenContactEdit(id) {
  let Choosen = document.getElementById('choosenContactsEdit')
  const RightTask = tasks.find(task => task[1].id === id);
  for (let preIndex = 0; preIndex < RightTask[1].assignedTo.length; preIndex++) {
  
  thisTask = RightTask[1].assignedTo.map(c => c.split(" ").map(f => f.charAt(0)))
    Choosen.innerHTML += `
    <div id="contactCirclePopupRender-${id}" class="contactCirclePopupRender">${thisTask[preIndex][0] + thisTask[preIndex][1]}</div>
    `
    ;}
}

function renderFilteredChoosenContact(filterContactIndex) {
    let listContact = document.getElementById('choosenContacts')

    listContact.innerHTML += `
    <div id="contactCirclePopupRender-${filterContactIndex}" class="contactCirclePopupRender">${filteredContacts[filterContactIndex].firstLetter + filteredContacts[filterContactIndex].secondFirstLetter}</div>
    `
  
}

function deleteRenderedContactEdit(index) {
    let renderedContact = document.getElementById(`contactCirclePopupRender-${index}`)
    renderedContact.remove(`contactCirclePopupRender-${index}`)
    renderedContact.innerHTML = '';
}

function renderBigEditView() {
  return `<div class="editViewHeader">
        
          <img onclick="closeEditView()" src="/img/icons/close-icon.svg" />
        </div>
    
    
    <section   class="editBigView">
    <div onclick="openTasktypeDropDown()" id="hiddenlayer" class="hiddenlayer show" ></div>
        

        <div class="editView-mainInput">
          <section class="input-section-leftEditView">

              <label>Title<span class="requiredStar">*</span></label>
              <input oninput="constantCheck()" class="input-section-left-inputEditView" id="titleEdit" type="text" placeholder="Enter a title" />
              <p class="required d-none">This field is required</p>

              <label>Description</label>
              <textarea id="task-descriptionEdit" oninput="constantCheck()" rows="5" id="task-description" placeholder="Enter a description"></textarea>

              <label>Due Date<span class="requiredStar">*</span></label>
              <input oninput="constantCheck()" class="input-section-left-inputEditView dateEditView" id="dueDateEdit" placeholder="dd/mm/yyyy">
              <p class="required d-none">This field is required</p>
            </section>

          

          <div class="input-section-right-EditView">
            <p>Priority</p>
            <section class="priority-section">
              <button class="button" data-priority="Urgent" type="button">
                Urgent<img src="/img/icons/urgent.svg" />
              </button>

              <button class="button" data-priority="Medium" type="button">
                Medium<img src="/img/icons/medium.svg" />
              </button>

              <button class="button" data-priority="Low" type="button">
                Low<img src="/img/icons/low.svg" />
              </button>
            </section>

            <p class="assignedToEdit">Assigned to</p>
            <div  class="section-right-selectEditView"  required tabindex="0" onclick="showContactsEdit(); openContactViewEdit(); showInput()">
              <p id="placeholderpTag">Select contacts to assign</p>
              <input oninput="filterContactsInPopup()"  type="text" id="filterContacts"  class="dont-Show hidden-input">
              <img id="arrowImgCEdit" class="select-arrow-downCEdit" src="/img/icons/select-arrow-down.svg"> 
            </div>
            <div id="IdForContactsEdit" class="availibleContactsCloseEdit">
              
            </div>
            <div id="choosenContactsEdit" class="choosenContactsEdit"></div>

            <p class="taskChoiseEdit">Category<span class="requiredStar">*</span></p>
            <div id="IdForTaskChoise" class="section-right-selectEditView"  onclick="event.stopPropagation(); openTasktypeDropDownEdit()">
              
            <p id="selectedTaskEditView">Select Task Category</p>
              <img id="arrowImgEdit" class="select-arrow-downTEdit" src="/img/icons/select-arrow-down.svg">
            </div>
            <p class="required d-none">This field is required</p>
              <div id="dropIdEdit" class="dropTasktypeCloseEdit dropTasktypeOpenEdit" >

              <input  type="hidden" id="categoryValue" name="category" class="hidden-input"> 
                
                <div onmousedown="chooseValueEdit()" onclick="openTasktypeDropDownEdit(); constantCheck()"  id="option" class="taskOptionEdit" data-value="Technical Task">Technical Task</div>
                <div onmousedown="chooseValueEdit()" onclick="openTasktypeDropDownEdit(); constantCheck()"  id="option" class="taskOptionEdit" data-value="User Story">User Story</div>
              </div>
              
            

            <p class="subtaskEdit">Subtask</p>
            <div class="subtask-wrapperEditView">
              <input class="inputPopupEditView" id="subtask" type="text" placeholder="Enter new subtask">
                            <span class="subtask-icon">
                                <img onmousedown="clearSubtask()" class="x" src="/img/icons/subtasks-X.svg">
                                <img class="delimiter" src="/img/icons/delimiter-vertical.svg">
                                <img onmousedown="renderSubtask()" class="hook" src="/img/icons/subtasks-icon.svg">
                            </span>
              </div>
                    <ul class="ul-div" id="subtask-list-1" class="subtask-list">
                    </ul>
          </div>
        </div>

        

        <div class="reportPopup" id="report">
          Task added to board <img src="/img/icons/board.svg" />
        </div>
        
      </section>


<div class="footerPopupEditView">
          <div class="footer-buttons-sectionEditView">
            <button id="creatButtonID" type="button" disabled onclick="constantCheck(); createTaskTemplate(); getTaskInformation()" class="create-task-btn">
              OK<img class="checkEditView" src="/img/icons/doneSymbol.svg" />
            </button>
          </div>
        </div>

      
    `
}
