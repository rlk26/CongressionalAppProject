let area;
let msg;

function setup() {
createCanvas(displayWidth, displayHeight); 
    
area = createElement('textarea');
area.position(width*3/4,0);
area.elt.placeholder = 'CODE HERE OR ELSE';
area.style('width', '400px');
area.style('height', displayHeight);
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
   msg = area.value();
   fill(255);
   textSize(32);   
   //text(msg, 1000, 200);
}

function keyPressed(){
    if (keyCode === OPTION) { 
        print(area.elt.value);
    }
}
