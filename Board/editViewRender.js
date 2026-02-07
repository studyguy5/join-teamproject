
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



/**renders the choosen Contacts below the list and check if an index is involved
 * and new Contacts were choosen or just the old ones
*/
function renderChoosenContactEdit(compareIndexFilteredEdit) {
    return `
    <div id="contactCirclePopupRender-${compareIndexFilteredEdit}" class="contactCirclePopupRender">
    ${contactsArray[compareIndexFilteredEdit]?.firstLetter  + contactsArray[compareIndexFilteredEdit]?.secondFirstLetter
         ? contactsArray[compareIndexFilteredEdit]?.firstLetter + contactsArray[compareIndexFilteredEdit].secondFirstLetter :  '😀'}</div>`;
}





