var canvas; 
var vancasContext; 
var ballX = 50;  
var ballY = 50;
var ballSpeedX = 13; 
var ballSpeedY = 10;

var player1Score = 0; 
var player2Score = 0;
const WINNING_SCORE = 8;

var showingWinScreen = false;

var paddle1Y = 250;
var paddle2Y = 250;
const PADDLE_THICKNESS =12;
const PADDLE_HEIGHT =90;


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

function handleMouseClick(event){
    if(showingWinScreen){
        player1Score = 0; 
        player2Score =0;
        showingWinScreen = false;
    }
}

window.onload =function() {
    console.log("hello world!");
    canvas = document.getElementById('gameCanvas');
    canvasContext=canvas.getContext('2d');

    //adding font
    canvasContext.font = '38pt Arial';
    
    
    // variable for inside the function not needed as a global variable
    var framesPerSecond =30; 

    //every 1 second, it's going to add 20, display and redraw
    setInterval(function() {
            moveEverything(); 
            drawEverything(); 
        }, 1000/framesPerSecond);

    canvas.addEventListener('mousedown', handleMouseClick); 

    canvas.addEventListener('mousemove',
        function(event) {
            var mousePos = calculateMousePos(event); 
            paddle1Y = mousePos.y-(PADDLE_HEIGHT/2); 
        });
}

//reset ball means it centers it on the screen
function ballReset(){
    if(player2Score >= WINNING_SCORE || 
       player1Score >= WINNING_SCORE) {
            showingWinScreen = true;
       }

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
    if(showingWinScreen) {
        return; //bail out of function if works
    }
    
    computerMovement();

    ballX = ballX + ballSpeedX;
    ballY = ballY + ballSpeedY;
    if(ballX < 0) {
        //ballSpeedX = -ballSpeedX;
        if(ballY > paddle1Y && 
           ballY < paddle1Y + PADDLE_HEIGHT) {
               ballSpeedX = -ballSpeedX; 
               
               var deltaY = ballY
                          - (paddle1Y+PADDLE_HEIGHT/2);
                ballSpeedY = deltaY * 0.35; 
           } else {
                player2Score++; //must be BEFORE ballRESET();
                ballReset();
              
           }

    }
    if(ballX > canvas.width) {
        if(ballY > paddle2Y && 
           ballY < paddle2Y + PADDLE_HEIGHT) {
               ballSpeedX = -ballSpeedX; 
               var deltaY = ballY
                            - (paddle2Y+PADDLE_HEIGHT/2);
                            ballSpeedY = deltaY * 0.35; 
           } else {
                player1Score++; //must be BEFORE ballRESET();
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

//jump at intervals of 40 
function drawNet(){
    for (var i = 0; i <canvas.height; i +=40){
        colorRect(canvas.width/2-1,i,2,20, 'pink');
    }
}

function drawEverything(){
    //next line blanks out the screen with black
    colorRect(0,0,canvas.width, canvas.height, 'gray');

    if(showingWinScreen) {
        canvasContext.fillStyle = 'white';
        

        if(player1Score >= WINNING_SCORE) {
            canvasContext.fillText("You Won!", 300, 200);
        }else if (player2Score >= WINNING_SCORE) {
            canvasContext.fillText("Computer Won!", 240, 200);
        }    
        canvasContext.fillText("Click Here to Start Over", 150, 500);
        return; //bail out of function if works
    }

    drawNet();

    //this is left player paddle
    colorRect(0, paddle1Y, PADDLE_THICKNESS,PADDLE_HEIGHT, 'red');

    //this is right computer paddle
    colorRect(canvas.width-PADDLE_THICKNESS, paddle2Y, PADDLE_THICKNESS,PADDLE_HEIGHT, '#26EBF1');
    
    //this is the ball
    // colorRect(ballX, 100, 10, 10, 'red');
    colorCircle(ballX, ballY, 10, 'white');

    canvasContext.fillText(player1Score, 100, 100);
    canvasContext.fillText(player2Score, canvas.width-100, 100);
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