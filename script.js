const slider = document.querySelector('.slider');
const slides = document.querySelector('.slides');

let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID;
let currentIndex = 0;
const slideCount = document.querySelectorAll('.slide').length;

slides.addEventListener('touchstart', touchStart);
slides.addEventListener('touchend', touchEnd);
slides.addEventListener('touchmove', touchMove);
slides.addEventListener('mousedown', touchStart);
slides.addEventListener('mouseup', touchEnd);
slides.addEventListener('mousemove', touchMove);
slides.addEventListener('mouseleave', touchEnd);

function touchStart(event) {
    startPos = event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    isDragging = true;
    animationID = requestAnimationFrame(animation);
    slides.style.transition = 'none';
}

function touchMove(event) {
    if (isDragging) {
        const currentPosition = event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
        currentTranslate = prevTranslate + currentPosition - startPos;
    }
}

function touchEnd() {
    isDragging = false;
    cancelAnimationFrame(animationID);

    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -100 && currentIndex < slideCount - 1) {
        currentIndex += 1;
    } else if (movedBy > 100 && currentIndex > 0) {
        currentIndex -= 1;
    }

    setPositionByIndex();

    slides.style.transition = 'transform 0.3s ease-in-out';
    prevTranslate = currentTranslate;
}

function animation() {
    setSliderPosition();
    if (isDragging) requestAnimationFrame(animation);
}

function setSliderPosition() {
    slides.style.transform = `translateX(${currentTranslate}px)`;
}

function setPositionByIndex() {
    currentTranslate = currentIndex * -slider.offsetWidth;
    slides.style.transform = `translateX(${currentTranslate}px)`;
    prevTranslate = currentTranslate;
}
