var trex, trex_running, edges;
var groundImage,ground, chaoInvisivel;
 
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png")
}

function setup(){
  createCanvas(600,200);
  
  //criando o trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  edges = createEdgeSprites();
  
  //adicione dimensão e posição ao trex
  trex.scale = 0.5;
  trex.x = 50


  //criando sprite do chão
  ground =createSprite(200,180,400,20);
  ground.addImage(groundImage);

  //chão invisivel
  chaoInvisivel=createSprite(200,186,400,10);
  chaoInvisivel.visible=false;  

}
function draw(){
  //definir a cor do plano de fundo 
  background("white");
  
  //registrando a posição y do trex
  console.log(trex.y)
  
  
  //chão infinito
  ground.velocityX=-2;
  if (ground.x < 0){
  ground.x=ground.width/2;
  
  
  }
  
  //pular quando a seta for pressionada
  if(keyDown(UP_ARROW) && trex.y >125){
    trex.velocityY = -10 ;
  }

  //pular quando tecla de espaço for pressionada
  if(keyDown("space") && trex.y >125){
    trex.velocityY = -10 ;
  }
  
  trex.velocityY = trex.velocityY + 1;
  
 //impedir que o trex caia
  trex.collide(chaoInvisivel);
  drawSprites();
}