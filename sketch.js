var backGround,backGroundImg,balloon,balloonImg





function preload()
{
backGroundImg=loadImage("assets/bg.png")
balloonImg=loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")
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


topGround=createSprite(100,200,20,50)

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

drawSprites()


}
