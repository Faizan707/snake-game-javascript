let canvas = document.getElementById("game");
let ctx =canvas.getContext('2d');



class SnakePart{
    constructor(x,y){
        this.x =x;
        this.y=y;
    }
}

let speed=7;
let tileCount= 20;
let tileSize=canvas.width/tileCount-2;
let headX=10;
let headY=10;
let yvelocity=0;
let xvelocity=0;
let foodx=5;
let foody=5;

let snakeParts = [];
let tailLength=2;
let score = 0;

// gameloop
function drawGame(){
    changeSnakePosition()
    let result =  isGameOver();
    if(result){
        return;
    }


    clearScreen();
    checkFoodcollisions();

    drawSnake();
    drawFood();
    drawScore()
    setTimeout(drawGame,1000/speed);
}

function isGameOver(){
    let gameOver = false;
    
    if(xvelocity===0 && yvelocity===0){
        return false;
    }


    if(headX<0){
        gameOver=true
    }
    if(headX>=tileCount){
        gameOver=true
    }
    else if(headY<0){
        gameOver=true
    }
     else if(headY>=tileCount){
        gameOver=true
     }
     for(let i = 0 ;i<snakeParts.length;i++){
        let part= snakeParts[i]
        if(part.x === headX && part.y === headY){
            gameOver=true
        }
        break;
     }
    if(gameOver){
        ctx.fillStyle="yellow"
        ctx.font="50px  Verdana"
        ctx.fillText("Game Over", canvas.width/6.5,canvas.height/2)
    }
    return gameOver
}

function clearScreen(){
    ctx.fillStyle='black';
    ctx.fillRect(0,0,canvas.clientWidth,canvas.height);
}
function drawSnake(){
    ctx.fillStyle='green';
    ctx.fillRect(headX*tileCount,headY*tileCount,tileSize,tileSize)
    
    ctx.fillStyle='orange'
    for(let i = 0 ; i<snakeParts.length;i++){
        let part = snakeParts[i]
        ctx.fillRect(part.x * tileCount , part.y * tileCount ,tileSize,tileSize)

    }
    snakeParts.push(new SnakePart(headX,headY)) //put an item at the end of the list next to the end
    if(snakeParts.length>tailLength){
        snakeParts.shift(); // remove the further item from the snake parts if have more than tailsize 
    }
}

function drawFood(){
    ctx.fillStyle='yellow';
    ctx.fillRect(foodx * tileCount,foody * tileCount,tileSize,tileSize)
}

function drawScore(){
    ctx.fillStyle='yellow'
    ctx.font = "10px Verdana"
    ctx.fillText("Score : " + score, canvas.width-50,10)
}

function checkFoodcollisions(){
    if(foodx===headX && foody===headY){
        foodx= Math.floor(Math.random()* tileCount);
        foody=Math.floor(Math.random() * tileCount);
        tailLength++
        score++;
        speed++
    }

}

function changeSnakePosition(){
    
    headX=headX+xvelocity;
    headY=headY+yvelocity
}
document.body.addEventListener('keydown',keyDown);
function keyDown(event) {
    // up
    if (event.key === "ArrowUp") {
      if(yvelocity==1)
      return;
        yvelocity = -1;
      xvelocity = 0;
    }
    // down
    if (event.key === "ArrowDown") {
      if(yvelocity==-1)
      return
        yvelocity = 1;
      xvelocity = 0;
    }
    // left
    if (event.key === "ArrowLeft") {
        if(xvelocity==1)
        return
      yvelocity = 0;
      xvelocity = -1;
    }
    // right
    if (event.key === "ArrowRight") {
        if(xvelocity==-1)
        return
      yvelocity = 0;
      xvelocity = 1;
    }
  }
  
  


drawGame();
