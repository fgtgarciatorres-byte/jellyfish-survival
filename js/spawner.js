import { createBubble } from "./entities.js";

/* =========================
   SPAWN LOOP
========================= */

export function startSpawner(){

    setInterval(()=>{

        createBubble();

    }, 700);

}
