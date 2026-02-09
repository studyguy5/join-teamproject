
/**Validation for newContatc Window */ 

function formValidationName() {
    const name = document.getElementById('name');
    if (!validateName(name.value))
        return getErrorLogicNewName(name), document.getElementById('email').disabled = true, document.getElementById('phone').disabled = true;
    if (!validateFirstSecondName(name.value))
        return getErrorLogicFirstSureName(name), document.getElementById('email').disabled = true, document.getElementById('phone').disabled = true;
    if (name.value.length < 2)
        return getErrorLogicNewNameLength(name), document.getElementById('email').disabled = true, document.getElementById('phone').disabled = true;
    removeErrorMark(name);
    document.getElementById('email').disabled = false;
    return true;
}

/**this validates the email while creating a new Contact */
function formValidationEmail() {
    const email = document.getElementById('email');
    if (!validateEmail(email.value))
        return getErrorLogicNewEmail(email), document.getElementById('phone').disabled = true;
    if (email.value.length < 10)
        return getErrorLogicNewEmailLength(email), document.getElementById('phone').disabled = true;
    removeErrorMark(email);
    document.getElementById('phone').disabled = false;
    return true;
}

/**this validates the phone number while creating a new Contact */
function formValidationPhone() {
    const phone = document.getElementById('phone');
    if (!validatePhone(phone.value))
        return getErrorLogicPhone(phone), false;
    if (phone.value.length < 12)
        return getErrorLogicPhoneLength(phone), false;
    removeErrorMark(phone);
    return true;
}

/**this validates all in one function */
function formValidation() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    if (!validateName(name.value) || name.value.length < 2) return getErrorLogic(name), false;
    removeErrorMark(name);
    if (!validateEmail(email.value) || email.value.length < 10) return getErrorLogic(email), false;
    removeErrorMark(email);
    if (!validatePhone(phone.value) || !validatePhone(phone.value) && phone.value.length < 12) return getErrorLogic(phone), false;
    removeErrorMark(phone);
    return true;
}

/**the regex for the actuall Name check */
function validateName(value) {
    const regex = /^[A-Za-zÄÖÜäöüß\s]+$/;
    return regex.test(value.trim());
}

/**the regex for the actuall First-Second Name check */
function validateFirstSecondName(value) {
    const regex1 = /^\S+\s+\S+$/;  //validate first and lastname"
    return regex1.test(value.trim());
}

/**the regex for the actuall Email check */
function validateEmail(value) {
    const regex = /^[^\s@]+@[^\s@]{3,}\.[^\s@]{2,}$/;
    return regex.test(value.trim());
}

/**the regex for the actuall Phone check */
function validatePhone(value) {
    const regex = /^[0-9]{3,20}$/;
    return regex.test(value.trim());
}



/**here we get the Error Logic if hte form of the name is incorrect */
function getErrorLogicNewName(inputField) {
    let userFeedback = document.getElementById(`${inputField.id}UserFeedback`)
    userFeedback.innerText = ('form of ' + `${inputField.id}- Field is incorrect`);
    const errorContainer = inputField.closest('div');
    errorContainer.classList.add('input-empty');
    return;
}

/**here we get the First and Sure name Error Logic if there is missing something */
function getErrorLogicFirstSureName(inputField) {
    let userFeedback = document.getElementById(`${inputField.id}UserFeedback`)
    userFeedback.innerText = ('please enter your full Name');
    const errorContainer = inputField.closest('div');
    errorContainer.classList.add('input-empty');
    return;
}

/**here we get the Error Logic if the lenght of the Name is to short or incorrect */
function getErrorLogicNewNameLength(inputField) {
    let userFeedback = document.getElementById(`${inputField.id}UserFeedback`)
    userFeedback.innerText = ('length of ' + `${inputField.id} - Field is too short`);
    const errorContainer = inputField.closest('div');
    errorContainer.classList.add('input-empty');
    return;
}

/**here we get the Error Logic if the form of a new Email is incorrect */
function getErrorLogicNewEmail(inputField) {
    let userFeedback = document.getElementById(`${inputField.id}UserFeedback`)
    userFeedback.innerText = 'form of ' + `${inputField.id} incorrect`;
    const errorContainer = inputField.closest('div');
    errorContainer.classList.add('input-empty');
    return;
}

/**here we get the Error Logic if the length of the new Email is to short or incorrect */
function getErrorLogicNewEmailLength(inputField) {
    let userFeedback = document.getElementById(`${inputField.id}UserFeedback`)
    userFeedback.innerText = 'length of ' + `${inputField.id} too short`;
    const errorContainer = inputField.closest('div');
    errorContainer.classList.add('input-empty');
    return;
}

/** Error logic specifically for phone number*/
function getErrorLogicPhone(inputField) {
    let userFeedback = document.getElementById(`${inputField.id}UserFeedback`)
    userFeedback.innerText = 'form of Phone Number incorrect';
    const errorContainer = inputField.closest('div');
    errorContainer.classList.add('input-empty');
}

/**Error logic if the length of the phone number is too short or incorrect */
function getErrorLogicPhoneLength(inputField) {
    let userFeedback = document.getElementById(`${inputField.id}UserFeedback`)
    userFeedback.innerText = 'length of Phone Number too short';
    const errorContainer = inputField.closest('div');
    errorContainer.classList.add('input-empty');
}

//===================== Validation for Edit-Mode ========================//

// hier für Edit-Mode die Error-Logic//

