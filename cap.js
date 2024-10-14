let msg; // text input box, text input
let words = [];

let Gamestates, gs0, gs1;
let currentGamestate = 0;

let level1Grid;

var leftWalkingGIF, rightWalkingGIF, upWalkingGIF, downWalkingGIF, placeHolderGIF;
var gif_loadImg, gif_createImg;
var moonbg;
let font;

function preload(){
    //load image
    leftWalkingGIF = loadImage('leftwalking.gif');
    rightWalkingGIF = loadImage('rightwalking.gif');
    upWalkingGIF = loadImage('rightwalking.gif');
    downWalkingGIF = loadImage('frontwalking.gif');
    placeHolderGIF = loadImage('leftwalking.gif');
    
    moonbg = loadImage('moonbg.png');
    //font = loadFont('text.ttf');
}

function setup() {
    createCanvas(displayWidth, displayHeight);
    
    imageMode(CENTER);

    level1Goal = createVector(4, 0);
    level1Grid = new Grid([], level1Goal, createVector(displayWidth/20,displayHeight/8), createVector(0, 0)); //remove array, goal, and start position, gridStart
    
    //resize all variables
    leftWalkingGIF.resize(displayWidth*.05, displayHeight*.13);
    rightWalkingGIF.resize(displayWidth*.05, displayHeight*.13);
    upWalkingGIF.resize(displayWidth*.05, displayHeight*.13);
    downWalkingGIF.resize(displayWidth*.05, displayHeight*.13);
    moonbg.resize(displayWidth*.7, displayHeight);

    
    //make new gamestate
    Gamestates = [];
    gs0 = new Gamestate(null, null, null); Gamestates.push(gs0);
    gs1 = new Gamestate(level1Grid, moonbg, 4); Gamestates.push(gs1); //grid, background, lineGoal
    
}


function draw() {
    let cgs = Gamestates[currentGamestate];
   
    if(currentGamestate===0) cgs.title();
    if(currentGamestate===1) {cgs.display(); cgs.movement();}
    if(currentGamestate===2) cgs.completion();
    
    repaint();
    
    //if there is a grid, check if they have met the goal every frame
    if(cgs.grid!=null){ 
        if(cgs.grid.checkGoal(cgs.moving)) {
            console.log("goal met");
           currentGameState++; 
        }
    }
}
    
function repaint() {
    let cgs = Gamestates[currentGamestate];
    msg = cgs.getAreaValue();
}

function keyPressed(){

    let cgs = Gamestates[currentGamestate];
    if (keyCode === OPTION) {
        cgs.starGoal = false; //idk why you have to set this to false every time
        
        words = splitTokens(msg);
        cgs.checkError(words); //check for error
        
        //reset position vector to grid start position       
        cgs.pos = cgs.grid.startPos.copy();
    }
}

//button check
function mouseClicked(){
    if (currentGamestate === 0 && mouseX > displayWidth/2 - displayWidth/12 && mouseX < displayWidth/2 + displayWidth/12 && mouseY > displayHeight/2 - displayHeight/16 && mouseY < displayHeight/2 + displayHeight/16){
        currentGamestate += 1;
        textAlign(LEFT, TOP);
    }
}

//movement function

/*
function canYouMove(direction, currentPos, g){
    console.log(direction + " " + currentPos + " " + g);
    if(direction==="up"){
        //check if there is a value above the current Pos.y
          if(currentPos.y!==0){
             if(g[currentPos.y-1][currentPos.x] !== null){
                 return true;
             }
         }
      } 
    
    if(direction==="down"){
        if(g[currentPos.y+1][currentPos.x] !== null){
            return true;
        }
      }  
    
    if(direction==="left"){
        if(currentPos.x!==0 && g[currentPos.y][currentPos.x-1] !== null){
            return true;
        }
      }
    
    if(direction==="right"){
        console.log("test");
        console.log("rows " + g[currentPos.y]);
        for(let i = 0; i<=g.length-1; i++){
            console.log("cols " + g[currentPos.x][i]);
        }
        console.log(g[currentPos.y][currentPos.x+1]);
        if(currentPos.x+1>g[currentPos.y].length && g[currentPos.y][currentPos.x+1] !== null){
            return true;
        }
      }  
    else return true;
    
    //else return false;
}
*/
