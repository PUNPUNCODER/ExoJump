let juegoIniciado = false;

function iniciarJuego() {
    juegoIniciado = true; // Cambia el estado a verdadero 
  
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
//
let gameOver=false;
function preloadImage(url){
  const img = new Image();
  img.src = url;
  return img
}

function preloadImages(images) {
  for (var i = 0; i < images.length; i++) {
    images[i] = preloadImage(images[i])
  }
  return images
}

let arr = [
  "https://i.postimg.cc/1R7HxfHv/copter.png",
  "https://i.postimg.cc/kXVy7qYq/shield.png",
  "https://i.postimg.cc/VvN5zsYw/main.png",
  "https://i.postimg.cc/VsTzJWgn/missile.png",
  "https://i.postimg.cc/yYthptPx/ast1.png",
  "https://i.postimg.cc/D0msBP41/ast2.png",
  "https://i.postimg.cc/KYZ10Dd4/ast3.png",
  "https://i.postimg.cc/Qdj7zD7X/shield.png"
]
const resources = preloadImages(arr);


var score = 0;
//lvl des
const GameLevel = [
  {
    label: "Lavel 1",
    enemySpeed: 4,
    enemyPerFream: 20,
    copter: "copter1",
    bg: "bg1",
    mainDefSpeed: 5,
  },
  {
    label: "Lavel 2",
    enemySpeed: 7,
    enemyPerFream: 15,
    copter: "copter2",
    bg: "bg2",
    mainDefSpeed: 7,
  },
  {
    label: "Lavel 3",
    enemySpeed: 12,
    enemyPerFream: 10,
    copter: "copter3",
    bg: "bg3",
    mainDefSpeed: 10,
  },
];
var currentLevelIndex = 0;
var currentLevel = GameLevel[currentLevelIndex];
let gameFrame = 0;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener("resize", function () {
  canvasPosition = canvas.getBoundingClientRect();
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
const mouse = { x: canvas.width / 2, y: canvas.height / 2 };
canvas.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

//sht
const defenceObjects = {
  MainDef: {
    name: "Main Defence",
    damageCapability: 5,
    image: "VvN5zsYw/main.png",
    sound: "def1.wav",
  },
  Missile: { name: "Missile", damageCapability: 20, image: "VsTzJWgn/missile.png" },
};
//kXVy7qYq/shield.png
const mainDef = new Image(100, 100);
const mainAudio = new Audio("res/audio/def1.wav");
const DefenceArr = [];
class Defence {
  constructor(x, y, weapon) {
    this.x = x;
    this.y = y;
    this.size = 20;
    this.color = "red";
    this.imageDir = "https://i.postimg.cc/";
    this.speed = currentLevel.mainDefSpeed;
    this.weapon = weapon;
    mainAudio.currentTime = 0;
    mainAudio.play();
    this.exe = false;
    this.energy = this.weapon.damageCapability;
  }
  update() {
    if (this.x < canvas.width + 100) {
      this.x += this.speed;
    }
    if (this.y > -100) {
      this.y -= this.speed;
    }
  }

  drow() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    
    let f = 0; 
    mainDef.src = this.imageDir + this.weapon.image;
    ctx.drawImage(
      mainDef,
      f * 100,
      0,
      100,
      100,
      this.x - 80,
      this.y - 20,
      100,
      100
    );
  }
  expl() {
    console.log("defence Died");
  }
}

//Player
const copterLeft = new Image(100, 104);
copterLeft.src = "https://i.postimg.cc/1R7HxfHv/copter.png";
const copterRight = new Image();
copterRight.src = "https://i.postimg.cc/1R7HxfHv/copter.png";
class Copter {
  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;
    this.imgDir = "https://i.postimg.cc/";
    this.size = 50;
    this.angle = 0;
    this.life = 100;
    this.onShield = true;
    this.shieldTime = 50;
    this.shieldCount = 0;
  }

  update() {
    let dx = this.x - mouse.x;
    let dy = this.y - mouse.y;

    if (mouse.x != this.x) {
      this.x -= dx / 10;
      this.moving = true;
    }
    if (mouse.y != this.y) {
      this.y -= dy / 10;
      this.moving = true;
    }
    //console.log(this.shieldTime);
    if (this.onShield) {
      this.shieldTime -= 1;
      if (this.shieldTime <= 0) {
        this.onShield = false;
      }
    } else {
      this.shieldTime = 1000;
    }
  }

  drow() {
    if(this.life > 0){
       ctx.drawImage(
        copterLeft,
        this.x - this.size,
        this.y - this.size,
        this.size * 2,
        this.size * 2
      );
      if (this.onShield) {
        this.shield();
      }
    }
  }

  trigerDefence() {
    DefenceArr.push(
      new Defence(this.x + 75, this.y - 85, defenceObjects.MainDef)
    );
  }
  MissileTriger() {
    DefenceArr.push(
      new Defence(this.x + 75, this.y - 85, defenceObjects.Missile)
    );
  }
  shield() {
    const shield = new Image();
    shield.src = this.imgDir + "kXVy7qYq/shield.png";
    let siz = 150;
    ctx.drawImage(shield, this.x - siz / 2, this.y - siz / 2, siz, siz);
  }
}


const copter = new Copter();
//console.log(copter);
canvas.addEventListener("click", (e) => {
  copter.trigerDefence();
});
window.addEventListener("keydown", (e) => {
  e = e || window.event; 
  if (e.code == "KeyS") {
    //S key for Active shield
    if (!copter.onShield) {
      if (copter.shieldCount > 0) {
        copter.onShield = true;
        copter.shieldCount--;
      } else {
        console.log("Not have any shield");
      }
    }
  }
  if (e.code == "KeyM") {
    copter.MissileTriger();
  }
});

function handleCopter() {
  copter.update();
  copter.drow();
  //console.log(copter.shieldCount);
  if (copter.life <= 0) {
      gameOver=true;
      window.location.href = "tryagain.html"; //redireccionar para volver a iniciar el juego
  }
  //console.log(copter.life);
}

// Enemi
const enemyObjects = [
  { name: "Astroyed", damageCapability: 10, image: "yYthptPx/ast1.png", score: 2 },
  { name: "Fire Astroyed", damageCapability: 20, image: "D0msBP41/ast2.png", score: 4 },
  {
    name: "Small Fire Astroyed",
    damageCapability: 5,
    image: "KYZ10Dd4/ast3.png",
    score: 1,
  },
  { name: "Shield", damageCapability: 0, image: "Qdj7zD7X/shield.png" },
];

const enemyArray = [];
const enemy = new Image();
class Enemy {
  constructor() {
    this.x = Math.random() * (canvas.width * 2);
    this.y = 0 - 50 - (Math.random() * canvas.height) / 2;
    this.radius = 25;
    this.speed = Math.random() * -currentLevel.enemySpeed + -1;
    this.distance;
    this.imageDir = "https://i.postimg.cc/";
    this.type = enemyObjects[Math.floor(Math.random() * enemyObjects.length)];
    
    this.img = this.imageDir + this.type.image;
    this.frameX = 0;
    this.spriteWidth = 50;
    this.spriteHeight = 50;
    this.hited = false;
    this.energy = this.type.damageCapability;
    this.score = this.type.score;
  }
  update() {
    this.x += this.speed;
    this.y -= this.speed;
    const dx = this.x - copter.x;
    const dy = this.y - copter.y;
    this.distance = Math.sqrt(dx * dx + dy * dy);
    //console.log(this.distance);
  }
  draw() {

    enemy.src = this.img;
    ctx.drawImage(
      enemy,
      this.frameX * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x - 25,
      this.y - 25,
      this.spriteWidth * 1,
      this.spriteHeight * 1
    );
  }
  expl() {
    score += this.score;
    //console.log(this.type.damageCapability);
    console.log("Enemy Died");
  }
}
function handleEnemy() {
  for (let i = 0; i < enemyArray.length; i++) {
    //console.log(enemyArray[i].type.damageCapability);

    if (enemyArray[i].y > canvas.height * 2) {
      enemyArray.splice(i, 1);
    }
    if (enemyArray[i].energy <= 0 && enemyArray[i].type.name != "Shield") {
      enemyArray[i].expl(); //
      enemyArray.splice(i, 1);
    }
  }
  if (!copter.onShield) {
    //Colision
    for (let i = 0; i < enemyArray.length; i++) {
      if (enemyArray[i].distance < enemyArray[i].radius + copter.size) {
        //console.log("Hited the Copter");
        if (!enemyArray[i].hited) {
          //Dmg cop life
          if (enemyArray[i].type.name == "Shield" && copter.shieldCount < 3) {
            copter.shieldCount++;
          }
          if (copter.life > 0) {
            copter.life -= enemyArray[i].energy;
          }
          enemyArray[i].hited = true;
        }
        enemyArray.splice(i, 1);
      }
    }
  }

  for (let i = 0; i < enemyArray.length; i++) {
    enemyArray[i].update();
    enemyArray[i].draw();
  }
  if (gameFrame % currentLevel.enemyPerFream == 0) {
    enemyArray.push(new Enemy());
  }
  //console.log(enemyArray.length);
}

function handleDefance() {
  if (DefenceArr.length > 0) {
    for (i = 0; i < DefenceArr.length; i++) {
      DefenceArr[i].update();
      DefenceArr[i].drow();
      //console.log(DefenceArr[i].y, DefenceArr[i].x);
      for (j = 0; j < enemyArray.length; j++) {
        let DEx = enemyArray[j].x - DefenceArr[i].x;
        let DEy = enemyArray[j].y - DefenceArr[i].y;
        let enD = Math.sqrt(DEx * DEx + DEy * DEy);
        if (enemyArray[j].type.name != "Shield") {
          if (enD < 25) {
            if (!DefenceArr[i].exe) {
              if (enemyArray[j].energy > 0) {
                enemyArray[j].energy -= DefenceArr[i].energy;
              }
              if (DefenceArr[i].energy > 0) {
                DefenceArr[i].energy -= enemyArray[j].energy;
              }
              DefenceArr[i].exe = true;
            }
          }
        }
      }

      if (DefenceArr[i].energy <= 0) {
        DefenceArr[i].expl(); //
      }

      if (
        DefenceArr[i].y <= -100 ||
        DefenceArr[i].x >= window.width + 100 ||
        DefenceArr[i].energy <= 0
      ) {
        DefenceArr.splice(i, 1);
      }
    }
  }
}

function PlayerInfo() {
  let startPoint = canvas.width - 120;
  let life = copter.life;
  ctx.strokeStyle = "green";
  if (life < 30) {
    ctx.strokeStyle = "red";
  } else if (life < 50) {
    ctx.strokeStyle = "yellow";
  }
  let endPoint = startPoint + life;
  ctx.beginPath();
  ctx.moveTo(startPoint, canvas.height - 20);
  ctx.lineWidth = 15;

  ctx.lineTo(endPoint, canvas.height - 20);
  ctx.stroke();

  ctx.strokeStyle = "white";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.rect(canvas.width - 122, canvas.height - 30, 104, 20);
  ctx.stroke();
  //Life

  ctx.font = "60px Verdana";
  ctx.fillStyle = 'white';
  ctx.fillText(score, 10, 70);
  if (score > 25) {
    currentLevelIndex++;
    currentLevel = GameLevel[currentLevelIndex];
    score = 0;
  }
  if (currentLevelIndex==2) {  
    window.location.href = "gamevictory.html";

  }
  ctx.font = "40px Verdana"; 
  ctx.fillText("Level " + (currentLevelIndex + 1), canvas.width - 200, 70);
}
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if(!gameOver){
    handleCopter();
    handleEnemy();
    handleDefance();
    PlayerInfo();
    gameFrame++;
    requestAnimationFrame(animate);
  }
  
}
animate();

    // Aquí va la lógica para iniciar el juego
    // Por ejemplo, inicializar el canvas, dibujar estrellas, etc.
    requestAnimationFrame(animar); // Inicia la animación
}

function animar() {
    if (!juegoIniciado) return; // No hacer nada si el juego no ha iniciado

    // Lógica de animación del juego
    // Por ejemplo, actualizar posiciones, dibujar en el canvas, etc.

    requestAnimationFrame(animar); // Solicitar el siguiente frame
}

// Evento para el botón de iniciar
document.getElementById('startButton').onclick = function() {
    document.getElementById('menu').style.display = 'none'; // Ocultar el menú
    iniciarJuego(); // Llama a la función para iniciar el juego
};

// Evento para el botón de salir
document.getElementById('exitButton').onclick = function() {
  window.location.href = "index.html"; 
};
