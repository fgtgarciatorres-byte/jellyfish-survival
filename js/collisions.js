import { GAME } from "./state.js";

import { player } from "./player.js";

import { entities } from "./entities.js";

/* =========================
   COLISIONES
========================= */

export function checkCollisions(){

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

            // eliminar entidad
entities.splice(i,1);

/* =========================
   EFECTOS SEGÚN TIPO
========================= */

if(entity.type === "bubble"){

    GAME.lives--;

}

if(entity.type === "star"){

    GAME.score += 10;

}

if(entity.type === "alga"){

    GAME.energy += 20;

    if(GAME.energy > GAME.maxEnergy){

        GAME.energy = GAME.maxEnergy;

    }

}
            // game over
            if(GAME.lives <= 0){

                GAME.running = false;

                alert("GAME OVER");

            }

        }

    }

}
