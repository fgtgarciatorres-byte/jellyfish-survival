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
   BOSS SYSTEM
========================= */

bossMode: false,

bossLives: 0,

bossMaxLives: 0,

bossX: 0,

bossY: 120,

bossDirection: 1,

bossShootTimer: 0,

    /* =========================
       INPUT
    ========================= */

    mouseX: window.innerWidth / 2,
    mouseY: window.innerHeight / 2

};
