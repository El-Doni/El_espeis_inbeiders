import { canvas } from "./canvas.js";
let playerImage = new Image();
export var sizePlayer = 1.68
playerImage.src = "./sprites/nave.gif"
export let playerTamano = {
    X: playerImage.width * sizePlayer,
    Y: playerImage.height * sizePlayer
}
export let playerPos = {
    X:900,
    Y: canvas.height - playerTamano.Y
}

export function dibujarPlayer(c) {
    c.drawImage(playerImage, playerPos.X, playerPos.Y, playerTamano.X, playerTamano.Y)
}