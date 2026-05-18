import { GAME } from "./state.js";

/* =========================
   SCREEN SHAKE
========================= */

export let screenShake = 0;

/* =========================
   FLASH
========================= */

export let flash = 0;

export let flashColor = "#ffffff";

/* =========================
   SHAKE
========================= */

export function triggerShake(
    amount = 10
){

    screenShake = amount;

}

/* =========================
   UPDATE SHAKE
========================= */

export function updateShake(){

    if(screenShake > 0){

        screenShake *= 0.9;

    }

}

/* =========================
   FLASH
========================= */

export function triggerFlash(

    color = "#ffffff",

    amount = 0.5

){

    flash = amount;

    flashColor = color;

}

/* =========================
   UPDATE EFFECTS
========================= */

export function updateEffects(){

    screenShake *= 0.9;

    if(screenShake < 0.1){

        screenShake = 0;

    }

    flash *= 0.9;

    if(flash < 0.01){

        flash = 0;

    }

}

/* =========================
   APPLY SHAKE
========================= */

export function applyShake(ctx){

    if(screenShake <= 0){

        return;

    }

    const shakeX =
        (Math.random() - 0.5)
        * screenShake;

    const shakeY =
        (Math.random() - 0.5)
        * screenShake;

    ctx.translate(
        shakeX,
        shakeY
    );

}

/* =========================
   DRAW FLASH
========================= */

export function drawFlash(
    ctx
){

    if(flash <= 0){

        return;

    }

    ctx.save();

    ctx.globalAlpha = flash;

    ctx.fillStyle = flashColor;

    ctx.fillRect(

        0,
        0,

        GAME.width,
        GAME.height

    );

    ctx.restore();

}
