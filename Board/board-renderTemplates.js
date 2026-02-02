function renderHTMLOfPopup() {  //Zeile 47 select Contacts
  return `
    <section   class="addTaskPopupMain">
    <div onclick="openTasktypeDropDown()" id="hiddenlayer" class="hiddenlayer show" ></div>
    <div onclick="openContactView(); showInput()" id="hiddenlayer2" class="hiddenlayer2 show2" ></div>
        <div class="popup-header">
          <h1>Add Task</h1>
          <img onclick="closePopup(); closeContactView(); resetTaskType()" src="/img/icons/close-icon.svg" />
        </div>

        <div class="input-containerPopup">
          <section class="input-section-leftPopup">

              <label>Title<span class="requiredStar">*</span></label>
              <input onchange="constantCheckTitlePopup()" class="input-section-left-input" id="title" type="text" placeholder="Enter a title" />
              <p id="UserFeedbackTitle" class="required"></p>

              <label>Description</label>
              <textarea oninput="constantCheck()" rows="5" id="task-description" placeholder="Enter a description"></textarea>

              <label>Due Date<span class="requiredStar">*</span></label>
              <input onchange="constantCheckDatePopup()" type="date" onclick="dateInspectPopup()" class="input-section-left-input date-input" id="dueDate" placeholder="dd/mm/yyyy">
              <p id="UserFeedbackDate" class="required"></p>
            </section>

          <div class="line"></div>

          <div class="input-section-rightPopup">
            <label>Priority</label>
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

            <label>Assigned to</label>
            <div  class="section-right-selectContacts"  required tabindex="0" onclick="openContactWithCounterForPopup()">
              <p id="placeholderpTag">Select contacts to assign</p>
              <input oninput="filterContactsInPopup()"  type="text" id="filterContacts"  class="dont-Show hidden-input">
              <img id="arrowImgC" class="select-arrow-downC" src="/img/icons/select-arrow-down.svg">
              <div onclick="event.stopPropagation()" id="IdForContacts" class="availibleContactsClose">
              
            </div> 
            </div>
            
            <div id="choosenContacts" class="choosenContacts">
            
            </div>
            <div id="countInfoPopup" class="countInfoPopup"></div>

            <label >Category<span class="requiredStar">*</span></label>
            <div id="IdForTaskChoise" class="section-right-select"  onclick="event.stopPropagation(); openTasktypeDropDown()">
              
            <p id="selectedTask">Select Task Category</p>
              <img id="arrowImg" class="select-arrow-downT" src="/img/icons/select-arrow-down.svg">
              <div id="dropId" class="dropTasktypeClose dropTasktypeOpenPopup" >
            
                <div onmousedown="chooseValue()" onclick="event.stopPropagation(); openTasktypeDropDown(); constantCheck()"  id="option" class="taskOption" data-value="Technical Task">Technical Task</div>
                <div onmousedown="chooseValue()" onclick="event.stopPropagation(); openTasktypeDropDown(); constantCheck()"  id="option" class="taskOption" data-value="User Story">User Story</div>
              </div>
            </div>
            
            <p id="UserFeedbackTaskType" class="required"></p>
              
            

            <label>Subtask</label>
            <div class="subtask-wrapper">
              <input class="inputPopup" id="subtask" type="text" placeholder="Enter new subtask">
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

        <div class="footerPopup">
          <div class="footer-leftPopup">
            <p class="requiredStar">*</p>
            <p>This field is required</p>
          </div>

          <div class="footer-buttons-section">
            <button onclick="clearTask()" class="clear-btnPopup" type="reset">
              Clear<img src="/img/icons/x.svg" />
            </button>
            <button id="creatButtonID" type="button" onclick="createTaskTemplate()" class="create-task-btnPopup">
              Create Task<img src="/img/icons/doneSymbol.svg" />
            </button>
          </div>
        </div>

        <div class="reportPopup" id="report">
          Task added to board <img src="/img/icons/board.svg" />
        </div>
        
      </section>
    `
}


