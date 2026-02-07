

function constantCheckTitleEdit() {
    const titleEdit = document.getElementById("titleEdit").value;
    if (titleEdit.length < 2)
        return showUserFeedbackTitleEdit(title),
            document.getElementById('task-descriptionEdit').disabled = true, false;
    document.getElementById("UserFeedbackTitleEditMode").innerHTML = "";
    document.getElementById('task-descriptionEdit').disabled = false;

    if (!validateTitleEdit(titleEdit))
        return showUserFeedbackTitleEditForm(title),
            document.getElementById('task-descriptionEdit').disabled = true, false;
    document.getElementById("UserFeedbackTitleEditMode").innerHTML = "";
    document.getElementById('task-descriptionEdit').disabled = false;

}

function dateInspect() {
    document.getElementById('dueDateEdit').min = new Date().toISOString().split('T')[0];
}


function constantCheckDateEdit() {
    const dueDateEdit = document.getElementById("dueDateEdit").value;
    let current = new Date();
    let dateOb = new Date(dueDateEdit);
    if (dateOb < current) {
        const dateField = document.getElementById("UserFeedbackDateEditMode");
        dateField.innerHTML = `Date is in the past`;
    }
    else if (!validateDateEdit(dueDateEdit)) {
        return showUserFeedbackDueDateEdit();
    } else if (validateDateEdit(dueDateEdit)) {
        document.getElementById('creatButtonIDEdit').disabled = false;
        clearUserFeedback = document.getElementById("UserFeedbackDateEditMode");
        clearUserFeedback.innerHTML = '';
    }
}

function validateTitleEdit(title) {
    const titleRegex = /^[A-Za-zÄÖÜäöüß\s1-9]+$/;
    return titleRegex.test(title.trim());
}


function validateDateEdit(dueDate) {
    let dateOb = new Date(dueDate);
    return isDateValid(dateOb);
}

function isDateValid(dateOb) {
    return !isNaN(new Date(dateOb));
}

function showUserFeedbackTitleEdit() {
    const titleUserFeedbackLength = document.getElementById("UserFeedbackTitleEditMode");
    titleUserFeedbackLength.innerHTML = `title is too short`;
}

function showUserFeedbackTitleEditForm() {
    const titleUserFeedbackForm = document.getElementById("UserFeedbackTitleEditMode");
    titleUserFeedbackForm.innerHTML = `form of Title is incorrect`
}

function showUserFeedbackDueDateEdit() {
    const dateInput = document.getElementById("UserFeedbackDateEditMode");
    dateInput.innerHTML = `form of DueDate is incorrect`;
    const categoryInput = document.getElementById("categoryValue");

}