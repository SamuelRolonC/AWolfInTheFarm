// @Debug Check script init
console.log("functions.js initialized")


// @Section Functions
function myRandom(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

function cargarFondo() {
  fondo.ready = true
  draw()
}

function cargarVaca() {
  vaca.ready = true
  draw()
}

function cargarCerdo() {
  cerdo.ready = true
  draw()
}

function cargarPollo() {
  pollo.ready = true
  draw()
}

function cargarLobo() {
  lobo.ready = true
  draw()
}

function draw() {
  if (fondo.ready) {
    paper.drawImage(fondo.image, 0, 0)
  }
  if (vaca.live && vaca.ready) {
    paper.drawImage(vaca.image,vaca.x,vaca.y)
  }
  if (cerdo.live && cerdo.ready) {
    paper.drawImage(cerdo.image,cerdo.x,cerdo.y)
  }
  if (pollo.live && pollo.ready) {
    paper.drawImage(pollo.image,pollo.x,pollo.y)
  }
  if (lobo.ready) {
    paper.drawImage(lobo.image,lobo.x,lobo.y)
  }
}

function goesUp() {
  console.log("goes up")
  lobo.y -= moveSpd
  draw()
}
function goesDown() {
  console.log("goes down")
  lobo.y += moveSpd
  draw()
}
function goesLeft() {
  console.log("goes left")
  lobo.x -= moveSpd
  draw()
}
function goesRight() {
  console.log("goes right")
  lobo.x += moveSpd
  draw()
}

function playerMovement(e) {
  switch (e.keyCode) {
    case keys.UP:
      moveUp = true
      break;
    case keys.DOWN:
      moveDown = true
      break;
    case keys.LEFT:
      moveLeft = true
      break;
    case keys.RIGHT:
      moveRight = true
      break;
  }

  if (moveUp) {
    goesUp()
    if (moveLeft) {
      goesLeft()
    } else {
      if (moveRight) {
        goesRight()
      }
    }
  }
  if (moveDown) {
    goesDown()
    if (moveLeft) {
      goesLeft()
    } else {
      if (moveRight) {
        goesRight()
      }
    }
  }
  if (moveLeft) {
    goesLeft()
    if (moveUp) {
      goesUp()
    } else {
      if (moveDown) {
        goesDown()
      }
    }
  }
  if (moveRight) {
    goesRight()
    if (moveUp) {
      goesUp()
    } else {
      if (moveDown) {
        goesDown()
      }
    }
  }

  if (vaca.live && calcCollision(lobo,vaca)) {
    vaca.live = false
    draw()
  }
  if (cerdo.live && calcCollision(lobo,cerdo)) {
    cerdo.live = false
    draw()
  }
  if (pollo.live && calcCollision(lobo,pollo)) {
    pollo.live = false
    draw()
  }
}

function deactivateMovement(e) {
  switch (e.keyCode) {
    case keys.UP:
      moveUp = false
      break;
    case keys.DOWN:
      moveDown = false
      break;
    case keys.LEFT:
      moveLeft = false
      break;
    case keys.RIGHT:
      moveRight = false
      break;
  }
}

function calcCollision(obj1, obj2) {
  let collision = (obj1.x + obj1.width >= obj2.x) && (obj1.x <= obj2.x + obj2.width) && (obj1.y + obj1.height >= obj2.y) && (obj1.y <= obj2.y + obj2.height)
  console.log ("Collision " + obj1.name + "-" + obj2.name + ": " + collision)
  return collision
}


// @Section Declarations

var canvas = document.getElementById("villaplatzi")
var paper = canvas.getContext("2d")

var moveSpd = 10

var moveUp=moveDown=moveLeft=moveRight=false


class Animal {
  constructor(x, y, width, height, url, name = "none") {
    this.name = name
    this.image = new Image()
    this.image.src = url
    this.ready = false
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.live = true
  }
}

var keys = {
  UP: 38,
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39
};

// @Section Body

fondo = {
  url: "medias/tile.png",
  ready: false
}

fondo.image = new Image()
fondo.image.src = fondo.url
fondo.image.addEventListener("load", cargarFondo)

vaca = new Animal(myRandom(0,300),myRandom(0,300), 80, 80, "medias/vaca.png","vaca")
vaca.image.addEventListener("load", cargarVaca)

cerdo = new Animal(myRandom(0,300),myRandom(0,300), 80, 80, "medias/cerdo.png","cerdo")
cerdo.image.addEventListener("load", cargarCerdo)

pollo = new Animal(myRandom(0,300),myRandom(0,300), 80, 80, "medias/pollo.png","pollo")
pollo.image.addEventListener("load", cargarPollo)

lobo = new Animal(myRandom(0,300),myRandom(0,300), 64, 64, "medias/lobo.png","lobo")
lobo.image.addEventListener("load", cargarLobo)

document.addEventListener("keydown", playerMovement)
document.addEventListener("keyup", deactivateMovement)
