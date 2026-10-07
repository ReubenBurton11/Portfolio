function createFavicon() {
    let icon = document.querySelector('link[rel~="icon"]');
    if (!icon) {
        icon = document.createElement('link');
        icon.rel = "icon";
        document.head.appendChild(icon);
    }
    const iconSize = 20;
    let canvas = document.createElement('canvas');
    canvas.width = iconSize;
    canvas.height = iconSize;
    let ctx = canvas.getContext('2d');
    let image = document.createElement('img');
    image.width = iconSize;
    image.height = iconSize;
    const animation = {
        animFrames: [
            { imageUrl: '../assets/Cat_Grey_White1.png', startTime: 0 },
            { imageUrl: '../assets/Cat_Grey_White2.png', startTime: 100 },
            { imageUrl: '../assets/Cat_Grey_White3.png', startTime: 200 },
            { imageUrl: '../assets/Cat_Grey_White4.png', startTime: 300 },
            { imageUrl: '../assets/Cat_Grey_White5.png', startTime: 400 },
            { imageUrl: '../assets/Cat_Grey_White6.png', startTime: 500 },
            { imageUrl: '../assets/Cat_Grey_White7.png', startTime: 600 },
            { imageUrl: '../assets/Cat_Grey_White8.png', startTime: 700, endTime: 800 },
        ],
        duration: () => {
            let value = 0;
            let endTime = animation.animFrames[animation.animFrames.length - 1].endTime;
            if (typeof endTime === 'number') {
                value = endTime;
            }
            else {
                value = animation.animFrames[animation.animFrames.length - 1].startTime;
            }
            return value;
        },
        length: () => animation.animFrames.length
    };
    let currentAnimFrame = -1;
    let currentAnimFrameEndTime = animation.animFrames[0].startTime;
    let timeAtLastFrame = 0;
    let animProgress = 0;
    function drawAnimation(time) {
        if (!icon) {
            return;
        }
        const deltaTime = time - timeAtLastFrame;
        timeAtLastFrame = time;
        animProgress += deltaTime;
        if (animProgress > currentAnimFrameEndTime) {
            currentAnimFrame += 1;
            if (currentAnimFrame >= animation.length()) {
                currentAnimFrame = 0;
                animProgress = 0;
            }
            if (currentAnimFrame + 1 >= animation.length()) {
                currentAnimFrameEndTime = animation.duration();
            }
            else {
                currentAnimFrameEndTime = animation.animFrames[currentAnimFrame + 1].startTime;
            }
            image.src = animation.animFrames[currentAnimFrame].imageUrl;
            ctx?.clearRect(0, 0, iconSize, iconSize);
            ctx?.drawImage(image, -6, -12);
            icon.href = canvas.toDataURL('image/png');
        }
        requestAnimationFrame(drawAnimation);
    }
    requestAnimationFrame(drawAnimation);
}
export { createFavicon };
