import { GAME } from "./state.js";
import {
    checkCollisions
} from "./collisions.js";
import {
    updatePlayer,
    drawPlayer
} from "./player.js";

import {
    updateEntities,
    drawEntities,
    updateBullets,
    drawBullets,
    createBullet
} from "./entities.js";

import {
    startSpawner
} from "./spawner.js";

import {
    updateUI
} from "./ui.js";

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

window.addEventListener("mousemove", (e) => {

    GAME.mouseX = e.clientX;
    GAME.mouseY = e.clientY;

});

/* =========================
   RESIZE
========================= */

window.addEventListener("resize", () => {

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

    updateBullets();
    
    if(GAME.energy >= GAME.maxEnergy){

    GAME.shooting = true;
        

}
    if(GAME.shooting){

    createBullet(
        GAME.mouseX,
        GAME.mouseY - 40
    );

}
    if(GAME.shooting){

    GAME.energy -= 2;

    if(GAME.energy <= 0){

        GAME.energy = 0;

        GAME.shooting = false;

    }

}
    

    checkCollisions();

    updateUI();

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

    drawBullets(ctx);

    drawPlayer(ctx);

}
/* =========================
   LOOP
========================= */

function gameLoop(){

    if(!GAME.running) return;

    update();

    draw();

    requestAnimationFrame(gameLoop);

}

/* =========================
   START
========================= */

startSpawner();

gameLoop();
