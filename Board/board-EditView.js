
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
  if(singleTask[1].subtasks[0]){
  renderSubtaskEdit();
  document.getElementById(`listed-${index}`).innerHTML += `${singleTask[1]?.subtasks?.[0] ? singleTask[1]?.subtasks?.[0].value1 : ''}`;}
  if(singleTask[1].subtasks[1]){
  renderSubtaskEdit();
  document.getElementById(`listed-${index}`).innerHTML += `${singleTask[1]?.subtasks?.[1] ? singleTask[1]?.subtasks?.[1].value2 : ''}`;}  
  console.log("")
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
        for (let preIndex = 0; preIndex < RightTask[1].assignedTo?.length; preIndex++) {
            
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

// ======== ab hier funktionen für das Rendern von Subtask im Edit-View =====//
// let currentCount;
// let index = currentCount;

function renderSubtaskEdit(){
    console.log('rendert')
    let subtask = document.getElementById("subtaskEdit"); // der standard input
    let list = document.getElementById("subtaskEdit-list-1"); // das zusätzliche <ul> element
    
    
    let currentCount = list.getElementsByClassName("listedEdit").length; //klasse von li element
    index = currentCount;
    
    if (currentCount < 2 && subtask.value.trim() ===""){
        list.innerHTML += `<li onclick="editBulletpointEditView(${index})" id="listed-${index}" class="listedEdit"> 
        <span class="dot">•</span><p id="task-text-${index}">${subtask.value}</p>
        <span class="list-icon">
                                    <img onmousedown="clearSubtaskEdit()" class="pencil" src="/img/icons/pencil-edit.svg">
                                    <img class="delimiter" src="/img/icons/delimiter-vertical.svg">
                                    <img onmousedown="deleteBulletpointEdit(${index})" class="trash" src="/img/icons/trash.svg">
                                    </span>
                                    </li>
                                    `;
                                    subtask.value = "";
                                    // d = document.getElementById('task-text-0').innerHTML;
                                    // console.log(d);
    }else if(currentCount < 2 && subtask.value.trim() !==""){
        list.innerHTML += `<li onclick="editBulletpointEditView(${index})" id="listed-${index}" class="listedEdit"> 
        <span class="dot">•</span><p id="task-text-${index}">${subtask.value}</p>
        <span class="list-icon">
                                    <img onmousedown="clearSubtaskEdit()" class="pencil" src="/img/icons/pencil-edit.svg">
                                    <img class="delimiter" src="/img/icons/delimiter-vertical.svg">
                                    <img onmousedown="deleteBulletpointEdit(${index})" class="trash" src="/img/icons/trash.svg">
                                    </span>
                                    </li>
                                    `;
                                    subtask.value = "";
    }
}


// leere das subtask input Feld
function clearSubtaskEdit(){
    document.getElementById("subtask").value = "";
}

// lösche gerenderten Bulletpoint
function deleteBulletpointEdit(index) {
    let el = document.getElementById(`listed-${index}`);
    if (el) el.remove();
}

// bearbeite gerenderten Bulletpoint
function editBulletpointEditView(index) {
    const li = document.getElementById(`listed-${index}`);
    const textEl = document.getElementById(`task-text-${index}`);
    const inputEl = document.getElementById(`edit-input-${index}`);
    
    // Wenn schon ein Input da ist, nicht nochmal umbauen
    if (inputEl) {
        inputEl.focus();
        return;
    }

    const currentText = textEl ? textEl.textContent : ""; // fallback, falls kein <p> existiert
    
    li.innerHTML = `
    <input class="edit-input" type="text" id="edit-input-${index}" value="${currentText}">
    <span class="list-icon">
    <img onmousedown="deleteBulletpointEdit(${index})" class="trash" src="/img/icons/trash.svg">
    <img class="delimiter" src="/img/icons/delimiter-vertical.svg">
    <img onmousedown="saveBulletpointEdit(${index})" class="hook" src="/img/icons/subtasks-icon.svg">
        </span>
        `;
        
        document.getElementById(`edit-input-${index}`).focus();
    }
    
    
    
    function saveBulletpointEdit(index) {
        const input = document.getElementById(`edit-input-${index}`);
    const newValue = input.value.trim();
    
    if (newValue !== "") {
        const li = document.getElementById(`listed-${index}`);
        li.innerHTML = `<span class="dot">•</span><p id="task-text-${index}">${newValue}</p>
        <span class="list-icon">
        <img onmousedown="clearSubtask()" class="pencil" src="/img/icons/pencil-edit.svg">
        <img class="delimiter" src="/img/icons/delimiter-vertical.svg">
        <img onmousedown="deleteBulletpoint(${index})" class="trash" src="/img/icons/trash.svg">
        </span>`;
        li.setAttribute("onclick", `editBulletpointEditView(${index})`);
    }
}