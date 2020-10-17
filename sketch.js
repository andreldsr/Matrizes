var canvasSize = 600;
var tileNumber = 10;
var vec = {
  x: 2,
  y: 3
};
var mac;
class Vec2 {
  constructor() {
    this.x = int(Math.random() * tileNumber) - tileNumber/2;
    this.y = int(Math.random() * tileNumber) - tileNumber/2;
  }
}
class Mac3 {
  constructor() {
    this.a = [
      0, 0, 0,
      0, 0, 0,
      0, 0, 0
    ]
  }
  identity() {
    this.a = [
      1, 0, 0,
      0, 1, 0,
      0, 0, 1
    ]
  }
  translate() {
    let dx = Math.round((Math.random() * tileNumber/2) - tileNumber/4)
    let dy = Math.round((Math.random() * tileNumber/2) - tileNumber/4)
    this.a = [
      1, 0, 0,
      0, 1, 0,
      dx, dy, 1
    ]
  }
  scale() {
    let sx = Math.round(Math.random() * tileNumber/2)
    let sy = Math.round(Math.random() * tileNumber/2)
    this.a = [
      sx, 0, 0,
      0, sy, 0,
      0, 0, 1
    ]
  }
  rotate() {
    let angle = Math.PI * 0.25
    this.a = [
       cos(angle), sin(angle), 0,
      -sin(angle), cos(angle), 0,
                0,          0, 1
    ]
  }
  random() {
    this.a = [
      int(Math.random() * tileNumber) - tileNumber/2, 
      int(Math.random() * tileNumber) - tileNumber/2, 
      int(Math.random() * tileNumber) - tileNumber/2,
      int(Math.random() * tileNumber) - tileNumber/2, 
      int(Math.random() * tileNumber) - tileNumber/2, 
      int(Math.random() * tileNumber) - tileNumber/2,
      int(Math.random() * tileNumber) - tileNumber/2, 
      int(Math.random() * tileNumber) - tileNumber/2, 
      int(Math.random() * tileNumber) - tileNumber/2
    ]
  }
}

function setup() {
  createCanvas(canvasSize, canvasSize);
  mac = new Mac3()
  let button = createButton("New Vector")
  button.mousePressed(createVec2)
  button = createButton("Identity Mac")
  button.mousePressed(identityMac)
  button = createButton("Translate Mac")
  button.mousePressed(translateMac)
  button = createButton("Scale Mac")
  button.mousePressed(scaleMac)
  button = createButton("Rotate Mac")
  button.mousePressed(rotateMac)
  button = createButton("Random Mac")
  button.mousePressed(randomMac)
  button = createButton("Vec * Mac")
  button.mousePressed(multiply)

}

function createVec2() {
  vec = new Vec2();
}

function identityMac() {
  mac.identity()
}

function translateMac() {
  mac.translate()
}

function randomMac() {
  mac.random()
}
function scaleMac() {
  mac.scale()
}
function rotateMac() {
  mac.rotate()
}

function multiply() {
  if (vec == null)
    return
  
  let x= (mac.a[0] * vec.x + mac.a[3] * vec.y + mac.a[6]);
  let y = (mac.a[1] * vec.x + mac.a[4] * vec.y + mac.a[7]);
  let vw = (mac.a[2] * vec.x + mac.a[5] * vec.y + mac.a[8]);
  vec.x = x
  vec.y = y
  if(vw == 0)
    return;
  vec.x = Math.round(x/vw)
  vec.y = Math.round(y/vw)
}

function drawCross() {
  stroke(0)
  strokeWeight(1)
  line(0, canvasSize / 2, canvasSize, canvasSize / 2)
  line(canvasSize / 2, 0, canvasSize / 2, canvasSize)
}
function drawGrid(){
  strokeWeight(0.5)
  stroke(100,100,100)
  for(i = 0; i < 10; i++){
    line(0, i*canvasSize/tileNumber, canvasSize, i*canvasSize/tileNumber)
    line(i*canvasSize/tileNumber,0, i*canvasSize/tileNumber, canvasSize)
  }
}

function drawVec() {
  if (vec == null)
    return
  stroke(0, 150, 0)
  strokeWeight(2)
  let x = vec.x * canvasSize/10 + canvasSize/2
  let y = (tileNumber/2 - vec.y) * canvasSize/tileNumber
  line(canvasSize / 2, canvasSize / 2, x, y)
}

function printMac() {
  strokeWeight(0.2)
  text((mac.a[0]+"").substring(0,3), 30, 30)
  text((mac.a[1]+"").substring(0,3), 70, 30)
  text((mac.a[2]+"").substring(0,3), 110, 30)

  text((mac.a[3]+"").substring(0,4), 30, 50)
  text((mac.a[4]+"").substring(0,3), 70, 50)
  text((mac.a[5]+"").substring(0,3), 110, 50)

  text((mac.a[6]+"").substring(0,3), 30, 70)
  text((mac.a[7]+"").substring(0,3), 70, 70)
  text((mac.a[8]+"").substring(0,3), 110, 70)
}

function printVec(){
  fill(200,200,200)
  rect(20,canvasSize-85, 60, 70)
  fill(0)
  text("VecX: " + vec.x, 30, canvasSize - 60)
  text("VecY: " + vec.y, 30, canvasSize - 30)
}

function draw() {
  background(150,200,200);
  drawCross()
  drawGrid()
  drawVec()
  printMac()
  printVec()
}
