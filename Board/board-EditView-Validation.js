
/**this function checks the title in Edit Mode */
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
    return true;
}

/**here it sets a minimum for the date, it must be in the future */
function dateInspect() {
    document.getElementById('dueDateEdit').min = new Date().toISOString().split('T')[0];
}

/**this checks also the date, if for any reason it is in the past, the User gets a feedback */
function constantCheckDateEdit() {
    const dueDateEdit = document.getElementById("dueDateEdit").value;
    let current = new Date();
    let dateOb = new Date(dueDateEdit);
    if (dateOb < current) {
        const dateField = document.getElementById("UserFeedbackDateEditMode");
        dateField.innerHTML = `Date is in the past`;}
    else if (!validateDateEdit(dueDateEdit)) {
        return showUserFeedbackDueDateEdit(), false;
    } else if (validateDateEdit(dueDateEdit)) {
        document.getElementById('creatButtonIDEdit').disabled = false;
        clearUserFeedback = document.getElementById("UserFeedbackDateEditMode");
        clearUserFeedback.innerHTML = ''; return true;}
}

/**this is the actual validation with regex = regular expression who checks the chars */
function validateTitleEdit(title) {
    const titleRegex = /^[A-Za-zÄÖÜäöüß\s1-9.-]+$/;
    return titleRegex.test(title.trim());
}

/**here we check the date, if it is valid, like is it a number */
function validateDateEdit(dueDate) {
    let dateOb = new Date(dueDate);
    return isDateValid(dateOb);
}

/**the !isNaN part checks if it is a number */
function isDateValid(dateOb) {
    return !isNaN(new Date(dateOb));
}

/**this shows a User Feedback if the title is too short */
function showUserFeedbackTitleEdit() {
    const titleUserFeedbackLength = document.getElementById("UserFeedbackTitleEditMode");
    titleUserFeedbackLength.innerHTML = `title is too short`;
}

/**this shows a User Feedback if the title is in a incorrect form */
function showUserFeedbackTitleEditForm() {
    const titleUserFeedbackForm = document.getElementById("UserFeedbackTitleEditMode");
    titleUserFeedbackForm.innerHTML = `form of Title is incorrect`
}

/**this shows a User Feedback if the form of the date is incorrect */
function showUserFeedbackDueDateEdit() {
    const dateInput = document.getElementById("UserFeedbackDateEditMode");
    dateInput.innerHTML = `form of DueDate is incorrect`;
    const categoryInput = document.getElementById("categoryValue");

}