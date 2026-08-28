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

    //function 

    function drawFrame(deltaTime: number){
        if (!icon || !ctx){
            return;
        }

        ctx.clearRect(0, 0, 32, 32);

        ctx.fillStyle = '#000000';
        const size = 14;
        ctx.beginPath();
        ctx.arc(16, 16, size, 0, 2 * Math.PI);
        ctx.fill();

        ctx.strokeStyle = '#fff000';
        ctx.lineWidth = 4;
        const length = 20;
        const speed = 0.005;
        const angle = (-speed * deltaTime) % ((2 * Math.PI));
        ctx.beginPath();
        ctx.moveTo(16, 16);
        const x = 16 + (Math.sin(angle) * length);
        const y = 16 + (Math.cos(angle) * length);
        ctx.lineTo(x, y);
        ctx.stroke();

        icon.href = canvas.toDataURL('image/png');

        requestAnimationFrame(drawFrame);
    }

    requestAnimationFrame(drawFrame);
}

export {createFavicon};