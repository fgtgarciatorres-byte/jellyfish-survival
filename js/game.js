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

function gameLoop(timestamp){

    gameState.delta =
    (timestamp - gameState.lastTime)/16.67;

    gameState.lastTime = timestamp;

    update();

    render();

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
}

loop();
