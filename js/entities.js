import { GAME } from "./state.js";

/* =========================
   ENTITIES
========================= */

export const entities = [];

export const bullets = [];

/* =========================
   CREAR TIPO ALEATORIO
========================= */

function randomType(){

    const random = Math.random();

    if(random < 0.7){

        return "bubble";

    }

    if(random < 0.85){

        return "star";

    }

    return "alga";

}

/* =========================
   CREAR ENTIDAD
========================= */

export function createBubble(){

    entities.push({

        type: randomType(),

        x: Math.random() * GAME.width,

        y: -50,

        radius: 20 + Math.random() * 15,

        speed: 2 + Math.random() * 3

    });

}

/* =========================
   CREAR BALA
========================= */

export function createBullet(x, y){

    bullets.push({

        x,
        y,

        radius: 8,

        speed: 10

    });

}

/* =========================
   UPDATE ENTITIES
========================= */

export function updateEntities(){

    for(let entity of entities){

        entity.y += entity.speed;

    }

    for(let i = entities.length - 1; i >= 0; i--){

        if(entities[i].y > GAME.height + 100){

            if(entities[i].type === "bubble"){

                GAME.score++;

            }

            entities.splice(i,1);

        }

    }

}

/* =========================
   UPDATE BULLETS
========================= */

export function updateBullets(){

    for(let bullet of bullets){

        bullet.y -= bullet.speed;

    }

    for(let i = bullets.length - 1; i >= 0; i--){

        if(bullets[i].y < -100){

            bullets.splice(i,1);

        }

    }

}

/* =========================
   DRAW ENTITIES
========================= */

export function drawEntities(ctx){

    for(let entity of entities){

        if(entity.type === "bubble"){

            drawBubble(ctx, entity);

        }

        if(entity.type === "star"){

            drawStar(ctx, entity);

        }

        if(entity.type === "alga"){

            drawAlga(ctx, entity);

        }

    }

}

/* =========================
   DRAW BULLETS
========================= */

export function drawBullets(ctx){

    for(let bullet of bullets){

        ctx.save();

        ctx.fillStyle = "#00ffff";

        ctx.shadowBlur = 15;
        ctx.shadowColor = "#00ffff";

        ctx.beginPath();

        ctx.arc(
            bullet.x,
            bullet.y,
            bullet.radius,
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.restore();

    }

}

/* =========================
   BURBUJA
========================= */

function drawBubble(ctx, bubble){

    ctx.save();

    ctx.shadowBlur = 15;
    ctx.shadowColor = "#90e0ef";

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

/* =========================
   STAR
========================= */

function drawStar(ctx, star){

    ctx.save();

    ctx.fillStyle = "gold";

    ctx.shadowBlur = 20;
    ctx.shadowColor = "yellow";

    ctx.beginPath();

    ctx.arc(
        star.x,
        star.y,
        star.radius * 0.7,
        0,
        Math.PI * 2
    );

    ctx.fill();

    ctx.restore();

}

/* =========================
   ALGA
========================= */

function drawAlga(ctx, alga){

    ctx.save();

    ctx.strokeStyle = "#00ff88";

    ctx.lineWidth = 5;

    ctx.shadowBlur = 15;
    ctx.shadowColor = "#00ff88";

    ctx.beginPath();

    ctx.moveTo(alga.x, alga.y);

    ctx.quadraticCurveTo(
        alga.x + 20,
        alga.y + 30,
        alga.x,
        alga.y + 60
    );

    ctx.stroke();

    ctx.restore();

}
