var canvas; 
var vancasContext; 
var ballX = 50;  
var ballSpeedX = 15; 

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
}


function moveEverything(){
    ballX = ballX + ballSpeedX;

    if(ballX >= canvas.width) {
        ballSpeedX = -ballSpeedX;
    }
    if(ballX < 0) {
        ballSpeedX = -ballSpeedX;
    }
   
}

function drawEverything(){
    //next line blanks out the screen with black
    colorRect(0,0,canvas.width, canvas.height, 'black');
    //this is left player paddle
    colorRect(0, 210, 10,100, 'white');
    //this is the red ball
    colorRect(ballX, 100, 10, 10, 'red');
}

function colorRect(leftX, topY, width, height, drawColor){
    canvasContext.fillStyle= drawColor;
    canvasContext.fillRect(leftX, topY, width, height);
}
