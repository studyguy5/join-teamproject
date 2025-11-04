let refFirstLetter;
function setContactList(array, index) {
    const firstLetter = array[index].firstLetter
    let template;
    if (firstLetter != refFirstLetter) {
        template = `<div class="contact-separator">
                        <p>${array[index].firstLetter}</p>
                        <div class="profile">
                                <div class="profile-name"></div>
                                <div class="profile-email"></div>
                            </div>
                        </div>
                        <div class="contact-separator-box"></div>
                        <div class="contact-name" id ="${array[index].id}" onclick='showContactDetails("${array[index].id}")'>
                            <div class="profile-badge" style="background-color: rgba(${array[index].badgeColor[0]}, ${array[index].badgeColor[1]},${array[index].badgeColor[2]}, 1); color: white;">${array[index].firstLetter}${array[index].secondFirstLetter}</div>
                            <div class="profile">
                                <div class="profile-name" >${array[index].name}</div>
                                <div class="profile-email">${array[index].email}</div>
                        </div>
                    </div>`;
        refFirstLetter = firstLetter
    } else {
        template = `    <div class="contact-name" id ="${array[index].id}" onclick='showContactDetails("${array[index].id}")'>
                            <div class="profile-badge" style="background-color: rgba(${array[index].badgeColor[0]}, ${array[index].badgeColor[1]},${array[index].badgeColor[2]}, 1); color: white;">${array[index].firstLetter}${array[index].secondFirstLetter}</div>
                            <div class="profile">
                                <div class="profile-name">${array[index].name}</div>
                                <div class="profile-email">${array[index].email}</div>
                            </div>
                        </div>`;
    }
    return template
}


function setContactDetails(object, id) {
    let template = `    <div class="floating-contact">
                            <div class="floating-contact-header">
                                <div class="floating-contact-badge" style="background-color: rgba(${object[id].badgeColor[0]}, ${object[id].badgeColor[1]},${object[id].badgeColor[2]}, 1); color: white;">
                                    ${object[id].firstLetter}${object[id].secondFirstLetter}
                                </div>
                                <div class="floating-contact-name">
                                    <div class="floating-profile-name">
                                       ${object[id].name}
                                    </div>
                                    <div class="floating-profile-function">
                                        <div class="edit-contact" id="editContact" onclick = "overlayShow(),getEditOverlayContent(targetID = 'overlay-content','${id}')">
                                            <svg class="edit-icon" width="24" height="24" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2 17H3.4L12.025 8.375L10.625 6.975L2 15.6V17ZM16.3 6.925L12.05 
                                            2.725L13.45 1.325C13.8333 0.941667 14.3042 0.75 14.8625 0.75C15.4208 0.75 15.8917 
                                            0.941667 16.275 1.325L17.675 2.725C18.0583 3.10833 18.2583 3.57083 18.275 4.1125C18.2917 
                                            4.65417 18.1083 5.11667 17.725 5.5L16.3 6.925ZM14.85 8.4L4.25 19H0V14.75L10.6 4.15L14.85 8.4Z" 
                                            fill="#2A3647"/>
                                            </svg>
                                            <div>Edit</div>
                                        </div>
                                        <div class="delete-contact" id="delete-contact" onclick = "deleteContact('${id}')">
                                            <svg class="delete-icon" width="24" height="24" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3 18C2.45 18 1.97917 17.8042 1.5875 17.4125C1.19583 17.0208 1 16.55 1 
                                            16V3C0.716667 3 0.479167 2.90417 0.2875 2.7125C0.0958333 2.52083 0 2.28333 0 2C0 
                                            1.71667 0.0958333 1.47917 0.2875 1.2875C0.479167 1.09583 0.716667 1 1 1H5C5 0.716667 
                                            5.09583 0.479167 5.2875 0.2875C5.47917 0.0958333 5.71667 0 6 0H10C10.2833 0 10.5208 
                                            0.0958333 10.7125 0.2875C10.9042 0.479167 11 0.716667 11 1H15C15.2833 1 15.5208 1.09583 
                                            15.7125 1.2875C15.9042 1.47917 16 1.71667 16 2C16 2.28333 15.9042 2.52083 15.7125 2.7125C15.5208 
                                            2.90417 15.2833 3 15 3V16C15 16.55 14.8042 17.0208 14.4125 17.4125C14.0208 17.8042 13.55 18 13 18H3ZM3 
                                            3V16H13V3H3ZM5 13C5 13.2833 5.09583 13.5208 5.2875 13.7125C5.47917 13.9042 5.71667 14 6 14C6.28333 14 
                                            6.52083 13.9042 6.7125 13.7125C6.90417 13.5208 7 13.2833 7 13V6C7 5.71667 6.90417 5.47917 6.7125 5.2875C6.52083 
                                            5.09583 6.28333 5 6 5C5.71667 5 5.47917 5.09583 5.2875 5.2875C5.09583 5.47917 5 5.71667 5 6V13ZM9 13C9 13.2833 9.09583 
                                            13.5208 9.2875 13.7125C9.47917 13.9042 9.71667 14 10 14C10.2833 14 10.5208 13.9042 10.7125 13.7125C10.9042 13.5208 11 13.2833 
                                            11 13V6C11 5.71667 10.9042 5.47917 10.7125 5.2875C10.5208 5.09583 10.2833 5 10 5C9.71667 5 9.47917 5.09583 9.2875 5.2875C9.09583 
                                            5.47917 9 5.71667 9 6V13Z" 
                                            fill="#2A3647"/>
                                            </svg>
                                            <div>Delete</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="floating-contact-title">
                                <p>Contact Information</p>
                            </div>
                            <div class="floating-contact-body">
                                <div class="floating-contact-email">
                                    <p>Email</p>
                                    <div id="floatEmail">
                                        ${object[id].email}
                                    </div>
                                </div>
                                <div class="floating-contact-phone">
                                    <p>Phone</p>
                                    <div id="floatPhone">
                                        ${object[id].telefon}
                                    </div>
                                </div>
                            </div>
                        </div>`;
    return template;
}


