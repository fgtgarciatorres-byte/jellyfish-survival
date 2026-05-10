import { GAME } from "./state.js";

import {
    createBubble
} from "./entities.js";

/* =========================
   SPAWN CONTROL
========================= */

let spawnTimer = 0;

/* =========================
   START SPAWNER
========================= */

export function startSpawner(){

    spawnLoop();

}

/* =========================
   SPAWN LOOP
========================= */

function spawnLoop(){

    if(!GAME.running){

        return;

    }

    /* =========================
       DIFICULTAD DINÁMICA
    ========================= */

    let spawnRate = getSpawnRate();

    /* =========================
       CREAR ENTIDAD
    ========================= */

    createBubble();

    /* =========================
       SIGUIENTE SPAWN
    ========================= */

    spawnTimer = setTimeout(

        spawnLoop,

        spawnRate

    );

}

/* =========================
   SPAWN RATE
========================= */

function getSpawnRate(){

    /* =========================
       BASE
    ========================= */

    let rate = 900;

    /* =========================
       ESCALADO POR NIVEL
    ========================= */

    rate -= GAME.level * 60;

    /* =========================
       LÍMITE MÍNIMO
    ========================= */

    if(rate < 180){

        rate = 180;

    }

    return rate;

}
