import { GAME } from "./state.js";

const scoreElement = document.getElementById("score");

const levelElement = document.getElementById("level");

export function updateUI(){

    scoreElement.textContent = GAME.score;

    levelElement.textContent = GAME.level;

}
