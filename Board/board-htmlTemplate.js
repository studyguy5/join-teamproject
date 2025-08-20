function renderHTMLOfBoard() {
    return `
    <main>
        <div class="popup-header">
          <h1>Add Task</h1>
          <img onclick="closePopup()" src="/img/icons/close-icon.svg" />
        </div>

        <div class="input-container">
          <section class="input-section-left">
            <label for="task-title"
              >Title<span class="requiredStar">*</span></label
            >
            <input type="text" placeholder="Enter a title" />
            <label for="">Description</label>
            <textarea
              rows="5"
              id="task-description"
              placeholder="Enter a description"
            ></textarea>
            <label for="date"
              >Due Date<span class="requiredStar">*</span></label
            >
            <input type="date" />
          </section>

          <div class="line"></div>

          <div class="input-section-right">
            <label for="prio">Priority</label>
            <section class="priority-section">
              <button data-priority="urgent" type="button">
                Urgent<img src="/img/icons/urgent.svg" />
              </button>

              <button data-priority="medium" type="button">
                Medium<img src="/img/icons/medium.svg" />
              </button>

              <button data-priority="low" type="button">
                Low<img src="/img/icons/low.svg" />
              </button>
            </section>

            <label for="contactSelection">Assigned to</label>
            <select required tabindex="0">
              <option value="" disabled selected hidden>
                Select contacts to assign
              </option>
            </select>

            <label for="category"
              >Category<span class="requiredStar">*</span></label
            >
            <select required tabindex="0">
              <option value="" disabled selected hidden>
                Select Task Category
              </option>
              <option value="Technical Task">Technical Task</option>
              <option value="User Story">User Story</option>
            </select>

            <label for="subtask">Subtask</label>
            <input type="text" placeholder="Enter new subtask" />
          </div>
        </div>

        <div class="footer">
          <div class="footer-left">
            <p class="requiredStar">*</p>
            <p>This field is required</p>
          </div>

          <div class="footer-buttons-section">
            <button class="clear-btn" type="reset">
              Clear<img src="../img/x.svg" />
            </button>
            <button onclick="createTaskTemplate()" class="create-task-btn">
              Create Task<img src="../img/doneSymbol.svg" />
            </button>
          </div>
        </div>

        <div class="report" id="report">
          Task added to board <img src="../img/board.svg" />
        </div>
      </main>
    </div>`
}