/**renders the Task into the board page */
function renderTaskintoBoard(element) {
  let taskOption = 'türkis';
  if (element.taskType === 'User Story') {
    taskOption = 'darkblue';
  }
  // TasksDone = tasks.find(t => t[1].id === element.id);
  let done = element.subtasks?.filter(st => st.status === 'closed')?.length || 0;
  return `<div draggable="true"  onmouseleave="closeMiniMenü(${element.id})" ondragstart="startDragging(${element['id']})" 
    id="TaskDiv-${element.id}" onclick="bigViewOfTask(${element.id}); renderContactForBigView(${element.id}); renderEditAndDeleteButton(${element.id}); checkSubtaskLenght(${element.id}); renderSubtaskHTMLForBigView(${element.id})" class="TaskDiv">
    <button onclick="event.stopPropagation(); renderMiniMenü(${element.id})" class="MiniMenüButton"><img src="/img/icons/miniMenüButton.svg"></button>
    <div onclick="event.stopPropagation()" class=" dOntShow" id="miniMenüResponsiv-${element.id}">
    <p class="head">Move to</p>
    <p onclick="moveUpCategory(${element.id})" class="firstLine"><img src="/img/icons/arrow_upward.svg">Up</p>
    <p onclick="moveDownCategory(${element.id})" class="secondLine"><img src="/img/icons/arrow_downward.svg">Down</p>
    </div>
    <div  id="taskType" class="${taskOption}">${element.taskType}</div>
    <div class="taskTitle"><p>${element.title}</p></div>
    <div class="taskDescription"><p>${element.description}</p></div>
    <div class="subTasks">
    ${element.subtasks != null ? `
    <svg role="progress subtask">
    <rect  width="128" height="8"  class="back"/>
    <rect  width="${element.progress}" height="8" class="fill"/>
    </svg>
    <p class="progressDescription">${done}/${(element.subtasks.length)} Subtasks </p>` : ''}
    </div>
    <div id="contacts-Priority-Container" class="contacts-Priority-Container" >
    <div id="${element.id}" class="contactsMiniView"></div>
    <div id="${element.id}-additionalContactInfo" class="additionalContactInfo"></div>
    <div class="taskPriority">${element.prio == 'Urgent' ?
      `<img src="/img/icons/urgent.svg">` :
      element.prio == 'Medium' ?
        `<img src="/img/icons/medium.svg">` :
        element.prio == 'Low' ?
          `<img src="/img/icons/low.svg">` : ''}</div>
        </div>
        <div></div>
        </div>`
}


/**renders the mini Menü for changing the category in Responsiv View */
function renderMiniMenü(id) {
  miniMenu = document.getElementById(`miniMenüResponsiv-${id}`)
  miniMenu.classList.toggle('miniMenüResponsiv')
}


/**closes the Mini Menü if you leave a Task */
function closeMiniMenü(id) {
  closeM = document.getElementById(`miniMenüResponsiv-${id}`)
  closeM.classList.remove('miniMenüResponsiv')
}


/**renders the html for the BigView */
function renderBigViewHTML(elements, id) {
  let newD = new Date(elements[1]['DueDate']);
  formatedDate = newD.toLocaleDateString('de-DE');
  return `
  <div class="bigViewHeadlineCloseArea" id="bigViewHeadlineCloseArea">
  <div class="${taskOption}">${elements[1].taskType}</div>
  <div class="closeIcon" id="closeIcon"><img onclick="closeBigView()" src="/img/icons/closeFrame.svg" alt="closeButton"></div>
  </div>
  <div class="titleBigView"><h2>${elements[1].title}</h2></div>
  <div class="descriptionBigView"><p>${elements[1].description}</p></div>
  <div class="dueDateBigView"> <p>Due Date:</p> ${formatedDate
    }</div>
    <div class="priorityBigView"><p>Priority:</p>${elements[1].prio == 'Urgent' ?
      `${elements[1].prio}<img src="/img/icons/urgent.svg">` :
      elements[1].prio == 'Medium' ?
        `${elements[1].prio}<img src="/img/icons/medium.svg">` :
        elements[1].prio == 'Low' ?
          `${elements[1].prio}<img src="/img/icons/low.svg">` : ''}
            </div>
     <div class="assignedToBigView"><p>Assigned To:</p> 
     <div id="contactsBV" class="contactsBV"></div>
     </div>
     
     <div class="subtaskBigView"><p>${elements[1].subtasks != null ? `Subtasks` : 'No Subtasks yet'}</p>
     <div id="subTaskForBigView" class="subTaskForBigView"> 

    
            </div>
            </div>
            <div class="editeDeleteArea" id="editeDeleteArea"></div>`
};

