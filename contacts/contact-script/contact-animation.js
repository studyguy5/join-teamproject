/**
 * Keyframes for the starting transform animation of the main element.
 * @type {Array<{ transform: string, opacity: number }>}
 */
let transformArrayStart = [
    { transform: 'translateX(0%)', opacity: 1 },
    { transform: 'translateX(25%)', opacity: 0 }
]

let transformArrayStartVertical = [
    { transform: 'translateY(200px)', opacity: 1 },
    { transform: 'translateY(0)', opacity: 1 }
]

let animationAttributeObjectStartVertical = {
    duration: 500,
    easing: 'ease-in'
}

let transformArrayFinishVertical = [
    { transform: 'translateY(0)', opacity: 1 },
    { transform: 'translateY(200px)', opacity: 1 }
]

let animationAttributeObjectFinishVertical = {
    duration: 5000,
    easing: 'ease-out'
}



/**
 * Animation options for the starting animation of the main element.
 * @type {{ duration: number, easing: string }}
 */
let animationAttributeObjectStart = {
    duration: 100,
    easing: 'ease-in'
}


/**
 * Keyframes for the finishing transform animation of the main element.
 * @type {Array<{ transform: string, opacity: number }>}
 */
let transformArrayFinish = [
    { transform: 'translateX(25%)', opacity: 0 },
    { transform: 'translateX(0)', opacity: 1 }
]



/**
 * Animation options for the finishing animation of the main element.
 * @type {{ duration: number, easing: string }}
 */
let animationAttributeObjectFinish = {
    duration: 300,
    easing: 'ease-out'
}


/**
 * Keyframes for the starting transform animation of the overlay element.
 * @type {Array<{ transform: string, opacity: number }>}
 */
let overlayTransformArrayStart = [
    { transform: 'translateX(0)', opacity: 0 },
    { transform: 'translateX(16%)', opacity: 0 }
]

let overlayTransformArrayStartVertical = [
    { transform: 'translateY(0)', opacity: 0 },
    { transform: 'translateY(86%)', opacity: 0 }
]


/**
 * Animation options for the starting animation of the overlay element.
 * @type {{ duration: number, easing: string }}
 */
let overlayAnimationAttributeObjectStart = {
    duration: 150,
    easing: 'ease-in'
}


/**
 * Keyframes for the finishing transform animation of the overlay element.
 * @type {Array<{ transform: string, opacity: number }>}
 */
let overlayTransformArrayFinish = [
    { transform: 'translateX(16%)', opacity: 1 },
    { transform: 'translateX(0)', opacity: 1 }
]

let overlayTransformArrayFinishVertical = [
    { transform: 'translateY(86%)', opacity: 1 },
    { transform: 'translateY(0)', opacity: 1 }
]


/**
 * Animation options for the finishing animation of the overlay element.
 * @type {{ duration: number, easing: string }}
 */
let overlayAnimationAttributeObjectFinish = {
    duration: 300,
    easing: 'ease-out'
}

/**
 * Slides content out, updates details, then slides back in.
 * @async
 * @param {string} targetID 
 * @param {string} id 
 */
async function switchContentWithSlide(targetID = '', id) {
    const container = document.getElementById(targetID);
    const slideOutAnimation = container.animate(transformArrayStart, animationAttributeObjectStart);
    await slideOutAnimation.finished;
    getContactsDetails(targetID, contacts, id = id);
    container.animate(transformArrayFinish, animationAttributeObjectFinish);
    return;
}


/**
 * Switches the message content inside a container using slide-out and slide-in animations.
 * @async
 * @param {string} [targetQuerry=''] - CSS selector of the target container.
 * @returns {Promise<void>}
 */
async function switchMessageContentWithSlide(targetQuerry = '') {
    let size = window.innerWidth;
    if (size > 428) {
        slideHorizontalSuccess(targetQuerry);
        return;
    } else {
        slideVertical();
        }
}

/**this function makes the successWindow slide in horizontaly and */
async function slideHorizontalSuccess(targetQuerry){
    const container = document.querySelector(targetQuerry)
        const slideOutAnimation = container.animate(transformArrayStart, animationAttributeObjectStart);
        await slideOutAnimation.finished;
        container.innerHTML = setSucessMessage()
        container.animate(transformArrayFinish, animationAttributeObjectFinish);
}
/**this here makes the successWindow slide in verticaly  */
async function slideVertical(){
    const container = document.getElementById('messageVertical')
        const slideOutAnimation = container.animate(transformArrayStartVertical, animationAttributeObjectStartVertical);
        await slideOutAnimation.finished;
        // container.innerHTML = setSucessMessage()
        container.animate(transformArrayFinishVertical, animationAttributeObjectFinishVertical);
}


/**
 * Resets the content of an element using a slide animation.
 * @async
 * @param {string} [targetID=''] - ID of the target element.
 * @returns {Promise<void>}
 */
async function resetContentWithSlide(targetID = '') {
    const container = document.getElementById(targetID)
    const slideOutAnimation = container.animate(transformArrayStart, animationAttributeObjectStart);
    await slideOutAnimation.finished;
    document.getElementById(targetID).innerHTML = ''
    container.animate(transformArrayFinish, animationAttributeObjectFinish);
    return;
}


/**
 * Replaces content inside an overlay with slide-out and slide-in animations.
 * @async
 * @param {string} [targetID=''] - ID of the overlay container.
 * @param {string} htmlContent - HTML content to inject into the container.
 * @returns {Promise<void>}
 */
async function switchOverlayContentWithSlide(targetID = '', htmlContent) {
    let sizeOfWindow = window.innerWidth;
    if (sizeOfWindow > 428) {
        slideHorizontal(targetID, htmlContent);
    } else {
        slideVertical(targetID, htmlContent);
    }
}

/**this function makes the content Window slide in horizontaly and */
async function slideHorizontal(targetID, htmlContent){
    const container = document.getElementById(targetID)
    container.innerHTML = htmlContent
        let slideOutAnimation = container.animate(overlayTransformArrayStart, overlayAnimationAttributeObjectStart);
        await slideOutAnimation.finished;
        container.animate(overlayTransformArrayFinish, overlayAnimationAttributeObjectFinish);
}

/**this here makes the content Window slide in verticaly  */
async function slideVertical(targetID, htmlContent){
    const container = document.getElementById(targetID)
        const slideOutAnimation = container.animate(overlayTransformArrayStartVertical, overlayAnimationAttributeObjectStart);
        await slideOutAnimation.finished;
        container.innerHTML = htmlContent
        container.animate(overlayTransformArrayFinishVertical, overlayAnimationAttributeObjectFinish);
}

