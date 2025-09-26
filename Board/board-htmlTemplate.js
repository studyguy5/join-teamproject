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

              <label for="task-title">Title<span class="requiredStar">*</span></label>
              <input class="input-section-left-input" id="title" type="text" placeholder="Enter a title" />
              <p class="required d-none">This field is required</p>

              <label for="">Description</label>
              <textarea rows="5" id="task-description" placeholder="Enter a description"></textarea>

              <label for="date">Due Date<span class="requiredStar">*</span></label>
              <input class="input-section-left-input date-input" id="dueDate" placeholder="dd/mm/yyyy">
              <p class="required d-none">This field is required</p>
            </section>

          <div class="line"></div>

          <div class="input-section-rightPopup">
            <label for="prio">Priority</label>
            <section class="priority-section">
              <button class="button" data-priority="Urgent"  type="button">
                Urgent<img src="/img/icons/urgent.svg" />
              </button>

              <button class="button" data-priority="Medium" type="button">
                Medium<img src="/img/icons/medium.svg" />
              </button>

              <button class="button" data-priority="Low" type="button">
                Low<img src="/img/icons/low.svg" />
              </button>
            </section>

            <label for="contactSelection">Assigned to</label>
            <div  class="section-right-select"  required tabindex="0" onclick="openContactView()">
              <p >Select contacts to assign</p>
              <img id="arrowImgC" class="select-arrow-downC" src="/img/icons/select-arrow-down.svg"> 
            </div>
            <div id="IdForContacts" class="availibleContactsOpen availibleContactsClose">
              
            </div>
            <div id="choosenContacts" class="choosenContacts"></div>
            
            <label for="category">Category<span class="requiredStar">*</span></label>
            <div id="IdForTaskChoise" class="section-right-select" onclick="event.stopPropagation(); openTasktypeDropDown()">
              <p id="selectedTask" >Select Task Category</p>
              <img id="arrowImg" class="select-arrow-downT" src="/img/icons/select-arrow-down.svg">
            </div>
              <div id="dropId" class="dropTasktypeClose dropTasktypeOpen" >
                
                <div onclick="openTasktypeDropDown()" onmousedown="chooseValue()" id="option" class="taskOption" data-value="Technical Task">Technical Task</div>
                <div onclick="openTasktypeDropDown()" onmousedown="chooseValue()" id="option" class="taskOption" data-value="User Story">User Story</div>
              </div>
              <p class="required d-none">This field is required</p>
            

            <label for="subtask">Subtask</label>
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
            <button class="clear-btn" type="reset">
              Clear<img src="/img/icons/x.svg" />
            </button>
            <button onclick="createTaskTemplate(); getTaskInformation()" class="create-task-btn">
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

