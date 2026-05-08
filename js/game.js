import { GAME } from "./state.js";
import {
    player,
    updatePlayer,
    drawPlayer
} from "./player.js";
import {
    updateEntities,
    drawEntities
} from "./entities.js";

import {
    startSpawner
} from "./spawner.js";
/* =========================
   CANVAS
========================= */

const canvas = document.getElementById("gameCanvas");

const ctx = canvas.getContext("2d");

canvas.width = GAME.width;
canvas.height = GAME.height;

/* =========================
   INPUT
========================= */

window.addEventListener("mousemove", (e)=>{

    GAME.mouseX = e.clientX;
    GAME.mouseY = e.clientY;

});

/* =========================
   RESIZE
========================= */

window.addEventListener("resize", ()=>{

    GAME.width = window.innerWidth;
    GAME.height = window.innerHeight;

    canvas.width = GAME.width;
    canvas.height = GAME.height;

});

/* =========================
   UPDATE
========================= */

function update(){

    updatePlayer();

    updateEntities();

    updateUI();

}

    updatePlayer();

}

/* =========================
   DRAW
========================= */

function draw(){

    ctx.clearRect(
        0,
        0,
        GAME.width,
        GAME.height
    );

    drawEntities(ctx);

    drawPlayer(ctx);

}

    ctx.clearRect(
        0,
        0,
        GAME.width,
        GAME.height
    );

    drawPlayer(ctx);

}

/* =========================
   LOOP
========================= */

function startSpawner();
gameLoop();
{

    if(!GAME.running) return;

    update();

    draw();

    requestAnimationFrame(gameLoop);

}

gameLoop();
