let tasks = [
    {
        'category': 'Todo',
        'id': 0,
        'taskType': 'technical Task',
        'title': 'Setup File',
        'description': 'setup file-structure in order to start working',
        'Due Date': '10.09.25',
        'prio': 'Medium',
        'assignedTo': ['Robert Fox'],
        'subtasks': {
            '<input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">':
                '<label for="vehicle1"> check notificatoins in OneNote</label><br></br>',
            '<input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">':
                '<label for="vehicle1"> connect with github</label><br></br>',
            '<input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">':
                '<label for="vehicle1"> push code to github</label><br></br>'
        },
    },
    {
        'category': 'Todo',
        'id': 1,
        'taskType': 'technical Task',
        'title': 'Take a zoom meeting',
        'description': 'discuss important topics and distribute roles',
        'Due Date': '25.09.25',
        'prio': 'Urgent',
        'assignedTo': ['Robert Fox', 'Christina Tranvile'],
        'subtasks': {
            '<input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">':
                '<label for="vehicle1"> tell teammember about addon</label><br></br>',
            '<input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">':
                '<label for="vehicle1"> discuss sidepoints</label><br></br>',
            '<input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">':
                '<label for="vehicle1"> play Minecraft after Zoom</label><br></br>'
        },
    },
    {
        'category': 'Inprogress',
        'id': 2,
        'taskType': 'User Story',
        'title': 'Add Chat function to board',
        'description': 'add Chat function to board for Users to communicate better',
        'Due Date': '30.09.25',
        'prio': 'Medium',
        'assignedTo': ['Robert Fox', 'Christina Tranvile', 'Tom Cruise'],
        'subtasks': {
            '<input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">':
                '<label for="vehicle1"> I have a bike</label><br></br>',
            '<input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">':
                '<label for="vehicle1"> I have a bike</label><br></br>',
            '<input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">':
                '<label for="vehicle1"> I have a bike</label><br></br>'
        },
    }
];


// searched Task function 
// done by : Arnesto @tasks 
// as parameter and modified function filter and show task to filterAndShowTasksAlternate(array)

function beginSearching() {
    const searchField = document.querySelector('#FindTask')
    init_beginSearching()
    document.querySelector('#FindTask').focus()
    searchAndRender(searchField)
}

function init_beginSearching() {
    const imgContainer = document.querySelector('.searchSymbol')
    imgContainer.setAttribute('src', "/img/icons/subtasks-x.svg")
    const inputField = document.querySelector('#FindTask')
    inputField.closest('.inputBorder').setAttribute('style', "border-color: #29ABE2 ;")
    imgContainer.setAttribute('onclick', 'finishedSearching()')
    return
}

function init_finishSearching() {
    const imgContainer = document.querySelector('.searchSymbol')
    imgContainer.setAttribute('src', "/img/icons/search.svg")
    const inputField = document.querySelector('#FindTask')
    inputField.closest('.inputBorder').setAttribute('style', "border-color: black;")
    imgContainer.setAttribute('onclick', 'beginSearching()')
    return
}

function searchAndRender(searchField) {
    searchField.addEventListener('input', () => {
        const searchKey = searchField.value.toLowerCase()
        if (searchKey.length >= 2) {
            let searchedTask = tasks.filter(task => {
                const filteredTask = (task.title.toLowerCase().includes(searchKey) || task.description.toLowerCase().includes(searchKey))
                return filteredTask
            })
            if (searchedTask.length === 0) {
                taskNotFound()
            } else {
                filterAndShowTasksAlternate(searchedTask)
            }
        } else {
            filterAndShowTasks()
        }
    })
    return;
}

function finishedSearching() {
    init_finishSearching()
    document.querySelector('#FindTask').blur()
    document.querySelector('#FindTask').value = ''
    filterAndShowTasks()
    return
}

function searchTaskEventHandling() {
    const searchField = document.querySelector('#FindTask')
    searchField.addEventListener('focus', () => {
        beginSearching()
    })
    return
}

async function filterAndShowTasksAlternate(array) {
    console.log(array)
    for (let idIndex = 0; idIndex < categorys.length; idIndex++) {
        document.getElementById(`${categorys[idIndex]}`).innerHTML = '';
        let filteredTasks = array.filter(f => f.category == categorys[idIndex]);
        for (let catIndex = 0; catIndex < filteredTasks.length; catIndex++) {
            let element = filteredTasks[catIndex];
            document.getElementById(`${categorys[idIndex]}`).innerHTML += renderTaskintoBoard(element);
            if (document.getElementById(`${categorys[idIndex]}`)) {
                renderContact(element);
            }
        }
    }
}

function setCardZero() {
    let template;
    template = `<div class="card-zero">No tasks found in this section</div>`;
    return template
}
//-----------------------------------------------------------------------------------------------------------------

function taskNotFound() {
    const parent = document.querySelector('.DragAndDropTaskAria')
    const divs = parent.querySelectorAll('div')
    divs.forEach(div => {
        div.innerHTML = setCardZero()
    });
    return
}



