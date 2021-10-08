var skybg, waterbg,waterground ,gameOverimg,gameOver, ship2img ,shipimg, helicopterImg, bombImg , waterbgImg;
var water, ship, helicopter,ship2, bomb;
var helicopterGroup, bombGroup;
var score = 0;


var PLAY = 1;
var END = 0;
var gameState = PLAY;


function preload(){
  skybg = loadImage("skybg.jpg");
  waterbgImg = loadImage("waterbg.png");
  shipimg = loadImage("ship.png");
  ship2img = loadImage("ship2.png");
  helicopterImg = loadImage("helicopter.png");
  bombImg = loadImage("bomb.png");
  gameOverimg = loadImage("gameOver.png");
}

function setup() {
  createCanvas(800, 450);
  
  //creating water ground
 
  water = createSprite(200,350,600,600);
  water.addImage("waterground" , waterbgImg);
  water.velocityX = -4;
 
 //creating ship
 
  ship = createSprite(200,300,50,50);
ship.addImage("ship" , shipimg);
ship.scale = 0.4;

    

 //creating helicopter group

helicopterGroup = new Group();

  //creating bomb group
  
    bombGroup = new Group();
}

function draw() {
  background(skybg);
  fill("yellow")
  textSize(15);
  text("SURVIVAL TIME: "+ score, 600,30);
  
    
  //gameState play
  if(gameState === PLAY){
    //increase score
    score = score + Math.round(frameCount/300);

    if (keyDown("LEFT")){
      ship.x = ship.x -10;
    }

    if (keyDown("RIGHT")){
      ship.x = ship.x + 10;
    }
    
    //Call user defined function
   
    spawnHelicopter();

    spawnBomb();
    
 if(bombGroup.isTouching(ship))
 {
    
  helicopterGroup.destroyEach();
  bombGroup.destroyEach();
  ship.destroy();

  gameOver = createSprite(480,300,400,380);
  gameOver.scale = 0.6;
    gameOver.addImage("gameOver" , gameOverimg);

   ship2 = createSprite(200,300,50,50);
    ship2.addImage("ship2" , ship2img);
    ship2.scale = 0.4;

    gameState = END; 
   water.velocityX = 0;

     }
    
 }
  

 
 //for infinite background 
 if(water.position.x < 300){
    water.position.x = 400;
    }
    
 edges = createEdgeSprites();
 ship.collide(edges);

  drawSprites();
}


function spawnHelicopter(){
  if(frameCount%200 === 0){
    helicopter = createSprite(800,80,200,50);
    helicopter.addImage("helicopter",helicopterImg);
    helicopter.setVelocity(-5,0);
    
    helicopter.scale = 0.5;
    
    helicopterGroup.add(helicopter);
  }
}

function spawnBomb(){
 // create bombs at random position
//use Math.random

if(frameCount % 300 === 0){
  bomb = createSprite(Math.round(random(20,350)), 80,200,50);
  bomb.addImage("bomb" ,bombImg);
  bomb.setVelocity(0,5);
  bomb.scale= 0.10;
  bombGroup.add(bomb);
}

}




