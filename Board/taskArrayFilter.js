

window.tasks = [

];

window.tasks
// searched Task function 
// done by : Arnesto @tasks 
// as parameter and modified function filter and show task to filterAndShowTasksAlternate(array)

/**starts the searching process and calls functions from below */
function beginSearching() {
    const searchField = document.querySelector('#FindTask')
    init_beginSearching()
    document.querySelector('#FindTask').focus()
    searchAndRender(searchField)
}


/**changes img, changes border-color and sets an onclick for finishedSearching */
function init_beginSearching() {
    const imgContainer = document.querySelector('.searchSymbol')
    imgContainer.setAttribute('src', "/img/icons/subtasks-x.svg")
    const inputField = document.querySelector('#FindTask')
    inputField.closest('.inputBorder').setAttribute('style', "border-color: #29ABE2 ;")
    imgContainer.setAttribute('onclick', 'finishedSearching()')
    return
}


/**changes the img, set the border-color back to default and sets an onclick */
function init_finishSearching() {
    const imgContainer = document.querySelector('.searchSymbol')
    imgContainer.setAttribute('src', "/img/icons/search.svg")
    const inputField = document.querySelector('#FindTask')
    inputField.closest('.inputBorder').setAttribute('style', "border-color: black;")
    imgContainer.setAttribute('onclick', 'beginSearching()')
    return
}


/**is responsible for searching and rendering the filtered results */
function searchAndRender(searchField) {
    searchField.addEventListener('input', () => {
        const searchKey = searchField.value.toLowerCase().trim()
        if (searchKey.length >= 2) {
            const regex = new RegExp(`\\b${searchKey}\\b`, "i");
            // const match = regex.test(title) || regex.test(description);
            let searchedTask = tasks.filter(task => {
                const titleMatch = regex.test(task[1].title);
                const descriptionMatch = regex.test(task[1].description);
                return titleMatch || descriptionMatch;
            })
            if (searchedTask.length === 0) {
                taskNotFound();
            } else {
                filterAndShowTasksAlternate(searchedTask);
            }
        } else {
            filterAndShowTasks()
        }
    })
    return;
}


/**ends the search mode and shows the results */
function finishedSearching() {
    init_finishSearching()
    document.querySelector('#FindTask').blur()
    document.querySelector('#FindTask').value = ''
    filterAndShowTasks()
    return
}

/**sets the focus in the input-field */
function searchTaskEventHandling() {
    const searchField = document.querySelector('#FindTask')
    searchField.addEventListener('focus', () => {
        beginSearching()
    })
    return
}


/**shows the filtered results in the board page */
async function filterAndShowTasksAlternate(array) {
    for (let idIndex = 0; idIndex < categorys.length; idIndex++) {
        document.getElementById(`${categorys[idIndex]}`).innerHTML = '';
        let filteredTasks = array.filter(f => f[1].category == categorys[idIndex]);
        if (filteredTasks.length === 0) {
            document.getElementById(`${categorys[idIndex]}`).innerHTML = setCardZero();
        }
        for (let catIndex = 0; catIndex < filteredTasks.length; catIndex++) {
            let element = filteredTasks[catIndex];
            document.getElementById(`${categorys[idIndex]}`).innerHTML += renderTaskintoBoardFilter(element);
            if (document.getElementById(`${categorys[idIndex]}`)) {
                renderContactFilter(element);
            }
        }
    }
}

// ===============here are function for the board or BigView========================

/**this renders the filtered Contacts into the board as Task if there are any contacts */
function renderContactFilter(element) {
    let contact = document.getElementById(`${element[1].id}`)
    if (element[1].assignedTo)
        for (let ContactIndex = 0; ContactIndex < element[1].assignedTo.length; ContactIndex++) {
            let slim = element[1].assignedTo.map(c => c.split(" ").map(f => f.charAt(0)))
            contact.innerHTML += `
    <div id="contactscircle" class="contactsCircle">${slim[ContactIndex][0] + slim[ContactIndex][1]} </div>`
        } else { contact.innerHTML = '' };
}

/**renders the mini Menü for changing the category in Responsiv View */
function renderMiniMenü(id) {
    miniMenu = document.getElementById(`miniMenüResponsiv-${id}`)
    miniMenu.classList.toggle('miniMenüResponsiv')
}

/**this checks the length of subtasks for the bigView - if there is a length above 3 than it is scrollable*/
function checkSubtaskLenght(elements) {
    let elementsOfTask = tasks.find(t => t[1].id === elements);
    if (elementsOfTask[1].subtasks?.length > 3) {
        let ele = document.getElementById('subTaskForBigView')
        ele.style.overflowY = 'scroll';
    } else {

    }
}


/**closes the Mini Menü if you leave a Task */
function closeMiniMenü(id) {
    closeM = document.getElementById(`miniMenüResponsiv-${id}`)
    closeM.classList.remove('miniMenüResponsiv')
}


/**is displayed if durring filter task no results were found */
function setCardZero() {
    let template;
    template = `<div class="card-zero">No tasks found here</div>`;
    return template
}
//-----------------------------------------------------------------------------------------------------------------


/**checks if the not task Found is needed to display */
function taskNotFound() {
    const parent = document.querySelector('.DragAndDropTaskAria')
    const divs = parent.querySelectorAll(".Todo, .Inprogress, .AwaitFeedback, .Done")
    if (divs.length !== 0)
        divs.forEach(div => {
            div.innerHTML = setCardZero()
        });
    return
}



