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

