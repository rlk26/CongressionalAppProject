let msg; // text input box, text input
let myArray = []; // array split
let words = [];
//let moves = [];
let error = false;
let errorMsg = "";
let stars = false;

//movement variables
let movementSpeed = 2.85;
let movementTime = 0;
let moving = true;
let gridPos;


let Gamestates, gs0;
let currentGamestate = 0;

let level1Grid;

var leftWalkingGIF, rightWalkingGIF, upWalkingGIF, downWalkingGIF, placeHolderGIF;
var gif_loadImg, gif_createImg;
var moonbg;
let font;

function preload(){
    leftWalkingGIF = loadImage('leftwalking.gif');
    rightWalkingGIF = loadImage('rightwalking.gif');
    upWalkingGIF = loadImage('rightwalking.gif');
    downWalkingGIF = loadImage('frontwalking.gif');
    placeHolderGIF = loadImage('leftwalking.gif');
    
    moonbg = loadImage('moonbg.png');
    gridPos = createVector(0, 0);
    //font = loadFont('text.ttf');
}

function setup() {
    createCanvas(displayWidth, displayHeight);
    
    imageMode(CENTER);
    //image(moonbg,displayWidth/2, displayHeight/2);
    
    //textFont(font);
    
    //vel = createVector(0,0);
    //pos = createVector(displayWidth/20,displayHeight/8);

    level1Goal = createVector(4, 0);
    level1Grid = new Grid([], level1Goal, createVector(0, 0)); //remove array, goal, and start position
    
    leftWalkingGIF.resize(displayWidth*.05, displayHeight*.13);
    rightWalkingGIF.resize(displayWidth*.05, displayHeight*.13);
    upWalkingGIF.resize(displayWidth*.05, displayHeight*.13);
    downWalkingGIF.resize(displayWidth*.05, displayHeight*.13);
    moonbg.resize(displayWidth*.7, displayHeight); //resizing is being goofy
    
    
    
    Gamestates = [];
    gs0 = new Gamestate(null, null, null); Gamestates.push(gs0);
    gs1 = new Gamestate(level1Grid, moonbg, 4); Gamestates.push(gs1); //grid, background, lineGoal

    

 
}


function draw() {
    //image(moonbg,displayWidth/2, displayHeight/2);
    let cgs = Gamestates[currentGamestate];
    //replace with switch statement
    if(currentGamestate===0) cgs.title();
    if(currentGamestate===1) cgs.display();
    if(currentGamestate===2) cgs.completion();
    
    repaint();
    if(cgs.grid!=null){ //if there is a grid, check if they have met the goal every frame
        if(cgs.grid.checkGoal(cgs.moving)) currentGameState++;
    }
    
    
}
    


function repaint() {
    let cgs = Gamestates[currentGamestate];
    msg = cgs.getAreaValue()
    //console.log("msg" + msg);
    fill(255);
    textSize(displayWidth/30);   
}

function keyPressed(){
    let cgs = Gamestates[currentGamestate];
    if (keyCode === OPTION) {
        cgs.starGoal = false; //idk why you have to set this to false every time
        error = false;
        
        print(cgs.getAreaValue());
        
        myArray.push(msg);
        console.log("my array" + myArray);
        words = splitTokens(msg);
        console.log("words: " + words);
        
        if(words.length < cgs.lineGoal){
            stars = true;
            console.log("star earned!");
        }
    
       cgs.checkError(words);

       cgs.movement();
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

