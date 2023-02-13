//   C = Cima
//   D = Direita
//   B = Baixo
//   E = Esquerda
// 
const direcoes = ['C','D','B','E'];


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
let tamanhoCobrinhaX = 10;
let tamanhoCobrinhaY = 10;
let canvasGame = document.getElementById("game");
let limiteX = canvasGame.width;
let limiteY = canvasGame.height;
let ctx = canvasGame.getContext("2d");

let v = 100;

let x = 400;
let y = 250;
let d = 'D';
let T = 1;
let cor = "#FF0000";
ctx.fillStyle = cor;
// ctx.fillRect(0,tamanhoCobrinhaX,tamanhoCobrinhaY);

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
    
    ctx.fillRect(x,y,tamanhoCobrinhaX,tamanhoCobrinhaY);
    ctx.clearRect(posicaoAnterior.x, posicaoAnterior.y, tamanhoCobrinhaX, tamanhoCobrinhaY)
    
}, v);
function gameOver() {
    clearTimeout(gameId);
    alert('GAME OVER!!');
    location.reload();
    
}





