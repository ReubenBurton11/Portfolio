import {createFavicon} from "./animatedFavicon.js";

createFavicon();


//Rotates icons when hovered over
const icons: NodeListOf<HTMLElement> = document.querySelectorAll('.icon svg');

let iconRotateTimerIds: Array<number> = new Array(icons.length); 

for (let i = 0; i < icons.length; i++){
    icons[i].addEventListener('mouseenter', (event) => {
        const target: HTMLElement = event.target as HTMLElement;
        RotateAnim(target, true, 1440, 360, i);
    });
    
    icons[i].addEventListener('mouseleave', (event) => {
        const target:HTMLElement = event.target as HTMLElement;
        RotateAnim(target, false, 1440, 0, i);
    });
}

function RotateAnim(element: HTMLElement, isClockwise: boolean = true, degPerSec: number = 360, 
    limit: number = 360, timerId: number = 0, stepInterval: number = 10, timeout: number = 10000){
    const elementRot: string = element.style.rotate;
    let rot: number = elementRot.length > 0 ? elementRot.slice(0, elementRot.search('deg')) as unknown as number : 0;
    let duration: number = 0;

    clearInterval(iconRotateTimerIds[timerId])
    iconRotateTimerIds[timerId] = setInterval(rotate, stepInterval);
    
    function rotate(){
        const deltaTime = stepInterval;

        //Times out if animation get stuck
        duration = duration + deltaTime;
        if (duration > timeout){
            element.style.rotate = limit + 'deg';
            clearInterval(iconRotateTimerIds[timerId]);
            return;
        }

        rot = isClockwise ? Number(rot) + Number(degPerSec * 0.001 * deltaTime) : Number(rot) - Number(degPerSec * 0.001 * deltaTime);

        if (isClockwise){
            if (rot >= limit){
                element.style.rotate = limit + 'deg';
                clearInterval(iconRotateTimerIds[timerId]);
                return;
            }
        }
        else {
            if (rot <= limit){
                element.style.rotate = limit + 'deg';
                clearInterval(iconRotateTimerIds[timerId]);
                return;
            }
        }

        element.style.rotate = rot + 'deg';
    }
}