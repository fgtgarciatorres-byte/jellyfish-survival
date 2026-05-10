import { GAME } from "./state.js";

import {
    updatePlayer,
    drawPlayer,
    player
} from "./player.js";

import {
    updateEntities,
    drawEntities,
    updateBullets,
    drawBullets,
    createBullet
} from "./entities.js";

import {
    checkCollisions
} from "./collisions.js";

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
   SHOOTING
========================= */

let shootCooldown = 0;

/* =========================
   UPDATE
========================= */

function update(){

    /* =========================
       PLAYER
    ========================= */

    updatePlayer();

    /* =========================
       ENTITIES
    ========================= */

    updateEntities();

    updateBullets();

    /* =========================
       SHOOTING MODE
    ========================= */

    if(GAME.energy >= GAME.maxEnergy){

        GAME.shooting = true;

    }

    /* =========================
       SHOOTING
    ========================= */

    if(GAME.shooting){

        shootCooldown--;

        if(shootCooldown <= 0){

            createBullet(
                player.x,
                player.y - 40
            );

            shootCooldown = 10;

        }

        GAME.energy -= 1;

        if(GAME.energy <= 0){

            GAME.energy = 0;

            GAME.shooting = false;

        }

    }

    /* =========================
       LEVEL SYSTEM
    ========================= */

    GAME.level =
        1 + Math.floor(GAME.score / 100);

    /* =========================
       COLLISIONS
    ========================= */

    checkCollisions();

    /* =========================
       UI
    ========================= */

    updateUI();

}

/* =========================
   DRAW
========================= */

function draw(){

    /* =========================
       BACKGROUND
    ========================= */

    ctx.clearRect(
        0,
        0,
        GAME.width,
        GAME.height
    );

    /* =========================
       OCEAN BACKGROUND
    ========================= */

    const gradient =
        ctx.createLinearGradient(
            0,
            0,
            0,
            GAME.height
        );

    gradient.addColorStop(0, "#001219");

    gradient.addColorStop(1, "#003049");

    ctx.fillStyle = gradient;

    ctx.fillRect(
        0,
        0,
        GAME.width,
        GAME.height
    );

    /* =========================
       ENTITIES
    ========================= */

    drawEntities(ctx);

    drawBullets(ctx);

    /* =========================
       PLAYER
    ========================= */

    drawPlayer(ctx);

    /* =========================
       SHIELD VISUAL
    ========================= */

    if(GAME.shield){

        ctx.save();

        ctx.strokeStyle = "#00aaff";

        ctx.lineWidth = 5;

        ctx.shadowBlur = 20;

        ctx.shadowColor = "#00aaff";

        ctx.beginPath();

        ctx.arc(
            player.x,
            player.y,
            player.radius + 15,
            0,
            Math.PI * 2
        );

        ctx.stroke();

        ctx.restore();

    }

}

/* =========================
   GAME LOOP
========================= */

function gameLoop(){

    if(!GAME.running){

        return;

    }

    update();

    draw();

    requestAnimationFrame(gameLoop);

}

/* =========================
   START
========================= */

startSpawner();

gameLoop();
