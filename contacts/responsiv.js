document.addEventListener("DOMContentLoaded", () => {


  if (window.innerWidth > 1000) {
    document.getElementById("contact-body-list").style.display = "flex";
}});


function initContactToggle() {

  const list = document.getElementById("contactList");
  const bodyList = document.getElementById("contact-body-list");
  const bodyDetail = document.getElementById("contact-body-detail");

  if (!list || !bodyList || !bodyDetail) return;
if (window.innerWidth <= 780) {
  list.addEventListener("click", () => {
    bodyList.style.display = "none";
    bodyDetail.style.display = "flex";
  })};
}


function closeContactOverlay(){
  const list = document.getElementById("contactList");
  const bodyList = document.getElementById("contact-body-list");
  const bodyDetail = document.getElementById("contact-body-detail");

  bodyList.style.display = "flex";
  bodyDetail.style.display = "none";
}


function toggleContactMore() {
    console.log("works");
    const box = document.getElementById('contact-more-wrapper');
    box.classList.toggle('active');
}