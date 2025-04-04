/*created by prashant shukla */
//and Anchit Sinha
//or Anchibunny
//who is a bunny

noseX = '';
noseY = '';
rightWristScore = '';
game_status = '';

var paddle2 =10,paddle1=10;

var paddle1X = 10,paddle1Height = 110;
var paddle2Y = 685,paddle2Height = 70;

var score1 = 0, score2 =0;
var paddle1Y;

var  playerscore =0;
var audio1;
var pcscore =0;
//ball x and y and speedx speed y and radius
var ball = {
    x:350/2,
    y:480/2,
    r:20,
    dx:3,
    dy:3
}

function preload() {
  bounce = loadSound('ball_touch_paddel.wav');
  miss = loadSound('missed.wav');
}

function setup(){
  var canvas =  createCanvas(700,600);
  canvas.parent('canvas');
  video = createCapture(VIDEO);
  video.size(700, 600);
  video.hide();

  poseNet = ml5.poseNet(video, modelLoaded)
  poseNet.on('pose', gotPoses);
}

function gotPoses(results) {
  console.log(results);
  if (results.length > 0) {
    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    rightWristScore = results[0].pose.keypoints[10].score;
  }
  console.log('rightWristX is ' + rightWristX);
  console.log('rightWristY is ' + rightWristY);
  console.log('rightWristScore is ' + rightWristScore);
}

function modelLoaded() {
  console.log('Madeĺ zahružana');
}

function startGame() {
  game_status = 'start';
  document.getElementById('status').innerHTML = 'Game is Loaded';
}

function draw(){
 background(0); 
 image(video, 0, 0, 700, 600);

 if (rightWristScore >= 0.1 && game_status == 'start') {
  fill('#abc123');
  stroke('#a1b2c3');
  circle(rightWristX, rightWristY, 20);

 }

 fill("black");
 stroke("black");
 rect(680,0,20,700);

 fill("black");
 stroke("black");
 rect(0,0,20,700);
 
   //funtion paddleInCanvas call 
   paddleInCanvas();
 
   //left paddle
   fill(250,0,0);
    stroke(0,0,250);
    strokeWeight(0.5);
   paddle1Y = noseY; 
   rect(paddle1X,paddle1Y,paddle1,paddle1Height,100);
   
   
    //pc computer paddle
    fill("#FFA500");
    stroke("#FFA500");
   var paddle2y =ball.y-paddle2Height/2;  rect(paddle2Y,paddle2y,paddle2,paddle2Height,100);
    
    //function midline call
    midline();
    
    //funtion drawScore call 
   drawScore();
   
   //function models call  
   models();
   
   //function move call which in very important
    move();
}



//function reset when ball does notcame in the contact of padde
function reset(){
   ball.x = width/2+100,
   ball.y = height/2+100;
   ball.dx=3;
   ball.dy =3;
   
}


//function midline draw a line in center
function midline(){
    for(i=0;i<480;i+=10) {
    var y = 0;
    fill("white");
    stroke(0);
    rect(width/2,y+i,10,480);
    }
}


//function drawScore show scores
function drawScore(){
    textAlign(CENTER);
    textSize(20);
    fill("white");
    stroke(250,0,0)
    text("Player:",100,50)
    text(playerscore,140,50);
    text("Computer:",500,50)
    text(pcscore,555,50)
}


//very important function of this game
function move(){
   fill(50,350,0);
   stroke(255,0,0);
   strokeWeight(0.5);
   ellipse(ball.x,ball.y,ball.r,20)
   ball.x = ball.x + ball.dx;
   ball.y = ball.y + ball.dy;
   if(ball.x+ball.r>width-ball.r/2){
       ball.dx=-ball.dx-0.5;       
   }
  if (ball.x-2.5*ball.r/2< 0){
  if (ball.y >= paddle1Y&& ball.y <= paddle1Y + paddle1Height) {
    ball.dx = -ball.dx+0.5;
    playerscore++;
    bounce.play();
  }
  else{
    pcscore++;
    reset();
    navigator.vibrate(100);
    miss.play();
  }
}
if(pcscore ==4){
    fill("#FFA500");
    stroke(0)
    rect(0,0,width,height-1);
    fill("white");
    stroke("white");
    textSize(25)
    text("Game Over",width/2,height/2);
    text("Press the Restart Button to Play Again",width/2,height/2+30)
    noLoop();
    pcscore = 0;
}
   if(ball.y+ball.r > height || ball.y-ball.r <0){
       ball.dy =- ball.dy;
   }   
}


//width height of canvas speed of ball 
function models(){
    textSize(18);
    fill(255);
    noStroke();
    text("Width:"+width,135,15);
    text("Speed:"+abs(ball.dx),50,15);
    text("Height:"+height,235,15)
}


//this function help to not go te paddle out of canvas
function paddleInCanvas(){
  if(mouseY+paddle1Height > height){
    mouseY=height-paddle1Height;
  }
  if(mouseY < 0){
    mouseY =0;
  }  
}

function restart() {
  pcscore = 0;
  playerscore = 0;
}