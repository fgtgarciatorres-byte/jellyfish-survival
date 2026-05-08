import { GAME } from "./state.js";

export const player = {
    x: GAME.width / 2,
    y: GAME.height / 2,

    radius: 30,

    speed: 0.1
};

export function updatePlayer() {

    player.x += (GAME.mouseX - player.x) * player.speed;
    player.y += (GAME.mouseY - player.y) * player.speed;

}

export function drawPlayer(ctx) {

    ctx.save();

    // brillo
    ctx.shadowBlur = 20;
    ctx.shadowColor = "#ff00ff";

    // cuerpo
    ctx.beginPath();
    ctx.arc(
        player.x,
        player.y,
        player.radius,
        Math.PI,
        0
    );

    ctx.fillStyle = "#ff66ff";
    ctx.fill();

    // tentáculos
    ctx.strokeStyle = "#ffccff";
    ctx.lineWidth = 3;

    for(let i = -20; i <= 20; i += 10){

        ctx.beginPath();

        ctx.moveTo(
            player.x + i,
            player.y
        );

        ctx.quadraticCurveTo(
            player.x + i + Math.sin(Date.now() * 0.005 + i) * 10,
            player.y + 30,
            player.x + i,
            player.y + 60
        );

        ctx.stroke();
    }

    ctx.restore();
}
