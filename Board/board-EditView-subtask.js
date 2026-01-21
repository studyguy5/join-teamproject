function renderSubtaskEdit(id) {
    console.log('Test Render');
    let subtask = document.getElementById("subtaskEdit"); // der standard input
    let list = document.getElementById("subtaskEdit-list-1"); // das zusätzliche <ul> element
    let currentCount = list.getElementsByClassName("listedEdit").length; //klasse von li element
    index = currentCount;
    if (subtask.value.trim() === "") {
        list.innerHTML += `<li onclick="editBulletpointEditView(${index}, ${id})" id="listed-${index}" class="listedEdit"> 
        <span class="dot">•</span><p class="task-textEdit-${index}">${subtask.value}</p>
        <span onclick="event.stopPropagation()" class="list-icon">
                                    <img onmousedown="editBulletpointEditView(${index}, ${id})" class="pencil" src="/img/icons/pencil-edit.svg">
                                    <img class="delimiter" src="/img/icons/delimiter-vertical.svg">
                                    <img onclick="deleteBulletpointEdit(${index}, ${id})" class="trash" src="/img/icons/trash.svg">
                                    </span>
                                    </li>`;
        subtask.value = "";
    } else if (subtask.value.trim() !== "") {
        list.innerHTML += `<li onclick="editBulletpointEditView(${index})" id="listed-${index}" class="listedEdit"> 
        <span class="dot">•</span><p class="task-textEdit-${index}">${subtask.value}</p>
        <span class="list-icon">
                                    <img onmousedown="editBulletpointEditView(${index}, ${id})" class="pencil" src="/img/icons/pencil-edit.svg">
                                    <img class="delimiter" src="/img/icons/delimiter-vertical.svg">
                                    <img onclick="deleteBulletpointEdit(${index}, ${id})" class="trash" src="/img/icons/trash.svg">
                                    </span>
                                    </li>`;
        subtask.value = "";
    }
}

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
    console.log(presentTask[1].subtasks);
    let el = document.getElementById(`listed-${index}`);
    if (el) el.remove();
    // deleteSubtaskOnFirebase(firebasId);
    // filterAndShowTasks();
}

// let fireURL = 'https://join-kanban-app-default-rtdb.europe-west1.firebasedatabase.app/task/';

// async function deleteSubtaskOnFirebase(firebasId){
//     let response = await fetch(`https://join-kanban-app-default-rtdb.europe-west1.firebasedatabase.app/task/${firebasId}/subtasks/${index}.json`, {
//         method: "DELETE",
//     });
//     return await response.json();
// }


/**sets an allready rendered pulletpoint back into edit mode in order to change him before pushing*/
function editBulletpointEditView(index, id) {
    console.log('Test Edit');
    const li = document.getElementById(`listed-${index}`);
    const textEl = document.getElementById(`task-text-${index}`);
    const inputEl = document.getElementById(`edit-input-${index}`);
    if (inputEl) {
        inputEl.focus();
        return;
    }
    const currentText = textEl ? textEl.textContent : ""; // fallback, falls kein <p> existiert
    if(li)
    li.innerHTML = `
    <input class="edit-input" type="text" id="edit-input-${index}" value="${currentText}">
    <span class="list-icon">
    <img onmousedown="deleteBulletpointEdit(${index}, ${id})" class="trash" src="/img/icons/trash.svg">
    <img class="delimiter" src="/img/icons/delimiter-vertical.svg">
    <img onmousedown="saveBulletpointEdit(${index}, ${id})" class="hook" src="/img/icons/subtasks-icon.svg">
        </span>`;
    document.getElementById(`edit-input-${index}`)?.focus();
}

/**saves the typed in pulletpoints from the input Field */
function saveBulletpointEdit(id, index) {
    console.log('Test Save');
    const input = document.getElementById(`edit-input-${index}`);
    const newValue = input.value.trim();
    if (newValue !== "") {
        const li = document.getElementById(`listed-${index}`);
        li.innerHTML = `<span class="dot">•</span><p id="task-text-${index}">${newValue}</p>
        <span class="list-icon">
        <img onmousedown="clearSubtask()" class="pencil" src="/img/icons/pencil-edit.svg">
        <img class="delimiter" src="/img/icons/delimiter-vertical.svg">
        <img onmousedown="deleteBulletpointEdit(${id}, ${index})" class="trash" src="/img/icons/trash.svg">
        </span>`;
        li.setAttribute("onclick", `editBulletpointEditView(${index})`);
    }
}