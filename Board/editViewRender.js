


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
  // document.getElementById("selectedTaskEditView").innerText = `${singleTask[1].taskType}`;
  console.log("")
}

// taskType  komplett entfernen (darf im Edit-Modus nicht erscheinen)
// function openTasktypeDropDownEdit() {
//   let drop = document.getElementById('dropIdEdit')
//   drop.classList.toggle('dropTasktypeCloseEdit')
//   let layer = document.getElementById('hiddenlayer')
//   layer.classList.toggle('hiddenlayer')
//   if (document.querySelectorAll('.dropTasktypeOpenEdit')) {
//     let ch = document.getElementById('arrowImgEdit')
//     ch.classList.toggle('select-arrow-openEdit')
//   }
// }
// // auch das hier entfernen(gehört auch zum TaskType)
// function chooseValueEdit() {
//   let choise = document.querySelectorAll('.taskOptionEdit')

//   choise.forEach(b => b.addEventListener('click', () => {
//     const choiseOfTask = b.dataset.value
//     console.log(choiseOfTask);
//     document.getElementById('selectedTaskEditView').innerHTML = choiseOfTask;
//   }))

// }

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

function showInput() {
  console.log('show input')
  if (document.getElementById('placeholderpTagEdit')) {
    document.getElementById('placeholderpTagEdit').classList.toggle('dont-Show');
    document.getElementById('filterContactsEdit').classList.toggle('dont-Show');
    document.getElementById('filterContactsEdit').focus()
  };
}

function showContactsEdit(id) {
  console.log('arbeitet auch im edit')
  let contacts = document.getElementById('IdForContactsEdit')
  console.log(contacts);
  contacts.innerHTML = "";
  for (let index = 1; index < contactsArray.length; index++) {
    // console.log(contactsArray);
    contacts.innerHTML += `<div class="contactBox">
        <div class="contactCirclePopup">${contactsArray[index].firstLetter + contactsArray[index].secondFirstLetter}</div>
        <span for="contactName" class="contactName"> ${contactsArray[index].name}</span> 
        <img  id="checkboxImgEdit-${index}" onclick="chooseContactEdit(${id}, ${index})" class="checkboxEdit" data-set="${contactsArray[index].name}" src="/img/icons/normalCheckContact.svg">
        </div>`

  }
}

let filteredContactsEdit;
function filterContactsInPopupEdit() {
  let r;

  let typedValue = document.getElementById('filterContactsEdit').value

  if (typedValue.length > 0) {
    let val = Object.values(contactsArray);

    r = val.slice(1)
    filteredContactsEdit = r.filter(fn => { return fn.name.toLowerCase().includes(typedValue.toLowerCase()) })

    renderfilteredContactsInPopupEdit(filteredContactsEdit);

    //    console.log(filteredContacts);
  } else if (typedValue.length < 1) {
    showContactsEdit();
  }
}

// Liste der Kontakte
function chooseContactEdit(id, index) {
  let choContact = document.getElementById(`checkboxImgEdit-${index}`)
  if (choContact.src.includes("/img/icons/normalCheckContact.svg")) {
    choContact.classList.remove('checkboxEdit')
    choContact.classList.add('checkedEdit')
    renderChoosenContactEdit(id, index);
    choContact.src = "/img/icons/normalCheckedContact.svg"
  } else {
    choContact.classList.add('checkboxEdit')
    choContact.classList.remove('checkedEdit')
    deleteRenderedContactEdit(id, index);
    choContact.src = "/img/icons/normalCheckContact.svg"
  }
}

function renderfilteredContactsInPopupEdit(filteredContactsEdit) {

  let filtContactInPopupEdit = document.getElementById('IdForContactsEdit')
  filtContactInPopupEdit.innerHTML = "";
  for (let filterContactIndex = 0; filterContactIndex < filteredContactsEdit.length; filterContactIndex++) {
    filtContactInPopupEdit.innerHTML += `
        <div onclick="" class="contactBox">
        <div class="contactCirclePopup">${filteredContactsEdit[filterContactIndex].firstLetter + filteredContactsEdit[filterContactIndex].secondFirstLetter}</div>
        <span for="contactName" class="contactName"> ${filteredContactsEdit[filterContactIndex].name}</span> 
        <img  id="checkboxImg-${filterContactIndex}" onclick="chooseFilteredContact(${filterContactIndex})" class="checkbox" data-set="${filteredContactsEdit[filterContactIndex].name}" src="/img/icons/normalCheckContact.svg">
        </div>
        `}

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
function renderChoosenContactEdit(id, index) {
  let Choosen = document.getElementById('choosenContactsEdit')
  const RightTask = tasks.find(task => task[1].id === id);
  // render und pushen wenn array < 2
  if (index && RightTask[1].assignedTo.length < 2) {
    const contList = contactsArray[index]
    RightTask[1].assignedTo.push(contList?.name);
    for (let preIndex = RightTask[1].assignedTo.length - 1; preIndex < RightTask[1].assignedTo.length; preIndex++) {

      thisTask = RightTask[1].assignedTo.map(c => c.split(" ").map(f => f.charAt(0)))
      Choosen.innerHTML += `
    <div id="contactCirclePopupRender-${id}" class="contactCirclePopupRender">${thisTask[preIndex][0] + thisTask[preIndex][1]}</div>
    `;
    }
    // normal rendern, wenn array voll
  } else if(index && RightTask[1].assignedTo.length >= 2){
     Choosen.innerHTML += `<h6>max of length reached</h6>`}

  else if(RightTask[1].assignedTo.length <= 2) {
    for (let preIndex = 0; preIndex < RightTask[1].assignedTo.length; preIndex++) {

      thisTask = RightTask[1].assignedTo.map(c => c.split(" ").map(f => f.charAt(0)))
      Choosen.innerHTML += `
    <div id="contactCirclePopupRender-${id}" class="contactCirclePopupRender">${thisTask[preIndex][0] + thisTask[preIndex][1]}</div>
    `;
    }
  } }

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

function renderBigEditView(id) {
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
            <section class="priority-sectionEdit">
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
            <div  class="section-right-selectEditView"  required tabindex="0" onclick="showContactsEdit(${id}); openContactViewEdit(); showInput()">
              <p id="placeholderpTagEdit">Select contacts to assign</p>
              <input oninput="filterContactsInPopupEdit()"  type="text" id="filterContactsEdit"  class="dont-Show hidden-input">
              <img id="arrowImgCEdit" class="select-arrow-downCEdit" src="/img/icons/select-arrow-down.svg"> 
            </div>
            <div id="IdForContactsEdit" class="availibleContactsCloseEdit">
              
            </div>
            <div id="choosenContactsEdit" class="choosenContactsEdit"></div>

            <p class="subtaskEdit">Subtask</p>
            <div class="subtask-wrapperEditView">
              <input class="inputPopupEditView" id="subtask" type="text" placeholder="Enter new subtask">
                            <span class="subtask-iconEdit">
                                <img onmousedown="clearSubtask()" class="xEdit" src="/img/icons/subtasks-X.svg">
                                <img class="delimiterEdit" src="/img/icons/delimiter-vertical.svg">
                                <img onmousedown="renderSubtask()" class="hookEdit" src="/img/icons/subtasks-icon.svg">
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
            <button id="creatButtonID" type="button" disabled onclick="constantCheck(); createTaskTemplate(); " class="create-task-btn">
              OK<img class="checkEditView" src="/img/icons/doneSymbol.svg" />
            </button>
          </div>
        </div>

      
    `
}
