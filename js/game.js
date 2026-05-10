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

import {
    startBoss,
    updateBoss,
    drawBoss
} from "./bosses.js";

import {

    updateParticles,
    drawParticles

} from "./particles.js";

/* =========================
   CANVAS
========================= */

const canvas =
    document.getElementById("gameCanvas");

const ctx =
    canvas.getContext("2d");

canvas.width = GAME.width;

canvas.height = GAME.height;

/* =========================
   INPUT
========================= */

window.addEventListener(
    "mousemove",

    (e)=>{

        GAME.mouseX = e.clientX;

        GAME.mouseY = e.clientY;

    }

);

/* =========================
   RESIZE
========================= */

window.addEventListener(
    "resize",

    ()=>{

        GAME.width =
            window.innerWidth;

        GAME.height =
            window.innerHeight;

        canvas.width =
            GAME.width;

        canvas.height =
            GAME.height;

    }

);

/* =========================
   SHOOTING
========================= */

let shootCooldown = 0;

/* =========================
   BOSS CONTROL
========================= */

let lastBossLevel = 0;

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
   PARTICLES
========================= */

updateParticles();
    /* =========================
       LEVEL SYSTEM
    ========================= */

    GAME.level =
        1 +
        Math.floor(
            GAME.score / 100
        );

    /* =========================
       BOSS SPAWN
    ========================= */

    if(

        GAME.level >= 5 &&

        GAME.level % 5 === 0 &&

        !GAME.bossMode &&

        lastBossLevel !== GAME.level

    ){

        startBoss();

        lastBossLevel =
            GAME.level;

    }

    /* =========================
       UPDATE BOSS
    ========================= */

    if(GAME.bossMode){

        updateBoss();

    }

    /* =========================
       SHOOT MODE
    ========================= */

    if(
        GAME.energy >=
        GAME.maxEnergy
    ){

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
console.log("DRAW");
    /* =========================
       CLEAR
    ========================= */

    ctx.clearRect(

        0,
        0,

        GAME.width,
        GAME.height

    );

    /* =========================
       BACKGROUND
    ========================= */

    const gradient =
        ctx.createLinearGradient(

            0,
            0,

            0,
            GAME.height

        );

    /* =========================
       BOSS BACKGROUND
    ========================= */

    if(GAME.bossMode){

        gradient.addColorStop(
            0,
            "#200020"
        );

        gradient.addColorStop(
            1,
            "#000000"
        );

    }else{

        gradient.addColorStop(
            0,
            "#001219"
        );

        gradient.addColorStop(
            1,
            "#003049"
        );

    }

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
   PARTICLES
========================= */

drawParticles(ctx);

    /* =========================
       BOSS
    ========================= */

    if(GAME.bossMode){

        drawBoss(ctx);

    }

    /* =========================
       PLAYER
    ========================= */

    drawPlayer(ctx);

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

    requestAnimationFrame(
        gameLoop
    );

}

/* =========================
   START
========================= */

startSpawner();

gameLoop();
