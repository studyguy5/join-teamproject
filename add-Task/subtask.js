let currentCount;
let index = currentCount;


/**
 * Renders a new subtask list item if the input is valid.
 * Adds the subtask to the HTML list and resets the input field.
 */
function renderSubtask(){
    let subtask = document.getElementById("subtask"); 
    let list = document.getElementById("subtask-list-1"); //ul list (unorganised list)
    let currentCount = list.getElementsByClassName("listed").length; 
    index = currentCount;
    if (subtask.value.trim() !==""){
        list.innerHTML += renderHTMLForSubtasks(index, subtask); 
        subtask.value = "";}
    if(currentCount > 2 ){
        document.getElementById('subtask-list-1').classList.add('scrollClass')
    }
}


/**
 * Enables pressing "Enter" in the subtask input field to trigger subtask creation.
 */
function enableEnterForSubtask() {
    let subtask = document.getElementById("subtask");
    subtask.addEventListener("keydown", e => {
        if (e.key === "Enter") {
            e.preventDefault();
            renderSubtask();
        }
    });
}


/**
 * Clears the subtask input field.
 */
function clearSubtask(){
    document.getElementById("subtask").value = "";
}


/**
 * Deletes a bullet point (subtask) by its index.
 * @param {number} index - Index of the bullet point to delete.
 */
function deleteBulletpoint(index) {
    let el = document.getElementById(`listed-${index}`);
    if (el) el.remove();
}


/**
 * Turns a bullet point into an editable input field.
 * @param {number} index - Index of the bullet point to edit.
 */
function editBulletpoint(index) {
    const li = document.getElementById(`listed-${index}`);
    const textEl = document.getElementById(`task-text-${index}`);
    const inputEl = document.getElementById(`edit-input-${index}`);
    if (inputEl) {
        inputEl.focus();
        return;}
    const currentText = textEl ? textEl.textContent : ""; 
    li.innerHTML = renderEditModeForBulletPoint(currentText, index);
    document.getElementById(`edit-input-${index}`).focus();
}


/**
 * Saves the edited bullet point text back into the list item.
 * @param {number} index - Index of the bullet point to save.
 */
function saveBulletpoint(index) {
    const input = document.getElementById(`edit-input-${index}`);
    const newValue = input.value.trim();
    if (newValue !== "") {
        const li = document.getElementById(`listed-${index}`);
        li.innerHTML = renderHTMLForSavingBulletPoint(index, newValue);
        // li.setAttribute("onclick", `editBulletpoint(${index})`);
    }
}


/**
 * Initializes event listeners when the DOM is fully loaded.
 */
window.addEventListener("DOMContentLoaded", enableEnterForSubtask);


/**this function checks if the input field is empty or not
 * if empty, it deletes the task entirely, if not, it save the task as he allready exists
 */
function resetOrDeleteBulletSubtask(index){
    console.log('wurde getriggert')
    let input = document.getElementById(`edit-input-${index}`)
    console.log(input);
    let value = input.value.trim();
    if(value.length < 1){
    deleteBulletpoint(index)
    }else{
        saveBulletpoint(index)}
    
}