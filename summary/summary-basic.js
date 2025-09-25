document.addEventListener('DOMContentLoaded', async () => {
     init();
    sectionCheck('summary')
    toDoSummaryEventHandler()
    doneSummaryEventHandler()

function sectionCheck(idsecTrue) {
    document.getElementById(idsecTrue).classList.add('active')
}})

function summaryToBoard() {
    window.location.href = '../board/board.html';
}

function toDoSummaryEventHandler() {
    const box = document.querySelector('.box-upper-left')
    box.addEventListener('mouseenter',()=>{
        const imgBox = box.querySelector('img')
        imgBox.setAttribute('src',"../img/icons/summary-pencil-hover.svg")
    })
        box.addEventListener('mouseleave',()=>{
        const imgBox = box.querySelector('img')
        imgBox.setAttribute('src',"../img/icons/summary-pencil-default.svg")
    })
}

function doneSummaryEventHandler() {
    const box = document.querySelector('.box-upper-right')
    box.addEventListener('mouseenter',()=>{
        const imgBox = box.querySelector('img')
        imgBox.setAttribute('src',"../img/icons/summary-done-icon-hover.svg")
    })
        box.addEventListener('mouseleave',()=>{
        const imgBox = box.querySelector('img')
        imgBox.setAttribute('src',"../img/icons/summary-done-icon-default.svg")
    })
}