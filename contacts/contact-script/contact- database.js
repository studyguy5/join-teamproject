const BASE_URL = "https://join-kanban-app-default-rtdb.europe-west1.firebasedatabase.app"

async function getObject(path = '') {
  let response = await fetch(BASE_URL + path + ".json")
  return responseToJson = await response.json()
}


async function deleteData(path = '') {
  const response = await fetch(BASE_URL + path + ".json", {
    method: "DELETE",
  });
  return await response.json();
}


async function postData(path = '', data = {}) {
  let response = await fetch(BASE_URL + path + ".json", {
    method: "POST",
    header: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data)
  })
  let responseToJson = await response.json();
  return responseToJson.name
}


async function putData(path = '', data = {}) {
  let response = await fetch(BASE_URL + path + ".json", {
    method: "PUT",
    header: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data)
  })
  return responseToJson = await response.json();
}


async function patchData(path = '', data = {}) {
  const response = await fetch(BASE_URL + path + ".json", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  });
  return await response.json();
}


async function getArray(pathAdresse = '') {
  const object = Object.entries(await getObject(path = pathAdresse))
  return objectToArray(object);
}



async function sendAlltoFirebase(array, path = 'contact') {
  for (let index = 0; index < array.length; index++) {
    await postData(path = path, data = array[index])
  }
}

