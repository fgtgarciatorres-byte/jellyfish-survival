import { GAME } from "./state.js";

/* =========================
   ELEMENTOS UI
========================= */

const scoreElement = document.getElementById("score");

const levelElement = document.getElementById("level");

const livesElement = document.getElementById("lives");

const energyElement = document.getElementById("energy");

const diamondsElement = document.getElementById("diamonds");

const trophiesElement = document.getElementById("trophies");

const shieldElement = document.getElementById("shield");

/* =========================
   UPDATE UI
========================= */

export function updateUI(){

    /* =========================
       SCORE
    ========================= */

    scoreElement.textContent = GAME.score;

    /* =========================
       LEVEL
    ========================= */

    levelElement.textContent = GAME.level;

    /* =========================
       VIDAS
    ========================= */

    livesElement.textContent =
        GAME.lives + " / " + GAME.maxLives;

    /* =========================
       ENERGÍA
    ========================= */

    energyElement.textContent =
        GAME.energy + " / " + GAME.maxEnergy;

    /* =========================
       DIAMANTES
    ========================= */

    diamondsElement.textContent =
        GAME.diamonds;

    /* =========================
       TROFEOS
    ========================= */

    trophiesElement.textContent =
        GAME.trophies;

    /* =========================
       ESCUDO
    ========================= */

    if(GAME.shield){

        shieldElement.textContent = "ON";

    }else{

        shieldElement.textContent = "OFF";

    }

}
