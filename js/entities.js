import { GAME } from "./state.js";

/* =========================
   ARRAY GENERAL
========================= */

export const entities = [];

/* =========================
   CREAR BURBUJA
========================= */

export function createBubble(){

    entities.push({

        type: "bubble",

        x: Math.random() * GAME.width,

        y: -50,

        radius: 20 + Math.random() * 15,

        speed: 2 + Math.random() * 3

    });

}

/* =========================
   UPDATE
========================= */

export function updateEntities(){

    for(let entity of entities){

        entity.y += entity.speed;

    }

    // eliminar fuera pantalla
    for(let i = entities.length - 1; i >= 0; i--){

        if(entities[i].y > GAME.height + 100){

            entities.splice(i,1);

            GAME.score++;

        }

    }

}

/* =========================
   DRAW
========================= */

export function drawEntities(ctx){

    for(let entity of entities){

        if(entity.type === "bubble"){

            drawBubble(ctx, entity);

        }

    }

}

/* =========================
   DIBUJO BURBUJA
========================= */

function drawBubble(ctx, bubble){

    ctx.save();

    // brillo
    ctx.shadowBlur = 15;
    ctx.shadowColor = "#90e0ef";

    // cuerpo
    ctx.beginPath();

    ctx.arc(
        bubble.x,
        bubble.y,
        bubble.radius,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = "rgba(173,216,230,0.25)";
    ctx.fill();

    ctx.strokeStyle = "#caf0f8";
    ctx.lineWidth = 2;
    ctx.stroke();

    // reflejo
    ctx.beginPath();

    ctx.arc(
        bubble.x - bubble.radius * 0.3,
        bubble.y - bubble.radius * 0.3,
        bubble.radius * 0.2,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.fill();

    ctx.restore();

}
