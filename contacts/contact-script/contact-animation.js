// details contact animation 
let transformArrayStart = [
    { transform: 'translateX(0)', opacity: 1 },
    { transform: 'translateX(25%)', opacity: 0 }
]
let animationAttributeObjectStart = {
    duration: 300,
    easing: 'ease-in'
}
let transformArrayFinish = [
    { transform: 'translateX(25%)', opacity: 0 },
    { transform: 'translateX(0)', opacity: 1 }
]
let animationAttributeObjectFinish = {
    duration: 300,
    easing: 'ease-out'
}
// modal-content-slide 
let overlayTransformArrayStart = [
    { transform: 'translateX(0)', opacity: 0 },
    { transform: 'translateX(16%)', opacity: 0 }
]
let overlayAnimationAttributeObjectStart = {
    duration: 300,
    easing: 'ease-in'
}
let overlayTransformArrayFinish = [
    { transform: 'translateX(16%)', opacity: 1 },
    { transform: 'translateX(0)', opacity: 1 }
]
let overlayAnimationAttributeObjectFinish = {
    duration: 300,
    easing: 'ease-out'
}