function checkSubtaskLenght(elements) {
  let elementsOfTask = tasks.find(t => t[1].id === elements);
  if (elementsOfTask[1].subtasks?.length > 3) {
    let ele = document.getElementById('subTaskForBigView')
    ele.style.overflowY = 'scroll';
  } else {

  }
}

// render Each Subtask into BigView
function renderSubtaskHTMLForBigView(id) {
  let allIds = tasks.filter(ta => ta[1].id === id)
  document.getElementById('subTaskForBigView').innerHTML = '';
  if (allIds[0][1]?.subtasks) {
    for (let subIndex = 0; subIndex < allIds[0][1]?.subtasks?.length; subIndex++) {
      document.getElementById('subTaskForBigView').innerHTML +=

        `<div id="subtaskBigView1" class="subtaskImgDiv">  ${allIds[0][1].subtasks?.[subIndex] != null ? allIds[0][1]?.subtasks?.[subIndex].status === 'open' ?
          `<img id="subtaskBigViewImg-${subIndex}" class="checkboxS1" onclick="confirmSubtask(${subIndex}, ${id}); checkDone(${allIds, id})" src="/img/icons/normalCheckContact.svg">` :
          `<img id="subtaskBigViewImg-${subIndex}" class="checkedSubtask" onclick="confirmSubtask(${subIndex}, ${id}); checkDone(${allIds, id})" src="/img/icons/normalCheckedContact.svg">` : ''}
        <p>${allIds[0][1]?.subtasks?.[subIndex] != null ? allIds[0][1]?.subtasks?.[subIndex].value : ''}</p></div>
  `

    }
  } else { }
}
/**renders the Contacts into BigView */
function renderContactHTMLForBigView(rightContacts, BVindex, short) {
  return `<div class="singleContactBoxForBigView">
        <div id="contactCirclePopupRender-${BVindex}" class="contactCircleBigView">${short[BVindex][0] + short[BVindex][1]}</div>
        <div id="singleContactInBigView-${BVindex}" > ${rightContacts[1].assignedTo[BVindex]}</div>
        </div>`
}


/**renders the HTML for the edit and delete Button */
function renderHTMLForEditandDeleteButton(id) {
  return `<div class="editAndDeleteButton">
    <div onclick="deleteTaskFromBoard(${id})" class="deleteField">
    <img class="deleteImg" src="/img/icons/delete-symbol.svg">
    <h4>Delete</h4>
    </div>
    <hr class="lineToSeperate">
    <div onclick="activateEditModus(${id})" class="editField">
    <img class="editImg" src="/img/icons/edit-symbol.svg">
    <h4>Edit</h4>
    </div>
    </div>`
}


/**renders the contacts in Edit-Mode dropDown */
function renderContactsInEditDropDown(id, contactsArray, index, thisT) {
  return `<div onclick="chooseContactEdit(${id}, ${index})" class="contactBox">
        <div class="contactCirclePopup">${contactsArray[index].firstLetter + contactsArray[index].secondFirstLetter}</div>
        <span for="contactName" class="contactName"> ${contactsArray[index].name}</span> 
        <img  id="checkboxImgEdit-${index}"  
        class="${thisT[1].assignedTo?.includes(contactsArray[index].name) ? 'checkedEdit' : 'checkboxEdit'}" data-set="${contactsArray[index].name}" data-index="${index}"
         src="/img/icons/normalCheckContact.svg">
        </div>`
}


/**renders the filtered Contacts HTML into the dropDonw */
function renderHTMLForFilteredContactsInEdit(id, filteredContactsEdit, filterContactIndex, thisTFilter) {
  return `<div onclick="chooseFilteredContactEdit(${id}, ${filterContactIndex})" class="contactBox">
        <div class="contactCirclePopup">${filteredContactsEdit[filterContactIndex].firstLetter + filteredContactsEdit[filterContactIndex].secondFirstLetter}</div>
        <span for="contactName" class="contactName"> ${filteredContactsEdit[filterContactIndex].name}</span> 
        <img  id="checkboxImgEdit-${filterContactIndex}"  
        class="${thisTFilter[1].assignedTo?.includes(filteredContactsEdit[filterContactIndex].name) ? 'checkedEdit' : 'checkboxEdit'}" data-set="${filteredContactsEdit[filterContactIndex].name}" src="/img/icons/normalCheckContact.svg">
        </div>`
}

