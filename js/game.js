const canvas =
document.getElementById('gameCanvas');

const ctx =
canvas.getContext('2d');

let width,height;

function resize(){

    width =
    canvas.width =
    window.innerWidth;

    height =
    canvas.height =
    window.innerHeight;
}

window.addEventListener(
    'resize',
    resize
);

resize();

function loop(){

    ctx.fillStyle='#001018';

    ctx.fillRect(
        0,
        0,
        width,
        height
    );

    ctx.fillStyle='cyan';

    ctx.beginPath();

    ctx.arc(
        width/2,
        height/2,
        40,
        0,
        Math.PI*2
    );

    ctx.fill();

    requestAnimationFrame(loop);
}

loop();
