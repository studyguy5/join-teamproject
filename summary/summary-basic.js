


document.addEventListener('DOMContentLoaded', async () => {
    init();
    sectionCheck('summary')
    toDoSummaryEventHandler();
    doneSummaryEventHandler();
    tasks.push(...Object.entries(await getData('task')));
    deliverDataToSummary(tasks);
    console.log(tasks);
    function sectionCheck(idsecTrue) {
        document.getElementById(idsecTrue).classList.add('active')
    }
})

const BASe_URL = "https://join-kanban-app-default-rtdb.europe-west1.firebasedatabase.app/"

async function getData(path = '') {
    let response = await fetch(BASe_URL + path + ".json")
    return allTasks = await response.json();

}

function summaryToBoard() {
    window.location.href = '/board/board.html';
}

function toDoSummaryEventHandler() {
    const box = document.querySelector('.box-upper-left')
    box.addEventListener('mouseenter', () => {
        const imgBox = box.querySelector('img')
        imgBox.setAttribute('src', "../img/icons/summary-pencil-hover.svg")
    })
    box.addEventListener('mouseleave', () => {
        const imgBox = box.querySelector('img')
        imgBox.setAttribute('src', "../img/icons/summary-pencil-default.svg")
    })
}

function doneSummaryEventHandler() {
    const box = document.querySelector('.box-upper-right')
    box.addEventListener('mouseenter', () => {
        const imgBox = box.querySelector('img')
        imgBox.setAttribute('src', "../img/icons/summary-done-icon-hover.svg")
    })
    box.addEventListener('mouseleave', () => {
        const imgBox = box.querySelector('img')
        imgBox.setAttribute('src', "../img/icons/summary-done-icon-default.svg")
    })
}


function deliverDataToSummary(tasks) {
    let todo = tasks.filter(td => td[1].category === 'Todo')
    document.getElementById('todoTask').innerHTML = todo.length;
    let done = tasks.filter(td => td[1].category === 'Done')
    document.getElementById('doneTask').innerHTML = done.length;
    let urgent = tasks.filter(td => td[1].prio === 'Urgent')
    document.getElementById('prioUrgent').innerHTML = urgent.length;
    console.log(tasks);
    document.getElementById('allTaskInBoard').innerHTML = tasks.length;
    let inprogress = tasks.filter(td => td[1].category === 'Inprogress')
    document.getElementById('taskInProgress').innerHTML = inprogress.length;
    let awaitfeedback = tasks.filter(td => td[1].category === 'AwaitFeedback')
    document.getElementById('taskAwaitFeedback').innerHTML = awaitfeedback.length;
}
