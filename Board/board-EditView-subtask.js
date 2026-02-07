

function scrollInfo(id){
    let info = tasks.find(inf => inf[1].id === id)
    if(info[1].subtasks){
        document.getElementById('info').innerHTML = `Please scroll down for Subtasks`;
    }else{document.getElementById('info').innerHTML = ""}
}

/**makes the subtask input field empty */
function clearSubtaskEdit() {
    document.getElementById("subtask").value = "";
}


/**deletes a rendered pulletpoint */
function deleteBulletpointEdit(index, id) {
    let presentTask = tasks.find(inf => inf[1].id === id)
    presentTask[1].subtasks.splice(index, 1);
    let el = document.getElementById(`listed-${index}`);
    if (el) el.remove();
}




/**sets an allready rendered pulletpoint back into edit mode in order to change him before pushing*/
function editBulletpointEditView(index, id) {
    const li = document.getElementById(`listed-${index}`);
    const textEl = document.querySelectorAll(`.task-textEdit-${index}`);
    const inputEl = document.getElementById(`edit-input-${index}`);
    if (inputEl) {
        inputEl.focus();
        return;
    }
    textEl ? textEl : ""; // fallback, falls kein <p> existiert
    let currentText = [];
    textEl.forEach((e) => currentText.push(e.textContent)); 
    if(li)
    li.innerHTML = renderHTMLForeditBullentPoint(index, currentText); 
    document.getElementById(`edit-input-${index}`)?.focus();
}

/**saves the typed in pulletpoints from the input Field */
function saveBulletpointEdit(index, id) {
    let input = document.querySelectorAll(`.edit-input`);
    let newValue = [];
    input.forEach((e) => newValue.push(e.value.trim()));
    ;
    if (newValue !== "") {
        let li = document.getElementById(`listed-${index}`);
        li.innerHTML = renderHTMLForSavingBulletPoint(index, id, newValue);
        li.setAttribute("onclick", `editBulletpointEditView(${index})`);
    }
}