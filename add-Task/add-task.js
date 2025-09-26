const BASe_URL = "https://join-kanban-app-default-rtdb.europe-west1.firebasedatabase.app/"

document.addEventListener('DOMContentLoaded', async () => {
     init();
     contacts = await getObject(path = '/contacts')
     contactsArray = objectToArray(contacts)
     showContacts();
    sectionCheck('add-task')

function sectionCheck(idsecTrue) {
    document.getElementById(idsecTrue).classList.add('active')
}})

 
    const buttons = document.querySelectorAll(".priority-section button");
    
    buttons.forEach(button => {
      button.addEventListener("click", () => {
        buttons.forEach(b => b.classList.remove("urgent", "medium", "low"));
        const priority = button.dataset.priority;
        button.classList.add(priority);
      console.log(priority)});
    });
  

    async function getObject(path = '') {
    let response = await fetch(BASe_URL + path + ".json")
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

    function showContacts() {
    let contacts = document.getElementById('IdForContactsNormal')
    

    for (let index = 1; index < contactsArray.length; index++) {
        console.log(contactsArray);
        contacts.innerHTML += `
            <option class="contactBox" value="${contactsArray[index].name}"> 
            <div class="contactsCircle">${contactsArray[index].firstLetter + contactsArray[index].secondFirstLetter}</div>
              ${contactsArray[index].name}
              </option> `

    }
}


function createTask() {
    if (!formValidationAddTask()) return;

      const popup = document.getElementById("report");
      popup.classList.add("show");

      setTimeout(() => {
        window.location.href = "../board/board.html";
      }, 900);

      setTimeout(() => {
        popup.classList.remove("show");
      }, 1000);
    }


const categoryDiv = document.getElementById("category");
if (categoryDiv) {
  const trigger = categoryDiv.querySelector(".select-trigger");
  const options = categoryDiv.querySelectorAll(".options li");
  const hiddenInput = document.getElementById("categoryValue");

  options.forEach(opt => {
    opt.addEventListener("click", () => {
      trigger.innerHTML = `${opt.textContent} <img src="../img/icons/arrow_drop_downaa.svg">`;
      hiddenInput.value = opt.dataset.value;
    });
  });
}


function formValidationAddTask() {
    const title = document.getElementById("title-add-task").value;
    const dueDate = document.getElementById("date-add-task").value;
    const category = document.getElementById("categoryValue").value; // <-- hidden input
    
    if (title === "" || dueDate === "" || category === "") {
        displayRequiredMessage();
        return false;
    }
    return true;
}


function displayRequiredMessage() {
    const titleInput = document.getElementById("title-add-task");
    const dateInput = document.getElementById("date-add-task");
    const categoryInput = document.getElementById("categoryValue");
    const categoryDiv = document.getElementById("category");

    const titleMessage = titleInput.nextElementSibling;
    const dateMessage = dateInput.nextElementSibling;
    const categoryMessage = categoryDiv.nextElementSibling;

    if (titleInput.value === "") {
        titleMessage.classList.remove("d-none");
        titleInput.classList.add("input-error");
    } else {
        titleMessage.classList.add("d-none");
        titleInput.classList.remove("input-error");
    }

    if (dateInput.value === "") {
        dateMessage.classList.remove("d-none");
        dateInput.classList.add("input-error");
    } else {
        dateMessage.classList.add("d-none");
        dateInput.classList.remove("input-error");
    }

    if (categoryInput.value === "") {
        categoryMessage.classList.remove("d-none");
        categoryDiv.classList.add("input-error");
    } else {
        categoryMessage.classList.add("d-none");
        categoryDiv.classList.remove("input-error");
    }
}