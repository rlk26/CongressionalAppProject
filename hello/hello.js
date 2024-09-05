let slider;
let input;

function setup() {
createCanvas(800, 800);
// fullScreen();

 // Create a slider and place it beneath the canvas.
slider = createSlider(0, 255, 200);
slider.position(10, height - 50);

  // Call repaint() when the slider changes.
 slider.input(repaint);
    
input = createInput('');
  input.position(0, 100);

  // Call repaint() when input is detected.
  input.input(repaint);
}

let x = 50;

function draw() {
  background(0);
  ellipse(x, 200, 100, 50);
  x++;

  if (x > width+50) 
    x = -50;
}

// Paint the background using slider's value.
function repaint() {
  let g = slider.value();
  background(g);

  background(200);
  let msg = input.value();
   fill(255);
      textSize(32);   
  text(msg, 5, 50);
}
