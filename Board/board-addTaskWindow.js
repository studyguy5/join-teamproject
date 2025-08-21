
function showReportAddedTask() {
    const popup = document.getElementById("report");
    popup.classList.add("show");

    setTimeout(() => {
        window.location.href = "../board/board.html";
    }, 900);

    setTimeout(() => {
        popup.classList.remove("show");
    }, 1000);
}



document.addEventListener('DOMContentLoaded', async () => {
    init();
    createaddTaskPopup();
    sectionCheck('board')

    function sectionCheck(idsecTrue) {
        document.getElementById(idsecTrue).classList.add('active')
    }
    const buttons = document.querySelectorAll(".priority-section button");
    if (buttons) {
        buttons.forEach(button => {
            button.addEventListener("click", () => {
                buttons.forEach(b => b.classList.remove("urgent", "medium", "low"));
                const priority = button.dataset.priority;
                button.classList.add(priority);
                console.log('event works')
            });
        })
    };
})

function createaddTaskPopup() {
    let taskpopup = document.getElementById('add-task-popup')
    taskpopup.innerHTML = renderHTMLOfPopup();
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