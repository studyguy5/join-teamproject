/**
 * Keyframes for the starting transform animation of the main element.
 * @type {Array<{ transform: string, opacity: number }>}
 */
let transformArrayStart = [
    { transform: 'translateX(0)', opacity: 1 },
    { transform: 'translateX(25%)', opacity: 0 }
]


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


/**
 * Animation options for the starting animation of the overlay element.
 * @type {{ duration: number, easing: string }}
 */
let overlayAnimationAttributeObjectStart = {
    duration: 300,
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


/**
 * Animation options for the finishing animation of the overlay element.
 * @type {{ duration: number, easing: string }}
 */
let overlayAnimationAttributeObjectFinish = {
    duration: 300,
    easing: 'ease-out'
}

