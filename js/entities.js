
import { GAME } from "./state.js";
import {

    createExplosion

} from "./particles.js";
import {

    triggerShake,
    triggerFlash

} from "./effects.js";

/* =========================
   ARRAYS
========================= */

export const entities = [];
export const bullets = [];



/* =========================
   RANDOM TYPE
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

    // 3%
    if(random < 0.98){

        return "crab";

    }

    // 1%
    if(random < 0.99){

        return "shark";

    }

    // 1%
    return "mine";

}

/* =========================
   CREATE ENTITY
========================= */

export function createBubble(){

    const type = randomType();

    const entity = {

        type,

        x: Math.random() * GAME.width,

        y: -100,

        radius: 25,

        speed: 2 + Math.random() * 3,

        vx: 0,
        vy: 0,

        exploding: false,

        explosionRadius: 0,

        dead: false

    };

    /* =========================
       CRAB
    ========================= */

    if(type === "crab"){

        entity.y = GAME.height - 120;

        entity.x = -100;

        entity.vx = 4;

        entity.radius = 35;

    }

    /* =========================
       SHARK
    ========================= */

    if(type === "shark"){

        entity.y =
            100 +
            Math.random()
            * (GAME.height - 200);

        entity.radius = 50;

        entity.speed = 0;

        entity.vx =
            Math.random() < 0.5
            ? 4
            : -4;

        entity.x =
            entity.vx > 0
            ? -200
            : GAME.width + 200;

    }

    /* =========================
       MINE
    ========================= */

    if(type === "mine"){

        entity.radius = 35;

        entity.speed = 1.5;

    }

    entities.push(entity);

}



/* =========================
   UPDATE ENTITIES
========================= */

export function updateEntities(){

    for(let entity of entities){

        /* =========================
           SHARK AI
        ========================= */

        if(entity.type === "shark"){

            const dx =
                GAME.mouseX - entity.x;

            const dy =
                GAME.mouseY - entity.y;

            const angle =
                Math.atan2(dy, dx);

            entity.vx =
                Math.cos(angle) * 4;

            entity.vy =
                Math.sin(angle) * 4;

        }

        /* =========================
           MINE AI
        ========================= */

        if(entity.type === "mine"){

            const dx =
                GAME.mouseX - entity.x;

            const dy =
                GAME.mouseY - entity.y;

            const distance = Math.sqrt(
                dx * dx + dy * dy
            );

            // activar explosión
            if(
                distance < 140 &&
                !entity.exploding
            ){

                entity.exploding = true;

            }

            // expansión explosión
            if(entity.exploding){

                entity.explosionRadius += 8;

                // daño explosión
                if(
                    entity.explosionRadius < 120 &&
                    distance < entity.explosionRadius
                ){

                    GAME.lives -= 0.03;

                }

                // destruir mina
                if(entity.explosionRadius > 140){

                   createExplosion(

    entity.x,
    entity.y,

    "#ff2222"

); 
                    /* =========================
   MINE IMPACT
========================= */

triggerShake(30);

triggerFlash(
    "#ff4444",
    0.4
);
                   entity.dead = true;

                }

            }

        }

        /* =========================
           VECTORIAL MOVEMENT
        ========================= */

        entity.x += entity.vx;

        entity.y += entity.vy;

        /* =========================
           NORMAL FALL
        ========================= */

        if(
            !entity.bossProjectile &&
            entity.type !== "crab" &&
            entity.type !== "shark"
        ){

            entity.y += entity.speed;

        }

    }

    /* =========================
       CLEAN ENTITIES
    ========================= */

    for(let i = entities.length - 1; i >= 0; i--){

        const entity = entities[i];

        /* =========================
           DEAD
        ========================= */

        if(entity.dead){

            entities.splice(i,1);

            continue;

        }

        /* =========================
           NORMAL ENTITIES
        ========================= */

        if(
            entity.type !== "crab" &&
            entity.type !== "shark" &&
            entity.y > GAME.height + 150
        ){

            if(entity.type === "bubble"){

                GAME.score++;

            }

            entities.splice(i,1);

        }

        /* =========================
           CRABS / SHARKS
        ========================= */

        if(
            (
                entity.type === "crab"
                ||
                entity.type === "shark"
            )
            &&
            (
                entity.x < -300
                ||
                entity.x > GAME.width + 300
            )
        ){

            entities.splice(i,1);

        }

        /* =========================
           PROJECTILES
        ========================= */

        if(
            entity.bossProjectile &&
            (
                entity.x < -300 ||
                entity.x > GAME.width + 300 ||
                entity.y < -300 ||
                entity.y > GAME.height + 300
            )
        ){

            entities.splice(i,1);

        }

    }

}


/* =========================
   CREATE BULLET
========================= */

