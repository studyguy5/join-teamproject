
function initBoard(){
    createaddTaskPopup();
}

document.addEventListener('DOMContentLoaded', async () => {
     init();
     initBoard();
    sectionCheck('board')

function sectionCheck(idsecTrue) {
    document.getElementById(idsecTrue).classList.add('active')
}})

function createaddTaskPopup(){
    let taskpopup = document.getElementById('add-task-popup')
    taskpopup.innerHTML = renderHTMLOfBoard();
}



function addTask() {
      const popup = document.getElementById("add-task-popup");
      popup.classList.add("show");

      
}



function closePopup() {    
    const popup = document.getElementById("add-task-popup");
    popup.classList.remove("show");
}


function createTaskTemplate() {
    showReportAddedTaskTemplate();
}


function showReportAddedTaskTemplate() {
    const popup = document.getElementById("report");
    popup.classList.add("show");

    setTimeout(() => {
        popup.classList.remove("show");
        closePopup();
      }, 1000);
    }