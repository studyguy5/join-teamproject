
/**
 * Validates required fields for task creation.
 * @returns {boolean} True if valid, otherwise false.
 */
function commonConstantCheck() {
    const { title, dueDate, taskType } =  getConnectionAndDisableButton();
    if (title === "" && dueDate === "" && taskType === "Select Task Category") { showCompleteFeedback(); }
    if (title === "" && dueDate === "") { showTitleDateFeedback(); } 
    else if(dueDate === "" && taskType === 'Select Task Category') { showDateTaskTypeFeedback(); } 
    else if(title === "" && taskType === 'Select Task Category') { showTitleTaskTypeFeedback(); }
    else if(taskType === 'Select Task Category') {document.getElementById("UserFeedbackTaskType").innerHTML = `This Field is required`;} else if (title === '') {
        document.getElementById("UserFeedbackTitle").innerHTML = `This Field is required`;
    } else if (dueDate === '') {
        document.getElementById("UserFeedbackDate").innerHTML = `This Field is required`;
    } else {
        getTaskInformationNormal();
        showSuccessMessage();}
    }

/**this sets up the fundamental connection and disables the createButton after click once */
function getConnectionAndDisableButton() {
    document.getElementById('creatButtonIDForNormal').disabled = true;
    const title = document.getElementById("title-add-task").value;
    const dueDate = document.getElementById("date-add-task").value;
    const taskType = document.getElementById("selectedTaskNormal").innerText;
    return { title, dueDate, taskType };
}

/**if all required fields are empty, complete Feedback is shown */
function showCompleteFeedback() {
    document.getElementById("UserFeedbackTitle").innerHTML = `This Field is required`;
    document.getElementById("UserFeedbackDate").innerHTML = `This Field is required`;
    document.getElementById("UserFeedbackTaskType").innerHTML = `This Field is required`;
}

/**if the Title and the Date field is empty/not choosen this feedback is shown */
function showTitleDateFeedback() {
    document.getElementById("UserFeedbackTitle").innerHTML = `This Field is required`;
    document.getElementById("UserFeedbackDate").innerHTML = `This Field is required`;
}

/**if the Date isnt choosen and the Tasktype is not selected, this feedback is shown */
function showDateTaskTypeFeedback() {
    document.getElementById("UserFeedbackDate").innerHTML = `This Field is required`;
    document.getElementById("UserFeedbackTaskType").innerHTML = `This Field is required`;
}

/**if the title is empty and the Tasktype is not selected, this Feedback is shown */
function showTitleTaskTypeFeedback() {
    document.getElementById("UserFeedbackTitle").innerHTML = `This Field is required`;
    document.getElementById("UserFeedbackTaskType").innerHTML = `This Field is required`;
}

/** if title is empty and no Date is choosen, this feedback is shown */
function commonUserFeedback() {
    document.getElementById("UserFeedbackTitle").innerHTML = `This Field is required`;
    document.getElementById("UserFeedbackDate").innerHTML = `This Field is required`;
}


/**
 * Continuously checks form inputs and enables the create button when valid.
 * @returns {void}
 */
function constantCheckTitle() {
    const title = document.getElementById("title-add-task").value;
    if (title.length < 2)
        return showUserFeedbackTitle(title);
    document.getElementById('task-description').disabled = true, false;
    document.getElementById("UserFeedbackTitle").innerHTML = "";
    document.getElementById('task-description').disabled = false;
    if (!validateTitleAddTaskNormal(title))
        return showUserFeedbackTitleForm(title);
    document.getElementById('task-description').disabled = true, false;
    document.getElementById("UserFeedbackTitle").innerHTML = "";
    document.getElementById('task-description').disabled = false;
}

let attribute = true;

/**if the date is in the past, it tells the user to select an oder Date */
function constantCheckDate() {
    const dueDate = document.getElementById("date-add-task").value;
    let current = new Date();
    let dateOb = new Date(dueDate);
    if (dateOb < current) {
        const dateField = document.getElementById("UserFeedbackDate");
        dateField.innerHTML = `Date is in the past`;
    } else if (!validateDateAddTaskNormal(dueDate)) {
        return showUserFeedbackDueDate();
    } else if (validateDateAddTaskNormal(dueDate)) {
        document.getElementById('creatButtonIDForNormal').disabled = false;
        clearUserFeedback = document.getElementById("UserFeedbackDate");
        clearUserFeedback.innerHTML = '';
    }
}

/**this checks letters from A to Z, from a to z, special vocals whitespaces and numbers in the title */
function validateTitleAddTaskNormal(title) {
    const titleRegex = /^[A-Za-zÄÖÜäöüß\s1-9.-]+$/;
    return titleRegex.test(title.trim());
}

/**this get the value from the choosen date, and checks if valid*/
function validateDateAddTaskNormal(dueDate) {
    let dateOb = new Date(dueDate);
    return isDateValid(dateOb);
}

/**this is the validation function for the date */
function isDateValid(dateOb) {
    return !isNaN(new Date(dateOb));
}

/**
 * Displays required field messages for task creation form.
 * @returns {void}
 */
function showUserFeedbackTitle() {
    const titleUserFeedbackLength = document.getElementById("UserFeedbackTitle");
    titleUserFeedbackLength.innerHTML = `title is too short`;
}

/**shows the feedback under the title field */
function showUserFeedbackTitleForm() {
    const titleUserFeedbackForm = document.getElementById("UserFeedbackTitle");
    titleUserFeedbackForm.innerHTML = `form of Title is incorrect`
}

/**shows the feedback under the date field */
function showUserFeedbackDueDate() {
    const dateInput = document.getElementById("UserFeedbackDate");
    dateInput.innerHTML = `form of DueDate is incorrect`;
    const categoryInput = document.getElementById("categoryValue");

}
