function renderSubtaskEdit() {
    let subtask = document.getElementById("subtaskEdit"); // der standard input
    let list = document.getElementById("subtaskEdit-list-1"); // das zusätzliche <ul> element
    let currentCount = list.getElementsByClassName("listedEdit").length; //klasse von li element
    index = currentCount;
    if (currentCount < 2 && subtask.value.trim() === "") {
        list.innerHTML += `<li onclick="editBulletpointEditView(${index})" id="listed-${index}" class="listedEdit"> 
        <span class="dot">•</span><p id="task-text-${index}">${subtask.value}</p>
        <span class="list-icon">
                                    <img onmousedown="editBulletpointEditView(${index})" class="pencil" src="/img/icons/pencil-edit.svg">
                                    <img class="delimiter" src="/img/icons/delimiter-vertical.svg">
                                    <img onmousedown="deleteBulletpointEdit(${index})" class="trash" src="/img/icons/trash.svg">
                                    </span>
                                    </li>`;
        subtask.value = "";
    } else if (currentCount < 2 && subtask.value.trim() !== "") {
        list.innerHTML += `<li onclick="editBulletpointEditView(${index})" id="listed-${index}" class="listedEdit"> 
        <span class="dot">•</span><p id="task-text-${index}">${subtask.value}</p>
        <span class="list-icon">
                                    <img onmousedown="editBulletpointEditView(${index})" class="pencil" src="/img/icons/pencil-edit.svg">
                                    <img class="delimiter" src="/img/icons/delimiter-vertical.svg">
                                    <img onmousedown="deleteBulletpointEdit(${index})" class="trash" src="/img/icons/trash.svg">
                                    </span>
                                    </li>`;
        subtask.value = "";
    }
}


// leere das subtask input Feld
function clearSubtaskEdit() {
    document.getElementById("subtask").value = "";
}


// lösche gerenderten Bulletpoint
function deleteBulletpointEdit(index) {
    let el = document.getElementById(`listed-${index}`);
    if (el) el.remove();
}


// bearbeite gerenderten Bulletpoint
function editBulletpointEditView(index) {
    const li = document.getElementById(`listed-${index}`);
    const textEl = document.getElementById(`task-text-${index}`);
    const inputEl = document.getElementById(`edit-input-${index}`);
    if (inputEl) {
        inputEl.focus();
        return;
    }
    const currentText = textEl ? textEl.textContent : ""; // fallback, falls kein <p> existiert
    li.innerHTML = `
    <input class="edit-input" type="text" id="edit-input-${index}" value="${currentText}">
    <span class="list-icon">
    <img onmousedown="deleteBulletpointEdit(${index})" class="trash" src="/img/icons/trash.svg">
    <img class="delimiter" src="/img/icons/delimiter-vertical.svg">
    <img onmousedown="saveBulletpointEdit(${index})" class="hook" src="/img/icons/subtasks-icon.svg">
        </span>`;
    document.getElementById(`edit-input-${index}`).focus();
}


function saveBulletpointEdit(index) {
    const input = document.getElementById(`edit-input-${index}`);
    const newValue = input.value.trim();
    if (newValue !== "") {
        const li = document.getElementById(`listed-${index}`);
        li.innerHTML = `<span class="dot">•</span><p id="task-text-${index}">${newValue}</p>
        <span class="list-icon">
        <img onmousedown="clearSubtask()" class="pencil" src="/img/icons/pencil-edit.svg">
        <img class="delimiter" src="/img/icons/delimiter-vertical.svg">
        <img onmousedown="deleteBulletpoint(${index})" class="trash" src="/img/icons/trash.svg">
        </span>`;
        li.setAttribute("onclick", `editBulletpointEditView(${index})`);
    }
}