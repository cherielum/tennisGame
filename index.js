var canvas; 
var vancasContext; 
var ballX = 50;  
var ballY = 50;
var ballSpeedX = 10; 
var ballSpeedY = 4;

var paddle1Y = 250;
var paddle2Y = 250;
const PADDLE_THICKNESS =10;
const PADDLE_HEIGHT =100;

//function for mouse
function calculateMousePos(event) {
    var rect = canvas.getBoundingClientRect(); 
    var root = document.documentElement; 
    var mouseX = event.clientX -rect.left - root.scrollLeft; 
    var mouseY = event.clientY -rect.top - root.scrollTop;
    return {
        x:mouseX, 
        y:mouseY
    } 
}


window.onload =function() {
    console.log("hello world!");
    canvas = document.getElementById('gameCanvas');
    canvasContext=canvas.getContext('2d');
    
    // variable for inside the function not needed as a global variable
    var framesPerSecond =30; 

    //every 1 second, it's going to add 20, display and redraw
    setInterval(function() {
            moveEverything(); 
            drawEverything(); 
        }, 1000/framesPerSecond);

    canvas.addEventListener('mousemove',
        function(event) {
            var mousePos = calculateMousePos(event); 
            paddle1Y = mousePos.y-(PADDLE_HEIGHT/2); 
        });
}

//reset ball means it centers it on the screen
function ballReset(){
      //put ball in opposite direction
      ballSpeedX = -ballSpeedX;
    
    ballX = canvas.width/2; 
    ballY = canvas.height/2;
}

function computerMovement(){
    var paddle2YCenter = paddle2Y +(PADDLE_HEIGHT/2);
    if (paddle2Y < ballY-35)  {
        paddle2Y +=6; //same as paddle2Y += paddle2Y + 6
    } else if (paddle2YCenter > ballY +35){
        paddle2Y -=6; 
    }
}


function moveEverything(){
    computerMovement();

    ballX = ballX + ballSpeedX;
    ballY = ballY + ballSpeedY;
    if(ballX < 0) {
        //ballSpeedX = -ballSpeedX;
        if(ballY > paddle1Y && 
           ballY < paddle1Y + PADDLE_HEIGHT) {
               ballSpeedX = -ballSpeedX; 
           } else {
                ballReset();
           }

    }
    if(ballX > canvas.width) {
        if(ballY > paddle2Y && 
           ballY < paddle2Y + PADDLE_HEIGHT) {
               ballSpeedX = -ballSpeedX; 
           } else {
                ballReset();
           }
    }
    if(ballY < 0) {
        ballSpeedY = -ballSpeedY;
    }
    if(ballY >= canvas.height) {
        ballSpeedY = -ballSpeedY;
    }
}

function drawEverything(){
    //next line blanks out the screen with black
    colorRect(0,0,canvas.width, canvas.height, 'black');
    //this is left player paddle
    colorRect(0, paddle1Y, PADDLE_THICKNESS,PADDLE_HEIGHT, 'white');

    //this is right computer paddle
    colorRect(canvas.width-PADDLE_THICKNESS, paddle2Y, 10,PADDLE_HEIGHT, 'white');
    
    //this is the ball
    // colorRect(ballX, 100, 10, 10, 'red');
    colorCircle(ballX, ballY, 10, 'white');
}

function colorCircle(centerX, centerY, radius, drawColor ){
    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath(); 
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
    canvasContext.fill(); 
}

function colorRect(leftX, topY, width, height, drawColor){
    canvasContext.fillStyle= drawColor;
    canvasContext.fillRect(leftX, topY, width, height);
}