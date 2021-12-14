var trex, trex_running, edges;
var groundImage,ground, chaoInvisivel;
var nuvens, numemimg, grupo_nuv;
var obstaculo1,obstaculo2,obstaculo3,obstaculo4,obstaculo5,obstaculo6,grupo_obst;
var score,highscore;
var PLAY =1;
var FIM =0;
var estadojogo =PLAY;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png")
  nuvemimg = loadImage("cloud.png");
  obstaculo1 = loadImage("obstacle1.png");
  obstaculo2 = loadImage("obstacle2.png");
  obstaculo3 = loadImage("obstacle3.png");
  obstaculo4 = loadImage("obstacle4.png");
  obstaculo5 = loadImage("obstacle5.png");
  obstaculo6 = loadImage("obstacle6.png");
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

  //criando os grupos: obstaculos e nuvens.
  grupo_nuv =createGroup()
  grupo_obst =createGroup()

  //pontuação
  score = 0

  
}

function draw(){
  //definir a cor do plano de fundo 
  background("white");
  
 text("score: " +score, 500,20)


if (estadojogo == PLAY){

  score=score +Math.round(frameCount/60);

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

  //criar nuvens
  criarnuvens();
  
  //criar obsstaculos
  criar_obstaculos();
  
  //colisão do trex para acabar o jogo
  if (group_obst.isTouching(trex)){
    estadojogo = FIM;   
  }
  
}
else if(estadojogo == FIM){

  ground.velocityX=0;
  group_nuv.setVelocityXEach=(0);
  group_obst.setVelocityXEach=(0);
}

 
  
  
  
  
  
 //impedir que o trex caia
  trex.collide(chaoInvisivel);
  
  
  drawSprites();
}

  function criarnuvens(){
   if (frameCount % 125 == 0){
    nuvens =createSprite(600,100,40,10);
    nuvens.addImage(nuvemimg); 
    nuvens.y =Math.round(random(20,120));
    nuvens.velocityX=-2; 
    var num =Math.round(random(5,8));
    nuvens.scale =num/10;

    //ajuste de prufundidade
  nuvens.depth=trex.depth
  trex.depth=trex.depth+1
  
  //tempo de vida nuvens
  nuvens.lifetime=330
  
  //adicionar nuvens ao grupo
  grupo_nuv.add(nuvens)
}
  }
  
  //criar obstaculos
  function criar_obstaculos(){  
 if (frameCount % 65 == 0){
    obstaculo =createSprite(605,165,10,40);
    obstaculo.velocityX=-5;

  //criar obstaculos aleatoriamente
  var numero =Math.round(random(1,6))
    switch(numero){
      case 1: obstaculo.addImage(obstaculo1);
        break;
      case 2: obstaculo.addImage(obstaculo2);
        break;
      case 3: obstaculo.addImage(obstaculo3);
        break;
      case 4: obstaculo.addImage(obstaculo4);
        break;
      case 5: obstaculo.addImage(obstaculo5);
        break;
      case 6: obstaculo.addImage(obstaculo6);
        break;
      default:
        break;
  }
obstaculo.scale=0.4
obstaculo.lifetime=130
grupo_obst.add(obstaculo);
 }  
}