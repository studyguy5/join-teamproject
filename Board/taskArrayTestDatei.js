let tasks = [
    {
        'category': 'Todo',
        'id': 0,
        'taskType': 'technical Task',
        'title': 'Setup File',
        'description': 'setup file-structure in order to start working',
        'Due Date': '10.09.25',
        'prio': 'medium',
        'assignedTo': ['Robert Fox'],
        'subtasks': {
            'done': 'use Camelcase technic',
            'done': 'connect with github',
            'open': 'push code to github'
        },
    },
    {
        'category': 'Todo',
        'id': 1,
        'taskType': 'technical Task',
        'title': 'Take a zoom meeting',
        'description': 'discuss important topics and distribute roles',
        'Due Date': '25.09.25',
        'prio': 'urgent',
        'assignedTo': ['Robert Fox', 'Christina Tranvile'],
        'subtasks': {
            'done': 'invite team Members',
            'done': 'include google calender',
            'open': 'inform People about side Points'
        },
    },
    {
        'category': 'Inprogress',
        'id': 2,
        'taskType': 'User Story',
        'title': 'Add Chat function to board',
        'description': 'add Chat function to board for Users to communicate better',
        'Due Date': '30.09.25',
        'prio': 'medium',
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




function beginSearching() {
    const imgContainer1 = document.querySelector('.searchSymbol')
    imgContainer1.setAttribute('src', "/img/icons/subtasks-x.svg")
    imgContainer1.setAttribute('class', 'search-finished-symbol')
    imgContainer1.setAttribute('onclick','finishedSearching()')
    document.querySelector('#FindTask').focus()
}

function finishedSearching() {
    const imgContainer = document.querySelector('.search-finished-symbol')
    imgContainer.setAttribute('src', "/img/icons/search.svg")
    imgContainer.setAttribute('class', 'searchSymbol')
    imgContainer.setAttribute('onclick','beginSearching()')
    document.querySelector('#FindTask').blur()
    document.querySelector('#FindTask').value = ''
}






