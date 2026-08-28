function createFavicon(){
    let icon: HTMLLinkElement | null = document.querySelector('link[rel~="icon"]') as HTMLLinkElement;
    if (!icon){
        icon = document.createElement('link');
        icon.rel = "icon";
        document.head.appendChild(icon);
    }

    interface Frame{
        /**
         * String Url for this frame's image
         */
        imageUrl: string,
        /**
         * The time since the start of the animation that the frame should appear
         */
        startTime: number,
        /**
         * The time when this frame should disappear.
         * Only relevant for the final frame in the animation to determine when the
         * animation should loop/end
         */
        endTime?: number
    }

    interface Animation{
        /**
         * Container for animation frames
         */
        animFrames: Array<Frame>,
        /**
         * The length of time the animation takes to finish
         */
        duration: () => number,
        /**
         * The number of frames in the animation
         */
        length: () => number
    }

    const animation: Animation = {
        animFrames: [
            {imageUrl:'assets/smiley1.png', startTime: 0},
            {imageUrl:'assets/smiley2.png', startTime: 100},
            {imageUrl:'assets/smiley3.png', startTime: 200},
            {imageUrl:'assets/smiley4.png', startTime: 300},
            {imageUrl:'assets/smiley5.png', startTime: 400},
            {imageUrl:'assets/smiley6.png', startTime: 500},
            {imageUrl:'assets/smiley7.png', startTime: 600},
            {imageUrl:'assets/smiley8.png', startTime: 700},
            {imageUrl:'assets/smiley9.png', startTime: 800},
            {imageUrl:'assets/smiley10.png', startTime: 900},
            {imageUrl:'assets/smiley11.png', startTime: 1000},
            {imageUrl:'assets/smiley12.png', startTime: 1100, endTime: 1200},
        ],
        duration: () => {
            let value: number = 0;
            let endTime = animation.animFrames[animation.animFrames.length - 1].endTime;
            if (typeof endTime === 'number'){
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

    function drawAnimation(time: number){
        if (!icon){
            return;
        }

        const deltaTime = time - timeAtLastFrame;
        timeAtLastFrame = time;

        animProgress += deltaTime;

        if (animProgress > currentAnimFrameEndTime){
            currentAnimFrame += 1;
            if (currentAnimFrame >= animation.length()){
                currentAnimFrame = 0;
                animProgress = 0;
            }

            if (currentAnimFrame + 1 >= animation.length()){
                currentAnimFrameEndTime = animation.duration();
            }
            else{
                currentAnimFrameEndTime = animation.animFrames[currentAnimFrame + 1].startTime;
            }

            icon.href = animation.animFrames[currentAnimFrame].imageUrl;
        }

        requestAnimationFrame(drawAnimation);
    }

    requestAnimationFrame(drawAnimation);
}

export {createFavicon};