// const BASE_URL = "https://join-kanban-app-default-rtdb.europe-west1.firebasedatabase.app"

// async function getObject(path = '') {
//   let response = await fetch(BASE_URL + path + ".json")
//   return responseToJson = await response.json()
// }


// async function deleteData(path = '') {
//   const response = await fetch(BASE_URL + path + ".json", {
//     method: "DELETE",
//   });
//   return await response.json();
// }


// async function postData(path = '', data = {}) {
//   let response = await fetch(BASE_URL + path + ".json", {
//     method: "POST",
//     header: {
//       "content-type": "application/json",
//     },
//     body: JSON.stringify(data)
//   })
//   let responseToJson = await response.json();
//   return responseToJson.name
// }


// async function putData(path = '', data = {}) {
//   let response = await fetch(BASE_URL + path + ".json", {
//     method: "PUT",
//     header: {
//       "content-type": "application/json",
//     },
//     body: JSON.stringify(data)
//   })
//   return responseToJson = await response.json();
// }


// async function patchData(path = '', data = {}) {
//   const response = await fetch(BASE_URL + path + ".json", {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data)
//   });
//   return await response.json();
// }


// async function getArray(pathAdresse = '') {
//   const object = Object.entries(await getObject(path = pathAdresse))
//   return objectToArray(object);
// }



// async function sendAlltoFirebase(array, path = 'contact') {
//   for (let index = 0; index < array.length; index++) {
//     await postData(path = path, data = array[index])
//   }
// }

/**
 * Base URL of the Firebase Realtime Database.
 * @constant {string}
 */
const BASE_URL = "https://join-kanban-app-default-rtdb.europe-west1.firebasedatabase.app"


/**
 * Retrieves an object from Firebase.
 * @async
 * @function getObject
 * @param {string} [path=""] - The database path to fetch.
 * @returns {Promise<Object>} The parsed JSON response.
 */
async function getObject(path = '') {
  let response = await fetch(BASE_URL + path + ".json")
  return responseToJson = await response.json()
}


/**
 * Deletes data from Firebase at a given path.
 * @async
 * @function deleteData
 * @param {string} [path=""] - The database path to delete.
 * @returns {Promise<Object>} The JSON response.
 */
async function deleteData(path = '') {
  const response = await fetch(BASE_URL + path + ".json", {
    method: "DELETE",
  });
  return await response.json();
}


/**
 * Sends POST data to Firebase and returns the generated ID.
 * @async
 * @function postData
 * @param {string} [path=""] - The database path to write to.
 * @param {Object} [data={}] - The data to send.
 * @returns {Promise<string>} The generated Firebase child name (ID).
 */
async function postData(path = '', data = {}) {
  let response = await fetch(BASE_URL + path + ".json", {
    method: "POST",
    header: {
      // Note: Should be "headers", but kept unchanged on request.
      "content-type": "application/json",
    },
    body: JSON.stringify(data)
  })
  let responseToJson = await response.json();
  return responseToJson.name
}


/**
 * Replaces data at a given path in Firebase using PUT.
 * @async
 * @function putData
 * @param {string} [path=""] - The database path to overwrite.
 * @param {Object} [data={}] - The new data.
 * @returns {Promise<Object>} The JSON response.
 */
async function putData(path = '', data = {}) {
  let response = await fetch(BASE_URL + path + ".json", {
    method: "PUT",
    header: {
      // Note: Should be "headers", but kept unchanged on request.
      "content-type": "application/json",
    },
    body: JSON.stringify(data)
  })
  return responseToJson = await response.json();
}


/**
 * Updates (partially) data at a given path in Firebase using PATCH.
 * @async
 * @function patchData
 * @param {string} [path=""] - The database path to update.
 * @param {Object} [data={}] - Partial update object.
 * @returns {Promise<Object>} The JSON response.
 */
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


/**
 * Retrieves data from Firebase and converts it into an array.
 * @async
 * @function getArray
 * @param {string} [pathAdresse=""] - The database path to fetch.
 * @returns {Promise<Array>} An array converted from the returned object.
 */
async function getArray(pathAdresse = '') {
  const object = Object.entries(await getObject(path = pathAdresse))
  return objectToArray(object);
}


/**
 * Sends all objects in an array to Firebase using POST.
 * @async
 * @function sendAlltoFirebase
 * @param {Array} array - Array of objects to send.
 * @param {string} [path="contact"] - The database path to send to.
 * @returns {Promise<void>}
 */
async function sendAlltoFirebase(array, path = 'contact') {
  for (let index = 0; index < array.length; index++) {
    await postData(path = path, data = array[index])
  }
}


