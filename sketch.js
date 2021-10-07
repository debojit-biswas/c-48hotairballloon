var backGround,backGroundImg,balloon,balloonImg,topObstaclesGroup,bottomObstaclesGroup





function preload()
{
backGroundImg=loadImage("assets/bg.png")
balloonImg=loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")
topObstacle1Img=loadImage("assets/obsTop1.png")
topObstacle2Img=loadImage("assets/obsTop2.png")

bottomObstacle1Img=loadImage("assets/obsBottom1.png")
bottomObstacle2Img=loadImage("assets/obsBottom2.png")
bottomObstacle3Img=loadImage("assets/obsBottom3.png")
}


function setup()
{      
createCanvas(600,600)

//background
backGround=createSprite(165,485,10,10)
backGround.addImage(backGroundImg)
backGround.scale=1.5
backGround.velocityX=-4

//balloon
balloon=createSprite(50,70,20,20)
balloon.addAnimation("climb",balloonImg)
balloon.scale=.3

bottomGround=createSprite(200,590,800,20)
bottomGround.visible=false

topGround=createSprite(200,10,800,20)
topGround.visible=false

topObstaclesGroup=new Group()
bottomObstaclesGroup=new Group ()
}
 
function draw()
{

  //flying the balloon
  if (keyDown("space"))
  {balloon.velocityY=-7}

  //adding gravity to balloon
balloon.velocityY=balloon.velocityY+0.5                      


//infinite scrolling background
if(backGround.x<0)
{
  backGround.x=width/2
}

spawnTopObstacles()

spawnBottomObstacles()



drawSprites()


}
function spawnTopObstacles()
{
if (frameCount%70===0)
{

  topObstacle=createSprite(600,Math.round(random(25,100)),10,10)
topObstacle.velocityX=-3
topObstacle.scale=0.15

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