"use strict";
const iconList = document.querySelector('.icon-list');
iconList?.addEventListener('wheel', (event) => {
    let e = event;
    if (!(iconList.scrollLeft <= 0 && e.deltaY < 0) && !(iconList.scrollLeft >= iconList.scrollWidth - iconList.clientWidth && e.deltaY > 0)) {
        e.preventDefault();
        LinearScrollAnim(e.deltaY);
    }
});
let scrollTimerId;
let totalScroll = 0;
function LinearScrollAnim(scroll) {
    if (!iconList)
        return;
    clearInterval(scrollTimerId);
    const start = iconList.scrollLeft;
    const stepInterval = 10;
    const scrollSpeed = 0.1;
    const scrollLength = 50;
    const timeout = 5000;
    if (scroll * totalScroll < 0) {
        totalScroll = 0;
    }
    totalScroll += scroll;
    let timerId;
    let duration = 0;
    Scroll();
    function Stop() {
        clearInterval(timerId);
        totalScroll = 0;
    }
    function Scroll() {
        if (!iconList)
            return;
        duration += stepInterval;
        if (duration > timeout) {
            Stop();
            return;
        }
        const direction = (totalScroll / Math.abs(totalScroll));
        const velocity = totalScroll * scrollSpeed;
        if (direction * (iconList.scrollLeft + velocity) >= direction * ((direction * scrollLength * Math.log(1 + Math.abs(totalScroll))) + start)) {
            iconList.scrollLeft = (direction * scrollLength * Math.log(1 + Math.abs(totalScroll))) + start;
            Stop();
            return;
        }
        else if (iconList.scrollLeft + velocity <= 0) {
            Stop();
            iconList.scrollLeft = 0;
            return;
        }
        else if (iconList.scrollLeft + velocity >= iconList.scrollWidth) {
            Stop();
            iconList.scrollLeft = iconList.scrollWidth;
            return;
        }
        iconList.scrollLeft += velocity;
        clearInterval(timerId);
        timerId = setInterval(Scroll, stepInterval);
        scrollTimerId = timerId;
    }
}
const icons = document.querySelectorAll('.icon svg');
const iconTimerIdPrefix = 'icon-timer';
for (let i = 0; i < icons.length; i++) {
    icons[i].addEventListener('mouseenter', (event) => {
        const target = event.target;
        LinearRotateAnim(target, true, 1440, 360, iconTimerIdPrefix + i);
    });
    icons[i].addEventListener('mouseleave', (event) => {
        const target = event.target;
        LinearRotateAnim(target, false, 1440, 0, iconTimerIdPrefix + i);
    });
}
let rotateTimerIds = new Map;
function LinearRotateAnim(element, isClockwise = true, degPerSec = 360, limit = 360, timerId = '', stepInterval = 10, timeout = 10000) {
    const elementRot = element.style.rotate;
    let rot = elementRot.length > 0 ? elementRot.slice(0, elementRot.search('deg')) : 0;
    let duration = 0;
    clearInterval(rotateTimerIds.get(timerId));
    rotateTimerIds.set(timerId, setInterval(rotate, stepInterval));
    function rotate() {
        const deltaTime = stepInterval;
        duration = duration + deltaTime;
        if (duration > timeout) {
            element.style.rotate = limit + 'deg';
            clearInterval(rotateTimerIds.get(timerId));
            rotateTimerIds.delete(timerId);
            return;
        }
        rot = isClockwise ? Number(rot) + Number(degPerSec * 0.001 * deltaTime) : Number(rot) - Number(degPerSec * 0.001 * deltaTime);
        if (isClockwise) {
            if (rot >= limit) {
                element.style.rotate = limit + 'deg';
                clearInterval(rotateTimerIds.get(timerId));
                rotateTimerIds.delete(timerId);
                return;
            }
        }
        else {
            if (rot <= limit) {
                element.style.rotate = limit + 'deg';
                clearInterval(rotateTimerIds.get(timerId));
                rotateTimerIds.delete(timerId);
                return;
            }
        }
        element.style.rotate = rot + 'deg';
    }
}
