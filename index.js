
const gameboard = document.querySelector('#gameboard');
const context = gameboard.getContext('2d');
const scoretext = document.querySelector('#scoreval');

const height = gameboard.height
const width = gameboard.width

let foodx;
let foody;
let unit = 20;
let xspeed=20;
let yspeed=0;
let active=true;
let start = false;
let score = 0;
let speed = 300;

let snake =[
    {x:unit*3,y:0},
    {x:unit*2,y:0},
    {x:unit*1,y:0},
    {x:unit*0,y:0}
]

window.addEventListener('keydown',keyPress)

startgame();

function startgame(){
    context.fillStyle = 'black';
    context.fillRect(0,0,400,400);
    createfood();
    displayfood();
    drawsnake();
}

function createfood()
{
    foodx=Math.floor(Math.random()*width/unit)*unit;
    foody=Math.floor(Math.random()*height/unit)*unit;
}

function displayfood()
{
    context.fillStyle = 'red';
    context.fillRect(foodx,foody,unit,unit);
}

function drawsnake()
{
    context.fillStyle = 'aqua';
    snake.forEach((snakepart)=>{
        context.fillRect(snakepart.x,snakepart.y,unit,unit);
        context.strokeRect(snakepart.x,snakepart.y,unit,unit);
        
    })
}

function movesnake()
{
  const head = {x:snake[0].x+xspeed,y:snake[0].y+yspeed};
  snake.unshift(head);
  if(snake[0].x==foodx && snake[0].y==foody)
  {
    createfood();
    score += 1;
    scoretext.textContent = score;
    checkgamespeed();
  }
  else
  {
    snake.pop();
  }
}

function clearboard()
{
    context.fillStyle = 'black';
    context.fillRect(0,0,400,400);
}

function nexttick()
{
    if(active)
    {
        setTimeout(()=>{
            clearboard();
            displayfood();
            movesnake();
            drawsnake();
            checkgameover();
            nexttick();
        },speed)
    }
    else
    {
        clearboard();
        context.font = "bold 50px serif";
        context.fillStyle = "white";
        context.textAlign = "center";
        context.fillText("Game Over!!!",width/2,height/2)
    }
}

function keyPress(event)
{
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN= 40;

    if(!start)
    {
        start = true;
        nexttick();
    }
    
    switch(true)
    {
        case(event.keyCode == LEFT && xspeed!=unit):
            xspeed = -unit;
            yspeed = 0;
            break;
        case(event.keyCode == RIGHT && xspeed!=-unit):
            xspeed = unit;
            yspeed = 0;
            break;
        case(event.keyCode == UP && yspeed!=unit):
            xspeed = 0;
            yspeed = -unit;
            break;
        case(event.keyCode == DOWN && yspeed!=-unit):
            xspeed = 0;
            yspeed = unit;
            break;
    }
}

function checkgameover()
{
   switch(true)
   {
    case(snake[0].x<0):
    case(width<=snake[0].x):
    case(snake[0].y<0):
    case(height<=snake[0].y):
        active = false;
        break;
   }
}

function checkgamespeed()
{
    if(score%5 == 0)
    {
        speed-=50;
    }
}