export function createBullet(x, y, angle = -Math.PI / 2){

    bullets.push({

        x,
        y,

        angle,

        speed: 12,

        radius: 6,

        damage: GAME.bulletDamage,

        life: 90

    });

}
/* =========================
   UPDATE BULLETS
========================= */

export function updateBullets(){

    for(let i = bullets.length - 1; i >= 0; i--){

        const bullet = bullets[i];

        bullet.x += Math.cos(bullet.angle) * bullet.speed;

        bullet.y += Math.sin(bullet.angle) * bullet.speed;

        bullet.life--;

        if(

            bullet.life <= 0 ||

            bullet.y < -50 ||

            bullet.x < -50 ||

            bullet.x > GAME.width + 50 ||

            bullet.y > GAME.height + 50

        ){

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

        if(entity.type === "shark"){

            drawShark(ctx, entity);

        }

        if(entity.type === "mine"){

            drawMine(ctx, entity);

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

    if(bubble.bossProjectile){

        ctx.fillStyle = "#ff4444";

        ctx.shadowBlur = 25;

        ctx.shadowColor = "#ff0000";

    }else{

        ctx.fillStyle =
            "rgba(173,216,230,0.25)";

        ctx.shadowBlur = 15;

        ctx.shadowColor = "#90e0ef";

    }

    ctx.beginPath();

    ctx.arc(
        bubble.x,
        bubble.y,
        bubble.radius,
        0,
        Math.PI * 2
    );

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

    ctx.moveTo(
        alga.x,
        alga.y
    );

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

    ctx.moveTo(
        diamond.x,
        diamond.y - 15
    );

    ctx.lineTo(
        diamond.x + 15,
        diamond.y
    );

    ctx.lineTo(
        diamond.x,
        diamond.y + 15
    );

    ctx.lineTo(
        diamond.x - 15,
        diamond.y
    );

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

/* =========================
   SHARK
========================= */

function drawShark(ctx, shark){

    ctx.save();

    ctx.translate(
        shark.x,
        shark.y
    );

    const angle =
        Math.atan2(
            shark.vy,
            shark.vx
        );

    ctx.rotate(angle);

    ctx.fillStyle = "#6c757d";

    ctx.shadowBlur = 20;

    ctx.shadowColor = "#adb5bd";

    /* BODY */

    ctx.beginPath();

    ctx.ellipse(
        0,
        0,
        70,
        35,
        0,
        0,
        Math.PI * 2
    );

    ctx.fill();

    /* TAIL */

    ctx.beginPath();

    ctx.moveTo(-60,0);

    ctx.lineTo(-100,-40);

    ctx.lineTo(-100,40);

    ctx.closePath();

    ctx.fill();

    /* FIN */

    ctx.beginPath();

    ctx.moveTo(-10,-20);

    ctx.lineTo(20,-70);

    ctx.lineTo(40,-20);

    ctx.closePath();

    ctx.fill();

    /* EYE */

    ctx.fillStyle = "white";

    ctx.beginPath();

    ctx.arc(
        40,
        -8,
        6,
        0,
        Math.PI * 2
    );

    ctx.fill();

    ctx.fillStyle = "black";

    ctx.beginPath();

    ctx.arc(
        42,
        -8,
        3,
        0,
        Math.PI * 2
    );

    ctx.fill();

    ctx.restore();

}

/* =========================
   MINE
========================= */

function drawMine(ctx, mine){

    ctx.save();

    /* EXPLOSION */

    if(mine.exploding){

        ctx.strokeStyle =
            "rgba(255,80,80,0.8)";

        ctx.lineWidth = 8;

        ctx.shadowBlur = 30;

        ctx.shadowColor = "#ff0000";

        ctx.beginPath();

        ctx.arc(
            mine.x,
            mine.y,
            mine.explosionRadius,
            0,
            Math.PI * 2
        );

        ctx.stroke();

    }

    /* BODY */

    ctx.fillStyle = "#444";

    ctx.shadowBlur = 20;

    ctx.shadowColor = "#ff0000";

    ctx.beginPath();

    ctx.arc(
        mine.x,
        mine.y,
        mine.radius,
        0,
        Math.PI * 2
    );

    ctx.fill();

    /* SPIKES */

    ctx.strokeStyle = "#999";

    ctx.lineWidth = 4;

    for(let i = 0; i < 8; i++){

        const angle =
            (Math.PI * 2 / 8) * i;

        const x1 =
            mine.x +
            Math.cos(angle) * 25;

        const y1 =
            mine.y +
            Math.sin(angle) * 25;

        const x2 =
            mine.x +
            Math.cos(angle) * 45;

        const y2 =
            mine.y +
            Math.sin(angle) * 45;

        ctx.beginPath();

        ctx.moveTo(x1,y1);

        ctx.lineTo(x2,y2);

        ctx.stroke();

    }

    ctx.restore();

}
