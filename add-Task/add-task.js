document.addEventListener('DOMContentLoaded', async () => {
     init();
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
    });
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