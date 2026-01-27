
/**renders the Edit-Mode into the div from BigView */
function renderBigEditView(id) {
  return `<div class="editViewHeader">
        
          <img onclick="closeEditView()" src="/img/icons/close-icon.svg" />
        </div>
    
    
    <section   class="editBigView">
    <div onclick="openTasktypeDropDown()" id="hiddenlayer" class="hiddenlayer show" ></div>
        

        <div class="editView-mainInput">
          <section class="input-section-leftEditView">

              <label>Title<span class="requiredStar">*</span></label>
              <input onchange="constantCheckTitleEdit()" class="input-section-left-inputEditView" id="titleEdit" type="text" placeholder="Enter a title" />
              <p id="UserFeedbackTitleEditMode" class="requiredEdit"></p>

              <label>Description</label>
              <textarea id="task-descriptionEdit" oninput="constantCheck()" rows="5"  placeholder="Enter a description"></textarea>

              <label>Due Date<span class="requiredStar">*</span></label>
              <input onchange="constantCheckDateEdit()" onclick="dateInspect()" class="input-section-left-inputEditView dateEditView" type="date" id="dueDateEdit" placeholder="dd/mm/yyyy">
              <p id="UserFeedbackDateEditMode" class="requiredEdit"></p>
            </section>

          

          <div class="input-section-right-EditView">
            <p id="priO">Priority</p>
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
            <div  class="section-right-selectEditView"  required tabindex="0" onclick="openContactWithCounter(${id})">
              <p id="placeholderpTagEdit">Select contacts to assign</p>
              <input oninput="filterContactsInPopupEdit(${id})"  type="text" id="filterContactsEdit"  class="dont-Show hidden-input">
              <img id="arrowImgCEdit" class="select-arrow-downCEdit" src="/img/icons/select-arrow-down.svg"> 
            </div>
            <div id="IdForContactsEdit" class="availibleContactsCloseEdit">
              
            </div>
            <div id="choosenContactsEdit" class="choosenContactsEdit">
            <div id="countInfoEdit" class="countInfoEdit"></div>
            </div>

            <p class="subtaskEdit">Subtask</p>
            <div class="subtask-wrapperEditView">
              <input class="inputPopupEditView" id="subtaskEdit" type="text" placeholder="Enter new subtask">
                            <span class="subtask-iconEdit">
                                <img onmousedown="clearSubtask()" class="xEdit" src="/img/icons/subtasks-X.svg">
                                <img class="delimiterEdit" src="/img/icons/delimiter-vertical.svg">
                                <img onmousedown="renderSubtaskEdit(${id})" class="hookEdit" src="/img/icons/subtasks-icon.svg">
                            </span>
              </div>
                    <ul class="ul-divEdit" id="subtaskEdit-list-1" class="subtask-listEdit">
                    </ul>
          </div>
        </div>

        

        <div class="report" id="report">
          Task added to board <img src="/img/icons/board.svg" />
        </div>
        
      </section>


<div class="footerPopupEditView">
          <p id="info"></p>
          <div class="footer-buttons-sectionEditView">
            <button id="creatButtonIDEdit" type="button" onclick="createTaskTemplateEdit(${id})" class="ok-btn-edit-view">
              Ok<img class="checkEditView" src="/img/icons/doneSymbol.svg" />
            </button>
          </div>
        </div>

      
    `
}

/**renders the filtered Contacts below the list the same as the non-filtered contacts
 * and checks if an index is involved and new contacts were choosen or just the old ones
 */
function renderFilteredChoosenContact(id, filterContactIndex) {
    let listContact = document.getElementById('choosenContactsEdit')
    const filteredRightTask = tasks.find(task => task[1].id === id);
    if (filterContactIndex && filteredRightTask[1].assignedTo.length < 5) {
        const contFilterList = filteredContactsEdit[filterContactIndex]
        filteredRightTask[1].assignedTo.push(contFilterList?.name);
        let root = filteredRightTask[1].assignedTo;
        for (let filterIndex = root.length - 1; filterIndex < root.length; filterIndex++) {
            thisFilteredTask = root.map(c => c.split(" ").map(f => f.charAt(0)))
            listContact.innerHTML += `
        <div id="contactCirclePopupRender-${id}" class="contactCirclePopupRender">${thisFilteredTask[filterIndex][0] + thisFilteredTask[filterIndex][1]}</div>
        `}
    } else if (filterContactIndex && filteredRightTask[1].assignedTo.length >= 5) {
        listContact.innerHTML += `<h6>max of length reached</h6>`
    } else if (filteredRightTask[1].assignedTo.length < 5) {
        for (let filterIndex = 0; filterIndex < filteredRightTask[1].assignedTo?.length; filterIndex++) {
            thisFilteredTask = filteredRightTask[1].assignedTo.map(c => c.split(" ").map(f => f.charAt(0)))
            listContact.innerHTML += `
    <div id="contactCirclePopupRender-${id}" class="contactCirclePopupRender">${thisFilteredTask[filterIndex][0] + thisFilteredTask[filterIndex][1]}</div>`;
        }
    }
}

