

document.addEventListener('DOMContentLoaded', async () => {
    init();
    createaddTaskPopup();
    sectionCheck('board');
    filterAndShowTasks();
    contacts = await getObject(path = '/contacts')
    console.log(contacts);
    contactsArray = objectToArray(contacts)
    console.log(contactsArray);
    // renderMiniContactList(arraySorting(contactsArray), targetID = 'contactList') hier logik für das rendern der Mini-Contacte einbauen

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

const BASE_URL = "https://join-kanban-app-default-rtdb.europe-west1.firebasedatabase.app"

async function getObject(path = '') {
  let response = await fetch(BASE_URL + path + ".json")
  return responseToJson = await response.json()
}

function objectToArray(contacts) {          
    const object = Object.entries(contacts) 
        console.log(object);
    const arrayObject = object.map((member) => {
        return {
            id: member[0],
            ...member[1]
        }
    })
    console.log(arrayObject);

    return arrayObject;
}

function arraySorting(array) {
    const sortedArray = array
    sortedArray.sort((memberA, memberB) => {
        return memberA.name.localeCompare(memberB.name)
    })
    return sortedArray
}