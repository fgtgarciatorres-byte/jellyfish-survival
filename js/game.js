import { GAME } from "./state.js";

import {
    updateFlash,
    drawFlash,
    triggerShake,
    updateShake
} from "./effects.js";

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

import {

    updateEffects,
    applyShake,
    drawFlash

} from "./effects.js";

/* =========================
   CANVAS
========================= */

const canvas =
    document.getElementById(
        "gameCanvas"
    );

const ctx =
    canvas.getContext("2d");

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
       EFFECTS
    ========================= */

    updateEffects();

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
   OVERDRIVE ACTIVATION
========================= */

if(

    GAME.energy >=
    GAME.maxEnergy

    &&

    !GAME.overdrive

){

    GAME.overdrive = true;

    GAME.overdriveTimer =
        GAME.overdriveDuration;

}

/* =========================
   SHOOT COOLDOWN
========================= */

GAME.shootCooldown--;

if(GAME.shootCooldown <= 0){

    /* =========================
       NORMAL SHOT
    ========================= */

    if(!GAME.overdrive){

        createBullet(

            player.x,
            player.y - 40

        );

        GAME.shootCooldown =
            GAME.fireRate;

    }

    /* =========================
       OVERDRIVE SHOT
    ========================= */

    else{

        createBullet(

            player.x,
            player.y - 40,

            -Math.PI / 2

        );

        createBullet(

            player.x,
            player.y - 40,

            -Math.PI / 2 - 0.25

        );

        createBullet(

            player.x,
            player.y - 40,

            -Math.PI / 2 + 0.25

        );

        GAME.shootCooldown = 4;

    }

    triggerShake(1);

}

/* =========================
   OVERDRIVE TIMER
========================= */

if(GAME.overdrive){

    GAME.overdriveTimer--;

    GAME.energy -= 0.4;

    if(

        GAME.overdriveTimer <= 0 ||

        GAME.energy <= 0

    ){

        GAME.overdrive = false;

        GAME.energy = 0;

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
       CAMERA
    ========================= */

    ctx.save();

    applyShake(ctx);

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

    /* =========================
       RESTORE CAMERA
    ========================= */

    ctx.restore();

    /* =========================
       FLASH
    ========================= */

    drawFlash(ctx);

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