function formValidationNameEdit() {
    const name = document.getElementById('nameEdit');
    if (!validateName(name.value))
        return getErrorLogicNameEdit(name), document.getElementById('emailEdit').disabled = true, document.getElementById('phoneEdit').disabled = true;
    if (!validateFirstSecondName(name.value))
        return getErrorLogicFirstSureNameEdit(name), document.getElementById('emailEdit').disabled = true, document.getElementById('phoneEdit').disabled = true;
    if (name.value.length < 2)
        return getErrorLogicNameLengthEdit(name), document.getElementById('emailEdit').disabled = true, document.getElementById('phone').disabled = true;
    removeErrorMarkEdit(name);
    document.getElementById('emailEdit').disabled = false;
}

/**here the Error logic for the Email in the Edit Mode */
function formValidationEmailEdit() {
    const email = document.getElementById('emailEdit');
    if (!validateEmail(email.value))
        return getErrorLogicEmailEdit(email), document.getElementById('phoneEdit').disabled = true;
    if (email.value.length < 10)
        return getErrorLogicEmailLengthEdit(email), document.getElementById('phoneEdit').disabled = true;
    removeErrorMarkEdit(email);
    document.getElementById('phoneEdit').disabled = false;
}

/**here the Error logic for the Phone Number in the Edit Mode */
function formValidationPhoneEdit() {
    const phone = document.getElementById('phoneEdit');
    if (!validatePhone(phone.value)) return getErrorLogicPhoneEdit(phone), false;
    if (phone.value.length < 12) return getErrorLogicPhoneLengthEdit(phone), false;
    removeErrorMarkEdit(phone);
}


/**this check if any user Feedback is still active, if so it stops the editing Process */
function formValidationEdit() {
    const nameFeedback = document.getElementById('nameEditFeedback').innerHTML;
    const emailFeedback = document.getElementById('emailEditFeedback').innerHTML;
    const phoneFeedback = document.getElementById('phoneEditFeedback').innerHTML;
    if (nameFeedback || emailFeedback || phoneFeedback !== "") {
        return false;
    } else {
        return true;
    }
}

// ==================== Validatiion Error Logic Start==============================//
/**here we get the Error Logic as above but for editing existing contacts
 * here the Error Logic for the Name the User types in
  */
function getErrorLogicNameEdit(inputField) {
    let userFeedbackEdit = document.getElementById(`${inputField.id}Feedback`)
    userFeedbackEdit.style.display = "block";
    userFeedbackEdit.innerText = ('form of ' + `${inputField.id.split('Edit')} is incorrect`);
    const errorContainer = inputField.closest('div');
    errorContainer.classList.add('input-empty');
    return;
}

/**here we check the legnth of the Name the User wants to type in */
function getErrorLogicNameLengthEdit(inputField) {
    let userFeedbackEdit = document.getElementById(`${inputField.id}Feedback`)
    userFeedbackEdit.style.display = "block";
    userFeedbackEdit.innerText = ('length of ' + `${inputField.id.split('Edit')} is incorrect`);
    const errorContainer = inputField.closest('div');
    errorContainer.classList.add('input-empty');
    return;
}

/**here we get the Error Logic if First and Sure Name is not existing or someting is missing */
function getErrorLogicFirstSureNameEdit(inputField) {
    let userFeedbackEdit = document.getElementById(`${inputField.id}Feedback`)
    userFeedbackEdit.style.display = "block";
    userFeedbackEdit.innerText = ('please enter your Full Name');
    const errorContainer = inputField.closest('div');
    errorContainer.classList.add('input-empty');
    return;
}

/**here we get the Error Logic for the Email input */
function getErrorLogicEmailEdit(inputField) {
    let userFeedbackEdit1 = document.getElementById(`${inputField.id}Feedback`)
    userFeedbackEdit1.style.display = "block";
    userFeedbackEdit1.innerText = 'form of ' + `${inputField.id.split('Edit')} is incorrect`;
    const errorContainer = inputField.closest('div');
    errorContainer.classList.add('input-empty');
    return;
}

/**here we get the Error Logic for the lenght of the Email */
function getErrorLogicEmailLengthEdit(inputField) {
    let userFeedbackEdit1 = document.getElementById(`${inputField.id}Feedback`)
    userFeedbackEdit1.style.display = "block";
    userFeedbackEdit1.innerText = 'length of ' + `${inputField.id.split('Edit')} is too short`;
    const errorContainer = inputField.closest('div');
    errorContainer.classList.add('input-empty');
    return;
}

/**here we get the Error Logic for the Phone Number */
function getErrorLogicPhoneEdit(inputField) {
    let userFeedbackEdit2 = document.getElementById(`${inputField.id}Feedback`)
    userFeedbackEdit2.innerText = 'form of phone-number is incorrect';
    const errorContainer = inputField.closest('div');
    errorContainer.classList.add('input-empty');
}

/**here we get the Error Logic for the lenght of the Phone Number */
function getErrorLogicPhoneLengthEdit(inputField) {
    let userFeedbackEdit2 = document.getElementById(`${inputField.id}Feedback`)
    userFeedbackEdit2.innerText = 'length of phone-number is too short';
    const errorContainer = inputField.closest('div');
    errorContainer.classList.add('input-empty');
}


/**
 * Removes error styling and restores placeholder.
 * @param {HTMLInputElement} inputField 
 */
function removeErrorMark(inputField) {
    inputField.setAttribute('placeholder', `${inputField.id}`);
    let userFeedback1 = document.getElementById(`${inputField.id}UserFeedback`)
    userFeedback1.innerText = "";
    const container = inputField.closest('div');
    container.classList.remove('input-empty');
}

/**here the Errors get removed in the Edit Mode */
function removeErrorMarkEdit(inputField) {
    let userFeedback1 = document.getElementById(`${inputField.id}Feedback`)
    userFeedback1.innerText = "";
    const container = inputField.closest('div');
    container.classList.remove('input-empty');
}