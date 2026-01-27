function initHelp(){
    checkSignUpStatusHelp();
    helpPageChecker()
}


/**
 * Renders help text into the DOM element with the ID 'renderHelpText'.
 *
 * This function selects the element with the given ID and updates
 * its innerHTML to display the help text.
 */
function renderText() {
    let helpText = document.getElementById('renderHelpText');
    helpText.innerHTML = `
    `;
}

//**checks if user is signed up or guest and includes the correct nav and privacy links */
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


//**dynamic back button depending on sign-up status */
function dynamicBackButton(){
    let signUpStatus = sessionStorage.getItem('guest')
    let signUpStatus1 = localStorage.getItem('userFullName')
    if(signUpStatus || signUpStatus1){
        window.location = '/board/board.html';
    }else{window.location = '/login-signup/index.html'}
}

//**checks if on help page to adjust the profile help aria margin */
function helpPageChecker(){
    if(window.location.pathname === "/help/help.html"){
        let custom = document.getElementsByClassName('profile_help-aria')
        if(custom.length > 0){
        custom[0].style = 'margin-left: 220px'
    }
}
}