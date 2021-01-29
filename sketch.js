//defining various Game States
var PLAY = 1;
var END = 0;
var gameState = 1;

//defining variable to create sprites
var knife, end, fruits, f, m, monster, comboFruit;

//defining variables for preloading the image
var knifeImg, mangoImg, appleImg, pearImg, bananaImg, endImg, alien1Img, alien2Img, knifeSwooshSound, gameOverSound, comboFruitImg;

var score;

function preload() {
  //load the images, animations and sounds here
  knifeImg = loadImage("knife.png");
  mangoImg = loadImage("fruit1.png");
  appleImg = loadImage("fruit2.png");
  pearImg = loadImage("fruit3.png");
  bananaImg = loadImage("fruit4.png");
  endImg = loadImage("gameover.png");
  alien1Img = loadImage("alien1 (1).png");
  alien2Img = loadImage("alien2.png");
  comboFruitImg = loadImage("combo fruit.jpg")

  knifeSwooshSound = loadSound("knife.mp3");
  gameOverSound = loadSound("gameover.mp3");
}

function setup() {
  createCanvas(1600,600);

  //creating sword
  knife = createSprite(40, 200, 20, 20);
  knife.addImage("ki", knifeImg);
  knife.scale = 0.7

  //creating the game over sprite
  end = createSprite(500, 200, 10, 10);
  end.addImage("e", endImg);
  end.scale = 1.5;

  //set collider for knife
  knife.setCollider("rectangle", 0, 0, 65, 100);

  //creating a group for fruits and aliens
  fruitsGroup = new Group();
  monstersGroup = new Group();
  comboGroup = new Group();

  //creating the score
  score = 0;
}

function draw() {
  //creating the background
  background("lightblue");

  //dividing the code in PLAY and End state
  if (gameState === PLAY) {

    // Move knife with mouse
    knife.y = World.mouseY;
    knife.x = World.mouseX;

    //to increase the scoring system
    if (fruitsGroup.isTouching(knife)) {
      fruitsGroup.destroyEach();
      score = score + 3;
      knifeSwooshSound.play();
    }
    
    if(comboGroup.isTouching(knife)){
      score = score+10;
      comboGroup.destroyEach();
      knifeSwooshSound.play();
    }

    //defining the user defined function 
    spawnFruits();
    spawnMonsters();
    spawnComboFruit();

    //to make the game state end
    if (knife.isTouching(monstersGroup)) {
      gameState = END;
      gameOverSound.play();
    }

    //to make the game over image invisible in play state
    end.visible = false;
  } else if (gameState === END) {

    //to make the game over image visible in play state
    end.visible = true;

    //to destroy each sprite during end state
    knife.destroy();
    fruitsGroup.destroyEach();
    monstersGroup.destroyEach();
  }

  drawSprites();

  //Display score
  textSize(25);
  text("Score : " + score, 750, 50);
}

function spawnFruits() {
  if (frameCount % 80 === 0) {
    fruits = createSprite(0, 200, 20, 20);
    fruits.scale = 0.2;

    //to give different images to fruits 
    f = Math.round(random(1, 4));
    switch (f) {
      case 1:
        fruits.addImage(mangoImg);
        break;
      case 2:
        fruits.addImage(appleImg);
        break;
      case 3:
        fruits.addImage(pearImg);
        break;
      case 4:
        fruits.addImage(bananaImg);
        break;
    }
    //to spawn the fruits at different positions
    fruits.y = Math.round(random(50, 740));

    //to give speed to fruits
    fruits.velocityX = (15 + score / 10);

    //to give a lifetime
    fruits.setLifetime = 1000;

    fruitsGroup.add(fruits);
  }
}

function spawnMonsters() {
  if (frameCount % 135 === 0) {
    monster = createSprite(1000, 50, 20, 20);
    monster.velocityX = -(15 + score / 10);
    monster.y = Math.round(random(50, 340));

    m = Math.round(random(1, 2));
    switch (m) {
      case 1:
        monster.addImage(alien1Img);
        break;
      case 2:
        monster.addImage(alien2Img);
        break;
    }
    monster.scale = 0.85;
    monster.setLifetime = 500;

    monstersGroup.add(monster);
  }
}

function spawnComboFruit(){
  if(frameCount%700 === 0){
  comboFruit = createSprite(0,200,10,10);
  comboFruit.y = Math.round(random(50,340));
  comboFruit.addImage("cf",comboFruitImg);
  comboFruit.scale = 0.2;
  comboFruit.velocityX = (22+score/10);
  comboFruit.setLifetime = 1000;
  comboGroup.add(comboFruit);
}
}
