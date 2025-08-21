let tasks = [
    {
        'category': 'Todo',
        'id': 0,
        'type': 'technical Task',
        'title': 'setup File',
        'description': 'setup file-structure in order to start working',
        'Due Date': '10.09.25',
        'priority-status': 'normal',
        'assigned to': { 'Robert': 'Fox' },
        'status': 'done',
        'subtasks': {
            'done': 'use Camelcase technic',
            'done': 'connect with github',
            'open': 'push code to github'
        },
    },
    {
        'category': 'Todo',
        'id': 1,
        'type': 'technical Task',
        'title': 'take a zoom meeting',
        'description': 'discuss important topics and distribute roles',
        'Due Date': '25.09.25',
        'priority-status': 'urgent',
        'assigned to': { 'Robert': 'Fox', 'Christina': 'Tranvile' },
        'status': 'open',
        'subtasks': {
            'done': 'invite team Members',
            'done': 'include google calender',
            'open': 'inform People about side Points'
        },
    },
    {
        'category': 'Inprogress',
        'id': 2,
        'type': 'User Story',
        'title': 'add Chat function to board',
        'description': 'add Chat function to board for Users to communicate better',
        'Due Date': '30.09.25',
        'priority-status': 'normal',
        'assigned to': { 'Robert': 'Fox', 'Christina': 'Tranvile', 'Tom': 'Clue' },
        'status': 'open',
        'subtasks': {
            'done': 'set fundament for code',
            'done': 'add chat-server',
            'open': 'discuss about specific features in chat'
        },
    }
];

let currentDraggedElement;

function getTaskInformation() {
    let title = document.getElementById('title').value
    tasks
    let description = document.getElementById('task-description').value
    
    let dueDate = document.getElementById('dueDate').value
    
        let priority = document.getElementsByName('prio').value
        console.log(priority);
    document.getElementById('Todo').innerHTML= '';

    let Todo = tasks.filter(td => td.category == 'Todo')
    for (let index = 0; index < Todo.length; index++) {
        const element = Todo[index];
        console.log(element);
       document.getElementById('Todo').innerHTML+= renderTaskintoBoard(element);
    }

    document.getElementById('Inprogress').innerHTML = '';
    let Inprogress = tasks.filter(Ip => Ip.category == 'Inprogress')
    for (let index = 0; index < Inprogress.length; index++) {
        const element = Inprogress[index];
        document.getElementById('Inprogress').innerHTML += renderTaskintoBoard(element);
    }
    
}

function renderTaskintoBoard(element) {
    return `<div draggable="true" ondragstart="startDragging(${element['id']})" class="TaskDiv">
    ${element.title}
    </div>`
}

function moveTo(category){
    tasks[currentDraggedElement]['category'] = category;
    getTaskInformation();
}

function startDragging(id){
    currentDraggedElement = id
}

function preventDefault(ev){
    ev.preventDefault();
}