function setAddOverlayContent() {
    let template;
    template = `<div class="overlay-logo">
                    <div class="overlay-img-container">
                        <img src="icon-img/join-main-logo.png" alt="">
                    </div>
                    <div id="overlayTitle">
                        <div class="overlay-title-text">
                            Add contact
                        </div>
                        <div class="overlay-title-sub-text">
                            Tasks are better with a team
                        </div>
                        <div class="separator-box-overlay-container">
                            <div class="separator-box-overlay"></div>
                        </div>
                    </div>
                </div>
                <div class="overlay-form">
                    <div class="overlay-icon">
                        <div id="overlayIcon">
                            <img src="icon-img/person.svg" alt="">
                        </div>
                    </div>
                    <div class="add-contact-text">
                        <div class="overlay-close">
                            <div class="close-icon-container" onclick="closeOverlay()">
                                <img src="icon-img/Close.svg" alt="">
                            </div>
                        </div>
                        <div class="add-contact-text-form">
                            <div>
                                <input type="text" id="name" placeholder="name">
                                <img src="icon-img/person (2).svg" alt="" class="name-icon">
                            </div>
                            <div>
                                <input type="text" id="email" placeholder="email">
                                <img src="icon-img/mail.svg" alt="" class="mail-icon">
                            </div>
                            <div>
                                <input type="text" id="phone" placeholder="phone">
                                <img src="icon-img/call.svg" alt="" class="phoneNumber-icon">
                            </div>
                        </div>
                        <div class="add-contact-text-submit">
                            <div id="cancel-overlay">
                                <p>Cancel</p>
                                <svg class="cancel-icon" width="32" height="32" viewBox="0 0 32 32" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <mask id="mask0_71720_5528" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="4"
                                        y="4" width="24" height="24">
                                        <rect x="4" y="4" width="24" height="24" fill="#D9D9D9" />
                                    </mask>
                                    <g mask="url(#mask0_71720_5528)">
                                        <path
                                            d="M16 17.4L11.1 22.3C10.9167 22.4834 10.6834 22.575 10.4 
                                            22.575C10.1167 22.575 9.88338 22.4834 9.70005 22.3C9.51672 
                                            22.1167 9.42505 21.8834 9.42505 21.6C9.42505 21.3167 9.51672 21.0834 
                                            9.70005 20.9L14.6 16L9.70005 11.1C9.51672 10.9167 9.42505 10.6834 
                                            9.42505 10.4C9.42505 10.1167 9.51672 9.88338 9.70005 9.70005C9.88338 
                                            9.51672 10.1167 9.42505 10.4 9.42505C10.6834 9.42505 10.9167 9.51672 
                                            11.1 9.70005L16 14.6L20.9 9.70005C21.0834 9.51672 21.3167 9.42505 21.6 
                                            9.42505C21.8834 9.42505 22.1167 9.51672 22.3 9.70005C22.4834 9.88338 22.575 
                                            10.1167 22.575 10.4C22.575 10.6834 22.4834 10.9167 22.3 11.1L17.4 16L22.3 
                                            20.9C22.4834 21.0834 22.575 21.3167 22.575 21.6C22.575 21.8834 22.4834 22.1167 
                                            22.3 22.3C22.1167 22.4834 21.8834 22.575 21.6 22.575C21.3167 22.575 21.0834 
                                            22.4834 20.9 22.3L16 17.4Z"
                                            fill="#2A3647" />
                                    </g>
                                </svg>
                            </div>
                            <div id="createContactOverlay" onclick= "addContact('name', 'email', 'phone')">
                                <p>Create contact</p>
                                <img src="icon-img/check.svg" alt="">
                            </div>
                        </div>
                    </div>
                </div>`;
    return template
}


