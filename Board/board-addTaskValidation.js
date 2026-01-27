
/**check value lenght of input-Fields */
function constantCheck() {
    const title = document.getElementById("title").value;
    const description = document.getElementById('task-description').value;
    const dueDate = document.getElementById("dueDate").value;
    const taskType = document.getElementById("selectedTask").innerText;
}

function constantCheckTitlePopup() {
    const title = document.getElementById("title").value;
    if (title.length < 2)
        return showUserFeedbackTitlePopup(title);
    document.getElementById('task-description').disabled = true, false;
    document.getElementById("UserFeedbackTitle").innerHTML = "";
    document.getElementById('task-description').disabled = false;

    if (!validateTitleAddTaskNormal(title))
        return showUserFeedbackTitleFormPopup(title);
    document.getElementById('task-description').disabled = true, false;
    document.getElementById("UserFeedbackTitle").innerHTML = "";
    document.getElementById('task-description').disabled = false;

}

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

function validateTitleAddTaskNormal(title) {
    const titleRegex = /^[A-Za-zÄÖÜäöüß\s1-9]+$/;

    return titleRegex.test(title.trim());
}

function validateDateAddTaskPopup(dueDate) {
    return isDateValid(dueDate);
}


function isDateValid(dueDate) {
    return !isNaN(new Date(dueDate));
}


function showUserFeedbackTitlePopup() {
    const titleUserFeedbackLength = document.getElementById("UserFeedbackTitle");
    titleUserFeedbackLength.innerHTML = `title is too short`;
}

function showUserFeedbackTitleFormPopup() {
    const titleUserFeedbackForm = document.getElementById("UserFeedbackTitle");
    titleUserFeedbackForm.innerHTML = `form of Title is incorrect`
}

function showUserFeedbackDueDatePopup() {
    const dateInput = document.getElementById("UserFeedbackDate");
    dateInput.innerHTML = `form of DueDate is incorrect`;
}