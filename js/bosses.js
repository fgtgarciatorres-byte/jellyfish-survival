import { GAME } from "./state.js";

import {
    bullets,
    entities
} from "./entities.js";

import { player } from "./player.js";

/* =========================
   START BOSS
========================= */

export function startBoss(){

    GAME.bossMode = true;

    GAME.bossMaxLives = 40;

    GAME.bossLives = GAME.bossMaxLives;

    GAME.bossX = GAME.width / 2;

    GAME.bossY = 120;

    GAME.bossDirection = 1;

    GAME.bossShootTimer = 0;

}

/* =========================
   UPDATE BOSS
========================= */

export function updateBoss(){

    if(!GAME.bossMode){

        return;

    }

    /* =========================
       MOVIMIENTO
    ========================= */

    GAME.bossX +=
        3 * GAME.bossDirection;

    if(
        GAME.bossX > GAME.width - 120
    ){

        GAME.bossDirection = -1;

    }

    if(
        GAME.bossX < 120
    ){

        GAME.bossDirection = 1;

    }

    /* =========================
       DISPAROS
    ========================= */

    GAME.bossShootTimer--;

    if(GAME.bossShootTimer <= 0){

        shootBossProjectile();

        GAME.bossShootTimer = 50;

    }

    /* =========================
       BALAS VS BOSS
    ========================= */

    for(let i = bullets.length - 1; i >= 0; i--){

        const bullet = bullets[i];

        const dx =
            bullet.x - GAME.bossX;

        const dy =
            bullet.y - GAME.bossY;

        const distance = Math.sqrt(
            dx * dx + dy * dy
        );

        if(distance < 90){

            bullets.splice(i,1);

            GAME.bossLives--;

            GAME.score += 2;

            /* =========================
               MUERTE BOSS
            ========================= */

            if(GAME.bossLives <= 0){

                GAME.bossMode = false;

                GAME.score += 200;

                GAME.diamonds += 5;

                break;

            }

        }

    }

}

/* =========================
   DRAW BOSS
========================= */

export function drawBoss(ctx){

    if(!GAME.bossMode){

        return;

    }

    const time =
        Date.now() * 0.003;

    /* =========================
       PATAS
    ========================= */

    ctx.save();

    ctx.fillStyle = "#2d6a4f";

    for(let i = -1; i <= 1; i += 2){

        for(let j = -1; j <= 1; j += 2){

            ctx.beginPath();

            ctx.arc(

                GAME.bossX + i * 70,

                GAME.bossY + j * 40
                + Math.sin(time) * 5,

                25,

                0,
                Math.PI * 2

            );

            ctx.fill();

        }

    }

    /* =========================
       CAPARAZÓN
    ========================= */

    const gradient =
        ctx.createRadialGradient(

            GAME.bossX,
            GAME.bossY,

            20,

            GAME.bossX,
            GAME.bossY,

            120

        );

    gradient.addColorStop(
        0,
        "#95d5b2"
    );

    gradient.addColorStop(
        1,
        "#1b4332"
    );

    ctx.fillStyle = gradient;

    ctx.shadowBlur = 40;

    ctx.shadowColor = "#52b788";

    ctx.beginPath();

    ctx.arc(

        GAME.bossX,
        GAME.bossY,

        90,

        0,
        Math.PI * 2

    );

    ctx.fill();

    /* =========================
       CABEZA
    ========================= */

    ctx.fillStyle = "#74c69d";

    ctx.beginPath();

    ctx.arc(

        GAME.bossX,

        GAME.bossY - 70,

        35,

        0,
        Math.PI * 2

    );

    ctx.fill();

    /* =========================
       OJOS
    ========================= */

    ctx.fillStyle = "white";

    ctx.beginPath();

    ctx.arc(
        GAME.bossX - 10,
        GAME.bossY - 75,
        6,
        0,
        Math.PI * 2
    );

    ctx.arc(
        GAME.bossX + 10,
        GAME.bossY - 75,
        6,
        0,
        Math.PI * 2
    );

    ctx.fill();

    ctx.fillStyle = "black";

    ctx.beginPath();

    ctx.arc(
        GAME.bossX - 10,
        GAME.bossY - 75,
        3,
        0,
        Math.PI * 2
    );

    ctx.arc(
        GAME.bossX + 10,
        GAME.bossY - 75,
        3,
        0,
        Math.PI * 2
    );

    ctx.fill();

    ctx.restore();

    /* =========================
       BOSS BAR
    ========================= */

    ctx.save();

    ctx.fillStyle = "black";

    ctx.fillRect(
        200,
        30,
        GAME.width - 400,
        30
    );

    ctx.fillStyle = "#ff4444";

    ctx.fillRect(

        200,
        30,

        (GAME.bossLives
        / GAME.bossMaxLives)

        * (GAME.width - 400),

        30

    );

    ctx.restore();

}

/* =========================
   BOSS PROJECTILES
========================= */

function shootBossProjectile(){

    const dx =
        player.x - GAME.bossX;

    const dy =
        player.y - GAME.bossY;

    const angle =
        Math.atan2(dy, dx);

    entities.push({

        type: "bubble",

        x: GAME.bossX,

        y: GAME.bossY,

        radius: 20,

        speed: 0,

        vx: Math.cos(angle) * 5,

        vy: Math.sin(angle) * 5,

        bossProjectile: true

    });

}
