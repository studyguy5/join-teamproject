
/**basic function to post Data into firebase */
async function postData(path = '', data = {}) {
    let response = await fetch(BASe_URL + path + ".json", {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(data)
    });
    let responseToJson = await response.json();
    return responseToJson.name
}

/**basic function to replace Data within firebase */
async function putData(path = '', data = {}) {
    let response = await fetch(BASe_URL + path + ".json", {
        method: "PUT",
        header: {
            "content-type": "application/json",
        },
        body: JSON.stringify(data)
    })
    return responseToJson = await response.json();
}

/**basic function to update Data within firebase */
async function patchData(path = '', data = {}) {
    const response = await fetch(BASe_URL + path + ".json", {
        method: "PATCH",
        mode: 'cors',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    return await response.json();
}


/**basic function to get Data from firebase */
async function getData(path = '') {
    let response = await fetch(BASe_URL + path + ".json")
    return allTasks = await response.json();

}

/**send all Data into firebase as the name says */
async function sendAlltoFirebase(contactsArray, path = 'contact') {
    for (let index = 0; index < contactsArray.length; index++) {
        await postData(path = path, data = array[index])
    }
}