import { GAME } from "./state.js";

/* =========================
   PLAYER
========================= */

export const player = {

    x: GAME.width / 2,
    y: GAME.height / 2,

    radius: 30,

    speed: 0.08,

    pulse: 0

};

/* =========================
   UPDATE PLAYER
========================= */

export function updatePlayer(){

    /* =========================
       MOVIMIENTO SUAVE
    ========================= */

    player.x +=
        (GAME.mouseX - player.x)
        * player.speed;

    player.y +=
        (GAME.mouseY - player.y)
        * player.speed;

    /* =========================
       PULSACIÓN
    ========================= */

    player.pulse += 0.08;

}

/* =========================
   DRAW PLAYER
========================= */

export function drawPlayer(ctx){

    const pulseSize =
        Math.sin(player.pulse) * 3;

    const radius =
        player.radius + pulseSize;

    const time =
        Date.now() * 0.004;

    /* =========================
       FLASH ESCUDO
    ========================= */

    if(GAME.shield){

        ctx.save();

        ctx.strokeStyle = "#00aaff";

        ctx.lineWidth = 5;

        ctx.shadowBlur = 25;

        ctx.shadowColor = "#00aaff";

        ctx.beginPath();

        ctx.arc(
            player.x,
            player.y,
            radius + 18,
            0,
            Math.PI * 2
        );

        ctx.stroke();

        ctx.restore();

    }

    /* =========================
       TENTÁCULOS
    ========================= */

    ctx.save();

    ctx.strokeStyle =
        "rgba(255,180,255,0.8)";

    ctx.lineWidth = 4;

    ctx.shadowBlur = 20;

    ctx.shadowColor = "#ff66ff";

    for(let i = -20; i <= 20; i += 10){

        ctx.beginPath();

        ctx.moveTo(
            player.x + i,
            player.y + 10
        );

        for(let j = 0; j < 4; j++){

            const wave =
                Math.sin(
                    time +
                    i * 0.2 +
                    j
                ) * 10;

            ctx.quadraticCurveTo(

                player.x + i + wave,

                player.y + 30 + j * 15,

                player.x + i,

                player.y + 50 + j * 15

            );

        }

        ctx.stroke();

    }

    ctx.restore();

    /* =========================
       CAMPANA
    ========================= */

    ctx.save();

    const gradient =
        ctx.createRadialGradient(

            player.x,
            player.y - 10,
            5,

            player.x,
            player.y,
            player.radius + 20

        );

    gradient.addColorStop(
        0,
        "#ffd6ff"
    );

    gradient.addColorStop(
        1,
        "#c77dff"
    );

    ctx.fillStyle = gradient;

    ctx.shadowBlur = 30;

    ctx.shadowColor = "#ff66ff";

    ctx.beginPath();

    ctx.arc(

        player.x,
        player.y,

        radius,

        Math.PI,
        0

    );

    ctx.lineTo(
        player.x + radius,
        player.y + 10
    );

    ctx.quadraticCurveTo(
        player.x,
        player.y + 25,
        player.x - radius,
        player.y + 10
    );

    ctx.closePath();

    ctx.fill();

    ctx.restore();

    /* =========================
       OJOS
    ========================= */

    ctx.save();

    ctx.fillStyle = "white";

    ctx.beginPath();

    ctx.arc(
        player.x - 10,
        player.y - 5,
        5,
        0,
        Math.PI * 2
    );

    ctx.arc(
        player.x + 10,
        player.y - 5,
        5,
        0,
        Math.PI * 2
    );

    ctx.fill();

    ctx.fillStyle = "black";

    ctx.beginPath();

    ctx.arc(
        player.x - 10,
        player.y - 5,
        2,
        0,
        Math.PI * 2
    );

    ctx.arc(
        player.x + 10,
        player.y - 5,
        2,
        0,
        Math.PI * 2
    );

    ctx.fill();

    ctx.restore();

}
