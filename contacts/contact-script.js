document.addEventListener('DOMContentLoaded',async () =>{
    init()
    markSection('contacts')
})

 function markSection(idTrue) {
    document.querySelectorAll('li').forEach(listElement =>{
        listElement.classList.remove('sectionActive')
    })
    document.getElementById(idTrue).classList.add('sectionActive')
}