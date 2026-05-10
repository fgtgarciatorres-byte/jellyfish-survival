import { GAME } from "./state.js";

/* =========================
   ARRAYS
========================= */

export const entities = [];

export const bullets = [];

/* =========================
   RANDOM ENTITY TYPE
========================= */

function randomType(){

    const random = Math.random();

    // 55%
    if(random < 0.55){

        return "bubble";

    }

    // 15%
    if(random < 0.70){

        return "star";

    }

    // 15%
    if(random < 0.85){

        return "alga";

    }

    // 10%
    if(random < 0.95){

        return "shield";

    }

    // 5%
    return "crab";

}

/* =========================
   CREATE ENTITY
========================= */

export function createBubble(){

    const type = randomType();

    let entity = {

        type,

        x: Math.random() * GAME.width,

        y: -50,

        radius: 25,

        speed: 2 + Math.random() * 3

    };

    /* =========================
       CRAB SPECIAL
    ========================= */

    if(type === "crab"){

        entity.y = GAME.height - 100;

        entity.x = -100;

        entity.vx = 4;

        entity.radius = 35;
    }

    entities.push(entity);

}

/* =========================
   CREATE BULLET
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

        /* =========================
           CRAB MOVEMENT
        ========================= */

        if(entity.type === "crab"){

            entity.x += entity.vx;

        }else{

            entity.y += entity.speed;

        }

    }

    /* =========================
       CLEAN ENTITIES
    ========================= */

    for(let i = entities.length - 1; i >= 0; i--){

        const entity = entities[i];

        // vertical
        if(
            entity.type !== "crab" &&
            entity.y > GAME.height + 100
        ){

            if(entity.type === "bubble"){

                GAME.score++;

            }

            entities.splice(i,1);

        }

        // crab lateral
        if(
            entity.type === "crab" &&
            entity.x > GAME.width + 100
        ){

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

        if(entity.type === "diamond"){

            drawDiamond(ctx, entity);

        }

        if(entity.type === "shield"){

            drawShield(ctx, entity);

        }

        if(entity.type === "crab"){

            drawCrab(ctx, entity);

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

        ctx.shadowBlur = 20;
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
   BUBBLE
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
        star.radius * 0.6,
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

    ctx.lineWidth = 6;

    ctx.shadowBlur = 20;
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

/* =========================
   DIAMOND
========================= */

function drawDiamond(ctx, diamond){

    ctx.save();

    ctx.fillStyle = "#00ffff";

    ctx.shadowBlur = 20;
    ctx.shadowColor = "#00ffff";

    ctx.beginPath();

    ctx.moveTo(diamond.x, diamond.y - 15);

    ctx.lineTo(diamond.x + 15, diamond.y);

    ctx.lineTo(diamond.x, diamond.y + 15);

    ctx.lineTo(diamond.x - 15, diamond.y);

    ctx.closePath();

    ctx.fill();

    ctx.restore();

}

/* =========================
   SHIELD
========================= */

function drawShield(ctx, shield){

    ctx.save();

    ctx.strokeStyle = "#0088ff";

    ctx.lineWidth = 5;

    ctx.shadowBlur = 20;
    ctx.shadowColor = "#0088ff";

    ctx.beginPath();

    ctx.arc(
        shield.x,
        shield.y,
        shield.radius,
        0,
        Math.PI * 2
    );

    ctx.stroke();

    ctx.restore();

}

/* =========================
   CRAB
========================= */

function drawCrab(ctx, crab){

    ctx.save();

    ctx.fillStyle = "#ff3300";

    ctx.shadowBlur = 20;
    ctx.shadowColor = "#ff3300";

    ctx.beginPath();

    ctx.arc(
        crab.x,
        crab.y,
        crab.radius,
        0,
        Math.PI * 2
    );

    ctx.fill();

    ctx.restore();

}
