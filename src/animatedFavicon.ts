function createFavicon(){
    let icon: HTMLLinkElement | null = document.querySelector('link[rel~="icon"]') as HTMLLinkElement;
    if (!icon){
        icon = document.createElement('link');
        icon.rel = "icon";
        document.head.appendChild(icon);
    }

    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');

    interface Frame{
        imageUrl: string,
        duration: number
    }

    const animation: Array<Frame> = [
        {imageUrl:'assets/smiley1.png', duration: 100},
        {imageUrl:'assets/smiley2.png', duration: 100},
        {imageUrl:'assets/smiley3.png', duration: 100},
        {imageUrl:'assets/smiley4.png', duration: 100},
        {imageUrl:'assets/smiley5.png', duration: 100},
        {imageUrl:'assets/smiley6.png', duration: 100},
        {imageUrl:'assets/smiley7.png', duration: 100},
        {imageUrl:'assets/smiley8.png', duration: 100},
        {imageUrl:'assets/smiley9.png', duration: 100},
        {imageUrl:'assets/smiley10.png', duration: 100},
        {imageUrl:'assets/smiley11.png', duration: 100},
        {imageUrl:'assets/smiley12.png', duration: 100},
    ];

    let currentAnimFrame = 0;
    let currentFrameDuration = 0;
    let timeAtLastFrame = 0;
    let firstFrameDrawn = false;

    function drawAnimation(time: number){
        if (!icon || !ctx){
            return;
        }

        const deltaTime = time - timeAtLastFrame;
        timeAtLastFrame = time;

        if (!firstFrameDrawn){
            const image = document.createElement('img');
            image.src = animation[0].imageUrl;
            image.width = 32;
            image.height = 32;

            ctx.clearRect(0, 0, 32, 32);
            ctx.drawImage(image, 0, 0);

            icon.href = canvas.toDataURL('image/png');

            firstFrameDrawn = true;
        }

        currentFrameDuration += deltaTime;

        if (currentFrameDuration > animation[currentAnimFrame].duration){
            currentFrameDuration = 0;
            currentAnimFrame += 1;
            if (currentAnimFrame >= animation.length){
                currentAnimFrame = 0;
            }

            const image = document.createElement('img');
            image.src = animation[currentAnimFrame].imageUrl;
            image.width = 32;
            image.height = 32;

            ctx.clearRect(0, 0, 32, 32);
            ctx.drawImage(image, 0, 0);

            icon.href = canvas.toDataURL('image/png');
        }

        requestAnimationFrame(drawAnimation);
    }

    requestAnimationFrame(drawAnimation);
}

export {createFavicon};