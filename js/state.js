export const GAME = {

    /* =========================
       CORE
    ========================= */

    width: window.innerWidth,
    height: window.innerHeight,

    running: true,

    level: 1,
    score: 0,

    /* =========================
       PLAYER
    ========================= */

    lives: 3,
    maxLives: 3,

    /* =========================
       ENERGY
    ========================= */

    energy: 0,
    maxEnergy: 100,

    /* =========================
       COMBAT
    ========================= */

    shooting: false,

    bulletDamage: 1,

    shootCooldown: 0,

    fireRate: 10,

    /* =========================
       OVERDRIVE
    ========================= */

    overdrive: false,

    overdriveTimer: 0,

    overdriveDuration: 300,

    /* =========================
       ITEMS
    ========================= */

    diamonds: 0,
    trophies: 0,

    /* =========================
       SHIELD
    ========================= */

    shield: false,
    shieldTimer: 0,

    /* =========================
       FX
    ========================= */

    screenShake: 0,

    flash: {
        active: false,
        color: "#ffffff",
        alpha: 0
    },

    /* =========================
       BOSS
    ========================= */

    bossMode: false

};
