import {createFavicon} from "./animatedFavicon.js";

createFavicon();

//Makes icon list horizontally scrollable
const iconList = document.querySelector('.icon-list');
iconList?.addEventListener('wheel', (event) => {
    let e: WheelEvent = event as WheelEvent;
    e.preventDefault();
    LinearScrollAnim(e.deltaY);
});

//TODO: Add comments to linear scroll and make it work for more than just icon list
let scrollTimerId: number | undefined;
let totalScroll: number = 0;
function LinearScrollAnim(scroll: number){
    if (!iconList) return;
    clearInterval(scrollTimerId);
    const start = iconList.scrollLeft;
    const stepInterval: number = 10;
    const scrollSpeed: number = 0.1;
    const scrollLength: number = 50;
    const timeout: number = 5000;
    
    if (scroll * totalScroll < 0){
        totalScroll = 0;
    }

    totalScroll += scroll;

    let timerId: number | undefined;

    let duration: number = 0;

    Scroll();

    function Stop(){
        clearInterval(timerId);
        totalScroll = 0;
    }

    function Scroll(){
        if (!iconList) return;

        duration += stepInterval;
        if (duration > timeout){
            Stop();
            return;
        }

        const direction = (totalScroll / Math.abs(totalScroll));
        const velocity = totalScroll * scrollSpeed;

        if (direction * (iconList.scrollLeft + velocity) >= direction * ((direction * scrollLength * Math.log(1 + Math.abs(totalScroll))) + start)){
            iconList.scrollLeft = (direction * scrollLength * Math.log(1 + Math.abs(totalScroll))) + start;
            Stop();
            return;
        }
        else if (iconList.scrollLeft + velocity <= 0){
            Stop();
            return;
        }
        else if (iconList.scrollLeft + velocity >= iconList.scrollWidth){
            Stop();
            return;
        }

        iconList.scrollLeft += velocity;

        clearInterval(timerId);
        timerId = setInterval(Scroll, stepInterval);
        scrollTimerId = timerId;
    }
}
//...

//Rotates icons when hovered over
const icons: NodeListOf<HTMLElement> = document.querySelectorAll('.icon svg');

const iconTimerIdPrefix: string = 'icon-timer'

for (let i = 0; i < icons.length; i++){
    icons[i].addEventListener('mouseenter', (event) => {
        const target: HTMLElement = event.target as HTMLElement;
        LinearRotateAnim(target, true, 1440, 360, iconTimerIdPrefix + i);
    });
    
    icons[i].addEventListener('mouseleave', (event) => {
        const target:HTMLElement = event.target as HTMLElement;
        LinearRotateAnim(target, false, 1440, 0, iconTimerIdPrefix + i);
    });
}


//TODO: Put LinearRotateAnim in an external module
let rotateTimerIds: Map<string, number> = new Map;
/**
 * Rotates a html element linearly over time
 * 
 * @param element - The html element to rotate
 * @param isClockwise - Whether to rotate clockwise (true) or anticlockwise (false)
 * @param degPerSec - Degrees Per Second, the speed at which the element should rotate
 * @param limit - The angle at which the animation stops
 * @param timerId - The unique ID for the rotate animation, if it matches a playing 
 *                  rotate animation this one takes priority
 * @param stepInterval - The time interval between animation steps
 * @param timeout - The time the animation runs for before automatically stopping. 
 *                  Ensures timers are destroyed to protect performance
 */
function LinearRotateAnim(element: HTMLElement, isClockwise: boolean = true, degPerSec: number = 360, 
    limit: number = 360, timerId: string = '', stepInterval: number = 10, timeout: number = 10000){
    const elementRot: string = element.style.rotate;
    let rot: number = elementRot.length > 0 ? elementRot.slice(0, elementRot.search('deg')) as unknown as number : 0;
    let duration: number = 0;

    clearInterval(rotateTimerIds.get(timerId));
    rotateTimerIds.set(timerId, setInterval(rotate, stepInterval));
    
    function rotate(){
        const deltaTime = stepInterval;

        //Times out if animation get stuck
        duration = duration + deltaTime;
        if (duration > timeout){
            element.style.rotate = limit + 'deg';
            clearInterval(rotateTimerIds.get(timerId));
            rotateTimerIds.delete(timerId);
            return;
        }

        rot = isClockwise ? Number(rot) + Number(degPerSec * 0.001 * deltaTime) : Number(rot) - Number(degPerSec * 0.001 * deltaTime);

        if (isClockwise){
            if (rot >= limit){
                element.style.rotate = limit + 'deg';
                clearInterval(rotateTimerIds.get(timerId));
                rotateTimerIds.delete(timerId);
                return;
            }
        }
        else {
            if (rot <= limit){
                element.style.rotate = limit + 'deg';
                clearInterval(rotateTimerIds.get(timerId));
                rotateTimerIds.delete(timerId);
                return;
            }
        }

        element.style.rotate = rot + 'deg';
    }
}