function setEditOverlayContent(id) {
    let template;
    template = `<div class="overlay-logo">
                    <div class="overlay-img-container">
                        <img src="icon-img/join-main-logo.png" alt="">
                    </div>
                    <div id="overlayTitle">
                        <div class="overlay-title-text">
                            Edit contact
                        </div>
                        <div class="separator-box-overlay-container">
                            <div class="separator-box-overlay"></div>
                        </div>
                    </div>
                </div>
                <div class="overlay-form">
                    <div class="overlay-icon">
                        <div id="overlayIcon" style="background-color: rgba(${contacts[id].badgeColor[0]}, ${contacts[id].badgeColor[1]},${contacts[id].badgeColor[2]}, 1); color: white;">
                            ${contacts[id].firstLetter}${contacts[id].secondFirstLetter}
                        </div>
                    </div>
                    <div class="add-contact-text">
                        <div class="overlay-close">
                            <div class="close-icon-container" onclick="closeOverlay()">
                                <img src="icon-img/Close.svg" alt="">
                            </div>
                        </div>
                        <div class="add-contact-text-form">
                            <div>
                                <input type="text" id="name" placeholder="Name">
                                <img src="icon-img/person (2).svg" alt="" class="name-icon">
                            </div>
                            <div>
                                <input type="text" id="email" placeholder="Email">
                                <img src="icon-img/mail.svg" alt="" class="mail-icon">
                            </div>
                            <div>
                                <input type="text" id="phone" placeholder="Phone">
                                <img src="icon-img/call.svg" alt="" class="phoneNumber-icon">
                            </div>
                        </div>
                        <div class="add-contact-text-submit">
                            <div id="cancel-overlay">
                                <p>Cancel</p>
                                <svg class="cancel-icon" width="32" height="32" viewBox="0 0 32 32" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <mask id="mask0_71720_5528" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="4"
                                        y="4" width="24" height="24">
                                        <rect x="4" y="4" width="24" height="24" fill="#D9D9D9" />
                                    </mask>
                                    <g mask="url(#mask0_71720_5528)">
                                        <path
                                            d="M16 17.4L11.1 22.3C10.9167 22.4834 10.6834 22.575 10.4 
                                            22.575C10.1167 22.575 9.88338 22.4834 9.70005 22.3C9.51672 
                                            22.1167 9.42505 21.8834 9.42505 21.6C9.42505 21.3167 9.51672 21.0834 
                                            9.70005 20.9L14.6 16L9.70005 11.1C9.51672 10.9167 9.42505 10.6834 
                                            9.42505 10.4C9.42505 10.1167 9.51672 9.88338 9.70005 9.70005C9.88338 
                                            9.51672 10.1167 9.42505 10.4 9.42505C10.6834 9.42505 10.9167 9.51672 
                                            11.1 9.70005L16 14.6L20.9 9.70005C21.0834 9.51672 21.3167 9.42505 21.6 
                                            9.42505C21.8834 9.42505 22.1167 9.51672 22.3 9.70005C22.4834 9.88338 22.575 
                                            10.1167 22.575 10.4C22.575 10.6834 22.4834 10.9167 22.3 11.1L17.4 16L22.3 
                                            20.9C22.4834 21.0834 22.575 21.3167 22.575 21.6C22.575 21.8834 22.4834 22.1167 
                                            22.3 22.3C22.1167 22.4834 21.8834 22.575 21.6 22.575C21.3167 22.575 21.0834 
                                            22.4834 20.9 22.3L16 17.4Z"
                                            fill="#2A3647" />
                                    </g>
                                </svg>
                            </div>
                            <div id="createContactOverlay" onclick = "saveChanges('${id}')">
                                <p>Save</p>
                                <img src="icon-img/check.svg" alt="">
                            </div>
                        </div>
                    </div>
                </div>`;
    return template
}


function setBadgeColor() {
    const positionR = Math.floor(Math.random() * 256)
    const positionG = Math.floor(Math.random() * 256)
    const positionB = Math.floor(Math.random() * 256)
    return ([positionR, positionG, positionB]);
}


function setFirstLetter(string) {
    const nameArray = string.trim().split(" ")
    let firstLetter = nameArray[0][0].toUpperCase()
    return firstLetter
}


function setSecondFirstLetter(string) {
    const nameArray = string.trim().split(" ")
    const secondName = nameArray[1]
    let secondFirstLetter;
    if (secondName) {
        secondFirstLetter = nameArray[1][0].toUpperCase()

    } else {
        secondFirstLetter = ' '
    }
    return secondFirstLetter
}


function setSucessMessage() {
    let template
    template = `        <div class="add-contact-success">
                            <p>Contact succesfully created</p>
                        </div>`
    return template;
}
