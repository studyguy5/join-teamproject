document.addEventListener('DOMContentLoaded', async () => {
     init();
    sectionCheck('summary')

function sectionCheck(idsecTrue) {
    document.getElementById(idsecTrue).classList.add('active')
}})