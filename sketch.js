var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}


function setup() {
  createCanvas(600, 200);
  
 monkey = createSprite(50,140,20,50);
 monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(350,350,900,10);
  ground.x = ground.width /2;
  ground.velocityX = -10;
  
  
  foodGroup = new Group();
  obstacleGroup = new Group();

}

function draw() {
background("white");
  
  if (gameState===PLAY){
 
  
    if(keyDown("space") && monkey.y >= 159) {
     monkey.velocityY = -12;
    }
  
  
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
 
    food();
    Obstacles();
  
    if(obstacleGroup.isTouching(monkey)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    
    
   
    ground.velocityX = 0;
   monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);

    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
   
  }
  
  
  drawSprites();
}

function food() {
  //write code here to spawn the clouds
  if (frameCount % 80 === 0) {
    var food = createSprite(600,120,40,10);
   food.y = Math.round(random(120,200));
    food.addImage(bananaImage);
    food.scale = 0.1;
    food.velocityX = -3;
    
  
   food.lifetime = 200;
    
    
   food.depth = monkey.depth;
   monkey.depth = monkey.depth + 1;
    
 
    foodGroup.add(food);
  }
  
}

function Obstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -5;
    obstacle.addImage(obstacleImage);           
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
   
    obstacleGroup.add(obstacle);
  }
}








