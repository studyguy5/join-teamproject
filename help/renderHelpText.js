function initHelp(){
    checkSignUpStatusHelp();
}


/**
 * Renders help text into the HTML element with the ID 'renderHelpText'.
 *
 * This function selects the element with the given ID and updates
 * its innerHTML to display the help text.
 */
function renderText() {
    let helpText = document.getElementById('renderHelpText');
    helpText.innerHTML = `
    `;
}


function checkSignUpStatusHelp(){
    let signUpStatus = sessionStorage.getItem('guest')
    let signUpStatus1 = localStorage.getItem('userFullName')
    if(signUpStatus || signUpStatus1){
        includeNavLinks();
        includePrivacyLinks();
    }else{
        includeNavLinksWithoutUser();
        includePrivacyLinksWithoutUser();
        let cir = document.querySelector('.headerProfileCircle')
        cir.style.display = "none";
        let helpstyle = document.getElementById('helpImage')
        helpstyle.style.marginLeft = "88vw";
    }
}