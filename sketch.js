var monkey, player_running;
var bananaGroup, bananaImage;
var obstacleGroup, obstacleImg;
var back, backImage;
var ground;
var score

function preload() {
  backImage = loadImage("jungle.jpg")
  
  player_running = loadAnimation("Monkey_01.png", "Monkey_02.png","Monkey_03.png","Monkey_04.png", "Monkey_05.png","Monkey_06.png","Monkey_07.png", "Monkey_08.png","Monkey_09.png","Monkey_10.png",);

  bananaImage = loadImage("banana.png");
  obstacleImg = loadImage("stone.png");
}

function setup() {
  createCanvas(400, 400);
  
  back = createSprite(200,200,50,50);
  back.addImage("back", backImage);
  back.velocityX = -3;  
   
  monkey = createSprite(50, 350, 20, 20);
  monkey.addAnimation("monkey", player_running);
  monkey.scale = 0.10;
  
  ground = createSprite (200, 385, 500, 10)
  ground.visible = false;
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
  score = 0;
}

function draw() {
  background(220);
  
  
  if (back.x < 0){
    back.x = back.width/2;
  }
  
  if(keyDown("space")&& monkey.y >= 338.3){
    monkey.velocityY = -20 ;
  }
monkey.velocityY = monkey.velocityY + 0.9; 
  
  
  switch(score){
    case 10 : monkey.scale = 0.12;
             break;
    case 20 : monkey.scale = 0.14;
             break;
    case 30 : monkey.scale = 0.16;
             break;
    case 40 : monkey.scale = 0.18;
             break;
    default : break;         
  }
  
  if(bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach()    
    score = score +2
  }
  
  if(obstacleGroup.isTouching(monkey)){
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    back.velocityX = 0;
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    monkey.scale = 0.10
    
  }
  
  spawnBananas();
  spawnObstacles();
  
  monkey.collide(ground);
  drawSprites();
  
 stroke("yellow");
   textSize(20);
   fill("red");
   text("Score: "+ score, 300,40);
  
}

function spawnBananas(){
  if(World.frameCount % 80 === 0) {
    var banana = createSprite(400,365,10,40);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(170,250));   
    banana.scale = 0.05;
    banana.lifetime = 134;
    banana.velocityX = -5;
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
   bananaGroup.add(banana);
    
  }
}

function spawnObstacles(){
  //codes to spawn te obstacles
  if (World.frameCount % 300 === 0) {
   var obstacles = createSprite(400,345,10,40);
   obstacles.addImage(obstacleImg);
  //assign the scale, lifetime, and velocity 
   obstacles.scale = 0.15;  
   obstacles.lifetime = 85; 
   obstacles.velocityX = -6;
   
   //adding the obstacles to the group
   obstacleGroup.add(obstacles); 
  }
 
}