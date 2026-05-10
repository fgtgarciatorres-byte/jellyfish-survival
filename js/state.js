export const GAME = {

    /* =========================
       PANTALLA
    ========================= */

    width: window.innerWidth,
    height: window.innerHeight,

    /* =========================
       ESTADO GENERAL
    ========================= */

    running: true,

    /* =========================
       PROGRESIÓN
    ========================= */

    score: 0,
    level: 1,

    /* =========================
       VIDA
    ========================= */

    lives: 3,
    maxLives: 3,

    /* =========================
       ENERGÍA
    ========================= */

    energy: 0,
    maxEnergy: 100,

    shooting: false,

    /* =========================
       INVENTARIO
    ========================= */

    diamonds: 0,
    trophies: 0,

    /* =========================
       ESCUDO
    ========================= */

    shield: false,
    shieldTimer: 0,

    /* =========================
       INPUT
    ========================= */

    mouseX: window.innerWidth / 2,
    mouseY: window.innerHeight / 2

};
