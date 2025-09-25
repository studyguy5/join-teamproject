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

// const buttons = document.querySelectorAll(".priority-section button");

 
    const buttons = document.querySelectorAll(".priority-section button");
    
    buttons.forEach(button => {
      button.addEventListener("click", () => {
        buttons.forEach(b => b.classList.remove("urgent", "medium", "low"));
        const priority = button.dataset.priority;
        button.classList.add(priority);
      console.log(priority)});
    });
  


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