let preIndex;
let thisTask;
/**renders the choosen Contacts below the list and check if an index is involved
 * and new Contacts were choosen or just the old ones
 */
function renderChoosenContactEdit(id, index) {
    let Choosen = document.getElementById('choosenContactsEdit')
    const RightTask = tasks.find(task => task[1].id === id);
    if(!RightTask[1].assignedTo) RightTask[1].assignedTo = [];
    if (index && RightTask[1].assignedTo?.length < 5) {
        const list = contactsArray[index].name
        RightTask[1].assignedTo = [];
        RightTask[1].assignedTo.push(list);   // pushe ihn ins assignedTo array
        for (let preIndex = RightTask[1].assignedTo.length - 1; preIndex < RightTask[1].assignedTo.length; preIndex++) {
            thisTask = RightTask[1].assignedTo.map(c => c.split(" ").map(f => f.charAt(0)))
            Choosen.innerHTML += `
          <div id="contactCirclePopupRender-${index}" class="contactCirclePopupRender">${thisTask[preIndex][0] + thisTask[preIndex][1]}</div>`;
        }
    } else if (index && RightTask[1]?.assignedTo?.length >= 5) {
        Choosen.innerHTML += `<h6>max of length reached</h6>`
    } else if (RightTask[1].assignedTo?.length < 5) {
        for (let preIndex = 0; preIndex < RightTask[1].assignedTo?.length; preIndex++) {
            let num = parseInt(RightTask[1].cid[preIndex].split('-')[1]);
            thisTask = RightTask[1].assignedTo.map(c => c.split(" ").map(f => f.charAt(0)))
            Choosen.innerHTML += `
    <div id="contactCirclePopupRender-${num}" class="contactCirclePopupRender">${thisTask[preIndex][0] + thisTask[preIndex][1]}</div>`;
            index++
        }
    }
}

let deleteOnetime = true;
/**deletes a rendered Contact in Edit Mode */
function deleteRenderedContactEdit(index) {
    let counted = document.querySelectorAll('.contactBox .checkedEdit')
    if (counted.length > 6) {
        counted.length - 1
        document.getElementById('countInfoEdit').innerHTML = `+ ${(counted.length) - 6}`
    } else if (counted.length <= 6 && deleteOnetime && document.getElementById('countInfoEdit').innerHTML != "") { document.getElementById('countInfoEdit').innerHTML = ""; deleteOnetime = false }
    else {
        let renderedContact = document.getElementById(`contactCirclePopupRender-${index}`)
        if (renderedContact) renderedContact.remove();
        renderedContact.innerHTML = '';
    }
}

/**shows the choosen Contacts in the filtered list */
function chooseFilteredContactEdit(id, filterContactIndex) {
    let choContactFilter = document.getElementById(`checkboxImgEdit-${filterContactIndex}`)
    if (choContactFilter.classList.contains("checkboxEdit")) {
        choContactFilter.classList.remove('checkboxEdit')
        choContactFilter.classList.add('checkedEdit')
        let countEditFiltered = document.querySelectorAll('.contactBox .checked')
        if ((countEditFiltered.length) > 6) {
            document.getElementById('countInfo').innerHTML = `+ ${(countEditFiltered.length) - 6} Contact(s)`
            renderFilteredChoosenContact(id, filterContactIndex)
        }
        else { choContactFilter.src = "/img/icons/normalCheckedContact.svg" }
    } else {
        choContactFilter.classList.add('checkboxEdit')
        choContactFilter.classList.remove('checkedEdit')
        deleteRenderedFilteredContactEdit(id, filterContactIndex);
        choContactFilter.src = "/img/icons/normalCheckContact.svg"
    }
}


/**shows the non-filtered choosen Contacts in the list */
function chooseContactEdit(id, index) {
    let choContact = document.getElementById(`checkboxImgEdit-${index}`)
    if (choContact.classList.contains("checkboxEdit")) {
        choContact.classList.remove('checkboxEdit')
        choContact.classList.add('checkedEdit')
        let countEditNormal = document.querySelectorAll('.contactBox .checkedEdit')
        if ((countEditNormal.length) > 6) {
            deleteOnetime = true;
            document.getElementById('countInfoEdit').innerHTML = `+ ${(countEditNormal.length) - 6}`
        } else {
            renderChoosenContactEdit(id, index);
            choContact.src = "/img/icons/normalCheckedContact.svg"
        }
    } else {
        choContact.classList.add('checkboxEdit')
        choContact.classList.remove('checkedEdit')
        deleteRenderedContactEdit(index);
        choContact.src = "/img/icons/normalCheckContact.svg"
    }
}