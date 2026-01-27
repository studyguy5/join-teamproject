
/**
 * Validates required fields for task creation.
 * @returns {boolean} True if valid, otherwise false.
 */
function commonConstantCheck() {
    document.getElementById('creatButtonIDForNormal').disabled = true;
    const title = document.getElementById("title-add-task").value;
    const dueDate = document.getElementById("date-add-task").value;
    const taskType = document.getElementById("selectedTaskNormal").innerText;
    if (title === "" && dueDate === "" && taskType === "Select Task Category") {
        document.getElementById("UserFeedbackTitle").innerHTML = `This Field is required`;
        document.getElementById("UserFeedbackDate").innerHTML = `This Field is required`;
        document.getElementById("UserFeedbackTaskType").innerHTML = `This Field is required`;
    }
    if (title === "" && dueDate === "") {
        document.getElementById("UserFeedbackTitle").innerHTML = `This Field is required`;
        document.getElementById("UserFeedbackDate").innerHTML = `This Field is required`;
    } else if (dueDate === "" && taskType === 'Select Task Category') {
        document.getElementById("UserFeedbackDate").innerHTML = `This Field is required`;
        document.getElementById("UserFeedbackTaskType").innerHTML = `This Field is required`;
    } else if (title === "" && taskType === 'Select Task Category') {
        document.getElementById("UserFeedbackTitle").innerHTML = `This Field is required`;
        document.getElementById("UserFeedbackTaskType").innerHTML = `This Field is required`;
    } else if (taskType === 'Select Task Category') {
        document.getElementById("UserFeedbackTaskType").innerHTML = `This Field is required`;
    } else if (title === '') {
        document.getElementById("UserFeedbackTitle").innerHTML = `This Field is required`;
    } else if (dueDate === '') {
        document.getElementById("UserFeedbackDate").innerHTML = `This Field is required`;
    } else {
        getTaskInformationNormal();
        showSuccessMessage();
    }
}

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

function constantCheckDate() {
    const dueDate = document.getElementById("date-add-task").value;
    let current = new Date();
    let dateOb = new Date(dueDate);
    if (dateOb < current) {
        const dateField = document.getElementById("UserFeedbackDate");
        dateField.innerHTML = `Date is in the past`;
    }
    else if (!validateDateAddTaskNormal(dueDate)) {
        return showUserFeedbackDueDate();
    }
    else if (validateDateAddTaskNormal(dueDate)) {
        document.getElementById('creatButtonIDForNormal').disabled = false;
        clearUserFeedback = document.getElementById("UserFeedbackDate");
        clearUserFeedback.innerHTML = '';
    }

}

function validateTitleAddTaskNormal(title) {
    const titleRegex = /^[A-Za-zÄÖÜäöüß\s1-9]+$/;
    return titleRegex.test(title.trim());
}

function validateDateAddTaskNormal(dueDate) {
    let dateOb = new Date(dueDate);
    return isDateValid(dateOb);
}

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

function showUserFeedbackTitleForm() {
    const titleUserFeedbackForm = document.getElementById("UserFeedbackTitle");
    titleUserFeedbackForm.innerHTML = `form of Title is incorrect`
}

function showUserFeedbackDueDate() {
    const dateInput = document.getElementById("UserFeedbackDate");
    dateInput.innerHTML = `form of DueDate is incorrect`;
    const categoryInput = document.getElementById("categoryValue");

}
