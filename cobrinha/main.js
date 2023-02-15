//   C = Cima
//   D = Direita
//   B = Baixo
//   E = Esquerda
// 
const direcoes = ['C','D','B','E'];

let tamanhoCobrinhaX = 10;
let tamanhoCobrinhaY = 10;

function calculaProximaPosicao(x,y,d){
    switch (d) {
        case 'C':
            y = y - 10;
            break;
    
        case 'B':
            y = y + 10;
            break;

        case 'D':
            x = x + 10;
            break;

        case 'E':
            x = x - 10;
            break;
            
        default:
            break;
    }

    let obj = {
        x:x,
        y:y
    };

    return obj;

}
function geraUmDoce (canvasGame) {
    let ctx = canvasGame.getContext("2d");
    ctx.fillStyle = '#2d56a7';
    let coordX= Math.floor(Math.random() * (80 - 1) + 1) * 10;
    let coordY = Math.floor(Math.random() * (50 - 1) + 1) * 10;
    ctx.fillRect((coordX),(coordY),tamanhoCobrinhaX,tamanhoCobrinhaY);
    return {
        x:coordX,
        y:coordY
    };
}

function detectaColisao(obj1,obj2) {
    if (obj1.x < obj2.x + tamanhoCobrinhaX &&
        obj1.x + tamanhoCobrinhaX > obj2.x &&
        obj1.y < obj2.y + tamanhoCobrinhaY &&
        obj1.y + tamanhoCobrinhaY > obj2.y) {
        return true
    }
    return false;
}
let canvasGame = document.getElementById("game");
let limiteX = canvasGame.width;
let limiteY = canvasGame.height;
let ctx = canvasGame.getContext("2d");

// velocidade
let v = 100;
//posisao inicial
let x = 400;
let y = 250;
let d = 'D';
// TAMANHO
let T = 1;
// COR DA COBRINHA
let cor = "#FF0000";
ctx.fillStyle = cor;
// ctx.fillRect(0,tamanhoCobrinhaX,tamanhoCobrinhaY);

let posicaoDoceGlobal = geraUmDoce(canvasGame);

document.onkeydown = function(e) {
    
    if (e.key == 'ArrowUp' || e.key == 'w') {
        d = 'C';
        // up arrow
    }
    else if ((e.key == 'ArrowDown' || e.key == 's')) {
        d = 'B';
        // down arrow
    }
    else if ((e.key == 'ArrowLeft' || e.key == 'a')) {
        d = 'E';
        // left arrow
    }
    else if (e.key == 'ArrowRight' || e.key == 'd') {
        d = 'D';
        // right arrow
    }
};

let gameId = setInterval(()=>{
    let proximaPosicao = calculaProximaPosicao(x,y,d)
    let posicaoAnterior = {};
    posicaoAnterior.x = x;
    posicaoAnterior.y = y;
    if (detectaColisao(proximaPosicao,posicaoDoceGlobal)) {
        T++;
        posicaoDoceGlobal = geraUmDoce(canvasGame);
    }
    x = proximaPosicao.x;
    y = proximaPosicao.y;

    if (x < 0 || x >= limiteX) {
        gameOver()
        console.log(x)
    }
    if (y< 0 || y >= limiteY) {
        console.log(y)
        gameOver()
    }
    
    ctx.fillStyle = cor;
    ctx.fillRect(x,y,tamanhoCobrinhaX,tamanhoCobrinhaY);
    ctx.clearRect(posicaoAnterior.x, posicaoAnterior.y, tamanhoCobrinhaX, tamanhoCobrinhaY)
    
}, v);
function gameOver() {
    clearTimeout(gameId);
    // alert('GAME OVER!!');
    location.reload();
    
}





