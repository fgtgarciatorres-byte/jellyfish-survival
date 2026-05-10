import { GAME } from "./state.js";

import { player } from "./player.js";

import {
    entities,
    bullets
} from "./entities.js";

import {
    createParticles,
    createExplosion
} from "./particles.js";

import {
    triggerShake,
    triggerFlash
} from "./effects.js";

/* =========================
   COLLISIONS
========================= */

export function checkCollisions(){

    /* =========================
       PLAYER VS ENTITIES
    ========================= */

    for(let i = entities.length - 1; i >= 0; i--){

        const entity = entities[i];

        const dx = player.x - entity.x;
        const dy = player.y - entity.y;

        const distance = Math.sqrt(
            dx * dx + dy * dy
        );

        if(
            distance <
            player.radius + entity.radius
        ){

            /* =========================
               REMOVE ENTITY
            ========================= */

            entities.splice(i,1);

            /* =========================
               BUBBLE DAMAGE
            ========================= */

            if(entity.type === "bubble"){

                if(!GAME.shield){

                    GAME.lives--;

                    triggerShake(10);

                    triggerFlash(
                        "#ff0000",
                        0.15
                    );

                }

            }

            /* =========================
               SHARK DAMAGE
            ========================= */

            if(entity.type === "shark"){

                if(!GAME.shield){

                    GAME.lives -= 2;

                }

                createExplosion(

                    entity.x,
                    entity.y,

                    "#ff4444"

                );

                triggerShake(18);

                triggerFlash(

                    "#ff0000",

                    0.25

                );

            }

            /* =========================
               MINE DAMAGE
            ========================= */

            if(entity.type === "mine"){

                if(!GAME.shield){

                    GAME.lives -= 2;

                }

                createExplosion(

                    entity.x,
                    entity.y,

                    "#ff2200"

                );

                triggerShake(30);

                triggerFlash(

                    "#ff3300",

                    0.4

                );

            }

            /* =========================
               STAR
            ========================= */

            if(entity.type === "star"){

                GAME.score += 10;

            }

            /* =========================
               ALGA
            ========================= */

            if(entity.type === "alga"){

                GAME.energy += 20;

                if(
                    GAME.energy >
                    GAME.maxEnergy
                ){

                    GAME.energy =
                        GAME.maxEnergy;

                }

            }

            /* =========================
               DIAMOND
            ========================= */

            if(entity.type === "diamond"){

                GAME.diamonds++;

                if(GAME.diamonds >= 10){

                    GAME.diamonds = 0;

                    GAME.trophies++;

                    GAME.maxLives++;

                    GAME.lives =
                        GAME.maxLives;

                }

            }

            /* =========================
               SHIELD
            ========================= */

            if(entity.type === "shield"){

                GAME.shield = true;

                GAME.shieldTimer = 300;

            }

            /* =========================
               CRAB
            ========================= */

            if(entity.type === "crab"){

                GAME.lives++;

                if(
                    GAME.lives >
                    GAME.maxLives
                ){

                    GAME.lives =
                        GAME.maxLives;

                }

            }

        }

    }

    /* =========================
       BULLETS VS BUBBLES
    ========================= */

    for(let b = bullets.length - 1; b >= 0; b--){

        const bullet = bullets[b];

        for(let e = entities.length - 1; e >= 0; e--){

            const entity = entities[e];

            if(entity.type !== "bubble"){

                continue;

            }

            const dx =
                bullet.x - entity.x;

            const dy =
                bullet.y - entity.y;

            const distance = Math.sqrt(

                dx * dx +
                dy * dy

            );

            if(
                distance <
                bullet.radius + entity.radius
            ){

                /* =========================
                   REMOVE
                ========================= */

                bullets.splice(b,1);

                entities.splice(e,1);

                /* =========================
                   PARTICLES
                ========================= */

                createParticles(

                    entity.x,
                    entity.y,

                    "#90e0ef",

                    18

                );

                /* =========================
                   IMPACT
                ========================= */

                triggerShake(2);

                /* =========================
                   SCORE
                ========================= */

                GAME.score += 5;

                /* =========================
                   DIAMOND DROP
                ========================= */

                if(Math.random() < 0.4){

                    entities.push({

                        type: "diamond",

                        x: entity.x,

                        y: entity.y,

                        radius: 12,

                        speed: 2

                    });

                }

                break;

            }

        }

    }

    /* =========================
       SHIELD TIMER
    ========================= */

    if(GAME.shield){

        GAME.shieldTimer--;

        if(GAME.shieldTimer <= 0){

            GAME.shield = false;

        }

    }

    /* =========================
       GAME OVER
    ========================= */

    if(GAME.lives <= 0){

        GAME.running = false;

        alert("GAME OVER");

    }

}
