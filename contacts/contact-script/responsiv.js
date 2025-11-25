/**
 * Initializes layout adjustments once the DOM is fully loaded.
 * Shows the contact body list on larger screens.
 */
document.addEventListener("DOMContentLoaded", () => {

  if (window.innerWidth > 1000) {
    document.getElementById("contact-body-list").style.display = "flex";
  }
});


/**
 * Initializes the toggle behavior for the contact list and detail view.
 * Hides the contact list and shows the detail view on smaller screens.
 *
 * @function initContactToggle
 * @returns {void}
 */
function initContactToggle() {
  const list = document.getElementById("contactList");
  const bodyList = document.getElementById("contact-body-list");
  const bodyDetail = document.getElementById("contact-body-detail");

  if (!list || !bodyList || !bodyDetail) return;

  if (window.innerWidth <= 780) {
    list.addEventListener("click", () => {
      bodyList.style.display = "none";
      bodyDetail.style.display = "flex";
    });
  }
}


/**
 * Closes the contact detail overlay and returns to the contact list.
 * Reloads the window afterward.
 *
 * @function closeContactOverlay
 * @returns {void}
 */

function closeContactOverlay() {
  let size = window.screen.innerWidth;
  // const list = document.getElementById("contactList");
  const bodyList = document.getElementById("contact-body-list");
  const bodyDetail = document.getElementById("contact-body-detail");
  if(size >= 1001){
    bodyDetail.style.display = "none";
    window.location.reload();
  }else{
  
    bodyList.style.display = "flex";
    bodyDetail.style.display = "none";
    
  }
}


/**
 * Toggles the visibility of the "more options" box for contacts.
 * Stops event propagation to avoid triggering outside click logic.
 *
 * @function toggleContactMore
 * @param {Event} event - The click event triggering the toggle.
 * @returns {void}
 */
function toggleContactMore(event) {
  event.stopPropagation();

  const box = document.getElementById('contact-more-wrapper');
  box.classList.toggle('active');

  if (box.classList.contains('active')) {
    document.addEventListener('click', outsideClick);
  }
}


/**
 * Handles clicks outside the "more options" box.
 * Closes the box if a click occurs outside of it.
 *
 * @function outsideClick
 * @param {Event} e - The click event used to determine if the box should close.
 * @returns {void}
 */
function outsideClick(e) {
  const box = document.getElementById('contact-more-wrapper');
  if (!box.contains(e.target)) {
    box.classList.remove('active');
    document.removeEventListener('click', outsideClick);
  }
}




