var backGround,backGroundImg,balloon,balloonImg,topObstaclesGroup,bottomObstaclesGroup,barGroup,gameOver,restart
var score=0
var PLAY=1,END=0
var gameState=PLAY


function preload()
{
backGroundImg=loadImage("assets/bg.png")
backGroundImg2=loadImage("assets/bgImg2.jpg")
balloonImg=loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")
topObstacle1Img=loadImage("assets/obsTop1.png")
topObstacle2Img=loadImage("assets/obsTop2.png")

bottomObstacle1Img=loadImage("assets/obsBottom1.png")
bottomObstacle2Img=loadImage("assets/obsBottom2.png")
bottomObstacle3Img=loadImage("assets/obsBottom3.png")
restartImg=loadImage("assets/restart.png")
gameOverImg=loadImage("assets/gameOver.png")

jumpSound=loadSound("assets/jump.mp3")
dieSound=loadSound("assets/die.mp3")
}


function setup()
{      
createCanvas(600,600)

//background
backGround=createSprite(165,485,10,10)
getBackground()
backGround.addImage(backGroundImg)
backGround.velocityX=-4


//balloon
balloon=createSprite(50,150,20,20)
balloon.addAnimation("climb",balloonImg)
balloon.scale=.3
balloon.setCollider("rectangle",0,0,200,100)

//bottomGround
bottomGround=createSprite(200,590,800,20)
bottomGround.visible=false

//topGround
topGround=createSprite(200,10,800,20)
topGround.visible=false

//restart
restart=createSprite(300,250,20,20)
restart.visible=false
restart.addImage(restartImg)

//gameOver
gameOver=createSprite(300,150,20,20)
gameOver.visible=false
gameOver.addImage(gameOverImg)

//groups
topObstaclesGroup=new Group()
bottomObstaclesGroup=new Group ()
barGroup=new Group()

}
 
function draw()
{
 background ("white")

//infinite scrolling background
if(backGround.x<0)
{
 backGround.x=width/2
}

//playState
if(gameState===PLAY){ 
  //flying the balloon
  if (keyDown("space"))
  {
    balloon.velocityY=-7
    jumpSound.play()
  }

  //adding gravity to balloon
balloon.velocityY=balloon.velocityY+1
spawnTopObstacles()

spawnBottomObstacles()

bar()
//changingToEndState
if(topObstaclesGroup.isTouching(balloon)||
bottomObstaclesGroup.isTouching(balloon)||
bottomGround.isTouching(balloon)||
topGround.isTouching(balloon))
{
  gameState=END
  dieSound.play()
}
}
//endState
if(gameState===END){
balloon.setVelocity(0,0)
topObstaclesGroup.setVelocityXEach(0)
bottomObstaclesGroup.setVelocityXEach(0)
barGroup.setVelocityXEach(0)

topObstaclesGroup.setLifetimeEach(-1)
bottomObstaclesGroup.setLifetimeEach(-1)

restart.visible=true

gameOver.visible=true

backGround.velocityX=0

if(mousePressedOver(restart))
{
 reset ()

}


}
drawSprites()

Score ()


}

function reset()
{
gameState=PLAY
balloon.y=200

gameOver.visible=false
restart.visible=false

topObstaclesGroup.destroyEach()
bottomObstaclesGroup.destroyEach()


  score=0

  backGround.velocityX=-4


}

function spawnTopObstacles()
{
if (frameCount%70===0)
{

  topObstacle=createSprite(600,Math.round(random(25,100)),10,10)
topObstacle.velocityX=-3
topObstacle.scale=0.15
topObstacle.lifetime=200
topObstaclesGroup.add(topObstacle)

var rand=Math.round(random(1,2))

switch(rand)
{
  case 1 : 
topObstacle.addImage(topObstacle1Img)
break ; 

case 2 : 
topObstacle.addImage(topObstacle2Img)
break ;

default:
  break ;

}

}
}



function spawnBottomObstacles()
{
if (frameCount%70===0)
{

  bottomObstacle=createSprite(600,470,10,10)
bottomObstacle.velocityX=-3
bottomObstacle.scale=0.15
bottomObstacle.lifetime=200
bottomObstaclesGroup.add(bottomObstacle)

var rand=Math.round(random(1,3))

switch(rand)
{
  case 1 : 
bottomObstacle.addImage(bottomObstacle1Img)
break ; 

case 2 : 
bottomObstacle.addImage(bottomObstacle2Img)
break ;

case 3 : 
bottomObstacle.addImage(bottomObstacle3Img)
break ;

default:
  break ;

}

}




}

function bar ()
{
  if (frameCount%70===0)
  {
var bar1=createSprite(400,200,10,800)
bar1.velocityX=-5
bar1.lifetime=100
bar1.visible=false
barGroup.add(bar1)
}

}
function Score ()
{
if (balloon.isTouching(barGroup))
{
  score=score+1 
}
fill("green")
  textSize(20)
text("Score: "+score,450,20)
}
//addingDaynightImages
async function getBackground()
{
var response=await fetch("https://worldtimeapi.org/api/timezone/Asia/Kolkata")
var resjson=await response.json()
var dateTime=resjson.datetime
console.log(dateTime)
var hour=dateTime.slice(11,13)
if (hour>=6&&hour<=18)
{
  backGround.addImage(backGroundImg)
  backGround.scale=3}
  
  else{
    backGround.addImage(backGroundImg2)
  backGround.scale=4}
  }
  
  
  



//load restart and gameover png 
//create restart and gameover sprite inside setup()
//visible=false 
// in END state make visible=true


