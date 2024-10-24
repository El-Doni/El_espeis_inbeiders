import { GIF } from "./gif.js"

let gifAlien = new GIF()
gifAlien.load("./sprites/alien.gif")
let scale = 1.80
export let alienTamano = {
    X : 64,
    Y : 64
}
export function dibujarAlien(c, posX, posY){
    c.drawImage(gifAlien.image, posX, posY)
}