let normalContactsArray = [];

function chooseContact(index) {
  let choContact = document.getElementById(`checkboxImg-${index}`)
  if (choContact.classList.contains('checkbox')) {
    choContact.classList.remove('checkbox')
    choContact.classList.add('checked')
    choContact.src = "/img/icons/normalCheckedContact.svg"
    let name = choContact.dataset.set
    normalContactsArray.push(name);
    processCurrentContact()
  } else {
    choContact.classList.add('checkbox')
    choContact.classList.remove('checked')
    let name = choContact.dataset.set;
    const indexToRemove = normalContactsArray.indexOf(name);
  if (indexToRemove !== -1) {
    normalContactsArray.splice(indexToRemove, 1);}
    processCurrentContact()
    choContact.src = "/img/icons/normalCheckContact.svg"
  }
}


function processCurrentContact() {
  let countPopup = document.querySelectorAll('.contactBox .checked')
  if ((countPopup.length) > 6) {
    document.getElementById('countInfoPopup').innerHTML = `+ ${(countPopup.length) - 6}`;
  }
  if ((countPopup.length) <= 6) {
    document.getElementById('countInfoPopup').innerHTML = "";
    document.getElementById('choosenContacts').innerHTML = "";
    let result = normalContactsArray.slice(0, 6);
    result.forEach((normalContactsArray) => {
      // let indexNormal = img.dataset.index;
      let compareIndex = contactsArray.findIndex(contactsArray => normalContactsArray == contactsArray.name);
      document.getElementById('choosenContacts').innerHTML += renderChoosenContact(compareIndex)
    });
  }
}


let filteredContactsArray = [];


/**her we make the choosen Contacts within the filtered Contacts visible */
function chooseFilteredContact(filterContactIndex) {
  let choContactF = document.getElementById(`checkboxImg-${filterContactIndex}`)
  if (choContactF.classList.contains('checkbox')) {
    choContactF.classList.remove('checkbox')
    choContactF.classList.add('checked')
    choContactF.src = "/img/icons/normalCheckedContact.svg";
    let name = choContactF.dataset.set
    filteredContactsArray.push(name);
    processCurrentFilteredContact();
  }else {
    choContactF.classList.add('checkbox')
    choContactF.classList.remove('checked')
    let name = choContactF.dataset.set;
    const indexToRemove = filteredContactsArray.indexOf(name);
  if (indexToRemove !== -1) {
    filteredContactsArray.splice(indexToRemove, 1);}
    processCurrentFilteredContact();
    choContactF.src = "/img/icons/normalCheckContact.svg";
  }
}

function processCurrentFilteredContact() {
  document.getElementById('choosenContacts').innerHTML = "";
  let countFilteredPopup = document.querySelectorAll('.contactBox .checked')
  if ((countFilteredPopup.length) > 6) {
    document.getElementById('countInfoPopup').innerHTML = `+ ${(countFilteredPopup.length) - 6}`;
  }
  if ((countFilteredPopup.length) <= 6) {
    document.getElementById('countInfoPopup').innerHTML = "";
    document.getElementById('choosenContacts').innerHTML = "";
    console.log(countFilteredPopup);
    let result = filteredContactsArray.slice(0, 6);
    result.forEach((filteredContactsArray) => {
      // let indexFiltered = img.dataset.index; 
      // console.log(indexFiltered);
      let compare = contactsArray.findIndex(contactsArray => filteredContactsArray == contactsArray.name);
      document.getElementById('choosenContacts').innerHTML += renderFilteredChoosenContactPopup(compare)
    });
  }
}



/**the choosen Contacts are rendered on the below of the dropdown List  */
function renderChoosenContact(compareIndex) {
  return `
    <div id="contactCirclePopupRender-${compareIndex}" class="contactCirclePopupRender">${contactsArray[compareIndex].firstLetter + contactsArray[compareIndex].secondFirstLetter}</div>`
}

/**here we render the filtered choosen Contacts below the dropdown */
function renderFilteredChoosenContactPopup(compare) {
  return `
    <div id="contactCirclePopupRender-${compare}" class="contactCirclePopupRender">${contactsArray[compare].firstLetter + contactsArray[compare].secondFirstLetter}</div>`
}




