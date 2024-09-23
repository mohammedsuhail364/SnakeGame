const gameboard=document.getElementById('gameboard')
const context=gameboard.getContext('2d')
const width=gameboard.width;
const height=gameboard.height;
const unit=25;
let foodx;
let foody;
let xvel=25;
let yvel=0;
let score=0; 
let snake=[
    {x:unit*3,y:0},
    {x:unit*2,y:0},
    {x:unit,y:0},
    {x:0,y:0}
]
let active=true;
let started=false;
const scoretext=document.getElementById('scoreval')
window.addEventListener('keydown',keypress)
startgame();
function startgame()
{
    context.fillStyle ='black'
    context.fillRect(0,0,width,height)
    createfood();
    displayfood();
    drawsnake();
    // nexttick();
}
function createfood()
{
    foodx=Math.floor(Math.random()*width/25)*25
    foody=Math.floor(Math.random()*height/25)*25
}
function displayfood()
{
    context.fillStyle='red';
    context.fillRect(foodx,foody,unit,unit)
}
function drawsnake()
{
    context.fillStyle='aqua';
    context.strokeStyle='black'
    snake.forEach(snakepart=>
    {
        context.fillRect(snakepart.x,snakepart.y,unit,unit)
        context.strokeRect(snakepart.x,snakepart.y,unit,unit)
    })
}
function movesnake()
{
    const head={x:snake[0].x+xvel,y:snake[0].y+yvel}
    snake.unshift(head)
    if(snake[0].x==foodx && snake[0].y==foody)
    {
        score+=1
        scoretext.textContent=score
        createfood();
    }
    else
        snake.pop()
}
function clearboard()
{
    context.fillStyle ='black'
    context.fillRect(0,0,width,height)
}
function nexttick()
{
    if(active)
    {
        setTimeout(()=>
        {
            clearboard();
            displayfood();
            movesnake();
            drawsnake();
            checkgameover();
            nexttick();
        },200)
    }
    else
    {
        clearboard();
        context.font='bold 50px serif';
        context.fillStyle='white';
        context.textAlign='center';
        context.fillText("Game Over!!",width/2,height/2)
    }
}
function keypress(event)
{
    if (!started)
    {
        started=true;
        nexttick();
    }
    const left=37;
    const up=38;
    const right=39;
    const down=40;
    switch (true) {
        case (event.keyCode==left && xvel!=unit):
            xvel=-unit;
            yvel=0;
            break;
        case(event.keyCode==right && xvel!=-unit):
            xvel=unit;
            yvel=0
            break;
        case(event.keyCode==up && yvel!=unit):
            xvel=0;
            yvel=-unit;
            break;
        case(event.keyCode==down && yvel!=-unit):
            xvel=0;
            yvel=unit;
            break;
    }

}

function checkgameover()
{
    switch(true)
    {
        case(snake[0].x<0):
        case(snake[0].x>=width):
        case(snake[0].y<0):
        case(snake[0].y>=height):
            active=false;
            break;

    }
}