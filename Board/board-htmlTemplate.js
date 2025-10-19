function renderHTMLOfPopup() {  //Zeile 47 select Contacts
  return `
    <section   class="addTaskPopupMain">
    <div onclick="openTasktypeDropDown()" id="hiddenlayer" class="hiddenlayer show" ></div>
        <div class="popup-header">
          <h1>Add Task</h1>
          <img onclick="closePopup()" src="/img/icons/close-icon.svg" />
        </div>

        <div class="input-containerPopup">
          <section class="input-section-leftPopup">

              <label>Title<span class="requiredStar">*</span></label>
              <input oninput="constantCheck()" class="input-section-left-input" id="title" type="text" placeholder="Enter a title" />
              <p class="required d-none">This field is required</p>

              <label>Description</label>
              <textarea oninput="constantCheck()" rows="5" id="task-description" placeholder="Enter a description"></textarea>

              <label>Due Date<span class="requiredStar">*</span></label>
              <input oninput="constantCheck()" class="input-section-left-input date-input" id="dueDate" placeholder="dd/mm/yyyy">
              <p class="required d-none">This field is required</p>
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
            <div  class="section-right-select"  required tabindex="0" onclick="openContactView(); showInput()">
              <p id="placeholderpTag">Select contacts to assign</p>
              <input oninput="filterContactsInPopup()"  type="text" id="filterContacts"  class="dont-Show hidden-input">
              <img id="arrowImgC" class="select-arrow-downC" src="/img/icons/select-arrow-down.svg"> 
            </div>
            <div id="IdForContacts" class="availibleContactsClose">
              
            </div>
            <div id="choosenContacts" class="choosenContacts"></div>

            <label >Category<span class="requiredStar">*</span></label>
            <div id="IdForTaskChoise" class="section-right-select"  onclick="event.stopPropagation(); openTasktypeDropDown()">
              
            <p id="selectedTask">Select Task Category</p>
              <img id="arrowImg" class="select-arrow-downT" src="/img/icons/select-arrow-down.svg">
            </div>
            <p class="required d-none">This field is required</p>
              <div id="dropId" class="dropTasktypeClose dropTasktypeOpen" >

              <input  type="hidden" id="categoryValue" name="category" class="hidden-input"> 
                
                <div onmousedown="chooseValue()" onclick="openTasktypeDropDown(); constantCheck()"  id="option" class="taskOption" data-value="Technical Task">Technical Task</div>
                <div onmousedown="chooseValue()" onclick="openTasktypeDropDown(); constantCheck()"  id="option" class="taskOption" data-value="User Story">User Story</div>
              </div>
              
            

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
            <button onclick="clearTask()" class="clear-btn" type="reset">
            <button class="clear-btn" type="button" onclick="clearPopupForm()">
              Clear<img src="/img/icons/x.svg" />
            </button>
            <button id="creatButtonID" type="button" disabled onclick="constantCheck(); createTaskTemplate(); getTaskInformation()" class="create-task-btn">
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

