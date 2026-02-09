
/**check value lenght of input-Fields */
function constantCheck() {
    const title = document.getElementById("title").value;
    const description = document.getElementById('task-description').value;
    const dueDate = document.getElementById("dueDate").value;
    const taskType = document.getElementById("selectedTask").innerText;
}

/**checks or validates the title in the Popup Mask */
function constantCheckTitlePopup() {
    const title = document.getElementById("title").value;
    if (title.length < 2)
        return showUserFeedbackTitlePopup(title);
    document.getElementById('task-description').disabled = true, false;
    document.getElementById("UserFeedbackTitle").innerHTML = "";
    document.getElementById('task-description').disabled = false;

    if (!validateTitleAddTaskPopup(title))
        return showUserFeedbackTitleFormPopup(title);
    document.getElementById('task-description').disabled = true, false;
    document.getElementById("UserFeedbackTitle").innerHTML = "";
    document.getElementById('task-description').disabled = false;

}

/** checks the choosen date - is it in the past? if so Userfeedback will be shown */
function constantCheckDatePopup() {
    const dueDate = document.getElementById("dueDate").value;
    let current = new Date();
    let dateOb = new Date(dueDate);
    if (dateOb < current) {
        const dateField = document.getElementById("UserFeedbackDate");
        dateField.innerHTML = `Date is in the past`;
    } else if (!validateDateAddTaskPopup(dueDate)) {
        return showUserFeedbackDueDatePopup();
    }
    else if (validateDateAddTaskPopup(dueDate)) {
        document.getElementById('creatButtonID').disabled = false;
        clearUserFeedback = document.getElementById("UserFeedbackDate");
        clearUserFeedback.innerHTML = '';
    }
}

/**this validates the title in the Popup Mask */
function validateTitleAddTaskPopup(title) {
    const titleRegex = /^[A-Za-zÄÖÜäöüß\s1-9]+$/;
    return titleRegex.test(title.trim());
}

/**this validates the date in the Popup Mask */
function validateDateAddTaskPopup(dueDate) {
    return isDateValid(dueDate);
}

/**this is a help function to validate the date itself */
function isDateValid(dueDate) {
    return !isNaN(new Date(dueDate));
}

/**shows the user Feedback under the title field if the lenght is to short*/
function showUserFeedbackTitlePopup() {
    const titleUserFeedbackLength = document.getElementById("UserFeedbackTitle");
    titleUserFeedbackLength.innerHTML = `title is too short`;
}

/**shows the user Feedback under the title if the form is incorrect */
function showUserFeedbackTitleFormPopup() {
    const titleUserFeedbackForm = document.getElementById("UserFeedbackTitle");
    titleUserFeedbackForm.innerHTML = `form of Title is incorrect`
}

/**shows the user Feedback under the date field, if the form is incorrect */
function showUserFeedbackDueDatePopup() {
    const dateInput = document.getElementById("UserFeedbackDate");
    dateInput.innerHTML = `form of DueDate is incorrect`;
}