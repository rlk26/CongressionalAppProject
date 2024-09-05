
let input;

function setup() {
createCanvas(1200, 600);
// fullScreen();

 input = createInput('');
input.position(1000, 100);
//myInput.size(150, 100);

}

let x = 50;

function draw() {
  background(0);
  ellipse(x, 200, 100, 50);
  x++;

  if (x > width+50) 
    x = -50;

repaint();
    
}

function repaint() {
  let msg = input.value();
   fill(255);
   textSize(32);   
   text(msg, 1000, 200);
}
