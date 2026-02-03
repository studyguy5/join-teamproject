
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
            <div id="choosenContactsEdit" class="choosenContactsEdit"></div>
            <div id="countInfoEdit" class="countInfoEdit"></div>

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

let normalContactEditModeArray = [];
let filteredContactEditModeArray = [];
/**shows the non-filtered choosen Contacts in the list */
function chooseContactEdit(id, index) {
    let choContact = document.getElementById(`checkboxImgEdit-${index}`)
    if (choContact.classList.contains("checkboxEdit")) {
        choContact.classList.remove('checkboxEdit')
        choContact.classList.add('checkedEdit')
        choContact.src = "/img/icons/normalCheckedContact.svg"
        let name = choContact.dataset.set
        normalContactEditModeArray.push(name);
        processCurrentContactEdit(id, index);
    } else {
        choContact.classList.add('checkboxEdit')
        choContact.classList.remove('checkedEdit')
        let name = choContact.dataset.set;
        const indexToRemove = normalContactEditModeArray.indexOf(name);
        if (indexToRemove !== -1) {
            normalContactEditModeArray.splice(indexToRemove, 1);
        }
        processCurrentContactEdit(id, index);
        choContact.src = "/img/icons/normalCheckContact.svg"
    }
}


function processCurrentContactEdit(id) {
    let combo = normalContactEditModeArray.concat(filteredContactEditModeArray);
    console.log(combo.length);
    if ((combo.length) > 6) {
        document.getElementById('countInfoEdit').innerHTML = `+ ${(combo.length) - 6}`}
    if ((combo.length) <= 6) {
        document.getElementById('countInfoEdit').innerHTML = "";
        document.getElementById('choosenContactsEdit').innerHTML = "";
        let result = combo.slice(0, 6);
        result.forEach((result) => {
            // let indexEditNormal = img.dataset.index;
            // console.log(indexEditNormal);
            let compareIndexFilteredEdit = contactsArray.findIndex(contactsArray => result == contactsArray.name);
            document.getElementById('choosenContactsEdit').innerHTML += renderChoosenContactEdit(compareIndexFilteredEdit);
        })
    }
}

/**renders the choosen Contacts below the list and check if an index is involved
 * and new Contacts were choosen or just the old ones
*/
function renderChoosenContactEdit(compareIndexFilteredEdit) {
    return `
    <div id="contactCirclePopupRender-${compareIndexFilteredEdit}" class="contactCirclePopupRender">
    ${contactsArray[compareIndexFilteredEdit]?.firstLetter  + contactsArray[compareIndexFilteredEdit]?.secondFirstLetter
         ? contactsArray[compareIndexFilteredEdit]?.firstLetter + contactsArray[compareIndexFilteredEdit].secondFirstLetter :  '😀'}</div>`;
}



/**shows the choosen Contacts in the filtered list */
function chooseFilteredContactEdit(id, filterContactIndex) {
    let choContactFilter = document.getElementById(`checkboxImgEdit-${filterContactIndex}`)
    if (choContactFilter.classList.contains("checkboxEdit")) {
        choContactFilter.classList.remove('checkboxEdit')
        choContactFilter.classList.add('checkedEdit')
        choContactFilter.src = "/img/icons/normalCheckedContact.svg"
        let name = choContactFilter.dataset.set
        filteredContactEditModeArray.push(name); 
        processCurrentContactEdit(id, filterContactIndex);
    } else {
        choContactFilter.classList.add('checkboxEdit')
        choContactFilter.classList.remove('checkedEdit')
        let name = choContact.dataset.set;
        const indexToRemove = filteredContactEditModeArray.indexOf(name);
        if (indexToRemove !== -1) {
            filteredContactEditModeArray.splice(indexToRemove, 1);
        }
        processCurrentContactEdit(id, filterContactIndex);
        choContactFilter.src = "/img/icons/normalCheckContact.svg"
    }
}

// /**renders the filtered Contacts below the list the same as the non-filtered contacts
//  * and checks if an index is involved and new contacts were choosen or just the old ones
// */
// function renderCurrentFilteredChoosenContact(id, filterContactIndex) {
//     let countEditFiltered = document.querySelectorAll('.contactBox .checkedEdit')
//     let listContact = document.getElementById('choosenContactsEdit');
//     const filteredRightTask = tasks.find(task => task[1].id === id);
//     if ((countEditFiltered.length) > 6  && document.getElementById('choosenContactsEdit') == "") {
//         const contFilterList = filteredContactsEdit[filterContactIndex]
//         filteredRightTask[1].assignedTo.push(contFilterList?.name);
//         let root = filteredRightTask[1].assignedTo;
//         for (let filterIndex = root.length - 1; filterIndex < root.length; filterIndex++) {
//             thisFilteredTask = root.map(c => c.split(" ").map(f => f.charAt(0)))
//             listContact.innerHTML += `
//             <div id="contactCirclePopupRender-${id}" class="contactCirclePopupRender">${thisFilteredTask[filterIndex][0] + thisFilteredTask[filterIndex][1]}</div>
//             `}
//     } else if (filteredRightTask[1].assignedTo.length < 5) {
//         for (let filterIndex = 0; filterIndex < filteredRightTask[1].assignedTo?.length; filterIndex++) {
//             thisFilteredTask = filteredRightTask[1].assignedTo.map(c => c.split(" ").map(f => f.charAt(0)))
//             listContact.innerHTML += `
//         <div id="contactCirclePopupRender-${id}" class="contactCirclePopupRender">${thisFilteredTask[filterIndex][0] + thisFilteredTask[filterIndex][1]}</div>`;
//         }
//     }
// }