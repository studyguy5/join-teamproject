let currentCount;
let index = currentCount;

function renderSubtask(){
    let subtask = document.getElementById("subtask"); 
    let list = document.getElementById("subtask-list-1"); 

    let currentCount = list.getElementsByClassName("listed").length; 
    index = currentCount;

    if (currentCount < 2 && subtask.value.trim() !==""){
        list.innerHTML += `<li onclick="editBulletpoint(${index})" id="listed-${index}" class="listed"> 
                              <span class="dot">•</span><p id="task-text-${index}">${subtask.value}</p>
                                <span class="list-icon">
                                    <img onmousedown="clearSubtask()" class="pencil" src="/img/icons/pencil-edit.svg">
                                    <img class="delimiter" src="../img/icons/delimiter-vertical.svg">
                                    <img onmousedown="deleteBulletpoint(${index})" class="trash" src="/img/icons/trash.svg">
                                </span>
                            </li>
        `;
        subtask.value = "";
    }
}


function enableEnterForSubtask() {
    let subtask = document.getElementById("subtask");
    subtask.addEventListener("keydown", e => {
        if (e.key === "Enter") {
            e.preventDefault();
            renderSubtask();
        }
    });
}


function clearSubtask(){
    document.getElementById("subtask").value = "";
}


function deleteBulletpoint(index) {
    let el = document.getElementById(`listed-${index}`);
    if (el) el.remove();
}


function editBulletpoint(index) {
    const li = document.getElementById(`listed-${index}`);
    const textEl = document.getElementById(`task-text-${index}`);
    const inputEl = document.getElementById(`edit-input-${index}`);

    if (inputEl) {
        inputEl.focus();
        return;
    }

    const currentText = textEl ? textEl.textContent : ""; 

    li.innerHTML = `
        <input class="edit-input" type="text" id="edit-input-${index}" value="${currentText}">
        <span class="list-icon">
            <img onmousedown="deleteBulletpoint(${index})" class="trash" src="/img/icons/trash.svg">
            <img class="delimiter" src="/img/icons/delimiter-vertical.svg">
            <img onmousedown="saveBulletpoint(${index})" class="hook" src="/img/icons/subtasks-icon.svg">
        </span>
    `;

    document.getElementById(`edit-input-${index}`).focus();
}


function saveBulletpoint(index) {
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
        li.setAttribute("onclick", `editBulletpoint(${index})`);
    }
}


window.addEventListener("DOMContentLoaded", enableEnterForSubtask);