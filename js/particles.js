import { GAME } from "./state.js";

/* =========================
   PARTICLES
========================= */

export const particles = [];

/* =========================
   CREATE PARTICLES
========================= */

export function createParticles(
    x,
    y,
    color = "#90e0ef",
    amount = 12
){

    for(let i = 0; i < amount; i++){

        particles.push({

            x,
            y,

            vx:
                (Math.random() - 0.5)
                * 8,

            vy:
                (Math.random() - 0.5)
                * 8,

            radius:
                2 + Math.random() * 4,

            life:
                40 + Math.random() * 20,

            color

        });

    }

}

/* =========================
   EXPLOSION
========================= */

export function createExplosion(
    x,
    y,
    color = "#ff4444"
){

    createParticles(
        x,
        y,
        color,
        30
    );

}

/* =========================
   UPDATE PARTICLES
========================= */

export function updateParticles(){

    for(let particle of particles){

        particle.x += particle.vx;

        particle.y += particle.vy;

        particle.life--;

        /* =========================
           DRAG
        ========================= */

        particle.vx *= 0.98;

        particle.vy *= 0.98;

        /* =========================
           FLOAT
        ========================= */

        particle.vy += 0.02;

    }

    /* =========================
       CLEAN
    ========================= */

    for(
        let i = particles.length - 1;
        i >= 0;
        i--
    ){

        if(particles[i].life <= 0){

            particles.splice(i,1);

        }

    }

}

/* =========================
   DRAW PARTICLES
========================= */

export function drawParticles(ctx){

    for(let particle of particles){

        ctx.save();

        /* =========================
           ALPHA
        ========================= */

        ctx.globalAlpha =
            particle.life / 60;

        ctx.fillStyle =
            particle.color;

        ctx.shadowBlur = 20;

        ctx.shadowColor =
            particle.color;

        ctx.beginPath();

        ctx.arc(

            particle.x,
            particle.y,

            particle.radius,

            0,
            Math.PI * 2

        );

        ctx.fill();

        ctx.restore();

    }

}
