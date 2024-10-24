import { botonPlay, playMusic } from "./scripts/audio.js";
import { dibujarPlayer, playerPos, playerTamano, sizePlayer} from "./scripts/player.js"
import { alienTamano, dibujarAlien } from "./scripts/alien.js";
import { c, canvas } from "./scripts/canvas.js";
let cartelVictory = document.querySelector(".victory")
let cartelGameOver = document.querySelector(".gameOver")
let posDisAlien = []
let dxAlien = 2
let seMueveDerecha = false
let seMueveIzq = false
let ultimoDisparo = 0
let ultimoDisparoAlien = 0
botonPlay.addEventListener("click", playMusic)
let disparo = false
let minTiempo = 240
let maxDiley = 600
let minDiley = 300
//lista
let posDisparoS = []
let posAlienS = []
let vida = 3
let spanVida = document.querySelector(".vida")
let puntos = 0
let spanPuntos = document.querySelector(".puntos")
let btnPlay = document.querySelectorAll(".Jugar")
let id

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
for(let i = 0; btnPlay.length > i; i++ ){
    
    btnPlay[i].addEventListener("click", ()=>{
        document.querySelector(".menu").classList.add("invisible")
        cartelVictory.classList.add("invisible")
        cartelGameOver.classList.add("invisible")
        id = setInterval(animacion, 5)
        juegoIniciado()
    })
    
}

function juegoIniciado(){
    posAlienS = []
    for (let i = 0; 6 > i; i++) {
        posAlienS.push({X : 580 + (100 + 10) * i , Y : 40})
    }
    vida = 3
    puntos = 0
    spanVida.innerHTML = "vida: " + vida
}

function teclaPresionada(e) {
    if (e.keyCode == 32) {
        disparo = true
    }
    if (e.keyCode == 39) {
        seMueveDerecha = true
    }
    if (e.keyCode == 37) {
        seMueveIzq = true
    }
}

function teclaSuelta(e) {
    if (e.keyCode == 32) {
        disparo = false
    }
    if (e.keyCode == 39) {
        seMueveDerecha = false
    }
    if (e.keyCode == 37) {
        seMueveIzq = false
    }
}

document.addEventListener("keydown", teclaPresionada, false);
document.addEventListener("keyup", teclaSuelta, false);

function disparar(posX, posY) {
    c.beginPath()
    c.rect(posX, posY, 6, 40);
    c.fillStyle = "#ffff";
    c.fill();
    c.closePath();
}

function disparoIsIn(disparo, hit, size){
    if(hit.X < disparo.X && disparo.X < hit.X + size.X){
        if(hit.Y > disparo.Y && disparo.Y > hit.Y - size.Y){
            return true
        }
    }
    return false
}

function hitAlien (DisparoS, AlienS){
    for (let i = 0; i < AlienS.length; i++){
        for (let j = 0; j < DisparoS.length; j++){
            if (disparoIsIn(DisparoS[j], AlienS[i], alienTamano)){
                AlienS.splice(i, 1)
                DisparoS.splice(j, 1)
                puntos++
                spanPuntos.innerHTML = "puntos: " + puntos
                if (AlienS.length == 0){
                    win()
                }
            }
        }
    }
}

function gameOver (){
        cartelGameOver.classList.remove("invisible")
        window.clearInterval(id)
}

function win (){
    cartelVictory.classList.remove("invisible")
    window.clearInterval(id)
}

function hitPlayer (DisparoS, Player){
    for (let j = 0; j < DisparoS.length; j++){
        if (disparoIsIn(DisparoS[j], Player, playerTamano)){
            DisparoS.splice(j, 1)
            vida--
            spanVida.innerHTML = "vida: " + vida
            if (vida == 0){
                gameOver()
            }
        }
    }
}


//movimiento de jugador
function animacion() {
    c.clearRect(0, 0, canvas.width, canvas.height)
    dibujarPlayer(c)
    if (disparo && Date.now() - ultimoDisparo > minTiempo) {
        let posDisparo = {
            X : playerPos.X + 51,
            Y : playerPos.Y - 40
        }
        disparar(playerPos.X + 51, playerPos.Y - 40)
        posDisparoS.push(posDisparo)
        ultimoDisparo = Date.now()
    }
    if (seMueveDerecha && playerPos.X < canvas.width - playerTamano.X) {
        playerPos.X += 2
    }
    if (seMueveIzq && playerPos.X > 0) {
        playerPos.X -= 3
    }
    for (let i = 0; posDisparoS.length > i; i++) {
        posDisparoS[i].Y -= 5
        disparar(posDisparoS[i].X, posDisparoS[i].Y)
    }
    for (let i = 0; posAlienS.length > i; i++) {
        if (posAlienS[i].X > canvas.width * 0.96){
            dxAlien = -2
        }
        else if (5 > posAlienS[i].X){
            dxAlien = 2
        }
        posAlienS[i].X += dxAlien
        dibujarAlien (c, posAlienS[i].X, posAlienS[i].Y)
        if (Date.now() - ultimoDisparoAlien > getRandomArbitrary(minDiley, maxDiley)){
            let randomAlien = getRandomInt(posAlienS.length)
            let posDisparoAlien = {
                X : posAlienS[randomAlien].X + 26,
                Y : posAlienS[randomAlien].Y + 64
            }
            disparar(posDisparoAlien.X, posDisparoAlien.Y)
            posDisAlien.push(posDisparoAlien)
            ultimoDisparoAlien = Date.now()}

    }
    posDisparoS = posDisparoS.filter(disparo => disparo.Y > 0);
    
    hitAlien (posDisparoS, posAlienS)
    hitPlayer(posDisAlien,playerPos)
    for (let i = 0; posDisAlien.length > i; i++) {
        posDisAlien[i].Y += 5
        disparar(posDisAlien[i].X, posDisAlien[i].Y)
    }
}