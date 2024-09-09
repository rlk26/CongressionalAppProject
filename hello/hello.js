let input;
let msg;

function setup() {
createCanvas(displayWidth, displayHeight);
// fullScreen();

input = createInput('');
input.position(1200, 0);
input.style('width', '250px');
input.style('height', displayHeight);
//myInput.size(150, 100);
}

let x = 50;

function draw() {
  background(0);
  circle(x, 200, 100);
  x++;

  if (x > width+50) 
    x = -50;

repaint();
    
}

function repaint() {
   msg = input.value();
   fill(255);
   textSize(32);   
   text(msg, 1000, 200);
}

function keyPressed(){
    if (keyCode === OPTION) { 
        print(msg);
    }
}
